import React from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Workflow, Database, MessageSquare, CreditCard, Sparkles, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const connectedSystems = [
  { name: "CRM", icon: Database, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "ERP", icon: Layers, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Billing", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "WhatsApp", icon: MessageSquare, color: "text-green-500", bg: "bg-green-500/10" },
];

export function OctapusConnectTeaser() {
  const reducedMotion = useReducedMotion();

  return (
    <Section className="bg-surface dark:bg-surface-dark border-y border-hairline py-16 md:py-20 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-full max-w-4xl rounded-full bg-primary/[0.04] blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Narrative Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              <span>Octapus Connect</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground leading-[1.15]">
              Octapus builds software. <br />
              <span className="text-muted-foreground font-normal">
                Octapus also connects what you already use.
              </span>
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              Your business doesn't need to throw away its existing tools. Octapus Connect bridges your CRM, ERP, billing systems, spreadsheets, and messaging platforms into a unified automated workflow.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-7 h-12 text-sm font-semibold shadow-md shadow-primary/20">
                <Link to="/products/connect">
                  Explore Octapus Connect <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Visual Diagram Teaser */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border hairline bg-background p-6 shadow-xl shadow-foreground/[0.03]">
              <div className="flex items-center justify-between border-b hairline pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Workflow className="size-3.5 text-primary" />
                  Live System Bridge
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connected
                </span>
              </div>

              {/* Central Hub & Connected Nodes */}
              <div className="grid grid-cols-2 gap-3 relative py-2">
                {connectedSystems.map((sys, idx) => {
                  const Icon = sys.icon;
                  return (
                    <motion.div
                      key={sys.name}
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                      className="flex items-center gap-3 rounded-xl border hairline p-3 bg-surface/50 hover:bg-accent/40 transition-colors"
                    >
                      <div className={cn("size-9 rounded-lg flex items-center justify-center shrink-0", sys.bg, sys.color)}>
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-foreground truncate">{sys.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">Automated Flow</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Central Connector Bar */}
              <div className="mt-4 pt-3 border-t hairline flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono text-[11px]">Zero Rip-and-Replace</span>
                <span className="text-primary font-medium text-xs hover:underline cursor-pointer">
                  <Link to="/products/connect">See how it works →</Link>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
