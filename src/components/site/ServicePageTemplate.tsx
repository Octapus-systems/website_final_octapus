import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, CircleDot, Layers3, LineChart, Monitor, Users } from "lucide-react";
import { JsonLd } from "@/components/site/JsonLd";
import { Container } from "@/components/site/Section";
import { serviceBySlug, type ServiceIcon, type ServicePageData } from "@/lib/service-pages";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";

const icons: Record<ServiceIcon, typeof Monitor> = {
  screen: Monitor,
  blocks: Layers3,
  chart: LineChart,
  flow: CircleDot,
  people: Users,
};

export function ServicePageTemplate({ service }: { service: ServicePageData }) {
  const related = service.related
    .map((slug) => serviceBySlug.get(slug))
    .filter(Boolean) as ServicePageData[];
  const servicePath = `/services/${service.slug}`;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: servicePath,
          provider: { "@type": "Organization", name: site.legalName, url: "/" },
          areaServed: "United Arab Emirates",
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: servicePath },
        ])}
      />

      <header className="service-hero relative isolate overflow-hidden border-b border-border bg-background text-foreground">
        <Container className="flex min-h-[min(680px,calc(100svh-4rem))] items-center py-20 sm:py-24 lg:py-28">
          <div className="relative z-10 max-w-4xl">
            <Link
              to="/services"
              className="text-eyebrow inline-flex rounded-full text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              Services
            </Link>
            <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {service.category}
            </p>
            <h1 className="mt-4 text-balance font-display text-[clamp(3.3rem,7.5vw,7rem)] font-black leading-[0.88] tracking-[-0.065em] text-foreground">
              {service.title}
            </h1>
            <p className="mt-7 max-w-[46ch] text-pretty text-lg leading-8 text-muted-foreground">
              {service.summary}
            </p>
            <Link
              to="/book"
              className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-[0_16px_35px_-18px_color-mix(in_oklab,var(--color-foreground)_70%,transparent)] transition hover:-translate-y-0.5 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              Discuss your project <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </header>

      <section aria-labelledby="what-heading" className="bg-background py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          <div>
            <p className="text-eyebrow text-primary">What it is</p>
            <h2
              id="what-heading"
              className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl"
            >
              A useful system starts with the work.
            </h2>
          </div>
          <div className="space-y-5 text-xl leading-9 text-muted-foreground">
            {service.whatItIs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="build-heading"
        className="border-y border-border bg-card/50 py-20 sm:py-28"
      >
        <Container>
          <p className="text-eyebrow text-primary">What we build</p>
          <h2
            id="build-heading"
            className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            The parts that make the service useful.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {service.builds.map((item) => {
              const Icon = icons[item.icon];
              return (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-border bg-card p-7 shadow-[0_18px_45px_-38px_color-mix(in_oklab,var(--color-foreground)_35%,transparent)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-background py-20 sm:py-28">
        <Container>
          <p className="text-eyebrow text-primary">How it works</p>
          <h2
            id="process-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            A clear path from need to working system.
          </h2>
          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, index) => (
              <li key={step.title} className="relative border-t border-border pt-6">
                <span className="font-mono text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="situations-heading"
        className="bg-card/80 border-y border-border py-20 text-foreground sm:py-28"
      >
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-eyebrow text-primary">Who it is for</p>
            <h2
              id="situations-heading"
              className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl"
            >
              Real situations that need a practical answer.
            </h2>
          </div>
          <ul className="space-y-4">
            {service.situations.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border border-border bg-background/50 p-5 leading-7 text-muted-foreground"
              >
                <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="related-heading" className="bg-background py-20 sm:py-28">
        <Container>
          <p className="text-eyebrow text-primary">Connected services</p>
          <h2
            id="related-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Work that often connects with this service.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to="/services/$slug"
                params={{ slug: item.slug }}
                className="group rounded-[1.5rem] border border-border bg-card p-6 outline-none transition hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary"
              >
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-primary">
                  {item.category}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                <ArrowRight
                  className="mt-7 size-5 text-foreground transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-card/50 py-20 sm:py-28">
        <Container className="text-center">
          <p className="text-eyebrow text-primary">Start with the work</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl">
            Tell us what needs to work better.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            We will listen, ask practical questions and help you define the right next step.
          </p>
          <Link
            to="/contact"
            className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            Contact Octapus <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </main>
  );
}
