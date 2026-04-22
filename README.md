# gunoi.md — site

Landing page for **gunoi.md** — a paid waste collection service for Chișinău and surrounding suburbs in Moldova.

## What this is

Pure static HTML/CSS/JS. No framework, no build step. Deployed on Vercel (auto-deploys on push to main).

## Positioning

**We collect your trash, you pay us.** Primary offer:

- Household cleanouts (renovation debris, old furniture, appliances, general junk)
- Business / office clearances and construction sites
- Landlord turnovers (post-tenant apartment cleanouts)
- One-off urgent jobs and event cleanup

**Hybrid scrap angle:** if the load contains valuable scrap metal (radiators, copper, appliances with motors, etc.), we deduct its value from the invoice. Kept subtle — not the hero.

## Languages

**Romanian (default) + Russian only.** No English.

- RO is the primary audience (Moldova)
- RU is critical for Chișinău's Russian-speaking population
- Toggle in the nav, persisted in `localStorage` under `gunoi_lang`
- All strings live in the `translations` object in `script.js` keyed by `data-i18n` attributes

## Files

- `index.html` — markup, structure, all `data-i18n` keys
- `styles.css` — dark industrial-green visual system
- `script.js` — language toggle, scroll reveals, contact form

## Contact / conversion

Primary conversion is the phone number — prominent in the header, hero, pricing CTA, contact section, and footer.

- **Display:** `+373 69 269 888`
- **tel: link:** `tel:+37369269888`

The contact form is a secondary channel. Right now it stores submissions in `localStorage` (`gunoi_requests`) and opens a `mailto:` fallback to `salut@gunoi.md`. **TODO:** wire to a real backend (Formspree or a Vercel serverless `/api/contact` using Resend).

## Pricing anchors shown on site

| Tier | Romanian | Russian |
|---|---|---|
| Small (up to 1m³) | de la 500 MDL | от 500 MDL |
| Medium (~3m³) | de la 1200 MDL | от 1200 MDL |
| Large (truck ~7m³) | de la 2500 MDL | от 2500 MDL |
| Full apartment/house | ofertă la fața locului | оценка на месте |
| Bulky single items | de la 300 MDL/bucată | от 300 MDL/шт |

## Preview locally

```bash
cd site
python3 -m http.server 8000
# → open http://localhost:8000
```

## Deploy

Already on Vercel. Any push to `main` auto-deploys. To deploy elsewhere, just drag the `site/` folder to Netlify Drop or Cloudflare Pages — it's truly static.

## Design system

**Colors**
- Background: `#0a0f0a`
- Card: `#111a14`
- Accent: `#6ee7a8` → `#3ddc84`
- Text: `#e8f0e8` / soft `#a8b5ac` / dim `#6b7a70`

**Fonts**
- Display/body: **Space Grotesk** (modern, slight industrial)
- Monospace/data: **JetBrains Mono** (prices, phone, stats)

**Voice**
- **Romanian:** direct Moldovan Romanian, informal `tu`, not corporate
- **Russian:** conversational, formal `вы` (standard for commercial)

## Next steps

- [ ] Wire contact form to real backend (Formspree = 3 min; or Vercel `/api/contact` + Resend)
- [ ] Add proper OG image (`public/images/og.png`)
- [ ] GA4 or Plausible analytics
- [ ] Call tracking on the phone number (optional)
- [ ] Add Google Business Profile link once verified

---

*Rebuilt 2026-04-22 — pivot from scrap-buy marketplace to paid waste collection.*
