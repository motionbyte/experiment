import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { absolutePublicUrl } from "../../seo/seoDefaults";
import { setSeoHead } from "../../seo/setSeoHead";
import { SITE_ORIGIN } from "../../seo/siteOrigin";
import { TheLostVerseCanvas, type LostVerseZoomPayload } from "./TheLostVerseCanvas";
import styles from "./TheLostVersePage.module.css";

const VERSE_DESCRIPTION =
  "The Lost Verse is a cinematic universe created by The Lost Symbols, a world where stories are not just told but built, expanded, and lived across time, where multiple characters, timelines, and conflicts exist within a single interconnected reality, at its core stand five heroes and three villains each carrying their own purpose, past, and power while many more are yet to emerge, this universe is not limited to one medium as it unfolds through music, visual storytelling, series, and films, with our first series currently in development and its title set to be announced soon, The Lost Verse is only just beginning and this is merely the first chapter of something far bigger.";

/**
 * Standalone “The Lost Verse” — dolly zoom through layered art (no page scroll).
 * Assets: public/the-lost-verse/ (see ASSETS.txt).
 */
export const TheLostVersePage: React.FC = () => {
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const charactersRef = useRef<HTMLParagraphElement>(null);

  const handleZoomProgress = useCallback(
    ({
      taglineOpacity,
      descriptionOpacity,
      charactersOpacity,
    }: LostVerseZoomPayload) => {
      const title = taglineRef.current;
      const body = descriptionRef.current;
      const characters = charactersRef.current;
      if (title) {
        title.style.opacity = String(taglineOpacity);
        title.style.visibility = taglineOpacity < 0.003 ? "hidden" : "visible";
      }
      if (body) {
        body.style.opacity = String(descriptionOpacity);
        body.style.visibility = descriptionOpacity < 0.004 ? "hidden" : "visible";
        body.style.display = descriptionOpacity < 0.004 ? "none" : "block";
      }
      if (characters) {
        characters.style.opacity = String(charactersOpacity);
        characters.style.visibility = charactersOpacity < 0.003 ? "hidden" : "visible";
      }
    },
    [],
  );

  useEffect(() => {
    const title = taglineRef.current;
    const body = descriptionRef.current;
    if (title) {
      title.style.opacity = "0";
      title.style.visibility = "hidden";
    }
    if (body) {
      body.style.opacity = "0";
      body.style.visibility = "hidden";
      body.style.display = "none";
    }
    const characters = charactersRef.current;
    if (characters) {
      characters.style.opacity = "0";
      characters.style.visibility = "hidden";
    }
  }, []);

  useEffect(() => {
    const desc =
      "The Lost Verse — layered 3D frames. Scroll or drag to move into the scene.";
    setSeoHead({
      title: "The Lost Verse",
      description: desc,
      canonicalPath: "/the-lost-verse",
      robots: "index, follow",
      ogImage: absolutePublicUrl("/portfolio.png"),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "The Lost Verse",
        url: `${SITE_ORIGIN}/the-lost-verse`,
        description: desc,
        isPartOf: { "@type": "WebSite", name: "The Lost Symbols", url: SITE_ORIGIN },
      },
    });

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOX = document.documentElement.style.overflowX;
    const prevBodyOX = document.body.style.overflowX;
    const prevBodyOY = document.body.style.overflowY;
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflowX = prevHtmlOX;
      document.body.style.overflowX = prevBodyOX;
      document.body.style.overflowY = prevBodyOY;
    };
  }, []);

  return (
    <div className={styles.root}>
      <TheLostVerseCanvas className={styles.canvasWrap} onZoomProgress={handleZoomProgress} />
      <div className={styles.copyOverlay}>
        <div className={styles.copyStage}>
          <p ref={taglineRef} className={styles.tagline}>
            What Is The Lost Verse?
          </p>
          <p ref={descriptionRef} className={styles.description}>
            {VERSE_DESCRIPTION}
          </p>
          <p ref={charactersRef} className={styles.charactersTitle}>
            Characters
          </p>
        </div>
      </div>
      <p className={styles.hint} aria-hidden="true">
        Scroll — frames → TLV → title → story
      </p>
      <Link
        to="/"
        style={{
          position: "fixed",
          top: "max(1rem, env(safe-area-inset-top))",
          left: "max(1rem, env(safe-area-inset-left))",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.85rem",
          textDecoration: "none",
          zIndex: 5,
        }}
      >
        ← The Lost Symbols
      </Link>
    </div>
  );
};
