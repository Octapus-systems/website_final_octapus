import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Printer,
  RefreshCw,
  Sliders,
  Store,
  UtensilsCrossed,
  Scissors,
  Pill,
  Wrench,
  Truck,
  CreditCard,
  Receipt,
  Sparkles,
  Zap,
} from "lucide-react";
import { Container } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/** Neumorphic/Elevated surface token matching ObmsShowcase styling */
const neo =
  "rounded-3xl bg-[#eef1f7] dark:bg-[#121624] shadow-[8px_8px_20px_rgba(11,21,51,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)] dark:shadow-[6px_6px_16px_rgba(0,0,0,0.5),-4px_-4px_12px_rgba(255,255,255,0.03)] border hairline";

type BusinessType = "retail" | "restaurant" | "salon" | "pharmacy" | "workshop" | "wholesale";

interface BusinessConfig {
  id: BusinessType;
  label: string;
  icon: typeof Store;
  badge: string;
  items: Array<{ name: string; price: string; code: string }>;
  features: string[];
}

const businessConfigs: BusinessConfig[] = [
  {
    id: "retail",
    label: "Retail & Supermarket",
    icon: Store,
    badge: "Barcode & Quick Scan",
    items: [
      { name: "Organic Whole Milk 1L", price: "AED 12.50", code: "SKU-9021" },
      { name: "Artisanal Bread", price: "AED 8.00", code: "SKU-1142" },
      { name: "Arabica Coffee Beans 500g", price: "AED 45.00", code: "SKU-3389" },
    ],
    features: ["Barcode scanning", "Fast checkout", "Scale integration", "Customer loyalty"],
  },
  {
    id: "restaurant",
    label: "Restaurants & Cafes",
    icon: UtensilsCrossed,
    badge: "Tables & Kitchen Display",
    items: [
      { name: "Table #4 — Wagyu Burger", price: "AED 65.00", code: "TBL-04" },
      { name: "Iced Spanish Latte x2", price: "AED 44.00", code: "BEV-12" },
      { name: "Truffle Fries", price: "AED 28.00", code: "KIT-09" },
    ],
    features: ["Table management", "KOT (Kitchen Order Tickets)", "Modifiers & Add-ons", "Split billing"],
  },
  {
    id: "salon",
    label: "Salons & Spas",
    icon: Scissors,
    badge: "Appointments & Staff Splits",
    items: [
      { name: "Signature Haircut & Styling", price: "AED 150.00", code: "SRV-01" },
      { name: "Beard Trim & Treatment", price: "AED 75.00", code: "SRV-04" },
      { name: "Scalp Massage", price: "AED 90.00", code: "SRV-08" },
    ],
    features: ["Stylist commissions", "Appointment booking", "Package billing", "Membership management"],
  },
  {
    id: "pharmacy",
    label: "Pharmacies",
    icon: Pill,
    badge: "Batch & Expiry Control",
    items: [
      { name: "Amoxicillin 500mg (Exp: 10/28)", price: "AED 34.00", code: "BATCH-891" },
      { name: "Vitamin C 1000mg", price: "AED 52.00", code: "BATCH-442" },
      { name: "Digital Thermometer", price: "AED 85.00", code: "DEV-02" },
    ],
    features: ["Batch number tracking", "Expiry alerts", "Prescription records", "Insurance billing"],
  },
  {
    id: "workshop",
    label: "Workshops & Services",
    icon: Wrench,
    badge: "Job Cards & Parts",
    items: [
      { name: "Full Synthetic Oil Change", price: "AED 250.00", code: "JOB-771" },
      { name: "Brake Pad Replacement", price: "AED 380.00", code: "PRT-109" },
      { name: "Labor Charges (2 Hours)", price: "AED 200.00", code: "LBR-02" },
    ],
    features: ["Job card billing", "Parts vs Labor split", "Vehicle / Asset history", "Estimate conversions"],
  },
  {
    id: "wholesale",
    label: "Wholesale & Distributors",
    icon: Truck,
    badge: "Tiered Pricing & Credit",
    items: [
      { name: "Case (24) Bottled Water", price: "AED 420.00", code: "BULK-102" },
      { name: "Pallet Paper Towels (Grade A)", price: "AED 1,850.00", code: "PLT-55" },
      { name: "Credit Terms: 30 Days Net", price: "AED 0.00", code: "CRD-OK" },
    ],
    features: ["Customer tier pricing", "Credit limit controls", "Multi-pack units", "Statement invoicing"],
  },
];

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
  const [activeBiz, setActiveBiz] = useState<BusinessType>("retail");
  const currentConfig = businessConfigs.find((b) => b.id === activeBiz) || businessConfigs[0];

  return (
    <div className="relative space-y-16 md:space-y-24 py-8">
      {/* Banner: Main Core Differentiation */}
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12 border hairline">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3.5 py-1 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" /> Core Philosophy
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Billing software that adapts to the business —{" "}
                <span className="text-primary">not a business that has to adapt to the software.</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                From retail shops and supermarkets to restaurants, salons, pharmacies, workshops, service companies, wholesalers, and distributors — our billing software is configured around your specific workflow.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-background/80 backdrop-blur-sm border hairline shadow-sm text-center min-w-[240px]">
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Adaptation Flow</div>
              <div className="mt-3 font-mono text-sm font-semibold text-foreground flex flex-col gap-1.5">
                <span className="text-primary font-bold">Any Business</span>
                <span className="text-xs text-muted-foreground">↓</span>
                <span className="text-foreground">Any Workflow</span>
                <span className="text-xs text-muted-foreground">↓</span>
                <span className="text-primary font-bold">Customized Billing</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive Billing Terminal Mockup Section */}
      <section className="relative overflow-hidden border-y hairline bg-[var(--color-surface)] py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="text-eyebrow mb-3">Adaptive Interface</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Configured Around Your Operating Reality
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Select your business type below to see how the billing screen, receipt fields, and inventory controls reconfigure to match your exact industry workflow.
            </p>

            {/* Business Type Selector Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {businessConfigs.map((b) => {
                const Icon = b.icon;
                const isActive = b.id === activeBiz;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setActiveBiz(b.id);
                      trackEvent("product_engagement", { feature: "billing_biz_switch", business: b.id });
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground border hairline"
                    }`}
                  >
                    <Icon className="size-4" />
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* POS Screen Simulation */}
          <div className={`${neo} p-4 md:p-8 max-w-5xl mx-auto overflow-hidden`}>
            <div className="rounded-2xl bg-background border hairline overflow-hidden shadow-2xl">
              {/* Header Bar of POS */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b hairline px-6 py-4 bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="font-semibold text-sm md:text-base text-foreground">
                    Octapus POS Terminal — <span className="text-primary">{currentConfig.label} Mode</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                    {currentConfig.badge}
                  </span>
                </div>
              </div>

              {/* Grid content of POS */}
              <div className="grid gap-6 p-6 lg:grid-cols-12">
                {/* Items & Cart View */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Item & Description</span>
                    <span>Price</span>
                  </div>
                  <div className="space-y-2.5">
                    {currentConfig.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border hairline bg-card p-3.5 transition-transform hover:translate-x-1"
                      >
                        <div className="space-y-0.5">
                          <div className="text-sm font-semibold text-foreground">{item.name}</div>
                          <div className="font-mono text-[11px] text-muted-foreground">{item.code}</div>
                        </div>
                        <div className="font-semibold text-sm text-foreground">{item.price}</div>
                      </div>
                    ))}
                  </div>

                  {/* Feature Tags for this mode */}
                  <div className="pt-4 border-t hairline">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">Configured Module Highlights:</div>
                    <div className="flex flex-wrap gap-2">
                      {currentConfig.features.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs rounded-md bg-secondary px-2.5 py-1 text-secondary-foreground">
                          <CheckCircle2 className="size-3 text-emerald-500" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bill Summary & Payment Box */}
                <div className="lg:col-span-5 rounded-2xl bg-muted/40 p-5 border hairline space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b hairline">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order Summary</span>
                      <span className="text-xs font-mono text-primary font-bold">LIVE BILL</span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono text-foreground font-semibold">Calculated Live</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT (5% Configured)</span>
                        <span className="font-mono text-foreground font-semibold">Auto Tax Rule</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount / Promo</span>
                        <span className="font-mono text-emerald-600 font-semibold">Custom Rule</span>
                      </div>
                      <div className="pt-3 border-t hairline flex justify-between items-baseline text-foreground">
                        <span className="font-bold text-sm">Total Payable</span>
                        <span className="font-bold font-mono text-lg text-primary">AED Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                      <div className="flex items-center justify-center gap-1.5 rounded-xl border hairline bg-background py-2 text-foreground">
                        <CreditCard className="size-3.5 text-primary" /> Card / POS
                      </div>
                      <div className="flex items-center justify-center gap-1.5 rounded-xl border hairline bg-background py-2 text-foreground">
                        <Receipt className="size-3.5 text-emerald-500" /> Thermal Print
                      </div>
                    </div>
                    <Button className="w-full rounded-xl text-xs font-semibold py-5">
                      Process Sale & Issue Invoice <ArrowRight className="ml-1 size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION: Use Your Existing Printer (STRONG EMPHASIS) */}
      <Container>
        <div className={`${neo} p-8 md:p-12 overflow-hidden relative border border-primary/20`}>
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Printer className="size-4" /> Hardware Compatibility Guarantee
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Use Your Existing Printer. <span className="text-primary block mt-1">Keep It.</span>
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Already have a billing, receipt, or invoice printer? <strong className="text-foreground font-semibold">Keep it.</strong> Our billing system can be configured to work with your existing printing setup, helping you avoid unnecessary hardware changes and additional costs.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Thermal Receipt Printers (58mm / 80mm)",
                  "ESC / POS Command Drivers",
                  "A4 / A5 Tax Invoice Printers",
                  "USB, LAN & Bluetooth Connections",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-background border hairline p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b hairline pb-3">
                  <div className="flex items-center gap-2">
                    <Printer className="size-5 text-primary" />
                    <span className="font-semibold text-sm text-foreground">Printer Setup</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/15 text-emerald-600 px-2.5 py-0.5">
                    Connected & Ready
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-muted-foreground">
                  <div className="p-3 rounded-xl bg-muted/30 border hairline flex justify-between items-center">
                    <span>Thermal Receipt (80mm)</span>
                    <span className="text-emerald-500 font-bold">Auto-Cut ON</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border hairline flex justify-between items-center">
                    <span>Network A4 Invoice Printer</span>
                    <span className="text-emerald-500 font-bold font-mono">LAN 192.168.1.50</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border hairline flex justify-between items-center">
                    <span>Kitchen / Lab Remote Printer</span>
                    <span className="text-primary font-bold">Port 9100</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-xs text-muted-foreground font-medium">Zero forced hardware purchases. Zero lock-in.</span>
                </div>
              </div>
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
        <div className="relative overflow-hidden rounded-3xl bg-surface-dark dark:bg-card text-foreground p-8 md:p-16 border hairline text-center space-y-8">
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
