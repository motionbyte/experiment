import {
  type PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import styles from "./TheLostVersePage.module.css";

/** 4×4 Bayer matrix — ordered dither. */
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/**
 * motionbyte.in — postprocessing `MagnifyCursorEffect` (Three.js bundle, shader `vz`):
 * UV bulge + smoothstep mask; hook defaults `radius=0.18`, `strength=0.62`, strength lerp `0.14`.
 * (Alag 3D particle “orb” bhi hai site pe — woh alag system hai.)
 */
const MB_RADIUS = 0.18;
const MB_STRENGTH = 0.62;
const MB_STRENGTH_LERP = 0.14;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / Math.max(1e-6, edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Bilinear sample RGBA, u/v in [0,1]. */
function sampleBilinear(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  u: number,
  v: number,
  out: { r: number; g: number; b: number; a: number },
) {
  u = Math.max(0, Math.min(1, u));
  v = Math.max(0, Math.min(1, v));
  const x = u * (w - 1);
  const y = v * (h - 1);
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, w - 1);
  const y1 = Math.min(y0 + 1, h - 1);
  const tx = x - x0;
  const ty = y - y0;
  const i00 = (y0 * w + x0) * 4;
  const i10 = (y0 * w + x1) * 4;
  const i01 = (y1 * w + x0) * 4;
  const i11 = (y1 * w + x1) * 4;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  out.r = lerp(
    lerp(data[i00], data[i10], tx),
    lerp(data[i01], data[i11], tx),
    ty,
  );
  out.g = lerp(
    lerp(data[i00 + 1], data[i10 + 1], tx),
    lerp(data[i01 + 1], data[i11 + 1], tx),
    ty,
  );
  out.b = lerp(
    lerp(data[i00 + 2], data[i10 + 2], tx),
    lerp(data[i01 + 2], data[i11 + 2], tx),
    ty,
  );
  out.a = lerp(
    lerp(data[i00 + 3], data[i10 + 3], tx),
    lerp(data[i01 + 3], data[i11 + 3], tx),
    ty,
  );
}

function applySepiaOrderedDither(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  levels: number,
) {
  const n = 4;
  const m = n * n;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const t = (BAYER_4[y % n][x % n] + 0.5) / m - 0.5;
      lum += t * 0.22;
      lum = Math.max(0, Math.min(1, lum));
      const q = Math.round(lum * (levels - 1)) / (levels - 1);
      const v = q * 255;
      data[i] = Math.min(255, v * 1.06);
      data[i + 1] = Math.min(255, v * 0.84);
      data[i + 2] = Math.min(255, v * 0.62);
    }
  }
}

type Layout = {
  cw: number;
  ch: number;
  dw: number;
  dh: number;
  dpr: number;
};

type Props = { src: string };

export function DitheredBandImage({ src }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCacheRef = useRef<{ src: string; img: HTMLImageElement } | null>(null);
  const ditherLayerRef = useRef<HTMLCanvasElement | null>(null);
  /** Undithered RGBA at layout resolution — sampled for Motion Byte–style magnify. */
  const originalPixelsRef = useRef<Uint8ClampedArray | null>(null);
  const lensStrengthSmoothedRef = useRef(0);
  const layoutRef = useRef<Layout | null>(null);
  const lensRef = useRef<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false });
  const lensAnimRafRef = useRef(0);
  const renderFrameRef = useRef<() => void>(() => {});
  const pumpLensRef = useRef<() => void>(() => {});

  const renderFrame = useCallback(() => {
    const c = canvasRef.current;
    const dither = ditherLayerRef.current;
    const layout = layoutRef.current;
    const cached = imageCacheRef.current;
    if (!c || !dither || !layout || !cached?.img.naturalWidth) return;

    const { cw, ch } = layout;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const img = cached.img;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;

    ctx.drawImage(dither, 0, 0);

    const lens = lensRef.current;
    if (nw < 2 || nh < 2) return;

    const target = lens.on ? 1 : 0;
    lensStrengthSmoothedRef.current +=
      (target - lensStrengthSmoothedRef.current) * MB_STRENGTH_LERP;
    const strengthBlend = lensStrengthSmoothedRef.current;

    const orig = originalPixelsRef.current;
    if (!orig || orig.length !== cw * ch * 4 || strengthBlend < 0.002) {
      return;
    }

    let mx = lens.x;
    let my = lens.y;
    mx = Math.max(0, Math.min(cw - 1, mx));
    my = Math.max(0, Math.min(ch - 1, my));

    const aspect = cw / Math.max(1, ch);
    const cx = (mx + 0.5) / cw;
    const cy = (my + 0.5) / ch;
    const radius = MB_RADIUS;
    /** Same as shader: `m = 1.0 + strength * mask` with strength ∈ [0, MB_STRENGTH]. */
    const strengthUniform = strengthBlend * MB_STRENGTH;

    const R = Math.min(cw, ch) * 0.22;
    const size = Math.ceil(R * 2) + 6;
    const idOut = new ImageData(size, size);
    const d = idOut.data;
    const samp: { r: number; g: number; b: number; a: number } = { r: 0, g: 0, b: 0, a: 0 };

    const ox = mx - size / 2;
    const oy = my - size / 2;

    for (let ty = 0; ty < size; ty++) {
      for (let tx = 0; tx < size; tx++) {
        const u = (ox + tx + 0.5) / cw;
        const v = (oy + ty + 0.5) / ch;
        if (u < 0 || u > 1 || v < 0 || v > 1) continue;

        const dax = (u - cx) * aspect;
        const day = v - cy;
        const dist = Math.hypot(dax, day);
        const mask = 1 - smoothstep(radius * 0.8, radius, dist);
        const alpha = mask * strengthBlend;
        if (alpha < 1 / 255) continue;

        const m = 1 + strengthUniform * mask;
        const magU = cx + (u - cx) / Math.max(m, 1);
        const magV = cy + (v - cy) / Math.max(m, 1);
        let su = u + (magU - u) * mask;
        let sv = v + (magV - v) * mask;
        su = Math.max(0.001, Math.min(0.999, su));
        sv = Math.max(0.001, Math.min(0.999, sv));

        sampleBilinear(orig, cw, ch, su, sv, samp);
        const pi = (ty * size + tx) * 4;
        d[pi] = samp.r;
        d[pi + 1] = samp.g;
        d[pi + 2] = samp.b;
        d[pi + 3] = Math.round(samp.a * alpha);
      }
    }

    const temp = document.createElement("canvas");
    temp.width = size;
    temp.height = size;
    const tctx = temp.getContext("2d");
    if (!tctx) return;
    tctx.putImageData(idOut, 0, 0);

    ctx.save();
    ctx.drawImage(temp, ox, oy);
    ctx.restore();
  }, []);

  const pumpLens = useCallback(() => {
    renderFrame();
    const fade = lensStrengthSmoothedRef.current;
    const keep =
      lensRef.current.on || fade > 0.004;
    if (keep) {
      lensAnimRafRef.current = requestAnimationFrame(() => pumpLensRef.current());
    } else {
      lensAnimRafRef.current = 0;
    }
  }, [renderFrame]);

  useLayoutEffect(() => {
    renderFrameRef.current = renderFrame;
    pumpLensRef.current = pumpLens;
  }, [renderFrame, pumpLens]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(lensAnimRafRef.current);
      lensAnimRafRef.current = 0;
    };
  }, []);

  const buildDitherLayer = useCallback(
    (img: HTMLImageElement, layout: Layout) => {
      const { cw, ch } = layout;
      let d = ditherLayerRef.current;
      if (!d || d.width !== cw || d.height !== ch) {
        d = document.createElement("canvas");
        d.width = cw;
        d.height = ch;
        ditherLayerRef.current = d;
      }
      const dctx = d.getContext("2d", { willReadFrequently: true });
      if (!dctx) return;
      const o = document.createElement("canvas");
      o.width = cw;
      o.height = ch;
      const octx = o.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, cw, ch);
      originalPixelsRef.current = new Uint8ClampedArray(
        octx.getImageData(0, 0, cw, ch).data,
      );

      dctx.drawImage(img, 0, 0, cw, ch);
      const imageData = dctx.getImageData(0, 0, cw, ch);
      applySepiaOrderedDither(imageData.data, cw, ch, 7);
      dctx.putImageData(imageData, 0, 0);
    },
    [],
  );

  const paint = useCallback(
    (img: HTMLImageElement) => {
      const r = rootRef.current;
      const c = canvasRef.current;
      if (!r || !c || !img.naturalWidth) return;
      const mw = r.clientWidth;
      const mh = Math.min(window.innerHeight * 0.58, 520);
      if (mw < 8) return;

      let dw = mw;
      let dh = (img.naturalHeight / img.naturalWidth) * dw;
      if (dh > mh) {
        dh = mh;
        dw = (img.naturalWidth / img.naturalHeight) * dh;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.max(1, Math.floor(dw * dpr));
      const ch = Math.max(1, Math.floor(dh * dpr));

      layoutRef.current = { cw, ch, dw, dh, dpr };
      c.width = cw;
      c.height = ch;
      buildDitherLayer(img, layoutRef.current);
      c.style.width = `${dw}px`;
      c.style.height = `${dh}px`;
      renderFrame();
      const fading = lensStrengthSmoothedRef.current > 0.02;
      if (
        lensAnimRafRef.current === 0 &&
        (lensRef.current.on || fading)
      ) {
        lensAnimRafRef.current = requestAnimationFrame(() => pumpLensRef.current());
      }
    },
    [buildDitherLayer, renderFrame],
  );

  const draw = useCallback(() => {
    const root = rootRef.current;
    if (!root || root.clientWidth < 8) return;

    const cached = imageCacheRef.current;
    if (cached?.src === src && cached.img.complete && cached.img.naturalWidth > 0) {
      paint(cached.img);
      return;
    }

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      imageCacheRef.current = { src, img };
      paint(img);
    };
    img.onerror = () => {};
    img.src = src;
  }, [src, paint]);

  useEffect(() => {
    draw();
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(root);
    return () => ro.disconnect();
  }, [draw]);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      const c = canvasRef.current;
      const layout = layoutRef.current;
      if (!c || !layout) return;
      const rect = c.getBoundingClientRect();
      const sx = (e.clientX - rect.left) * (layout.cw / rect.width);
      const sy = (e.clientY - rect.top) * (layout.ch / rect.height);
      lensRef.current = { x: sx, y: sy, on: true };
      if (lensAnimRafRef.current === 0) {
        lensAnimRafRef.current = requestAnimationFrame(() => pumpLensRef.current());
      }
    },
    [],
  );

  const onPointerLeave = useCallback(() => {
    lensRef.current = { ...lensRef.current, on: false };
    if (lensAnimRafRef.current === 0 && lensStrengthSmoothedRef.current > 0.01) {
      lensAnimRafRef.current = requestAnimationFrame(() => pumpLensRef.current());
    }
  }, []);

  return (
    <div ref={rootRef} className={styles.bandImageInner}>
      <canvas
        ref={canvasRef}
        className={styles.bandImageCanvas}
        aria-hidden
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      />
    </div>
  );
}
