import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container, Section } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { OisConnection } from "@/components/site/OisConnection";
import { Button } from "@/components/ui/button";
import { buildMeta, breadcrumbSchema, SITE_NAME } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Database,
  MessageSquare,
  CreditCard,
  FileSpreadsheet,
  Workflow,
  Sparkles,
  Zap,
  ShieldCheck,
  Eye,
  Sliders,
  Send,
  Building2,
  FileText,
  ShoppingBag,
  Briefcase,
  Users,
  ChevronRight,
  Play,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/products/connect")({
  head: () =>
    buildMeta({
      title: "Octapus Connect — Connect Your Business Software & Automate Workflows",
      description:
        "Octapus Connect bridges your existing CRM, ERP, spreadsheets, messaging, and business software into automated workflows without rip-and-replace.",
      path: "/products/connect",
      ogType: "product",
      keywords: [
        "Octapus Connect",
        "system integration UAE",
        "workflow automation",
        "ERP CRM connector",
        "business process automation",
        "no rip and replace",
      ],
    }),
  component: ConnectPage,
});

/* ---------------------------------------------------------------------------
 * Integration Data Categories (Requirement 9)
 * ------------------------------------------------------------------------- */
const INTEGRATION_CATEGORIES = [
  {
    id: "crm",
    label: "CRM",
    items: [
      { name: "Zoho CRM", desc: "Lead and pipeline sync" },
      { name: "Salesforce", desc: "Enterprise account management" },
      { name: "HubSpot", desc: "Marketing & sales automation" },
      { name: "MR. CRM", desc: "Native Octapus sales engine" },
    ],
  },
  {
    id: "erp",
    label: "ERP & Accounting",
    items: [
      { name: "O.B.M.S ERP", desc: "Unified ledger & inventory" },
      { name: "Odoo", desc: "Enterprise modular ERP" },
      { name: "QuickBooks", desc: "Financial ledger sync" },
      { name: "Xero", desc: "Cloud accounting workflows" },
    ],
  },
  {
    id: "google",
    label: "Google Workspace",
    items: [
      { name: "Google Sheets", desc: "Automated row updates & sync" },
      { name: "Google Drive", desc: "Document creation & storage" },
      { name: "Gmail", desc: "Automated email notifications" },
    ],
  },
  {
    id: "ms365",
    label: "Microsoft 365",
    items: [
      { name: "Microsoft Excel", desc: "Spreadsheet automation" },
      { name: "Microsoft Teams", desc: "Internal team alerts" },
      { name: "Outlook", desc: "Calendar & mail integration" },
    ],
  },
  {
    id: "comm",
    label: "Communication",
    items: [
      { name: "WhatsApp Business", desc: "Instant customer alerts & messages" },
      { name: "Slack", desc: "Real-time channel notifications" },
      { name: "Twilio SMS", desc: "Transactional text messaging" },
    ],
  },
  {
    id: "ecom",
    label: "Ecommerce",
    items: [
      { name: "Shopify", desc: "Order and inventory sync" },
      { name: "WooCommerce", desc: "Storefront order routing" },
      { name: "BUY Platform", desc: "Octapus connected commerce" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    items: [
      { name: "Stripe", desc: "Subscription & payment webhooks" },
      { name: "Beep Billing", desc: "Custom POS & invoicing" },
      { name: "UAE Payment Rails", desc: "Local gateway settlement" },
    ],
  },
  {
    id: "docs",
    label: "Documents",
    items: [
      { name: "PDF Generator", desc: "Automated quote & invoice creation" },
      { name: "DocuSign", desc: "E-signature workflow capture" },
    ],
  },
  {
    id: "projects",
    label: "Project Management",
    items: [
      { name: "BLUEPRINT", desc: "Delivery & milestone tracking" },
      { name: "Jira / Asana", desc: "Task status auto-routing" },
    ],
  },
  {
    id: "spreadsheets",
    label: "Spreadsheets",
    items: [
      { name: "CSV / File Feeds", desc: "Scheduled data imports & exports" },
      { name: "Live Data Feeds", desc: "Two-way sheet reconciliation" },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * Ecosystem Systems Data (Requirement 6)
 * ------------------------------------------------------------------------- */
interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  x: string; // Tailwind grid position or position indicator
  y: string;
  explanation: string;
  connections: string[]; // Connected system IDs
}

const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "crm",
    name: "CRM",
    category: "Sales",
    icon: Database,
    x: "top-4 left-4 md:top-6 md:left-8",
    y: "",
    explanation: "Octapus Connect captures closed deals in CRM and automatically triggers inventory allocation and invoice creation in your ERP.",
    connections: ["erp", "whatsapp"],
  },
  {
    id: "erp",
    name: "ERP",
    category: "Operations",
    icon: Layers,
    x: "top-4 right-4 md:top-6 md:right-8",
    y: "",
    explanation: "When inventory or financial state updates in ERP, Octapus Connect updates executive dashboards and sends instant status alerts.",
    connections: ["crm", "billing", "sheets"],
  },
  {
    id: "billing",
    name: "Billing (Beep)",
    category: "Finance",
    icon: CreditCard,
    x: "bottom-4 left-4 md:bottom-6 md:left-8",
    y: "",
    explanation: "Point-of-sale transactions immediately reconcile with core financial ledgers without manual end-of-day entry.",
    connections: ["erp", "whatsapp"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Messaging",
    icon: MessageSquare,
    x: "bottom-4 right-4 md:bottom-6 md:right-8",
    y: "",
    explanation: "Sends automated customer order updates, quote approvals, and internal team alerts directly on WhatsApp.",
    connections: ["crm", "billing"],
  },
  {
    id: "sheets",
    name: "Spreadsheets",
    category: "Data",
    icon: FileSpreadsheet,
    x: "hidden md:block md:top-1/2 md:left-2 md:-translate-y-1/2",
    y: "",
    explanation: "Legacy spreadsheets update live two-way without breaking existing team tracking habits.",
    connections: ["erp"],
  },
];

/* ---------------------------------------------------------------------------
 * Workflow Steps (Requirement 7)
 * ------------------------------------------------------------------------- */
const WORKFLOW_STEPS = [
  {
    id: 1,
    title: "Website Inquiry",
    source: "Website / Landing Page",
    action: "New lead form submitted by prospective client.",
    icon: Users,
    detail: "Data captured: Name, Phone, Company, Service requested.",
  },
  {
    id: 2,
    title: "CRM Sync",
    source: "CRM System",
    action: "Lead created and tagged automatically.",
    icon: Database,
    detail: "Enriched with company size and past interaction history.",
  },
  {
    id: 3,
    title: "Lead Assignment",
    source: "Octapus Connect Engine",
    action: "Automated routing to right sales account manager.",
    icon: Workflow,
    detail: "Evaluates territory, workload, and deal category.",
  },
  {
    id: 4,
    title: "WhatsApp Alert",
    source: "WhatsApp Business",
    action: "Instant alert sent to rep and welcoming SMS to client.",
    icon: MessageSquare,
    detail: "'New VIP lead assigned. Click to view lead record.'",
  },
  {
    id: 5,
    title: "Follow-up & Quote",
    source: "Billing / ERP",
    action: "Rep sends structured quote with one tap.",
    icon: FileText,
    detail: "Draft invoice generated directly from pricing catalog.",
  },
  {
    id: 6,
    title: "Deal Closed",
    source: "ERP & Ledger",
    action: "Payment confirmed, ERP project initiated automatically.",
    icon: CheckCircle2,
    detail: "Finance ledger updated, delivery team notified.",
  },
];

/* ---------------------------------------------------------------------------
 * Natural Language Workflow Visual Concept (Requirement 8)
 * ------------------------------------------------------------------------- */
const NL_WORKFLOW_STAGES = [
  {
    num: "01",
    title: "User Describes Process",
    desc: 'Prompt: "When a deal closes in CRM, create an invoice in ERP and send a WhatsApp confirmation."',
    badge: "Plain Language Input",
  },
  {
    num: "02",
    title: "Octapus Interprets",
    desc: "NL engine extracts trigger (Deal Status = Closed Won), actions (Create ERP Invoice, Send WhatsApp), and data mappings.",
    badge: "Intent Parsing",
  },
  {
    num: "03",
    title: "Workflow Generated",
    desc: "A structured, visual workflow graph is constructed with strict API schemas and retry logic.",
    badge: "Visual Graph Built",
  },
  {
    num: "04",
    title: "User Reviews",
    desc: "Operations leader checks guardrails, field mappings, and sandbox test results.",
    badge: "Human Oversight",
  },
  {
    num: "05",
    title: "Approval",
    desc: "Authorized manager approves execution permissions with one click.",
    badge: "Authorized",
  },
  {
    num: "06",
    title: "Activate",
    desc: "Workflow goes live in production with real-time execution logs and error recovery.",
    badge: "Live & Monitored",
  },
];

/* ---------------------------------------------------------------------------
 * Pricing Tiers (Requirement 10) - NO fake prices
 * ------------------------------------------------------------------------- */
const PRICING_TIERS = [
  {
    name: "Starter",
    headline: "For small teams connecting 2 to 3 core systems.",
    features: [
      "Up to 3 Connected Software Tools",
      "Standard Webhooks & API Connectors",
      "Lead-to-Sale & Billing Automations",
      "Real-time Execution Logs",
      "Standard Support",
    ],
    ctaText: "Talk to Sales",
    popular: false,
  },
  {
    name: "Business",
    headline: "For growing companies connecting operations, CRM & ERP.",
    features: [
      "Up to 10 Connected Systems",
      "Custom Workflow Trigger Rules",
      "Two-Way Spreadsheet Sync",
      "WhatsApp & SMS Notifications",
      "Human-in-the-loop Approvals",
      "Priority Engineering Support",
    ],
    ctaText: "Book a Demo",
    popular: true,
  },
  {
    name: "Pro",
    headline: "For multi-department operations requiring intelligent routing.",
    features: [
      "Unlimited System Connections",
      "OIS Intelligence Layer Integration",
      "Natural Language Workflow Mapping",
      "Advanced Error Fallbacks & Retries",
      "Custom Database & Legacy Bridges",
      "Dedicated Solutions Architect",
    ],
    ctaText: "Talk to Sales",
    popular: false,
  },
  {
    name: "Enterprise",
    headline: "For large organizations with complex compliance & SLA needs.",
    features: [
      "Dedicated Enterprise Infrastructure",
      "On-Premises or Private Cloud Options",
      "Custom API & ERP Protocol Adapters",
      "24/7 SLA Operations & Monitoring",
      "Full Security Audit & Compliance",
      "Custom SLA & Training",
    ],
    ctaText: "Contact Us",
    popular: false,
  },
];

function ConnectPage() {
  const reducedMotion = useReducedMotion();

  // Ecosystem active node state
  const [activeNodeId, setActiveNodeId] = useState<string>("crm");
  const activeNode = ECOSYSTEM_NODES.find((n) => n.id === activeNodeId) || ECOSYSTEM_NODES[0];

  // Workflow step interaction state
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Integration category tab state
  const [activeCategoryTab, setActiveCategoryTab] = useState("crm");
  const activeCategory =
    INTEGRATION_CATEGORIES.find((c) => c.id === activeCategoryTab) || INTEGRATION_CATEGORIES[0];

  return (
    <div className="overflow-x-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Octapus Connect",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Octapus Connect bridges your existing CRM, ERP, spreadsheets, messaging, and business software into automated workflows without rip-and-replace.",
          url: "/products/connect",
          provider: { "@type": "Organization", name: SITE_NAME, url: "/" },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Octapus Connect", path: "/products/connect" },
        ])}
      />

      {/* Back Link Breadcrumb */}
      <Container className="pt-8 pb-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> All products
        </Link>
      </Container>

      {/* =====================================================================
       * 1. HERO SECTION (I have business software)
       * =================================================================== */}
      <Section className="!pt-6 md:!pt-10 pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 font-mono text-xs font-semibold text-primary"
          >
            <Sparkles className="size-3.5" />
            <span>Octapus Connect · Zero Rip-and-Replace</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tight leading-[1.08] text-foreground text-balance"
          >
            The systems behind your business.{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Connected.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed text-balance"
          >
            Your tools stay. The manual copy-pasting between them doesn't have to. Octapus Connect bridges your existing software into continuous, automated business workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-8 h-13 text-base font-semibold shadow-lg shadow-primary/25">
              <Link to="/book">
                Book a Demo <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-13 text-base font-medium">
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* =====================================================================
       * 2 & 3. THE PROBLEM & HUMAN BOTTLENECK (Disconnected Systems & Manual Work)
       * =================================================================== */}
      <Section className="bg-surface dark:bg-surface-dark border-y border-hairline py-16 md:py-24">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-eyebrow">The Problem</div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-foreground">
              You have business software. But it speaks in silos.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Most businesses don't suffer from a lack of software — they suffer from disconnected software.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border hairline bg-background p-6 md:p-8 space-y-4">
              <div className="size-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="text-xl font-semibold text-foreground">Disconnected Tools</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sales lives in your CRM. Accounting lives in your ERP. Orders live in your billing tool. Communications live in WhatsApp. None of them talk.
              </p>
            </div>

            <div className="rounded-2xl border hairline bg-background p-6 md:p-8 space-y-4">
              <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="text-xl font-semibold text-foreground">The Human Integration Layer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Employees become human copy-paste bridges — spending hours re-keying data between tools, chasing status, and making preventable errors.
              </p>
            </div>

            <div className="rounded-2xl border hairline bg-background p-6 md:p-8 space-y-4">
              <div className="size-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="text-xl font-semibold text-foreground">Delayed Operations</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quotes take 24 hours instead of 2 minutes. Stock numbers are inaccurate. Invoices wait on manual handoffs. Growth slows down.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* =====================================================================
       * 4. THE SOLUTION & ECOSYSTEM VISUALIZATION (Requirement 6)
       * =================================================================== */}
      <Section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-eyebrow">The Architecture</div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-foreground">
              Octapus Connect bridges every system into one network.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Hover or tap any software node below to see how Octapus Connect transfers data seamlessly across your enterprise.
            </p>
          </div>

          {/* Ecosystem Interactive Component */}
          <div className="rounded-3xl border hairline bg-surface/40 dark:bg-surface-dark/40 p-6 md:p-10 space-y-8 shadow-xl">
            {/* Desktop Hub & Spoke Display */}
            <div className="relative min-h-[340px] flex items-center justify-center">
              {/* Central Hub Node */}
              <div className="relative z-20 flex flex-col items-center justify-center size-36 md:size-44 rounded-full border-2 border-primary bg-background shadow-2xl text-center p-4">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1.5">
                  <Workflow className="size-5 animate-pulse" />
                </div>
                <div className="font-display font-bold text-xs md:text-sm text-foreground tracking-tight">
                  OCTAPUS CONNECT
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">Integration Engine</div>
              </div>

              {/* Surrounding System Nodes */}
              <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between pointer-events-none">
                {ECOSYSTEM_NODES.map((node) => {
                  const isSelected = activeNodeId === node.id;
                  const isConnected = activeNode.connections.includes(node.id) || isSelected;
                  const Icon = node.icon;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setActiveNodeId(node.id)}
                      onMouseEnter={() => setActiveNodeId(node.id)}
                      className={cn(
                        "pointer-events-auto cursor-pointer rounded-2xl border p-4 transition-all duration-300 bg-background shadow-md",
                        isSelected
                          ? "border-primary ring-2 ring-primary/20 scale-105 z-30"
                          : isConnected
                            ? "border-primary/40 opacity-90"
                            : "border-hairline opacity-50 hover:opacity-80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                            isSelected ? "bg-primary text-white" : "bg-muted text-foreground"
                          )}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs md:text-sm font-semibold text-foreground truncate">
                            {node.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-mono">
                            {node.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contextual Explanation Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-primary/20 bg-background p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    <span className="size-2 rounded-full bg-primary" />
                    Connected Channel: {activeNode.name}
                  </div>
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {activeNode.explanation}
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="rounded-full shrink-0">
                  <Link to="/book">Map This Flow →</Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* =====================================================================
       * 5. WORKFLOW INTERACTIONS (Lead -> Sale) (Requirement 7)
       * =================================================================== */}
      <Section className="bg-surface dark:bg-surface-dark border-y border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-eyebrow">Automated Workflow</div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-foreground">
              Lead → Sale: From inquiry to deal in seconds.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Step through the automated sequence below to see how Octapus Connect moves information across software stages automatically.
            </p>
          </div>

          {/* Workflow Step Tracker */}
          <div className="space-y-6">
            {/* Interactive Stage Controls */}
            <div className="flex items-center justify-between border-b hairline pb-4 overflow-x-auto gap-2">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = idx === currentStepIdx;
                const isPast = idx < currentStepIdx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStepIdx(idx)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0",
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : isPast
                          ? "bg-primary/10 text-primary"
                          : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="font-mono font-bold">{step.id}</span>
                    <span className="hidden sm:inline">{step.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Card Active Content */}
            <AnimatePresence mode="wait">
              {WORKFLOW_STEPS[currentStepIdx] && (
                <motion.div
                  key={currentStepIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border hairline bg-background p-6 md:p-10 space-y-6 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b hairline pb-6">
                    <div className="flex items-center gap-4">
                      {React.createElement(WORKFLOW_STEPS[currentStepIdx].icon, {
                        className: "size-10 text-primary p-2 bg-primary/10 rounded-2xl shrink-0",
                      })}
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          Stage {WORKFLOW_STEPS[currentStepIdx].id} of {WORKFLOW_STEPS.length}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {WORKFLOW_STEPS[currentStepIdx].title}
                        </h3>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border hairline bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
                      <span>Source: {WORKFLOW_STEPS[currentStepIdx].source}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                        Automated Action
                      </div>
                      <p className="text-base text-foreground font-medium leading-relaxed">
                        {WORKFLOW_STEPS[currentStepIdx].action}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                        Data Payload Executed
                      </div>
                      <p className="text-sm font-mono text-muted-foreground bg-surface dark:bg-surface-dark p-3 rounded-xl border hairline">
                        {WORKFLOW_STEPS[currentStepIdx].detail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t hairline">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentStepIdx === 0}
                      onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
                      className="rounded-full"
                    >
                      <RotateCcw className="size-3.5 mr-1.5" /> Previous Step
                    </Button>

                    <Button
                      size="sm"
                      disabled={currentStepIdx === WORKFLOW_STEPS.length - 1}
                      onClick={() =>
                        setCurrentStepIdx((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1))
                      }
                      className="rounded-full"
                    >
                      Next Step <Play className="size-3.5 ml-1.5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* =====================================================================
       * 6. MONITOR & CONTROL (Observability)
       * =================================================================== */}
      <Section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-eyebrow">Observability & Control</div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-foreground">
              You stay in full control.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Automation shouldn't mean black-box risk. Octapus Connect provides live monitoring, human-in-the-loop approvals, and audit trails for every execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border hairline bg-background p-6 md:p-8 space-y-4">
              <Eye className="size-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Real-time Execution Logs</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See every data transfer, webhook event, and API payload in real time with precise timestamps.
              </p>
            </div>

            <div className="rounded-2xl border hairline bg-background p-6 md:p-8 space-y-4">
              <Sliders className="size-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Human Approvals</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Set manual review gates for high-value transactions or sensitive operations before they execute.
              </p>
            </div>

            <div className="rounded-2xl border hairline bg-background p-6 md:p-8 space-y-4">
              <ShieldCheck className="size-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Automatic Error Recovery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If an API fails or goes offline, Octapus Connect queues messages and retries safely without data loss.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* =====================================================================
       * 8. DESCRIBE YOUR WORKFLOW SECTION (Requirement 8)
       * =================================================================== */}
      <Section className="bg-surface dark:bg-surface-dark border-y border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-eyebrow">Natural Language Workflow Concept</div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-foreground">
              Describe your process in plain language.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Tell Octapus how your team operates. Our integration specialists translate your natural language requirements into engineered, verified workflow pipelines.
            </p>
          </div>

          {/* Visual Concept Flow Pipeline */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NL_WORKFLOW_STAGES.map((stage) => (
              <div
                key={stage.num}
                className="rounded-2xl border hairline bg-background p-6 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-primary/40">{stage.num}</span>
                  <span className="text-[10px] font-mono font-semibold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {stage.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{stage.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* =====================================================================
       * 9. CATEGORIZED INTEGRATIONS HUB (Requirement 9)
       * =================================================================== */}
      <Section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-eyebrow">Supported Ecosystem</div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-foreground">
              Integrations for the software you already run.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Explore supported integrations across 10 essential business software categories.
            </p>
          </div>

          {/* Integration Category Tabs */}
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-2 border-b hairline pb-4">
              {INTEGRATION_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors",
                    activeCategoryTab === cat.id
                      ? "bg-primary text-white shadow-sm"
                      : "bg-surface dark:bg-surface-dark text-muted-foreground hover:text-foreground border hairline"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Category Items Card Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {activeCategory.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border hairline bg-background p-5 space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="font-semibold text-base text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* =====================================================================
       * 10. PRICING & PLANS (Requirement 10) - NO fake prices
       * =================================================================== */}
      <Section className="bg-surface dark:bg-surface-dark border-y border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-eyebrow">Plans & Delivery</div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-foreground">
              Flexible tiers for every business scale.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We size deployments around your specific workflows, API endpoints, and data volume. Contact our team for an exact scope.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "rounded-3xl border bg-background p-6 flex flex-col justify-between space-y-6 relative",
                  tier.popular ? "border-primary ring-2 ring-primary/20 shadow-xl" : "hairline"
                )}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-mono font-bold uppercase px-3 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tier.headline}</p>

                  <ul className="space-y-2.5 pt-2 border-t hairline">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-foreground">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  variant={tier.popular ? "default" : "outline"}
                  className="w-full rounded-full mt-4"
                >
                  <Link to="/contact">{tier.ctaText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* =====================================================================
       * 11. FINAL CTA SECTION (Requirement 11)
       * =================================================================== */}
      <Section className="py-24 md:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-foreground leading-[1.1]">
              Don't replace your software. <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Connect it.
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your tools stay. The manual work between them doesn't have to.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-primary/25">
              <Link to="/book">
                Book a Demo <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-medium">
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Related Links */}
      <RelatedLinks
        title="Explore related Octapus products and architecture."
        items={[
          {
            to: "/products",
            label: "All Products",
            detail: "Explore the complete Octapus software ecosystem.",
          },
          {
            to: "/ois",
            label: "OIS Intelligence Layer",
            detail: "The AI platform that powers intelligent Octapus workflows.",
          },
          {
            to: "/engineering",
            label: "Octapus Engineering",
            detail: "Custom software development & system integrations.",
          },
        ]}
      />
    </div>
  );
}
