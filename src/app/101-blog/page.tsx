import type { Metadata } from "next";

import { BlogArchiveView } from "@/components/blog/BlogArchiveView";
import { getAllPosts, getPageCount, getPostsForPage } from "@/lib/blog";

export const metadata: Metadata = {
  title: "101 Blog",
  description:
    "The original Child Actor 101 blog: years of articles, industry commentary, audition and self-tape advice, announcements, and resources for parents of young actors.",
  alternates: { canonical: "/101-blog" },
};

export default function BlogIndexPage() {
  return (
    <BlogArchiveView
      title="The 101 Blog."
      description="Original Child Actor 101 articles: industry commentary, audition and self-tape advice, announcements, and archived resources for families navigating TV and film."
      posts={getPostsForPage(1)}
      pagination={{ current: 1, total: getPageCount() }}
      totalPosts={getAllPosts().length}
    />
  );
}
