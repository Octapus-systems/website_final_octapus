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
  frameCount = 200,
  mobileFrameCount = 177,
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
    let image = exactImage?.naturalWidth ? exactImage : null;
    let drawnIndex = targetIndex;

    if (!image) {
      const images = imagesRef.current;
      for (let offset = 1; offset < images.length; offset++) {
        const prev = images[targetIndex - offset];
        if (prev?.naturalWidth) {
          image = prev;
          drawnIndex = targetIndex - offset;
          break;
        }
        const next = images[targetIndex + offset];
        if (next?.naturalWidth) {
          image = next;
          drawnIndex = targetIndex + offset;
          break;
        }
      }
    }

    if (!image?.naturalWidth) return;
    if (lastDrawnFrameRef.current === drawnIndex) return;

    lastDrawnFrameRef.current = drawnIndex;
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

    const loadFrames = () => {
      activeImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });

      const useMobileFrames = mobileQuery.matches && Boolean(mobileFrameCount);
      const dir = useMobileFrames ? "/frames-mobile-webp" : "/frames-desktop-webp";
      const totalFrames = useMobileFrames ? (mobileFrameCount ?? 177) : frameCount;
      const actualFrameCount = reducedData
        ? Math.min(totalFrames, 60)
        : totalFrames;
      resolvedCountRef.current = actualFrameCount;
      currentRef.current = 0;
      targetRef.current = 0;
      lastDrawnFrameRef.current = -1;

      activeImages = new Array(actualFrameCount);
      imagesRef.current = activeImages;

      // FIX 1: On first page load, download ONLY the first visible frame
      const firstImage = new Image();
      firstImage.decoding = "async";
      firstImage.onload = () => {
        if (!cancelled) draw();
      };
      activeImages[0] = firstImage;
      firstImage.src = `${dir}/frame-001.webp`;

      let lazyLoadStarted = false;
      let nextFrame = 1;
      const concurrency = mobileQuery.matches ? 3 : 5;

      const loadNext = () => {
        if (cancelled || nextFrame >= actualFrameCount) return;
        const index = nextFrame++;
        const image = new Image();
        const sourceFrame =
          Math.round((index / Math.max(1, actualFrameCount - 1)) * (totalFrames - 1)) + 1;
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
        image.src = `${dir}/frame-${pad(sourceFrame)}.webp`;
      };

      const startLazyLoad = () => {
        if (lazyLoadStarted || cancelled) return;
        lazyLoadStarted = true;
        Array.from({ length: concurrency }, loadNext);
      };

      // Load remaining frames lazily when browser is idle or when user scrolls
      let idleId: number | null = null;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      if ("requestIdleCallback" in window) {
        idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(startLazyLoad, { timeout: 3000 });
      } else {
        timeoutId = setTimeout(startLazyLoad, 1500);
      }

      const onScrollTrigger = () => {
        startLazyLoad();
        window.removeEventListener("scroll", onScrollTrigger);
        window.removeEventListener("touchstart", onScrollTrigger);
      };
      window.addEventListener("scroll", onScrollTrigger, { passive: true, once: true });
      window.addEventListener("touchstart", onScrollTrigger, { passive: true, once: true });

      return () => {
        if (idleId !== null && "cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        window.removeEventListener("scroll", onScrollTrigger);
        window.removeEventListener("touchstart", onScrollTrigger);
      };
    };

    let cleanupLazy = loadFrames();

    const onMediaChange = () => {
      cleanupLazy?.();
      cleanupLazy = loadFrames();
    };
    mobileQuery.addEventListener("change", onMediaChange);

    return () => {
      cancelled = true;
      cleanupLazy?.();
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
    const newWidth = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const newHeight = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      lastDrawnFrameRef.current = -1;
    }
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
          className="relative z-10 h-full w-full overflow-hidden border-[7px] border-foreground bg-[#d5d8de] will-change-transform md:border-[9px] shadow-[0_25px_60px_-10px_color-mix(in_oklab,var(--color-foreground)_35%,transparent),0_12px_30px_-5px_color-mix(in_oklab,var(--color-foreground)_20%,transparent)]"
          style={{
            scale: revealScale,
            borderRadius: revealRadius,
            transformOrigin: "center center",
          }}
        >
          <canvas
            ref={canvasRef}
            className="block h-full w-full bg-[#d5d8de]"
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
