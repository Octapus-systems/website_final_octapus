import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/site/JsonLd";
import { ScrollVideoSection } from "@/components/site/ScrollVideoSection";
import { ProductsShowcase } from "@/components/site/ProductsShowcase";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { site, products, hiddenProductSlugs } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

const visibleProducts = products.filter(p => !hiddenProductSlugs.includes(p.slug));

export const Route = createFileRoute("/")(  {
  head: () => ({
    ...buildMeta({
      title: "Octapus — Custom Software, AI Systems and Digital Platforms",
      description:
        "Octapus designs and develops custom software, intelligent AI systems and digital platforms that help businesses in the UAE operate, automate and grow.",
      path: "/",
      ogType: "website",
      keywords: ["Octapus", "UAE software company", "custom software development UAE", "ERP CRM Dubai", "AI solutions UAE", "business systems", "digital platforms"],
    }),
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Octapus",
          url: "/",
          publisher: { "@type": "Organization", name: site.legalName },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Octapus Products",
          itemListElement: visibleProducts.slice(0, 8).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `/products/${p.slug}`,
            name: p.name,
          })),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />

      {/* ── Hero scroll video ── */}
      <ScrollVideoSection frameCount={600} mobileFrameCount={530} heightMultiplier={4} />



      {/* ── Our Products ── */}
      <Section title="Our Products">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-2xl border hairline bg-background p-6 transition-all hover:border-primary/50 hover:bg-accent hover:shadow-sm"
            >
              <div>
                <div className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {p.name}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {p.headline}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

    </>
  );
}
