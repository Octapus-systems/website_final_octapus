import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { Section } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { OisConnection } from "@/components/site/OisConnection";
import { ProductsShowcase } from "@/components/site/ProductsShowcase";
import { products } from "@/lib/site";
import { buildMeta, breadcrumbSchema, SITE_NAME } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => buildMeta({
    title: "Products — The Octapus Software, ERP, CRM and AI Ecosystem",
    description: "Explore the Octapus product ecosystem: O.B.M.S ERP, BUY, BLUEPRINT, ALGORITHM, OUTREACH, ICON, MR. CRM, OPRATE, HUB8, Custom AI and OIS.",
    path: "/products",
    ogType: "website",
    keywords: ["Octapus products", "OBMS ERP", "custom CRM UAE", "AI products UAE", "Odoo Dubai", "business automation platform"],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const [view, setView] = useState<"list" | "bento">("list");

  const hiddenSlugs = ["buy", "blueprint", "icon", "mr-crm", "oprate"];
  const visibleProducts = products.filter(p => !hiddenSlugs.includes(p.slug));

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${SITE_NAME} Products`,
        url: "/products",
        hasPart: visibleProducts.map((p) => ({
          "@type": "SoftwareApplication",
          name: p.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: p.headline,
          url: `/products/${p.slug}`,
        })),
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }])} />

      <Section
        eyebrow="Products"
        title="The Systems Octapus Builds — And Operates With You."
        titleAs="h1"
        intro="Every product exists to remove one specific kind of friction. Choose one to see the customer, the problem and the outcome."
      >
        <div className="flex justify-end mb-6">
          <div className="inline-flex items-center gap-1 rounded-full border hairline bg-background p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="List view"
              aria-pressed={view === "list"}
            >
              <List className="size-3.5" /> List
            </button>
            <button
              type="button"
              onClick={() => setView("bento")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                view === "bento" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="Bento view"
              aria-pressed={view === "bento"}
            >
              <LayoutGrid className="size-3.5" /> Bento
            </button>
          </div>
        </div>

        {view === "list" ? (
          <div className="grid gap-px bg-hairline border hairline rounded-2xl overflow-hidden md:grid-cols-2">
            {visibleProducts.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group bg-background p-8 hover:bg-[var(--color-primary-soft)]/40 transition-colors">
                <div className="text-eyebrow mb-4">{p.tags.join(" · ")}</div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{p.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.headline}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm text-primary">
                  See product <ArrowUpRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <ProductsShowcase items={visibleProducts} />
        )}
      </Section>

      <OisConnection
        title="Every suitable product is enhanced with OIS intelligence."
        body="The products stay the systems of record. OIS is the layer above them: it understands customer information and workflow in the CRM, helps employees reach business intelligence inside the ERP, and coordinates intelligent workflows across automation."
        chain={[
          "CRM — OIS understands customer information and workflow",
          "ERP — OIS helps employees reach business intelligence",
          "Automation — OIS coordinates intelligent workflows",
          "Hermes AI — the first AI coworker inside OIS",
        ]}
      />

      <RelatedLinks
        title="Beyond the product list."
        items={[
          { to: "/technology", label: "Technology", detail: "The engineering, systems, AI and operate disciplines behind every product." },
          { to: "/ois", label: "OIS", detail: "The intelligence layer that connects these systems." },
          { to: "/book", label: "Book a strategy call", detail: "Discuss which system fits your operation." },
        ]}
      />
    </>
  );
}
