import React from "react";
import styles from "./ConnectWithUsSection.module.css";

const PHONE = "+91 9867024294";
const EMAIL = "tlssymbols@gmail.com";

export const ConnectWithUsSection: React.FC = () => {
  return (
    <section id="contact" className={styles.section} aria-label="Connect with us">
      <h2 className={styles.heading}>Connect with us</h2>
      <p className={styles.tagline}>Reach out to the band</p>
      <div className={styles.links}>
        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          className={styles.link}
          aria-label="Call band"
        >
          <span className={styles.linkIcon} aria-hidden>📞</span>
          <span>{PHONE}</span>
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className={styles.link}
          aria-label="Email band"
        >
          <span className={styles.linkIcon} aria-hidden>✉</span>
          <span>{EMAIL}</span>
        </a>
      </div>
    </section>
  );
};
