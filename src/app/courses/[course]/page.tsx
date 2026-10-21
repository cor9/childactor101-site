import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JourneyOverview, PartsOverview } from "@/components/course/CourseOverviewModules";
import { ResumePanel } from "@/components/course/CourseProgress";
import { courses, getCourse } from "@/content/courses";
import { coursePresentation } from "@/content/courses/presentation";

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
  const presentation = coursePresentation[courseSlug];

  if (!course || !presentation) {
    return { title: "Course | Child Actor 101" };
  }

  return {
    title: `${course.title} | Courses`,
    description: presentation.intro,
  };
}

export default async function CourseOverviewPage({ params }: CoursePageProps) {
  const { course: courseSlug } = await params;
  const course = getCourse(courseSlug);
  const presentation = coursePresentation[courseSlug];

  if (!course || !presentation) {
    notFound();
  }

  const isJourney = presentation.layout === "journey";
  const resumeModules = course.modules.map((module) => ({
    slug: module.slug,
    name: presentation.modules[module.slug]?.name ?? module.title,
  }));

  return (
    <main>
      <section className="bg-chalkboard-deep text-chalk">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: course.title },
            ]}
            tone="chalk"
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                {presentation.tagline}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[0.98] text-white sm:text-6xl">
                {course.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8ede2]">{presentation.intro}</p>
              {presentation.promise ? <p className="mt-4 max-w-2xl font-display text-xl text-white">{presentation.promise}</p> : null}
              <ResumePanel
                courseSlug={course.slug}
                modules={resumeModules}
                unit={presentation.unitLabel.toLowerCase()}
              />
            </div>
            <Image
              alt={`${course.title} course artwork`}
              className="w-full max-w-sm justify-self-center rounded-[28px] shadow-board lg:max-w-none"
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 352px, 384px"
              src={presentation.heroImage}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          {isJourney ? (
            <JourneyOverview course={course} presentation={presentation} />
          ) : (
            <>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="font-display text-3xl text-chalkboard sm:text-4xl">
                  The {course.modules.length} parts
                </h2>
                <span aria-hidden className="h-px flex-1 bg-chalkboard/15" />
              </div>
              <PartsOverview course={course} presentation={presentation} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
