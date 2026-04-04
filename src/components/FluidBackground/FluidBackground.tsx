import React, { useEffect, useRef } from "react";
import styles from "./FluidBackground.module.css";

const FLUID_SCRIPT_URL = "/fluid/script.js";

declare global {
  interface Window {
    __FLUID_CANVAS__?: HTMLCanvasElement | null;
    __FLUID_API__?: {
      destroy: () => void;
      config: Record<string, unknown> & { PAUSED?: boolean };
      addSplat: (n?: number) => void;
    };
  }
}

/**
 * Full-viewport WebGL fluid. Pauses simulation when tab is hidden (no quality loss when visible).
 */
export const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prevBodyBg = document.body.style.background;
    document.body.style.background = "transparent";

    let rafId: number | null = null;

    const syncFluidPause = () => {
      const cfg = window.__FLUID_API__?.config;
      if (!cfg) return;
      const hidden =
        document.visibilityState !== "visible" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cfg.PAUSED = hidden;
    };

    const onVisibility = () => syncFluidPause();
    const onReducedMotion = () => syncFluidPause();
    document.addEventListener("visibilitychange", onVisibility, { passive: true });
    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", onReducedMotion);

    const loadFluid = () => {
      if (!canvasRef.current) return;
      const c = canvasRef.current;
      if (c.clientWidth === 0 || c.clientHeight === 0) {
        rafId = requestAnimationFrame(loadFluid);
        return;
      }
      window.__FLUID_CANVAS__ = c;
      const scriptEl = document.createElement("script");
      scriptEl.src = FLUID_SCRIPT_URL;
      scriptEl.async = false;
      scriptRef.current = scriptEl;

      scriptEl.onerror = () => {
        console.warn("[FluidBackground] Failed to load fluid script.");
        window.__FLUID_CANVAS__ = undefined;
      };

      scriptEl.onload = () => {
        syncFluidPause();
      };

      document.body.appendChild(scriptEl);
      syncFluidPause();
    };

    rafId = requestAnimationFrame(loadFluid);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .removeEventListener("change", onReducedMotion);
      if (rafId != null) cancelAnimationFrame(rafId);
      document.body.style.background = prevBodyBg;
      if (window.__FLUID_API__?.destroy) window.__FLUID_API__.destroy();
      window.__FLUID_API__ = undefined;
      window.__FLUID_CANVAS__ = undefined;
      const scriptEl = scriptRef.current;
      if (scriptEl?.parentNode) scriptEl.parentNode.removeChild(scriptEl);
      scriptRef.current = null;
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};
