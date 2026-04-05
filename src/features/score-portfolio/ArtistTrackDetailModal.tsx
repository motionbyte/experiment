import React, { useState } from "react";
import type { ArtistTrack } from "./featuredArtistsData";
import styles from "./ArtistCollaborationModals.module.css";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "./youtubeUtils";

type Props = {
  artistName: string;
  track: ArtistTrack;
  onClose: () => void;
};

export const ArtistTrackDetailModal: React.FC<Props> = ({
  artistName,
  track,
  onClose,
}) => {
  const [playing, setPlaying] = useState(false);
  const [thumbFailedMax, setThumbFailedMax] = useState(false);

  const videoId = youtubeIdFromUrl(track.youtubeUrl);
  const thumbSrc =
    videoId != null
      ? youtubeThumbnailUrl(videoId, thumbFailedMax ? "hq" : "max")
      : null;

  return (
    <div
      className={`${styles.overlay} ${styles.overlayNested}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-detail-title"
    >
      <div
        className={`${styles.sheet} ${styles.sheetTrackDetail}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.backBtn} onClick={onClose}>
          ← Back
        </button>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.sheetBodyScroll}>
          <div className={styles.header}>
            <p className={styles.kicker}>{artistName}</p>
            <h2 id="track-detail-title" className={styles.title}>
              {track.title}
            </h2>
            <p className={styles.filmSub}>Film · {track.film}</p>
          </div>
          {videoId && (
            <>
              <div className={styles.videoShell}>
                {playing ? (
                  <iframe
                    title={`${track.title} — official video`}
                    className={styles.videoIframe}
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <button
                    type="button"
                    className={styles.videoPosterBtn}
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${track.title} video`}
                  >
                    {thumbSrc && (
                      <img
                        src={thumbSrc}
                        alt=""
                        className={styles.videoThumb}
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (!thumbFailedMax) setThumbFailedMax(true);
                        }}
                      />
                    )}
                    <span className={styles.playCircle} aria-hidden="true">
                      <span className={styles.playTriangle} />
                    </span>
                  </button>
                )}
              </div>
              <div className={styles.videoActions}>
                {!playing && (
                  <button
                    type="button"
                    className={styles.playTextBtn}
                    onClick={() => setPlaying(true)}
                  >
                    ▶ Play here
                  </button>
                )}
                <a
                  className={styles.viewYtBtn}
                  href={track.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on YouTube
                </a>
              </div>
            </>
          )}
          <p className={styles.synopsis}>{track.synopsis}</p>
          <h3 className={styles.ytBlockTitle}>YouTube description (audio &amp; crew)</h3>
          <p className={styles.ytDescription}>{track.youtubeDescription}</p>
          <h3 className={styles.creditsTitle}>Credits (summary)</h3>
          <dl className={styles.dl}>
            {track.credits.map((row, i) => (
              <div key={`${row.label}-${i}`} className={styles.dlRow}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
