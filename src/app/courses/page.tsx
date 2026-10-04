import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { courses } from "@/content/courses";
import { coursePresentation } from "@/content/courses/presentation";

export const metadata: Metadata = {
  title: "Video Courses",
  description:
    "Guided Child Actor 101 video courses: make your own demo clips, and film the perfect self tape.",
};

export default function CoursesIndexPage() {
  return (
    <main>
      <section className="bg-chalkboard-deep text-chalk">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Courses" }]} tone="chalk" />
          <h1 className="mt-10 max-w-3xl font-display text-5xl leading-[0.98] text-white sm:text-6xl">
            Video courses from Corey.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8ede2]">
            Two guided workshops, built to be worked through in order. Watch, learn, make
            something, and pick up right where you left off.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8">
          {courses.map((course) => {
            const presentation = coursePresentation[course.slug];

            if (!presentation) {
              return null;
            }

            return (
              <Link
                className="group grid items-center gap-8 rounded-[36px] border border-[#e7dcc7] bg-white p-6 shadow-soft transition hover:-translate-y-1 sm:p-8 md:grid-cols-[18rem_minmax(0,1fr)]"
                href={`/courses/${course.slug}`}
                key={course.slug}
              >
                <Image
                  alt=""
                  className="w-full max-w-xs justify-self-center rounded-[24px] md:max-w-none"
                  placeholder="blur"
                  sizes="(min-width: 768px) 288px, 320px"
                  src={presentation.heroImage}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                    {presentation.tagline}
                  </p>
                  <h2 className="mt-3 font-display text-4xl leading-tight text-chalkboard group-hover:text-purple-deep">
                    {course.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-ink-soft">
                    {presentation.intro}
                  </p>
                  {presentation.promise ? <p className="mt-5 font-display text-xl text-chalkboard">{presentation.promise}</p> : null}
                  <span className="mt-6 inline-flex rounded-full bg-[linear-gradient(180deg,#3d845a_0%,#2f704d_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(35,79,59,0.25)]">
                    Open the course
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
