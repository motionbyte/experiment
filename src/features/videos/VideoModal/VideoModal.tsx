import React, { useEffect } from "react";
import type { VideoItem } from "../videosData";
import { youtubeEmbedUrl, youtubeWatchUrl } from "../videosData";
import styles from "./VideoModal.module.css";

type Props = {
  video: VideoItem;
  formattedDate: string;
  onClose: () => void;
};

function descriptionText(video: VideoItem): string | null {
  const t = video.description?.trim();
  return t ? t : null;
}

export const VideoModal: React.FC<Props> = ({ video, formattedDate, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const desc = descriptionText(video);
  const watch = youtubeWatchUrl(video.id);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${video.title}`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className={styles.embedWrap}>
          <iframe
            key={video.id}
            className={styles.embed}
            src={youtubeEmbedUrl(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>
            <span className="tls-gold-heading">{video.title}</span>
          </h2>
          <p className={styles.metaRow}>
            <span className="tls-gold-year">{formattedDate}</span>
          </p>

          {desc ? (
            <p className={styles.description}>{desc}</p>
          ) : (
            <p className={styles.descriptionPlaceholder}>Description coming soon.</p>
          )}

          <div className={styles.actions}>
            <a
              href={watch}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.youtubeBtn}
            >
              <span className={styles.youtubeIcon} aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </span>
              <span className="tls-gold-heading">Watch on YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
