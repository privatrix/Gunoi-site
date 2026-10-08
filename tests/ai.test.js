import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cleanOutput, outputSchema } from '../lib/ai/classify.js';
import { classifyJob } from '../lib/ai/index.js';
import handler from '../api/estimate.js';

const config = JSON.parse(readFileSync(new URL('../pricing.config.json', import.meta.url), 'utf8'));

const sample = {
  items: [
    { key: 'canapea', name: 'canapea', qty: 1, approx_m3: 1.5, needs_dismantling: false, notes: '' },
    { key: 'pian', name: 'pian', qty: 1, approx_m3: 2, needs_dismantling: true, notes: '' },
    { key: 'scaun', name: 'scaune', qty: 4, approx_m3: 0.15, needs_dismantling: true, notes: '' },
    { key: 'sac_moloz', name: 'saci', qty: 0, approx_m3: 0.05, needs_dismantling: false, notes: '' },
  ],
  total_m3_estimate: 4.1,
  confidence: 'med',
  unclear: ['nu se vede balconul'],
  language: 'ro',
};

test('cleanOutput: chei necunoscute → altceva, qty 0 eliminat, demontare doar unde există clasă', () => {
  const out = cleanOutput(sample, config);
  assert.deepEqual(out.items.map((i) => i.key), ['canapea', 'altceva', 'scaun']);
  assert.equal(out.items.find((i) => i.key === 'scaun').dismantle, false);
  assert.equal(out.confidence, 'med');
  assert.equal(cleanOutput({ nope: 1 }, config), null);
});

test('schema: strictă, cu enum din catalog', () => {
  const s = outputSchema(config);
  assert.equal(s.additionalProperties, false);
  assert.ok(s.properties.items.items.properties.key.enum.includes('stenca'));
  assert.ok(!s.properties.items.items.properties.key.enum.includes('_note'));
});

test('adaptorul Anthropic trimite poze + text cu schemă JSON și fără temperature', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key';
  let sent;
  const fakeFetch = async (url, init) => {
    sent = { url: String(url), headers: new Headers(init.headers), body: JSON.parse(init.body) };
    return new Response(JSON.stringify({
      id: 'msg_1', type: 'message', role: 'assistant', model: 'claude-opus-5-5',
      stop_reason: 'end_turn', stop_sequence: null,
      usage: { input_tokens: 10, output_tokens: 10 },
      content: [{ type: 'text', text: JSON.stringify(sample) }],
    }), { status: 200, headers: { 'content-type': 'application/json' } });
  };

  const out = await classifyJob({ text: 'o canapea și scaune', photos: ['A'.repeat(200)], config, fetch: fakeFetch });

  assert.match(sent.url, /\/v1\/messages/);
  assert.match(sent.headers.get('anthropic-beta'), /server-side-fallback-2026-07-01/);
  assert.equal(sent.body.model, 'claude-opus-5-5');
  assert.equal(sent.body.fallbacks, 'default');
  assert.equal(sent.body.output_config.format.type, 'json_schema');
  assert.equal(sent.body.output_config.effort, 'low');
  assert.equal(sent.body.temperature, undefined);
  assert.equal(sent.body.messages[0].content[0].type, 'image');
  assert.match(sent.body.messages[0].content.at(-1).text, /<description>/);
  assert.equal(out.items.length, 3);
});

test('adaptorul aruncă eroare la refuz (pagina trece pe lista bifată)', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key';
  const fakeFetch = async () => new Response(JSON.stringify({
    id: 'msg_2', type: 'message', role: 'assistant', model: 'claude-opus-5-5',
    stop_reason: 'refusal', stop_sequence: null, usage: { input_tokens: 1, output_tokens: 0 }, content: [],
  }), { status: 200, headers: { 'content-type': 'application/json' } });
  await assert.rejects(classifyJob({ text: 'x', photos: [], config, fetch: fakeFetch }), /refusal/);
});

function mockRes() {
  const res = { statusCode: 200, headers: {}, body: null };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  return res;
}

test('API: GET → 405, corp gol → empty, fără cheie → ai_unavailable', async () => {
  let res = mockRes();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.statusCode, 405);

  res = mockRes();
  await handler({ method: 'POST', headers: { 'x-forwarded-for': '1.1.1.1' }, body: {} }, res);
  assert.equal(res.body.reason, 'empty');

  const saved = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  res = mockRes();
  await handler({ method: 'POST', headers: { 'x-forwarded-for': '1.1.1.2' }, body: { text: 'o canapea' } }, res);
  assert.equal(res.body.reason, 'ai_unavailable');
  process.env.ANTHROPIC_API_KEY = saved;
});

test('API: limită per IP', async () => {
  delete process.env.ANTHROPIC_API_KEY;
  let last;
  for (let i = 0; i < 10; i++) {
    last = mockRes();
    await handler({ method: 'POST', headers: { 'x-forwarded-for': '9.9.9.9' }, body: { text: 'x' } }, last);
  }
  assert.equal(last.statusCode, 429);
});
