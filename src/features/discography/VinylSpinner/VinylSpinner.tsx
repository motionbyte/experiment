import React from "react";
import styles from "./VinylSpinner.module.css";

type Props = { className?: string; size?: number };

export const VinylSpinner: React.FC<Props> = ({ className = "", size = 56 }) => {
  return (
    <div
      className={`${styles.vinyl} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className={styles.grooves} />
      <div className={styles.label} />
      <div className={styles.hole} />
    </div>
  );
};
