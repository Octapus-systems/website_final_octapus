import { createFileRoute } from "@tanstack/react-router";
import { contactSchema, routeEnquiryTo, enquiryLabels } from "@/lib/contact-schema";
import nodemailer from "nodemailer";

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
          return new Response(JSON.stringify({ ok: true }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        const routedTo = routeEnquiryTo(data.enquiryType);

        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_PORT === "465" || Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          const mailOptions = {
            from: process.env.SMTP_FROM || '"Octapus Contact" <info@octapus.ae>',
            to: process.env.SMTP_TO || "info@octapus.ae",
            replyTo: data.email,
            subject: `New Enquiry: ${enquiryLabels[data.enquiryType]} from ${data.name}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Company: ${data.company || "N/A"}
Preferred Contact: ${data.preferredContact}
Budget: ${data.budget || "N/A"}
Timeline: ${data.timeline || "N/A"}

Message:
${data.description}
            `,
          };

          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error("Error sending email:", error);
          return new Response(JSON.stringify({ error: "Failed to send email" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        // For now Octapus log the routed enquiry server-side so it's captured in logs.
        console.info("[octapus.contact]", {
          routedTo,
          enquiryType: enquiryLabels[data.enquiryType],
          company: data.company,
          preferredContact: data.preferredContact,
          budget: data.budget,
          timeline: data.timeline,
          receivedAt: new Date().toISOString(),
        });

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
