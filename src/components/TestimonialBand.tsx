import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/SectionLabel";

export interface TestimonialBandItem {
  attribution?: string;
  context?: string;
  quote: string;
}

export interface TestimonialBandProps {
  eyebrow?: ReactNode;
  testimonials: TestimonialBandItem[];
  title: ReactNode;
  variant?: "default" | "warm" | "dark" | "proof";
}

export function TestimonialBand({
  eyebrow,
  testimonials,
  title,
  variant = "default",
}: TestimonialBandProps) {
  const config = {
    default: {
      bandClassName: "",
      cardTone: "paper" as const,
      copyClassName: "text-ink-soft",
      labelClassName: "",
      titleClassName: "mt-6 text-chalkboard",
    },
    warm: {
      bandClassName: "",
      cardTone: "warm" as const,
      copyClassName: "text-ink-soft",
      labelClassName: "",
      titleClassName: "mt-6 text-chalkboard",
    },
    dark: {
      bandClassName: "",
      cardTone: "chalkboard" as const,
      copyClassName: "text-chalk/76",
      labelClassName: "text-[#bcefdc]",
      titleClassName: "mt-6 text-white",
    },
    proof: {
      bandClassName: "",
      cardTone: "warm" as const,
      copyClassName: "text-ink-soft",
      labelClassName: "",
      titleClassName: "mt-6 text-chalkboard",
    },
  }[variant];

  return (
    <div className={config.bandClassName}>
      {eyebrow ? <SectionLabel className={config.labelClassName}>{eyebrow}</SectionLabel> : null}
      <h2 className={`font-display text-4xl leading-tight sm:text-5xl ${config.titleClassName}`}>
        {title}
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={`${item.quote}-${item.attribution ?? item.context ?? "proof"}`} tone={config.cardTone}>
            <p className={`text-lg leading-8 ${config.copyClassName}`}>{item.quote}</p>
            {item.attribution || item.context ? (
              <div className={`mt-6 border-t border-black/5 pt-4 text-sm ${config.copyClassName}`}>
                {item.attribution ? <p className="font-semibold">{item.attribution}</p> : null}
                {item.context ? <p className="mt-1">{item.context}</p> : null}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
