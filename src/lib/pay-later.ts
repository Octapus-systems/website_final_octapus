/**
 * Tamara Pay Later — shared copy and links, used by the footer modal and the /pay-later page.
 * Copy is owner-supplied: do not add claims about eligibility, fees, interest or instalment periods.
 */
import { site } from "@/lib/site-config";

export const PAY_LATER_PATH = "/pay-later";

export const payLaterCopy = {
  intro:
    "Invest in software that supports your business growth. Octapus builds custom applications, business platforms, and automation tools. If Tamara approves your purchase and your available limit covers the full development quote, you can use Tamara to pay for the complete project in installments.",
  terms:
    "Tamara determines eligibility, payment limits, installment schedules, and applicable fees. Review the terms Tamara offers before accepting.",
} as const;

const WHATSAPP_MESSAGE =
  "Hello Octapus Team, I would like to know more about your Tamara Pay Later option. Could you please share the details?";

/** wa.me click-to-chat: opens the WhatsApp app on mobile and WhatsApp Web on desktop. */
export const payLaterWhatsAppUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
