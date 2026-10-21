import type { StaticImageData } from "next/image";

import bendingArt from "./Bendingtheruls.png";
import coachingArt from "./perfcoachingtips.png";
import equipmentArt from "./eqguide.png";
import frameArt from "./perf frame.png";
import litArt from "./prop LIt.png";
import noExcusesSquare from "./Copy of Copy of Copy of Copy of of No Excuses!.png";
import parentArt from "./Parent Survival Tips.png";
import readerArt from "./readerrole.png";
import selfTapeCover from "./The Perfect Self Tape.jpg";
import sendingArt from "./sendingtapes.png";
import slatesArt from "./slates that shine.png";

/**
 * Student-facing presentation for the restored courses: display names, short
 * descriptions and artwork. The recovered copy itself lives in the course data
 * files and is never edited here. Taglines, intros and promises are taken from the
 * original course artwork; module outcomes are short navigation lines written from
 * the recovered module content (they are not Corey's recovered text).
 */

export interface ModulePresentation {
  /** Short name shown in journey strips and cards. */
  name: string;
  /** Small label above the title, e.g. "Stage 1". */
  eyebrow: string;
  /** One line on what the learner accomplishes. */
  outcome: string;
  image?: StaticImageData;
}

export interface CoursePresentation {
  /** Corey's own words from the original course artwork. */
  tagline: string;
  intro: string;
  /** Optional second line, also from the original course artwork. */
  promise?: string;
  /** "stages" draws the connected journey; "parts" draws a numbered list. */
  layout: "journey" | "list";
  unitLabel: "Step" | "Part";
  heroImage: StaticImageData;
  /** Modules that sit outside the numbered sequence (e.g. Start Here). */
  introModule?: string;
  modules: Record<string, ModulePresentation>;
}

export const coursePresentation: Record<string, CoursePresentation> = {
  "no-excuses": {
    tagline: "The Definitive Guided Course",
    intro: "A thorough and in-depth course on creating quality & effective demo clips.",
    promise: "Five multi-media sections: Write It, Plan It, Shoot It, Edit It, Use It.",
    layout: "journey",
    unitLabel: "Step",
    heroImage: noExcusesSquare,
    introModule: "welcome",
    modules: {
      welcome: {
        name: "Start Here",
        eyebrow: "Welcome",
        outcome: "Meet Corey and learn why clips matter before you pick up a camera.",
      },
      "write-it": {
        name: "Write It",
        eyebrow: "Stage 1",
        outcome:
          "Decide what your actor needs, rework a scene into an original one, and write a clip you can actually shoot.",
      },
      "plan-prep-it": {
        name: "Plan & Prep It",
        eyebrow: "Stage 2",
        outcome: "Line up your gear, lighting, sound and crew so shoot day goes smoothly.",
      },
      "shoot-it": {
        name: "Shoot It",
        eyebrow: "Stage 3",
        outcome:
          "Light it, frame it and capture clean picture and sound with the phone you already own.",
      },
      "edit-it": {
        name: "Edit It",
        eyebrow: "Stage 4",
        outcome: "Cut, trim, label and score your footage into a clip that is ready to submit.",
      },
      "use-it": {
        name: "Use It",
        eyebrow: "Stage 5",
        outcome:
          "Put the finished clip to work on casting sites, your actor's website and social media.",
      },
    },
  },
  "perfect-self-tape": {
    tagline: "A Complete Guided Course for Parents",
    intro: "Ten sections on making effective self tape auditions for TV/film roles.",
    layout: "list",
    unitLabel: "Part",
    heroImage: selfTapeCover,
    modules: {
      equipment: {
        name: "Equipment Guide",
        eyebrow: "Part 1",
        outcome: "The essential gear you need, with budget options.",
        image: equipmentArt,
      },
      "properly-lit": {
        name: "Properly Lit",
        eyebrow: "Part 2",
        outcome: "Self tape lighting explained, from the basics to a real home setup.",
        image: litArt,
      },
      "perfect-frame": {
        name: "Perfect Frame",
        eyebrow: "Part 3",
        outcome: "Frame the shot the way casting expects it: what works, and what to avoid.",
        image: frameArt,
      },
      slates: {
        name: "Slates That Shine",
        eyebrow: "Part 4",
        outcome: "Use the slate as your one chance to show casting who your actor is.",
        image: slatesArt,
      },
      "role-of-the-reader": {
        name: "Role of the Reader",
        eyebrow: "Part 5",
        outcome: "How to be the reader your actor needs, with a mega tip on volume.",
        image: readerArt,
      },
      coaching: {
        name: "Performance Coaching",
        eyebrow: "Part 6",
        outcome: "Coaching tips for the strongest performance on tape.",
        image: coachingArt,
      },
      "quick-editing": {
        name: "Quick Editing",
        eyebrow: "Part 7",
        outcome: "Trim, merge and fix sound fast, with apps you already have.",
      },
      "parent-survival": {
        name: "Parent Survival Tips",
        eyebrow: "Part 8",
        outcome: "Stress-free taping tips, plus a favorite interview on self tapes.",
        image: parentArt,
      },
      "sending-tapes": {
        name: "Sending Tapes",
        eyebrow: "Part 9",
        outcome: "File formats, compression and uploading without the headaches.",
        image: sendingArt,
      },
      "bending-the-rules": {
        name: "Bending the Rules",
        eyebrow: "Part 10",
        outcome: "When breaking a rule is worth the gamble, with real examples.",
        image: bendingArt,
      },
    },
  },
};

/** Subsections that deserve to stand apart from ordinary teaching copy. */
export type SubsectionVariant = "assignment" | "example";

export function getSubsectionVariant(title: string, anchor: string): SubsectionVariant | undefined {
  if (anchor === "your-first-mission") return "assignment";
  if (/\bexample\b/i.test(title)) return "example";
  return undefined;
}
