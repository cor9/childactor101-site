import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArchiveView } from "@/components/blog/BlogArchiveView";
import { getPostsByTag, getTags } from "@/lib/blog";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: tag.slug }));
}

async function resolve(params: Props["params"]) {
  const slug = decodeURIComponent((await params).tag);
  return getTags().find((entry) => entry.slug.toLowerCase() === slug.toLowerCase()) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await resolve(params);
  if (!tag) return {};

  return {
    title: `${tag.name} articles | 101 Blog`,
    description: `Child Actor 101 blog articles tagged ${tag.name}.`,
    alternates: { canonical: `/101-blog/tag/${tag.slug}` },
    // A tag used by a single article is a thin duplicate of that article; keep it reachable, out of search.
    ...(tag.count < 2 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BlogTagPage({ params }: Props) {
  const tag = await resolve(params);
  if (!tag) notFound();

  const posts = getPostsByTag(tag.slug);

  return (
    <BlogArchiveView
      title={`Tagged: ${tag.name}`}
      label="101 Blog tag"
      description={`Original Child Actor 101 articles tagged ${tag.name}.`}
      posts={posts}
      totalPosts={posts.length}
      breadcrumbs={[{ label: "101 Blog", href: "/101-blog" }, { label: tag.name }]}
    />
  );
}
