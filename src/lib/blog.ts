import indexData from "@/content/blog/index.json";

/**
 * Native 101 Blog data layer. Posts are imported from the official Squarespace export by
 * scripts/blog/import-squarespace.mjs into src/content/blog. index.json holds lightweight
 * summaries (archive, sitemap, redirects); each full post lives in posts/<lowercase-slug>.json
 * and is loaded on demand so archive pages never ship article bodies.
 */
export const BLOG_BASE_PATH = "/101-blog";
export const POSTS_PER_PAGE = 12;

export interface BlogTerm {
  name: string;
  slug: string;
}

export interface BlogImage {
  url: string;
  src: string;
  source: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  author: string | null;
  date: string | null;
  dateDisplay: string | null;
  updated: string | null;
  excerpt: string;
  excerptSource: string;
  categories: BlogTerm[];
  tags: BlogTerm[];
  featuredImage: BlogImage | null;
  originalUrl: string | null;
  wordCount: number;
  readingMinutes: number;
  imageCount: number;
}

export interface BlogPost extends BlogPostSummary {
  body: string;
  images: string[];
  internalLinks: string[];
}

const posts = indexData as unknown as BlogPostSummary[];

export function getAllPosts(): BlogPostSummary[] {
  return posts;
}

export function hasBlogPosts(): boolean {
  return posts.length > 0;
}

/** URL path for an article. Slugs are kept exactly as published; only unsafe characters are percent-encoded. */
export function blogPostPath(slug: string): string {
  return `${BLOG_BASE_PATH}/${encodeURIComponent(safeDecode(slug))}`;
}

/** Squarespace matched slugs case-insensitively, so lookups do too. */
export function getPostSummary(slug: string): BlogPostSummary | undefined {
  const wanted = safeDecode(slug).toLowerCase();
  return posts.find((post) => post.slug.toLowerCase() === wanted);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const summary = getPostSummary(slug);
  if (!summary) return null;

  try {
    const loaded = await import(`@/content/blog/posts/${summary.slug.toLowerCase()}.json`);
    return loaded.default as BlogPost;
  } catch {
    return null;
  }
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function getPageCount(total: number = posts.length): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function getPostsForPage(page: number): BlogPostSummary[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}

export function pagePath(page: number): string {
  return page <= 1 ? BLOG_BASE_PATH : `${BLOG_BASE_PATH}/page/${page}`;
}

export interface TermCount extends BlogTerm {
  count: number;
}

function collectTerms(select: (post: BlogPostSummary) => BlogTerm[]): TermCount[] {
  const counts = new Map<string, TermCount>();
  for (const post of posts) {
    for (const term of select(post)) {
      const existing = counts.get(term.slug);
      if (existing) existing.count += 1;
      else counts.set(term.slug, { ...term, count: 1 });
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const getCategories = () => collectTerms((post) => post.categories);
export const getTags = () => collectTerms((post) => post.tags);

export const getPostsByCategory = (slug: string) =>
  posts.filter((post) => post.categories.some((term) => term.slug === slug));
export const getPostsByTag = (slug: string) => posts.filter((post) => post.tags.some((term) => term.slug === slug));

export function getAdjacentPosts(slug: string): { newer: BlogPostSummary | null; older: BlogPostSummary | null } {
  const position = posts.findIndex((post) => post.slug === slug);
  if (position === -1) return { newer: null, older: null };
  return { newer: posts[position - 1] ?? null, older: posts[position + 1] ?? null };
}

/** Same-category posts first, then same-tag, newest first. Never includes the post itself. */
export function getRelatedPosts(post: BlogPostSummary, limit = 3): BlogPostSummary[] {
  const categories = new Set(post.categories.map((term) => term.slug));
  const tags = new Set(post.tags.map((term) => term.slug));
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.categories.filter((term) => categories.has(term.slug)).length * 2 +
        candidate.tags.filter((term) => tags.has(term.slug)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

/** Meta description: the excerpt, or a plain sentence for posts that are all images and video. */
export function postDescription(post: Pick<BlogPostSummary, "title" | "excerpt">): string {
  return post.excerpt.trim() || `Read “${post.title}” on the original Child Actor 101 blog.`;
}

export function formatPostDate(post: Pick<BlogPostSummary, "date" | "dateDisplay">): string | null {
  const day = post.dateDisplay ?? post.date?.slice(0, 10);
  if (!day) return null;
  const [year, month, date] = day.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, date)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** ISO date used in structured data, sitemap, and feed. */
export function postIsoDate(post: Pick<BlogPostSummary, "date" | "dateDisplay">): string | undefined {
  return post.date ?? (post.dateDisplay ? `${post.dateDisplay}T00:00:00.000Z` : undefined);
}

export interface BlogSearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  author: string | null;
  date: string | null;
  categories: string[];
  tags: string[];
  image: string | null;
}

export function getSearchEntries(): BlogSearchEntry[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: postDescription(post),
    author: post.author,
    date: formatPostDate(post),
    categories: post.categories.map((term) => term.name),
    tags: post.tags.map((term) => term.name),
    image: post.featuredImage?.src ?? null,
  }));
}
