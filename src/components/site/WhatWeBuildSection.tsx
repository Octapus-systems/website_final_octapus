import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { PackageCheck, Code2, Bot, Layers, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export const buildCards = [
  {
    title: "Ready-to-Use Products",
    description: "Pre-built software you can deploy today.",
    icon: PackageCheck,
    href: "/products",
  },
  {
    title: "Custom Software",
    description: "Built around your exact workflow.",
    icon: Code2,
    href: "/services",
  },
  {
    title: "AI-Powered Systems",
    description: "Intelligent agents that work with your team.",
    icon: Bot,
    href: "/ois",
  },
  {
    title: "Business Platforms",
    description: "ERP, CRM, dashboards — one connected ecosystem.",
    icon: Layers,
    href: "/products",
  },
];

export function WhatWeBuildSection() {
  return (
    <Section
      eyebrow="Capabilities"
      title="What We Build"
      intro="Modern software solutions built to fit your operational scale, workflow, and strategic growth goals."
      className="bg-surface dark:bg-surface-dark border-y border-hairline"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline rounded-2xl overflow-hidden border border-hairline max-w-5xl mx-auto">
        {buildCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
            >
              <Link
                to={card.href}
                className={cn(
                  "group flex flex-col items-center text-center p-6 md:p-8 bg-background",
                  "hover:bg-primary/[0.03] transition-colors duration-300 h-full"
                )}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>

                <h3 className="font-display text-sm md:text-base font-semibold text-foreground mb-1.5 leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  {card.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
