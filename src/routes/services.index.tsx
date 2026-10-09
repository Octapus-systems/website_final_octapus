import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { servicePages } from "@/lib/service-pages";
import { buildMeta, breadcrumbSchema, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    buildMeta({
      title: "Octapus Services | Software, Systems and Creative Work",
      description:
        "Explore nine practical Octapus services for software, business systems, automation, creative production and technology planning.",
      path: "/services",
      ogType: "website",
      keywords: [
        "custom software UAE",
        "ERP development Dubai",
        "CRM development",
        "AI development UAE",
        "software engineering services",
        "Odoo implementation UAE",
      ],
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${SITE_NAME} Services`,
          itemListElement: servicePages.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.summary,
              url: `/services/${s.slug}`,
              provider: { "@type": "Organization", name: "Octapus L.L.C." },
            },
          })),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <Section
        eyebrow="Services"
        title="Digital systems for real business work."
        titleAs="h1"
        intro="We build practical software, connected business systems and creative production around the way your organisation works."
      />
      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((service) => (
            <article
              key={service.slug}
              className="group overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_24px_54px_-44px_color-mix(in_oklab,var(--color-foreground)_48%,transparent)]"
            >
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              >
                <div className="flex min-h-80 flex-col p-7">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-primary">
                    {service.category}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-7 text-muted-foreground">{service.summary}</p>
                  <span className="mt-auto pt-10 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    Explore service →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/book"
            className="inline-flex min-h-12 items-center rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            Discuss your project
          </Link>
        </div>
      </Section>
    </>
  );
}
