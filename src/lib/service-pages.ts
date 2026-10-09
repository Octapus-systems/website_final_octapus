export type ServiceScene =
  | "mobile"
  | "software"
  | "erp"
  | "automation"
  | "systems"
  | "web"
  | "marketing"
  | "production"
  | "consulting";

export type ServiceIcon = "screen" | "blocks" | "chart" | "flow" | "people";

export interface ServicePageData {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sceneDescription: string;
  scene: ServiceScene;
  whatItIs: string[];
  builds: Array<{ title: string; detail: string; icon: ServiceIcon }>;
  steps: Array<{ title: string; detail: string }>;
  situations: string[];
  related: string[];
  keywords: string[];
}

export const servicePages: ServicePageData[] = [
  {
    slug: "mobile-apps",
    title: "Android and iOS Apps",
    category: "Mobile development",
    summary:
      "Custom mobile applications designed for Android and iPhone, from the first idea through development and release.",
    sceneDescription:
      "An octopus assembling Android and iPhone style mobile screens into a working application",
    scene: "mobile",
    whatItIs: [
      "A mobile app gives customers or teams a focused way to complete important work from anywhere.",
      "We shape the interface, build the application and connect it to the systems and data it needs.",
    ],
    builds: [
      {
        title: "Customer apps",
        detail: "Clear experiences for ordering, booking, support and account access.",
        icon: "screen",
      },
      {
        title: "Team apps",
        detail: "Practical tools for field work, approvals and daily operations.",
        icon: "people",
      },
      {
        title: "Connected apps",
        detail: "Secure links to your APIs, data and existing business systems.",
        icon: "flow",
      },
      {
        title: "Release support",
        detail: "Testing and preparation for Android and Apple app stores.",
        icon: "blocks",
      },
    ],
    steps: [
      {
        title: "Understand",
        detail: "Map the people, tasks and information the app must support.",
      },
      { title: "Design", detail: "Create simple journeys and test the important screens early." },
      { title: "Build", detail: "Develop the application and connect required services." },
      { title: "Release", detail: "Test on real devices and prepare a controlled launch." },
    ],
    situations: [
      "A customer experience needs to work on mobile",
      "A field team needs a simpler tool",
      "A service needs secure mobile access",
    ],
    related: ["custom-software", "web-platforms", "business-systems"],
    keywords: ["mobile app development", "Android app development", "iOS app development"],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    category: "Business software",
    summary:
      "Software built around your organisation, its workflow and the way people complete real work.",
    sceneDescription:
      "An octopus fitting code panels and modular blocks into a custom company system",
    scene: "software",
    whatItIs: [
      "Custom software follows your process instead of forcing your work into a generic product.",
      "We turn requirements into a maintainable system with clear ownership, permissions and useful reporting.",
    ],
    builds: [
      {
        title: "Internal tools",
        detail: "Focused software for the work your teams repeat every day.",
        icon: "screen",
      },
      {
        title: "Customer systems",
        detail: "Portals and workflows that make service easier to access.",
        icon: "people",
      },
      {
        title: "Data connections",
        detail: "Reliable movement of information between existing tools.",
        icon: "flow",
      },
      {
        title: "Management views",
        detail: "Clear dashboards for decisions, progress and exceptions.",
        icon: "chart",
      },
    ],
    steps: [
      { title: "Observe", detail: "Understand the current process and where work slows down." },
      { title: "Define", detail: "Agree the essential capabilities, roles and measures." },
      { title: "Deliver", detail: "Build in useful stages and review each part with real users." },
      { title: "Improve", detail: "Learn from use and refine the system as the business changes." },
    ],
    situations: [
      "Standard software does not fit the process",
      "Several tools create repeated work",
      "A proven manual process needs a digital system",
    ],
    related: ["business-automation", "web-platforms", "technology-consulting"],
    keywords: ["custom software development", "business software", "digital platforms"],
  },
  {
    slug: "erp-systems",
    title: "ERP Systems",
    category: "Enterprise systems",
    summary:
      "Connected systems for sales, inventory, finance, people, operations and reporting in one place.",
    sceneDescription: "An octopus connecting six business module tiles to one central ERP hub",
    scene: "erp",
    whatItIs: [
      "An ERP system brings the main parts of an organisation into one dependable operating view.",
      "We configure or build the modules around real responsibilities, approvals and reporting needs.",
    ],
    builds: [
      {
        title: "Operations",
        detail: "Orders, purchasing, stock and fulfilment in one flow.",
        icon: "blocks",
      },
      {
        title: "Finance",
        detail: "Clear transaction records, approvals and management reporting.",
        icon: "chart",
      },
      {
        title: "People",
        detail: "Employee information, responsibilities and service workflows.",
        icon: "people",
      },
      {
        title: "Integration",
        detail: "Connections to commerce, payments and specialist systems.",
        icon: "flow",
      },
    ],
    steps: [
      { title: "Map", detail: "Document processes, owners, records and reporting needs." },
      { title: "Configure", detail: "Shape modules and permissions around the organisation." },
      { title: "Migrate", detail: "Clean and move essential information with care." },
      { title: "Adopt", detail: "Support teams as the new operating process becomes normal." },
    ],
    situations: [
      "Departments work from different records",
      "Stock and finance do not stay aligned",
      "Leaders need one reliable operating view",
    ],
    related: ["business-systems", "business-automation", "technology-consulting"],
    keywords: ["ERP development", "custom ERP systems", "business management software"],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    category: "Workflow automation",
    summary:
      "Practical automation for approvals, notifications, data movement and repetitive business work.",
    sceneDescription:
      "An octopus guiding documents, approvals and notifications through a clean automation line",
    scene: "automation",
    whatItIs: [
      "Automation moves routine work forward when a clear rule or event is available.",
      "We keep people in control while reducing copying, chasing and avoidable delay.",
    ],
    builds: [
      {
        title: "Approval flows",
        detail: "Route requests to the right person with a clear record.",
        icon: "flow",
      },
      {
        title: "Notifications",
        detail: "Send useful updates when an action or exception needs attention.",
        icon: "people",
      },
      {
        title: "Data movement",
        detail: "Keep connected tools in step without repeated entry.",
        icon: "blocks",
      },
      {
        title: "Process views",
        detail: "See where work is waiting and what needs a decision.",
        icon: "chart",
      },
    ],
    steps: [
      { title: "Select", detail: "Choose stable, repeated work where automation will help." },
      { title: "Set rules", detail: "Define decisions, exceptions and responsible people." },
      { title: "Connect", detail: "Link the systems and information used by the process." },
      { title: "Monitor", detail: "Measure results and adjust rules when the work changes." },
    ],
    situations: [
      "Teams copy the same information between tools",
      "Approvals depend on manual follow up",
      "Important exceptions are noticed too late",
    ],
    related: ["custom-software", "business-systems", "erp-systems"],
    keywords: ["business automation", "workflow automation", "system integration"],
  },
  {
    slug: "business-systems",
    title: "Business Systems",
    category: "Connected operations",
    summary:
      "Digital systems that connect teams, customers, operations and information around shared work.",
    sceneDescription:
      "An octopus linking teams, customers, operations and data into one connected network",
    scene: "systems",
    whatItIs: [
      "A business system gives people one consistent way to handle a connected area of work.",
      "We design the roles, records and actions together so the system supports the whole process.",
    ],
    builds: [
      {
        title: "Customer management",
        detail: "Shared records for relationships, enquiries and service.",
        icon: "people",
      },
      {
        title: "Operational control",
        detail: "Clear work queues, ownership and current status.",
        icon: "blocks",
      },
      {
        title: "Information flow",
        detail: "Consistent data across teams and connected systems.",
        icon: "flow",
      },
      {
        title: "Decision support",
        detail: "Useful reporting built around operating questions.",
        icon: "chart",
      },
    ],
    steps: [
      {
        title: "See the whole",
        detail: "Map customers, teams, information and decisions together.",
      },
      { title: "Set the model", detail: "Define shared records, roles and operating rules." },
      { title: "Connect", detail: "Build the system and integrate the services it depends on." },
      { title: "Embed", detail: "Support adoption and improve the system through actual use." },
    ],
    situations: [
      "Teams cannot see the same current information",
      "Customer work crosses several departments",
      "Management needs a connected operating picture",
    ],
    related: ["erp-systems", "custom-software", "business-automation"],
    keywords: ["custom business systems", "CRM development", "operations software"],
  },
  {
    slug: "web-platforms",
    title: "Web Platforms",
    category: "Web applications",
    summary: "Responsive web applications and customer portals designed around business needs.",
    sceneDescription:
      "An octopus building a browser, customer portal and responsive layouts across three devices",
    scene: "web",
    whatItIs: [
      "A web platform makes a service or process available through any modern browser.",
      "We design for clear tasks, dependable performance and comfortable use across screen sizes.",
    ],
    builds: [
      {
        title: "Customer portals",
        detail: "Secure access to services, records and requests.",
        icon: "people",
      },
      {
        title: "Web applications",
        detail: "Focused interfaces for complex business work.",
        icon: "screen",
      },
      {
        title: "Responsive systems",
        detail: "Layouts that remain clear on desktop, tablet and phone.",
        icon: "blocks",
      },
      {
        title: "Connected services",
        detail: "Integration with data, payments and existing software.",
        icon: "flow",
      },
    ],
    steps: [
      { title: "Frame", detail: "Define users, tasks, content and technical boundaries." },
      { title: "Prototype", detail: "Test important journeys before full development." },
      { title: "Develop", detail: "Build responsive interfaces and dependable connections." },
      { title: "Refine", detail: "Measure performance, accessibility and real use." },
    ],
    situations: [
      "Customers need secure access to a service",
      "A spreadsheet process needs a shared platform",
      "An existing portal is difficult to use on mobile",
    ],
    related: ["mobile-apps", "custom-software", "technology-consulting"],
    keywords: [
      "web application development",
      "customer portal development",
      "responsive web platform",
    ],
  },
  {
    slug: "marketing-creative",
    title: "Marketing and Creative",
    category: "Brand and campaigns",
    summary:
      "Brand campaigns, digital marketing and creative communication built around a clear business purpose.",
    sceneDescription:
      "An octopus using a brush, megaphone, pen tool and campaign board to compose a campaign",
    scene: "marketing",
    whatItIs: [
      "Marketing and creative work help the right people understand what your organisation offers and why it matters.",
      "We connect message, design and delivery so the work feels consistent wherever it appears.",
    ],
    builds: [
      {
        title: "Campaign systems",
        detail: "A clear message, audience and plan across useful channels.",
        icon: "flow",
      },
      {
        title: "Brand communication",
        detail: "Visual and written material with a consistent character.",
        icon: "blocks",
      },
      {
        title: "Digital content",
        detail: "Practical content shaped for websites and social channels.",
        icon: "screen",
      },
      {
        title: "Measurement",
        detail: "Simple reporting tied to the purpose of the work.",
        icon: "chart",
      },
    ],
    steps: [
      { title: "Clarify", detail: "Agree the audience, offer and action the work should support." },
      { title: "Create", detail: "Develop the message and visual direction as one system." },
      { title: "Publish", detail: "Prepare consistent material for the selected channels." },
      { title: "Learn", detail: "Review useful signals and improve the next cycle." },
    ],
    situations: [
      "A service needs a clearer message",
      "Campaign content lacks consistency",
      "Creative work needs to connect with business goals",
    ],
    related: ["video-image-production", "web-platforms", "technology-consulting"],
    keywords: ["marketing services", "brand campaigns", "creative communication"],
  },
  {
    slug: "video-image-production",
    title: "Video and Image Production",
    category: "Creative production",
    summary:
      "Video, photography, product visuals and digital content created for brands and businesses.",
    sceneDescription:
      "An octopus operating a camera, lens, light, clapperboard and product photography set",
    scene: "production",
    whatItIs: [
      "Production turns an idea, product or real moment into visual material people can understand.",
      "We plan the purpose first, then handle the practical craft from capture through final delivery.",
    ],
    builds: [
      {
        title: "Brand films",
        detail: "Structured stories about organisations, people and work.",
        icon: "screen",
      },
      {
        title: "Product visuals",
        detail: "Clear images and motion that explain important details.",
        icon: "blocks",
      },
      {
        title: "Campaign assets",
        detail: "Consistent material prepared for selected channels.",
        icon: "flow",
      },
      {
        title: "Production planning",
        detail: "A practical plan for people, locations, shots and delivery.",
        icon: "people",
      },
    ],
    steps: [
      { title: "Plan", detail: "Define the audience, message, format and required shots." },
      { title: "Prepare", detail: "Organise the scene, equipment, people and schedule." },
      { title: "Capture", detail: "Record with careful direction, light and sound." },
      { title: "Finish", detail: "Edit, review and deliver the correct formats." },
    ],
    situations: [
      "A product needs to be shown clearly",
      "A campaign needs original visual material",
      "A business story is better demonstrated than described",
    ],
    related: ["marketing-creative", "web-platforms", "mobile-apps"],
    keywords: ["video production", "commercial photography", "creative production"],
  },
  {
    slug: "technology-consulting",
    title: "Technology Consulting",
    category: "Technology strategy",
    summary:
      "Clear analysis and practical planning for technology decisions, systems and improvement.",
    sceneDescription:
      "An octopus studying a process map, drawing a blueprint and placing a technology plan in order",
    scene: "consulting",
    whatItIs: [
      "Technology consulting helps an organisation understand what to change before committing to a solution.",
      "We examine the work, identify constraints and create a plan that people can use to make decisions.",
    ],
    builds: [
      {
        title: "Process review",
        detail: "A clear view of current work, friction and dependencies.",
        icon: "flow",
      },
      {
        title: "Solution planning",
        detail: "A practical model for systems, data and responsibilities.",
        icon: "blocks",
      },
      {
        title: "Technical direction",
        detail: "Choices explained through business impact and tradeoffs.",
        icon: "screen",
      },
      {
        title: "Delivery roadmap",
        detail: "A sensible order for change, validation and investment.",
        icon: "chart",
      },
    ],
    steps: [
      { title: "Listen", detail: "Understand goals, daily work and current constraints." },
      { title: "Examine", detail: "Review processes, systems, data and decision points." },
      { title: "Shape", detail: "Compare options and define the right operating model." },
      { title: "Plan", detail: "Create an ordered path with clear decisions and measures." },
    ],
    situations: [
      "A major software decision needs evidence",
      "Existing systems no longer support the work",
      "A digital programme needs a practical sequence",
    ],
    related: ["custom-software", "erp-systems", "business-systems"],
    keywords: ["business technology consulting", "technology strategy", "system architecture"],
  },
];

export const serviceBySlug = new Map(servicePages.map((service) => [service.slug, service]));
