import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    buildMeta({
      title: "About Octapus — Systems Behind Modern UAE Business",
      description:
        "Octapus L.L.C. is a UAE software, AI and business-systems partner designing connected operations for startups and growing companies — from Dubai and Ajman to the world.",
      path: "/about",
      ogType: "profile",
      keywords: [
        "Octapus",
        "UAE software company",
        "business systems",
        "AI partner",
        "custom ERP",
        "Dubai software",
      ],
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
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <Section
        eyebrow="About"
        title="The Studio Engineering the Systems Behind Modern UAE Business."
        titleAs="h1"
        intro={`${site.legalName} designs the systems behind growing companies — quietly, precisely, and for the long term.`}
      >
        <div className="mx-auto max-w-4xl mt-8 pt-12 border-t hairline space-y-12">
          <p className="text-2xl md:text-3xl font-medium leading-snug text-foreground text-center text-balance">
            We take complicated technology, remove the noise, and arrange it into one controlled business system.
          </p>
          
          <div className="grid md:grid-cols-2 gap-10 text-muted-foreground leading-relaxed text-lg">
            <p>
              We partner with founders and operators who have outgrown disconnected tools. Instead of adding another SaaS to the stack, we design the operating layer that the business actually needs.
            </p>
            <div className="space-y-6">
              <p>
                And we operate it with you. Explore our{" "}
                <Link to="/services" className="text-primary font-medium hover:underline underline-offset-4">
                  services
                </Link>{" "}
                or the{" "}
                <Link to="/products" className="text-primary font-medium hover:underline underline-offset-4">
                  product ecosystem
                </Link>.
              </p>
              <div className="inline-block px-4 py-2 rounded-full border hairline bg-surface/50 dark:bg-surface-dark/50">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  Designed in the UAE. Built for the world.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 text-center border-t hairline">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-md shadow-primary/20">
              <Link to="/book">Book a Strategy Call</Link>
            </Button>
          </div>
        </div>
      </Section>

      <RelatedLinks
        title="Keep exploring Octapus."
        items={[
          {
            to: "/services",
            label: "Services",
            detail:
              "Engineering, business systems, AI, design, growth and operate — one connected team.",
          },
          {
            to: "/industries",
            label: "Industries",
            detail: "Sectors where Octapus systems are already running.",
          },
          {
            to: "/contact",
            label: "Contact",
            detail: "Tell us about the operation you need to connect.",
          },
        ]}
      />
    </>
  );
}
