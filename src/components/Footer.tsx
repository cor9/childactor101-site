import Link from "next/link";

const footerColumns = [
  {
    heading: "Learn",
    links: [
      { href: "/start-here", label: "Start Here" },
      { href: "/#chapters", label: "From the Classroom" },
      { href: "/podcast", label: "Podcast" },
      { href: "/corey-ralston", label: "Meet Corey" },
    ],
  },
  {
    heading: "Create",
    links: [
      { href: "/ecosystem", label: "Resume101" },
      { href: "/ecosystem", label: "Pages101" },
      { href: "/ecosystem", label: "Prep101" },
    ],
  },
  {
    heading: "Perform",
    links: [
      { href: "/ecosystem", label: "Character Lab" },
      { href: "/ecosystem", label: "Audition Mastery" },
      { href: "/ecosystem", label: "The Craft" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-chalkboard/12 bg-chalkboard text-chalk">
      <div className="flex justify-center gap-4 px-4 pt-10 sm:px-6 lg:px-8">
        <span className="h-2.5 w-12 rounded-full bg-purple" />
        <span className="h-2.5 w-12 rounded-full bg-[#CB4435]" />
        <span className="h-2.5 w-12 rounded-full bg-[#A6E0C9]" />
        <span className="h-2.5 w-12 rounded-full bg-[#9A6536]" />
      </div>
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] lg:px-8">
        <div className="max-w-sm">
          <p className="font-display text-3xl leading-tight">Child Actor 101</p>
          <p className="mt-4 text-sm leading-7 text-chalk/72">
            Come inside. Let&apos;s learn.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-chalk/70">
              {column.heading}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-chalk/85">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link className="transition hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-chalk/10 px-4 py-5 text-center text-xs uppercase tracking-[0.18em] text-chalk/60 sm:px-6 lg:px-8">
        © Child Actor 101 · Privacy · Terms
      </div>
    </footer>
  );
}
