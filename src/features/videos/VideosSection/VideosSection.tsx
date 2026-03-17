import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { officialMusicVideos, SUBSCRIBE_URL } from "../videosData";
import styles from "./VideosSection.module.css";

const BRAND_LINKS = [
  { label: "Subscribe on YouTube", href: SUBSCRIBE_URL, class: "subscribeBtn", aria: "Subscribe on YouTube", icon: "youtube" },
  { label: "Follow on Instagram", href: "https://www.instagram.com/thelostsymbols/", class: "instagramBtn", aria: "Follow on Instagram", icon: "instagram" },
  { label: "Follow on Facebook", href: "https://www.facebook.com/thelostsymbols/", class: "facebookBtn", aria: "Follow on Facebook", icon: "facebook" },
  { label: "Spotify", href: "https://open.spotify.com/artist/5ABVMc7CPQJ9RZHoBFuXpa", class: "spotifyBtn", aria: "Listen on Spotify", icon: "spotify" },
  { label: "Apple Music", href: "https://music.apple.com/in/artist/the-lost-symbols/1542811943", class: "appleMusicBtn", aria: "Listen on Apple Music", icon: "apple" },
  { label: "JioSaavn", href: "https://www.jiosaavn.com/artist/the-lost-symbols-songs/NkGZk8ZwWrs_", class: "jiosaavnBtn", aria: "Listen on JioSaavn", icon: "jiosaavn" },
  { label: "Amazon Music", href: "https://music.amazon.in/artists/B086Y9KWMH/the-lost-symbols", class: "amazonMusicBtn", aria: "Listen on Amazon Music", icon: "amazon" },
  { label: "Tidal", href: "https://tidal.com/artist/19042438", class: "tidalBtn", aria: "Listen on Tidal", icon: "tidal" },
] as const;

const YouTubeIcon = () => (
  <span className={styles.brandIcon} aria-hidden>
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  </span>
);

const InstagramIcon = () => (
  <span className={styles.brandIcon} aria-hidden>
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.766 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  </span>
);

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
const YOUTUBE_WATCH = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;

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
        <h2 className={styles.heading}>Videos</h2>
      </div>
      <p className={styles.tagline}>Official Music Videos</p>

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
              <a
                href={YOUTUBE_WATCH(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoCard}
              >
                <div className={styles.thumbWrap}>
                  <img
                    src={YOUTUBE_THUMB(video.id)}
                    alt=""
                    className={styles.cover}
                  />
                  <span className={styles.playIcon} aria-hidden>▶</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.videoTitle}>{video.title}</span>
                  <span className={styles.videoDate}>{formatDate(video.date)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.subscribeWrap}>
        {BRAND_LINKS.map(({ label, href, class: className, aria, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles[className]}
            aria-label={aria}
          >
            {icon === "youtube" && <YouTubeIcon />}
            {icon === "instagram" && <InstagramIcon />}
            {label}
          </a>
        ))}
      </div>
    </section>
  );
};
