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
        width={140}
        height={35}
        className="h-8 md:h-10 w-auto"
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
