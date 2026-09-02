import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    let cancelled = false;
    // Use portrait mobile frames on portrait/mobile screens,
    // full landscape desktop frames on wider screens.
    const isPortrait = window.matchMedia(
      "(max-width: 768px), (orientation: portrait) and (max-width: 1024px)",
    ).matches;
    const dir = isPortrait ? "/frames-mobile" : "/frames-desktop";
    const actualFrameCount = isPortrait && mobileFrameCount ? mobileFrameCount : frameCount;
    resolvedCountRef.current = actualFrameCount;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    const slowTimer = window.setTimeout(() => {
      //
    }, 6000);

    for (let i = 1; i <= actualFrameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `${dir}/frame-${pad(i)}.jpg`;
      const done = () => {
        loaded += 1;
        if (cancelled) return;
        if (loaded === 1) draw();
      };
      img.onload = done;
      img.onerror = done;
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
      window.clearTimeout(slowTimer);
      imgs.forEach((i) => {
        i.onload = null;
        i.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  function resize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
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
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <canvas 
          ref={canvasRef} 
          className="block h-full w-full" 
          style={{ 
            filter: "contrast(1.15) brightness(1.2)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 85%)"
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/10">
          <div
            className="h-full bg-[oklch(0.62_0.2_285)]"
            style={{ width: `${scrollPct * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
