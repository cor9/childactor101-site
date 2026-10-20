import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Mic2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { SPOTIFY_PODCAST_URL } from "@/lib/site-links";

const topics = [
  {
    title: "Getting started",
    description:
      "Episodes for parents trying to understand the business before they start spending heavily.",
  },
  {
    title: "Auditions",
    description:
      "Self-tapes, preparation, callbacks, and the habits that lead to stronger work.",
  },
  {
    title: "Representation",
    description:
      "Agents, managers, communication, and how professional relationships really function.",
  },
  {
    title: "For parents",
    description:
      "Childhood, schedules, expectations, burnout, and how to protect the family while doing this well.",
  },
];

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Conversations from inside Hollywood: the Child Actor 101 podcast on auditions, representation, parenting, and building a healthy young actor career.",
};

export default function PodcastPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="On air"
        title="Conversations from inside Hollywood"
        description="The podcast brings the off-camera side of the industry into the classroom: auditions, representation, parenting, and the reality of building a healthy young actor career."
        primaryAction={{
          href: "/start-here",
          label: "Start with the roadmap",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: SPOTIFY_PODCAST_URL,
          label: "Listen on Spotify",
          icon: <Mic2 className="h-5 w-5" />,
          rel: "noreferrer",
          target: "_blank",
        }}
        supportingPoints={["Auditions", "Representation", "For parents"]}
      >
        <div className="space-y-5">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Featured show
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-[24px] border border-chalk/10 bg-[radial-gradient(circle_at_top,_rgba(248,244,232,0.16),transparent_45%)]">
            <Image
              src="/101logo.png"
              alt="Child Actor 101 logo"
              width={240}
              height={288}
              className="h-3/4 w-auto object-contain"
            />
          </div>
          <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
              Where to listen
            </p>
            <p className="mt-3 text-sm leading-7 text-chalk/80">
              Episodes are available on Spotify.
            </p>
          </div>
        </div>
      </PageHero>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>What you hear here</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              The show follows the same chapters as the platform.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              Podcast episodes are not side content. They support the major
              topic clusters families need most.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {topics.map((topic) => (
              <Card key={topic.title} className="flex h-full flex-col">
                <Mic2 className="h-8 w-8 text-purple-deep" />
                <h3 className="mt-5 font-display text-2xl text-chalkboard">
                  {topic.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {topic.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>Listen</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalk sm:text-5xl">
              Pick an episode, then keep learning in the classroom.
            </h2>
            <p className="mt-4 text-lg leading-8 text-chalk/72">
              Listen on Spotify, then use the Child Actor 101 classroom and
              ecosystem to go deeper on the topics each conversation raises.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={SPOTIFY_PODCAST_URL} rel="noreferrer" target="_blank" variant="secondary">
              Open on Spotify
            </Button>
            <Button href="/" variant="secondary">
              Back to homepage
            </Button>
            <Button href="/ecosystem">
              See where podcast fits
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
