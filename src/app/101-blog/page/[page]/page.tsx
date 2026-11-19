import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { BlogArchiveView } from "@/components/blog/BlogArchiveView";
import { getAllPosts, getPageCount, getPostsForPage, pagePath } from "@/lib/blog";

type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, getPageCount() - 1) }, (_unused, position) => ({ page: String(position + 2) }));
}

function parsePage(raw: string): number | null {
  return /^\d+$/.test(raw) ? Number(raw) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (!page || page < 2 || page > getPageCount()) return {};

  return {
    title: `101 Blog, page ${page}`,
    description: `Page ${page} of the original Child Actor 101 blog archive.`,
    alternates: { canonical: pagePath(page) },
  };
}

export default async function BlogPageNumber({ params }: Props) {
  const page = parsePage((await params).page);
  const total = getPageCount();

  if (!page || page > total) notFound();
  // /101-blog/page/1 is the archive itself.
  if (page < 2) permanentRedirect("/101-blog");

  return (
    <BlogArchiveView
      title="The 101 Blog."
      description="Original Child Actor 101 articles: industry commentary, audition and self-tape advice, announcements, and archived resources."
      posts={getPostsForPage(page)}
      pagination={{ current: page, total }}
      totalPosts={getAllPosts().length}
      breadcrumbs={[{ label: "101 Blog", href: "/101-blog" }, { label: `Page ${page}` }]}
    />
  );
}
