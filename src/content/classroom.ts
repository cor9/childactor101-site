import { images } from "@/content/images";

export interface ClassroomResource {
  description: string;
  href: string;
  title: string;
  type: "chapter" | "guide" | "podcast" | "tool";
}

export interface ClassroomLessonSection {
  bullets?: string[];
  heading: string;
  paragraphs: string[];
}

export interface ClassroomLesson {
  chapterSlug: string;
  featuredImageAlt: string;
  featuredImageSrc: string;
  keyTakeaways: string[];
  relatedLessonSlugs: string[];
  resources: ClassroomResource[];
  slug: string;
  subtitle: string;
  summary: string;
  teacherNote: string;
  title: string;
  bodySections?: ClassroomLessonSection[];
  sourceUrl?: string;
}

export interface ClassroomChapter {
  browseLabel: string;
  description: string;
  featuredImageAlt: string;
  featuredImageSrc: string;
  lessonCountLabel: string;
  lessonSlugs: string[];
  shelfHighlights: string[];
  slug: string;
  title: string;
}

const sharedResources = {
  callback: {
    title: "The Callback Newsletter",
    href: "/from-the-classroom#newsletter",
    description:
      "Stay in the classroom between lessons with practical guidance, podcast updates, and honest industry perspective.",
    type: "guide",
  },
  ecosystem: {
    title: "Explore the Ecosystem",
    href: "/ecosystem",
    description:
      "See how training, tools, podcast episodes, and practical resources connect back to the learning library.",
    type: "chapter",
  },
  podcast: {
    title: "Conversations from inside Hollywood",
    href: "/podcast",
    description:
      "Hear the same Child Actor 101 teaching voice in audio form through grounded conversations about the business.",
    type: "podcast",
  },
  resume101: {
    title: "Resume101",
    href: "/ecosystem#resume101",
    description:
      "A focused tool for turning resume guidance into a cleaner, more professional actor résumé.",
    type: "tool",
  },
  selfTapeFeedback: {
    title: "Self Tape Feedback",
    href: "/ecosystem#self-tape-feedback",
    description:
      "Use feedback as a support layer after the fundamentals of self tapes are clear.",
    type: "tool",
  },
  startHere: {
    title: "Start Here Roadmap",
    href: "/start-here",
    description:
      "The guided onboarding path for brand-new parents who need the business explained in order.",
    type: "guide",
  },
} satisfies Record<string, ClassroomResource>;

export const classroomChapters: ClassroomChapter[] = [
  {
    slug: "start-here",
    title: "Start Here",
    description: "The opening shelf for families who are brand new and need the business explained in a calm, practical order.",
    lessonCountLabel: "9 lessons planned",
    browseLabel: "Browse Start Here",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    lessonSlugs: ["how-to-become-a-child-actor","what-it-takes-to-be-a-successful-child-actor","background-acting-pros-and-cons-for-young-performers","when-should-my-child-start-acting-training"],
    shelfHighlights: [
      "Beginner questions answered in plain English",
      "Expectation-setting before spending money",
      "Core lessons that point families toward the right next step",
    ],
  },
  {
    slug: "representation",
    title: "Representation",
    description: "A practical shelf on agents, managers, timing, money, and how healthy representation relationships actually work.",
    lessonCountLabel: "29 lessons planned",
    browseLabel: "Browse Representation",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    lessonSlugs: ["agents-vs-managers-for-child-actors","is-my-child-ready-for-an-agent","understanding-talent-rep-commissions","booking-out-for-child-actors"],
    shelfHighlights: [
      "Clarifies the difference between agent and manager roles",
      "Prevents rushed submissions and avoidable rep mistakes",
      "Connects professionalism, readiness, and financial clarity",
    ],
  },
  {
    slug: "auditions",
    title: "Auditions",
    description: "The self tape and audition-prep shelf, built to make performance, setup, and decision-making feel less chaotic.",
    lessonCountLabel: "34 lessons planned",
    browseLabel: "Browse Auditions",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    lessonSlugs: ["self-tape-equipment-for-child-actors","how-to-build-a-better-audition-slate","how-to-use-a-slate-shot-well","what-makes-a-child-actors-self-tape-competitive"],
    shelfHighlights: [
      "Breaks the audition process into clear, repeatable parts",
      "Keeps the focus on performance over overproduction",
      "Connects self tape choices to the larger classroom system",
    ],
  },
  {
    slug: "professional-materials",
    title: "Professional Materials",
    description: "A shelf for headshots, casting profiles, reels, and the materials that should support skill instead of replacing it.",
    lessonCountLabel: "12 lessons planned",
    browseLabel: "Browse Professional Materials",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    lessonSlugs: ["when-to-update-child-actor-headshots","headshot-prep-no-makeup-look-for-child-actor-photos","actors-access-for-parents-of-child-actors"],
    shelfHighlights: [
      "Helps families understand timing before investing in polished assets",
      "Keeps materials practical, accurate, and age-appropriate",
      "Shows how profiles and images support the rest of the career path",
    ],
  },
  {
    slug: "parent-operations",
    title: "Parent Operations",
    description: "The shelf for family systems, business habits, tracking, and the practical realities that keep the journey sustainable.",
    lessonCountLabel: "10 lessons planned",
    browseLabel: "Browse Parent Operations",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    lessonSlugs: ["child-acting-budget-what-families-really-spend","how-to-track-auditions-and-expenses","tax-guide-for-parents-of-child-actors"],
    shelfHighlights: [
      "Builds systems that reduce stress, missed details, and wasted spending",
      "Turns vague family overwhelm into repeatable parent workflows",
      "Connects money, organization, and professionalism",
    ],
  },
  {
    slug: "networking-professional-presence",
    title: "Networking & Professional Presence",
    description: "A shelf about relationships, referrals, online behavior, and showing up professionally without becoming transactional.",
    lessonCountLabel: "13 lessons planned",
    browseLabel: "Browse Networking",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    lessonSlugs: [],
    shelfHighlights: [
      "Frames networking as community-building instead of pitching",
      "Helps parents teach professional presence without pressure",
      "Clarifies where social media fits and where it should stop",
    ],
  },
  {
    slug: "wellness-resilience",
    title: "Wellness & Resilience",
    description: "The emotional shelf for protecting confidence, childhood, family balance, and long-term mental durability.",
    lessonCountLabel: "11 lessons planned",
    browseLabel: "Browse Wellness",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    lessonSlugs: ["when-rejection-stings-helping-your-child-actor-bounce-back","maintaining-self-esteem-as-a-child-actor"],
    shelfHighlights: [
      "Keeps the child's well-being central to every next step",
      "Helps parents respond well to rejection, pressure, and comparison",
      "Supports a career path that does not swallow family life",
    ],
  },
  {
    slug: "safety-ethics",
    title: "Safety & Ethics",
    description: "The family-protection shelf for scams, boundaries, online safety, and the legal issues parents need to understand early.",
    lessonCountLabel: "11 lessons planned",
    browseLabel: "Browse Safety & Ethics",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    lessonSlugs: ["the-new-hollywood-casting-scam-every-parent-needs-to-know-about","what-is-a-coogan-account","child-labor-laws-for-child-actors","tiktok-and-your-child-actor-safety"],
    shelfHighlights: [
      "Builds trust by helping families avoid the most expensive mistakes",
      "Explains protection topics without panic or jargon",
      "Connects online safety to the larger classroom framework",
    ],
  },
  {
    slug: "career-growth",
    title: "Career Growth",
    description: "The long-game shelf for training consistency, career pacing, and the habits that build a durable actor instead of a short sprint.",
    lessonCountLabel: "52 lessons planned",
    browseLabel: "Browse Career Growth",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    lessonSlugs: ["why-consistent-training-matters-for-young-actors"],
    shelfHighlights: [
      "Reinforces that child acting is built over time, not by urgency",
      "Connects skill-building to confidence and professionalism",
      "Shows what healthy growth looks like beyond the first few wins",
    ],
  },
];

export const classroomLessons: ClassroomLesson[] = [
  {
    chapterSlug: "start-here",
    slug: "how-to-become-a-child-actor",
    title: "How to Become a Child Actor",
    subtitle: "A classroom lesson on how to become a child actor.",
    summary: "Cornerstone beginner topic with consistently high parent confusion. It directly supports /start-here and should set expectations before families spend money.",
    teacherNote: "Before you spend a dime on photos or classes, read this. The biggest advantage you can give your child early on is simply knowing how the business actually works.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Cornerstone beginner topic with consistently high parent confusion. It directly supports /start-here and should set expectations before families spend money.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["what-it-takes-to-be-a-successful-child-actor","background-acting-pros-and-cons-for-young-performers","when-should-my-child-start-acting-training"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
  },
  {
    chapterSlug: "start-here",
    slug: "what-it-takes-to-be-a-successful-child-actor",
    title: "What It Takes to Be a Successful Child Actor",
    subtitle: "A classroom lesson on what it takes to be a successful child actor.",
    summary: "Trust-building expectation-setting lesson that gives families a realistic picture of the work, pace, and mindset required.",
    teacherNote: "We often mistake early attention for success. True success in this industry is built on patience, resilience, and treating this like a marathon, not a sprint.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Trust-building expectation-setting lesson that gives families a realistic picture of the work, pace, and mindset required.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["how-to-become-a-child-actor","is-my-child-ready-for-an-agent","why-consistent-training-matters-for-young-actors"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/what-it-takes",
  },
  {
    chapterSlug: "start-here",
    slug: "background-acting-pros-and-cons-for-young-performers",
    title: "Background Acting: Pros and Cons for Young Performers",
    subtitle: "A classroom lesson on background acting: pros and cons for young performers.",
    summary: "Families regularly misunderstand background work. This lesson helps prevent unrealistic expectations and clarifies where background fits in a child's path.",
    teacherNote: "Background acting is a great way to learn how a set works, but it's important to understand where it fits. It is an experience, not a fast-track to representation.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Families regularly misunderstand background work. This lesson helps prevent unrealistic expectations and clarifies where background fits in a child's path.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["how-to-become-a-child-actor","what-it-takes-to-be-a-successful-child-actor","when-should-my-child-start-acting-training"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/background-acting-the-pros-and-cons-for-young-performers",
  },
  {
    chapterSlug: "start-here",
    slug: "when-should-my-child-start-acting-training",
    title: "When Should My Child Start Acting Training?",
    subtitle: "A classroom lesson on when should my child start acting training?.",
    summary: "Parents ask this early and often. It helps reduce premature spending and supports the educational tone of learn before you buy.",
    teacherNote: "There is no single 'right' age to start training, but there is a right time for your family. Focus on readiness and curiosity over rushing into a class.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Parents ask this early and often. It helps reduce premature spending and supports the educational tone of learn before you buy.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["how-to-become-a-child-actor","what-it-takes-to-be-a-successful-child-actor","why-consistent-training-matters-for-young-actors"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age",
  },
  {
    chapterSlug: "representation",
    slug: "agents-vs-managers-for-child-actors",
    title: "Agents vs. Managers for Child Actors",
    subtitle: "A classroom lesson on agents vs. managers for child actors.",
    summary: "One of the clearest high-confusion trust builders in the whole library. It supports early onboarding and lowers the risk of bad representation decisions.",
    teacherNote: "The line between an agent and a manager can feel blurry. Understanding the difference now will save you from paying double commissions or signing the wrong contract.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "One of the clearest high-confusion trust builders in the whole library. It supports early onboarding and lowers the risk of bad representation decisions.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["is-my-child-ready-for-an-agent","understanding-talent-rep-commissions","booking-out-for-child-actors"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
  },
  {
    chapterSlug: "representation",
    slug: "is-my-child-ready-for-an-agent",
    title: "Is My Child Ready for an Agent?",
    subtitle: "A classroom lesson on is my child ready for an agent?.",
    summary: "Directly reduces rushed rep submissions and wasted effort. This is a core transition lesson between /start-here and the representation chapter.",
    teacherNote: "It’s tempting to rush toward representation, but securing an agent too early often does more harm than good. Make sure the foundation is there first.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Directly reduces rushed rep submissions and wasted effort. This is a core transition lesson between /start-here and the representation chapter.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["agents-vs-managers-for-child-actors","understanding-talent-rep-commissions","how-to-become-a-child-actor"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time",
  },
  {
    chapterSlug: "representation",
    slug: "understanding-talent-rep-commissions",
    title: "Understanding Talent Rep Commissions",
    subtitle: "A classroom lesson on understanding talent rep commissions.",
    summary: "Money confusion is a major trust issue. This lesson reduces misunderstanding around percentages, norms, and what families should question.",
    teacherNote: "Money is where most families get taken advantage of. Knowing exactly how commissions work protects your child's earnings and keeps your professional relationships transparent.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Money confusion is a major trust issue. This lesson reduces misunderstanding around percentages, norms, and what families should question.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["agents-vs-managers-for-child-actors","booking-out-for-child-actors","child-acting-budget-what-families-really-spend"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/understanding-talent-rep-commissions-in-the-entertainment-industry",
  },
  {
    chapterSlug: "representation",
    slug: "booking-out-for-child-actors",
    title: "Booking Out for Child Actors",
    subtitle: "A classroom lesson on booking out for child actors.",
    summary: "Practical professionalism topic that parents rarely understand until they make an avoidable mistake. Good trust and operations lesson for Batch 01.",
    teacherNote: "Booking out is one of the easiest ways to prove you are a professional family. It shows your reps that you respect their time as much as your own.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Practical professionalism topic that parents rarely understand until they make an avoidable mistake. Good trust and operations lesson for Batch 01.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["agents-vs-managers-for-child-actors","understanding-talent-rep-commissions","how-to-track-auditions-and-expenses"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/booking-out-a-critical-practice-for-child-actors-in-the-entertainment-industry",
  },
  {
    chapterSlug: "auditions",
    slug: "self-tape-equipment-for-child-actors",
    title: "Self Tape Equipment for Child Actors",
    subtitle: "A classroom lesson on self tape equipment for child actors.",
    summary: "Evergreen, practical, and immediately useful. It lowers wasted spending and answers one of the first concrete audition questions parents face.",
    teacherNote: "You do not need a Hollywood soundstage in your living room. A clean, reliable setup matters far more than buying the most expensive gear.",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    keyTakeaways: [
      "Evergreen, practical, and immediately useful. It lowers wasted spending and answers one of the first concrete audition questions parents face.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["how-to-build-a-better-audition-slate","how-to-use-a-slate-shot-well","what-makes-a-child-actors-self-tape-competitive"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/self-tape-equipment-for-child-actors",
  },
  {
    chapterSlug: "auditions",
    slug: "how-to-build-a-better-audition-slate",
    title: "How to Build a Better Audition Slate",
    subtitle: "A classroom lesson on how to build a better audition slate.",
    summary: "Slates are small but high-stakes. Parents repeatedly need direct, practical instruction here, and the saved curriculum already contains the raw material.",
    teacherNote: "A slate is often the very first thing casting sees. Keep it simple, keep it grounded, and let your child’s natural personality show through.",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    keyTakeaways: [
      "Slates are small but high-stakes. Parents repeatedly need direct, practical instruction here, and the saved curriculum already contains the raw material.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["how-to-use-a-slate-shot-well","self-tape-equipment-for-child-actors","what-makes-a-child-actors-self-tape-competitive"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
  },
  {
    chapterSlug: "auditions",
    slug: "how-to-use-a-slate-shot-well",
    title: "How to Use a Slate Shot Well",
    subtitle: "A classroom lesson on how to use a slate shot well.",
    summary: "This solves a recurring technical confusion point and pairs naturally with the slate lesson without bloating that page.",
    teacherNote: "Slate shots are a specific tool for casting profiles. Understanding how to use them effectively can give your child’s profile a more complete, professional feel.",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    keyTakeaways: [
      "This solves a recurring technical confusion point and pairs naturally with the slate lesson without bloating that page.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["how-to-build-a-better-audition-slate","self-tape-equipment-for-child-actors","what-makes-a-child-actors-self-tape-competitive"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
  },
  {
    chapterSlug: "auditions",
    slug: "what-makes-a-child-actors-self-tape-competitive",
    title: "What Makes a Child Actor's Self Tape Competitive",
    subtitle: "A classroom lesson on what makes a child actor's self tape competitive.",
    summary: "Strong practical bridge between technical setup and actual audition quality. It gives parents a clear standard without hype.",
    teacherNote: "A competitive tape isn't about perfect lighting—it's about authentic performance and eliminating distractions so casting can actually watch the work.",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    keyTakeaways: [
      "Strong practical bridge between technical setup and actual audition quality. It gives parents a clear standard without hype.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["self-tape-equipment-for-child-actors","how-to-build-a-better-audition-slate","when-rejection-stings-helping-your-child-actor-bounce-back"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/what-makes-a-child-actors-self-tape-audition-competitive",
  },
  {
    chapterSlug: "professional-materials",
    slug: "when-to-update-child-actor-headshots",
    title: "When Is It Time to Update Your Child Actor Headshots?",
    subtitle: "A classroom lesson on when is it time to update your child actor headshots?.",
    summary: "Headshot timing is a high-confusion money decision. This lesson helps parents avoid both stale photos and unnecessary repeat shoots.",
    teacherNote: "Headshots are an investment. Knowing when it’s actually time to update them will keep you from wasting money on photos you don’t need yet.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Headshot timing is a high-confusion money decision. This lesson helps parents avoid both stale photos and unnecessary repeat shoots.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["headshot-prep-no-makeup-look-for-child-actor-photos","actors-access-for-parents-of-child-actors","is-my-child-ready-for-an-agent"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/getting-multifaceted-shots-from-a-3-look-headshot-session",
  },
  {
    chapterSlug: "professional-materials",
    slug: "headshot-prep-no-makeup-look-for-child-actor-photos",
    title: "Headshot Prep: The No-Makeup Look for Child Actor Photos",
    subtitle: "A classroom lesson on headshot prep: the no-makeup look for child actor photos.",
    summary: "Practical and evergreen. It solves a narrow parent question that frequently leads to overproduced or age-inaccurate materials.",
    teacherNote: "Casting directors want to see what your child actually looks like when they walk into a room. Over-styling often works against them.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Practical and evergreen. It solves a narrow parent question that frequently leads to overproduced or age-inaccurate materials.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["when-to-update-child-actor-headshots","actors-access-for-parents-of-child-actors","child-acting-budget-what-families-really-spend"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos",
  },
  {
    chapterSlug: "professional-materials",
    slug: "actors-access-for-parents-of-child-actors",
    title: "Actors Access for Parents of Child Actors",
    subtitle: "A classroom lesson on actors access for parents of child actors.",
    summary: "High-value practical platform knowledge. It supports profiles, submissions, and material readiness without forcing a sales angle.",
    teacherNote: "Actors Access is the standard, but it can feel overwhelming. Focus on maintaining a clean, accurate profile rather than uploading every single piece of media.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "High-value practical platform knowledge. It supports profiles, submissions, and material readiness without forcing a sales angle.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["when-to-update-child-actor-headshots","is-my-child-ready-for-an-agent","how-to-track-auditions-and-expenses"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/Actorsaccess",
  },
  {
    chapterSlug: "parent-operations",
    slug: "child-acting-budget-what-families-really-spend",
    title: "Child Acting Budget: What Families Really Spend",
    subtitle: "A classroom lesson on child acting budget: what families really spend.",
    summary: "Critical money reality check for brand-new families. This lesson directly reduces wasted spending and builds trust fast.",
    teacherNote: "Every family needs a realistic picture of what this business costs. Setting a budget early prevents financial panic and keeps the journey sustainable.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Critical money reality check for brand-new families. This lesson directly reduces wasted spending and builds trust fast.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["how-to-become-a-child-actor","understanding-talent-rep-commissions","tax-guide-for-parents-of-child-actors"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/2022budget",
  },
  {
    chapterSlug: "parent-operations",
    slug: "how-to-track-auditions-and-expenses",
    title: "How to Track Auditions and Expenses",
    subtitle: "A classroom lesson on how to track auditions and expenses.",
    summary: "Highly practical system-building lesson that supports calmer decision-making and better professional follow-through.",
    teacherNote: "Memory is unreliable in this business. A simple, consistent tracking system is one of the best tools you can give yourself as a parent manager.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Highly practical system-building lesson that supports calmer decision-making and better professional follow-through.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["child-acting-budget-what-families-really-spend","booking-out-for-child-actors","actors-access-for-parents-of-child-actors"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
  },
  {
    chapterSlug: "parent-operations",
    slug: "tax-guide-for-parents-of-child-actors",
    title: "Tax Guide for Parents of Child Actors",
    subtitle: "A classroom lesson on tax guide for parents of child actors.",
    summary: "Evergreen operational topic with real financial consequences. It also reinforces the platform's honest, non-hype authority positioning.",
    teacherNote: "Taxes don't have to be terrifying if you keep organized records throughout the year. Treat the acting journey like a small business from day one.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Evergreen operational topic with real financial consequences. It also reinforces the platform's honest, non-hype authority positioning.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["child-acting-budget-what-families-really-spend","how-to-track-auditions-and-expenses","what-is-a-coogan-account"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
  },
  {
    chapterSlug: "wellness-resilience",
    slug: "when-rejection-stings-helping-your-child-actor-bounce-back",
    title: "When Rejection Stings: Helping Your Child Actor Bounce Back",
    subtitle: "A classroom lesson on when rejection stings: helping your child actor bounce back.",
    summary: "Essential emotional support lesson that balances the more business-heavy early batch. Parents need this before rejection becomes a family identity issue.",
    teacherNote: "Rejection is part of the job. How you react as a parent will heavily influence how your child processes the inevitable 'no's in this industry.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Essential emotional support lesson that balances the more business-heavy early batch. Parents need this before rejection becomes a family identity issue.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["what-makes-a-child-actors-self-tape-competitive","maintaining-self-esteem-as-a-child-actor","what-it-takes-to-be-a-successful-child-actor"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/when-rejection-stings-helping-your-child-actor-bounce-back",
  },
  {
    chapterSlug: "wellness-resilience",
    slug: "maintaining-self-esteem-as-a-child-actor",
    title: "Maintaining Self-Esteem as a Child Actor",
    subtitle: "A classroom lesson on maintaining self-esteem as a child actor.",
    summary: "Protecting the child's sense of self is foundational to the brand's parent-first ethos and builds trust in the classroom as more than an advice blog.",
    teacherNote: "Your child's worth has nothing to do with their booking ratio. Protecting their self-esteem is the most important job you have in this process.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Protecting the child's sense of self is foundational to the brand's parent-first ethos and builds trust in the classroom as more than an advice blog.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["when-rejection-stings-helping-your-child-actor-bounce-back","what-it-takes-to-be-a-successful-child-actor","why-consistent-training-matters-for-young-actors"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
  },
  {
    chapterSlug: "safety-ethics",
    slug: "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
    title: "The New Hollywood Casting Scam Every Parent Needs to Know About",
    subtitle: "A classroom lesson on the new hollywood casting scam every parent needs to know about.",
    summary: "Direct trust builder and one of the clearest ways to prove the classroom protects families from costly mistakes.",
    teacherNote: "Scams evolve, but the warning signs stay the same. If someone is asking for money upfront or promising overnight success, walk away.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Direct trust builder and one of the clearest ways to prove the classroom protects families from costly mistakes.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["agents-vs-managers-for-child-actors","is-my-child-ready-for-an-agent","child-acting-budget-what-families-really-spend"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
  },
  {
    chapterSlug: "safety-ethics",
    slug: "what-is-a-coogan-account",
    title: "What Is a Coogan Account and Do I Need One for My Child Actor?",
    subtitle: "A classroom lesson on what is a coogan account and do i need one for my child actor?.",
    summary: "Foundational money-and-protection lesson. It answers a recurring parent question and supports legal literacy without overwhelming the reader.",
    teacherNote: "Coogan accounts are legally required in many states, but they are also just a good practice. It's about protecting your child's financial future.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Foundational money-and-protection lesson. It answers a recurring parent question and supports legal literacy without overwhelming the reader.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["child-labor-laws-for-child-actors","tax-guide-for-parents-of-child-actors","child-acting-budget-what-families-really-spend"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor",
  },
  {
    chapterSlug: "safety-ethics",
    slug: "child-labor-laws-for-child-actors",
    title: "Child Labor Laws for Child Actors: A Parent Primer",
    subtitle: "A classroom lesson on child labor laws for child actors: a parent primer.",
    summary: "Parents need a simple legal orientation early. This builds authority and prevents avoidable confusion around set hours, school, and protection.",
    teacherNote: "Child labor laws exist to protect your kid’s education and well-being on set. As a parent, you need to understand these rules before you ever arrive on location.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Parents need a simple legal orientation early. This builds authority and prevents avoidable confusion around set hours, school, and protection.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["what-is-a-coogan-account","the-new-hollywood-casting-scam-every-parent-needs-to-know-about","how-to-become-a-child-actor"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/a-rundown-on-child-labor-laws-in",
  },
  {
    chapterSlug: "safety-ethics",
    slug: "tiktok-and-your-child-actor-safety",
    title: "TikTok and Your Child Actor: Creativity, Connection, and Safety",
    subtitle: "A classroom lesson on tiktok and your child actor: creativity, connection, and safety.",
    summary: "Modern parent concern with ongoing relevance. It belongs in the first batch because it reduces risk while staying grounded rather than fear-based.",
    teacherNote: "Social media can be a fun creative outlet, but it requires boundaries. You must balance professional visibility with your child’s right to privacy and safety.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Modern parent concern with ongoing relevance. It belongs in the first batch because it reduces risk while staying grounded rather than fear-based.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["the-new-hollywood-casting-scam-every-parent-needs-to-know-about","child-labor-laws-for-child-actors","what-it-takes-to-be-a-successful-child-actor"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety",
  },
  {
    chapterSlug: "career-growth",
    slug: "why-consistent-training-matters-for-young-actors",
    title: "Why Consistent Training Matters for Young Actors",
    subtitle: "A classroom lesson on why consistent training matters for young actors.",
    summary: "Good bridge from beginner curiosity into long-term development. It helps families think in terms of skill-building rather than quick wins.",
    teacherNote: "You can't cram for an acting career. Consistent, ongoing training builds the kind of durable confidence that holds up in a high-pressure audition room.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Good bridge from beginner curiosity into long-term development. It helps families think in terms of skill-building rather than quick wins.",
      "Always start with practical steps before spending money.",
      "Stay grounded and informed."
    ],
    relatedLessonSlugs: ["when-should-my-child-start-acting-training","what-it-takes-to-be-a-successful-child-actor","maintaining-self-esteem-as-a-child-actor"],
    resources: [sharedResources.ecosystem, sharedResources.podcast, sharedResources.startHere],
    sourceUrl: "https://www.childactor101.com/101-blog/olympic-level-training-for-aspiring-young-actors-why-consistency-is-key",
  },
];

const lessonMap = new Map(classroomLessons.map((lesson) => [lesson.slug, lesson]));

export const classroomFeaturedLessonSlugs = [
  "how-to-become-a-child-actor",
  "agents-vs-managers-for-child-actors",
  "self-tape-equipment-for-child-actors",
  "actors-access-for-parents-of-child-actors",
  "child-acting-budget-what-families-really-spend",
  "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
] as const;

export function getClassroomChapter(slug: string) {
  return classroomChapters.find((chapter) => chapter.slug === slug);
}

export function getClassroomLesson(chapterSlug: string, lessonSlug: string) {
  const lesson = lessonMap.get(lessonSlug);

  if (!lesson || lesson.chapterSlug !== chapterSlug) {
    return undefined;
  }

  return lesson;
}

export function getLessonsForChapter(chapterSlug: string) {
  const chapter = getClassroomChapter(chapterSlug);

  if (!chapter) {
    return [];
  }

  return chapter.lessonSlugs
    .map((lessonSlug) => lessonMap.get(lessonSlug))
    .filter((lesson): lesson is ClassroomLesson => Boolean(lesson));
}

export function getFeaturedLessons() {
  return classroomFeaturedLessonSlugs
    .map((lessonSlug) => lessonMap.get(lessonSlug))
    .filter((lesson): lesson is ClassroomLesson => Boolean(lesson));
}

export function getRelatedLessons(lesson: ClassroomLesson) {
  return lesson.relatedLessonSlugs
    .map((lessonSlug) => lessonMap.get(lessonSlug))
    .filter((relatedLesson): relatedLesson is ClassroomLesson => Boolean(relatedLesson));
}

export function getLessonPagination(chapterSlug: string, lessonSlug: string) {
  const lessons = getLessonsForChapter(chapterSlug);
  const currentIndex = lessons.findIndex((lesson) => lesson.slug === lessonSlug);

  if (currentIndex === -1) {
    return { next: undefined, previous: undefined };
  }

  return {
    previous: currentIndex > 0 ? lessons[currentIndex - 1] : undefined,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined,
  };
}

export const getAdjacentLessons = getLessonPagination;

export function getClassroomOverviewSections(
  lesson: ClassroomLesson,
  chapter: ClassroomChapter,
): ClassroomLessonSection[] {
  return [
    {
      heading: "Lesson Overview",
      paragraphs: [
        `This lesson inside the ${chapter.title} chapter addresses one of the most common questions families face when navigating the industry.`,
        lesson.summary
      ],
    },
    {
      heading: "Why this matters",
      paragraphs: [
        "Instead of rushing into decisions or spending money prematurely, take time to understand the fundamentals.",
        "The goal is to help you build a clear, sustainable approach so your child can focus on the work, and you can focus on supporting them."
      ],
    },
  ];
}

export function getClassroomStaticLessonParams() {
  return classroomChapters.flatMap((chapter) =>
    chapter.lessonSlugs.map((lesson) => ({
      chapter: chapter.slug,
      lesson,
    })),
  );
}
