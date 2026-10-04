import { noExcusesCourse } from "./no-excuses";
import { perfectSelfTapeCourse } from "./perfect-self-tape";
import type { Course, CourseBlock, CourseModule, CourseVideoBlock, HeadingBlock } from "./types";

export type {
  BunnyVideoBlock,
  CalloutBlock,
  Course,
  CourseBlock,
  CourseModule,
  CourseVideoBlock,
  ExternalVideoBlock,
  HeadingBlock,
  ImageBlock,
  MissingVideoBlock,
  ResourceBlock,
  RichTextBlock,
} from "./types";

export const courses: Course[] = [noExcusesCourse, perfectSelfTapeCourse];

const courseMap = new Map(courses.map((course) => [course.slug, course]));

export function getCourse(slug: string) {
  return courseMap.get(slug);
}

export function getCourseModule(courseSlug: string, moduleSlug: string) {
  return courseMap.get(courseSlug)?.modules.find((module) => module.slug === moduleSlug);
}

/** Previous/next move between modules, in course order. */
export function getModulePagination(courseSlug: string, moduleSlug: string) {
  const course = courseMap.get(courseSlug);

  if (!course) {
    return { next: undefined, previous: undefined, index: -1, total: 0 };
  }

  const index = course.modules.findIndex((module) => module.slug === moduleSlug);

  if (index === -1) {
    return { next: undefined, previous: undefined, index: -1, total: course.modules.length };
  }

  return {
    previous: index > 0 ? course.modules[index - 1] : undefined,
    next: index < course.modules.length - 1 ? course.modules[index + 1] : undefined,
    index,
    total: course.modules.length,
  };
}

export function getCourseStaticModuleParams() {
  return courses.flatMap((course) =>
    course.modules.map((module) => ({
      course: course.slug,
      module: module.slug,
    })),
  );
}

export function isVideoBlock(block: CourseBlock): block is CourseVideoBlock {
  return (
    block.type === "bunny-video" || block.type === "external-video" || block.type === "missing-video"
  );
}

/** The original subsections of a module, for the in-page outline. */
export function getModuleSubsections(module: CourseModule) {
  return module.blocks.filter(
    (block): block is HeadingBlock & { anchor: string } =>
      block.type === "heading" && block.level === 2 && Boolean(block.anchor),
  );
}

export interface ModuleSubsection {
  heading: HeadingBlock;
  blocks: CourseBlock[];
}

/** Splits a module's blocks into its original subsections (one per level-2 heading). */
export function getModuleSubsectionBlocks(module: CourseModule): ModuleSubsection[] {
  const sections: ModuleSubsection[] = [];

  for (const block of module.blocks) {
    if (block.type === "heading" && block.level === 2) {
      sections.push({ heading: block, blocks: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].blocks.push(block);
    }
  }

  return sections;
}

export function getModuleVideoCount(module: CourseModule) {
  return module.blocks.filter(isVideoBlock).length;
}

/** A module is still being restored while any video in it is missing or unverified. */
export function moduleNeedsReview(module: CourseModule) {
  return module.blocks.some(
    (block) =>
      block.type === "missing-video" ||
      (block.type === "bunny-video" && block.needsReview === true) ||
      (block.type === "heading" && block.needsReview === true),
  );
}

/** Old per-lesson routes now live as anchors inside their module page. */
export function getLegacyLessonRedirects() {
  return courses.flatMap((course) =>
    course.modules.flatMap((module) =>
      getModuleSubsections(module).map((heading) => ({
        source: `/courses/${course.slug}/${heading.anchor}`,
        destination: `/courses/${course.slug}/${module.slug}#${heading.anchor}`,
      })),
    ),
  );
}
