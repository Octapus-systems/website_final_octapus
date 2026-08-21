import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/site/JsonLd";
import { TrackPage } from "@/components/site/TrackPage";
import { disciplineTracks, site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

const track = disciplineTracks[1];

export const Route = createFileRoute("/marketing")({
  head: () =>
    buildMeta({
      title: "Octapus Marketing — Brand, Content and Digital Growth in the UAE",
      description:
        "Design & brand and growth — the Octapus marketing pathway for brand strategy, creative direction, content creation, social media and digital campaigns in the UAE.",
      path: "/marketing",
      ogType: "website",
      keywords: track.keywords,
    }),
  component: MarketingPage,
});

function MarketingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Octapus Marketing",
          serviceType: "Brand, content and digital growth",
          areaServed: "AE",
          provider: { "@type": "Organization", name: site.legalName },
          description: track.intro,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Marketing disciplines",
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
          { name: "Marketing", path: "/marketing" },
        ])}
      />

      <TrackPage
        track={track}
        oisTitle="Campaigns connected to the systems — and to OIS."
        oisBody="Brand and growth work only compounds when demand lands inside a system that can act on it. Campaign, content and lead data flow into the platforms we build, and OIS makes that activity answerable and coordinated."
        oisChain={[
          "Brand and creative systems",
          "Content and campaigns",
          "Capture inside your platforms",
          "OIS intelligence layer",
          "Prioritized, answerable pipeline",
        ]}
        approach={[
          { k: "Strategy before assets", v: "Positioning and audience decided before a single deliverable is produced." },
          { k: "Built as a system", v: "Brand, content and campaigns run as one repeatable production line." },
          { k: "Measured honestly", v: "Reporting tied to the systems that capture and convert demand." },
        ]}
        related={[
          { to: "/technology", label: "Octapus Technology", detail: "The engineering and systems side of the same ecosystem." },
          { to: "/ois", label: "OIS", detail: "The intelligence layer behind Octapus solutions." },
          { to: "/industries", label: "Industries", detail: "Sectors where this work already runs." },
        ]}
      />
    </>
  );
}
