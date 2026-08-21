import { z } from "zod";

export const enquiryTypes = [
  "product_enquiry",
  "custom_software",
  "erp_crm",
  "ai_automation",
  "website_application",
  "marketing_growth",
  "support",
  "career",
  "other",
] as const;

export type EnquiryType = (typeof enquiryTypes)[number];

export const enquiryLabels: Record<EnquiryType, string> = {
  product_enquiry: "Product enquiry",
  custom_software: "Custom software",
  erp_crm: "ERP or CRM",
  ai_automation: "AI and automation",
  website_application: "Website or application",
  marketing_growth: "Marketing and growth",
  support: "Support",
  career: "Career",
  other: "Other",
};

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid work email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  enquiryType: z.enum(enquiryTypes),
  description: z.string().trim().min(10, "Tell us a little about the project").max(2000),
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  // honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function routeEnquiryTo(type: EnquiryType): string {
  switch (type) {
    case "career":
      return "hr@octapus.ae";
    case "support":
      return "code@octapus.info";
    case "product_enquiry":
    case "custom_software":
    case "erp_crm":
    case "ai_automation":
    case "website_application":
    case "marketing_growth":
      return "sales@octapus.ae";
    case "other":
    default:
      return "info@octapus.ae";
  }
}
