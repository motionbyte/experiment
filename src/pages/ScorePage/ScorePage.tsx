import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FluidBackground } from "../../components/FluidBackground/FluidBackground";
import { setSeoHead } from "../../seo/setSeoHead";
import { SITE_ORIGIN } from "../../seo/siteOrigin";
import { ArtistCollaborationsSection } from "../../features/score-portfolio/ArtistCollaborationsSection";
import { ScorePortfolioSection } from "../../features/score-portfolio/ScorePortfolioSection";
import { ScoreVenturesSection } from "../../features/score-portfolio/ScoreVenturesSection";
import styles from "./ScorePage.module.css";

/**
 * Standalone film-score venture page — same WebGL fluid as main site, separate layout.
 * Routes: /score or /the-lost-symbols-score (same page on main domain)
 */
export const ScorePage: React.FC = () => {
  useEffect(() => {
    const desc =
      "Commercial film and streaming — original songs, background score, and sonic branding by The Lost Symbols. Featured collaborations and portfolio.";
    setSeoHead({
      title: "The Lost Symbols Score — Film songs & background score",
      description: desc,
      canonicalPath: "/score",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "The Lost Symbols Score",
        url: `${SITE_ORIGIN}/score`,
        description: desc,
        isPartOf: { "@type": "WebSite", name: "The Lost Symbols", url: SITE_ORIGIN },
      },
    });
  }, []);

  return (
    <div className="app-shell">
      <FluidBackground />
      <main className={`app-main ${styles.main}`}>
        <div className={styles.inner}>
          <header className={styles.topBar}>
            <Link to="/" className={styles.back}>
              ← The Lost Symbols
            </Link>
            <span className={styles.badge}>Film audio</span>
          </header>

          <div className={styles.hero}>
            <div className={styles.filmStrip} aria-hidden="true">
              {Array.from({ length: 11 }).map((_, i) => (
                <span key={i} className={styles.perf} />
              ))}
            </div>
            <h1 className={styles.title}>
              <span className={styles.titleAccent}>The Lost Symbols</span>
              <span className={styles.titleScore}>Score</span>
            </h1>
            <p className={styles.subtitle}>
              Commercial cinema — original songs, background score, and sonic identity for
              the screen.
            </p>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <section className={styles.block} aria-labelledby="score-what">
            <h2 id="score-what" className={styles.blockTitle}>
              What we do
            </h2>
            <ul className={styles.list}>
              <li className={styles.item}>
                <span className={styles.itemIcon} aria-hidden="true">
                  ♪
                </span>
                <p className={styles.itemText}>
                  Original songs and vocal pieces tailored for film narratives
                </p>
              </li>
              <li className={styles.item}>
                <span className={styles.itemIcon} aria-hidden="true">
                  ◈
                </span>
                <p className={styles.itemText}>
                  Background score, themes, and sonic branding for theatrical &amp; streaming
                  releases
                </p>
              </li>
              <li className={styles.item}>
                <span className={styles.itemIcon} aria-hidden="true">
                  ⌁
                </span>
                <p className={styles.itemText}>
                  Collaboration with directors &amp; producers from concept to final mix
                </p>
              </li>
            </ul>
          </section>

          <ScorePortfolioSection />

          <ArtistCollaborationsSection />

          <ScoreVenturesSection />

          <footer className={styles.footerNote}>
            The Lost Symbols Score — a venture by The Lost Symbols
          </footer>
        </div>
      </main>
    </div>
  );
};
