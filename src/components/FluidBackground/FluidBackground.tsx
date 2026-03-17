import React, { useEffect, useRef } from "react";
import styles from "./FluidBackground.module.css";

const FLUID_SCRIPT_URL = "/fluid/script.js";

declare global {
  interface Window {
    __FLUID_CANVAS__?: HTMLCanvasElement | null;
    __FLUID_API__?: {
      destroy: () => void;
      config: Record<string, unknown>;
      addSplat: (n?: number) => void;
    };
  }
}

/**
 * Full-viewport fixed WebGL fluid simulation background.
 * Uses PavelDoGreat/WebGL-Fluid-Simulation with no GUI.
 */
export const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    window.__FLUID_CANVAS__ = canvas;

    const prevBodyBg = document.body.style.background;
    document.body.style.background = "transparent";

    const loadFluid = () => {
      const scriptEl = document.createElement("script");
      scriptEl.src = FLUID_SCRIPT_URL;
      scriptEl.async = false;
      scriptRef.current = scriptEl;

      scriptEl.onerror = () => {
        console.warn("[FluidBackground] Failed to load fluid script.");
        window.__FLUID_CANVAS__ = undefined;
      };

      document.body.appendChild(scriptEl);
    };

    const rafId = requestAnimationFrame(loadFluid);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.background = prevBodyBg;
      if (window.__FLUID_API__?.destroy) {
        window.__FLUID_API__.destroy();
      }
      window.__FLUID_API__ = undefined;
      window.__FLUID_CANVAS__ = undefined;
      const scriptEl = scriptRef.current;
      if (scriptEl?.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
      scriptRef.current = null;
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

