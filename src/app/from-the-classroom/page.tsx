import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpenText, LibraryBig, NotebookTabs, Sparkles } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ChapterShelfCard } from "@/components/content/ChapterShelfCard";
import { Newsletter } from "@/components/content/Newsletter";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  classroomChapters,
  getFeaturedLessons,
  getLessonsForChapter,
} from "@/content/classroom";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "From the Classroom | Child Actor 101",
  description:
    "Explore the Child Actor 101 classroom by chapter with a sample lesson library that shows how the parent curriculum will scale.",
};

export default function FromTheClassroomPage() {
  const featuredLessons = getFeaturedLessons();

  return (
    <main className="overflow-hidden">
      <PageHero
        label="From the Classroom"
        title="Open to the chapter you need."
        description="This is the Child Actor 101 learning library prototype: a textbook-style classroom where lessons are organized by chapter, not buried in a traditional blog feed."
        primaryAction={{
          href: "#chapter-shelves",
          label: "Browse chapters",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/from-the-classroom/start-here",
          label: "Open a sample chapter",
          icon: <BookOpenText className="h-5 w-5" />,
        }}
        supportingPoints={[
          "Chapters, not dates",
          "Parents first",
          "Built to scale into a full library",
        ]}
      >
        <div className="space-y-5">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Classroom prototype
          </div>
          <div className="overflow-hidden rounded-[30px] border border-chalk/10 shadow-[0_22px_48px_rgba(7,21,17,0.22)]">
            <Image
              src={images.homeHero.src}
              alt="Sample Child Actor 101 classroom illustration showing a young actor learning at a desk"
              width={900}
              height={720}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-xs uppercase tracking-[0.22em] text-chalkboard/75">
                What this is
              </p>
              <p className="mt-3 font-display text-3xl text-chalkboard">
                A chapter-based learning library.
              </p>
            </div>
            <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
                What this is not
              </p>
              <p className="mt-3 text-sm leading-7 text-chalk/80">
                Not a timeline, not a course marketplace, and not a pile of disconnected articles.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Every lesson should answer one practical parent question, teach something useful, and point to the next right step. The prototype below shows that system before the full library is imported."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="How the Library Works"
            title="The classroom teaches in a sequence, even when readers jump in midstream."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card>
              <LibraryBig className="h-10 w-10 text-purple-deep" />
              <h3 className="mt-5 font-display text-3xl text-chalkboard">Choose a shelf</h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                Browse by need instead of by publish date. Each chapter groups the lessons the way a family actually experiences the business.
              </p>
            </Card>
            <Card>
              <NotebookTabs className="h-10 w-10 text-purple-deep" />
              <h3 className="mt-5 font-display text-3xl text-chalkboard">Open one lesson</h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                Every lesson uses a consistent structure: context, teacher guidance, takeaways, related resources, and one clear next step.
              </p>
            </Card>
            <Card>
              <Sparkles className="h-10 w-10 text-purple-deep" />
              <h3 className="mt-5 font-display text-3xl text-chalkboard">Keep moving</h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                The goal is not to trap families inside a single post. The goal is to keep the classroom moving like a thoughtful curriculum.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section
        id="chapter-shelves"
        className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <ChalkDust />
        <ChalkDoodle variant="star" className="left-8 top-18 hidden h-9 w-9 md:block" />
        <ChalkDoodle variant="swirl" className="right-10 top-24 hidden h-12 w-12 md:block" />
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Each card below shows how a chapter shelf can feel: a clear purpose, a planned lesson count, a few sample lesson titles, and a clean way into that part of the classroom."
            descriptionClassName="mt-4 text-lg leading-8 text-white/72"
            label="Browse by Chapter"
            labelClassName="text-[#bcefdc]"
            title="Open the library like a classroom, not an archive."
            titleClassName="mt-6 text-white"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {classroomChapters.map((chapter) => (
              <ChapterShelfCard
                key={chapter.slug}
                browseHref={`/from-the-classroom/${chapter.slug}`}
                browseLabel={chapter.browseLabel}
                description={chapter.description}
                id={`chapter-${chapter.slug}`}
                imageAlt={chapter.featuredImageAlt}
                imageSrc={chapter.featuredImageSrc}
                lessonCountLabel={chapter.lessonCountLabel}
                lessons={getLessonsForChapter(chapter.slug).map((lesson) => lesson.title)}
                title={chapter.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="A small sample of real lesson titles from the inventory, shown here as article-style cards so the library can feel readable before the full import work begins."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Featured Sample Lessons"
            title="The prototype already reads like a learning library."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <ArticleCard
                key={lesson.slug}
                category={classroomChapters.find((chapter) => chapter.slug === lesson.chapterSlug)?.title}
                description={lesson.summary}
                href={`/from-the-classroom/${lesson.chapterSlug}/${lesson.slug}`}
                imageAlt={lesson.featuredImageAlt}
                imageSrc={lesson.featuredImageSrc}
                title={lesson.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-2xl">
            <SectionHeader
              description="This section previews the flow every lesson page will share: teacher guidance, concise reading blocks, key takeaways, related resources, and a clean route to the next lesson."
              descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
              label="Lesson Layout Preview"
              title="Every lesson should feel teachable, not dumped on the page."
              titleClassName="mt-6 text-chalkboard"
            />
          </div>
          <Card className="relative overflow-hidden">
            <ChalkDoodle variant="arrow-right" className="left-8 top-10 h-16 w-24 text-[#c8a8ff]" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-paper p-5">
                <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
                  Teacher Note
                </Pill>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  A short Corey-style note that frames why this topic matters before the lesson content begins.
                </p>
              </div>
              <div className="rounded-[24px] bg-white p-5 shadow-[0_10px_24px_rgba(22,36,58,0.06)]">
                <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="paper">
                  Takeaways
                </Pill>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Clear, skimmable reminders of what the reader should understand before moving on.
                </p>
              </div>
              <div className="rounded-[24px] bg-white p-5 shadow-[0_10px_24px_rgba(22,36,58,0.06)]">
                <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="paper">
                  Related Resources
                </Pill>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Tools, podcast episodes, and next lessons that feel like a logical step instead of an ad interruption.
                </p>
              </div>
              <div className="rounded-[24px] bg-paper p-5">
                <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
                  Previous / Next
                </Pill>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Simple lesson navigation so the classroom can scale into a real curriculum over time.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section id="newsletter" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Newsletter
            ctaHref="/podcast"
            ctaLabel="Keep learning"
            description="The Callback and the podcast keep the classroom moving between lessons with fresh guidance, honest industry perspective, and the next useful thing to read or hear."
            label="Classroom Follow-Up"
            note="This is still a prototype, but the underlying experience is already clear: browse by chapter, open one lesson, and keep moving with confidence."
            title="The learning library is built to grow without losing its shape."
          />
        </Container>
      </Section>
    </main>
  );
}
