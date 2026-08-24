import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildMeta({
      title: "Terms of Service — Octapus Website and Engagements",
      description:
        "Terms governing use of the Octapus website, products and professional services.",
      path: "/terms",
      ogType: "article",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          url: "/terms",
          about: { "@type": "Organization", name: site.legalName },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <Section eyebrow="Legal" title="Terms of Service">
        <div className="mx-auto max-w-3xl text-muted-foreground space-y-4"></div>
      </Section>
    </>
  );
}
