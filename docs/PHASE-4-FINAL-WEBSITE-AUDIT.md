# Phase 4 — Final website audit and file changes

Date: 2026-10-17 · Repository state: HEAD `0bb7fd8` (level with `origin/main`), Phase 3 and Phase 4 changes
uncommitted, nothing staged · **No commits, pushes or deployments were made.**

Companion reports: `docs/PHASE-4-MOBILE-PERFORMANCE-REPORT.md` (performance evidence) and
`docs/PHASE-4-SECURITY-AUDIT.md` (security findings).

## 1. Executive scorecard

**Measured** (Lighthouse, production build, production-like HTTP/2 + Brotli, real GTM configuration):

| | Mobile median | Desktop median |
|---|---|---|
| Home | 91 | 97 |
| Services | 97 | 100 |
| Products | 97 | 100 |
| OBMS product | 94 | 100 |
| Industries | 97 | 100 |
| Contact | 96 | 100 |
| Book | 97 | 100 |
| Engineering | 96 | 100 |
| About | 97 | 98 |
| Team | 93 | 100 |

Pages ≥ 90 on mobile: **10 of 10**. Accessibility 100 and Best Practices 100 on every clean run.

**Estimated** weighted editorial audit (judgement, not a measurement):

| Category (weight) | Phase 3 | **Phase 4** | Evidence |
|---|---:|---:|---|
| Trust and credibility (20%) | 66 | **66** | Unchanged: no testimonials or client permissions on file, legal pages incomplete, SMTP password not yet rotated (SEC-01), nodemailer not yet upgraded (SEC-02) |
| Content and positioning (15%) | 84 | **84** | No content changes in Phase 4 |
| Conversion experience (15%) | 86 | **86** | Contact, booking and menu flows re-verified; no live calendar |
| Technical SEO (15%) | 93 | **93** | 31 routes server-rendered with one title, canonical and H1 each, valid absolute structured data; 38 internal links, 0 broken; sitemap and robots verified |
| Performance (15%) | 85 | **93** | Mobile 91–97 and desktop 97–100 on all 10 pages (lab); LCP ≤ 2.6 s; field data not yet available |
| Accessibility and UX (10%) | 96 | **96** | Lighthouse 100; keyboard, focus return, reduced motion and no-JS hero re-verified |
| Functionality and reliability (10%) | 90 | **92** | Contact API hardened (4 fixes verified); all regression tests pass |
| **Weighted total** | **≈ 84** | **≈ 86** | |

Calculation: 0.20×66 + 0.15×84 + 0.15×86 + 0.15×93 + 0.15×93 + 0.10×96 + 0.10×92 = **86.1**.

**Why not 90+:** the gap is almost entirely Trust and credibility (20% weight). That needs owner evidence
and actions only the owner can take: testimonials, written client permissions, case-study facts, reviewed
legal pages, SMTP password rotation and the nodemailer upgrade. Security findings are reported separately
and counted once, in Trust (release blockers) and Functionality (verified fixes).

**Outstanding issues:** see section 5 and `docs/OWNER-APPROVALS.md` section 8.

## 2. Complete file change inventory

### 2.1 Phase 4 changes

Compared with the snapshot of the Phase 3 working tree taken at the start of Phase 4.

| File | Previous issue | What changed | Why | Measured / expected benefit | Tests | Status |
|---|---|---|---|---|---|---|
| `src/lib/site-config.ts` (new) | Layout components imported the full `site.ts` data module | Holds only the `site` company config object | Keep page data out of the shared bundle | Entry JS 413 → 362 KB raw (133 → 115 KB gzip) | Build, typecheck, smoke 35/35, hydration 12/12 | Pass |
| `src/lib/site.ts` | — | `site` moved out; re-exported (`export { site } from "./site-config"`) so all other imports still work | Same | Same | Same | Pass |
| `src/routes/__root.tsx` | Imported `site.ts`; framer-motion features loaded at `load` | Imports `site-config`; motion features wait for idle after `load` | Smaller entry; feature chunk off the first-paint path | Part of the entry reduction | Hydration, smoke, regression suite | Pass |
| `src/components/site/Nav.tsx` | Imported all products just to show 3 names | Literal labels (identical to the rendered names) | Same | Same | Menu test (open, focus trap, Escape, focus return, navigation) | Pass |
| `src/components/ui/footer-section.tsx` | Imported `site.ts` | Imports `site-config` | Same | Same | Regression screenshots, smoke | Pass |
| `src/components/site/FloatingActions.tsx` | Imported `site.ts` | Imports `site-config` | Same | Same | Touch-label test | Pass |
| `src/components/site/TeamVisualSection.tsx` | 101 KB WebP LCP image; `decoding="async"` on the LCP image | `<picture>` with 74 KB AVIF + WebP fallback; `display: contents` keeps positioning; removed `decoding="async"` | Faster LCP on the Team page | Team mobile 89 → 93, LCP 2.91 → 2.59 s; side-by-side crop visually identical | Lighthouse A/B, overflow, CLS | Pass |
| `src/routes/products.$slug.tsx` | All product showcases bundled into every product page; unused `FluidFlowGrid` import | Showcases (`ObmsShowcase`, `BillingShowcase`, `LmsShowcase`, `HorusCard`, `BentoCard`) are client-side lazy chunks, still fully server-rendered (`import.meta.env.SSR` branch); unused import removed | Less JavaScript per product page | OBMS 93 → 94; server HTML unchanged | Server HTML content check, hydration on 4 product pages, smoke | Pass |
| `src/routes/index.tsx` | Unused imports (`animate`, `useInView`, `useMotionValue`, `useTransform`, `RevealButton`) | Removed. (Lazy below-the-fold sections were tried and **reverted**: Home 93 → 90) | Clean code; avoid a measured regression | Home 92 → 91 (equal within noise) | A/B Lighthouse, story, intro, hero tests | Pass |
| `src/routes/api/public/contact.ts` | Disguised CV files accepted; no body-size cap; GET returned the HTML shell (200); rate-limit key could come from a client-sent `cf-connecting-ip`; unbounded limiter memory | File-signature check (PDF / DOC / DOCX); 413 above 12 MB; `GET` → 405 with `Allow: POST`; key order `x-real-ip` → `x-forwarded-for` → `cf-connecting-ip`; limiter pruning; small `json()` helper | Security hardening (SEC-06 to SEC-09) | 20/20 API tests pass (R1–R5 retests) | Fake-SMTP isolated instance | Pass |
| `public/octapus-3d.html` | three.js from cdnjs without SRI | `integrity="sha512-…"` (matches cdnjs's published hash), `crossorigin`, `referrerpolicy` | Supply-chain protection (SEC-10) | Tampered CDN file would be refused; safe fallback | 3D story test; CDN-blocked test | Pass |
| `public/team-scene.avif` (new) | — | AVIF version of the Team scene (74 KB) | See TeamVisualSection | See above | See above | Pass |
| `docs/OWNER-APPROVALS.md` | Phase 4 items missing | Section 8 added | Owner action list | — | Review | Done |
| `docs/PHASE-4-MOBILE-PERFORMANCE-REPORT.md` (new) | — | Performance report | Deliverable | — | — | Done |
| `docs/PHASE-4-SECURITY-AUDIT.md` (new) | — | Security report | Deliverable | — | — | Done |
| `docs/PHASE-4-FINAL-WEBSITE-AUDIT.md` (new) | — | This report | Deliverable | — | — | Done |

**Totals for Phase 4:** 11 files modified (9 source files, `public/octapus-3d.html`,
`docs/OWNER-APPROVALS.md`) · 5 files created (`src/lib/site-config.ts`, `public/team-scene.avif`, 3 reports) ·
0 files deleted.

- **Dependency changes:** none. nodemailer 10.1.2 was tested in an isolated scratch folder only.
- **Configuration changes:** none (`package.json`, lockfiles, `vite.config.ts`, `eslint.config.js`,
  `vercel.json` and `tsconfig.json` are unchanged in Phase 4).

### 2.2 Earlier uncommitted work (not Phase 4)

Phase 3 changes (29 modified, 8 created, 1 deleted) are listed in `docs/PHASE-3-CHANGE-REPORT.md`. Phases 1
and 2 are already committed in `0bb7fd8`. In total, `git status` now shows 45 uncommitted entries, all
unstaged.

## 3. Final test results

| Test | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | **Pass** |
| ESLint (`src`, `scripts`) | **Pass**: 0 errors, 6 warnings (dev-only Fast Refresh hints) |
| Production build | **Pass** |
| Smoke test (`npm run test:smoke`): 35 pages, redirect, 404, robots, sitemap, security headers | **Pass** |
| Server-rendered SEO audit, 31 routes (titles, canonical, H1, structured data, alt text, prices) | **Pass**: 0 issues |
| Broken internal links (38 unique) | **Pass**: 0 broken |
| Hydration errors, 6 pages × first and returning visit | **Pass**: 12/12 clean |
| Console errors (story run, desktop page set, contact form, menu) | **Pass**: none |
| 3D section: deferred load, scroll hold, completion | **Pass** |
| 3D failure (three.js blocked): page still reachable and visible | **Pass** |
| Keyboard: Tab reaches the footer without being pulled back | **Pass** |
| Horizontal overflow: 9 pages × 7 widths (320–1920) plus 10 content pages × 4 widths | **Pass**: none |
| Touch devices: button labels visible | **Pass** |
| Contact form: validation, ARIA errors, busy state, single submission, focused success | **Pass** |
| Mobile menu: open, focus trap, Escape, focus return, navigation | **Pass** |
| Intro: plays on first homepage visit, no flash for returning visitors, hero visible without JS | **Pass** |
| Smooth scrolling: desktop only; native scroll on touch | **Pass** |
| CLS (first and returning visit) | **Pass**: 0.005 |
| Contact API security (15 initial + 5 retests, fake SMTP) | **Pass**: 20/20 |
| Secret scan (source, client and server bundles, source maps) | **Pass**: 0 |
| Dependency audit | **Findings**: 1 critical (dev-only), 4 high, including nodemailer (SEC-02, open) |
| Lighthouse mobile (HTTP/2, medians) | **Pass**: 10/10 pages ≥ 90 |
| Lighthouse desktop (HTTP/2, medians) | **Pass**: 97–100 |

**Failures fixed during Phase 4:**
- The lazy homepage sections regressed Home, so they were reverted.
- An HTTP/1.1 measurement artefact was replaced by the HTTP/2 setup.
- Runs contaminated by an internet outage and by overlapping sweeps were re-measured cleanly.

**Limitations:**
- Lab data only; no field (CrUX) data yet.
- No production penetration testing.
- Live GTM, Supabase and Vercel configuration was not inspected.

## 4. Route coverage

All public routes were covered by the smoke test, the SEO audit and the link check: Home, About, Team,
Careers, Contact, Book, Support, Services and 9 service pages, Products and 7 product pages, Industries, OIS,
Engineering, Studios, Technology, Marketing, Blog, Privacy, Terms (intentionally `noindex` placeholder),
HTML sitemap, `/mcp` (`noindex`), `/work` (301 → `/products`), `sitemap.xml`, `robots.txt` and `llms.txt`.
The navigation (desktop mega menu and mobile drawer) and the footer were verified in the browser tests.

## 5. Release readiness

**READY FOR DEPLOYMENT AFTER LISTED CONDITIONS**

The code is complete and every test passes. Deploy only after:

1. **The SMTP mailbox password is rotated** and `SMTP_PASS` is updated in Vercel and `.env` (SEC-01). Until
   then, the leaked credential remains usable regardless of the code fix.
2. **nodemailer is upgraded to 10.1.2** with lockfiles regenerated by Bun, followed by a preview deployment
   and one test enquiry (SEC-02).

Also before or shortly after deployment:

- Check `src/start.ts`, `src/client.tsx` and `vite.config.ts` after the next Lovable sync.
- Confirm the GTM consent gating for Leadfeeder and Meta.
- Review field Core Web Vitals 28 days after release.

## 6. Remaining owner actions

See `docs/OWNER-APPROVALS.md` (sections 1–8). Highest priority: SMTP rotation, nodemailer upgrade, SMTP TLS
verification, GTM consent gating, legal review, testimonials and client permissions, and confirming the
service, product and industry wording.
