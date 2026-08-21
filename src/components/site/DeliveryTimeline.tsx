import { Section } from "@/components/site/Section";

export type TimelineItem = {
  label: string;
  title: string;
  detail: string;
};

const defaultItems: TimelineItem[] = [
  { label: "Day 1", title: "Discovery call", detail: "We map your current systems, gaps and priorities in one focused session." },
  { label: "Week 1", title: "Blueprint", detail: "Scope, architecture and a fixed delivery plan you can sign off on." },
  { label: "Weeks 2–4", title: "Design & build", detail: "Interfaces, data model and core workflows built in weekly increments." },
  { label: "Week 5", title: "Integrate", detail: "Your tools connect through OIS so operations run from one layer." },
  { label: "Week 6", title: "Launch", detail: "Go live with training, documentation and monitoring in place." },
  { label: "Ongoing", title: "Scale", detail: "Continuous improvement, new modules and AI automation as you grow." },
];

export function DeliveryTimeline({
  items = defaultItems,
  eyebrow = "Timeline",
  title = "From first call to live system.",
  intro = "A predictable path, with a clear checkpoint at every stage.",
}: {
  items?: TimelineItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <Section eyebrow={eyebrow} title={title} intro={intro}>
      <ol className="relative mx-auto max-w-4xl">
        <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          {items.map((it, i) => (
            <li
              key={it.title}
              className={`relative pl-10 pb-10 last:pb-0 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
                i % 2 === 1 ? "md:[&>div:first-child]:col-start-2" : ""
              }`}
            >
            <span
                aria-hidden
                className="absolute left-0 top-1.5 size-3.5 rounded-full border-2 border-foreground bg-background md:left-1/2 md:-translate-x-1/2"
              />
              <div className={i % 2 === 1 ? "md:pl-12" : "md:pr-12 md:text-right"}>
                <div className="text-eyebrow mb-2">{it.label}</div>
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.detail}</p>
              </div>
            </li>
          ))}
      </ol>
    </Section>
  );
}
