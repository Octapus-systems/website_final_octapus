# Phase 3 change report — performance, content and reliability

Date: 2026-10-17 · Baseline: commit `0bb7fd8` ("SEO major changes", which already contains the Phase 1 and
Phase 2 work) · All Phase 3 changes are **uncommitted local changes**. Nothing was committed, pushed or deployed.

## J. Final summary (read this first)

| Item | Result |
|---|---|
| Files modified | 29 (28 code/config files + `docs/OWNER-APPROVALS.md`) |
| Files created | 8 (7 code/asset files + this report) |
| Files deleted | 1 (`public/fonts/fonts.css`, moved to `src/fonts.css`, see section C) |
| Mobile Lighthouse, median of 3 | 76–93 across 10 pages (baseline 50–81). 4 pages ≥ 90, 3 pages 85–88, 3 pages below 85 |
| Desktop Lighthouse, median of 2 | 97–100 on all 10 pages (baseline 88–98) |
| Accessibility / Best Practices | 100 / 100 on every measured page and run |
| Weighted audit estimate | **about 84 / 100** (Phase 2 estimate 78–80). **90+ not reached**, see section F |
| Tests | Typecheck pass · ESLint 0 errors (6 warnings, all dev-only Fast Refresh hints) · production build pass · new smoke test 35/35 pages pass · browser regression suite all pass · hydration 12/12 clean |
| Deployment readiness | Safe to deploy after the owner rotates the SMTP password and checks the GTM timing trade-off. See section H |

## Measurement method

- Production build served by the Nitro Node server, behind a local proxy that adds Brotli/gzip
  compression and immutable caching for hashed assets, which is what Vercel does in production.
  Earlier phases measured an uncompressed local server, so absolute numbers are **not** directly comparable
  with the Phase 1/2 reports. The Phase 3 baseline below was re-measured with this same setup.
- Lighthouse 12.8.2, Chrome 155, default mobile (simulated slow 4G, 4× CPU) and `--preset=desktop`.
- Mobile: 3 runs per page (baseline: 3 runs for 5 pages, 1 run for the other 5). Desktop: 2 runs per page
  (baseline: 1 run). Medians reported, ranges where useful.
- **SEO shows 69 locally for an intended reason:** non-production hosts are deliberately `noindex`
  (`X-Robots-Tag` header plus client-side robots meta), and that protection was **not** disabled to improve
  the score. Production SEO rules were verified separately by server-rendered audits with
  `X-Forwarded-Host: www.octapus.ae`: 31 routes, no issues. The live site scored 100 in Phase 1.

## E. Lighthouse comparison

### Mobile (median)

| Page | Baseline perf | Final perf [range] | LCP s (base → final) | TBT ms (base → final) | CLS final |
|---|---:|---:|---|---|---:|
| Home | 57 | **82** [80–87] | 6.13 → 3.37 | 376 → 38 | 0.009 |
| Services | 78 | **76** [76–93]* | 2.95 → 3.08 | 408 → 459* | 0.003 |
| Products | 61 | **93** [80–93] | 4.90 → 2.63 | 482 → 6 | 0.002 |
| OBMS ERP product | 67 | **83** [81–88] | 4.48 → 3.56 | 492 → 81 | 0.013 |
| Industries | 81 | **92** [89–93] | 2.86 → 2.64 | 328 → 4 | 0.035 |
| Contact | 75 | **91** [90–91] | 3.01 → 2.77 | 468 → 8 | 0.001 |
| Book | 75 | **85** [73–91] | 2.86 → 2.65 | 374 → 190 | 0.005 |
| Engineering | 77 | **87** [76–87] | 2.93 → 3.01 | 438 → 134 | 0.001 |
| About | 64 | **93** [93–93] | 5.60 → 2.63 | 305 → 2 | 0.009 |
| Team | 50 | **88** [88–88] | 13.98 → 3.22 | 533 → 0 | 0.090 |

\* **Why some runs are lower:** Google Tag Manager now starts about 3 seconds after page load (or on first
interaction). In 2 of 3 Services runs, GTM fired inside Lighthouse's measurement window. That added about
330 KB of tag scripts and about 450 ms of blocking time, and those runs scored 76. The run where GTM had not
fired yet scored 93. The same effect explains the low run on Products (80), Engineering (76) and two OBMS
runs. This is a real cost on slow phones, but it arrives after the page is usable. The delay was **not**
lengthened just to move GTM outside the measurement window.

### Desktop (median of 2)

| Page | Baseline | Final | LCP s final | TBT ms final | CLS final |
|---|---:|---:|---:|---:|---:|
| Home | 95 | **98** | 0.72 | 0 | 0.007 |
| Services | 94 | **100** | 0.61 | 0 | 0.002 |
| Products | 95 | **100** | 0.62 | 0 | 0.002 |
| OBMS ERP | 95 | **99** | 0.73 | 0 | 0.018 |
| Industries | 97 | **100** | 0.60 | 0 | 0.003 |
| Contact | 98 | **99.5** | 0.63 | 0 | 0.003 |
| Book | 97 | **100** | 0.60 | 0 | 0.019 |
| Engineering | 94 | **100** | 0.64 | 0 | 0.005 |
| About | 95 | **97** | 0.59 | 0 | 0.099 |
| Team | 88 | **100** | 0.71 | 0 | 0.004 |

Accessibility 100 and Best Practices 100 on all pages, mobile and desktop.

### Iteration log (key pages, mobile median of 3)

| Round | Change set | Home | Contact | OBMS | Services |
|---|---|---:|---:|---:|---:|
| Baseline | `0bb7fd8` | 57 | 75 | 67 | 78 |
| 1 | Remove React Query; intro only on homepage and shorter; LazyMotion; GTM deferred; 3D quality; Team WebP | 79 | 86 | 68 | – |
| 2 | Fonts and Lenis CSS bundled; footer CSS tooltips; motion features after `load` | 82 | 88 | 82 | 89 |
| 3 | Mobile menu lazy-loaded | 80 | 86 | 82 | 89 |
| 4 | Hydrate after first paint (custom client entry) | 86 | 91 | 86 | 93 |
| Final | + OBMS WebP, Lenis desktop-only; 10-page sweep | 82 | 91 | 83 | 76* |

Tried and **reverted** in Phase 2 (not repeated): font preloads made mobile LCP worse.

## Main bottlenecks found and how they were addressed

| Bottleneck (measured) | Evidence | Fix |
|---|---|---|
| Intro overlay played on **every** first-visited page, not just the homepage | Server-rendered HTML of `/contact` contained the overlay | Intro renders only when a visit starts on `/` |
| Intro length about 3.8 s | Timing code | Shortened to about 2.5 s, same sequence; any scroll, touch, click or key dismisses it |
| Third-party tags in the critical window | GTM + gtag + Leadfeeder about 650 ms CPU; largest long task 305 ms | GTM starts on first interaction or about 3 s after load; consent defaults still set first |
| Large entry bundle | 663 KB raw / 201 KB br at baseline | 413 KB raw / 133 KB gzip: removed unused React Query, lazy framer-motion features, lazy mobile-menu dialog, CSS tooltips instead of Radix Tooltip, Lenis loaded on demand for desktop only |
| Three render-blocking stylesheets | Lighthouse render-blocking list | One stylesheet (fonts and Lenis rules bundled) |
| Hydration ran before the first frame | Paint timing; FCP earlier with JS disabled | Custom client entry hydrates after the first paint |
| Team page LCP image 1.8 MB PNG | LCP element `team-scene.png` | 101 KB WebP with `fetchPriority="high"` |
| Below-the-fold OBMS photo 88 KB | Network waterfall | 28 KB WebP at display size |
| 3D scene GPU cost on phones | DPR 2 + MSAA + shadows | DPR capped at 1.5 and MSAA off on high-DPI touch screens; shadows kept |
| 3D failure waited 12 s | Fallback relied on timeout | Scene reports three.js or WebGL failure immediately; page releases at once |
| Lenis frame loop running forever on phones | Code review | Not loaded on touch devices (native scrolling was already used there) |

## A. Complete file inventory (modified files)

All tests listed were run against the final build. "Regression suite" = `verify.mjs` (3D story, CDN failure,
keyboard, overflow at 7 widths × 9 pages, touch labels, contact form, screenshots), plus hydration, intro,
hero, menu and CLS checks, plus `scripts/smoke-test.mjs`.

| File | Original issue | Change | Reason / benefit | Test | Result |
|---|---|---|---|---|---|
| `package.json` | No automated test | Added `test:smoke` script (no new dependencies) | Repeatable route, SEO and header checks | `npm run test:smoke` | Pass (35 pages) |
| `vite.config.ts` | Default client entry hydrates before first paint | `client: { entry: "client" }` | Use `src/client.tsx` | Build + hydration | Pass, 12/12 clean |
| `public/octapus-3d.html` | DPR 2 + MSAA on phones; 12 s wait if three.js or WebGL missing | Low-power quality on touch / small screens; early `octa3d-failed` message | Lower GPU load; instant fallback | CDN-blocked test; story test | Pass (page reachable in about 2 s; hold still works) |
| `public/fonts/fonts.css` | Separate render-blocking request | Moved to `src/fonts.css` (see C) | One fewer blocking request | Fonts load (200 `font/woff2`) | Pass |
| `src/components/site/LoadingScreen.tsx` | Intro about 3.8 s; framer-motion on critical path; no scroll/touch skip | Shorter timings; CSS fade instead of `AnimatePresence`; skip on wheel/touch; `markLoaded` exported. Whole file reformatted by Prettier (it was unformatted at HEAD) | Faster, lighter, dismissible intro | Intro test (first and returning visit) | Pass (plays once, no flash for returning visitors) |
| `src/routes/__root.tsx` | Unused React Query provider; GTM loaded immediately; intro on all pages; separate font stylesheet | Removed React Query; GTM deferred loader; intro only when landing on `/`; `LazyMotion` with features after `load`; font link removed | Smaller bundle, less main-thread work | Hydration, smoke, regression | Pass |
| `src/router.tsx` | Created an unused `QueryClient` | Removed | Dead code out of bundle | Build | Pass |
| `src/components/site/Nav.tsx` | Radix Dialog stack in every page's JS | Mobile drawer lazy-loaded (client-only import, prefetched on intent); `m` components | Smaller entry; no SSR chunk cycle | Menu test | Pass (opens, focus trapped, Escape closes, focus returns, links work) |
| `src/components/site/Octapus3DSection.tsx` | Waited for timeout on failure | Handles `octa3d-failed` | Instant release | CDN-blocked test | Pass |
| `src/components/site/SmoothScroll.tsx` | Lenis imported and run on all devices | Dynamic import, desktop (fine pointer) only | Less JS and no frame loop on phones | Lenis test | Pass (desktop: active; iPhone: not requested; scrolling works) |
| `src/components/ui/footer-section.tsx` | Radix Tooltip + floating-ui for 6 icon tooltips | CSS tooltip (`HoverTip`) with same position and colour; shows on hover and focus | Smaller entry bundle | Regression screenshots, a11y 100 | Pass |
| `src/components/site/TeamVisualSection.tsx` | 1.8 MB PNG LCP image | WebP + `fetchPriority="high"` | Team LCP 14 s → 3.2 s | Lighthouse | Pass |
| `src/components/site/ObmsShowcase.tsx` | 88 KB oversized JPG | 28 KB WebP, correct dimensions | Less bandwidth | Lighthouse | Pass |
| `src/routes/index.tsx` | `What we build` section hidden from screen readers until the 3D story ended; JPG fallback import | Removed `aria-hidden` gating (visual fade unchanged); WebP import; `m` components | Services list reachable by assistive technology | a11y 100, keyboard test | Pass |
| `src/components/site/BuildProcessSection.tsx`, `CustomApproachSection.tsx`, `OctapusAdvantageSection.tsx`, `ScrollVideoSection.tsx`, `WhatWeBuildSection.tsx`, `WhyItChangesSection.tsx`, `src/components/ui/bento-card.tsx`, `components-primitives-avatar.tsx`, `timeline.tsx` | Imported full `motion` component | Import `m as motion` (works with `LazyMotion`) | Animation engine out of entry bundle | Story/timeline/visual checks | Pass |
| `src/components/site/ServicePageTemplate.tsx` | Services lacked explicit benefits and integrations; single CTA | "What you can expect" + "Typically connects with" section; "Book a strategy call" button | Clearer service pages and next step | Overflow test, SEO audit | Pass |
| `src/lib/service-pages.ts` | No `outcomes` / `connectsWith` data | Added for all 9 services (qualitative, no figures or client claims) | Content completeness | Typecheck | Pass |
| `src/routes/products.$slug.tsx` | Most product pages did not show who it's for / problem / outcome | "At a glance" block from existing data + engagement steps from existing process data + walkthrough/booking CTAs | Product clarity and conversion | Overflow test (incl. long names), SEO audit | Pass |
| `src/lib/site.ts` | Unverified "24/7" promise in Operate service text | Qualified to "response times agreed in each support plan" | Avoid unsupported promise | Smoke | Pass |
| `src/routes/technology.tsx` | Unverified "every two weeks" promise | Qualified to "short, regular cycles" | Avoid unsupported promise | Smoke | Pass |
| `src/styles.css` | Fonts and Lenis CSS as separate blocking files | `@import` of `lenis/dist/lenis.css` and `./fonts.css` | One render-blocking stylesheet | Build, font load | Pass |
| `docs/OWNER-APPROVALS.md` | Phase 3 items missing | Added section 7 | Owner action list | Review | Done |

## B. Newly created files

| File | Purpose |
|---|---|
| `src/client.tsx` | Custom client entry: identical to TanStack Start's default but hydrates after the first paint (immediately in hidden tabs) |
| `src/lib/motion-features.ts` | framer-motion `domMax` features, loaded asynchronously by `LazyMotion` |
| `src/components/site/MobileMenuSheet.tsx` | Lazy-loaded mobile navigation drawer (Radix Sheet); returns focus to the menu button on close |
| `src/fonts.css` | Self-hosted font-face rules (moved from `public/fonts/fonts.css`), bundled into the main stylesheet |
| `public/team-scene.webp` | 101 KB WebP of the Team scene (the original 1.8 MB PNG is kept, unused) |
| `src/assets/obms-business.webp` | 28 KB WebP of the OBMS photo (the original JPG is kept, unused) |
| `scripts/smoke-test.mjs` | Dependency-free smoke test for a running build (routes, titles, canonicals, H1, OG image, schema rules, noindex, redirect, 404, robots, sitemap, security headers) |
| `docs/PHASE-3-CHANGE-REPORT.md` | This report |

## C. Deleted files

| File | Justification |
|---|---|
| `public/fonts/fonts.css` | Not lost: moved to `src/fonts.css` and bundled into the main stylesheet, removing a render-blocking request. The font files in `public/fonts/` are unchanged. |

No other files were deleted. Replaced originals (`team-scene.png`, `obms-business.jpg`) were kept so nothing
is lost; they can be removed later.

## D. Before-and-after results

| File / component | Previous problem | Exact change | Result | Test status |
|---|---|---|---|---|
| Intro (`LoadingScreen`, `__root`) | About 3.8 s, on every landing page, framer-dependent | Homepage-only, about 2.5 s, CSS fade, skip on any input | Inner pages paint content immediately | Pass |
| Entry JS | 663 KB raw / 201 KB br | Removed or lazy-loaded React Query, framer features, Radix Dialog, Radix Tooltip, Lenis | 413 KB raw / 133 KB gzip | Pass |
| GTM | Loaded during first render | Starts on interaction or about 3 s after load | TBT near 0 when GTM has not fired | Pass (analytics trade-off noted) |
| Hydration | Before first paint | After first paint | FCP and LCP improvements (round 4) | Pass, 12/12 hydration clean |
| CSS | 3 blocking stylesheets | 1 stylesheet | Fewer blocking requests | Pass |
| Team image | 1.8 MB PNG | 101 KB WebP, high priority | Team mobile 50 → 88 | Pass |
| 3D scene | Heavy on phones; slow failure path | Low-power quality; instant failure signal | Same look on desktop; safe fallback | Pass |
| Services / products content | Missing benefits, integrations and "at a glance" | Added from existing site facts | Clearer pages | Pass (overflow, SEO) |
| Mobile menu | Dialog code on every page | Lazy-loaded | Smaller bundle; behaviour unchanged | Pass |

## F. Audit score comparison (editorial estimate, not a measurement)

| Category (weight) | Phase 2 estimate | Phase 3 estimate | Evidence |
|---|---:|---:|---|
| Trust and credibility (20%) | ~62 | **66** | Unsupported promises qualified; still no testimonials, no client permissions on file, thin privacy policy, placeholder terms, SMTP password not yet rotated |
| Content and positioning (15%) | ~82 | **84** | Services gained benefits and integrations; product pages gained "at a glance"; industries specific (Phase 2) |
| Conversion experience (15%) | ~83 | **86** | Walkthrough + booking CTAs on products and services; menu and forms verified; no live calendar yet |
| Technical SEO (15%) | ~92 | **93** | 31 routes SSR-audited with no issues; schema valid; sitemap and robots verified; terms intentionally noindexed |
| Performance (15%) | ~60 | **85** | Desktop 97–100; mobile 76–93 (4 pages ≥ 90); mobile LCP 2.6–3.6 s |
| Accessibility and UX (10%) | ~95 | **96** | Lighthouse a11y 100 everywhere; keyboard, focus return, reduced motion; services list no longer hidden from screen readers |
| Functionality and reliability (10%) | ~88 | **90** | Full regression suite passes; new smoke test; one high-severity nodemailer advisory open |
| **Weighted total** | **78–80** | **≈ 84** | |

**Why 90+ is not defensible yet:**
1. Trust (20% weight) is capped by missing owner evidence: testimonials, written client permission for logos,
   case-study facts, reviewed privacy and terms text, and SMTP password rotation.
2. Mobile performance is 90+ on only 4 of 10 pages. The remaining limiters are the size of the React and router
   runtime (about 133 KB gzip) on simulated slow 4G, the homepage intro, and GTM's cost when it fires inside the
   measurement window. Further gains would need deeper architectural changes (for example reducing hydration
   scope), which were judged disproportionate for this phase.

## G. Regression checks (final build)

| Check | Result |
|---|---|
| 3D section: deferred load, scroll hold, story completes | Pass |
| 3D failure (three.js blocked): page fully scrollable, content visible | Pass (about 2 s) |
| Keyboard reaches footer without being pulled back | Pass |
| No hydration error #418, first and returning visits (6 pages) | Pass, 12/12 |
| Intro: plays on first homepage visit; no flash for returning visitors; not on inner pages | Pass |
| Hero visible without JavaScript; entrance animation after intro | Pass |
| Product schema has no `price: 0`; book schema has no price | Pass (smoke test) |
| Social image is the 1200×630 PNG | Pass |
| Touch-device button labels visible | Pass |
| Button contrast AA | Pass (a11y 100) |
| Contact form: validation, `aria-invalid` / `aria-describedby`, busy state, single submission, focused success (request intercepted; no email sent) | Pass |
| No hardcoded SMTP credentials; secrets only server-side | Pass (code search) |
| Support `mailto:` / `tel:` links | Pass |
| Security headers | Pass (smoke test) |
| SEO: one title, canonical and H1 per page; absolute schema URLs | Pass (31 routes) |
| No horizontal overflow (9 pages × 7 widths + 10 content pages × 4 widths) | Pass |
| Mobile menu: open, focus trap, Escape, focus return, navigation | Pass |
| Lenis: desktop only, scrolling works on both | Pass |
| All 33 public routes plus sitemap, robots and llms.txt return 200 | Pass |

## H. Remaining owner actions

See `docs/OWNER-APPROVALS.md` (sections 1–7). Most important:

1. **OWNER ACTION REQUIRED: Rotate the affected mailbox password and update `SMTP_PASS` in the deployment and
   local environments.** The code fix alone does not resolve the exposure in git history.
2. Upgrade **nodemailer** to 10.x (high-severity advisory; low exposure in this code) and run one test enquiry.
   This was not done automatically because it rewrites both lockfiles used by Lovable.
3. Confirm the **GTM timing trade-off**: visitors who leave within about 3 s without interacting are not tracked.
4. Gate **Leadfeeder** on consent in GTM.
5. Legal review of privacy and terms; testimonials and client permissions; case-study evidence; Cal.com link.
6. Confirm the qualified support and delivery promises, and the new service and product wording.
7. After the next Lovable sync, check `src/start.ts`, `src/client.tsx` and `vite.config.ts`.

## I. Git status (read-only)

- HEAD: `0bb7fd8 SEO major changes` — level with `origin/main`. That commit contains the Phase 1 and Phase 2
  work, which the owner committed before Phase 3 started.
- Everything below is **Phase 3 only** (uncommitted, nothing staged):
  - Modified (28): `package.json`, `public/octapus-3d.html`, `src/components/site/{BuildProcessSection,
    CustomApproachSection, LoadingScreen, Nav, ObmsShowcase, Octapus3DSection, OctapusAdvantageSection,
    ScrollVideoSection, ServicePageTemplate, SmoothScroll, TeamVisualSection, WhatWeBuildSection,
    WhyItChangesSection}.tsx`, `src/components/ui/{bento-card, components-primitives-avatar, footer-section,
    timeline}.tsx`, `src/lib/{service-pages, site}.ts`, `src/router.tsx`, `src/routes/{__root, index,
    products.$slug, technology}.tsx`, `src/styles.css`, `vite.config.ts`, plus `docs/OWNER-APPROVALS.md`
  - Deleted (moved): `public/fonts/fonts.css`
  - New: `public/team-scene.webp`, `scripts/smoke-test.mjs`, `src/assets/obms-business.webp`,
    `src/client.tsx`, `src/components/site/MobileMenuSheet.tsx`, `src/fonts.css`, `src/lib/motion-features.ts`,
    `docs/PHASE-3-CHANGE-REPORT.md`
- No commits, pushes, deployments, history rewrites or pull requests were made.

## How to reproduce

```bash
npm run build
PORT=3000 node .output/server/index.mjs     # SMTP vars not needed for these checks
npm run test:smoke -- http://localhost:3000
```
