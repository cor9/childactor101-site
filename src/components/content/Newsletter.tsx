import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    <Card tone="warm">
      <SectionHeader
        description={description}
        descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
        label={label}
        title={title}
        titleClassName="mt-6 text-chalkboard lg:text-5xl"
      />
      {note ? <p className="mt-5 text-sm leading-7 text-ink-soft">{note}</p> : null}
      <Button href={ctaHref} className="mt-8 w-fit" variant="secondary">
        {ctaLabel}
      </Button>
    </Card>
  );
}
