import { createFileRoute } from "@tanstack/react-router";
import { contactSchema, routeEnquiryTo, enquiryLabels } from "@/lib/contact-schema";

// Simple in-memory rate limit (best-effort; per-instance).
const hits = new Map<string, number[]>();
function rateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length <= limit;
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown";
        if (!rateLimit(ip)) {
          return new Response(JSON.stringify({ error: "Too many requests" }), {
            status: 429,
            headers: { "Content-Type": "application/json" },
          });
        }

        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const parsed = contactSchema.safeParse(json);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: "Validation failed", details: parsed.error.flatten() }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const data = parsed.data;
        if (data.website && data.website.length > 0) {
          // Honeypot triggered — respond OK to avoid signaling.
          return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
        }

        const routedTo = routeEnquiryTo(data.enquiryType);

        // [OCTAPUS TO PROVIDE EMAIL PROVIDER]
        // Wire an email provider (Resend / SES / Postmark) here.
        // For now we log the routed enquiry server-side so it's captured in logs.
        console.info("[octapus.contact]", {
          routedTo,
          enquiryType: enquiryLabels[data.enquiryType],
          company: data.company,
          preferredContact: data.preferredContact,
          budget: data.budget,
          timeline: data.timeline,
          receivedAt: new Date().toISOString(),
        });

        return new Response(JSON.stringify({ ok: true, routedTo }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
