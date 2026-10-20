import type { MetadataRoute } from "next";

import { getClassroomStaticLessonParams, getPublishedClassroomChapters } from "@/content/classroom";
import { courses, lessonHasMissingVideo } from "@/content/courses";
import { SITE_URL } from "@/lib/site-links";

// Public, indexable top-level routes. /design-system is internal and stays out.
const staticRoutes = [
  "/",
  "/start-here",
  "/from-the-classroom",
  "/courses",
  "/training",
  "/audition-help",
  "/get-represented",
  "/before-you-pay",
  "/ecosystem",
  "/podcast",
  "/corey-ralston",
  "/media",
  "/industry",
  "/industry/resources",
  "/industry/get-involved",
  "/industry/open-call",
  "/ab1319",
  "/ab1660",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const chapterRoutes = getPublishedClassroomChapters().map((chapter) => `/from-the-classroom/${chapter.slug}`);
  const lessonRoutes = getClassroomStaticLessonParams().map(
    ({ chapter, lesson }) => `/from-the-classroom/${chapter}/${lesson}`,
  );
  const courseRoutes = courses.flatMap((course) => [
    `/courses/${course.slug}`,
    // Lessons still waiting on a recovered video are noindexed, so they stay out of the sitemap.
    ...course.lessons
      .filter((lesson) => !lessonHasMissingVideo(lesson))
      .map((lesson) => `/courses/${course.slug}/${lesson.slug}`),
  ]);

  return [...staticRoutes, ...chapterRoutes, ...lessonRoutes, ...courseRoutes].map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
