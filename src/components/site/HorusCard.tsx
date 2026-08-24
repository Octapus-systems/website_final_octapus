import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealButton } from "@/components/site/RevealButton";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function HorusCard({
  source = "home_trust",
  showExploreLink = true,
  className,
}: {
  source?: string;
  showExploreLink?: boolean;
  className?: string;
}) {
  const [aiOn, setAiOn] = useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl shadow-[#0a1a3f]/40 bg-[linear-gradient(160deg,#0b1b3a_0%,#0d2350_45%,#081431_100%)] border border-white/10",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #3b6bff 0%, transparent 70%)" }}
      />
      <div className="relative flex items-start justify-between gap-6">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/50">
            OIS ecosystem
          </div>
          <h3
            className="mt-3 font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-[clamp(3.2rem,11vw,5.5rem)] scale-y-125 origin-left bg-[linear-gradient(180deg,#ffffff_0%,#a9c2ff_100%)] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cal Sans', sans-serif" }}
          >
            Horus
          </h3>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={aiOn}
          aria-label="Toggle AI coworker"
          onClick={() => setAiOn((v) => !v)}
          className="mt-1 flex h-10 w-[4.6rem] shrink-0 items-center rounded-full bg-[#141414] p-1 transition-colors duration-300"
          style={{
            boxShadow: aiOn
              ? "inset 3px 3px 8px rgba(0,0,0,0.65), inset -3px -3px 8px rgba(80,120,255,0.18), 0 0 22px rgba(90,130,255,0.3)"
              : "inset 3px 3px 8px rgba(0,0,0,0.65), inset -3px -3px 8px rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold tracking-wider text-white transition-transform duration-300 ease-out"
            style={{
              transform: aiOn ? "translateX(2.05rem)" : "translateX(0)",
              background: aiOn
                ? "linear-gradient(145deg,#7ea6ff,#2f5cff)"
                : "linear-gradient(145deg,#2a2a2a,#171717)",
              boxShadow: "3px 3px 6px rgba(0,0,0,0.5), -2px -2px 6px rgba(255,255,255,0.08)",
            }}
          >
            AI
          </span>
        </button>
      </div>

      <p className="relative mt-6 max-w-md text-sm leading-relaxed text-white/70">
        Horus is a coworker for your business — not another tool. It sits inside the OIS
        intelligence layer, reads your systems and data, and takes real work off the team:
        follow-ups, reporting, reconciliation and daily operations.
      </p>

      <dl className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          ["Role", "AI coworker"],
          ["Works in", "OIS layer"],
          ["Hours", "24 / 7"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
          >
            <dt className="text-[10px] uppercase tracking-[0.16em] text-white/45">{k}</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-4 text-xs text-white/50">
        {aiOn
          ? "Agent mode active — Horus is handling tasks."
          : "Agent mode paused — manual operation."}
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-3">
        <Button
          asChild
          size="sm"
          className="rounded-full bg-white text-[#0b1b3a] hover:bg-white/90 font-medium"
          onClick={() => trackEvent("horus_external_click", { source })}
        >
          <a href={site.horusExternalUrl} target="_blank" rel="noopener noreferrer">
            Visit the Horus AI website <ExternalLink className="ml-1 size-3.5" />
          </a>
        </Button>
        {showExploreLink && <RevealButton to="/ois" icon={ArrowRight} label="Explore OIS" />}
      </div>
    </div>
  );
}
