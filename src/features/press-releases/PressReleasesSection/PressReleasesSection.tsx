import React from "react";
import {
  formatPressDate,
  pressReleases,
  type PressReleaseItem,
} from "../pressReleasesData";
import { PressReleaseModal } from "../PressReleaseModal/PressReleaseModal";
import styles from "./PressReleasesSection.module.css";

export const PressReleasesSection: React.FC = () => {
  const [active, setActive] = React.useState<PressReleaseItem | null>(null);

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

        <ul className={styles.grid} role="list">
          {pressReleases.map((item) => (
            <li key={item.id} className={styles.cardWrap}>
              <article className={styles.card}>
                <button
                  type="button"
                  className={styles.cardMain}
                  onClick={() => setActive(item)}
                  aria-haspopup="dialog"
                >
                  <div className={styles.cardBody}>
                    <p className={styles.cardMeta}>
                      <span className={styles.cardOutlet}>{item.outletLabel}</span>
                      <span className="tls-gold-year">{formatPressDate(item.publishedAt)}</span>
                    </p>
                    <h3 className={styles.cardTitle}>
                      <span className="tls-gold-heading">{item.title}</span>
                    </h3>
                    <p className={styles.cardExcerpt}>{item.excerpt}</p>
                    <span className={styles.cardCta}>Read more</span>
                  </div>
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.originalLink}
                >
                  Read on {item.outletLabel}
                  <span aria-hidden> ↗</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {active != null && (
        <PressReleaseModal item={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
};
