import { useRef } from "react";
import { OctopusSystemIllustration } from "@/components/site/OctopusSystemIllustration";

export function HeroSystemCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(1100px) rotateX(${y * -3.5}deg) rotateY(${x * 4.5}deg) translateY(-2px)`;
  };

  const reset = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div className="mt-14 w-full max-w-[660px] [perspective:1100px] sm:mt-16 xl:absolute xl:-top-24 xl:right-0 xl:mt-0 xl:max-w-[190px]">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        className="silver-scene-card relative overflow-hidden rounded-[2rem] border border-white/90 transition-transform duration-300 ease-out motion-reduce:transform-none sm:rounded-[2.5rem]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-[10%] top-px h-px bg-gradient-to-r from-transparent via-white to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute -left-20 top-10 size-64 rounded-full bg-white/70 blur-3xl"
        />
        <OctopusSystemIllustration
          scene="systems"
          title="Octapus connected business system"
          description="A silver octopus connects customers, teams, operations and information into one working system"
          className="relative w-full"
        />
      </div>
    </div>
  );
}
