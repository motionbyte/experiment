import React from "react";
import { SUBSCRIBE_URL } from "../../videos/videosData";
import styles from "./ConnectWithUsSection.module.css";

function brandMaskUrl(file: string): string {
  const raw = import.meta.env.BASE_URL;
  const base = raw.endsWith("/") ? raw : `${raw}/`;
  return `url("${base}brands/${file}")`;
}

function iconMaskFromPaths(pathElements: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${pathElements}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const PHONE_ICON_MASK = iconMaskFromPaths(
  '<path fill="#fff" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>',
);

const EMAIL_ICON_MASK = iconMaskFromPaths(
  '<path fill="#fff" d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path fill="#fff" d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>',
);

const BRAND_LINKS = [
  { aria: "Subscribe on YouTube", href: SUBSCRIBE_URL, logo: "youtube.svg" },
  { aria: "Follow on Instagram", href: "https://www.instagram.com/thelostsymbols/", logo: "instagram.svg" },
  { aria: "Follow on Facebook", href: "https://www.facebook.com/thelostsymbols/", logo: "facebook.svg" },
  { aria: "Listen on Spotify", href: "https://open.spotify.com/artist/5ABVMc7CPQJ9RZHoBFuXpa", logo: "spotify.svg" },
  { aria: "Listen on Apple Music", href: "https://music.apple.com/in/artist/the-lost-symbols/1542811943", logo: "applemusic.svg" },
  { aria: "Listen on JioSaavn", href: "https://www.jiosaavn.com/artist/the-lost-symbols-songs/NkGZk8ZwWrs_", logo: "jiosaavn.svg" },
  { aria: "Listen on Amazon Music", href: "https://music.amazon.in/artists/B086Y9KWMH/the-lost-symbols", logo: "amazonmusic.svg" },
  { aria: "Listen on Tidal", href: "https://tidal.com/artist/19042438", logo: "tidal.svg" },
] as const;

const PHONE = "+91 9867024294";
const EMAIL = "tlssymbols@gmail.com";

export const ConnectWithUsSection: React.FC = () => {
  return (
    <section id="contact" className={styles.section} aria-label="Connect with us">
      <h2 className={styles.heading}>
        <span className="tls-gold-heading">Connect with us</span>
      </h2>
      <p className={styles.tagline}>
        <span className="tls-gold-year">Reach out to the band</span>
      </p>
      <div className={styles.links}>
        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          className={styles.link}
          aria-label="Call band"
        >
          <span
            className={styles.linkIconGold}
            style={{ "--tls-contact-mask": PHONE_ICON_MASK } as React.CSSProperties}
            aria-hidden
          />
          <span className="tls-gold-heading">{PHONE}</span>
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className={styles.link}
          aria-label="Email band"
        >
          <span
            className={styles.linkIconGold}
            style={{ "--tls-contact-mask": EMAIL_ICON_MASK } as React.CSSProperties}
            aria-hidden
          />
          <span className="tls-gold-heading">{EMAIL}</span>
        </a>
      </div>

      <div className={styles.socialBlock}>
        <h3 className={styles.socialHeading}>
          <span className="tls-gold-heading">Follow Our Socials</span>
        </h3>
        <ul className={styles.brandLogos}>
          {BRAND_LINKS.map(({ aria, href, logo }) => (
            <li key={aria} className={styles.brandLogoItem}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.brandLogoLink}
                aria-label={aria}
              >
                <span
                  className={styles.brandLogoMark}
                  style={
                    {
                      "--tls-brand-mask": brandMaskUrl(logo),
                    } as React.CSSProperties
                  }
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
