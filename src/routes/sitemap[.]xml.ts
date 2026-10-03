import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/seo";

const BASE_URL = SITE_URL;

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
  "/blog",
  "/support",
  "/careers",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
  "/sitemap",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          ...staticPaths.map((p) => ({ path: p })),
          ...products.map((p) => ({ path: `/products/${p.slug}` })),
          ...servicePages.map((service) => ({ path: `/services/${service.slug}` })),
        ];
        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
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
