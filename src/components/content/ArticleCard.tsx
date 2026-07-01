import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface ArticleCardProps {
  category?: string;
  description: string;
  href: string;
  title: string;
}

export function ArticleCard({
  category,
  description,
  href,
  title,
}: ArticleCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="flex h-full flex-col transition duration-200 group-hover:-translate-y-1">
        {category ? (
          <Pill className="w-fit px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
            {category}
          </Pill>
        ) : null}
        <h3 className="mt-5 font-display text-2xl text-chalkboard">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{description}</p>
      </Card>
    </Link>
  );
}
