import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EcosystemCard } from "@/components/home/EcosystemCard";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const columns = [
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

export function EcosystemSection() {
  return (
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
            {columns.map((column) => (
              <EcosystemCard key={column.title} {...column} />
            ))}
          </div>
        </Card>
      </Container>
    </Section>
  );
}
