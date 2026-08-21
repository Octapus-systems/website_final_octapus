import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { JsonLd } from "@/components/site/JsonLd";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { site } from "@/lib/site";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
            onClick={() => { router.invalidate(); reset(); }}
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Octapus — Software, AI and business systems in the UAE" },
      { name: "description", content: "Octapus designs and develops custom software, ERP, CRM, automation and intelligent business systems for UAE startups and growing companies." },
      { name: "theme-color", content: "#601CE6" },
      { property: "og:site_name", content: "Octapus" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Octapus — Software, AI and business systems in the UAE" },
      { property: "og:description", content: "Octapus designs and develops custom software, ERP, CRM, automation and intelligent business systems for UAE startups and growing companies." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Octapus — Software, AI and business systems in the UAE" },
      { name: "twitter:description", content: "Octapus designs and develops custom software, ERP, CRM, automation and intelligent business systems for UAE startups and growing companies." },
      { name: "google-site-verification", content: "[SEARCH_CONSOLE_VERIFICATION_CODE]" },
      { property: "og:image", content: "https://res.cloudinary.com/dk0v8kljx/image/upload/v1781652154/New_Logo_es6c4z.png" },
      { name: "twitter:image", content: "https://res.cloudinary.com/dk0v8kljx/image/upload/v1781652154/New_Logo_es6c4z.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://rsms.me" },
      { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" } as unknown as Record<string, string>,
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&family=Epilogue:wght@400;500;600&display=swap" },

    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Theme: set before first paint to avoid flash */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{const t=localStorage.getItem('octapus-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(t==='light'){document.documentElement.classList.remove('dark');}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {/* Consent Mode v2 default (denied) — bootstraps before GTM loads */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
          }}
        />
        {/* GTM (replace [GTM_CONTAINER_ID] with real container) */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){if(i==='[GTM_CONTAINER_ID]')return;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','[GTM_CONTAINER_ID]');`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

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

  return (
    <QueryClientProvider client={queryClient}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            alternateName: site.name,
            url: "https://octapus.ae/",
            logo: "https://res.cloudinary.com/dk0v8kljx/image/upload/v1781652154/New_Logo_es6c4z.png",
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
            "@type": "LocalBusiness",
            "@id": "https://octapus.ae/#localbusiness",
            name: site.legalName,
            url: "https://octapus.ae/",
            image: "https://res.cloudinary.com/dk0v8kljx/image/upload/v1781652154/New_Logo_es6c4z.png",
            telephone: site.phones.general,
            email: site.emails.info,
            areaServed: ["AE", "GCC"],
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
        <Nav />
        {/* Floating light toggle — always on top, all pages */}
        <div className="fixed top-3 right-32 z-[100] md:hidden">
          <ThemeToggle className="glass-card border hairline bg-background/80 backdrop-blur size-10 hover:bg-accent/50" />
        </div>
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <FloatingActions />
    </QueryClientProvider>
  );
}

