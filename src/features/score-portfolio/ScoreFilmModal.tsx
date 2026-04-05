import React, { useEffect } from "react";
import type { ScoreFilm } from "./scoreFilmsData";
import styles from "./ScoreFilmModal.module.css";

type Props = {
  film: ScoreFilm;
  onClose: () => void;
};

export const ScoreFilmModal: React.FC<Props> = ({ film, onClose }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`film-modal-${film.id}-title`}
    >
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className={styles.sheetScroll}>
          <div className={styles.heroRow}>
            <div className={styles.posterWrap}>
              <img
                src={film.posterUrl}
                alt=""
                className={styles.poster}
                decoding="async"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={styles.heroMeta}>
              <p className={styles.kicker}>Prime Video</p>
              <h2 id={`film-modal-${film.id}-title`} className={styles.title}>
                {film.title}
              </h2>
              {film.titleNative && (
                <p className={styles.titleNative}>{film.titleNative}</p>
              )}
              <p className={styles.metaLine}>
                {film.year}
                <span className={styles.dot} aria-hidden>
                  ·
                </span>
                {film.runtime}
              </p>
              <p className={styles.genres}>{film.genres.join(" · ")}</p>
              {film.imdbRating && (
                <p className={styles.imdb}>
                  IMDb <strong>{film.imdbRating}</strong>/10
                </p>
              )}
              <a
                href={film.primeVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primeLink}
              >
                Open on Prime Video →
              </a>
            </div>
          </div>

          <div className={styles.body}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Synopsis</h3>
              <p className={styles.synopsis}>{film.synopsis}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Credits</h3>
              <dl className={styles.dl}>
                <div className={styles.dlRow}>
                  <dt>Director</dt>
                  <dd>{film.director}</dd>
                </div>
                <div className={styles.dlRow}>
                  <dt>Producers</dt>
                  <dd>{film.producers.join(", ")}</dd>
                </div>
                <div className={styles.dlRow}>
                  <dt>Cast</dt>
                  <dd>{film.cast.join(", ")}</dd>
                </div>
                <div className={styles.dlRow}>
                  <dt>Studios</dt>
                  <dd>{film.studios.join(", ")}</dd>
                </div>
                <div className={`${styles.dlRow} ${styles.dlHighlight}`}>
                  <dt>Music director</dt>
                  <dd>{film.musicCredit}</dd>
                </div>
                <div className={`${styles.dlRow} ${styles.dlHighlight}`}>
                  <dt>Background score</dt>
                  <dd>{film.musicCredit}</dd>
                </div>
                <div className={styles.dlRow}>
                  <dt>IMDb</dt>
                  <dd>
                    <a
                      className={styles.inlineLink}
                      href={`https://www.imdb.com/title/${film.imdbId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {film.imdbId}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
