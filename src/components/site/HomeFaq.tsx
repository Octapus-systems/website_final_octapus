import { JsonLd } from "@/components/site/JsonLd";

/**
 * Plain-language answers to the questions people (and AI search engines) ask
 * about Octapus. Mirrored as FAQPage structured data.
 */
export const homeFaqs = [
  {
    q: "What does Octapus do?",
    a: "Octapus L.L.C. is an AI and software development company in the UAE. We design, build and run custom software, ERP and CRM systems, AI agents and automation, mobile apps, web platforms and digital marketing for businesses in Dubai, Ajman, the wider UAE and the GCC.",
  },
  {
    q: "Where is Octapus based?",
    a: "Octapus has offices in Business Village, Dubai and Amper Gem Tower, Khalifa Street, Ajman, United Arab Emirates, and works with clients across the UAE, the GCC and internationally.",
  },
  {
    q: "Does Octapus build AI solutions for UAE businesses?",
    a: "Yes. Octapus builds AI-first systems for UAE companies — AI agents, document and workflow automation, AI-powered CRM and ERP features, and OIS (the Octapus Intelligent System), an intelligence layer that connects AI to the tools a business already uses.",
  },
  {
    q: "Can Octapus connect our existing software instead of replacing it?",
    a: "Yes. Octapus integrates existing ERPs, CRMs, payment rails, messaging and data pipelines into one connected system, so teams keep the tools they rely on while data and workflows move automatically between them.",
  },
  {
    q: "How do I start a project with Octapus?",
    a: "Book a free 30-minute strategy call at octapus.ae/book, message the team on WhatsApp, or send an enquiry through octapus.ae/contact. Octapus reviews your requirements and recommends the right system before any build begins.",
  },
] as const;

export function HomeFaq() {
  return (
    <section aria-labelledby="home-faq" className="bg-background py-20 sm:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="container-page">
        <p className="text-eyebrow text-primary">FAQ</p>
        <h2
          id="home-faq"
          className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-5xl"
        >
          Questions about Octapus.
        </h2>
        <div className="mt-10 divide-y border-y hairline">
          {homeFaqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-foreground">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-2xl font-light text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
