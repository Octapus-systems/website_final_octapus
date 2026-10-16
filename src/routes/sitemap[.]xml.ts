import { createFileRoute } from "@tanstack/react-router";
import { products, noindexProductSlugs } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/seo";

const BASE_URL = SITE_URL;

// Blog and the HTML sitemap are left out on purpose (blog has no posts yet).
const staticPaths = [
  "/",
  "/engineering",
  "/studios",
  "/technology",
  "/marketing",
  "/products",
  "/services",
  "/industries",
  "/about",
  "/team",
  "/ois",
  "/support",
  "/careers",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
];

// Manual per-route last-modified dates (YYYY-MM-DD). Update a date when that route's content changes.
const lastmod: Record<string, string> = {
  "/": "2026-10-15",
  "/engineering": "2026-10-01",
  "/studios": "2026-10-02",
  "/technology": "2026-08-24",
  "/marketing": "2026-08-24",
  "/products": "2026-09-11",
  "/services": "2026-10-01",
  "/industries": "2026-08-24",
  "/about": "2026-10-01",
  "/team": "2026-10-12",
  "/ois": "2026-10-03",
  "/support": "2026-10-01",
  "/careers": "2026-10-01",
  "/contact": "2026-10-01",
  "/book": "2026-10-10",
  "/privacy": "2026-08-24",
  "/terms": "2026-08-24",
  "/products/*": "2026-10-03",
  "/services/*": "2026-10-01",
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          ...staticPaths.map((p) => ({ path: p, lastmod: lastmod[p] })),
          ...products
            .filter((p) => !noindexProductSlugs.includes(p.slug))
            .map((p) => ({ path: `/products/${p.slug}`, lastmod: lastmod["/products/*"] })),
          ...servicePages.map((service) => ({
            path: `/services/${service.slug}`,
            lastmod: lastmod["/services/*"],
          })),
        ];
        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
            ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []),
            "    <changefreq>weekly</changefreq>",
            "  </url>",
          ].join("\n"),
        );
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
