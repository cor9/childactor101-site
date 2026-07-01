import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Headphones, NotebookPen, Sparkles } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { SPOTIFY_PODCAST_URL } from "@/lib/site-links";

const roles = [
  {
    title: "Former child actor",
    description:
      "He understands the pressure, pace, and emotional reality of growing up around auditions and sets.",
  },
  {
    title: "Youth talent manager",
    description:
      "He has worked the business side too, helping families navigate representation, submissions, and expectations.",
  },
  {
    title: "Acting coach",
    description:
      "His teaching stays practical: script analysis, self-tapes, and stronger on-camera work.",
  },
  {
    title: "Founder of Child Actor 101",
    description:
      "He built the platform to give parents the clear industry manual he wished already existed.",
  },
];

const principles = [
  "Parents need real information before they spend money.",
  "Technique matters, but childhood matters more.",
  "Representation should be understood, not romanticized.",
  "Confidence comes from preparation, not hype.",
];

const pathways = [
  {
    title: "Start here",
    description:
      "For new families who need the industry explained from the ground up.",
    href: "/start-here",
  },
  {
    title: "Listen to the podcast",
    description:
      "Industry conversations that bring the off-camera reality into the open.",
    href: SPOTIFY_PODCAST_URL,
  },
  {
    title: "See the ecosystem",
    description:
      "A map of the classes, tools, and resources built to support the full journey.",
    href: "/ecosystem",
  },
];

export const metadata: Metadata = {
  title: "Meet Corey",
  description:
    "Meet Corey Ralston, the former child actor, youth talent manager, acting coach, and founder behind Child Actor 101.",
};

export default function CoreyRalstonPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Meet Corey"
        title="A teacher who has lived every side of this business."
        description="Corey Ralston is a former child actor, youth talent manager, acting coach, and founder of Child Actor 101. This page is the front-door bio, philosophy, and authority hub for the educator behind the platform."
        primaryAction={{
          href: "/start-here",
          label: "Start with the roadmap",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: SPOTIFY_PODCAST_URL,
          label: "Listen to the podcast",
          icon: <Headphones className="h-5 w-5" />,
          rel: "noreferrer",
          target: "_blank",
        }}
        supportingPoints={[
          "Former child actor",
          "Youth talent manager",
          "Acting coach and founder",
        ]}
      >
        <div className="space-y-5">
          <div className="rounded-[28px] border border-chalk/10 bg-chalkboard-deep/55 p-5">
            <div className="overflow-hidden rounded-[24px] border border-chalk/10 bg-paper">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/corey-ralston.jpg"
                  alt="Corey Ralston"
                  fill
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-xs uppercase tracking-[0.22em] text-chalkboard">
                Role now
              </p>
              <p className="mt-3 font-display text-3xl text-chalkboard">
                Educator and guide
              </p>
            </div>
            <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
                Why this page exists
              </p>
              <p className="mt-3 text-sm leading-7 text-chalk/80">
                Biography, philosophy, author page, and media-facing overview in
                one place.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>Every side of the industry</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              Why families trust Corey
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              The perspective behind Child Actor 101 is not theoretical. It
              comes from working inside the same systems families are trying to
              understand.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {roles.map((role) => (
              <Card key={role.title} className="flex h-full flex-col">
                <h3 className="font-display text-2xl text-chalkboard">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {role.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Card tone="chalkboard" className="border-chalk/10 bg-chalkboard-deep/65">
            <SectionLabel>Philosophy</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight text-chalk sm:text-5xl">
              The work is bigger than booking.
            </h2>
            <p className="mt-4 text-lg leading-8 text-chalk/72">
              Child Actor 101 exists to protect childhood while raising the
              professional standard for families who choose this path.
            </p>
            <div className="mt-8 rounded-[24px] border border-chalk/10 bg-chalkboard p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-chalk/65">
                Press note
              </p>
              <p className="mt-3 text-sm leading-7 text-chalk/78">
                Media kit materials, bio variations, and approved brand assets
                will live here as the platform expands.
              </p>
            </div>
          </Card>

          <div className="grid gap-4">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-[26px] border border-chalk/10 bg-chalkboard-deep/65 p-6"
              >
                <div className="flex items-start gap-4">
                  <Sparkles className="mt-1 h-5 w-5 text-gold" />
                  <p className="text-base leading-8 text-chalk/82">{principle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>Go deeper</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              The best next page depends on where your family is right now.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <Card key={pathway.title} className="flex h-full flex-col">
                <NotebookPen className="h-8 w-8 text-purple-deep" />
                <h3 className="mt-5 font-display text-2xl text-chalkboard">
                  {pathway.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                  {pathway.description}
                </p>
                <Button
                  href={pathway.href}
                  rel={pathway.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-6 w-fit"
                  target={pathway.href.startsWith("http") ? "_blank" : undefined}
                  variant="secondary"
                >
                  Open page
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
