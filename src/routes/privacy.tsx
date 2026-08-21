import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => buildMeta({
    title: "Privacy Policy — How Octapus Handles Your Data",
    description: "How Octapus L.L.C. collects, uses and protects information gathered through this website and related services.",
    path: "/privacy",
    ogType: "article",
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy Policy",
        url: "/privacy",
        about: { "@type": "Organization", name: site.legalName },
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])} />
      <Section eyebrow="Legal" title="Privacy Policy">
        <div className="mx-auto max-w-3xl prose prose-neutral text-muted-foreground space-y-4">
          <p>This policy describes how Octapus L.L.C. collects, uses and protects information collected through this website and related services.</p>
          <p>[OCTAPUS TO PROVIDE VERIFIED PROOF: final legal-reviewed privacy policy covering data collection, cookies, third-party processors, retention and rights.]</p>
        </div>
      </Section>
    </>
  );
}
