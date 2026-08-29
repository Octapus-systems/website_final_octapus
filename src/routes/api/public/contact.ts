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

interface UploadedFile {
  name: string;
  size: number;
  type?: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

function isFileLike(val: unknown): val is UploadedFile {
  return (
    typeof val === "object" &&
    val !== null &&
    "name" in val &&
    "size" in val &&
    typeof (val as Record<string, unknown>).arrayBuffer === "function"
  );
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

        let rawData: Record<string, unknown> = {};
        let cvFile: UploadedFile | null = null;

        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
          try {
            const formData = await request.formData();
            for (const [key, value] of formData.entries()) {
              if (key === "cv" && isFileLike(value)) {
                cvFile = value;
              } else if (typeof value === "string") {
                rawData[key] = value;
              }
            }
          } catch {
            return new Response(JSON.stringify({ error: "Failed to process uploaded form data" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
        } else {
          try {
            rawData = (await request.json()) as Record<string, unknown>;
          } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
        }

        const parsed = contactSchema.safeParse(rawData);
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

        const uploadedCv = cvFile;

        if (data.enquiryType === "career") {
          if (!uploadedCv || uploadedCv.size === 0) {
            return new Response(JSON.stringify({ error: "Please upload your CV / resume" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const maxBytes = 10 * 1024 * 1024;
          if (uploadedCv.size > maxBytes) {
            return new Response(JSON.stringify({ error: "File size must be less than 10 MB" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const ext = uploadedCv.name.split(".").pop()?.toLowerCase() || "";
          const allowedExts = ["pdf", "doc", "docx"];
          if (!allowedExts.includes(ext)) {
            return new Response(
              JSON.stringify({ error: "Only PDF, DOC, and DOCX files are allowed" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }
        }

        const routedTo = routeEnquiryTo(data.enquiryType);
        const recipientEmail = data.enquiryType === "career" ? "hr@octapus.ae" : (process.env.SMTP_TO || routedTo);

        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_PORT === "465" || Number(process.env.SMTP_PORT) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          const attachments: Array<{ filename: string; content: Buffer; contentType?: string }> = [];
          if (uploadedCv && uploadedCv.size > 0) {
            const buffer = Buffer.from(await uploadedCv.arrayBuffer());
            attachments.push({
              filename: uploadedCv.name || "CV.pdf",
              content: buffer,
              contentType: uploadedCv.type,
            });
          }

          const isCareer = data.enquiryType === "career";
          const subject = isCareer
            ? `New Career Application: ${data.name}`
            : `New Enquiry: ${enquiryLabels[data.enquiryType]} from ${data.name}`;

          const textContent = isCareer
            ? `New Career Application received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Company: ${data.company || "N/A"}
Preferred Contact: ${data.preferredContact}

Tell me about yourself:
${data.description}

Attached CV: ${uploadedCv?.name || "Attached"}
`
            : `Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Company: ${data.company || "N/A"}
Preferred Contact: ${data.preferredContact}
Preferred Contact Method: ${data.preferredContact}
Budget: ${data.budget || "N/A"}
Timeline: ${data.timeline || "N/A"}

Message:
${data.description}
`;

          const mailOptions = {
            from: process.env.SMTP_FROM || '"Octapus Contact" <info@octapus.ae>',
            to: recipientEmail,
            replyTo: data.email,
            subject,
            text: textContent,
            attachments,
          };

          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error("Error sending email:", error);
          return new Response(JSON.stringify({ error: "Failed to send email. Please try again later." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        console.info("[octapus.contact]", {
          routedTo: recipientEmail,
          enquiryType: enquiryLabels[data.enquiryType],
          company: data.company,
          preferredContact: data.preferredContact,
          hasAttachment: !!cvFile,
          receivedAt: new Date().toISOString(),
        });

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
