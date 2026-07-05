# Page Recipes

Internal guidance for the reusable page recipes and shared support components that power the Five Doors pages and future classroom surfaces.

## Illustration Rules

- Illustrations support comprehension, not decoration.
- Use one clear subject or one readable family moment per image.
- Keep the tone warm, editorial, and classroom-inspired.
- Show diverse young actors and families.
- Avoid fake Hollywood glamour, red carpets, paparazzi, money imagery, and predatory agent-office cliches.
- Reuse the existing image and content utilities whenever possible.

## Door Landing Page

Purpose:
Problem-first landing pages that route parents by immediate need before introducing one useful next step.

When to use:
Use for Five Doors entries such as audition triage, scam prevention, representation readiness, or training intent.

Required sections:
- Hero
- Problem statement or first answer
- Focused educational content
- One recommended next step
- Related classroom guidance
- Email magnet or newsletter capture
- Final CTA

Optional sections:
- FAQ
- Proof-point or testimonial band
- Comparison grid
- Directory or tool spotlight

Illustration guidance:
- Placement: Hero support panel or first educational section
- Purpose: Help parents recognize the exact pressure point quickly and make the page feel calmer before the copy asks for any decision
- Suggested composition: One parent and one young actor in a specific moment such as checking a self tape, reviewing materials, or pausing before a purchase or submission
- Image ratio: 4:3
- Required or optional: Optional

Avoid notes:
- Do not show red carpets, step-and-repeat walls, paparazzi flashes, or luxury-office fantasy scenes
- Do not crowd the frame with multiple disconnected actions

## Product / Tool Page

Purpose:
Explain a focused offer, clarify who it is for, and connect it back to the classroom or next right action.

When to use:
Use for tools such as Resume101, Pages101, feedback services, checklists, or waitlist pages.

Required sections:
- Hero
- Who it helps
- How it works
- What it includes
- Related classroom guidance
- Primary CTA

Optional sections:
- FAQ
- Proof-point band
- Preparation checklist
- Secondary CTA

Illustration guidance:
- Placement: Hero media area or feature explainer card
- Purpose: Show the tool in context so the user understands the practical outcome instead of imagining abstract software or generic dashboards
- Suggested composition: One actor or parent using a single focal artifact such as a resume, tablet, self tape setup, or checklist in a clean editorial scene
- Image ratio: 3:2
- Required or optional: Optional

Avoid notes:
- Do not render fake analytics dashboards or generic SaaS mockups if the page is really about a family workflow
- Avoid sterile product-marketing compositions with no human context

## Ecosystem / Platform Page

Purpose:
Map how the platform fits together so families can understand pathways, tools, and training without feeling sold from every direction.

When to use:
Use for platform overviews, ecosystem maps, or pages that connect multiple product and education layers together.

Required sections:
- Hero
- Platform explanation
- Pathways or hubs
- Preparation and support areas
- Classroom connection
- Newsletter

Optional sections:
- Guided journeys
- Proof-point band
- Directory spotlight
- FAQ

Illustration guidance:
- Placement: Hero support block or overview card cluster
- Purpose: Give the platform a human point of entry so the page feels like a learning environment, not a sitemap dump
- Suggested composition: One family or actor navigating a visible set of materials, screens, or chapter-like resources with a clear focal subject
- Image ratio: 4:3
- Required or optional: Optional

Avoid notes:
- Avoid collage overload or a dozen floating interface windows fighting for attention
- Do not use money, celebrity, or agency-office cliches to explain the ecosystem

## Classroom Chapter Page

Purpose:
Introduce a lesson shelf, explain what the chapter covers, and help readers choose their next lesson intelligently.

When to use:
Use for chapter landing pages inside From the Classroom where multiple lessons are grouped by one career topic.

Required sections:
- Hero
- Chapter framing
- Lesson shelf or featured cards
- How this chapter works
- Newsletter or follow-up

Optional sections:
- Teacher note
- Related resources
- Proof-point band
- Cross-links to another chapter

Illustration guidance:
- Placement: Hero image or featured chapter card
- Purpose: Signal the chapter theme before the reader opens a lesson so the shelf feels like a real curriculum chapter, not a blog index
- Suggested composition: One young actor or family in a scene that visually reflects the chapter topic, such as preparation, resilience, materials, or representation context
- Image ratio: 4:3
- Required or optional: Required

Avoid notes:
- Avoid generic stock-article energy with a laptop and no emotional clue
- Do not show multiple unrelated mini-scenes in one frame

## Classroom Lesson Page

Purpose:
Teach one parent question clearly, provide structured guidance, and connect that lesson to the next useful resource or lesson.

When to use:
Use for individual lesson pages inside From the Classroom.

Required sections:
- Hero
- Teacher note or framing
- Main lesson content
- Key takeaways
- Related lessons or resources
- Next step
- Newsletter follow-up

Optional sections:
- Podcast episode
- FAQ
- Proof-point band
- Downloadable checklist

Illustration guidance:
- Placement: Hero image at the top of the lesson
- Purpose: Carry the emotional idea of the lesson before the first paragraph so complex topics feel more approachable and human
- Suggested composition: One strong subject in a specific emotional beat that matches the lesson question, such as a focused actor, a cautious parent, a calm prep moment, or a resilient recovery beat
- Image ratio: 4:3
- Required or optional: Required

Avoid notes:
- Avoid empty glamour poses, no-context headshots, or generic celebrity tropes
- Do not use decorative images that fail to reinforce the lesson question

## Shared Support Components

### NewsletterSignup

Purpose:
Reusable email-magnet or subscribe block that can represent a checklist, waitlist, or recurring newsletter CTA without pretending to submit in-app.

When to use:
Use when the page needs an embedded subscribe or magnet moment with one clear external action.

Props / content model:
- `eyebrow`
- `title`
- `description`
- `ctaLabel`
- `actionUrl` or `href`
- `variant: default | compact | panel`

Example usage:
First 30 Days Checklist, Red Flags Checklist, Night-Before Audition Checklist, Open Call Waitlist, Free Monthly Class updates.

Avoid notes:
- Do not imply a working internal form if the page only links out
- Do not bury the CTA under multiple equally loud secondary actions

### RelatedLessons

Purpose:
Reusable lesson-guidance block for surfacing existing classroom routes without hand-building card grids on every page.

When to use:
Use near the bottom of door pages, product pages, and lessons whenever the next best action is educational context.

Props / content model:
- `title`
- `description`
- `lessons[]: title, href, chapter, summary, image optional`
- `fallbackHref optional`
- `variant optional`

Example usage:
Door pages can point to classroom lessons, chapter shelves, or temporary fallbacks to `/from-the-classroom` when a direct lesson URL is not ready.

Avoid notes:
- Do not invent completed lesson URLs that are not already in use
- Do not overload the block with unrelated lessons just to fill space

### NextStepCTA

Purpose:
Single-focus CTA block for closing a page with one dominant next action and one quieter secondary path.

When to use:
Use at the bottom of door pages, lesson pages, and support pages when the reader should leave knowing the exact next move.

Props / content model:
- `eyebrow`
- `title`
- `description`
- `primaryLabel`
- `primaryHref`
- `secondaryLabel optional`
- `secondaryHref optional`
- `variant: default | warm | dark | minimal`

Example usage:
Start preparing, browse the directory, join the waitlist, or get feedback.

Avoid notes:
- Do not give the secondary action the same visual weight as the primary action
- Do not stack three or four CTAs into this component

### TestimonialBand

Purpose:
Short social-proof or proof-point strip that can carry real testimonials or safe factual credibility statements.

When to use:
Use when a page benefits from confidence-building evidence but does not need a long testimonial section.

Props / content model:
- `eyebrow optional`
- `title`
- `testimonials[]: quote, attribution optional, context optional`
- `variant optional`

Example usage:
Door pages can use proof-point mode with statements such as built from years of coaching young actors or designed by a former child actor and youth talent manager.

Avoid notes:
- Do not fabricate quotes or attributions
- Do not label public-facing proof points as placeholders
