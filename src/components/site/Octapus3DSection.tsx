import { useEffect, useRef, useState } from "react";
import { useLoadingDone } from "@/components/site/LoadingScreen";

const STORY_DONE_EVENT = "octa:story-done";
const STORY_DONE_AT = 0.995;
/** If the scene hasn't reported in by then (CDN blocked, slow device), stop waiting on it. */
const READY_TIMEOUT_MS = 12000;
/** Length of the hero's entrance animation after the intro screen (last letter ends ~1.4s). */
const HERO_INTRO_MS = 1500;

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
  const stickyRef = useRef<HTMLDivElement>(null);
  // The three.js scene is heavy: starting it (script parse, WebGL setup, shader compile) blocks
  // the main thread for a few hundred ms, since a same-origin iframe shares it with this page.
  // So it never starts while the "Build For Today" entrance is playing — it starts once that
  // has finished and the browser is idle, or straight away when the visitor starts scrolling.
  const [frameSrc, setFrameSrc] = useState<string | undefined>(undefined);
  const loadingDone = useLoadingDone();

  useEffect(() => {
    if (frameSrc) return;
    const start = () => setFrameSrc("/octapus-3d.html");
    // Touch: starting on the first touch put the scene's whole setup in the middle of the
    // visitor's first scroll. Start it right after load instead, so it's ready (it stays hidden
    // until fully warmed up) before the section is reached.
    const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const events = isTouch ? [] : (["scroll", "wheel", "touchstart", "keydown"] as const);
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    let timer: number | undefined;
    let idle: number | undefined;
    if (loadingDone) {
      timer = window.setTimeout(
        () => {
          idle = window.requestIdleCallback
            ? window.requestIdleCallback(start, { timeout: 1500 })
            : window.setTimeout(start, 0);
        },
        isTouch ? 0 : HERO_INTRO_MS,
      );
    }

    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      if (idle !== undefined) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
    };
  }, [frameSrc, loadingDone]);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const sticky = stickyRef.current;
    if (!section || !frame || !sticky || !frameSrc) return;

    // Touch devices (phones/tablets) take a lighter path; mouse/trackpad behaviour is unchanged.
    const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Scroll is only held for the story once the scene has proven it is running.
    let frameReady = false;
    const readyTimeout = window.setTimeout(() => {
      if (!frameReady) markStoryDone();
    }, READY_TIMEOUT_MS);

    const post = (data: Record<string, number | boolean>) =>
      frame.contentWindow?.postMessage({ type: "octa3d", ...data }, window.location.origin);

    const sendProgressNow = () => {
      const rect = section.getBoundingClientRect();
      // On mobile, innerHeight changes as the address bar shows/hides (mostly when scrolling up),
      // which made progress jump. The sticky stage is 100lvh there, so its height stays fixed.
      const viewH = isTouch ? sticky.offsetHeight : window.innerHeight;
      const range = rect.height - viewH;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      const active = rect.top < window.innerHeight && rect.bottom > 0;
      // Visitor already reached the next section before the scene loaded: don't leave it hidden.
      if (!frameReady && rect.bottom < window.innerHeight) markStoryDone();
      post({ p, active });
    };

    // On touch, coalesce scroll/resize bursts into one layout read + postMessage per frame.
    let raf = 0;
    const sendProgress = isTouch
      ? () => {
          if (raf) return;
          raf = window.requestAnimationFrame(() => {
            raf = 0;
            sendProgressNow();
          });
        }
      : sendProgressNow;

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
      if (window.scrollY <= end + 2) return;
      // Touch: a programmatic scrollTo during a fling fights the native momentum and makes the page
      // visibly jump back. Let the visitor through and reveal the next section instead.
      if (isTouch) markStoryDone();
      else window.scrollTo(0, end);
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
    // Hover tilt needs a mouse; on touch it only fired raycasts in the scene mid-scroll.
    if (!isTouch) window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("message", onMessage);
    section.addEventListener("click", onTap);
    frame.addEventListener("load", sendProgress);
    sendProgress();

    return () => {
      window.cancelAnimationFrame(raf);
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
      {/* Touch: fixed-height (lvh) stage on its own compositor layer, so address-bar show/hide
          neither resizes it nor repaints it while scrolling. */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden [@media(hover:none),(pointer:coarse)]:h-lvh [@media(hover:none),(pointer:coarse)]:[transform:translateZ(0)] [@media(hover:none),(pointer:coarse)]:will-change-transform [@media(hover:none),(pointer:coarse)]:[contain:layout_paint]"
      >
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
