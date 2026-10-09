"use client";

import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wordmark } from "@/components/site/Wordmark";
import { site } from "@/lib/site";

const footerLinks = [
  {
    label: "Company",
    links: [
      { to: "/about", text: "About" },
      { to: "/team", text: "Team" },
      { to: "/careers", text: "Careers" },
      { to: "/contact", text: "Contact" },
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
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`tel:${site.phones.general.replace(/\s/g, "")}`}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] transition hover:border-primary hover:bg-primary"
                    aria-label={`Call Octapus at ${site.phones.general}`}
                  >
                    <Phone className="size-4" aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Call {site.phones.general}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`mailto:${site.emails.info}`}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] transition hover:border-primary hover:bg-primary"
                    aria-label={`Email ${site.emails.info}`}
                  >
                    <Mail className="size-4" aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{site.emails.info}</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
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
