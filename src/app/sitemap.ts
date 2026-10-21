import type { MetadataRoute } from "next";

import { getClassroomStaticLessonParams, getPublishedClassroomChapters } from "@/content/classroom";
import { courses } from "@/content/courses";
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
  // Only the public sales pages are listed; the course itself lives at unlisted private addresses.
  const courseRoutes = courses.map((course) => `/courses/${course.slug}`);

  return [...staticRoutes, ...chapterRoutes, ...lessonRoutes, ...courseRoutes].map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
