import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppTopNav.module.css";

export const AppTopNav: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          FluidWhite
        </NavLink>
        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.link} href="#discography">
            Discography
          </a>
          <a className={styles.link} href="#about">
            About
          </a>
          <a className={styles.link} href="#photos">
            Photos
          </a>
          <a className={styles.link} href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

