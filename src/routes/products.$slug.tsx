import { useState, useRef } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import FluidFlowGrid from "@/components/ui/fluid-flow-grid";
import BentoCard from "@/components/ui/bento-card";
import { Container, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { OisConnection } from "@/components/site/OisConnection";
import { ObmsShowcase } from "@/components/site/ObmsShowcase";
import { BillingShowcase } from "@/components/site/BillingShowcase";
import { HorusCard } from "@/components/site/HorusCard";
import { products, productOisNotes, site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
    return buildMeta({
      title: `${p.name} — ${p.headline}`.slice(0, 70),
      description: `${p.headline} ${p.outcome}`.slice(0, 158),
      path: `/products/${params.slug}`,
      ogType: "product",
      image: p.image,
      keywords: [...p.tags, "Octapus", "UAE software", p.name],
    });
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (p.slug !== "billing-software") return;
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (p.slug !== "billing-software") return;
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

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
          url: `/products/${p.slug}`,
          ...(p.image ? { image: p.image } : {}),
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
          },
          provider: { "@type": "Organization", name: site.legalName, url: "/" },
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

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div
            className={
              isObms
                ? "lg:col-span-12 space-y-6 text-center max-w-3xl mx-auto"
                : "lg:col-span-6 space-y-6"
            }
          >
            <div className="text-eyebrow">{p.tags.join(" · ")}</div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02]">
              {p.name}
            </h1>
            <p className="text-xl leading-relaxed">{p.headline}</p>
            <div
              className={
                isObms ? "flex flex-wrap gap-3 pt-2 justify-center" : "flex flex-wrap gap-3 pt-2"
              }
            >
              {isOIS ? (
                <Button
                  asChild
                  size="lg"
                  className="rounded-full"
                  onClick={() => trackEvent("ois_external_click", { source: "product_page" })}
                >
                  <a href={site.oisExternalUrl} target="_blank" rel="noopener noreferrer">
                    Experience the OIS Concept <ExternalLink className="ml-1 size-4" />
                  </a>
                </Button>
              ) : p.slug === "horus-ai" && p.externalUrl ? (
                <Button
                  asChild
                  size="lg"
                  className="rounded-full"
                  onClick={() => trackEvent("horus_external_click", { source: "product_hero" })}
                >
                  <a href={p.externalUrl} target="_blank" rel="noopener noreferrer">
                    Visit the Horus AI website <ExternalLink className="ml-1 size-4" />
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="rounded-full"
                  onClick={() => trackEvent("product_enquiry", { product: p.slug })}
                >
                  <Link to="/contact">
                    Talk about {p.name} <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              )}
              {isObms && p.externalUrl ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => trackEvent("obms_external_click", { source: "product_hero" })}
                >
                  <a href={p.externalUrl} target="_blank" rel="noopener noreferrer">
                    More detail <ExternalLink className="ml-1 size-4" />
                  </a>
                </Button>
              ) : p.slug === "horus-ai" ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => trackEvent("product_enquiry", { product: p.slug })}
                >
                  <Link to="/contact">
                    Talk about {p.name} <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/book">Book a strategy call</Link>
                </Button>
              )}
            </div>
          </div>
          {!isObms && (
            <div className="lg:col-span-6">
              <div
                className={cn(
                  "relative aspect-[4/3] rounded-3xl overflow-hidden border hairline bg-gradient-to-br from-primary/10 via-background to-muted/40 p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300",
                  p.slug === "billing-software" && "cursor-pointer"
                )}
                onMouseEnter={p.slug === "billing-software" ? handleMouseEnter : undefined}
                onMouseLeave={p.slug === "billing-software" ? handleMouseLeave : undefined}
              >
                {/* Background ambient lighting */}
                <div className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

                {p.slug === "billing-software" && (
                  <video
                    ref={videoRef}
                    src="/beep-hero-video.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className={cn(
                      "absolute inset-0 size-full object-cover rounded-3xl transition-all duration-500 z-20 pointer-events-none",
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    )}
                  />
                )}

                {p.image && !["custom-ai"].includes(p.slug) ? (
                  ["billing-software", "outreach", "custom-business-solutions"].includes(p.slug) ? (
                    <div
                      className={cn(
                        "relative z-10 flex flex-col items-center justify-center size-full gap-5 transition-all duration-500",
                        p.slug === "billing-software" && isHovered
                          ? "opacity-0 scale-95 pointer-events-none"
                          : "opacity-100 scale-100"
                      )}
                    >
                      {/* Sleek White App Badge Tile */}
                      <div className="group relative rounded-3xl bg-white p-5 md:p-6 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.25)] border border-slate-200/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_25px_60px_-10px_rgba(79,70,229,0.35)]">
                        <img
                          src={p.image}
                          alt={`${p.name} logo`}
                          loading="lazy"
                          className="h-32 md:h-40 w-auto object-contain rounded-xl"
                        />
                      </div>

                      {/* Descriptive Text Capsule */}
                      <div className="rounded-2xl bg-background/85 backdrop-blur-md border hairline p-4 max-w-md shadow-sm">
                        <p className="text-xs md:text-sm text-foreground/90 font-medium leading-relaxed">
                          {p.slug === "outreach"
                            ? "Lead intelligence and CRM workflows built to capture, qualify, and convert opportunities faster."
                            : p.slug === "custom-business-solutions"
                            ? "Tailored software architecture engineered specifically around your unique business operations."
                            : "Using the app, there are many more such custom features and tools built around the app to suit your business."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={p.image}
                      alt={`${p.name} interface preview`}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 bg-muted/20 grid place-items-center">
                    <BentoCard />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      {isObms ? (
        <ObmsShowcase product={p} />
      ) : p.slug === "billing-software" ? (
        <BillingShowcase product={p} />
      ) : p.slug === "horus-ai" ? (
        <Section className="!pt-0">
          <div className="mx-auto max-w-4xl">
            <HorusCard source="product_page" showExploreLink={true} />
          </div>
        </Section>
      ) : null}

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
