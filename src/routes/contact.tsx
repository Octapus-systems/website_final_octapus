import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { Section, Container } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";
import { contactSchema, type ContactInput, enquiryLabels, enquiryTypes } from "@/lib/contact-schema";
import { trackEvent } from "@/lib/analytics";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildMeta({
    title: "Contact Octapus — Let's Build Your Next Digital Success Story",
    description: "Structured enquiry form routed to the right Octapus team — product, custom software, ERP, CRM, AI, marketing, support and careers. Dubai and Ajman offices.",
    path: "/contact",
    ogType: "website",
    keywords: ["contact Octapus", "software company UAE contact", "ERP enquiry Dubai", "AI enquiry UAE", "custom software quote"],
  }),
  component: ContactPage,
});


function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
    defaultValues: { enquiryType: "product_enquiry", preferredContact: "email" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Something went wrong");
      }
      setStatus("success");
      trackEvent("form_submit", { enquiry_type: data.enquiryType });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      trackEvent("form_error");
    }
  }

  function handleFocus() {
    if (!started) { trackEvent("form_start"); setStarted(true); }
  }

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Octapus",
        url: "/contact",
        about: { "@type": "Organization", name: site.legalName, url: "/" },
        contactPoint: [
          { "@type": "ContactPoint", contactType: "sales", email: site.emails.sales, telephone: site.phones.sales, areaServed: ["AE", "GCC"], availableLanguage: ["English", "Arabic"] },
          { "@type": "ContactPoint", contactType: "customer service", email: site.emails.info, telephone: site.phones.general, areaServed: "AE", availableLanguage: ["English", "Arabic"] },
          { "@type": "ContactPoint", contactType: "technical support", email: site.emails.tech, telephone: site.phones.support, areaServed: "AE", availableLanguage: ["English", "Arabic"] },
          { "@type": "ContactPoint", contactType: "human resources", email: site.emails.hr, areaServed: "AE", availableLanguage: ["English", "Arabic"] },
        ],
      }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <Section
        eyebrow="Contact"
        title="Tell Us the Operation You Need to Connect."
        titleAs="h1"
        intro="Octapus route enquiries to the right team so you get a fast, informed response."
      />

      <Container className="pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="rounded-2xl border hairline bg-[var(--color-primary-soft)]/50 p-8 text-center">
                <CheckCircle2 className="mx-auto size-8 text-primary" />
                <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">Message received.</h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  Octapus've routed your enquiry to the right Octapus team. You'll hear back within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFocus} className="space-y-5 rounded-2xl border hairline bg-background p-6 md:p-8" noValidate>
                {/* honeypot */}
                <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Name" error={errors.name?.message} htmlFor="c-name">
                    <Input id="c-name" {...register("name")} autoComplete="name" />
                  </Field>
                  <Field label="Company" error={errors.company?.message} htmlFor="c-company">
                    <Input id="c-company" {...register("company")} autoComplete="organization" />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Work email" error={errors.email?.message} htmlFor="c-email">
                    <Input id="c-email" type="email" {...register("email")} autoComplete="email" />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message} htmlFor="c-phone">
                    <Input id="c-phone" type="tel" {...register("phone")} autoComplete="tel" />
                  </Field>
                </div>

                <Field label="Enquiry type" error={errors.enquiryType?.message} htmlFor="c-type">
                  <select
                    id="c-type"
                    {...register("enquiryType")}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {enquiryTypes.map((t) => (
                      <option key={t} value={t}>{enquiryLabels[t]}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Brief project description" error={errors.description?.message} htmlFor="c-desc">
                  <Textarea id="c-desc" rows={5} {...register("description")} />
                </Field>

                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Preferred contact" htmlFor="c-pref">
                    <select id="c-pref" {...register("preferredContact")} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </Field>
                  <Field label="Budget (optional)" htmlFor="c-budget">
                    <Input id="c-budget" {...register("budget")} placeholder="e.g. AED 50k–150k" />
                  </Field>
                  <Field label="Timeline (optional)" htmlFor="c-timeline">
                    <Input id="c-timeline" {...register("timeline")} placeholder="e.g. Q3 launch" />
                  </Field>
                </div>

                {errorMsg && (
                  <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                    {errorMsg}
                  </div>
                )}

                <Button type="submit" size="lg" className="rounded-full w-full md:w-auto" disabled={status === "loading"}>
                  {status === "loading" ? (<><Loader2 className="mr-2 size-4 animate-spin" /> Sending…</>) : "Send enquiry"}
                </Button>
                <p className="text-xs text-muted-foreground">By submitting you agree to our privacy policy. Octapus never share your information.</p>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border hairline bg-[var(--color-surface)] p-6 space-y-4 text-sm">
              <ContactRow icon={<Mail className="size-4" />} label="Sales" value={site.emails.sales} href={`mailto:${site.emails.sales}`} />
              <ContactRow icon={<Mail className="size-4" />} label="General" value={site.emails.info} href={`mailto:${site.emails.info}`} />
              <ContactRow icon={<Mail className="size-4" />} label="Careers" value={site.emails.hr} href={`mailto:${site.emails.hr}`} />
              <ContactRow icon={<Mail className="size-4" />} label="Technical" value={site.emails.tech} href={`mailto:${site.emails.tech}`} />
            </div>
            <div className="rounded-2xl border hairline p-6 space-y-4 text-sm">
              <ContactRow icon={<Phone className="size-4" />} label="General" value={site.phones.general} href={`tel:${site.phones.general.replace(/\s/g, "")}`} />
              <ContactRow icon={<Phone className="size-4" />} label="Sales" value={site.phones.sales} href={`tel:${site.phones.sales.replace(/\s/g, "")}`} />
              <ContactRow icon={<Phone className="size-4" />} label="Support" value={site.phones.support} href={`tel:${site.phones.support.replace(/\s/g, "")}`} />
            </div>
            <div className="rounded-2xl border hairline p-6 space-y-4 text-sm">
              {site.addresses.map((a) => (
                <div key={a.city} className="flex items-start gap-3">
                  <MapPin className="size-4 mt-0.5 text-primary" />
                  <div><div className="font-medium">{a.city}</div><div className="text-muted-foreground">{a.line}</div></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-primary">{icon}</span>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <a href={href} onClick={() => trackEvent(href.startsWith("mailto") ? "email_click" : "call_click")} className="text-sm font-medium hover:text-primary">{value}</a>
      </div>
    </div>
  );
}
