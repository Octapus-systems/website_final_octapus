import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { JsonLd } from "@/components/site/JsonLd";
import { Octapus3DSection } from "@/components/site/Octapus3DSection";
import { useLoadingDone } from "@/components/site/LoadingScreen";
import { Section } from "@/components/site/Section";
import { site, products, hiddenProductSlugs, stats } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";
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

function AnimatedStatValue({ value }: { value: string }) {
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.7 });
  const reducedMotion = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = Number(match?.[1] ?? 0);
  const suffix = match?.[2] ?? "";
  const count = useMotionValue(reducedMotion ? target : 0);
  const displayValue = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  React.useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      count.set(target);
      return;
    }

    const controls = motionAnimate(count, target, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [count, isInView, reducedMotion, target]);

  return (
    <motion.span ref={elementRef} aria-label={value}>
      {displayValue}
    </motion.span>
  );
}

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
  // Hero intro waits for the loading screen to fade out
  const heroReady = useLoadingDone();

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
        <DotPattern className="fill-neutral-400/45 animate-scrolling-dots motion-reduce:animate-none dark:fill-white/10" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center py-20 text-center md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs"
          >
            <span aria-hidden="true" className="h-px w-8 bg-primary/45 sm:w-12" />
            Octapus / Software Engineering
            <span aria-hidden="true" className="h-px w-8 bg-primary/45 sm:w-12" />
          </motion.div>

          <motion.h1
            initial={reducedMotion ? false : "hidden"}
            animate={heroReady || reducedMotion ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.065, delayChildren: 0.16 } },
            }}
            aria-label={heroTitle}
            className="mt-8 flex flex-row items-center justify-center max-w-[11ch] text-balance font-display text-[clamp(4.25rem,10vw,9rem)] font-semibold leading-[0.84] tracking-[-0.038em] text-foreground [text-shadow:0_4px_24px_rgba(0,0,0,0.06)] dark:[text-shadow:0_4px_24px_rgba(255,255,255,0.08)] sm:max-w-none sm:whitespace-nowrap"
          >
            {Array.from(heroTitle).map((character, index) => (
              <motion.span
                key={`${character}-${index}`}
                aria-hidden="true"
                variants={{
                  hidden: {
                    opacity: character === " " ? 0 : 0.16,
                    filter: "blur(12px)",
                    scale: 1.025,
                  },
                  visible: {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className={
                  character === " "
                    ? "inline-block w-[0.2em]"
                    : index >= 10
                      ? "inline-block text-primary"
                      : "inline-block"
                }
              >
                {character === " " ? "\u00a0" : character}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-10 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
          >
            AI-first development and experienced engineering, working together to move scalable
            software from idea to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
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
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
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
      </header>

      {/* ── 02. EVERYTHING CONNECTED (3D) ── */}
      <Octapus3DSection />

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
                <AnimatedStatValue value={stat.value} />
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
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl md:h-[30rem] md:w-[30rem]"
          animate={reducedMotion ? undefined : { scale: [0.9, 1.15, 0.9], opacity: [0.35, 0.7, 0.35] }}
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
                animate={reducedMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                A production-ready system comes out.
              </motion.span>
            </span>
          </h2>

          <motion.div variants={closingCtaItemVariants} className="pt-6 flex flex-col sm:flex-row gap-4">
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
                <Link to="/book">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </>
  );
}
