import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { Cpu, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const pillars = [
  {
    title: "AI-first development",
    description: "Foundation, speed, rapid scaffolding, and automated boilerplate generation.",
    icon: Cpu,
    color: "from-purple-500/20 to-indigo-500/10 text-purple-400",
  },
  {
    title: "Engineer-refined execution",
    description: "Expert code review, system hardening, architecture tuning, and database optimization.",
    icon: UserCheck,
    color: "from-primary/20 to-purple-500/10 text-primary",
  },
  {
    title: "Production-grade results",
    description: "Enterprise reliability, zero-compromise security, scalable infrastructure, and complete quality assurance.",
    icon: ShieldCheck,
    color: "from-emerald-500/20 to-teal-500/10 text-emerald-400",
  },
];

export function WhyItChangesSection() {
  return (
    <Section
      eyebrow="Business Advantage"
      title="WHY THIS CHANGES SOFTWARE DEVELOPMENT"
      intro="Accelerating software delivery while maintaining uncompromising engineering standards."
      className="bg-background relative overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Lead story text box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Traditional development can take months of repetitive work. AI alone can build quickly,
            but it still needs experienced engineers to validate and refine the result.{" "}
            <span className="text-foreground font-semibold">Octapus combines both.</span>
          </p>
        </motion.div>

        {/* 3 Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border border-hairline hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 border border-hairline",
                      p.color
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline flex items-center gap-2 text-xs font-mono text-primary font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Precision
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Business Outcome Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center max-w-3xl mx-auto"
        >
          <p className="text-base md:text-lg text-foreground font-medium">
            This allows us to deliver custom software faster and more cost-efficiently without
            compromising on engineering quality.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
