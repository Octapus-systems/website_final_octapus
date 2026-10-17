// Client entry: same as TanStack Start's default, except hydration waits for the first paint.
// The server-rendered HTML is complete and visible on its own, so letting the browser paint it
// before React hydrates gets content on screen sooner on slower phones.
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
}

// rAF runs just before the next frame; the timeout moves hydration to the task after it.
// Hidden tabs never fire rAF, so hydrate straight away there.
if (document.visibilityState === "hidden") hydrate();
else requestAnimationFrame(() => setTimeout(hydrate, 0));
