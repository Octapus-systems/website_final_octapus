import heroBg from "@/assets/mobile-apps-hero-bg.png";

export function MobileAppsHeroVisual() {
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Main hero background image with scene and phones */}
      <img
        src={heroBg}
        alt=""
        className="h-full w-full object-cover object-right lg:object-center"
        loading="eager"
        fetchPriority="high"
      />
      {/* Soft gradient mask on the left for maximum text contrast and legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent sm:via-background/35 sm:to-transparent lg:w-3/5" />
    </div>
  );
}
