import React, { useRef, useState } from "react";
import type { Album, Track } from "../discographyData";
import styles from "./AlbumModal.module.css";

type Props = {
  album: Album;
  onClose: () => void;
};

export const AlbumModal: React.FC<Props> = ({ album, onClose }) => {
  const [lyricsTrackId, setLyricsTrackId] = useState<string | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTrackClick = (t: Track) => {
    if (!t.audioUrl) return;
    const audio = audioRef.current;
    if (!audio) return;
    const isCurrentlyPlaying = playingTrackId === t.id;
    if (isCurrentlyPlaying) {
      audio.pause();
      setPlayingTrackId(null);
      return;
    }
    audio.src = encodeURI(t.audioUrl);
    audio.play().catch(() => setPlayingTrackId(null));
    setPlayingTrackId(t.id);
  };

  const activeTrack: Track | null =
    album.tracks.find((t) => t.id === lyricsTrackId) ?? null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={`Album: ${album.title}`}>
      <audio
        ref={audioRef}
        onEnded={() => setPlayingTrackId(null)}
        onError={() => setPlayingTrackId(null)}
      />
      <div
        className={`${styles.modal} ${activeTrack ? styles.modalWide : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.header}>
          <img
            src={encodeURI(album.coverUrl)}
            alt=""
            className={styles.cover}
            decoding="async"
            fetchPriority="high"
          />
          <div className={styles.meta}>
            <h2 className={styles.title}>{album.title}</h2>
            <p className={styles.year}>Year: {album.year}</p>
          </div>
        </div>
        <div className={`${styles.body} ${!activeTrack ? styles.bodySingle : ""}`}>
          <div className={styles.tracksPane}>
            <h3 className={styles.tracksTitle}>Tracks</h3>
            <ul className={styles.trackList}>
              {album.tracks.map((t) => {
                const isInstrumental = t.title.trim().toLowerCase() === "godsend";
                const isLyricsOpen = lyricsTrackId === t.id;
                return (
                  <li key={t.id} className={styles.trackItem}>
                    <div
                      className={styles.trackRow}
                      onClick={() => t.audioUrl && handleTrackClick(t)}
                    >
                      {t.audioUrl != null ? (
                        <span className={styles.playIcon} aria-hidden>
                          {playingTrackId === t.id ? "⏸" : "▶"}
                        </span>
                      ) : (
                        <span className={styles.playBtnPlaceholder} />
                      )}
                      <span className={styles.trackName}>{t.title}</span>
                      <button
                        type="button"
                        disabled={isInstrumental}
                        className={
                          isInstrumental
                            ? styles.lyricsBtnDisabled
                            : isLyricsOpen
                              ? styles.lyricsBtnActive
                              : styles.lyricsBtn
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInstrumental) return;
                          setLyricsTrackId((id) => (id === t.id ? null : t.id));
                        }}
                      >
                        {isInstrumental ? "Instrumental" : isLyricsOpen ? "Hide lyrics" : "Lyrics"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {activeTrack && (
            <div className={styles.lyricsPane} key={activeTrack.id}>
              {activeTrack.lyrics && activeTrack.lyrics.length > 0 ? (
                <>
                  <div className={styles.lyricsHeader}>
                    <span className={styles.lyricsTrackTitle}>{activeTrack.title}</span>
                    <button
                      type="button"
                      className={styles.lyricsHideBtn}
                      onClick={() => setLyricsTrackId(null)}
                    >
                      Hide lyrics
                    </button>
                  </div>
                  <pre className={styles.lyrics} key={`${activeTrack.id}-lyrics`}>
                    {activeTrack.lyrics}
                  </pre>
                </>
              ) : (
                <div className={styles.lyricsEmpty}>
                  Lyrics not available yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
