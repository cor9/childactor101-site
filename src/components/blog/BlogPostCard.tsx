import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { blogPostPath, formatPostDate, type BlogPostSummary } from "@/lib/blog";

export interface BlogPostCardProps {
  post: BlogPostSummary;
  priority?: boolean;
}

export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  const date = formatPostDate(post);
  const image = post.featuredImage?.src;
  const category = post.categories[0]?.name;

  return (
    <Link href={blogPostPath(post.slug)} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition duration-200 group-hover:-translate-y-1">
        {image ? (
          <div className="relative -mx-6 -mt-6 mb-6 aspect-[3/2] overflow-hidden bg-paper-warm sm:-mx-8 sm:-mt-8">
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
              priority={priority}
              // Hot-linked Squarespace images are served as-is; local copies use the optimizer.
              unoptimized={!image.startsWith("/")}
            />
          </div>
        ) : null}
        {category ? (
          <Pill className="w-fit px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
            {category}
          </Pill>
        ) : null}
        <h3 className="mt-5 font-display text-2xl leading-tight text-chalkboard">{post.title}</h3>
        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-7 text-ink-soft">{post.excerpt}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-chalkboard/60">
          {[date, post.author].filter(Boolean).join(" · ")}
        </p>
      </Card>
    </Link>
  );
}
