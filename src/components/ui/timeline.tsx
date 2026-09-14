import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check, Clock, X } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const timelineVariants = cva("relative flex", {
  variants: {
    variant: {
      default: "gap-5",
      compact: "gap-3",
      spacious: "gap-8",
    },
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
});

const timelineItemVariants = cva("group relative flex gap-4", {
  variants: {
    orientation: {
      vertical: "flex-row",
      horizontal: "min-w-64 shrink-0 flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const timelineConnectorVariants = cva("absolute bg-border", {
  variants: {
    orientation: {
      vertical: "left-[15px] top-8 -bottom-8 w-px",
      horizontal: "left-8 top-[15px] h-px w-[calc(100%+2rem)]",
    },
    status: {
      default: "bg-border",
      completed: "bg-primary",
      active: "bg-gradient-to-b from-primary to-border",
      pending: "bg-muted-foreground/25",
      error: "bg-destructive",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    status: "default",
  },
});

const timelineIconVariants = cva(
  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-xs transition-[border-color,background-color,color,transform] duration-300",
  {
    variants: {
      status: {
        default: "border-border text-muted-foreground group-hover:border-primary/50",
        completed: "border-primary bg-primary text-primary-foreground",
        active:
          "border-primary bg-background text-primary shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-primary)_10%,transparent)] group-hover:scale-105",
        pending: "border-muted-foreground/25 text-muted-foreground/65",
        error: "border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  label?: string;
  timestamp?: string | Date;
  status?: "default" | "completed" | "active" | "pending" | "error";
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export interface TimelineProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[];
  showConnectors?: boolean;
  showTimestamps?: boolean;
  timestampPosition?: "top" | "bottom" | "inline";
  animated?: boolean;
  flowOnScroll?: boolean;
}

function getStatusIcon(status: TimelineItem["status"]) {
  switch (status) {
    case "completed":
      return <Check className="h-3.5 w-3.5" />;
    case "active":
    case "pending":
      return <Clock className="h-3.5 w-3.5" />;
    case "error":
      return <X className="h-3.5 w-3.5" />;
    default:
      return <span className="h-1.5 w-1.5 rounded-full bg-current" />;
  }
}

function formatTimestamp(timestamp: string | Date) {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface TimelineConnectorProps {
  orientation: "vertical" | "horizontal";
  status: TimelineItem["status"];
  index: number;
  itemCount: number;
  flowProgress: MotionValue<number>;
  flowEnabled: boolean;
  shouldAnimate: boolean;
}

function TimelineConnector({
  orientation,
  status,
  index,
  itemCount,
  flowProgress,
  flowEnabled,
  shouldAnimate,
}: TimelineConnectorProps) {
  const segmentCount = Math.max(1, itemCount - 1);
  const segmentProgress = useTransform(
    flowProgress,
    [index / segmentCount, (index + 1) / segmentCount],
    [0, 1],
  );
  const transformOrigin = orientation === "vertical" ? "top" : "left";
  const flowStyle =
    orientation === "vertical"
      ? { scaleY: segmentProgress, transformOrigin }
      : { scaleX: segmentProgress, transformOrigin };

  if (flowEnabled) {
    return (
      <>
        <span
          aria-hidden="true"
          className={cn(timelineConnectorVariants({ orientation, status: "pending" }))}
        />
        <motion.span
          aria-hidden="true"
          className={cn(
            timelineConnectorVariants({ orientation, status: "completed" }),
            "z-[1] shadow-[0_0_10px_color-mix(in_oklab,var(--color-primary)_38%,transparent)]",
          )}
          style={flowStyle}
        />
      </>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={shouldAnimate ? (orientation === "vertical" ? { scaleY: 0 } : { scaleX: 0 }) : false}
      whileInView={orientation === "vertical" ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: shouldAnimate ? 0.65 : 0,
        delay: shouldAnimate ? index * 0.09 + 0.12 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin }}
      className={cn(timelineConnectorVariants({ orientation, status }))}
    />
  );
}

interface TimelineNodeProps {
  item: TimelineItem;
  index: number;
  itemCount: number;
  flowProgress: MotionValue<number>;
  flowEnabled: boolean;
  shouldAnimate: boolean;
}

function useTimelineActivation(
  flowProgress: MotionValue<number>,
  index: number,
  itemCount: number,
) {
  const threshold = itemCount <= 1 ? 0 : index / (itemCount - 1);

  return useTransform(
    flowProgress,
    [Math.max(0, threshold - 0.035), Math.min(1, threshold + 0.035)],
    [0, 1],
  );
}

function TimelineNode({
  item,
  index,
  itemCount,
  flowProgress,
  flowEnabled,
  shouldAnimate,
}: TimelineNodeProps) {
  const activation = useTimelineActivation(flowProgress, index, itemCount);
  const icon = item.icon || getStatusIcon(item.status);

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, scale: 0.65 } : false}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
        delay: shouldAnimate ? index * 0.09 : 0,
      }}
      className="relative z-10 flex shrink-0"
    >
      <span className={cn(timelineIconVariants({ status: flowEnabled ? "pending" : item.status }))}>
        {icon}
      </span>

      {flowEnabled && (
        <motion.span
          aria-hidden="true"
          className={cn(
            timelineIconVariants({ status: "completed" }),
            "absolute inset-0 shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-primary)_10%,transparent),0_0_18px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]",
          )}
          style={{ opacity: activation, scale: activation }}
        >
          {icon}
        </motion.span>
      )}
    </motion.div>
  );
}

interface TimelineTitleProps {
  title: string;
  index: number;
  itemCount: number;
  flowProgress: MotionValue<number>;
  flowEnabled: boolean;
}

function TimelineTitle({ title, index, itemCount, flowProgress, flowEnabled }: TimelineTitleProps) {
  const activation = useTimelineActivation(flowProgress, index, itemCount);
  const titleClassName = "text-xl font-semibold leading-tight md:text-2xl";

  return (
    <div className="relative min-w-0 flex-1">
      <h3 className={cn(titleClassName, "text-foreground")}>{title}</h3>
      {flowEnabled && (
        <motion.h3
          aria-hidden="true"
          className={cn(
            titleClassName,
            "pointer-events-none absolute inset-0 text-primary [text-shadow:0_0_18px_color-mix(in_oklab,var(--color-primary)_16%,transparent)]",
          )}
          style={{ opacity: activation }}
        >
          {title}
        </motion.h3>
      )}
    </div>
  );
}

export function Timeline({
  items,
  className,
  variant,
  orientation = "vertical",
  showConnectors = true,
  showTimestamps = true,
  timestampPosition = "top",
  animated = true,
  flowOnScroll = false,
  ...props
}: TimelineProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;
  const resolvedOrientation = orientation ?? "vertical";
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const flowEnabled = flowOnScroll && !reducedMotion;
  const { scrollYProgress: flowProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 48%"],
  });
  const timelineContent = (
    <div
      ref={timelineRef}
      className={cn(
        timelineVariants({ variant, orientation: resolvedOrientation }),
        resolvedOrientation === "horizontal" && "min-w-max pb-4",
      )}
    >
      {items.map((item, index) => (
        <article
          key={item.id}
          aria-current={item.status === "active" ? "step" : undefined}
          className={cn(timelineItemVariants({ orientation: resolvedOrientation }))}
        >
          {showConnectors && index < items.length - 1 && (
            <TimelineConnector
              orientation={resolvedOrientation}
              status={item.status}
              index={index}
              itemCount={items.length}
              flowProgress={flowProgress}
              flowEnabled={flowEnabled}
              shouldAnimate={shouldAnimate}
            />
          )}

          <TimelineNode
            item={item}
            index={index}
            itemCount={items.length}
            flowProgress={flowProgress}
            flowEnabled={flowEnabled}
            shouldAnimate={shouldAnimate}
          />

          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: 14 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: shouldAnimate ? 0.5 : 0,
              delay: shouldAnimate ? index * 0.09 + 0.06 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-w-0 flex-1 flex-col"
          >
            {showTimestamps && timestampPosition === "top" && item.timestamp && (
              <time className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                {formatTimestamp(item.timestamp)}
              </time>
            )}

            {item.label && (
              <span className="mb-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary">
                {item.label}
              </span>
            )}

            <div className="flex items-start justify-between gap-3">
              <TimelineTitle
                title={item.title}
                index={index}
                itemCount={items.length}
                flowProgress={flowProgress}
                flowEnabled={flowEnabled}
              />
              {showTimestamps && timestampPosition === "inline" && item.timestamp && (
                <time className="shrink-0 text-xs text-muted-foreground">
                  {formatTimestamp(item.timestamp)}
                </time>
              )}
            </div>

            {item.description && (
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.description}
              </p>
            )}

            {item.content && <div className="mt-4">{item.content}</div>}

            {showTimestamps && timestampPosition === "bottom" && item.timestamp && (
              <time className="mt-3 text-xs text-muted-foreground">
                {formatTimestamp(item.timestamp)}
              </time>
            )}
          </motion.div>
        </article>
      ))}
    </div>
  );

  if (resolvedOrientation === "horizontal") {
    return (
      <ScrollArea orientation="horizontal" className={cn("w-full", className)} {...props}>
        {timelineContent}
      </ScrollArea>
    );
  }

  return (
    <div className={className} {...props}>
      {timelineContent}
    </div>
  );
}
