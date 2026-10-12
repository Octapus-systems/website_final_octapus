import { createFileRoute, redirect } from "@tanstack/react-router";

// The old octapus.ae had /work. Permanently redirect it so its search ranking carries over.
export const Route = createFileRoute("/work")({
  beforeLoad: () => {
    throw redirect({ to: "/products", statusCode: 301 });
  },
});
