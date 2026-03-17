import React from "react";
import styles from "./BiographySection.module.css";

const SPOTIFY_ALBUM_LINKS: Record<string, string> = {
  "The Diary (2021)": "https://open.spotify.com/album/7DdCtXE6CQGdDXXbBXoin1",
  "GHARQ (2022)": "https://open.spotify.com/album/4Mpt6YwKT41XL4d0ziGO7P",
  "Farogh (2023)": "https://open.spotify.com/album/4q5wzhf9RfSrs1HmLGiAmd",
  "Taysa (2024)": "https://open.spotify.com/album/2OsTBHvnMOQ3PCZcOfRo84",
};

const albumItems = [
  { label: "The Diary (2021)", href: SPOTIFY_ALBUM_LINKS["The Diary (2021)"] },
  { label: "GHARQ (2022)", href: SPOTIFY_ALBUM_LINKS["GHARQ (2022)"] },
  { label: "Farogh (2023)", href: SPOTIFY_ALBUM_LINKS["Farogh (2023)"] },
  { label: "Taysa (2024)", href: SPOTIFY_ALBUM_LINKS["Taysa (2024)"] },
];

export const BiographySection: React.FC = () => {
  return (
    <section id="biography" className={styles.section} aria-label="Biography">
      <h2 className={styles.heading}>BIOGRAPHY</h2>

      <div className={styles.content}>
        <p className={styles.para}>
          The Lost Symbols is an Indian alternative rock band based in{" "}
          <strong>Jaipur, Rajasthan</strong>. The band’s work brings together alternative rock,
          atmospheric production, and concept-based storytelling, with a creative approach that
          connects music, visuals, and thematic ideas.
        </p>

        <p className={styles.para}>
          The band features <strong>Aman Raj</strong> as lead vocalist, composer, and lyricist,
          along with <strong>Gunjan Soral</strong> on lead guitar and production,{" "}
          <strong>Gaurang Patel</strong> on rhythm guitar, <strong>Akhil Sindhwani</strong> on
          bass, and <strong>Arun Singh Naruka</strong> on drums. Together, they have developed a
          sound that moves across{" "}
          <strong>alternative rock, cinematic textures, and experimental arrangements</strong>.
        </p>

        <p className={styles.para}>
          The Lost Symbols’ music often explores themes such as reflection, transformation,
          symbolism, and narrative-based concepts. Their releases are supported by visual
          storytelling, making the band’s overall identity shaped not only by songs, but also by
          the worlds built around them.
        </p>

        <p className={styles.para}>Over the years, the band has released multiple projects that mark different stages of its journey, including:</p>

        <ul className={styles.albumList}>
          {albumItems.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.albumLink}
              >
                <strong>{label}</strong>
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.para}>
          Alongside these albums, the band is also developing parallel projects such as{" "}
          <strong>Agnikund</strong>, <strong>METH</strong>, and the <strong>Punarnirman Series</strong>,
          each contributing to its evolving creative direction.
        </p>

        <p className={styles.para}>
          Through independent releases, concept-driven music, and visual experimentation, The Lost
          Symbols continues to build a body of work that reflects both its musical identity and
          its interest in storytelling.
        </p>
      </div>
    </section>
  );
};
