import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface ArticleCardProps {
  category?: string;
  className?: string;
  description: string;
  href: string;
  imageAlt?: string;
  imageSrc?: string;
  title: string;
  tone?: "paper" | "chalkboard" | "warm";
}

export function ArticleCard({
  category,
  className = "",
  description,
  href,
  imageAlt,
  imageSrc,
  title,
  tone = "paper",
}: ArticleCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className={`flex h-full flex-col overflow-hidden transition duration-200 group-hover:-translate-y-1 ${className}`} tone={tone}>
        {imageSrc ? (
          <div className="-mx-6 -mt-6 mb-6 overflow-hidden sm:-mx-8 sm:-mt-8">
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              width={720}
              height={480}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        ) : null}
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
