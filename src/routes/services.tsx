import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { services } from "@/lib/site";
import { DisciplinesSection } from "@/components/site/DisciplinesSection";
import { OisConnection } from "@/components/site/OisConnection";
import { buildMeta, breadcrumbSchema, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => buildMeta({
    title: "Octapus Services — Engineering, AI, ERP and Growth",
    description: "Octapus delivers engineering, business systems, AI & data, design, growth and operate as one continuous relationship — custom software, ERP, CRM and automation for the UAE and beyond.",
    path: "/services",
    ogType: "website",
    keywords: ["custom software UAE", "ERP development Dubai", "CRM development", "AI development UAE", "software engineering services", "Odoo implementation UAE"],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${SITE_NAME} Services`,
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.name,
            description: s.summary,
            url: "/services",
            provider: { "@type": "Organization", name: "Octapus L.L.C." },
          },
        })),
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />

      <Section
        eyebrow="Services"
        title="Six Disciplines. One Continuous Delivery Relationship."
        titleAs="h1"
        intro="Not six agencies stitched together. Octapus delivers engineering, business systems, AI & data, design, growth and operate as one continuous relationship."
      />
      <Section className="!pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.slug} className="rounded-2xl border hairline bg-background p-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{s.name}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="rounded-full"><Link to="/book">Book a strategy call</Link></Button>
        </div>
      </Section>

      <DisciplinesSection className="!pt-0" />

      <OisConnection
        title="AI & Data runs on OIS."
        body="AI development at Octapus is not a set of disconnected experiments. It is delivered on the OIS platform, which turns AI agents into authorized participants in your operation — Horus AI is simply the first coworker inside it."
        chain={["AI development", "OIS platform", "AI agents", "Business automation"]}
      />

      <RelatedLinks
        title="See the services applied."
        items={[
          { to: "/products", label: "Products", detail: "Concrete systems these services have shipped." },
          { to: "/technology", label: "Technology", detail: "Engineering, business systems, AI & data and operate." },
          { to: "/marketing", label: "Marketing", detail: "Design & brand and growth, connected to the systems." },
        ]}
      />
    </>
  );
}
