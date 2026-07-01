import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ChapterCard } from "@/components/home/ChapterCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const chapters = [
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

export function ChapterCards() {
  return (
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
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.title} {...chapter} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
