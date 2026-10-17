#!/usr/bin/env node
// Dependency-free smoke test for a running build.
// Usage: npm run build && npm start   (in one terminal)
//        npm run test:smoke [-- http://localhost:3000]
// Requests carry X-Forwarded-Host: www.octapus.ae so the server applies production SEO rules.

const BASE = (process.argv[2] || process.env.SMOKE_BASE || "http://localhost:3000").replace(
  /\/$/,
  "",
);

const PAGES = [
  "/",
  "/about",
  "/team",
  "/careers",
  "/contact",
  "/book",
  "/support",
  "/services",
  "/products",
  "/industries",
  "/ois",
  "/engineering",
  "/studios",
  "/technology",
  "/marketing",
  "/blog",
  "/privacy",
  "/terms",
  "/sitemap",
  "/products/billing-software",
  "/products/obms-erp",
  "/products/lms",
  "/products/horus-ai",
  "/products/odoo-custom-erp",
  "/products/outreach",
  "/products/erp-implementation",
  "/services/mobile-apps",
  "/services/custom-software",
  "/services/erp-systems",
  "/services/business-automation",
  "/services/business-systems",
  "/services/web-platforms",
  "/services/marketing-creative",
  "/services/video-image-production",
  "/services/technology-consulting",
];
const NOINDEX = new Set(["/terms"]);

const failures = [];
const check = (cond, msg) => {
  if (!cond) failures.push(msg);
};
const get = (path) =>
  fetch(BASE + path, { headers: { "X-Forwarded-Host": "www.octapus.ae" }, redirect: "manual" });
const count = (html, re) => (html.match(re) || []).length;

for (const path of PAGES) {
  const res = await get(path);
  const html = await res.text();
  check(res.status === 200, `${path}: status ${res.status}`);
  check(count(html, /<title>/g) === 1, `${path}: expected 1 <title>`);
  check(count(html, /<link rel="canonical"/g) === 1, `${path}: expected 1 canonical`);
  check(
    count(html, /<h1[\s>]/g) === 1,
    `${path}: expected 1 <h1>, found ${count(html, /<h1[\s>]/g)}`,
  );
  check(count(html, /<meta name="description"/g) === 1, `${path}: expected 1 meta description`);
  check(
    /property="og:image" content="https:\/\/[^"]+\.(png|jpe?g|webp)"/.test(html),
    `${path}: og:image must be an absolute raster image`,
  );
  check(!/"price":"0"/.test(html), `${path}: structured data must not declare price 0`);
  check(
    !/"(url|item|image|logo)":"\//.test(html),
    `${path}: structured data URLs must be absolute`,
  );
  const noindex = /name="robots" content="noindex/.test(html);
  check(
    noindex === NOINDEX.has(path),
    `${path}: noindex=${noindex}, expected ${NOINDEX.has(path)}`,
  );
}

const work = await get("/work");
check(
  work.status === 301 && /\/products$/.test(work.headers.get("location") || ""),
  "/work must 301 to /products",
);
const missing = await get("/this-page-does-not-exist");
check(missing.status === 404, `unknown route must 404 (got ${missing.status})`);
const robots = await (await get("/robots.txt")).text();
check(
  /Sitemap: https:\/\/www\.octapus\.ae\/sitemap\.xml/.test(robots),
  "robots.txt must reference the sitemap",
);
const sitemap = await (await get("/sitemap.xml")).text();
check(count(sitemap, /<url>/g) >= 30, "sitemap.xml should list the public pages");
check(!/\/terms</.test(sitemap), "sitemap.xml must not list the placeholder /terms page");
const home = await get("/");
check(home.headers.get("x-content-type-options") === "nosniff", "security headers must be present");

if (failures.length) {
  console.error(`Smoke test FAILED (${failures.length}):\n - ` + failures.join("\n - "));
  process.exit(1);
}
console.log(`Smoke test passed: ${PAGES.length} pages + redirects, 404, robots, sitemap, headers.`);
