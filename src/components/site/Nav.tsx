import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
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
  description: string;
  to: string;
  external?: boolean;
};

type Category = {
  id: string;
  label: string;
  items: SubItem[];
};

// ---------------------------------------------------------------------------
// Navigation data — using only existing routes
// ---------------------------------------------------------------------------

const COMPANY_ITEMS: SubItem[] = [
  {
    id: "about",
    label: "About",
    description: "Who we are, our mission and the principles we build on.",
    to: "/about",
  },
  {
    id: "team",
    label: "Team",
    description: "The people behind every system we ship.",
    to: "/team",
  },
  {
    id: "careers",
    label: "Careers",
    description: "Join the team building the future of business systems.",
    to: "/careers",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch — sales, support or general enquiries.",
    to: "/contact",
  },
];

// Curated product subset for the mega-menu
const PRODUCTS_PRODUCT_MAP = new Map(products.map((p) => [p.slug, p]));

const PRODUCTS_ITEMS: SubItem[] = [
  {
    id: "all-products",
    label: "All Products",
    description: "Browse the complete Octapus product ecosystem.",
    to: "/products",
  },
  {
    id: "obms-erp",
    label: "O.B.M.S ERP",
    description:
      PRODUCTS_PRODUCT_MAP.get("obms-erp")?.headline ??
      "One operating layer for finance, operations and reporting.",
    to: "/products/obms-erp",
  },
  {
    id: "mr-crm",
    label: "MR. CRM",
    description:
      PRODUCTS_PRODUCT_MAP.get("mr-crm")?.headline ??
      "Sales management shaped to how your team sells.",
    to: "/products/mr-crm",
  },
  {
    id: "custom-ai",
    label: "Custom AI",
    description:
      PRODUCTS_PRODUCT_MAP.get("custom-ai")?.headline ??
      "AI systems designed around your data and your decisions.",
    to: "/products/custom-ai",
  },
  {
    id: "ois",
    label: "OIS",
    description:
      PRODUCTS_PRODUCT_MAP.get("ois")?.headline ??
      "Give your existing systems intelligence.",
    to: "/ois",
  },
];

const SOLUTIONS_ITEMS: SubItem[] = [
  {
    id: "engineering",
    label: "Engineering",
    description:
      "Custom software, web, mobile, APIs, cloud and system integration.",
    to: "/engineering",
  },
  {
    id: "studios",
    label: "Studios",
    description:
      "Brand identity, design, content, video and campaign production.",
    to: "/studios",
  },
  {
    id: "technology",
    label: "Technology",
    description:
      "Engineering, business systems, AI & data and operational support.",
    to: "/technology",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Design & brand and growth — presence connected to conversion.",
    to: "/marketing",
  },
  {
    id: "all-solutions",
    label: "All Solutions",
    description: "Every discipline and service Octapus delivers.",
    to: "/services",
  },
];

const RESOURCES_ITEMS: SubItem[] = [
  {
    id: "industries",
    label: "Industries",
    description:
      "How Octapus systems serve construction, retail, healthcare and more.",
    to: "/industries",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Articles, insights and thinking from the Octapus team.",
    to: "/blog",
  },
  {
    id: "support",
    label: "Support",
    description: "Help centre, documentation and direct support channels.",
    to: "/support",
  },
];

const CATEGORIES: Category[] = [
  { id: "company", label: "Company", items: COMPANY_ITEMS },
  { id: "products", label: "Products", items: PRODUCTS_ITEMS },
  { id: "solutions", label: "Solutions", items: SOLUTIONS_ITEMS },
  { id: "resources", label: "Resources", items: RESOURCES_ITEMS },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const panelVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.16, ease: "easeIn" as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.18, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    x: 8,
    transition: { duration: 0.13, ease: "easeIn" as const },
  },
};

const rightVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.1, ease: "easeIn" as const },
  },
};

// ---------------------------------------------------------------------------
// Right-side panel content
// ---------------------------------------------------------------------------

function RightPanelContent({
  item,
  category,
  onNavigate,
}: {
  item: SubItem;
  category: Category;
  onNavigate: () => void;
}) {
  const isAllProducts = item.id === "all-products";
  const isAllSolutions = item.id === "all-solutions";

  // For "All Products" — show a small product grid
  if (isAllProducts) {
    const featured = [
      PRODUCTS_PRODUCT_MAP.get("obms-erp"),
      PRODUCTS_PRODUCT_MAP.get("mr-crm"),
      PRODUCTS_PRODUCT_MAP.get("custom-ai"),
    ].filter(Boolean);

    return (
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="text-eyebrow mb-1">Products</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Octapus product ecosystem — software that removes specific
            friction from your operation.
          </p>
        </div>
        <div className="grid gap-2 flex-1">
          {featured.map((p) =>
            p ? (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
              >
                <div className="mt-0.5 size-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {p.headline}
                  </div>
                </div>
              </Link>
            ) : null,
          )}
        </div>
        <div className="mt-4 pt-3 border-t hairline">
          <Link
            to="/products"
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all products
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  if (isAllSolutions) {
    return (
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="text-eyebrow mb-1">Solutions</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Six disciplines — engineering, business systems, AI &amp; data,
            operate, design &amp; brand and growth — inside one team.
          </p>
        </div>
        <div className="grid gap-1.5 flex-1">
          {SOLUTIONS_ITEMS.filter((s) => s.id !== "all-solutions").map((s) => (
            <Link
              key={s.id}
              to={s.to as "/"}
              onClick={onNavigate}
              className="group flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent transition-colors"
            >
              <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {s.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t hairline">
          <Link
            to="/services"
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all solutions
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <div className="text-eyebrow mb-1">{category.label}</div>
        <h3 className="text-base font-semibold tracking-tight text-foreground leading-snug">
          {item.label}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Link
          to={item.to as "/"}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Explore {item.label}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mega-menu panel (desktop only)
// ---------------------------------------------------------------------------

function MegaMenuPanel({
  category,
  onNavigate,
}: {
  category: Category;
  onNavigate: () => void;
}) {
  const [activeItem, setActiveItem] = useState<SubItem>(category.items[0]);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset active item when category changes
  useEffect(() => {
    setActiveItem(category.items[0]);
  }, [category.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleHover = useCallback(
    (item: SubItem) => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        setActiveItem(item);
      }, 60);
    },
    [],
  );

  useEffect(
    () => () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    },
    [],
  );

  return (
    <div className="flex gap-0 min-h-[260px]">
      {/* LEFT — item list */}
      <div className="w-56 flex-shrink-0 border-r hairline pr-5 flex flex-col gap-0.5">
        {category.items.map((item) => {
          const isActive = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => handleHover(item)}
              onClick={() => {
                setActiveItem(item);
              }}
              className={cn(
                "group w-full text-left rounded-lg px-3 py-2.5 transition-all duration-150",
                "flex items-center justify-between gap-2",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="text-sm font-medium leading-tight">
                {item.label}
              </span>
              <ChevronRight
                className={cn(
                  "size-3.5 flex-shrink-0 transition-all duration-150",
                  isActive
                    ? "text-primary opacity-100"
                    : "text-muted-foreground opacity-0 group-hover:opacity-60",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* RIGHT — contextual content */}
      <div className="flex-1 pl-6 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeItem.id}
            variants={rightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full"
          >
            <div className="rounded-xl bg-surface/60 border hairline p-5 h-full">
              <RightPanelContent
                item={activeItem}
                category={category}
                onNavigate={onNavigate}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile nav accordion item
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
              transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
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
// Main Nav component
// ---------------------------------------------------------------------------

export function Nav() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const closeMenu = useCallback(() => setActiveCategory(null), []);

  // Close on route change
  useEffect(() => {
    const unsub = router.subscribe("onLoad", closeMenu);
    return unsub;
  }, [router, closeMenu]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeMenu]);

  // Click-outside to close
  useEffect(() => {
    if (!activeCategory) return;
    const handler = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeCategory, closeMenu]);

  const handleCategoryClick = (cat: Category) => {
    setActiveCategory((prev) => (prev?.id === cat.id ? null : cat));
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
      role="banner"
    >
      {/* ── Top bar ──────────────────────────────────────────── */}
      <div
        className={cn(
          "border-b hairline bg-background/90 backdrop-blur-md transition-colors duration-150",
          activeCategory && "border-b-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Wordmark />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`nav-${cat.id}`}
                  aria-expanded={isActive}
                  aria-controls={`mega-panel-${cat.id}`}
                  onClick={() => handleCategoryClick(cat)}
                  className={cn(
                    "relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all duration-150",
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
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary" />
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

          {/* Mobile: hamburger */}
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
                  {mobileOpen ? (
                    <X className="size-5" />
                  ) : (
                    <Menu className="size-5" />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[26rem] overflow-y-auto"
              >
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
                <div className="mt-6 flex flex-col gap-2 pt-4 border-t hairline">
                  <Button asChild className="rounded-full">
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

      {/* ── Mega-menu panel ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            id={`mega-panel-${activeCategory.id}`}
            role="region"
            aria-label={`${activeCategory.label} menu`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 top-full border-b hairline bg-background/95 backdrop-blur-md shadow-lg shadow-foreground/5"
          >
            <div className="container-page py-6">
              {/* Panel header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="text-eyebrow">{activeCategory.label}</div>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation panel"
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Content area — animates on category switch */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeCategory.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <MegaMenuPanel
                    category={activeCategory}
                    onNavigate={closeMenu}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
