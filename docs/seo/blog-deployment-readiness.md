# 101 Blog: deployment readiness report

Prepared 2026-11-19 on branch `claude/focused-cori-v0oppo`. **Nothing has been deployed. DNS and the Squarespace site are unchanged** (the Squarespace site was only read: GET requests for images, pages and its JSON feed).

## 1. Articles migrated
- **157 published posts imported; all 155 original inventory articles are present, 0 missing** (plus 2 newer posts not in the inventory; 14 drafts deliberately skipped).
- Audit: 155 clean, 0 needing review (`blog-migration-audit.md` / `.csv`).
- Every original URL serves HTTP 200 at its original `/101-blog/<slug>` with a primary-domain canonical. The 20 articles that used to redirect to classroom lessons now serve their original articles; the classroom lessons are untouched.

## 2. Image migration
| | |
|---|---|
| Unique images referenced | 805 (all from Squarespace's CDN) |
| Downloaded and stored locally | **805 / 805** |
| Failed or missing | 0 failed, 0 missing on disk |
| Image tags still pointing at a remote host | 0 |
| Size | 469 MB originals, 85 MB stored (static images resized to at most 1600 px and saved as WebP; width and height recorded to avoid layout shift) |
| Display check | all 157 articles loaded in a browser at mobile width: 858 image tags, **0 broken**, 0 horizontal overflow, no page errors; the only outside hosts contacted were YouTube, Vimeo and Amazon (embeds) |

No article depends on Squarespace's CDN any more. The originals remain on Squarespace untouched.

## 3. Quality assurance against the live originals
All 157 articles were compared with their live Squarespace pages (not just a sample). `blog-live-comparison.csv`.

| Check | Result |
|---|---|
| Titles | 157 / 157 match |
| Publication dates | 157 / 157 match |
| Text | every article at least 99.0% present, average 99.98% |
| Images | 673 / 673 live images present |
| Video embeds | 21 / 21 present |
| Internal and external links | all present except one malformed `notion://` link (see below) |
| SEO title, description, canonical, indexability, Open Graph, Article JSON-LD | 157 / 157 pass against the live pages (`verify-seo.mjs`) |
| Mobile | no overflow on any article; embeds scale to the screen |
| Tests | `test:blog` 100/100, `test:redirects` 33/33 |

### Problems this comparison found and fixed
1. **The WordPress export drops some Squarespace blocks.** 18 articles were missing text, videos or product widgets, and two (*5 Types of TV Content*, *Monologues on Casting Profiles*) had lost all of their prose (about 1,600 and 1,200 words). The full bodies were recovered from Squarespace's own read-only JSON feed and stored in `src/content/blog/recovered-bodies.json`, so re-imports are repeatable. Also recovered: a YouTube video in a code block, and 12 Amazon Associates product widgets in *Create a Vision Board*.
2. **Dates were one day late on 77 articles** (the export is UTC, Squarespace shows Pacific time). Fixed.
3. **Seven titles carried raw HTML entities** (`&amp;`, an emoji code). Fixed.
4. **Authors:** the export used an email address as the author login on nearly every post. It is mapped to the display name and can never be published (earlier fix).
5. **Real SEO titles and descriptions** (40 and 48 articles) were not in the export; they are now taken from the live pages. The other 109 articles had no custom description on the live site; they get a description derived from the article text.

## 4. Remaining broken links
**11 internal paths, 24 links in 19 articles, all pointing at old Squarespace pages with no equivalent on the new site** (`blog-link-repair.md`):

| Path | Links |
|---|---|
| `/classes` | 16 in 13 articles |
| `/ask101`, `/self-tape-feedback`, `/selftapereview`, `/headshot-guide` | 1 to 4 each |
| `/store-1` and 4 product pages | 6 links in 4 articles |
| `/home/ingenuityactorsstudio` | 1 |

Seven other outdated links were repaired (home page, newsletter, Open Call submission, a mistyped `/blog/` URL). The remaining ones need a destination from you; I did not invent any. Recommendations are in `blog-link-repair.md`.

## 5. Outstanding issues
1. **Duplicate content (needs your decision).** The legacy Squarespace site is fully indexable, canonical to itself, and publishes its own sitemap (194 blog URLs). Once both hosts serve the same articles, search engines will see two copies. The standard fix is to make the legacy blog non-indexable (or redirect it to the new URLs) after the new one is live. That is a change to the Squarespace site, so I have not done it.
2. **Broken links above** (11 paths). Choose destinations, or accept them as known 404s for now.
3. **Minor differences from the original page template:** the guest-author profile box (headshot and website link) under Clare Lopez's post and the comment area are not reproduced; the article text itself is.
4. **Malformed link in the original:** `notion://www.notion.so/www.childrescuecoalition.org` (TikTok article). Text kept, dead link dropped.
5. **Third-party embeds** (YouTube, Vimeo, Amazon affiliate widgets) load from those services. The Amazon widgets are tracking/ad units, and the site has no cookie notice, so check that against your privacy policy.
6. **Titles over 60 characters** (101 articles) may be shortened in search results; they match the originals.
7. **Repository size:** 85 MB of images are added to git.
8. **Pre-existing, not part of this work:** `npm run lint` fails on `src/app/decks/DeckShuffler.tsx`, and `tsc` reports missing course images in `src/content/courses/presentation.ts` (`next build` still succeeds).
9. **Environment change:** at your approval I allowed `images.squarespace-cdn.com` and `legacy.childactor101.com` (read-only access) on your Default Cloud Environment. It can be removed when you like.

## 6. Ready for production?
**The blog itself is ready: content, images, SEO and tests are complete and verified.** I recommend deploying after two decisions from you:
1. What to do about the 11 broken link targets (or accept them for now).
2. The plan for the legacy site's indexing, so the two copies do not compete. This can follow the deploy but should be scheduled with it.

Suggested rollout (each step needs your approval): merge the branch, deploy a preview, spot-check, set production, submit `sitemap.xml` in Search Console, then change the legacy site's indexing once the new URLs are confirmed.
