import { AI_ICON_PATHS } from "@/components/site/ai-icons";
import { trackEvent } from "@/lib/analytics";

const PROMPT =
  "Tell me about Octapus (octapus.ae), the AI and software development company in Dubai, UAE. What do they build, who do they work with, and why would a business choose them?";

const q = encodeURIComponent(PROMPT);

const ASSISTANTS = [
  { key: "chatgpt", name: "ChatGPT", href: `https://chatgpt.com/?q=${q}` },
  { key: "claude", name: "Claude", href: `https://claude.ai/new?q=${q}` },
  // Gemini has no prefill URL; Google's AI Mode answers the same question.
  { key: "gemini", name: "Google AI", href: `https://www.google.com/search?udm=50&q=${q}` },
  { key: "perplexity", name: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}` },
] as const;

/** "Ask AI about Octapus" — opens each assistant with a question about Octapus prefilled. */
export function AskAi({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#b99cff]">
        Ask AI about Octapus
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {ASSISTANTS.map((a) => (
          <a
            key={a.key}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Ask ${a.name} about Octapus`}
            aria-label={`Ask ${a.name} about Octapus`}
            onClick={() => trackEvent("ask_ai_click", { assistant: a.key })}
            className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary/25"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
              <path d={AI_ICON_PATHS[a.key]} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
