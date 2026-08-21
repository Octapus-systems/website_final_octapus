import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  frameCount?: number;
  heightMultiplier?: number;
  className?: string;
};

const pad = (n: number) => String(n).padStart(3, "0");

export function ScrollVideoSection({
  frameCount = 300,
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

  const [progressLoad, setProgressLoad] = useState(0);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    let cancelled = false;
    // Always use the high-res frames for clarity; the low-res mobile set is
    // only used on very small screens with a low pixel ratio.
    const lowRes =
      window.matchMedia("(max-width: 420px)").matches &&
      (window.devicePixelRatio || 1) < 2;
    const dir = lowRes ? "/frames-mobile" : "/frames-desktop";
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    const slowTimer = window.setTimeout(() => {
      if (!cancelled && loaded < frameCount) setSlow(true);
    }, 6000);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `${dir}/frame-${pad(i)}.jpg`;
      const done = () => {
        loaded += 1;
        if (cancelled) return;
        setProgressLoad(Math.round((loaded / frameCount) * 100));
        if (loaded === 1) draw();
        if (loaded >= frameCount) {
          setReady(true);
          setSlow(false);
        }
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
    const idx = Math.min(
      imagesRef.current.length - 1,
      Math.max(0, Math.round(currentRef.current)),
    );
    const img = imagesRef.current[idx];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!img || !img.naturalWidth) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const cw = canvas.width;
    const ch = canvas.height;
    // Cover would crop the sides on portrait screens and cut off the text
    // baked into the frames, so contain whenever the canvas is narrower
    // than the frame's aspect ratio.
    const canvasAspect = cw / ch;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const scale =
      canvasAspect < imgAspect
        ? Math.min(cw / img.naturalWidth, ch / img.naturalHeight)
        : Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
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
      targetRef.current = p * (frameCount - 1);
      setScrollPct(p);
    };

    const tick = () => {
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) > 0.01) {
        currentRef.current += diff * 0.12;
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
      className={cn("relative w-full bg-[#0b0b0f]", className)}
      style={{ height: `${heightMultiplier * 100}vh` }}
      aria-label="Octapus system animation"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0b0b0f]">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {!ready && (
          <div className="absolute inset-0 grid place-items-center bg-[#0b0b0f]">
            <div className="w-56 max-w-[70vw] text-center">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[oklch(0.62_0.2_285)] transition-[width] duration-200"
                  style={{ width: `${progressLoad}%` }}
                />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/50">
                {progressLoad}%
              </div>
              {slow && (
                <div className="mt-2 text-[11px] text-white/40">
                  Slow connection — still loading
                </div>
              )}
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-[oklch(0.62_0.2_285)]"
            style={{ width: `${scrollPct * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
