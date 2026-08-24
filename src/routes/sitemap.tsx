import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { products } from "@/lib/site";

const staticRoutes = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/ois", label: "OIS" },
  { to: "/blog", label: "Blog" },
  { to: "/support", label: "Support" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
  { to: "/book", label: "Book a Strategy Call" },
  { to: "/mcp", label: "MCP" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    buildMeta({
      title: "HTML Sitemap — All Octapus Pages",
      description:
        "Human-readable index of every Octapus page — products, services, industries, company and legal — for quick navigation and internal linking.",
      path: "/sitemap",
      ogType: "website",
    }),

  component: () => (
    <Section titleAs="h1" eyebrow="Sitemap" title="All Octapus pages.">
      <div className="mx-auto max-w-3xl grid gap-8 md:grid-cols-2">
        <div>
          <div className="text-eyebrow mb-3">Pages</div>
          <ul className="space-y-2">
            {staticRoutes.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="text-sm hover:text-primary">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-eyebrow mb-3">Products</div>
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="text-sm hover:text-primary"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  ),
});
