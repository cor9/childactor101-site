# Legacy page and PDF preservation map

The 12 non-blog pages and 2 PDFs found on the old Squarespace site (from `docs/inventory/classroom-content-inventory.json`) are **preserved on `legacy.childactor101.com`**. None is redirected to a new-site page or product.

## Why preserve instead of redirect

- The inventory audited all 12 pages from the sitemap and page title only (`audited_from_sitemap_and_page_title`), and the 2 PDFs from a link title (`pending_full_doc_review`). Nobody has compared their contents or functionality with any new page.
- Several of these are product, booking or course pages. Sending them to a similarly named product site could break purchases or hide content people are looking for.
- A preserved URL can be redirected permanently later. A wrong permanent redirect is much harder to undo, because browsers and search engines cache it.

## What is implemented

- `src/content/legacy-preserved-pages.json` holds the list. `src/lib/legacy-page-preservation.ts` turns it into 14 temporary (307) redirects to `${LEGACY_BLOG_ORIGIN}<same path>`, with the query string kept and a host guard so a request already on the legacy host is never forwarded.
- **Gated:** like the blog fallback, they exist only when `LEGACY_BLOG_ORIGIN` is set at build time to a validated origin. With it unset, all 14 paths return 404 on the new site.
- **Precedence** (first match wins): `/101-blog` index → 20 exact blog redirects → these 14 → blog catch-all. The 14 paths do not overlap with any new-site route (checked by `npm run test:redirects`).
- **Matching** is case-insensitive and exact. Child paths such as `/freeguides/something` are not covered and belong to the full Squarespace sitemap review.
- `scripts/check-legacy-blog-origin.mjs` requests all 14 on the legacy host. It follows redirects by hand, fails on any hop to the main domain or any loop, and requires the two PDFs to return real PDF bytes.

## The 14 paths

Sorted by risk. "Candidate newer destination" is a lead for later review only. **No redirect uses it today.**

| Path | Kind | Old page title | Risk | Handling now | Candidate newer destination (not used) | Verify before redirecting |
|---|---|---|---|---|---|---|
| `/parent-courses` | Page | Parent Courses | High | Preserved on legacy (307) | None identified | Likely the course sales or access page. Do NOT point at /courses: that section holds two free restored courses, not necessarily the same products. Keep on the legacy host until the Squarespace page, its checkout, and customer access are verified. |
| `/ask101` | Page | Ask101 | Medium | Preserved on legacy (307) | None identified | No equivalent identified on the new site. The old blog announced it as live, so it may be a working tool or signup. |
| `/books-more` | Page | Books and More | Medium | Preserved on legacy (307) | `https://book101.childactor101.com` | Book101 is the nearest product site. Confirm it covers every item on the old page, including any store or affiliate links. |
| `/freeguides` | Page | Free Guides | Medium | Preserved on legacy (307) | `/start-here` | Start Here has a Free Guides section, but its four guides link to other sites and the page was never compared with the old hub. This page also links the two PDFs below. |
| `/private-coaching` | Page | Private Coaching | Medium | Preserved on legacy (307) | `https://coaching.childactor101.com` | New Training page links Coaching with Corey to this site. Verify the old page's booking or payment flow before redirecting. |
| `/s/7tips.pdf` | PDF | 7 Tips Guide | Medium | Preserved on legacy (307) | None identified | Downloadable file linked from /freeguides. Keep this URL working permanently, since other sites and emails may link straight to it. The inventory plans to split it into lessons, which does not replace the file. |
| `/s/Content-Memorization.pdf` | PDF | Content Memorization Guide | Medium | Preserved on legacy (307) | `https://memorize.childactor101.com` | Memorization guide site is the likely successor, but its content was not compared with this PDF. Keep this URL working permanently. |
| `/self-tape-feedback` | Page | Self Tape Feedback | Medium | Preserved on legacy (307) | `/ecosystem#self-tape-feedback` | The new site describes Self Tape Feedback but has no order flow here. Confirm the old page does not take orders or submissions before redirecting. |
| `/talent-rep-open-call` | Page | Talent Rep Open Call | Medium | Preserved on legacy (307) | `/industry/open-call` | The new page is for talent representatives. Check that the old page is not a family-facing submission form or a dated event page. |
| `/thecraft` | Page | The Craft | Medium | Preserved on legacy (307) | None identified | No equivalent identified. The Ecosystem page names "The Craft" but it is only a section label there. |
| `/youth-actor-workshops` | Page | Youth Actor Workshops | Medium | Preserved on legacy (307) | None identified | No equivalent identified. Training links to external class sites only. May hold dated event or signup content. |
| `/on-youtube` | Page | On YouTube | Low | Preserved on legacy (307) | None identified | Probably a video hub or channel link. Candidate: the YouTube channel itself, which is not recorded in this repo. |
| `/p101` | Page | Pages101 | Low | Preserved on legacy (307) | `https://pages.childactor101.com` | The tool now lives on its own site. Confirm the old page does not host the tool, subscriptions, or logins. |
| `/resume-101` | Page | Resume101 | Low | Preserved on legacy (307) | `https://resumes.childactor101.com` | The tool now lives on its own site. Confirm the old page does not host the tool or collect payment. |

## Redirects to revisit later

8 of the 14 have a plausible newer home. Each needs its old page read side by side with the candidate, and any checkout, booking, login or download on the old page checked, before it becomes a permanent (308) redirect:

- `/books-more` → `https://book101.childactor101.com`
- `/freeguides` → `/start-here`
- `/p101` → `https://pages.childactor101.com`
- `/private-coaching` → `https://coaching.childactor101.com`
- `/resume-101` → `https://resumes.childactor101.com`
- `/s/Content-Memorization.pdf` → `https://memorize.childactor101.com`
- `/self-tape-feedback` → `/ecosystem#self-tape-feedback`
- `/talent-rep-open-call` → `/industry/open-call`

6 have no identified replacement and should stay on the legacy host until one exists: `/ask101`, `/on-youtube`, `/parent-courses`, `/s/7tips.pdf`, `/thecraft`, `/youth-actor-workshops`.

**Highest risk:** `/parent-courses` is probably the course sales or access page. It must not be pointed at `/courses`, which holds two free restored courses and is a different thing until proven otherwise. Check its checkout and customer access in cutover Phase 2.

**The two PDFs** are linked directly from other sites and emails, so their URLs should keep working permanently, even after their content becomes classroom lessons.

## Known limits

- Squarespace may serve `/s/...pdf` by redirecting to its own file host. The readiness script follows that and passes it only when real PDF bytes arrive. This has not been observed on the real site.
- The old pages themselves have not been read. Everything above is based on titles in the inventory.
- Customer-access, store, account, checkout and delivery paths are not in this list. They come from the full Squarespace sitemap, a separate check required before the domain switch (see `docs/seo/legacy-squarespace-cutover.md`).
