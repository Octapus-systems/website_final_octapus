import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { JsonLd } from "@/components/site/JsonLd";
import { ScrollVideoSection } from "@/components/site/ScrollVideoSection";
import { ProductsShowcase } from "@/components/site/ProductsShowcase";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { site, products, hiddenProductSlugs, capabilities, stats, testimonials } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import TestimonialsV2 from "@/components/ui/testimonial-v2";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { motion } from "framer-motion";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

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
        "Octapus designs and develops custom software, intelligent AI systems and digital platforms that help businesses in the UAE operate, automate and grow.",
      path: "/",
      ogType: "website",
      keywords: [
        "Octapus",
        "UAE software company",
        "custom software development UAE",
        "ERP CRM Dubai",
        "AI solutions UAE",
        "business systems",
        "digital platforms",
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

      {/* ── Hero scroll video ── */}
      <ScrollVideoSection frameCount={600} mobileFrameCount={530} heightMultiplier={4} />

      {/* ── 1. Value Proposition (Tagline) ── */}
      <Section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "animate-scrolling-dots",
          )}
        />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]"
          >
            Software that becomes the <span className="text-primary">spine</span> of your operation.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We don't just write code. We forge the systems that connect your people, process, and
            data—designed in the UAE and built for scale.
          </motion.p>
        </div>
      </Section>

      {/* ── 2. Capabilities ── */}
      <Section
        title="What we do"
        className="bg-surface dark:bg-surface-dark border-y border-hairline"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-hairline hover:border-primary/30 transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">{cap.verb}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cap.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 3. Statistics (Trust) ── */}
      <Section className="py-20 bg-background">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="text-sm font-semibold tracking-wide uppercase text-primary">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">{stat.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 4. Our Products (Existing Grid) ── */}
      <Section
        title="Our Products"
        intro="The specialized systems we've built to solve complex business problems."
        className="bg-surface dark:bg-surface-dark border-y border-hairline"
      >
        <div className="w-full overflow-hidden bg-background py-10 mt-8 rounded-3xl border border-hairline">
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

      {/* ── 5. Testimonials ── */}
      <Section
        title="Built for impact"
        intro="Don't just take our word for it."
        className="bg-background"
      >
        <TestimonialsV2 />
      </Section>

      {/* ── 6. Final CTA ── */}
      <Section className="bg-surface dark:bg-surface-dark border-t border-hairline">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-6">
            Ready to upgrade your operation?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl">
            Let's discuss how custom software and intelligent systems can transform the way you do
            business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/book">
                Book a strategy call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link to="/contact">Contact sales</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
