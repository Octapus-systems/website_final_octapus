import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, ArrowRight, Zap, Clock, BadgeCheck, TrendingDown, Building2 } from "lucide-react";
import oisImg from "@/assets/ois-network.png";
import { Container, Section } from "@/components/site/Section";
import { HorusCard } from "@/components/site/HorusCard";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/ois")({
  head: () => buildMeta({
    title: "OIS — From Artificial Intelligence to Actual Workforce | Octapus",
    description: "OIS, the Octapus Intelligence System, turns your existing software and repetitive workflows into AI employees. Lower cost, faster execution, higher accuracy — available beyond office hours.",
    path: "/ois",
    ogType: "article",
    image: oisImg,
    keywords: ["OIS", "Octapus Intelligence System", "AI employees", "AI workforce", "AI agents UAE", "business AI UAE", "AI automation", "Hermes AI"],
  }),

  component: OIS,
});

function OIS() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "OIS — Octapus Intelligence System",
        description: "OIS turns your existing software and repetitive workflows into AI employees. Lower cost, faster execution, higher accuracy — available beyond office hours.",
        image: oisImg,
        author: { "@type": "Organization", name: site.legalName },
        publisher: { "@type": "Organization", name: site.legalName, url: "/" },
        url: "/ois",
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "OIS", path: "/ois" }])} />

      <section className="bg-[var(--color-surface-dark)] dark border-b border-border">
        <Container className="pt-20 pb-14">
          <div className="text-eyebrow mb-6 text-primary-glow">OIS — Octapus Intelligence System</div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02] max-w-4xl text-foreground">
            Your Business Already Uses AI. Now Give AI a Job.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Your employees are already using AI to write faster, research quicker, analyse information and save time. OIS takes the next step.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              variant="white"
              className="rounded-full"
              onClick={() => trackEvent("strategy_call_click", { source: "ois_hero" })}
            >
              <a href="/book">Start with OIS <ArrowRight className="ml-1 size-4" /></a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() => trackEvent("ois_external_click", { source: "ois_hero" })}
            >
              <a href={site.oisExternalUrl} target="_blank" rel="noopener noreferrer">
                Experience the Concept <ExternalLink className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </Container>

        <Container className="pb-20 grid gap-6 lg:grid-cols-2 items-start">
          <div className="rounded-3xl overflow-hidden border border-border">
            <img src={oisImg} alt="OIS connects AI agents around your existing business systems" loading="lazy" className="w-full h-auto" />
          </div>
          <HorusCard source="ois_page" showExploreLink={false} />
        </Container>

      </section>

      <Section
        eyebrow="The next step"
        title="Instead of simply giving your employees AI tools, we build AI employees around your actual business."
        intro="Turn your existing software into an intelligent system. Build an AI version of a repetitive employee workflow. Or, when you need a specific role without expanding your traditional workforce, deploy a dedicated OIS Agent."
      >
        <div className="mt-12 grid gap-3 md:grid-cols-5">
          {[
            { icon: TrendingDown, label: "Lower operational cost" },
            { icon: Zap, label: "Up to 3× faster execution" },
            { icon: BadgeCheck, label: "Higher consistency and accuracy" },
            { icon: Clock, label: "Available beyond traditional working hours" },
            { icon: Building2, label: "Built specifically for your business" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-border p-5 flex flex-col gap-3">
              <item.icon className="size-5 text-primary-glow" />
              <div className="text-sm font-semibold text-foreground leading-snug">{item.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        dark
        eyebrow="Three ways to start"
        title="Don't Just Use AI. Employ It."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              k: "AI Your Employee",
              v: "Transform repetitive employee workflows into intelligent, automated processes.",
            },
            {
              k: "AI Your Software",
              v: "Connect intelligence to the software, CRM, ERP and systems your business already uses.",
            },
            {
              k: "Hire an OIS Agent",
              v: "Need a dedicated role? Deploy an AI agent designed, trained and integrated specifically for that job.",
            },
          ].map((c, i) => (
            <div key={c.k} className="rounded-2xl border border-border bg-surface-dark p-8">
              <div className="text-eyebrow mb-4 text-primary-glow">0{i + 1}</div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{c.k}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            OIS doesn't replace your business.
          </h2>
          <p className="mt-4 text-2xl md:text-3xl font-medium text-muted-foreground">
            It gives your business an intelligent workforce.
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            OIS by Octapus
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            From Artificial Intelligence to Actual Workforce.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              variant="white"
              className="rounded-full"
              onClick={() => trackEvent("strategy_call_click", { source: "ois_final" })}
            >
              <a href="/book">Start with OIS <ArrowRight className="ml-1 size-4" /></a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() => trackEvent("ois_external_click", { source: "ois_final" })}
            >
              <a href={site.oisExternalUrl} target="_blank" rel="noopener noreferrer">
                Experience the Concept <ExternalLink className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </Section>

      <RelatedLinks
        title="Systems adjacent to the OIS vision."
        items={[
          { to: "/products", label: "Products", detail: "The Octapus systems that OIS coordinates." },
          { to: "/technology", label: "Technology", detail: "Engineering, business systems and AI & data — the foundation OIS sits on." },
          { to: "/marketing", label: "Marketing", detail: "Brand and growth work, connected to the same systems." },
        ]}
      />
    </>
  );
}
