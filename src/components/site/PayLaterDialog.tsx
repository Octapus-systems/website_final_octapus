import { useRef, type RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import tamaraBadge from "@/assets/tamara-badge.webp";
import { PayLaterActions } from "@/components/site/PayLaterActions";
import { payLaterCopy } from "@/lib/pay-later";

/**
 * Tamara Pay Later modal, opened from the footer. Lazy-loaded on first use so the dialog stack
 * (Radix Dialog: focus trap, Escape / outside-click dismiss, scroll lock) stays out of every
 * page's initial JavaScript. The crawlable version of this content lives at /pay-later.
 */
export default function PayLaterDialog({
  open,
  onOpenChange,
  returnFocusRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The trigger lives outside the dialog, so focus is returned to it explicitly on close. */
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  // When closing because the visitor went to the enquiry form, don't pull focus (and the
  // scroll position) back down to the footer trigger on the new page.
  const navigatingRef = useRef(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" />
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <Dialog.Content
            data-lenis-prevent
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              if (navigatingRef.current) {
                navigatingRef.current = false;
                return;
              }
              returnFocusRef.current?.focus();
            }}
            className="relative w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-[1.5rem] border border-white/10 bg-[#101014] p-6 text-white shadow-2xl shadow-black/50 outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/25 blur-[90px]"
            />

            <Dialog.Close
              aria-label="Close Pay Later details"
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>

            <div className="relative">
              <img
                src={tamaraBadge}
                alt="Tamara"
                width={123}
                height={40}
                decoding="async"
                className="h-10 w-auto rounded-lg"
              />
              <p className="mt-6 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b99cff]">
                Flexible payment options
              </p>
              <Dialog.Title className="mt-2 font-display text-3xl font-bold text-white leading-[1.05] tracking-[-0.04em] sm:text-4xl">
                Build now.
Pay later.
              </Dialog.Title>
              <Dialog.Description className="mt-4 text-sm leading-6 text-white/68 sm:text-base sm:leading-7">
                {payLaterCopy.intro}
              </Dialog.Description>
              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.045] p-4 text-xs leading-5 text-white/58 sm:text-sm sm:leading-6">
                {payLaterCopy.terms}
              </p>

              <PayLaterActions
                source="pay_later_modal"
                className="mt-6"
                onEnquire={() => {
                  navigatingRef.current = true;
                  onOpenChange(false);
                }}
              />
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
