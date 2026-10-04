import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { courses, getCourseReviewCount } from "@/content/courses";

export const metadata: Metadata = {
  title: "Video Courses",
  description:
    "Restored Child Actor 101 video courses, rebuilt in the classroom with every original lesson preserved.",
};

export default function CoursesIndexPage() {
  return (
    <main className="overflow-hidden">
      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Courses" }]} />
        </Container>
      </Section>

      <Section className="relative px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.18),_transparent_30%)]" />
        <Container className="relative">
          <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
            From the Child Actor 101 archive
          </Pill>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-chalkboard sm:text-6xl">
            Structured video courses, back in the classroom.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl">
            These are the original Child Actor 101 courses, restored lesson by lesson in one
            consistent place. Work through them in order, track your progress as you go, and
            pick up right where you left off.
          </p>
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Each course is a complete walkthrough built from the original material - lessons, videos, worksheets, and resources kept in their intended order."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Available Courses"
            title="Choose your course."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {courses.map((course) => {
              const reviewCount = getCourseReviewCount(course);
              return (
                <Card key={course.slug} className="flex flex-col">
                  <Pill className="self-start px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
                    {course.sections.length} sections · {course.lessons.length} lessons
                  </Pill>
                  <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard sm:text-4xl">
                    {course.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-deep">
                    {course.subtitle}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft sm:text-base">
                    {course.description}
                  </p>
                  {reviewCount > 0 ? (
                    <p className="mt-4 text-xs leading-6 text-ink-soft/80">
                      Note: {reviewCount} lesson{reviewCount === 1 ? "" : "s"} still{" "}
                      {reviewCount === 1 ? "has" : "have"} an original video being verified and{" "}
                      {reviewCount === 1 ? "is" : "are"} marked as being restored.
                    </p>
                  ) : null}
                  <div className="mt-6">
                    <Button href={`/courses/${course.slug}`} size="lg" variant="chalk">
                      Open the course
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}
