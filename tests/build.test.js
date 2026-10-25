import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { renderAll } from '../build/build.js';
import { PAGES, LANGS } from '../build/registry.js';

const root = new URL('../', import.meta.url);
const files = renderAll();
const pages = [...files].filter(([f]) => f.endsWith('.html'));
const noYear = (s) => s.replace(/© \d{4}/g, '©');

test('fișierele generate sunt la zi (rulează npm run generate)', () => {
  for (const [rel, html] of files) {
    const onDisk = existsSync(new URL(rel, root)) ? readFileSync(new URL(rel, root), 'utf8') : '';
    assert.equal(noYear(onDisk), noYear(html), `${rel} is stale — run npm run generate`);
  }
});

test('fiecare pagină există în RO și RU, cu canonical și hreflang', () => {
  assert.equal(pages.length, PAGES.length * LANGS.length);
  for (const [rel, html] of pages) {
    assert.match(html, /<link rel="canonical" href="https:\/\/www\.gunoi\.md\//, rel);
    for (const l of [...LANGS, 'x-default']) assert.match(html, new RegExp(`hreflang="${l}"`), `${rel} hreflang ${l}`);
    assert.match(html, /<title>[^<]{10,}<\/title>/, rel);
    assert.match(html, /<meta name="description" content="[^"]{50,}"/, rel);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${rel} must have exactly one h1`);
  }
});

test('JSON-LD valid pe fiecare pagină', () => {
  for (const [rel, html] of pages) {
    const m = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    assert.ok(m, rel);
    const data = JSON.parse(m[1]);
    assert.ok(data['@graph'].some((n) => n['@type'] === 'LocalBusiness'), rel);
  }
});

test('nu rămân placeholdere sau valori lipsă', () => {
  for (const [rel, html] of files) {
    assert.doesNotMatch(html, /undefined|NaN|\{(band|low|high|item|money|num):/, rel);
  }
});

test('toate linkurile interne duc la pagini existente', () => {
  const known = new Set(PAGES.flatMap((p) => LANGS.map((l) => p[l])));
  for (const [rel, html] of pages) {
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (/\.(css|js|svg|png|ico|jpg|json|webmanifest|woff2)$/.test(href)) {
        assert.ok(existsSync(new URL('.' + href, root)), `${rel}: missing asset ${href}`);
      } else {
        assert.ok(known.has(href), `${rel}: broken link ${href}`);
      }
    }
  }
});

test('niciun preț scris de mână în conținut', () => {
  for (const f of ['build/content/ro.js', 'build/content/ru.js']) {
    const src = readFileSync(new URL(f, root), 'utf8');
    const hit = src.match(/\d[\d  .]*\s?(lei|MDL|лей)\b/);
    assert.equal(hit, null, `${f} has a hard-coded price: "${hit?.[0]}"`);
  }
});

test('paginile RU sunt în rusă (fără text românesc rătăcit în h1)', () => {
  for (const [rel, html] of pages.filter(([r]) => r.startsWith('ru/'))) {
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1];
    assert.match(h1, /[а-яё]/i, `${rel} h1 is not Russian: ${h1}`);
  }
});

test('fontul de mână (Caveat) conține toate literele notițelor', async () => {
  const have = new Set(readFileSync(new URL('assets/fonts/caveat-700-notes.txt', root), 'utf8'));
  const { default: ro } = await import('../build/content/ro.js');
  const { default: ru } = await import('../build/content/ru.js');
  for (const c of [ro, ru]) {
    for (const ch of c.pages.home.tryNote + c.pages.home.crew.caption) {
      assert.ok(have.has(ch), `Caveat subset is missing "${ch}" — regenerate it (build/fonts.md)`);
    }
  }
});
