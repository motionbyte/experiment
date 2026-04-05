import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArtistTrackDetailModal } from "./ArtistTrackDetailModal";
import { ArtistTracksModal } from "./ArtistTracksModal";
import type { ArtistTrack } from "./featuredArtistsData";
import { FeaturedArtistPhoto } from "./FeaturedArtistPhoto";
import { FEATURED_ARTISTS, getArtistById } from "./featuredArtistsData";
import styles from "./ArtistCollaborationsSection.module.css";

/**
 * Artist-facing production work — Kumar Sanu opens track list → track detail modals.
 */
export const ArtistCollaborationsSection: React.FC = () => {
  const [artistModalId, setArtistModalId] = useState<string | null>(null);
  const [trackPick, setTrackPick] = useState<{
    artistId: string;
    track: ArtistTrack;
  } | null>(null);

  const modalOpen = artistModalId != null || trackPick != null;

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (trackPick) setTrackPick(null);
      else setArtistModalId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, trackPick]);

  const artistForModal = artistModalId ? getArtistById(artistModalId) : undefined;

  return (
    <section
      className={styles.section}
      aria-labelledby="score-artist-collab-h"
    >
      <h2 id="score-artist-collab-h" className={styles.heading}>
        Production Collaborations For Artists
      </h2>
      <p className={styles.lead}>
        Beyond films, we build tracks with artists — production, arrangement, and
        mix-ready delivery for singles, EPs, and releases you own end to end.
      </p>

      <h3 className={styles.subheading} id="score-featured-artists-h">
        Featured artists
      </h3>
      <ul className={styles.artistGrid} aria-labelledby="score-featured-artists-h">
        {FEATURED_ARTISTS.map((a, index) => {
          const hasTracks = (a.tracks?.length ?? 0) > 0;
          const accentStyle = { "--accent": index } as React.CSSProperties;
          if (hasTracks) {
            return (
              <li key={a.id} className={styles.artistCell} style={accentStyle}>
                <button
                  type="button"
                  className={`${styles.artistBox} ${styles.artistBoxInteractive}`}
                  onClick={() => setArtistModalId(a.id)}
                  aria-haspopup="dialog"
                >
                  <FeaturedArtistPhoto name={a.name} imageUrl={a.imageUrl} />
                  <span className={styles.artistName}>{a.name}</span>
                  <span className={styles.artistShine} aria-hidden="true" />
                </button>
                <Link to={`/artist/${a.id}`} className={styles.profilePageLink}>
                  Profile &amp; credits
                </Link>
              </li>
            );
          }
          return (
            <li key={a.id} className={styles.artistCell} style={accentStyle}>
              <div className={styles.artistBox}>
                <FeaturedArtistPhoto name={a.name} imageUrl={a.imageUrl} />
                <span className={styles.artistName}>{a.name}</span>
                <span className={styles.artistShine} aria-hidden="true" />
              </div>
              <Link to={`/artist/${a.id}`} className={styles.profilePageLink}>
                Profile &amp; credits
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className={styles.points}>
        <li className={styles.point}>
          <span className={styles.pointIcon} aria-hidden="true">
            ◆
          </span>
          <span className={styles.pointText}>
            Full-track production and sonic direction tailored to your voice and story
          </span>
        </li>
        <li className={styles.point}>
          <span className={styles.pointIcon} aria-hidden="true">
            ◆
          </span>
          <span className={styles.pointText}>
            Arrangement, programming, and session-ready stems for collaborators
          </span>
        </li>
        <li className={styles.point}>
          <span className={styles.pointIcon} aria-hidden="true">
            ◆
          </span>
          <span className={styles.pointText}>
            Mix prep and loudness-conscious masters aligned with streaming platforms
          </span>
        </li>
      </ul>

      {artistForModal?.tracks && (
        <ArtistTracksModal
          artist={artistForModal}
          onClose={() => {
            setTrackPick(null);
            setArtistModalId(null);
          }}
          onPickTrack={(track) => {
            setTrackPick({ artistId: artistForModal.id, track });
          }}
        />
      )}

      {trackPick && (
        <ArtistTrackDetailModal
          key={`${trackPick.artistId}-${trackPick.track.id}`}
          artistName={getArtistById(trackPick.artistId)?.name ?? ""}
          track={trackPick.track}
          onClose={() => setTrackPick(null)}
        />
      )}
    </section>
  );
};
