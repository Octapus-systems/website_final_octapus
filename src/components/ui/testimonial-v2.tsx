"use client";
import React from 'react';
import { motion } from "framer-motion";

// --- Types ---
export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Before Octapus, our operation felt like a dozen islands. Now, we have a central nervous system. Everything just flows.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Elena Rostova",
    role: "VP of Operations",
  },
  {
    text: "They didn't just write code; they forged the spine of our business. The custom ERP is an absolute gamechanger.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Marcus Thorne",
    role: "Chief Executive Officer",
  },
  {
    text: "The OIS layer brings our data to life. It's like having an intelligent analyst working 24/7 across all our systems.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Jenkins",
    role: "Data Strategy Lead",
  },
  {
    text: "We used to lose hours chasing reports. Now, the system simply tells us what we need to know before we even ask.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "David Chen",
    role: "Finance Director",
  },
  {
    text: "Working with the Octapus team feels like having an elite internal engineering division. Complete ownership from day one.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Amina Al-Fayed",
    role: "Head of Product",
  },
  {
    text: "They untangled our legacy mess and gave us a sleek, intelligent control plane. The transformation was flawless.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "James Holden",
    role: "CTO",
  },
  {
    text: "Automating our core workflows removed so much friction. Our team finally has the bandwidth to focus on actual strategy.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Robert Macalister",
    role: "Director of Supply Chain",
  },
  {
    text: "The integration between our storefront and backend operations is seamless. One truth, zero manual reconciliation.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Leila Kwan",
    role: "E-commerce Lead",
  },
  {
    text: "It's rare to find a technical partner that understands business architecture first and code second. Highly recommended.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Tariq Mansour",
    role: "Managing Director",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 rounded-3xl border hairline shadow-lg shadow-black/5 max-w-xs w-full bg-surface dark:bg-surface-dark transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-muted-foreground leading-relaxed font-normal m-0 transition-colors duration-300">
                      "{text}"
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-foreground transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-muted-foreground mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export default function TestimonialsV2() {
  return (
    <div 
      className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[500px] overflow-hidden w-full"
      role="region"
      aria-label="Scrolling Testimonials"
    >
      <TestimonialsColumn testimonials={firstColumn} duration={35} />
      <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />
      <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={40} />
    </div>
  );
}
