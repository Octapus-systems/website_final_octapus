import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  Building2,
  Camera,
  Cloud,
  Cpu,
  Megaphone,
  Mic2,
  PanelsTopLeft,
  Shapes,
  Sparkles,
  UsersRound,
} from "lucide-react";

const LOAD_DURATION_MS = 2400;

const loadingIcons = [
  BrainCircuit,
  Building2,
  UsersRound,
  Cpu,
  Sparkles,
  Cloud,
  Megaphone,
  Mic2,
  Camera,
  PanelsTopLeft,
  Shapes,
];

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
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;
    try {
      sessionStorage.setItem("octapus_intro_seen", "1");
    } catch {
      // Ignore session storage errors
    }
    const timeout = window.setTimeout(
      () => setIsVisible(false),
      reducedMotion ? 150 : LOAD_DURATION_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [isVisible, reducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="octapus-loading-screen fixed inset-0 z-[99999] grid place-items-center bg-background"
          role="status"
          aria-label="Loading Octapus"
        >
          <span className="sr-only">Loading Octapus</span>
          <div className="relative size-[5.5rem]" aria-hidden="true">
            {loadingIcons.map((Icon, index) => (
              <Icon
                key={index}
                className="octapus-loading-icon absolute inset-0 size-full stroke-[2.35]"
                style={{ "--loading-step": index } as CSSProperties}
              />
            ))}
            <img
              src="/octapus-indigo-logo.svg"
              alt=""
              width={88}
              height={88}
              className="octapus-loading-mark absolute inset-0 size-full object-contain p-1"
              style={{ "--loading-step": loadingIcons.length } as CSSProperties}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
