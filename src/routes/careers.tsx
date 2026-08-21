import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  head: () => buildMeta({
    title: "Careers at Octapus — Precise Builders, Designers and Operators",
    description: "Join Octapus in Dubai and Ajman. We hire selectively when we have specific work for a specific person — engineers, designers and operators who ship.",
    path: "/careers",
    ogType: "website",
    keywords: ["Octapus careers", "software jobs UAE", "Dubai engineering jobs", "AI jobs UAE", "product design jobs Dubai"],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Careers at Octapus",
        url: "/careers",
        about: { "@type": "Organization", name: site.legalName },
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />

      <Section titleAs="h1" eyebrow="Careers" title="Precise Builders. Thoughtful Designers. Operators Who Ship." intro="We hire selectively and only when we have specific work for a specific person.">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <p className="text-muted-foreground">Send us a note about the work you want to do. If it aligns, we'll be in touch.</p>
          <div className="rounded-2xl border hairline p-6 bg-[var(--color-surface)] text-sm text-muted-foreground">
            Career enquiries: {site.emails.hr}
          </div>
          <Button asChild className="rounded-full"><Link to="/contact">Apply</Link></Button>
        </div>
      </Section>

      <RelatedLinks
        title="Learn what you'd be building."
        items={[
          { to: "/about", label: "About Octapus", detail: "Who we are, how we work, what we ship." },
          { to: "/services", label: "Services", detail: "The disciplines you'd join — engineering, AI, design, operate." },
          { to: "/products", label: "Products", detail: "The systems already in production today." },
        ]}
      />
    </>
  );
}
