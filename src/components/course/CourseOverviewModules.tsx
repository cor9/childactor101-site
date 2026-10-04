import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CompletionMark, ModuleAction } from "@/components/course/CourseProgress";
import type { Course, CourseModule } from "@/content/courses";
import { getModuleSubsections, getModuleVideoCount } from "@/content/courses";
import type { CoursePresentation } from "@/content/courses/presentation";

interface OverviewProps {
  course: Course;
  presentation: CoursePresentation;
}

function moduleFacts(module: CourseModule) {
  const topics = getModuleSubsections(module).length;
  const videos = getModuleVideoCount(module);
  return `${topics} topic${topics === 1 ? "" : "s"} · ${videos} video${videos === 1 ? "" : "s"}`;
}

function TopicList({ course, module }: { course: Course; module: CourseModule }) {
  const topics = getModuleSubsections(module);

  if (topics.length === 0) {
    return null;
  }

  return (
    <details className="group mt-5 text-sm">
      <summary className="cursor-pointer font-semibold text-purple-deep marker:content-none">
        What&apos;s inside
        <span className="ml-1 inline-block transition group-open:rotate-90" aria-hidden>
          ›
        </span>
      </summary>
      <ul className="mt-3 space-y-1.5 text-ink-soft">
        {topics.map((topic) => (
          <li key={topic.anchor}>
            <Link
              className="transition hover:text-purple-deep"
              href={`/courses/${course.slug}/${module.slug}#${topic.anchor}`}
            >
              {topic.text}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

/** The five-stage path: Start Here, then a connected row of stages. */
export function JourneyOverview({ course, presentation }: OverviewProps) {
  const order = course.modules.map((module) => module.slug);
  const intro = course.modules.find((module) => module.slug === presentation.introModule);
  const stages = course.modules.filter((module) => module.slug !== presentation.introModule);

  return (
    <div>
      {intro ? (
        <div className="flex flex-col gap-5 rounded-[32px] border border-[#e7dcc7] bg-white px-7 py-7 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div className="flex items-start gap-5">
            <CompletionMark
              className="h-12 w-12 text-lg"
              courseSlug={course.slug}
              label="★"
              moduleSlug={intro.slug}
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Before you begin
              </p>
              <h2 className="mt-1 font-display text-3xl text-chalkboard">
                {presentation.modules[intro.slug]?.name ?? intro.title}
              </h2>
              <p className="mt-2 max-w-xl text-base leading-7 text-ink-soft">
                {presentation.modules[intro.slug]?.outcome}
              </p>
            </div>
          </div>
          <ModuleAction className="self-start sm:self-center" courseSlug={course.slug} moduleSlug={intro.slug} order={order} />
        </div>
      ) : null}

      <div className="mt-14 flex items-center gap-4">
        <h2 className="font-display text-3xl text-chalkboard sm:text-4xl">The five stages</h2>
        <span aria-hidden className="h-px flex-1 bg-chalkboard/15" />
      </div>

      <ol className="relative mt-8 grid gap-6 lg:grid-cols-5">
        {stages.map((module, index) => {
          const info = presentation.modules[module.slug];

          return (
            <li className="relative flex" key={module.slug}>
              <div className="flex w-full flex-col rounded-[28px] border border-[#e7dcc7] bg-white px-6 py-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <CompletionMark
                    className="h-12 w-12 text-xl"
                    courseSlug={course.slug}
                    label={String(index + 1)}
                    moduleSlug={module.slug}
                  />
                  {index < stages.length - 1 ? (
                    <ArrowRight className="hidden h-5 w-5 text-chalkboard/30 lg:block" aria-hidden />
                  ) : null}
                </div>
                <h3 className="mt-5 font-display text-3xl leading-none text-chalkboard">
                  <Link
                    className="after:absolute after:inset-0 after:rounded-[28px] hover:text-purple-deep"
                    href={`/courses/${course.slug}/${module.slug}`}
                  >
                    {info?.name ?? module.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-7 text-ink-soft">{info?.outcome}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-chalkboard/55">
                  {moduleFacts(module)}
                </p>
                <div className="relative z-10">
                  <TopicList course={course} module={module} />
                </div>
                <div className="relative z-10 mt-5">
                  <ModuleAction courseSlug={course.slug} moduleSlug={module.slug} order={order} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Ordered parts with artwork, for the self tape course. */
export function PartsOverview({ course, presentation }: OverviewProps) {
  const order = course.modules.map((module) => module.slug);

  return (
    <ol className="grid gap-6">
      {course.modules.map((module, index) => {
        const info = presentation.modules[module.slug];

        return (
          <li
            className="relative flex flex-col gap-6 rounded-[32px] border border-[#e7dcc7] bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:p-6"
            key={module.slug}
          >
            <div className="relative aspect-square w-full flex-none overflow-hidden rounded-[22px] bg-chalkboard sm:w-44">
              {info?.image ? (
                <Image
                  alt=""
                  className="h-full w-full object-cover"
                  placeholder="blur"
                  sizes="(min-width: 640px) 176px, 100vw"
                  src={info.image}
                />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center font-display text-3xl leading-tight text-chalk">
                  {info?.name ?? module.title}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <CompletionMark
                  className="h-9 w-9 text-sm"
                  courseSlug={course.slug}
                  label={String(index + 1)}
                  moduleSlug={module.slug}
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-chalkboard/55">
                  {moduleFacts(module)}
                </p>
              </div>
              <h3 className="mt-3 font-display text-3xl leading-tight text-chalkboard">
                <Link
                  className="after:absolute after:inset-0 after:rounded-[32px] hover:text-purple-deep"
                  href={`/courses/${course.slug}/${module.slug}`}
                >
                  {info?.name ?? module.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-xl text-base leading-7 text-ink-soft">{info?.outcome}</p>
              <div className="relative z-10">
                <TopicList course={course} module={module} />
              </div>
            </div>
            <div className="relative z-10 sm:self-center">
              <ModuleAction courseSlug={course.slug} moduleSlug={module.slug} order={order} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
