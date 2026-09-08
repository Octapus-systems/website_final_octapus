import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  RefreshCw,
  Sliders,
  Zap,
} from "lucide-react";
import { Container } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/** Neumorphic/Elevated surface token matching ObmsShowcase styling */
const neo =
  "rounded-3xl bg-[#eef1f7] dark:bg-[#121624] shadow-[8px_8px_20px_rgba(11,21,51,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)] dark:shadow-[6px_6px_16px_rgba(0,0,0,0.5),-4px_-4px_12px_rgba(255,255,255,0.03)] border hairline";

const customizationGrid = [
  { title: "Products & SKUs", desc: "Variants, barcodes, serial numbers, composite packs, or service items." },
  { title: "Custom Pricing", desc: "Retail rates, wholesale tiers, contract pricing, and happy-hour rules." },
  { title: "Taxes & VAT", desc: "Local VAT rates, zero-rated exports, tax exemptions, and automatic totals." },
  { title: "Discounts & Offers", desc: "Percentage cuts, flat rebates, volume discounts, and promo coupons." },
  { title: "User Permissions", desc: "Cashier roles, manager overrides, void approvals, and drawer auditing." },
  { title: "Printer Integration", desc: "Thermal receipt, kitchen ticket, dot-matrix, Bluetooth, or A4/A5 invoices." },
  { title: "Custom Reports", desc: "Daily sales summaries, hourly volume, margin analysis, and tax filings." },
  { title: "Inventory Control", desc: "Real-time stock deduction, low-stock triggers, multi-warehouse sync." },
  { title: "Payment Methods", desc: "Cash, card POS terminals, Tap & Pay, split tenders, and store credit." },
  { title: "Daily Workflow", desc: "Shift openings, drawer cash reconciliations, end-of-day Z-reports." },
];

export function BillingShowcase({ product }: { product: Product }) {
  return (
    <div className="relative space-y-16 md:space-y-24 py-8">
      {/* Banner: Main Core Differentiation */}
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12 border hairline">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4 text-left">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Billing & POS software that adapts to the business —{" "}
                <span className="text-primary">not a business that has to adapt to the software.</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                From retail shops and supermarkets to restaurants, salons, pharmacies, workshops, service companies, wholesalers, and distributors — Beep is configured around your specific workflow.
              </p>
            </div>
            <div className="flex flex-col justify-center p-6 rounded-2xl bg-background/80 backdrop-blur-sm border hairline shadow-sm text-left max-w-sm">
              <p className="text-sm text-foreground font-medium leading-relaxed">
                Using the app, there are many more such custom features, tools, and tailored capabilities built around the app to fit your daily business operations.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* SECTION: Want a System Like Another Software? (STRONG EMPHASIS) */}
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <RefreshCw className="size-4" /> Smooth Transition & Parity
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Want a System Like Another Software?
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Already using a billing or POS system and want something similar — but better suited to your business?
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We can study your existing workflow, understand what works, identify what doesn't, and build a customized system around your actual requirements.
            </p>

            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-foreground font-semibold text-base md:text-lg">
              "You don't have to change your business to fit the software."
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className={`${neo} p-6 space-y-4`}>
              <div className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sliders className="size-4 text-primary" /> Workflow Engineering Approach
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl bg-background p-4 border hairline space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Legacy Off-the-Shelf Tools</span>
                    <span className="text-red-500">Rigid Constraints</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Forces you to change receipt formats, tax calculations, cashier steps, and reports to fit standard templates.
                  </p>
                </div>

                <div className="flex justify-center text-primary font-bold text-lg">
                  ↓
                </div>

                <div className="rounded-2xl bg-primary/15 p-4 border border-primary/30 space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-primary">
                    <span>Octapus Custom Billing</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Tailored</span>
                  </div>
                  <p className="text-xs text-foreground font-medium">
                    Rebuilds your favorite features, eliminates annoying bugs, and shapes the system entirely around your daily team workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* SECTION: The Software Fits Your Business. (STRONG EMPHASIS) */}
      <section className="relative overflow-hidden border-y hairline bg-[var(--color-surface)] py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <div className="text-eyebrow mb-3">Modular Customization</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              The Software Fits Your Business.
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Every business works differently. That's why we customize the system around every component of your daily operations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {customizationGrid.map((c, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-background border hairline p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-primary">0{i + 1}</span>
                    <span className="size-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-foreground">{c.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Callout box */}
          <div className="mt-12 text-center max-w-2xl mx-auto p-8 rounded-3xl bg-background border hairline shadow-xl space-y-3">
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Our Promise</div>
            <div className="text-xl md:text-2xl font-bold text-foreground">
              Tell us how your business works. <span className="text-primary block mt-1">We'll build the system around it.</span>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION: One Platform. Your Way. (STRONG EMPHASIS & CTA) */}
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-surface dark:bg-surface-dark text-foreground p-8 md:p-16 border hairline text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold text-primary">
            <Zap className="size-4" /> One Platform. Your Way.
          </div>

          <h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            Any Business. Any Workflow. <span className="text-primary block mt-2">Built Around Your Needs.</span>
          </h2>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready for a billing system that fits your products, pricing, printers, and people? Let's discuss your requirements today.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold"
              onClick={() => trackEvent("product_enquiry", { product: product.slug })}
            >
              <Link to="/contact">
                Talk about {product.name} <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold"
            >
              <Link to="/book">Book a strategy call</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
