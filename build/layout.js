// Page shell: <head>, header, footer, mobile action bar, structured data.
import { readFileSync } from 'node:fs';
import { icons } from './icons.js';
import { href, group, LANGS } from './registry.js';
import {
  SITE, PHONE, PHONE_LABEL, EMAIL, GA_ID, AHREFS_KEY, config, esc, plain, waLink, priceOf,
} from './lib.js';

const CSS = readFileSync(new URL('../assets/site.css', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*/g, '\n').trim();
const PRELOAD = { ro: ['unbounded-800-lat', 'onest-400-lat'], ru: ['unbounded-800-cyr', 'onest-400-cyr'] };
const OG_LOCALE = { ro: 'ro_MD', ru: 'ru_MD' };

export function business(lang, t) {
  const zones = config.distance.free_zones;
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#business`,
    name: 'gunoi.md',
    alternateName: t.c.businessAlt,
    description: plain(t.c.businessDesc),
    url: `${SITE}${href('home', lang)}`,
    telephone: '+373' + PHONE.slice(1),
    email: EMAIL,
    image: `${SITE}/og-image.svg`,
    address: { '@type': 'PostalAddress', addressLocality: t.c.city, addressCountry: 'MD' },
    areaServed: [{ '@type': 'City', name: t.c.city }, ...zones.slice(5).map((z) => ({ '@type': 'Place', name: z }))],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00', closes: '20:00',
    }],
    priceRange: `${config.minimum_total.price}–${priceOf('apartament').high} MDL`,
    currenciesAccepted: 'MDL',
    paymentAccepted: t.c.paymentAccepted,
  };
}

function header(ctx) {
  const { lang, t, page } = ctx;
  const nav = t.c.nav.map(([id, label]) => {
    const current = id === page.id ? ' aria-current="page"' : '';
    return `<a href="${href(id, lang)}"${current}>${esc(label)}</a>`;
  }).join('');
  const langs = LANGS.map((l) => `<a href="${page[l]}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  return `<a class="skip" href="#main">${esc(t.c.skip)}</a>
<header class="site-header">
  <div class="wrap">
    <a class="logo" href="${href('home', lang)}" aria-label="gunoi.md — ${esc(t.c.home)}"><b>gunoi</b><span>.md</span></a>
    <nav class="nav" aria-label="${esc(t.c.navLabel)}">${nav}</nav>
    <div class="header-right">
      <div class="lang" role="navigation" aria-label="${esc(t.c.langLabel)}">${langs}</div>
      <a class="btn btn-yellow header-phone" href="tel:${PHONE}">${icons.phone}${PHONE_LABEL}</a>
      <a class="header-call" href="tel:${PHONE}" aria-label="${esc(t.c.call)} ${PHONE_LABEL}">${icons.phone}</a>
    </div>
  </div>
</header>`;
}

function footer(ctx) {
  const { lang, t } = ctx;
  const li = (id) => `<li><a href="${href(id, lang)}">${esc(t.pages[id].navName || t.pages[id].crumb)}</a></li>`;
  const other = LANGS.find((l) => l !== lang);
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="logo" href="${href('home', lang)}"><b>gunoi</b><span>.md</span></a>
        <p style="margin-top:14px;max-width:320px">${t.c.footerTagline}</p>
        <a class="foot-phone" href="tel:${PHONE}">${PHONE_LABEL}</a>
        <p style="margin:0">${esc(t.c.hours)}</p>
      </div>
      <div><p class="foot-title">${esc(t.c.footServices)}</p><ul>${[...group('service'), ...group('item')].map((p) => li(p.id)).join('')}</ul></div>
      <div><p class="foot-title">${esc(t.c.footZones)}</p><ul>${group('sector').map((p) => li(p.id)).join('')}</ul></div>
      <div><p class="foot-title">${esc(t.c.footInfo)}</p><ul>${['estimare', 'preturi', 'diaspora', 'despre', 'contact'].map(li).join('')}
        <li><a href="${ctx.page[other]}" hreflang="${other}" lang="${other}">${esc(t.c.otherLang)}</a></li></ul></div>
    </div>
    <div class="foot-bottom"><span>© ${new Date().getFullYear()} gunoi.md · ${esc(t.c.rights)}</span><span>${esc(t.c.footNote)}</span></div>
  </div>
</footer>`;
}

function actionBar(ctx, hasEstimator) {
  const { lang, t } = ctx;
  const priceHref = hasEstimator ? '#estimator' : href('estimare', lang);
  return `<nav class="action-bar" aria-label="${esc(t.c.quickLabel)}">
  <a class="ab-call" href="tel:${PHONE}">${icons.phone}<span>${esc(t.c.call)}</span></a>
  <a class="ab-wa" href="${waLink(t.c.waHello)}" target="_blank" rel="noopener">${icons.whatsapp}<span>WhatsApp</span></a>
  <a class="ab-price" href="${priceHref}" data-goto-estimator>${icons.camera}<span>${esc(t.c.priceFromPhoto)}</span></a>
</nav>`;
}

/**
 * @param ctx  { lang, t, page }
 * @param o    { title, desc, body, crumbs?: [[label, id?]], graph?: [], estimator?: bool }
 */
export function layout(ctx, o) {
  const { lang, t, page } = ctx;
  const url = SITE + page[lang];
  const crumbs = o.crumbs || [];
  const graph = [
    business(lang, t),
    {
      '@type': 'WebPage', '@id': url, url, name: plain(o.title), description: plain(o.desc),
      inLanguage: lang, isPartOf: { '@type': 'WebSite', name: 'gunoi.md', url: SITE + '/' },
      about: { '@id': `${SITE}/#business` },
    },
  ];
  if (crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [[t.c.home, 'home'], ...crumbs].map(([name, id], i) => ({
        '@type': 'ListItem', position: i + 1, name: plain(name),
        item: SITE + (id ? href(id, lang) : page[lang]),
      })),
    });
  }
  graph.push(...(o.graph || []));

  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${page[l]}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${SITE}${page.ro}">`;

  const crumbHtml = crumbs.length
    ? `<ol class="crumbs"><li><a href="${href('home', lang)}">${esc(t.c.home)}</a></li>${crumbs.map(([name, id]) =>
        id ? `<li><a href="${href(id, lang)}">${esc(name)}</a></li>` : `<li aria-current="page">${esc(name)}</li>`).join('')}</ol>`
    : '';

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(plain(o.title))}</title>
<meta name="description" content="${esc(plain(o.desc))}">
<link rel="canonical" href="${url}">
${alternates}
<meta property="og:type" content="website">
<meta property="og:site_name" content="gunoi.md">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(plain(o.ogTitle || o.title))}">
<meta property="og:description" content="${esc(plain(o.desc))}">
<meta property="og:locale" content="${OG_LOCALE[lang]}">
<meta property="og:image" content="${SITE}/og-image.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFD400">
<meta name="referrer" content="strict-origin-when-cross-origin">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${PRELOAD[lang].map((f) => `<link rel="preload" href="/assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join('\n')}
<style>${CSS}</style>
${o.estimator ? '<noscript><style>.est-js-only{display:none}</style></noscript>\n' : ''}${o.estimator ? '<link rel="modulepreload" href="/lib/estimate.js">\n' : ''}<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script src="https://analytics.ahrefs.com/analytics.js" data-key="${AHREFS_KEY}" async></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body>
${header(ctx)}
<main id="main">
${crumbHtml ? `<div class="wrap" style="padding-top:22px">${crumbHtml}</div>` : ''}
${o.body}
</main>
${footer(ctx)}
${actionBar(ctx, o.estimator)}
<script src="/assets/main.js" defer></script>
${o.estimator ? '<script type="module" src="/assets/estimator.js"></script>\n' : ''}</body>
</html>
`;
}
