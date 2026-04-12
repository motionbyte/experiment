import type { ReactNode } from "react";
import styles from "./CinematicViewport.module.css";

type Props = { children: ReactNode };

/**
 * Site-wide “Hollywood” read: backdrop contrast/sat punch + graded overlays (teal shadow /
 * warm skylight / vignette). Lives outside route code — wrap once at `main.tsx`.
 *
 * Overlays use `pointer-events: none` and high z-index so clicks hit the app below.
 * Note: React portals that mount directly under `document.body` sit outside this tree
 * and won’t receive these layers unless they’re rendered inside `#root`.
 */
export function CinematicViewport({ children }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
      <div className={styles.backdropSheet} aria-hidden />
      <div className={styles.filmGrade} aria-hidden />
    </div>
  );
}
