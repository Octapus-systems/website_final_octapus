import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/site/Section";
import { Workflow, Layers, LayoutTemplate, CheckCircle2, XCircle, ArrowRight, Network, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function CustomApproachSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-hairline">
      {/* Background ambient glowing accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* ── Header / Headline Focus (Simple & Minimal eyebrow + Gradient accent) ── */}
        <div className="mx-auto max-w-4xl text-center mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-eyebrow mb-3"
          >
            Our Approach
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]"
          >
            Your Business Doesn’t Need Their System.{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
              It Needs Yours.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            A system that works perfectly for one company doesn’t automatically make sense for another.
            Every business has its own workflows, products, operations, team structure, and way of getting things done.
            Adopting someone else’s system often means forcing your business to adapt to their way of working.
          </motion.p>
        </div>

        {/* ── Main Editorial Content & Visual Workflow Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-12 md:mb-16">
          
          {/* Left Column: The Approach & Interface Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Card 1: We Take a Different Approach */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-10 rounded-3xl bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border border-hairline hover:border-primary/40 transition-all duration-300 relative group overflow-hidden shadow-lg shadow-black/5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Workflow className="h-5 w-5" />
                </div>
                <span className="text-xl md:text-2xl font-display font-bold text-foreground">
                  We take a different approach.
                </span>
              </div>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We first understand how your business actually operates — what makes it efficient, where the bottlenecks are, and which processes can be improved. Then we build a system around your real workflow, adding automation where it genuinely improves performance.
              </p>
            </motion.div>

            {/* Card 2: The Interface Matters Too */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 md:p-10 rounded-3xl bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border border-hairline hover:border-primary/40 transition-all duration-300 relative group overflow-hidden shadow-lg shadow-black/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <LayoutTemplate className="h-5 w-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                  The interface matters too.
                </h3>
              </div>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Your employees shouldn’t have to relearn how to work just because you introduced new software. We design familiar, intuitive interfaces that feel natural from day one, making adoption faster and everyday work easier.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Custom Systems / Connected Process Diagram Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 rounded-3xl bg-surface dark:bg-surface-dark/90 border border-primary/20 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-primary/5"
          >
            {/* Ambient Background Grid Pattern inside card */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#601CE6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Connected Architecture</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Tailored System
                </div>
              </div>

              {/* Animated Interactive Process Nodes */}
              <div className="space-y-3 relative z-10">
                {/* Node 1: Business Operations */}
                <div className="p-3.5 rounded-2xl bg-background/80 border border-hairline flex items-center justify-between backdrop-blur-sm group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-primary font-mono text-xs font-bold">
                      01
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Your Operations & Team</div>
                      <div className="text-xs text-muted-foreground">Existing workflows & logic mapped</div>
                    </div>
                  </div>
                  <Zap className="h-4 w-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Connecting Line / Arrow */}
                <div className="flex justify-center my-1">
                  <div className="h-5 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20" />
                </div>

                {/* Node 2: Octapus Core System */}
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between backdrop-blur-sm shadow-md shadow-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center font-mono text-xs font-bold shadow-inner">
                      OCT
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Octapus Custom Engine</div>
                      <div className="text-xs text-primary font-medium">Built around your real workflow</div>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                </div>

                {/* Connecting Line / Arrow */}
                <div className="flex justify-center my-1">
                  <div className="h-5 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20" />
                </div>

                {/* Node 3: Automated Outcomes */}
                <div className="p-3.5 rounded-2xl bg-background/80 border border-hairline flex items-center justify-between backdrop-blur-sm group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-primary font-mono text-xs font-bold">
                      03
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Frictionless Adoption</div>
                      <div className="text-xs text-muted-foreground">Intuitive UX + Automated performance</div>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Subtle Contrast Footer inside Right Card */}
            <div className="mt-8 pt-6 border-t border-hairline/60">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground line-through decoration-muted-foreground/40">
                  <XCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>Generic templates</span>
                </div>
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>100% Custom code</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Key Emphasized Statement Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/30 p-8 md:p-12 relative overflow-hidden backdrop-blur-md shadow-2xl shadow-primary/5"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                THE OCTAPUS PROMISE
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
                One business. One workflow. One system — built specifically for it.
              </h3>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400/80 shrink-0" />
                  <span>Not a copy of someone else’s software.</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400/80 shrink-0" />
                  <span>Not a standard system forced onto your business.</span>
                </div>
              </div>
            </div>

            {/* Final Positioning Highlight */}
            <div className="shrink-0 bg-background/90 dark:bg-background/80 p-6 rounded-2xl border border-primary/30 shadow-lg flex flex-col justify-center max-w-md">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Core Philosophy</span>
              <p className="text-lg md:text-xl font-display font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Your business logic, built into your own system.
              </p>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
