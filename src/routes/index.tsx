import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { JsonLd } from "@/components/site/JsonLd";
import { ScrollVideoSection } from "@/components/site/ScrollVideoSection";
import { Section } from "@/components/site/Section";
import { site, products, hiddenProductSlugs, stats } from "@/lib/site";
import { buildMeta, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { ArrowRight, Grid3X3, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

import { WhatWeBuildSection } from "@/components/site/WhatWeBuildSection";
import { OctapusAdvantageSection } from "@/components/site/OctapusAdvantageSection";
import { BuildProcessSection } from "@/components/site/BuildProcessSection";
import { RevealButton } from "@/components/site/RevealButton";
import { servicePages } from "@/lib/service-pages";

import productErpImg from "@/assets/product-erp.png";
import productCrmImg from "@/assets/product-crm.png";
import productAiImg from "@/assets/product-ai.png";
import heroLaptop from "@/assets/hero-laptop.webp";
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

const statGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    ...buildMeta({
      title: "Octapus — Custom Software, AI Systems and Digital Platforms",
      description:
        "Octapus designs and develops mobile apps, custom software, ERP systems, business automation, web platforms and creative production around real business requirements.",
      path: "/",
      ogType: "website",
      keywords: [
        "Octapus",
        "custom software development",
        "software development company",
        "mobile app development",
        "iOS app development",
        "Android app development",
        "ERP development",
        "custom ERP systems",
        "business automation",
        "custom business systems",
        "web application development",
        "technology consulting",
        "creative production",
      ],
    }),
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const carouselSlides = React.useMemo(() => {
    return visibleProducts.map((p, idx) => ({
      src: p.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
      alt: p.name,
      title: p.name,
      subtitle: p.headline,
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
          url: `${SITE_URL}/`,
          publisher: { "@type": "Organization", name: site.legalName },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Octapus software and digital services",
          itemListElement: servicePages.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
              url: `/services/${service.slug}`,
              provider: { "@type": "Organization", name: site.legalName },
            },
          })),
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
      <header className="relative isolate overflow-hidden border-b border-border bg-background text-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle,currentColor_0.7px,transparent_0.8px)] bg-[size:24px_24px] opacity-[0.12]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 aspect-square w-[min(82vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.055]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 aspect-square w-[min(60vw,35rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.055]"
        />
        <motion.span
          aria-hidden="true"
          className="absolute left-[18%] top-[31%] size-2 rounded-full bg-foreground"
          animate={reducedMotion ? undefined : { y: [0, -10, 0], x: [0, 4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute right-[16%] top-[36%] size-3 rounded-full bg-foreground"
          animate={reducedMotion ? undefined : { y: [0, 12, 0], x: [0, -6, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-[22%] right-[25%] size-1.5 rounded-full bg-foreground"
          animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-page relative flex min-h-[calc(100svh-4rem)] items-center justify-center py-20 sm:py-24">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center"
          >
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
              Custom software development
            </p>
            <h1 className="mt-6 text-balance font-display text-[clamp(4rem,10vw,9rem)] font-black leading-[0.82] tracking-[-0.065em] text-foreground">
              Build for <span className="galaxy-text">Today</span>
            </h1>
            <p className="mt-8 max-w-[58ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg lg:text-xl lg:leading-8">
              Practical software, mobile apps, ERP systems and digital platforms built around the
              way your business works.
            </p>

            <div className="mt-10 flex items-start justify-center gap-9 sm:gap-14">
              <div className="flex w-24 flex-col items-center gap-3 sm:w-32">
                <Link
                  to="/book"
                  aria-label="Start a project"
                  className="group flex size-16 items-center justify-center rounded-full bg-foreground text-background shadow-[0_16px_34px_-20px_color-mix(in_oklab,var(--color-foreground)_75%,transparent)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 active:translate-y-0 sm:size-20"
                >
                  <ArrowRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-1 sm:size-6"
                    aria-hidden="true"
                  />
                </Link>
                <span className="text-sm font-semibold text-foreground">Start a project</span>
              </div>
              <div className="flex w-24 flex-col items-center gap-3 sm:w-32">
                <a
                  href="#services"
                  aria-label="Explore services"
                  className="group flex size-16 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 active:translate-y-0 sm:size-20"
                >
                  <Grid3X3
                    className="size-5 transition-transform duration-300 group-hover:rotate-12 sm:size-6"
                    aria-hidden="true"
                  />
                </a>
                <span className="text-sm font-semibold text-foreground">Explore services</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── 02. VIDEO SECTION ── */}
      <ScrollVideoSection frameCount={200} mobileFrameCount={177} heightMultiplier={4} />

      {/* ── 03. WHAT WE BUILD ── */}
      <WhatWeBuildSection />

      {/* ── 03. OUR PRODUCTS & TRUST PROOF ── */}
      <Section
        eyebrow="Proven Systems"
        title="Our Products"
        intro="Real-world business systems designed, built, and deployed by Octapus."
        className="bg-background relative overflow-hidden"
      >
        <div className="w-full overflow-hidden mt-4">
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
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={statGridVariants}
          className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 max-w-5xl mx-auto text-center mt-16 pt-12 border-t border-hairline"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={statItemVariants} className="space-y-1">
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.82 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: "spring", stiffness: 280, damping: 22 },
                  },
                }}
                className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground"
              >
                {stat.value}
              </motion.div>
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-primary">
                {stat.label}
              </div>
              <p className="text-xs text-muted-foreground max-w-[200px] mx-auto mt-1">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── 05. THE OCTAPUS ADVANTAGE ── */}
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
            <RevealButton
              to="/book"
              icon={ArrowRight}
              label="Start Your Project"
              className="h-14 min-w-14 max-w-14 px-5 hover:max-w-64 shadow-xl shadow-primary/25"
            />
            <RevealButton
              to="/contact"
              icon={Mail}
              label="Contact Sales"
              variant="outline"
              className="h-14 min-w-14 max-w-14 px-5 hover:max-w-64"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
