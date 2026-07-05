import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, Camera, CheckSquare, Clapperboard, FileText, Users } from "lucide-react";

import { LessonCard } from "@/components/content/LessonCard";
import { Newsletter } from "@/components/content/Newsletter";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "How to Get Representation for a Child Actor | Child Actor 101",
  description:
    "Learn when your child is ready for an agent or manager, how representation really works, and how to prepare professional materials before submitting.",
};

// Placeholder until a dedicated public open-call or waitlist route exists.
const openCallWaitlistHref = "/ecosystem";

const representationReality = [
  {
    title: "Reps don’t create careers.",
    description:
      "Representation can open doors, but it cannot replace craft, timing, or the actor becoming someone casting actually wants to keep calling in.",
  },
  {
    title: "Reps create opportunities.",
    description:
      "The real job is access: submissions, opportunities, communication, and helping the right people see a prepared actor at the right moment.",
  },
  {
    title: "Actors still need training.",
    description:
      "A rep is not a substitute for skill. Training, self-tape quality, and professional habits still carry the weight once the opportunity arrives.",
  },
  {
    title: "Parents still manage the journey.",
    description:
      "Families still coordinate communication, expectations, schedules, and the emotional tone around the career. Representation does not remove that job.",
  },
];

const roleCards = [
  {
    title: "Agent",
    eyebrow: "Representation role",
    summary: "Focused on procuring employment and handling the business of submissions and opportunities.",
    points: ["Procures employment", "Licensed where applicable", "Usually 10%"],
  },
  {
    title: "Manager",
    eyebrow: "Representation role",
    summary: "Focused on development, career guidance, and longer-term strategy as the actor grows.",
    points: ["Career guidance", "Strategy", "Development", "Usually 10–20%"],
  },
];

const readinessChecks = [
  {
    title: "Professional headshots",
    description: "Recent, age-appropriate photos that actually look like the actor being submitted.",
  },
  {
    title: "Strong resume",
    description: "A clean resume that shows training, credits, and relevant experience without trying to fake maturity.",
  },
  {
    title: "Great self tape",
    description: "Not perfection. Just a reliable tape standard that helps a rep feel safe sending the actor out.",
  },
  {
    title: "Training",
    description: "Enough ongoing work that the actor is building real skill instead of relying on wishful thinking.",
  },
  {
    title: "Professional communication",
    description: "Parents who can reply clearly, follow instructions, and not create extra chaos for the relationship.",
  },
  {
    title: "Family expectations",
    description: "A realistic understanding that representation is a support system, not an instant-results machine.",
  },
];

const materialTools = [
  {
    title: "Resume101",
    description:
      "Use Resume101 to build a cleaner resume before you ask a rep to judge readiness from a cluttered first impression.",
    href: "/ecosystem#resume101",
    actionLabel: "Explore Resume101",
    eyebrow: "Preparation tool",
    icon: <FileText className="h-6 w-6 text-purple-deep" />,
  },
  {
    title: "Pages101",
    description:
      "Pages101 gives families a more professional home for materials when a rep, coach, or industry contact needs one clean link.",
    href: "/ecosystem#pages101",
    actionLabel: "Explore Pages101",
    eyebrow: "Preparation tool",
    icon: <BriefcaseBusiness className="h-6 w-6 text-purple-deep" />,
  },
  {
    title: "Professional Self Tape",
    description:
      "A dependable self tape is part of readiness. If a rep sends an opportunity, your family needs a tape process that does not fall apart under pressure.",
    href: "/ecosystem#self-tape-feedback",
    actionLabel: "Improve self tapes",
    eyebrow: "Preparation tool",
    icon: <Clapperboard className="h-6 w-6 text-purple-deep" />,
  },
];

const relatedLessons = [
  {
    title: "Agents vs. Managers for Child Actors",
    description:
      "Start here if your family still needs the role difference explained without industry jargon.",
    href: "/from-the-classroom/representation/agents-vs-managers-for-child-actors",
  },
  {
    title: "Understanding Talent Rep Commissions",
    description:
      "A practical commission lesson before money, percentages, and contracts get blurry.",
    href: "/from-the-classroom/representation/understanding-talent-rep-commissions",
  },
  {
    title: "Is My Child Ready for an Agent?",
    description:
      "The readiness lesson for families who want the honest answer before they submit too early.",
    href: "/from-the-classroom/representation/is-my-child-ready-for-an-agent",
  },
  {
    title: "Representation Chapter",
    description:
      "Browse the broader representation shelf for timing, etiquette, and the professional habits reps actually notice.",
    href: "/from-the-classroom/representation",
  },
];

export default function GetRepresentedPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Representation"
        title="Ready for an agent or manager?"
        description="Representation isn&apos;t the first milestone. It&apos;s the right milestone when the actor, the materials, and the family are truly prepared."
        primaryAction={{
          href: "#readiness",
          label: "Get Representation Ready",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "#agent-vs-manager",
          label: "Learn the Difference",
        }}
        supportingPoints={["Readiness first", "Professional materials", "Opportunities, not miracles"]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Representation reality
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              What matters first
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              Readiness is more persuasive than urgency.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              The strongest representation conversations happen when the actor can work, the materials look professional, and the family understands what a rep can and cannot do.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                A rep should amplify momentum, not create the entire career from scratch.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                The family still sets the tone for communication, expectations, and long-game professionalism.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Representation is valuable, but it helps to name the job correctly before you chase it. The rep does not become the actor, the teacher, or the parent manager."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Representation reality"
            title="What representation really means."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {representationReality.map((item) => (
              <Card key={item.title} className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  Reality check
                </p>
                <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="agent-vs-manager" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Keep the comparison simple. Both roles can matter, but they are not the same job and they should not be sold to parents as the same thing."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Agent vs. manager"
            title="Learn the difference before you sign anything."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {roleCards.map((role) => (
              <Card key={role.title} tone="warm" className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  {role.eyebrow}
                </p>
                <h2 className="mt-5 font-display text-4xl text-chalkboard">{role.title}</h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{role.summary}</p>
                <div className="mt-6 space-y-3">
                  {role.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-[22px] border border-[#e7dcc7] bg-white px-5 py-4 text-sm leading-7 text-ink-soft shadow-soft"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="readiness" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Wanting representation is not the same as being ready for it. This checklist is the calmer filter before a family starts mass-submitting out of hope."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Are you actually ready?"
            title="Readiness looks boring on paper. That’s usually a good sign."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {readinessChecks.map((item) => (
              <Card key={item.title} className="h-full">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-6 w-6 text-purple-deep" />
                  <p className="font-display text-2xl text-chalkboard">{item.title}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              description="Before a rep ever says yes, your materials are usually doing the first talking. Build the pieces that help someone trust the submission."
              descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
              label="Build your materials"
              title="Professional preparation is part of the pitch."
              titleClassName="mt-6 text-chalkboard"
            />
            <div className="mt-8 rounded-[28px] border border-[#e7dcc7] bg-white px-6 py-6 shadow-soft">
              <Camera className="h-8 w-8 text-purple-deep" />
              <p className="mt-5 text-lg leading-8 text-ink-soft">
                Reps notice the basics faster than families expect: the headshots, the resume, the tape, and whether the package suggests a family that is prepared to work professionally.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {materialTools.map((tool) => (
              <LessonCard
                key={tool.title}
                actionHref={tool.href}
                actionLabel={tool.actionLabel}
                description={tool.description}
                eyebrow={tool.eyebrow}
                icon={tool.icon}
                title={tool.title}
                tone="warm"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="open-call" className="bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              description="Child Actor 101 periodically connects prepared actors with industry professionals. The point is not to rush families into exposure. The point is to create a cleaner bridge when the actor is actually ready."
              descriptionClassName="mt-4 text-lg leading-8 text-white/74"
              label="Open call"
              labelClassName="text-[#bcefdc]"
              title="Preparation makes the waitlist matter."
              titleClassName="mt-6 text-white"
            />
            <p className="mt-6 text-lg leading-8 text-white/76">
              If your family wants representation, the smartest next step is not random submission volume. It is becoming the kind of actor package a rep can review without guessing what is missing.
            </p>
          </div>
          <Card tone="chalkboard" className="border border-white/10">
            <Users className="h-8 w-8 text-[#bcefdc]" />
            <h2 className="mt-5 font-display text-4xl leading-tight text-white">
              Join the Open Call Waitlist
            </h2>
            <p className="mt-4 text-sm leading-7 text-chalk/76">
              Join the waitlist, then use the preparation tools and classroom guidance to make sure your actor is worth putting in front of the right people.
            </p>
            <div className="mt-8">
              <Button href={openCallWaitlistHref} size="lg" variant="primary">
                Join the Open Call Waitlist
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="These classroom lessons cover the timing, money, and readiness questions that usually need to be settled before representation becomes a smart next move."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Related classroom lessons"
            title="Learn the rules before you submit."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedLessons.map((lesson) => (
              <LessonCard
                key={lesson.title}
                actionHref={lesson.href}
                actionLabel="Read lesson"
                description={lesson.description}
                eyebrow="Classroom lesson"
                title={lesson.title}
                tone="paper"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Newsletter
            ctaHref="/from-the-classroom#newsletter"
            ctaLabel="Get representation tips"
            description="Get practical representation notes in your inbox: readiness, submissions, materials, money questions, and the judgment calls that matter before a family reaches out to reps."
            label="Newsletter"
            title="Stay sharp between submissions."
          />
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Card className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe0_100%)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
              Final CTA
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              Representation isn&apos;t the finish line.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">
              Great representation amplifies prepared actors. Build the materials, strengthen the process, and then let the right opportunity meet a family that is ready for it.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="#readiness" size="lg">
                Start Preparing
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href={openCallWaitlistHref} size="lg" variant="secondary">
                Join the Waitlist
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
