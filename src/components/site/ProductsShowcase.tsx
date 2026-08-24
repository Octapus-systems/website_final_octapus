import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products } from "@/lib/site";

export function ProductsShowcase({
  items = products,
  showViewAll = false,
}: {
  items?: typeof products;
  showViewAll?: boolean;
}) {
  return (
    <Section
      eyebrow="Products"
      title="A product ecosystem, engineered to compound."
      intro="Each product removes one specific kind of friction — together they run the whole operation."
    >
      <div className="grid gap-3 md:grid-cols-6 lg:grid-cols-12">
        {items.map((p, i) => {
          const span =
            i === 0
              ? "md:col-span-6 lg:col-span-7"
              : i === 1
                ? "md:col-span-6 lg:col-span-5"
                : "md:col-span-3 lg:col-span-4";
          const tall = i < 2;
          return (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border hairline bg-background p-7 md:p-8 transition-colors hover:bg-[var(--color-surface)]",
                span,
                tall && "lg:row-span-2",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-eyebrow">{p.tags.slice(0, 2).join(" · ")}</div>
                <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3
                className={cn(
                  "mt-6 font-display font-bold tracking-tight",
                  tall ? "text-3xl md:text-4xl" : "text-2xl",
                )}
              >
                {p.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md">
                {p.headline}
              </p>
              {tall && p.image && (
                <div className="mt-8 aspect-[16/9] overflow-hidden rounded-xl border hairline bg-[var(--color-surface)]">
                  <img
                    src={p.image}
                    alt={`${p.name} interface preview`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              {tall && (
                <dl className="mt-7 grid gap-4 sm:grid-cols-3 border-t hairline pt-6">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Customer
                    </dt>
                    <dd className="mt-1 text-sm">{p.customer}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Problem
                    </dt>
                    <dd className="mt-1 text-sm">{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Outcome
                    </dt>
                    <dd className="mt-1 text-sm">{p.outcome}</dd>
                  </div>
                </dl>
              )}
            </Link>
          );
        })}
      </div>
      {showViewAll && (
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/products">
              Every Octapus product <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
