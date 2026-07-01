import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, LayoutList, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
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
  getClassroomChapter,
  getLessonsForChapter,
} from "@/content/classroom";

type ChapterPageProps = {
  params: Promise<{
    chapter: string;
  }>;
};

export function generateStaticParams() {
  return classroomChapters.map((chapter) => ({
    chapter: chapter.slug,
  }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { chapter: chapterSlug } = await params;
  const chapter = getClassroomChapter(chapterSlug);

  if (!chapter) {
    return {
      title: "Classroom Chapter | Child Actor 101",
    };
  }

  return {
    title: `${chapter.title} | From the Classroom | Child Actor 101`,
    description: chapter.description,
  };
}

export default async function ClassroomChapterPage({
  params,
}: ChapterPageProps) {
  const { chapter: chapterSlug } = await params;
  const chapter = getClassroomChapter(chapterSlug);

  if (!chapter) {
    notFound();
  }

  const lessons = getLessonsForChapter(chapter.slug);
  const firstLesson = lessons[0];
  const otherChapters = classroomChapters
    .filter((entry) => entry.slug !== chapter.slug)
    .slice(0, 3);

  return (
    <main className="overflow-hidden">
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "From the Classroom", href: "/from-the-classroom" },
              { label: chapter.title },
            ]}
          />
        </Container>
      </section>

      <PageHero
        label="Classroom Chapter"
        title={chapter.title}
        description={chapter.description}
        primaryAction={{
          href: "#chapter-lessons",
          label: "Browse sample lessons",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={
          firstLesson
            ? {
                href: `/from-the-classroom/${chapter.slug}/${firstLesson.slug}`,
                label: "Open sample lesson",
                icon: <BookOpen className="h-5 w-5" />,
              }
            : undefined
        }
        supportingPoints={[
          chapter.lessonCountLabel,
          "3 sample lessons in this prototype shelf",
          "Built to scale into a larger library",
        ]}
      >
        <div className="space-y-5">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Chapter preview
          </div>
          <div className="overflow-hidden rounded-[30px] border border-chalk/10 shadow-[0_22px_48px_rgba(7,21,17,0.22)]">
            <Image
              src={chapter.featuredImageSrc}
              alt={chapter.featuredImageAlt}
              width={900}
              height={720}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>
          <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
              What this shelf does
            </p>
            <p className="mt-3 text-sm leading-7 text-chalk/80">
              This chapter groups related lessons so a family can solve one cluster of problems without bouncing between unrelated content.
            </p>
          </div>
        </div>
      </PageHero>

      <Section id="chapter-lessons" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="These are representative sample lessons for this chapter. They are enough to show the browsing flow, the card patterns, and the way future imports will live inside one consistent system."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Sample Lessons"
            title={`Open the ${chapter.title} shelf.`}
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.slug}
                actionHref={`/from-the-classroom/${chapter.slug}/${lesson.slug}`}
                description={lesson.summary}
                eyebrow="Sample lesson"
                imageAlt={lesson.featuredImageAlt}
                imageSrc={lesson.featuredImageSrc}
                title={lesson.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <ChalkDust />
        <ChalkDoodle variant="star" className="left-10 top-16 hidden h-8 w-8 md:block" />
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-2xl">
            <SectionHeader
              description="Each chapter page should help readers understand the shape of that shelf before they start opening lessons. This section previews that framing."
              descriptionClassName="mt-4 text-lg leading-8 text-white/74"
              label="Chapter Framing"
              labelClassName="text-[#bcefdc]"
              title={`What families usually learn inside ${chapter.title}.`}
              titleClassName="mt-6 text-white"
            />
          </div>
          <Card tone="chalkboard">
            <div className="grid gap-4">
              {chapter.shelfHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-5 w-5 text-[#bcefdc]" />
                    <p className="text-sm leading-7 text-white/82">{highlight}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-[24px] border border-[#bcefdc]/20 bg-[#1d3b2d]/70 px-5 py-4">
                <div className="flex items-start gap-3">
                  <LayoutList className="mt-1 h-5 w-5 text-[#bcefdc]" />
                  <p className="text-sm leading-7 text-white/82">
                    The finished version of this chapter will expand lesson count, related tools, and cross-links while keeping this same educational frame intact.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="The library should make it easy to pivot between shelves when a parent's next question changes. These chapters show how the larger system can keep expanding."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Explore Another Shelf"
            title="The classroom is built to move laterally as well as forward."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {otherChapters.map((entry) => (
              <Card key={entry.slug}>
                <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
                  {entry.lessonCountLabel}
                </Pill>
                <h3 className="mt-5 font-display text-3xl text-chalkboard">{entry.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{entry.description}</p>
                <Link
                  href={`/from-the-classroom/${entry.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                >
                  Browse chapter
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Newsletter
            ctaHref="/podcast"
            ctaLabel="Continue learning"
            description="The classroom should always point to the next useful thing. That includes related lessons, tools, podcast conversations, and practical guidance parents can revisit."
            label="Keep Going"
            title={`This ${chapter.title} shelf is a prototype, but the learning flow is already visible.`}
          />
        </Container>
      </Section>
    </main>
  );
}
