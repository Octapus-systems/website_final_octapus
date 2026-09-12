import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
    image: "/images/process/step-1.png",
  },
  {
    step: "02",
    title: "See a first version",
    icon: PanelsTopLeft,
    description: "AI quickly creates a working start.",
    image: "/images/process/step-2.png",
  },
  {
    step: "03",
    title: "Make it work for you",
    icon: SlidersHorizontal,
    description: "Our developers refine it with you.",
    image: "/images/process/step-3.png",
  },
  {
    step: "04",
    title: "Check every detail",
    icon: ShieldCheck,
    description: "We test quality, safety, and speed.",
    image: "/images/process/step-4.png",
  },
  {
    step: "05",
    title: "Launch with support",
    icon: ArrowUpRight,
    description: "We go live and keep improving it.",
    image: "/images/process/step-5.png",
  },
];

export function BuildProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
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
              const isActive = activeStep === index;
              return (
                <motion.li
                  key={stage.step}
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reducedMotion ? 0 : 0.38, delay: index * 0.04 }}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  tabIndex={0}
                  className={`grid grid-cols-[34px_minmax(0,1fr)] gap-x-3 py-3.5 sm:grid-cols-[34px_minmax(160px,0.8fr)_minmax(0,1fr)] sm:items-center cursor-pointer transition-colors duration-200 outline-none rounded-md ${
                    isActive ? "bg-muted/40 px-2 -mx-2" : ""
                  }`}
                >
                  <span className={`row-span-2 flex h-8 w-8 items-center justify-center sm:row-span-1 transition-colors ${
                    isActive ? "text-primary font-medium" : "text-primary/70"
                  }`}>
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <h3 className={`text-sm font-semibold transition-colors ${
                    isActive ? "text-foreground" : "text-foreground/80"
                  }`}>
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

          <ProcessIllustration
            activeStep={activeStep}
            progress={scrollYProgress}
            reducedMotion={Boolean(reducedMotion)}
          />
        </div>
      </div>
    </Section>
  );
}

function ProjectedTypingText({
  text,
  stepKey,
  reducedMotion,
}: {
  text: string;
  stepKey: string;
  reducedMotion: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    if (reducedMotion) {
      setDisplayedText(text);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => {
      clearInterval(interval);
    };
  }, [text, stepKey, reducedMotion]);

  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, y: 3, filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -3, filter: "blur(2px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute top-4 left-5 sm:top-5 sm:left-6 z-20 pointer-events-none flex items-center gap-1.5"
    >
      <span className="font-sans text-base sm:text-lg md:text-xl font-normal leading-normal tracking-tight text-foreground [text-shadow:0_0_14px_rgba(147,51,234,0.35),0_0_2px_rgba(255,255,255,0.8)]">
        {displayedText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0.1, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block h-4 sm:h-5 w-1.5 rounded-xs bg-primary shadow-[0_0_8px_rgba(168,85,247,0.75)]"
      />
    </motion.div>
  );
}

function ProcessIllustration({
  activeStep,
  progress,
  reducedMotion,
}: {
  activeStep: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
}) {
  const currentStep = processSteps[activeStep] || processSteps[0];
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const currentImage = currentStep.image;
  const hasFailed = Boolean(failedImages[currentImage]);

  return (
    <motion.figure
      role="img"
      aria-label="An idea moves through design, development, quality checks, and becomes a launched product."
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeOut" }}
      className="hidden lg:flex relative mx-auto h-[270px] w-full max-w-[560px] overflow-hidden rounded-lg border border-hairline bg-background md:h-[300px] items-center justify-center"
    >
      <ProjectedTypingText
        text={currentStep.title}
        stepKey={currentStep.step}
        reducedMotion={Boolean(reducedMotion)}
      />

      <AnimatePresence mode="wait" initial={false}>
        {currentImage && !hasFailed ? (
          <motion.div
            key={currentStep.step}
            initial={reducedMotion ? false : { opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -40 }}
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={currentImage}
              alt={currentStep.title}
              className="h-full w-full object-cover object-center"
              onError={() => setFailedImages((prev) => ({ ...prev, [currentImage]: true }))}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`fallback-${activeStep}`}
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -30 }}
            transition={{
              duration: reducedMotion ? 0 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <FallbackIllustration progress={progress} reducedMotion={reducedMotion} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.figure>
  );
}

function FallbackIllustration({
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
    <div className="relative w-full h-full">
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
    </div>
  );
}

