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
        src="https://res.cloudinary.com/dk0v8kljx/image/upload/v1781652154/New_Logo_es6c4z.png"
        alt="Octapus"
        width={128}
        height={32}
        className="h-7 w-auto"
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
