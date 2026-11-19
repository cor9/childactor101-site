"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import type { BlogSearchEntry } from "@/lib/blog";

const SEARCH_INDEX_URL = "/101-blog/search-index.json";

function matches(entry: BlogSearchEntry, terms: string[]): boolean {
  const haystack = [entry.title, entry.excerpt, entry.author ?? "", ...entry.categories, ...entry.tags].join(" ").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

/**
 * Searches title, excerpt, author, categories and tags. The index is fetched the first time the
 * field is used, so archive pages stay light. While a search is active the normal archive
 * (children) is hidden; clearing the field brings it back. Without JavaScript the archive and
 * its pagination still work.
 */
export function BlogSearch({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<BlogSearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const loading = useRef(false);

  async function ensureIndex() {
    if (entries || loading.current) return;
    loading.current = true;
    try {
      const response = await fetch(SEARCH_INDEX_URL);
      if (!response.ok) throw new Error(String(response.status));
      setEntries((await response.json()) as BlogSearchEntry[]);
    } catch {
      setFailed(true);
      loading.current = false;
    }
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const active = terms.length > 0;
  const results = active && entries ? entries.filter((entry) => matches(entry, terms)) : [];

  return (
    <div>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="relative mx-auto max-w-2xl">
        <label htmlFor="blog-search" className="sr-only">
          Search the 101 Blog
        </label>
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-chalkboard/55" aria-hidden="true" />
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={ensureIndex}
          placeholder="Search articles by topic, title, or author"
          autoComplete="off"
          className="h-14 w-full appearance-none rounded-full [&::-webkit-search-cancel-button]:hidden border border-chalkboard/15 bg-white pl-14 pr-12 text-base text-ink shadow-soft outline-none transition placeholder:text-ink-soft/60 focus:border-purple-deep focus:ring-4 focus:ring-purple/20"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-chalkboard/60 hover:bg-paper-warm"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </form>

      {active ? (
        <section aria-live="polite" className="mt-10">
          {failed ? (
            <p className="text-center text-ink-soft">Search is unavailable right now. Browse the archive below instead.</p>
          ) : !entries ? (
            <p className="text-center text-ink-soft">Searching…</p>
          ) : results.length === 0 ? (
            <p className="text-center text-ink-soft">No articles match “{query.trim()}”. Try a broader word, like “self-tape” or “agent”.</p>
          ) : (
            <>
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-chalkboard/60">
                {results.length} {results.length === 1 ? "article" : "articles"}
              </p>
              <ul className="mx-auto grid max-w-4xl gap-4">
                {results.slice(0, 60).map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/101-blog/${entry.slug}`}
                      className="block rounded-[28px] border border-[#ece2d0] bg-white p-6 shadow-[var(--shadow-paper)] transition hover:-translate-y-0.5"
                    >
                      <h3 className="font-display text-2xl leading-tight text-chalkboard">{entry.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-7 text-ink-soft">{entry.excerpt}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-chalkboard/60">
                        {[entry.date, entry.author].filter(Boolean).join(" · ")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > 60 ? <p className="mt-6 text-center text-sm text-ink-soft">Showing the first 60. Narrow your search to see more.</p> : null}
            </>
          )}
        </section>
      ) : null}

      <div hidden={active} className="mt-10">
        {children}
      </div>
    </div>
  );
}
