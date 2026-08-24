import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/JsonLd";
import { Container, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { OisConnection } from "@/components/site/OisConnection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { DeliveryTimeline } from "@/components/site/DeliveryTimeline";
import { engineering, site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/engineering")({
  head: () =>
    buildMeta({
      title: "Octapus Engineering — Build, Integrate and Tune Business Systems",
      description:
        "The warehouse for tuning your business: custom software, integrations, cloud infrastructure, data and ongoing engineering support for companies in the UAE.",
      path: "/engineering",
      ogType: "website",
      keywords: engineering.keywords,
    }),
  component: EngineeringPage,
});

function EngineeringPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: engineering.label,
          serviceType: "Software engineering and system integration",
          areaServed: "AE",
          provider: { "@type": "Organization", name: site.legalName },
          description: engineering.intro,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Engineering bays",
            itemListElement: engineering.bays.map((b) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: b.name, description: b.summary },
            })),
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Engineering", path: "/engineering" },
        ])}
      />

      <Container className="pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="text-eyebrow mb-5">{engineering.label}</div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.03] max-w-4xl">
          {engineering.position}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {engineering.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/book">
              Book a Technical Review <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-7">
            <Link to="/products">See the systems</Link>
          </Button>
        </div>
      </Container>

      <Section eyebrow="The bays" title="Six bays. One workshop." className="!pt-4">
        <div className="grid gap-px bg-hairline border hairline rounded-3xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {engineering.bays.map((b, i) => (
            <article key={b.name} className="bg-background p-8">
              <div className="text-eyebrow mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h2 className="text-2xl font-semibold tracking-tight">{b.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.summary}</p>
              <ul className="mt-5 grid gap-1.5">
                {b.items.map((c) => (
                  <li key={c} className="text-sm text-foreground/80">
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <DeliveryTimeline
        eyebrow="In the workshop"
        title="How a system gets tuned."
        intro="Every engagement follows the same predictable path, with a checkpoint at each stage."
      />

      <OisConnection
        title="Engineering builds the machine. OIS keeps it aware."
        body="Once the systems are built and connected, OIS sits on top of them so authorized AI agents can read, reason and act inside your operation — without replacing anything already working."
        chain={[
          "Custom software",
          "Integrations",
          "OIS intelligence layer",
          "Horus AI",
          "A tuned operation",
        ]}
      />

      <RelatedLinks
        title="Continue through the ecosystem."
        items={[
          {
            to: "/studios",
            label: "Octapus Studios",
            detail: "The creative division that builds your reputation.",
          },
          {
            to: "/technology",
            label: "Technology",
            detail: "The full technology pathway and disciplines.",
          },
          {
            to: "/ois",
            label: "OIS",
            detail: "The intelligence layer connecting every system Octapus build.",
          },
        ]}
      />
    </>
  );
}
