import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageRecipeIllustrationRules, pageRecipes, supportComponentDocs } from "@/content/page-recipes";

export const metadata: Metadata = {
  title: "Page Recipes",
  description:
    "Internal Child Actor 101 page recipes and shared support component guidance for editorial landing pages and classroom surfaces.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PageRecipesPage() {
  return (
    <main className="overflow-hidden">
      <Section className="bg-paper px-4 py-16 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-4xl"
            description="Internal guidance for the reusable page recipes and support components that power the Five Doors pages and future classroom surfaces."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Design System"
            title="Page Recipes & Shared Support Components"
            titleClassName="mt-6 text-chalkboard"
          />
          <Card tone="warm" className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
              Illustration rules
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {pageRecipeIllustrationRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-[22px] border border-[#e7dcc7] bg-white px-5 py-4 text-sm leading-7 text-ink-soft shadow-soft"
                >
                  {rule}
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Each recipe includes structural guidance plus illustration support so pages feel editorial, useful, and consistent."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Recipes"
            title="Core page recipes"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-8">
            {pageRecipes.map((recipe) => (
              <Card key={recipe.slug} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                    {recipe.title}
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-tight text-chalkboard">
                    {recipe.bestUseCase}
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-ink-soft">{recipe.purpose}</p>
                  <div className="mt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard/70">
                      Required sections
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {recipe.requiredSections.map((section) => (
                        <span
                          key={section}
                          className="inline-flex rounded-full border border-[#e7dcc7] bg-paper px-4 py-2 text-sm text-chalkboard shadow-soft"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard/70">
                      Optional sections
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {recipe.optionalSections.map((section) => (
                        <span
                          key={section}
                          className="inline-flex rounded-full border border-[#e7dcc7] bg-white px-4 py-2 text-sm text-ink-soft shadow-soft"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-[28px] border border-[#e7dcc7] bg-paper px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                    Illustration guidance
                  </p>
                  <div className="mt-6 space-y-4 text-sm leading-7 text-ink-soft">
                    <p>
                      <strong className="text-chalkboard">Placement:</strong> {recipe.illustration.placement}
                    </p>
                    <p>
                      <strong className="text-chalkboard">Purpose:</strong> {recipe.illustration.purpose}
                    </p>
                    <p>
                      <strong className="text-chalkboard">Composition:</strong>{" "}
                      {recipe.illustration.suggestedComposition}
                    </p>
                    <p>
                      <strong className="text-chalkboard">Image ratio:</strong> {recipe.illustration.imageRatio}
                    </p>
                    <p>
                      <strong className="text-chalkboard">Requirement:</strong> {recipe.illustration.requirement}
                    </p>
                    <div>
                      <p className="font-semibold text-chalkboard">Avoid</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5">
                        {recipe.illustration.avoidNotes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="These support blocks exist to keep door pages and lesson pages consistent without rebuilding the same structures by hand."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Support components"
            title="Reusable page support layer"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {supportComponentDocs.map((component) => (
              <Card key={component.name} tone="warm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  {component.name}
                </p>
                <p className="mt-4 text-lg leading-8 text-ink-soft">{component.purpose}</p>
                <div className="mt-6 space-y-4 text-sm leading-7 text-ink-soft">
                  <p>
                    <strong className="text-chalkboard">When to use:</strong> {component.whenToUse}
                  </p>
                  <div>
                    <p className="font-semibold text-chalkboard">Props / content model</p>
                    <ul className="mt-2 list-disc space-y-2 pl-5">
                      {component.contentModel.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <strong className="text-chalkboard">Example usage:</strong> {component.exampleUsage}
                  </p>
                  <div>
                    <p className="font-semibold text-chalkboard">Avoid</p>
                    <ul className="mt-2 list-disc space-y-2 pl-5">
                      {component.avoidNotes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
