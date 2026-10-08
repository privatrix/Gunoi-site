/* POST /api/estimate — classify photos/text into catalogue items.
 * Body: { text?: string, photos?: string[] (base64 JPEG, ≤5), lang?: 'ro'|'ru' }
 * 200 { ok: true, ai: { items, totalM3, confidence, unclear, language } }
 * 200 { ok: false, reason }  → the page falls back to the items the user ticked.
 * Prices are never computed here; the page prices with lib/estimate.js. */
import config from '../pricing.config.json' with { type: 'json' };
import { classifyJob } from '../lib/ai/index.js';

const MAX_PHOTOS = 5;
const MAX_PHOTO_B64 = 1.4 * 1024 * 1024; // ≈1 MB JPEG once base64-encoded
const RATE = { windowMs: 10 * 60 * 1000, max: 8 };

// Best-effort per-instance limiter. Phase 4 moves this to durable storage.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE.max;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, reason: 'method' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ ok: false, reason: 'rate_limited' });

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};
  const text = typeof body.text === 'string' ? body.text.slice(0, 2000) : '';
  const photos = Array.isArray(body.photos)
    ? body.photos
        .filter((p) => typeof p === 'string' && p.length > 100 && p.length <= MAX_PHOTO_B64)
        .map((p) => p.replace(/^data:image\/\w+;base64,/, ''))
        .slice(0, MAX_PHOTOS)
    : [];

  if (!text.trim() && !photos.length) return res.status(200).json({ ok: false, reason: 'empty' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(200).json({ ok: false, reason: 'ai_unavailable' });

  try {
    const ai = await classifyJob({ text, photos, config, timeoutMs: 15000 });
    return res.status(200).json({ ok: true, ai });
  } catch (err) {
    console.error('estimate: ai failed', err?.name, err?.status, err?.message);
    return res.status(200).json({ ok: false, reason: 'ai_failed' });
  }
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
