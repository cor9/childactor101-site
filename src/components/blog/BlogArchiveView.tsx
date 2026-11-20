import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { getCategories, type BlogPostSummary } from "@/lib/blog";

export interface BlogArchiveViewProps {
  title: string;
  description: string;
  label?: string;
  posts: BlogPostSummary[];
  breadcrumbs?: BreadcrumbItem[];
  pagination?: { current: number; total: number };
  activeCategory?: string;
  totalPosts?: number;
}

export function BlogArchiveView({
  title,
  description,
  label = "101 Blog",
  posts,
  breadcrumbs,
  pagination,
  activeCategory,
  totalPosts,
}: BlogArchiveViewProps) {
  const categories = getCategories().slice(0, 12);

  return (
    <main className="overflow-hidden">
      <section className="relative px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.18),_transparent_30%)]" />
        <Container size="narrow" className="relative">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-6" /> : null}
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-chalkboard sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl">{description}</p>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-ink-soft">
            Looking for a guided path instead of a feed of articles?{" "}
            <Link href="/from-the-classroom" className="font-semibold text-purple-deep underline underline-offset-4 hover:text-chalkboard">
              From the Classroom
            </Link>{" "}
            organizes lessons by chapter.
          </p>
        </Container>
      </section>

      <Section className="bg-paper px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Container size="narrow">
          <BlogSearch>
            {categories.length > 0 ? (
              <nav aria-label="Blog categories" className="mb-10 flex flex-wrap justify-center gap-2">
                <Link
                  href="/101-blog"
                  aria-current={activeCategory ? undefined : "page"}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory ? "border border-chalkboard/15 bg-white text-chalkboard hover:bg-paper-warm" : "bg-chalkboard text-chalk"}`}
                >
                  All articles
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/101-blog/category/${category.slug}`}
                    aria-current={activeCategory === category.slug ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category.slug ? "bg-chalkboard text-chalk" : "border border-chalkboard/15 bg-white text-chalkboard hover:bg-paper-warm"}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            ) : null}

            {posts.length === 0 ? (
              <p className="text-center text-ink-soft">No articles here yet.</p>
            ) : (
              <>
                {totalPosts ? (
                  <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-chalkboard/60">
                    {totalPosts} {totalPosts === 1 ? "article" : "articles"}
                    {pagination && pagination.total > 1 ? ` · page ${pagination.current} of ${pagination.total}` : ""}
                  </p>
                ) : null}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post, position) => (
                    <BlogPostCard key={post.slug} post={post} priority={position < 3} />
                  ))}
                </div>
                {pagination ? <BlogPagination current={pagination.current} total={pagination.total} /> : null}
              </>
            )}
          </BlogSearch>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-14 sm:px-6 lg:px-8">
        <Container size="narrow" className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-display text-3xl leading-tight text-chalkboard">New to Child Actor 101? Start with the parent roadmap.</p>
          <Link
            href="/start-here"
            className="inline-flex items-center gap-2 rounded-full bg-chalkboard px-6 py-3 text-sm font-semibold text-chalk transition hover:bg-chalkboard-deep"
          >
            Start Here <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </Section>
    </main>
  );
}
