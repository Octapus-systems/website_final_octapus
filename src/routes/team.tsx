import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { Section, Container } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { buildMeta, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { site, team } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { RevealButton } from "@/components/site/RevealButton";
import { TeamVisualSection } from "@/components/site/TeamVisualSection";

export const Route = createFileRoute("/team")({
  head: () =>
    buildMeta({
      title: "Meet the Team — Octapus L.L.C.",
      description:
        "The people behind Octapus: system architects, operators and growth leaders building software, AI and business systems in the UAE.",
      path: "/team",
      ogType: "profile",
      keywords: [
        "Octapus team",
        "Octapus leadership",
        "UAE software team",
        "Sayid Nazim",
        "Shabab",
        "Jishad",
        "Ajay Peter",
      ],
    }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Meet the Octapus Team",
          url: absoluteUrl("/team"),
          description: "Leadership and key team members at Octapus L.L.C.",
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ])}
      />

      {/* Hero — editorial, premium */}
      <section className="relative overflow-hidden bg-background text-foreground">
        <div className="absolute inset-0 grid-canvas dark:grid-canvas-dark opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground dark:text-silver uppercase">
                Human Insight.
                <br />
                Technical
                <br />
                Precision.
              </h1>
            </div>
            <div className="lg:text-right lg:max-w-sm">
              <div className="text-eyebrow text-primary dark:text-primary-glow mb-3">
                [ OUR TEAM ]
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Our team is a group of visionaries, creators and technologists working together to
                build the future.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team member section */}
      <TeamVisualSection />

      {/* Team grid — contact cards */}
      <Section className="relative">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <article
                key={member.name}
                className="relative flex flex-col overflow-hidden rounded-2xl border hairline bg-card shadow-sm"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top illuminated bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-primary z-10" />

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

                  <div className="mt-6 flex flex-col gap-2 border-t hairline pt-5">
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      onClick={() => trackEvent("call_click", { member: member.name })}
                      className="flex items-center gap-3 rounded-xl bg-primary/[0.06] px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
                    >
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Phone className="size-4" aria-hidden="true" />
                      </span>
                      <span className="truncate">{member.phone}</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      onClick={() => trackEvent("email_click", { member: member.name })}
                      className="flex items-center gap-3 rounded-xl bg-primary/[0.06] px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
                    >
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Mail className="size-4" aria-hidden="true" />
                      </span>
                      <span className="truncate">{member.email}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t hairline">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground dark:text-silver">
              Work with the team.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Ready to connect your systems? Reach out directly or book a strategy call.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <RevealButton
                to={`tel:${site.phones.general.replace(/\s/g, "")}`}
                external
                icon={Phone}
                label="Call us now"
                className="h-12 min-w-12 max-w-12 px-3 hover:max-w-64"
              />
              <RevealButton
                to={`mailto:${site.emails.sales}`}
                external
                icon={Mail}
                label="Email sales"
                variant="outline"
                className="h-12 min-w-12 max-w-12 px-3 hover:max-w-64"
                onClick={() => trackEvent("email_click")}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
