import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        © The Lost Symbols 2026. All rights reserved.
      </p>
      <p className={styles.credit}>
        Made with ❤️ by{" "}
        <a
          href="https://www.motionbyte.in"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Motion Byte
        </a>
      </p>
    </footer>
  );
};
