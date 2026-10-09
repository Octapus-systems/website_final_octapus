"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type PeepRect = [number, number, number, number];

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  className?: string;
}

interface Peep {
  image: HTMLImageElement;
  rect: PeepRect;
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  render: (context: CanvasRenderingContext2D) => void;
}

const CROWD_SPRITE =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const randomRange = (min: number, max: number) => min + Math.random() * (max - min);

export function CrowdCanvas({ src, rows = 15, cols = 7, className }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let disposed = false;
    let initialized = false;
    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];
    const image = new Image();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createPeep = (rect: PeepRect): Peep => {
      const peep: Peep = {
        image,
        rect,
        width: rect[2],
        height: rect[3],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        render: (ctx) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          );
          ctx.restore();
        },
      };

      return peep;
    };

    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      const startX = direction === 1 ? -peep.width : stage.width + peep.width;
      const endX = direction === 1 ? stage.width : 0;

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      peep.scaleX = direction;

      return { startY, endX };
    };

    const addPeepToCrowd = () => {
      const index = Math.floor(Math.random() * availablePeeps.length);
      const [peep] = availablePeeps.splice(index, 1);
      if (!peep) return;

      const { startY, endX } = resetPeep(peep);
      const xDuration = 10;
      const yDuration = 0.25;
      const walk = gsap.timeline({
        onComplete: () => {
          if (disposed) return;
          const crowdIndex = crowd.indexOf(peep);
          if (crowdIndex >= 0) crowd.splice(crowdIndex, 1);
          availablePeeps.push(peep);
          addPeepToCrowd();
        },
      });

      walk.timeScale(randomRange(0.5, 1.5));
      walk.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      walk.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
          ease: "power1.inOut",
        },
        0,
      );

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      walk.progress(Math.random());
      if (reduceMotion) walk.pause();
    };

    const render = () => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      crowd.forEach((peep) => peep.render(context));
      context.setTransform(1, 0, 0, 1, 0, 0);
    };

    const resize = () => {
      if (!initialized) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = Math.round(stage.width * pixelRatio);
      canvas.height = Math.round(stage.height * pixelRatio);

      crowd.forEach((peep) => peep.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      while (availablePeeps.length) addPeepToCrowd();
      if (reduceMotion) render();
    };

    image.onload = () => {
      if (disposed) return;
      const rectWidth = image.naturalWidth / rows;
      const rectHeight = image.naturalHeight / cols;

      for (let index = 0; index < rows * cols; index += 1) {
        allPeeps.push(
          createPeep([
            (index % rows) * rectWidth,
            Math.floor(index / rows) * rectHeight,
            rectWidth,
            rectHeight,
          ]),
        );
      }

      initialized = true;
      resize();
      if (!reduceMotion) gsap.ticker.add(render);
    };

    image.src = src;
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      disposed = true;
      image.onload = null;
      resizeObserver.disconnect();
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
    };
  }, [cols, rows, src]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-x-0 bottom-0 h-full w-full", className)}
    />
  );
}

interface Skiper39Props {
  className?: string;
}

export function Skiper39({ className }: Skiper39Props) {
  return (
    <section
      aria-labelledby="studios-crowd-title"
      className={cn(
        "relative isolate h-[38rem] w-full overflow-hidden border-y border-black/10 bg-white text-black md:h-[46rem]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(96,28,230,0.13),transparent_36%)]" />
      <div className="container-page relative z-10 grid justify-items-center pt-12 text-center md:pt-16">
        <span className="text-eyebrow text-black/50">Octapus Studios · Ideas in motion</span>
        <h2
          id="studios-crowd-title"
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Creative work is built for people.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/55 md:text-base">
          Strategy, identity and content moving together—made to earn attention and turn it into
          action.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[72%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%)]">
        <CrowdCanvas src={CROWD_SPRITE} rows={15} cols={7} />
      </div>
    </section>
  );
}

export default Skiper39;
