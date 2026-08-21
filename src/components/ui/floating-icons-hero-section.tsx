import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingIconItem {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Positioning utilities, e.g. "top-[10%] left-[12%]" */
  className: string;
}

export interface FloatingIconsLayerProps {
  icons: FloatingIconItem[];
  className?: string;
}

function FloatingIcon({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: FloatingIconItem;
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseX.current - cx;
      const dy = mouseY.current - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - distance / 150) * 40;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  const Glyph = iconData.icon;

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={cn("absolute", iconData.className)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 6 + (index % 5),
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        className="grid size-11 place-items-center rounded-2xl border hairline glass-card text-primary shadow-lg"
      >
        <Glyph className="size-5" />
      </motion.div>
    </motion.div>
  );
}

/**
 * Ambient layer of cursor-reactive floating icons.
 * Purely decorative — hidden from assistive technology.
 */
export function FloatingIconsLayer({ icons, className }: FloatingIconsLayerProps) {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 hidden md:block opacity-70 motion-reduce:opacity-40",
        className,
      )}
    >
      {icons.map((iconData, index) => (
        <FloatingIcon
          key={iconData.id}
          iconData={iconData}
          index={index}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
}
