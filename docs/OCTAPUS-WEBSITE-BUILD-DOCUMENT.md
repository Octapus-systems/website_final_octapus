# Octapus L.L.C. — Complete Website Build Document

**Version:** 1.0
**Date:** 18 August 2026
**Owner:** Octapus L.L.C.
**Scope:** Full specification of the octapus.ae marketing and product website — company overview, brand, information architecture, page-by-page detail, design system, technical build, SEO, analytics and operations.

---

## 1. Company Overview

| Field | Value |
| --- | --- |
| Legal name | Octapus L.L.C. |
| Brand name | Octapus |
| Tagline | The Final Software Destination |
| Sub-tagline | The systems behind your business. Connected. |
| Origin line | Designed in the UAE — Built for the world. |
| Headquarters | United Arab Emirates |
| Offices | Business Village, Dubai, UAE · Amper Gem Tower, Khalifa Street, Ajman, UAE |
| Markets | UAE, GCC, international |

### 1.1 Positioning

Octapus is a UAE software, AI and business-systems company. One partner builds, operates, automates and grows the systems behind a business — instead of the business coordinating five vendors.

The single message the site communicates without repeating it:

> **Octapus brings the systems behind a business into one connected operation.**

### 1.2 The five capabilities

| Capability | Meaning |
| --- | --- |
| Build | The custom software your operation needs. |
| Operate | The systems that run the business day to day. |
| Automate | The repeatable decisions that slow the team down. |
| Understand | The data that already tells the story. |
| Grow | The channels connected to the systems that convert. |

### 1.3 Two tracks, six disciplines

**Octapus Technology** — *Engineering intelligent digital systems*
1. **Engineering** — custom software, web apps, mobile apps, enterprise systems, APIs, cloud architecture
2. **Business Systems** — ERP, CRM, business automation, system integration, digital workflows
3. **AI & Data** — AI solutions, AI agents, OIS platform, machine learning, data intelligence
4. **Operate** — cloud management, maintenance, support, optimization

**Octapus Marketing / Studios** — *Building digital presence and business growth*

5. **Design & Brand** — logo design, brand identity, visual systems, creative direction, content design
6. **Growth** — digital marketing, social strategy, content, video, advertising, SEO, campaign management

### 1.4 OIS — Octapus Intelligence System

OIS is the intelligence layer that sits **on top of** the systems Octapus connects. It is not a chatbot and not a replacement for existing software.

```
Existing systems → OIS → AI agents → employees → business actions
```

Positioning: *Your business already uses AI. Now give AI a job.*

Three ways to start:
- **AI Your Employee** — turn repetitive employee workflows into intelligent automated processes.
- **AI Your Software** — connect intelligence to the CRM, ERP and systems already in use.
- **Hire an OIS Agent** — deploy a dedicated AI agent designed, trained and integrated for one role.

Claimed benefits (approved wording): lower operational cost, up to 3× faster execution, higher consistency and accuracy, availability beyond working hours, built specifically for the business.

**Hermes AI** is the first AI coworker inside the OIS ecosystem — powered by OIS, never above it.

External OIS application: `https://your-whisper-employee.lovable.app` (opens in a new tab, `rel="noopener noreferrer"`).

### 1.5 Contact matrix

| Purpose | Email | Phone |
| --- | --- | --- |
| Sales | sales@octapus.ae | +971 50 266 1088 |
| General / info | info@octapus.ae | +971 50 862 1612 |
| Careers | hr@octapus.ae | — |
| Technical support | code@octapus.info | +971 50 292 0388 |
| WhatsApp | — | 971 50 862 1612 |

**Contact routing rules (server side):**
- Sales / Product / Custom software / ERP-CRM / AI / Website → `sales@octapus.ae`
- General / Other → `info@octapus.ae`
- Career → `hr@octapus.ae`
- Technical / Support → `code@octapus.info`

---

## 2. Product Catalogue

Every product is written as: customer → problem → outcome. No fabricated metrics.

| # | Product | Slug | One-line headline |
| --- | --- | --- | --- |
| 1 | O.B.M.S ERP | `obms-erp` | One operating layer for finance, operations and reporting. |
| 2 | HUB8 | `hub8` | A control plane for connected business tools. |
| 3 | ALGORITHM | `algorithem` | Rules and automations for repeatable business decisions. |
| 4 | Custom Business Solutions | `custom-business-solutions` | Software built for the systems only your business has. |
| 5 | Odoo Custom ERP | `odoo-custom-erp` | Odoo, extended and integrated to fit your operation. |
| 6 | Custom AI | `custom-ai` | AI systems designed around your data and your decisions. |
| 7 | OIS | `ois` | Give your existing systems intelligence. |
| 8 | Hermes AI | `hermes-ai` | The AI coworker powered by OIS. |
| 9 | BUY | `buy` | Commerce that stays connected to the rest of the business. |
| 10 | BLUEPRINT | `blueprint` | Project management built around delivery, not to-do lists. |
| 11 | OUTREACH | `outreach` | Lead intelligence that tells you who is worth calling. |
| 12 | ICON | `icon` | Marketing operations for teams that actually ship. |
| 13 | MR. CRM | `mr-crm` | Sales management shaped to how your team sells. |
| 14 | OPRATE | `oprate` | Business management systems for day-to-day operations. |
| 15 | ERP Implementation | `erp-implementation` | Enterprise deployment, migration and adoption — done properly. |
| 16 | AI Business Automation | `ai-business-automation` | Custom intelligent workflows across your systems. |

Each product page also carries an **OIS relationship note** explaining how the intelligence layer applies to that product (stored in `productOisNotes`).

### 2.1 Industries

Construction · Healthcare · Retail · Education · Finance · Manufacturing · Hospitality · Real Estate · Transportation · E-commerce · Logistics · Professional Services

Six industries carry a specific OIS use case (Construction, Healthcare, Finance, Retail, Manufacturing, Logistics).

### 2.2 Delivery process (8 stages)

Discover → Plan → Design → Develop → Integrate → Launch → Support → Scale

---

## 3. Information Architecture

```
/                          Home
/products                  Products layout (Outlet)
  /products                Products index — list + bento view toggle
  /products/$slug          Product detail (16 products)
/engineering               Octapus Engineering — "The warehouse for tuning your business"
/studios                   Octapus Studios — "Let's build your reputation" + lead form
/technology                Technology track (4 disciplines)
/marketing                 Marketing track (2 disciplines)
/services                  Six capabilities
/ois                       OIS — Octapus Intelligence System
/industries                Industries and OIS use cases
/about                     Company, origin, philosophy
/blog                      Blog index (content-ready shell)
/support                   Support routing and contacts
/careers                   Careers (routes to hr@)
/contact                   Structured enquiry form
/book                      Book a Strategy Call
/privacy                   Privacy policy
/terms                     Terms of service
/sitemap                   Human-readable sitemap
/mcp                       MCP endpoint documentation placeholder

Machine routes
/sitemap.xml               Generated XML sitemap
/robots.txt                Crawl directives + sitemap reference
/llms.txt                  LLM-readable company summary
/api/public/contact        Contact form handler (validation + routing)
```

---

## 4. Page-by-Page Specification

### 4.1 Home `/`
**Goal:** establish the single idea and drive to *Start a Project* / *Book a Strategy Call*.

Sections in order:
1. **Hero** — dark surface, silver-shimmer headline **"Your Systems. Automated."**, pill badge with brand positioning, fluid `clamp()` type so nothing overflows at 375px, reveal-style CTAs (icon that expands to label on hover/focus).
2. **Start a Project CTA band** — placed high, immediately under the hero.
3. **OIS section** — second section on the page; auto-playing looped ecosystem video (watermark removed), OIS chain explanation, link to `/ois`.
4. **Three pillars** — Build · Automate · Grow.
5. **Products showcase** — variable-span bento grid of the catalogue.
6. **Delivery timeline** — "From first call to live system".
7. **Process** — condensed stage grid.
8. **Industries preview** — grid with CTA to `/industries`.
9. **Trust / FAQ / final conversion** — quiet statement plus a single CTA.

Floating layer: scroll-idle CTA (appears only when scrolling stops) + WhatsApp action, keyboard accessible.

### 4.2 Products index `/products`
Two views toggled by the user: editorial list and **bento grid** (`ProductsShowcase`). Each card states name, tags, headline; links to detail.

### 4.3 Product detail `/products/$slug`
Sections: hero (name + headline), Customer, Problem, Outcome, OIS note, related products, CTA to contact with the enquiry type pre-framed. Schema: `SoftwareApplication` / `Product` + `BreadcrumbList`.

### 4.4 Engineering `/engineering`
Position: **"The warehouse for tuning your business."** Six bays: Build, Integration, Tuning, Infrastructure, Data, Service — each with a summary and four capability items.

### 4.5 Studios `/studios`
Position: **"Let's build your reputation."** Six offerings: Brand Identity, Web & Digital Design, Content Production, Social & Community, Campaigns & Performance, Reputation & PR. Includes the **Start a Studios Project** lead form with conversion tracking.

### 4.6 Technology `/technology` and Marketing `/marketing`
Shared `TrackPage` template: hero, discipline cards with capability lists, an OIS relationship block with the value chain, a three-point approach block (Discovery first · Short cycles · Operated after launch), and related links.

### 4.7 Services `/services`
Six capabilities: Engineering, Business Systems, AI & Data, Studios (Design & Brand), Growth, Operate — each with an answer-first summary paragraph for AEO. Schema: `Service` + `OfferCatalog`.

### 4.8 OIS `/ois`
Hero: *Your Business Already Uses AI. Now Give AI a Job.* Then: the explanation of AI employees vs AI tools, five-pillar benefits grid, **Three Ways to Start**, agent role coverage (sales, support, operations, admin, finance, marketing, CRM, internal workflows), closing line *From Artificial Intelligence to Actual Workforce*, and the external OIS app CTA in a new tab.

### 4.9 Industries `/industries`
Twelve industries in a responsive grid, six with dedicated OIS use cases. No false specialist claims.

### 4.10 About `/about`
Company story, origin line, operating philosophy, the two tracks, offices, and how Octapus differs from a traditional agency (accountability stays with one team).

### 4.11 Contact `/contact`
Fields: name, company, work email, phone, enquiry type (9 options), description, preferred contact method, optional budget, optional timeline. Client validation with zod + react-hook-form; server validation and routing in `/api/public/contact`. Honeypot and basic rate limiting. Loading, validation, error and success states plus post-submit expectation copy. Offices and phone numbers displayed.

### 4.12 Book `/book`
Single-purpose conversion page for a 30-minute strategy call.

### 4.13 Support `/support`
Two contact blocks — Technical (`code@octapus.info`) and General (`info@octapus.ae`) — with a CTA into the contact form. Schema: `ContactPage` with two `ContactPoint` entries.

### 4.14 Careers `/careers`
Production-ready shell; applications route to `hr@octapus.ae`, `career_apply` event tracked.

### 4.15 Blog `/blog`
Content-ready shell with an empty state, prepared for `Article`/`TechArticle` schema per post.

### 4.16 Legal `/privacy`, `/terms`
UAE-appropriate boilerplate, marked for legal review before publication.

### 4.17 `/sitemap` and `/mcp`
Human-readable route index, and a documented placeholder describing MCP endpoint intent.

---

## 5. Design System

**Direction:** precise, intelligent, controlled, quietly futuristic — an operating system for modern business, not an agency template.

- **Colour:** semantic oklch tokens in `src/styles.css`. Primary accent Octapus Purple `#601CE6`. Light canvas white/soft grey with a subtle grid; dark surface near-black for OIS and hero moments. Full dark-mode theme with a minimal glowing bulb toggle (fixed, top-right, above the mobile menu).
- **Typography:** **Urbanist** for headings, **Epilogue** for body, mono for eyebrows and labels. Fluid `clamp()` scaling; tight display tracking.
- **Silver text:** `text-silver` / `text-silver-shine` utilities using `background-clip: text` for the white-to-grey metallic headline treatment on dark surfaces.
- **Buttons:** `btn-aurora` glossy pill gradient (magenta → purple → cyan) with glowing edge, plus `white`, `outline` and `subtle` variants. White text inside primary CTAs.
- **RevealButton:** compact circular icon button that expands on hover/focus to reveal its label.
- **Rhythm:** global `section-y` utility — 3.5rem mobile / 6rem desktop.
- **Radii:** consistent 8–12px. **Shadows:** soft, wide, low-opacity.
- **Motion:** 180–500ms durations, custom easing, one-shot hero animation, intersection reveals, scroll-linked process highlighting, 500ms theme glow fade. All gated behind `prefers-reduced-motion`.
- **Imagery:** consistent SaaS family — transparent-background device and product renders, no stock people, no fabricated interface data.

---

## 6. Technical Build

- **Framework:** TanStack Start v1 (React 19, SSR) on Vite 7, deployed to an edge worker runtime.
- **Styling:** Tailwind CSS v4 via `src/styles.css` (`@theme` tokens, no legacy config file).
- **UI primitives:** shadcn — Button, Input, Textarea, Select, Dialog, Sheet, Popover, Accordion.
- **Routing:** file-based under `src/routes/`; `src/routeTree.gen.ts` is generated and never edited. Root layout and site chrome live in `src/routes/__root.tsx`.
- **Backend:** Lovable Cloud (PostgreSQL, storage, auth, transactional email) with RLS enabled on every public table.
- **Server logic:** `createServerFn` for app-internal calls; `src/routes/api/public/*` for external callers (contact form), with validation inside the handler.
- **Key modules:**
  - `src/lib/site.ts` — single source of truth for brand, contacts, products, services, industries, process, disciplines, engineering bays, studios offerings, FAQs.
  - `src/lib/seo.ts` — `buildMeta()`, `breadcrumbSchema()` and shared JSON-LD helpers.
  - `src/lib/analytics.ts` — `trackEvent()` wrapper.
  - `src/lib/contact-schema.ts` — shared zod schema for client and server validation.
  - `src/components/site/*` — Nav, Footer, Section, Wordmark, ThemeToggle, FloatingActions, RevealButton, JsonLd, RelatedLinks, DeliveryTimeline, DisciplinesSection, OisConnection, ProductsShowcase, StudiosLeadForm, TrackPage.
- **Navigation:** desktop nav at `lg` breakpoint; products open in a three-dot Popover grid on desktop and a Sheet on mobile.

---

## 7. SEO, AEO and GEO

- Unique `head()` per leaf route: title (<60 chars), description (<160), `og:title`, `og:description`, `og:type`, canonical (absolute), `twitter:card`.
- Exactly one `<h1>` per page; semantic landmarks and a single `<main>`.
- **JSON-LD:** `Organization` + `LocalBusiness` + `WebSite` on root; `Service` on service and track pages; `SoftwareApplication`/`Product` on product pages; `ContactPage` on contact and support; `FAQPage` where genuine FAQs exist; `BreadcrumbList` on deep routes.
- **AEO:** answer-first opening paragraphs on product, service and OIS pages; FAQ set written as direct answers.
- **GEO:** UAE, Dubai, Ajman and GCC signals in copy, address data and `LocalBusiness` schema.
- `sitemap.xml`, `robots.txt` and `llms.txt` generated from the route list and `site.ts`.
- Target phrases woven naturally: software development company UAE, custom software Dubai, ERP UAE, CRM development UAE, AI development UAE, Odoo implementation UAE, creative agency UAE.

---

## 8. Analytics and Measurement

- GTM container in the root head and body, GA4 and Google Ads placeholders, Search Console verification slot.
- Consent Mode v2 bootstrapped default-denied.
- Tracked events (no PII): `strategy_call_click`, `form_start`, `form_submit`, `form_error`, `product_enquiry`, `ois_external_click`, `whatsapp_click`, `call_click`, `email_click`, `support_request`, `career_apply`, `product_engagement`, `studios_lead_submit`.

---

## 9. Accessibility and Performance

- WCAG 2.2 AA target: contrast verified against tokens, visible focus rings, labelled inputs, 44px minimum touch targets, keyboard-reachable floating actions.
- Reduced-motion path renders all content without animation.
- LCP hero preloaded via route `head().links`; fonts preconnected; images given intrinsic aspect-ratio wrappers.
- Verified at 375 / 768 / 1024 / 1440px with zero horizontal overflow.

---

## 10. Content Guardrails

- No fabricated clients, awards, certifications or testimonials presented as verified.
- Stats and social proof marked **[NEEDS CLIENT INPUT]** until real figures are supplied.
- No "100% privacy" or "complete autonomy" claims for OIS; only approved OIS wording is used.
- Legal pages require review by counsel before publication.

---

## 11. Open Items

| Item | Owner | Status |
| --- | --- | --- |
| Verified stats and case-study numbers | Octapus | [NEEDS CLIENT INPUT] |
| Named customer testimonials with consent | Octapus | [NEEDS CLIENT INPUT] |
| Email provider for contact routing (Resend / SES) | Octapus | Seam in place, provider not chosen |
| GTM / GA4 / Ads container IDs | Octapus | Placeholders in root |
| Legal review of privacy and terms | Octapus counsel | Pending |
| Blog and careers content | Octapus | Shells ready |
