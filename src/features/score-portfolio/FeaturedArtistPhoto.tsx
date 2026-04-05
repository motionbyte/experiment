import React, { useState } from "react";
import { artistInitials } from "./artistInitials";
import styles from "./ArtistCollaborationsSection.module.css";

type Props = {
  name: string;
  /** Remote image URL (e.g. Wikimedia, JioSaavn CDN); if missing or load fails, initials fallback */
  imageUrl?: string;
};

export const FeaturedArtistPhoto: React.FC<Props> = ({ name, imageUrl }) => {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(imageUrl) && !failed;

  return (
    <div
      className={styles.artistPhoto}
      title={name}
    >
      {showImg && (
        <img
          src={imageUrl}
          alt=""
          className={styles.artistImg}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
      {!showImg && (
        <span className={styles.artistInitialsFallback} aria-hidden="true">
          {artistInitials(name)}
        </span>
      )}
    </div>
  );
};
