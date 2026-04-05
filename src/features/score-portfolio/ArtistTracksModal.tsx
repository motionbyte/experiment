import React from "react";
import type { ArtistTrack, FeaturedArtistEntry } from "./featuredArtistsData";
import styles from "./ArtistCollaborationModals.module.css";

type Props = {
  artist: FeaturedArtistEntry;
  onClose: () => void;
  onPickTrack: (track: ArtistTrack) => void;
};

export const ArtistTracksModal: React.FC<Props> = ({ artist, onClose, onPickTrack }) => {
  const tracks = artist.tracks ?? [];

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="artist-tracks-title"
    >
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.scroll}>
          <div className={styles.header}>
            <p className={styles.kicker}>Featured artist</p>
            <h2 id="artist-tracks-title" className={styles.title}>
              {artist.name}
            </h2>
            {artist.bio && (
              <p className={styles.artistBio}>{artist.bio}</p>
            )}
            <p className={styles.sub}>Tracks — tap one for full credits</p>
          </div>
          <ul className={styles.trackList}>
            {tracks.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  className={styles.trackBtn}
                  onClick={() => onPickTrack(t)}
                >
                  <span className={styles.trackBtnTitle}>{t.title}</span>
                  <span className={styles.trackBtnHint}>View details →</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
