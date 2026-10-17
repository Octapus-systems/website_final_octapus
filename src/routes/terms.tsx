import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildMeta({
      title: "Terms of Service — Octapus Website and Engagements",
      description:
        "Terms governing use of the Octapus website, products and professional services.",
      path: "/terms",
      ogType: "article",
      // Kept out of search until the full terms are published (the page is a placeholder).
      noindex: true,
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
          url: absoluteUrl("/terms"),
          about: { "@type": "Organization", name: site.legalName },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <Section eyebrow="Legal" titleAs="h1" title="Terms of Service">
        <div className="mx-auto max-w-3xl text-muted-foreground space-y-4">
          <p>
            The full terms of service for this website and for Octapus engagements are being
            finalised and will be published here.
          </p>
          <p>
            For any question about terms, contact{" "}
            <a
              href={`mailto:${site.emails.info}`}
              className="text-primary underline underline-offset-4"
            >
              {site.emails.info}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
