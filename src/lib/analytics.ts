// Client-safe analytics helper. Pushes to dataLayer for GTM.
// Never send PII — no names, emails, phone numbers, or free-text messages.

type EventName =
  | "strategy_call_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "product_enquiry"
  | "ois_external_click"
  | "obms_external_click"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "support_request"
  | "career_apply"
  | "product_engagement";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: EventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
