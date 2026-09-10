import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  CreditCard,
  MessageSquare,
  FileCheck,
} from "lucide-react";
import { Container } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/** Glassmorphic / Neumorphic surface styling matching application design tokens */
const cardStyle =
  "rounded-3xl bg-background border hairline p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/40 relative overflow-hidden group";

const userRoles = [
  {
    role: "School Administrator",
    title: "Institutional Control & Governance",
    summary:
      "Manages institutional operations, academics, examinations, fees, permissions and reporting.",
    icon: ShieldCheck,
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    iconBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    features: [
      "Institutional operations & campus setup",
      "Academic scheduling & examination control",
      "Fee management & financial reporting",
      "Role-based permissions & audit trails",
    ],
  },
  {
    role: "Teacher",
    title: "Teaching & Classroom Workspace",
    summary:
      "Manages teaching content, assignments, assessments, live classes, attendance, student doubts and performance.",
    icon: GraduationCap,
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    iconBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
    features: [
      "Course content & lesson planning",
      "Live virtual classrooms & attendance",
      "Assignment grading & automated quizzes",
      "Student doubt resolution & progress tracking",
    ],
  },
  {
    role: "Student",
    title: "Interactive & Connected Learning",
    summary:
      "Accesses courses, attends live classes, completes assignments and quizzes, and tracks academic progress.",
    icon: Sparkles,
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    iconBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    features: [
      "Centralized course dashboard & schedules",
      "One-click live class attendance",
      "Assignment submissions & instant quiz results",
      "Real-time academic progress & achievements",
    ],
  },
  {
    role: "Parent / Guardian",
    title: "360° Engagement & Progress Portal",
    summary:
      "Monitors children's academics, attendance, homework, examinations, fees, achievements and school engagement.",
    icon: HeartHandshake,
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    features: [
      "Real-time attendance & grade alerts",
      "Homework & exam schedule monitoring",
      "Direct communication with teachers & admin",
      "Online fee payments & receipt history",
    ],
  },
];

const platformHighlights = [
  { icon: Building2, label: "Multi-Campus Ready", desc: "Scale across schools, branches, and academic boards seamlessly." },
  { icon: MessageSquare, label: "Unified Communication", desc: "In-app announcements, SMS, email, and doubt forums." },
  { icon: CreditCard, label: "Integrated Fee Ledger", desc: "Automated invoicing, reminders, and online payment gateways." },
  { icon: FileCheck, label: "Assessment Engine", desc: "Custom rubrics, offline exam entry, and digital report cards." },
];

export function LmsShowcase({ product }: { product: Product }) {
  return (
    <div className="relative space-y-16 md:space-y-24 py-8">
      {/* Overview Banner: Target Customer, Problem, Outcome */}
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12 border hairline shadow-sm">
          <div className="text-eyebrow mb-3">System Overview</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight max-w-3xl">
            A single operating system for modern educational excellence.
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-background/80 backdrop-blur-sm p-6 border hairline space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Ecosystem
              </div>
              <p className="text-sm text-foreground font-medium leading-relaxed">
                Administration, teaching, learning, assessment, communication, and finance connected in one ecosystem.
              </p>
            </div>

            <div className="rounded-2xl bg-background/80 backdrop-blur-sm p-6 border hairline space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                The Problem
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.problem}
              </p>
            </div>

            <div className="rounded-2xl bg-background/80 backdrop-blur-sm p-6 border hairline space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                The Outcome
              </div>
              <p className="text-sm text-foreground font-medium leading-relaxed">
                {product.outcome}
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Four Connected User Roles */}
      <Container>
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="text-eyebrow">Connected Ecosystem</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Four Connected User Roles
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Every user receives a tailored role-based experience connected to one shared real-time ledger.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {userRoles.map((r, i) => (
            <div key={r.role} className={cardStyle}>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className={`grid size-12 place-items-center rounded-2xl ${r.iconBg}`}>
                  <r.icon className="size-6" />
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold border ${r.badgeColor}`}>
                  Role 0{i + 1}
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                {r.role}
              </h3>
              <div className="text-xs font-medium text-primary mt-1">{r.title}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {r.summary}
              </p>

              <div className="mt-6 border-t hairline pt-5">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                  Core Capabilities
                </div>
                <ul className="space-y-2.5">
                  {r.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Platform Features Grid */}
      <Container>
        <div className="rounded-3xl border hairline bg-background p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-eyebrow mb-2">Platform Capabilities</div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Built for scaling educational institutions
              </h3>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full"
              onClick={() => trackEvent("product_enquiry", { product: "lms" })}
            >
              <Link to="/contact">
                Deploy LMS for Your School <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t hairline pt-8">
            {platformHighlights.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </div>
                <div className="font-semibold text-foreground text-base">{item.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
