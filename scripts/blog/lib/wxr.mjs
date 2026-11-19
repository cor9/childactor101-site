/**
 * Squarespace export (WordPress WXR XML) -> Child Actor 101 blog post records.
 *
 * Squarespace's official export is Settings > Developer Tools > Import / Export > Export,
 * which produces a WordPress-format ".xml" file (WXR 1.2). Each blog post is an <item> with:
 *   <title>, <link>, <pubDate>, <dc:creator>, <content:encoded>, <excerpt:encoded>,
 *   <wp:post_id>, <wp:post_date>, <wp:post_date_gmt>, <wp:post_name> (the slug), <wp:status>,
 *   <wp:post_type>post, <category domain="category|post_tag" nicename="...">, <wp:postmeta>
 * Uploaded images are separate <item>s with <wp:post_type>attachment and <wp:attachment_url>.
 *
 * Nothing in this file invents content: every field comes from the export, or is left null and
 * reported by the audit.
 */
import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";

export const SITE_HOSTS = ["childactor101.com", "www.childactor101.com", "legacy.childactor101.com"];
export const BLOG_PREFIX = "/101-blog";

/** Path segments under /101-blog that are archive routes, not articles. */
export const RESERVED_SLUGS = ["page", "category", "tag", "feed.xml", "rss.xml", "search-index.json"];

const SLUG_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._~%-]*$/;

const IFRAME_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "youtube.com",
  "player.vimeo.com",
  "open.spotify.com",
  "w.soundcloud.com",
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseTagValue: false,
  parseAttributeValue: false,
  trimValues: true,
  processEntities: true,
  isArray: (name) => ["item", "category", "wp:postmeta"].includes(name),
});

const text = (value) => {
  if (value === undefined || value === null) return "";
  if (typeof value === "object") return String(value["#text"] ?? "").trim();
  return String(value).trim();
};

export function stripTags(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function countWords(html) {
  const plain = stripTags(html);
  return plain ? plain.split(" ").length : 0;
}

/** Normalises an image URL so the same asset always maps to one manifest key. */
export function normalizeImageUrl(raw) {
  let value = raw.trim();
  if (value.startsWith("//")) value = `https:${value}`;
  if (value.startsWith("http://")) value = `https://${value.slice(7)}`;
  return value;
}

function toIso(gmt, local) {
  const pick = [gmt, local].find((value) => value && !value.startsWith("0000"));
  if (!pick) return null;
  const iso = pick.includes("T") ? pick : pick.replace(" ", "T");
  const date = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** WordPress [caption] shortcodes -> <figure>. Squarespace uses them for captioned images. */
function convertCaptions(html) {
  return html.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, (_all, inner) => {
    const match = inner.match(/^([\s\S]*?<img[^>]*>(?:\s*<\/a>)?)([\s\S]*)$/i);
    if (!match) return inner;
    const caption = match[2].trim();
    return `<figure>${match[1]}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  });
}

/** Rewrites links that point at the old or legacy host so they stay on the primary domain. */
export function rewriteHref(href) {
  let url;
  try {
    url = new URL(href, "https://www.childactor101.com");
  } catch {
    return { href, internal: false };
  }
  const isRelative = !/^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith("//");
  if (isRelative || SITE_HOSTS.includes(url.hostname.toLowerCase())) {
    const path = `${url.pathname}${url.search}${url.hash}`;
    return { href: path === "" ? "/" : path, internal: true, pathname: url.pathname };
  }
  return { href, internal: false };
}

export function cleanBody(rawHtml) {
  const images = new Set();
  const internalLinks = new Set();
  const externalLinks = new Set();
  const issues = { imagesWithoutAlt: 0, iframesDropped: 0 };

  const html = sanitizeHtml(convertCaptions(rawHtml), {
    allowedTags: [
      "p", "br", "hr", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "strong", "b", "em", "i", "u", "s",
      "blockquote", "img", "figure", "figcaption", "iframe", "table", "thead", "tbody", "tr", "th", "td",
      "div", "span", "pre", "code", "sup", "sub",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "title", "loading", "decoding"],
      iframe: ["src", "width", "height", "title", "allowfullscreen", "frameborder", "allow", "loading"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"], iframe: ["https"] },
    allowProtocolRelative: true,
    allowedIframeHostnames: IFRAME_HOSTS,
    exclusiveFilter: (frame) => {
      if (frame.tag === "iframe" && !frame.attribs.src) {
        issues.iframesDropped += 1;
        return true;
      }
      // Drop empty paragraphs that Squarespace leaves behind.
      return frame.tag === "p" && !frame.text.trim() && frame.mediaChildren.length === 0;
    },
    transformTags: {
      h1: "h2",
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.href) {
          const result = rewriteHref(next.href);
          next.href = result.href;
          if (result.internal) {
            if (result.pathname?.toLowerCase().startsWith(BLOG_PREFIX)) internalLinks.add(result.pathname);
            delete next.target;
          } else if (/^https?:/i.test(result.href)) {
            externalLinks.add(result.href);
            next.rel = "noopener noreferrer";
            if (next.target) next.target = "_blank";
          }
        }
        return { tagName, attribs: next };
      },
      img: (tagName, attribs) => {
        const next = { ...attribs };
        const source = next.src || next["data-src"] || next["data-image"];
        if (source) {
          next.src = normalizeImageUrl(source);
          images.add(next.src);
        }
        if (next.alt === undefined) issues.imagesWithoutAlt += 1;
        next.alt = next.alt ?? "";
        next.loading = "lazy";
        next.decoding = "async";
        return { tagName, attribs: next };
      },
    },
  });

  return { html: html.trim(), images: [...images], internalLinks: [...internalLinks], externalLinks: [...externalLinks], issues };
}

/** Parses one export file into raw post items plus attachment lookups. */
export function parseExport(xml, fileLabel = "export.xml") {
  let root;
  try {
    root = parser.parse(xml);
  } catch (error) {
    throw new Error(`${fileLabel}: not valid XML (${error.message})`);
  }
  const channel = root?.rss?.channel;
  if (!channel) {
    throw new Error(`${fileLabel}: not a Squarespace/WordPress (WXR) export: no <rss><channel> element found.`);
  }

  const items = channel.item ?? [];
  const attachments = new Map();
  const posts = [];
  const other = [];

  for (const item of items) {
    const type = text(item["wp:post_type"]) || "post";
    if (type === "attachment") {
      attachments.set(text(item["wp:post_id"]), {
        url: text(item["wp:attachment_url"]) || text(item["guid"]),
        parent: text(item["wp:post_parent"]),
        title: text(item.title),
      });
    } else if (type === "post") {
      posts.push(item);
    } else {
      other.push({ type, title: text(item.title), link: text(item.link) });
    }
  }

  return { posts, attachments, other, site: { title: text(channel.title), link: text(channel.link) } };
}

export function buildPost(item, attachments, options = {}) {
  const warnings = [];
  const link = text(item.link);
  let pathname = "";
  try {
    pathname = new URL(link, "https://www.childactor101.com").pathname;
  } catch {
    // reported below
  }

  const slug = text(item["wp:post_name"]) || decodeURIComponent(pathname.split("/").filter(Boolean).pop() ?? "");
  const title = text(item.title);
  const rawBody = text(item["content:encoded"]);
  const status = text(item["wp:status"]) || "publish";
  const date = toIso(text(item["wp:post_date_gmt"]), text(item["wp:post_date"]));
  // Calendar date as the site displayed it (site-local), so a late-evening post is not shifted a day by UTC.
  const localMatch = text(item["wp:post_date"]).match(/^(\d{4}-\d{2}-\d{2})/);
  const dateDisplay = localMatch && localMatch[1] !== "0000-00-00" ? localMatch[1] : date ? date.slice(0, 10) : null;
  const creator = text(item["dc:creator"]);
  const author = options.authorMap?.[creator] ?? (creator || null);

  if (!slug) warnings.push("no slug");
  if (slug && !SLUG_PATTERN.test(slug)) warnings.push(`unusual slug characters: ${slug}`);
  if (RESERVED_SLUGS.includes(slug.toLowerCase())) warnings.push(`slug collides with a reserved blog route: ${slug}`);
  if (!title) warnings.push("no title");
  if (!date) warnings.push("no publication date");
  if (!author) warnings.push("no author");
  if (!rawBody) warnings.push("empty body");
  if (pathname && !pathname.toLowerCase().startsWith(`${BLOG_PREFIX}/`)) warnings.push(`original path is not under ${BLOG_PREFIX}: ${pathname}`);

  const cleaned = cleanBody(rawBody);
  const bodyText = stripTags(cleaned.html);

  const categories = [];
  const tags = [];
  for (const entry of item.category ?? []) {
    const name = text(entry);
    const slugValue = entry["@_nicename"] || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!name) continue;
    const target = entry["@_domain"] === "post_tag" ? tags : categories;
    if (!target.some((existing) => existing.slug === slugValue)) target.push({ name, slug: slugValue });
  }

  // Featured image: _thumbnail_id postmeta, then attachments whose parent is this post, then first body image.
  const meta = Object.fromEntries((item["wp:postmeta"] ?? []).map((entry) => [text(entry["wp:meta_key"]), text(entry["wp:meta_value"])]));
  const postId = text(item["wp:post_id"]);
  let featuredImage = null;
  const thumb = attachments.get(meta._thumbnail_id);
  if (thumb?.url) featuredImage = { url: normalizeImageUrl(thumb.url), source: "thumbnail" };
  if (!featuredImage) {
    const child = [...attachments.values()].find((attachment) => attachment.parent && attachment.parent === postId && attachment.url);
    if (child) featuredImage = { url: normalizeImageUrl(child.url), source: "attachment" };
  }
  if (!featuredImage && cleaned.images[0]) featuredImage = { url: cleaned.images[0], source: "first-body-image" };

  const imageUrls = new Set(cleaned.images);
  if (featuredImage) imageUrls.add(featuredImage.url);

  const excerptText = stripTags(text(item["excerpt:encoded"]));
  const excerpt = excerptText || (bodyText.length > 200 ? `${bodyText.slice(0, 197).replace(/\s+\S*$/, "")}…` : bodyText);

  return {
    status,
    warnings,
    post: {
      slug,
      title,
      author,
      date,
      dateDisplay,
      updated: null,
      excerpt,
      excerptSource: excerptText ? "export" : "derived-from-body",
      categories,
      tags,
      featuredImage,
      originalUrl: link || null,
      originalPath: pathname || null,
      sourceId: postId || null,
      wordCount: countWords(cleaned.html),
      readingMinutes: Math.max(1, Math.round(countWords(cleaned.html) / 220)),
      images: [...imageUrls],
      internalLinks: cleaned.internalLinks,
      externalLinkCount: cleaned.externalLinks.length,
      contentIssues: cleaned.issues,
      body: cleaned.html,
    },
  };
}
