import { lazy, Suspense, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import tamaraBadge from "@/assets/tamara-badge.webp";
import { PAY_LATER_PATH } from "@/lib/pay-later";

// Client-only lazy import (same pattern as the Nav's mobile menu): the modal only mounts after
// a click, so the server build never needs it.
type PayLaterDialogModule = typeof import("./PayLaterDialog");
const loadPayLaterDialog: () => Promise<PayLaterDialogModule> = import.meta.env.SSR
  ? () => new Promise<PayLaterDialogModule>(() => {})
  : () => import("./PayLaterDialog");
const PayLaterDialog = lazy(loadPayLaterDialog);

/**
 * Footer "Pay Later" entry. Renders a real link to /pay-later (crawlable, works without JS and
 * with middle-click / new tab); a plain click opens the Tamara modal instead.
 */
export function PayLaterFooterLink({ className }: { className: string }) {
  const [requested, setRequested] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const preload = () => void loadPayLaterDialog();

  return (
    <>
      <Link
        ref={triggerRef}
        to={PAY_LATER_PATH}
        aria-haspopup="dialog"
        onPointerEnter={preload}
        onFocus={preload}
        onClick={(event) => {
          // Let modified clicks (new tab / window) follow the link as usual.
          if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
          )
            return;
          event.preventDefault();
          setRequested(true);
          setOpen(true);
        }}
        className={className}
      >
        Pay Later
        <img
          src={tamaraBadge}
          alt="Tamara"
          width={49}
          height={16}
          loading="lazy"
          decoding="async"
          className="h-4 w-auto rounded-[3px]"
        />
        <ArrowUpRight
          className="size-3 opacity-0 transition group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>
      {requested && (
        <Suspense fallback={null}>
          <PayLaterDialog open={open} onOpenChange={setOpen} returnFocusRef={triggerRef} />
        </Suspense>
      )}
    </>
  );
}
