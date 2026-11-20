# Post-deployment SEO transition plan: legacy Squarespace to the native 101 Blog

**Decision (yours): the legacy Squarespace site stays completely unchanged until the new blog is deployed and verified.** This plan starts after that. Nothing in it has been applied. No blanket `noindex`, no `robots.txt` blocking, no Squarespace edits.

## Goal
Every article keeps its URL, ranking history and backlinks. Search engines end up with **one** copy of each article, on `https://www.childactor101.com/101-blog/<slug>`, reached from the old copy by a **one-to-one 301 redirect**, never to the homepage or to a generic archive.

## What is true today (verified)
- **The ranking history is on the `www` URLs, and the new site serves exactly those paths.** The blog's SEO equity lives on `https://www.childactor101.com/101-blog/<slug>`. The new site serves all 157 articles at those same paths with canonicals to themselves. Deploying restores them; no redirect is needed for that part.
- **`www` is on Vercel already, and today's production build does not serve the blog.** Production is the `main` branch (`c984c57`). On it `/101-blog` redirects to the classroom, 20 articles redirect to classroom lessons, and `LEGACY_BLOG_ORIGIN` **is set for Production** (its value is hidden), so every other `/101-blog/...` URL is forwarded to the legacy host with a temporary 307. Old `www` article URLs are therefore not serving articles from `www` right now. This is why deploying soon matters, and why the first week should be monitored closely.
- **Preview deployments of the new blog exist** (the branch's last pushed commit is a READY preview, not production). The `LEGACY_BLOG_ORIGIN` variable is Production-only, so previews show the native behaviour.
- **The legacy copy is a separate, indexable site.** `legacy.childactor101.com` serves every article, canonical to itself, allows search engines, and publishes its own sitemap (194 blog URLs). Those copies are the only duplicate-content risk.
- **Squarespace redirects exist on the legacy site.** `/classes` there is a live 301. So its URL Mappings feature is in use.
- **Baseline run (read-only):** `check-legacy-redirects.mjs` reports 157 articles served by legacy, 0 redirected, 0 wrong.

## Hard ordering rule (loop prevention)
**Never apply any legacy-to-`www` redirect while production still has the old behaviour.** Today `www` forwards blog URLs to legacy (307). If legacy also redirected those URLs to `www` (301), every article would loop between the two hosts. The new build removes the forwarding for all 157 articles, so the redirects are only safe **after** the new build is live on `www` and Phase 1 has passed. The checker's `--follow` mode and the Phase 1 gate exist to catch this.

## Principles
1. **Redirect, don't block.** A crawler must be able to fetch an old URL to see its 301. `noindex` or `Disallow` on a URL you want consolidated stops that.
2. **One-to-one.** `/101-blog/<slug>` on legacy to `/101-blog/<slug>` on `www`. Archives map to the matching archive. Never to the homepage.
3. **New site first, verified, then redirect.** Never redirect to a URL that does not return 200.
4. **Small steps with a rollback.** Pilot, then all. Removing a mapping reverses it.

## Phases and gates

### Phase 0: before deploy (no changes)
- In Search Console, confirm a property for `www` (Domain property preferred) and one for `legacy.`. Export 16 months of Performance data (pages and queries) for both, and the Pages indexing report. This is the baseline everything is compared against.
- Search `site:legacy.childactor101.com/101-blog` to see how many legacy copies are already indexed.
- Save the legacy sitemap. Run `node scripts/blog/check-legacy-redirects.mjs` for the baseline (done: 157 not yet redirected).
- Decide who applies Squarespace changes later (they are made in the Squarespace dashboard, by you or someone you authorize).

### Phase 1: deploy the new blog (needs your approval) and verify
Gate, all must pass before Phase 2:
- All 157 article URLs return 200 on `www` (use `check-links.mjs` and `verify-seo.mjs` against production).
- Canonicals are the `www` URLs; no `noindex`; sitemap lists them (234 URLs); images load.
- No redirect loops, including with `LEGACY_BLOG_ORIGIN` as set in production (the fallback only covers missing slugs; there are none).

### Phase 2: tell search engines (day 0 to 3)
- Submit `https://www.childactor101.com/sitemap.xml`; request indexing for about 10 top articles by baseline clicks.
- Watch Pages indexing and server errors daily. This is the interim window where both hosts serve the same text. Keep it short (days, not weeks). Search engines choose a canonical; the new pages are self-canonical on the domain that carries the history.

### Phase 3: pilot redirects (after the gate, about day 3 to 7)
Apply 5 mappings from `docs/seo/legacy-url-mappings.txt` on Squarespace (Settings, Developer Tools, URL Mappings; confirm the current menu name):
- two ordinary articles, one high-traffic article, and the two special slugs (`Demo Reel Options`, which has spaces, and `-hoacting-insights-…`, which starts with a hyphen).
- Verify: `node scripts/blog/check-legacy-redirects.mjs --follow --only <slugs>` must show REDIRECTED (a single 301 to exactly the new URL, which answers 200).
- **Open questions only a pilot can answer:** whether Squarespace lets a mapping override a page that still exists, whether it accepts an absolute `https://www…` target, and how it treats the two special slugs. If a mapping does not take effect, the fallback is below.

### Phase 4: full redirects (about 24 hours after a clean pilot)
- Apply the rest in batches of about 50: 157 articles, the blog index, then the category and tag archives (section 3 of the file; single-article tags go to the blog archive).
- Run the full checker after each batch. Any WRONG (302/307, chain, wrong target) is fixed before continuing.

### Phase 5: monitor (6 to 8 weeks)
Weekly, against the baseline:
- Search Console, legacy property: "Page with redirect" should rise as the indexed legacy copies drop; no 404s.
- Search Console, `www`: indexed articles stable or rising; clicks and impressions per article not below baseline (allow a few weeks for re-crawl).
- `site:legacy…/101-blog` count falling.
- **Investigate** if aggregate blog clicks fall more than 10% for two consecutive weeks, or any top-20 article drops out of the index. **Roll back** by removing the mappings (instant).

### Phase 6: steady state
Keep the redirects permanently (they cost nothing and protect old backlinks). Do not `noindex` redirected URLs. Retire the legacy host only after customer-access paths (courses, checkout, member areas) no longer depend on it, per `docs/seo/legacy-squarespace-cutover.md`.

## If a Squarespace mapping cannot redirect a live article
In order of preference, and only after the `www` copy is indexed:
1. **Per-article "hide from search"** (Squarespace's own noindex setting) on the 157 legacy articles, one by one, not site-wide. This removes duplicates over time but does not pass signals as strongly as a 301.
2. **Unpublish** the legacy articles only if that makes the mapping take effect, because the URL then redirects instead of serving a page. Verify with the checker first.
3. Not recommended in any case: blanket `noindex`, a `robots.txt` block, or a cross-domain canonical (Squarespace cannot output one).

## Loop and conflict safety
- The new site never redirects a migrated article to the legacy host; the `LEGACY_BLOG_ORIGIN` fallback is exact per missing slug, and none are missing. The loop guard (legacy host is never forwarded again) stays in place.
- Verified in tests: with the fallback on, `/101-blog/what-it-takes` and the mixed-case `/101-blog/Actorsaccess` answer 200, not a redirect.

## Files
| File | Purpose |
|---|---|
| `docs/seo/legacy-url-mappings.txt` | 195 mappings ready to paste: 157 articles, the index, 2 categories, 35 tags. **Not applied.** |
| `scripts/blog/generate-legacy-redirects.mjs` | Regenerates that file from the content (only writes a file). |
| `scripts/blog/check-legacy-redirects.mjs` | Read-only verifier (GET only): REDIRECTED, NOT-YET or WRONG per article; `--follow` also checks the new URL. |
| `scripts/blog/verify-seo.mjs`, `check-links.mjs` | Phase 1 gate checks against production. |

## Decisions I need from you later (not now)
1. Who applies the Squarespace mappings, and the date of the pilot.
2. Whether to also redirect the legacy tag and category archives (section 3), or only articles and the blog index.
