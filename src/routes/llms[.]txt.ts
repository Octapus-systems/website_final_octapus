import { createFileRoute } from "@tanstack/react-router";
import { products, services, industries, site } from "@/lib/site";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          `# ${site.legalName}`,
          "",
          `> ${site.tagline}`,
          "",
          "Octapus designs and develops custom software, ERP, CRM, automation and intelligent business tools for UAE startups and growing companies.",
          "",
          "## Pages",
          "- [Home](/): Overview of Octapus — software, AI and business systems.",
          "- [About](/about): Who Octapus is and how we work.",
          "- [Services](/services): Engineering, AI, ERP, CRM, design, growth and operate.",
          "- [Products](/products): The Octapus product ecosystem.",
          "- [Industries](/industries): Sectors where Octapus systems run.",
          "- [OIS](/ois): The Octapus Intelligent System vision.",
          "- [Blog](/blog): Field notes on software, AI and operations.",
          "- [Careers](/careers): Roles and how we hire.",
          "- [Book a strategy call](/book): Talk to the Octapus team.",
          "- [Contact](/contact): Route an enquiry to the right team.",
          "- [Support](/support): Help for existing customers.",
          "",
          "## Products",
          ...products.map((p) => `- [${p.name}](/products/${p.slug}): ${p.headline}`),
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
