import React, { useEffect, useRef, useState } from "react";
import type { Album, Track } from "../discographyData";
import styles from "./AlbumModal.module.css";

type Props = {
  album: Album;
  onClose: () => void;
};

const INSTRUMENT_OPTIONS = [
  "Electric Guitar",
  "Bass Guitar",
  "Acoustic Guitar",
  "Strings",
  "Drums",
] as const;

export const AlbumModal: React.FC<Props> = ({ album, onClose }) => {
  const [lyricsTrackId, setLyricsTrackId] = useState<string | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [instrumentPickerTrackId, setInstrumentPickerTrackId] = useState<string | null>(null);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const activeTrack: Track | null =
    album.tracks.find((t) => t.id === lyricsTrackId) ?? null;

  useEffect(() => {
    if (!lyricsTrackId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (instrumentPickerTrackId != null || comingSoonOpen) return;
      e.stopPropagation();
      setLyricsTrackId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lyricsTrackId, instrumentPickerTrackId, comingSoonOpen]);

  useEffect(() => {
    if (instrumentPickerTrackId == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (comingSoonOpen) return;
      e.preventDefault();
      e.stopPropagation();
      setInstrumentPickerTrackId(null);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [instrumentPickerTrackId, comingSoonOpen]);

  useEffect(() => {
    if (!comingSoonOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      setComingSoonOpen(false);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [comingSoonOpen]);

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
      <div
        className={`${styles.modal} ${activeTrack ? styles.modalWide : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div
          className={`${styles.modalScroll} ${activeTrack ? styles.modalScrollSplit : ""}`}
        >
          <div className={styles.header}>
            <img
              src={encodeURI(album.coverUrl)}
              alt=""
              className={styles.cover}
              decoding="async"
              fetchPriority="high"
            />
            <div className={styles.meta}>
              <h2 className={styles.title}>
                <span className={styles.goldHeading}>{album.title}</span>
              </h2>
              <p className={styles.year}>
                <span className={styles.goldYear}>Year: {album.year}</span>
              </p>
            </div>
          </div>
          <div
            className={`${styles.body} ${activeTrack ? styles.bodyWithLyrics : ""}`}
          >
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
                        <span className={styles.trackRowEnd}>
                          <button
                            type="button"
                            className={styles.tabsBtn}
                            aria-label="Tabs — choose instrument"
                            aria-haspopup="dialog"
                            aria-expanded={instrumentPickerTrackId === t.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setInstrumentPickerTrackId(t.id);
                            }}
                          >
                            Tabs
                          </button>
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
                            {isInstrumental ? "Instrumental" : "Lyrics"}
                          </button>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {activeTrack && (
              <div className={styles.lyricsPaneOuter} key={activeTrack.id}>
                <aside className={styles.lyricsPane} aria-label="Lyrics">
                  <div className={styles.lyricsHeader}>
                    <h3
                      id={`album-modal-lyrics-h-${activeTrack.id}`}
                      className={styles.lyricsTrackTitle}
                    >
                      {activeTrack.title}
                    </h3>
                    <button
                      type="button"
                      className={styles.lyricsCloseBtn}
                      onClick={() => setLyricsTrackId(null)}
                      aria-label="Close lyrics"
                    >
                      Close
                    </button>
                  </div>
                  <div className={styles.lyricsScroll}>
                    {activeTrack.lyrics && activeTrack.lyrics.length > 0 ? (
                      <pre className={styles.lyrics}>{activeTrack.lyrics}</pre>
                    ) : (
                      <div className={styles.lyricsEmpty}>Lyrics not available yet.</div>
                    )}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      </div>

      {instrumentPickerTrackId != null && (
        <div
          className={styles.instrumentPickerBackdrop}
          onClick={() => setInstrumentPickerTrackId(null)}
          role="presentation"
        >
          <div
            className={styles.instrumentPicker}
            role="dialog"
            aria-modal="true"
            aria-labelledby="album-modal-instrument-picker-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="album-modal-instrument-picker-title" className={styles.instrumentPickerTitle}>
              Please Select Your Instrument
            </h2>
            <ul className={styles.instrumentPickerList}>
              {INSTRUMENT_OPTIONS.map((name) => (
                <li key={name} className={styles.instrumentPickerItem}>
                  <button
                    type="button"
                    className={styles.instrumentPickerOption}
                    onClick={() => {
                      setInstrumentPickerTrackId(null);
                      setComingSoonOpen(true);
                    }}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.instrumentPickerCancel}
              onClick={() => setInstrumentPickerTrackId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comingSoonOpen && (
        <div
          className={styles.comingSoonBackdrop}
          onClick={() => setComingSoonOpen(false)}
          role="presentation"
        >
          <div
            className={styles.comingSoonDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="album-modal-coming-soon-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="album-modal-coming-soon-title" className={styles.comingSoonTitle}>
              Coming Soon
            </h2>
            <p className={styles.comingSoonText}>
              Tab playback for this instrument is not available yet. Check back later.
            </p>
            <button
              type="button"
              className={styles.comingSoonOk}
              onClick={() => setComingSoonOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
