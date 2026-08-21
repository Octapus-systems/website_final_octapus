import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/mcp")({
  head: () => buildMeta({
    title: "Model Context Protocol — Octapus",
    description: "Octapus MCP endpoint documentation.",
    path: "/mcp",
    noindex: true,
  }),
  component: () => (
    <Section titleAs="h1" eyebrow="Developer" title="Model Context Protocol">
      <div className="mx-auto max-w-3xl text-muted-foreground space-y-4">
        <p>This route reserves the Octapus MCP endpoint. Documentation and authenticated access are published as the endpoint is finalized.</p>

      </div>
    </Section>
  ),
});
