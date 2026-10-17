import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Phone, MapPin, Upload, Send } from "lucide-react";
import { Section, Container } from "@/components/site/Section";
import { RevealActionButton } from "@/components/site/RevealButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";
import {
  contactSchema,
  type ContactInput,
  enquiryLabels,
  enquiryTypes,
} from "@/lib/contact-schema";
import { trackEvent } from "@/lib/analytics";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMeta, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildMeta({
      title: "Contact Octapus — Let's Build Your Next Digital Success Story",
      description:
        "Contact Octapus about custom software, ERP, CRM, AI automation, websites or marketing. Your enquiry goes straight to the right team in Dubai or Ajman.",
      path: "/contact",
      ogType: "website",
      keywords: [
        "contact Octapus",
        "software company UAE contact",
        "ERP enquiry Dubai",
        "AI enquiry UAE",
        "custom software quote",
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const successRef = useRef<HTMLDivElement>(null);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
    defaultValues: { enquiryType: "product_enquiry", preferredContact: "email" },
  });

  const currentEnquiryType = watch("enquiryType");
  const isCareer = currentEnquiryType === "career";

  // Move focus to the confirmation so keyboard and screen-reader users know it was sent.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (!isCareer) {
      setCvFile(null);
      setCvError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isCareer]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setCvFile(null);
      setCvError("Please upload your CV / resume");
      return;
    }

    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      setCvFile(null);
      setCvError("File size must be less than 10 MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const allowedExts = ["pdf", "doc", "docx"];
    if (!allowedExts.includes(ext)) {
      setCvFile(null);
      setCvError("Only PDF, DOC, and DOCX files are allowed");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setCvFile(file);
    setCvError(null);
  }

  async function onSubmit(data: ContactInput) {
    setStatus("loading");
    setErrorMsg(null);

    if (data.enquiryType === "career") {
      if (!cvFile) {
        setCvError("Please upload your CV / resume");
        setStatus("idle");
        return;
      }
      const ext = cvFile.name.split(".").pop()?.toLowerCase() || "";
      const allowedExts = ["pdf", "doc", "docx"];
      if (!allowedExts.includes(ext)) {
        setCvError("Only PDF, DOC, and DOCX files are allowed");
        setStatus("idle");
        return;
      }
      if (cvFile.size > 10 * 1024 * 1024) {
        setCvError("File size must be less than 10 MB");
        setStatus("idle");
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("company", data.company || "");
      formData.append("email", data.email);
      formData.append("phone", data.phone || "");
      formData.append("enquiryType", data.enquiryType);
      formData.append("description", data.description);
      formData.append("preferredContact", data.preferredContact);
      formData.append("budget", data.budget || "");
      formData.append("timeline", data.timeline || "");
      formData.append("website", data.website || "");

      if (data.enquiryType === "career" && cvFile) {
        formData.append("cv", cvFile);
      }

      const res = await fetch("/api/public/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Something went wrong while sending your enquiry");
      }
      setStatus("success");
      trackEvent("form_submit", { enquiry_type: data.enquiryType });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong while sending your enquiry",
      );
      trackEvent("form_error");
    }
  }

  function handleFocus() {
    if (!started) {
      trackEvent("form_start");
      setStarted(true);
    }
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Octapus",
          url: absoluteUrl("/contact"),
          about: { "@type": "Organization", name: site.legalName, url: absoluteUrl("/") },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              email: site.emails.sales,
              telephone: site.phones.sales,
              areaServed: ["AE", "GCC"],
              availableLanguage: ["English", "Arabic"],
            },
            {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: site.emails.info,
              telephone: site.phones.general,
              areaServed: "AE",
              availableLanguage: ["English", "Arabic"],
            },
            {
              "@type": "ContactPoint",
              contactType: "technical support",
              email: site.emails.tech,
              telephone: site.phones.support,
              areaServed: "AE",
              availableLanguage: ["English", "Arabic"],
            },
            {
              "@type": "ContactPoint",
              contactType: "human resources",
              email: site.emails.hr,
              areaServed: "AE",
              availableLanguage: ["English", "Arabic"],
            },
          ],
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Section
        eyebrow="Contact"
        title="Tell Us the Operation You Need to Connect."
        titleAs="h1"
        intro="We route every enquiry to the right team, so you get a fast, informed response."
      />

      <Container className="pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div
                ref={successRef}
                role="status"
                tabIndex={-1}
                className="rounded-2xl border hairline bg-[var(--color-primary-soft)]/50 p-8 text-center outline-none"
              >
                <CheckCircle2 className="mx-auto size-8 text-primary" aria-hidden="true" />
                <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                  Message received.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  We've routed your enquiry to the right Octapus team. You'll hear back within one
                  business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                onFocus={handleFocus}
                className="space-y-5 rounded-2xl border hairline bg-background p-6 md:p-8"
                noValidate
              >
                {/* honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                  {...register("website")}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Name" required error={errors.name?.message} htmlFor="c-name">
                    <Input
                      id="c-name"
                      {...register("name")}
                      autoComplete="name"
                      aria-required="true"
                      {...errorProps("c-name", errors.name?.message)}
                    />
                  </Field>
                  <Field label="Company" error={errors.company?.message} htmlFor="c-company">
                    <Input id="c-company" {...register("company")} autoComplete="organization" />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Work email"
                    required
                    error={errors.email?.message}
                    htmlFor="c-email"
                  >
                    <Input
                      id="c-email"
                      type="email"
                      inputMode="email"
                      {...register("email")}
                      autoComplete="email"
                      aria-required="true"
                      {...errorProps("c-email", errors.email?.message)}
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message} htmlFor="c-phone">
                    <Input
                      id="c-phone"
                      type="tel"
                      inputMode="tel"
                      {...register("phone")}
                      autoComplete="tel"
                      placeholder="+971"
                      {...errorProps("c-phone", errors.phone?.message)}
                    />
                  </Field>
                </div>

                <Field label="Enquiry type" error={errors.enquiryType?.message} htmlFor="c-type">
                  <select
                    id="c-type"
                    {...register("enquiryType")}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {enquiryTypes.map((t) => (
                      <option key={t} value={t}>
                        {enquiryLabels[t]}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label={isCareer ? "Tell us about yourself" : "Brief project description"}
                  required
                  error={errors.description?.message}
                  htmlFor="c-desc"
                >
                  <Textarea
                    id="c-desc"
                    rows={5}
                    aria-required="true"
                    {...errorProps("c-desc", errors.description?.message)}
                    placeholder={
                      isCareer
                        ? "Introduce yourself, your background, and why you'd like to join Octapus..."
                        : undefined
                    }
                    {...register("description")}
                  />
                </Field>

                {isCareer && (
                  <Field
                    label="Attach CV / Resume (PDF, DOC, DOCX — max 10MB)"
                    required
                    error={cvError || undefined}
                    htmlFor="c-cv"
                  >
                    <div className="relative">
                      <Input
                        id="c-cv"
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        aria-required="true"
                        {...errorProps("c-cv", cvError || undefined)}
                        className="cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                    </div>
                    {cvFile && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                        <Upload className="size-3.5 text-primary" />
                        Selected file:{" "}
                        <span className="font-medium text-foreground">{cvFile.name}</span> (
                        {(cvFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </p>
                    )}
                  </Field>
                )}

                {!isCareer && (
                  <div className="grid gap-5 md:grid-cols-3">
                    <Field label="Preferred contact" htmlFor="c-pref">
                      <select
                        id="c-pref"
                        {...register("preferredContact")}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                    </Field>
                    <Field label="Budget (optional)" htmlFor="c-budget">
                      <Input
                        id="c-budget"
                        {...register("budget")}
                        placeholder="e.g. AED 50k–150k"
                      />
                    </Field>
                    <Field label="Timeline (optional)" htmlFor="c-timeline">
                      <Input
                        id="c-timeline"
                        {...register("timeline")}
                        placeholder="e.g. Q3 launch"
                      />
                    </Field>
                  </div>
                )}

                {errorMsg && (
                  <div
                    role="alert"
                    className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
                  >
                    {errorMsg}
                  </div>
                )}

                <RevealActionButton
                  type="submit"
                  icon={Send}
                  label="Send enquiry"
                  loadingLabel="Sending"
                  loading={status === "loading"}
                  className="w-full md:w-auto"
                  disabled={status === "loading"}
                  expanded
                />
                <p className="text-xs text-muted-foreground">
                  <span aria-hidden="true">*</span> Required. By submitting you agree to our{" "}
                  <Link
                    to="/privacy"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    privacy policy
                  </Link>
                  . We never share your information.
                </p>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border hairline bg-[var(--color-surface)] p-6 space-y-4 text-sm">
              <ContactRow
                icon={<Mail className="size-4" />}
                label="Sales"
                value={site.emails.sales}
                href={`mailto:${site.emails.sales}`}
              />
              <ContactRow
                icon={<Mail className="size-4" />}
                label="General"
                value={site.emails.info}
                href={`mailto:${site.emails.info}`}
              />
              <ContactRow
                icon={<Mail className="size-4" />}
                label="Careers"
                value={site.emails.hr}
                href={`mailto:${site.emails.hr}`}
              />
              <ContactRow
                icon={<Mail className="size-4" />}
                label="Technical"
                value={site.emails.tech}
                href={`mailto:${site.emails.tech}`}
              />
            </div>
            <div className="rounded-2xl border hairline p-6 space-y-4 text-sm">
              <ContactRow
                icon={<Phone className="size-4" />}
                label="General"
                value={site.phones.general}
                href={`tel:${site.phones.general.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={<Phone className="size-4" />}
                label="Sales"
                value={site.phones.sales}
                href={`tel:${site.phones.sales.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={<Phone className="size-4" />}
                label="Support"
                value={site.phones.support}
                href={`tel:${site.phones.support.replace(/\s/g, "")}`}
              />
            </div>
            <div className="rounded-2xl border hairline p-6 space-y-4 text-sm">
              {site.addresses.map((a) => (
                <div key={a.city} className="flex items-start gap-3">
                  <MapPin className="size-4 mt-0.5 text-primary" />
                  <div>
                    <div className="font-medium">{a.city}</div>
                    <div className="text-muted-foreground">{a.line}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

/** Links an input to its error message so screen readers announce it with the field. */
function errorProps(id: string, error?: string) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            {" "}
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-primary" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <a
          href={href}
          onClick={() => trackEvent(href.startsWith("mailto") ? "email_click" : "call_click")}
          className="text-sm font-medium hover:text-primary"
        >
          {value}
        </a>
      </div>
    </div>
  );
}
