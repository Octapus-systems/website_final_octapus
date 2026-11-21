import { createFileRoute } from "@tanstack/react-router";
import tamaraBadge from "@/assets/tamara-badge.webp";
import { Section } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { PayLaterActions } from "@/components/site/PayLaterActions";
import { payLaterCopy, PAY_LATER_PATH } from "@/lib/pay-later";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/pay-later")({
  head: () =>
    buildMeta({
      title: "Pay Later with Tamara — Flexible Payment Options at Octapus",
      description:
        "Explore flexible payment options with Octapus. With Tamara Pay Later, you can pay for your custom software project in instalments, subject to Tamara's approval and terms.",
      path: PAY_LATER_PATH,
      ogType: "website",
      keywords: [
        "Pay Later",
        "Buy Now Pay Later",
        "Tamara Pay Later",
        "flexible payment options",
        "affordable payment options",
        "pay in instalments",
        "Octapus payment options",
      ],
    }),
  component: PayLaterPage,
});

function PayLaterPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pay Later", path: PAY_LATER_PATH },
        ])}
      />

      <Section
        titleAs="h1"
        eyebrow="Octapus payment options"
        title="Buy Now, Pay Later with Tamara."
        intro="Flexible payment options for your Octapus software project — pay in instalments with Tamara Pay Later."
      >
        <article className="mx-auto max-w-2xl rounded-2xl border hairline bg-[var(--color-surface)] p-6 sm:p-8">
          <img
            src={tamaraBadge}
            alt="Tamara"
            width={123}
            height={40}
            decoding="async"
            className="h-10 w-auto rounded-lg"
          />

          <h2 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
            Pay for your project in instalments
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {payLaterCopy.intro}
          </p>

          <h2 className="mt-8 text-xl font-semibold tracking-tight md:text-2xl">
            Eligibility and terms
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {payLaterCopy.terms}
          </p>

          <h2 className="mt-8 text-xl font-semibold tracking-tight md:text-2xl">
            Enquire about Tamara Pay Later
          </h2>
          <PayLaterActions source="pay_later_page" className="mt-4" />
        </article>
      </Section>

      <RelatedLinks
        title="See what you can build with Octapus."
        items={[
          {
            to: "/services",
            label: "Services",
            detail: "Custom applications, business platforms and automation.",
          },
          {
            to: "/products",
            label: "Products",
            detail: "ERP, CRM, AI and custom systems already in production.",
          },
          {
            to: "/book",
            label: "Book a Strategy Call",
            detail: "Talk through your project and the right system for it.",
          },
        ]}
      />
    </>
  );
}
