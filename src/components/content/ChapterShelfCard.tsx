import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface ChapterShelfCardProps {
  browseHref: string;
  browseLabel?: string;
  description: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  lessonCountLabel: string;
  lessons: readonly string[];
  title: string;
}

export function ChapterShelfCard({
  browseHref,
  browseLabel = "Browse chapter",
  description,
  id,
  imageAlt,
  imageSrc,
  lessonCountLabel,
  lessons,
  title,
}: ChapterShelfCardProps) {
  return (
    <article id={id}>
      <Card className="h-full overflow-hidden p-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={720}
          height={520}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="px-7 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
              Chapter
            </Pill>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-chalkboard/55">
              {lessonCountLabel}
            </span>
          </div>
          <h3 className="mt-5 font-display text-[2rem] leading-tight text-chalkboard">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft">{description}</p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-chalkboard/80">
            {lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
          <Link
            href={browseHref}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
          >
            {browseLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </article>
  );
}
