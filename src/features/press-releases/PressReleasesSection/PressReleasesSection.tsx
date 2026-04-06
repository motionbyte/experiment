import React from "react";
import styles from "./PressReleasesSection.module.css";

export const PressReleasesSection: React.FC = () => {
  return (
    <section
      id="press-releases"
      className={styles.section}
      aria-label="Press releases"
    >
      <div className={styles.inner}>
        <div className={styles.titleRow}>
          <h2 className={styles.heading}>
            <span className="tls-gold-heading">Press Releases</span>
          </h2>
        </div>
        <p className={styles.tagline}>
          <span className="tls-gold-year">Media & announcements</span>
        </p>
        <p className={styles.placeholder}>
          Press items and links will go here — content can be added when ready.
        </p>
      </div>
    </section>
  );
};
