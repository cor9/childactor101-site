import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parent Course Bundle",
};

export default function ParentCourseBundlePage() {
  const watchLinkClass =
    "flex items-center justify-center rounded-2xl bg-chalkboard px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-purple-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-deep";

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="rounded-[32px] border border-[#e7dcc7] bg-white p-6 shadow-soft sm:p-10">
        <h1 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
          Parent Course Bundle
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Both courses are ready to watch. Bookmark this page so you can come back anytime.
        </p>
        <div className="mt-8 grid gap-4">
          <Link className={watchLinkClass} href="/learn/pst-mz3vspur4szgo4">
            Watch The Perfect Self Tape
          </Link>
          <Link className={watchLinkClass} href="/learn/ne-9vphb2b1vsvl93/welcome">
            Watch NO EXCUSES! DIY Actor Demo Reel Clips
          </Link>
        </div>
      </div>
    </main>
  );
}
