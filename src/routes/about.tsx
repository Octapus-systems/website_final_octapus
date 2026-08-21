import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => buildMeta({
    title: "About Octapus — Systems Behind Modern UAE Business",
    description: "Octapus L.L.C. is a UAE software, AI and business-systems partner designing connected operations for startups and growing companies — from Dubai and Ajman to the world.",
    path: "/about",
    ogType: "profile",
    keywords: ["Octapus", "UAE software company", "business systems", "AI partner", "custom ERP", "Dubai software"],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${SITE_NAME}`,
          url: "/about",
          mainEntity: {
            "@type": "Organization",
            name: site.legalName,
            alternateName: site.name,
            url: "/",
            email: site.emails.info,
            telephone: site.phones.general,
            areaServed: ["AE", "GCC", "Global"],
            address: site.addresses.map((a) => ({
              "@type": "PostalAddress",
              addressLocality: a.city,
              addressCountry: "AE",
              streetAddress: a.line,
            })),
          },
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <Section
        eyebrow="About"
        title="The Studio Engineering the Systems Behind Modern UAE Business."
        titleAs="h1"
        intro={`${site.legalName} designs the systems behind growing companies — quietly, precisely, and for the long term.`}
      />
      <Section className="!pt-0">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>Octapus exists to take complicated technology, remove the noise, and arrange it into one controlled business system.</p>
          <p>
            Octapus partner with founders and operators who have outgrown disconnected tools. Instead of adding another SaaS to the stack, Octapus design the operating layer that the business actually needs — and Octapus operate it with you. Explore our <Link to="/services" className="text-primary underline underline-offset-4">services</Link> or the <Link to="/products" className="text-primary underline underline-offset-4">product ecosystem</Link>.
          </p>
          <p>Designed in the UAE. Built for the world.</p>
        </div>
        <div className="mt-12 text-center">
          <Button asChild className="rounded-full"><Link to="/book">Book a strategy call</Link></Button>
        </div>
      </Section>

      <RelatedLinks
        title="Keep exploring Octapus."
        items={[
          { to: "/services", label: "Services", detail: "Engineering, business systems, AI, design, growth and operate — one connected team." },
          { to: "/industries", label: "Industries", detail: "Sectors where Octapus systems are already running." },
          { to: "/contact", label: "Contact", detail: "Tell us about the operation you need to connect." },
        ]}
      />
    </>
  );
}
