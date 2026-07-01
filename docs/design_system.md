# Design System

The Child Actor 101 Design System provides the visual and technical foundation for every interface across the ecosystem.

Its purpose is consistency.

Every page, component, product, and future application should feel like it belongs to the same family.

This document defines implementation standards—not creative direction.

For visual philosophy, see `DESIGN_AESTHETIC.md`.

---

# Purpose

This document establishes the reusable UI system for:

- Website
- Blog
- Landing Pages
- Resume101
- Pages101
- Directory
- Future applications

The design system should reduce duplication while improving consistency and accessibility.

---

# Core Principles

## Consistency

Visitors should never feel like they have left the Child Actor 101 ecosystem.

Typography, colors, spacing, and interactions should remain consistent across every product.

---

## Simplicity

Every interface should be easy to understand.

Reduce cognitive load.

Avoid unnecessary visual complexity.

---

## Accessibility

Accessibility is a requirement.

Not an enhancement.

Every component should:

- Support keyboard navigation
- Meet WCAG contrast requirements
- Include semantic HTML
- Include accessible labels
- Support screen readers

---

## Mobile First

Every component is designed for mobile before desktop.

Responsive behavior should be built into every component.

---

# Design Tokens

## Brand Colors

```css
--chalkboard: #234F3B;
--chalkboard-deep: #17382B;
--chalkboard-soft: #3F6B55;

--paper: #FBF6EA;
--paper-warm: #F3E8D2;

--chalk: #F8F4E8;

--purple: #A678F2;
--purple-deep: #7046B8;

--gold: #F4C95D;

--ink: #16243A;
--ink-soft: #31425C;
```

Chalkboard surfaces are not solid fills alone.

Implementation should layer:

- a dark green base
- soft radial chalk haze
- light eraser-dust residue
- occasional white chalk doodles for emphasis

Homepage chalkboard sections should visibly read as classroom boards, not generic dark hero bands.

---

## Typography

Display Font

Fredoka

Purpose:

- Hero headlines
- Section titles
- Card headings

---

Body Font

Inter

Purpose:

- Paragraphs
- Navigation
- Forms
- UI

---

Typography Scale

```css
Hero

72px

↓

H1

56px

↓

H2

40px

↓

H3

32px

↓

Body Large

20px

↓

Body

18px

↓

Small

16px

↓

Caption

14px
```

---

# Spacing

Use an 8px spacing system.

```text
4

8

16

24

32

40

48

64

80

96
```

Avoid arbitrary spacing values.

---

# Border Radius

```css
Small

8px

Medium

16px

Large

24px

Pill

999px
```

Rounded interfaces reinforce the warm educational brand.

---

# Shadows

Use subtle shadows.

Never harsh.

```css
Small

0 4px 12px rgba(...)

Medium

0 12px 30px rgba(...)

Large

0 24px 60px rgba(...)
```

Depth should feel soft.

---

# Chalkboard Surface Treatment

Use a reusable chalkboard treatment for dark green sections.

Required ingredients:

- Dark green gradient base
- Low-contrast chalk speckle or dust texture
- Soft blurred residue patches that feel like erased chalk
- Sparse white chalk doodles such as stars, arrows, and swirls

Rules:

- Keep doodles decorative, not interactive
- Lower opacity so content remains primary
- Repeat the motif consistently across homepage chalkboard sections
- Avoid overfilling the canvas

---

# Layout

Maximum Content Width

1280px

Reading Width

720px

Hero Width

1100px

Cards

Responsive Grid

Desktop

3–4 columns

Tablet

2 columns

Mobile

1 column

---

# Components

Every UI element should exist as a reusable component.

Examples:

Hero

Navigation

Footer

Primary Button

Secondary Button

Card

Feature Card

Illustration Card

Lesson Card

Podcast Card

CTA Banner

Journey Timeline

Accordion

Testimonial

Quote

Newsletter Signup

Author Box

Breadcrumb

Search

Section Divider

---

# Buttons

Primary

Purple background

White text

Rounded pill

Secondary

Paper background

Chalkboard text

Outlined

Text Buttons

Minimal

Arrow icon optional

Hover animations should be subtle.

---

# Cards

Cards are the primary layout component.

Every card should include:

- Rounded corners
- Soft shadow
- Comfortable padding
- Clear hierarchy
- Optional illustration
- Clear CTA

Cards should never feel crowded.

---

# Icons

Use simple outlined icons.

Avoid highly detailed icon packs.

Illustrations should carry personality.

Icons should support navigation.

---

# Illustrations

Illustrations are not UI components.

They are editorial assets.

Every major lesson should include a custom illustration.

See:

ILLUSTRATION_GUIDELINES.md

---

# Motion

Motion should feel calm.

Use:

Fade

Slide

Scale

Small hover transitions

Avoid:

Parallax

Overly dramatic animations

Long loading sequences

Distracting motion

---

# Forms

Forms should:

Be simple

Ask only necessary information

Explain why information is requested

Provide helpful validation

Never overwhelm users

---

# Responsive Philosophy

Desktop

Comfortable reading

Large imagery

Generous spacing

Tablet

Maintain hierarchy

Reduce whitespace slightly

Mobile

Single-column layouts

Large touch targets

Readable typography

Minimal scrolling friction

---

# Performance

Every component should prioritize:

Fast rendering

Image optimization

Lazy loading

Accessibility

SEO

Clean HTML

Performance should never be sacrificed for unnecessary visual effects.

---

# Reusability

When creating a new component, ask:

Can this be reused elsewhere?

If yes, build it as a shared component.

Avoid page-specific components whenever possible.

---

# Design Review Checklist

Before approving a component:

✓ Is it accessible?

✓ Is it responsive?

✓ Does it match the Child Actor 101 aesthetic?

✓ Is the spacing consistent?

✓ Can it be reused?

✓ Is the code clean?

✓ Does it support long-term scalability?

---

# Related Documents

- DESIGN_AESTHETIC.md
- BRAND_GUIDELINES.md
- AI_CONTEXT.md
- COMPONENT_LIBRARY.md
- CODING_STANDARDS.md

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
