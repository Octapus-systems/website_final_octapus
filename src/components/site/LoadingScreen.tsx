import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYBACK_RATE = 2.25;
const MAX_WAIT_MS = 6000;

export function LoadingScreen() {
  // Initialize to true ONLY if we are NOT inside an iframe (like the nav mega-menu)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.self === window.top;
    }
    return true;
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const video = videoRef.current;
    if (!video) return;

    video.defaultPlaybackRate = PLAYBACK_RATE;
    video.playbackRate = PLAYBACK_RATE;
    void video.play().catch(() => {
      // Autoplay can be delayed until the browser has decoded enough data.
    });

    let frame = 0;
    const updateProgress = () => {
      const progress = video.duration ? Math.min(1, video.currentTime / video.duration) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(progress * 100)}%`;
      }
      frame = requestAnimationFrame(updateProgress);
    };

    frame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frame);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const timeout = window.setTimeout(() => setIsVisible(false), MAX_WAIT_MS);
    return () => window.clearTimeout(timeout);
  }, [isVisible]);

  const completeLoading = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
        >
          {/* Fullscreen Video Background */}
          <div className="absolute inset-0 z-0">
             <video
              ref={videoRef}
              src="/loading-intro.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={completeLoading}
              onCanPlay={() => {
                if (!videoRef.current) return;
                videoRef.current.playbackRate = PLAYBACK_RATE;
                void videoRef.current.play().catch(() => undefined);
              }}
              onError={completeLoading}
              className="w-full h-full object-cover [transform:translateZ(0)]"
            />
            {/* Overlay gradient to darken/blend the video behind text */}
            <div className="absolute inset-0 bg-background/50 pointer-events-none" />
          </div>

          {/* Creative tech/terminal overlay elements */}
          <div className="absolute top-8 left-8 text-xs font-mono opacity-40 tracking-widest hidden md:block z-10">
            SYS.INIT // {new Date().getFullYear()}
            <br />
            OCTAPUS_CORE_V1.0
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] font-mono opacity-40 tracking-widest hidden md:block text-right z-10">
            LOADING ASSETS... [OK]
            <br />
            ESTABLISHING CONNECTION... [OK]
          </div>

          <div className="relative z-10 w-64 max-w-[70vw] mt-auto mb-12">
            <div className="flex justify-between items-center mb-2 text-[10px] font-mono tracking-widest opacity-60">
              <span>INITIALIZING</span>
              <span ref={progressTextRef}>0%</span>
            </div>
            <div className="h-0.5 w-full bg-surface/50 dark:bg-surface-dark/50 overflow-hidden rounded-full">
              <div
                ref={progressBarRef}
                className="h-full origin-left scale-x-0 bg-primary will-change-transform"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
