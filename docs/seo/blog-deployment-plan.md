# 101 Blog: production deployment plan (awaiting your approval)

**Nothing has been deployed.** This is what will change, how to deploy it, how to check it, and how to undo it. Every step that changes production needs your explicit go-ahead.

## What goes live
Branch `claude/focused-cori-v0oppo` (on top of production's `main` at `c984c57`):
- The native 101 Blog: `/101-blog`, 157 articles at their original URLs, archive pages, category and tag pages, search, RSS feed.
- 805 locally hosted images (85 MB), recovered article content, live SEO titles and descriptions, 21 videos, 12 Amazon widgets.
- "101 Blog" in the header and footer, next to "From the Classroom".
- Sitemap grows from 56 to 234 URLs.

## What changes for existing URLs
| URL | Production today | After deploy |
|---|---|---|
| `/101-blog` | 308 to `/from-the-classroom` | The blog archive (200) |
| 20 articles that used to redirect to lessons | 308 to a classroom lesson | The original article (200) |
| the other 135 articles | 307 to the legacy host (`LEGACY_BLOG_ORIGIN` is set) | The article served natively (200) |
| `/from-the-classroom` and all lessons | unchanged | unchanged |
| 12 preserved legacy pages, 2 PDFs (incl. `/ask101`, `/self-tape-feedback`) | 307 to the legacy host | unchanged |
| `/selftapereview` | 404 | 307 to the legacy `/self-tape-feedback` page (new alias; same gate) |
| everything else | unchanged | unchanged |

`LEGACY_BLOG_ORIGIN` stays as it is. It still serves the preserved pages. For the blog it now only applies to inventory articles missing from the new blog, and there are none.

## Regression check (done)
I built production's current code (`main`) and this branch side by side and compared every other page: **61 pages, 0 differences in page content**. 58 differ only in the header and footer, and the difference is exactly the new nav item, its descriptions, tighter nav spacing, and the footer link. 3 are identical. Production's redirect and preserved-page behaviour is covered by `test:redirects` (33/33), and the blog by `test:blog` (106/106).

## Remaining issues that could affect visitors, SEO or functionality
1. **Header call-to-action** ("Start Here" button): hidden on screens 1024 to 1279 px wide so seven nav items fit on one line (it duplicates the "Start here" link). This is the one visible change to existing pages. Reversible.
2. **Unresolved link targets** (7 paths, 17 links in 6 articles; `blog-link-cleanup-backlog.md`): the old merchandise and product pages, all already 404 on the original site and left unchanged for a separate cleanup. `/ask101`, `/self-tape-feedback` and `/selftapereview` (11 links) are preserved through the legacy site, so the services stay reachable, but only while the legacy site exists.
3. **Legacy site duplicates:** the legacy Squarespace copies stay indexable until the transition in `legacy-seo-transition-plan.md`. Deploy first; apply no legacy redirects until verification passes (loop risk, see that plan).
4. **External destinations not click-tested** (blocked from my environment): `101training.childactor101.com` (reached via `/training`), `pages.childactor101.com/opencall` (4 links), Stripe links. The Amazon book page was verified (HTTP 200, correct title).
5. **Third-party embeds:** YouTube and Vimeo videos and 12 Amazon Associates widgets (one article) load from those services and set their own cookies. The site has no consent banner; check against your privacy policy. Videos match the original (they were not privacy-enhanced there either).
6. **Page weight:** median article carries 0.32 MB of images; the heaviest three carry about 2 to 3 MB. All images are lazy-loaded, resized and WebP.
7. **Guest-author profile box** (Clare Lopez's post) and the comment area from the Squarespace template are not reproduced; the text is.
8. **Pre-existing, unrelated:** `npm run lint` reports one error in `src/app/decks/DeckShuffler.tsx`, and `tsc` reports missing course images in `src/content/courses/presentation.ts`. `next build` succeeds and Vercel's preview builds are READY.
9. **Repository:** +85 MB of images in git. Fine for Vercel; later clones are larger.
10. **Titles over 60 characters** (101 articles) may be shortened in results; they match the originals.

## Before you approve
- [ ] Open a Vercel preview of the branch (below) and look at `/101-blog`, a long article, a video article, the vision-board article, and mobile.
- [ ] Click the external destinations in item 4.
- [ ] Tell me how you want to merge (below).

**Previews:** Vercel has built previews of this branch (READY). The latest I can see is for commit `d9ed39c`: `https://childactor101-site-oexorayi0-cor9s-projects.vercel.app` (sign in to Vercel to view). The next push of this branch creates a new preview that includes the `/classes` fix and the new tooling. Previews do not have `LEGACY_BLOG_ORIGIN`.

## How to deploy (after your approval)
Production deploys automatically when `main` changes. Either:
- **A. Pull request, then merge (recommended).** I open a PR from `claude/focused-cori-v0oppo` to `main` for you to review and merge.
- **B. Merge directly** (fast-forward; the branch is based on `main`'s current tip).

I will not do either until you say so.

## Verify after deploy (about 15 minutes)
```bash
node scripts/blog/check-links.mjs https://www.childactor101.com
NODE_USE_ENV_PROXY=1 node scripts/blog/verify-seo.mjs https://www.childactor101.com
```
- All 157 article URLs return 200 with a canonical on `www`; `/101-blog` is the archive; `/from-the-classroom` is unchanged.
- `https://www.childactor101.com/sitemap.xml` lists 234 URLs.
- `/parent-courses` and `/s/7tips.pdf` still forward to the legacy host (preserved pages unchanged).
- Search Console: submit the sitemap, then follow Phase 2 of the transition plan.

## Rollback
- **Fastest:** Vercel, Deployments, promote the previous production deployment `dpl_9UeR5Bf1v5f3gux2njhTtqaKMEqV` (the `main` build at `c984c57`; Vercel marks it a rollback candidate). This restores today's behaviour in seconds.
- Or revert the merge commit on `main`.
- No database, DNS or Squarespace change is involved, so there is nothing else to undo.

## After deploy
Follow `docs/seo/legacy-seo-transition-plan.md`. Do not touch the legacy site until the verification above has passed.
