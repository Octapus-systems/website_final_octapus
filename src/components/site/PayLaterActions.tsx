import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { payLaterWhatsAppUrl } from "@/lib/pay-later";
import { cn } from "@/lib/utils";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  );
}

/**
 * The two Tamara Pay Later enquiry options: the existing /contact enquiry form and WhatsApp
 * (company number from site config). Equal size and weight; distinguished by colour and icon.
 */
export function PayLaterActions({
  source,
  onEnquire,
  className,
}: {
  /** Analytics source label, e.g. "pay_later_modal". */
  source: string;
  /** Called when the visitor heads to the enquiry form (the modal closes itself here). */
  onEnquire?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <Button asChild size="lg" className="h-12 w-full rounded-full px-5 text-sm">
        <Link
          to="/contact"
          onClick={() => {
            trackEvent("contact_cta_click", { source });
            onEnquire?.();
          }}
        >
          <Send aria-hidden="true" />
          Enquire
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="secondary"
        className="h-12 w-full rounded-full bg-[#25D366] px-5 text-sm text-[#06210f] shadow-md shadow-[#25D366]/25 hover:bg-[#1ebe5b] hover:shadow-lg hover:shadow-[#25D366]/35 active:translate-y-px active:scale-[0.99] active:bg-[#19a952]"
      >
        <a
          href={payLaterWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire Through WhatsApp (opens in a new tab)"
          onClick={() => trackEvent("whatsapp_click", { source })}
        >
          <WhatsAppIcon />
          Enquire Through WhatsApp
        </a>
      </Button>
    </div>
  );
}
