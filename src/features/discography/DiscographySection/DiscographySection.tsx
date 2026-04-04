import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { albums } from "../discographyData";
import { AlbumModal } from "../AlbumModal/AlbumModal";
import { AlbumArtworkStack } from "../AlbumArtworkStack/AlbumArtworkStack";
import type { Album } from "../discographyData";
import styles from "./DiscographySection.module.css";

const PATH_D = `M 50 0
  L 22 8 L 22 12
  L 50 16 L 78 20 L 78 24
  L 50 28 L 22 32 L 22 36
  L 50 40 L 78 44 L 78 48
  L 50 52 L 22 56 L 22 60
  L 50 64 L 78 68 L 78 72
  L 50 76 L 22 80 L 22 84
  L 50 88 L 50 100`;

const ALBUM_COUNT = albums.length;

export const DiscographySection: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const albumRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [pathProgress, setPathProgress] = useState(0);
  const [pathLength, setPathLength] = useState(400);
  const [marker, setMarker] = useState({ x: 50, y: 0, angle: 90 });

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (path) setPathLength(path.getTotalLength());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = () => {
      const vh = window.innerHeight;
      const viewportCenter = vh * 0.45;

      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.top > vh || sectionRect.bottom < 0) {
        setPathProgress(0);
        return;
      }

      let activeIndex = -1;
      for (let i = 0; i < ALBUM_COUNT; i++) {
        const el = albumRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        if (rowCenter < viewportCenter) activeIndex = i;
      }

      if (activeIndex < 0) {
        setPathProgress(1 / ALBUM_COUNT);
        return;
      }
      const progress = (activeIndex + 1) / ALBUM_COUNT;
      setPathProgress(Math.min(1, progress));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || pathLength <= 0) return;
    const progress = Math.max(0, Math.min(1, pathProgress));
    const len = progress * pathLength;
    const point = path.getPointAtLength(len);
    const nextLen = Math.min(len + 2, pathLength);
    const pointNext = path.getPointAtLength(nextLen);
    const dx = pointNext.x - point.x;
    const dy = pointNext.y - point.y;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;
    setMarker({ x: point.x, y: point.y, angle: angleDeg });
  }, [pathProgress, pathLength]);

  return (
    <>
      <section
        id="discography"
        ref={sectionRef}
        className={styles.section}
        aria-label="Discography"
      >
        <div className={styles.titleRow}>
          <h2 className={styles.heading}>DISCOGRAPHY</h2>
        </div>

        <div className={styles.timeline}>
          <svg
            className={styles.pathSvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="discPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={pathRef}
              className={styles.pathTrack}
              d={PATH_D}
              fill="none"
              stroke="url(#discPathGrad)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength * (1 - pathProgress),
              }}
            />
            <g
              className={styles.marker}
              transform={`translate(${marker.x},${marker.y}) rotate(${marker.angle})`}
            >
              <polygon
                points="0,0 -1.2,-2.4 1.2,-2.4"
                fill="var(--accent)"
                filter="url(#pathGlow)"
              />
            </g>
          </svg>

          <ul className={styles.albumList}>
            {albums.map((album, index) => (
              <li
                key={album.id}
                ref={(el) => {
                  albumRefs.current[index] = el;
                }}
                className={index % 2 === 0 ? styles.albumLeft : styles.albumRight}
              >
                <button
                  type="button"
                  className={styles.albumCard}
                  data-album-hover=""
                  onClick={() => setSelectedAlbum(album)}
                >
                  <AlbumArtworkStack
                    coverUrl={album.coverUrl}
                    peek={index % 2 === 0 ? "right" : "left"}
                    paletteIndex={index}
                  />
                  <div className={styles.info}>
                    <span className={styles.albumTitle}>{album.title}</span>
                    <span className={styles.albumYear}>Year: {album.year}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </>
  );
};
