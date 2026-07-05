export interface PageRecipeIllustrationGuidance {
  avoidNotes: string[];
  imageRatio: string;
  placement: string;
  purpose: string;
  requirement: "required" | "optional";
  suggestedComposition: string;
}

export interface PageRecipeDefinition {
  bestUseCase: string;
  illustration: PageRecipeIllustrationGuidance;
  optionalSections: string[];
  purpose: string;
  requiredSections: string[];
  slug: string;
  title: string;
}

export interface SupportComponentDoc {
  avoidNotes: string[];
  contentModel: string[];
  exampleUsage: string;
  name: string;
  purpose: string;
  whenToUse: string;
}

export const pageRecipeIllustrationRules = [
  "Illustrations support comprehension, not decoration.",
  "Use one clear subject or one readable family moment per image.",
  "Keep the tone warm, editorial, and classroom-inspired.",
  "Show diverse young actors and families.",
  "Avoid fake Hollywood glamour, red carpets, paparazzi, money imagery, and predatory agent-office cliches.",
  "Reuse the existing image and content utilities whenever possible.",
];

export const pageRecipes: PageRecipeDefinition[] = [
  {
    slug: "door-landing-page",
    title: "Door Landing Page",
    purpose:
      "Problem-first landing pages that route parents by immediate need before introducing one useful next step.",
    bestUseCase:
      "Use for Five Doors entries such as audition triage, scam prevention, representation readiness, or training intent.",
    requiredSections: [
      "Hero",
      "Problem statement or first answer",
      "Focused educational content",
      "One recommended next step",
      "Related classroom guidance",
      "Email magnet or newsletter capture",
      "Final CTA",
    ],
    optionalSections: [
      "FAQ",
      "Proof-point or testimonial band",
      "Comparison grid",
      "Directory or tool spotlight",
    ],
    illustration: {
      placement: "Hero support panel or first educational section",
      purpose:
        "Help parents recognize the exact pressure point quickly and make the page feel calmer before the copy asks for any decision.",
      suggestedComposition:
        "One parent and one young actor in a specific moment: checking a self tape, reviewing materials, or pausing before a purchase or submission.",
      imageRatio: "4:3",
      requirement: "optional",
      avoidNotes: [
        "Do not show red carpets, step-and-repeat walls, paparazzi flashes, or luxury-office fantasy scenes.",
        "Do not crowd the frame with multiple disconnected actions.",
      ],
    },
  },
  {
    slug: "product-tool-page",
    title: "Product / Tool Page",
    purpose:
      "Explain a focused offer, clarify who it is for, and connect it back to the classroom or next right action.",
    bestUseCase:
      "Use for tools such as Resume101, Pages101, feedback services, checklists, or waitlist pages.",
    requiredSections: [
      "Hero",
      "Who it helps",
      "How it works",
      "What it includes",
      "Related classroom guidance",
      "Primary CTA",
    ],
    optionalSections: [
      "FAQ",
      "Proof-point band",
      "Preparation checklist",
      "Secondary CTA",
    ],
    illustration: {
      placement: "Hero media area or feature explainer card",
      purpose:
        "Show the tool in context so the user understands the practical outcome instead of imagining abstract software or generic dashboards.",
      suggestedComposition:
        "One actor or parent using a single focal artifact such as a resume, tablet, self tape setup, or checklist in a clean editorial scene.",
      imageRatio: "3:2",
      requirement: "optional",
      avoidNotes: [
        "Do not render fake analytics dashboards or generic SaaS mockups if the page is really about a family workflow.",
        "Avoid sterile product-marketing compositions with no human context.",
      ],
    },
  },
  {
    slug: "ecosystem-platform-page",
    title: "Ecosystem / Platform Page",
    purpose:
      "Map how the platform fits together so families can understand pathways, tools, and training without feeling sold from every direction.",
    bestUseCase:
      "Use for platform overviews, ecosystem maps, or pages that connect multiple product and education layers together.",
    requiredSections: [
      "Hero",
      "Platform explanation",
      "Pathways or hubs",
      "Preparation and support areas",
      "Classroom connection",
      "Newsletter",
    ],
    optionalSections: [
      "Guided journeys",
      "Proof-point band",
      "Directory spotlight",
      "FAQ",
    ],
    illustration: {
      placement: "Hero support block or overview card cluster",
      purpose:
        "Give the platform a human point of entry so the page feels like a learning environment, not a sitemap dump.",
      suggestedComposition:
        "One family or actor navigating a visible set of materials, screens, or chapter-like resources with a clear focal subject.",
      imageRatio: "4:3",
      requirement: "optional",
      avoidNotes: [
        "Avoid collage overload or a dozen floating interface windows fighting for attention.",
        "Do not use money, celebrity, or agency-office cliches to explain the ecosystem.",
      ],
    },
  },
  {
    slug: "classroom-chapter-page",
    title: "Classroom Chapter Page",
    purpose:
      "Introduce a lesson shelf, explain what the chapter covers, and help readers choose their next lesson intelligently.",
    bestUseCase:
      "Use for chapter landing pages inside From the Classroom where multiple lessons are grouped by one career topic.",
    requiredSections: [
      "Hero",
      "Chapter framing",
      "Lesson shelf or featured cards",
      "How this chapter works",
      "Newsletter or follow-up",
    ],
    optionalSections: [
      "Teacher note",
      "Related resources",
      "Proof-point band",
      "Cross-links to another chapter",
    ],
    illustration: {
      placement: "Hero image or featured chapter card",
      purpose:
        "Signal the chapter theme before the reader opens a lesson so the shelf feels like a real curriculum chapter, not a blog index.",
      suggestedComposition:
        "One young actor or family in a scene that visually reflects the chapter topic, such as preparation, resilience, materials, or representation context.",
      imageRatio: "4:3",
      requirement: "required",
      avoidNotes: [
        "Avoid generic stock-article energy with a laptop and no emotional clue.",
        "Do not show multiple unrelated mini-scenes in one frame.",
      ],
    },
  },
  {
    slug: "classroom-lesson-page",
    title: "Classroom Lesson Page",
    purpose:
      "Teach one parent question clearly, provide structured guidance, and connect that lesson to the next useful resource or lesson.",
    bestUseCase:
      "Use for individual lesson pages inside From the Classroom.",
    requiredSections: [
      "Hero",
      "Teacher note or framing",
      "Main lesson content",
      "Key takeaways",
      "Related lessons or resources",
      "Next step",
      "Newsletter follow-up",
    ],
    optionalSections: [
      "Podcast episode",
      "FAQ",
      "Proof-point band",
      "Downloadable checklist",
    ],
    illustration: {
      placement: "Hero image at the top of the lesson",
      purpose:
        "Carry the emotional idea of the lesson before the first paragraph so complex topics feel more approachable and human.",
      suggestedComposition:
        "One strong subject in a specific emotional beat that matches the lesson question: a focused actor, a cautious parent, a calm prep moment, or a resilient recovery beat.",
      imageRatio: "4:3",
      requirement: "required",
      avoidNotes: [
        "Avoid empty glamour poses, no-context headshots, or generic celebrity tropes.",
        "Do not use decorative images that fail to reinforce the lesson question.",
      ],
    },
  },
];

export const supportComponentDocs: SupportComponentDoc[] = [
  {
    name: "NewsletterSignup",
    purpose:
      "Reusable email-magnet or subscribe block that can represent a checklist, waitlist, or recurring newsletter CTA without pretending to submit in-app.",
    whenToUse:
      "Use when the page needs an embedded subscribe or magnet moment with one clear external action.",
    contentModel: [
      "eyebrow",
      "title",
      "description",
      "ctaLabel",
      "actionUrl or href",
      "variant: default | compact | panel",
    ],
    exampleUsage:
      "First 30 Days Checklist, Red Flags Checklist, Night-Before Audition Checklist, Open Call Waitlist, Free Monthly Class updates.",
    avoidNotes: [
      "Do not imply a working internal form if the page only links out.",
      "Do not bury the CTA under multiple equally loud secondary actions.",
    ],
  },
  {
    name: "RelatedLessons",
    purpose:
      "Reusable lesson-guidance block for surfacing existing classroom routes without hand-building card grids on every page.",
    whenToUse:
      "Use near the bottom of door pages, product pages, and lessons whenever the next best action is educational context.",
    contentModel: [
      "title",
      "description",
      "lessons[]: title, href, chapter, summary, image optional",
      "fallbackHref optional",
      "variant optional",
    ],
    exampleUsage:
      "Door pages can point to classroom lessons, chapter shelves, or temporary fallbacks to /from-the-classroom when a direct lesson URL is not ready.",
    avoidNotes: [
      "Do not invent completed lesson URLs that are not already in use.",
      "Do not overload the block with unrelated lessons just to fill space.",
    ],
  },
  {
    name: "NextStepCTA",
    purpose:
      "Single-focus CTA block for closing a page with one dominant next action and one quieter secondary path.",
    whenToUse:
      "Use at the bottom of door pages, lesson pages, and support pages when the reader should leave knowing the exact next move.",
    contentModel: [
      "eyebrow",
      "title",
      "description",
      "primaryLabel",
      "primaryHref",
      "secondaryLabel optional",
      "secondaryHref optional",
      "variant: default | warm | dark | minimal",
    ],
    exampleUsage:
      "Start preparing, browse the directory, join the waitlist, or get feedback.",
    avoidNotes: [
      "Do not give the secondary action the same visual weight as the primary action.",
      "Do not stack three or four CTAs into this component.",
    ],
  },
  {
    name: "TestimonialBand",
    purpose:
      "Short social-proof or proof-point strip that can carry real testimonials or safe factual credibility statements.",
    whenToUse:
      "Use when a page benefits from confidence-building evidence but does not need a long testimonial section.",
    contentModel: [
      "eyebrow optional",
      "title",
      "testimonials[]: quote, attribution optional, context optional",
      "variant optional",
    ],
    exampleUsage:
      "Door pages can use proof-point mode with statements such as built from years of coaching young actors or designed by a former child actor and youth talent manager.",
    avoidNotes: [
      "Do not fabricate quotes or attributions.",
      "Do not label public-facing proof points as placeholders.",
    ],
  },
];
