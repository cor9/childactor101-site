import { getAllPosts, blogPostPath, postIsoDate } from "@/lib/blog";
import { SITE_URL } from "@/lib/site-links";

export const dynamic = "force-static";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllPosts()
    .slice(0, 50)
    .map((post) => {
      const url = `${SITE_URL}${blogPostPath(post.slug)}`;
      const iso = postIsoDate(post);
      return `<item><title>${escape(post.title)}</title><link>${escape(url)}</link><guid isPermaLink="true">${escape(url)}</guid>${
        iso ? `<pubDate>${new Date(iso).toUTCString()}</pubDate>` : ""
      }${post.author ? `<dc:creator>${escape(post.author)}</dc:creator>` : ""}<description>${escape(post.excerpt)}</description></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>101 Blog | Child Actor 101</title><link>${SITE_URL}/101-blog</link><description>Original Child Actor 101 articles for families navigating TV and film.</description>${items}</channel></rss>`;

  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
