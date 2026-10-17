import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { JsonLd } from "@/components/site/JsonLd";
import { Octapus3DSection, useStoryDone } from "@/components/site/Octapus3DSection";
import { useLoadingDone } from "@/components/site/LoadingScreen";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { site, products, hiddenProductSlugs } from "@/lib/site";
import { buildMeta, breadcrumbSchema, SITE_URL, absoluteUrl } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
  animate as motionAnimate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { HomeFaq } from "@/components/site/HomeFaq";
import { SelectedWorkSection } from "@/components/site/SelectedWorkSection";

import { OctapusAdvantageSection } from "@/components/site/OctapusAdvantageSection";
import { BuildProcessSection } from "@/components/site/BuildProcessSection";
import { WhatWeBuildSection } from "@/components/site/WhatWeBuildSection";
import { RevealButton } from "@/components/site/RevealButton";
import { servicePages } from "@/lib/service-pages";
import { trackEvent } from "@/lib/analytics";

import productErpImg from "@/assets/product-erp.webp";
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

const heroTitle = "Build For Today";

const visibleProducts = products.filter((p) => !hiddenProductSlugs.includes(p.slug));

const closingCtaVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const closingCtaItemVariants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    ...buildMeta({
      title: "Octapus — AI & Software Development Company in Dubai, UAE",
      description:
        "AI and software development company in Dubai and Ajman. Octapus builds custom software, AI automation, ERP and CRM systems, mobile apps and web platforms.",
      path: "/",
      ogType: "website",
      keywords: [
        "Octapus",
        "AI company in UAE",
        "AI company Dubai",
        "IT company in UAE",
        "software development company Dubai",
        "software company UAE",
        "AI automation UAE",
        "AI agents UAE",
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
  // Hero intro waits for the loading screen to fade out
  const heroReady = useLoadingDone();
  // "What We Build" only appears once the 3D story has finished
  const storyDone = useStoryDone();

  const carouselSlides = React.useMemo(() => {
    return visibleProducts.map((p, idx) => ({
      src: p.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
      alt: p.imageFit === "contain" ? `${p.name} logo` : `${p.name} platform interface`,
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
          inLanguage: "en",
          publisher: { "@id": "https://www.octapus.ae/#organization" },
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
              url: absoluteUrl(`/services/${service.slug}`),
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
            url: absoluteUrl(`/products/${p.slug}`),
            name: p.name,
          })),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />

      {/* ── 01. HERO ── */}
      <header className="relative isolate overflow-hidden bg-background text-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle,currentColor_0.7px,transparent_0.8px)] bg-[size:24px_24px] opacity-[0.12] dark:opacity-[0.28] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        />
        <DotPattern className="[mask-image:linear-gradient(to_bottom,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)] fill-neutral-400/45 animate-scrolling-dots motion-reduce:animate-none dark:fill-white/30" />

        <div
          data-hero-intro
          data-intro-done={heroReady && !reducedMotion ? "" : undefined}
          className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center py-20 text-center md:py-24"
        >
          <div
            className="hero-fade flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs"
            style={{ "--hero-delay": "0s", "--hero-dur": "0.55s" } as React.CSSProperties}
          >
            <span aria-hidden="true" className="h-px w-8 bg-primary/45 sm:w-12" />
            Octapus / Software Engineering
            <span aria-hidden="true" className="h-px w-8 bg-primary/45 sm:w-12" />
          </div>

          <h1
            aria-label={heroTitle}
            className="mt-8 flex flex-row flex-wrap items-center justify-center gap-y-1 text-balance font-display text-[clamp(3.4rem,14vw,9rem)] sm:text-[clamp(4.25rem,10vw,9rem)] font-semibold leading-[0.84] tracking-[-0.038em] text-foreground [text-shadow:0_4px_24px_rgba(0,0,0,0.06)] dark:[text-shadow:0_4px_24px_rgba(255,255,255,0.08)] sm:max-w-none sm:whitespace-nowrap"
          >
            {heroTitle.split(" ").map((word, wordIndex, words) => {
              const offset = words.slice(0, wordIndex).join(" ").length + (wordIndex ? 1 : 0);
              return (
                <span key={word} className="inline-flex whitespace-nowrap">
                  {Array.from(wordIndex < words.length - 1 ? word + " " : word).map(
                    (character, i) => {
                      const index = offset + i;
                      return (
                        <span
                          key={`${character}-${index}`}
                          aria-hidden="true"
                          className={
                            character === " "
                              ? "inline-block w-[0.2em]"
                              : index >= 10
                                ? "hero-char inline-block text-primary"
                                : "hero-char inline-block"
                          }
                          style={
                            { "--hero-delay": `${0.16 + index * 0.065}s` } as React.CSSProperties
                          }
                        >
                          {character === " " ? "\u00a0" : character}
                        </span>
                      );
                    },
                  )}
                </span>
              );
            })}
          </h1>

          <p
            className="hero-fade mx-auto mt-10 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            style={{ "--hero-delay": "0.2s", "--hero-dur": "0.8s" } as React.CSSProperties}
          >
            Custom software, ERP, CRM, AI automation and mobile apps for UAE businesses — AI-first
            and engineer-led, from idea to production.
          </p>

          <div
            className="hero-fade mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ "--hero-delay": "0.3s", "--hero-dur": "0.8s" } as React.CSSProperties}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25"
            >
              <Link
                to="/book"
                onClick={() => trackEvent("strategy_call_click", { source: "hero" })}
              >
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 text-base font-medium"
            >
              <Link
                to="/contact"
                onClick={() => trackEvent("contact_cta_click", { source: "hero" })}
              >
                Discuss Your Software Idea
              </Link>
            </Button>
          </div>

          <ul
            className="hero-fade mt-14 flex flex-wrap items-center justify-center gap-x-3 px-4 gap-y-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground/75 sm:gap-x-6 sm:text-[0.7rem]"
            style={{ "--hero-delay": "0.45s", "--hero-dur": "0.7s" } as React.CSSProperties}
          >
            {["Custom software", "AI systems", "Digital platforms"].map((capability, index) => (
              <React.Fragment key={capability}>
                {index > 0 && (
                  <li aria-hidden="true" className="h-1 w-1 rounded-full bg-primary/55" />
                )}
                <li>{capability}</li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </header>

      {/* ── 02. EVERYTHING CONNECTED (3D) ── */}
      <Octapus3DSection />

      {/* ── 03. WHAT WE BUILD ── */}
      <motion.div
        initial={false}
        animate={storyDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!storyDone}
      >
        <WhatWeBuildSection />
      </motion.div>

      {/* ── 04. OUR PRODUCTS & TRUST PROOF ── */}
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
      </Section>

      {/* ── SELECTED WORK ── */}
      <SelectedWorkSection />

      {/* ── 05. THE OCTAPUS ADVANTAGE ── */}
      <OctapusAdvantageSection />

      {/* ── 05. OUR BUILD PROCESS ── */}
      <BuildProcessSection />

      {/* ── FAQ (also FAQPage structured data for search + AI answers) ── */}
      <HomeFaq />

      {/* ── 06. CLOSING CTA ── */}
      <Section className="bg-surface dark:bg-surface-dark border-t border-hairline relative overflow-hidden py-24 md:py-32">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl md:h-[30rem] md:w-[30rem]"
          animate={
            reducedMotion ? undefined : { scale: [0.9, 1.15, 0.9], opacity: [0.35, 0.7, 0.35] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={closingCtaVariants}
          className="mx-auto max-w-5xl text-center flex flex-col items-center relative z-10 space-y-8"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-foreground leading-[1.15]">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" variants={closingCtaItemVariants}>
                Your idea goes in.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                variants={closingCtaItemVariants}
                className="block bg-gradient-to-r from-primary via-purple-400 to-indigo-400 bg-[length:200%_100%] bg-clip-text text-transparent"
                animate={
                  reducedMotion
                    ? undefined
                    : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                A production-ready system comes out.
              </motion.span>
            </span>
          </h2>

          <motion.div
            variants={closingCtaItemVariants}
            className="pt-6 flex flex-col sm:flex-row gap-4"
          >
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <Button
                asChild
                size="lg"
                className="group rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-primary/25"
              >
                <Link
                  to="/book"
                  onClick={() => trackEvent("strategy_call_click", { source: "closing_cta" })}
                >
                  Start Your Project
                  <ArrowRight
                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 text-base font-medium"
              >
                <Link
                  to="/contact"
                  onClick={() => trackEvent("contact_cta_click", { source: "closing_cta" })}
                >
                  Contact Sales
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </>
  );
}
