# Pressure Test Scotland — V1 Launch Review

**Reviewed:** 2026-08-12 · live deployment (commit `d8ef303 "david's feedback"`) + full source + working tree.
**Scope:** SEO · AEO · Accessibility · Legal · CRO · page structure — as a go-live checklist for the domain connection, Resend hookup and analytics happening today.
**Audience:** Claude Code. Blockers first, then launch-day wiring, then per-discipline items. The About page is intentionally absent for V1 — nothing below asks for one, and nothing links to one (verified).

**Where things stand:** almost everything from the 2026-07-30 review is implemented and verified live — Contact in nav, dead `/about` CTA fixed, dummy projects unpublished, `/projects` noindexed + out of sitemap, photo-less project cards collapse to text cards with the outcome copy, hero anchor CTA + pull-quote + lighter overlay, "Get my quote" labels + next-working-day promise, stacked reviews (carousel gone), input focus ring + 4:1 borders, mobile action-bar body padding, `sitemap.ts`, breadcrumbs, scroll-margin, Escape-close menu, keyword-first titles. This pass found **3 launch blockers**, the launch-day wiring, and a short tail per discipline.

---

## 🚫 Launch blockers — fix before pushing/going live

### B1. The WebP image migration is half-committed — the next `git push` breaks the build
`git status` shows: `src/assets/images/index.ts` **modified** (now imports `./hero-pipes.webp` etc.), all 17 `.webp` files **untracked**, all old `.jpg` files **deleted but unstaged**, `towebp.mjs` untracked. HEAD's `index.ts` has zero webp references.

Consequences: commit `index.ts` without `git add`-ing the `.webp` files and the Vercel build fails (module not found) — the site won't deploy on launch day. Conversely, today's deployment is still serving the old JPGs, so the client-supplied certification/flow photos and the smaller files aren't live.

**Fix (one commit):**
```bash
git add src/assets/images/index.ts src/assets/images/*.webp
git add -u src/assets/images/          # stages the .jpg deletions
git add towebp.mjs                     # or delete it; if kept, move to scripts/
git commit -m "Migrate image sources to WebP"
```
Then run `npm run build` locally before pushing.

### B2. In production without env vars, form submissions report success and vanish
`src/lib/leads.ts`: when `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY`/`LEAD_NOTIFY_TO` are unset, `storeLead`/`notifyLead` "dev-stub" and **return `true`** — so `/api/quote` tells the visitor "your request is in, quote by next working day" while the lead only hits function logs. If the site goes live before Resend/Supabase env vars are configured (they are being connected today), every real lead is silently lost behind a success message.

**Fix:** make missing config a hard failure in production. In `leads.ts`, top of both stub branches:

```ts
const IS_PROD = process.env.VERCEL_ENV === 'production';
// in storeLead and notifyLead:
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  if (IS_PROD) { console.error('[leads] Supabase env vars missing in production'); return false; }
  console.info('[leads] Supabase not configured, dev-stubbing store:', lead);
  return true;
}
```
(Same pattern for the Resend branch.) With both failing, `submitLead` returns `ok: false` and the visitor gets the "call us on 07749 245626" error instead of a false success. Keep the dev-stub behaviour for preview/local.

### B3. llms.txt publishes a wrong phone number and a dead page — to AI answer engines
`public/llms.txt` (unchanged since 2026-07-17, verified live) contains:
- **`call 01292 440 390`** — not the business number. Every AI engine that ingests this file may quote a wrong phone number for the business. The number everywhere else is **07749 245626**.
- A link to `https://www.pressuretestscotland.co.uk/about` — a 404 (About is deliberately not in V1).
- A link to `/projects` — noindexed and unlinked for V1.
- "trading since 2013" — fine (legal date), but the site now leads with "on Scotland's water mains since 2003"; keep both framings consistent ("company registered 2013; David on Scotland's mains since 2003").

**Fix:** replace `public/llms.txt` with (adjust wording as needed, keep the answer-block style):

```markdown
# Pressure Test Scotland

> Water mains commissioning specialist based in Ayr, delivering across Scotland. We swab, pressure test, chlorinate, sample and certify new water mains so contractors and developers can connect to the Scottish Water network. Quote back by the next working day: call 07749 245626.

Pressure Test Scotland (Water) Ltd (company number SC457216, registered 2013; David has worked Scotland's water mains since 2003) handles the commissioning stage of new water mains, and supplies and lays new mains as a WIRS-accredited contractor. Groundworks contractors, developers, ICP/SLO multi-utility contractors and consultants use us to take a laid main through to an auditable certificate pack that Scottish Water accepts for connection. Accreditations: Lloyd's WIRS, SMAS SSIP, SafeContractor.

## What mains commissioning involves

The commissioning sequence on a new water main, in order:

1. Swabbing and pre-commission cleaning. A foam swab is driven through the main to clear air and construction debris. Skip it and the pressure test and chlorination both fail.
2. Hydrostatic pressure testing. Data-logged testing proves the pipe holds working pressure before tie-in. We test PE, MDPE, barrier and ductile.
3. Chlorination and disinfection. A dosed solution is held for the required contact time, then dechlorinated and flushed to the network residual.
4. Bacteriological sampling. UKAS-accredited lab analysis confirms the main is safe for potable supply.
5. Certification. The auditable certificate pack Scottish Water accepts to permit connection.

## Services

- [New mains, supplied and laid](https://www.pressuretestscotland.co.uk/services/mains-laying)
- [Pressure testing](https://www.pressuretestscotland.co.uk/services/pressure-testing)
- [Swabbing, chlorination and sampling](https://www.pressuretestscotland.co.uk/services/chlorination)
- [Certification and tie-ins](https://www.pressuretestscotland.co.uk/services/certification)
- [Flow and pressure testing](https://www.pressuretestscotland.co.uk/services/flow-and-pressure-testing)
- [All services](https://www.pressuretestscotland.co.uk/services)
- [Contact / get a quote](https://www.pressuretestscotland.co.uk/contact): quote back by the next working day, or call 07749 245626.

## Coverage

Ayr base, Scotland-wide delivery. Fastest mobilisation across the west and central belt, including Glasgow and Edinburgh; wider Scotland booked on programme.
```

---

## 🔌 Launch-day wiring (domain → Resend → analytics)

Do these in order; each unblocks the next.

### W1. Domain
1. In Vercel, add both `pressuretestscotland.co.uk` and `www.pressuretestscotland.co.uk`; set **www** as the production domain (that's what `SITE.host`, every canonical, the sitemap and llms.txt already assume) and let Vercel 308-redirect apex → www. Confirm the `.co.uk` choice with David — `site.ts` still flags it as a working assumption.
2. Leave the `*.vercel.app` URL alone — every page's canonical already points at the production domain, so no duplicate-content risk.
3. While in DNS: add the Resend records (W2) in the same session.
4. Housekeeping: `site.ts` comment says "Keep in sync with astro.config.mjs" — stale (this is Next); update to name `sitemap.ts`/`llms.txt` instead so the next person syncs the right files.

### W2. Resend (and Supabase) — the lead pipeline
1. In Resend: add domain `pressuretestscotland.co.uk`, add the DKIM/SPF DNS records it gives you, wait for **Verified**. The code's default sender is `quotes@pressuretestscotland.co.uk` (`LEAD_NOTIFY_FROM` fallback in `leads.ts`) — sending will fail until this domain is verified. Note: the from-address **cannot** be the yahoo.co.uk address (DMARC); the yahoo address is fine as the recipient.
2. Vercel env vars (Production + Preview): `RESEND_API_KEY`, `LEAD_NOTIFY_TO` (David's inbox), optionally `LEAD_NOTIFY_FROM`, plus `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
3. Supabase: confirm the `leads` table exists with columns matching `leads.ts` (`name, company, site_location, service, email, phone, message, source`) and **RLS enabled with no public policies** (only the service role writes).
4. Implement B2 (prod guard), redeploy, then **submit a real test lead on the production domain** and verify: row in Supabase, email in David's inbox with reply-to set to the test sender, success message shown. Also test the honeypot (fill `company_url` via devtools → should pretend success, store nothing).

### W3. Analytics — pick cookieless so the legal pages stay true
The cookie policy promises "no advertising or analytics cookies… no cookie banner because there is nothing to consent to", and the privacy policy repeats it. **GA4 would break that promise** and force a PECR consent banner + policy rewrites on launch day. Use a cookieless option instead — recommended: **Vercel Analytics** (zero config on this stack, no cookies, no consent needed):

1. `npm i @vercel/analytics`, then in `src/app/layout.tsx`: `import { Analytics } from '@vercel/analytics/next';` and render `<Analytics />` before `</body>`. Enable Web Analytics in the Vercel project.
2. Conversion events in `src/components/ui/QuoteForm.tsx`:
   ```ts
   import { track } from '@vercel/analytics';
   // in onSubmit, on success:
   track('quote_submitted', { source });
   ```
   and phone-click tracking (small client wrapper or `onClick` on the `tel:` Buttons/MobileActionBar links): `track('phone_click', { placement: 'header' | 'hero' | 'mobile-bar' | 'cta' })`. Success criterion: you can answer "quotes vs calls, by placement" in a week.
3. Legal alignment (small, same day): add one line to the privacy policy's "Who we share it with" — *"**Vercel Analytics** gives us anonymous, aggregated page statistics; it sets no cookies and does not identify you."* — and soften the cookie policy's "no third-party analytics" sentence to "no analytics **cookies** and no analytics that identify or track you". Bump both "Last updated" dates to August 2026. (If the client insists on GA4 later: that's a consent banner + both policies rewritten — treat as a separate task.)

### W4. Straight after DNS resolves
1. Google Search Console: verify the domain property (DNS TXT), submit `https://www.pressuretestscotland.co.uk/sitemap.xml`. Bing Webmaster Tools too (free, feeds Copilot — an AEO channel).
2. Create/claim the **Google Business Profile** (Ayr service-area business), then add its URL (and any other confirmed profiles) to `SITE.sameAs` — it's wired into Organization schema already and is the strongest local-SEO lever available. Real Google reviews collected there later become the substantiation for the 5/5 claim (L4).
3. Smoke-test on the production domain: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, one service page, a form submission.

---

## SEO — remaining items

### S1. No Open Graph / Twitter image anywhere
Verified live: no `og:image` on any page; Twitter card falls back to `summary` with no image. Links shared in WhatsApp/LinkedIn/Slack (how trade referrals actually travel) render as bare text. **Fix:** create `public/og.jpg` (1200×630 — navy ground, logo, "Water mains commissioning · Scotland-wide · 07749 245626"), and in `layout.tsx` metadata add `openGraph: { images: ['/og.jpg'] }` + `twitter: { card: 'summary_large_image', images: ['/og.jpg'] }` as the sitewide default (pageMetadata already lets pages override via `ogImage`).

### S2. Organization schema has no logo/image
`orgSchema()` in `src/lib/schema.ts` lacks `logo` and `image` — both matter for the Google knowledge panel / LocalBusiness treatment. **Fix:** export the logomark as `public/logo.png` (≥112×112) and add `logo: absolute('/logo.png'), image: absolute('/og.jpg')` to the node. While there: `foundingDate: '2013'` is right; don't change it to 2003 (that's David's experience, not the company).

### S3. Footer service links point at hub anchors, not the detail pages
`Footer.tsx` links `/services#mains-laying` etc. The five service **detail** pages are the SEO money pages (keyword-first `metaTitle`s are live) but only receive internal links from card "Learn more"s and RelatedServices. **Fix:** point the footer Services column at `/services/${s.slug}` — descriptive anchor text ("Pressure testing") onto the ranking page from every page on the site.

### S4. No custom 404
There's no `src/app/not-found.tsx`; unknown URLs (including the llms.txt `/about` link until B3 ships, and any typo'd link after launch) get Next's bare default. **Fix:** add a small branded `not-found.tsx` — headline, one line, links to `/`, `/services`, `/contact`, phone number. Keep it dependency-free (it renders inside the existing layout, so header/footer come free).

### S5. Favicon set is SVG-only
`icons: { icon: '/favicon.svg' }`. Add a `favicon.ico` (or 32px PNG) fallback and an `apple-touch-icon.png` (180×180) — Safari pinned tabs, iOS home-screen, and some crawlers ignore SVG favicons. Wire via `icons: { icon: [...], apple: '/apple-touch-icon.png' }`.

### S6. Minor
- `WhatWeDo` says "Browse all services" while `Process` says "All services" — pick one label ("All services").
- `robots.txt` is already correct for AEO (GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot allowed, sitemap on production host) — no change.

---

## AEO — beyond the llms.txt blocker

### A1. FAQPage schema is duplicated across three URLs
The same home `FAQS` ship as FAQPage JSON-LD on `/`, `/services` **and** `/contact` (service pages have their own — fine). Duplicate identical FAQPage across URLs dilutes which page an engine treats as the canonical answer source. **Fix:** keep `faqSchema(FAQS)` on `/` only; drop it from `/services` and `/contact` (the visible accordions can stay — it's only the schema node that should live once).

### A2. The content itself is in good AEO shape — keep it that way
Self-contained 40–70-word answers, buyer-phrased FAQ headings, the five-step process as standalone answer blocks, native `<details>` (content in DOM, no JS needed), robots.txt open to AI crawlers, llms.txt present (post-B3), service pages each targeting one query with keyword-first titles. Two cheap additions:
- **Visible freshness**: legal pages show "Last updated"; add a quiet one-liner to service detail pages (e.g. in the facts rail: "Reviewed August 2026") — engines weight dated content.
- **Citations/stats**: where a number can be sourced, name the standard in-line — the copy already name-drops BS EN 805 / WIS 4-01-03; keep specifics like "held at working pressure against the allowable loss for the pipe material and length" (already good).

### A3. Third-party presence (post-launch, client-dependent)
AI engines cite third-party sources ~6× more than brand domains. The GBP listing (W4) is step one; then SafeContractor/WIRS directory listings pointing at the domain, and eventually 2–3 real Google reviews. No code changes.

---

## Accessibility — remaining tail

Verified fixed this pass: form focus ring (`:focus-visible` + box-shadow) and 4:1 input borders/placeholders, static reviews (carousel + its ARIA issues gone), tab-roles removed from WhyUs (`aria-pressed` buttons now), Escape + `aria-controls` on the menu, mobile action-bar body padding, skip link, `lang="en-GB"`, sensible alt text. Remaining:

### AC1. WhyUs still auto-rotates for non-interacting users, and there's no reduced-motion handling 🟡
Rotation now stops on first click (good), but a keyboard/screen-reader user reading panel 1 still gets content swapped every 5s until they interact — WCAG 2.2.2 wants a way to pause without changing state, and the site has no `prefers-reduced-motion` rules at all. **Fix (two parts):**
1. In `WhyUs.tsx`, also pause while hovered/focused and never start for reduced-motion users:
   ```ts
   useEffect(() => {
     if (paused) return;
     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
     const id = setInterval(...);
     ...
   }, [points.length, paused]);
   ```
   plus `onMouseEnter/onFocus` on the section wrapper calling a soft-pause (resume on leave if never clicked).
2. In `global.css`, a global damper:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
   }
   ```

### AC2. Server-side validation errors aren't tied to fields 🟢
`/api/quote` returns `fields: ['name','email']` on 422 but `QuoteForm` only shows the generic status line; native `reportValidity()` covers most cases pre-submit. Low priority: on 422, set `aria-invalid` on the named fields and focus the first. Fine to ship without.

### AC3. Content nit that's also an accessibility nit
Contact "Hours: Monday to Friday, working hours" — vague for everyone and unhelpful read aloud. Get the real window from David ("Mon–Fri, 8:00–18:00") and use it in ContactHero and (optionally) `openingHoursSpecification` on the org schema.

---

## Legal / compliance

The privacy + cookie policies are unusually honest and match the actual data flows (Supabase, Resend, Vercel; no marketing; UK GDPR rights; ICO complaint route). Remaining:

### L1. Analytics must not break the policies — handled by W3
If Vercel Analytics (cookieless) is used, the only changes needed are the two policy lines + date bumps in W3.3. If anything cookie-setting is ever added instead, a PECR consent banner and policy rewrite become mandatory **before** it ships.

### L2. ICO registration (data protection fee) — client action
The company is a data controller processing lead data; UK controllers generally must register with the ICO and pay the annual fee (~£40–60 for micro businesses, £52 if paid by direct debit) unless exempt. Have David check/register at ico.org.uk/registration. Not a code change; worth an email today.

### L3. Companies Act website particulars — one confirmation
Footer already states legal name, "Registered in Scotland", company number SC457216, address and contact — the required particulars, **provided** 4 Newark Crescent is the registered office (Companies House record should match; if the registered office differs, it must be stated). Also: if the company is VAT-registered, add the VAT number to the footer legal line.

### L4. Claims needing client sign-off before launch (already flagged in code comments — this is the launch gate)
- **"Rated 5/5 by contractors and developers"** (both forms) — there is no rating system behind it, only three written references. CAP/ASA-wise it's unsubstantiated as a rating. Either (a) get 2–3 real Google reviews first and reword to "5.0 on Google", or (b) reword to what's provable: "Recommended by the contractors who put us on their sites" with the same link to #reviews. Pick before launch.
- **Hero standards chips** (`BS EN 805`, `WIS 4-01-03`, `BS 8558`, `EUSR`, `UKAS`, `Byelaws 2014`) — `Hero.tsx` comment says not individually confirmed by David. Confirm or trim.
- **"UK-wide tested & certified"** label above those chips — the business sells Scotland-wide delivery; "UK-wide" reads as coverage. Reword to **"Tested & certified to UK standards"** (same meaning, no coverage claim).
- **FAQ**: "We usually carry any re-chlorination and re-sampling at our own cost and time" — a standing commercial commitment published on the site; confirm David stands behind it (the "usually" helps, but he should see it).
- **Testimonials**: the three published are marked confirmed with named people/companies — make sure David has their OK to publish names (Megan McLean's is attributed to "Main contractor" — if the company can't be named, fine as is).

### L5. Email address
`pressuretestscotland@yahoo.co.uk` is published as the business contact and privacy/legal contact. With the domain live and Resend DNS done (W2), setting up `info@pressuretestscotland.co.uk` (even as a forward to the yahoo inbox) and swapping `SITE.email` is a 10-minute credibility upgrade. Optional for launch day, recommended within the week.

---

## CRO / page structure — what's left

The big levers from the last review are shipped and verified (hero form anchor, promise under submit, aligned success message, stacked social proof, pull-quote filling the hero, 5th card spanning, slim services banner, outcome copy on project cards). Remaining, all small:

1. **Measurement is the CRO item now** — W3 (events by placement) is the prerequisite for every future optimisation; nothing else on this list matters until quote/call volume is visible.
2. **Contact hours** (AC3) — "working hours" makes callers guess whether 7am is fine.
3. **CTA label consistency** — S6.
4. **Post-launch, first content iteration** (not V1): once GBP reviews exist, swap the form's rating header for the real figure; once 2+ real projects are cleared and photographed, flip `/projects` on (remove `noindex`, add to `sitemap.ts` STATIC_PATHS, add nav/footer link — the code comments already document exactly this).
5. **Page structure verdict**: Home (hero/form → services → why → about-stats → segments → process → reviews → coverage → FAQ → CTA), Services hub → 5 detail pages, Contact — this is the right V1 architecture for a trade lead-gen site; with About deferred, the AboutStats section carries the who-are-you weight adequately. No structural changes recommended for launch.

---

## Launch-day verification checklist

1. `npm run build && npm run typecheck` green locally **after** committing the WebP migration (B1).
2. Production domain serves with valid TLS; apex redirects to www; vercel.app pages carry canonicals to www (spot-check one).
3. `curl` on production domain: `/robots.txt` (sitemap line), `/sitemap.xml` (8 URLs: 5 static + wait — home, services, contact, privacy, cookies + 5 service pages = 10), `/llms.txt` (correct phone, no /about).
4. Form: real submission on production → Supabase row + Resend email received + success message; then break a field (bad email) → inline error; honeypot filled → silent drop.
5. With env vars temporarily unset on a preview deploy: form shows the error path, not false success (B2 guard).
6. Share the homepage URL in WhatsApp/Slack → OG image renders (S1).
7. `/no-such-page` → branded 404 (S4).
8. Lighthouse on `/`: a11y ≥ 95, SEO ≥ 95; check LCP is the hero (WebP now) < 2.5s on 4G throttle.
9. GSC: sitemap submitted, no coverage errors after first crawl; `/projects` shows as "Excluded by noindex" (correct).
10. Analytics live: page views recording; one test `quote_submitted` and one `phone_click` visible.
11. Reduced motion (macOS: Settings → Accessibility → Display → Reduce motion): WhyUs doesn't auto-rotate (AC1).
12. Client sign-offs collected: 5/5 wording, standards chips, "UK standards" label, FAQ cost commitment, testimonial names, registered office, ICO fee (L2–L4).
