import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// Must match the key read by the Consent Mode bootstrap script in __root.tsx.
export const CONSENT_STORAGE_KEY = "octapus-consent";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(choice: Choice) {
  window.dataLayer = window.dataLayer || [];
  const gtag =
    window.gtag ??
    function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
  gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
  // GTM custom event so consent-gated tags (e.g. Meta Pixel) can fire mid-session.
  window.dataLayer.push({ event: "consent_update", consent_choice: choice });
}

/** Consent Mode v2 banner. Defaults stay "denied" until the visitor accepts. */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Storage blocked: choice applies to this page view only.
    }
    applyConsent(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 print:hidden"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border hairline bg-background p-4 shadow-lg sm:flex-row sm:items-center sm:gap-4">
        <p className="flex-1 text-sm text-muted-foreground">
          We use cookies to measure site traffic and improve our marketing. See our{" "}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex items-center justify-center rounded-full border hairline bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
