import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, FileText, Mic2, Newspaper, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/PageHero";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/content/images";
import { MediaInquiryForm } from "./_components/MediaInquiryForm";

export const metadata: Metadata = {
  title: "Corey Ralston | Speaker, Podcast Guest & Child Actor Industry Expert",
  description:
    "Invite youth talent manager, acting coach, former child actor and Child Actor 101 founder Corey Ralston for podcasts, interviews, panels, articles, speaking engagements and expert commentary.",
  alternates: {
    canonical: "/media",
  },
};

const topics = [
  "How child actors actually enter the entertainment industry",
  "Talent agents vs. managers",
  "What representatives look for in young actors",
  "Audition and self-tape culture",
  "Acting training for young performers",
  "Raising confident actors without making childhood a business plan",
  "Casting scams and predatory industry practices",
  "Parents navigating Hollywood",
  "AI and the changing audition/casting landscape",
  "Social media and young performers",
  "The psychology of rejection",
  "Child actor materials and professional readiness",
  "The business realities behind “overnight success”",
  "Developing charisma and on-camera identity",
  "Former child actor perspective",
  "Youth talent management",
  "Ethical issues in youth entertainment",
];

const workTogether = [
  {
    title: "Speak & Appear",
    icon: <Mic2 className="h-6 w-6 text-gold" />,
    items: [
      "Podcasts",
      "Broadcast interviews",
      "YouTube shows",
      "Panels",
      "Conferences",
      "Webinars",
      "Livestreams",
      "Parent organizations",
      "Acting schools",
      "Professional organizations",
    ],
  },
  {
    title: "Write & Contribute",
    icon: <Newspaper className="h-6 w-6 text-[#bcefdc]" />,
    items: [
      "Guest articles",
      "Columns",
      "Q&As",
      "Expert quotes",
      "Reviews",
      "Commentary",
      "Newsletter contributions",
      "Educational resources",
    ],
  },
  {
    title: "Collaborate",
    icon: <Users className="h-6 w-6 text-purple" />,
    items: [
      "Research interviews",
      "Educational projects",
      "Industry initiatives",
      "Workshops",
      "Panel moderation",
      "Professional development",
      "Parent resources",
      "Advocacy/education projects where relevant",
    ],
  },
];

const interviewQuestions = [
  "What should parents know before trying to get their child into acting?",
  "When is a young actor actually ready for representation?",
  "What makes an agent or manager legitimate?",
  "Why do some talented kids struggle to book?",
  "What makes a self tape competitive?",
  "How much should families realistically spend?",
  "What are the most common child acting scams?",
  "How should parents handle rejection?",
  "What separates training from simply taking classes?",
  "How has the business changed since Corey was a child actor?",
];

const mediaKitItems = [
  "Short bio",
  "Medium bio",
  "Long bio",
  "Approved headshots",
  "Child Actor 101 logo",
  "Speaker introduction",
  "Suggested topics",
  "Contact information",
];

export default function MediaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Corey Ralston | Speaker, Podcast Guest & Child Actor Industry Expert",
    url: "https://www.childactor101.com/media",
    mainEntity: {
      "@type": "Person",
      name: "Corey Ralston",
      jobTitle: "Founder, Child Actor 101",
      url: "https://www.childactor101.com/corey-ralston",
      description:
        "Former child actor, youth talent manager, acting coach, and founder of Child Actor 101.",
    },
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        label="Speaking · Media · Collaboration"
        title="Invite Corey Ralston."
        description="Corey is available for select podcasts, interviews, panels, speaking engagements, expert commentary, guest writing, and collaborative educational projects about young performers and the entertainment industry."
        primaryAction={{
          href: "#pitch",
          label: "Pitch an Opportunity",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/corey-ralston",
          label: "Meet Corey",
        }}
        supportingPoints={["Podcasts & interviews", "Speaking & panels", "Guest writing"]}
      >
        <div className="space-y-5">
          <div className="overflow-hidden rounded-[24px] border border-chalk/10">
            <Image
              src={images.coreyRalston.src}
              alt={images.coreyRalston.alt}
              width={900}
              height={720}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>
          <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
              This page vs. Meet Corey
            </p>
            <p className="mt-3 text-sm leading-7 text-chalk/80">
              /corey-ralston is the biography and authority page. This page
              is the press and collaboration front door.
            </p>
          </div>
        </div>
      </PageHero>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-4xl">
          <SectionHeader
            label="Why Corey"
            title="A perspective built from every side of the business."
            description="Corey Ralston is a former child actor, youth talent manager, and acting coach who founded Child Actor 101 to work directly with parents and performers. He understands both the creative and business sides of youth entertainment, and speaks from experience rather than theory."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            titleClassName="mt-6 text-chalkboard"
          />
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Topics Corey Can Talk About"
            title="Grounded conversation topics for hosts, editors, and organizers."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Pill key={topic} tone="paper" className="text-left">
                {topic}
              </Pill>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Ways to Work Together"
            title="Three ways this usually starts."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {workTogether.map((category) => (
              <Card key={category.title} className="flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chalkboard shadow-soft">
                  {category.icon}
                </div>
                <h3 className="mt-5 font-display text-2xl text-chalkboard">{category.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
                  {category.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Suggested Interview Questions"
            labelClassName="text-[#bcefdc]"
            title="A useful starting point for hosts and journalists."
            titleClassName="mt-6 text-white"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {interviewQuestions.map((question) => (
              <div
                key={question}
                className="rounded-[22px] border border-white/10 bg-chalkboard-deep/65 px-5 py-4"
              >
                <p className="text-sm leading-7 text-chalk/85">{question}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Media Kit"
            title="Media kit materials are being built out."
            description="These assets are not all finalized yet. Reach out with what you need and the team will send what's ready."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mediaKitItems.map((item) => (
              <PlaceholderBlock
                key={item}
                title={item}
                subtitle="Available on request"
                tone="light"
                aspectClassName="aspect-square"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="pitch" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-3xl">
          <SectionHeader
            label="Media & Collaboration Inquiry"
            title="Pitch an opportunity."
            description="Share the details and Corey's team will follow up if it's a fit."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            titleClassName="mt-6 text-chalkboard"
          />
          <Card className="mt-10 bg-white">
            <MediaInquiryForm />
          </Card>
        </Container>
      </Section>

      <Section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Container className="max-w-4xl">
          <Card tone="warm" className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                <Sparkles className="h-4 w-4" />
                Meet the founder
              </div>
              <h3 className="mt-3 font-display text-2xl text-chalkboard">
                Want the full biography and philosophy?
              </h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">
                Visit Meet Corey for background, roles, and principles.
              </p>
            </div>
            <Button href="/corey-ralston" variant="secondary">
              Meet Corey
              <FileText className="h-5 w-5" />
            </Button>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
