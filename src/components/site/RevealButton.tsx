import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2, type LucideIcon } from "lucide-react";
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

interface RevealActionButtonProps {
  label: string;
  icon?: LucideIcon;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline" | "white";
  className?: string;
  onClick?: () => void;
}

const revealLabelClass =
  "inline-block max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-52 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-52 group-focus-visible:opacity-100";

function RevealContent({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <>
      <Icon className="size-4 shrink-0" />
      <span className={revealLabelClass}>{label}</span>
    </>
  );
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
  const content = <RevealContent Icon={Icon} label={label} />;

  const sharedClasses = cn(
    "group h-9 min-w-9 max-w-9 px-2.5 gap-0 justify-start overflow-hidden transition-all duration-300 ease-out hover:max-w-60 hover:px-4 rounded-full",
    variant === "default" && "btn-aurora",
    variant === "outline" &&
      "bg-foreground/10 border border-foreground/20 text-white hover:bg-foreground/20 hover:text-white hover:border-foreground/40",
    variant === "white" && "btn-aurora text-white",
    variant === "subtle" &&
      "bg-foreground/10 border border-foreground/15 text-white hover:bg-foreground/20 hover:border-foreground/30",
    className,
  );

  const baseVariant = variant === "default" || variant === "white" ? "default" : "ghost";

  return external ? (
    <Button
      asChild
      variant={baseVariant}
      className={sharedClasses}
      aria-label={label}
      onClick={onClick}
    >
      <a href={to} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    </Button>
  ) : (
    <Button
      asChild
      variant={baseVariant}
      className={sharedClasses}
      aria-label={label}
      onClick={onClick}
    >
      <Link to={to}>{content}</Link>
    </Button>
  );
}

export function RevealActionButton({
  label,
  icon: Icon = ArrowRight,
  loading = false,
  loadingLabel = "Working",
  disabled,
  type = "button",
  variant = "default",
  className,
  onClick,
}: RevealActionButtonProps) {
  const ActiveIcon = loading ? Loader2 : Icon;
  const activeLabel = loading ? loadingLabel : label;

  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled || loading}
      aria-label={activeLabel}
      onClick={onClick}
      className={cn(
        "group h-11 min-w-11 max-w-11 justify-start gap-0 overflow-hidden rounded-full px-3.5 transition-all duration-300 ease-out hover:max-w-72 hover:px-5 focus-visible:max-w-72 focus-visible:px-5",
        className,
      )}
    >
      <ActiveIcon className={cn("size-4 shrink-0", loading && "animate-spin")} />
      <span className={revealLabelClass}>{activeLabel}</span>
    </Button>
  );
}
