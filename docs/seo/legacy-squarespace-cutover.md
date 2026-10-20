# Legacy Squarespace cutover runbook

Plan: keep the current Squarespace site reachable at `legacy.childactor101.com`, move `childactor101.com` / `www.childactor101.com` to the Vercel project `childactor101-site`, and forward unmigrated `/101-blog/...` URLs to the legacy host.

**Status: nothing in this runbook has been executed or verified.** It records the checks that must pass. Squarespace behavior is not confirmed here: confirm each Squarespace step in the Squarespace domain panel or with Squarespace support before relying on it. No DNS, Squarespace, Stripe, or Vercel environment settings have been changed.

## What the code already does

- 20 verified article redirects plus `/101-blog` → `/from-the-classroom` (308, permanent).
- A catch-all fallback for every other `/101-blog/...` URL, **off until `LEGACY_BLOG_ORIGIN` is set** (see `docs/seo/legacy-blog-migration-map.md`).
- 14 temporary redirects that preserve the 12 old non-blog pages and 2 PDFs on the legacy host, behind the same variable (see `docs/seo/legacy-page-preservation-map.md`). They are not redirected to new-site equivalents because nobody has compared the old page contents.
- `scripts/check-legacy-blog-origin.mjs` checks that the legacy host serves the old blog paths, those 12 pages, and those 2 PDFs without bouncing back to the main domain. It does not cover store, course, member, account, checkout or delivery paths.
- `npm run test:redirects` re-runs the redirect tests locally (84 checks).

The five phases below run in this order. Do not start a phase until the one before it passes.

## Phase 1: Connect and verify `legacy.childactor101.com` (main site stays live)

1. **Record current DNS.** Export every record for `childactor101.com`: apex, `www`, MX, SPF/DKIM/DMARC TXT, verification TXT records, and every existing subdomain (`directory`, `resumes`, `pages`, `book101`, `talent`, `selftapetips`, `memorize`, `zoomcb`, `collegechecklist`, `prep101`, `reader101`, `boldchoices`, `101training`, `auditionmastery`, `characterlab`, `coaching`, `pay` (Stripe checkout domain), `go` (Short.io short links)). This is the rollback copy. None of these may change during cutover except `legacy`, apex, and `www`.
2. **Add `legacy.childactor101.com` to the Squarespace site** as an additional domain, using the exact DNS records Squarespace shows for it. Do not use values from memory. Leave `www.childactor101.com` as the primary domain for now.
3. **Wait for Squarespace to show the subdomain as connected with SSL active.** `www.childactor101.com` must keep working throughout.

## Phase 2: Test the legacy blog and courses on the legacy host

Do not change Stripe settings.

4. **Check that you are really on the legacy host.** Open `https://legacy.childactor101.com/101-blog/<slug>` and confirm the address bar *stays* on `legacy.`. If Squarespace redirects non-primary domains to the primary, every test in this phase silently runs on `www.` instead. In that case, record the redirect, run only the checks that work, and repeat this whole phase after Phase 3.
5. **Blog:** a sample of old article URLs shows the same article as today.
6. **Purchases and Stripe delivery URLs:** complete one checkout for each kind of product (course, digital download, any subscription), using a 100% discount code or the cheapest item, then refund it.
   - Confirm the order, the receipt email, and fulfillment.
   - Check every delivery or download link in the receipt and confirmation pages, and note which host each one points to. A link that hard-codes `www.childactor101.com` will break once `www` moves to Vercel. Add it to the list in step 9.
7. **Existing customer access:** log in with an existing customer account, reset a password, and confirm order history.
8. **Course and video access:** log in as an existing course buyer and play a video from every course and member area. If videos are embedded from Vimeo or YouTube with domain-level privacy, add `legacy.childactor101.com` to each allowlist first. Otherwise playback will fail on the new host.
9. **Complete the customer-access inventory (required before Phase 3).** Follow `docs/seo/squarespace-customer-access-inventory.md`: export the Squarespace sitemap, pages, store and member areas, the Short.io links, and the Stripe Payment Link redirect URLs, then run `node scripts/classify-legacy-urls.mjs <exports>`. Add every unhandled path to `src/content/legacy-preserved-pages.json` and re-run `npm run test:redirects`. The inventory is **not complete as of this writing**, and the readiness script does not cover these paths until they are added.
10. **Links customers already have:** receipts, delivery links, and course emails already sent link to `www.childactor101.com/...`. After cutover those land on Vercel. List the Squarespace paths customers use (account, member area, course, product, checkout, download and delivery links) and decide whether each needs its own forward to the legacy host. Only `/101-blog/...` is forwarded today. Any new forward needs approval and must be in place before Phase 4.

## Phase 3: Make the legacy subdomain Squarespace's primary domain

**Do not start this phase until the gate in `docs/seo/squarespace-customer-access-inventory.md` is met** (inventory finished, no customer-access path left unhandled or replaced without a decision, and the `childactor101.sbs` Stripe success redirect issue resolved or accepted).

11. **Set `legacy.childactor101.com` as the primary domain in Squarespace.** From this point Squarespace may redirect `www` visitors to `legacy.`. That is expected, but keep the window until Phase 4 short.
12. **Check for unwanted redirects.** `https://legacy.childactor101.com/101-blog/<slug>` must answer directly and must not redirect to `www.` or the apex. Then run:
    `node scripts/check-legacy-blog-origin.mjs https://legacy.childactor101.com --all`
    Every URL must report ok: the blog URLs, the 12 preserved pages, and the 2 PDFs (which must return real PDF bytes). Any `FAIL ... redirects to main domain` is the loop risk, and Phase 4 must not start.
13. If Phase 2 step 4 found a redirect, repeat steps 5–8 now that `legacy.` is primary.

## Phase 4: Configure Vercel, activate the verified fallback, switch DNS (needs approval)

14. In Vercel, add `childactor101.com` and `www.childactor101.com` to the `childactor101-site` project and note the DNS records it gives.
15. Only after steps 9 and 12 pass, set `LEGACY_BLOG_ORIGIN=https://legacy.childactor101.com` for **Production** in Vercel and redeploy. The variable is read at build time, so a redeploy is required. Check the redirects on the deployment's own URL before touching DNS:
    - `/101-blog/Actorsaccess` → 308 to the classroom lesson
    - `/101-blog/the-critical-conversation` → 307 to `https://legacy.childactor101.com/101-blog/the-critical-conversation`, and that page loads
16. At the DNS host, change **only** the apex and `www` records to the Vercel values. Leave MX, TXT, `legacy`, and every product subdomain untouched.
17. Remove `childactor101.com` / `www` from the Squarespace site's domains so Squarespace stops claiming them, without disconnecting `legacy.`.

## Phase 5: Test everything again on the real public domain

18. `https://www.childactor101.com/` serves the new site, and the apex redirects to `www` (or the reverse, as configured in Vercel).
19. Spot-check redirects on the public domain:
    - `/101-blog/Actorsaccess` → 308 to the classroom lesson
    - `/101-blog/the-critical-conversation` → 307 to the legacy host, and the article loads
    - `/101-blog/category/<name>?offset=1` → 307 to the legacy host with the query kept
20. Repeat steps 6–8 on the legacy host after DNS settles, including the delivery links from a fresh test purchase.
21. Open a few links from an old receipt or course email and confirm each still reaches the right place, or that its forward from steps 9–10 works.
22. Send a test email to an `@childactor101.com` address to confirm mail still arrives.
23. Submit `https://www.childactor101.com/sitemap.xml` in Google Search Console and watch the Pages report for spikes in 404s.

## Rollback

Restore the apex and `www` records from step 1, and set `www.childactor101.com` back as the Squarespace primary domain if needed. The legacy subdomain stays connected. To switch off only the fallback, unset `LEGACY_BLOG_ORIGIN` in Vercel and redeploy.

## Open questions to settle before Phase 4

- Does Squarespace serve `legacy.` as primary without redirecting to `www.`? (Steps 4 and 12)
- Which customer-facing Squarespace paths beyond `/101-blog/` need forwarding, including Stripe delivery and download links? (Steps 6, 9 and 10)
- Should the legacy copies of the 20 migrated articles be hidden from search on Squarespace, to avoid duplicates of the new lessons?
