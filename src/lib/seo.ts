/**
 * Central SEO helpers for Octapus.
 * Every public route calls buildMeta() so titles, descriptions and social tags stay consistent.
 */

export const SITE_NAME = "Octapus";
export const SITE_TAGLINE = "Software, AI and Business Systems — UAE";
export const SITE_URL = "https://octapus-system-os.lovable.app";

export function absoluteUrl(path: string) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
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
  const {
    title,
    description,
    path,
    ogType = "website",
    image,
    noindex,
    keywords,
  } = input;

  const canonical = absoluteUrl(path);

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (keywords?.length) {
    meta.push({ name: "keywords", content: keywords.join(", ") });
  }
  if (image) {
    const absImage = absoluteUrl(image);
    meta.push({ property: "og:image", content: absImage });
    meta.push({ name: "twitter:image", content: absImage });
  }
  if (noindex) {
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
