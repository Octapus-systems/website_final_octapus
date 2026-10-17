import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { LazyMotion } from "framer-motion";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { CookieConsent } from "@/components/site/CookieConsent";
import { JsonLd } from "@/components/site/JsonLd";
import { LoadingScreen, markLoaded } from "@/components/site/LoadingScreen";
import { site } from "@/lib/site-config";
import { isProductionHost } from "@/lib/seo";
import { SmoothScroll } from "@/components/site/SmoothScroll";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-eyebrow mb-4">404</div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">This page isn't here.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The link may be old, or the page may have moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // Optional: Log error to a custom reporting service
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You can try again, or head back to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border hairline bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Octapus — Software, AI and business systems in the UAE" },
      {
        name: "description",
        content:
          "Octapus designs and develops custom software, ERP, CRM, automation and intelligent business systems for UAE startups and growing companies.",
      },
      { name: "theme-color", content: "#601CE6" },
      { property: "og:site_name", content: "Octapus" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Octapus — Software, AI and business systems in the UAE" },
      {
        property: "og:description",
        content:
          "Octapus designs and develops custom software, ERP, CRM, automation and intelligent business systems for UAE startups and growing companies.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Octapus — Software, AI and business systems in the UAE" },
      { property: "og:image", content: "https://www.octapus.ae/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Octapus — software, AI and business systems in the UAE",
      },
      { name: "twitter:image", content: "https://www.octapus.ae/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/octapus-indigo-logo.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Theme: whole site is light (no dark mode). Clear any leftover class before first paint.
            Also hide the intro overlay before first paint when it was already seen this session
            (or inside an iframe) — see LoadingScreen. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;d.classList.remove('dark');if(sessionStorage.getItem('octapus_intro_seen')||window.self!==window.top)d.classList.add('octa-intro-seen');}catch(e){}})();`,
          }}
        />
        {/* Consent Mode v2 default (denied) — bootstraps before GTM loads.
            Re-applies a saved choice from <CookieConsent /> so the first hit carries it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var c=localStorage.getItem('octapus-consent');if(c==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`,
          }}
        />
        {/* Google Tag Manager — started on the visitor's first interaction, or once the page has
            loaded and gone idle (about 3 s later), so tag scripts don't compete with first render.
            Events pushed to dataLayer before then are queued and processed when GTM starts. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,l,i){w[l]=w[l]||[];var done=false,ev=['pointerdown','keydown','touchstart','scroll','wheel'],opt={passive:true};function load(){if(done)return;done=true;ev.forEach(function(e){w.removeEventListener(e,load,opt)});w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;d.head.appendChild(j);}ev.forEach(function(e){w.addEventListener(e,load,opt)});function idle(){setTimeout(function(){(w.requestIdleCallback||function(c){setTimeout(c,1)})(load,{timeout:2000})},3000)}if(d.readyState==='complete')idle();else w.addEventListener('load',idle);})(window,document,'dataLayer','GTM-5GNZ8V3S');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5GNZ8V3S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <a
          href="#main"
          className="sr-only fixed left-4 top-4 z-[1000] rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// framer-motion's animation features load once the page has finished loading and is idle, keeping the
// animation engine out of the entry bundle and off the first-paint path.
const afterLoad = () =>
  new Promise<void>((resolve) => {
    // After `load`, wait for an idle moment (max 2 s) so this chunk never competes with first paint.
    const idle = () =>
      window.requestIdleCallback
        ? window.requestIdleCallback(() => resolve(), { timeout: 2000 })
        : window.setTimeout(resolve, 200);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
const loadMotionFeatures = () =>
  afterLoad()
    .then(() => import("@/lib/motion-features"))
    .then((mod) => mod.default);

function RootComponent() {
  // The intro is the homepage's brand moment: it only plays when a visit starts on "/".
  // useState keeps the landing path fixed, so client-side navigation never triggers it.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [landedOnHome] = useState(() => pathname === "/");
  useEffect(() => {
    if (!landedOnHome) markLoaded();
  }, [landedOnHome]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isProductionHost(window.location.hostname)) {
      if (!document.querySelector('meta[name="robots"]')) {
        const meta = document.createElement("meta");
        meta.name = "robots";
        meta.content = "noindex,nofollow";
        document.head.appendChild(meta);
      }
    }
  }, []);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const update = () => {
      meta.setAttribute(
        "content",
        document.documentElement.classList.contains("dark") ? "#0F172A" : "#601CE6",
      );
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Light site everywhere, including Team
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.octapus.ae/#organization",
            name: site.legalName,
            alternateName: site.name,
            url: "https://www.octapus.ae/",
            logo: "https://www.octapus.ae/logo.png",
            sameAs: site.socials.filter((s) => s.name !== "WhatsApp").map((s) => s.href),
            email: site.emails.info,
            telephone: site.phones.general,
            address: [
              {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
                streetAddress: site.addresses[0].line,
              },
              {
                "@type": "PostalAddress",
                addressLocality: "Ajman",
                addressCountry: "AE",
                streetAddress: site.addresses[1].line,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://www.octapus.ae/#localbusiness",
            name: site.legalName,
            alternateName: "Octapus",
            description:
              "AI and software development company in Dubai and Ajman, UAE: custom software, AI agents and automation, ERP, CRM, mobile apps, web platforms and digital marketing.",
            knowsAbout: [
              "Artificial intelligence",
              "AI agents",
              "Business process automation",
              "Custom software development",
              "ERP systems",
              "CRM systems",
              "Mobile app development",
              "Web application development",
              "Systems integration",
              "Digital marketing",
            ],
            url: "https://www.octapus.ae/",
            image: "https://www.octapus.ae/og-image.png",
            logo: "https://www.octapus.ae/logo.png",
            sameAs: site.socials.filter((s) => s.name !== "WhatsApp").map((s) => s.href),
            telephone: site.phones.general,
            email: site.emails.info,
            areaServed: ["Dubai", "Ajman", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
            location: site.addresses.map((a) => ({
              "@type": "Place",
              name: `Octapus ${a.city}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: a.line,
                addressLocality: a.city,
                addressCountry: "AE",
              },
            })),
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
              streetAddress: site.addresses[0].line,
            },
          },
        ]}
      />

      <div className="flex min-h-dvh flex-col">
        {landedOnHome && <LoadingScreen />}
        <SmoothScroll />
        <Nav />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <FloatingActions />
      <CookieConsent />
    </LazyMotion>
  );
}
