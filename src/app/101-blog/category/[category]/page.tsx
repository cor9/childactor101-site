import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArchiveView } from "@/components/blog/BlogArchiveView";
import { getCategories, getPostsByCategory } from "@/lib/blog";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }));
}

async function resolve(params: Props["params"]) {
  const slug = decodeURIComponent((await params).category);
  const category = getCategories().find((entry) => entry.slug.toLowerCase() === slug.toLowerCase());
  return category ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await resolve(params);
  if (!category) return {};

  return {
    title: `${category.name} articles | 101 Blog`,
    description: `Child Actor 101 blog articles filed under ${category.name}.`,
    alternates: { canonical: `/101-blog/category/${category.slug}` },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const category = await resolve(params);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <BlogArchiveView
      title={category.name}
      label="101 Blog category"
      description={`Original Child Actor 101 articles filed under ${category.name}.`}
      posts={posts}
      totalPosts={posts.length}
      activeCategory={category.slug}
      breadcrumbs={[{ label: "101 Blog", href: "/101-blog" }, { label: category.name }]}
    />
  );
}
