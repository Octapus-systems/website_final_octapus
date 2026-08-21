import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { site } from "@/lib/site";

const columns = [
  {
    label: "Company",
    links: [
      { to: "/about", text: "About" },
      { to: "/team", text: "Team" },
      { to: "/careers", text: "Careers" },
      { to: "/blog", text: "Blog" },
      { to: "/contact", text: "Contact" },
    ],
  },
  {
    label: "Products",
    links: [
      { to: "/products", text: "All products" },
      { to: "/products/$slug", params: { slug: "obms-erp" }, text: "O.B.M.S ERP" },
      { to: "/products/$slug", params: { slug: "mr-crm" }, text: "MR. CRM" },
      { to: "/products/$slug", params: { slug: "custom-ai" }, text: "Custom AI" },
      { to: "/products/$slug", params: { slug: "ois" }, text: "OIS" },
    ],
  },

  {
    label: "Solutions",
    links: [
      { to: "/engineering", text: "Engineering" },
      { to: "/studios", text: "Studios" },
      { to: "/technology", text: "Technology" },
      { to: "/marketing", text: "Marketing" },
      { to: "/services", text: "All services" },
    ],
  },
  {
    label: "Resources",
    links: [
      { to: "/ois", text: "OIS layer" },
      { to: "/industries", text: "Industries" },
      { to: "/support", text: "Support" },
      { to: "/book", text: "Book a call" },
    ],
  },
  {
    label: "Legal",
    links: [
      { to: "/privacy", text: "Privacy" },
      { to: "/terms", text: "Terms" },
      { to: "/sitemap", text: "Sitemap" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t hairline bg-[var(--color-surface)]">
      <div className="container-page section-y">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
          <div className="space-y-5">
            <Wordmark />
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {site.tagline}
            </p>
            <p className="text-xs text-muted-foreground/80">{site.origin}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
            {columns.map((col) => (
              <div key={col.label} className="min-w-0">
                <div className="text-eyebrow mb-4">{col.label}</div>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.text}>
                      <Link
                        to={l.to}
                        params={"params" in l ? l.params : undefined}
                        className="block text-sm leading-6 text-foreground/80 hover:text-foreground"
                      >
                        {l.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-14 grid gap-6 md:grid-cols-2 text-sm text-muted-foreground">
          <div className="space-y-1">
            <div>Dubai — {site.addresses[0].line}</div>
            <div>Ajman — {site.addresses[1].line}</div>
          </div>
          <div className="md:text-right space-y-1">
            <div>General {site.phones.general}</div>
            <div>Sales {site.phones.sales} · Support {site.phones.support}</div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t hairline pt-6 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</div>
          <div>{site.emails.info} · {site.emails.sales}</div>
        </div>
      </div>
    </footer>
  );
}
