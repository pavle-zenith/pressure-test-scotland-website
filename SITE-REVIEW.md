# Pressure Test Scotland — Design, Architecture, CRO & Accessibility Review

**Reviewed:** 2026-07-30 · live at `pressure-test-scotland-website.vercel.app` (commit `d820b3b "latest"`) plus full source read.
**Audience for this doc:** Claude Code. Each item states the file, the exact change, and why. Work top-to-bottom: P0 → P1 → P2. Items are independent unless noted.

**Overall verdict:** The build quality is high — clean token system, semantic HTML, native `<details>` FAQs, honest-content gating (`confirmed:` flags), JSON-LD graph, skip link, self-hosted fonts. The problems are a handful of real bugs (a dead CTA, fabricated projects live in production, an orphaned page), some conversion leaks (hero dead space, competing CTAs, unattributed "5/5" claim), and a set of fixable WCAG failures (input focus/contrast, auto-rotating tabs, carousel announcements, mobile action bar overlap).

---

## P0 — Bugs and trust problems (fix before anything else)

### 1. Dead "Get a Quote" button in the About section (home page)
`src/components/home/AboutStats.tsx` (~line 36):

```tsx
<Button href="/about" variant="primary" size="lg" arrow>Get a Quote</Button>
```

`/about` is not in `LIVE_ROUTES` (`src/lib/routes.ts`), so `Button` renders an **inert, unfocusable `<span role="link">`** — a primary CTA on the home page that does nothing when clicked.

**Change:** `href="/about"` → `href="/contact"`.

### 2. Fabricated projects are live on /projects
`src/data/proof.ts`: three `PROJECTS` entries are commented `// DUMMY. Replace with a real cleared job before launch.` but carry `confirmed: true`, so they render publicly (`dummy-glasgow-fire-main`, `dummy-perth-rural-main`, `dummy-ayr-developer`). Invented jobs with invented outcomes on a trust-driven trade site is a serious credibility and reputation risk if a prospect or Scottish Water contact recognises they aren't real.

**Change:** set `confirmed: false` on all three dummy entries. The page then renders only the real Currie job. See also item 4 (page is currently orphaned anyway) and item 21 (placeholder-image layout).

### 3. Every project card's image is an empty navy box
All four `PROJECTS` have `image: null`, so `/projects` shows four large dark rectangles with a faint logo glyph — at a glance the page looks broken (this is exactly how it renders today).

**Change (until real photos exist):** in `src/components/projects/ProjectCard.tsx` + `ProjectCard.module.css`, when `project.image` is null render a **single-panel text card** (title, outcome paragraph, LOCATION/CLIENT/SCOPE meta, CTA) instead of the two-panel grid — i.e. conditionally drop the `.media` div and let `.panel` span full width, and add the `outcome` text to the panel (it is currently in the data but never rendered — the strongest copy on the page is invisible). When `image` is set, keep the current two-panel layout and render `outcome` too.

### 4. /projects and /contact are orphaned from navigation
`src/data/site.ts` `nav` contains only Home and Services. `/projects` is linked from **nowhere** (not header, not footer) yet is live and indexable. `/contact` is reachable only via "Get a Quote" buttons — users scanning for "Contact" find nothing.

**Change:**
- Add `{ label: 'Contact', href: '/contact' }` to `SITE.nav`.
- For Projects, pick one: (a) once item 2 is done and the client confirms at least 2 real jobs, add `{ label: 'Projects', href: '/projects' }` to nav and a footer Company link; or (b) if it stays one-project-thin for now, keep it unlinked **and** add `noindex: true` via `pageMetadata({ ..., noindex: true })` in `src/app/projects/page.tsx` so a half-finished page isn't indexed. (a) is preferred once content exists — proof pages earn links and convert.

### 5. Footer "Coverage" links are deceptive
`src/components/layout/Footer.tsx`: Ayrshire/Glasgow/Edinburgh/Central Belt all link to `/contact`. Users clicking "Glasgow" expect Glasgow coverage info, not a contact form; as SEO anchors they're noise.

**Change:** until per-location pages exist, link them to the coverage section (`/#coverage` — add `id="coverage"` to the section wrapper in `src/components/home/Coverage.tsx`; the section currently has `aria-labelledby` but no anchor id) or render them as plain `<span>`s. Long-term: build `/coverage/<area>` location pages — the `COVERAGE_AREAS` data and comment in `src/data/coverage.ts` already anticipate this.

### 6. Anchor links scroll under the sticky header
Footer Services links go to `/services#mains-laying` etc. (ids exist on `ServiceDetail` articles), and the quote API redirects to `/#final-cta-title`. With a 72px sticky header the target's top is hidden.

**Change:** in `src/styles/global.css` add:

```css
:target, [id] { scroll-margin-top: 88px; }
```

(Scoping to sections/articles is fine too; the blanket rule is harmless here.)

---

## P1 — Conversion (CRO)

### 7. Hero: large dead zone and an invisible background photo
Desktop hero (`src/components/home/Hero.tsx` / `Hero.module.css`): the left column uses `justify-content: space-between` to pin the certifications to the bottom, which — because the right-hand form is ~500px tall — opens ~180–250px of empty navy between the CTAs and the cert chips. Meanwhile `hero-pipes.jpg` ships as `priority` LCP-candidate bytes but is effectively invisible under the 0.9→0.45 navy overlay: the hero reads as a flat navy block.

**Changes:**
- `Hero.module.css` `.overlay`: lighten so the photo reads — e.g. `linear-gradient(90deg, rgba(7,21,34,0.92) 0%, rgba(7,21,34,0.72) 45%, rgba(7,21,34,0.35) 100%)` (text stays on the dark left; photo shows on the right behind the form's edge).
- Fill the dead zone with proof instead of air: move the hero star-rating line out of the form and into the left column above the certs, or add a one-line testimonial pull ("*Over 20 years, he has never let me down once.* — Jim McCormack, TSL Contractors") between `.actions` and `.certs`. Cheapest: change `.text` from `justify-content: space-between` to `gap: var(--space-xl)` with certs following content flow.

### 8. Hero: competing CTAs pointing at a duplicate form
The hero's primary button "Get a Quote" navigates to `/contact` — whose main content is the **same QuoteForm the user is already looking at** in the hero. That's a pointless page load and a classic split-attention leak.

**Change (`src/components/home/Hero.tsx`):** make the hero form the primary action. Give the form wrapper `id="quote-form"`, change the hero primary button to `href="#quote-form"` with label **"Get my quote"** (it already reads as anchor-safe via `isLiveHref`'s `/#` allowance — for a bare `#quote-form` href, `isLiveHref` returns `true` since it doesn't start with `/`). On mobile the form sits below the fold, so the anchor is genuinely useful; on desktop it's a no-op scroll. Keep the phone button as-is.

### 9. Unattributed "Rated 5/5 for service quality" claim
`src/components/ui/QuoteForm.tsx` `showRating` header. There's no review count, no source, no link — sophisticated B2B buyers discount naked ratings, and it's an unsubstantiatable advertising claim.

**Change:** either link it to the reviews section with a count — `Rated 5/5 by contractors and developers` as `<a href="/#reviews">` (add `id="reviews"` to the Reviews section in `src/components/home/Reviews.tsx`) — or replace the stars header with the strongest one-line credential: `Quote back by the next working day`. The second doubles as the missing response-time promise (item 10). If the client has real Google reviews, cite them ("5.0 on Google · 12 reviews").

### 10. The best offer on the site is buried
"A clear price back by the next working day" appears only on `/contact`. That's the single most persuasive, differentiated promise the business makes and it's absent from the hero and the form.

**Changes:**
- `QuoteForm.tsx`: under the submit button, replace/augment the `or call…` line: `Quote back by the next working day · or call <a>07749 245626</a>`.
- Align the button label with the promise: `submitLabel` default `'Request a callback'` → `'Get my quote'` (both call sites pass the prop; update them in `Hero.tsx` and `ContactHero.tsx`).
- Success message in `QuoteForm.tsx` says "We will come back to you shortly" → "Thanks — your request is in. **You'll have a quote by the next working day.** Call 07749 245626 if it's urgent."

### 11. Reviews slider hides two of three testimonials
`src/components/home/Reviews.tsx` shows one review at a time behind manual arrows; the card also has a fixed `min-height: 18rem` with a 62ch quote in a full-width card, leaving a large empty right region (visible in the live screenshots). Carousel-hidden social proof is barely-seen social proof.

**Change:** render all three confirmed reviews. Simplest robust option: replace the slider with a stacked layout — featured Carlsson review full-width (current card design), then the other two side-by-side in a 2-col grid (`highlight` + truncated quote + attribution). This deletes the carousel state, the arrows, the dots, and the a11y issues in item 27 in one move. If the client insists on a slider, keep it but fix item 27.

### 12. No analytics — you cannot CRO what you don't measure
No analytics of any kind in `src/app/layout.tsx`, and no conversion event on form submit. (The PostHog project "ISKRA QUIZ + SITE" is unrelated; this site sends nothing.)

**Change:** add a lightweight analytics script in `layout.tsx` (Vercel Analytics `@vercel/analytics` is zero-config on this stack, or PostHog if you want funnels), and fire a `quote_submitted` event (with the `source` prop — the plumbing for attribution already exists) in `QuoteForm.onSubmit` on success, plus a `phone_click` event on `tel:` links (a tiny `onClick` in `Button`/`MobileActionBar`, or use PostHog autocapture). Success criterion: you can answer "how many quote requests came from home-hero vs contact-page vs mobile bar this month".

### 13. Services hub hero wastes the first viewport
`/services` (`src/components/services/ServicesHero.tsx`): headline + one paragraph, then a full-width `aspect-ratio: 24/9` photo banner (~570px at 1440w) with zero information. The actual services start ~1.5 viewports down.

**Change:** in `ServicesHero.module.css`, reduce `.banner` to `aspect-ratio: 24 / 5` (a slim divider band), or delete the banner entirely and let the first `ServiceDetail` card (which has its own photo) provide the imagery. Keep the CTA.

### 14. Home services grid has an odd dangling fifth card
Five `SERVICES` in a 2-col grid leaves "Flow and pressure testing" alone on row 3 (live screenshot confirms). It reads as a mistake.

**Change (pick one):** (a) in `src/components/home/WhatWeDo.module.css`, make the fifth card span both columns (`li:last-child { grid-column: 1 / -1; }` with a shorter `min-height`); or (b) show only the four core services on the home grid (`SERVICES.slice(0, 4)`) and let "Browse all services" carry the long tail — flow/pressure surveys are a niche add-on, not a primary offer.

### 15. FinalCta buttons overflow risk + duplicated form promise
Minor: `FinalCta` says "Send your site drawings. Get a fixed quote back." but the CTA routes to /contact where drawings can't be attached (no file upload). Either add "email them over" affordance — the copy already says it; make the email address a visible `mailto:` link in `CtaBlock` (e.g. secondary line "or email pressuretestscotland@yahoo.co.uk") — or soften the copy. Email is currently only findable on /contact.

---

## P2 — Design & architecture polish

### 16. H1 line-breaking
`Hero.module.css` `.title { max-width: 16ch; }` forces "Scotland-wide / pipe pressure / testing based in Ayr" — an awkward mid-phrase break of the key term. **Change:** `max-width: 18ch;` and add `text-wrap: balance;` so it breaks "Scotland-wide pipe / pressure testing / based in Ayr" or two lines at larger sizes.

### 17. Consistent CTA labels
Audit shows: "Get a Quote" (most), "Request a callback" (form submit), "All services", "Browse all services", "Learn more". Standardise: primary conversion label everywhere **"Get a Quote"** on navigation buttons, **"Get my quote"** on the actual submit (item 10), and one of "All services"/"Browse all services" (pick "All services") for the hub link — currently both exist (`WhatWeDo.tsx` vs `Process.tsx`).

### 18. Reviews card bar shows your own brand rating itself
The navy bar over each review reads "Pressure Test Scotland ★★★★★" — a business writing its own 5 stars above a client quote looks self-issued. **Change (`Reviews.tsx`):** put the reviewer's company in the bar (`{active.company}`) or drop the bar and keep stars beside the attribution.

### 19. Service icon map contains dead keys
`icons` in both `src/components/ui/ServiceCard.tsx` and `src/components/services/ServiceDetail.tsx` (and `serviceImages` in `src/assets/images/index.ts`) still key `swabbing` and `bacteriological-sampling` — slugs that no longer exist after the 2026-07-30 consolidation. Harmless but confusing; delete the dead keys so the maps match `SERVICES` slugs. Also `flow-and-pressure-testing` reuses the pressure-testing photo on both its card and detail page — the /services page shows the same photo twice in adjacent cards; swap in a distinct image (e.g. `contractors-pipes.jpg`) until a real one exists.

### 20. `WhyUs` interval churn
`useEffect` dependency array includes `active`, so every rotation tears down and recreates the interval; the comment says "pauses briefly after a manual selection" which this accidentally implements, but it also means selection never truly pauses rotation — a user reading panel 3 gets yanked to panel 4 after 5s. **Change:** stop auto-rotation permanently on first manual interaction (`const [paused, setPaused] = useState(false)`; skip interval when paused; `setPaused(true)` in the click handler). Required anyway for item 26.

### 21. Breadcrumbs are built but never used
`breadcrumbSchema()` in `src/lib/schema.ts` is exported and unused. Add breadcrumb JSON-LD to `/services/[slug]/page.tsx` (`Home → Services → {name}`), `/services`, `/projects`, `/contact`. Cheap structured-data win for a local-SEO site.

### 22. No sitemap
`public/robots.txt` exists but there is no `app/sitemap.ts`. **Change:** add `src/app/sitemap.ts` generating entries from `LIVE_ROUTES` + `Object.keys(SERVICE_DETAILS)`, using `SITE.host` as base, and reference it from robots.txt (`Sitemap: https://www.pressuretestscotland.co.uk/sitemap.xml`). Note: canonicals already point at `www.pressuretestscotland.co.uk` while the site is served from vercel.app — correct for launch, just confirm the domain before go-live (flagged as a working assumption in `site.ts`).

### 23. No Open Graph image
`pageMetadata()` supports `ogImage` but nothing passes one, so shares render bare. Generate one branded 1200×630 (navy, logo, "Water mains commissioning · Scotland") in `public/og.jpg` and set it as the default in `layout.tsx` metadata (`openGraph.images`), letting pages override. Also add `logo`/`image` to `orgSchema()` — LocalBusiness nodes benefit from an image, and Google's LocalBusiness rich result wants one.

### 24. Body content hides behind the mobile action bar
`MobileActionBar` is `position: fixed; bottom: 0; min-height: 56px` at ≤940px, but nothing pads the page bottom, so the footer's last lines (company number, NAP) are permanently covered on mobile. **Change (`src/styles/global.css`):**

```css
@media (max-width: 940px) {
  body { padding-bottom: calc(56px + env(safe-area-inset-bottom)); }
}
```

---

## P3 — Accessibility (WCAG 2.1/2.2 AA)

### 25. Form inputs: focus indicator and contrast failures 🔴
`src/components/ui/QuoteForm.module.css`:
- `input:focus … { outline: none; border-color: var(--color-accent); }` — keyboard focus is a 1px border colour change only. **Fails 2.4.7 Focus Visible** in practice. Fix: change the selector to `:focus` → keep, but add `box-shadow: 0 0 0 3px var(--color-accent-tint); border-color: var(--color-accent);` or simply don't suppress the global `:focus-visible` outline (delete `outline: none`).
- Input borders `--color-border-strong` = `#c2c2c2` on white = **1.55:1 — fails 1.4.11 Non-text Contrast (3:1)** for form-control boundaries. Fix: introduce `--color-input-border: #75808f;` (4.0:1) in `tokens.css` and use it for `.field input/textarea/select` borders.
- Placeholder text also uses `#c2c2c2` (1.55:1) — effectively invisible and low-vision-hostile. Use `--color-text-faint` (`#6e6e6e`, 5.3:1) for `::placeholder`.

### 26. WhyUs: broken ARIA tabs + unstoppable auto-rotation 🔴
`src/components/home/WhyUs.tsx`:
- `role="tablist"/"tab"/"tabpanel"` without `aria-controls`, panel `id`, `aria-labelledby`, or arrow-key handling — **fails 4.1.2** as announced-but-broken tabs.
- Content auto-advances every 5s with no pause/stop control — **fails 2.2.2 Pause, Stop, Hide**.

**Change:** remove the tab roles entirely (they're stylistic buttons updating an adjacent panel — plain `<button aria-pressed={i===active}>` in a `<ul>` is honest and accessible), stop rotation on first interaction (item 20), pause rotation while the section is hovered/focused, and disable it under `@media (prefers-reduced-motion: reduce)` (also add a global reduced-motion rule zeroing the CSS transitions in `global.css` — the site currently has none).

### 27. Reviews carousel: changes are silent to screen readers 🟡
`Reviews.tsx`: pressing Next swaps the figure content with no announcement, `aria-roledescription="slide"` sits on a `<figure>` without `role="group"`, and the dot buttons are 9.6px (`0.6rem`) — **fails 2.5.8 Target Size (24px)**.

**Change:** if item 11's stacked layout is adopted, all of this disappears. Otherwise: wrap the slide in a container with `aria-live="polite"`, add `role="group"` beside the roledescription, and give dots a ≥24px hit area (`width/height: 0.6rem` visual inside a `1.5rem` padded button).

### 28. Mobile menu: minor keyboard gaps 🟢
`Header.tsx`: burger has `aria-expanded` but no `aria-controls` (add `id="primary-nav"` to the `<nav>` and reference it), and Escape doesn't close the open menu (add a `keydown` handler). Low severity — the menu is non-modal and tab order is sane.

### 29. Inert SmartLink spans still look interactive 🟢
`SmartLink`/`Button` render `aria-disabled` spans for dead routes with identical styling to real links (e.g. footer service links if a slug lacks detail content). Sighted users click and nothing happens; nothing communicates why. After items 1–4 there should be **zero** inert instances rendered anywhere — verify by grepping rendered pages; the mechanism can stay for future drafts.

### 30. Quick contrast confirmations (no action needed)
Checked and passing: body `#5b6b7a` on white 4.9:1 ✓ · `#b7c2ce` on `#0b1c2c` ~9:1 ✓ · white on accent `#0a4bd0` 8.6:1 ✓ · project stat labels `rgba(255,255,255,0.72)` on accent ~4.9:1 ✓ · card scrim text ✓. The palette itself is sound; only the form controls (item 25) fail.

---

## Verification checklist (run after implementing)

1. `npm run build` passes; no TS errors from removed icon keys.
2. Home page: click every "Get a Quote" — all navigate (no inert spans). About-section CTA goes to /contact.
3. `/projects` shows only the Currie job (text-card layout, outcome paragraph visible) — or is noindexed if left unlinked.
4. Header shows Home / Services / Contact (+ Projects if enabled); footer coverage links no longer point at /contact.
5. Keyboard-only pass: visible focus ring on every input, button, and link, including the form fields; Escape closes the mobile menu; nothing auto-rotates after interacting with Why-Us.
6. Mobile (390px): footer NAP readable above the action bar; hero anchor CTA scrolls to the form.
7. Form submit: success message promises next-working-day quote; `quote_submitted` event visible in analytics with `source`.
8. `curl https://<host>/sitemap.xml` returns all live routes; share preview (e.g. in Slack) shows the OG image.
9. Lighthouse a11y ≥ 95 on `/`, `/services`, `/contact`; axe DevTools reports no critical issues.
10. `axe` or manual check: WhyUs section has no `role="tab"` remnants; reviews section announces changes (or is static).

## Explicitly out of scope / needs the client, not code

- Real project photos and 1–2 more publish-cleared jobs (unlocks Projects in nav).
- Confirmation of the six hero STANDARDS chips (flagged unconfirmed in `Hero.tsx` comment) — remove any David won't stand behind before launch.
- Google Business Profile link for `SITE.sameAs` + real Google review count to substantiate the 5/5 claim (item 9).
- Accreditation logo files (WIRS / SMAS / SafeContractor) — `AccreditationMark` already supports `logo` paths; text badges are the fallback today.
- Final production domain decision (`www.pressuretestscotland.co.uk` assumed throughout).
