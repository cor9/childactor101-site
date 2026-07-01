import { Card } from "@/components/Card";
import { ChalkDoodle } from "@/components/ChalkDoodle";
import { ChalkDust } from "@/components/ChalkDust";
import { SectionLabel } from "@/components/SectionLabel";

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
    <section
      id="ecosystem"
      className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24"
    >
      <ChalkDust />
      <ChalkDoodle variant="star" className="left-8 top-16 hidden h-9 w-9 md:block" />
      <ChalkDoodle variant="arrow-right" className="right-10 top-22 hidden h-12 w-12 md:block" />
      <div className="mx-auto w-full max-w-[1440px]">
        <Card tone="chalkboard" className="overflow-hidden">
          <SectionLabel className="text-[#c7f2e4]">The Whole Ecosystem</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-[4rem]">
              This isn&apos;t an acting coach. It&apos;s a platform.
            </h2>
            <p className="mt-4 text-[1.45rem] leading-[1.7] text-white/72">
              One classroom, three worlds — and everything a family needs inside
              each.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {columns.map((column) => (
              <Card
                key={column.title}
                tone="chalkboard"
                className="border-white/14 bg-[linear-gradient(180deg,rgba(33,50,42,0.74),rgba(27,43,35,0.92))] px-7 py-8"
              >
                <h3 className="font-display text-[2.4rem] text-[#bcf1df]">{column.title}</h3>
                <p className="mt-2 text-[1.15rem] leading-8 text-white/72">
                  {column.description}
                </p>
                <ul className="mt-8 space-y-0 text-[1.15rem] leading-8 text-white/88">
                  {column.items.map((item) => (
                    <li key={item} className="border-t border-white/12 py-4 first:border-t-0 first:pt-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
