import React from "react";
import styles from "./AlbumArtworkStack.module.css";
import { vinylPaletteForIndex } from "./vinylPalettes";

type Props = {
  coverUrl: string;
  /** "right" = vinyl peeks past the right edge of the cover (albumLeft rows) */
  peek: "left" | "right";
  /** Discography list index — har album ka alag vinyl rang */
  paletteIndex: number;
  alt?: string;
};

export const AlbumArtworkStack: React.FC<Props> = ({
  coverUrl,
  peek,
  paletteIndex,
  alt = "",
}) => {
  const p = vinylPaletteForIndex(paletteIndex);
  const discStyle = {
    "--vinyl-mid": p.mid,
    "--vinyl-deep": p.deep,
    "--vinyl-edge": p.edge,
    "--vinyl-label-light": p.labelLight,
    "--vinyl-label-dark": p.labelDark,
  } as React.CSSProperties;

  return (
    <div className={styles.stack}>
      <div
        className={`${styles.vinylOuter} ${peek === "right" ? styles.vinylPeekRight : styles.vinylPeekLeft}`}
        aria-hidden
      >
        <div
          className={styles.vinylDisc}
          style={discStyle}
          data-vinyl-disc=""
        />
      </div>
      <div className={styles.coverFrame}>
        <img
          src={encodeURI(coverUrl)}
          alt={alt}
          className={styles.cover}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};
