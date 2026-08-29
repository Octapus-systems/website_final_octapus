import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Cpu, Code2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function OctapusAdvantageSection() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isVideoHovered, setIsVideoHovered] = React.useState(false);

  const engineerVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isEngineerVideoHovered, setIsEngineerVideoHovered] = React.useState(false);

  const handleCardMouseEnter = () => {
    setIsVideoHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleCardMouseLeave = () => {
    setIsVideoHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleEngineerCardMouseEnter = () => {
    setIsEngineerVideoHovered(true);
    if (engineerVideoRef.current) {
      engineerVideoRef.current.currentTime = 0;
      engineerVideoRef.current.play().catch(() => {});
    }
  };

  const handleEngineerCardMouseLeave = () => {
    setIsEngineerVideoHovered(false);
    if (engineerVideoRef.current) {
      engineerVideoRef.current.pause();
    }
  };

  return (
    <Section
      eyebrow="The Octapus Advantage"
      title="SOFTWARE, BUILT FASTER. BUILT BETTER."
      intro="AI-first. Engineer-refined. Production-ready."
      className="bg-background relative overflow-hidden py-24 md:py-32"
    >
      {/* Background ambient glowing accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Core Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-3xl bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border border-hairline relative overflow-hidden shadow-xl"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              At Octapus, we combine high-end AI engineering with experienced human developers.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              AI handles the heavy lifting first — architecture, code generation, workflows,
              integrations and repetitive development work. Then our engineers take over to refine
              the system, correct the code, strengthen the database structure, improve performance
              and make the product production-ready.
            </p>
          </div>
        </motion.div>

        {/* ── Image 2 Style Dual Feature Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Speed & Generation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            className="group relative rounded-[2.2rem] bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#7C3AED] p-8 sm:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[380px] overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-1.5 transition-all duration-500 border border-white/20"
          >
            {/* Background Video Element (Plays only on hover, hidden/paused by default) */}
            <video
              ref={videoRef}
              src="/AI_building_software_rapidly_1080p_202608291401.mp4"
              muted
              playsInline
              loop
              preload="auto"
              className={cn(
                "absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 z-0",
                isVideoHovered ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Subtle Overlay to guarantee crisp text readability over playing video */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-purple-950/85 via-indigo-950/65 to-purple-900/50 pointer-events-none transition-opacity duration-500 z-0",
                isVideoHovered ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Ambient inner card glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700 z-0" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-900/30 rounded-full blur-2xl pointer-events-none z-0" />

            {/* 3D Ribbon / Speed AI Background Graphic (fades when video plays) */}
            <div
              className={cn(
                "absolute -right-6 -bottom-10 w-64 h-64 sm:w-72 sm:h-72 pointer-events-none transition-all duration-700 ease-out z-0",
                isVideoHovered ? "opacity-0 scale-100" : "opacity-35 group-hover:opacity-50 group-hover:scale-105"
              )}
            >
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="speedRibbonGrad1" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="0.5" stopColor="#A855F7" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#4338CA" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="speedRibbonGrad2" x1="180" y1="40" x2="20" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E0E7FF" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#6366F1" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* 3D Flowing Ribbon Path 1 */}
                <path
                  d="M 30,140 C 60,60 140,40 170,90 C 190,120 150,180 90,160 C 40,140 20,80 70,40 C 110,10 170,50 180,100"
                  stroke="url(#speedRibbonGrad1)"
                  strokeWidth="28"
                  strokeLinecap="round"
                  filter="url(#ribbonGlow)"
                />
                {/* 3D Intersecting Ribbon Loop */}
                <path
                  d="M 40,110 C 70,40 150,30 160,80 C 170,130 110,170 60,130 C 20,100 50,40 110,30"
                  stroke="url(#speedRibbonGrad2)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* Lightning Bolt Core Accent */}
                <path
                  d="M105 45L75 105H110L95 155L145 90H110L125 45H105Z"
                  fill="white"
                  fillOpacity="0.25"
                />
              </svg>
            </div>

            {/* Top Content */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-medium backdrop-blur-md mb-1">
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span>AI Speed Engine</span>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                AI builds fast.
              </h3>
              <p className="text-white/85 text-sm sm:text-base font-sans font-normal leading-relaxed max-w-sm">
                Instant architecture, rapid initial codebase, interface scaffolding, and protocol integration.
              </p>
            </div>

            {/* Bottom Row Controls */}
            <div className="relative z-10 flex items-center justify-between mt-8 pt-4 border-t border-white/15">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md transition-colors shadow-sm">
                Speed & Generation
              </div>
            </div>
          </motion.div>

          {/* Card 2: Precision & Validation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={handleEngineerCardMouseEnter}
            onMouseLeave={handleEngineerCardMouseLeave}
            className="group relative rounded-[2.2rem] bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#6366F1] p-8 sm:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[380px] overflow-hidden shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-1.5 transition-all duration-500 border border-white/20"
          >
            {/* Background Video Element (Plays only on hover, hidden/paused by default) */}
            <video
              ref={engineerVideoRef}
              src="/Engineer_reviewing_code_at_works_202608291419.mp4"
              muted
              playsInline
              loop
              preload="auto"
              className={cn(
                "absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 z-0",
                isEngineerVideoHovered ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Subtle Overlay to guarantee crisp text readability over playing video */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-blue-950/85 via-indigo-950/65 to-blue-900/50 pointer-events-none transition-opacity duration-500 z-0",
                isEngineerVideoHovered ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Ambient inner card glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700 z-0" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-900/30 rounded-full blur-2xl pointer-events-none z-0" />

            {/* 3D Gear / Shield Background Graphic (fades when video plays) */}
            <div
              className={cn(
                "absolute -right-6 -bottom-10 w-64 h-64 sm:w-72 sm:h-72 pointer-events-none transition-all duration-700 ease-out z-0",
                isEngineerVideoHovered ? "opacity-0 scale-100" : "opacity-35 group-hover:opacity-50 group-hover:scale-105"
              )}
            >
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="gearGrad1" x1="10" y1="10" x2="190" y2="190" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="0.6" stopColor="#60A5FA" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#1E3A8A" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="gearGrad2" x1="180" y1="20" x2="20" y2="180" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#93C5FD" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#2563EB" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* 3D Gear Shape */}
                <path
                  d="M100 35 C104 35 107 38 108 42 L111 53 C116 55 121 57 125 61 L136 56 C140 54 144 56 146 59 L158 80 C160 83 159 88 156 90 L146 97 C147 102 147 108 146 113 L156 120 C159 122 160 127 158 130 L146 151 C144 154 140 156 136 154 L125 149 C121 153 116 155 111 157 L108 168 C107 172 104 175 100 175 C96 175 93 172 92 168 L89 157 C84 155 79 153 75 149 L64 154 C60 156 56 154 54 151 L42 130 C40 127 41 122 44 120 L54 113 C53 108 53 102 54 97 L44 90 C41 88 40 83 42 80 L54 59 C56 56 60 54 64 56 L75 61 C79 57 84 55 89 53 L92 42 C93 38 96 35 100 35 Z"
                  fill="url(#gearGrad1)"
                />
                {/* Gear Center Cutout */}
                <circle cx="100" cy="105" r="32" fill="#1E40AF" fillOpacity="0.4" stroke="white" strokeWidth="6" strokeOpacity="0.4" />
                {/* Inner Shield / Check Badge */}
                <path
                  d="M100 88L112 94V106C112 114 107 121 100 124C93 121 88 114 88 106V94L100 88Z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <path
                  d="M95 106L98 109L105 102"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Top Content */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-medium backdrop-blur-md mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Human Validation</span>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Engineers make it right.
              </h3>
              <p className="text-white/85 text-sm sm:text-base font-sans font-normal leading-relaxed max-w-sm">
                Rigorous code audit, optimized data models, edge-case security, and production readiness.
              </p>
            </div>

            {/* Bottom Row Controls */}
            <div className="relative z-10 flex items-center justify-between mt-8 pt-4 border-t border-white/15">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md transition-colors shadow-sm">
                Precision & Validation
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Connecting Clean Curved Solid Hairlines ── */}
        <div className="relative h-12 md:h-14 w-full max-w-5xl mx-auto pointer-events-none z-10">
          <svg
            className="w-full h-full text-primary/35 dark:text-primary/50"
            viewBox="0 0 1000 50"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Desktop Curve 1: Card 1 down to Result */}
            <path
              d="M 240 0 C 240 28, 500 20, 500 48"
              stroke="currentColor"
              strokeWidth="1.5"
              className="hidden md:block"
              vectorEffect="non-scaling-stroke"
            />

            {/* Desktop Curve 2: Card 2 down to Result */}
            <path
              d="M 760 0 C 760 28, 500 20, 500 48"
              stroke="currentColor"
              strokeWidth="1.5"
              className="hidden md:block"
              vectorEffect="non-scaling-stroke"
            />

            {/* Mobile Path */}
            <path
              d="M 500 0 L 500 48"
              stroke="currentColor"
              strokeWidth="1.5"
              className="md:hidden"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* ── Result Pill Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center relative z-20 pt-1"
        >
          <span className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-surface/90 dark:bg-surface-dark/90 border border-primary/40 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-primary shadow-xl shadow-primary/10 backdrop-blur-md relative z-10">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Result: Production-Ready Software
          </span>
        </motion.div>
      </div>
    </Section>
  );
}

