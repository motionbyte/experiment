import React, { useEffect } from "react";
import type { PressReleaseItem } from "../pressReleasesData";
import { formatPressDate } from "../pressReleasesData";
import styles from "./PressReleaseModal.module.css";

type Props = {
  item: PressReleaseItem;
  onClose: () => void;
};

export const PressReleaseModal: React.FC<Props> = ({ item, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const dateLabel = formatPressDate(item.publishedAt);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="press-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.outlet}>{item.outletLabel}</span>
            <span className="tls-gold-year">{dateLabel}</span>
          </div>

          <h2 id="press-modal-title" className={styles.title}>
            <span className="tls-gold-heading">{item.title}</span>
          </h2>

          <p className={styles.text}>{item.body}</p>

          <div className={styles.actions}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.readOriginal}
            >
              Read on {item.outletLabel}
              <span className={styles.externalIcon} aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
