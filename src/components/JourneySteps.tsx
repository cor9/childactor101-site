import { Card } from "@/components/Card";

const steps = [
  {
    title: "Understand the industry",
    description:
      "Learn how it really works — and how to stay safe.",
  },
  {
    title: "Train",
    description:
      "Build real on-camera skill and confidence.",
  },
  {
    title: "Build materials",
    description:
      "Resume, photos, and a professional page.",
  },
  {
    title: "Audition",
    description:
      "Prep, self-tape, and book the room.",
  },
  {
    title: "Grow",
    description:
      "Keep building a healthy, lasting career.",
  },
];

export function JourneySteps() {
  return (
    <section id="journey" className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-display text-4xl leading-tight sm:text-5xl">
            New here? ✦ Start here.
          </p>
          <p className="mt-4 text-lg leading-8 text-chalk/72">
            Five steps, in order. This is the path every family walks.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="relative border-chalk/10 bg-chalkboard-deep/65 text-chalk"
              tone="chalkboard"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-paper font-display text-2xl text-chalkboard">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-chalk">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-chalk/72">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
