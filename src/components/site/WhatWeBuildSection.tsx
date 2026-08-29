import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { PackageCheck, Code2, Bot, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export const buildCards = [
  {
    title: "Ready-to-Use Products",
    description:
      "Business software developed by Octapus to solve common operational needs — ready to configure, deploy and use.",
    icon: PackageCheck,
    tag: "Pre-built & Deployable",
  },
  {
    title: "Custom Software",
    description:
      "Software designed and built around your exact business workflow, requirements and future goals.",
    icon: Code2,
    tag: "Tailored Engineering",
  },
  {
    title: "AI-Powered Systems",
    description:
      "AI agents, intelligent automation, business assistants and systems that can understand, act and work alongside existing business operations.",
    icon: Bot,
    tag: "Intelligent Automation",
  },
  {
    title: "Business Platforms",
    description:
      "ERP, CRM, finance, workflow, dashboards, portals and connected business systems built as one ecosystem.",
    icon: Layers,
    tag: "Connected Ecosystem",
  },
];

export function WhatWeBuildSection() {
  return (
    <Section
      eyebrow="Capabilities"
      title="WHAT WE BUILD"
      intro="Modern software solutions built to fit your operational scale, workflow, and strategic growth goals."
      className="bg-surface dark:bg-surface-dark border-y border-hairline relative overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
        {buildCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={cn(
                "group relative p-8 md:p-10 rounded-3xl bg-background border border-hairline hover:border-primary/40",
                "transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
              )}
            >
              {/* Subtle ambient hover background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-surface dark:bg-surface-dark border border-hairline text-muted-foreground">
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
