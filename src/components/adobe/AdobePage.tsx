import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { bunnyEmbedUrl } from "@/lib/bunny";

import "./adobe-layout.css";
import { RevealOnScroll } from "./RevealOnScroll";

/** Page spec produced by scripts/adobe-extractor/adobe_page_to_spec.py from a public Adobe Express page. */
export type AdobeVideo = {
  type: "video";
  provider: "vimeo" | "youtube" | "other";
  id?: string;
  src?: string;
  align?: "left" | "center";
  bunny?: { guid: string; title?: string | null; needsReview?: boolean };
  thirdParty?: boolean;
  missing?: { note: string; candidates?: string[] };
};

export type AdobeElement =
  | { type: "h2" | "h3" | "h4" | "p" | "blockquote"; html: string; align?: "center" }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "button"; label: string; href: string; align: "left" | "center"; internal?: boolean }
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      caption?: string;
      /** Width Adobe displays the image at, when smaller than the stored file. */
      displayWidth?: number;
      /** Published as <figure> with an aria-label that carries the copy shown in the image. */
      figure?: boolean;
      label?: string;
    }
  | { type: "raw"; tag: string; class: string; html: string }
  | AdobeVideo;

export interface AdobeBackground {
  image: string;
  width: number;
  height: number;
  position: string;
}

export interface AdobePhotoTile {
  src: string;
  width: number;
  height: number;
}

export interface AdobePhotoGroup {
  /** Adobe layout class, e.g. "t2-layout-ll-1" (two landscape tiles side by side). */
  layout: string;
  tiles: AdobePhotoTile[];
}

export interface AdobeFlipCard {
  classes: string[];
  elements: AdobeElement[];
}

export interface AdobeSection {
  kind: "single-column" | "full-width" | "spacer" | "window" | "split" | "fullscreen" | "photo-grid" | "flipbook";
  /** Original section classes minus "section" (e.g. "single-item-content-section", "height-50"). */
  classes?: string[];
  spacing?: { top: "large" | "normal"; bottom: "large" | "normal" };
  background?: AdobeBackground | null;
  grid?: AdobePhotoGroup[];
  backgrounds?: AdobeBackground[];
  cards?: AdobeFlipCard[];
  elements: AdobeElement[];
}

export interface AdobePageSpec {
  /** Scope class the page's theme CSS was re-written to (see scripts/adobe-extractor/adobe_page_to_spec.py). */
  theme?: string;
  /** Adobe Fonts kit stylesheets the original page loaded. */
  fontKits?: string[];
  /** Which Adobe runtime published the page ("new" = Adobe Express webpages). */
  runtime?: "classic" | "new";
  title: {
    position: string;
    title: string;
    subtitle: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    backgroundPosition: string;
  } | null;
  sections: AdobeSection[];
  author?: string;
  credits?: string[];
}

type HtmlTag = "h2" | "h3" | "h4" | "p" | "blockquote" | "li";

function Html({ html, tag: Tag, className }: { html: string; tag: HtmlTag; className?: string }) {
  // Trusted: produced by our own extraction script from the Adobe page (inline b/i/a/br only).
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function VideoEmbed({ index, video }: { index: number; video: AdobeVideo }) {
  let src: string | undefined;
  let title = "Video";

  if (video.bunny) {
    src = bunnyEmbedUrl(video.bunny.guid);
    title = video.bunny.title ?? title;
  } else if (video.provider === "youtube" && video.id) {
    src = `https://www.youtube.com/embed/${video.id}`;
  } else if (video.provider === "vimeo" && video.thirdParty && video.id) {
    src = `https://player.vimeo.com/video/${video.id}`;
  } else if (video.provider === "other" && video.src) {
    src = video.src;
  }

  return (
    <div className={`link-button-wrapper link-${video.align ?? "left"}`} data-video-index={index} id={`video-${index}`}>
      <div className="embedded-link-wrapper widescreen-aspect-ratio">
        {src ? (
          <iframe
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            src={src}
            title={title}
          />
        ) : (
          <div className="video-placeholder" data-legacy-vimeo={video.id} role="img" aria-label="Video coming soon">
            Video coming soon
          </div>
        )}
      </div>
    </div>
  );
}

function ImageElement({
  element,
  fullWidth,
  priority,
}: {
  element: Extract<AdobeElement, { type: "image" }>;
  fullWidth: boolean;
  priority: boolean;
}) {
  const wrapper = (
    <div className="image-wrapper">
      <Image
        alt={element.label ?? ""}
        height={element.height}
        priority={priority}
        sizes={fullWidth ? "100vw" : "(min-width: 1300px) 50vw, 100vw"}
        src={element.src}
        style={fullWidth ? undefined : { width: element.displayWidth ?? element.width }}
        width={element.width}
      />
    </div>
  );

  if (element.figure) {
    return (
      <figure aria-label={element.label} className="image" role="group">
        {wrapper}
        {element.caption ? <figcaption className="caption" dangerouslySetInnerHTML={{ __html: element.caption }} /> : null}
      </figure>
    );
  }

  return (
    <div className="image">
      {wrapper}
      {element.caption ? <div className="caption" dangerouslySetInnerHTML={{ __html: element.caption }} /> : null}
    </div>
  );
}

function renderElement(
  element: AdobeElement,
  index: number,
  priority: boolean,
  fullWidth: boolean,
  videoIndex: (video: AdobeVideo) => number,
): ReactNode {
  switch (element.type) {
    case "h2":
    case "h3":
    case "h4":
    case "p":
    case "blockquote":
      return (
        <Html className={element.align === "center" ? " text-center" : undefined} html={element.html} key={index} tag={element.type} />
      );
    case "ul":
    case "ol": {
      const List = element.type;
      return (
        <List key={index}>
          {element.items.map((item, itemIndex) => (
            <Html html={item} key={itemIndex} tag="li" />
          ))}
        </List>
      );
    }
    case "button":
      return (
        <div className={`link-button-wrapper link-${element.align}`} key={index}>
          {element.internal ? (
            <Link className="link-button" href={element.href}>
              {element.label}
            </Link>
          ) : (
            <a className="link-button" href={element.href} rel="nofollow noreferrer" target="_blank">
              {element.label}
            </a>
          )}
        </div>
      );
    case "image":
      return <ImageElement element={element} fullWidth={fullWidth} key={index} priority={priority} />;
    case "video":
      return <VideoEmbed index={videoIndex(element)} key={index} video={element} />;
    case "raw": {
      const Tag = element.tag as "div";
      return <Tag className={element.class || undefined} dangerouslySetInnerHTML={{ __html: element.html }} key={index} />;
    }
  }
}

/** Window sections show a background photo in a band whose height comes from the original height-NN class. */
function windowHeight(classes: string[] = []): CSSProperties {
  const match = classes.find((name) => /^height-\d+$/.test(name));
  const percent = match ? Number(match.replace("height-", "")) : 50;
  return { height: `${percent}vh` };
}

export function AdobePage({ spec }: { spec: AdobePageSpec }) {
  const { title } = spec;
  const theme = spec.theme ?? "";
  // Number videos in page order so placeholders can be located as #video-N.
  const videoNumbers = new Map<AdobeVideo, number>();
  let videoTotal = 0;
  for (const section of spec.sections) {
    for (const element of section.elements) {
      if (element.type === "video") {
        videoTotal += 1;
        videoNumbers.set(element, videoTotal);
      }
    }
  }
  const videoIndex = (video: AdobeVideo) => videoNumbers.get(video) ?? 0;

  return (
    <div className={`adobe-page${spec.runtime === "new" ? " adobe-rt-new" : ""}`}>
      {/* Adobe Fonts kits the original page loaded. */}
      {(spec.fontKits ?? []).map((href) => (
        <link href={href} key={href} precedence="default" rel="stylesheet" />
      ))}
      <RevealOnScroll />
      <div className={`article ${theme} sections-article-layout`}>
        {title ? (
          <div className={`section title-section ${title.position}`}>
            <div className="section-view">
              <div className="section-background">
                <div
                  className="section-background-image"
                  role="img"
                  aria-label=""
                  style={{ backgroundImage: `url("${title.image}")`, backgroundPosition: title.backgroundPosition }}
                />
              </div>
              <div className="title-header">
                <h1 className="title-header-view">
                  <span className="gradient-overlay" />
                  <span className="title">{title.title}</span>
                  {title.subtitle ? <span className="subtitle">{title.subtitle}</span> : null}
                </h1>
              </div>
              <div className="navigation-hint down" aria-hidden />
            </div>
          </div>
        ) : null}

        {spec.sections.map((section, sectionIndex) => {
          const classes = (section.classes ?? []).join(" ");

          if (section.kind === "spacer") {
            return <div className={`section spacer-section content-spacer`} key={sectionIndex} />;
          }

          if (section.kind === "fullscreen") {
            return (
              <div className={`section fullscreen-photo-section ${classes}`} key={sectionIndex}>
                <div className="section-view">
                  <div className="section-background">
                    {section.background ? (
                      <div
                        className="section-background-image"
                        role="img"
                        aria-label=""
                        style={{
                          backgroundImage: `url("${section.background.image}")`,
                          backgroundPosition: section.background.position,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          }

          if (section.kind === "photo-grid") {
            const gridSpacing = [
              section.spacing?.top === "large" ? "large-content-spacing-top" : "",
              section.spacing?.bottom === "large" ? "large-content-spacing-bottom" : "",
            ].join(" ");
            return (
              <div className={`section photo-grid-section ${gridSpacing}`} key={sectionIndex}>
                <div className="section-view">
                  <div className="section-content">
                    <div className="section-content-view">
                      <div className="content-container">
                        <div className="photo-grid">
                          {(section.grid ?? []).map((group, groupIndex) => (
                            <div className="photo-group-container" key={groupIndex}>
                              <div className={`photo-group ${group.layout}`}>
                                {group.tiles.map((tile, tileIndex) => (
                                  <div className="photo-container tile" key={tileIndex}>
                                    <div
                                      aria-label="thumbnail image"
                                      className="photo-image"
                                      role="img"
                                      style={{ backgroundImage: `url("${tile.src}")` }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (section.kind === "flipbook") {
            // Adobe advances these cards over a pinned photo as you scroll; here each card sits
            // over its photo in one full-screen band, in the original order.
            return (
              <div className={`section card-flipbook-section ${classes}`} key={sectionIndex}>
                {(section.cards ?? []).map((card, cardIndex) => {
                  const back = section.backgrounds?.[cardIndex];
                  return (
                    <div className="flip-slide" key={cardIndex}>
                      <div className="section-background">
                        {back ? (
                          <div
                            className="section-background-image"
                            role="img"
                            aria-label=""
                            style={{ backgroundImage: `url("${back.image}")`, backgroundPosition: back.position }}
                          />
                        ) : null}
                      </div>
                      <div className="section-content">
                        <div className={`section-content-view ${card.classes.join(" ")}`}>
                          <div className="content-container">
                            {card.elements.map((element, elementIndex) =>
                              renderElement(element, elementIndex, false, false, videoIndex),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }

          if (section.kind === "window") {
            return (
              <div className={`section window-section ${classes}`} key={sectionIndex}>
                <div className="section-view" style={windowHeight(section.classes)}>
                  <div className="window section-background">
                    {section.background ? (
                      <div
                        className="section-background-image"
                        role="img"
                        aria-label=""
                        style={{
                          backgroundImage: `url("${section.background.image}")`,
                          backgroundPosition: section.background.position,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          }

          const spacing = section.spacing
            ? [
                section.spacing.top === "large" ? "large-content-spacing-top" : "",
                section.spacing.bottom === "large" ? "large-content-spacing-bottom" : "",
              ].join(" ")
            : "";
          const sectionClass =
            section.kind === "full-width"
              ? "full-width-section"
              : `single-column-section ${section.kind === "split" ? classes : classes.replace("single-column-section", "")} ${spacing}`;
          const fullWidth = section.kind === "full-width";

          return (
            <div className={`section ${sectionClass}`} key={sectionIndex}>
              <div className="section-view">
                {section.kind === "split" && section.background ? (
                  <div className="section-background">
                    <div
                      className="section-background-image"
                      role="img"
                      aria-label=""
                      style={{
                        backgroundImage: `url("${section.background.image}")`,
                        backgroundPosition: section.background.position,
                      }}
                    />
                  </div>
                ) : null}
                <div className="section-content">
                  <div className="section-content-view">
                    <div className="content-container">
                      {section.elements.map((element, elementIndex) =>
                        renderElement(element, elementIndex, sectionIndex === 0, fullWidth, videoIndex),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {spec.author ? (
          <div className="section author-section">
            <div className="section-view">
              <div className="section-content">
                <div className="section-content-view">
                  <div className="content-container">
                    <div className="author-appreciation-container">
                      <div className="author">
                        <div className="info">
                          <div className="label created-by-label">Created By</div>
                          <div className="name">{spec.author}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {spec.credits?.length ? (
          <div className="section credits-section">
            <div className="section-view">
              <div className="section-content">
                <div className="section-content-view">
                  <div className="content-container">
                    <div className="photo-credits">
                      <p className="credits-label">Credits:</p>
                      {spec.credits.map((credit) => (
                        <p key={credit}>{credit}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
