import React, { useRef, useState, useCallback, useEffect } from "react";
import { carouselImages } from "../carouselData";
import styles from "./ImageCarouselSection.module.css";

const RADIUS = 720;
const SLIDE_WIDTH = 160;
const SLIDE_HEIGHT = 224;
const AUTO_ROTATE_SPEED = 0.08;
const DRAG_FACTOR = 0.4;
const IDLE_DELAY_MS = 1200;
const DRAG_THRESHOLD_PX = 8;

function getClientX(e: React.PointerEvent | React.TouchEvent): number {
  if ("touches" in e && e.touches.length > 0) return e.touches[0].clientX;
  if ("clientX" in e) return (e as React.PointerEvent).clientX;
  return 0;
}

export const ImageCarouselSection: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [openedImage, setOpenedImage] = useState<string | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const slideIndexAtStart = useRef<number | null>(null);
  const didDrag = useRef(false);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef(0);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = carouselImages.length;
  const stepDeg = 360 / count;

  const handleStart = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      const clientX = getClientX(e);
      if ("pointerId" in e && e.target instanceof HTMLElement) {
        (e.target as HTMLElement).setPointerCapture((e as React.PointerEvent).pointerId);
      }
      startX.current = clientX;
      startRotation.current = rotation;
      didDrag.current = false;
      const target = e.target as HTMLElement;
      const slideEl = target.closest("[data-slide-index]");
      slideIndexAtStart.current = slideEl
        ? parseInt(slideEl.getAttribute("data-slide-index") ?? "-1", 10)
        : null;
      if (slideIndexAtStart.current === -1) slideIndexAtStart.current = null;
      setAutoRotate(false);
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
        idleTimeout.current = null;
      }
    },
    [rotation]
  );

  const handleMove = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      const clientX = getClientX(e);
      const delta = clientX - startX.current;
      if (!didDrag.current && Math.abs(delta) > DRAG_THRESHOLD_PX) {
        didDrag.current = true;
        slideIndexAtStart.current = null;
        setIsDragging(true);
      }
      if (didDrag.current) {
        setRotation(startRotation.current + delta * DRAG_FACTOR);
      }
      if (didDrag.current && "preventDefault" in e) (e as React.TouchEvent).preventDefault();
    },
    []
  );

  const handleEnd = useCallback(() => {
    if (!didDrag.current && slideIndexAtStart.current != null && slideIndexAtStart.current >= 0) {
      setOpenedImage(carouselImages[slideIndexAtStart.current] ?? null);
    }
    slideIndexAtStart.current = null;
    setIsDragging(false);
    idleTimeout.current = setTimeout(() => {
      setAutoRotate(true);
      idleTimeout.current = null;
    }, IDLE_DELAY_MS);
  }, []);

  useEffect(() => {
    let started = false;
    const tick = (time: number) => {
      if (!started) {
        lastTime.current = time;
        started = true;
      }
      const dt = (time - lastTime.current) / 1000;
      lastTime.current = time;
      if (!isDragging && autoRotate && dt > 0) {
        setRotation((r) => r + AUTO_ROTATE_SPEED * dt * 60);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [isDragging, autoRotate]);

  useEffect(() => {
    return () => {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      if (didDrag.current) e.preventDefault();
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  return (
    <section id="photos" className={styles.section} aria-label="Image Carousel">
      <div
        ref={sceneRef}
        className={styles.scene}
        onPointerDown={handleStart}
        onPointerMove={handleMove}
        onPointerUp={handleEnd}
        onPointerLeave={handleEnd}
        onPointerCancel={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      >
        <div
          className={styles.ring}
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {carouselImages.map((src, i) => {
            const angle = i * stepDeg;
            return (
              <div
                key={i}
                className={styles.slide}
                data-slide-index={i}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  ["--slide-w" as string]: `${SLIDE_WIDTH}px`,
                  ["--slide-h" as string]: `${SLIDE_HEIGHT}px`,
                }}
              >
                <div className={styles.slideInner}>
                  <img
                    src={encodeURI(src)}
                    alt={`Slide ${i + 1}`}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className={styles.hint}>Drag or touch to rotate · Click or tap image to open</p>
      {openedImage != null && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setOpenedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image full size"
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setOpenedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={encodeURI(openedImage)}
              alt="Full size"
              className={styles.lightboxImg}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      )}
    </section>
  );
};
