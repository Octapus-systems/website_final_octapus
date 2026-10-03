import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, isProductionHost } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }: { request?: Request } = {}) => {
        const host =
          request?.headers?.get("x-forwarded-host") ||
          request?.headers?.get("host") ||
          "";
        const isOctapus = isProductionHost(host);

        if (!isOctapus && host !== "") {
          const body = ["User-agent: *", "Disallow: /"].join("\n");
          return new Response(body, {
            headers: {
              "Content-Type": "text/plain",
              "X-Robots-Tag": "noindex, nofollow",
            },
          });
        }

        const body = [
          "User-agent: *",
          "Allow: /",
          "",
          `Sitemap: ${SITE_URL}/sitemap.xml`,
        ].join("\n");
        return new Response(body, { headers: { "Content-Type": "text/plain" } });
      },
    },
  },
});
