export interface FiveDoorCard {
  description: string;
  href: string;
  title: string;
}

export interface DoorAnswerCard {
  description: string;
  title: string;
}

export interface DoorResourceCard {
  actionLabel: string;
  description: string;
  eyebrow: string;
  href: string;
  title: string;
}

export interface DoorPageContent {
  freeFirstAnswerCards: DoorAnswerCard[];
  freeFirstAnswerDescription: string;
  freeFirstAnswerTitle: string;
  heroDescription: string;
  heroHighlights: string[];
  heroLabel: string;
  heroPanelDescription: string;
  heroPanelLabel: string;
  heroPanelTitle: string;
  heroPrimaryActionHref: string;
  heroPrimaryActionLabel: string;
  heroSecondaryActionHref?: string;
  heroSecondaryActionLabel?: string;
  heroSupportingPoints: string[];
  heroTitle: string;
  newsletterDescription: string;
  newsletterLabel: string;
  newsletterTitle: string;
  nextStepDescription: string;
  nextStepPrimaryHref: string;
  nextStepPrimaryLabel: string;
  nextStepSecondaryHref?: string;
  nextStepSecondaryLabel?: string;
  nextStepTitle: string;
  relatedGuidanceCards: DoorResourceCard[];
  relatedGuidanceDescription: string;
  relatedGuidanceTitle: string;
}

export const fiveDoorCards: FiveDoorCard[] = [
  {
    title: "We’re just getting started",
    description: "New to child acting? Start with the calm roadmap before you spend money.",
    href: "/start-here",
  },
  {
    title: "We have an audition — help",
    description:
      "Self tape, slate, memorization, setup, and callback help when the deadline is close.",
    href: "/audition-help",
  },
  {
    title: "Before you pay anyone…",
    description:
      "Check red flags, realistic costs, headshots, vendors, and scam warnings before you sign or spend.",
    href: "/before-you-pay",
  },
  {
    title: "We’re ready for an agent or manager",
    description:
      "Learn what reps look for, how to submit, and how to get ready for open calls.",
    href: "/get-represented",
  },
  {
    title: "We’re ready to take this seriously",
    description:
      "Training, coaching, craft, and next-level preparation for committed young actors.",
    href: "/training",
  },
];

export const auditionHelpPage: DoorPageContent = {
  heroLabel: "Audition Help",
  heroTitle: "You have an audition. Let’s calm the room.",
  heroDescription:
    "When the deadline is close, you do not need twelve opinions. You need the setup, the slate, the scene, and one smart next step.",
  heroPrimaryActionHref: "#free-first-answer",
  heroPrimaryActionLabel: "Start here",
  heroSecondaryActionHref: "/ecosystem#self-tape-feedback",
  heroSecondaryActionLabel: "Get Self Tape Feedback",
  heroSupportingPoints: ["Less panic", "Cleaner setup", "Faster decisions"],
  heroPanelLabel: "When time is short",
  heroPanelTitle: "Start with the basics that change the tape.",
  heroPanelDescription:
    "Calm auditions come from a clear setup, a watchable slate, a prepared scene, and one useful note before you send.",
  heroHighlights: [
    "Set up a tape parents can actually manage.",
    "Help the actor prepare without creating more urgency.",
  ],
  freeFirstAnswerTitle: "Free first answer",
  freeFirstAnswerDescription:
    "Start with the practical pieces that usually create the most stress when a self tape deadline suddenly appears.",
  freeFirstAnswerCards: [
    {
      title: "Self Tape Setup Guide",
      description:
        "Get the framing, lighting, eyeline, and room basics steady before you start solving performance problems.",
    },
    {
      title: "Memorization Guide",
      description:
        "Use a repeatable, age-appropriate rhythm for getting lines in without turning the whole house tense.",
    },
    {
      title: "Zoom Callback Guide",
      description:
        "Keep callback tech, eye contact, and parent support clean so the actor can stay present.",
    },
    {
      title: "Slate Basics",
      description:
        "A good slate is short, grounded, and watchable. It should help the actor, not compete with them.",
    },
  ],
  nextStepTitle: "Need eyes on the tape?",
  nextStepDescription:
    "Self Tape Feedback is the fastest way to get focused notes before you send. If you need a stronger rehearsal structure, Prep101 is the next layer.",
  nextStepPrimaryHref: "/ecosystem#self-tape-feedback",
  nextStepPrimaryLabel: "Get Self Tape Feedback",
  nextStepSecondaryHref: "/ecosystem#prep101",
  nextStepSecondaryLabel: "Use Prep101",
  relatedGuidanceTitle: "Related guidance",
  relatedGuidanceDescription:
    "These existing classroom routes cover the pieces families usually need when auditions get noisy.",
  relatedGuidanceCards: [
    {
      title: "Auditions chapter",
      description:
        "Open the full shelf of audition lessons when you need more than one quick answer.",
      href: "/from-the-classroom/auditions",
      actionLabel: "Browse audition lessons",
      eyebrow: "Classroom chapter",
    },
    {
      title: "Self Tape Equipment for Child Actors",
      description:
        "A practical lesson on what equipment actually helps and what usually just creates cost and clutter.",
      href: "/from-the-classroom/auditions/self-tape-equipment-for-child-actors",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
    {
      title: "How to Build a Better Audition Slate",
      description:
        "Use a cleaner slate structure that keeps the focus on the actor instead of over-directing the moment.",
      href: "/from-the-classroom/auditions/how-to-build-a-better-audition-slate",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
    {
      title: "What Makes a Child Actor’s Self Tape Competitive",
      description:
        "A grounded breakdown of the choices that make a tape easier for casting to trust and finish watching.",
      href: "/from-the-classroom/auditions/what-makes-a-child-actors-self-tape-competitive",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
  ],
  newsletterTitle: "Keep the next audition calmer.",
  newsletterDescription:
    "The Callback keeps parents close to practical guidance between auditions, with honest notes on prep, self tapes, and what actually matters when the room is moving fast.",
  newsletterLabel: "Email follow-up",
};

export const beforeYouPayPage: DoorPageContent = {
  heroLabel: "Before You Pay Anyone",
  heroTitle: "A little caution can save thousands.",
  heroDescription:
    "Before you buy headshots, sign with a program, pay for a showcase, or trust a too-perfect opportunity, check the red flags first.",
  heroPrimaryActionHref: "#free-first-answer",
  heroPrimaryActionLabel: "Start here",
  heroSecondaryActionHref: "/ecosystem#directory",
  heroSecondaryActionLabel: "Browse the Directory",
  heroSupportingPoints: ["Red flags first", "Cost clarity", "Calmer decisions"],
  heroPanelLabel: "What to protect",
  heroPanelTitle: "Money should follow clarity, not pressure.",
  heroPanelDescription:
    "The goal is not to avoid every expense. The goal is to tell the difference between a useful investment and a rushed decision.",
  heroHighlights: [
    "Look for timing, pressure, and credibility before you spend.",
    "Choose vendors and services that match the actor’s actual stage.",
  ],
  freeFirstAnswerTitle: "Free first answer",
  freeFirstAnswerDescription:
    "These are the first checks to make before signing, paying, or committing to a service that sounds urgent.",
  freeFirstAnswerCards: [
    {
      title: "Scam Red Flags",
      description:
        "Spot the language, urgency, and promises that usually signal a business is selling fear, not helping families.",
    },
    {
      title: "Headshot Guide",
      description:
        "Know when photos are useful, what quality actually matters, and how to avoid buying a package too early.",
    },
    {
      title: "What Things Really Cost",
      description:
        "Get a more realistic picture of what families spend so you can separate essential costs from expensive noise.",
    },
    {
      title: "Check the Directory",
      description:
        "Use vetted options as a starting point when you need vendors, photographers, or other support.",
    },
  ],
  nextStepTitle: "Check the Directory before you sign.",
  nextStepDescription:
    "Find vetted vendors, compare options, and make calmer decisions before spending real money.",
  nextStepPrimaryHref: "/ecosystem#directory",
  nextStepPrimaryLabel: "Browse the Directory",
  relatedGuidanceTitle: "Related guidance",
  relatedGuidanceDescription:
    "These existing lessons help families slow down, verify the basics, and make cleaner spending decisions.",
  relatedGuidanceCards: [
    {
      title: "Safety & Ethics chapter",
      description:
        "Browse the shelf built for scams, boundaries, legal basics, and early-stage parent protection.",
      href: "/from-the-classroom/safety-ethics",
      actionLabel: "Browse safety lessons",
      eyebrow: "Classroom chapter",
    },
    {
      title: "The New Hollywood Casting Scam Every Parent Needs to Know About",
      description:
        "A plain-English lesson on one of the most common scam patterns targeting hopeful families.",
      href: "/from-the-classroom/safety-ethics/the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
    {
      title: "When to Update Child Actor Headshots",
      description:
        "A practical timing lesson that helps families avoid expensive photo decisions made for the wrong reason.",
      href: "/from-the-classroom/professional-materials/when-to-update-child-actor-headshots",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
    {
      title: "Child Acting Budget: What Families Really Spend",
      description:
        "Use a more grounded budget lens before treating every recommended service like a required step.",
      href: "/from-the-classroom/parent-operations/child-acting-budget-what-families-really-spend",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
  ],
  newsletterTitle: "Get the next useful warning before you overspend.",
  newsletterDescription:
    "The Callback keeps parents close to practical guidance on scams, spending, headshots, and the judgment calls that usually show up before money leaves the bank account.",
  newsletterLabel: "Email follow-up",
};

export const getRepresentedPage: DoorPageContent = {
  heroLabel: "Representation",
  heroTitle: "Ready for an agent or manager?",
  heroDescription:
    "Representation is not the first step. It is the right step when the actor, materials, and family are ready.",
  heroPrimaryActionHref: "#free-first-answer",
  heroPrimaryActionLabel: "Start here",
  heroSecondaryActionHref: "/ecosystem#open-calls",
  heroSecondaryActionLabel: "Join the Open Call Waitlist",
  heroSupportingPoints: ["Readiness first", "Cleaner submissions", "Better timing"],
  heroPanelLabel: "What reps want",
  heroPanelTitle: "Readiness is more than just wanting representation.",
  heroPanelDescription:
    "The strongest submissions come from actors with some training, parents with realistic expectations, and materials that match the child’s current level.",
  heroHighlights: [
    "Use representation to support momentum, not create it from scratch.",
    "Focus on fit, etiquette, and timing before mass-submitting.",
  ],
  freeFirstAnswerTitle: "Free first answer",
  freeFirstAnswerDescription:
    "These are the first questions to answer before you start chasing agents, managers, or open calls.",
  freeFirstAnswerCards: [
    {
      title: "Agent vs. Manager",
      description:
        "Understand the role difference so your family can evaluate help more clearly and avoid mismatched expectations.",
    },
    {
      title: "Is My Child Ready?",
      description:
        "Look at training, materials, professionalism, and family bandwidth before deciding representation should be next.",
    },
    {
      title: "Submission Etiquette",
      description:
        "Good etiquette makes your materials easier to trust and keeps you from creating avoidable first-impression problems.",
    },
    {
      title: "What Reps Actually Look For",
      description:
        "Readiness usually looks like skill, materials, professionalism, and long-term potential more than urgency.",
    },
  ],
  nextStepTitle: "Get ready for the next open call.",
  nextStepDescription:
    "Join the representation waitlist and start preparing the materials reps actually want to see.",
  nextStepPrimaryHref: "/ecosystem#open-calls",
  nextStepPrimaryLabel: "Join the Open Call Waitlist",
  nextStepSecondaryHref: "/from-the-classroom/representation",
  nextStepSecondaryLabel: "Read representation lessons",
  relatedGuidanceTitle: "Related guidance",
  relatedGuidanceDescription:
    "These classroom lessons cover the readiness questions most families need to settle before they submit.",
  relatedGuidanceCards: [
    {
      title: "Representation chapter",
      description:
        "Browse the full representation shelf for agents, managers, timing, commissions, and parent strategy.",
      href: "/from-the-classroom/representation",
      actionLabel: "Browse representation lessons",
      eyebrow: "Classroom chapter",
    },
    {
      title: "Agents vs. Managers for Child Actors",
      description:
        "A clean breakdown of how the two roles differ and how that difference affects family decision-making.",
      href: "/from-the-classroom/representation/agents-vs-managers-for-child-actors",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
    {
      title: "Is My Child Ready for an Agent?",
      description:
        "Use this readiness lens before assuming representation is the next required step.",
      href: "/from-the-classroom/representation/is-my-child-ready-for-an-agent",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
    {
      title: "Understanding Talent Rep Commissions",
      description:
        "A practical money lesson that helps parents evaluate terms and expectations more clearly.",
      href: "/from-the-classroom/representation/understanding-talent-rep-commissions",
      actionLabel: "Read lesson",
      eyebrow: "Classroom lesson",
    },
  ],
  newsletterTitle: "Stay ready without rushing the process.",
  newsletterDescription:
    "The Callback helps families move toward representation with more clarity around readiness, submissions, and the career steps that should happen before a rep enters the picture.",
  newsletterLabel: "Email follow-up",
};
