import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

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
        src="/octapus-indigo-logo.svg"
        alt="Octapus"
        width={150}
        height={50}
        className="h-8 md:h-10 w-auto"
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
