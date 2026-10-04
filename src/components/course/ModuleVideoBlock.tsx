import { BunnyPlayer } from "@/components/course/BunnyPlayer";
import { ExternalVideoEmbed } from "@/components/course/ExternalVideoEmbed";
import type { CourseVideoBlock, MissingVideoBlock } from "@/content/courses";

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function vimeoEmbedUrl(vimeoId: string): string {
  return `https://player.vimeo.com/video/${vimeoId}`;
}

function MissingVideoPlaceholder({ video }: { video: MissingVideoBlock }) {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return (
    <div className="rounded-[28px] border-2 border-dashed border-chalkboard/25 bg-paper-warm px-6 py-8 text-center">
      <p className="font-display text-2xl text-chalkboard">
        This video is being restored.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-soft">
        The original hosted video is no longer available and its replacement is still
        being verified. Its position and the surrounding copy are preserved from the original course.
      </p>
      {isDevelopment ? (
        <div className="mx-auto mt-6 max-w-xl rounded-[20px] border border-[#e7dcc7] bg-white px-5 py-4 text-left text-sm leading-7 text-ink-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-deep">
            Development placeholder
          </p>
          {video.legacyVimeoId ? (
            <p className="mt-2">
              Legacy Vimeo ID: <code className="rounded bg-paper px-1.5 py-0.5">{video.legacyVimeoId}</code>
            </p>
          ) : null}
          <p className="mt-1">{video.note}</p>
          {video.candidates?.length ? (
            <div className="mt-2">
              <p className="font-semibold text-chalkboard">Candidate Bunny videos:</p>
              <ul className="mt-1 list-disc pl-5">
                {video.candidates.map((candidate) => (
                  <li key={candidate}>
                    <code className="rounded bg-paper px-1.5 py-0.5 text-xs">{candidate}</code>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export interface ModuleVideoBlockProps {
  fallbackTitle: string;
  video: CourseVideoBlock;
}

/** Renders any video block in a module: Bunny player, third-party embed, or a restoration placeholder. */
export function ModuleVideoBlock({ fallbackTitle, video }: ModuleVideoBlockProps) {
  switch (video.type) {
    case "bunny-video":
      return (
        <BunnyPlayer
          guid={video.guid}
          needsReview={video.needsReview}
          title={video.title ?? fallbackTitle}
        />
      );
    case "external-video":
      return (
        <ExternalVideoEmbed
          note={video.note}
          title={video.title ?? `${fallbackTitle} (reference video)`}
          url={
            video.provider === "youtube"
              ? youtubeEmbedUrl(video.videoId)
              : vimeoEmbedUrl(video.videoId)
          }
        />
      );
    case "missing-video":
      return <MissingVideoPlaceholder video={video} />;
  }
}
