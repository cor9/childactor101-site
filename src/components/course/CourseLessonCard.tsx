import Link from "next/link";

import { CompletionDot } from "@/components/course/CourseProgress";
import type { CourseLesson } from "@/content/courses";
import { lessonHasPlayableVideo } from "@/content/courses";

export interface CourseLessonCardProps {
  courseSlug: string;
  index: number;
  lesson: CourseLesson;
}

export function CourseLessonCard({ courseSlug, index, lesson }: CourseLessonCardProps) {
  const videoCount = lesson.videos?.length ?? (lesson.video ? 1 : 0);
  const playable = lessonHasPlayableVideo(lesson);

  return (
    <Link
      className="group flex gap-4 rounded-[28px] border border-[#e7dcc7] bg-white px-5 py-5 shadow-soft transition hover:-translate-y-1 hover:border-chalkboard/20"
      href={`/courses/${courseSlug}/${lesson.slug}`}
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-paper-warm font-display text-base text-chalkboard">
        {index + 1}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight text-chalkboard group-hover:text-purple-deep">
            {lesson.title}
          </h3>
          <CompletionDot courseSlug={courseSlug} lessonSlug={lesson.slug} />
        </span>
        {lesson.summary ? (
          <span className="mt-2 line-clamp-2 block text-sm leading-6 text-ink-soft">
            {lesson.summary}
          </span>
        ) : null}
        <span className="mt-3 flex flex-wrap items-center gap-2">
          {videoCount > 0 ? (
            <span className="rounded-full bg-paper-warm px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-chalkboard">
              {videoCount > 1 ? `${videoCount} videos` : "Video"}
            </span>
          ) : (
            <span className="rounded-full bg-paper-warm px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-chalkboard">
              Reading
            </span>
          )}
          {lesson.needsReview || !playable ? (
            <span className="rounded-full bg-accent-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-700">
              Being restored
            </span>
          ) : null}
        </span>
      </span>
    </Link>
  );
}
