// Page templates. Content comes from build/content/{ro,ru}.js, prices from lib.js.
import { icons } from './icons.js';
import { href, group, byId } from './registry.js';
import { layout } from './layout.js';
import {
  SITE, PHONE, PHONE_LABEL, EMAIL, config, esc, plain, waLink, priceOf, band, money, num, fill,
} from './lib.js';

// ---------- blocks ----------
const tick = (txt) => `<li>${icons.check}<span>${txt}</span></li>`;
const ticks = (list) => `<ul class="ticks">${list.map(tick).join('')}</ul>`;

function stickers(t) {
  return `<ul class="stickers">${t.c.stickers.map((s) => `<li class="sticker">${s}</li>`).join('')}</ul>`;
}

function noTake(t) {
  return `<p class="no-take">${icons.cross}<span>${t.c.notTaken}</span></p>`;
}

// Quick-pick chips on step 1 of the estimator (catalogue keys).
const QUICK = ['canapea', 'saltea', 'dulap', 'stenca', 'pat', 'masa', 'frigider', 'masina_spalat', 'aragaz', 'tv',
  'fereastra', 'usa', 'covor', 'sac_moloz', 'tapet', 'sac_menajer', 'borcane', 'crengi', 'fier', 'altceva'];

/**
 * Estimator mount point. Step 1 is rendered here so it is on screen at first paint
 * (no layout shift); assets/estimator.js takes it over and renders steps 2–4.
 */
function estimator(ctx, { preselect = [], zone = '' } = {}) {
  const { lang, t } = ctx;
  const e = t.c.est;
  const chips = QUICK.map((k) => `<button type="button" class="est-chip" data-key="${k}" aria-pressed="${preselect.includes(k)}">${esc(config.items[k][lang])}</button>`).join('');
  return `<div id="estimator" class="est"${zone ? ` data-zone="${esc(zone)}"` : ''}>
  <div class="est-shell est-js-only" data-step="1">
    <div class="est-top"><p class="est-step">${esc(e.progress)}</p><div class="est-dots" aria-hidden="true"><span class="on"></span><span></span><span></span><span></span></div></div>
    <h2>${esc(e.s1)}</h2>
    <p class="est-sub">${esc(e.s1sub)}</p>
    <input type="file" accept="image/*" multiple hidden data-est="file">
    <button type="button" class="est-viewfinder" data-est="shoot">${icons.camera}<span>${esc(e.shoot)}</span><small>${esc(e.shootSub)}</small></button>
    <div class="est-photos" data-est="photos"></div>
    <button type="button" class="est-more" data-est="more" hidden>${esc(e.morePhotos)}</button>
    <p class="est-label">${esc(e.chipsLabel)}</p>
    <div class="est-chips">${chips}</div>
    <details class="est-write"><summary>${esc(e.write)}</summary><textarea rows="3" placeholder="${esc(e.textPh)}" aria-label="${esc(e.write)}" data-est="text"></textarea></details>
    <p class="est-error" role="alert" hidden data-est="err"></p>
    <div class="est-nav"><button type="button" class="btn btn-yellow" data-est="next">${esc(e.next)} →</button></div>
  </div>
  <noscript><div class="est-shell est-fallback">
    <h2>${esc(t.c.noJsTitle)}</h2><p class="est-sub">${esc(t.c.noJsText)}</p>
    <a class="btn btn-wa" href="${waLink(t.c.waHello)}">${icons.whatsapp}WhatsApp</a>
    <a class="btn btn-yellow" href="tel:${PHONE}">${icons.phone}${PHONE_LABEL}</a>
  </div></noscript>
</div>`;
}

/** Thermal-receipt price list. rows: [label, exampleKey, linkPageId?] */
function receipt(ctx, { title, sub, rows, foot, tilt = true }) {
  const { lang } = ctx;
  const r = rows.map(([label, ex, link]) => {
    const name = link ? `<a href="${href(link, lang)}">${label}</a>` : label;
    return `<li class="rc-row"><span>${name}</span><i></i><b>${band(ex, lang)}</b></li>`;
  }).join('');
  return `<div class="receipt${tilt ? ' receipt-tilt' : ''}">
  <div class="rc-head"><strong>${title}</strong>${sub ? `<small>${sub}</small>` : ''}</div>
  <ul class="rc-rows">${r}</ul>
  ${foot ? `<div class="rc-foot">${foot.map((f) => `<p>${f}</p>`).join('')}</div>` : ''}
</div>`;
}

function faq(items) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><div class="faq-a"><p>${a}</p></div></details>`).join('')}</div>`;
}
const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
});

function ctaFinal(ctx, { photo = true } = {}) {
  const { lang, t } = ctx;
  const c = t.c.cta;
  return `<section class="section bg-ink cta-final">
  <div class="wrap">
    <p class="kicker">${c.kicker}</p>
    <h2>${c.title}</h2>
    <a class="cta-phone" href="tel:${PHONE}">${PHONE_LABEL}</a>
    <p class="lede" style="margin:0">${c.sub}</p>
    <div class="cta-row">
      <a class="btn btn-wa" href="${waLink(t.c.waHello)}" target="_blank" rel="noopener">${icons.whatsapp}${esc(c.wa)}</a>
      ${photo ? `<a class="btn btn-yellow" href="${href('estimare', lang)}">${icons.camera}${esc(c.photo)}</a>` : ''}
    </div>
  </div>
</section>`;
}

function ticker(ctx) {
  const { lang, t } = ctx;
  const lis = t.c.ticker.map(([label, ex]) => `<li>${label} ${band(ex, lang)}</li>`).join('');
  return `<div class="ticker" role="region" aria-label="${esc(t.c.tickerLabel)}"><div class="ticker-track"><ul>${lis}</ul><ul aria-hidden="true">${lis}</ul></div></div>`;
}

function serviceCards(ctx, ids, cls = 'cards cards-4') {
  const { lang, t } = ctx;
  return `<div class="${cls}">${ids.map((id) => {
    const p = t.pages[id];
    const ic = byId[id].icon ? icons[byId[id].icon].replace('<svg', '<svg class="card-ic"') : '';
    return `<a class="card" href="${href(id, lang)}">${ic}<h3>${p.cardTitle || p.crumb}</h3><p>${p.cardText}</p>${p.cardPrice ? `<span class="price-line">${p.cardPrice}</span>` : ''}</a>`;
  }).join('')}</div>`;
}

function zoneChips(ctx) {
  const { lang, t } = ctx;
  const sectorLinks = group('sector').map((p) => `<li><a href="${href(p.id, lang)}">${esc(t.pages[p.id].zoneName)}</a></li>`).join('');
  const suburbs = config.distance.free_zones.slice(5).map((z) => `<li><span class="soft">${esc(t.c.zoneNames?.[z] || z)}</span></li>`).join('');
  return `<ul class="chips" style="margin-bottom:12px">${sectorLinks}</ul><ul class="chips">${suburbs}</ul>`;
}

// ---------- pages ----------
export function home(ctx) {
  const { lang, t } = ctx;
  const p = t.pages.home;
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker">${p.kicker}</p>
      <h1>${p.h1}</h1>
      <p class="lede">${p.lede}</p>
      ${stickers(t)}
    </div>
    <div class="hero-tool">
      <p class="try-note hand">${esc(p.tryNote)}${icons.scribbleArrow}</p>
      ${estimator(ctx)}
    </div>
  </div>
</section>
${ticker(ctx)}

<section class="section" id="cum">
  <div class="wrap">
    <div class="section-head reveal"><p class="kicker">${p.steps.kicker}</p><h2>${p.steps.title}</h2></div>
    <ol class="steps reveal">${p.steps.items.map(([h, d]) => `<li class="step"><h3>${h}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section bg-2" id="preturi">
  <div class="wrap split">
    <div class="prose reveal">
      <p class="kicker">${p.prices.kicker}</p>
      <h2>${p.prices.title}</h2>
      ${p.prices.text.map((x) => `<p>${x}</p>`).join('')}
      ${ticks(p.prices.included)}
      <p><a class="link-arrow" href="${href('preturi', lang)}">${esc(p.prices.link)} →</a></p>
    </div>
    <div class="reveal">${receipt(ctx, p.prices.receipt)}</div>
  </div>
</section>

<section class="section" id="ce-ridicam">
  <div class="wrap">
    <div class="section-head reveal"><p class="kicker">${p.items.kicker}</p><h2>${p.items.title}</h2></div>
    <p class="items-cloud reveal">${p.items.words.map(([w, id], i, all) => `<span class="w">${id ? `<a href="${href(id, lang)}">${w}</a>` : w}${i < all.length - 1 ? '\u00a0<span class="sep">/</span>' : ''}</span>`).join(' ')}</p>
    <div style="margin-top:28px">${noTake(t)}</div>
    <div style="margin-top:44px" class="reveal">${serviceCards(ctx, group('service').map((x) => x.id))}</div>
  </div>
</section>

<section class="section bg-2">
  <div class="wrap split">
    <figure class="photo-taped reveal" style="margin:0 auto">
      <img src="/echipa.jpg" alt="${esc(p.crew.alt)}" width="1024" height="768" loading="lazy" decoding="async">
      <figcaption class="hand">${esc(p.crew.caption)}</figcaption>
    </figure>
    <div class="prose reveal">
      <p class="kicker">${p.crew.kicker}</p>
      <h2>${p.crew.title}</h2>
      ${p.crew.text.map((x) => `<p>${x}</p>`).join('')}
      ${ticks(p.crew.ticks)}
    </div>
  </div>
</section>

<section class="section bg-yellow on-yellow" id="diaspora">
  <div class="wrap">
    <div class="section-head reveal"><p class="kicker">${p.diaspora.kicker}</p><h2>${p.diaspora.title}</h2><p class="lede" style="color:var(--ink)">${p.diaspora.text}</p></div>
    <ol class="route reveal">${p.diaspora.route.map((x, i) => `<li><small>${String(i + 1).padStart(2, '0')}</small>${x}</li>`).join('')}</ol>
    <p style="margin-top:28px"><a class="btn" href="${href('diaspora', lang)}">${icons.plane}${esc(p.diaspora.btn)}</a></p>
  </div>
</section>

<section class="section" id="zone">
  <div class="wrap">
    <div class="section-head reveal"><p class="kicker">${p.zones.kicker}</p><h2>${p.zones.title}</h2><p class="lede">${p.zones.text}</p></div>
    <div class="reveal">${zoneChips(ctx)}</div>
  </div>
</section>

<section class="section bg-2" id="intrebari">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${p.faq.kicker}</p><h2>${p.faq.title}</h2></div>
    ${faq(p.faq.items)}
  </div>
</section>
${ctaFinal(ctx, { photo: false })}`;
  return layout(ctx, { title: p.title, desc: p.desc, body, estimator: true, graph: [faqSchema(p.faq.items)] });
}

export function estimare(ctx) {
  const { t } = ctx;
  const p = t.pages.estimare;
  const body = `
<section class="page-hero" style="padding-bottom:20px">
  <div class="wrap" style="max-width:760px">
    <h1>${p.h1}</h1>
    <p class="answer">${p.answer}</p>
    ${stickers(t)}
  </div>
</section>
<section style="padding:8px 0 64px">
  <div class="wrap" style="max-width:760px">${estimator(ctx)}</div>
</section>
<section class="section bg-2">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${p.faq.kicker}</p><h2>${p.faq.title}</h2></div>
    ${faq(p.faq.items)}
  </div>
</section>
${ctaFinal(ctx, { photo: false })}`;
  return layout(ctx, { title: p.title, desc: p.desc, body, estimator: true, crumbs: [[p.crumb]], graph: [faqSchema(p.faq.items)] });
}

/** Service, item and sector pages. */
export function landing(ctx) {
  const { lang, t, page } = ctx;
  const p = t.pages[page.id];
  const offerBands = p.receipt.rows.map(([, ex]) => priceOf(ex));
  const service = {
    '@type': 'Service',
    name: plain(p.serviceName || p.h1),
    serviceType: plain(p.serviceType || p.h1),
    provider: { '@id': `${SITE}/#business` },
    areaServed: { '@type': 'City', name: t.c.city },
    offers: {
      '@type': 'AggregateOffer', priceCurrency: 'MDL',
      lowPrice: Math.min(...offerBands.map((b) => b.low)),
      highPrice: Math.max(...offerBands.map((b) => b.high)),
    },
  };
  const related = (p.related || []).filter((id) => id !== page.id);
  const body = `
<section class="page-hero">
  <div class="wrap split split-wide">
    <div>
      <p class="kicker">${p.kicker}</p>
      <h1>${p.h1}</h1>
      <p class="answer">${p.answer}</p>
      ${stickers(t)}
    </div>
    <div>${receipt(ctx, p.receipt)}</div>
  </div>
</section>

<section class="section bg-2" style="padding-top:56px">
  <div class="wrap" style="max-width:760px">
    <div class="section-head" style="margin-bottom:22px"><p class="kicker">${t.c.estKicker}</p><h2 style="font-size:clamp(26px,5vw,40px)">${p.estTitle || t.c.estTitle}</h2></div>
    ${estimator(ctx, { preselect: p.preselect || [], zone: p.zone || '' })}
  </div>
</section>

<section class="section">
  <div class="wrap split">
    ${p.sections.map((s) => `<div class="prose reveal"><h2 style="font-size:clamp(24px,4.4vw,36px)">${s.h}</h2>${(s.p || []).map((x) => `<p>${x}</p>`).join('')}${s.ticks ? ticks(s.ticks) : ''}</div>`).join('')}
  </div>
  <div class="wrap" style="margin-top:28px">${noTake(t)}</div>
</section>

<section class="section bg-2">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${t.c.faqKicker}</p><h2>${p.faqTitle || t.c.faqTitle}</h2></div>
    ${faq(p.faq)}
  </div>
</section>

${related.length ? `<section class="section">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${t.c.relatedKicker}</p><h2 style="font-size:clamp(24px,4.4vw,36px)">${t.c.relatedTitle}</h2></div>
    ${serviceCards(ctx, related, 'cards cards-3')}
  </div>
</section>` : ''}
${ctaFinal(ctx)}`;
  return layout(ctx, {
    title: p.title, desc: p.desc, body, estimator: true,
    crumbs: page.group === 'sector' ? [[t.c.zonesCrumb, 'home#zone'], [p.crumb]] : [[p.crumb]],
    graph: [service, faqSchema(p.faq)],
  });
}

export function preturi(ctx) {
  const { lang, t } = ctx;
  const p = t.pages.preturi;
  const cfg = config;
  const groups = p.groups.map(([title, keys]) => `
    <h3 style="margin:30px 0 8px">${title}</h3>
    <table class="price-table"><thead><tr><th>${esc(p.colItem)}</th><th>${esc(p.colPrice)}</th></tr></thead><tbody>
      ${keys.map((k) => `<tr><td>${esc(cfg.items[k][lang])}</td><td>${money(cfg.items[k].price, lang)}</td></tr>`).join('')}
    </tbody></table>`).join('');
  const D = cfg.dismantling.classes;
  const extras = [
    [p.extra.floor, `+${money(cfg.floor_no_lift.price_per_floor, lang)}`],
    ...p.extra.dismantle.map(([label, cls]) => [label, `+${money(D[cls].price, lang)}`]),
    ...cfg.distance.tiers.map((tier) => [fill(p.extra.distance, lang).replace('{from}', num(tier.from_km)).replace('{to}', num(tier.to_km)), `+${money(tier.price, lang)}`]),
    [fill(p.extra.far, lang), p.extra.farPrice],
    [p.extra.weekend, cfg.weekend.price ? `+${money(cfg.weekend.price, lang)}` : p.extra.weekendFree],
  ];
  const body = `
<section class="page-hero">
  <div class="wrap split split-wide">
    <div>
      <h1>${p.h1}</h1>
      <p class="answer">${p.answer}</p>
      <p><a class="btn btn-yellow" href="${href('estimare', lang)}">${icons.camera}${esc(p.photoBtn)}</a></p>
    </div>
    <div>${receipt(ctx, p.receipt)}</div>
  </div>
</section>

<section class="section bg-2">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${p.how.kicker}</p><h2>${p.how.title}</h2></div>
    <p class="formula reveal"><span>${p.how.f1}</span><em>+</em><span>${p.how.f2}</span><em>+</em><span>${p.how.f3}</span><em>=</em><span style="background:var(--yellow)">${p.how.f4}</span></p>
    <div class="prose" style="margin-top:26px">${p.how.text.map((x) => `<p>${x}</p>`).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="prose"><h2 style="font-size:clamp(24px,4.4vw,36px)">${p.itemsTitle}</h2><p>${p.itemsText}</p>${groups}</div>
    <div class="prose">
      <h2 style="font-size:clamp(24px,4.4vw,36px)">${p.extraTitle}</h2>
      <table class="price-table"><tbody>${extras.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table>
      <h3 style="margin-top:36px">${p.includedTitle}</h3>
      ${ticks(p.included)}
      ${noTake(t)}
    </div>
  </div>
</section>

<section class="section bg-2">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${t.c.faqKicker}</p><h2>${p.faqTitle}</h2></div>
    ${faq(p.faq)}
  </div>
</section>
${ctaFinal(ctx)}`;
  return layout(ctx, { title: p.title, desc: p.desc, body, crumbs: [[p.crumb]], graph: [faqSchema(p.faq)] });
}

export function diaspora(ctx) {
  const { t } = ctx;
  const p = t.pages.diaspora;
  const body = `
<section class="page-hero">
  <div class="wrap" style="max-width:900px">
    <p class="kicker">${p.kicker}</p>
    <h1>${p.h1}</h1>
    <p class="answer">${p.answer}</p>
    <div class="cta-row" style="max-width:640px">
      <a class="btn btn-wa" href="${waLink(p.waText)}" target="_blank" rel="noopener">${icons.whatsapp}${esc(p.waBtn)}</a>
      <a class="btn btn-paper" href="#estimator">${icons.camera}${esc(p.photoBtn)}</a>
    </div>
  </div>
</section>
<section class="section bg-yellow on-yellow">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${p.flow.kicker}</p><h2>${p.flow.title}</h2></div>
    <ol class="route">${p.flow.steps.map((x, i) => `<li><small>${String(i + 1).padStart(2, '0')}</small>${x}</li>`).join('')}</ol>
  </div>
</section>
<section class="section">
  <div class="wrap split">
    ${p.sections.map((s) => `<div class="prose reveal"><h2 style="font-size:clamp(24px,4.4vw,36px)">${s.h}</h2>${s.p.map((x) => `<p>${x}</p>`).join('')}${s.ticks ? ticks(s.ticks) : ''}</div>`).join('')}
  </div>
</section>
<section class="section bg-2">
  <div class="wrap" style="max-width:760px">
    <div class="section-head" style="margin-bottom:22px"><p class="kicker">${t.c.estKicker}</p><h2 style="font-size:clamp(26px,5vw,40px)">${p.estTitle}</h2></div>
    ${estimator(ctx)}
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-head"><p class="kicker">${t.c.faqKicker}</p><h2>${t.c.faqTitle}</h2></div>
    ${faq(p.faq)}
  </div>
</section>
${ctaFinal(ctx)}`;
  return layout(ctx, { title: p.title, desc: p.desc, body, estimator: true, crumbs: [[p.crumb]], graph: [faqSchema(p.faq)] });
}

export function contact(ctx) {
  const { lang, t } = ctx;
  const p = t.pages.contact;
  const body = `
<section class="page-hero">
  <div class="wrap">
    <h1>${p.h1}</h1>
    <p class="answer">${p.answer}</p>
  </div>
</section>
<section class="section" style="padding-top:8px">
  <div class="wrap">
    <div class="cards cards-3">
      <div class="card">${icons.phone.replace('<svg', '<svg class="card-ic"')}<p class="kicker" style="margin:0">${esc(p.phoneLabel)}</p><a class="contact-big" href="tel:${PHONE}">${PHONE_LABEL}</a><p>${p.phoneText}</p></div>
      <div class="card" style="background:var(--yellow)">${icons.whatsapp.replace('<svg', '<svg class="card-ic"')}<p class="kicker" style="margin:0;color:var(--ink-2)">WhatsApp</p><a class="contact-big" href="${waLink(t.c.waHello)}" target="_blank" rel="noopener">+373 69 269 888</a><p>${p.waText}</p></div>
      <div class="card">${icons.mail.replace('<svg', '<svg class="card-ic"')}<p class="kicker" style="margin:0">${esc(p.mailLabel)}</p><a class="contact-big" style="font-size:clamp(20px,4.6vw,28px)" href="mailto:${EMAIL}">${EMAIL}</a><p>${p.mailText}</p></div>
    </div>
  </div>
</section>
<section class="section bg-2">
  <div class="wrap split">
    <div>
      <h2 style="font-size:clamp(24px,4.4vw,36px);margin-bottom:12px">${p.formTitle}</h2>
      <p class="lede" style="font-size:17px">${p.formText}</p>
      <form class="form" id="leadForm" action="https://formspree.io/f/mlgaogbo" method="POST"
        data-sending="${esc(p.form.sending)}" data-ok="${esc(p.form.ok)}" data-err="${esc(p.form.err)}">
        <input type="hidden" name="_subject" value="${esc(p.form.subject)}">
        <input type="hidden" name="_language" value="${lang}">
        <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
        <div class="field"><label for="f-name">${esc(p.form.name)}</label><input id="f-name" name="nume" autocomplete="name" required></div>
        <div class="field"><label for="f-phone">${esc(p.form.phone)}</label><input id="f-phone" name="telefon" type="tel" autocomplete="tel" inputmode="tel" required placeholder="069…"></div>
        <div class="field"><label for="f-msg">${esc(p.form.msg)}</label><textarea id="f-msg" name="mesaj" placeholder="${esc(p.form.msgPh)}"></textarea></div>
        <button class="btn btn-yellow" type="submit">${esc(p.form.send)}</button>
        <p class="form-msg" role="status" aria-live="polite"></p>
      </form>
    </div>
    <div class="prose">
      <h2 style="font-size:clamp(24px,4.4vw,36px)">${p.infoTitle}</h2>
      ${ticks(p.info)}
      <h3>${p.zonesTitle}</h3>
      ${zoneChips(ctx)}
    </div>
  </div>
</section>
${ctaFinal(ctx)}`;
  return layout(ctx, {
    title: p.title, desc: p.desc, body, crumbs: [[p.crumb]],
    graph: [{ '@type': 'ContactPage', name: plain(p.h1), url: SITE + ctx.page[lang] }],
  });
}

export function despre(ctx) {
  const { t } = ctx;
  const p = t.pages.despre;
  const body = `
<section class="page-hero">
  <div class="wrap" style="max-width:860px">
    <h1>${p.h1}</h1>
    <p class="answer">${p.answer}</p>
  </div>
</section>
<section class="section" style="padding-top:8px">
  <div class="wrap" style="max-width:860px">
    ${p.sections.map((s) => `<div class="prose" style="margin-bottom:40px"><h2 style="font-size:clamp(22px,4vw,32px)">${s.h}</h2>${(s.p || []).map((x) => `<p>${x}</p>`).join('')}${s.ticks ? ticks(s.ticks) : ''}</div>`).join('')}
    ${noTake(t)}
  </div>
</section>
${ctaFinal(ctx)}`;
  return layout(ctx, { title: p.title, desc: p.desc, body, crumbs: [[p.crumb]] });
}

export const TEMPLATES = { home, estimare, landing, preturi, diaspora, contact, despre };
