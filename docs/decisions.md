# DECISIONS.md

This document records important architectural, design, and product decisions.

The goal is to preserve context for future development.

---

## 2026-06-30

### Decision

Build the future Child Actor 101 platform in Next.js.

### Reason

Improved SEO, flexibility, reusable components, and long-term scalability.

---

## 2026-06-30

### Decision

Keep Squarespace as the live production website during development.

### Reason

Protect existing SEO, blog content, and customer experience while rebuilding incrementally.

---

## 2026-06-30

### Decision

Child Actor 101 becomes the central hub of the ecosystem rather than simply a marketing website.

### Reason

The platform now includes software, training, podcasts, resources, and community products that should feel unified.

---

## 2026-06-30

### Decision

Use the existing chalkboard educational identity as the foundation for the redesign.

### Reason

It is recognizable, established, and aligns with the educational mission of the brand.

---

## 2026-06-30

### Decision

Continue using custom Pixar-inspired editorial illustrations throughout articles and landing pages.

### Reason

They have become one of the most recognizable visual assets of the Child Actor 101 brand.

---

## 2026-07-01

### Decision

Send explicit podcast listening CTAs directly to the live Spotify show while keeping `/podcast` as the platform's editorial podcast front door.

### Reason

Families clicking a "listen" action should reach the real show immediately, while the internal `/podcast` page can continue serving as a branded orientation and archive-migration hub.

---

## 2026-07-01

### Decision

Treat the current homepage implementation as the canonical visual reference and extract its patterns into reusable components without changing content, layout, or responsive behavior.

### Reason

Future pages need a shared design system, but the homepage already defines the approved chalkboard classroom look and should remain visually stable while that system is extracted.

---

## 2026-07-01

### Decision

Make `/start-here` the main onboarding page for brand-new parents and structure it as a guided roadmap before deeper training, tools, or product-specific pages.

### Reason

New families need clarity and order first. Leading with step-by-step education supports the site architecture, lowers overwhelm, and keeps Child Actor 101 aligned with its trust-first teaching model.

---

## 2026-07-01

### Decision

Build `/from-the-classroom` as a textbook-style lesson library organized by learning chapters instead of publication dates.

### Reason

The educational library should feel like opening the Child Actor 101 classroom, not browsing a traditional blog archive. Chapter-based organization reinforces the platform's textbook model, improves clarity for parents, and supports long-term topical authority.

---

## 2026-07-01

### Decision

Former course material is treated only as internal source content. Public content is organized into Classroom chapters, lessons, and guides.

### Reason

The educational material is still valuable, but future public pages should present it as one cohesive Child Actor 101 curriculum rather than as internal module naming or archive content.

---

## 2026-07-01

### Decision

Prototype the classroom as a typed Next.js chapter-and-lesson library with representative sample data before importing the full inventory.

### Reason

The team needs to validate the browsing flow, lesson layout, reusable route structure, and chapter-based IA before migrating all 200 audited sources. A sample library makes the system visible without forcing premature full-content migration.

---

# Related Documents

- ROADMAP.md
- DESIGN_AESTHETIC.md
- AI_CONTEXT.md

---

# Primary Owner

Corey Ralston

---

# Status

Living Document
