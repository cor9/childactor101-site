import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseLessonCard } from "@/components/course/CourseLessonCard";
import { CourseProgressOverview } from "@/components/course/CourseProgress";
import { Pill } from "@/components/ui/Pill";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  courses,
  getCourse,
  getCourseReviewCount,
  getCourseSectionsWithLessons,
} from "@/content/courses";

type CoursePageProps = {
  params: Promise<{
    course: string;
  }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ course: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) {
    return { title: "Course | Child Actor 101" };
  }

  return {
    title: `${course.title} | Courses`,
    description: course.description,
  };
}

export default async function CourseOverviewPage({ params }: CoursePageProps) {
  const { course: courseSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) {
    notFound();
  }

  const sectionsWithLessons = getCourseSectionsWithLessons(course);
  const reviewCount = getCourseReviewCount(course);
  const lessonIndexBySlug = new Map(
    course.lessons.map((lesson, index) => [lesson.slug, index] as const),
  );

  return (
    <main className="overflow-hidden">
      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: course.title },
            ]}
          />
        </Container>
      </Section>

      <Section className="relative px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.18),_transparent_30%)]" />
        <Container className="relative">
          <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
            Video course · {course.sections.length} sections · {course.lessons.length} lessons
          </Pill>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-chalkboard sm:text-6xl">
            {course.title}
          </h1>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.22em] text-purple-deep">
            {course.subtitle}
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">{course.description}</p>
          {reviewCount > 0 ? (
            <p className="mt-5 max-w-3xl rounded-[20px] border border-[#e7dcc7] bg-white px-5 py-4 text-sm leading-7 text-ink-soft shadow-soft">
              This course was restored from the original Child Actor 101 material.{" "}
              {reviewCount} lesson{reviewCount === 1 ? "" : "s"} still{" "}
              {reviewCount === 1 ? "has" : "have"} a video that is being verified or replaced -{" "}
              {reviewCount === 1 ? "it is" : "they are"} marked as being restored, and the lesson
              copy is fully preserved in the meantime.
            </p>
          ) : null}
          <div className="mt-8 max-w-2xl">
            <CourseProgressOverview
              courseSlug={course.slug}
              lessons={course.lessons.map((lesson) => ({ slug: lesson.slug, title: lesson.title }))}
            />
          </div>
        </Container>
      </Section>

      {sectionsWithLessons.map(({ section, lessons }, sectionIndex) => (
        <Section
          className={`px-4 py-12 sm:px-6 lg:px-8 ${sectionIndex % 2 === 1 ? "bg-paper-warm" : "bg-paper"}`}
          id={section.slug}
          key={section.slug}
        >
          <Container>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Section {sectionIndex + 1}
              </p>
              <h2 className="font-display text-3xl text-chalkboard sm:text-4xl">{section.title}</h2>
              <p className="text-sm text-ink-soft">
                {lessons.length} lesson{lessons.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {lessons.map((lesson) => (
                <CourseLessonCard
                  courseSlug={course.slug}
                  index={lessonIndexBySlug.get(lesson.slug) ?? 0}
                  key={lesson.slug}
                  lesson={lesson}
                />
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section className="bg-paper px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <Container>
          <p className="text-xs leading-6 text-ink-soft/70">
            Restored from the original Child Actor 101 course. Lesson copy, lesson order, video
            positions, and resource links are preserved from the archived course pages.
          </p>
        </Container>
      </Section>
    </main>
  );
}
