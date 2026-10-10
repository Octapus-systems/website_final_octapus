import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Smooth, normalised wheel/trackpad scrolling for the whole site.
 * Evens out big wheel jumps and trackpad flings so scroll-driven sections
 * (like the 3D story) play through instead of skipping. Touch keeps native scrolling.
 */
// Max page speed while a scroll story is on screen (px per second), so a fling can't skip it
const MAX_STORY_SPEED = 1400;
const MAX_STORY_STEP = 120;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let allowance = MAX_STORY_STEP;
    let last = performance.now();

    // eslint-disable-next-line prefer-const
    let lenis: Lenis | undefined;
    lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
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

    let frame = requestAnimationFrame(function raf(time) {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
