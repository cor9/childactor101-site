/**
 * Public Bunny Stream configuration for course video playback.
 *
 * Intentionally contains NO credentials: playback uses the public Bunny Stream
 * embed/player URL with the library ID and the video GUID only.
 */
export const BUNNY_STREAM_LIBRARY_ID = "712901";

export function bunnyEmbedUrl(guid: string): string {
  return `https://iframe.mediadelivery.net/embed/${BUNNY_STREAM_LIBRARY_ID}/${guid}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
}
