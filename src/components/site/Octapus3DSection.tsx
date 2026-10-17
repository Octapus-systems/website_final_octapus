import { useEffect, useRef, useState } from "react";

const STORY_DONE_EVENT = "octa:story-done";
const STORY_DONE_AT = 0.995;
/** If the scene hasn't reported in by then (CDN blocked, slow device), stop waiting on it. */
const READY_TIMEOUT_MS = 12000;

function markStoryDone() {
  const w = window as Window & { __octaStoryDone?: boolean };
  if (w.__octaStoryDone) return;
  w.__octaStoryDone = true;
  window.dispatchEvent(new Event(STORY_DONE_EVENT));
}

/** True once the 3D story has fully played (stays true). */
export function useStoryDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if ((window as Window & { __octaStoryDone?: boolean }).__octaStoryDone) return setDone(true);
    const on = () => setDone(true);
    window.addEventListener(STORY_DONE_EVENT, on);
    return () => window.removeEventListener(STORY_DONE_EVENT, on);
  }, []);
  return done;
}

/**
 * Scroll-driven 3D "everything connected" scene.
 * The scene lives in /octapus-3d.html (self-contained three.js page) inside a
 * sticky iframe; this section's scroll progress and pointer position are
 * posted into it, so the page scrolls as one with no nested scrollbar.
 */
export function Octapus3DSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // The three.js scene is heavy; load it on the visitor's first interaction or when the
  // section scrolls into view, so it doesn't compete with the hero on first paint.
  const [frameSrc, setFrameSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || frameSrc) return;
    const start = () => setFrameSrc("/octapus-3d.html");
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    const io = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
    });
    io.observe(section);
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      io.disconnect();
    };
  }, [frameSrc]);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame || !frameSrc) return;

    // Scroll is only held for the story once the scene has proven it is running.
    let frameReady = false;
    const readyTimeout = window.setTimeout(() => {
      if (!frameReady) markStoryDone();
    }, READY_TIMEOUT_MS);

    const post = (data: Record<string, number | boolean>) =>
      frame.contentWindow?.postMessage({ type: "octa3d", ...data }, window.location.origin);

    const sendProgress = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      const active = rect.top < window.innerHeight && rect.bottom > 0;
      // Visitor already reached the next section before the scene loaded: don't leave it hidden.
      if (!frameReady && rect.bottom < window.innerHeight) markStoryDone();
      post({ p, active });
    };

    const onPointer = (e: PointerEvent) => {
      post({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
    };

    const onTap = () => post({ spin: true });

    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow) return;
      // Scene can't run (three.js blocked or no WebGL): release the page straight away.
      if (e.data?.type === "octa3d-failed") markStoryDone();
      if (e.data?.type === "octa3d-ready") {
        frameReady = true;
        sendProgress();
      }
      if (e.data?.type === "octa3d-progress") {
        frameReady = true;
        section.dataset.storyProgress = String(e.data.p);
        if (e.data.p >= STORY_DONE_AT) markStoryDone();
      }
    };

    const holdAtEnd = () => {
      if (!frameReady) return;
      if ((window as Window & { __octaStoryDone?: boolean }).__octaStoryDone) return;
      const end = section.offsetTop + section.offsetHeight - window.innerHeight;
      if (window.scrollY > end + 2) window.scrollTo(0, end);
    };

    // Keyboard users tabbing to content below must never be pulled back (no focus trap).
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as Node | null;
      if (!target || section.contains(target)) return;
      if (section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) {
        markStoryDone();
      }
    };
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener("scroll", holdAtEnd, { passive: true });
    window.addEventListener("scroll", sendProgress, { passive: true });
    window.addEventListener("resize", sendProgress);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("message", onMessage);
    section.addEventListener("click", onTap);
    frame.addEventListener("load", sendProgress);
    sendProgress();

    return () => {
      window.clearTimeout(readyTimeout);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("scroll", holdAtEnd);
      window.removeEventListener("scroll", sendProgress);
      window.removeEventListener("resize", sendProgress);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("message", onMessage);
      section.removeEventListener("click", onTap);
      frame.removeEventListener("load", sendProgress);
    };
  }, [frameSrc]);

  return (
    <section ref={sectionRef} data-scroll-story aria-label="Everything connected" className="relative h-[520vh] cursor-pointer bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <iframe
          ref={frameRef}
          src={frameSrc}
          title="Octapus — everything connected"
          tabIndex={-1}
          className="pointer-events-none block h-full w-full border-0 bg-transparent"
        />
      </div>
    </section>
  );
}
