import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import wordmarkAsset from "@/assets/octapus-wordmark.png.asset.json";

export function Wordmark({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-center",
        dark ? "text-primary-foreground" : "text-foreground",
        className,
      )}
      aria-label="Octapus — home"
    >
      <img
        src={wordmarkAsset.url}
        alt="Octapus"
        width={128}
        height={32}
        className="h-7 w-auto"
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
