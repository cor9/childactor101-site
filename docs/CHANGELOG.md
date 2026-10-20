# Changelog

This document records significant milestones in the development of the Child Actor 101 Platform.

Unlike `DECISIONS.md`, which explains *why* important choices were made, this document simply records *what* changed and *when*.

---

## Unreleased

### Added

- Chalkboard texture guidance and homepage chalk doodle treatment across dark classroom sections
- Saved LEVEL UP Modules 01, 05, 06, 07, and 08 as internal curriculum source material for future Child Actor 101 lesson extraction
- Added a granular internal source-lesson inventory for Modules 01 and 05 to guide classroom lesson splitting without exposing internal module naming publicly
- Added a typed `src/content/classroom.ts` sample classroom library model plus dynamic chapter and lesson prototype routes for `/from-the-classroom`

### Changed

- Replaced the homepage Meet Corey placeholder with the real `corey-ralston.jpg` headshot
- Connected explicit podcast listening CTAs to the live Spotify show URL while keeping `/podcast` as the internal podcast front door
- Refactored the homepage into reusable `ui`, `layout`, `home`, and `content` component libraries without changing the approved visual design
- Built the `/start-here` onboarding page as the primary parent-first roadmap using the existing reusable component system
- Built `/from-the-classroom` as a chapter-based classroom library instead of a chronological blog feed
- Wired `/from-the-classroom` into a polished front-end prototype with chapter cards, sample chapter pages, sample lesson pages, breadcrumbs, related-lesson flow, and prototype lesson navigation
- Refined internal curriculum documentation to remove legacy course terminology
- Generated the master blog-to-classroom curriculum mapping to guide future lesson extraction

### Pre-launch repairs

- Added permanent redirects for 20 legacy `/101-blog/` articles (plus the `/101-blog` index) to the classroom lessons built from them; full 155-URL audit in `docs/seo/legacy-blog-migration-map.md`
- Fixed eight broken Start Here links, AB1319 lint errors, duplicate title suffixes, and the homepage's development meta description
- Added `sitemap.xml`, `robots.txt`, and a default social sharing image built from the approved TV logo
- Removed development placeholder copy from `/podcast`
- Linked Video Courses from the footer
- Marked the 25 course lessons still missing their original video, kept them out of search and the sitemap, and preserved all lesson content and video references
- Removed prototype and sample wording from the Classroom index and chapter pages. Chapter cards now show actual lesson counts, and the chapter with no published lessons is hidden (its data is kept)
- Prepared a `/101-blog/:path+` fallback to the legacy Squarespace host, off unless `LEGACY_BLOG_ORIGIN` is set, plus `scripts/check-legacy-blog-origin.mjs` and a cutover runbook in `docs/seo/legacy-squarespace-cutover.md`
- Preserved the 12 old non-blog pages and 2 PDFs on the legacy host with 14 temporary redirects behind the same `LEGACY_BLOG_ORIGIN` gate, with exact blog redirects still first. Candidate newer destinations are recorded for later review but not used (`docs/seo/legacy-page-preservation-map.md`)
- Extended `scripts/check-legacy-blog-origin.mjs` to follow redirects hop by hop, check the 14 preserved URLs, and require real PDF bytes for the PDFs
- Added `npm run test:redirects` (static data, readiness script against stub servers, inventory classifier, builds with the gate off and on, invalid values)
- Started the Squarespace customer-access inventory (`docs/seo/squarespace-customer-access-inventory.md`): it is incomplete and gates the primary-domain change. Added `scripts/classify-legacy-urls.mjs`, which classifies exported URLs as handled, replaced by a new-site page, or unhandled, and flags customer-access paths; covered by `npm run test:redirects` (now 84 checks)

### Remaining

- Integrate blog content
- Migrate the podcast archive
- Deploy preview environment

---

# Version 0.1.0 — 2026-06-30

## Added

- Initial Next.js project
- Project repository
- Documentation framework
- README
- AI_CONTEXT
- BRAND_GUIDELINES
- DESIGN_AESTHETIC
- DESIGN_SYSTEM
- CONTENT_STRATEGY
- SITE_ARCHITECTURE
- SEO_STRATEGY
- TOPICAL_AUTHORITY
- ROADMAP
- COMPONENT_LIBRARY
- ILLUSTRATION_GUIDELINES
- CODING_STANDARDS
- DECISIONS

## Project Direction

- Established Child Actor 101 as the central educational platform.
- Defined long-term migration strategy from Squarespace to Next.js.
- Created unified brand, design, SEO, and content documentation.
- Defined ecosystem architecture for current and future products.

---

## Versioning

This project follows Semantic Versioning.

Major versions represent significant platform milestones.

Minor versions introduce major features.

Patch versions include bug fixes, refinements, and small improvements.

Example:

1.0.0

- Public launch of the new Child Actor 101 platform.

1.1.0

- New major feature.

1.1.3

- Bug fixes and minor improvements.

---

## Related Documents

- ROADMAP.md
- DECISIONS.md
- README.md

---

## Primary Owner

Corey Ralston

---

## Status

Living Document

---

## Version

1.0

---

## Last Updated

2026-07-01
