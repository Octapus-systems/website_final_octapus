/**
 * Central SEO helpers for Octapus.
 * Every public route calls buildMeta() so titles, descriptions and social tags stay consistent.
 */

export const SITE_NAME = "Octapus";
export const SITE_TAGLINE = "Software, AI and Business Systems — UAE";
export const SITE_URL = (() => {
  const envUrl =
    typeof process !== "undefined" && process.env?.SITE_URL
      ? process.env.SITE_URL.replace(/\/+$/, "")
      : "";
  if (envUrl) {
    if (envUrl === "https://octapus.ae" || envUrl === "http://octapus.ae") {
      return "https://www.octapus.ae";
    }
    return envUrl;
  }
  return "https://www.octapus.ae";
})();

export const ALLOWED_ROBOTS_HOSTS = new Set([
  "octapus.ae",
  "www.octapus.ae",
  "website-final-octapus.vercel.app",
]);

export function isProductionHost(hostOrUrl?: string): boolean {
  if (!hostOrUrl) {
    if (typeof window !== "undefined") {
      hostOrUrl = window.location.hostname;
    } else {
      try {
        hostOrUrl = new URL(SITE_URL).hostname;
      } catch {
        hostOrUrl = "www.octapus.ae";
      }
    }
  }
  const clean = hostOrUrl
    .split(",")[0]
    .trim()
    .replace(/^https?:\/\//i, "")
    .split("/")[0]
    .split(":")[0]
    .toLowerCase();
  return clean === "octapus.ae" || clean === "www.octapus.ae";
}

export function isAllowedRobotsHost(hostOrUrl?: string): boolean {
  if (!hostOrUrl) {
    if (typeof window !== "undefined") {
      hostOrUrl = window.location.hostname;
    } else {
      try {
        hostOrUrl = new URL(SITE_URL).hostname;
      } catch {
        hostOrUrl = "www.octapus.ae";
      }
    }
  }
  const clean = hostOrUrl
    .split(",")[0]
    .trim()
    .replace(/^https?:\/\//i, "")
    .split("/")[0]
    .split(":")[0]
    .toLowerCase();
  return isProductionHost(clean) || ALLOWED_ROBOTS_HOSTS.has(clean);
}

export const isCrawlableHost = isAllowedRobotsHost;


export function absoluteUrl(path: string) {
  if (!path || path === "/") return `${SITE_URL}/`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** 1200×630 share image. Social platforms don't render SVG, so this is a PNG. */
export const DEFAULT_OG_IMAGE = "/og-image.png";

/** Social platforms only accept raster images for og:image (no SVG, no video). */
export function isShareableImage(src?: string): src is string {
  return Boolean(src && /\.(png|jpe?g|webp|gif)($|\?)/i.test(src));
}

export type MetaInput = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article" | "product" | "profile";
  image?: string;
  noindex?: boolean;
  keywords?: string[];
};

export function buildMeta(input: MetaInput) {
  const { title, description, path, ogType = "website", image, noindex, keywords } = input;

  const canonical = absoluteUrl(path);

  // If served on a host other than octapus.ae, mark noindex,nofollow
  const shouldNoindex = Boolean(
    noindex || (typeof window !== "undefined" && !isProductionHost(window.location.hostname)),
  );

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_AE" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (keywords?.length) {
    meta.push({ name: "keywords", content: keywords.join(", ") });
  }
  const absImage = absoluteUrl(isShareableImage(image) ? image : DEFAULT_OG_IMAGE);
  meta.push({ property: "og:image", content: absImage });
  meta.push({ name: "twitter:image", content: absImage });
  if (shouldNoindex) {
    meta.push({ name: "robots", content: "noindex,nofollow" });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.name,
      item: absoluteUrl(i.path),
    })),
  };
}
