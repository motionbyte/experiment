import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        <span className="tls-gold-heading">
          © The Lost Symbols 2026. All rights reserved.
        </span>
      </p>
      <p className={styles.credit}>
        <span className="tls-gold-year">Made with ❤️ by </span>
        <a
          href="https://www.motionbyte.in"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <span className="tls-gold-heading">Motion Byte</span>
        </a>
      </p>
    </footer>
  );
};
