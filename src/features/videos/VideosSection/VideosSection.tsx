import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import type { VideoItem } from "../videosData";
import { officialMusicVideos } from "../videosData";
import { VideoModal } from "../VideoModal/VideoModal";
import styles from "./VideosSection.module.css";

const PATH_D = `M 50 0
  L 22 5 L 22 11
  L 50 16 L 78 22 L 78 27
  L 50 33 L 22 38 L 22 44
  L 50 49 L 78 55 L 78 60
  L 50 66 L 22 71 L 22 77
  L 50 82 L 78 88 L 78 93
  L 50 100`;

const VIDEO_COUNT = officialMusicVideos.length;
const YOUTUBE_THUMB = (id: string) =>
  `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

export const VideosSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const videoRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [pathProgress, setPathProgress] = useState(0);
  const [pathLength, setPathLength] = useState(400);
  const [marker, setMarker] = useState({ x: 50, y: 0, angle: 90 });
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

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
      for (let i = 0; i < VIDEO_COUNT; i++) {
        const el = videoRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        if (rowCenter < viewportCenter) activeIndex = i;
      }
      if (activeIndex < 0) {
        setPathProgress(1 / VIDEO_COUNT);
        return;
      }
      const progress = (activeIndex + 1) / VIDEO_COUNT;
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
    <section id="videos" ref={sectionRef} className={styles.section} aria-label="Videos">
      <div className={styles.titleRow}>
        <h2 className={styles.heading}>
          <span className="tls-gold-heading">Videos</span>
        </h2>
      </div>
      <p className={styles.tagline}>
        <span className="tls-gold-year">Official Music Videos</span>
      </p>

      <div className={styles.timeline}>
        <svg
          className={styles.pathSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="videoPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
            <filter id="videoPathGlow">
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
            stroke="url(#videoPathGrad)"
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
              filter="url(#videoPathGlow)"
            />
          </g>
        </svg>

        <ul className={styles.videoList}>
          {officialMusicVideos.map((video, index) => (
            <li
              key={video.id}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              className={index % 2 === 0 ? styles.videoLeft : styles.videoRight}
            >
              <button
                type="button"
                className={styles.videoCard}
                onClick={() => setSelectedVideo(video)}
              >
                <div className={styles.thumbWrap}>
                  <img
                    src={YOUTUBE_THUMB(video.id)}
                    alt=""
                    className={styles.cover}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.playIcon} aria-hidden>▶</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.videoTitle}>
                    <span className="tls-gold-heading">{video.title}</span>
                  </span>
                  <span className={styles.videoDate}>
                    <span className="tls-gold-year">{formatDate(video.date)}</span>
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedVideo != null && (
        <VideoModal
          video={selectedVideo}
          formattedDate={formatDate(selectedVideo.date)}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};
