/**
 * Original course order of the recreated NO EXCUSES! Adobe Express pages.
 *
 * The course is sold, so it lives at an unlisted, unguessable address (not linked from the site, marked noindex).
 * Stripe sends buyers to NO_EXCUSES_PRIVATE_BASE after purchase. Renaming it means renaming the folder
 * src/app/learn/<token> to match and replacing the token in src/content/adobe/no-excuses/*.json links.
 */
export const NO_EXCUSES_PRIVATE_BASE = "/learn/ne-9vphb2b1vsvl93";

const pages = [
  { slug: "welcome", title: "Welcome" },
  { slug: "write-it", title: "Write It" },
  { slug: "plan-prep-it", title: "Plan & Prep It" },
  { slug: "shoot-it", title: "Shoot It" },
  { slug: "edit-it", title: "Edit It" },
  { slug: "use-it", title: "Use It" },
] as const;

export const noExcusesPages = pages.map((page) => ({ ...page, href: `${NO_EXCUSES_PRIVATE_BASE}/${page.slug}` }));
