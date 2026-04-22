# gunoi.md — site (v0.1)

Landing page for gunoi.md — AI-powered scrap & waste collection platform for Moldova.

## What this is

A complete, production-ready landing page built with plain HTML + CSS + JS. No framework, no build step, no hosting fees. Works on any device, deploys anywhere.

## Files

- `index.html` — structure and content (Romanian + English)
- `styles.css` — full visual design (dark, industrial-green aesthetic)
- `script.js` — language toggle, animated impact counter, waitlist form, scroll reveals

## Preview locally (on a laptop)

```bash
# Any simple HTTP server works
cd site
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Deploy for free (takes 3 minutes)

### Option A — Netlify Drop (easiest, no account needed to test)
1. Go to https://app.netlify.com/drop
2. Drag the entire `site` folder into the browser window
3. Done. You get a free URL like `random-name.netlify.app`
4. Create a free account to claim it permanently

### Option B — Vercel (recommended for production)
1. Push the folder to a GitHub repo
2. Go to https://vercel.com, import the repo
3. Deploy — free forever at this scale

### Option C — Cloudflare Pages
1. https://pages.cloudflare.com → "Upload assets"
2. Drag the folder, deploy

## Connecting gunoi.md (the actual domain)

Once deployed on any of the above:
1. In your domain registrar (where you bought gunoi.md), set DNS to point to the hosting provider
2. In the hosting provider, add `gunoi.md` as a custom domain
3. SSL is automatic and free

## Next steps (what to add)

### Immediate (this week)
- [ ] Connect real waitlist backend (Formspree = 3-min setup, free for 50 submissions/month)
- [ ] Add favicon + proper OG image for social sharing
- [ ] Russian translation (significant user base in Moldova)

### Phase 1 build (month 1-2)
- [ ] User account system (Supabase — free tier)
- [ ] "Post a pickup" flow with photo upload
- [ ] AI photo recognition → price estimate (OpenAI Vision API)
- [ ] Collector dashboard (see jobs, bid, accept)
- [ ] Map integration (pickup locations)
- [ ] Basic payments

### Phase 2 build (month 3-6)
- [ ] Rating system
- [ ] Messaging between users and collectors
- [ ] Business accounts (bulk pickups, invoicing)
- [ ] Admin panel (moderation, fraud detection)
- [ ] Mobile app (PWA, then native if needed)

## Waitlist data

Currently submissions are saved to browser `localStorage` under key `gunoi_waitlist`. This is placeholder until we connect a real backend. To inspect locally:

```js
JSON.parse(localStorage.getItem('gunoi_waitlist'))
```

Replace the `// TODO: Replace with real API endpoint` block in `script.js` with:
- **Formspree:** paste their endpoint URL — done
- **Supabase:** requires project setup + an insert into a `waitlist` table
- **Custom:** any serverless function that accepts a POST

## Design system

### Colors
- Background: `#0a0f0a` (near-black with green undertone)
- Accent: `#6ee7a8` → `#3ddc84` (electric green, metallic)
- Text: `#e8f0e8` (soft white)
- Text soft: `#a8b5ac`

### Typography
- Display/body: **Space Grotesk** (modern, slight industrial feel)
- Monospace/data: **JetBrains Mono** (for stats, codes, technical feel)

### Voice
- **Romanian:** direct, confident, slightly working-class. Not formal. Not hip. Real.
- **English:** same but idiomatic.

### Aesthetic
Not "eco moralism" greenwashing. Not tech-bro minimalism. **Industrial premium:** think Apple × Tesla × an Eastern European workshop. The kind of interface a welder would trust.

---

*Built 2026-04-22. Day 1 of Alexandru's sober run. Day 1 of gunoi.md.*
