# gunoi.md — Landing Site

TaskRabbit-style trust-marketplace landing page for a waste-collection service in Chișinău, Moldova.
Bilingual: Romanian (default) + Russian toggle.

## Stack

- Vanilla HTML / CSS / JS. Zero build step, zero framework.
- Google Fonts: `Inter` (body) + `Space Grotesk` (headings).
- Deployed via Vercel auto-deploy from GitHub.

## Files

- `index.html` — markup, 13 sections (nav, banner, hero, trust strip, categories, steps, pricing, about, before/after, reviews, FAQ, contact, footer).
- `styles.css` — light-mode design system (`--green`, `--accent`, typography, components).
- `script.js` — i18n (RO/RU), banner dismiss + persistence, nav shadow, category→form prefill, form handler (localStorage + mailto TODO), before/after drag slider (pointer + keyboard).

## Design tokens

- Primary green: `#3ddc84` / hover `#2bb369`
- Warm accent (pricing): `#ffb454`
- Text: charcoal `#1a1f1c`
- Background: `#ffffff` + soft tint `#f8faf7`
- Borders: `#e5ebe7`
- Radius scale: 8 / 14 / 20 / 28 px
- Shadows: three tiers (`--shadow-sm/md/lg`)

## i18n

All user-visible strings live in `I18N` (script.js) under `ro` and `ru`. HTML nodes use `data-i18n="<key>"`. Language is picked from:
1. `localStorage['gunoi.lang']`
2. Browser `navigator.language` (starts with `ru` → Russian)
3. Fallback to Romanian

## Inline SVG illustrations

No external image deps. Everything is inline SVG:
- **Hero scene** — collector figure + branded truck + buildings + tree + badges (5★ and area pill)
- **Category icons** — 8 line-style icons (furniture, appliance, construction, home, office, event, metal, container)
- **Before/after** — two full-viewport SVGs for the drag-slider comparison (cluttered-room → clean-room)
- **Logo** — green rounded tile with trash-bag glyph

## Interactions

- Sticky nav with scroll-triggered shadow
- Dismissible launch banner (persists in `localStorage`)
- Category cards prefill the contact form's `Categorie` select and smooth-scroll to the form
- Before/After drag slider (pointer + keyboard arrows / Home / End)
- Form: native validation; submissions stored in `localStorage`; mailto fallback prepared (commented — uncomment to enable)

## Accessibility

- WCAG AA contrast (charcoal on white/off-white)
- `aria-label` on interactive controls (lang toggle, banner close, phone button, BA slider)
- `prefers-reduced-motion` respected (disables hero float + smooth scroll)
- All form fields have labels, `autocomplete` hints, `required` on name + phone

## TODO (backend)

- Wire form to a real endpoint (Formspree / Resend / API route). Right now submissions are only stored in `localStorage` for dev, with a commented mailto fallback.
- Email inbox: `salut@gunoi.md` (generic, no personal email used).

## Deploy

Vercel auto-deploys on push to GitHub. No build config needed — static.

## License

Private. © 2026 gunoi.md
