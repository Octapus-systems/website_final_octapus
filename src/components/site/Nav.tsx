import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { products } from "@/lib/site";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SubItem = {
  id: string;
  label: string;
  to: string; // resolved URL path — used for both Link href and iframe src
};

type Category = {
  id: string;
  label: string;
  items: SubItem[];
};

// ---------------------------------------------------------------------------
// Navigation data — only existing routes, no invented content
// ---------------------------------------------------------------------------

const PM = new Map(products.map((p) => [p.slug, p]));

const COMPANY_ITEMS: SubItem[] = [
  { id: "about",   label: "About",   to: "/about" },
  { id: "team",    label: "Team",    to: "/team" },
  { id: "careers", label: "Careers", to: "/careers" },
  { id: "contact", label: "Contact", to: "/contact" },
];

const PRODUCTS_ITEMS: SubItem[] = [
  { id: "all-products", label: "All Products",              to: "/products" },
  { id: "obms-erp",     label: PM.get("obms-erp")?.name  ?? "O.B.M.S ERP", to: "/products/obms-erp" },
  { id: "custom-ai",    label: PM.get("custom-ai")?.name ?? "Custom AI",   to: "/products/custom-ai" },
  { id: "ois",          label: "OIS",                       to: "/ois" },
];

const SOLUTIONS_ITEMS: SubItem[] = [
  { id: "engineering",   label: "Engineering",   to: "/engineering" },
  { id: "studios",       label: "Studios",       to: "/studios" },
  { id: "technology",    label: "Technology",    to: "/technology" },
  { id: "marketing",     label: "Marketing",     to: "/marketing" },
  { id: "all-solutions", label: "All Solutions", to: "/services" },
];

const RESOURCES_ITEMS: SubItem[] = [
  { id: "industries", label: "Industries", to: "/industries" },
  { id: "blog",       label: "Blog",       to: "/blog" },
  { id: "support",    label: "Support",    to: "/support" },
];

const CATEGORIES: Category[] = [
  { id: "company",   label: "Company",   items: COMPANY_ITEMS },
  { id: "products",  label: "Products",  items: PRODUCTS_ITEMS },
  { id: "solutions", label: "Solutions", items: SOLUTIONS_ITEMS },
  { id: "resources", label: "Resources", items: RESOURCES_ITEMS },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const panelVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" as const } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.15, ease: "easeIn" as const } },
};

const switchVariants = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.18, ease: "easeOut" as const } },
  exit:    { opacity: 0, x: 10, transition: { duration: 0.12, ease: "easeIn" as const } },
};

const previewVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" as const } },
  exit:    { opacity: 0, transition: { duration: 0.1,  ease: "easeIn" as const } },
};

// ---------------------------------------------------------------------------
// IframePreview — renders the actual page in a scrollable iframe
// ---------------------------------------------------------------------------

function IframePreview({
  src,
  title,
  onPreviewClick,
}: {
  src: string;
  title: string;
  onPreviewClick?: () => void;
}) {
  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Non-passive wheel handler: forwards scroll deltas to the iframe's document
  // without letting the host page scroll.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        iframeRef.current?.contentWindow?.scrollBy({ top: e.deltaY });
      } catch {
        // Silently ignore if contentWindow is unavailable
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // After the iframe page loads, inject CSS to hide the site's own header and
  // footer (they would be confusing nested inside the mega-menu).
  const handleLoad = useCallback(() => {
    setLoaded(true);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      if (doc.getElementById("__octapus_preview_style")) return;
      const style = doc.createElement("style");
      style.id = "__octapus_preview_style";
      style.textContent = `
        header[role="banner"], header, footer, [data-floating-actions] {
          display: none !important;
        }
        #main { padding-top: 0 !important; }
        html, body { overflow-x: hidden !important; }
      `;
      doc.head.appendChild(style);
    } catch {
      // Cross-origin or document unavailable — silently ignore
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden rounded-xl border hairline bg-surface/30",
        onPreviewClick && "cursor-pointer",
      )}
      aria-label={`Preview of ${title} — click to open`}
      onClick={onPreviewClick}
    >
      {/* Loading skeleton */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="absolute inset-0 flex flex-col gap-3 p-6 pointer-events-none"
          >
            <div className="h-5 w-36 rounded-md bg-muted animate-pulse" />
            <div className="h-3 w-full rounded bg-muted animate-pulse" />
            <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
            <div className="h-3 w-3/5 rounded bg-muted animate-pulse" />
            <div className="mt-3 h-40 w-full rounded-xl bg-muted animate-pulse" />
            <div className="h-3 w-full rounded bg-muted animate-pulse" />
            <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-muted animate-pulse" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="h-24 rounded-lg bg-muted animate-pulse" />
              <div className="h-24 rounded-lg bg-muted animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        The actual page preview.
        pointer-events: none → read-only; prevents iframe-internal navigation.
        Scroll is driven by the wheel handler above.
        Click is handled by the parent container div → onPreviewClick.
      */}
      <iframe
        ref={iframeRef}
        src={src}
        onLoad={handleLoad}
        title={`${title} — page preview`}
        tabIndex={-1}
        className={cn(
          "absolute inset-0 w-full h-full border-none transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
        style={{ pointerEvents: "none" }}
      />

      {/* Bottom fade + interaction hint */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background/75 to-transparent pointer-events-none flex items-end px-4 pb-2">
        <span className="text-eyebrow text-[9px] opacity-40 tracking-[0.2em]">
          Scroll to explore · Click to open
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MegaMenuPanel — left item list + right iframe preview
// ---------------------------------------------------------------------------

function MegaMenuPanel({
  category,
  onNavigate,
  isScrollIdle,
  onClose,
}: {
  category: Category;
  onNavigate: () => void;
  isScrollIdle?: boolean;
  onClose?: () => void;
}) {
  const [activeItem, setActiveItem] = useState<SubItem>(category.items[0]);
  const hoverTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate    = useNavigate();

  // Reset to the first item whenever the parent category changes
  useEffect(() => {
    setActiveItem(category.items[0]);
    return () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); };
  }, [category.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hover delay avoids preview flickering when the mouse passes quickly
  const handleItemHover = useCallback((item: SubItem) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveItem(item), 60);
  }, []);

  // Clicking the preview navigates to the active item's page
  const handlePreviewClick = useCallback(() => {
    navigate({ to: activeItem.to as "/" });
    onNavigate(); // close the menu
  }, [activeItem.to, navigate, onNavigate]);

  return (
    <div className="flex gap-0 h-full">
      {/* LEFT — item list */}
      <div className="w-52 flex-shrink-0 border-r hairline pr-4 flex flex-col gap-0.5 overflow-y-auto">
        {category.items.map((item) => {
          const isActive = item.id === activeItem.id;
          return (
            <Link
              key={item.id}
              to={item.to as "/"}
              onMouseEnter={() => handleItemHover(item)}
              onClick={onNavigate}
              className={cn(
                "group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5",
                "text-sm font-medium leading-tight transition-all duration-150",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
              aria-current={isActive ? "true" : undefined}
            >
              <span>{item.label}</span>
              <ChevronRight
                className={cn(
                  "size-3.5 flex-shrink-0 transition-all duration-150",
                  isActive
                    ? "text-primary opacity-100"
                    : "text-muted-foreground opacity-0 group-hover:opacity-60",
                )}
              />
            </Link>
          );
        })}
      </div>

      {/* RIGHT — live iframe page preview */}
      <div className="flex-1 pl-5 min-w-0 h-full">
        <div className="relative w-full h-full">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation panel"
              className={cn(
                "absolute top-2 left-1/2 -translate-x-1/2 z-50",
                "inline-flex size-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-md border hairline shadow-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300",
                isScrollIdle ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              )}
            >
              <X className="size-5" />
            </button>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              variants={previewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <IframePreview
                src={activeItem.to}
                title={activeItem.label}
                onPreviewClick={handlePreviewClick}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MobileCategory — accordion item for the Sheet drawer
// ---------------------------------------------------------------------------

function MobileCategory({
  category,
  onNavigate,
}: {
  category: Category;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b hairline last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between py-4 text-base font-medium text-foreground"
        aria-expanded={open}
      >
        {category.label}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.22, ease: "easeOut" as const },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.16, ease: "easeIn" as const },
            }}
            className="overflow-hidden"
          >
            <div className="pb-4 flex flex-col gap-0.5">
              {category.items.map((item) => (
                <Link
                  key={item.id}
                  to={item.to as "/"}
                  onClick={onNavigate}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <ChevronRight className="size-3.5 text-muted-foreground/50 flex-shrink-0" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scroll Idle Hook (hides close button on scroll)
// ---------------------------------------------------------------------------

function usePanelScrollIdle(active: boolean, delay = 500) {
  const [idle, setIdle] = useState(true);

  useEffect(() => {
    if (!active) {
      setIdle(true);
      return;
    }
    
    let timer: ReturnType<typeof setTimeout>;
    const onActivity = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), delay);
    };

    window.addEventListener("wheel", onActivity, { passive: true, capture: true });
    window.addEventListener("touchmove", onActivity, { passive: true, capture: true });
    
    return () => {
      window.removeEventListener("wheel", onActivity, { capture: true });
      window.removeEventListener("touchmove", onActivity, { capture: true });
      clearTimeout(timer);
    };
  }, [active, delay]);

  return idle;
}

// ---------------------------------------------------------------------------
// Nav — main export
// ---------------------------------------------------------------------------

export function Nav() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const isScrollIdle = usePanelScrollIdle(!!activeCategory);

  const headerRef     = useRef<HTMLElement>(null);
  const openTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Stable ref so hover callbacks can read the latest category without being recreated
  const activeCatRef  = useRef<Category | null>(null);
  activeCatRef.current = activeCategory;

  const router = useRouter();

  // ── Helpers ──────────────────────────────────────────────────────────────

  const clearOpen  = () => { if (openTimerRef.current)  { clearTimeout(openTimerRef.current);  openTimerRef.current  = null; } };
  const clearClose = () => { if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; } };

  const closeMenu = useCallback(() => {
    clearOpen();
    clearClose();
    setActiveCategory(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Side-effects ─────────────────────────────────────────────────────────

  // Close whenever the router navigates to a new page
  useEffect(() => {
    const unsub = router.subscribe("onLoad", closeMenu);
    return unsub;
  }, [router, closeMenu]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  // Cleanup timers on unmount
  useEffect(() => () => { clearOpen(); clearClose(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Hover handlers ───────────────────────────────────────────────────────

  /**
   * Called when the mouse enters one of the four category buttons.
   * - Panel already open → switch category immediately, no gap.
   * - Panel closed → open after 100 ms intent delay to filter accidental overs.
   */
  const handleCategoryEnter = useCallback((cat: Category) => {
    clearClose();
    if (activeCatRef.current) {
      clearOpen();
      setActiveCategory(cat);
    } else {
      clearOpen();
      openTimerRef.current = setTimeout(() => {
        setActiveCategory(cat);
        openTimerRef.current = null;
      }, 100);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Called when the mouse leaves the entire <header> element.
   * The mega-panel is a DOM child of <header>, so moving from the top bar
   * into the panel does NOT fire this event.
   * A 250 ms grace period lets the user move from the top bar into the panel
   * without the menu closing.
   */
  const handleNavLeave = useCallback(() => {
    clearOpen();
    closeTimerRef.current = setTimeout(() => {
      setActiveCategory(null);
      closeTimerRef.current = null;
    }, 250);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** Cancel any pending close when the mouse re-enters the <header>. */
  const handleNavEnter = useCallback(() => {
    clearClose();
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <header
      ref={headerRef}
      /*
       * z-[200] ensures the header and its absolutely-positioned mega-panel sit
       * above FloatingActions and any other fixed/sticky UI (which typically
       * use z-50 – z-[100]).
       */
      className="sticky top-0 z-[200]"
      role="banner"
      onMouseEnter={handleNavEnter}
      onMouseLeave={handleNavLeave}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "border-b hairline bg-background/90 backdrop-blur-md transition-colors duration-200",
          activeCategory && "border-b-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Wordmark />

          {/* Desktop primary nav */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`nav-${cat.id}`}
                  aria-haspopup="true"
                  aria-expanded={isActive}
                  aria-controls="mega-menu-panel"
                  onMouseEnter={() => handleCategoryEnter(cat)}
                  onClick={() => isActive ? closeMenu() : handleCategoryEnter(cat)}
                  className={cn(
                    "relative inline-flex items-center gap-1 px-3 py-2 rounded-lg",
                    "text-sm transition-all duration-150 select-none",
                    isActive
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                  )}
                >
                  {cat.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      isActive && "rotate-180",
                    )}
                  />
                  {/* Purple underline indicator when category is active */}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-0.5 w-5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle className="-translate-x-1" />
            <Button asChild size="sm" className="rounded-full px-5">
              <Link to="/book">Book a Strategy Call</Link>
            </Button>
          </div>

          {/* Mobile: hamburger + Sheet */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  id="mobile-menu-trigger"
                  className="inline-flex size-11 items-center justify-center rounded-md text-foreground"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[26rem] overflow-y-auto">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-semibold tracking-tight">
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col">
                  {CATEGORIES.map((cat) => (
                    <MobileCategory
                      key={cat.id}
                      category={cat}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t hairline">
                  <Button asChild className="w-full rounded-full">
                    <Link to="/book" onClick={() => setMobileOpen(false)}>
                      Book a Strategy Call
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ── Mega-menu panel ─────────────────────────────────────────────── */}
      {/*
        key="mega-panel" is intentionally FIXED so React reuses the same DOM
        node across category switches. AnimatePresence only runs enter/exit
        animations when activeCategory flips null ↔ non-null.
        Category switches are handled by the inner AnimatePresence (switchVariants).

        h-[calc(100vh-4rem)]: fills exactly the viewport area below the 4rem header.
        overflow-hidden: clips the panel to prevent underlying-page bleed-through.
        bg-background: fully opaque — covers FloatingActions and all page content.
      */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            key="mega-panel"
            id="mega-menu-panel"
            role="region"
            aria-label={`${activeCategory.label} navigation`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 top-full border-b hairline bg-background backdrop-blur-md shadow-2xl shadow-foreground/10 overflow-hidden"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            {/* Inner layout: flex-col so the preview fills all remaining space */}
            <div className="container-page h-full flex flex-col py-5">
              {/* Panel header — category label animates on switch */}
              <div className="mb-4 flex items-center flex-shrink-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeCategory.id + "-label"}
                    variants={switchVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-eyebrow"
                  >
                    {activeCategory.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/*
                Panel body: flex-1 + min-h-0 lets it expand to fill remaining height.
                The inner motion.div switches with switchVariants on category change.
              */}
              <div className="flex-1 min-h-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCategory.id}
                    variants={switchVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full"
                  >
                    <MegaMenuPanel
                      category={activeCategory}
                      onNavigate={closeMenu}
                      isScrollIdle={isScrollIdle}
                      onClose={closeMenu}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
