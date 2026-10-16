import { createFileRoute } from "@tanstack/react-router";
import { products, services, industries, site, noindexProductSlugs } from "@/lib/site";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          `# ${site.legalName}`,
          "",
          `> ${site.tagline}`,
          "",
          "Octapus L.L.C. is an AI and software development company in the United Arab Emirates, with offices in Business Village, Dubai and Amper Gem Tower, Ajman. It designs, builds and operates custom software, AI agents and automation, ERP and CRM systems, mobile apps, web platforms and digital marketing for businesses across the UAE and GCC.",
          "",
          "## Key facts",
          "- Type: AI and software development company (IT company), UAE",
          "- Offices: Dubai (Business Village) and Ajman (Amper Gem Tower, Khalifa Street)",
          "- Serves: Dubai, Ajman, Sharjah, Abu Dhabi, the wider UAE and the GCC",
          "- Core work: custom software, AI agents and automation, ERP, CRM, mobile and web apps, system integration, digital marketing",
          "- Own platform: OIS (Octapus Intelligent System), an AI layer over the tools a company already uses",
          `- Contact: ${site.emails.info} · ${site.phones.general} · WhatsApp +${site.whatsapp}`,
          "- Start a project: https://octapus.ae/book",
          "",
          "## Official profiles",
          ...site.socials.map((s) => `- ${s.name}: ${s.href}`),
          "",
          "## Pages",
          "- [Home](/): Overview of Octapus — software, AI and business systems.",
          "- [About](/about): Who Octapus is and how Octapus work.",
          "- [Services](/services): Engineering, AI, ERP, CRM, design, growth and operate.",
          "- [Products](/products): The Octapus product ecosystem.",
          "- [Industries](/industries): Sectors where Octapus systems run.",
          "- [OIS](/ois): The Octapus Intelligent System vision.",
          "- [Blog](/blog): Field notes on software, AI and operations.",
          "- [Careers](/careers): Roles and how Octapus hire.",
          "- [Book a strategy call](/book): Talk to the Octapus team.",
          "- [Contact](/contact): Route an enquiry to the right team.",
          "- [Support](/support): Help for existing customers.",
          "",
          "## Products",
          ...products
            .filter((p) => !noindexProductSlugs.includes(p.slug))
            .map((p) => `- [${p.name}](/products/${p.slug}): ${p.headline}`),
          "",
          "## Services",
          ...services.map((s) => `- [${s.name}](/services): ${s.summary}`),
          "",
          "## Industries",
          industries.join(", "),
          "",
          "## Optional",
          "- [Privacy](/privacy): Privacy policy.",
          "- [Terms](/terms): Terms of service.",
          "- [Sitemap](/sitemap): Human-readable site index.",
          "",
          "## Contact",
          `Sales: ${site.emails.sales}`,
          `General: ${site.emails.info}`,
          `Careers: ${site.emails.hr}`,
          `Technical: ${site.emails.tech}`,
          `Phone: ${site.phones.general}`,
          `Offices: ${site.addresses.map((a) => `${a.city} — ${a.line}`).join("; ")}`,
        ].join("\n");
        return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
