import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // Skip the router's scroll handling on the first client render only: it runs once the app has
  // hydrated (seconds in, on a slow phone) and pulled visitors who had already started scrolling
  // back to the top. A fresh load already starts there; later navigations behave as before.
  let firstRender = true;
  const router = createRouter({
    routeTree,
    scrollRestoration: () => {
      if (!firstRender) return true;
      firstRender = false;
      return false;
    },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
