import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  ExternalLink,
  FileText,
  Layers,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { obmsMetrics, type Product } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import businessPhoto from "@/assets/obms-business.jpg";

const moduleIcons = [
  { label: "Sales", icon: BarChart3, color: "#2563eb" },
  { label: "Purchase", icon: ShoppingCart, color: "#0ea5e9" },
  { label: "Inventory", icon: Boxes, color: "#7c3aed" },
  { label: "Finance", icon: Wallet, color: "#059669" },
  { label: "HR & Payroll", icon: Users, color: "#e11d48" },
  { label: "Reports", icon: FileText, color: "#f59e0b" },
];

const cmsRows = [
  { name: "Homepage", status: "Published", tone: "#059669" },
  { name: "Products", status: "Draft", tone: "#f59e0b" },
  { name: "Case studies", status: "Scheduled", tone: "#2563eb" },
];

/** Soft neumorphic surface on a light gray canvas. */
const neo =
  "rounded-3xl bg-[#eef1f7] shadow-[8px_8px_20px_rgba(11,21,51,0.10),-8px_-8px_20px_rgba(255,255,255,0.95)]";

export function ObmsShowcase({ product }: { product: Product }) {
  return (
    <section className="relative overflow-hidden border-y border-[#0b1533]/8 bg-[#f6f8fc]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(11,21,51,0.10) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-8rem] h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle,#93b4ff 0%, transparent 70%)" }}
      />

      <Container className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2563eb]">
            Enterprise resource planning
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.02] text-[#0b1533]">
            One panel to run{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
              the whole business
            </span>
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[#0b1533]/65">
            {product.outcome}
          </p>
        </div>

        {/* Module tiles */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {moduleIcons.map((m, i) => (
            <div
              key={m.label}
              style={{ animationDelay: `${i * 70}ms` }}
              className={`${neo} flex min-w-[7rem] animate-fade-in flex-col items-center gap-2 px-5 py-4 transition-transform duration-300 hover:-translate-y-1`}
            >
              <span
                className="grid size-10 place-items-center rounded-2xl"
                style={{ backgroundColor: `${m.color}14` }}
              >
                <m.icon className="size-5" style={{ color: m.color }} />
              </span>
              <span className="text-xs font-semibold text-[#0b1533]">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Main stage: dashboard + floating cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Dashboard */}
          <div className={`${neo} lg:col-span-7 overflow-hidden p-3`}>
            <div className="rounded-[1.25rem] bg-white shadow-[0_20px_50px_-30px_rgba(11,21,51,0.5)]">
              <div className="flex items-center justify-between border-b border-[#0b1533]/8 px-5 py-4">
                <div className="text-sm font-semibold text-[#0b1533]">O.B.M.S Dashboard</div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#2563eb]/25" />
                  <span className="size-2.5 rounded-full bg-[#2563eb]/45" />
                  <span className="size-2.5 animate-pulse rounded-full bg-[#2563eb]" />
                </div>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-3">
                {obmsMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl bg-[#f5f8ff] p-4 ring-1 ring-[#2563eb]/10 transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(37,99,235,0.7)]"
                  >
                    <div className="text-[11px] font-medium text-[#0b1533]/55">{m.label}</div>
                    <div className="mt-1.5 text-xl font-bold tracking-tight text-[#0b1533]">
                      {m.value}
                    </div>
                    <div className="mt-1 text-[11px] text-[#0b1533]/50">{m.detail}</div>
                  </div>
                ))}
              </div>
              {/* Simple animated bar chart */}
              <div className="flex h-32 items-end gap-2 px-5 pb-5">
                {[38, 62, 45, 78, 55, 88, 70, 96].map((h, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-[#2563eb] to-[#7c3aed] transition-all duration-700"
                      style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right stack */}
          <div className="lg:col-span-5 space-y-6">
            {/* Business connection photo */}
            <div className={`${neo} overflow-hidden p-3`}>
              <img
                src={businessPhoto}
                alt="Business team reviewing connected ERP data together"
                loading="lazy"
                width={1280}
                height={960}
                className="h-48 w-full rounded-[1.25rem] object-cover md:h-56"
              />
              <div className="px-2 pb-1 pt-3">
                <div className="text-sm font-semibold text-[#0b1533]">
                  Every department, one source of truth
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#0b1533]/60">
                  Sales, stock, finance and people connected in a single operating layer.
                </p>
              </div>
            </div>

            {/* CMS panel */}
            <div className={`${neo} p-5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-2xl bg-[#7c3aed]/10">
                    <Layers className="size-4 text-[#7c3aed]" />
                  </span>
                  <div className="text-sm font-semibold text-[#0b1533]">CMS panel</div>
                </div>
                <span className="rounded-full bg-[#059669]/10 px-2.5 py-1 text-[10px] font-semibold text-[#059669]">
                  Live
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {cmsRows.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-[0_6px_16px_-12px_rgba(11,21,51,0.6)] transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="text-xs font-medium text-[#0b1533]">{r.name}</span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                      style={{ backgroundColor: `${r.tone}18`, color: r.tone }}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#0b1533]/60">
                Edit pages, products and content without touching code.
              </p>
            </div>
          </div>
        </div>

        {/* Connected app cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "MR. CRM", note: "Pipeline and customers", color: "#2563eb" },
            { name: "BUY", note: "Procurement flows", color: "#059669" },
            { name: "OPRATE", note: "Field operations", color: "#f59e0b" },
            { name: "OUTREACH", note: "Lead intelligence", color: "#e11d48" },
          ].map((a, i) => (
            <div
              key={a.name}
              style={{ animationDelay: `${i * 80}ms` }}
              className={`${neo} group animate-fade-in p-5 transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <span
                  className="size-9 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}66)`,
                  }}
                />
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: a.color }}
                />
              </div>
              <div className="mt-4 text-sm font-semibold text-[#0b1533]">{a.name}</div>
              <div className="mt-1 text-xs text-[#0b1533]/55">{a.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {product.externalUrl ? (
            <Button
              asChild
              size="lg"
              className="rounded-full"
              onClick={() => trackEvent("obms_external_click", { source: "product_page" })}
            >
              <a href={product.externalUrl} target="_blank" rel="noopener noreferrer">
                Visit the O.B.M.S website <ExternalLink className="ml-1 size-4" />
              </a>
            </Button>
          ) : null}
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/book">
              Book an ERP walkthrough <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
