export interface ExternalVideoEmbedProps {
  title?: string;
  url: string;
}

/** Third-party embed (YouTube / live Vimeo) preserved from the legacy course pages. */
export function ExternalVideoEmbed({ title, url }: ExternalVideoEmbedProps) {
  return (
    <figure className="overflow-hidden rounded-[24px] border border-chalkboard/10 bg-chalkboard-deep shadow-soft">
      <div className="aspect-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="block h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={url}
          title={title ?? "Reference video"}
        />
      </div>
      {title ? (
        <figcaption className="bg-white px-5 py-3 text-sm font-medium text-ink-soft">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}
