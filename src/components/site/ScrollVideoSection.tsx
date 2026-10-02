import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

type Props = {
  frameCount?: number;
  mobileFrameCount?: number;
  heightMultiplier?: number;
  className?: string;
};

const pad = (n: number) => String(n).padStart(3, "0");

export function ScrollVideoSection({
  frameCount = 300,
  mobileFrameCount,
  heightMultiplier = 4,
  className,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const resolvedCountRef = useRef(frameCount);
  const lastDrawnFrameRef = useRef(-1);

  const [hasScrolled, setHasScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: revealProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const revealScale = useTransform(revealProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.82, 1]);
  const revealRadius = useTransform(
    revealProgress,
    [0, 1],
    shouldReduceMotion ? [32, 32] : [72, 32],
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const targetIndex = Math.min(
      imagesRef.current.length - 1,
      Math.max(0, Math.round(currentRef.current)),
    );
    const exactImage = imagesRef.current[targetIndex];
    const image = exactImage?.naturalWidth
      ? exactImage
      : imagesRef.current.find((candidate, index) => {
          const distance = Math.abs(index - targetIndex);
          return candidate?.naturalWidth && distance < 4;
        });
    if (!image?.naturalWidth) return;
    if (exactImage?.naturalWidth && lastDrawnFrameRef.current === targetIndex) return;

    lastDrawnFrameRef.current = exactImage?.naturalWidth ? targetIndex : -1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const mobileQuery = window.matchMedia("(max-width: 1024px)");
    const navConn = (
      navigator as unknown as {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const reducedData =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      Boolean(navConn?.saveData) ||
      ["slow-2g", "2g", "3g"].includes(navConn?.effectiveType ?? "");
    let activeImages: HTMLImageElement[] = [];

    const loadFrames = (loadAll: boolean) => {
      activeImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });

      const useMobileFrames = mobileQuery.matches && Boolean(mobileFrameCount);
      const dir = useMobileFrames ? "/frames-mobile" : "/frames-desktop";
      const fullCount = useMobileFrames ? mobileFrameCount! : frameCount;
      const actualFrameCount = reducedData
        ? Math.min(fullCount, 72)
        : mobileQuery.matches
          ? Math.min(fullCount, 180)
          : Math.min(fullCount, 260);
      resolvedCountRef.current = actualFrameCount;
      currentRef.current = 0;
      targetRef.current = 0;
      lastDrawnFrameRef.current = -1;

      activeImages = new Array(actualFrameCount);
      imagesRef.current = activeImages;

      // Always load the very first frame immediately for instant visual
      const firstImage = new Image();
      firstImage.decoding = "async";
      firstImage.onload = () => {
        if (!cancelled) draw();
      };
      activeImages[0] = firstImage;
      firstImage.src = `${dir}/frame-001.jpg`;

      if (!loadAll) return;

      let nextFrame = 1;
      const concurrency = mobileQuery.matches ? 2 : 4;
      const loadNext = () => {
        if (cancelled || nextFrame >= actualFrameCount) return;
        const index = nextFrame++;
        const image = new Image();
        const sourceFrame =
          Math.round((index / Math.max(1, actualFrameCount - 1)) * (fullCount - 1)) + 1;
        image.decoding = "async";
        image.onload = () => {
          if (!cancelled) {
            draw();
            loadNext();
          }
        };
        image.onerror = () => {
          if (!cancelled) loadNext();
        };
        activeImages[index] = image;
        image.src = `${dir}/frame-${pad(sourceFrame)}.jpg`;
      };
      Array.from({ length: concurrency }, loadNext);
    };

    // Load poster frame immediately
    loadFrames(false);

    // Watch for proximity before loading all remaining frames
    const proximityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cancelled) {
          loadFrames(true);
          proximityObserver.disconnect();
        }
      },
      { rootMargin: "450px" },
    );

    if (sectionRef.current) {
      proximityObserver.observe(sectionRef.current);
    }

    const onMediaChange = () => loadFrames(true);
    mobileQuery.addEventListener("change", onMediaChange);

    return () => {
      cancelled = true;
      proximityObserver.disconnect();
      mobileQuery.removeEventListener("change", onMediaChange);
      activeImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [draw, frameCount, mobileFrameCount]);

  function resize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarsePointer ? 2 : 3);
    // Use layout dimensions rather than the transformed bounding box. The
    // reveal animation scales the parent, and measuring that smaller box made
    // the canvas backing store permanently softer once the screen expanded.
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    lastDrawnFrameRef.current = -1;
    draw();
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scheduleFrame = () => {
      if (!visibleRef.current || document.hidden || rafRef.current !== null) return;
      const tick = () => {
        const difference = targetRef.current - currentRef.current;
        if (Math.abs(difference) <= 0.15) {
          currentRef.current = targetRef.current;
          draw();
          rafRef.current = null;
          return;
        }
        currentRef.current += difference * 0.22;
        draw();
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      targetRef.current = p * (resolvedCountRef.current - 1);
      if (p > 0.02) setHasScrolled(true);
      scheduleFrame();
    };

    const onScroll = () => {
      if (!visibleRef.current) return;
      computeTarget();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          computeTarget();
        } else if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(section);

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", scheduleFrame);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", scheduleFrame);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw, frameCount]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full bg-background", className)}
      style={{ height: `${heightMultiplier * 100}svh` }}
      aria-label="Octapus system animation"
    >
      <div className="sticky top-16 isolate h-[calc(100svh-4rem)] w-full overflow-hidden bg-background p-3 md:p-6">
        <DotPattern className="z-0 fill-neutral-400/45 animate-scrolling-dots motion-reduce:animate-none dark:fill-white/10" />

        <motion.div
          className="relative z-10 h-full w-full overflow-hidden border-[7px] border-foreground bg-card will-change-transform md:border-[9px] shadow-[0_25px_60px_-10px_color-mix(in_oklab,var(--color-foreground)_35%,transparent),0_12px_30px_-5px_color-mix(in_oklab,var(--color-foreground)_20%,transparent)]"
          style={{
            scale: revealScale,
            borderRadius: revealRadius,
            transformOrigin: "center center",
          }}
        >
          <canvas
            ref={canvasRef}
            className="block h-full w-full bg-card"
            style={{ filter: "brightness(1.13) contrast(1.14) saturate(0.96)" }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-px left-1/2 z-20 flex h-4 w-14 -translate-x-1/2 items-center justify-center rounded-b-[10px] bg-foreground md:h-5 md:w-[72px] md:rounded-b-xl"
          >
            <span className="h-[5px] w-[5px] rounded-full bg-[#101218] ring-1 ring-white/20 shadow-[inset_0_0_2px_rgba(80,160,255,0.7)]" />
          </div>

          {/* Scroll Indicator Guide */}
          <div
            className={cn(
              "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-opacity duration-300 pointer-events-none",
              hasScrolled ? "opacity-0" : "opacity-100",
            )}
          >
            <span className="text-xs uppercase tracking-[0.2em] font-mono opacity-60">
              Scroll Down
            </span>
            <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
