import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { Compass, Cpu, Wrench, ShieldAlert, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export const processSteps = [
  {
    step: "01",
    title: "Understand",
    description: "We understand your business, requirements, workflow and goals.",
    icon: Compass,
  },
  {
    step: "02",
    title: "AI Build",
    description:
      "Our AI-powered development systems rapidly create the initial architecture, interfaces, logic and codebase.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Engineer Refinement",
    description:
      "Our engineers manually review and improve the generated system — correcting code, refining architecture and creating a clean, scalable database structure.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Security & Quality",
    description:
      "We test the system for functionality, performance, reliability and security before delivery.",
    icon: ShieldAlert,
  },
  {
    step: "05",
    title: "Deploy & Improve",
    description:
      "We deploy the final product and continue improving it as your business grows.",
    icon: Rocket,
  },
];

export function BuildProcessSection() {
  return (
    <Section
      eyebrow="Workflow"
      title="OUR BUILD PROCESS"
      intro="A structured 5-step engineering journey designed for speed, precision, and enterprise reliability."
      className="bg-surface dark:bg-surface-dark border-y border-hairline relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0" />

          {processSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 p-6 rounded-2xl bg-background border border-hairline hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg hover:shadow-primary/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface dark:bg-surface-dark border border-hairline flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
