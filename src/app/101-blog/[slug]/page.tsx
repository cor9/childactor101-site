import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenText } from "lucide-react";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Pill } from "@/components/ui/Pill";
import {
  blogPostPath,
  formatPostDate,
  getAdjacentPosts,
  getAllPosts,
  getPost,
  getPostSummary,
  getRelatedPosts,
  postDescription,
  postIsoDate,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/site-links";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostSummary((await params).slug);
  if (!post) return {};

  const url = blogPostPath(post.slug);
  const image = post.featuredImage?.src;

  return {
    title: post.title,
    description: postDescription(post),
    // Always the primary domain, with the original (case-preserved) slug.
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: postDescription(post),
      url,
      siteName: "Child Actor 101",
      publishedTime: postIsoDate(post),
      modifiedTime: post.updated ?? postIsoDate(post),
      authors: post.author ? [post.author] : undefined,
      section: post.categories[0]?.name,
      tags: post.tags.map((tag) => tag.name),
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: post.title, description: postDescription(post) },
  };
}

function decodeURIComponentSafe(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Squarespace matched slugs case-insensitively; send variants to the one canonical spelling.
  if (post.slug !== decodeURIComponentSafe(slug)) permanentRedirect(blogPostPath(post.slug));

  const url = `${SITE_URL}${blogPostPath(post.slug)}`;
  const date = formatPostDate(post);
  const iso = postIsoDate(post);
  const { newer, older } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post);
  const heroImage = post.featuredImage && post.featuredImage.source !== "first-body-image" ? post.featuredImage : null;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: postDescription(post),
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      ...(iso ? { datePublished: iso, dateModified: post.updated ?? iso } : {}),
      ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
      publisher: {
        "@type": "Organization",
        name: "Child Actor 101",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/101logo.png` },
      },
      ...(post.featuredImage ? { image: [new URL(post.featuredImage.src, SITE_URL).href] } : {}),
      ...(post.categories[0] ? { articleSection: post.categories[0].name } : {}),
      ...(post.tags.length ? { keywords: post.tags.map((tag) => tag.name).join(", ") } : {}),
      wordCount: post.wordCount,
      inLanguage: "en-US",
      isPartOf: { "@type": "Blog", name: "101 Blog", url: `${SITE_URL}/101-blog` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "101 Blog", item: `${SITE_URL}/101-blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <article>
        <header className="relative px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <div className="absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.2),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.16),_transparent_30%)]" />
          <Container size="narrow" className="relative max-w-4xl">
            <Breadcrumbs items={[{ label: "101 Blog", href: "/101-blog" }, { label: post.title }]} className="mb-6" />
            {post.categories.length > 0 ? (
              <div className="mb-5 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link key={category.slug} href={`/101-blog/category/${category.slug}`}>
                    <Pill tone="light" className="px-4 py-2 text-xs uppercase tracking-[0.2em]">
                      {category.name}
                    </Pill>
                  </Link>
                ))}
              </div>
            ) : null}
            <h1 className="font-display text-4xl leading-[1.02] text-chalkboard sm:text-5xl lg:text-6xl">{post.title}</h1>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-chalkboard/65">
              {[
                post.author ? `By ${post.author}` : null,
                date ? <time key="date" dateTime={iso}>{date}</time> : null,
                post.wordCount > 0 ? `${post.readingMinutes} min read` : null,
              ]
                .filter(Boolean)
                .flatMap((part, position) => (position === 0 ? [part] : [" · ", part]))}
            </p>
          </Container>
        </header>

        <Section className="px-4 pb-16 sm:px-6 lg:px-8">
          <Container size="narrow" className="max-w-3xl">
            {heroImage ? (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[28px] bg-paper-warm shadow-soft">
                <Image
                  src={heroImage.src}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                  unoptimized={!heroImage.src.startsWith("/")}
                />
              </div>
            ) : null}
            {/* Body HTML is allow-list sanitised when imported, never at request time. */}
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.body }} />

            {post.tags.length > 0 ? (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-[#e4d8bf] pt-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-chalkboard/60">Tagged</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/101-blog/tag/${tag.slug}`}
                    className="rounded-full border border-chalkboard/15 bg-white px-3 py-1 text-sm text-chalkboard hover:bg-paper-warm"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </Container>
        </Section>
      </article>

      <Section className="bg-paper px-4 py-14 sm:px-6 lg:px-8">
        <Container size="narrow" className="grid max-w-5xl gap-4 sm:grid-cols-2">
          {newer ? (
            <Link href={blogPostPath(newer.slug)} rel="next" className="rounded-[28px] border border-[#ece2d0] bg-white p-6 shadow-[var(--shadow-paper)] transition hover:-translate-y-0.5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-deep">
                <ArrowLeft className="h-4 w-4" /> Newer
              </span>
              <span className="mt-3 block font-display text-xl leading-tight text-chalkboard">{newer.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {older ? (
            <Link href={blogPostPath(older.slug)} rel="prev" className="rounded-[28px] border border-[#ece2d0] bg-white p-6 text-right shadow-[var(--shadow-paper)] transition hover:-translate-y-0.5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-deep">
                Older <ArrowRight className="h-4 w-4" />
              </span>
              <span className="mt-3 block font-display text-xl leading-tight text-chalkboard">{older.title}</span>
            </Link>
          ) : null}
        </Container>

        {related.length > 0 ? (
          <Container size="narrow" className="mt-16">
            <h2 className="font-display text-3xl text-chalkboard sm:text-4xl">More from the 101 Blog</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogPostCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        ) : null}
      </Section>

      <Section className="bg-paper-warm px-4 py-14 sm:px-6 lg:px-8">
        <Container size="narrow" className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <p className="font-display text-3xl leading-tight text-chalkboard">Want lessons in order instead of articles by date?</p>
            <p className="mt-2 text-ink-soft">From the Classroom is the organized Child Actor 101 learning library, arranged by chapter.</p>
          </div>
          <Link
            href="/from-the-classroom"
            className="inline-flex items-center gap-2 rounded-full bg-chalkboard px-6 py-3 text-sm font-semibold text-chalk transition hover:bg-chalkboard-deep"
          >
            <BookOpenText className="h-4 w-4" /> From the Classroom
          </Link>
        </Container>
      </Section>
    </main>
  );
}
