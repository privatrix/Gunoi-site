// Generates every page (RO + RU), sitemap.xml and llms.txt from
// build/content/*.js and pricing.config.json. Run: npm run build
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, LANGS, href } from './registry.js';
import { TEMPLATES } from './templates.js';
import { SITE, PHONE_LABEL, EMAIL, WA, fillAll, plain, band, config } from './lib.js';
import ro from './content/ro.js';
import ru from './content/ru.js';

const CONTENT = { ro: fillAll(ro, 'ro'), ru: fillAll(ru, 'ru') };

export function renderAll() {
  const files = new Map();
  for (const page of PAGES) {
    for (const lang of LANGS) {
      const t = CONTENT[lang];
      if (!t.pages[page.id]) throw new Error(`missing content: ${lang}.pages.${page.id}`);
      const html = TEMPLATES[page.tpl]({ lang, t, page });
      files.set(join(page[lang].slice(1), 'index.html'), html);
    }
  }
  files.set('sitemap.xml', sitemap());
  files.set('llms.txt', llms());
  return files;
}

function sitemap() {
  const urls = PAGES.flatMap((page) => LANGS.map((lang) => `  <url>
    <loc>${SITE}${page[lang]}</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${page[l]}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${page.ro}"/>
    <priority>${page.priority || (page.group === 'service' ? '0.8' : '0.6')}</priority>
  </url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

function llms() {
  const t = CONTENT.ro;
  const L = t.llms;
  const link = (id) => `- [${plain(t.pages[id].crumb)}](${SITE}${href(id, 'ro')}): ${plain(t.pages[id].desc)}`;
  return `# gunoi.md

> ${plain(L.summary)}

${plain(L.intro)}

## Preț
${L.prices.map(([label, ex]) => `- ${label}: ${band(ex, 'ro')}`).join('\n')}
- ${plain(L.priceNote)}
- Estimare instantă din poze: ${SITE}${href('estimare', 'ro')}

## Pagini
${PAGES.filter((p) => p.id !== 'home').map((p) => link(p.id)).join('\n')}

## Contact
- Telefon: ${PHONE_LABEL}
- WhatsApp: https://wa.me/${WA}
- Email: ${EMAIL}
- Program: luni–duminică, 08:00–20:00
- Plata: la final, cash sau transfer; fără avans; bon fiscal

## Zone
Chișinău (Botanica, Buiucani, Centru, Ciocana, Râșcani) și suburbiile ${config.distance.free_zones.slice(5).join(', ')} fără taxă de deplasare. Alte localități: taxă de deplasare după distanță.

## Nu preluăm
${plain(t.c.notTaken)}

## Limbi
Română: ${SITE}/ · Русский: ${SITE}/ru/
`;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const files = renderAll();
  for (const [rel, data] of files) {
    const out = join(root, rel);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, data);
  }
  console.log(`built ${files.size} files`);
}
