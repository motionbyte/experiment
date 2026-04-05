import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FEATURED_ARTISTS } from "../../features/score-portfolio/featuredArtistsData";
import { setSeoHead } from "../../seo/setSeoHead";
import { SITE_ORIGIN } from "../../seo/siteOrigin";
import styles from "../AlbumSeoPage/AlbumSeoPage.module.css";

/**
 * Dedicated URL per film-score collaborator for indexing (name + The Lost Symbols searches).
 */
export const ArtistSeoPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const artist = FEATURED_ARTISTS.find((a) => a.id === artistId);

  useEffect(() => {
    if (!artist) return;
    const path = `/artist/${artist.id}`;
    const desc =
      artist.bio?.slice(0, 155).replace(/\s+\S*$/, "") ||
      `${artist.name} — collaborations on film score with The Lost Symbols.`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: artist.name,
      description: artist.bio ?? desc,
      url: `${SITE_ORIGIN}${path}`,
      jobTitle: "Playback artist",
      worksFor: {
        "@type": "MusicGroup",
        name: "The Lost Symbols",
        url: SITE_ORIGIN,
      },
    };
    setSeoHead({
      title: `${artist.name} & The Lost Symbols — Film score collaborations`,
      description: desc,
      canonicalPath: path,
      jsonLd,
    });
  }, [artist]);

  if (!artist) {
    return <Navigate to="/score" replace />;
  }

  const tracks = artist.tracks ?? [];

  return (
    <article className={styles.wrap} lang="en">
      <nav className={styles.nav} aria-label="Breadcrumb">
        <Link to="/" className={styles.crumb}>
          Home
        </Link>
        <span className={styles.sep} aria-hidden>
          /
        </span>
        <Link to="/score" className={styles.crumb}>
          The Lost Symbols Score
        </Link>
        <span className={styles.sep} aria-hidden>
          /
        </span>
        <span className={styles.current}>{artist.name}</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{artist.name}</h1>
        <p className={styles.meta}>Film score collaborations with The Lost Symbols</p>
      </header>

      {artist.imageUrl ? (
        <p className={styles.hint}>
          <img
            src={artist.imageUrl}
            alt={artist.name}
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            style={{ maxWidth: "min(100%, 320px)", height: "auto", borderRadius: 8 }}
          />
        </p>
      ) : null}

      {artist.bio ? (
        <section aria-labelledby="artist-bio-h">
          <h2 id="artist-bio-h" className={styles.tracksHeading}>
            About
          </h2>
          {artist.bio.split("\n\n").map((para, i) => (
            <p key={i} className={styles.hint} style={{ marginTop: i === 0 ? 0 : "0.75rem" }}>
              {para}
            </p>
          ))}
        </section>
      ) : null}

      {tracks.length > 0 ? (
        <section aria-labelledby="collab-heading">
          <h2 id="collab-heading" className={styles.tracksHeading}>
            Collaborations
          </h2>
          <ol className={styles.trackList}>
            {tracks.map((t) => (
              <li key={t.id} className={styles.trackItem}>
                <strong>{t.title}</strong>
                {t.film ? <> — film: {t.film}</> : null}
                {t.youtubeUrl ? (
                  <>
                    {" "}
                    <a href={t.youtubeUrl} className={styles.inlineLink} rel="noopener noreferrer">
                      Official video
                    </a>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <p className={styles.hint}>
        More on the{" "}
        <Link to="/score" className={styles.inlineLink}>
          film score
        </Link>{" "}
        page.
      </p>
    </article>
  );
};
