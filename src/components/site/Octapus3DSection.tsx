import { useEffect, useRef } from "react";

/**
 * Scroll-driven 3D "everything connected" scene.
 * The scene lives in /octapus-3d.html (self-contained three.js page) inside a
 * sticky iframe; this section's scroll progress and pointer position are
 * posted into it, so the page scrolls as one with no nested scrollbar.
 */
export function Octapus3DSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const post = (data: Record<string, number | boolean>) =>
      frame.contentWindow?.postMessage({ type: "octa3d", ...data }, window.location.origin);

    const sendProgress = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      const active = rect.top < window.innerHeight && rect.bottom > 0;
      post({ p, active });
    };

    const onPointer = (e: PointerEvent) => {
      post({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
    };

    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow) return;
      if (e.data?.type === "octa3d-ready") sendProgress();
      if (e.data?.type === "octa3d-progress") section.dataset.storyProgress = String(e.data.p);
    };

    window.addEventListener("scroll", sendProgress, { passive: true });
    window.addEventListener("resize", sendProgress);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("message", onMessage);
    frame.addEventListener("load", sendProgress);
    sendProgress();

    return () => {
      window.removeEventListener("scroll", sendProgress);
      window.removeEventListener("resize", sendProgress);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("message", onMessage);
      frame.removeEventListener("load", sendProgress);
    };
  }, []);

  return (
    <section ref={sectionRef} data-scroll-story aria-label="Everything connected" className="relative h-[1800vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <iframe
          ref={frameRef}
          src="/octapus-3d.html"
          title="Octapus — everything connected"
          loading="eager"
          className="pointer-events-none block h-full w-full border-0 bg-transparent"
        />
      </div>
    </section>
  );
}
