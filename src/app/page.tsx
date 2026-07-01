import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Headphones, Mic2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ChapterCard } from "@/components/home/ChapterCard";
import { EcosystemCard } from "@/components/home/EcosystemCard";
import { Hero } from "@/components/home/Hero";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { MeetCorey } from "@/components/home/MeetCorey";
import { PodcastCTA } from "@/components/home/PodcastCTA";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SPOTIFY_PODCAST_URL } from "@/lib/site-links";

const journeySteps = [
  {
    title: "Understand the industry",
    description: "Learn how it really works — and how to stay safe.",
  },
  {
    title: "Train",
    description: "Build real on-camera skill and confidence.",
  },
  {
    title: "Build materials",
    description: "Resume, photos, and a professional page.",
  },
  {
    title: "Audition",
    description: "Prep, self-tape, and book the room.",
  },
  {
    title: "Grow",
    description: "Keep building a healthy, lasting career.",
  },
];

const chapterCards = [
  {
    title: "Getting Started",
    href: "/start-here",
    image: "/images/chapter-getting-started.jpg",
    alt: "Young actor working from a laptop at a desk",
  },
  {
    title: "Representation",
    href: "/ecosystem",
    image: "/images/chapter-representation.jpg",
    alt: "Young actor standing beside an older representative figure",
  },
  {
    title: "Technique",
    href: "/ecosystem",
    image: "/images/chapter-technique.jpg",
    alt: "Child actor surrounded by expressive character studies",
  },
  {
    title: "For Parents",
    href: "/ecosystem",
    image: "/images/chapter-for-parents.jpg",
    alt: "Parent and child actor reacting to a laptop together",
  },
];

const ecosystemColumns = [
  {
    title: "Learn",
    description: "Understand the business.",
    items: [
      "From the Classroom",
      "Free guides",
      "The podcast",
      "Parent courses",
      "Legal library",
      "Vendor directory",
    ],
  },
  {
    title: "Create",
    description: "Build your materials.",
    items: ["Resume101", "Pages101", "Prep101", "Reader101", "Bold Choices"],
  },
  {
    title: "Perform",
    description: "Master the craft.",
    items: [
      "101 Training Program",
      "Character Lab",
      "Audition Mastery",
      "Master Methods",
      "Coaching with Corey",
    ],
  },
];

export const metadata: Metadata = {
  title: "The classroom for families navigating TV and film",
  description:
    "Start with the foundational Child Actor 101 homepage shell: the parent-first path into learning, tools, training, and podcast conversations.",
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero
        description="So we built a whole classroom for it — a step-by-step path through the business of TV and film, taught by someone who&apos;s lived every side of it."
        imageAlt="Young actor at a desk learning from a laptop"
        imageSrc="/images/home-hero.jpg"
        kicker="For families of young actors"
        primaryAction={{
          href: "/start-here",
          icon: <ArrowDown className="h-5 w-5" />,
          label: "Start here",
        }}
        secondaryAction={{
          href: SPOTIFY_PODCAST_URL,
          icon: <Mic2 className="h-5 w-5" />,
          label: "Conversations from inside Hollywood",
          rel: "noreferrer",
          target: "_blank",
          variant: "outlineLight",
        }}
        tapeLabel="● Now learning"
        title={
          <>
            The industry doesn&apos;t come with a{" "}
            <span className="relative inline-block whitespace-nowrap">
              manual
              <svg
                aria-hidden="true"
                className="absolute -bottom-3 left-[-2%] h-4 w-[104%] text-[#a882ff]"
                fill="none"
                viewBox="0 0 200 12"
              >
                <path
                  d="M2 8 C40 2 80 11 120 6 S180 3 198 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </span>
            .
          </>
        }
      />

      <JourneyTimeline
        description="Five steps, in order. This is the path every family walks."
        steps={journeySteps}
        title="New here? ☆ Start here."
      />

      <Section id="chapters" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Every lesson is illustrated, plain-spoken, and built for parents — pick where your family is right now."
            descriptionClassName="mt-4 text-[1.45rem] leading-[1.7] text-ink-soft"
            label="From the Classroom"
            labelClassName="text-purple-deep"
            title="Open to the chapter you need"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {chapterCards.map((chapter) => (
              <ChapterCard key={chapter.title} {...chapter} />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        id="ecosystem"
        className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24"
      >
        <ChalkDust />
        <ChalkDoodle variant="star" className="left-8 top-16 hidden h-9 w-9 md:block" />
        <ChalkDoodle variant="arrow-right" className="right-10 top-22 hidden h-12 w-12 md:block" />
        <Container>
          <Card tone="chalkboard" className="overflow-hidden">
            <SectionHeader
              className="max-w-3xl"
              description="One classroom, three worlds — and everything a family needs inside each."
              descriptionClassName="mt-4 text-[1.45rem] leading-[1.7] text-white/72"
              label="The Whole Ecosystem"
              labelClassName="text-[#c7f2e4]"
              title="This isn&apos;t an acting coach. It&apos;s a platform."
              titleClassName="mt-6 text-white"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {ecosystemColumns.map((column) => (
                <EcosystemCard key={column.title} {...column} />
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      <MeetCorey
        ctaHref="/corey-ralston"
        ctaIcon={<ArrowRight className="h-5 w-5" />}
        ctaLabel="Learn more about Corey"
        description="Corey Ralston is a former child actor, youth talent manager, acting coach, and founder of Child Actor 101."
        headshotAlt="Corey Ralston headshot"
        headshotSrc="/images/corey-ralston.jpg"
        label="Meet your teacher"
        name="Corey Ralston"
        roles={["Former child actor", "Youth talent manager", "Founder"]}
        secondaryDescription="He built Child Actor 101 to give parents the unvarnished truth — no hype, no gatekeeping, just the manual he wished existed."
      />

      <PodcastCTA
        ctaHref={SPOTIFY_PODCAST_URL}
        ctaIcon={<Headphones className="h-5 w-5" />}
        ctaLabel="Start listening"
        ctaRel="noreferrer"
        ctaTarget="_blank"
        description="The Callback — honest talks about auditions, the business, and keeping kids kids while they chase the dream. New every week."
        imageAlt="Child Actor 101 retro television logo"
        imageSrc="/101logo.png"
        label="● On air"
        title="Conversations from inside Hollywood"
      />
    </main>
  );
}
