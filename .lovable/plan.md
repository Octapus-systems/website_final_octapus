
# Octapus L.L.C. — Website Build Plan

A production-ready TanStack Start marketing site for Octapus: precise, architectural, quietly futuristic. White canvas, deep black type, disciplined grid, #601CE6 used as intelligence — not decoration.

## 1. Design system (src/styles.css + tokens)

- Palette (oklch equivalents):
  - `--background` pure white, `--foreground` near-black (#0A0A0B)
  - `--primary` #601CE6, `--primary-foreground` white
  - `--muted-foreground` controlled cool gray, `--border` very subtle cool gray
  - `--surface-dark` near-black for OIS section, `--primary-glow` soft purple for restrained illumination
  - `--gradient-primary` white → soft purple (used rarely)
  - `--shadow-elegant` soft, wide, near-invisible
- Type: Inter Tight (display) + Inter (body) via `<link>` in `__root.tsx` head. Fluid clamp() sizing, tight tracking on display, comfortable measure on body.
- Radii: consistent 8–12px; no overly-rounded cards.
- Motion tokens: short durations (180–420ms), custom easing; all animations respect `prefers-reduced-motion`.
- Grid: 12-col container, generous gutters, section rhythm variable (editorial, not repeating 3-card blocks).

## 2. Route architecture (TanStack file routes)

```
/                        Home
/products                Products index
/products/$slug          o.b.m.s-erp, wish, hub8, algorithem, lead-intelligence,
                         content-manager, custom-crm, custom-business-solutions,
                         odoo-custom-erp, custom-ai, ois
/services                Services index (6 capabilities)
/industries              Industries index
/about                   About
/ois                     OIS page (CTA → https://your-whisper-employee.lovable.app, new tab, rel="noopener")
/blog                    Blog index (empty-state ready)
/support                 Support
/careers                 Careers
/contact                 Structured enquiry form
/book                    Book a Strategy Call
/privacy, /terms, /sitemap
```

Server routes: `src/routes/sitemap[.]xml.ts`, `src/routes/robots[.]txt.ts`, `src/routes/llms[.]txt.ts`, `src/routes/api/public/contact.ts` (form handler with server-side validation + routing).

Each leaf route defines its own `head()` with unique title, description, og:title, og:description, canonical, og:type. Root holds only sitewide defaults + Organization JSON-LD.

## 3. Homepage narrative sections

1. Hero — "The systems behind your business. Connected." + supporting copy, dual CTA (Book Strategy Call / Explore Systems), premium laptop hero image with subtle purple system lines. Quiet origin line beneath.
2. Brand proposition — "One company. One partner. One connected operation." Build / Operate / Automate / Understand / Grow as a single system diagram, not 5 cards.
3. Products — editorial product stories with premium device imagery; each = customer, problem, outcome, image, CTA.
4. OIS cinematic section — dark near-black surface, restrained purple illumination, 5 agent nodes around one business core; CTA to external OIS app in new tab.
5. Services — 6 connected capabilities shown as one delivery relationship.
6. Startup section — "Build the first version without creating tomorrow's technical problem."
7. Industries — grid of relevant use cases, no false specialist claims.
8. Process — Discover → Plan → Design → Develop → Integrate → Launch → Support → Scale, scroll-linked reveal.
9. Final conversion — quiet statement + single CTA.

## 4. Imagery

Generate a consistent SaaS image family via `imagegen`:
- Hero laptop with Octapus dashboard, white studio, soft purple reflection
- Per-product device shots (dashboard glimpses, no fabricated data)
- OIS abstract intelligence composition (dark)
- No stock people, no fake portraits, no unreadable interface text

All generated images saved under `src/assets/` and imported. Alt text descriptive.

## 5. Contact experience

- Fields: name, company, work email, phone, enquiry type (9 options per spec), description, preferred contact, optional budget, optional timeline.
- Client validation with zod + react-hook-form; server validation in `/api/public/contact`.
- Routing logic (server-side switch on enquiry type):
  - Sales / Product / Custom software / ERP-CRM / AI / Website → `sales@octapus.ae`
  - General / Other → `info@octapus.ae`
  - Career → `hr@octapus.ae`
  - Technical / Support → `code@octapus.info`
- Loading, validation, error, success states. Post-submit expectation copy. Basic honeypot + rate-limit spam protection.
- Phone numbers, Dubai + Ajman addresses shown.
- Floating WhatsApp + Book-a-Call actions, keyboard-accessible, non-blocking on mobile.

Email delivery: the spec requires routing but does not name a provider. I'll wire the handler to log + validate and leave a clearly-marked `sendMail()` seam with `[OCTAPUS TO PROVIDE EMAIL PROVIDER]` — user can plug in Resend/SES once chosen.

## 6. Motion

Restrained Motion/React usage:
- Hero: purple path drawing through a light grid, nodes converging (one-shot, ~1.2s)
- Section reveals: subtle fade+translate on intersection
- Process: scroll-linked stage highlighting
- Buttons/nav: crisp state transitions
- All gated on `prefers-reduced-motion: reduce`

## 7. SEO / AEO / GEO

- Per-route `head()` with unique title/description/og/canonical (relative URLs; no domain baked in).
- JSON-LD: Organization + WebSite on root; Service on service pages; Product / SoftwareApplication on product pages; BreadcrumbList on deep routes; FAQPage only where genuine FAQs exist.
- Concise answer-first paragraphs on service/product pages for AEO.
- `sitemap.xml` server route enumerating all public routes.
- `robots.txt` allowing all, sitemap directive added once domain known (TODO comment).
- `llms.txt` summarizing company, products, services, contacts.
- `/mcp` route as a documented placeholder page describing MCP endpoint intent.

Target phrases woven naturally into page copy (no stuffing): software development company UAE, custom software Dubai, ERP UAE, CRM development UAE, AI development UAE, Odoo implementation UAE, etc.

## 8. Analytics scaffolding

- GTM snippet in `__root.tsx` head + body with placeholder `[GTM_CONTAINER_ID]`.
- GA4 + Google Ads + Search Console verification placeholders.
- Consent Mode v2 default-denied bootstrap.
- Event helper `trackEvent(name, params)` used for: strategy_call_click, form_start, form_submit, form_error, product_enquiry, ois_external_click, whatsapp_click, call_click, email_click, support_request, career_apply, product_engagement. No PII forwarded.

## 9. Accessibility & performance

- WCAG 2.2 AA: semantic landmarks, one `<main>` per route, visible focus rings, labeled inputs, 44px targets, contrast checked against tokens.
- Reduced-motion path renders full content.
- LCP hero image preloaded via route `head().links`.
- Images generated as jpg (photos) with intrinsic aspect-ratio wrappers; fonts preconnected.

## 10. Honesty guardrails

- No fabricated stats, clients, testimonials, awards, certifications.
- Where evidence is missing in provided copy, insert visible `[OCTAPUS TO PROVIDE VERIFIED PROOF]` markers so user can fill in.
- No "100% privacy", no "complete autonomy" claims for OIS — copy stays within the spec's approved wording.

## Technical notes

- Stack: TanStack Start v1 + React 19 + Tailwind v4 + shadcn primitives (Button, Input, Textarea, Select, Dialog, Sheet, Accordion for FAQs).
- File organization: `src/components/site/*` for site chrome (Nav, Footer, FloatingActions), `src/components/sections/*` for homepage narrative blocks, `src/components/products/*` reusable product-story block, `src/lib/analytics.ts`, `src/lib/contact-schema.ts`.
- Image placeholders in initial commit replaced by generated assets under `src/assets/` before finalization.
- The index placeholder at `src/routes/index.tsx` is replaced by the real home route.
- External OIS link opens in a new tab with `rel="noopener noreferrer"`.

## Deliverable scope for first build pass

Full IA scaffolded with every route, home fully composed, Products/Services/Industries/About/OIS/Contact fully built, Blog/Support/Careers as production-quality shells ready for content, legal pages with standard UAE-appropriate boilerplate marked for legal review, all SEO + analytics + accessibility wiring in place.
