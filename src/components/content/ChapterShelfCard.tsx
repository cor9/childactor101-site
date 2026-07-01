import Image from "next/image";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface ChapterShelfCardProps {
  description: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  lessons: readonly string[];
  title: string;
}

export function ChapterShelfCard({
  description,
  id,
  imageAlt,
  imageSrc,
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
          <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
            Chapter
          </Pill>
          <h3 className="mt-5 font-display text-[2rem] leading-tight text-chalkboard">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft">{description}</p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-chalkboard/80">
            {lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </div>
      </Card>
    </article>
  );
}
