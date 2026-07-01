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
    description:
      "The opening shelf for families who are brand new and need the business explained in a calm, practical order.",
    lessonCountLabel: "9 lessons planned",
    browseLabel: "Browse Start Here",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    lessonSlugs: [
      "what-it-takes-to-be-a-successful-child-actor",
      "background-acting-the-pros-and-cons-for-young-performers",
      "when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age",
    ],
    shelfHighlights: [
      "Beginner questions answered in plain English",
      "Expectation-setting before spending money",
      "Core lessons that point families toward the right next step",
    ],
  },
  {
    slug: "representation",
    title: "Representation",
    description:
      "A practical shelf on agents, managers, timing, money, and how healthy representation relationships actually work.",
    lessonCountLabel: "29 lessons planned",
    browseLabel: "Browse Representation",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    lessonSlugs: [
      "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
      "is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time",
      "understanding-talent-rep-commissions-in-the-entertainment-industry",
    ],
    shelfHighlights: [
      "Clarifies the difference between agent and manager roles",
      "Prevents rushed submissions and avoidable rep mistakes",
      "Connects professionalism, readiness, and financial clarity",
    ],
  },
  {
    slug: "auditions",
    title: "Auditions",
    description:
      "The self tape and audition-prep shelf, built to make performance, setup, and decision-making feel less chaotic.",
    lessonCountLabel: "34 lessons planned",
    browseLabel: "Browse Auditions",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    lessonSlugs: [
      "self-tape-equipment-for-child-actors",
      "how-to-build-a-better-audition-slate",
      "what-makes-a-child-actors-self-tape-audition-competitive",
    ],
    shelfHighlights: [
      "Breaks the audition process into clear, repeatable parts",
      "Keeps the focus on performance over overproduction",
      "Connects self tape choices to the larger classroom system",
    ],
  },
  {
    slug: "professional-materials",
    title: "Professional Materials",
    description:
      "A shelf for headshots, casting profiles, reels, and the materials that should support skill instead of replacing it.",
    lessonCountLabel: "12 lessons planned",
    browseLabel: "Browse Professional Materials",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    lessonSlugs: [
      "actors-access",
      "getting-multifaceted-shots-from-a-3-look-headshot-session",
      "headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos",
    ],
    shelfHighlights: [
      "Helps families understand timing before investing in polished assets",
      "Keeps materials practical, accurate, and age-appropriate",
      "Shows how profiles and images support the rest of the career path",
    ],
  },
  {
    slug: "parent-operations",
    title: "Parent Operations",
    description:
      "The shelf for family systems, business habits, tracking, and the practical realities that keep the journey sustainable.",
    lessonCountLabel: "10 lessons planned",
    browseLabel: "Browse Parent Operations",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    lessonSlugs: [
      "the-business-side-to-acting",
      "how-to-track-auditions-and-expenses",
      "tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
    ],
    shelfHighlights: [
      "Builds systems that reduce stress, missed details, and wasted spending",
      "Turns vague family overwhelm into repeatable parent workflows",
      "Connects money, organization, and professionalism",
    ],
  },
  {
    slug: "networking-professional-presence",
    title: "Networking & Professional Presence",
    description:
      "A shelf about relationships, referrals, online behavior, and showing up professionally without becoming transactional.",
    lessonCountLabel: "13 lessons planned",
    browseLabel: "Browse Networking",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    lessonSlugs: [
      "networking-in-showbiz",
      "industry-event-networking-etiquette",
      "social-media-as-professional-presence",
    ],
    shelfHighlights: [
      "Frames networking as community-building instead of pitching",
      "Helps parents teach professional presence without pressure",
      "Clarifies where social media fits and where it should stop",
    ],
  },
  {
    slug: "wellness-resilience",
    title: "Wellness & Resilience",
    description:
      "The emotional shelf for protecting confidence, childhood, family balance, and long-term mental durability.",
    lessonCountLabel: "11 lessons planned",
    browseLabel: "Browse Wellness",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    lessonSlugs: [
      "when-rejection-stings-helping-your-child-actor-bounce-back",
      "maintaining-self-esteem-as-a-child-actor",
      "how-parents-support-without-pressuring",
    ],
    shelfHighlights: [
      "Keeps the child's well-being central to every next step",
      "Helps parents respond well to rejection, pressure, and comparison",
      "Supports a career path that does not swallow family life",
    ],
  },
  {
    slug: "safety-ethics",
    title: "Safety & Ethics",
    description:
      "The family-protection shelf for scams, boundaries, online safety, and the legal issues parents need to understand early.",
    lessonCountLabel: "11 lessons planned",
    browseLabel: "Browse Safety & Ethics",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    lessonSlugs: [
      "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
      "what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor",
      "tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety",
    ],
    shelfHighlights: [
      "Builds trust by helping families avoid the most expensive mistakes",
      "Explains protection topics without panic or jargon",
      "Connects online safety to the larger classroom framework",
    ],
  },
  {
    slug: "career-growth",
    title: "Career Growth",
    description:
      "The long-game shelf for training consistency, career pacing, and the habits that build a durable actor instead of a short sprint.",
    lessonCountLabel: "52 lessons planned",
    browseLabel: "Browse Career Growth",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    lessonSlugs: [
      "olympic-level-training-for-aspiring-young-actors-why-consistency-is-key",
      "why-i-rebuilt-the-entire-actor-training-program",
      "the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-is-just-a-hobbyist",
    ],
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
    slug: "what-it-takes-to-be-a-successful-child-actor",
    title: "What It Takes To Be a Successful Child Actor",
    subtitle:
      "A realistic opening lesson on the habits, expectations, and long-view mindset that support a child actor's growth.",
    summary:
      "This lesson sets the tone for the whole classroom by helping parents understand that longevity comes from skill, emotional steadiness, professionalism, and patience rather than speed or hype.",
    teacherNote:
      "Use this lesson early. It resets expectations before a family starts measuring progress by auditions, followers, or being seen.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Long-term success is built on skill, readiness, and professionalism.",
      "Parents need to protect both childhood and consistency.",
      "The first goal is understanding the business clearly, not rushing into paid services.",
    ],
    relatedLessonSlugs: [
      "background-acting-the-pros-and-cons-for-young-performers",
      "when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age",
      "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
    ],
    resources: [sharedResources.startHere, sharedResources.callback, sharedResources.podcast],
    bodySections: [
      {
        heading: "Start with truth, not urgency",
        paragraphs: [
          "The sample classroom version of this lesson begins by slowing families down. A child acting career does not become healthier because a parent buys more things faster. It becomes healthier when the family understands what the work actually asks of a child over time.",
          "That means learning how auditions work, how representation fits in, and how much emotional steadiness the process requires before every next purchase starts sounding necessary.",
        ],
      },
      {
        heading: "Success usually looks quieter than parents expect",
        paragraphs: [
          "Many families arrive assuming success looks like instant bookings, early fame, or constant visibility. In practice, success more often looks like skill building, steady routines, strong communication, and a child who can stay grounded while opportunities come and go.",
          "This is where the classroom tone matters. Parents are not being asked to become industry insiders overnight. They are being asked to become informed decision-makers who can recognize progress that is real, sustainable, and age-appropriate.",
        ],
        bullets: [
          "Skill matters more than urgency.",
          "Professionalism matters more than hype.",
          "Emotional durability matters more than early attention.",
        ],
      },
      {
        heading: "What to do after this lesson",
        paragraphs: [
          "A finished classroom lesson would end by pointing the reader toward the next practical questions: when training actually helps, what representation is supposed to do, and what materials matter first.",
          "For the prototype, this page shows the flow we want every lesson to follow: context, education, application, related resources, and one clear next step.",
        ],
      },
    ],
  },
  {
    chapterSlug: "start-here",
    slug: "background-acting-the-pros-and-cons-for-young-performers",
    title: "Background Acting The Pros And Cons For Young Performers",
    subtitle:
      "A classroom lesson on where background work fits, what it teaches, and what it should not be mistaken for.",
    summary:
      "This lesson helps families understand the difference between exposure, experience, and meaningful career progress so they can decide whether background work fits their child's path.",
    teacherNote:
      "Parents often attach too much meaning to background work. The classroom version should help them see it as one option, not a shortcut.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Background work can be useful, but it is not the same as actor training or principal work.",
      "Families should understand the tradeoffs before chasing set experience as a strategy.",
      "A calm definition of progress prevents false expectations.",
    ],
    relatedLessonSlugs: [
      "what-it-takes-to-be-a-successful-child-actor",
      "when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age",
      "the-business-side-to-acting",
    ],
    resources: [sharedResources.startHere, sharedResources.ecosystem],
  },
  {
    chapterSlug: "start-here",
    slug: "when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age",
    title: "When Should My Child Start Acting Training A Parents Guide To The Right Age",
    subtitle:
      "A practical lesson about readiness, timing, and what training should solve before a family starts spending heavily.",
    summary:
      "This lesson shows parents how to think about training as a support for skill, focus, and confidence rather than as a quick fix for uncertainty.",
    teacherNote:
      "The goal is not to answer with one perfect age. The goal is to help parents judge readiness more accurately.",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    keyTakeaways: [
      "Training is most useful when it matches the child's readiness and goals.",
      "Parents do not need to buy every service at the beginning.",
      "Early clarity about why a child is training prevents waste later.",
    ],
    relatedLessonSlugs: [
      "what-it-takes-to-be-a-successful-child-actor",
      "olympic-level-training-for-aspiring-young-actors-why-consistency-is-key",
      "the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-is-just-a-hobbyist",
    ],
    resources: [sharedResources.startHere, sharedResources.ecosystem],
  },
  {
    chapterSlug: "representation",
    slug: "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
    title: "Navigating Hollywood Do You Need A Talent Agent Or A Manager",
    subtitle:
      "A parent-first lesson on the difference between these roles and how each one fits into the roadmap.",
    summary:
      "This lesson explains what agents and managers are actually responsible for, why families confuse them, and how to judge fit instead of hype.",
    teacherNote:
      "This is a trust-building lesson. If families understand this shelf, they make calmer choices everywhere else.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Agents and managers are not interchangeable roles.",
      "Readiness matters more than collecting industry titles around your child.",
      "Representation should make the path clearer, not more confusing.",
    ],
    relatedLessonSlugs: [
      "is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time",
      "understanding-talent-rep-commissions-in-the-entertainment-industry",
      "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
    ],
    resources: [sharedResources.startHere, sharedResources.podcast],
  },
  {
    chapterSlug: "representation",
    slug: "is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time",
    title: "Is My Child Ready For An Agent A Parents Guide To Knowing The Right Time",
    subtitle:
      "A lesson designed to slow families down before they start submitting too early or expecting representation to solve everything.",
    summary:
      "This lesson helps parents measure readiness through materials, skill, professionalism, and emotional steadiness rather than wishful thinking.",
    teacherNote:
      "Families need a clear line between wanting an agent and being ready for an agent.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Representation should match the child's current level of readiness.",
      "Parents need to look at skill, materials, and consistency together.",
      "Waiting can be strategic, not discouraging.",
    ],
    relatedLessonSlugs: [
      "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
      "understanding-talent-rep-commissions-in-the-entertainment-industry",
      "actors-access",
    ],
    resources: [sharedResources.startHere, sharedResources.ecosystem],
  },
  {
    chapterSlug: "representation",
    slug: "understanding-talent-rep-commissions-in-the-entertainment-industry",
    title: "Understanding Talent Rep Commissions In The Entertainment Industry",
    subtitle:
      "A plain-English lesson about how commissions work, where confusion starts, and what families should ask before agreeing to anything.",
    summary:
      "This lesson translates one of the most intimidating business topics into a parent-friendly guide that supports calmer, more informed decisions.",
    teacherNote:
      "When parents understand money, they are much harder to pressure. That is why this lesson belongs near the front of the library.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Commission structure should feel understandable before anything gets signed.",
      "Confusion is a sign to slow down, not to keep nodding.",
      "Representation and money conversations belong inside the same educational frame.",
    ],
    relatedLessonSlugs: [
      "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
      "is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time",
      "tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
    ],
    resources: [sharedResources.podcast, sharedResources.ecosystem, sharedResources.callback],
    bodySections: [
      {
        heading: "Why commissions feel more confusing than they should",
        paragraphs: [
          "Parents are often hearing commission language at the same moment they are trying to decode auditions, profiles, and representation expectations. That stack of unfamiliar ideas is what makes a normal business percentage start feeling mysterious.",
          "The classroom version of this lesson should lower the temperature. The point is not to make families suspicious of every relationship. The point is to help them understand the structure well enough to ask calm, specific questions before agreeing to anything.",
        ],
      },
      {
        heading: "Use plain language before agreeing to terms",
        paragraphs: [
          "In the finished library, this section would walk parents through what a commission is tied to, when it applies, and how it connects to the work a representative is actually doing. The tone should stay educational, not alarmist.",
          "A parent does not need to know every edge case on day one. They do need to know whether the agreement makes sense, whether the expectations were clearly explained, and whether the relationship feels transparent.",
        ],
        bullets: [
          "What work is the commission attached to?",
          "When is it collected, and by whom?",
          "What questions still feel unclear after the explanation?",
        ],
      },
      {
        heading: "How this lesson connects to the rest of the classroom",
        paragraphs: [
          "Commission lessons should never sit alone. They should point parents toward readiness, contracts, taxes, and the larger question of whether a family is moving too fast.",
          "That cross-linking is part of the prototype here. A reader should always understand the next lesson to open, not feel trapped inside one topic with no direction.",
        ],
      },
    ],
  },
  {
    chapterSlug: "auditions",
    slug: "self-tape-equipment-for-child-actors",
    title: "Self Tape Equipment For Child Actors",
    subtitle:
      "A sample classroom lesson on building a clean, workable self tape setup without turning the house into a production set.",
    summary:
      "This lesson helps families understand which equipment choices actually improve clarity and which purchases mostly feed anxiety.",
    teacherNote:
      "The goal is a reliable setup, not a perfect studio. Families need a standard they can repeat calmly.",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    keyTakeaways: [
      "Simple, repeatable setups beat expensive overproduction.",
      "Clarity matters more than gear obsession.",
      "The equipment lesson should always point back to performance.",
    ],
    relatedLessonSlugs: [
      "how-to-build-a-better-audition-slate",
      "what-makes-a-child-actors-self-tape-audition-competitive",
      "how-to-track-auditions-and-expenses",
    ],
    resources: [sharedResources.selfTapeFeedback, sharedResources.ecosystem],
  },
  {
    chapterSlug: "auditions",
    slug: "how-to-build-a-better-audition-slate",
    title: "How To Build a Better Audition Slate",
    subtitle:
      "A focused lesson prototype on how slates introduce the actor without becoming stiff, overdone, or confusing.",
    summary:
      "This lesson shows how the classroom can turn saved curriculum source material into a clean, single-question lesson about slates.",
    teacherNote:
      "Keep this lesson narrow. Parents should finish it knowing exactly what a better slate sounds and looks like.",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    keyTakeaways: [
      "A good slate is clear, grounded, and easy to review.",
      "Over-directing a child often hurts more than it helps.",
      "Slates should support trust, not performance tricks.",
    ],
    relatedLessonSlugs: [
      "self-tape-equipment-for-child-actors",
      "what-makes-a-child-actors-self-tape-audition-competitive",
      "when-rejection-stings-helping-your-child-actor-bounce-back",
    ],
    resources: [sharedResources.selfTapeFeedback, sharedResources.podcast],
  },
  {
    chapterSlug: "auditions",
    slug: "what-makes-a-child-actors-self-tape-audition-competitive",
    title: "What Makes A Child Actors Self Tape Audition Competitive",
    subtitle:
      "A classroom lesson on the difference between a watchable tape and a truly competitive one.",
    summary:
      "This lesson gives parents a framework for judging self tapes without obsessing over tiny details that do not move the audition forward.",
    teacherNote:
      "This page should always bring the reader back to process. Better decisions come from a standard, not from panic.",
    featuredImageSrc: images.homeHero.src,
    featuredImageAlt: images.homeHero.alt,
    keyTakeaways: [
      "Competitive tapes balance clear setup with truthful performance.",
      "Parents need a repeatable review standard.",
      "The goal is not perfection. The goal is clear, compelling work.",
    ],
    relatedLessonSlugs: [
      "self-tape-equipment-for-child-actors",
      "how-to-build-a-better-audition-slate",
      "when-rejection-stings-helping-your-child-actor-bounce-back",
    ],
    resources: [sharedResources.selfTapeFeedback, sharedResources.podcast],
  },
  {
    chapterSlug: "professional-materials",
    slug: "actors-access",
    title: "Actors Access",
    subtitle:
      "A sample lesson on what parents actually need to understand about this profile platform before it becomes another source of confusion.",
    summary:
      "This lesson explains how a profile platform fits into the larger materials system so parents understand setup, maintenance, and what matters most.",
    teacherNote:
      "Families do better when they know what a platform is for and what it is not for.",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    keyTakeaways: [
      "Profiles should reflect readiness, not inflate it.",
      "Parents need clarity on which materials matter most inside the platform.",
      "Actors Access is one tool in the system, not the whole strategy.",
    ],
    relatedLessonSlugs: [
      "getting-multifaceted-shots-from-a-3-look-headshot-session",
      "headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos",
      "is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time",
    ],
    resources: [sharedResources.resume101, sharedResources.ecosystem],
  },
  {
    chapterSlug: "professional-materials",
    slug: "getting-multifaceted-shots-from-a-3-look-headshot-session",
    title: "Getting Multifaceted Shots From A 3 Look Headshot Session",
    subtitle:
      "A headshot timing and strategy lesson for parents who want useful images instead of a premature marketing package.",
    summary:
      "This lesson helps families understand what variety means in a headshot session and why useful range is different from dressing a child up as a collection of gimmicks.",
    teacherNote:
      "Headshot lessons need to reduce pressure. The classroom tone should make families feel smarter, not more sold to.",
    featuredImageSrc: images.chapterGettingStarted.src,
    featuredImageAlt: images.chapterGettingStarted.alt,
    keyTakeaways: [
      "Variety should still look like the same real child.",
      "Headshots work best when they match current readiness and type.",
      "Parents should understand timing before investing again.",
    ],
    relatedLessonSlugs: [
      "actors-access",
      "headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos",
      "the-business-side-to-acting",
    ],
    resources: [sharedResources.resume101, sharedResources.ecosystem],
  },
  {
    chapterSlug: "professional-materials",
    slug: "headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos",
    title:
      "Headshot Hacks Mastering The No Makeup Look For Your Child Actor Essential Makeup Tips For Perfect Photos",
    subtitle:
      "A practical lesson on keeping child actor headshots natural, accurate, and aligned with how casting actually wants to see young actors.",
    summary:
      "This lesson keeps the headshot conversation focused on authenticity and age-appropriate presentation rather than polished overcorrection.",
    teacherNote:
      "This is a narrow, reassuring lesson. It should answer one real parent question and then get out cleanly.",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    keyTakeaways: [
      "Casting needs to recognize the child quickly and accurately.",
      "Small preparation choices matter more than cosmetic polish.",
      "Useful materials are honest materials.",
    ],
    relatedLessonSlugs: [
      "getting-multifaceted-shots-from-a-3-look-headshot-session",
      "actors-access",
      "what-it-takes-to-be-a-successful-child-actor",
    ],
    resources: [sharedResources.ecosystem, sharedResources.resume101],
  },
  {
    chapterSlug: "parent-operations",
    slug: "the-business-side-to-acting",
    title: "The Business Side To Acting",
    subtitle:
      "A sample lesson about the routines, money awareness, and follow-through that make the child acting path workable for families.",
    summary:
      "This lesson shows that a family can be supportive and creative while still building practical systems around the work.",
    teacherNote:
      "This shelf matters because parents do not just need inspiration. They need operations.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "A business mindset reduces panic and missed details.",
      "Parent systems make better creative decisions possible.",
      "Organization is part of protecting the child.",
    ],
    relatedLessonSlugs: [
      "how-to-track-auditions-and-expenses",
      "tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
      "understanding-talent-rep-commissions-in-the-entertainment-industry",
    ],
    resources: [sharedResources.ecosystem, sharedResources.callback],
  },
  {
    chapterSlug: "parent-operations",
    slug: "how-to-track-auditions-and-expenses",
    title: "How To Track Auditions and Expenses",
    subtitle:
      "A sample lesson showing how the classroom can turn internal source material into a calm operational system for families.",
    summary:
      "This lesson helps parents keep a clearer view of auditions, spending, and follow-up so progress feels trackable instead of foggy.",
    teacherNote:
      "Tracking lowers stress because it replaces vague memory with a real family record.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Tracking is a support tool, not extra homework.",
      "Patterns become easier to see when families keep simple records.",
      "Operational clarity protects both money and momentum.",
    ],
    relatedLessonSlugs: [
      "the-business-side-to-acting",
      "tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
      "self-tape-equipment-for-child-actors",
    ],
    resources: [sharedResources.resume101, sharedResources.ecosystem],
  },
  {
    chapterSlug: "parent-operations",
    slug: "tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
    title:
      "Tax Guide For Parents Of Child Actors Navigating Taxes Without Losing Your Marbles",
    subtitle:
      "A parent-first lesson on records, expectations, and the calm systems that make tax time less mysterious.",
    summary:
      "This lesson frames taxes as part of the larger family operation rather than as a panic topic that only matters at the end of the year.",
    teacherNote:
      "The tone here should be steady and practical. Parents need clarity, not more fear.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Tax understanding starts with basic records and organization.",
      "Parents need educational clarity even when formal advice comes from a professional.",
      "Money systems connect directly to family calm.",
    ],
    relatedLessonSlugs: [
      "the-business-side-to-acting",
      "how-to-track-auditions-and-expenses",
      "what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor",
    ],
    resources: [sharedResources.ecosystem, sharedResources.callback],
  },
  {
    chapterSlug: "networking-professional-presence",
    slug: "networking-in-showbiz",
    title: "Networking in Showbiz",
    subtitle:
      "A relationship-first lesson on connecting professionally without turning every interaction into a pitch.",
    summary:
      "This lesson gives families a healthier definition of networking so their child can build genuine professional presence over time.",
    teacherNote:
      "Networking lessons should remove weirdness, not add pressure.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Networking is relationship-building, not constant asking.",
      "Parents can teach professional warmth without turning a child into a salesperson.",
      "Consistency and courtesy matter more than polished scripts.",
    ],
    relatedLessonSlugs: [
      "industry-event-networking-etiquette",
      "social-media-as-professional-presence",
      "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
    ],
    resources: [sharedResources.podcast, sharedResources.callback],
  },
  {
    chapterSlug: "networking-professional-presence",
    slug: "industry-event-networking-etiquette",
    title: "Industry Event Networking Etiquette",
    subtitle:
      "A sample lesson on helping families show up prepared, respectful, and easy to interact with at events.",
    summary:
      "This lesson turns event behavior into something teachable instead of intimidating, especially for parents supporting younger actors.",
    teacherNote:
      "Parents should finish feeling less nervous about the room, not more self-conscious.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Prepared introductions are more helpful than over-rehearsed pitches.",
      "Professional presence includes exits, follow-up, and reading the room.",
      "Event etiquette protects relationships before they even start.",
    ],
    relatedLessonSlugs: [
      "networking-in-showbiz",
      "social-media-as-professional-presence",
      "when-rejection-stings-helping-your-child-actor-bounce-back",
    ],
    resources: [sharedResources.podcast, sharedResources.callback],
  },
  {
    chapterSlug: "networking-professional-presence",
    slug: "social-media-as-professional-presence",
    title: "Social Media as Professional Presence",
    subtitle:
      "A classroom lesson on where online presence can help, where it can distract, and how families keep perspective.",
    summary:
      "This lesson positions social media as an optional professional tool rather than a requirement for legitimacy.",
    teacherNote:
      "This shelf should constantly remind parents that visibility is not the same thing as readiness.",
    featuredImageSrc: images.chapterRepresentation.src,
    featuredImageAlt: images.chapterRepresentation.alt,
    keyTakeaways: [
      "Social media should support the child, not consume the family.",
      "Professional presence can exist without constant posting.",
      "Boundaries matter more than aesthetic polish.",
    ],
    relatedLessonSlugs: [
      "networking-in-showbiz",
      "industry-event-networking-etiquette",
      "tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety",
    ],
    resources: [sharedResources.callback, sharedResources.podcast],
  },
  {
    chapterSlug: "wellness-resilience",
    slug: "when-rejection-stings-helping-your-child-actor-bounce-back",
    title: "When Rejection Stings Helping Your Child Actor Bounce Back",
    subtitle:
      "A support lesson for the moments when disappointment threatens to become identity, panic, or pressure.",
    summary:
      "This lesson models the Child Actor 101 tone at its most parent-centered by helping families respond to rejection with steadiness, perspective, and usable next steps.",
    teacherNote:
      "Rejection lessons are about family regulation as much as actor resilience.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Parents set the emotional climate after a hard audition outcome.",
      "Rejection needs context, not over-interpretation.",
      "A child can keep growing without making every outcome mean something permanent.",
    ],
    relatedLessonSlugs: [
      "maintaining-self-esteem-as-a-child-actor",
      "how-parents-support-without-pressuring",
      "what-makes-a-child-actors-self-tape-audition-competitive",
    ],
    resources: [sharedResources.callback, sharedResources.podcast],
  },
  {
    chapterSlug: "wellness-resilience",
    slug: "maintaining-self-esteem-as-a-child-actor",
    title: "Maintaining Self-Esteem as a Child Actor",
    subtitle:
      "A classroom lesson on protecting confidence and identity while a child participates in a high-feedback industry.",
    summary:
      "This lesson shows how the classroom can turn internal source material into a focused guide on self-worth, boundaries, and perspective.",
    teacherNote:
      "The strongest wellness lessons keep returning to the same question: what is protecting the child here?",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Self-esteem needs active protection, not vague encouragement.",
      "Parents can support confidence without tying worth to bookings.",
      "Career growth should never cost a child's sense of self.",
    ],
    relatedLessonSlugs: [
      "when-rejection-stings-helping-your-child-actor-bounce-back",
      "how-parents-support-without-pressuring",
      "what-it-takes-to-be-a-successful-child-actor",
    ],
    resources: [sharedResources.callback, sharedResources.podcast],
  },
  {
    chapterSlug: "wellness-resilience",
    slug: "how-parents-support-without-pressuring",
    title: "How Parents Support Without Pressuring",
    subtitle:
      "A parent-facing lesson on encouragement, boundaries, and the difference between guidance and emotional over-management.",
    summary:
      "This lesson helps adults stay useful to the child actor without accidentally becoming a source of performance stress.",
    teacherNote:
      "Parents come here because they care deeply. The lesson should help them feel guided, not blamed.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Support works best when it stays specific, calm, and non-performative.",
      "Pressure often hides inside good intentions.",
      "A healthier family tone makes stronger long-term work possible.",
    ],
    relatedLessonSlugs: [
      "when-rejection-stings-helping-your-child-actor-bounce-back",
      "maintaining-self-esteem-as-a-child-actor",
      "what-it-takes-to-be-a-successful-child-actor",
    ],
    resources: [sharedResources.startHere, sharedResources.callback],
  },
  {
    chapterSlug: "safety-ethics",
    slug: "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
    title: "The New Hollywood Casting Scam Every Parent Needs To Know About",
    subtitle:
      "A prototype lesson on recognizing pressure tactics, false urgency, and the kinds of offers that target new families.",
    summary:
      "This lesson demonstrates how the classroom can treat scam prevention as education and protection rather than as fear-based content.",
    teacherNote:
      "Safety lessons build trust fast when they are concrete, calm, and specific.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Urgency and confusion are common scam tools.",
      "Parents should know the difference between real guidance and a sales trap.",
      "The safest next step is usually to slow down and verify.",
    ],
    relatedLessonSlugs: [
      "what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor",
      "tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety",
      "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
    ],
    resources: [sharedResources.startHere, sharedResources.callback],
  },
  {
    chapterSlug: "safety-ethics",
    slug: "what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor",
    title: "What Is A Coogan Account And Do I Need One For My Child Actor",
    subtitle:
      "A family-protection lesson on one of the most common money and legal questions new parents hear early.",
    summary:
      "This lesson gives parents a clear, non-jargony orientation to what a Coogan account is and why it belongs in the larger protection conversation.",
    teacherNote:
      "Keep the legal explanation simple first. Parents can go deeper once the core purpose is clear.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Protection topics should feel understandable long before paperwork shows up.",
      "Money clarity is part of child protection.",
      "Parents do not need legal jargon to understand the purpose of a safeguard.",
    ],
    relatedLessonSlugs: [
      "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
      "tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
      "what-it-takes-to-be-a-successful-child-actor",
    ],
    resources: [sharedResources.startHere, sharedResources.callback],
  },
  {
    chapterSlug: "safety-ethics",
    slug: "tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety",
    title: "Tiktok And Your Child Actor A Guide To Creativity Connection And Safety",
    subtitle:
      "A modern classroom lesson on balancing creative participation, visibility, privacy, and family boundaries online.",
    summary:
      "This lesson explains how a parent can think about TikTok without treating it as either a magic career tool or an automatic requirement.",
    teacherNote:
      "Online safety lessons need nuance. Parents are looking for boundaries, not absolutism.",
    featuredImageSrc: images.chapterForParents.src,
    featuredImageAlt: images.chapterForParents.alt,
    keyTakeaways: [
      "Visibility is optional. Safety is not.",
      "Parents need clear rules for privacy, DMs, and account oversight.",
      "A platform should serve the family plan, not drive it.",
    ],
    relatedLessonSlugs: [
      "social-media-as-professional-presence",
      "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
      "what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor",
    ],
    resources: [sharedResources.callback, sharedResources.podcast],
  },
  {
    chapterSlug: "career-growth",
    slug: "olympic-level-training-for-aspiring-young-actors-why-consistency-is-key",
    title: "Olympic Level Training For Aspiring Young Actors Why Consistency Is Key",
    subtitle:
      "A growth lesson on why patient, repeated skill-building matters more than bursts of intensity.",
    summary:
      "This lesson helps parents see training as a long-term rhythm that strengthens craft, confidence, and professionalism over time.",
    teacherNote:
      "Career growth should sound steady in the classroom. It is not a hype shelf.",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    keyTakeaways: [
      "Consistency produces stronger actors than urgency.",
      "Training is a long-game habit, not a branding accessory.",
      "Parents need to pace development without chasing every short-term win.",
    ],
    relatedLessonSlugs: [
      "why-i-rebuilt-the-entire-actor-training-program",
      "the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-is-just-a-hobbyist",
      "when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age",
    ],
    resources: [sharedResources.ecosystem, sharedResources.podcast],
  },
  {
    chapterSlug: "career-growth",
    slug: "why-i-rebuilt-the-entire-actor-training-program",
    title: "Why I Rebuilt The Entire Actor Training Program",
    subtitle:
      "A lesson prototype about what strong training is supposed to accomplish for a young actor and their family.",
    summary:
      "This lesson helps readers understand the standards behind a more intentional training system without turning the page into a sales pitch.",
    teacherNote:
      "Even when the topic touches products, the public lesson should stay educational first.",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    keyTakeaways: [
      "Training should solve real developmental needs, not just create activity.",
      "Families deserve clarity about why a program is structured the way it is.",
      "Growth shelves should always lead back to skill and sustainability.",
    ],
    relatedLessonSlugs: [
      "olympic-level-training-for-aspiring-young-actors-why-consistency-is-key",
      "the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-is-just-a-hobbyist",
      "what-it-takes-to-be-a-successful-child-actor",
    ],
    resources: [sharedResources.ecosystem, sharedResources.podcast],
  },
  {
    chapterSlug: "career-growth",
    slug: "the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-is-just-a-hobbyist",
    title: "The Harsh Truth If Youre Not Taking Training Seriously Your Kid Is Just A Hobbyist",
    subtitle:
      "A growth lesson that reframes seriousness as commitment to skill, not pressure for faster outcomes.",
    summary:
      "This lesson gives the prototype a stronger point of view about the role of training while still keeping the tone practical and non-performative.",
    teacherNote:
      "The classroom version should keep the conviction but remove any unnecessary shame language.",
    featuredImageSrc: images.chapterTechnique.src,
    featuredImageAlt: images.chapterTechnique.alt,
    keyTakeaways: [
      "Skill development deserves consistent attention if the goal is professional work.",
      "Seriousness should be measured by process, not by image.",
      "Parents can raise the standard without increasing household panic.",
    ],
    relatedLessonSlugs: [
      "olympic-level-training-for-aspiring-young-actors-why-consistency-is-key",
      "why-i-rebuilt-the-entire-actor-training-program",
      "maintaining-self-esteem-as-a-child-actor",
    ],
    resources: [sharedResources.ecosystem, sharedResources.callback],
  },
];

const lessonMap = new Map(classroomLessons.map((lesson) => [lesson.slug, lesson]));

export const classroomFeaturedLessonSlugs = [
  "what-it-takes-to-be-a-successful-child-actor",
  "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
  "self-tape-equipment-for-child-actors",
  "actors-access",
  "the-business-side-to-acting",
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

export function getClassroomPlaceholderSections(
  lesson: ClassroomLesson,
  chapter: ClassroomChapter,
): ClassroomLessonSection[] {
  return [
    {
      heading: "Why this lesson lives in the classroom",
      paragraphs: [
        `${lesson.title} belongs in the ${chapter.title} chapter because it answers a recurring parent question in a more structured way than a traditional blog archive would.`,
        `For the prototype, this page uses short sample copy instead of a full imported lesson so we can see how the educational layout scales across the library.`,
      ],
    },
    {
      heading: "What the finished lesson will do",
      paragraphs: [
        `${lesson.summary} In the finished library, this section would expand the explanation with examples, calmer framing, and one clear next step for the reader.`,
        `The important part here is the flow: context, education, takeaways, related tools, and a guided path into the next lesson instead of a dead end.`,
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
