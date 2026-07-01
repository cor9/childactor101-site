import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface LessonCardProps {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  eyebrow?: string;
  icon?: ReactNode;
  imageAlt?: string;
  imageSrc?: string;
  title: string;
  tone?: "paper" | "chalkboard" | "warm";
}

export function LessonCard({
  actionHref,
  actionLabel = "Open lesson",
  description,
  eyebrow,
  icon,
  imageAlt,
  imageSrc,
  title,
  tone = "paper",
}: LessonCardProps) {
  const isDark = tone === "chalkboard";
  const textClassName = isDark ? "text-chalk" : "text-chalkboard";
  const bodyClassName = isDark ? "text-chalk/76" : "text-ink-soft";
  const actionClassName = isDark ? "text-[#bcefdc] hover:text-white" : "text-purple-deep hover:text-chalkboard";
  const eyebrowTone = isDark ? "chalk" : "light";

  return (
    <Card className="flex h-full flex-col overflow-hidden" tone={tone}>
      {imageSrc ? (
        <div className="-mx-6 -mt-6 mb-6 overflow-hidden sm:-mx-8 sm:-mt-8">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            width={640}
            height={420}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      ) : null}
      {icon}
      {eyebrow ? (
        <Pill className="mt-5 w-fit px-4 py-2 text-xs uppercase tracking-[0.22em]" tone={eyebrowTone}>
          {eyebrow}
        </Pill>
      ) : null}
      <h3 className={`mt-5 font-display text-2xl ${textClassName}`}>{title}</h3>
      <p className={`mt-3 flex-1 text-sm leading-7 ${bodyClassName}`}>{description}</p>
      {actionHref ? (
        <Link
          href={actionHref}
          className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition ${actionClassName}`}
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </Card>
  );
}
