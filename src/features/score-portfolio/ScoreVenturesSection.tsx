import React from "react";
import { Link } from "react-router-dom";
import { BAND_URL, VERSE_URL } from "../sister-ventures/venturesConfig";
import styles from "../sister-ventures/SisterVenturesSection.module.css";

const bandIsAppHome = BAND_URL === "/" || BAND_URL === "";

/**
 * Footer-adjacent ventures on the Score page — Band + The Lost Verse (same shell as main site ventures).
 */
export const ScoreVenturesSection: React.FC = () => {
  const bandCardInner = (
    <>
      <span className={styles.cardTag}>Band</span>
      <span className={styles.cardTitle}>The Lost Symbols</span>
      <span className={styles.cardBlurb}>
        Music, releases &amp; everything around the band
      </span>
      <span className={styles.cardHint}>
        {bandIsAppHome ? "Go to main site" : "Visit site"}
        <span className={styles.externalGlyph} aria-hidden="true">
          {bandIsAppHome ? "→" : "↗"}
        </span>
      </span>
    </>
  );

  return (
    <section
      id="score-ventures"
      className={styles.section}
      aria-label="Other ventures: band and film banner"
    >
      <div className={styles.divider} aria-hidden="true" />

      <p className={styles.kicker}>Also from us</p>
      <h2 className={styles.heading}>Our other ventures</h2>

      <div className={styles.grid}>
        {bandIsAppHome ? (
          <Link
            to="/"
            className={styles.card}
            aria-label="The Lost Symbols band — main site home"
          >
            {bandCardInner}
          </Link>
        ) : (
          <a
            href={BAND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            aria-label="The Lost Symbols band — opens in a new tab"
          >
            {bandCardInner}
          </a>
        )}

        <a
          href={VERSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          aria-label="The Lost Verse — opens film banner site in a new tab"
        >
          <span className={styles.cardTag}>Film banner</span>
          <span className={styles.cardTitle}>The Lost Verse</span>
          <span className={styles.cardBlurb}>Our film banner</span>
          <span className={styles.cardHint}>
            Visit site
            <span className={styles.externalGlyph} aria-hidden="true">
              ↗
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};
