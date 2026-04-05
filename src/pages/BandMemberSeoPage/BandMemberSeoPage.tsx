import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { bandMembers } from "../../features/band-members/bandMembersData";
import { setSeoHead } from "../../seo/setSeoHead";
import { SITE_ORIGIN } from "../../seo/siteOrigin";
import styles from "../AlbumSeoPage/AlbumSeoPage.module.css";

/**
 * Dedicated URL per band member for indexing (name + band searches).
 */
export const BandMemberSeoPage: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = bandMembers.find((m) => m.id === memberId);

  useEffect(() => {
    if (!member) return;
    const path = `/member/${member.id}`;
    const desc =
      member.story.length > 140
        ? `${member.name} — ${member.role}, The Lost Symbols. ${member.story.slice(0, 140)}…`
        : `${member.name} — ${member.role}, The Lost Symbols. ${member.story}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: member.name,
      description: member.story,
      url: `${SITE_ORIGIN}${path}`,
      jobTitle: member.role,
      memberOf: {
        "@type": "MusicGroup",
        name: "The Lost Symbols",
        url: SITE_ORIGIN,
      },
      image: member.photoUrl.startsWith("http") ? member.photoUrl : `${SITE_ORIGIN}${member.photoUrl}`,
    };
    setSeoHead({
      title: `${member.name} — ${member.role} | The Lost Symbols`,
      description: desc.slice(0, 300),
      canonicalPath: path,
      jsonLd,
    });
  }, [member]);

  if (!member) {
    return <Navigate to="/band" replace />;
  }

  return (
    <article className={styles.wrap} lang="en">
      <nav className={styles.nav} aria-label="Breadcrumb">
        <Link to="/" className={styles.crumb}>
          Home
        </Link>
        <span className={styles.sep} aria-hidden>
          /
        </span>
        <Link to="/band" className={styles.crumb}>
          Band
        </Link>
        <span className={styles.sep} aria-hidden>
          /
        </span>
        <span className={styles.current}>{member.name}</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{member.name}</h1>
        <p className={styles.meta}>{member.role}</p>
      </header>

      <p className={styles.hint}>
        <img
          src={member.photoUrl}
          alt={member.name}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          style={{ maxWidth: "min(100%, 400px)", height: "auto", borderRadius: 8 }}
        />
      </p>

      <section aria-labelledby="member-bio-h">
        <h2 id="member-bio-h" className={styles.tracksHeading}>
          Biography
        </h2>
        <p className={styles.hint} style={{ lineHeight: 1.65 }}>
          {member.story}
        </p>
      </section>

      <p className={styles.hint}>
        Full line-up on the{" "}
        <Link to="/band" className={styles.inlineLink}>
          band
        </Link>{" "}
        section.
      </p>
    </article>
  );
};
