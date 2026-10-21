/**
 * Typed content model for the restored Child Actor 101 video courses.
 *
 * COURSE -> MODULE -> ordered content blocks.
 *
 * A module is one major section of the original course (one legacy Adobe Express
 * page) rendered as a single scrollable page. Everything the original page held -
 * subsection headings, copy, videos, links - lives in the module's `blocks` array
 * in its recovered order. Progress is tracked per module, and previous/next
 * navigation moves between modules.
 */

/** Level-2 headings mark the original subsections; level-3 are headings inside one. */
export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
  /** In-page anchor. Level-2 anchors are the retired per-lesson slugs. */
  anchor?: string;
  summary?: string;
  needsReview?: boolean;
}

export interface RichTextBlock {
  type: "richText";
  paragraphs: string[];
  bullets?: string[];
}

export interface BunnyVideoBlock {
  type: "bunny-video";
  guid: string;
  title?: string;
  needsReview?: boolean;
  note?: string;
}

export interface ExternalVideoBlock {
  type: "external-video";
  provider: "youtube" | "vimeo";
  videoId: string;
  title?: string;
  note?: string;
}

/** Keeps a video's position in the module when its Bunny match is unresolved. */
export interface MissingVideoBlock {
  type: "missing-video";
  legacyVimeoId?: string;
  candidates?: string[];
  note: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface ResourceBlock {
  type: "resource";
  title: string;
  href: string;
  note?: string;
}

/** Assignments, notes, and restoration notices. */
export interface CalloutBlock {
  type: "callout";
  tone: "assignment" | "note" | "restoration";
  title?: string;
  text: string;
}

export type CourseBlock =
  | HeadingBlock
  | RichTextBlock
  | BunnyVideoBlock
  | ExternalVideoBlock
  | MissingVideoBlock
  | ImageBlock
  | ResourceBlock
  | CalloutBlock;

export type CourseVideoBlock = BunnyVideoBlock | ExternalVideoBlock | MissingVideoBlock;

export interface CourseModule {
  slug: string;
  title: string;
  legacyAdobeUrl: string;
  blocks: CourseBlock[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  legacyAdobeUrl: string;
  modules: CourseModule[];
}
