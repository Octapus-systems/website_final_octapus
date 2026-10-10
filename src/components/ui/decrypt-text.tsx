import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type DecryptTextProps = {
  text: string;
  className?: string;
  startDelay?: number;
  stagger?: number;
  speed?: number;
  jitter?: number;
  seed?: number;
  replayOnView?: boolean;
  as?: "span" | "div" | "p";
  /** Soft blur on characters while they scramble, sharpening as they lock */
  blur?: boolean;
};

const GLYPHS = "#%&@$?!*+=/{}[]<>~^";
const FLASH_DURATION = 420;

function makeRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function DecryptText({
  text,
  className,
  startDelay = 180,
  stagger = 38,
  speed = 42,
  jitter = 90,
  seed = 1,
  replayOnView = true,
  as: Tag = "span",
  blur = false,
}: DecryptTextProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const characterRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const frameRef = React.useRef<number | null>(null);
  const runRef = React.useRef(0);
  const hasPlayedRef = React.useRef(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const reducedMotion = useReducedMotion();
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const scope = `decrypt-${uid}`;

  const words = React.useMemo(() => {
    let index = 0;
    return text.split(" ").map((word) =>
      Array.from(word).map((character) => ({ character, index: index++ })),
    );
  }, [text]);

  const stop = React.useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  const resolveAll = React.useCallback(() => {
    characterRefs.current.forEach((element) => {
      if (!element) return;
      element.textContent = element.dataset.character ?? "";
      element.dataset.state = "plain";
    });
  }, []);

  const play = React.useCallback(() => {
    stop();
    const characters = characterRefs.current.filter(
      (element): element is HTMLSpanElement => element !== null,
    );
    if (!characters.length) return;

    const random = makeRandom(seed + runRef.current * 7919);
    runRef.current += 1;
    hasPlayedRef.current = true;
    const lockAt = new Float64Array(characters.length);
    const nextChangeAt = new Float64Array(characters.length);
    const locked = new Uint8Array(characters.length);

    characters.forEach((element, index) => {
      lockAt[index] = startDelay + index * stagger + (random() * 2 - 1) * jitter;
      element.dataset.state = "scramble";
      element.textContent = GLYPHS.charAt((random() * GLYPHS.length) | 0);
    });

    let remaining = characters.length;
    const startedAt = performance.now();
    const frame = () => {
      const elapsed = performance.now() - startedAt;

      characters.forEach((element, index) => {
        if (locked[index]) return;
        if (elapsed >= (lockAt[index] ?? 0)) {
          element.textContent = element.dataset.character ?? "";
          element.dataset.state = "lock";
          locked[index] = 1;
          remaining -= 1;
        } else if (elapsed >= (nextChangeAt[index] ?? 0)) {
          element.textContent = GLYPHS.charAt((random() * GLYPHS.length) | 0);
          nextChangeAt[index] = elapsed + speed + random() * 35;
        }
      });

      if (remaining > 0) frameRef.current = requestAnimationFrame(frame);
      else frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(frame);
  }, [jitter, seed, speed, stagger, startDelay, stop]);

  React.useEffect(() => {
    const element = rootRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.45, rootMargin: "-8% 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useLayoutEffect(() => {
    if (reducedMotion) {
      stop();
      resolveAll();
      return;
    }
    if (!isVisible) {
      stop();
      resolveAll();
      return;
    }
    if (replayOnView || !hasPlayedRef.current) play();
  }, [isVisible, play, reducedMotion, replayOnView, resolveAll, stop]);

  React.useEffect(() => stop, [stop]);

  const css = `
    .${scope} [data-character][data-state="scramble"]{color:color-mix(in oklab,currentColor 30%,var(--muted-foreground));${blur ? "filter:blur(6px);opacity:.55;" : ""}}
    .${scope} [data-character]{${blur ? "display:inline-block;transition:filter 700ms ease-out,opacity 700ms ease-out;" : ""}}
    .${scope} [data-character][data-state="lock"]{animation:${scope}-flash ${FLASH_DURATION}ms cubic-bezier(.2,0,0,1);}
    @keyframes ${scope}-flash{0%{color:var(--primary);text-shadow:0 0 22px color-mix(in oklab,var(--primary) 60%,transparent)}100%{text-shadow:0 0 0 transparent}}
    @media (prefers-reduced-motion:reduce){.${scope} [data-character][data-state="lock"]{animation:none}}
  `;

  let cursor = -1;

  return (
    <Tag ref={rootRef as React.Ref<never>} className={cn("block", scope, className)}>
      <style>{css}</style>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="select-none">
        {words.map((word, wordIndex) => (
          <React.Fragment key={`${wordIndex}-${word.map(({ character }) => character).join("")}`}>
            <span className="inline-block whitespace-pre">
              {word.map(({ character, index }) => {
                cursor += 1;
                const referenceIndex = cursor;
                return (
                  <span
                    key={index}
                    data-character={character}
                    data-state="plain"
                    ref={(element) => {
                      characterRefs.current[referenceIndex] = element;
                    }}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    </Tag>
  );
}
