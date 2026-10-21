/**
 * Original order of the recreated The Perfect Self Tape Adobe Express pages (hub first).
 *
 * The course is sold, so it lives at an unlisted, unguessable address (not linked from the site, marked noindex).
 * Stripe sends buyers to PERFECT_SELF_TAPE_PRIVATE_BASE after purchase. Renaming it means renaming the folder
 * src/app/learn/<token> to match and replacing the token in src/content/adobe/perfect-self-tape/*.json links.
 */
export const PERFECT_SELF_TAPE_PRIVATE_BASE = "/learn/pst-mz3vspur4szgo4";

const pages = [
  { slug: "index", title: "The Perfect Self Tape" },
  { slug: "equipment-guide", title: "Equipment Guide" },
  { slug: "properly-lit", title: "Properly Lit" },
  { slug: "perfect-frame", title: "Perfect Frame" },
  { slug: "slates-that-shine", title: "Slates That Shine" },
  { slug: "role-of-the-reader", title: "Role of the Reader" },
  { slug: "performance-coaching", title: "Performance Coaching" },
  { slug: "quick-editing", title: "Quick Editing" },
  { slug: "parent-survival-tips", title: "Parent Survival Tips" },
  { slug: "sending-tapes", title: "Sending Tapes" },
  { slug: "bending-the-rules", title: "Bending the Rules" },
] as const;

export const perfectSelfTapePages = pages.map((page) => ({
  ...page,
  href: page.slug === "index" ? PERFECT_SELF_TAPE_PRIVATE_BASE : `${PERFECT_SELF_TAPE_PRIVATE_BASE}/${page.slug}`,
}));
