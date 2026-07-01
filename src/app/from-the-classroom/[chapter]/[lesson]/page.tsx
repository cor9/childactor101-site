import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, NotebookPen } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { LessonCard } from "@/components/content/LessonCard";
import { Newsletter } from "@/components/content/Newsletter";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  classroomChapters,
  getAdjacentLessons,
  getClassroomChapter,
  getClassroomLesson,
  getClassroomPlaceholderSections,
  getClassroomStaticLessonParams,
  getRelatedLessons,
} from "@/content/classroom";

type LessonPageProps = {
  params: Promise<{
    chapter: string;
    lesson: string;
  }>;
};

export function generateStaticParams() {
  return getClassroomStaticLessonParams();
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { chapter: chapterSlug, lesson: lessonSlug } = await params;
  const lesson = getClassroomLesson(chapterSlug, lessonSlug);

  if (!lesson) {
    return {
      title: "Lesson | Child Actor 101",
    };
  }

  return {
    title: `${lesson.title} | From the Classroom | Child Actor 101`,
    description: lesson.summary,
  };
}

export default async function ClassroomLessonPage({
  params,
}: LessonPageProps) {
  const { chapter: chapterSlug, lesson: lessonSlug } = await params;
  const chapter = getClassroomChapter(chapterSlug);
  const lesson = getClassroomLesson(chapterSlug, lessonSlug);

  if (!chapter || !lesson) {
    notFound();
  }

  const sections = lesson.bodySections ?? getClassroomPlaceholderSections(lesson, chapter);
  const relatedLessons = getRelatedLessons(lesson);
  const { previous, next } = getAdjacentLessons(chapter.slug, lesson.slug);

  return (
    <main className="overflow-hidden">
      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "From the Classroom", href: "/from-the-classroom" },
              { label: chapter.title, href: `/from-the-classroom/${chapter.slug}` },
              { label: lesson.title },
            ]}
          />
        </Container>
      </Section>

      <Section className="relative px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.18),_transparent_30%)]" />
        <Container className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <article className="relative">
            <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
              {chapter.title}
            </Pill>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-chalkboard sm:text-6xl">
              {lesson.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl">
              {lesson.subtitle}
            </p>
            <div className="mt-8 rounded-[28px] border border-[#e7dcc7] bg-white px-6 py-5 shadow-soft">
              <div className="flex items-start gap-4">
                <NotebookPen className="mt-1 h-5 w-5 text-purple-deep" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                    Teacher note
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{lesson.teacherNote}</p>
                </div>
              </div>
            </div>
          </article>

          <Card className="relative overflow-hidden bg-[linear-gradient(160deg,#234F3B_0%,#17382B_100%)]" tone="chalkboard">
            <ChalkDust />
            <div className="relative space-y-5">
              <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
                Sample lesson layout
              </div>
              <div className="overflow-hidden rounded-[28px] border border-white/10">
                <Image
                  src={lesson.featuredImageSrc}
                  alt={lesson.featuredImageAlt}
                  width={900}
                  height={720}
                  className="aspect-[4/3] w-full object-cover"
                  priority
                />
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#bcefdc]">
                  Lesson flow
                </p>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  Prototype pages use placeholder body copy where needed, but the page structure is final enough to test hierarchy, reading rhythm, and next-step navigation.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <article className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-4xl text-chalkboard">{section.heading}</h2>
                <div className="mt-4 space-y-5 text-[1.05rem] leading-8 text-ink-soft">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-6 space-y-3 rounded-[24px] bg-paper-warm px-6 py-5 text-sm leading-7 text-chalkboard">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-purple" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          <div className="space-y-6 lg:sticky lg:top-8">
            <Card>
              <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
                Key takeaways
              </Pill>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
                {lesson.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-purple" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card tone="warm">
              <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="paper">
                Related tools & resources
              </Pill>
              <div className="mt-5 space-y-4">
                {lesson.resources.map((resource) => (
                  <div
                    key={`${resource.href}-${resource.title}`}
                    className="rounded-[24px] border border-[#e7dcc7] bg-white px-5 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                      {resource.type}
                    </p>
                    <Link
                      href={resource.href}
                      className="mt-2 block font-display text-2xl leading-tight text-chalkboard transition hover:text-purple-deep"
                    >
                      {resource.title}
                    </Link>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{resource.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section
        className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <ChalkDust />
        <ChalkDoodle variant="arrow-right" className="right-10 top-16 hidden h-16 w-24 md:block" />
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Related lessons should keep the reader inside the same educational system instead of sending them back to a generic archive."
            descriptionClassName="mt-4 text-lg leading-8 text-white/74"
            label="Related Lessons"
            labelClassName="text-[#bcefdc]"
            title="Where this lesson connects next."
            titleClassName="mt-6 text-white"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedLessons.map((relatedLesson) => (
              <LessonCard
                key={relatedLesson.slug}
                actionHref={`/from-the-classroom/${relatedLesson.chapterSlug}/${relatedLesson.slug}`}
                actionLabel="Open lesson"
                description={relatedLesson.summary}
                eyebrow={classroomChapters.find((entry) => entry.slug === relatedLesson.chapterSlug)?.title}
                imageAlt={relatedLesson.featuredImageAlt}
                imageSrc={relatedLesson.featuredImageSrc}
                title={relatedLesson.title}
                tone="chalkboard"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Newsletter
            ctaHref="/podcast"
            ctaLabel="Keep learning"
            description="Sample lesson pages use short body copy for now, but the layout already shows how each lesson can connect to guidance, tools, and the next chapter in the library."
            label="Newsletter CTA"
            title="Get the next lesson in your inbox."
          />
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Previous and next links make the classroom feel like a real curriculum, even while the library is still being populated in batches."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Lesson Navigation"
            title="Keep moving through the shelf."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {previous ? (
              <Link
                href={`/from-the-classroom/${previous.chapterSlug}/${previous.slug}`}
                className="group rounded-[32px] border border-[#e7dcc7] bg-white px-7 py-6 shadow-soft transition hover:-translate-y-1"
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  <ArrowLeft className="h-4 w-4" />
                  Previous lesson
                </div>
                <h3 className="mt-4 font-display text-3xl leading-tight text-chalkboard group-hover:text-purple-deep">
                  {previous.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{previous.summary}</p>
              </Link>
            ) : (
              <Card className="border-dashed">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-chalkboard/55">
                  <ArrowLeft className="h-4 w-4" />
                  Previous lesson
                </div>
                <h3 className="mt-4 font-display text-3xl leading-tight text-chalkboard">
                  This is the first sample lesson in the chapter.
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  As the classroom fills in, earlier lessons will appear here to keep the shelf moving in order.
                </p>
              </Card>
            )}

            {next ? (
              <Link
                href={`/from-the-classroom/${next.chapterSlug}/${next.slug}`}
                className="group rounded-[32px] border border-[#e7dcc7] bg-white px-7 py-6 shadow-soft transition hover:-translate-y-1"
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  Next lesson
                  <ArrowRight className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-3xl leading-tight text-chalkboard group-hover:text-purple-deep">
                  {next.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{next.summary}</p>
              </Link>
            ) : (
              <Card className="border-dashed">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-chalkboard/55">
                  Next lesson
                  <ArrowRight className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-3xl leading-tight text-chalkboard">
                  This is the end of the current sample run.
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Future imports will extend the shelf without changing this lesson flow or the surrounding navigation patterns.
                </p>
              </Card>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
