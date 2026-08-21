import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          "User-agent: *",
          "Allow: /",
          "",
          "Sitemap: https://octapus-system-os.lovable.app/sitemap.xml",
        ].join("\n");
        return new Response(body, { headers: { "Content-Type": "text/plain" } });
      },
    },
  },
});
