try {
  process.loadEnvFile?.();
} catch {
  // Ignore in environments where .env is absent or pre-injected
}

import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      const host =
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        new URL(request.url).host;
      const hostname = host.split(":")[0].toLowerCase();
      const isOctapus = hostname === "octapus.ae" || hostname === "www.octapus.ae";

      const headers = new Headers(normalized.headers);

      // On non-octapus hosts, enforce X-Robots-Tag: noindex, nofollow header
      if (!isOctapus && hostname !== "") {
        headers.set("X-Robots-Tag", "noindex, nofollow");
      }

      const contentType = normalized.headers.get("content-type") ?? "";
      const isHtml = contentType.includes("text/html");

      // For HTML pages on non-octapus hosts, ensure meta robots noindex is injected
      if (!isOctapus && hostname !== "" && isHtml) {
        let html = await normalized.text();
        if (!html.includes('name="robots"')) {
          html = html.replace("<head>", '<head>\n    <meta name="robots" content="noindex,nofollow" />');
        }
        return new Response(html, {
          status: normalized.status,
          statusText: normalized.statusText,
          headers,
        });
      }

      // Edge CDN Caching: Cache successful HTML page responses at Cloudflare Edge (SSG equivalent performance)
      if (
        request.method === "GET" &&
        normalized.status === 200 &&
        !new URL(request.url).pathname.startsWith("/api/")
      ) {
        if (isHtml) {
          headers.set(
            "Cache-Control",
            "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          );
          return new Response(normalized.body, {
            status: normalized.status,
            statusText: normalized.statusText,
            headers,
          });
        }
      }

      if (!isOctapus && hostname !== "") {
        return new Response(normalized.body, {
          status: normalized.status,
          statusText: normalized.statusText,
          headers,
        });
      }

      return normalized;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
