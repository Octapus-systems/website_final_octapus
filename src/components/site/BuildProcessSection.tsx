import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Code2,
  Lightbulb,
  PanelsTopLeft,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { Section } from "@/components/site/Section";

export const processSteps = [
  {
    step: "01",
    title: "Tell us your idea",
    icon: Lightbulb,
    description: "We decide together what to build.",
  },
  {
    step: "02",
    title: "See a first version",
    icon: PanelsTopLeft,
    description: "AI quickly creates a working start.",
  },
  {
    step: "03",
    title: "Make it work for you",
    icon: SlidersHorizontal,
    description: "Our developers refine it with you.",
  },
  {
    step: "04",
    title: "Check every detail",
    icon: ShieldCheck,
    description: "We test quality, safety, and speed.",
  },
  {
    step: "05",
    title: "Launch with support",
    icon: ArrowUpRight,
    description: "We go live and keep improving it.",
  },
];

export function BuildProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 45%"],
  });

  return (
    <Section className="bg-background border-y border-hairline">
      <div ref={sectionRef} className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl">
          <p className="text-eyebrow mb-3">Our build process</p>
          <h2 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
            From idea to launch.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A simple path from your first conversation to a product your team can use.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <ol aria-label="Build process stages">
            {processSteps.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.li
                  key={stage.step}
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reducedMotion ? 0 : 0.38, delay: index * 0.04 }}
                  className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-3 py-3.5 sm:grid-cols-[34px_minmax(160px,0.8fr)_minmax(0,1fr)] sm:items-center"
                >
                  <span className="row-span-2 flex h-8 w-8 items-center justify-center text-primary sm:row-span-1">
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    <span className="mr-2 font-mono text-[10px] font-normal text-muted-foreground">
                      {stage.step}
                    </span>
                    {stage.title}
                  </h3>
                  <p className="col-start-2 mt-0.5 text-sm text-muted-foreground sm:col-start-auto sm:mt-0">
                    {stage.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          <ProcessIllustration progress={scrollYProgress} reducedMotion={Boolean(reducedMotion)} />
        </div>
      </div>
    </Section>
  );
}

function ProcessIllustration({
  progress,
  reducedMotion,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
}) {
  const productY = useTransform(progress, [0, 1], [16, 0]);
  const productRotate = useTransform(progress, [0, 1], [-1.5, 0]);
  const pathScale = useTransform(progress, [0.08, 0.82], [0, 1]);
  const launchY = useTransform(progress, [0.65, 1], [10, 0]);

  return (
    <motion.figure
      role="img"
      aria-label="An idea moves through design, development, quality checks, and becomes a launched product."
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeOut" }}
      className="relative mx-auto h-[270px] w-full max-w-[560px] overflow-hidden rounded-lg border border-hairline bg-background md:h-[300px]"
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-[16%] top-[24%] h-1.5 w-1.5 rounded-full bg-primary/45"
        style={{ scale: reducedMotion ? 1 : pathScale }}
      />

      <motion.div
        className="absolute left-[8%] top-[16%] flex items-center gap-2 text-primary"
        animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-background">
          <Lightbulb className="h-4 w-4" strokeWidth={1.5} />
        </span>
        <span className="text-[10px] font-mono uppercase text-muted-foreground">Your idea</span>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-[42%]"
        style={{ y: reducedMotion ? 0 : productY, rotate: reducedMotion ? 0 : productRotate }}
      >
        <div className="overflow-hidden rounded-md border border-primary/20 bg-background shadow-[0_18px_50px_rgba(94,46,210,0.10)]">
          <div className="flex h-8 items-center gap-1.5 border-b border-hairline px-3">
            <i className="h-1.5 w-1.5 rounded-full bg-primary/25" />
            <i className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            <i className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            <span className="ml-auto text-[9px] font-mono text-muted-foreground">PRODUCT</span>
          </div>
          <div className="grid grid-cols-[0.36fr_1fr] gap-3 p-3">
            <div className="space-y-2 border-r border-hairline pr-3">
              <span className="block h-2 w-10 bg-primary/20" />
              <span className="block h-1.5 w-full bg-muted" />
              <span className="block h-1.5 w-4/5 bg-muted" />
              <span className="block h-1.5 w-3/5 bg-muted" />
            </div>
            <div>
              <span className="mb-3 block h-3 w-2/5 bg-foreground/80" />
              <div className="grid grid-cols-3 gap-2">
                <span className="h-14 bg-primary/10" />
                <span className="h-14 bg-muted" />
                <span className="h-14 bg-muted" />
              </div>
              <span className="mt-3 block h-1.5 w-4/5 bg-muted" />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Code2 className="h-3 w-3" /> Built
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> Tested
          </span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] right-[7%] flex items-center gap-2"
        style={{ y: reducedMotion ? 0 : launchY }}
      >
        <span className="text-[10px] font-mono uppercase text-muted-foreground">Ready to use</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </motion.div>
    </motion.figure>
  );
}
