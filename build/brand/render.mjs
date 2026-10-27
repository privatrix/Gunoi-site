// Renders the site icons and share images from the SVG/HTML sources in this folder.
// Needs Playwright with Chromium (dev only): node build/brand/render.mjs
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = createRequire('/opt/node22/lib/node_modules/')('playwright'); }

const here = fileURLToPath(new URL('.', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));

// [source svg, size, output (relative to repo root), background]
const ICONS = [
  ['favicon.svg', 16, 'favicon-16.png'],
  ['favicon.svg', 32, 'favicon-32.png'],
  ['favicon.svg', 48, 'favicon-48.png'],
  ['sticker.svg', 180, 'apple-touch-icon.png', '#F4F0E6'],
  ['sticker.svg', 192, 'favicon-192.png'],
  ['sticker.svg', 512, 'favicon-512.png'],
  ['sticker.svg', 512, 'logo.png', '#F4F0E6'],
  ['maskable.svg', 512, 'favicon-maskable-512.png'],
];

const browser = await playwright.chromium.launch();
for (const [svg, size, out, bg] of ICONS) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const src = readFileSync(here + svg, 'utf8').replace('<svg ', `<svg width="${size}" height="${size}" `);
  await page.setContent(`<body style="margin:0;background:${bg || 'transparent'}">${src}</body>`);
  await page.screenshot({ path: root + out, omitBackground: !bg, clip: { x: 0, y: 0, width: size, height: size } });
  await page.close();
}
for (const lang of ['ro', 'ru']) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`file://${here}og.html?lang=${lang}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${root}og-${lang}.png` });
  await page.close();
}
await browser.close();

// favicon.ico with 16, 32 and 48 px PNG images inside
const pngs = [16, 32, 48].map((s) => [s, readFileSync(`${root}favicon-${s}.png`)]);
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach(([s, buf], i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e); header.writeUInt8(s, e + 1); header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(buf.length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += buf.length;
});
writeFileSync(root + 'favicon.ico', Buffer.concat([header, ...pngs.map(([, b]) => b)]));
writeFileSync(root + 'favicon.svg', readFileSync(here + 'favicon.svg'));
console.log('icons, favicon.ico and og-{ro,ru}.png written');
