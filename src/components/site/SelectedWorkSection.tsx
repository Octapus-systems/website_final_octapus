import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { selectedWork } from "@/lib/site";
import { cn } from "@/lib/utils";
import babAlMadeenaLogo from "@/assets/clients/bab-al-madeena.webp";
import encoreExecutiveLogo from "@/assets/clients/encore-executive.webp";
import castleCraftLogo from "@/assets/clients/castle-craft.webp";
import meharCollectiveLogo from "@/assets/clients/mehar-collective.webp";

type WorkId = (typeof selectedWork)[number]["id"];

// Castle Craft's mark is single-colour white, so it is inverted to ink on the light theme.
const logos: Record<WorkId, { src: string; className?: string }> = {
  "bab-al-madeena": { src: babAlMadeenaLogo },
  "encore-executive": { src: encoreExecutiveLogo },
  "castle-craft": { src: castleCraftLogo, className: "invert dark:invert-0" },
  "mehar-collective": { src: meharCollectiveLogo },
};

const AUTOPLAY_MS = 6000;
const DRAG_THRESHOLD = 60;
const total = selectedWork.length;

export function SelectedWorkSection() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [userStopped, setUserStopped] = useState(false);
  const reduceMotion = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; from: number } | null>(null);
  const inView = useInView(regionRef, { amount: 0.4 });

  const playing = !reduceMotion && !userStopped && !hovered && !focused && !dragging && inView;

  const scrollToSlide = useCallback(
    (i: number) => {
      const el = viewportRef.current;
      if (!el) return;
      el.scrollTo({ left: i * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion],
  );

  const goTo = useCallback(
    (i: number) => {
      const next = Math.min(Math.max(i, 0), total - 1);
      setIndex(next);
      scrollToSlide(next);
    },
    [scrollToSlide],
  );

  // Autoplay — advances one slide, wrapping back to the first.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => goTo((index + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, goTo]);

  // Keep the active slide aligned when the viewport width changes.
  const indexRef = useRef(index);
  indexRef.current = index;
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let width = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === width) return;
      width = el.clientWidth;
      el.scrollTo({ left: indexRef.current * width, behavior: "auto" });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onScroll = () => {
    const el = viewportRef.current;
    if (!el || drag.current) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index && i >= 0 && i < total) setIndex(i);
  };

  const userGoTo = (i: number) => {
    setUserStopped(true);
    goTo(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      userGoTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      userGoTo(index + 1);
    }
  };

  // Touch swipes use native scroll-snap; mouse drags are handled here.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !viewportRef.current) return;
    drag.current = { x: e.clientX, scroll: viewportRef.current.scrollLeft, from: index };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setUserStopped(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !viewportRef.current) return;
    viewportRef.current.scrollLeft = drag.current.scroll - (e.clientX - drag.current.x);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    setDragging(false);
    const dx = e.clientX - d.x;
    goTo(dx <= -DRAG_THRESHOLD ? d.from + 1 : dx >= DRAG_THRESHOLD ? d.from - 1 : d.from);
  };

  return (
    <Section
      eyebrow="Selected Work"
      title="Built for businesses across the UAE and beyond."
      className="bg-background"
    >
      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected work"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
      >
        <div
          ref={viewportRef}
          tabIndex={0}
          aria-live={playing ? "off" : "polite"}
          onScroll={onScroll}
          onTouchStart={() => setUserStopped(true)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn(
            "flex overflow-x-auto overscroll-x-contain rounded-2xl outline-none [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-scrollbar]:hidden",
            dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory",
          )}
        >
          {selectedWork.map((work, i) => {
            const logo = logos[work.id];
            const active = i === index;
            return (
              <div
                key={work.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${total}`}
                aria-hidden={!active}
                className="flex w-full shrink-0 snap-center flex-col items-center px-2 py-8 text-center md:py-12"
              >
                <div className="flex h-8 w-32 items-center justify-center md:h-10 md:w-36">
                  <img
                    src={logo.src}
                    alt={`${work.client} logo`}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className={cn("h-full w-full object-contain", logo.className)}
                  />
                </div>
                <p className="mt-6 max-w-[40rem] text-balance font-display text-xl font-medium leading-snug tracking-tight text-foreground md:mt-8 md:text-[1.75rem] md:leading-[1.3]">
                  {work.description}
                </p>
                <p className="mt-6 text-sm font-medium text-muted-foreground md:mt-8 md:text-base">
                  {work.client}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/80 md:text-sm">{work.meta}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center gap-1">
          {selectedWork.map((work, i) => (
            <button
              key={work.id}
              type="button"
              aria-label={`Go to slide ${i + 1}: ${work.client}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => userGoTo(i)}
              className="group flex size-6 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring"
            >
              <span
                className={cn(
                  "block size-2 rounded-full transition-[background-color,opacity] duration-300 ease-out",
                  i === index ? "bg-primary" : "bg-foreground opacity-35 group-hover:opacity-60",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
