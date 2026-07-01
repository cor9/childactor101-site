import { Card } from "@/components/Card";
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
    <section id="ecosystem" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <Card tone="chalkboard" className="overflow-hidden">
          <SectionLabel>The Whole Ecosystem</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalk sm:text-5xl">
              This isn&apos;t an acting coach. It&apos;s a platform.
            </h2>
            <p className="mt-4 text-lg leading-8 text-chalk/72">
              One classroom, three worlds — and everything a family needs inside
              each.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {columns.map((column) => (
              <div
                key={column.title}
                className="rounded-[26px] border border-chalk/10 bg-chalkboard-deep/65 p-6"
              >
                <h3 className="font-display text-3xl text-chalk">{column.title}</h3>
                <p className="mt-2 text-sm leading-7 text-chalk/65">
                  {column.description}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-chalk/80">
                  {column.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
