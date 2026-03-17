import React from "react";
import styles from "./SideDrawer.module.css";

type DrawerLink = { label: string; id: string };

const links: DrawerLink[] = [
  { label: "Discography", id: "discography" },
  { label: "Biography", id: "biography" },
  { label: "Band Members", id: "band" },
  { label: "Playlists", id: "playlist" },
  { label: "Photos", id: "photos" },
  { label: "Videos", id: "videos" },
  { label: "Contact", id: "contact" },
];

export const SideDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
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
          <div className={styles.title}>Menu</div>
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
          {links.map((l) => (
            <a
              key={l.id}
              className={styles.link}
              href={`#${l.id}`}
              onClick={(e) => handleNavClick(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

