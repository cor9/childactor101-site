import { NewsletterSignup } from "@/components/NewsletterSignup";

export interface NewsletterProps {
  ctaHref: string;
  ctaLabel: string;
  description: string;
  label?: string;
  note?: string;
  title: string;
}

export function Newsletter({
  ctaHref,
  ctaLabel,
  description,
  label,
  note,
  title,
}: NewsletterProps) {
  return (
    <NewsletterSignup
      ctaLabel={ctaLabel}
      description={description}
      eyebrow={label}
      href={ctaHref}
      note={note}
      title={title}
      variant="default"
    />
  );
}
