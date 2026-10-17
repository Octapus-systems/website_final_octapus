import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import BentoCardSSR from "@/components/ui/bento-card";
import { Container, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { RevealButton } from "@/components/site/RevealButton";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { OisConnection } from "@/components/site/OisConnection";
import { ObmsShowcase as ObmsShowcaseSSR } from "@/components/site/ObmsShowcase";
import { BillingShowcase as BillingShowcaseSSR } from "@/components/site/BillingShowcase";
import { LmsShowcase as LmsShowcaseSSR } from "@/components/site/LmsShowcase";
import { HorusCard as HorusCardSSR } from "@/components/site/HorusCard";
import { products, productOisNotes, site, noindexProductSlugs, processStages } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { buildMeta, breadcrumbSchema, absoluteUrl, isShareableImage } from "@/lib/seo";
import { cn } from "@/lib/utils";

// Heavy showcases render on the server as usual; in the browser each is its own chunk, loaded
// during hydration after the first paint (the SSR branch is removed from the client build).
const BentoCard = import.meta.env.SSR
  ? BentoCardSSR
  : lazy(() => import("@/components/ui/bento-card"));
const ObmsShowcase = import.meta.env.SSR
  ? ObmsShowcaseSSR
  : lazy(() =>
      import("@/components/site/ObmsShowcase").then((mod) => ({ default: mod.ObmsShowcase })),
    );
const BillingShowcase = import.meta.env.SSR
  ? BillingShowcaseSSR
  : lazy(() =>
      import("@/components/site/BillingShowcase").then((mod) => ({ default: mod.BillingShowcase })),
    );
const LmsShowcase = import.meta.env.SSR
  ? LmsShowcaseSSR
  : lazy(() =>
      import("@/components/site/LmsShowcase").then((mod) => ({ default: mod.LmsShowcase })),
    );
const HorusCard = import.meta.env.SSR
  ? HorusCardSSR
  : lazy(() => import("@/components/site/HorusCard").then((mod) => ({ default: mod.HorusCard })));

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Octapus" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData;
    const meta = buildMeta({
      title: `${p.name} | Octapus`,
      description: `${p.headline} ${p.outcome}`.slice(0, 158),
      path: `/products/${params.slug}`,
      ogType: "product",
      image: p.image,
      keywords: [...p.tags, "Octapus", "UAE software", p.name],
    });
    if (!noindexProductSlugs.includes(params.slug)) return meta;
    // buildMeta's own robots tag is "noindex,nofollow", so swap it for "noindex, follow".
    return {
      ...meta,
      meta: [
        ...meta.meta.filter((m) => m.name !== "robots"),
        { name: "robots", content: "noindex, follow" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <Section title="Product not found">
      <div className="text-center">
        <Button asChild variant="outline">
          <Link to="/products">Back to products</Link>
        </Button>
      </div>
    </Section>
  ),
});

function ProductPage() {
  const p = Route.useLoaderData();
  const isOIS = p.slug === "ois";
  const isObms = p.slug === "obms-erp";

  const [isHovered, setIsHovered] = useState(false);
  const [gifKey, setGifKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const heroVideoSrc =
    p.slug === "ois"
      ? "/ois-video.mp4"
      : p.slug === "outreach"
        ? "/outreach-video.mp4"
        : p.slug === "custom-business-solutions"
          ? "/custom-business-solutions-video.mp4"
          : p.slug === "billing-software"
            ? "/beep-hero-video.mp4"
            : p.slug === "odoo-custom-erp"
              ? "/odoo-custom-erp-video.mp4"
              : p.slug === "erp-implementation"
                ? "/erp-implementation-video.mp4"
                : p.slug === "horus-ai"
                  ? "/horus-ai-video.mp4"
                  : p.slug === "lms"
                    ? "/lms-video.mp4"
                    : null;

  const startPlayback = () => {
    setIsHovered(true);
    setGifKey(Date.now());
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const stopPlayback = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    if (!heroVideoSrc) return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isFinePointer) {
      startPlayback();
    }
  };

  const handleMouseLeave = () => {
    if (!heroVideoSrc) return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isFinePointer) {
      stopPlayback();
    }
  };

  useEffect(() => {
    if (!heroVideoSrc || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isTouchOrCoarse =
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
          window.innerWidth < 1024;

        if (isTouchOrCoarse) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            startPlayback();
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.4) {
            stopPlayback();
          }
        }
      },
      {
        threshold: [0, 0.4, 0.5, 0.6, 1.0],
      },
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [heroVideoSrc]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: p.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: p.headline,
          url: absoluteUrl(`/products/${p.slug}`),
          // No `offers`: pricing is quoted per project, so a price here would be inaccurate.
          ...(isShareableImage(p.image) ? { image: absoluteUrl(p.image) } : {}),
          provider: { "@type": "Organization", name: site.legalName, url: absoluteUrl("/") },
          keywords: p.tags.join(", "),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: p.name, path: `/products/${p.slug}` },
        ])}
      />

      <Container className="pt-10 pb-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All products
        </Link>
      </Container>

      <Section className="!pt-10 md:!pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <div
            className={
              isObms
                ? "lg:col-span-12 space-y-6 text-center max-w-3xl mx-auto"
                : "min-w-0 space-y-6 lg:col-span-6"
            }
          >
            <div className="text-eyebrow">{p.tags.join(" · ")}</div>
            <h1 className="max-w-[11ch] text-balance break-words text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-6xl xl:text-7xl">
              {p.name}
            </h1>
            <p className="max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {p.headline}
            </p>
            <div
              className={
                isObms ? "flex flex-wrap gap-3 pt-2 justify-center" : "flex flex-wrap gap-3 pt-2"
              }
            >
              {isOIS ? (
                <RevealButton
                  to={site.oisExternalUrl}
                  external
                  icon={ExternalLink}
                  label="Experience the OIS Concept"
                  className="h-12 min-w-12 max-w-12 px-3 hover:max-w-80"
                  onClick={() => trackEvent("ois_external_click", { source: "product_page" })}
                />
              ) : p.slug === "horus-ai" && p.externalUrl ? (
                <RevealButton
                  to={p.externalUrl}
                  external
                  icon={ExternalLink}
                  label="Visit the Horus AI website"
                  className="h-12 min-w-12 max-w-12 px-3 hover:max-w-80"
                  onClick={() => trackEvent("horus_external_click", { source: "product_hero" })}
                />
              ) : (
                <RevealButton
                  to="/contact"
                  icon={ArrowRight}
                  label={`Discuss ${p.name}`}
                  className="h-12 min-w-12 max-w-12 px-3 hover:max-w-80"
                  onClick={() => trackEvent("product_enquiry", { product: p.slug })}
                />
              )}
              {isObms && p.externalUrl ? (
                <RevealButton
                  to={p.externalUrl}
                  external
                  icon={ExternalLink}
                  label="More detail"
                  variant="outline"
                  className="h-12 min-w-12 max-w-12 px-3 hover:max-w-64"
                  onClick={() => trackEvent("obms_external_click", { source: "product_hero" })}
                />
              ) : p.slug === "horus-ai" ? (
                <RevealButton
                  to="/contact"
                  icon={ArrowRight}
                  label={`Talk about ${p.name}`}
                  variant="outline"
                  className="h-12 min-w-12 max-w-12 px-3 hover:max-w-80"
                  onClick={() => trackEvent("product_enquiry", { product: p.slug })}
                />
              ) : (
                <RevealButton
                  to="/book"
                  label="Book a strategy call"
                  variant="outline"
                  className="h-12 min-w-12 max-w-12 px-3 hover:max-w-72"
                />
              )}
            </div>
          </div>
          {!isObms && (
            <div className="min-w-0 lg:col-span-6">
              <div
                ref={cardRef}
                className={cn(
                  "relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border hairline bg-card p-6 text-center shadow-xl transition-[transform,box-shadow,border-color] duration-300 md:p-8",
                  heroVideoSrc && "cursor-pointer",
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {heroVideoSrc &&
                  (heroVideoSrc.endsWith(".gif") ? (
                    <img
                      key={gifKey}
                      src={gifKey ? `${heroVideoSrc}?t=${gifKey}` : heroVideoSrc}
                      alt={`${p.name} animated demonstration`}
                      className={cn(
                        "absolute inset-0 size-full object-cover rounded-3xl transition-all duration-500 z-20 pointer-events-none",
                        isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105",
                      )}
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={heroVideoSrc}
                      autoPlay={p.slug === "lms"}
                      loop={p.slug !== "ois"}
                      muted
                      playsInline
                      preload="auto"
                      className={cn(
                        "absolute inset-0 size-full object-cover rounded-3xl transition-opacity duration-500 z-20 pointer-events-none",
                        p.slug === "lms" || p.slug === "ois"
                          ? "opacity-100"
                          : isHovered
                            ? "opacity-100"
                            : "opacity-0",
                      )}
                    />
                  ))}

                {p.image && p.slug !== "lms" && p.slug !== "ois" ? (
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center size-full p-6 md:p-10 transition-all duration-300",
                      heroVideoSrc && isHovered
                        ? "opacity-0 scale-95 pointer-events-none"
                        : "opacity-100 scale-100",
                    )}
                  >
                    <img
                      src={p.image}
                      alt={`${p.name} logo`}
                      loading="eager"
                      width={600}
                      height={600}
                      className="max-h-44 md:max-h-56 w-auto max-w-full object-contain"
                    />
                  </div>
                ) : p.slug === "lms" || p.slug === "ois" ? null : (
                  <div className="absolute inset-0 bg-muted/20 grid place-items-center">
                    <Suspense fallback={null}>
                      <BentoCard />
                    </Suspense>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      {p.slug !== "lms" && <ProductAtAGlance product={p} />}

      <Suspense fallback={null}>
        {isObms ? (
          <ObmsShowcase product={p} />
        ) : p.slug === "billing-software" ? (
          <BillingShowcase product={p} />
        ) : p.slug === "lms" ? (
          <LmsShowcase product={p} />
        ) : p.slug === "horus-ai" ? (
          <Section className="!pt-0">
            <div className="mx-auto max-w-4xl">
              <HorusCard source="product_page" showExploreLink={true} />
            </div>
          </Section>
        ) : null}
      </Suspense>

      {productOisNotes[p.slug] ? (
        <OisConnection
          eyebrow="Enhanced with OIS"
          title={`${p.name}, with the OIS intelligence layer.`}
          body={productOisNotes[p.slug]}
          chain={[
            `${p.name}`,
            "OIS intelligence layer",
            "AI agents (Horus AI first)",
            "People and business actions",
          ]}
        />
      ) : null}

      <RelatedLinks
        title="Related Octapus systems and services."
        items={[
          {
            to: "/products",
            label: "All products",
            detail: "Browse the full Octapus product ecosystem.",
          },
          {
            to: "/technology",
            label: "Technology",
            detail: "How Octapus designs, builds and operates systems like this one.",
          },
          {
            to: "/ois",
            label: "OIS",
            detail: "The intelligence layer that connects Octapus systems.",
          },
        ]}
      />
    </>
  );
}

const ENGAGEMENT_STEPS = ["Discover", "Plan", "Launch", "Support"]
  .map((name) => processStages.find((stage) => stage.name === name))
  .filter((stage): stage is (typeof processStages)[number] => Boolean(stage));

/** Who the product is for, what it solves and how an engagement runs (from existing site data). */
function ProductAtAGlance({ product }: { product: (typeof products)[number] }) {
  return (
    <Section className="!pt-0" eyebrow="At a glance" title={`What ${product.name} does`}>
      <dl className="grid gap-4 md:grid-cols-3">
        {[
          { term: "Who it is for", text: product.customer },
          { term: "The problem", text: product.problem },
          { term: "What you get", text: product.outcome },
        ].map((item) => (
          <div key={item.term} className="rounded-2xl border hairline bg-card p-6">
            <dt className="text-eyebrow text-primary">{item.term}</dt>
            <dd className="mt-3 leading-7 text-foreground">{item.text}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          How an engagement works
        </h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT_STEPS.map((stage, index) => (
            <li key={stage.name} className="rounded-2xl border hairline p-5">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <p className="mt-2 font-semibold text-foreground">{stage.name}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{stage.detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-full px-6">
            <Link
              to="/contact"
              onClick={() =>
                trackEvent("product_enquiry", { product: product.slug, source: "glance" })
              }
            >
              Request a walkthrough
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6">
            <Link to="/book">Book a strategy call</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
