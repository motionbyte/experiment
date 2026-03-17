import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { bandMembers } from "../bandMembersData";
import { MemberModal } from "../MemberModal/MemberModal";
import { VinylSpinner } from "../../discography/VinylSpinner/VinylSpinner";
import type { BandMember } from "../bandMembersData";
import styles from "./BandMembersSection.module.css";

const PATH_D = `M 50 0
  L 22 10 L 22 18
  L 50 26 L 78 34 L 78 42
  L 50 50 L 22 58 L 22 66
  L 50 74 L 78 82 L 78 90
  L 50 98 L 22 98 L 22 100
  L 50 100`;

const MEMBER_COUNT = bandMembers.length;

export const BandMembersSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<BandMember | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const memberRefs = useRef<(HTMLLIElement | null)[]>([]);
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
      for (let i = 0; i < MEMBER_COUNT; i++) {
        const el = memberRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        if (rowCenter < viewportCenter) activeIndex = i;
      }
      if (activeIndex < 0) {
        setPathProgress(1 / MEMBER_COUNT);
        return;
      }
      const progress = (activeIndex + 1) / MEMBER_COUNT;
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
    const angleRad = Math.atan2(pointNext.y - point.y, pointNext.x - point.x);
    const angleDeg = (angleRad * 180) / Math.PI;
    setMarker({ x: point.x, y: point.y, angle: angleDeg });
  }, [pathProgress, pathLength]);

  return (
    <>
      <section
        id="band"
        ref={sectionRef}
        className={styles.section}
        aria-label="Band members"
      >
        <div className={styles.titleRow}>
          <h2 className={styles.heading}>BAND MEMBERS</h2>
          <VinylSpinner size={52} className={styles.vinyl} />
        </div>

        <div className={styles.timeline}>
          <svg
            className={styles.pathSvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="bandPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
              </linearGradient>
              <filter id="bandPathGlow">
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
              stroke="url(#bandPathGrad)"
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
                filter="url(#bandPathGlow)"
              />
            </g>
          </svg>

          <ul className={styles.memberList}>
            {bandMembers.map((member, index) => (
              <li
                key={member.id}
                ref={(el) => {
                  memberRefs.current[index] = el;
                }}
                className={index % 2 === 0 ? styles.memberLeft : styles.memberRight}
              >
                <button
                  type="button"
                  className={styles.card}
                  onClick={() => setSelectedMember(member)}
                >
                  <div className={styles.photoWrap}>
                    <img
                      src={encodeURI(member.photoUrl)}
                      alt=""
                      className={styles.photo}
                    />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>{member.name}</span>
                    <span className={styles.role}>{member.role}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
};
