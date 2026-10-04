import { noExcusesCourse } from "./no-excuses";
import { perfectSelfTapeCourse } from "./perfect-self-tape";
import type { Course, CourseLesson } from "./types";

export type { Course, CourseLesson, CourseResource, CourseSection, CourseVideo } from "./types";

export const courses: Course[] = [noExcusesCourse, perfectSelfTapeCourse];

const courseMap = new Map(courses.map((course) => [course.slug, course]));

export function getCourse(slug: string) {
  return courseMap.get(slug);
}

export function getCourseLesson(courseSlug: string, lessonSlug: string) {
  return courseMap.get(courseSlug)?.lessons.find((lesson) => lesson.slug === lessonSlug);
}

export function getLessonsForSection(course: Course, sectionSlug: string) {
  return course.lessons.filter((lesson) => lesson.sectionSlug === sectionSlug);
}

export function getCourseSectionsWithLessons(course: Course) {
  return course.sections.map((section) => ({
    section,
    lessons: getLessonsForSection(course, section.slug),
  }));
}

export function getCourseLessonPagination(courseSlug: string, lessonSlug: string) {
  const course = courseMap.get(courseSlug);

  if (!course) {
    return { next: undefined, previous: undefined, index: -1, total: 0 };
  }

  const index = course.lessons.findIndex((lesson) => lesson.slug === lessonSlug);

  if (index === -1) {
    return { next: undefined, previous: undefined, index: -1, total: course.lessons.length };
  }

  return {
    previous: index > 0 ? course.lessons[index - 1] : undefined,
    next: index < course.lessons.length - 1 ? course.lessons[index + 1] : undefined,
    index,
    total: course.lessons.length,
  };
}

export function getCourseReviewCount(course: Course) {
  return course.lessons.filter((lesson) => lesson.needsReview).length;
}

export function getCourseStaticLessonParams() {
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      course: course.slug,
      lesson: lesson.slug,
    })),
  );
}

export function lessonHasPlayableVideo(lesson: CourseLesson) {
  const videos = lesson.videos ?? (lesson.video ? [lesson.video] : []);
  return videos.some((video) => video.kind !== "missing");
}
