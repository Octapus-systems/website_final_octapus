/**
 * Company configuration (contact details, addresses, socials). Kept in its own small module so
 * layout components (nav, footer, floating actions) can use it without pulling the full site data
 * (products, services, team, etc.) into every page's initial JavaScript. Re-exported by site.ts.
 */
export const site = {
  name: "Octapus",
  legalName: "Octapus L.L.C.",
  tagline: "The Final Software Destination",
  subTagline: "The systems behind your business. Connected.",
  origin: "Designed in the UAE — Built for the world.",
  oisExternalUrl: "https://obms.erp.octapus.ae/",
  horusExternalUrl: "https://horus.octapus.ae/",

  emails: {
    sales: "sales@octapus.ae",
    info: "info@octapus.ae",
    hr: "hr@octapus.ae",
    tech: "code@octapus.info",
  },
  phones: {
    general: "+971 50 862 1612",
    support: "+971 50 292 0388",
    sales: "+971 50 266 1088",
  },
  addresses: [
    { city: "Dubai", line: "Business Village, Dubai, UAE" },
    { city: "Ajman", line: "Amper Gem Tower, Khalifa Street, Ajman, UAE" },
  ],
  whatsapp: "971508621612",
  /** Official social profiles — shown in the footer and linked in structured data (sameAs). */
  socials: [
    { name: "WhatsApp", href: "https://wa.me/971508621612" },
    { name: "Instagram", href: "https://www.instagram.com/octapus.ae/" },
    { name: "LinkedIn", href: "https://ae.linkedin.com/company/octapus-systems" },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61576526338097",
    },
  ],
  /**
   * Cal.com booking link for /book, e.g. "octapus/strategy-call".
   * Leave empty to show the email / enquiry-form fallback instead.
   */
  calLink: "" as string,
} as const;
