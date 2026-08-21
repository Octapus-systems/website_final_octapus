import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Section";
import { Button } from "@/components/ui/button";

/**
 * Reusable OIS ecosystem band.
 * OIS is not a standalone page — it is the intelligence layer referenced
 * wherever a system, discipline or industry gains intelligence.
 */
export function OisConnection({
  eyebrow = "OIS — Intelligence layer",
  title,
  body,
  chain,
  cta = "Explore the OIS platform",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  chain?: string[];
  cta?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={
        dark
          ? "border-t hairline bg-[var(--color-surface-dark)] dark section-y"
          : "border-t hairline bg-[var(--color-surface)] section-y"
      }
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <div className="text-eyebrow mb-3">{eyebrow}</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{body}</p>
            <Button asChild className="mt-7 rounded-full">
              <Link to="/ois">
                {cta} <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          {chain?.length ? (
            <div className="md:col-span-6">
              <ol className="grid gap-px bg-hairline border hairline rounded-2xl overflow-hidden">
                {chain.map((step, i) => (
                  <li key={step} className="bg-background flex items-baseline gap-4 px-6 py-5">
                    <span className="text-eyebrow text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-medium text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
