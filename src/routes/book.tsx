import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/book")({
  head: () => buildMeta({
    title: "Book a Strategy Call — Talk to the Octapus Team",
    description: "Book a focused 30-minute strategy call with Octapus. Octapus listen, ask precise questions and share what Octapus would recommend for your systems.",
    path: "/book",
    ogType: "website",
    keywords: ["book strategy call", "software consultation UAE", "ERP consultation", "AI strategy call", "Octapus contact"],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Strategy Consultation",
        name: "Octapus Strategy Call",
        description: "30-minute strategy call with Octapus on software, AI and business systems.",
        provider: { "@type": "Organization", name: site.legalName, url: "/" },
        areaServed: ["AE", "GCC", "Global"],
        offers: { "@type": "Offer", price: "0", priceCurrency: "AED", availability: "https://schema.org/InStock" },
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Book a Strategy Call", path: "/book" }])} />

      <Section titleAs="h1" eyebrow="Strategy call" title="Thirty Focused Minutes With the Octapus Team." intro="30 minutes. No obligation. Octapus listen, ask precise questions and share what Octapus'd recommend.">
        <div className="mx-auto max-w-2xl rounded-2xl border hairline bg-[var(--color-surface)] p-8 text-center">

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href={`mailto:${site.emails.sales}?subject=${encodeURIComponent("Strategy call request")}`}>Email {site.emails.sales}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/contact">Use the enquiry form</Link>
            </Button>
          </div>
        </div>
      </Section>

      <RelatedLinks
        title="Before the call, browse what Octapus build."
        items={[
          { to: "/services", label: "Services", detail: "Six connected capabilities delivered by one team." },
          { to: "/products", label: "Products", detail: "ERP, CRM, AI and custom systems already in production." },
          { to: "/industries", label: "Industries", detail: "Where Octapus systems already work." },
        ]}
      />
    </>
  );
}
