import React, { useState } from "react";
import { SCORE_FILMS } from "./scoreFilmsData";
import type { ScoreFilm } from "./scoreFilmsData";
import { ScoreFilmModal } from "./ScoreFilmModal";
import styles from "./ScorePortfolioSection.module.css";

export const ScorePortfolioSection: React.FC = () => {
  const [open, setOpen] = useState<ScoreFilm | null>(null);

  return (
    <section className={styles.section} aria-labelledby="score-portfolio-h">
      <h2 id="score-portfolio-h" className={styles.heading}>
        Selected credits
      </h2>
      <p className={styles.lead}>
        Films on Prime Video — tap a title for full cast, crew, and audio credits.
      </p>

      <ul className={styles.grid}>
        {SCORE_FILMS.map((film) => (
          <li key={film.id}>
            <button
              type="button"
              className={styles.card}
              onClick={() => setOpen(film)}
              aria-haspopup="dialog"
              aria-expanded={open?.id === film.id}
            >
              <span className={styles.thumbWrap}>
                <img
                  src={film.posterUrl}
                  alt=""
                  className={styles.thumb}
                  decoding="async"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardTitle}>{film.title}</span>
                {film.titleNative && (
                  <span className={styles.cardNative}>{film.titleNative}</span>
                )}
                <span className={styles.cardMeta}>
                  {film.year}
                  <span className={styles.cardDot} aria-hidden>
                    {" "}
                    ·{" "}
                  </span>
                  {film.genres.slice(0, 2).join(", ")}
                </span>
                <span className={styles.cardHint}>Details →</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && <ScoreFilmModal film={open} onClose={() => setOpen(null)} />}
    </section>
  );
};
