import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { albums } from "../../features/discography/discographyData";
import { setSeoHead } from "../../seo/setSeoHead";
import { SITE_ORIGIN } from "../../seo/siteOrigin";
import styles from "./AlbumSeoPage.module.css";

/**
 * Dedicated URL per album (/album/:id) for sitemap + readable listings in Google.
 */
export const AlbumSeoPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const album = albums.find((a) => a.id === albumId);

  useEffect(() => {
    if (!album) return;
    const path = `/album/${album.id}`;
    const desc = `${album.title} (${album.year}) by The Lost Symbols. ${album.tracks.length} tracks.`;
    setSeoHead({
      title: `${album.title} — The Lost Symbols`,
      description: desc,
      canonicalPath: path,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        name: album.title,
        datePublished: album.year,
        numTracks: album.tracks.length,
        url: `${SITE_ORIGIN}${path}`,
        byArtist: {
          "@type": "MusicGroup",
          name: "The Lost Symbols",
          url: SITE_ORIGIN,
        },
      },
    });
  }, [album]);

  if (!album) {
    return <Navigate to="/discography" replace />;
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
        <Link to="/discography" className={styles.crumb}>
          Discography
        </Link>
        <span className={styles.sep} aria-hidden>
          /
        </span>
        <span className={styles.current}>{album.title}</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{album.title}</h1>
        <p className={styles.meta}>Year: {album.year}</p>
      </header>

      <section aria-labelledby="tracks-heading">
        <h2 id="tracks-heading" className={styles.tracksHeading}>
          Tracks
        </h2>
        <ol className={styles.trackList}>
          {album.tracks.map((t, i) => (
            <li key={t.id} className={styles.trackItem}>
              <span className={styles.trackNum}>{i + 1}.</span> {t.title}
            </li>
          ))}
        </ol>
      </section>

      <p className={styles.hint}>
        Listen in the{" "}
        <Link to="/discography" className={styles.inlineLink}>
          discography
        </Link>{" "}
        section on the main site.
      </p>
    </article>
  );
};
