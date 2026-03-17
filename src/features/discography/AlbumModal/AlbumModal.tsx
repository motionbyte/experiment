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

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={`Album: ${album.title}`}>
      <audio
        ref={audioRef}
        onEnded={() => setPlayingTrackId(null)}
        onError={() => setPlayingTrackId(null)}
      />
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.header}>
          <img src={encodeURI(album.coverUrl)} alt="" className={styles.cover} />
          <div className={styles.meta}>
            <h2 className={styles.title}>{album.title}</h2>
            <p className={styles.year}>Year: {album.year}</p>
          </div>
        </div>
        <div className={styles.tracks}>
          <h3 className={styles.tracksTitle}>Tracks</h3>
          <ul className={styles.trackList}>
            {album.tracks.map((t) => (
              <li key={t.id} className={styles.trackItem}>
                {(() => {
                  const isInstrumental = t.title.trim().toLowerCase() === "godsend";
                  const isLyricsOpen = lyricsTrackId === t.id;
                  return (
                    <>
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
                      {!isInstrumental && isLyricsOpen && (
                        <pre className={styles.lyrics}>
                          {t.lyrics != null && t.lyrics.length > 0
                            ? t.lyrics
                            : "Lyrics not available yet."}
                        </pre>
                      )}
                    </>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
