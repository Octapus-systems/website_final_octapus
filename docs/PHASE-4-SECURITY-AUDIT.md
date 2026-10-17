# Phase 4 — Security audit

Date: 2026-10-17 · Scope: local repository and local test instances · No production systems were
modified, scanned intrusively or exploited · No real email was sent · No credentials appear in this report.

## 1. Executive summary

| Severity | Open | Fixed in Phase 4 (verified locally) | Not tested / owner-verified |
|---|---:|---:|---:|
| Critical | 0 | 0 | — |
| High | 2 | 0 | — |
| Medium | 3 | 0 | — |
| Low | 1 | 4 | — |
| Informational | 3 | 0 | 1 |

**Release blockers (owner action):**

1. **SEC-01:** the historical SMTP password is exposed in git history. It must be treated as compromised
   until the mailbox password is rotated. This is **open** until rotation is confirmed.
2. **SEC-02:** nodemailer 9.0.5 has 7 high-severity advisories. A compatible patched version (10.1.2) was
   verified in isolation but **not yet installed** in the project, because `bun.lock` could not be
   regenerated here.

Automated checks passing does **not** mean the site is "100% secure". The items in section 4 were not
tested.

## 2. Methodology

| Area | Method |
|---|---|
| Secrets | Pattern search across `src`, `scripts`, `supabase`, `docs`, `public/*.html` and config; the built client (`.output/public`) and server (`.output/server`) bundles; source maps; tracked env files; git history (count of commits only) |
| Dependencies | `npm audit` (full tree, JSON), `npm ls` dependency paths, installed versions, `npm view` for patched releases |
| Contact API | Isolated app instance (no `.env`) pointed at a **local fake SMTP sink** that captures messages and never relays them; 20 scripted tests (15 initial + 5 retests after hardening) |
| nodemailer upgrade | `nodemailer@10.1.2` installed in a scratch folder (project untouched); our exact transport and message shape sent to the fake sink; `npm audit` of that package |
| Headers | Local build response headers; **one** read-only GET of the production homepage |
| Supabase | Static review of `supabase/migrations/*.sql` and `config.toml`; client usage search. **No live database access** |
| Third-party scripts | Source review; Lighthouse network logs; Subresource Integrity hash verified against cdnjs's published value |

## 3. Findings

### SEC-01 — Historical SMTP password in git history · **High** · Open (owner-dependent)

- **Component:** `src/routes/api/public/contact.ts` (historical versions); repository history.
- **Evidence:** `git log -S` finds 4 commits containing the literal. The current source, built client
  bundle and built server bundle contain **0** occurrences. One file in the gitignored, untracked local
  folder `.vercel/output` (an old build) still contains it.
- **Impact:** anyone with access to the repository history (GitHub `Octapus-systems/website_final_octapus`)
  can read the mailbox password. They could then send mail as `info@octapus.ae` (phishing, spam,
  reputation damage) or read the mailbox, if the account allows it.
- **Verification:** code search and history search (counts only).
- **Remediation:** rotate the mailbox password. Update `SMTP_PASS` in Vercel and local `.env`. Delete the
  local `.vercel/output` folder (Vercel recreates it). Review mailbox sending logs for misuse. Do not
  rewrite history (it breaks the Lovable sync); rotation makes the leaked value useless.
- **Status:** the code fix is verified. **Exposure remains open until rotation is independently confirmed.**

### SEC-02 — nodemailer 9.0.5 vulnerable · **High** · Open (fix path verified)

- **Installed:** 9.0.5 (`package.json`: `^9.0.5`). **Patched:** ≥ 10.0.6; latest 10.1.2.
- **Advisories:** GHSA-8m3c-c648-2xjj, GHSA-wmmp-3585-3rmp, GHSA-2x7j-588g-ccc2, GHSA-cc9r-2j5m-2m83,
  GHSA-6vj9-mwq6-2f5v, GHSA-8vvx-rff5-p5rq, GHSA-v53p-9fqp-m79j (all rated high).
- **Exposure in this code:** low to moderate.
  - Visitor input reaches nodemailer through `replyTo` (email) and `subject` (name). Both are validated
    first: email format, at most 200 / 120 characters. That limits the address-parser denial-of-service
    advisories.
  - Recipients are fixed internal addresses, so the recipient-validation bypasses do not apply.
  - `resolveContent()` is not used.
- **Verification:** nodemailer 10.1.2 in isolation reports 0 advisories. Our `createTransport` /
  `sendMail` with `replyTo`, text body and a PDF attachment were delivered correctly to the fake sink.
  CRLF injection was still neutralised.
- **Remediation:** with Bun available (as Lovable uses), run `bun add nodemailer@^10.1.2` (or npm and
  regenerate both lockfiles). Then rebuild, deploy to a preview, and send one test enquiry.
- **Status:** open. **Not** fixed in this repository; installed version is still 9.0.5.

### SEC-03 — SMTP TLS certificate verification disabled · **Medium** · Open (owner-dependent)

- **Evidence:** `tls: { rejectUnauthorized: false }` in the transport.
- **Impact:** an attacker able to intercept traffic between the server and `mail.octapus.ae` could pose as
  the mail server and capture the SMTP credentials and enquiry contents.
- **Remediation:** confirm the mail host presents a valid certificate, remove the option, and test one
  enquiry. It was left unchanged so production mail does not break unexpectedly.

### SEC-04 — No Content Security Policy · **Medium** · Open

- **Evidence:** no `Content-Security-Policy` header locally or on production (read-only check).
- **Impact:** no second line of defence if a cross-site scripting bug or a compromised third-party script
  ever occurs. No XSS was found: user input is never rendered as HTML, and email is sent as `text/plain`.
- **Remediation:** start with `Content-Security-Policy-Report-Only` covering `self`, GTM / Google Analytics,
  Meta, Leadfeeder, cdnjs and Cal.com. Collect reports, then enforce. This needs GTM tag inventory from
  the owner, so it was not enabled blind.

### SEC-05 — Leadfeeder (via GTM) loads before cookie consent · **Medium (privacy)** · Open (owner-dependent)

- **Evidence:** Phase 1 network logs showed `sc.lfeeder.com` loading with consent defaulted to "denied".
  Configured in the GTM container, not in this repository.
- **Remediation:** in GTM, require `analytics_storage = granted` (and the `consent_update` event) for the
  Leadfeeder tag, and review the Meta Pixel similarly. Legal review is needed for UAE PDPL / GDPR. **No
  compliance claim is made.**

### SEC-06 — Rate limiting is best-effort · **Low** · Partially fixed

- **Evidence:** in-memory per-instance limiter (5 per 60 s per IP). On serverless each instance has its own
  memory. Test T9: rotating `X-Forwarded-For` (with no platform IP header) was not limited.
- **Fixed in Phase 4:**
  - The key now prefers platform-set `x-real-ip`. Retest R5: rotating a client-sent `cf-connecting-ip` no
    longer bypasses the limit.
  - Memory is now bounded (stale clients are pruned above 5,000 entries).
- **Remaining:** confirm Vercel sets `x-real-ip` and overwrites `X-Forwarded-For` (not verifiable
  locally). For stronger protection, add a shared store (for example Upstash or Vercel KV) or a CAPTCHA /
  Turnstile.

### SEC-07 — CV upload validated by file extension only · **Low** · **Fixed**

- **Before:** test T10: an executable's bytes named `cv.pdf` were accepted and emailed.
- **Fix:** file-signature check for PDF (`%PDF`), DOC (OLE2) and DOCX (ZIP) after the extension check.
- **Verified:** R1 disguised file rejected (400, not delivered). R2 real PDF / DOCX / DOC accepted.

### SEC-08 — No request-size cap before parsing · **Low** · **Fixed**

- **Fix:** bodies over 12 MB (10 MB CV plus overhead) are rejected with 413 before `formData()` or
  `json()` parsing. Vercel also caps function bodies in production.
- **Verified:** R4 13 MB body returns 413.

### SEC-09 — GET on the API returned the site's HTML with status 200 · **Low** · **Fixed (locally)**

- **Before:** T13: `GET /api/public/contact` returned the app shell with 200 (production still does).
- **Fix:** explicit `GET` handler returning `405` with `Allow: POST`.
- **Verified:** R3.

### SEC-10 — three.js from cdnjs without Subresource Integrity · **Low** · **Fixed**

- **Fix:** `integrity="sha512-dLxU…qQ=="`, `crossorigin="anonymous"` and `referrerpolicy="no-referrer"` on
  the script in `public/octapus-3d.html`. The hash was computed locally and matches cdnjs's published SRI.
  If the CDN file is ever altered, the browser refuses it and the 3D section falls back safely (Phase 3
  failure path, retested).

### SEC-11 — Development and build tooling advisories · **Informational** · Open

- shell-quote 1.10.0 (**critical**, GHSA-pqg4-j6r4-53mv) via `@tanstack/devtools-vite` → `launch-editor`
  (dev server only). brace-expansion (high, 3 advisories) and js-yaml (high) via ESLint. source-map-js
  (high) via build tooling.
- **Not shipped:** none of these appear in the client or server bundles. **Remediation:** `npm audit fix`
  plus tooling updates, with lockfiles regenerated by the package manager Lovable uses.

### SEC-12 — Supabase row-level security not verifiable from the repository · **Informational** · Not tested

- The migrations define role-based policies on `user_roles`, `posts`, `leads` and `site_content`, through a
  `SECURITY DEFINER` helper in a locked-down `private` schema with a fixed `search_path` (good practice).
  The `CREATE TABLE` / `ENABLE ROW LEVEL SECURITY` statements are not in the repository, so RLS on the live
  database was **not verified**.
- The public website does not use Supabase at runtime: no client or route imports, and no Supabase key in
  the client bundle.
- **Remediation:** run Supabase's security advisor in the dashboard and confirm RLS is enabled on every
  public table.

### SEC-13 — Server logs contain enquiry metadata · **Informational**

- `console.info` logs enquiry type, company, preferred contact method and recipient (no message body,
  email or phone). It is acceptable, but should be mentioned in the privacy policy, and log retention
  should be known.

### SEC-14 — Privacy policy incomplete; terms page placeholder · **Informational (legal)** · Open

- Owner and legal review required (see `docs/OWNER-APPROVALS.md`, section 2). No compliance claim is made.

## 4. Verified controls (passed)

| Control | Evidence |
|---|---|
| No hardcoded credentials in current source or bundles | Pattern scans: 0 hits in source, client and server bundles; only `.env.example` is tracked |
| No published source maps | 0 `.map` files in `.output/public` |
| Server-side-only secrets | `SMTP_*` read only in the API route; no `SMTP_` strings in the client bundle |
| Fails safely without SMTP config | Missing `SMTP_PASS` → generic 500; no fallback credential |
| Header injection | T2: CRLF in the name is folded into the subject; no `Bcc` or extra recipient. T3: CRLF or list in the email field rejected |
| Validation and limits | T4–T6: server-side length limits, enum check, malformed JSON → 400 |
| Bot honeypot | T7: silent 200, nothing sent |
| Rate limit (same IP) | T8: 6th request → 429 |
| Error disclosure | T14: validation errors have no stack trace or config; generic error page for SSR failures |
| Output encoding | T15: user input emailed as `text/plain` |
| Security headers | Locally and on production: HSTS (production, Vercel), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` |
| Cookies | The application sets no cookies (0 `Set-Cookie` across 5 routes); analytics cookies depend on GTM and consent |
| External links | No `target="_blank"` without `rel="noopener"` in source |
| Duplicate submission | Contact form sends exactly one request on double-click (browser test) |

## 5. Not tested / limitations

- No production penetration testing, scanning or exploitation (by instruction).
- Live Vercel, Supabase and GTM configuration was not inspected beyond one read-only request for the homepage
  headers.
- Whether Vercel overwrites `X-Forwarded-For` and sets `x-real-ip` was not verified.
- Whether the mailbox password has been rotated **cannot be verified** from here.
- Mailbox, DNS (SPF / DKIM / DMARC) and account security were out of scope.

## 6. Owner actions (in priority order)

1. Rotate the SMTP mailbox password. Update `SMTP_PASS` in Vercel and `.env`. Delete `.vercel/output`.
2. Upgrade nodemailer to 10.1.2 with lockfiles regenerated by Bun; preview-deploy and send one test enquiry.
3. Re-enable SMTP certificate verification after confirming the mail host's certificate.
4. Gate Leadfeeder and Meta on consent in GTM; then add a report-only CSP.
5. Run `npm audit fix` and update tooling (dev-only advisories).
6. Confirm Supabase RLS in the dashboard.
7. Legal review of the privacy policy and terms.
