import React from "react";
import styles from "./PlaylistSlider.module.css";

const SPOTIFY_PLAYLISTS_URL = "https://open.spotify.com/artist/5ABVMc7CPQJ9RZHoBFuXpa/playlists";

const TICKER_ITEMS = [
  "The Lost Symbols",
  "Playlists",
  "Listen on Spotify",
  "The Diary",
  "GHARQ",
  "Farogh",
  "Taysa",
  "•",
];

export const PlaylistSlider: React.FC = () => {
  return (
    <section id="playlist" className={styles.section} aria-label="Spotify playlists">
      <a
        href={SPOTIFY_PLAYLISTS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <div className={styles.track}>
          <div className={styles.ticker}>
            {TICKER_ITEMS.map((label, i) => (
              <span key={i} className={styles.item}>
                {label}
              </span>
            ))}
          </div>
          <div className={styles.ticker} aria-hidden>
            {TICKER_ITEMS.map((label, i) => (
              <span key={`dup-${i}`} className={styles.item}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </a>
    </section>
  );
};
