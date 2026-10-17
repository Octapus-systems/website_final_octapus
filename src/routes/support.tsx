import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { RevealButton } from "@/components/site/RevealButton";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { buildMeta, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/support")({
  head: () =>
    buildMeta({
      title: "Support — Reach the Octapus Product and Engineering Team",
      description:
        "Direct support for Octapus customers and partners — technical response, general enquiries and account help across the UAE and beyond.",
      path: "/support",
      ogType: "website",
      keywords: [
        "Octapus support",
        "software support UAE",
        "ERP support",
        "custom software helpdesk",
      ],
    }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Octapus Support",
          url: absoluteUrl("/support"),
          about: { "@type": "Organization", name: site.legalName },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "technical support",
              email: site.emails.tech,
              telephone: site.phones.support,
              areaServed: "AE",
              availableLanguage: ["English", "Arabic"],
            },
            {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: site.emails.info,
              telephone: site.phones.general,
              areaServed: "AE",
              availableLanguage: ["English", "Arabic"],
            },
          ],
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Support", path: "/support" },
        ])}
      />

      <Section
        titleAs="h1"
        eyebrow="Support"
        title="Reach the People Who Built Your System."
        intro="For existing customers and partners."
      >
        <div className="mx-auto max-w-3xl grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border hairline p-6">
            <div className="text-eyebrow mb-2">Technical</div>
            <ContactLink href={`mailto:${site.emails.tech}`} label={site.emails.tech} />
            <ContactLink
              href={`tel:${site.phones.support.replace(/\s/g, "")}`}
              label={site.phones.support}
            />
          </div>
          <div className="rounded-2xl border hairline p-6">
            <div className="text-eyebrow mb-2">General</div>
            <ContactLink href={`mailto:${site.emails.info}`} label={site.emails.info} />
            <ContactLink
              href={`tel:${site.phones.general.replace(/\s/g, "")}`}
              label={site.phones.general}
            />
          </div>
        </div>
        <div className="mt-10 text-center">
          <RevealButton to="/contact" label="Open a support request" />
        </div>
      </Section>

      <RelatedLinks
        title="Other ways to reach Octapus."
        items={[
          {
            to: "/contact",
            label: "Contact",
            detail: "Structured enquiry routed to the right team.",
          },
          {
            to: "/book",
            label: "Book a strategy call",
            detail: "30 minutes with an Octapus operator.",
          },
          {
            to: "/products",
            label: "Products",
            detail: "Documentation and overviews of Octapus systems.",
          },
        ]}
      />
    </>
  );
}

function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={() =>
        trackEvent(href.startsWith("mailto") ? "email_click" : "call_click", { source: "support" })
      }
      className="block py-1 text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
    >
      {label}
    </a>
  );
}
