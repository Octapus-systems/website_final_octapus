import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Blocks,
  Camera,
  ChartNoAxesCombined,
  Globe2,
  Lightbulb,
  Megaphone,
  Smartphone,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { servicePages } from "@/lib/service-pages";
import type { CSSProperties } from "react";

const serviceCardPalettes = [
  "#5B7CFA",
  "#F06449",
  "#69A83B",
  "#16A085",
  "#8A58DC",
  "#D88A18",
  "#D84D81",
  "#168DB7",
  "#637083",
] as const;

const serviceIcons: Record<string, LucideIcon> = {
  mobile: Smartphone,
  software: Blocks,
  erp: ChartNoAxesCombined,
  automation: Workflow,
  systems: UsersRound,
  web: Globe2,
  marketing: Megaphone,
  production: Camera,
  consulting: Lightbulb,
};

export function WhatWeBuildSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-background py-20 sm:py-24 lg:py-32"
    >
      <div className="container-page">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="text-eyebrow text-primary">What we build</p>
          <h2
            id="services-heading"
            className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
          >
            Digital systems for real business work.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            We build practical software, connected business systems and creative production around
            the way your organisation works.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {servicePages.map((service, index) => {
            const accent = serviceCardPalettes[index % serviceCardPalettes.length];
            const Icon = serviceIcons[service.scene] ?? Blocks;

            return (
              <motion.article
                key={service.title}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.055, 0.28) }}
                className="group h-full min-w-0"
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  aria-label={`Explore ${service.title}`}
                  className="block h-full rounded-[1.6rem] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                >
                  <motion.div
                    whileHover={reducedMotion ? undefined : { y: -5 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="service-card relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-[1.6rem] border p-5 text-card-foreground transition-[box-shadow,border-color] duration-200 sm:p-6"
                    style={{ "--service-accent": accent } as CSSProperties}
                  >
                    <div
                      aria-hidden="true"
                      className="service-card-glow absolute -right-20 -top-24 size-64 rounded-full blur-3xl"
                    />

                    <div className="relative flex items-start justify-between gap-5">
                      <span className="service-card-icon grid size-12 place-items-center rounded-2xl transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[0.68rem] font-semibold tabular-nums text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="relative mt-7 max-w-[20ch] text-[0.65rem] font-semibold uppercase leading-4 tracking-[0.14em] text-muted-foreground">
                      {service.category}
                    </p>

                    <h3 className="relative mt-3 max-w-[13ch] text-[clamp(1.9rem,3vw,2.65rem)] font-bold leading-[0.94] tracking-[-0.055em]">
                      {service.title}
                    </h3>

                    <p className="relative mt-4 max-w-[38ch] text-sm font-medium leading-5 text-muted-foreground">
                      {service.summary}
                    </p>

                    <div className="relative mt-auto flex flex-wrap gap-1.5 pb-4 pt-7">
                      {service.keywords.slice(0, 2).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-foreground/10 bg-background/45 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.08em]"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="relative flex items-center justify-between gap-4 rounded-[1rem] border border-foreground/10 bg-background/65 px-4 py-3.5 text-card-foreground backdrop-blur-sm">
                      <span className="text-sm font-semibold leading-tight">Explore service</span>
                      <span className="service-card-action flex size-8 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-transform duration-200 group-hover:rotate-45">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
