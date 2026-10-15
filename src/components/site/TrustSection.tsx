import { Section } from "@/components/site/Section";
import { clients, testimonials } from "@/lib/site";

export function TrustSection() {
  return (
    <Section
      eyebrow="Trusted By"
      title="Businesses that run on Octapus"
      intro="From the UAE to the UK — teams that trust us with the systems they run on every day."
      className="bg-background"
    >
      <ul className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {clients.map((client) => (
          <li
            key={client.name}
            className="flex flex-col items-center justify-center rounded-2xl border border-hairline bg-surface px-4 py-6 text-center"
          >
            <span className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {client.name}
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {client.sector}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.author + t.company}
            className="flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-6 md:p-8"
          >
            <blockquote className="text-base leading-relaxed text-foreground md:text-lg">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold text-foreground">{t.author}</span>
              <span className="block text-muted-foreground">{t.company}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
