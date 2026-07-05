import type { ReactNode } from "react";

import { LessonCard } from "@/components/content/LessonCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface RelatedLessonImage {
  alt?: string;
  src: string;
}

export interface RelatedLessonItem {
  chapter?: string;
  href?: string;
  image?: RelatedLessonImage;
  summary: string;
  title: string;
}

export interface RelatedLessonsProps {
  description?: ReactNode;
  fallbackHref?: string;
  lessons: RelatedLessonItem[];
  title: ReactNode;
  variant?: "default" | "warm" | "dark";
}

export function RelatedLessons({
  description,
  fallbackHref = "/from-the-classroom",
  lessons,
  title,
  variant = "default",
}: RelatedLessonsProps) {
  const tone = variant === "warm" ? "warm" : variant === "dark" ? "chalkboard" : "paper";
  const descriptionClassName =
    variant === "dark" ? "mt-4 text-lg leading-8 text-white/74" : "mt-4 text-lg leading-8 text-ink-soft";
  const labelClassName = variant === "dark" ? "text-[#bcefdc]" : "";
  const titleClassName = variant === "dark" ? "mt-6 text-white" : "mt-6 text-chalkboard";

  return (
    <div>
      <SectionHeader
        className="max-w-3xl"
        description={description}
        descriptionClassName={descriptionClassName}
        label="Related classroom guidance"
        labelClassName={labelClassName}
        title={title}
        titleClassName={titleClassName}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.title}
            actionHref={lesson.href || fallbackHref}
            actionLabel="Read lesson"
            description={lesson.summary}
            eyebrow={lesson.chapter ?? "Classroom lesson"}
            imageAlt={lesson.image?.alt}
            imageSrc={lesson.image?.src}
            title={lesson.title}
            tone={tone}
          />
        ))}
      </div>
    </div>
  );
}
