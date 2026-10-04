import Link from "next/link";

import { CompletionDot } from "@/components/course/CourseProgress";
import type { CourseModule } from "@/content/courses";
import { getModuleSubsections, getModuleVideoCount, moduleNeedsReview } from "@/content/courses";

export interface CourseModuleCardProps {
  courseSlug: string;
  index: number;
  module: CourseModule;
}

export function CourseModuleCard({ courseSlug, index, module }: CourseModuleCardProps) {
  const subsections = getModuleSubsections(module);
  const videoCount = getModuleVideoCount(module);
  const href = `/courses/${courseSlug}/${module.slug}`;

  return (
    <div className="rounded-[28px] border border-[#e7dcc7] bg-white px-6 py-6 shadow-soft">
      <Link className="group flex gap-4" href={href}>
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-paper-warm font-display text-base text-chalkboard">
          {index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl leading-tight text-chalkboard group-hover:text-purple-deep">
              {module.title}
            </h3>
            <CompletionDot courseSlug={courseSlug} moduleSlug={module.slug} />
          </span>
          <span className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-paper-warm px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-chalkboard">
              {subsections.length} topic{subsections.length === 1 ? "" : "s"}
            </span>
            <span className="rounded-full bg-paper-warm px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-chalkboard">
              {videoCount} video{videoCount === 1 ? "" : "s"}
            </span>
            {moduleNeedsReview(module) ? (
              <span className="rounded-full bg-accent-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-700">
                Being restored
              </span>
            ) : null}
          </span>
        </span>
      </Link>
      {subsections.length > 0 ? (
        <ul className="mt-5 grid gap-x-6 gap-y-1.5 text-sm text-ink-soft sm:grid-cols-2">
          {subsections.map((subsection) => (
            <li key={subsection.anchor}>
              <Link
                className="transition hover:text-purple-deep"
                href={`${href}#${subsection.anchor}`}
              >
                {subsection.text}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
