import React from "react";
import styles from "./SisterVenturesSection.module.css";
import { SCORE_URL, VERSE_URL } from "./venturesConfig";

export const SisterVenturesSection: React.FC = () => {
  return (
    <section
      id="ventures"
      className={styles.section}
      aria-label="Other ventures: film score and film banner"
    >
      <div className={styles.divider} aria-hidden="true" />

      <p className={styles.kicker}>Also from us</p>
      <h2 className={styles.heading}>Our other ventures</h2>

      <div className={styles.grid}>
        <a
          href={SCORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          aria-label="The Lost Symbols Score — opens commercial film and background score site in a new tab"
        >
          <span className={styles.cardTag}>Film score</span>
          <span className={styles.cardTitle}>The Lost Symbols Score</span>
          <span className={styles.cardBlurb}>
            Commercial films — songs &amp; background score
          </span>
          <span className={styles.cardHint}>
            Visit site
            <span className={styles.externalGlyph} aria-hidden="true">
              ↗
            </span>
          </span>
        </a>

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
