import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

const chapters = [
  {
    title: "Getting Started",
    description:
      "The calm first chapter for families who need the industry explained clearly from the ground up.",
  },
  {
    title: "Representation",
    description:
      "How agents, managers, communication, and expectations actually work when you are doing this professionally.",
  },
  {
    title: "Technique",
    description:
      "Performance craft, character work, and the fundamentals that help young actors grow into stronger storytellers.",
  },
  {
    title: "For Parents",
    description:
      "Guidance built for the adults making decisions, protecting childhood, and managing the reality of the journey.",
  },
];

export function ChapterCards() {
  return (
    <section id="chapters" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionLabel>From the Classroom</SectionLabel>
        <div className="mt-6 max-w-3xl">
          <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
            Open to the chapter you need
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-soft">
            Every lesson is illustrated, plain-spoken, and built for parents —
            pick where your family is right now.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {chapters.map((chapter) => (
            <Card key={chapter.title} className="flex h-full flex-col overflow-hidden p-0">
              <div className="flex aspect-square items-center justify-center bg-[linear-gradient(180deg,rgba(35,79,59,0.08),rgba(166,120,242,0.14))] p-6">
                <div className="w-full rounded-[20px] border border-dashed border-chalkboard/18 bg-white/55 px-4 py-8 text-center">
                  <p className="font-display text-3xl text-chalkboard">
                    Illustration placeholder
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-soft">
                    {chapter.title}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl text-chalkboard">{chapter.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                  {chapter.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-chalkboard">
                    Open chapter
                  </span>
                  <span className="text-xl font-semibold text-purple-deep">→</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
