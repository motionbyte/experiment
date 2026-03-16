import React from "react";
import styles from "./HomePage.module.css";
import { LogoIntro } from "../../features/intro/LogoIntro/LogoIntro";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <LogoIntro />
    </div>
  );
};

