import { useEffect } from "react";

/**
 * Deters casual context menu + common DevTools / view-source shortcuts.
 * Does NOT secure assets: media still loads over the network; power users can bypass.
 * Keep isolated here so product code stays unchanged.
 */
export function ClientSurfaceGuards() {
  useEffect(() => {
    const onContextMenu = (e: Event) => {
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      const k = e.key.toUpperCase();
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(k)) {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        return;
      }
      if (e.metaKey && e.altKey && ["i", "j", "c"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu, true);
    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
