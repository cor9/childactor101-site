import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

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
    <section id="chapters" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <SectionLabel>From the Classroom</SectionLabel>
        <div className="mt-6 max-w-3xl">
          <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl lg:text-[4rem]">
            Open to the chapter you need
          </h2>
          <p className="mt-4 text-[1.45rem] leading-[1.7] text-ink-soft">
            Every lesson is illustrated, plain-spoken, and built for parents —
            pick where your family is right now.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {chapters.map((chapter) => (
            <Link key={chapter.title} href={chapter.href} className="group block">
              <Card className="overflow-hidden p-0 transition duration-200 group-hover:-translate-y-1">
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  width={460}
                  height={460}
                  className="aspect-square w-full object-cover"
                />
                <div className="flex items-center justify-between px-7 py-6">
                  <h3 className="font-display text-[2rem] leading-tight text-chalkboard">
                    {chapter.title}
                  </h3>
                  <span className="text-4xl leading-none text-purple-deep transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
