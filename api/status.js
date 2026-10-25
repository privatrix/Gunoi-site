/* GET /api/status — is photo analysis set up? Never reveals the key.
 * Checks the key with a free Models API call (no tokens billed). */
import Anthropic from '@anthropic-ai/sdk';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5-5';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const out = { photo_analysis: 'off', model: MODEL };

  if (!process.env.ANTHROPIC_API_KEY) {
    out.problem = 'ANTHROPIC_API_KEY is not set in Vercel (check the exact variable name, then redeploy)';
    return res.status(200).json(out);
  }
  try {
    const client = new Anthropic({ timeout: 8000, maxRetries: 0 });
    await client.models.retrieve(MODEL);
    out.photo_analysis = 'on';
  } catch (err) {
    out.problem = err instanceof Anthropic.AuthenticationError ? 'key rejected by Anthropic (wrong or revoked key)'
      : err instanceof Anthropic.PermissionDeniedError ? 'key has no access to this model'
      : err instanceof Anthropic.NotFoundError ? 'model not available to this key'
      : 'could not reach Anthropic: ' + (err?.status || err?.name || 'error');
  }
  return res.status(200).json(out);
}
