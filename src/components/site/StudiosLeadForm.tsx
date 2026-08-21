import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { trackEvent } from "@/lib/analytics";

export function StudiosLeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
    defaultValues: { enquiryType: "marketing_growth", preferredContact: "email" },
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
      trackEvent("form_submit", { enquiry_type: data.enquiryType, source: "studios_cta" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      trackEvent("form_error", { source: "studios_cta" });
    }
  }

  function handleFocus() {
    if (!started) {
      trackEvent("form_start", { source: "studios_cta" });
      setStarted(true);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border hairline bg-[var(--color-surface)] p-8 text-center">
        <CheckCircle2 className="mx-auto size-8 text-primary" />
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">Brief received.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The Studios team will come back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFocus}
      noValidate
      className="space-y-5 rounded-2xl border hairline bg-background p-6 md:p-8"
    >
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />
      <input type="hidden" {...register("enquiryType")} />
      <input type="hidden" {...register("preferredContact")} />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="s-name">Name</Label>
          <Input id="s-name" autoComplete="name" {...register("name")} />
          {errors.name?.message && <p role="alert" className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="s-company">Company</Label>
          <Input id="s-company" autoComplete="organization" {...register("company")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="s-email">Work email</Label>
        <Input id="s-email" type="email" autoComplete="email" {...register("email")} />
        {errors.email?.message && <p role="alert" className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="s-desc">What do you want to be known for?</Label>
        <Textarea id="s-desc" rows={4} placeholder="Brand, content, campaign or reputation goal…" {...register("description")} />
        {errors.description?.message && <p role="alert" className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      {errorMsg && (
        <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" className="rounded-full w-full md:w-auto px-7" disabled={status === "loading"}>
        {status === "loading" ? (<><Loader2 className="mr-2 size-4 animate-spin" /> Sending…</>) : (<>Start a Studios Project <ArrowRight className="ml-1 size-4" /></>)}
      </Button>
      <p className="text-xs text-muted-foreground">Takes under a minute. We reply within one business day.</p>
    </form>
  );
}
