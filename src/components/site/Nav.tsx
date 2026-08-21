import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MoreVertical } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { products } from "@/lib/site";

const nav = [
  { to: "/engineering", label: "Engineering" },
  { to: "/studios", label: "Studios" },
  { to: "/ois", label: "OIS" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;


function ProductGrid({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {products.map((p) => (
        <Link
          key={p.slug}
          to="/products/$slug"
          params={{ slug: p.slug }}
          onClick={onNavigate}
          className="group rounded-lg p-3 hover:bg-accent transition-colors"
        >
          <div className="text-eyebrow text-[11px] uppercase tracking-wider text-muted-foreground">
            {p.tags.join(" · ")}
          </div>
          <div className="mt-1 text-sm font-medium text-foreground group-hover:text-primary">
            {p.name}
          </div>
          <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {p.headline}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Wordmark />
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 xl:gap-8">
          <Popover open={productsOpen} onOpenChange={setProductsOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Products menu"
                aria-expanded={productsOpen}
              >
                Products
                <MoreVertical className="size-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={12}
              className="w-[min(36rem,92vw)] max-h-[80vh] overflow-y-auto p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-eyebrow text-muted-foreground">Products</div>
                  <h2 className="text-lg font-semibold tracking-tight">The Octapus ecosystem</h2>
                </div>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <Link to="/products" onClick={() => setProductsOpen(false)}>
                    View all
                  </Link>
                </Button>
              </div>
              <ProductGrid onNavigate={() => setProductsOpen(false)} />
            </PopoverContent>
          </Popover>

          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle className="-translate-x-1" />
          <Button asChild size="sm" className="rounded-full px-5">
            <Link to="/book">Book a Strategy Call</Link>
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <Sheet open={mobileProductsOpen} onOpenChange={setMobileProductsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-md text-foreground"
                aria-label="Products menu"
                aria-expanded={mobileProductsOpen}
              >
                <MoreVertical className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[28rem] overflow-y-auto">
              <SheetHeader className="text-left">
                <SheetTitle className="text-2xl font-semibold tracking-tight">Products</SheetTitle>
                <p className="text-sm text-muted-foreground">Every product removes one specific kind of friction.</p>
              </SheetHeader>
              <div className="mt-6">
                <ProductGrid onNavigate={() => setMobileProductsOpen(false)} />
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link to="/products" onClick={() => setMobileProductsOpen(false)}>View all products</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/book" onClick={() => setMobileProductsOpen(false)}>Book a Strategy Call</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div className={cn("lg:hidden border-t hairline", open ? "block" : "hidden")}>
        <nav aria-label="Mobile" className="container-page py-4 flex flex-col gap-1">
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="py-3 text-base text-foreground"
          >
            Products
          </Link>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="flex-1 rounded-full">
              <Link to="/book" onClick={() => setOpen(false)}>Book a Strategy Call</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

