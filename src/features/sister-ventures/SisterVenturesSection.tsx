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

      <p className={styles.kicker}>
        <span className="tls-gold-year">Also from us</span>
      </p>
      <h2 className={styles.heading}>
        <span className="tls-gold-heading">Our other ventures</span>
      </h2>

      <div className={styles.grid}>
        <a
          href={SCORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          aria-label="The Lost Symbols Score — opens commercial film and background score site in a new tab"
        >
          <span className={styles.cardTag}>
            <span className="tls-gold-year">Film score</span>
          </span>
          <span className={styles.cardTitle}>
            <span className="tls-gold-heading">The Lost Symbols Score</span>
          </span>
          <span className={styles.cardBlurb}>
            <span className="tls-gold-year">Commercial films — songs &amp; background score</span>
          </span>
          <span className={styles.cardHint}>
            <span className="tls-gold-year">Visit site</span>
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
          <span className={styles.cardTag}>
            <span className="tls-gold-year">Film banner</span>
          </span>
          <span className={styles.cardTitle}>
            <span className="tls-gold-heading">The Lost Verse</span>
          </span>
          <span className={styles.cardBlurb}>
            <span className="tls-gold-year">Our film banner</span>
          </span>
          <span className={styles.cardHint}>
            <span className="tls-gold-year">Visit site</span>
            <span className={styles.externalGlyph} aria-hidden="true">
              ↗
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};
