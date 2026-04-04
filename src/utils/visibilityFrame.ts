/**
 * Start/stop a requestAnimationFrame loop based on tab visibility, optional IntersectionObserver,
 * and prefers-reduced-motion. Saves GPU when idle; no visual change when animating.
 */
export function runFrameLoop(
  frame: (now: number) => void,
  options: {
    root?: Element | null;
    intersectTarget?: Element | null;
    intersectionThreshold?: number;
  } = {}
): () => void {
  let raf = 0;
  let inView = true;
  const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");

  const shouldRun = () =>
    document.visibilityState === "visible" &&
    !motionMql.matches &&
    (!options.intersectTarget || inView);

  const tick = (now: number) => {
    raf = 0;
    if (!shouldRun()) return;
    frame(now);
    schedule();
  };

  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(tick);
  };

  const onVisibility = () => {
    if (shouldRun()) schedule();
    else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const onMotionPreference = () => {
    if (shouldRun()) schedule();
    else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  document.addEventListener("visibilitychange", onVisibility, { passive: true });
  motionMql.addEventListener("change", onMotionPreference);

  let io: IntersectionObserver | null = null;
  if (options.intersectTarget) {
    io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (shouldRun()) schedule();
        else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { root: options.root ?? null, threshold: options.intersectionThreshold ?? 0 }
    );
    io.observe(options.intersectTarget);
  }

  schedule();

  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    motionMql.removeEventListener("change", onMotionPreference);
    if (io && options.intersectTarget) io.unobserve(options.intersectTarget);
    io?.disconnect();
    cancelAnimationFrame(raf);
    raf = 0;
  };
}
