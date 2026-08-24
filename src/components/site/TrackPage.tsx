import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { OisConnection } from "@/components/site/OisConnection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { industries, type DisciplineTrack } from "@/lib/site";

export function TrackPage({
  track,
  oisTitle,
  oisBody,
  oisChain,
  approach,
  related,
}: {
  track: DisciplineTrack;
  oisTitle: string;
  oisBody: string;
  oisChain: string[];
  approach: Array<{ k: string; v: string }>;
  related: React.ComponentProps<typeof RelatedLinks>["items"];
}) {
  return (
    <>
      <Container className="pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="text-eyebrow mb-5">{track.label}</div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.03] max-w-4xl">
          {track.hero}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {track.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/book">
              Book a Strategy Call <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-7">
            <Link to="/products">See the systems</Link>
          </Button>
        </div>
      </Container>

      <Section eyebrow="Disciplines" title={track.title} className="!pt-4">
        <div className="grid gap-px bg-hairline border hairline rounded-3xl overflow-hidden md:grid-cols-2">
          {track.disciplines.map((d, i) => (
            <article key={d.slug} className="bg-background p-8">
              <div className="text-eyebrow mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{d.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.summary}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {d.capabilities.map((c) => (
                  <li key={c} className="text-sm text-foreground/80">
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Approach" title="How the work is delivered." className="!pt-0">
        <div className="grid gap-px bg-hairline border hairline rounded-2xl overflow-hidden md:grid-cols-3">
          {approach.map((a) => (
            <div key={a.k} className="bg-background p-7">
              <div className="text-eyebrow mb-2">{a.k}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.v}</p>
            </div>
          ))}
        </div>
      </Section>

      <OisConnection title={oisTitle} body={oisBody} chain={oisChain} />

      <Section
        eyebrow="Industries"
        title="Sectors already running on this work."
        className="!pt-14"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map((i) => (
            <Link
              key={i}
              to="/industries"
              className="rounded-full border hairline px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-[var(--color-primary-soft)]/40 transition-colors"
            >
              {i}
            </Link>
          ))}
        </div>
      </Section>

      <RelatedLinks title="Continue through the ecosystem." items={related} />
    </>
  );
}
