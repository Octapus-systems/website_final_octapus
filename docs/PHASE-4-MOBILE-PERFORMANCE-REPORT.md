# Phase 4 — Mobile performance report

Date: 2026-10-17 · Code baseline: Phase 3 working tree (uncommitted, on top of commit `0bb7fd8`) ·
Nothing was committed, pushed or deployed.

## 1. Summary

| | Result |
|---|---|
| Mobile Lighthouse ≥ 90 (median), production-like HTTP/2 | **10 of 10 measured pages** (91–97) |
| Desktop Lighthouse (median of 2), HTTP/2 | **97–100 on all 10 pages** |
| Accessibility / Best Practices | 100 / 100 (except runs affected by a local internet drop, see §6) |
| LCP (mobile median) | 2.11–2.59 s on every page |
| TBT (mobile median) | 0–58 ms |
| CLS | ≤ 0.09 on every page (Team 0.090 is the highest) |

**The biggest finding was about measurement, not code.** Earlier phases measured behind a local
HTTP/1.1 proxy. Lighthouse's simulator caps HTTP/1.1 at 6 connections per host and queues every extra
JavaScript chunk, which production (Vercel serves HTTP/2) does not do. Re-measured under a local HTTP/2
proxy, the Phase 3 code was already at 89–97 on mobile. The Phase 4 code changes then lifted the two
pages that were still marginal (Team 89 → 93, OBMS 93 → 94) and held the homepage at 91–92.

## 2. Test environment

- Production build (`npm run build`), Nitro Node server.
- **Production-like front-end:** local TLS + HTTP/2 proxy (self-signed certificate, Chrome run with
  `--ignore-certificate-errors`), Brotli compression, immutable caching of hashed assets. HTTP/2 was
  confirmed in Chrome (`nextHopProtocol: "h2"` for the document and all assets).
- Lighthouse 12.8.2, Chrome 155, default mobile settings (simulated slow 4G, 4× CPU slowdown) and
  `--preset=desktop`.
- **A/B method:** the Phase 3 baseline was rebuilt in a separate scratch folder and served on its own
  port. Baseline and current runs alternated for every page, so machine load affected both equally.
- **Real third-party configuration:** GTM `GTM-5GNZ8V3S` loads exactly as in production (on first
  interaction or about 3 s after page load). Runs where GTM downloaded inside the trace window are
  included in the medians, not filtered out.
- **SEO shows 69 locally by design:** non-production hosts are intentionally `noindex`. That protection
  was not disabled. Production SEO rules were verified separately (31 routes, 0 issues; see the final
  audit report).
- **Limitation:** these are lab measurements on one machine. Real-user INP and CLS (field data) were
  not available. Lab TBT is not INP.

## 3. Results

### 3.1 Mobile — production-like HTTP/2

| Page | Phase 4 start: median [min–max] | **Final: median [min–max]** | Final LCP s | Final TBT ms | Final CLS | Runs (base / final) |
|---|---|---|---:|---:|---:|---|
| Home | 92 [86–94] | **91 [89–92]** | 2.51 | 0 | 0.008 | 5 / 5 |
| OBMS product | 93 [91–93] | **94 [85–95]** | 2.53 | 58 | 0.013 | 5 / 5 |
| Team | 89 [72–94] | **93 [82–93]** | 2.59 | 0 | 0.090 | 5 / 5 |
| Services | 97 [97–97]* | **97 [97–97]** | 2.12 | 0 | 0.003 | 3 / 3 |
| Products | 97 [97–97]* | **97 [96–97]** | 2.12 | 0 | 0.002 | 3 / 3 |
| Industries | 97 [95–97]* | **97 [97–97]** | 2.11 | 0 | 0.035 | 3 / 3 |
| Contact | 96 [96–96]* | **96 [96–96]** | 2.27 | 0 | 0.001 | 3 / 3 |
| Book | 97 [95–97]* | **97 [97–97]** | 2.12 | 0 | 0.005 | 3 / 3 |
| Engineering | 95 [94–97]* | **96 [75–97]** | 2.13 | 44 | 0.001 | 3 / 3 |
| About | 96 [95–97]* | **97 [96–97]** | 2.12 | 0 | 0.009 | 3 / 3 |

\* Baseline runs for these seven pages overlapped a local internet outage (see §6), so their baselines
are indicative only. The final values for all ten pages come from clean runs. The Engineering low run
(75) is a run where GTM fired inside the measurement window.

Final OBMS and Team values were measured on the Phase 4 build before the homepage revert (§5). That
revert only touches `src/routes/index.tsx`, which these pages do not load.

### 3.2 Desktop — HTTP/2, final build (median of 2)

| Home | Services | Products | OBMS | Industries | Contact | Book | Engineering | About | Team |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 97 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 98 | 100 |

Desktop LCP 0.46–0.54 s, TBT 0 ms, CLS ≤ 0.099 (About).

### 3.3 Same pages under the older HTTP/1.1 setup (for continuity with Phase 3)

Phase 4 start, mobile median of 5 (priority pages) or 3: Services 93, Home 87, OBMS 84, Book 93,
Engineering 93, Team 88, Products 93, Industries 93, Contact 91, About 93. Phase 3's reported Services
76 was traced to two measurement artefacts:

1. GTM firing inside the trace window.
2. CPU contention from other work running in parallel (security tests and builds), which delayed the
   observed first paint and made Lighthouse count more requests before it.

Re-measured with nothing else running, Services was 93.

## 4. Root causes found (ranked by measured impact)

| Rank | Bottleneck | Evidence | Status |
|---|---|---|---|
| 1 | **HTTP/1.1 measurement setup** penalising many small JS chunks (6-connection cap) | Same build: HTTP/1.1 Home 87 / OBMS 84 / Team 88 vs HTTP/2 92 / 93 / 89 | Measurement corrected; production already uses HTTP/2 |
| 2 | **GTM firing inside the trace window** (gtm.js + gtag + Leadfeeder, about 330 KB, about 450 ms TBT) | Runs with GTM downloaded score 75–80; same page without it 93+ | Kept as is. GTM still loads about 3 s after load or on interaction; it was **not** pushed further out to dodge the measurement |
| 3 | **Concurrent CPU load during tests** delaying the observed first paint | Observed FCP 1.5 s vs 0.35 s on the same build | Methodology: final runs made with nothing else running |
| 4 | **Team LCP image** (WebP 101 KB) | LCP element `img#scene`; LCP 2.91 s vs FCP 2.21 s | **Fixed:** AVIF 74 KB with WebP fallback → LCP 2.59 s |
| 5 | Shared entry JavaScript (React, router, layout) | 413 KB raw / 133 KB gzip at Phase 4 start | **Reduced** to 362 KB / 115 KB (−14%) |
| 6 | Homepage Speed Index (4.5–4.7 s) | Dominated by the first-visit intro animation (2.5 s) | Accepted: brand intro already shortened in Phase 3 |

## 5. Optimisations (kept or reverted)

| Change | Measured effect | Decision |
|---|---|---|
| `site.ts` company config split into `site-config.ts`; layout components and Nav no longer import the full data module | Entry 413 → 362 KB raw (133 → 115 KB gzip) | **Kept** |
| Product page showcases (OBMS, Billing, LMS, Horus, Bento) loaded as client-side chunks; still rendered on the server | OBMS 93 → 94 (HTTP/2); server HTML unchanged; hydration clean | **Kept** |
| Team scene image: AVIF (74 KB) + WebP fallback via `<picture>`; removed `decoding="async"` from the LCP image | Team 89 → 93, LCP 2.91 → 2.59 s; visual comparison identical | **Kept** |
| framer-motion feature chunk waits for idle after `load` (was `load`) | Removes it from the pre-paint window when paint is late | **Kept** |
| Unused imports removed (homepage framer helpers, `RevealButton`, product `FluidFlowGrid`) | Smaller route chunks | **Kept** |
| Homepage below-the-fold sections as client-side lazy chunks | **Worse:** Home 93 → 90 (Speed Index 3.47 → 4.76 s) under HTTP/2; worse under HTTP/1.1 too | **Reverted** |
| Font preloads (tested in Phase 2) | Worse mobile LCP | Not repeated |

## 6. Measurement integrity notes

- Two sweeps briefly overlapped once, after a session interruption. Their files were reviewed: the
  overlapping baseline for the seven `h2c` pages also coincided with an internet outage on the test
  machine (`net::ERR_INTERNET_DISCONNECTED` for gtm.js in 12 of 21 runs). Those pages were re-measured
  cleanly (0 disconnected runs) for the final table. The Home and OBMS/Team A/B runs were clean.
- Best Practices dropped to 96 only in the runs affected by that outage (a console error for gtm.js).
- No artificial delays, test-only feature switches or alternative experiences were used.

## 7. Raw evidence (local paths)

Folder: `%TEMP%\claude\c--Users-Akshay-Peter-Desktop-AJAY-PERSONAL-Work-Project-Octapus-OISWEB\0e7b895f-87b9-4e8e-9d85-5ab5e40f9f95\scratchpad`

| Path (inside that folder) | Contents |
|---|---|
| `lh\p4base\` | HTTP/1.1 baseline, 52 Lighthouse JSON reports |
| `lh\p4r1\` | HTTP/1.1 round 1 (lazy homepage; later reverted) |
| `lh\h2a-base\`, `lh\h2a-cur\` | HTTP/2 A/B: Home, OBMS, Team (5 each) |
| `lh\h2d-base\`, `lh\h2d-cur\` | HTTP/2 A/B: Home after revert (5 each) |
| `lh\p4mob\` | HTTP/2 final mobile, 7 other pages (3 each) |
| `lh\p4desk\` | HTTP/2 final desktop, 10 pages (2 each) |
| `pw\proxy-h2.mjs`, `ab-h2.sh`, `lhtable.py`, `lhdiag.py` | Proxy, A/B runner and analysis scripts |

The Lighthouse JSON reports include the network waterfall, LCP element and phases, main-thread
breakdown, long tasks and filmstrip. Full raw Chrome trace files were not saved separately.

## 8. Remaining bottlenecks

- **Homepage first-visit intro (about 2.5 s)** keeps the Speed Index at about 4.5 s. Home still scores
  91–92. Shortening it further is a brand decision.
- **GTM** costs about 450 ms of main-thread time and about 330 KB when it runs during the first seconds
  (for example, when a visitor scrolls right away). It can be reduced only in the GTM container: remove
  unused tags, and gate Leadfeeder and Meta on consent. That configuration is outside this repository.
- **Shared runtime** (React + router about 115 KB gzip) is the floor for every page. Going lower would
  need architectural changes (for example partial hydration), which were judged disproportionate.
- **Field data:** check real-user LCP, INP and CLS in Google Search Console or PageSpeed Insights (CrUX)
  28 days after deployment. Lab numbers are not field results.
