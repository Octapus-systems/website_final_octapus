import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Lightbulb,
  PanelsTopLeft,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { Section } from "@/components/site/Section";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";

const processSteps = [
  {
    step: "01",
    phase: "Discover",
    title: "Tell us your idea",
    icon: Lightbulb,
    description: "We define the problem, the users, and what a successful first release must do.",
  },
  {
    step: "02",
    phase: "Prototype",
    title: "See a first version",
    icon: PanelsTopLeft,
    description: "We turn the agreed direction into a working product you can see and use early.",
  },
  {
    step: "03",
    phase: "Engineer",
    title: "Make it work for you",
    icon: SlidersHorizontal,
    description: "Our engineers refine the workflows, integrations, and details around your team.",
  },
  {
    step: "04",
    phase: "Validate",
    title: "Check every detail",
    icon: ShieldCheck,
    description:
      "We test performance, quality, security, and the real-world paths your users take.",
  },
  {
    step: "05",
    phase: "Launch",
    title: "Launch with support",
    icon: ArrowUpRight,
    description: "We deploy confidently, monitor the release, and keep improving what matters.",
  },
];

const processStatuses: TimelineItem["status"][] = [
  "completed",
  "completed",
  "active",
  "pending",
  "pending",
];

const processTimeline: TimelineItem[] = processSteps.map((stage, index) => {
  const Icon = stage.icon;

  return {
    id: stage.step,
    label: `${stage.step} / ${stage.phase}`,
    title: stage.title,
    description: stage.description,
    status: processStatuses[index],
    icon: <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />,
  };
});

export function BuildProcessSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section className="overflow-hidden border-y border-hairline bg-surface dark:bg-surface-dark">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-32"
        >
          <p className="text-eyebrow mb-4">Our build process</p>
          <h2 className="max-w-md text-balance text-4xl font-semibold tracking-[-0.045em] text-foreground md:text-5xl lg:text-6xl">
            From idea to <span className="text-primary">launch.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            A clear path from the first conversation to dependable software your team can use and
            grow.
          </p>

          <div className="mt-10 flex items-center gap-4 border-t border-hairline pt-5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="text-primary">01—05</span>
            <span>One accountable delivery path</span>
          </div>
        </motion.header>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-hairline bg-background p-6 shadow-[0_24px_70px_-52px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] sm:p-8 md:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/[0.055] blur-3xl"
          />
          <div className="relative mb-10 flex items-center justify-between border-b border-hairline pb-4">
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground">
              Delivery timeline
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              Octapus method
            </span>
          </div>

          <Timeline
            items={processTimeline}
            variant="spacious"
            showTimestamps={false}
            flowOnScroll
            aria-label="Octapus build process timeline"
            className="relative"
          />
        </motion.div>
      </div>
    </Section>
  );
}
