import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/JsonLd";
import { Container, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { OisConnection } from "@/components/site/OisConnection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { StudiosLeadForm } from "@/components/site/StudiosLeadForm";
import { trackEvent } from "@/lib/analytics";
import { studios, site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";


export const Route = createFileRoute("/studios")({
  head: () =>
    buildMeta({
      title: "Octapus Studios — Brand, Content and Reputation in the UAE",
      description:
        "The creative division of Octapus: brand identity, digital design, content production, social, campaigns and reputation work for businesses in the UAE.",
      path: "/studios",
      ogType: "website",
      keywords: studios.keywords,
    }),
  component: StudiosPage,
});

const way = [
  { k: "Positioning first", v: "Octapus define what you should be known for before producing a single asset." },
  { k: "Systems, not one-offs", v: "Every identity ships with rules, templates and a calendar the team can run." },
  { k: "Measured creative", v: "Work is judged on reach, response and reputation — not applause." },
];

function StudiosPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: studios.label,
          serviceType: "Branding, creative production and reputation",
          areaServed: "AE",
          provider: { "@type": "Organization", name: site.legalName },
          description: studios.intro,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Studios services",
            itemListElement: studios.provides.map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: p.name, description: p.summary },
            })),
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Studios", path: "/studios" },
        ])}
      />

      <Container className="pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="text-eyebrow mb-5">{studios.label}</div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.03] max-w-4xl">
          {studios.position}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{studios.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <a
              href="#start-a-studios-project"
              onClick={() => trackEvent("product_engagement", { source: "studios_hero_cta" })}
            >
              Start a Studios Project <ArrowRight className="ml-1 size-4" />
            </a>
          </Button>

          <Button asChild size="lg" variant="outline" className="rounded-full px-7">
            <Link to="/marketing">See the growth track</Link>
          </Button>
        </div>
      </Container>

      <Section eyebrow="What Octapus Studios provides" title="Six creative capabilities." className="!pt-4">
        <div className="grid gap-px bg-hairline border hairline rounded-3xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {studios.provides.map((p, i) => (
            <article key={p.name} className="bg-background p-8">
              <div className="text-eyebrow mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h2 className="text-2xl font-semibold tracking-tight">{p.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="How Octapus work" title="Reputation is built, not bought." className="!pt-0">
        <div className="grid gap-px bg-hairline border hairline rounded-2xl overflow-hidden md:grid-cols-3">
          {way.map((a) => (
            <div key={a.k} className="bg-background p-7">
              <div className="text-eyebrow mb-2">{a.k}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.v}</p>
            </div>
          ))}
        </div>
      </Section>

      <OisConnection
        title="Creative that stays connected to the operation."
        body="Campaigns, content and enquiries feed back into the systems Octapus build, so OIS can show what demand actually turned into — and where reputation is compounding."
        chain={["Brand and content", "Campaigns", "CRM and systems", "OIS intelligence layer", "Growth you can explain"]}
      />

      <Section
        id="start-a-studios-project"

        eyebrow="Start here"
        title="Start a Studios Project."
        intro="Tell us what you want to be known for. Octapus'll come back with a positioning read and a suggested first move."
        className="!pt-0"
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StudiosLeadForm />
          </div>
          <aside className="lg:col-span-5 space-y-4 text-sm text-muted-foreground">
            <div className="rounded-2xl border hairline bg-[var(--color-surface)] p-6">
              <div className="text-eyebrow mb-2">What happens next</div>
              <ol className="space-y-2 list-decimal pl-4">
                <li>Octapus read your brief and check the market position.</li>
                <li>A 30-minute call to test the direction.</li>
                <li>A scoped creative plan with timeline and cost.</li>
              </ol>
            </div>
            <div className="rounded-2xl border hairline p-6">
              Prefer to talk first?{" "}
              <Link
                to="/book"
                onClick={() => trackEvent("strategy_call_click", { source: "studios_cta" })}
                className="font-medium text-foreground hover:text-primary"
              >
                Book a strategy call
              </Link>
              .
            </div>
          </aside>
        </div>
      </Section>


      <RelatedLinks
        title="Continue through the ecosystem."
        items={[
          { to: "/engineering", label: "Octapus Engineering", detail: "The warehouse where your systems get built and tuned." },
          { to: "/marketing", label: "Marketing", detail: "The growth disciplines behind the creative work." },
          { to: "/contact", label: "Talk to us", detail: "Tell us what you want to be known for." },
        ]}
      />
    </>
  );
}
