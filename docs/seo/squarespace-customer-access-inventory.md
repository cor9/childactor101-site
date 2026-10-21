# Squarespace customer-access inventory

**Status: INCOMPLETE. Do not change the Squarespace primary domain yet.** This inventory could not be finished from the environment the work was done in. It records what was found, what is still unknown, and the exact exports needed to close it.

## Bottom line

- **Nothing here can see inside Squarespace.** The sandbox cannot reach `childactor101.com` (DNS lookups fail), and no Squarespace connector is available. Store, member-area, account, cart, checkout and delivery paths have **not** been listed by anyone.
- **Evidence that customers rarely touch Squarespace for purchases.** Sales and delivery appear to run through Stripe Payment Links, short links, a Vercel app and Skool (see below). No Squarespace order, billing or member-area emails newer than 2021 were found in the mailbox searched. This is weak evidence, not proof: Squarespace notifications may go to another address.
- **One live problem, unrelated to the cutover:** the Prep101 Stripe success redirect runs through `childactor101.sbs`, a domain Namecheap flagged for renewal on Aug 23, 2026 and Vercel reported as misconfigured on Oct 4, 2026. See "Live risk" below.
- **The tool to finish the job exists.** Export the Squarespace sitemap and the short-link list, run `node scripts/classify-legacy-urls.mjs`, and it lists every path that would 404 or be replaced after the switch.

## How this was investigated, and its limits

| Source | What was checked | Result |
|---|---|---|
| Live site | Fetch of `https://www.childactor101.com/sitemap.xml` | Failed: DNS lookup blocked in the sandbox |
| Repository | Course data, site links, inventory, scripts | No payment, login or gated-access code. Courses were restored from Adobe Express pages |
| Vercel (read-only) | Projects, domains, one deployment's files | 8 projects found; details below |
| Gmail (read-only) | System and platform senders (Stripe, Vercel, Namecheap, Short.io, Squarespace) and order or access subjects | Findings below. Two customer messages appeared in search results; they are referred to in general terms only and no customer details are recorded here |
| Google Drive | Search for Squarespace exports or sitemaps | None found |

The Drive search was broader than needed and also returned unrelated personal files; none were opened or used.

## Systems customers touch

| System | Where it lives | Evidence | Affected by moving the root domain? |
|---|---|---|---|
| Stripe Payment Links and Checkout | Stripe. A custom checkout domain `pay.childactor101.com` is active for the "101 Directory" Stripe account (Oct 2025) | Stripe notices; short-link referrer data shows `buy.stripe.com` clicks | Not if the `pay` DNS record is left alone |
| Prep101 app and payment success pages | `prep101.childactor101.com` | Redirect target in the `childactor101-success` project | Not if the `prep101` record is left alone |
| Stripe success redirector | Vercel project `childactor101-success` on `childactor101.sbs` and `www.childactor101.sbs` | Static redirector (see Live risk) | Separate domain, unaffected by the root switch |
| Short links | `go.childactor101.com` on Short.io | Monthly Short.io reports; one customer message shows a guide delivered through a `go.` link | Record unaffected, but **link destinations may point at `www` paths**. Not yet exported |
| Newsletter and free-guide delivery | EmailOctopus (`childactor-101.eo.page`), welcome email, `go.` links | Subscriber email threads; a customer reported not being able to get a guide in Jan 2025 | Destinations may point at `www` paths |
| Paid classes ("Be Scene", "THE BREAKDOWN") | Platform unknown; mail comes from `coaching@coreyralston.pro`; `coaching.childactor101.com` exists | A customer reported paying and receiving no login details (Aug 2025) | Unknown. Delivery process is outside this repo |
| Community | Skool group "Child Actor 101" | Skool welcome email (Mar 2024) | No |
| Squarespace site | Squarespace | Platform emails only from 2020 and 2021. A built-in address `opossum-blenny-ejnm.squarespace.com` appears in an old blog preview link | **Yes: this is the site being moved.** What it holds for customers is unknown |

Not Squarespace-hosted and not affected: Directory (`directory.childactor101.com`, with a Stripe webhook that Stripe disabled in Oct 2025), Pages101, Resume101, Prep101, Talent portal and the other tool subdomains.

## Live risk: `childactor101.sbs`

- `childactor101.sbs` is attached to a Vercel project that does one thing: send Stripe Payment Link success redirects to `https://prep101.childactor101.com/app/stripe/success` and `/payment-success`. Its README says to keep the Stripe Payment Links pointed at it.
- Namecheap's 30-day notice (July 24, 2026) listed `childactor101.sbs` among domains due Aug 23, 2026 (auto-renew shown as On) and said some auto-renewals could not be processed. Vercel's Oct 4, 2026 notice reports `childactor101.sbs` and `www.childactor101.sbs` as **misconfigured**.
- Stripe reported delivery failures for a webhook at `https://childactor101.sbs` in April 2026. That deployment contains only `README.md`, `index.html` and `vercel.json`, with no server code, so it could not process a webhook.
- **Not verified:** whether the domain has actually lapsed or which Payment Links use it. If it has, buyers finishing a Prep101 purchase may not reach the success page. Nothing was changed.
- Options for you to decide: renew the domain, or point those Payment Links' after-payment URL directly at `https://prep101.childactor101.com/app/stripe/success` so the dependency goes away.

## DNS records that must not change

In addition to the list in `legacy-squarespace-cutover.md`: `pay`, `go`, `prep101`, `coaching`, and every other subdomain already listed there. The `childactor101.sbs` domain is separate from the root switch. Also confirm where `childactor101.com` itself is registered and when it expires: the Namecheap notice found did not list it, so its registrar and expiry are **unverified**.

## What only you can supply

None of this is reachable from the tools used. Menu names in Squarespace change over time and were not checked.

1. **Squarespace:**
   - Save `https://www.childactor101.com/sitemap.xml` as a file.
   - List all pages, including any "Not Linked" ones.
   - List store products, digital products, subscriptions and recent orders (or confirm there are none).
   - List member areas or course areas and their members, if any.
   - Note the primary domain, the built-in `*.squarespace.com` address, and any existing URL redirects.
   - Note whether the site embeds Stripe or short links, including in header code.
2. **Stripe (both accounts):** for each Payment Link, the after-payment redirect URL; Checkout `success_url` and cancel URLs used by the apps; customer-portal return URL; all webhook endpoints.
3. **Short.io:** export of all links with their destination URLs.
4. **EmailOctopus:** links used in the welcome email and automations.
5. **Registrar and DNS host:** a full DNS record export, and the registrar and expiry date for `childactor101.com` and `childactor101.sbs`.
6. **Two or three real customer test accounts** for the access tests in the cutover runbook.

## Finishing the inventory

Put the exports in one folder, then run:

```
node scripts/classify-legacy-urls.mjs sitemap.xml short-links.csv stripe-links.csv
node scripts/classify-legacy-urls.mjs sitemap.xml short-links.csv --json
```

The script classifies every `childactor101.com` URL it finds as handled by a verified redirect, handled by the gated fallback, preserved, **replaced by a new-site page**, or **unhandled (404 after cutover)**. It flags paths that look like store, cart, checkout, account, member, course, download or file paths as CUSTOMER ACCESS, lists other subdomains whose DNS must stay, and with `--json` prints reviewable entries for `src/content/legacy-preserved-pages.json`. It exits 1 if anything is unhandled or a customer-access path would be replaced by a new-site page.

A sitemap alone is not enough: it does not list member-only pages, cart, checkout, account pages, `/s/` file links, or pages hidden from search. The other exports cover those gaps.

## Gate before changing the primary domain

All of these must be true:

1. The classifier exits 0 on the full set of exports, or every remaining item has an explicit owner decision.
2. No customer-access path is replaced by a new-site page without a decision (`/courses`, `/podcast`, `/start-here` and similar new routes must be checked against what the old site served there).
3. The new entries are in `legacy-preserved-pages.json`, `npm run test:redirects` passes, and `check-legacy-blog-origin.mjs --all` passes against the live legacy host.
4. The live-risk item above is resolved or consciously accepted.
5. The purchase, login and video tests in the cutover runbook pass on the legacy host.
