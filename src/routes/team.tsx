import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { Section, Container } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";
import { site, team } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import teamHeroImg from "@/assets/team-hero.png.asset.json";

export const Route = createFileRoute("/team")({
  head: () => buildMeta({
    title: "Meet the Team — Octapus L.L.C.",
    description: "The people behind Octapus: system architects, operators and growth leaders building software, AI and business systems in the UAE.",
    path: "/team",
    ogType: "profile",
    keywords: ["Octapus team", "Octapus leadership", "UAE software team", "Sayid Nazim", "Shabab", "Jishad", "Ajay Peter"],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Meet the Octapus Team",
        url: "/team",
        description: "Leadership and key team members at Octapus L.L.C.",
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Team", path: "/team" }])} />

      {/* Hero — dark, editorial, premium */}
      <section className="relative overflow-hidden bg-[var(--color-surface-dark)] text-foreground dark">
        <div className="absolute inset-0 grid-canvas-dark opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-silver uppercase">
                Meet Experts<br />Behind the<br />Innovation.
              </h1>
            </div>
            <div className="lg:text-right lg:max-w-sm">
              <div className="text-eyebrow text-primary-glow mb-3">[ OUR TEAM ]</div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Our team is a group of visionaries, creators and technologists working together to build the future.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team image — exact reference image */}
      <Section className="relative bg-[var(--color-surface-dark)] dark py-6 md:py-10">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border hairline shadow-2xl shadow-primary/10">
            <img
              src={teamHeroImg.url}
              alt="Meet the experts behind Octapus — Sayid Nazim, Shabab, Jishad and Ajay Peter"
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-dark)] via-transparent to-transparent opacity-40" />
          </div>
        </Container>
      </Section>

      {/* Team grid — contact cards */}
      <Section className="relative bg-[var(--color-surface-dark)] dark">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <article
                key={member.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border hairline bg-background transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top illuminated bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-80 transition-opacity group-hover:opacity-100 z-10" />

                {/* Content */}
                <div className="relative flex flex-1 flex-col p-6">
                  <div className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    {member.department}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground uppercase">
                    {member.name}
                  </h2>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {member.role}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1">
                    {member.bio}
                  </p>

                  <div className="mt-6 flex flex-col gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-full gap-2 justify-start"
                      onClick={() => trackEvent("call_click", { member: member.name })}
                    >
                      <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
                        <Phone className="size-4" />
                        {member.phone}
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="rounded-full gap-2 justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => trackEvent("email_click", { member: member.name })}
                    >
                      <a href={`mailto:${member.email}`}>
                        <Mail className="size-4" />
                        {member.email}
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t hairline bg-[var(--color-surface-dark)] dark">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-silver">
              Work with the team.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Ready to connect your systems? Reach out directly or book a strategy call.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full btn-aurora">
                <a href={`tel:${site.phones.general.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 size-4" />
                  Call us now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href={`mailto:${site.emails.sales}`} onClick={() => trackEvent("email_click")}>
                  <Mail className="mr-2 size-4" />
                  Email sales
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
