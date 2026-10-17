import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

/**
 * Mobile navigation drawer. Lazy-loaded by Nav on first open so the dialog stack
 * (Radix Dialog, focus scope, scroll lock) is not part of every page's initial JavaScript.
 */
export default function MobileMenuSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[26rem] overflow-y-auto"
        // The trigger lives outside the dialog, so return focus to it explicitly on close.
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          document.getElementById("mobile-menu-trigger")?.focus();
        }}
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-semibold tracking-tight">Navigation</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
