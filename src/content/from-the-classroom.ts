import { images } from "@/content/images";

export interface ClassroomLessonCard {
  category: string;
  description: string;
  href: string;
  imageAlt?: string;
  imageSrc?: string;
  title: string;
}

export interface ClassroomChapterCard {
  description: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  lessons: string[];
  title: string;
}

export const featuredLessons: ClassroomLessonCard[] = [
  {
    title: "How to Become a Child Actor",
    description:
      "A parent-first overview of how families usually enter the business, what actually matters first, and which expectations keep everyone safer and calmer.",
    category: "Getting Started",
    href: "#chapter-getting-started",
    imageSrc: images.chapterGettingStarted.src,
    imageAlt: images.chapterGettingStarted.alt,
  },
  {
    title: "Talent Scams",
    description:
      "Learn how scam offers are framed, why urgency is such a common tactic, and how to tell the difference between guidance and a sales trap.",
    category: "Safety",
    href: "#chapter-legal",
    imageSrc: images.chapterForParents.src,
    imageAlt: images.chapterForParents.alt,
  },
  {
    title: "Choosing Representation",
    description:
      "A clear look at agents, managers, submissions, meetings, and the signs that a professional relationship is built on fit rather than hype.",
    category: "Representation",
    href: "#chapter-representation",
    imageSrc: images.chapterRepresentation.src,
    imageAlt: images.chapterRepresentation.alt,
  },
  {
    title: "Self Tapes",
    description:
      "From framing and lighting to parent involvement and prep, this lesson breaks down what makes a self tape easier to review and easier to trust.",
    category: "Auditions",
    href: "#chapter-auditions",
    imageSrc: images.homeHero.src,
    imageAlt: images.homeHero.alt,
  },
  {
    title: "Headshots",
    description:
      "A practical guide to timing, expectations, and the difference between getting useful headshots and paying for marketing materials too early.",
    category: "Professional Materials",
    href: "#chapter-career-growth",
    imageSrc: images.chapterTechnique.src,
    imageAlt: images.chapterTechnique.alt,
  },
  {
    title: "Audition Etiquette",
    description:
      "Professional habits start before the room. Learn the simple behaviors that make auditions smoother for actors, parents, reps, and casting teams.",
    category: "Business",
    href: "#chapter-business",
    imageSrc: images.chapterForParents.src,
    imageAlt: images.chapterForParents.alt,
  },
  {
    title: "Residuals",
    description:
      "A plain-language explanation of what residuals are, how they show up, and why families should understand them long before a paycheck lands.",
    category: "Business",
    href: "#chapter-business",
  },
  {
    title: "Commissions",
    description:
      "Understand how commissions work with agents and managers, where confusion usually starts, and what parents should ask before agreeing to anything.",
    category: "Representation",
    href: "#chapter-representation",
  },
  {
    title: "Contracts",
    description:
      "A parent-first guide to slowing down, reading carefully, and understanding the parts of an entertainment contract that shape family decisions.",
    category: "Legal",
    href: "#chapter-legal",
  },
];

export const chapterCards: ClassroomChapterCard[] = [
  {
    id: "chapter-getting-started",
    title: "Getting Started",
    description:
      "The opening chapter for families who are brand new and need the industry explained in plain English before they make expensive decisions.",
    lessons: ["How to Become a Child Actor", "The Parent's Beginner Guide", "Expectations vs Reality"],
    imageSrc: images.chapterGettingStarted.src,
    imageAlt: images.chapterGettingStarted.alt,
  },
  {
    id: "chapter-representation",
    title: "Representation",
    description:
      "Guidance on agents, managers, submissions, meetings, communication, and how healthy professional relationships actually work.",
    lessons: ["Finding Representation", "Commission Explained", "Manager Red Flags"],
    imageSrc: images.chapterRepresentation.src,
    imageAlt: images.chapterRepresentation.alt,
  },
  {
    id: "chapter-auditions",
    title: "Auditions",
    description:
      "The chapter for self tapes, callbacks, prep habits, readers, and the systems that help actors do better work under pressure.",
    lessons: ["Self Tape Guide", "Zoom Callbacks", "Audition Etiquette"],
    imageSrc: images.homeHero.src,
    imageAlt: images.homeHero.alt,
  },
  {
    id: "chapter-technique",
    title: "Technique",
    description:
      "Lessons that strengthen truthful performance, listening, memorization, imagination, and the habits that help child actors grow in craft.",
    lessons: ["Listening on Camera", "Fast Memorization", "Building Specific Choices"],
    imageSrc: images.chapterTechnique.src,
    imageAlt: images.chapterTechnique.alt,
  },
  {
    id: "chapter-parents",
    title: "Parents",
    description:
      "A chapter built around family balance, expectations, school, schedules, rejection, and protecting childhood while doing this professionally.",
    lessons: ["The Biggest Mistakes Parents Make", "Family Balance", "When to Say No"],
    imageSrc: images.chapterForParents.src,
    imageAlt: images.chapterForParents.alt,
  },
  {
    id: "chapter-career-growth",
    title: "Career Growth",
    description:
      "Professional materials, branding choices, demo reels, resumes, websites, and what career growth should look like over time.",
    lessons: ["Headshot Timing", "Resume Basics", "Building Experience"],
    imageSrc: images.chapterGettingStarted.src,
    imageAlt: images.chapterGettingStarted.alt,
  },
  {
    id: "chapter-business",
    title: "Business",
    description:
      "The business chapter covers etiquette, communication, professionalism, availability, and the systems families need to operate well.",
    lessons: ["Residuals", "Book-Outs", "Callback Reports"],
    imageSrc: images.chapterRepresentation.src,
    imageAlt: images.chapterRepresentation.alt,
  },
  {
    id: "chapter-legal",
    title: "Legal",
    description:
      "A safety-first chapter on contracts, commissions, labor rules, and the legal details parents should understand before signing anything.",
    lessons: ["Contracts", "Commissions", "Child Labor Laws"],
    imageSrc: images.chapterForParents.src,
    imageAlt: images.chapterForParents.alt,
  },
];

export const newestLessons: ClassroomLessonCard[] = [
  {
    title: "Residuals for Parents: What They Are and Why They Matter",
    description:
      "A plain-language lesson on how residuals work, when they appear, and what families should understand before a job starts paying over time.",
    category: "Business",
    href: "#chapter-business",
  },
  {
    title: "Commissions Explained Without Industry Jargon",
    description:
      "Understand what agents and managers are paid, how commission structures differ, and where confusion usually starts for new families.",
    category: "Representation",
    href: "#chapter-representation",
  },
  {
    title: "What a Talent Contract Actually Means",
    description:
      "A practical breakdown of common contract language, what parents should slow down and read carefully, and when to ask more questions.",
    category: "Legal",
    href: "#chapter-legal",
  },
  {
    title: "How Callback Holds Usually Work",
    description:
      "A calm explanation of holds, releases, communication timelines, and why families often panic unnecessarily during the callback process.",
    category: "Auditions",
    href: "#chapter-auditions",
  },
  {
    title: "When a Class Is Actually Helping and When It Isn't",
    description:
      "A lesson for parents trying to judge whether training is building real skill or simply creating the appearance of progress.",
    category: "Technique",
    href: "#chapter-technique",
  },
  {
    title: "What Parents Should Track After Meetings With Reps",
    description:
      "A useful checklist for tracking follow-up, communication, fit, and next steps after conversations with agents or managers.",
    category: "Parents",
    href: "#chapter-parents",
  },
];

export const mostPopularLessons: ClassroomLessonCard[] = [
  {
    title: "The Biggest Mistakes Parents Make",
    description:
      "A high-trust guide to the common early mistakes that create unnecessary stress, wasted money, or unrealistic expectations.",
    category: "Parents",
    href: "#chapter-parents",
  },
  {
    title: "Understanding Managers",
    description:
      "A foundational lesson on what managers do, how they differ from agents, and what a healthy manager relationship should feel like.",
    category: "Representation",
    href: "#chapter-representation",
  },
  {
    title: "Headshot Timing",
    description:
      "A practical answer to one of the most common parent questions: when is it actually time to invest in headshots?",
    category: "Career Growth",
    href: "#chapter-career-growth",
  },
  {
    title: "How Self Tapes Are Reviewed",
    description:
      "This lesson explains what casting teams are really watching for so families can stop overproducing and focus on what helps most.",
    category: "Auditions",
    href: "#chapter-auditions",
  },
];
