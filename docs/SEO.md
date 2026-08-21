# Octapus — SEO metadata & internal linking

## Per-route metadata

All routes call `buildMeta({ title, description, path, ogType, image?, keywords?, noindex? })`
from `src/lib/seo.ts`. Every page emits:

- `<title>` (route-specific, unique, under ~65 chars)
- `<meta name="description">` (route-specific, under ~160 chars)
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:image` (leaf pages only)
- Twitter: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<meta name="keywords">` for topical relevance
- `<link rel="canonical">` — leaf routes only (root does not set one; see `head-meta` knowledge)

`/mcp` is marked `noindex,nofollow` and `products.$slug` returns `noindex` when the product is missing.

## JSON-LD schema per route

| Route | Schema type(s) |
|---|---|
| `__root.tsx` (all pages) | `Organization` (with two `PostalAddress`, email, telephone) |
| `/` | `WebSite` (+ `SearchAction`), `ItemList` of products, `FAQPage`, `BreadcrumbList` |
| `/about` | `AboutPage` (with nested Organization + addresses), `BreadcrumbList` |
| `/services` | `ItemList` of `Service` items, `BreadcrumbList` |
| `/products` | `CollectionPage` (with `hasPart` `SoftwareApplication[]`), `BreadcrumbList` |
| `/products/$slug` | `SoftwareApplication` (Offer, provider, keywords), `BreadcrumbList` (3 levels) |
| `/industries` | `ItemList` of industry names, `BreadcrumbList` |
| `/ois` | `TechArticle`, `BreadcrumbList` |
| `/blog` | `Blog`, `BreadcrumbList` |
| `/book` | `Service`, `BreadcrumbList` |
| `/careers` | `CollectionPage`, `BreadcrumbList` |
| `/contact` | `ContactPage` (4 `ContactPoint`), `BreadcrumbList` |
| `/support` | `ContactPage` (2 `ContactPoint`), `BreadcrumbList` |
| `/privacy` | `WebPage`, `BreadcrumbList` |
| `/terms` | `WebPage`, `BreadcrumbList` |
| `/mcp` | none (noindex) |
| `/sitemap` | none |

All schema is emitted via `<JsonLd data={...} />` (see `src/components/site/JsonLd.tsx`).

## Internal linking map

Each content route ships a `<RelatedLinks>` block (component in
`src/components/site/RelatedLinks.tsx`) with three curated in-app links.
This distributes link equity across the site and encourages navigation
without relying on the footer alone.

```
/                → hero + all main sections link to /book, /products, /contact
/about           → /services, /industries, /contact
/services        → /products, /industries, /about
/products        → /services, /industries, /book
/products/$slug  → /products, /services, /book
/industries      → /products, /services, /book
/ois             → /products, /services, /book
/blog            → /products, /ois, /about
/careers         → /about, /services, /products
/book            → /services, /products, /industries
/support         → /contact, /book, /products
/contact         → (form-focused; footer covers linking)
```

Additional hub-and-spoke reinforcement:
- The persistent `<Nav>` links Home, Products, Services, Industries, OIS, About, Contact.
- The `<Footer>` links every route including legal, careers, support, sitemap.
- The homepage `<ProductsShowcase>` deep-links to each `/products/$slug`.
- The homepage `<ServicesGrid>` deep-links to `/services`.

## Suggested next SEO steps (not yet in code)

1. Set a canonical project domain and update `BASE_URL` in
   `src/routes/sitemap[.]xml.ts` — the sitemap currently ships with an
   empty base placeholder.
2. Replace `[SEARCH_CONSOLE_VERIFICATION_CODE]` and `[GTM_CONTAINER_ID]`
   in `src/routes/__root.tsx` once real credentials exist.
3. When real case studies land, add `Article` schema + author bylines to
   `/blog` posts and `Case`/`Article` schema on new case-study routes.
4. Once real hero imagery per product is in place, ensure each
   `/products/$slug` head sets `og:image` (already wired — driven by
   `product.image` from `src/lib/site.ts`).
5. Add `hreflang` alternates if/when Arabic (`ar-AE`) localisation ships.
