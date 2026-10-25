/* Single entry point for the AI step. Pick the provider here. */
import { classify as anthropic } from './anthropic.js';
import { cleanOutput } from './classify.js';

const PROVIDERS = { anthropic };

export async function classifyJob({ text, photos, config, timeoutMs = 15000, fetch }) {
  const provider = PROVIDERS[process.env.AI_PROVIDER || 'anthropic'];
  const raw = await provider({ text, photos, config, timeoutMs, fetch });
  const out = cleanOutput(raw, config);
  if (!out) throw new Error('bad_output');
  return out;
}
