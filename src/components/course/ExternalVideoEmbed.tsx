export interface ExternalVideoEmbedProps {
  note?: string;
  title: string;
  url: string;
}

/** Third-party embed (YouTube / live Vimeo) preserved from the legacy course pages. */
export function ExternalVideoEmbed({ note, title, url }: ExternalVideoEmbedProps) {
  return (
    <figure className="overflow-hidden rounded-[28px] border border-[#e7dcc7] bg-white shadow-soft">
      <div className="aspect-video bg-ink">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="block h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={url}
          title={title}
        />
      </div>
      <figcaption className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
        Reference video from the original course
        {note ? <span className="mt-1 block normal-case tracking-normal text-ink-soft/80">{note}</span> : null}
      </figcaption>
    </figure>
  );
}
