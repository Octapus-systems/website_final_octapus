import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { Container } from "@/components/site/Section";

type LinkTo = ComponentProps<typeof Link>["to"];

export type RelatedLink = {
  to: LinkTo;
  label: string;
  detail: string;
  params?: Record<string, string>;
};

export function RelatedLinks({ eyebrow = "Continue", title, items }: { eyebrow?: string; title: string; items: RelatedLink[] }) {
  return (
    <section className="border-t hairline bg-[var(--color-surface)] section-y">
      <Container>
        <div className="max-w-2xl mb-8 md:mb-10">
          <div className="text-eyebrow mb-3">{eyebrow}</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
        </div>
        <ul className="grid gap-px bg-hairline border hairline rounded-3xl overflow-hidden md:grid-cols-3">
          {items.map((r) => (
            <li key={`${String(r.to)}-${r.label}`} className="bg-background">
              <Link
                to={r.to as never}
                params={r.params as never}
                className="group flex h-full flex-col gap-3 p-6 hover:bg-[var(--color-primary-soft)]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-lg font-semibold tracking-tight">{r.label}</div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.detail}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
