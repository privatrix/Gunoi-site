/* Anthropic adapter for the classifier. Swap providers by adding a sibling file
 * with the same classify() signature and pointing lib/ai/index.js at it. */
import Anthropic from '@anthropic-ai/sdk';
import { outputSchema, systemPrompt, userContent } from './classify.js';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5-5';

/**
 * @param {{ text: string, photos: string[], config: object, timeoutMs: number, fetch?: Function }} opts
 *   photos: base64 JPEG strings (no data: prefix)
 * @returns {Promise<object>} raw model JSON (validate with cleanOutput)
 */
export async function classify({ text, photos, config, timeoutMs, fetch }) {
  const client = new Anthropic({
    timeout: timeoutMs,
    maxRetries: 0, // one attempt: the page falls back to the quick-pick list instead of waiting
    ...(fetch ? { fetch } : {}),
  });

  const content = [
    ...photos.map((data) => ({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data },
    })),
    { type: 'text', text: userContent({ text, photoCount: photos.length }) },
  ];

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 4000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: {
      effort: 'low',
      format: { type: 'json_schema', schema: outputSchema(config) },
    },
    system: systemPrompt(config),
    messages: [{ role: 'user', content }],
  });

  if (response.stop_reason === 'refusal') throw new Error('refusal');
  if (response.stop_reason === 'max_tokens') throw new Error('truncated');
  const block = response.content.find((b) => b.type === 'text');
  if (!block) throw new Error('no_text');
  return JSON.parse(block.text);
}
