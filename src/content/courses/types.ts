/**
 * Typed content model for the restored Child Actor 101 video courses.
 *
 * Modeled on the existing classroom content system (src/content/classroom.ts):
 * courses contain ordered sections, and lessons belong to a section while the
 * course keeps the authoritative lesson order for previous/next navigation.
 */

/** A video attached to a lesson. */
export type CourseVideo =
  | {
      kind: "bunny";
      guid: string;
      title?: string;
      needsReview?: boolean;
      note?: string;
    }
  | {
      kind: "youtube";
      videoId: string;
      title?: string;
      thirdParty: true;
      note?: string;
    }
  | {
      kind: "vimeo";
      vimeoId: string;
      title: string;
      thirdParty: true;
      note?: string;
    }
  | {
      kind: "missing";
      legacyVimeoId?: string;
      candidates?: string[];
      note: string;
    };

export interface CourseBodySection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CourseResource {
  title: string;
  href: string;
  note?: string;
}

export interface CourseLesson {
  slug: string;
  title: string;
  sectionSlug: string;
  summary?: string;
  /** Single primary video for the lesson. */
  video?: CourseVideo;
  /** Multiple videos when the legacy page grouped several embeds in one topic. */
  videos?: CourseVideo[];
  body: CourseBodySection[];
  resources: CourseResource[];
  legacyAdobeUrl: string;
  needsReview?: boolean;
  reviewNote?: string;
}

export interface CourseSection {
  slug: string;
  title: string;
  legacyAdobeUrl: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  legacyAdobeUrl: string;
  sections: CourseSection[];
  lessons: CourseLesson[];
}
