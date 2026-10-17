import { useEffect, useRef } from "react";
import { useLocation, useRouter } from "@tanstack/react-router";
import type Lenis from "lenis";

/**
 * Smooth, normalised wheel/trackpad scrolling for the whole site.
 * Evens out big wheel jumps and trackpad flings so scroll-driven sections
 * (like the 3D story) play through instead of skipping. Touch keeps native scrolling.
 * Lenis is only loaded (on demand) for mouse / trackpad devices: on touch screens it would
 * pass scrolling through natively anyway, while still running a frame loop forever.
 */
// Max page speed while a scroll story is on screen (px per second), so a fling can't skip it
const MAX_STORY_SPEED = 2200;
const MAX_STORY_STEP = 120;

export function SmoothScroll() {
  const location = useLocation();
  const router = useRouter();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      teardown = startLenis(LenisCtor);
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  function startLenis(LenisCtor: typeof Lenis) {
    let allowance = MAX_STORY_STEP;
    let last = performance.now();

    const lenis: Lenis = new LenisCtor({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      // Inside scroll-driven stories, cap each wheel step so a hard fling can't skip the story
      virtualScroll: (data) => {
        const story = document.querySelector("[data-scroll-story]");
        if (story instanceof HTMLElement) {
          const r = story.getBoundingClientRect();
          // Don't leave the story (scrolling down) until its animation has fully played
          const done = Number(story.dataset.storyProgress ?? 0) >= 0.995;
          if (!done && data.deltaY > 0 && lenis) {
            const end = r.bottom + window.scrollY - window.innerHeight;
            data.deltaY = Math.min(data.deltaY, Math.max(0, end - lenis.targetScroll));
          }
          if (r.top < window.innerHeight && r.bottom > 0) {
            const now = performance.now();
            allowance = Math.min(MAX_STORY_STEP, allowance + ((now - last) / 1000) * MAX_STORY_SPEED);
            last = now;
            const step = Math.min(Math.abs(data.deltaY), allowance);
            allowance -= step;
            data.deltaY = Math.sign(data.deltaY) * step;
          }
        }
        return true;
      },
    });

    lenisRef.current = lenis;

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }

  // When navigating to a new page, reset scroll to top immediately so pages don't open at previous scroll depth / footer
  useEffect(() => {
    const scrollToTarget = () => {
      if (location.hash) {
        const targetId = location.hash.replace(/^#/, "");
        const el = document.getElementById(targetId);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { immediate: true });
          } else {
            el.scrollIntoView();
          }
          return;
        }
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
      }
      window.scrollTo(0, 0);
    };

    scrollToTarget();
    const rafId = requestAnimationFrame(scrollToTarget);
    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, location.hash]);

  // Hook into router onRendered lifecycle event as well for complete consistency
  useEffect(() => {
    return router.subscribe("onRendered", (event) => {
      if (event.toLocation.hash) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
      }
      window.scrollTo(0, 0);
    });
  }, [router]);

  return null;
}

