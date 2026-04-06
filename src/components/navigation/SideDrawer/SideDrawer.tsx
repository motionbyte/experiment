import React from "react";
import { Link } from "react-router-dom";
import { SCORE_URL, VERSE_URL } from "../../../features/sister-ventures/venturesConfig";
import styles from "./SideDrawer.module.css";

type MainLink = { label: string; id: string };

/** Order matches `HomePage` section order (Ventures is parent + sub-items below) */
const mainLinks: MainLink[] = [
  { label: "Discography", id: "discography" },
  { label: "Biography", id: "biography" },
  { label: "Playlists", id: "playlist" },
  { label: "Band Members", id: "band" },
  { label: "Photos", id: "photos" },
  { label: "Videos", id: "videos" },
  { label: "Press Releases", id: "press-releases" },
  { label: "Contact", id: "contact" },
];

const ventureSubLinks = [
  { label: "SCORE", to: SCORE_URL },
  { label: "VERSE", to: VERSE_URL },
] as const;

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export const SideDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [venturesExpanded, setVenturesExpanded] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) setVenturesExpanded(false);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={open ? `${styles.trigger} ${styles.triggerHiddenWhenOpen}` : styles.trigger}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bars} aria-hidden="true" />
      </button>

      {open && (
        <div
          className={styles.backdrop}
          role="presentation"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={open ? styles.drawerOpen : styles.drawer} aria-hidden={!open}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className={styles.nav} aria-label="Drawer">
          {mainLinks.map((l) => (
            <Link key={l.id} className={styles.link} to={`/${l.id}`} onClick={close}>
              <span className="tls-gold-heading">{l.label}</span>
            </Link>
          ))}

          <div className={styles.ventureGroup}>
            <button
              type="button"
              className={`${styles.link} ${styles.ventureToggle}`}
              aria-expanded={venturesExpanded}
              aria-controls="ventures-submenu"
              id="ventures-menu-button"
              onClick={() => setVenturesExpanded((v) => !v)}
            >
              <span className="tls-gold-heading">Ventures</span>
              <span
                className={venturesExpanded ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
                aria-hidden
              />
            </button>
            <div
              id="ventures-submenu"
              className={
                venturesExpanded ? `${styles.subMenuPanel} ${styles.subMenuPanelOpen}` : styles.subMenuPanel
              }
              role="region"
              aria-labelledby="ventures-menu-button"
              aria-hidden={!venturesExpanded}
            >
              <div className={styles.subMenuInner} inert={!venturesExpanded ? true : undefined}>
                <ul className={styles.subMenu} role="list" aria-label="Score and Verse">
                  {ventureSubLinks.map(({ label, to }) => (
                    <li key={label} className={styles.subMenuItem}>
                      {isExternalHref(to) ? (
                        <a
                          className={`${styles.link} ${styles.subLink}`}
                          href={to}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={close}
                        >
                          <span className="tls-gold-heading">{label}</span>
                        </a>
                      ) : (
                        <Link className={`${styles.link} ${styles.subLink}`} to={to} onClick={close}>
                          <span className="tls-gold-heading">{label}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};
