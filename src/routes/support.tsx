import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/support")({
  head: () => buildMeta({
    title: "Support — Reach the Octapus Product and Engineering Team",
    description: "Direct support for Octapus customers and partners — technical response, general enquiries and account help across the UAE and beyond.",
    path: "/support",
    ogType: "website",
    keywords: ["Octapus support", "software support UAE", "ERP support", "custom software helpdesk"],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Octapus Support",
        url: "/support",
        about: { "@type": "Organization", name: site.legalName },
        contactPoint: [
          { "@type": "ContactPoint", contactType: "technical support", email: site.emails.tech, telephone: site.phones.support, areaServed: "AE", availableLanguage: ["English", "Arabic"] },
          { "@type": "ContactPoint", contactType: "customer service", email: site.emails.info, telephone: site.phones.general, areaServed: "AE", availableLanguage: ["English", "Arabic"] },
        ],
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Support", path: "/support" }])} />

      <Section titleAs="h1" eyebrow="Support" title="Reach the People Who Built Your System." intro="For existing customers and partners.">
        <div className="mx-auto max-w-3xl grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border hairline p-6">
            <div className="text-eyebrow mb-2">Technical</div>
            <p className="text-sm text-muted-foreground">{site.emails.tech}</p>
            <p className="text-sm text-muted-foreground">{site.phones.support}</p>
          </div>
          <div className="rounded-2xl border hairline p-6">
            <div className="text-eyebrow mb-2">General</div>
            <p className="text-sm text-muted-foreground">{site.emails.info}</p>
            <p className="text-sm text-muted-foreground">{site.phones.general}</p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Button asChild className="rounded-full"><Link to="/contact">Open a support request</Link></Button>
        </div>
      </Section>

      <RelatedLinks
        title="Other ways to reach Octapus."
        items={[
          { to: "/contact", label: "Contact", detail: "Structured enquiry routed to the right team." },
          { to: "/book", label: "Book a strategy call", detail: "30 minutes with an Octapus operator." },
          { to: "/products", label: "Products", detail: "Documentation and overviews of Octapus systems." },
        ]}
      />
    </>
  );
}
