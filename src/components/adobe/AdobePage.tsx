import Image from "next/image";
import type { ReactNode } from "react";

import { bunnyEmbedUrl } from "@/lib/bunny";

import { RevealOnScroll } from "./RevealOnScroll";

import "./adobe-theme.css";
import "./adobe-layout.css";

/** Page spec produced by scripts/adobe_page_to_spec.py from a public Adobe Express page. */
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
  | { type: "h3" | "h4" | "p" | "blockquote"; html: string; align?: "center" }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "button"; label: string; href: string; align: "left" | "center" }
  | { type: "image"; src: string; width: number; height: number; caption?: string }
  | AdobeVideo;

export interface AdobeSection {
  kind: "single-column" | "full-width";
  spacing: { top: "large" | "normal"; bottom: "large" | "normal" };
  elements: AdobeElement[];
}

export interface AdobePageSpec {
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

function Html({ html, tag: Tag, className }: { html: string; tag: "h3" | "h4" | "p" | "blockquote" | "li"; className?: string }) {
  // Trusted: produced by our own extraction script from the Adobe page (b/i/a/br only).
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function VideoEmbed({ video }: { video: AdobeVideo }) {
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
    <div className={`link-button-wrapper link-${video.align ?? "left"}`}>
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

function renderElement(element: AdobeElement, index: number, priority: boolean, fullWidth: boolean): ReactNode {
  switch (element.type) {
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
          <a className="link-button" href={element.href} rel="nofollow noreferrer" target="_blank">
            {element.label}
          </a>
        </div>
      );
    case "image":
      return (
        <div className="image" key={index}>
          <div className="image-wrapper">
            <Image
              alt=""
              height={element.height}
              priority={priority}
              style={fullWidth ? undefined : { width: element.width }}
              sizes={fullWidth ? "100vw" : "(min-width: 1300px) 50vw, 100vw"}
              src={element.src}
              width={element.width}
            />
          </div>
          {element.caption ? <div className="caption" dangerouslySetInnerHTML={{ __html: element.caption }} /> : null}
        </div>
      );
    case "video":
      return <VideoEmbed key={index} video={element} />;
  }
}

export function AdobePage({ spec }: { spec: AdobePageSpec }) {
  const { title } = spec;

  return (
    <div className="adobe-page">
      {/* Adobe Fonts kits used by the original page: adobe-caslon-pro and spark-local-brewery-four. */}
      <link href="https://use.typekit.net/qhv3iqj.css" precedence="default" rel="stylesheet" />
      <link href="https://use.typekit.net/txs8zsv.css" precedence="default" rel="stylesheet" />
      <link href="https://use.typekit.net/onz5gap.css" precedence="default" rel="stylesheet" />
      <RevealOnScroll />
      <div className="article trek-theme sections-article-layout">
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
                  <span className="subtitle">{title.subtitle}</span>
                </h1>
              </div>
              <div className="navigation-hint down" aria-hidden />
            </div>
          </div>
        ) : null}

        {spec.sections.map((section, sectionIndex) => {
          const spacing = [
            section.spacing.top === "large" ? "large-content-spacing-top" : "",
            section.spacing.bottom === "large" ? "large-content-spacing-bottom" : "",
          ].join(" ");

          return (
            <div
              className={`section ${section.kind === "full-width" ? "full-width-section" : `single-column-section ${spacing}`}`}
              key={sectionIndex}
            >
              <div className="section-view">
                <div className="section-content">
                  <div className="section-content-view">
                    <div className="content-container">
                      {section.elements.map((element, elementIndex) =>
                        renderElement(element, elementIndex, sectionIndex === 0, section.kind === "full-width"),
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
