# COMPONENT_LIBRARY.md

The Child Actor 101 Platform is built from reusable UI components.

New interfaces should reuse existing components whenever possible rather than creating page-specific designs.

---

# Core Components

## Layout

- Header
- Footer
- Section
- Container
- Page Hero
- Sidebar
- Grid

---

## Navigation

- Primary Navigation
- Mobile Navigation
- Breadcrumbs
- Footer Navigation
- Previous / Next Lesson

---

## Content

- Lesson Card
- Podcast Card
- Guide Card
- Tool Card
- Testimonial
- Quote
- FAQ
- Timeline
- CTA Banner
- Newsletter Signup
- Related Lessons
- Next Step CTA
- Testimonial Band

---

## Media

- Illustration Hero
- Image Gallery
- Video Embed
- Podcast Player

---

## Utility

- Buttons
- Badges
- Alerts
- Tags
- Accordions
- Tabs
- Search
- Pagination

---

# Design Principles

Every component should:

- Be reusable
- Be responsive
- Be accessible
- Support dark future expansion if needed
- Match the Child Actor 101 Design System

---

# Page Support Layer

These reusable support blocks should be preferred over rebuilding the same sections manually across door pages, product pages, and classroom surfaces.

## NewsletterSignup

- Purpose: reusable email magnet or subscribe block
- When to use: checklists, waitlists, newsletter invites, and lightweight external subscribe flows
- Props: `eyebrow`, `title`, `description`, `ctaLabel`, `actionUrl` or `href`, `variant`
- Example usage: Red Flags Checklist, Night-Before Audition Checklist, Open Call Waitlist
- Avoid: implying an internal form submission when the UI only links out

## RelatedLessons

- Purpose: reusable classroom-guidance grid
- When to use: bottom-of-page lesson recommendations on door pages and lesson pages
- Props: `title`, `description`, `lessons`, `fallbackHref`, `variant`
- Example usage: route a door page to existing chapter or lesson URLs without hand-building cards
- Avoid: inventing direct lesson URLs that are not already in use

## NextStepCTA

- Purpose: focused final CTA with one dominant action
- When to use: final section on door pages, lesson pages, and support pages
- Props: `eyebrow`, `title`, `description`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`, `variant`
- Example usage: Start Preparing, Join the Waitlist, Check the Directory
- Avoid: giving the secondary action the same visual dominance as the primary action

## TestimonialBand

- Purpose: short proof strip for real testimonials or factual proof points
- When to use: pages that need a credibility layer without a long testimonial section
- Props: `eyebrow`, `title`, `testimonials`, `variant`
- Example usage: coaching credibility strip, trust statements, parent-proof moments
- Avoid: fake testimonials or public placeholder language

---

# Related Documents

- DESIGN_SYSTEM.md
- CODING_STANDARDS.md
- SITE_ARCHITECTURE.md

---

# Primary Owner

Corey Ralston

---

# Status

Active

---

# Version

1.0

---

# Last Updated

2026-06-30
