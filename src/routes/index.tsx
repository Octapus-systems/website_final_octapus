import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { JsonLd } from "@/components/site/JsonLd";
import { ScrollVideoSection } from "@/components/site/ScrollVideoSection";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { site, products, hiddenProductSlugs, stats } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { motion } from "framer-motion";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

import { WhatWeBuildSection } from "@/components/site/WhatWeBuildSection";
import { OctapusAdvantageSection } from "@/components/site/OctapusAdvantageSection";
import { BuildProcessSection } from "@/components/site/BuildProcessSection";
import { WhyItChangesSection } from "@/components/site/WhyItChangesSection";

import productErpImg from "@/assets/product-erp.png";
import productCrmImg from "@/assets/product-crm.png";
import productAiImg from "@/assets/product-ai.png";
import heroLaptop from "@/assets/hero-laptop.png";
import obmsBusiness from "@/assets/obms-business.jpg";
import oisNetwork from "@/assets/ois-network.png";

const FALLBACK_IMAGES = [
  productErpImg,
  productCrmImg,
  productAiImg,
  heroLaptop,
  obmsBusiness,
  oisNetwork,
];

const visibleProducts = products.filter((p) => !hiddenProductSlugs.includes(p.slug));

export const Route = createFileRoute("/")({
  head: () => ({
    ...buildMeta({
      title: "Octapus — Custom Software, AI Systems and Digital Platforms",
      description:
        "Octapus is an AI-first software company combining AI development speed with experienced human engineering to deliver production-ready software, AI systems, and business platforms.",
      path: "/",
      ogType: "website",
      keywords: [
        "Octapus",
        "custom software development",
        "AI systems",
        "AI-powered software",
        "digital platforms",
        "business software",
        "business automation",
        "ERP",
        "CRM",
        "AI agents",
        "custom business software",
      ],
    }),
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  const carouselSlides = React.useMemo(() => {
    return visibleProducts.map((p, idx) => ({
      src: p.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
      alt: p.name,
      title: p.name,
      subtitle: p.headline,
      meta: p.tags.slice(0, 3).map((tag) => ({ label: "Tag", value: tag })),
    }));
  }, []);

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

      {/* ── 01. HERO ── */}
      <ScrollVideoSection frameCount={600} mobileFrameCount={530} heightMultiplier={4} />

      <Section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "animate-scrolling-dots"
          )}
        />
        <div className="mx-auto max-w-4xl text-center relative z-10 space-y-6">

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Custom Software + AI Systems + <span className="text-primary">Digital Platforms</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            AI-first development combined with experienced engineering to build production-ready
            software faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25">
              <Link to="/book">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-medium">
              <Link to="/contact">Discuss Software Idea</Link>
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* ── 02. WHAT WE BUILD ── */}
      <WhatWeBuildSection />

      {/* ── 03. OUR PRODUCTS & TRUST PROOF ── */}
      <Section
        eyebrow="Proven Systems"
        title="OUR PRODUCTS"
        intro="Real-world business systems designed, built, and deployed by Octapus."
        className="bg-background relative overflow-hidden"
      >
        <div className="w-full overflow-hidden bg-surface dark:bg-surface-dark py-10 mt-6 rounded-3xl border border-hairline shadow-lg">
          <CoverflowCarousel
            slides={carouselSlides}
            showCaption
            showNavigation
            onSlideClick={(index) => {
              navigate({ to: "/products/$slug", params: { slug: visibleProducts[index].slug } });
            }}
          />
        </div>

        {/* Integrated Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 max-w-5xl mx-auto text-center mt-16 pt-12 border-t border-hairline">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-primary">
                {stat.label}
              </div>
              <p className="text-xs text-muted-foreground max-w-[200px] mx-auto mt-1">{stat.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 04. THE OCTAPUS ADVANTAGE ── */}
      <OctapusAdvantageSection />

      {/* ── 05. OUR BUILD PROCESS ── */}
      <BuildProcessSection />

      {/* ── 06. WHY THIS CHANGES SOFTWARE DEVELOPMENT ── */}
      <WhyItChangesSection />

      {/* ── 07. CLOSING CTA ── */}
      <Section className="bg-surface dark:bg-surface-dark border-t border-hairline relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-foreground leading-[1.15]">
              Your idea goes in. <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                A production-ready system comes out.
              </span>
            </h2>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-primary/25">
              <Link to="/book">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-medium">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
