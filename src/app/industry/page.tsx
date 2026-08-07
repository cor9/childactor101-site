import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Handshake,
  Mic2,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import { LessonCard } from "@/components/content/LessonCard";
import { CTA } from "@/components/content/CTA";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { images } from "@/content/images";
import {
  BOOK101_URL,
  DIRECTORY_URL,
  OPEN_CALL_URL,
  PAGES101_URL,
  RESUME101_URL,
  TALENT_PORTAL_URL,
} from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Industry Professionals",
  description:
    "Resources for talent agents, managers, casting professionals, coaches, photographers and other youth entertainment professionals, including talent discovery, industry tools, the Child Actor 101 Directory and ways to participate.",
  alternates: {
    canonical: "/industry",
  },
};

const pathways = [
  {
    title: "Find Talent",
    description:
      "Access Child Actor 101 representation Open Calls and discover prepared young performers seeking representation.",
    icon: <Search className="h-6 w-6 text-gold" />,
    ctaLabel: "Explore Talent Discovery",
    href: "#find-talent",
  },
  {
    title: "Join the Directory",
    description:
      "Connect with families looking for reputable photographers, coaches, attorneys, classes, services, and youth-industry professionals.",
    icon: <Users className="h-6 w-6 text-[#bcefdc]" />,
    ctaLabel: "Explore the Directory",
    href: DIRECTORY_URL,
    external: true,
  },
  {
    title: "Resources for Your Clients",
    description:
      "Send families somewhere useful instead of explaining the same industry basics for the four-hundredth time.",
    icon: <BookOpen className="h-6 w-6 text-purple" />,
    ctaLabel: "Browse Professional Resources",
    href: "/industry/resources",
  },
  {
    title: "Participate in Child Actor 101",
    description:
      "Join panels, parent Q&As, podcast conversations, educational events, Open Calls, expert articles, and other community initiatives.",
    icon: <Handshake className="h-6 w-6 text-chalk" />,
    ctaLabel: "Get Involved",
    href: "/industry/get-involved",
  },
  {
    title: "Media, Speaking & Collaboration",
    description:
      "Invite Corey Ralston for podcasts, interviews, panels, articles, speaking engagements, expert commentary, and collaborative projects.",
    icon: <Mic2 className="h-6 w-6 text-gold" />,
    ctaLabel: "Invite Corey",
    href: "/media",
  },
];

const openCallPoints = [
  "Free for performers to submit.",
  "Designed around professional materials and personality.",
  "Participating reps receive streamlined access to submissions.",
  "Rep participation is designed to stay low-friction.",
  "Offices, assistants, and team members can be given practical access.",
];

const directoryCategories = [
  "Acting coaches",
  "Photographers",
  "Talent services",
  "Entertainment attorneys",
  "Accountants",
  "Self-tape services",
  "Classes and workshops",
  "Industry resources",
];

const professionalMaterialsTools = [
  {
    title: "Resume101",
    description: "Create and maintain a professional actor résumé.",
    href: RESUME101_URL,
  },
  {
    title: "Pages101",
    description: "Build a safety-conscious professional actor page for sharing materials.",
    href: PAGES101_URL,
  },
  {
    title: "Book101",
    description: "The Child Actor 101 tool for organizing an actor's professional materials in one place.",
    href: BOOK101_URL,
  },
];

const freeGuides = [
  {
    title: "Self-Tape Setup",
    description: "A simple starter setup for clean, watchable self-tapes.",
    href: "https://selftapetips.childactor101.com",
  },
  {
    title: "Memorization",
    description: "A practical technique for young actors to learn lines faster.",
    href: "https://memorize.childactor101.com",
  },
  {
    title: "Zoom Callback Guide",
    description: "A calm checklist for professional, prepared virtual callbacks.",
    href: "https://zoomcb.childactor101.com",
  },
  {
    title: "College Checklist",
    description: "A planning guide for working actors balancing school and career.",
    href: "https://collegechecklist.childactor101.com",
  },
];

const classroomShares = [
  {
    title: "Agents vs. Managers for Child Actors",
    description: "The distinction families need before they build a representation team.",
    href: "/from-the-classroom/representation/agents-vs-managers-for-child-actors",
    imageSrc: images.chapterRepresentation.src,
    imageAlt: images.chapterRepresentation.alt,
    eyebrow: "Representation",
  },
  {
    title: "When Is It Time to Update Your Child Actor Headshots?",
    description: "Helps families understand timing before investing in new photos.",
    href: "/from-the-classroom/professional-materials/when-to-update-child-actor-headshots",
    imageSrc: images.chapterGettingStarted.src,
    imageAlt: images.chapterGettingStarted.alt,
    eyebrow: "Headshots",
  },
  {
    title: "What Makes a Child Actor's Self Tape Competitive",
    description: "What casting directors actually look for beyond production value.",
    href: "/from-the-classroom/auditions/what-makes-a-child-actors-self-tape-competitive",
    imageSrc: images.homeHero.src,
    imageAlt: images.homeHero.alt,
    eyebrow: "Self Tapes",
  },
  {
    title: "The New Hollywood Casting Scam Every Parent Needs to Know About",
    description: "A resource that helps families spot predatory practices early.",
    href: "/from-the-classroom/safety-ethics/the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
    imageSrc: images.chapterForParents.src,
    imageAlt: images.chapterForParents.alt,
    eyebrow: "Scams",
  },
  {
    title: "Why Consistent Training Matters for Young Actors",
    description: "Sets realistic expectations about training and long-term growth.",
    href: "/from-the-classroom/career-growth/why-consistent-training-matters-for-young-actors",
    imageSrc: images.chapterGettingStarted.src,
    imageAlt: images.chapterGettingStarted.alt,
    eyebrow: "Training",
  },
  {
    title: "Booking Out for Child Actors",
    description: "A short lesson on the professional communication reps rely on.",
    href: "/from-the-classroom/representation/booking-out-for-child-actors",
    imageSrc: images.chapterRepresentation.src,
    imageAlt: images.chapterRepresentation.alt,
    eyebrow: "Professional Behavior",
  },
];

const proofPoints = [
  {
    title: "A national parent community",
    description:
      "A large, active community of parents and young performers who read the classroom, listen to the podcast, and use the tools every week.",
    icon: <Users className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "Talent Representation Open Calls",
    description:
      "Recurring Open Calls that connect prepared young performers with agents and managers in a structured, low-friction format.",
    icon: <Search className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "A growing professional directory",
    description:
      "An expanding directory of vetted-for-listing photographers, coaches, attorneys, and services families can discover directly.",
    icon: <Camera className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "An education platform, not a single course",
    description:
      "A full classroom, tool suite, and podcast built around the real questions families and professionals run into every day.",
    icon: <BookOpen className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "Founded by a working industry insider",
    description:
      "Built by Corey Ralston, a former child actor, youth talent manager, and acting coach who understands both sides of the business.",
    icon: <ShieldCheck className="h-7 w-7 text-purple-deep" />,
  },
];

export default function IndustryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Industry Professionals | Child Actor 101",
    description:
      "Resources for talent agents, managers, casting professionals, coaches, photographers and other youth entertainment professionals.",
    url: "https://www.childactor101.com/industry",
    about: {
      "@type": "Organization",
      name: "Child Actor 101",
      url: "https://www.childactor101.com",
    },
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        label="For Industry Professionals"
        title="Helping the youth talent community work better."
        description="Child Actor 101 connects families, young performers, talent representatives, educators, coaches, vendors, and industry professionals through practical resources, tools, education, and talent discovery."
        primaryAction={{
          href: "#find-talent",
          label: "Find Talent",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/industry/resources",
          label: "Explore Industry Resources",
          icon: <BookOpen className="h-5 w-5" />,
        }}
        supportingPoints={[
          "Talent discovery",
          "A growing professional directory",
          "Practical resources for clients",
        ]}
      >
        <div className="space-y-5">
          <p className="text-sm leading-7 text-chalk/82">
            Whether you represent talent, cast projects, coach young
            performers, photograph actors, produce content, or provide
            professional services to families, Child Actor 101 was built to
            make the youth entertainment ecosystem easier to navigate.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-xs uppercase tracking-[0.22em] text-chalkboard">
                Built for
              </p>
              <p className="mt-3 font-display text-2xl text-chalkboard">
                Agents, managers, casting, coaches & more
              </p>
            </div>
            <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
                What this is not
              </p>
              <p className="mt-3 text-sm leading-7 text-chalk/80">
                Not Door 6. A separate professional entrance alongside the
                parent-facing classroom.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="What Brings You Here?"
            title="Five ways to work with the Child Actor 101 ecosystem."
            description="Pick the path that matches what you actually need today."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pathways.map((pathway) => (
              <Card key={pathway.title} className="flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chalkboard shadow-soft">
                  {pathway.icon}
                </div>
                <h3 className="mt-5 font-display text-2xl text-chalkboard">
                  {pathway.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                  {pathway.description}
                </p>
                <Button
                  href={pathway.href}
                  variant="secondary"
                  className="mt-6 w-fit"
                  rel={pathway.external ? "noreferrer" : undefined}
                  target={pathway.external ? "_blank" : undefined}
                >
                  {pathway.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        id="find-talent"
        className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <ChalkDust />
        <ChalkDoodle variant="arrow-right" className="right-10 top-16 hidden h-16 w-24 md:block" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <SectionHeader
                label="Talent Discovery"
                labelClassName="text-[#bcefdc]"
                title="Find your next client."
                titleClassName="mt-6 text-white"
                description="Child Actor 101 periodically hosts free Talent Representation Open Calls connecting young performers seeking representation with agents and managers across the United States."
                descriptionClassName="mt-4 text-lg leading-8 text-white/74"
              />
              <ul className="mt-8 space-y-3">
                {openCallPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-white/82">
                    <Sparkles className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card tone="chalkboard" className="border-chalk/10 bg-chalkboard-deep/65">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#bcefdc]">
                How to access talent
              </p>
              <div className="mt-6 space-y-4">
                <Button href={OPEN_CALL_URL} target="_blank" rel="noreferrer" className="w-full justify-center">
                  Access the Current Open Call
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  href={TALENT_PORTAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlineLight"
                  className="w-full justify-center"
                >
                  Representative Access
                </Button>
                <Button
                  href="/industry/get-involved"
                  variant="chalk"
                  className="w-full justify-center"
                >
                  Join the Representative List
                </Button>
              </div>
              <p className="mt-5 text-xs leading-6 text-white/60">
                Open Call availability changes throughout the year. The
                destination above always reflects current status.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionHeader
                label="Professional Directory"
                title="Be where families are already looking."
                description="The Child Actor 101 Directory helps families discover and evaluate professionals serving young performers."
                descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
                titleClassName="mt-6 text-chalkboard"
              />
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href={DIRECTORY_URL} target="_blank" rel="noreferrer">
                  Browse the Directory
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button href={DIRECTORY_URL} target="_blank" rel="noreferrer" variant="secondary">
                  Find Your Listing
                </Button>
              </div>
            </div>
            <Card tone="warm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                Categories families search
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {directoryCategories.map((category) => (
                  <Pill key={category} tone="paper">
                    {category}
                  </Pill>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Tools Professionals Can Recommend"
            title="Resources you can confidently send families to."
            description="Child Actor 101 builds practical resources around problems talent representatives and industry professionals see every day: weak materials, confusing profiles, audition preparation, self-tape logistics, and parents who simply do not know what professional standards look like yet."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 space-y-10">
            <div>
              <Pill tone="light" className="text-xs uppercase tracking-[0.22em]">
                Professional Materials
              </Pill>
              <div className="mt-5 grid gap-6 md:grid-cols-3">
                {professionalMaterialsTools.map((tool) => (
                  <Card key={tool.title} className="bg-white">
                    <h3 className="font-display text-2xl text-chalkboard">{tool.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{tool.description}</p>
                    <Link
                      href={tool.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                    >
                      Open {tool.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Pill tone="paper" className="text-xs uppercase tracking-[0.22em]">
                Audition Preparation
              </Pill>
              <Card className="mt-5 bg-white">
                <h3 className="font-display text-2xl text-chalkboard">
                  Audition Preparation Tools
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Prep101, Reader101, and Bold Choices support scene and
                  audition preparation as a connected family of tools inside
                  the Child Actor 101 ecosystem.
                </p>
                <Link
                  href="/ecosystem"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                >
                  See where these tools fit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Free Resources Professionals Can Share"
            title="Send a family somewhere useful."
            description="Sometimes the best professional resource is simply a clear explanation you do not have to write yourself."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {freeGuides.map((guide) => (
              <LessonCard
                key={guide.title}
                title={guide.title}
                description={guide.description}
                actionHref={guide.href}
                actionLabel="Open guide"
                eyebrow="Free guide"
                tone="warm"
              />
            ))}
          </div>
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
              Classroom lessons families ask about most
            </p>
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {classroomShares.map((lesson) => (
                <LessonCard
                  key={lesson.href}
                  title={lesson.title}
                  description={lesson.description}
                  actionHref={lesson.href}
                  actionLabel="Open lesson"
                  eyebrow={lesson.eyebrow}
                  imageSrc={lesson.imageSrc}
                  imageAlt={lesson.imageAlt}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Why Child Actor 101"
            labelClassName="text-[#bcefdc]"
            title="A trusted platform on both sides of the business."
            titleClassName="mt-6 text-white"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {proofPoints.map((point) => (
              <Card key={point.title} tone="chalkboard" className="border-chalk/10 bg-chalkboard-deep/65">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  {point.icon}
                </div>
                <h3 className="mt-5 font-display text-xl text-chalk">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-chalk/78">{point.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-24 sm:px-6 lg:px-8">
        <Container className="max-w-5xl">
          <CTA
            label="Next Step"
            title="Ready to participate?"
            description="Join panels, contribute expertise, list your services, or bring your Open Call submissions into one streamlined place."
            actionHref="/industry/get-involved"
            actionLabel="Get Involved"
            actionIcon={<ArrowRight className="h-5 w-5" />}
          />
        </Container>
      </Section>
    </main>
  );
}
