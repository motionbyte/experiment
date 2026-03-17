import React from "react";
import type { BandMember } from "../bandMembersData";
import styles from "./MemberModal.module.css";

type Props = {
  member: BandMember;
  onClose: () => void;
};

export const MemberModal: React.FC<Props> = ({ member, onClose }) => {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} – story`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <header className={styles.header}>
          <img
            src={encodeURI(member.photoUrl)}
            alt=""
            className={styles.mainPhoto}
          />
          <div className={styles.meta}>
            <h2 className={styles.name}>{member.name}</h2>
            <p className={styles.role}>{member.role}</p>
          </div>
        </header>

        <div className={styles.story}>
          <p className={styles.storyText}>{member.story}</p>
        </div>

        {member.gallery.length > 0 && (
          <div className={styles.gallery}>
            <h3 className={styles.galleryTitle}>Photos</h3>
            <div className={styles.galleryGrid}>
              {member.gallery.map((url, i) => (
                <img
                  key={i}
                  src={encodeURI(url)}
                  alt=""
                  className={styles.galleryImg}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
