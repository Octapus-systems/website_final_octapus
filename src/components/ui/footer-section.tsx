"use client";

import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wordmark } from "@/components/site/Wordmark";
import { site } from "@/lib/site";
import { AskAi } from "@/components/site/AskAi";
import { trackEvent } from "@/lib/analytics";

const SOCIAL_PATHS: Record<string, string> = {
  WhatsApp:
    "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41",
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88",
  LinkedIn:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0",
  Facebook:
    "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07",
};

function SocialIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d={SOCIAL_PATHS[name] ?? ""} />
    </svg>
  );
}

const footerLinks = [
  {
    label: "Company",
    links: [
      { to: "/about", text: "About" },
      { to: "/team", text: "Team" },
      { to: "/careers", text: "Careers" },
      { to: "/contact", text: "Contact" },
      { to: "/book", text: "Book a Call" },
    ],
  },
  {
    label: "Work",
    links: [
      { to: "/services", text: "Services" },
      { to: "/products", text: "Products" },
      { to: "/engineering", text: "Engineering" },
      { to: "/studios", text: "Studios" },
    ],
  },
  {
    label: "Resources",
    links: [
      { to: "/industries", text: "Industries" },
      { to: "/support", text: "Support" },
      { to: "/privacy", text: "Privacy" },
      { to: "/terms", text: "Terms" },
    ],
  },
] as const;

export function Footerdemo() {
  const [email, setEmail] = React.useState("");

  const handleNewsletter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Octapus updates");
    const body = encodeURIComponent(`Please add ${email} to the Octapus updates list.`);
    window.location.href = `mailto:${site.emails.info}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#101014] text-white">
      <div className="pointer-events-none absolute -right-32 -top-40 size-[32rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 left-[18%] size-[30rem] rounded-full bg-[#35106d]/35 blur-[130px]" />

      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="max-w-xl">
            <Wordmark dark className="brightness-0 invert" />
            <p className="mt-7 max-w-[16ch] font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
              Systems that move real work forward.
            </p>
            <p className="mt-5 max-w-[48ch] text-sm leading-6 text-white/58 sm:text-base">
              Practical software, connected operations and creative production—designed in the UAE
              and built for the way your organisation works.
            </p>

            <form onSubmit={handleNewsletter} className="mt-8 max-w-md">
              <label
                htmlFor="footer-email"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/52"
              >
                Stay connected
              </label>
              <div className="relative">
                <Input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Work email address"
                  className="h-12 rounded-full border-white/15 bg-white/[0.07] px-5 pr-14 text-white shadow-none placeholder:text-white/38 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Request Octapus updates"
                  className="absolute right-1 top-1 size-10 rounded-full"
                >
                  <Send className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </form>

            <AskAi className="mt-8" />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerLinks.map((column) => (
              <nav key={column.label} aria-label={`${column.label} links`}>
                <p className="mb-5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b99cff]">
                  {column.label}
                </p>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.text}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1.5 text-sm text-white/68 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {link.text}
                        <ArrowUpRight
                          className="size-3 opacity-0 transition group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm md:grid-cols-[1fr_auto] md:items-center lg:p-8">
          <div className="grid gap-5 text-sm text-white/66 sm:grid-cols-2">
            {site.addresses.map((address) => (
              <div key={address.city} className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#b99cff]" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-white">{address.city}</strong>
                  <br />
                  {address.line}
                </span>
              </div>
            ))}
          </div>

          <TooltipProvider>
            <div className="flex flex-wrap gap-2">

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`mailto:${site.emails.info}`}
                    onClick={() => trackEvent("email_click", { source: "footer" })}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] transition hover:border-primary hover:bg-primary"
                    aria-label={`Email ${site.emails.info}`}
                  >
                    <Mail className="size-4" aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{site.emails.info}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`tel:${site.phones.general.replace(/\s/g, "")}`}
                    onClick={() => trackEvent("call_click", { source: "footer" })}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] transition hover:border-primary hover:bg-primary"
                    aria-label={`Call Octapus on ${site.phones.general}`}
                  >
                    <Phone className="size-4" aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{site.phones.general}</TooltipContent>
              </Tooltip>
              {site.socials.map((social) => (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      onClick={
                        social.name === "WhatsApp"
                          ? () => trackEvent("whatsapp_click", { source: "footer" })
                          : undefined
                      }
                      className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] transition hover:border-primary hover:bg-primary"
                      aria-label={`Octapus on ${social.name}`}
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{social.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.tagline} · {site.origin}
          </p>
        </div>
      </div>
    </footer>
  );
}
