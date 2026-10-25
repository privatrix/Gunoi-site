# gunoi.md

Waste removal in Chișinău and suburbs, in Romanian (`/`) and Russian (`/ru/`).
The core of the site is the photo price estimator: customers photograph what they want
thrown out and see a price range in 30 seconds, then book on WhatsApp.

## How it fits together

| Path | What it is |
|---|---|
| `pricing.config.json` | **Every price on the site.** Edit numbers here only. |
| `lib/estimate.js` | Pricing engine: items + floor + distance → price range. Used by the browser and the tests. |
| `build/content/ro.js`, `build/content/ru.js` | All page text, one file per language. Prices appear only as placeholders such as `{band:canapea}` or `{item:saltea}`. |
| `build/templates.js`, `build/layout.js` | Page templates and the shared header, footer and SEO tags. |
| `build/registry.js` | The list of pages and their URLs in each language. |
| `assets/site.css` | All styles (inlined into every page at build time). |
| `assets/estimator.js` | The estimator (steps 2–4; step 1 is rendered by the generator). |
| `api/estimate.js` | Vercel function: Claude identifies the items in the photos. It never sets prices. |
| `api/status.js` | `GET /api/status` — checks whether photo analysis is set up. |

The HTML pages, `sitemap.xml` and `llms.txt` are **generated** — don't edit them by hand.

## Changing things

```bash
npm install
npm run build   # regenerate all pages from content + prices
npm test        # pricing, AI adapter and generator checks
```

- **A price:** change it in `pricing.config.json`, run `npm run build`. Every page, the receipts,
  the ticker, the FAQ answers and the estimator pick it up.
- **Text:** edit `build/content/ro.js` and `ru.js` (keep both languages in step), then build.
- **A new page:** add it to `build/registry.js` and give it content in both language files.

The tests fail if a generated page is out of date, a link is broken, a price is typed by hand
into the content, or a Russian page is left in Romanian.

## Setup on Vercel

- `ANTHROPIC_API_KEY` — enables photo analysis. Without it the estimator still works from the ticked items.
- Optional: `ANTHROPIC_MODEL` to change the model.

Fonts are self-hosted subsets (see `build/fonts.md`).
