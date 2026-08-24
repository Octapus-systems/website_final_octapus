import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { disciplineTracks } from "@/lib/site";

/**
 * Two pathways, six disciplines. Rendered on the homepage and the services page.
 */
export function DisciplinesSection({ className }: { className?: string }) {
  return (
    <Section
      className={className}
      eyebrow="Octapus Disciplines"
      title="Two pathways. Six disciplines. One intelligence layer."
      intro="Technology builds the systems. Marketing builds the presence. OIS connects intelligence across both."
    >
      <div className="grid gap-px bg-hairline border hairline rounded-3xl overflow-hidden md:grid-cols-2">
        {disciplineTracks.map((track) => (
          <Link
            key={track.slug}
            to={track.path}
            className="group bg-background p-8 md:p-10 hover:bg-[var(--color-primary-soft)]/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-eyebrow">{track.label}</div>
              <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
              {track.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{track.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {track.disciplines.map((d) => (
                <li
                  key={d.slug}
                  className="rounded-full border hairline px-3 py-1 text-xs text-muted-foreground"
                >
                  {d.name}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Above both pathways,{" "}
        <Link to="/ois" className="text-primary underline underline-offset-4">
          OIS
        </Link>{" "}
        adds the intelligence layer — and Horus AI is the first AI coworker inside it.
      </p>
    </Section>
  );
}
