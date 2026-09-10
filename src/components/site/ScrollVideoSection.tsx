import { useEffect, useRef, useState } from "react";
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

  const [scrollPct, setScrollPct] = useState(0);
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

  useEffect(() => {
    let cancelled = false;
    const mobileQuery = window.matchMedia("(max-width: 1024px)");
    let activeImages: HTMLImageElement[] = [];

    const loadFrames = () => {
      activeImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });

      const useMobileFrames = mobileQuery.matches && Boolean(mobileFrameCount);
      const dir = useMobileFrames ? "/frames-mobile" : "/frames-desktop";
      const actualFrameCount = useMobileFrames ? mobileFrameCount! : frameCount;
      resolvedCountRef.current = actualFrameCount;
      currentRef.current = 0;
      targetRef.current = 0;

      activeImages = Array.from({ length: actualFrameCount }, (_, index) => {
        const image = new Image();
        image.decoding = "async";
        image.src = `${dir}/frame-${pad(index + 1)}.jpg`;
        const done = () => {
          if (!cancelled && index === 0 && image.naturalWidth) draw();
        };
        image.onload = done;
        image.onerror = done;
        return image;
      });
      imagesRef.current = activeImages;
    };

    loadFrames();
    mobileQuery.addEventListener("change", loadFrames);

    return () => {
      cancelled = true;
      mobileQuery.removeEventListener("change", loadFrames);
      activeImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, mobileFrameCount]);

  function resize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    // Use layout dimensions rather than the transformed bounding box. The
    // reveal animation scales the parent, and measuring that smaller box made
    // the canvas backing store permanently softer once the screen expanded.
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    draw();
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = Math.min(imagesRef.current.length - 1, Math.max(0, Math.round(currentRef.current)));
    const img = imagesRef.current[idx];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!img || !img.naturalWidth) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const cw = canvas.width;
    const ch = canvas.height;
    // Use cover behavior to prevent letterboxing on mobile
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      targetRef.current = p * (resolvedCountRef.current - 1);
      setScrollPct(p);
    };

    const tick = () => {
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) > 0.01) {
        currentRef.current += diff * 0.15;
        draw();
      }
      rafRef.current = visibleRef.current ? requestAnimationFrame(tick) : null;
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
          if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
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

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full bg-background", className)}
      style={{ height: `${heightMultiplier * 100}vh` }}
      aria-label="Octapus system animation"
    >
      <div className="sticky top-16 isolate h-[calc(100vh-4rem)] w-full overflow-hidden bg-background p-3 md:p-6">
        <DotPattern className="z-0 fill-neutral-400/45 animate-scrolling-dots dark:fill-white/15" />

        <motion.div
          className="relative z-10 h-full w-full overflow-hidden border-[7px] border-black bg-white will-change-transform md:border-[9px]"
          style={{
            scale: revealScale,
            borderRadius: revealRadius,
            transformOrigin: "center center",
          }}
        >
          <canvas
            ref={canvasRef}
            className="block h-full w-full bg-white"
            style={{ filter: "brightness(1.13) contrast(1.14) saturate(0.96)" }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-px left-1/2 z-20 flex h-4 w-14 -translate-x-1/2 items-center justify-center rounded-b-[10px] bg-black md:h-5 md:w-[72px] md:rounded-b-xl"
          >
            <span className="h-[5px] w-[5px] rounded-full bg-[#101218] ring-1 ring-white/20 shadow-[inset_0_0_2px_rgba(80,160,255,0.7)]" />
          </div>

          {/* Scroll Indicator Guide */}
          <div
            className={cn(
              "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-opacity duration-300 pointer-events-none",
              scrollPct > 0.02 ? "opacity-0" : "opacity-100",
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
