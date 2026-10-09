import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { Section } from "@/components/site/Section";
import { serviceBySlug } from "@/lib/service-pages";
import { buildMeta } from "@/lib/seo";

function ServiceDetailPage() {
  return <ServicePageTemplate service={Route.useLoaderData()} />;
}

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug.get(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Service not found | Octapus" }, { name: "robots", content: "noindex" }],
      };
    return buildMeta({
      title: `${loaderData.title} | Octapus`,
      description: loaderData.summary,
      path: `/services/${params.slug}`,
      ogType: "website",
      keywords: [...loaderData.keywords, "Octapus", "UAE"],
    });
  },
  component: ServiceDetailPage,
  notFoundComponent: () => (
    <Section
      titleAs="h1"
      title="Service not found"
      intro="The service page you requested is not available."
    >
      <div className="text-center">
        <Link
          to="/services"
          className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
        >
          View all services
        </Link>
      </div>
    </Section>
  ),
});
