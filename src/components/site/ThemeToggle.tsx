import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "octapus-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark, mounted]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark((d) => !d)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn("group relative rounded-full transition-colors", className)}
    >
      {/* Soft ambient glow — fades with theme */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0",
          "bg-[radial-gradient(circle,_color-mix(in_oklab,var(--color-primary)_30%,transparent)_0%,transparent_70%)]",
          "opacity-0 group-hover:opacity-100",
          isDark && "opacity-60 group-hover:opacity-100",
        )}
      />
      <Lightbulb
        className={cn(
          "relative size-5 transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0 motion-reduce:drop-shadow-none",
          isDark
            ? "text-primary fill-primary/25 drop-shadow-[0_0_8px_color-mix(in_oklab,var(--color-primary)_60%,transparent)]"
            : "text-muted-foreground group-hover:text-foreground",
        )}
        aria-hidden="true"
        strokeWidth={1.5}
      />
    </Button>
  );
}
