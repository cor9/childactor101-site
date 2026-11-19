import type { MetadataRoute } from "next";

import { getClassroomStaticLessonParams, getPublishedClassroomChapters } from "@/content/classroom";
import { courses } from "@/content/courses";
import { blogPostPath, getAllPosts, getCategories, getPageCount, getTags, hasBlogPosts, pagePath, postIsoDate } from "@/lib/blog";
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

  const pages: MetadataRoute.Sitemap = [...staticRoutes, ...chapterRoutes, ...lessonRoutes, ...courseRoutes].map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));

  // Native 101 Blog: archive pages, category and tag archives, and every article at its original URL.
  // Nothing is listed until posts have been imported, so the sitemap never advertises empty routes.
  if (!hasBlogPosts()) {
    return pages;
  }

  const blogPages: MetadataRoute.Sitemap = [
    ...Array.from({ length: getPageCount() }, (_unused, position) => ({ url: `${SITE_URL}${pagePath(position + 1)}` })),
    ...getCategories().map((category) => ({ url: `${SITE_URL}/101-blog/category/${category.slug}` })),
    ...getTags().map((tag) => ({ url: `${SITE_URL}/101-blog/tag/${tag.slug}` })),
    ...getAllPosts().map((post) => {
      const iso = postIsoDate(post);
      return { url: `${SITE_URL}${blogPostPath(post.slug)}`, ...(iso ? { lastModified: post.updated ?? iso } : {}) };
    }),
  ];

  return [...pages, ...blogPages];
}
