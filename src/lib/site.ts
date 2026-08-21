import productErpImg from "@/assets/product-erp.png";
import productCrmImg from "@/assets/product-crm.png";
import productAiImg from "@/assets/product-ai.png";

export type TeamMember = {
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Sayid Nazim",
    role: "System Architect & Creative Head",
    department: "Engineering & Design",
    phone: "+971 54 455 6613",
    email: "gm@octapus.ae",
    bio: "Designing the architecture of tomorrow while crafting experiences that inspire.",
  },
  {
    name: "Shabab",
    role: "Manager",
    department: "Operations",
    phone: "+971 50 266 0388",
    email: "gm@octapus.ae",
    bio: "Driving the vision forward, aligning people, processes and performance for success.",
  },
  {
    name: "Jishad",
    role: "Tech Lead",
    department: "Engineering",
    phone: "+971 50 266 0388",
    email: "code@octapus.ae",
    bio: "Leading the technical front, building scalable solutions and empowering the team to deliver excellence.",
  },
  {
    name: "Ajay Peter",
    role: "Marketing & Tech Department Lead",
    department: "Growth & Engineering",
    phone: "+971 50 862 1612",
    email: "hr@octapus.ae",
    bio: "Turning ideas into impactful campaigns and leading the team to achieve greater milestones.",
  },
];


export const site = {
  name: "Octapus",
  legalName: "Octapus L.L.C.",
  tagline: "The Final Software Destination",
  subTagline: "The systems behind your business. Connected.",
  origin: "Designed in the UAE — Built for the world.",
  oisExternalUrl: "https://new-website-octapus.vercel.app/",

  emails: {
    sales: "sales@octapus.ae",
    info: "info@octapus.ae",
    hr: "hr@octapus.ae",
    tech: "code@octapus.info",
  },
  phones: {
    general: "+971 50 862 1612",
    support: "+971 50 292 0388",
    sales: "+971 50 266 1088",
  },
  addresses: [
    { city: "Dubai", line: "Business Village, Dubai, UAE" },
    { city: "Ajman", line: "Amper Gem Tower, Khalifa Street, Ajman, UAE" },
  ],
  whatsapp: "971508621612",
} as const;

export type Product = {
  slug: string;
  name: string;
  headline: string;
  customer: string;
  problem: string;
  outcome: string;
  image?: string;
  externalUrl?: string;
  tags: string[];
};

export const obmsModules = [
  "Sales",
  "Purchase",
  "Inventory",
  "Finance",
  "HR & Payroll",
  "Reports",
] as const;

export const obmsMetrics = [
  { label: "Revenue tracked", value: "Live", detail: "One ledger, no reconciliation night" },
  { label: "Orders", value: "Unified", detail: "Quote to invoice in one flow" },
  { label: "Customers", value: "360°", detail: "Every interaction on one record" },
] as const;

export const products: Product[] = [
  {
    slug: "obms-erp",
    name: "O.B.M.S ERP",
    headline: "One operating layer for finance, operations and reporting.",
    customer: "Growing companies outgrowing spreadsheets and disconnected tools.",
    problem: "Numbers live in different places and never agree.",
    outcome: "A single ledger for accounting, inventory, HR and reporting — with roles, approvals and audit trails.",
    image: productErpImg,
    externalUrl: "https://new-website-octapus.vercel.app/",
    tags: ["ERP", "Finance", "Operations"],
  },

  {
    slug: "hub8",
    name: "HUB8",
    headline: "A control plane for connected business tools.",
    customer: "Companies running eight-plus tools that don't talk to each other.",
    problem: "Data trapped in silos, workflows stitched by hand.",
    outcome: "Systems connected with defined contracts, visibility and monitoring.",
    tags: ["Integration", "Platform"],
  },
  {
    slug: "algorithem",
    name: "ALGORITHM",
    headline: "Rules and automations for repeatable business decisions.",
    customer: "Ops leaders who repeat the same decision hundreds of times a week.",
    problem: "Every decision waits on a person even when the rule is clear.",
    outcome: "Decisions moved into transparent, auditable rules with human overrides.",
    tags: ["Automation", "Rules"],
  },
  {
    slug: "custom-business-solutions",
    name: "Custom Business Solutions",
    headline: "Software built for the systems that only your business has.",
    customer: "Operators with a workflow that no off-the-shelf tool covers.",
    problem: "You've been paying for the software you don't need to work around the software you do.",
    outcome: "A precise system built for your exact operation — nothing more, nothing less.",
    tags: ["Custom", "Software"],
  },
  {
    slug: "odoo-custom-erp",
    name: "Odoo Custom ERP",
    headline: "Odoo, extended and integrated to fit your operation.",
    customer: "Companies choosing Odoo as their operating layer.",
    problem: "Standard Odoo covers most of the work; the rest is where the value is.",
    outcome: "Modules extended, integrations built, deployment operated and supported.",
    tags: ["Odoo", "ERP"],
  },
  {
    slug: "custom-ai",
    name: "Custom AI",
    headline: "AI systems designed around your data and your decisions.",
    customer: "Teams ready to move beyond generic chat tools.",
    problem: "Off-the-shelf AI doesn't understand your business.",
    outcome: "Focused AI systems: retrieval on your knowledge, actions on your systems, evaluations you can trust.",
    image: productAiImg,
    tags: ["AI", "Custom"],
  },
  {
    slug: "ois",
    name: "OIS — Octapus Intelligent System",
    headline: "Give your existing systems intelligence.",
    customer: "Operators who already have software, data and people — and want them to think together.",
    problem: "AI assistants sit next to the work rather than participating in it.",
    outcome: "An intelligence layer over the systems you already run: existing systems → OIS → AI agents → employees → business actions. No rip-and-replace.",
    tags: ["AI", "Platform"],
  },
  {
    slug: "hermes-ai",
    name: "Hermes AI",
    headline: "The AI coworker powered by OIS.",
    customer: "Teams that lose hours to finding information and chasing status.",
    problem: "Knowledge lives in people's heads, threads and files nobody can search.",
    outcome: "An AI coworker that answers questions, remembers context, coordinates tasks and moves work forward — helping people work smarter, not replacing them.",
    tags: ["AI", "Agents"],
  },
  {
    slug: "buy",
    name: "BUY",
    headline: "Commerce that stays connected to the rest of the business.",
    customer: "Retail and B2B teams selling across storefronts, marketplaces and sales reps.",
    problem: "Orders, stock and finance each tell a different story.",
    outcome: "A commerce platform wired into inventory, fulfilment and accounting, so one order updates every system once.",
    tags: ["Commerce", "Platform"],
  },
  {
    slug: "blueprint",
    name: "BLUEPRINT",
    headline: "Project management built around delivery, not to-do lists.",
    customer: "Delivery, construction and professional-services teams running many projects at once.",
    problem: "Plans live in spreadsheets while progress lives in conversations.",
    outcome: "Scope, milestones, resourcing, costs and progress in one place — with a definition of done everyone can see.",
    tags: ["Projects", "Delivery"],
  },
  {
    slug: "outreach",
    name: "OUTREACH",
    headline: "Lead intelligence that tells you who is worth calling.",
    customer: "Sales teams buried under unqualified enquiries.",
    problem: "Time spent qualifying instead of selling.",
    outcome: "Structured capture, enrichment and prioritization with a clean handoff into the pipeline.",
    tags: ["Sales", "AI"],
  },
  {
    slug: "icon",
    name: "ICON",
    headline: "Marketing operations for teams that actually ship.",
    customer: "Marketing teams juggling briefs, assets, approvals and campaigns.",
    problem: "Campaign work spreads across five tools and one shared drive.",
    outcome: "Planning, production, approvals and performance connected end to end.",
    tags: ["Marketing", "Operations"],
  },
  {
    slug: "mr-crm",
    name: "MR. CRM",
    headline: "Sales management shaped to how your team sells.",
    customer: "Sales organizations forced into generic pipelines.",
    problem: "The tool defines the process instead of the process defining the tool.",
    outcome: "Pipelines, fields, automations and reporting built around your motion — with forecasting leadership can trust.",
    image: productCrmImg,
    tags: ["CRM", "Sales"],
  },
  {
    slug: "oprate",
    name: "OPRATE",
    headline: "Business management systems for day-to-day operations.",
    customer: "Operators coordinating people, assets, service and compliance.",
    problem: "Operational reality never matches what the system says.",
    outcome: "Workflows, approvals and records that reflect how the operation actually runs.",
    tags: ["Operations", "Systems"],
  },
  {
    slug: "erp-implementation",
    name: "ERP Implementation",
    headline: "Enterprise deployment, migration and adoption — done properly.",
    customer: "Companies rolling out or replacing an ERP across teams and entities.",
    problem: "Most ERP projects fail on data, process and adoption, not software.",
    outcome: "Discovery, configuration, data migration, training, rehearsed cutover and post-launch support.",
    tags: ["ERP", "Deployment"],
  },
  {
    slug: "ai-business-automation",
    name: "AI Business Automation",
    headline: "Custom intelligent workflows across your systems.",
    customer: "Teams repeating manual steps between tools every single day.",
    problem: "People act as the integration layer between software.",
    outcome: "Automations with guardrails, audit trails and human overrides — measured on the hours they return.",
    tags: ["Automation", "AI"],
  },
];


export const services = [
  {
    slug: "engineering",
    name: "Octapus Engineering",
    summary: "The workshop where your business gets tuned: custom software, web and mobile applications, enterprise platforms, APIs, cloud, database architecture and system integration — with security, testing and deployment treated as part of the build.",
  },
  {
    slug: "business-systems",
    name: "Business Systems",
    summary: "ERP, CRM, workflow and automation platforms designed around how your team actually operates — including Odoo implementation, migration and enterprise deployment.",
  },
  {
    slug: "ai-and-data",
    name: "AI & Data",
    summary: "OIS-powered intelligence: AI agents, retrieval on your own knowledge, document and voice AI, analytics and data pipelines — with evaluations you can read and audit trails you can trust.",
  },
  {
    slug: "design-and-brand",
    name: "Octapus Studios",
    summary: "A creative studio inside a technology company: brand identity and guidelines, product and interface design, content and copy, video and motion graphics — built to make complex systems feel obvious.",
  },
  {
    slug: "growth",
    name: "Growth",
    summary: "Positioning, search, social strategy, digital advertising, content and campaign measurement — connected directly to the systems that capture and convert demand.",
  },
  {
    slug: "operate",
    name: "Operate",
    summary: "Ongoing operation, consulting, support, monitoring and scaling of the systems we build together — 24/7, by the engineers who built them.",
  },
] as const;


export const industries = [
  "Construction", "Healthcare", "Retail", "Education",
  "Finance", "Manufacturing", "Hospitality", "Real Estate",
  "Transportation", "E-commerce", "Logistics", "Professional Services",
] as const;

export const processStages = [
  { name: "Discover", detail: "Octapus map your operation, systems and constraints in plain language." },
  { name: "Plan", detail: "A clear scope, sequencing and definition of done — before code." },
  { name: "Design", detail: "Interfaces designed for the people who will actually use them." },
  { name: "Develop", detail: "Engineered in short cycles with reviews and measurable progress." },
  { name: "Integrate", detail: "Connected to the systems that already exist — with defined contracts." },
  { name: "Launch", detail: "Rehearsed release, migration and rollback." },
  { name: "Support", detail: "Monitoring, response and continuous improvement." },
  { name: "Scale", detail: "The system grows with the business, not against it." },
] as const;

export const capabilities = [
  { verb: "Build", detail: "The custom software your operation needs." },
  { verb: "Operate", detail: "The systems that run the business day to day." },
  { verb: "Automate", detail: "The repeatable decisions that slow the team down." },
  { verb: "Understand", detail: "The data that already tells the story." },
  { verb: "Grow", detail: "The channels connected to the systems that convert." },
] as const;

export const stats = [
  { value: "120+", label: "Systems shipped", detail: "Custom platforms, ERP rollouts and AI systems delivered end-to-end." },
  { value: "98%", label: "Client retention", detail: "Long-term partnerships that outlast the first release." },
  { value: "12+", label: "Industries served", detail: "From construction and healthcare to retail and finance." },
  { value: "24/7", label: "Operate & support", detail: "Monitoring, response and continuous improvement." },
  { value: "50+", label: "Integrations", detail: "ERPs, CRMs, payment rails, messaging and data pipelines." },
  { value: "10+", label: "Years of practice", detail: "A decade of building software that runs real operations." },
] as const;

export const comparison = [
  { dimension: "Delivery speed", traditional: "6–12 month waterfall cycles", octapus: "Working software every 2 weeks" },
  { dimension: "Ownership", traditional: "Handed to five vendors", octapus: "One accountable team, one roadmap" },
  { dimension: "AI & automation", traditional: "Bolted on after launch", octapus: "Designed into the system from day one" },
  { dimension: "Support", traditional: "Ticket queues, timezone gaps", octapus: "Direct line to the engineers who built it" },
  { dimension: "Scalability", traditional: "Rewrites every 3 years", octapus: "Architecture that grows with the business" },
  { dimension: "Total cost", traditional: "Licence sprawl and rework", octapus: "One system, predictable spend" },
] as const;

export const aiCapabilities = [
  { name: "AI Agents", detail: "Specialized agents that act on your systems with authorization, guardrails and audit trails." },
  { name: "Workflow Automation", detail: "Repeatable decisions moved into transparent, auditable rules with human overrides." },
  { name: "Voice & WhatsApp AI", detail: "Conversational surfaces on the channels your customers and teams already use." },
  { name: "OCR & Document AI", detail: "Extract, classify and route documents into your ERP and CRM automatically." },
  { name: "Retrieval & Chatbots", detail: "Grounded answers on your knowledge, your policies and your product." },
  { name: "Predictive Analytics", detail: "Forecasting and scoring models trained on your operational data." },
  { name: "Smart Reporting", detail: "Executive dashboards that surface the number that matters, not the noise." },
  { name: "Custom ML Systems", detail: "Focused models designed around your decisions and evaluated the way you measure them." },
] as const;

export const techStack = [
  { group: "Frontend", items: ["React", "Next.js", "TanStack", "TypeScript", "Tailwind"] },
  { group: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Supabase", "Redis"] },
  { group: "Mobile", items: ["React Native", "Expo", "Swift", "Kotlin"] },
  { group: "Cloud & DevOps", items: ["AWS", "Cloudflare", "Docker", "Kubernetes", "Terraform"] },
  { group: "AI & Data", items: ["OpenAI", "Anthropic", "LangChain", "Vector DBs", "dbt"] },
  { group: "Integrations", items: ["Odoo", "Zoho", "Stripe", "WhatsApp", "Twilio"] },
] as const;

export const testimonials = [
  {
    quote: "Octapus rebuilt our operations layer in six months. The system pays for itself every quarter.",
    author: "Managing Director",
    company: "Construction group, Dubai",
  },
  {
    quote: "The team behaves like an internal engineering function — not a vendor. That is what actually moved the numbers.",
    author: "Chief Operating Officer",
    company: "Retail chain, UAE",
  },
  {
    quote: "They connected eight tools we thought would never talk to each other. Reporting is finally honest.",
    author: "Head of Finance",
    company: "Healthcare provider",
  },
] as const;

export const faqs = [
  { q: "What does a software development company actually do?", a: "It turns a business process into working software: mapping how you operate today, designing the system, building and testing it, connecting it to the tools you already use, and keeping it running afterwards. At Octapus all of those steps sit inside one team rather than across several vendors." },
  { q: "How is Octapus different from a traditional software agency?", a: "Octapus stay with the system after launch. Engineering, business systems, AI, design, growth and operations sit inside one team with one roadmap — so accountability never moves between vendors." },
  { q: "Why choose custom software instead of an off-the-shelf tool?", a: "Off-the-shelf tools are excellent for standard work. Custom software pays off where your process is the advantage — when you would otherwise pay for licences you do not need in order to work around the software you do." },
  { q: "How can AI improve business operations?", a: "AI helps in three places: answering questions on your own knowledge, extracting and routing documents, and running repeatable decisions with guardrails. OIS adds that intelligence over the systems you already run, and Hermes AI puts it in front of employees as an AI coworker." },
  { q: "Do you build from scratch or extend existing systems?", a: "Both. Octapus extend Odoo, ERPs and CRMs where it makes sense, and build custom software where off-the-shelf tools force painful compromises." },
  { q: "What is OIS and how is it different from a chatbot?", a: "OIS — the Octapus Intelligent System — is an intelligence layer, not a chat window. It connects your existing systems and data, then lets AI agents act on them with authorization and audit trails. A chatbot answers; OIS coordinates real business activity." },
  { q: "Will AI replace our employees?", a: "No. Hermes AI and OIS agents are designed to help people work smarter — removing search, chasing and repetitive steps so employees spend their time on judgement and customers." },
  { q: "How much does an ERP or custom software project cost in the UAE?", a: "Cost depends on scope, integrations and data migration rather than headcount. Octapus size projects after a discovery phase and agree a scope, sequence and definition of done before any code is written." },
  { q: "What does an engagement typically look like?", a: "Discover, plan, design, develop, integrate, launch, support, scale. Short cycles, working software every two weeks and a definition of done agreed before code." },
  { q: "Where are you based and who do you serve?", a: "Octapus is headquartered in the UAE with offices in Dubai and Ajman. Octapus work with startups and growing companies across the GCC and internationally." },
  { q: "Do you offer ongoing support and monitoring?", a: "Yes. Operate is a first-class service — 24/7 monitoring, response and continuous improvement on the systems we build together." },
] as const;


/* -------------------------------------------------------------------------
 * Octapus disciplines — two pathways, six disciplines, one intelligence layer.
 * ---------------------------------------------------------------------- */

export type Discipline = {
  slug: string;
  name: string;
  summary: string;
  capabilities: string[];
};

export type DisciplineTrack = {
  slug: "technology" | "marketing";
  path: "/technology" | "/marketing";
  label: string;
  title: string;
  hero: string;
  intro: string;
  disciplines: Discipline[];
  keywords: string[];
};

export const disciplineTracks: DisciplineTrack[] = [
  {
    slug: "technology",
    path: "/technology",
    label: "Octapus Technology",
    title: "Engineering Intelligent Digital Systems",
    hero: "Engineering the systems that power modern businesses.",
    intro:
      "Four disciplines build and run the operating layer of your company — engineering, business systems, AI & data and operate — with OIS adding intelligence on top of everything Octapus connect.",
    keywords: [
      "software development UAE",
      "enterprise software UAE",
      "AI solutions UAE",
      "business automation UAE",
      "custom software Dubai",
      "ERP development UAE",
    ],
    disciplines: [
      {
        slug: "engineering",
        name: "Engineering",
        summary: "The foundation: software built around how your operation actually works.",
        capabilities: [
          "Custom software development",
          "Web applications",
          "Mobile applications",
          "Enterprise systems",
          "API development",
          "Cloud architecture",
        ],
      },
      {
        slug: "business-systems",
        name: "Business Systems",
        summary: "The operating layer: ERP, CRM and workflows shaped to your process.",
        capabilities: [
          "ERP",
          "CRM",
          "Business automation",
          "System integration",
          "Digital workflows",
        ],
      },
      {
        slug: "ai-and-data",
        name: "AI & Data",
        summary: "The intelligence: OIS, AI agents and data systems on top of what you already run.",
        capabilities: [
          "AI solutions",
          "AI agents",
          "OIS platform",
          "Machine learning",
          "Data intelligence",
        ],
      },
      {
        slug: "operate",
        name: "Operate",
        summary: "The continuity: the engineers who built the system keep it running.",
        capabilities: [
          "Cloud management",
          "Maintenance",
          "Support",
          "Optimization",
        ],
      },
    ],
  },
  {
    slug: "marketing",
    path: "/marketing",
    label: "Octapus Marketing",
    title: "Building Digital Presence And Business Growth",
    hero: "Building brands, creating attention, and turning ideas into digital growth.",
    intro:
      "Two disciplines build the presence around the system — design & brand and growth — connected directly to the platforms that capture and convert demand.",
    keywords: [
      "digital marketing UAE",
      "brand strategy UAE",
      "content creation UAE",
      "social media marketing UAE",
      "SEO Dubai",
      "creative agency UAE",
    ],
    disciplines: [
      {
        slug: "design-and-brand",
        name: "Design & Brand",
        summary: "The identity: a creative studio inside a technology company.",
        capabilities: [
          "Logo design",
          "Brand identity",
          "Visual systems",
          "Creative direction",
          "Content design",
        ],
      },
      {
        slug: "growth",
        name: "Growth",
        summary: "The demand engine: campaigns wired into the systems that convert.",
        capabilities: [
          "Digital marketing",
          "Social media strategy",
          "Content creation",
          "Video production",
          "Advertising",
          "SEO",
          "Campaign management",
        ],
      },
    ],
  },
];

/** One-line OIS relationship for products that carry an intelligence layer. */
export const productOisNotes: Record<string, string> = {
  "obms-erp": "OIS helps employees reach business intelligence inside the ERP instead of chasing reports.",
  "mr-crm": "OIS understands customer information and workflow, so the pipeline stays current without manual upkeep.",
  "ai-business-automation": "OIS coordinates intelligent workflows across the tools your team already uses.",
  "algorithem": "OIS applies your decision rules consistently and explains each outcome.",
  "hub8": "OIS reads across connected tools so one question does not require eight logins.",
  "odoo-custom-erp": "OIS layers intelligence over Odoo without changing the modules you rely on.",
  "erp-implementation": "OIS shortens adoption by answering process questions during and after rollout.",
  "custom-ai": "Custom AI systems are delivered on the OIS platform, with authorization and audit trails.",
  "hermes-ai": "Hermes AI is the first AI coworker inside the OIS ecosystem — powered by OIS, never above it.",
  "outreach": "OIS scores and prioritizes leads using the context already inside your systems.",
  "oprate": "OIS surfaces operational exceptions before they reach the customer.",
  "blueprint": "OIS connects project data, documents and progress into one answerable view.",
  "buy": "OIS keeps orders, stock and finance reconciled and explains any drift.",
  "icon": "OIS connects campaign performance back to the systems that capture demand.",
};

/** Industry-specific OIS use cases used across industry surfaces. */
export const industryOisUseCases: Array<{ industry: string; useCase: string }> = [
  { industry: "Construction", useCase: "OIS connects project data, documents, teams and workflows across sites." },
  { industry: "Healthcare", useCase: "OIS connects information and improves operational assistance for clinical and admin teams." },
  { industry: "Finance", useCase: "OIS helps teams reach reports and financial knowledge without waiting on analysts." },
  { industry: "Retail", useCase: "OIS keeps stock, pricing and store operations answering the same question the same way." },
  { industry: "Manufacturing", useCase: "OIS links production, maintenance and supply data into one operational picture." },
  { industry: "Logistics", useCase: "OIS tracks movement, exceptions and documentation across the chain." },
];

/** Octapus Engineering — "The warehouse for tuning your business". */
export const engineering = {
  path: "/engineering",
  label: "Octapus Engineering",
  position: "The warehouse for tuning your business.",
  intro:
    "One place where the machinery of your company is built, repaired, upgraded and tuned — software, integrations, data and infrastructure, handled by the same team that runs them after launch.",
  bays: [
    { name: "Build Bay", summary: "New systems from scratch.", items: ["Custom software", "Web applications", "Mobile applications", "Internal tools"] },
    { name: "Integration Bay", summary: "Systems that finally talk to each other.", items: ["API development", "Third-party integrations", "Data pipelines", "Legacy migration"] },
    { name: "Tuning Bay", summary: "Existing systems made faster and cheaper to run.", items: ["Performance tuning", "Cost optimization", "Refactoring", "Technical audits"] },
    { name: "Infrastructure Bay", summary: "The floor everything stands on.", items: ["Cloud architecture", "CI/CD pipelines", "Monitoring", "Security hardening"] },
    { name: "Data Bay", summary: "Turning operational exhaust into decisions.", items: ["Data modelling", "Warehousing", "Reporting layers", "AI-ready datasets"] },
    { name: "Service Bay", summary: "The system stays tuned after launch.", items: ["SLA support", "Maintenance", "Incident response", "Continuous improvement"] },
  ],
  keywords: [
    "software engineering UAE",
    "custom software development Dubai",
    "system integration UAE",
    "cloud architecture UAE",
    "legacy system modernization UAE",
  ],
};

/** Octapus Studios — the creative division. */
export const studios = {
  path: "/studios",
  label: "Octapus Studios",
  position: "Let's build your reputation.",
  intro:
    "The creative division of Octapus. Where engineering builds the machine, Studios builds how the market sees it — brand, content, campaigns and the presence that makes the system worth finding.",
  provides: [
    { name: "Brand Identity", summary: "Naming, logo systems, typography, colour and the rules that keep it consistent." },
    { name: "Web & Digital Design", summary: "Websites and product interfaces designed to convert, not just to look good." },
    { name: "Content Production", summary: "Photography, video, motion graphics and 3D built around a release calendar." },
    { name: "Social & Community", summary: "Channel strategy, always-on content and community management." },
    { name: "Campaigns & Performance", summary: "Creative and media working together — paid, organic and lifecycle." },
    { name: "Reputation & PR", summary: "Positioning, press, founder presence and review ecosystems." },
  ],
  keywords: [
    "creative agency UAE",
    "branding agency Dubai",
    "content production UAE",
    "digital marketing Dubai",
    "reputation management UAE",
  ],
};
