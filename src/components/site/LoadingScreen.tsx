import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const MAX_WAIT_MS = 15000;

const LOADED_EVENT = "octa:loaded";

declare global {
  interface Window {
    __octaLoaded?: boolean;
  }
}

function markLoaded() {
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

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const jitter = (ms: number) => ms + Math.random() * ms * 0.6;

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        if (sessionStorage.getItem("octapus_intro_seen")) return false;
      } catch {
        // Ignore session storage errors
      }
      return window.self === window.top;
    }
    return true;
  });

  const [typed, setTyped] = useState("");
  const [boxGone, setBoxGone] = useState(false);
  const [showOut, setShowOut] = useState(false);
  const [cursorIn, setCursorIn] = useState(false);
  const [pressed, setPressed] = useState(false);
  const textRef = useRef("");

  const completeLoading = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let cancelled = false;

    const set = (s: string) => {
      textRef.current = s;
      setTyped(s);
    };
    const type = async (s: string) => {
      for (const ch of s) {
        if (cancelled) return;
        set(textRef.current + ch);
        await sleep(jitter(20));
      }
    };
    const del = async (n: number) => {
      for (let i = 0; i < n; i++) {
        if (cancelled) return;
        set(textRef.current.slice(0, -1));
        await sleep(jitter(9));
      }
    };

    const play = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setBoxGone(true);
        setShowOut(true);
        await sleep(1200);
        if (!cancelled) completeLoading();
        return;
      }

      await sleep(250);
      await type("Hey, I need a CRM");
      await sleep(250);
      await del(5);
      await sleep(60);
      await type("n ERP");
      await sleep(250);
      await del(6);
      await sleep(60);
      await type(" to automate my whole business");
      await sleep(200);
      await type(", generate leads");
      await sleep(200);
      await type(", get a website");
      await sleep(200);
      await type(" and run marketing");
      await sleep(350);
      if (cancelled) return;
      setCursorIn(true);
      await sleep(850);
      if (cancelled) return;
      setPressed(true);
      await sleep(200);
      setPressed(false);
      await sleep(250);
      if (cancelled) return;
      setCursorIn(false);
      setBoxGone(true);
      await sleep(300);
      setShowOut(true);
      await sleep(2200);
      if (!cancelled) completeLoading();
    };

    void play();
    return () => {
      cancelled = true;
    };
  }, [isVisible, completeLoading]);

  // Every full load / refresh starts at the hero, not a restored scroll position
  useEffect(() => {
    if (!isVisible) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => window.scrollTo(0, 0);
  }, [isVisible]);

  useEffect(() => {
    // Loader never shown (e.g. inside an iframe): content can animate right away.
    if (!isVisible && !window.__octaLoaded) markLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timeout = window.setTimeout(() => setIsVisible(false), MAX_WAIT_MS);
    return () => window.clearTimeout(timeout);
  }, [isVisible]);

  return (
    <AnimatePresence onExitComplete={markLoaded}>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={completeLoading}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground"
        >
          <div className="mx-auto w-full max-w-[880px] text-center">
            <div className="relative flex min-h-[340px] flex-col items-center justify-center">
              <div
                className={`flex w-full flex-col items-center gap-7 transition-all duration-500 ${
                  boxGone ? "pointer-events-none -translate-y-2.5 scale-95 opacity-0" : "opacity-100"
                }`}
              >
                {/* Search bar */}
                <div className="flex h-14 w-full max-w-[640px] items-center gap-3 rounded-full border border-border bg-background px-5 shadow-[0_1px_6px_rgba(32,33,36,.18)] sm:h-[58px] sm:px-6">
                  <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div className="flex min-w-0 flex-1 justify-end overflow-hidden whitespace-nowrap text-left text-base text-foreground sm:text-lg">
                    <span className="min-w-0 flex-1 truncate [direction:rtl] text-left">
                      <bdi>{typed}</bdi>
                    </span>
                    <span className="ml-[2px] inline-block h-[1.2em] w-0.5 shrink-0 animate-[caret-blink_1s_steps(1)_infinite] bg-primary" />
                  </div>
                </div>

                {/* Search button + animated cursor */}
                <div className="relative">
                  <span
                    className={`inline-flex h-10 items-center rounded-md border px-6 text-sm font-medium transition-all duration-150 ${
                      pressed
                        ? "scale-95 border-border bg-muted text-foreground shadow-inner"
                        : "border-transparent bg-muted/70 text-foreground/80"
                    }`}
                  >
                    Search
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={`pointer-events-none absolute left-1/2 top-1/2 size-6 drop-shadow-md transition-all ease-out ${
                      cursorIn
                        ? "translate-x-1 translate-y-0 opacity-100 duration-[800ms]"
                        : "translate-x-[140px] translate-y-[90px] opacity-0 duration-300"
                    } ${pressed ? "scale-90" : "scale-100"}`}
                  >
                    <path
                      d="M4 2.5v17.2l4.6-4.4 2.9 6.6 2.6-1.1-2.9-6.5h6.3z"
                      fill="#fff"
                      stroke="#111"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute inset-x-0 transition-[opacity,transform] duration-700 ${
                  showOut ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3.5 opacity-0"
                }`}
              >
                <h1
                  className={`m-0 font-bold leading-[1.02] tracking-[-0.045em] text-[clamp(38px,9vw,80px)]`}
                >
                  We build <span className="text-primary">all of it.</span>
                </h1>
                <p
                  className={`mx-auto mt-4 max-w-[640px] leading-[1.55] text-muted-foreground text-[clamp(15px,3.3vw,20px)]`}
                >
                  CRM. ERP. Automation. Leads. Website. Marketing. One accountable team, one integrated
                  system.
                </p>
              </div>
            </div>
          </div>
          <style>{`@keyframes caret-blink{50%{opacity:0}}`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
