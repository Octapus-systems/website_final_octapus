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
      imageFit: p.image ? p.imageFit : "cover",
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
      <Section className="min-h-[calc(100svh-4rem)] overflow-hidden bg-background !py-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[12%] top-[15%] h-[56%] rounded-[50%] bg-primary/[0.055] blur-3xl"
        />
        <DotPattern
          width={22}
          height={22}
          cr={0.8}
          className={cn(
            "fill-neutral-400/45 dark:fill-white/10",
            "[mask-image:radial-gradient(ellipse_68%_72%_at_50%_45%,black,transparent)]",
            "animate-scrolling-dots motion-reduce:animate-none",
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center py-20 text-center md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs"
          >
            <span aria-hidden="true" className="h-px w-8 bg-primary/45 sm:w-12" />
            Octapus / Software Engineering
            <span aria-hidden="true" className="h-px w-8 bg-primary/45 sm:w-12" />
          </motion.div>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
            }}
            className="mt-8 max-w-[11ch] text-balance font-display text-[clamp(4.25rem,10vw,9rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-foreground sm:max-w-none sm:whitespace-nowrap"
          >
            {["Build", "For"].map((part) => (
              <motion.span
                key={part}
                variants={{
                  hidden: { opacity: 0, y: 36 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="inline-block"
              >
                {part}&nbsp;
              </motion.span>
            ))}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="inline-block text-primary"
            >
              Today
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-10 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
          >
            AI-first development and experienced engineering, working together to move ambitious
            software from idea to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25"
            >
              <Link to="/book">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 text-base font-medium"
            >
              <Link to="/contact">Discuss Software Idea</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground/75 sm:gap-x-6 sm:text-[0.7rem]"
          >
            {["Custom software", "AI systems", "Digital platforms"].map((capability, index) => (
              <React.Fragment key={capability}>
                {index > 0 && (
                  <li aria-hidden="true" className="h-1 w-1 rounded-full bg-primary/55" />
                )}
                <li>{capability}</li>
              </React.Fragment>
            ))}
          </motion.ul>
        </div>
      </Section>

      {/* ── 02. VIDEO SECTION ── */}
      <ScrollVideoSection frameCount={600} mobileFrameCount={530} heightMultiplier={4} />

      {/* ── 03. WHAT WE BUILD ── */}
      <WhatWeBuildSection />

      {/* ── 03. OUR PRODUCTS & TRUST PROOF ── */}
      <Section
        eyebrow="Proven Systems"
        title="Our Products"
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
              <p className="text-xs text-muted-foreground max-w-[200px] mx-auto mt-1">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 04. THE OCTAPUS ADVANTAGE ── */}
      <OctapusAdvantageSection />

      {/* ── 05. OUR BUILD PROCESS ── */}
      <BuildProcessSection />

      {/* ── 06. CLOSING CTA ── */}
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
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-primary/25"
            >
              <Link to="/book">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-14 text-base font-medium"
            >
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
