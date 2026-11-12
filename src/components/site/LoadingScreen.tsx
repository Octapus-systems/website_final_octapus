import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** Shown at least this long so it reads as a deliberate splash, not a flicker. */
const MIN_SHOW_MS = 500;
/** Never hold the page longer than this, even if assets are still loading. */
const MAX_WAIT_MS = 2500;

const LOADED_EVENT = "octa:loaded";

declare global {
  interface Window {
    __octaLoaded?: boolean;
  }
}

export function markLoaded() {
  if (window.__octaLoaded) return;
  window.__octaLoaded = true;
  window.dispatchEvent(new Event(LOADED_EVENT));
}

/** True once the loading screen has fully faded out (immediately if it never showed). */
export function useLoadingDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.__octaLoaded) {
      setDone(true);
      return;
    }
    const onLoaded = () => setDone(true);
    window.addEventListener(LOADED_EVENT, onLoaded);
    return () => window.removeEventListener(LOADED_EVENT, onLoaded);
  }, []);
  return done;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Intro already played this session, or the page is embedded (nav previews). */
function shouldSkipIntro() {
  try {
    if (sessionStorage.getItem("octapus_intro_seen")) return true;
  } catch {
    // Ignore session storage errors
  }
  return window.self !== window.top;
}

export function LoadingScreen() {
  // Starts visible on both server and client so hydration matches. Returning visitors never
  // see it: the inline script in __root.tsx tags <html> with `octa-intro-seen`, which hides
  // the server-rendered overlay via CSS before first paint; it is then removed below.
  const [isVisible, setIsVisible] = useState(true);
  const skippedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!shouldSkipIntro()) return;
    skippedRef.current = true;
    setIsVisible(false);
    markLoaded();
  }, []);

  const completeLoading = useCallback(() => {
    try {
      sessionStorage.setItem("octapus_intro_seen", "1");
    } catch {
      // Ignore session storage errors
    }
    setIsVisible(false);
  }, []);

  // Hide once the page has loaded (after a short minimum), or at MAX_WAIT_MS at the latest.
  useEffect(() => {
    if (!isVisible || skippedRef.current) return;
    const startedAt = performance.now();
    let minTimer: number | undefined;
    const onLoad = () => {
      const remaining = Math.max(0, MIN_SHOW_MS - (performance.now() - startedAt));
      minTimer = window.setTimeout(completeLoading, remaining);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const maxTimer = window.setTimeout(completeLoading, MAX_WAIT_MS);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
  }, [isVisible, completeLoading]);

  // Every full load / refresh starts at the hero, not a restored scroll position. No scrollTo here:
  // this runs after hydration, by which time a visitor may already be scrolling (it yanked them).
  useEffect(() => {
    if (!isVisible || skippedRef.current) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, [isVisible]);

  // Keyboard skip. The overlay holds no focusable controls, so it never traps focus.
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") completeLoading();
    };
    // Scrolling or touching means the visitor wants the page: get out of the way.
    const onIntent = () => completeLoading();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchstart", onIntent, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchstart", onIntent);
    };
  }, [isVisible, completeLoading]);

  // Fade out with a CSS transition, then unmount. No animation library on this critical path.
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    if (isVisible) return;
    const t = window.setTimeout(
      () => {
        setMounted(false);
        markLoaded();
      },
      skippedRef.current ? 0 : 350,
    );
    return () => window.clearTimeout(t);
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      data-loading-screen=""
      // Decorative splash: screen readers go straight to the page content.
      aria-hidden="true"
      onClick={completeLoading}
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-background transition-opacity duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src="/octapus-indigo-logo.svg"
          alt=""
          width={150}
          height={50}
          className="h-10 w-auto md:h-12"
          style={{ objectFit: "contain" }}
        />
        <div className="h-[3px] w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 rounded-full bg-primary animate-[octa-load_1.1s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>
      </div>
      <style>{`@keyframes octa-load{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );
}
