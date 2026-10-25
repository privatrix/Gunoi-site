/* POST /api/estimate — classify photos/text into catalogue items.
 * Body: { text?: string, photos?: string[] (base64 JPEG, ≤5), lang?: 'ro'|'ru' }
 * 200 { ok: true, ai: { items, totalM3, confidence, unclear, language } }
 * 200 { ok: false, reason }  → the page falls back to the items the user ticked.
 * Prices are never computed here; the page prices with lib/estimate.js. */
import { readFileSync } from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';
import { classifyJob } from '../lib/ai/index.js';

const config = JSON.parse(readFileSync(new URL('../pricing.config.json', import.meta.url), 'utf8'));

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
  const picks = Array.isArray(body.picks)
    ? [...new Set(body.picks.filter((k) => typeof k === 'string' && !k.startsWith('_') && config.items[k]))].slice(0, 40)
    : [];

  if (!text.trim() && !photos.length) return res.status(200).json({ ok: false, reason: 'empty' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(200).json({ ok: false, reason: 'ai_unavailable' });

  try {
    const ai = await classifyJob({ text, photos, picks, config, timeoutMs: 15000 });
    return res.status(200).json({ ok: true, ai });
  } catch (err) {
    console.error('estimate: ai failed', err?.name, err?.status, err?.message);
    return res.status(200).json({ ok: false, reason: failureReason(err) });
  }
}

// Short, non-secret codes shown on the page so setup problems can be diagnosed.
function failureReason(err) {
  if (err instanceof Anthropic.APIConnectionTimeoutError) return 'ai_timeout';
  if (err instanceof Anthropic.AuthenticationError) return 'ai_auth';
  if (err instanceof Anthropic.PermissionDeniedError) return 'ai_permission';
  if (err instanceof Anthropic.NotFoundError) return 'ai_model';
  if (err instanceof Anthropic.RateLimitError) return 'ai_rate';
  if (err instanceof Anthropic.BadRequestError) return /credit|billing|balance/i.test(err.message) ? 'ai_credit' : 'ai_bad_request';
  if (err instanceof Anthropic.APIConnectionError) return 'ai_network';
  if (err instanceof Anthropic.APIError) return 'ai_server_' + (err.status || '');
  if (err?.message === 'refusal') return 'ai_refusal';
  return 'ai_failed';
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
