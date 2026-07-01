import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, Headphones, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LessonCard } from "@/components/content/LessonCard";
import { Newsletter } from "@/components/content/Newsletter";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { images } from "@/content/images";

const roadmapSteps = [
  {
    title: "Understand the industry",
    description:
      "Before you spend money, learn how the business actually works. Understand the roles of reps, casting, classes, and families so you can make safer decisions. The first goal is clarity, not speed.",
    actionHref: "/learn/how-to-become-a-child-actor",
    actionLabel: "Read the overview",
  },
  {
    title: "Train",
    description:
      "Training helps your child build skill, focus, and confidence before high-pressure auditions. Start with steady foundational work, not a pile of expensive services. Strong training makes every next step more useful.",
    actionHref: "/ecosystem#training",
    actionLabel: "Explore training basics",
  },
  {
    title: "Build materials",
    description:
      "Photos, resumes, and profiles matter, but they work best once the foundation is there. Build simple, professional materials that match where your child is right now. You do not need everything on day one.",
    actionHref: "/learn/headshots-resumes-and-materials",
    actionLabel: "See the material checklist",
  },
  {
    title: "Audition",
    description:
      "Auditions become far less confusing when your family understands prep, self tapes, and expectations. Learn how to prepare without panic and help your child walk in ready. Good process matters more than chasing every opportunity.",
    actionHref: "/podcast",
    actionLabel: "Learn audition basics",
  },
  {
    title: "Grow",
    description:
      "A child acting career is built over time, not in one busy season. Protect your child&apos;s routine, mindset, and long-term health as opportunities grow. Sustainable progress beats constant urgency.",
    actionHref: "/ecosystem",
    actionLabel: "Plan the long game",
  },
];

const firstReads = [
  {
    title: "How to Become a Child Actor",
    description:
      "Start with a plain-English overview of how families usually enter TV and film, what the early stages look like, and what actually matters first.",
    href: "/learn/how-to-become-a-child-actor",
    imageSrc: images.chapterGettingStarted.src,
    imageAlt: images.chapterGettingStarted.alt,
  },
  {
    title: "What Parents Should Know First",
    description:
      "Get the foundational mindset, expectations, and safety lens that help parents make clearer decisions from the beginning.",
    href: "/learn/what-parents-should-know-first",
    imageSrc: images.chapterForParents.src,
    imageAlt: images.chapterForParents.alt,
  },
  {
    title: "Avoiding Talent Scams",
    description:
      "Learn the warning signs, pressure tactics, and red flags that often trap new families before they understand the industry.",
    href: "/learn/avoiding-talent-scams",
    imageSrc: images.chapterRepresentation.src,
    imageAlt: images.chapterRepresentation.alt,
  },
  {
    title: "Headshots, Resumes, and Materials",
    description:
      "Understand what materials matter, when they matter, and how to avoid building a polished package before the foundation is ready.",
    href: "/learn/headshots-resumes-and-materials",
    imageSrc: images.chapterTechnique.src,
    imageAlt: images.chapterTechnique.alt,
  },
];

const guides = [
  {
    title: "Headshot Guide",
    description:
      "A parent-first primer on timing, expectations, and what makes a headshot session useful instead of premature.",
    href: "/guides/headshot-guide",
    eyebrow: "Free guide",
  },
  {
    title: "Self Tape Setup Tips",
    description:
      "A simple starter setup for clean, watchable self tapes without turning your house into a studio.",
    href: "/guides/self-tape-setup-tips",
    eyebrow: "Free guide",
  },
  {
    title: "Fast Memorization Technique",
    description:
      "A practical technique young actors can use to learn lines faster while keeping the work calm and age-appropriate.",
    href: "/guides/fast-memorization-technique",
    eyebrow: "Free guide",
  },
  {
    title: "Zoom Callback Tips",
    description:
      "A calm checklist for helping your child show up prepared and professional when callbacks happen online.",
    href: "/guides/zoom-callback-tips",
    eyebrow: "Free guide",
  },
  {
    title: "Resume101",
    description:
      "A focused tool for building a clean, professional actor resume once your child is ready to present materials clearly.",
    href: "/ecosystem#resume101",
    eyebrow: "Tool",
  },
];

const trainingOptions = [
  {
    title: "101 Training Program",
    description:
      "A structured place to build real on-camera skill once your child is ready for consistent training.",
    href: "/ecosystem#training",
    eyebrow: "Training",
  },
  {
    title: "Coaching with Corey",
    description:
      "Targeted guidance when your family wants expert perspective on next steps, preparation, or growth.",
    href: "/ecosystem#coaching-with-corey",
    eyebrow: "Coaching",
  },
  {
    title: "Character Lab",
    description:
      "A deeper craft-focused space for actors who are ready to strengthen imagination, choices, and performance habits.",
    href: "/ecosystem#character-lab",
    eyebrow: "Training",
  },
  {
    title: "Self Tape Feedback",
    description:
      "Practical notes that help actors improve auditions with more clarity and confidence, not more chaos.",
    href: "/ecosystem#self-tape-feedback",
    eyebrow: "Preparation",
  },
];

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "A clear beginner roadmap for parents who want to help their child start acting in TV and film without getting overwhelmed.",
};

export default function StartHerePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Start Here | Child Actor 101",
    description:
      "A clear beginner roadmap for parents who want to help their child start acting in TV and film without getting overwhelmed.",
    url: "https://www.childactor101.com/start-here",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: roadmapSteps.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.title,
      })),
    },
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        label="Start Here"
        title="New to child acting? Start here."
        description="A clear, practical path for parents who want to understand the business without getting lost, scammed, or overwhelmed."
        primaryAction={{
          href: "#roadmap",
          label: "Start the roadmap",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "#newsletter",
          label: "Join The Callback",
          icon: <Headphones className="h-5 w-5" />,
        }}
        supportingPoints={[
          "Parents first",
          "Practical guidance",
          "One clear next step at a time",
        ]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            First 30 days
          </div>
          <div className="overflow-hidden rounded-[28px] border border-chalk/10">
            <Image
              src={images.chapterGettingStarted.src}
              alt={images.chapterGettingStarted.alt}
              width={900}
              height={720}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-xs uppercase tracking-[0.22em] text-chalkboard">
                Core rule
              </p>
              <p className="mt-3 font-display text-3xl text-chalkboard">
                Learn before you spend
              </p>
            </div>
            <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
                Built for
              </p>
              <p className="mt-3 text-sm leading-7 text-chalk/80">
                Parents who want clarity, order, and a safer starting point.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card tone="warm">
            <SectionLabel>Intro</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              Child Actor 101 helps parents understand the industry step by step.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink-soft">
              This page is not a push to buy everything at once. It is the calm
              first chapter for families who want to understand how child acting
              actually works before they start spending money, chasing
              representation, or piling pressure onto their child.
            </p>
            <p className="mt-5 text-lg leading-8 text-ink-soft">
              The goal is simple: help you learn the business in the right
              order, protect your child from avoidable mistakes, and move
              forward with more confidence and less noise.
            </p>
          </Card>

          <Card className="bg-white/90">
            <SectionLabel>What matters first</SectionLabel>
            <div className="mt-7 space-y-4">
              <div className="rounded-[22px] border border-chalkboard/10 bg-paper px-5 py-5">
                <ShieldCheck className="h-7 w-7 text-purple-deep" />
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Learn the business before you start buying services.
                </p>
              </div>
              <div className="rounded-[22px] border border-chalkboard/10 bg-paper px-5 py-5">
                <BookOpen className="h-7 w-7 text-purple-deep" />
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Focus on understanding, safety, and long-term fit before speed.
                </p>
              </div>
              <div className="rounded-[22px] border border-chalkboard/10 bg-paper px-5 py-5">
                <Sparkles className="h-7 w-7 text-purple-deep" />
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Let training, tools, and auditions arrive in the right order.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <JourneyTimeline
        id="roadmap"
        title="The five-step roadmap"
        description="This is the parent-first path through the business. Take it in order, learn what each stage is for, and let each step prepare you for the next."
        steps={roadmapSteps}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>First things to read</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              Start with the lessons that reduce confusion first.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              These are the foundational reads for families entering the
              business. They answer the first questions parents usually have
              before the process gets noisy.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {firstReads.map((item) => (
              <LessonCard
                key={item.title}
                actionHref={item.href}
                actionLabel="Read first"
                description={item.description}
                eyebrow="Starter lesson"
                imageAlt={item.imageAlt}
                imageSrc={item.imageSrc}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>Free tools and guides</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              Use practical resources that support the stage you&apos;re actually in.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              These are useful when you need clarity or a simple practical next
              step, not when you need to buy your way into the business.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {guides.map((item) => (
              <LessonCard
                key={item.title}
                actionHref={item.href}
                actionLabel="Open guide"
                description={item.description}
                eyebrow={item.eyebrow}
                title={item.title}
                tone="warm"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel className="text-[#bcefdc]">
            When to consider training or coaching
          </SectionLabel>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
                Training is not the first purchase every family needs.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/76">
                In the beginning, most families need understanding more than
                they need another service. Training and coaching become more
                useful once your actor is ready to build skill, take direction,
                and audition with more confidence.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/76">
                The right support should strengthen fundamentals and reduce
                chaos. It should not replace a clear roadmap or create pressure
                to sprint before your child is ready.
              </p>
              <div className="mt-8">
                <Button href="/ecosystem" variant="outlineLight">
                  Explore the ecosystem
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {trainingOptions.map((item) => (
                <LessonCard
                  key={item.title}
                  actionHref={item.href}
                  actionLabel="Learn more"
                  description={item.description}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  tone="chalkboard"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <Newsletter
            ctaHref="#newsletter"
            ctaLabel="Join The Callback"
            description="The Callback gives parents practical guidance, new articles, podcast updates, and resources from the Child Actor 101 ecosystem."
            label="Newsletter"
            title="Get the next lesson in your inbox."
          />
        </div>
      </section>
    </main>
  );
}
