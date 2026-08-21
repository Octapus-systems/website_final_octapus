import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/site/JsonLd";
import { TrackPage } from "@/components/site/TrackPage";
import { disciplineTracks, site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

const track = disciplineTracks[0];

export const Route = createFileRoute("/technology")({
  head: () =>
    buildMeta({
      title: "Octapus Technology — Software, ERP and AI Systems in the UAE",
      description:
        "Engineering, business systems, AI & data and operate — the Octapus technology pathway for custom software, enterprise platforms, business automation and AI solutions in the UAE.",
      path: "/technology",
      ogType: "website",
      keywords: track.keywords,
    }),
  component: TechnologyPage,
});

function TechnologyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Octapus Technology",
          serviceType: "Software development, enterprise systems and AI",
          areaServed: "AE",
          provider: { "@type": "Organization", name: site.legalName },
          description: track.intro,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Technology disciplines",
            itemListElement: track.disciplines.map((d) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: d.name, description: d.summary },
            })),
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ])}
      />

      <TrackPage
        track={track}
        oisTitle="Engineering creates the foundation. OIS adds the intelligence."
        oisBody="Custom software and architecture give the business a reliable operating layer. OIS sits on top of the systems we connect, so authorized AI agents can read, reason and act inside them — without replacing anything."
        oisChain={[
          "Custom software",
          "Architecture and integration",
          "OIS intelligence layer",
          "AI agents (Hermes AI first)",
          "Smarter business systems",
        ]}
        approach={[
          { k: "Discovery first", v: "We map the operation, systems and constraints before scope or code." },
          { k: "Short cycles", v: "Working software every two weeks with a definition of done agreed up front." },
          { k: "Operated after launch", v: "The engineers who built the system monitor, support and scale it." },
        ]}
        related={[
          { to: "/marketing", label: "Octapus Marketing", detail: "The presence and growth side of the same ecosystem." },
          { to: "/ois", label: "OIS", detail: "The intelligence layer connecting every system we build." },
          { to: "/products", label: "Products", detail: "ERP, CRM, automation and AI systems already shipped." },
        ]}
      />
    </>
  );
}
