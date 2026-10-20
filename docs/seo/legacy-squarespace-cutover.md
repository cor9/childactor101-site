# Legacy Squarespace cutover runbook

Plan: keep the current Squarespace site reachable at `legacy.childactor101.com`, move `childactor101.com` / `www.childactor101.com` to the Vercel project `childactor101-site`, and forward unmigrated `/101-blog/...` URLs to the legacy host.

**Status: nothing in this runbook has been executed or verified.** It records the checks that must pass. Squarespace behavior is not confirmed here: confirm each Squarespace step in the Squarespace domain panel or with Squarespace support before relying on it. No DNS, Squarespace, Stripe, or Vercel environment settings have been changed.

## What the code already does

- 20 verified article redirects plus `/101-blog` → `/from-the-classroom` (308, permanent).
- A catch-all fallback for every other `/101-blog/...` URL, **off until `LEGACY_BLOG_ORIGIN` is set** (see `docs/seo/legacy-blog-migration-map.md`).
- `scripts/check-legacy-blog-origin.mjs` checks that the legacy host serves the old blog paths without bouncing back to the main domain.

## Phase 1: Connect the legacy subdomain (Squarespace stays live on www)

1. **Record current DNS.** Export every record for `childactor101.com`: apex, `www`, MX, SPF/DKIM/DMARC TXT, verification TXT records, and every existing subdomain (`directory`, `resumes`, `pages`, `book101`, `talent`, `selftapetips`, `memorize`, `zoomcb`, `collegechecklist`, `prep101`, `reader101`, `boldchoices`, `101training`, `auditionmastery`, `characterlab`, `coaching`). This is the rollback copy. None of these may change during cutover except `legacy`, apex, and `www`.
2. **Add `legacy.childactor101.com` to the Squarespace site** under its domain settings, using the exact DNS records Squarespace shows for that subdomain. Do not use values from memory.
3. **Wait for Squarespace to show the subdomain as connected with SSL active.**
4. **Primary domain (the main loop risk).** Find out whether Squarespace redirects non-primary domains to the primary. If it does, `legacy.` will redirect back to `www.`, and once `www.` is on Vercel the two hosts would bounce visitors between them. Decide with Squarespace when `legacy.childactor101.com` becomes the primary domain. It must happen before step 12.
5. **Check the blog paths on the legacy host.** `https://legacy.childactor101.com/101-blog/<slug>` should show the same article as today. Then run:
   `node scripts/check-legacy-blog-origin.mjs https://legacy.childactor101.com --all`
   It must report every URL ok. Any `FAIL: redirects to main domain` means step 4 is not done.

## Phase 2: Verify commerce, accounts, and video on the legacy host

Do these on `legacy.childactor101.com` before moving `www`. Do not change Stripe settings.

6. **Purchases:** complete one checkout for each kind of product sold (course, digital download, any subscription). Use a 100% discount code or the cheapest item and refund it. Confirm the order, the receipt email, and fulfillment.
7. **Customer accounts:** log in with an existing customer account, reset a password, and confirm order history.
8. **Course and video access:** log in as an existing course buyer and play a video from every course and member area. If videos are embedded from Vimeo or YouTube with domain-level privacy, add `legacy.childactor101.com` to each allowlist first. Otherwise playback will fail on the new host.
9. **Links in past emails:** receipts, account emails, and course emails already sent link to `www.childactor101.com/...`. After cutover those land on Vercel. List the Squarespace paths customers use (account, member area, course, product, checkout, file-download links) and decide whether each needs its own forward to the legacy host. Only `/101-blog/...` is forwarded today.

## Phase 3: Move the main domain to Vercel (needs approval)

10. In Vercel, add `childactor101.com` and `www.childactor101.com` to the `childactor101-site` project and note the DNS records it gives.
11. In Vercel, set `LEGACY_BLOG_ORIGIN=https://legacy.childactor101.com` for **Production**, then redeploy. The variable is read at build time, so a redeploy is required.
12. At the DNS host, change **only** the apex and `www` records to the Vercel values. Leave MX, TXT, `legacy`, and every product subdomain untouched.
13. Remove `childactor101.com` / `www` from the Squarespace site's domains, so Squarespace stops claiming them, without disconnecting `legacy.`.

## Phase 4: Verify after the switch

14. `https://www.childactor101.com/` serves the new site, and the apex redirects to `www` (or the reverse, as configured in Vercel).
15. Spot-check redirects:
    - `/101-blog/Actorsaccess` → 308 to the classroom lesson
    - `/101-blog/the-critical-conversation` → 307 to `https://legacy.childactor101.com/101-blog/the-critical-conversation`
    - `/101-blog/category/<name>?offset=1` → 307 to the legacy host with the query kept
16. Repeat steps 6–8 once more after DNS settles.
17. Send a test email to an `@childactor101.com` address to confirm mail still arrives.
18. Submit `https://www.childactor101.com/sitemap.xml` in Google Search Console and watch the Coverage/Pages report for spikes in 404s.

## Rollback

Restore the apex and `www` records from step 1. The legacy subdomain and Squarespace site are unaffected. To switch off only the fallback, unset `LEGACY_BLOG_ORIGIN` in Vercel and redeploy.

## Open questions to settle before Phase 3

- Does Squarespace serve `legacy.` as primary without redirecting to `www.`? (Step 4)
- Which customer-facing Squarespace paths beyond `/101-blog/` need forwarding? (Step 9)
- Should the legacy copies of the 20 migrated articles be hidden from search on Squarespace, to avoid duplicates of the new lessons?
