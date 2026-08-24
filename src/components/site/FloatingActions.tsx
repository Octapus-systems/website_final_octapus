import { useEffect, useState } from "react";
import { MessageCircle, CalendarClock } from "lucide-react";
import { RevealButton } from "@/components/site/RevealButton";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/** Hidden while the page is scrolling; pops back in, centered, once scrolling stops. */
function useScrollIdle(delay = 500) {
  const [idle, setIdle] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), delay);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [delay]);

  return idle;
}

export function FloatingActions() {
  const idle = useScrollIdle();
  const waUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Octapus — I'd like to talk about a project.")}`;

  return (
    <div
      aria-hidden={!idle}
      className={`fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 print:hidden transition-all duration-300 ${
        idle
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-95 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center gap-2 rounded-full p-1.5 glass-panel ${idle ? "cta-pop-in" : ""}`}
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Octapus on WhatsApp"
          onClick={() => trackEvent("whatsapp_click")}
          className="inline-flex size-10 items-center justify-center rounded-full border hairline text-foreground hover:bg-accent transition"
        >
          <MessageCircle className="size-4" />
        </a>
        <RevealButton
          to="/book"
          icon={CalendarClock}
          label="Book a Strategy Call"
          onClick={() => trackEvent("strategy_call_click", { source: "floating" })}
        />
      </div>
    </div>
  );
}
