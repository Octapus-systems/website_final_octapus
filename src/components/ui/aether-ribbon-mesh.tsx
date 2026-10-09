import * as React from "react";
import { cn } from "@/lib/utils";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  readonly maxLife: number;
  readonly size: number;
  readonly color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.maxLife = 80 + Math.random() * 60;
    this.life = this.maxLife;
    this.size = 1 + Math.random() * 2;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    context.globalAlpha = this.life / this.maxLife;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;
  }
}

export function AetherRibbonMesh({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsDark(root.classList.contains("dark"));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let frameId = 0;
    let width = 1;
    let height = 1;
    let time = 0;
    let lastTime = performance.now();
    let isVisible = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const particles: Particle[] = [];
    const ripple = { x: 0, y: 0, radius: 400, active: false };

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getLocalPoint = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const onPointerMove = (event: PointerEvent) => {
      const point = getLocalPoint(event);
      pointer.targetX = point.x - width / 2;
      pointer.targetY = point.y - height / 2;
    };

    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      const point = getLocalPoint(event);
      ripple.x = point.x;
      ripple.y = point.y;
      ripple.radius = 0;
      ripple.active = true;
      const color = isDark ? "rgba(167, 139, 250, 0.9)" : "rgba(96, 28, 230, 0.78)";
      for (let index = 0; index < 24; index += 1) {
        particles.push(new Particle(point.x, point.y, color));
      }
    };

    const noise = (x: number, currentTime: number, offset: number) =>
      (Math.sin(x * 0.0012 + currentTime * 0.25 + offset) +
        Math.cos(x * 0.0028 - currentTime * 0.4 + offset * 2)) /
      2;

    const draw = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!reducedMotion) time += delta * 0.85;

      const interpolation = 1 - Math.exp(-9 * delta);
      pointer.x += (pointer.targetX - pointer.x) * interpolation;
      pointer.y += (pointer.targetY - pointer.y) * interpolation;

      context.fillStyle = isDark ? "#121212" : "#f8f8f7";
      context.fillRect(0, 0, width, height);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.update();
        particle.draw(context);
        if (particle.life <= 0) particles.splice(index, 1);
      }

      if (ripple.active) {
        ripple.radius += 12;
        if (ripple.radius >= 400) ripple.active = false;
      }

      const layers = [
        { ribbons: 15, step: 4, offset: 0, frequency: 0.0035, amplitude: 48, speed: 1.1, primary: true },
        { ribbons: 9, step: 6, offset: 1.2, frequency: 0.0075, amplitude: 26, speed: 0.7, primary: false },
      ];

      layers.forEach((layer) => {
        const gradient = context.createLinearGradient(0, 0, width, 0);
        if (isDark) {
          gradient.addColorStop(0, `rgba(96,28,230,${layer.primary ? 0.05 : 0.015})`);
          gradient.addColorStop(0.5, `rgba(167,139,250,${layer.primary ? 0.62 : 0.22})`);
          gradient.addColorStop(1, `rgba(79,70,229,${layer.primary ? 0.05 : 0.015})`);
        } else {
          gradient.addColorStop(0, `rgba(96,28,230,${layer.primary ? 0.04 : 0.012})`);
          gradient.addColorStop(0.5, `rgba(96,28,230,${layer.primary ? 0.46 : 0.16})`);
          gradient.addColorStop(1, `rgba(129,92,246,${layer.primary ? 0.04 : 0.012})`);
        }

        for (let ribbon = 0; ribbon < layer.ribbons; ribbon += 1) {
          const progress = ribbon / layer.ribbons;
          const yOffset = height * 0.25 + ribbon * (height * 0.035) + layer.offset * 28;
          const baseAlpha = (1 - progress * 0.72) * (isDark ? 0.78 : 0.7);
          const rippleDistortion = ripple.active
            ? Math.sin((time * 2 + progress * Math.PI) * 2) * 7
            : 0;

          context.beginPath();
          for (let x = 0; x <= width + layer.step; x += layer.step) {
            const edgeEnvelope = Math.sin((x / width) * Math.PI);
            const frequencyNoise = 1 + noise(x, time, progress) * 0.18;
            const amplitudeNoise = 1 + noise(x * 2, -time, progress * 0.5) * 0.15;
            const wave =
              Math.sin(x * layer.frequency * frequencyNoise + time * layer.speed + ribbon * 0.18) *
                layer.amplitude *
                edgeEnvelope *
                amplitudeNoise +
              Math.cos(x * 0.008 - time * 0.7 + ribbon * 0.1) * 16 * edgeEnvelope +
              Math.sin(x * 0.018 + time * 1.4) * 6 * edgeEnvelope;

            const pointerWorldX = width / 2 + pointer.x;
            const distanceToPointer = Math.abs(x - pointerWorldX);
            const pointerRadius = layer.primary ? 340 : 210;
            const pointerFactor = Math.exp(-Math.pow(distanceToPointer / pointerRadius, 2));
            const pointerDisplacement =
              Math.sin(x * 0.015 + time * 2.6) * pointerFactor * (layer.primary ? 38 : 20) * edgeEnvelope;

            const distanceToRipple = Math.hypot(x - ripple.x, yOffset - ripple.y);
            const rippleFactor = ripple.active
              ? Math.exp(-Math.pow((distanceToRipple - ripple.radius) / 32, 2))
              : 0;
            const y =
              yOffset +
              wave +
              pointerDisplacement +
              rippleFactor * rippleDistortion * (1.8 - progress) +
              pointer.y * progress * 0.065;

            if (x === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }

          context.globalAlpha = baseAlpha;
          context.strokeStyle = gradient;
          context.lineWidth = (layer.primary ? 1.25 : 0.7) + (1 - progress) * 0.4;
          context.stroke();
        }
      });

      context.globalAlpha = 1;
      if (isVisible && !reducedMotion) frameId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = Boolean(entry?.isIntersecting);
      if (nextVisible && !isVisible && !reducedMotion) {
        isVisible = true;
        lastTime = performance.now();
        frameId = requestAnimationFrame(draw);
      } else {
        isVisible = nextVisible;
        if (!nextVisible) cancelAnimationFrame(frameId);
      }
    });

    resize();
    resizeObserver.observe(parent);
    visibilityObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full touch-pan-y", className)}
    />
  );
}

