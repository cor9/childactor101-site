import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface LessonCardProps {
  description: string;
  eyebrow?: string;
  icon?: ReactNode;
  title: string;
}

export function LessonCard({
  description,
  eyebrow,
  icon,
  title,
}: LessonCardProps) {
  return (
    <Card className="flex h-full flex-col">
      {icon}
      {eyebrow ? (
        <Pill className="mt-5 w-fit px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
          {eyebrow}
        </Pill>
      ) : null}
      <h3 className="mt-5 font-display text-2xl text-chalkboard">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink-soft">{description}</p>
    </Card>
  );
}
