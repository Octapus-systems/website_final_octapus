import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RevealButtonProps {
  to: string;
  icon?: LucideIcon;
  label: string;
  variant?: "default" | "outline" | "white" | "subtle";
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

export function RevealButton({
  to,
  icon: Icon = ArrowRight,
  label,
  variant = "default",
  external,
  className,
  onClick,
}: RevealButtonProps) {
  const content = (
    <>
      <Icon className="size-4 shrink-0" />
      <span className="inline-block overflow-hidden whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-44 group-focus-visible:max-w-44 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:ml-2 group-focus-visible:ml-2 transition-all duration-300 ease-out">
        {label}
      </span>
    </>
  );

  const sharedClasses = cn(
    "group h-9 min-w-9 max-w-9 px-2.5 gap-0 justify-start overflow-hidden transition-all duration-300 ease-out hover:max-w-60 hover:px-4 rounded-full",
    variant === "default" && "btn-aurora",
    variant === "outline" && "bg-foreground/10 border border-foreground/20 text-white hover:bg-foreground/20 hover:text-white hover:border-foreground/40",
    variant === "white" && "btn-aurora text-white",
    variant === "subtle" && "bg-foreground/10 border border-foreground/15 text-white hover:bg-foreground/20 hover:border-foreground/30",
    className,
  );

  const baseVariant = variant === "default" || variant === "white" ? "default" : "ghost";

  return external ? (
    <Button asChild variant={baseVariant} className={sharedClasses} aria-label={label} onClick={onClick}>
      <a href={to} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    </Button>
  ) : (
    <Button asChild variant={baseVariant} className={sharedClasses} aria-label={label} onClick={onClick}>
      <Link to={to}>{content}</Link>
    </Button>
  );
}
