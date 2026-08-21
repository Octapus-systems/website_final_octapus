import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/site/JsonLd";
import { ScrollVideoSection } from "@/components/site/ScrollVideoSection";
import { ProductsShowcase } from "@/components/site/ProductsShowcase";
import { DisciplinesSection } from "@/components/site/DisciplinesSection";
import { DeliveryTimeline } from "@/components/site/DeliveryTimeline";
import { HorusCard } from "@/components/site/HorusCard";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { site, products, faqs } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

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

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section
      eyebrow="FAQ"
      title="Questions we hear most."
      intro="Straight answers — no jargon, no fluff."
    >
      <div className="mx-auto max-w-3xl divide-y hairline">
        {faqs.map((f, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium tracking-tight transition-colors hover:text-primary"
            >
              <span>{f.q}</span>
              <span
                className="shrink-0 text-xl text-muted-foreground transition-transform duration-300"
                style={{ transform: open === i ? "rotate(45deg)" : "rotate(0)" }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: open === i ? "300px" : "0",
                opacity: open === i ? 1 : 0,
              }}
            >
              <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

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
          itemListElement: products.slice(0, 8).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `/products/${p.slug}`,
            name: p.name,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />

      {/* ── Hero scroll video ── */}
      <ScrollVideoSection frameCount={400} heightMultiplier={4} />

      {/* ── Dark-to-light gradient bridge for seamless transition ── */}
      <div
        className="relative -mt-1"
        style={{
          background: "linear-gradient(to bottom, #0b0b0f 0%, var(--color-background, #ffffff) 100%)",
          height: "20vh",
        }}
      />

      {/* ── Tagline ── */}
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            The systems behind modern UAE business.
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Custom software, intelligent AI and connected platforms —
            designed to help you operate, automate and grow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/book">Book a strategy call</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/products">
                Explore products <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── Products ── */}
      <ProductsShowcase items={products.slice(0, 6)} showViewAll />

      {/* ── Horus AI card ── */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <HorusCard source="home_hero" />
        </div>
      </Section>

      {/* ── Two pathways ── */}
      <DisciplinesSection />

      {/* ── Delivery timeline ── */}
      <DeliveryTimeline />

      {/* ── FAQ ── */}
      <FaqAccordion />

      {/* ── CTA related links ── */}
      <RelatedLinks
        title="Start here."
        items={[
          { to: "/services", label: "Services", detail: "Engineering, AI, business systems, design, growth and operations — one connected team." },
          { to: "/about", label: "About Octapus", detail: "The studio engineering the systems behind modern UAE business." },
          { to: "/contact", label: "Contact", detail: "Tell us about the operation you need to connect." },
        ]}
      />
    </>
  );
}
