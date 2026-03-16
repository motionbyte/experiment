import React from "react";
import styles from "./SideDrawer.module.css";

type DrawerLink = { label: string; href: string };

const links: DrawerLink[] = [
  { label: "Discography", href: "#discography" },
  { label: "About", href: "#about" },
  { label: "Photos", href: "#photos" },
  { label: "Contact", href: "#contact" },
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
              key={l.href}
              className={styles.link}
              href={l.href}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

