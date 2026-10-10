import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  );
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
          title="Chat on WhatsApp"
          className="inline-flex size-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/30 transition hover:scale-105 hover:bg-[#1ebe5b]"
        >
          <WhatsAppIcon className="size-5" />
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
