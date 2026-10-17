# Octapus website — items that need an owner decision

Prepared 2026-10-17 alongside the website optimisation changes. Nothing below has been changed
on the site, because each item needs business facts, credentials, legal review or a brand decision.

## 1. Urgent — security

| Item | What to do |
| --- | --- |
| **SMTP password was committed to git** (fallback in `src/routes/api/public/contact.ts`, present since commit `5e261b6`). The fallback has been removed from the code, but the password is still in the repository history. | Change the `info@octapus.ae` mailbox password now, then update `SMTP_PASS` in Vercel's environment variables and the local `.env`. Rewriting git history is **not** recommended (it breaks the Lovable sync). |
| SMTP TLS certificate checks are disabled (`tls.rejectUnauthorized: false`). | Ask the mail host whether `mail.octapus.ae` presents a valid certificate. If it does, remove that option. It was left unchanged so contact-form email keeps working. |
| Leadfeeder (`sc.lfeeder.com`) loads even when the visitor has not accepted cookies. It's added through Google Tag Manager, not the website code. | In GTM (`GTM-5GNZ8V3S`), gate the Leadfeeder tag on consent (`analytics_storage = granted` plus the `consent_update` event), the same way `docs/gtm/README.md` documents for the Meta Pixel. |

## 2. Legal pages

- **Terms of Service** was empty. It now shows a short "being finalised" notice with a contact email, and
  it is `noindex` and left out of `sitemap.xml`. When the real terms are ready: replace the notice in
  `src/routes/terms.tsx`, remove `noindex: true`, and add `"/terms"` back to `src/routes/sitemap[.]xml.ts`.
- **Privacy Policy** is a single sentence, yet the contact form and cookie banner both link to it.
  It needs full text reviewed by your legal adviser (UAE PDPL). Facts about what the site actually
  collects, taken from the code, for that review:
  - Contact form: name, company, email, phone, enquiry type, message, preferred contact method,
    budget, timeline, and a CV file for career enquiries. It is sent by email to Octapus mailboxes
    and is not stored in a database by the website.
  - The visitor's IP address is held in server memory for about 60 seconds to rate-limit the form.
  - Google Tag Manager, Google Analytics 4 (`G-579G2QXXQR`) and Meta Pixel (via GTM), with Google
    Consent Mode v2 defaulting to "denied"; plus Leadfeeder (see above).
  - Browser storage: `octapus-consent` (localStorage, the cookie choice) and
    `octapus_intro_seen` (sessionStorage, so the intro plays only once per visit).
  - Third parties contacted by the site code: cdnjs (three.js, loaded only when the 3D section is
    reached). Fonts are self-hosted (public/fonts), so Google Fonts is no longer contacted.
    WhatsApp and email links open external apps.

## 3. Facts to confirm (shown on the site today)

| Claim / data | Where | Question |
| --- | --- | --- |
| Technical email is `code@octapus.info` (not `.ae`). Support-type enquiries are also routed there. | `src/lib/site.ts` (`emails.tech`), `src/lib/contact-schema.ts` | Is `octapus.info` an active domain you own? The Team page lists `code@octapus.ae`. |
| Shabab and Jishad share `+971 50 266 0388`; the support line is `+971 50 292 0388`; sales is `+971 50 266 1088`. | `src/lib/site.ts` | Please confirm each number is correct. |
| "24/7 monitoring/support" | Operate service text, FAQ data | Is 24/7 support actually contracted and staffed? |
| "Working software every two weeks" | `/technology` | Is this standard on every engagement? |
| "Reply within one business day" | Contact success message, Studios form, Book page | Confirm it is a commitment you can keep. |
| "Free 30-minute strategy call" | Home FAQ, Book page, Book page schema (`price: 0`) | Confirm the call is free. |
| `availableLanguage: English, Arabic` | Contact page structured data | Is Arabic-language support available? |

## 4. Trust and credibility content (would raise the audit score most)

The site has **no customer testimonials**. The "Selected Work" section shows four client names and logos
(Bab Al Madeena, Encore Executive, Castle Craft, Mehar Collective). Nothing was invented or added. To
strengthen trust:

1. Confirm in writing that each of the four clients agreed to have its **name and logo** shown.
2. Collect 2–3 real quotes with each person's name, role and company, plus their permission to publish.
   They can go into the existing Selected Work carousel.
3. For each project, provide verified facts: what the challenge was, what was delivered, the
   technology used, and any measurable result the client agrees to publish.
4. Optionally provide your trade licence number and issuing authority (DED / Ajman DED). Showing them
   in the footer is a strong UAE trust signal.
5. Unused placeholder statistics exist in `src/lib/site.ts` (`stats`: "120+ systems", "98% retention",
   "10+ years"). They are **not shown anywhere**. Keep them hidden unless each number can be evidenced.

## 5. Optional decisions

- **Online booking:** `site.calLink` is empty, so `/book` asks visitors to request a time. Add your
  Cal.com event link (e.g. `octapus/strategy-call`) to `src/lib/site.ts` to show a live calendar.
- **First-visit intro animation:** it covers the page for about 3.5–4 seconds on a visitor's first page
  view in each browser session, and it is the main reason mobile LCP is high. Shortening it would
  improve Core Web Vitals. This is a brand decision, so it was left as is.
- **Favicon:** the SVG favicon is the full wordmark, which is hard to read at 16 px. A mark-only icon
  (`/favicon-48.png`, now included) would read better if you decide to make it the primary icon.
- **Placeholder product pages** (`/products/algorithem`, `buy`, `blueprint`, `icon`, `oprate`) remain
  `noindex`. Product names were kept exactly as they are (including the `algorithem` URL).

## 6. Phase 2 changes and open decisions (added 2026-10-17)

**Changes made locally (not committed):**
- Homepage hero text is now visible in the server HTML. It was previously invisible until the intro
  finished, which was the largest contributor to slow mobile LCP. The entrance animation still plays after
  the intro, so the first-visit sequence is unchanged.
- Reduced-motion visitors skip the intro. Escape, Enter or Space also skips it. The intro never traps
  focus, has no focusable controls, and is `aria-hidden` because it is decorative.
- The Supabase auth middleware is no longer registered in `src/start.ts`. No server function uses it, and
  it shipped about 200 KB of unused code to every visitor. **Lovable regenerates files marked "automatically
  generated", so check `src/start.ts` after the next sync.**
- Fonts (Urbanist, Epilogue) are self-hosted in `public/fonts`. The Google Fonts stylesheet is no longer
  requested.
- Industries page: each sector now shows a common problem, a typical system and a business benefit, in
  place of the repeated placeholder line. These are general descriptions. Confirm they match real work
  before they stay.
- Book page structured data no longer declares a price of 0 (see item 3 below).

**Still needs an owner decision:**
1. **SMTP password rotation (still required).** The old password is in git history. Change it, then update
   `SMTP_PASS` in Vercel and in your local `.env`. The code change alone does not resolve this.
2. **First-visit intro length.** On a first visit the intro covers the page for about 4 seconds. It is the
   main remaining cost on mobile. Shortening it would help mobile performance, but it is a brand decision,
   so it is unchanged. Mobile Lighthouse runs vary between about 40 and 55, so a mobile score of 90 is not
   realistic without this decision.
3. **Free strategy call.** Confirm the call is free before the site and FAQ keep saying so.
4. **Industry descriptions.** Confirm each sector description reflects real work, or send your own wording.
5. **Legal review** of the privacy policy and the terms page (section 2 above).
6. **GTM tags.** Confirm the Leadfeeder tag is gated on consent in GTM (`GTM-5GNZ8V3S`). Nothing in this
   repository controls it.

**Measurement notes:**
- Local Lighthouse runs use an uncompressed Node server. Production serves Brotli-compressed assets (the main
  stylesheet is about 24 KB there), so local network numbers overstate production transfer size.
- Mobile results are bimodal between runs, so compare medians across at least three runs.

## 7. Phase 3 updates (added 2026-10-17)

Full details are in `docs/PHASE-3-CHANGE-REPORT.md`.

**Resolved in Phase 3:**
- **Intro length (Phase 2 item 2).** Shortened from about 3.8 s to about 2.5 s with the same sequence. It now
  plays only when a visit starts on the homepage, and any scroll, touch, click or key dismisses it.
- **Google Tag Manager now starts after the page is ready.** It loads on the first interaction, or about 3
  seconds after the page has loaded. Consent defaults are still set before anything loads. Trade-off:
  a visitor who leaves within about 3 seconds without interacting is not recorded. Check this suits
  your reporting.

**Still open (owner action required):**
1. **SMTP password rotation.** Still required. The old password remains in git history and must be treated
   as compromised until the mailbox password is changed and `SMTP_PASS` is updated in Vercel and `.env`.
2. **Dependency security update (nodemailer).** `npm audit` reports a high-severity advisory for nodemailer
   ≤ 10.0.5 (used server-side by the contact form). The site's code does not use the affected
   `resolveContent` call and only sends to fixed internal addresses, so exposure is low, but it should be
   upgraded. It was not changed automatically because it is a major version (9 → 10) that rewrites
   both `package-lock.json` and `bun.lock`, which Lovable's build depends on. Suggested: in Lovable or locally,
   upgrade `nodemailer` to the latest 10.x, rebuild, and send one test enquiry. Two other advisories
   (js-yaml, source-map-js) come from build tooling and can be fixed with `npm audit fix`.
3. **Qualified claims to confirm.** "24/7" support in the Operate service text became "response times
   agreed in each support plan", and "working software every two weeks" became "short, regular cycles". If
   the original promises are accurate and contracted, they can be restored.
4. **Service and product content.** Each service now lists "what you can expect" and the kinds of systems it
   typically connects to. Each product page shows an "At a glance" block built from existing site data.
   Please confirm the wording matches what Octapus delivers.
5. **Lovable regeneration.** `src/start.ts` (Supabase middleware removed in Phase 2) and the new client
   entry `src/client.tsx` with `vite.config.ts` (`client: { entry: "client" }`) are hand-written. Check them
   after the next Lovable sync.
6. Earlier items remain open: legal review (section 2), facts to confirm (section 3), testimonials, client
   permissions and case-study evidence (section 4), Cal.com link (section 5), and GTM / Leadfeeder consent
   gating (section 1).

## 8. Phase 4 updates (added 2026-10-17)

Full details are in `docs/PHASE-4-SECURITY-AUDIT.md`, `docs/PHASE-4-MOBILE-PERFORMANCE-REPORT.md` and
`docs/PHASE-4-FINAL-WEBSITE-AUDIT.md`.

**Release conditions (do these before deploying):**
1. **Rotate the SMTP mailbox password** (SEC-01, still open), update `SMTP_PASS` in Vercel and `.env`,
   delete the local `.vercel/output` folder (it holds an old build containing the old password), and
   check the mailbox's sent-mail logs for misuse.
2. **Upgrade nodemailer to 10.1.2** (SEC-02). It was verified compatible in isolation (0 advisories, same
   API, attachments and header-injection protection work). Run `bun add nodemailer@^10.1.2` so both lockfiles
   stay consistent, then preview-deploy and send one test enquiry. It is not applied in the repository because
   Bun was not available to regenerate `bun.lock`.

**Recommended soon:**
3. Confirm the mail host's TLS certificate and remove `rejectUnauthorized: false` (SEC-03).
4. In GTM: gate Leadfeeder and Meta on consent (SEC-05) and remove unused tags. GTM costs about 330 KB and
   about 450 ms of main-thread time when it runs early.
5. Add a report-only Content Security Policy once the GTM tag list is confirmed (SEC-04).
6. Run `npm audit fix` and update the TanStack devtools / ESLint tooling (dev-only advisories, SEC-11).
7. Confirm Supabase row-level security in the dashboard (SEC-12, not verifiable from code).
8. Confirm Vercel sets `x-real-ip` (rate-limit keying, SEC-06). Consider Turnstile or a shared rate-limit
   store.
9. After deployment, check field Core Web Vitals (Search Console / PageSpeed Insights) after 28 days.

All earlier items (legal pages, facts to confirm, testimonials, client permissions, Cal.com link) remain open.
