import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Mic2, NotebookText } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ChapterShelfCard } from "@/components/content/ChapterShelfCard";
import { Newsletter } from "@/components/content/Newsletter";
import { PodcastCard } from "@/components/content/PodcastCard";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  chapterCards,
  featuredLessons,
  mostPopularLessons,
  newestLessons,
} from "@/content/from-the-classroom";
import { images } from "@/content/images";
import { SPOTIFY_PODCAST_URL } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "From the Classroom",
  description:
    "Browse the Child Actor 101 classroom by chapter instead of chronology, with practical lessons for real TV and film families.",
};

export default function FromTheClassroomPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "From the Classroom | Child Actor 101",
    description:
      "The digital version of the Child Actor 101 classroom, organized into logical learning chapters for parents of young actors.",
    url: "https://www.childactor101.com/from-the-classroom",
    hasPart: featuredLessons.map((lesson, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: lesson.title,
      url: `https://www.childactor101.com/from-the-classroom${lesson.href}`,
    })),
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        label="From the Classroom"
        title="Open to the chapter you need."
        description="Every lesson is illustrated, practical, and written for real TV & film families. Browse by topic instead of digging through a traditional blog."
        primaryAction={{
          href: "#featured-lessons",
          label: "Browse Lessons",
          icon: <ArrowDown className="h-5 w-5" />,
        }}
        supportingPoints={[
          "Textbook, not timeline",
          "Browse by chapter",
          "Built for real TV & film families",
        ]}
      >
        <div className="space-y-5">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Classroom library
          </div>
          <div className="overflow-hidden rounded-[30px] border border-chalk/10 shadow-[0_22px_48px_rgba(7,21,17,0.22)]">
            <Image
              src={images.homeHero.src}
              alt="Young actor studying at a desk to represent the Child Actor 101 classroom library"
              width={900}
              height={720}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-xs uppercase tracking-[0.22em] text-chalkboard/75">
                Shelf system
              </p>
              <p className="mt-3 font-display text-3xl text-chalkboard">
                Browse by chapter, not by date.
              </p>
            </div>
            <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
                What this page is
              </p>
              <p className="mt-3 text-sm leading-7 text-chalk/80">
                The digital version of the Child Actor 101 classroom, where parents open the lesson they need instead of scrolling a timeline.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section id="featured-lessons" className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="These cornerstone lessons answer the questions parents ask first and return to most often. Think of them as the opening chapters of the Child Actor 101 parent curriculum."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Featured Lessons"
            title="Begin with the lessons that frame the whole classroom."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <ArticleCard
                key={lesson.title}
                category={lesson.category}
                className="h-full"
                description={lesson.description}
                href={lesson.href}
                imageAlt={lesson.imageAlt}
                imageSrc={lesson.imageSrc}
                title={lesson.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        id="chapter-browse"
        className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <ChalkDust />
        <ChalkDoodle variant="star" className="left-8 top-18 hidden h-9 w-9 md:block" />
        <ChalkDoodle variant="swirl" className="right-10 top-24 hidden h-12 w-12 md:block" />
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="This is a structured learning library. Each chapter is a learning shelf that groups lessons the way a parent actually experiences the business."
            descriptionClassName="mt-4 text-lg leading-8 text-white/72"
            label="Browse by Chapter"
            labelClassName="text-[#bcefdc]"
            title="Open the classroom like a curriculum."
            titleClassName="mt-6 text-white"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {chapterCards.map((chapter) => (
              <ChapterShelfCard
                key={chapter.id}
                description={chapter.description}
                id={chapter.id}
                imageAlt={chapter.imageAlt}
                imageSrc={chapter.imageSrc}
                lessons={chapter.lessons}
                title={chapter.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="newest-lessons" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Recent additions to the classroom still behave like lessons, not posts. The value is in the question they answer, not the date they were published."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Newest Lessons"
            title="What's new in the classroom."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {newestLessons.map((lesson) => (
              <ArticleCard
                key={lesson.title}
                category={lesson.category}
                description={lesson.description}
                href={lesson.href}
                title={lesson.title}
                tone="warm"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="popular-lessons" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="These are the lessons families return to when they need clarity fast. They tend to answer the questions that create the most confusion, stress, or expensive mistakes."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Most Popular"
            title="The lessons parents come back to most."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {mostPopularLessons.map((lesson) => (
              <ArticleCard
                key={lesson.title}
                category={lesson.category}
                description={lesson.description}
                href={lesson.href}
                title={lesson.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <ChalkDust />
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="max-w-3xl">
            <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="chalk">
              Podcast Lesson
            </Pill>
            <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
              Keep learning between the articles.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/74">
              The podcast extends the same classroom into conversations about auditions, parenting, representation, and the business behind the dream.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm font-medium text-[#bcefdc]">
              <NotebookText className="h-5 w-5" />
              The same curriculum, taught in a different format.
            </div>
          </div>
          <PodcastCard
            ctaHref={SPOTIFY_PODCAST_URL}
            ctaLabel="Start Listening"
            description="Conversations from inside Hollywood that connect real industry perspective back to the Child Actor 101 classroom."
            icon={<Mic2 className="h-5 w-5" />}
            label="On Air"
            title="Conversations from inside Hollywood"
          />
        </Container>
      </Section>

      <Section id="newsletter" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Newsletter
            ctaHref="#newsletter"
            ctaLabel="Join The Callback"
            description="The Callback keeps the classroom moving with new lessons, honest industry perspective, podcast updates, and practical guidance parents can actually use."
            label="Newsletter"
            title="Get the next lesson in your inbox."
          />
        </Container>
      </Section>
    </main>
  );
}
