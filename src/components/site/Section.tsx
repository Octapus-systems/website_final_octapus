import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container-page", className)} {...props}>
      {children}
    </div>
  );
}

export function Section({
  className,
  eyebrow,
  title,
  intro,
  children,
  dark = false,
  id,
  titleAs = "h2",
}: {
  className?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  dark?: boolean;
  id?: string;
  titleAs?: "h1" | "h2";
}) {
  const TitleTag = titleAs;
  return (
    <section
      id={id}
      className={cn("relative section-y", dark && "bg-[var(--color-surface-dark)] dark", className)}
    >
      <Container>
        {(eyebrow || title || intro) && (
          <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
            {eyebrow && <div className="text-eyebrow mb-3">{eyebrow}</div>}
            {title && (
              <TitleTag className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
                {title}
              </TitleTag>
            )}
            {intro && (
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
