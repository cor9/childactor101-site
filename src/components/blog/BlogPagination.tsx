import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { pagePath } from "@/lib/blog";

export interface BlogPaginationProps {
  current: number;
  total: number;
}

function visiblePages(current: number, total: number): (number | "gap")[] {
  const pages = new Set([1, total, current - 1, current, current + 1].filter((page) => page >= 1 && page <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "gap")[] = [];
  sorted.forEach((page, position) => {
    if (position > 0 && page - sorted[position - 1] > 1) result.push("gap");
    result.push(page);
  });
  return result;
}

const base = "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition";

export function BlogPagination({ current, total }: BlogPaginationProps) {
  if (total <= 1) return null;

  return (
    <nav aria-label="Blog pages" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {current > 1 ? (
        <Link href={pagePath(current - 1)} rel="prev" className={`${base} border border-chalkboard/15 bg-white text-chalkboard hover:bg-paper-warm`}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Newer
        </Link>
      ) : null}
      {visiblePages(current, total).map((page, position) =>
        page === "gap" ? (
          <span key={`gap-${position}`} className="px-1 text-chalkboard/50" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={pagePath(page)}
            aria-label={`Page ${page}`}
            aria-current={page === current ? "page" : undefined}
            className={`${base} ${page === current ? "bg-chalkboard text-chalk" : "border border-chalkboard/15 bg-white text-chalkboard hover:bg-paper-warm"}`}
          >
            {page}
          </Link>
        ),
      )}
      {current < total ? (
        <Link href={pagePath(current + 1)} rel="next" className={`${base} border border-chalkboard/15 bg-white text-chalkboard hover:bg-paper-warm`}>
          Older <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}
