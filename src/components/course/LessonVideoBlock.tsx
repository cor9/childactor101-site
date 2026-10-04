import { BunnyPlayer } from "@/components/course/BunnyPlayer";
import { ExternalVideoEmbed } from "@/components/course/ExternalVideoEmbed";
import type { CourseVideo } from "@/content/courses";

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function vimeoEmbedUrl(vimeoId: string): string {
  return `https://player.vimeo.com/video/${vimeoId}`;
}

function MissingVideoPlaceholder({ video }: { video: Extract<CourseVideo, { kind: "missing" }> }) {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return (
    <div className="rounded-[28px] border-2 border-dashed border-chalkboard/25 bg-paper-warm px-6 py-8 text-center">
      <p className="font-display text-2xl text-chalkboard">
        This lesson&apos;s video is being restored.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-soft">
        The original hosted video is no longer available and its replacement is still
        being verified. The lesson position and copy are preserved from the original course.
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

export interface LessonVideoBlockProps {
  fallbackTitle: string;
  video: CourseVideo;
}

/** Renders any video carried by a lesson: Bunny player, third-party embed, or a restored later placeholder. */
export function LessonVideoBlock({ fallbackTitle, video }: LessonVideoBlockProps) {
  switch (video.kind) {
    case "bunny":
      return (
        <BunnyPlayer
          guid={video.guid}
          needsReview={video.needsReview}
          title={video.title ?? fallbackTitle}
        />
      );
    case "youtube":
      return (
        <ExternalVideoEmbed
          note={video.note}
          title={video.title ?? `${fallbackTitle} (reference video)`}
          url={youtubeEmbedUrl(video.videoId)}
        />
      );
    case "vimeo":
      return (
        <ExternalVideoEmbed
          note={video.note}
          title={video.title}
          url={vimeoEmbedUrl(video.vimeoId)}
        />
      );
    case "missing":
      return <MissingVideoPlaceholder video={video} />;
  }
}
