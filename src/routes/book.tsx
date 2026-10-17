import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { trackEvent } from "@/lib/analytics";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { site } from "@/lib/site";
import { buildMeta, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/book")({
  head: () =>
    buildMeta({
      title: "Book a Strategy Call — Talk to the Octapus Team",
      description:
        "Book a free, focused 30-minute strategy call with Octapus. We listen, ask precise questions and share what we would recommend for your systems.",
      path: "/book",
      ogType: "website",
      keywords: [
        "book strategy call",
        "software consultation UAE",
        "ERP consultation",
        "AI strategy call",
        "Octapus contact",
      ],
    }),
  component: BookPage,
});

function CalEmbed({ link }: { link: string }) {
  const src = `https://cal.com/${link}?embed=true&theme=light&layout=month_view&brandColor=%23601CE6`;
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border hairline bg-background shadow-sm">
      <iframe
        src={src}
        title="Book a strategy call with Octapus"
        loading="lazy"
        className="block h-[760px] w-full border-0 sm:h-[700px]"
      />
    </div>
  );
}

function BookPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Strategy Consultation",
          name: "Octapus Strategy Call",
          description: "30-minute strategy call with Octapus on software, AI and business systems.",
          provider: { "@type": "Organization", name: site.legalName, url: absoluteUrl("/") },
          areaServed: ["AE", "GCC", "Global"],
          // No offers: the call is not priced in structured data until the owner confirms terms.
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book a Strategy Call", path: "/book" },
        ])}
      />

      <Section
        titleAs="h1"
        eyebrow="Strategy call"
        title="Thirty Focused Minutes With the Octapus Team."
        intro="30 minutes. No obligation. We listen, ask precise questions and share what we'd recommend."
      >
        {site.calLink ? (
          <>
            <CalEmbed link={site.calLink} />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Prefer email?{" "}
              <a className="underline underline-offset-4" href={`mailto:${site.emails.sales}`}>
                {site.emails.sales}
              </a>{" "}
              or{" "}
              <Link to="/contact" className="underline underline-offset-4">
                use the enquiry form
              </Link>
              .
            </p>
          </>
        ) : (
          // No live calendar yet (site.calLink is empty): requests are confirmed by the team.
          <div className="mx-auto max-w-2xl rounded-2xl border hairline bg-[var(--color-surface)] p-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Request your strategy call
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              Share a few lines about your project and the times that suit you. We'll confirm a slot
              by email or WhatsApp within one business day.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="h-12 rounded-full px-6">
                <Link
                  to="/contact"
                  onClick={() => trackEvent("contact_cta_click", { source: "book" })}
                >
                  <Send className="mr-2 size-4" aria-hidden="true" />
                  Request via enquiry form
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Octapus — I'd like to book a strategy call.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "book" })}
                >
                  <MessageCircle className="mr-2 size-4" aria-hidden="true" />
                  WhatsApp us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6">
                <a
                  href={`mailto:${site.emails.sales}?subject=${encodeURIComponent("Strategy call request")}`}
                  onClick={() => trackEvent("email_click", { source: "book" })}
                >
                  <Mail className="mr-2 size-4" aria-hidden="true" />
                  Email {site.emails.sales}
                </a>
              </Button>
            </div>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              Prefer to talk now? Call{" "}
              <a
                href={`tel:${site.phones.sales.replace(/\s/g, "")}`}
                onClick={() => trackEvent("call_click", { source: "book" })}
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                {site.phones.sales}
              </a>
            </p>
          </div>
        )}
      </Section>

      <RelatedLinks
        title="Before the call, browse what Octapus builds."
        items={[
          {
            to: "/services",
            label: "Services",
            detail: "Six connected capabilities delivered by one team.",
          },
          {
            to: "/products",
            label: "Products",
            detail: "ERP, CRM, AI and custom systems already in production.",
          },
          { to: "/industries", label: "Industries", detail: "Where Octapus systems already work." },
        ]}
      />
    </>
  );
}
