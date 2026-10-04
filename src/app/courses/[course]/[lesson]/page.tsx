import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseProgressOverview, MarkCompleteButton } from "@/components/course/CourseProgress";
import { LessonVideoBlock } from "@/components/course/LessonVideoBlock";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  getCourse,
  getCourseLesson,
  getCourseLessonPagination,
  getCourseStaticLessonParams,
  getLessonsForSection,
} from "@/content/courses";

type LessonPageProps = {
  params: Promise<{
    course: string;
    lesson: string;
  }>;
};

export function generateStaticParams() {
  return getCourseStaticLessonParams();
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const course = getCourse(courseSlug);
  const lesson = getCourseLesson(courseSlug, lessonSlug);

  if (!course || !lesson) {
    return { title: "Lesson | Child Actor 101" };
  }

  return {
    title: `${lesson.title} | ${course.title}`,
    description: lesson.summary ?? course.description,
  };
}

export default async function CourseLessonPage({ params }: LessonPageProps) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const course = getCourse(courseSlug);
  const lesson = getCourseLesson(courseSlug, lessonSlug);

  if (!course || !lesson) {
    notFound();
  }

  const section = course.sections.find((entry) => entry.slug === lesson.sectionSlug);
  const sectionLessons = getLessonsForSection(course, lesson.sectionSlug);
  const { previous, next, index, total } = getCourseLessonPagination(course.slug, lesson.slug);
  const videos = lesson.videos ?? (lesson.video ? [lesson.video] : []);

  return (
    <main className="overflow-hidden">
      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: course.title, href: `/courses/${course.slug}` },
              { label: lesson.title },
            ]}
          />
        </Container>
      </Section>

      <Section className="relative px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.18),_transparent_30%)]" />
        <Container className="relative max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
              {section?.title ?? course.title}
            </Pill>
            <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
              Lesson {index + 1} of {total}
            </Pill>
            {lesson.needsReview ? (
              <Pill className="bg-accent-100 px-4 py-2 text-xs uppercase tracking-[0.22em] text-accent-700" tone="light">
                Being restored
              </Pill>
            ) : null}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.02] text-chalkboard sm:text-6xl">
            {lesson.title}
          </h1>
        </Container>
      </Section>

      {videos.length > 0 ? (
        <Section className="px-4 pb-12 sm:px-6 lg:px-8">
          <Container className="grid max-w-5xl gap-8">
            {videos.map((video, videoIndex) => (
              <LessonVideoBlock
                fallbackTitle={lesson.title}
                key={`${lesson.slug}-video-${videoIndex}`}
                video={video}
              />
            ))}
          </Container>
        </Section>
      ) : null}

      <Section className="px-4 pb-6 sm:px-6 lg:px-8">
        <Container className="max-w-5xl">
          <MarkCompleteButton courseSlug={course.slug} lessonSlug={lesson.slug} />
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-12 sm:px-6 lg:px-8">
        <Container className="grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <article className="space-y-10">
            {lesson.needsReview && lesson.reviewNote ? (
              <div className="rounded-[24px] border border-[#e7dcc7] bg-paper-warm px-6 py-5 text-sm leading-7 text-ink-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  Restored course note
                </p>
                <p className="mt-2">{lesson.reviewNote}</p>
              </div>
            ) : null}

            {lesson.body.length === 0 ? (
              <p className="text-[1.05rem] leading-8 text-ink-soft">
                This lesson is a watch-first lesson from the original course. Press play above and
                continue to the next lesson when you are ready.
              </p>
            ) : (
              lesson.body.map((bodySection, sectionIndex) => (
                <section key={bodySection.heading ?? `section-${sectionIndex}`}>
                  {bodySection.heading ? (
                    <h2 className="font-display text-3xl text-chalkboard sm:text-4xl">
                      {bodySection.heading}
                    </h2>
                  ) : null}
                  <div className="mt-4 space-y-5 text-[1.05rem] leading-8 text-ink-soft">
                    {bodySection.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  {bodySection.bullets?.length ? (
                    <ul className="mt-6 space-y-3 rounded-[24px] bg-paper-warm px-6 py-5 text-sm leading-7 text-chalkboard">
                      {bodySection.bullets.map((bullet) => (
                        <li key={bullet.slice(0, 48)} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 flex-none rounded-full bg-purple" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))
            )}
          </article>

          <div className="space-y-6 lg:sticky lg:top-8">
            <Card>
              <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
                {section?.title ?? "Course outline"}
              </Pill>
              <ul className="mt-5 max-h-96 space-y-2 overflow-y-auto pr-1">
                {sectionLessons.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      aria-current={entry.slug === lesson.slug ? "page" : undefined}
                      className={`block rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                        entry.slug === lesson.slug
                          ? "bg-chalkboard text-chalk"
                          : "text-ink hover:bg-paper-warm hover:text-chalkboard"
                      }`}
                      href={`/courses/${course.slug}/${entry.slug}`}
                    >
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                href={`/courses/${course.slug}#${section?.slug ?? ""}`}
              >
                Full course outline
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>

            {lesson.resources.length > 0 ? (
              <Card tone="warm">
                <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="paper">
                  Links & resources
                </Pill>
                <ul className="mt-5 space-y-3">
                  {lesson.resources.map((resource) => (
                    <li key={`${resource.href}-${resource.title}`}>
                      <a
                        className="group flex items-start gap-2 rounded-[18px] border border-[#e7dcc7] bg-white px-4 py-3 text-sm font-semibold text-chalkboard transition hover:border-chalkboard/20"
                        href={resource.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <ExternalLink className="mt-0.5 h-4 w-4 flex-none text-purple-deep" aria-hidden />
                        <span>
                          <span className="group-hover:text-purple-deep">{resource.title}</span>
                          {resource.note ? (
                            <span className="mt-0.5 block text-xs font-normal text-ink-soft">
                              {resource.note}
                            </span>
                          ) : null}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {previous ? (
              <Link
                className="group rounded-[32px] border border-[#e7dcc7] bg-white px-7 py-6 shadow-soft transition hover:-translate-y-1"
                href={`/courses/${course.slug}/${previous.slug}`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  <ArrowLeft className="h-4 w-4" />
                  Previous lesson
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard group-hover:text-purple-deep sm:text-3xl">
                  {previous.title}
                </h3>
              </Link>
            ) : (
              <Card className="border-dashed">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-chalkboard/55">
                  <ArrowLeft className="h-4 w-4" />
                  Previous lesson
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard sm:text-3xl">
                  This is the first lesson in the course.
                </h3>
              </Card>
            )}

            {next ? (
              <Link
                className="group rounded-[32px] border border-[#e7dcc7] bg-white px-7 py-6 shadow-soft transition hover:-translate-y-1"
                href={`/courses/${course.slug}/${next.slug}`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  Next lesson
                  <ArrowRight className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard group-hover:text-purple-deep sm:text-3xl">
                  {next.title}
                </h3>
              </Link>
            ) : (
              <Card className="border-dashed">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-chalkboard/55">
                  Next lesson
                  <ArrowRight className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard sm:text-3xl">
                  You&apos;ve completed the course.
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Head back to the course outline to review any lesson, or explore the classroom
                  for what to learn next.
                </p>
              </Card>
            )}
          </div>
          <div className="mt-10 max-w-2xl">
            <CourseProgressOverview
              courseSlug={course.slug}
              lessons={course.lessons.map((entry) => ({ slug: entry.slug, title: entry.title }))}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
