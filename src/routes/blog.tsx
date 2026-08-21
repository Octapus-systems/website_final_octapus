import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { buildMeta, breadcrumbSchema, SITE_NAME } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/blog")({
  head: () => buildMeta({
    title: "Octapus Blog — Notes on Software, AI and Modern Business Systems",
    description: "Field notes from Octapus on building software, running ERP and CRM systems, and applying AI responsibly inside real business operations.",
    path: "/blog",
    ogType: "website",
    keywords: ["Octapus blog", "software engineering blog", "AI in business", "ERP notes", "custom CRM insights", "UAE technology writing"],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${SITE_NAME} Blog`,
        url: "/blog",
        publisher: { "@type": "Organization", name: site.legalName, url: "/" },
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />

      <Section eyebrow="Blog" titleAs="h1" title="Field Notes From the Team Building Connected Systems." intro="Octapus publish infrequently — when Octapus have something specific and useful to say about software, AI and running real operations.">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-2xl border hairline p-8 bg-[var(--color-surface)] text-muted-foreground">
            [OCTAPUS TO PROVIDE VERIFIED PROOF: initial articles, author bylines and publication dates.]
          </div>
          <div className="mt-8">
            <Button asChild variant="outline" className="rounded-full"><Link to="/contact">Get in touch</Link></Button>
          </div>
        </div>
      </Section>

      <RelatedLinks
        title="While the archive is filling up."
        items={[
          { to: "/products", label: "Products", detail: "See the systems Octapus builds and operates today." },
          { to: "/ois", label: "OIS", detail: "The Octapus vision for one intelligent layer across your business." },
          { to: "/about", label: "About", detail: "Who Octapus is and how Octapus work with growing companies." },
        ]}
      />
    </>
  );
}
