import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./AppTopNav.module.css";

export const AppTopNav: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          FluidWhite
        </NavLink>
        <nav className={styles.nav} aria-label="Primary">
          <Link className={styles.link} to="/discography">
            Discography
          </Link>
          <Link className={styles.link} to="/biography">
            About
          </Link>
          <Link className={styles.link} to="/photos">
            Photos
          </Link>
          <Link className={styles.link} to="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

