import { useEffect, useRef } from "react";
import * as THREE from "three";

/** File order: back → mid → front (must match PLANE_Z). Paths under `public/the-lost-verse/`. */
const LAYER_FILES = ["TLV.png", "frame 2.png", "FrameBG.png"] as const;
const TEXTURES = LAYER_FILES.map((f) => `/the-lost-verse/${encodeURIComponent(f)}`);

/**
 * All layers share one Z — coplanar 2D stack. Order is only `renderOrder` (painter’s algorithm).
 * Different Z per layer + depth was causing scroll overlap / z-fight with transparent PNGs.
 */
const STACK_Z = -2.2;

/**
 * Starting size (vs full contain) when zoomed out — nested composition.
 * Order: TLV, frame 2, FrameBG. Scroll animates toward full / zoom-past.
 */
const LAYER_START_MUL = [0.35, 0.66, 1.0] as const;

/** TLV max vs frame-2 base (ratio curve end) — keep low; flourishes touch easily. */
const TLV_MAX_SCALE = 0.72;

/** Start ratio TLV vs frame 2 (matches LAYER_START_MUL). */
const TLV_TO_MID0 = LAYER_START_MUL[0] / LAYER_START_MUL[1];

/** Extra shrink on TLV only — padding inside arch vs frame 2 line art. */
const TLV_FRAME_INSET = 0.82;

/** Peak “zoom past” — FrameBG + frame 2 + TLV same exit curve. */
const FRAME_EXIT_SCALE = 2.55;

/** frame 2 jaisa: base scale settle, phir exit zoom + fade (same `p` bands). */
const MID_BASE_P0 = 0.08;
const MID_BASE_P1 = 0.58;
const MID_EXIT_P0 = 0.66;
const MID_EXIT_P1 = 0.88;

/**
 * Title: fade in → hold → fade out — lambe `p` bands taaki title jaldi na chale.
 * `taglineOpacity` = in × (1 − out).
 */
const TAGLINE_P0 = 0.885;
const TAGLINE_P1 = 0.912;
/** Full opacity ke beech — scroll range jahan title stable dikhe. */
const TAGLINE_OUT_P0 = 0.942;
const TAGLINE_OUT_P1 = 0.975;

/** Body — `pHtml` par (smooth); camera se thoda late. */
const DESCRIPTION_P0 = 0.978;
const DESCRIPTION_P1 = 0.997;
/**
 * Chapter 2 tabhi jab story clearly dikhe — purana gate (~0.997) bahut scroll maangta tha + wheel “dead” lagta tha.
 */
const CHAPTER2_REQUIRES_UI_P = 0.989;
/** Max zoom par story phase complete karne ke liye wheel — `uiP` ko turant aage badhao (responsive). */
const WHEEL_UI_P_NUDGE_MUL = 0.55;

const CAM_Z_MIN = 0.22;
const CAM_Z_MAX = 12.5;

/**
 * `p = (CAM_Z_MAX - camZ) / range`. FrameBG scale = lerp(1, FRAME_EXIT, sm(p,0,0.38)) — bina `p=0` ke thodi hi upscale ho jati hai.
 * Isliye start **exact** `p = 0` → `camZ = CAM_Z_MAX` — FrameBG “contain” 1.0, peeche scroll ki zaroorat nahi.
 */
const INITIAL_CAM_Z = CAM_Z_MAX;

/** Dheere zoom — wheel sensitivity (camera). */
const ZOOM_WHEEL_SCALE = 0.55;
/** Camera follow — chhota = smoother / slower. */
const LERP = 0.1;
const PARALLAX_LERP = 0.08;

/**
 * HTML title/body ke liye zoom progress — camera `p` se slow follow.
 * Fast scroll par bhi title/story phases skip kam (dolly turant, copy dheere).
 */
const UI_P_LERP = 0.038;
/** End zoom — title/story HTML phases jaldi settle (kam “dead” scroll). */
const UI_P_LERP_NEAR_END = 0.095;
const UI_P_LERP_MID = 0.062;

/**
 * Max zoom ke baad scroll — chapter 2: story gayab → blank → stars up → "Characters".
 * Wheel `delta` camera jaisa hi scale (~0.02–0.2 / event) — multiplier zyada rakho warna progress dikhe hi nahi.
 */
const POST_SCROLL_WHEEL_MUL = 0.5;
const POST_SCROLL_TOUCH_MUL = 5.2;
/** Wheel → `targetPostProgress`; yeh display ko chase karta — jerk kam, speed same. */
const POST_PROGRESS_LERP = 0.26;
const STORY_FADE_P1 = 0.2;
const ART_HIDE_P0 = 0.1;
const ART_HIDE_P1 = 0.38;
const STAR_RISE_P0 = 0.26;
const STAR_RISE_P1 = 0.76;
/** Pehli layer — tez upward (original feel). */
const STAR_RISE_MAX_Y = 48;
/** Dusri layer — chhoti shift taaki center bhar jaaye, mix lage. */
const STAR_MIX_RISE_MUL = 0.38;
const CAM_LOOK_DOWN_P0 = 0.16;
const CAM_LOOK_DOWN_P1 = 0.44;
const CAM_LOOK_DOWN_MAX = 3.2;
const CHARACTERS_P0 = 0.48;
const CHARACTERS_P1 = 0.92;
const RESET_POST_BELOW_P = 0.62;

/** Fixed background — uneven sizes, twinkle; artwork parallax se alag. */
const STAR_COUNT_MAIN = 4200;
/** Doosri layer — wide spread, thodi chhoti points; Characters ke peeche fill + mix. */
const STAR_COUNT_MIX = 3400;
const STAR_Z_MIN = -28;
const STAR_Z_MAX = -92;

function buildStarShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uStarZoom: { value: 1 },
    },
    vertexShader: `
      uniform float uStarZoom;
      attribute float aSize;
      attribute float aPhase;
      attribute vec3 aColor;
      varying float vPhase;
      varying float vSize;
      varying vec3 vColor;
      void main() {
        vPhase = aPhase;
        vSize = aSize;
        vColor = aColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float dist = max(-mvPosition.z, 1.0);
        gl_PointSize = aSize * (220.0 / dist) * uStarZoom;
        gl_PointSize = min(gl_PointSize, 180.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying float vPhase;
      varying float vSize;
      varying vec3 vColor;
      void main() {
        vec2 c = gl_PointCoord - vec2(0.5);
        float r = length(c);
        if (r > 0.5) discard;
        float core = 1.0 - smoothstep(0.12, 0.48, r);
        float rim = 1.0 - smoothstep(0.35, 0.5, r);
        float tw = 0.28 + 0.72 * sin(uTime * (0.85 + vSize * 0.15) + vPhase);
        tw *= 0.55 + 0.45 * sin(uTime * 2.1 + vPhase * 3.7);
        tw = clamp(0.15 + tw * 0.95, 0.12, 1.0);
        float a = core * tw * 0.88 + rim * 0.15 * tw;
        gl_FragColor = vec4(vColor, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
}

function createStarfieldMain() {
  const positions = new Float32Array(STAR_COUNT_MAIN * 3);
  const sizes = new Float32Array(STAR_COUNT_MAIN);
  const phases = new Float32Array(STAR_COUNT_MAIN);
  const colorVar = new Float32Array(STAR_COUNT_MAIN * 3);

  for (let i = 0; i < STAR_COUNT_MAIN; i++) {
    const u = Math.random();
    const v = Math.random();
    const spread = 0.45 + Math.random() * 0.9;
    const x = (u - 0.5) * 52 * spread;
    const y = (v - 0.5) * 48 * (0.35 + Math.random() * 0.95);
    const z = STAR_Z_MIN + Math.random() * (STAR_Z_MAX - STAR_Z_MIN);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    const r = Math.random();
    sizes[i] = 0.35 + r * r * 4.2 + (Math.random() > 0.92 ? 2.4 : 0);
    phases[i] = Math.random() * Math.PI * 2;
    const w = 0.82 + Math.random() * 0.18;
    colorVar[i * 3] = 0.92 * w;
    colorVar[i * 3 + 1] = 0.9 * w;
    colorVar[i * 3 + 2] = 0.78 + Math.random() * 0.12;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colorVar, 3));

  const material = buildStarShaderMaterial();
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = -80;
  return { points, material };
}

/** Thoda peeche + zyada wide Y — fast layer ke saath overlap se natural mix. */
function createStarfieldMix() {
  const positions = new Float32Array(STAR_COUNT_MIX * 3);
  const sizes = new Float32Array(STAR_COUNT_MIX);
  const phases = new Float32Array(STAR_COUNT_MIX);
  const colorVar = new Float32Array(STAR_COUNT_MIX * 3);
  const zMixMin = STAR_Z_MIN - 6;
  const zMixMax = STAR_Z_MAX - 4;

  for (let i = 0; i < STAR_COUNT_MIX; i++) {
    const u = Math.random();
    const v = Math.random();
    const spread = 0.5 + Math.random() * 1.1;
    const x = (u - 0.5) * 68 * spread + (Math.random() - 0.5) * 22;
    const yWide = (v - 0.5) * 125 * (0.5 + Math.random() * 0.85);
    const yJitter = (Math.random() - 0.5) * 55;
    const y = yWide * 0.65 + yJitter;
    const z = zMixMin + Math.random() * (zMixMax - zMixMin);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    const r = Math.random();
    sizes[i] = 0.22 + r * r * 3.4 + (Math.random() > 0.93 ? 1.8 : 0);
    phases[i] = Math.random() * Math.PI * 2;
    const w = 0.78 + Math.random() * 0.2;
    colorVar[i * 3] = 0.88 * w;
    colorVar[i * 3 + 1] = 0.86 * w;
    colorVar[i * 3 + 2] = 0.74 + Math.random() * 0.14;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colorVar, 3));

  const material = buildStarShaderMaterial();
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = -81;
  return { points, material };
}

function wheelDelta(e: WheelEvent): number {
  if (e.deltaMode === WheelEvent.DOM_DELTA_PIXEL) return e.deltaY * 0.003;
  if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) return e.deltaY * 0.085;
  return e.deltaY * 2.2;
}

export type LostVerseZoomPayload = {
  p: number;
  /** Title fade in × (1 − fade out); phir 0 jab paragraph aaye. */
  taglineOpacity: number;
  /** Long copy — title ke poora gayab hone ke baad. */
  descriptionOpacity: number;
  /** Max zoom ke baad chapter — "Characters" title. */
  charactersOpacity: number;
  /** 0–1 second leg (story → stars rush → characters). */
  postProgress: number;
};

type Props = {
  className?: string;
  onZoomProgress?: (state: LostVerseZoomPayload) => void;
};

export function TheLostVerseCanvas({ className, onZoomProgress }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const container = mount;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const { points: starPoints, material: starMaterial } = createStarfieldMain();
    const { points: starMixPoints, material: starMixMaterial } = createStarfieldMix();
    scene.add(starMixPoints);
    scene.add(starPoints);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.08, 120);
    /** Har mount / refresh / bfcache restore: yahi “hero” zoom — intro dolly nahi. */
    let camZ = INITIAL_CAM_Z;
    let targetCamZ = INITIAL_CAM_Z;
    camera.position.set(0, 0, camZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    /** Correct alpha blending for stacked PNGs. */
    renderer.setClearColor(0x000000, 1);
    /** Don’t re-sort meshes — stable back→front draw via `renderOrder` only. */
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);

    const sharedGeometry = new THREE.PlaneGeometry(1, 1);
    const planes: InstanceType<typeof THREE.Mesh>[] = [];
    /** Pixel size of each PNG — used to preserve aspect (no stretch to viewport). */
    const texDims: { w: number; h: number }[] = TEXTURES.map(() => ({ w: 1, h: 1 }));
    const loader = new THREE.TextureLoader();
    const materials: InstanceType<typeof THREE.MeshBasicMaterial>[] = [];

    /** All layers move together — avoids per-layer parallax misalign (“overlap”) while zooming. */
    const layerGroup = new THREE.Group();
    scene.add(layerGroup);

    TEXTURES.forEach((url, i) => {
      const tex = loader.load(url, (t: InstanceType<typeof THREE.Texture>) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        t.magFilter = THREE.LinearFilter;
        const img = t.image as { width?: number; height?: number } | undefined;
        const w = img?.width ?? 1;
        const h = img?.height ?? 1;
        texDims[i] = { w: Math.max(1, w), h: Math.max(1, h) };
        fitPlanes();
      });
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
      materials.push(mat);
      const mesh = new THREE.Mesh(sharedGeometry, mat);
      mesh.position.z = STACK_Z;
      /** TLV 0 → frame2 1 → FrameBG 2 (painter: back → front on same plane). */
      mesh.renderOrder = i;
      planes.push(mesh);
      layerGroup.add(mesh);
    });
    let px = 0;
    let py = 0;
    let targetPx = 0;
    let targetPy = 0;
    /** Title phase mein body scroll lock — story text aane ke baad hi native scroll. */
    let allowNativePageScroll = false;
    /** Camera `p` ka smoothed echo — sirf HTML opacities + `allowNativePageScroll`. */
    let uiP = 0;
    /** Max zoom ke baad wheel — story → stars → Characters (smoothed). */
    let postProgress = 0;
    let targetPostProgress = 0;

    /** Viewport = canvas container — pointer kahin bhi ho (overlay/link par bhi). */
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetPx = nx * 0.38;
      targetPy = -ny * 0.38;
    };

    function fitPlanes() {
      const vFov = (camera.fov * Math.PI) / 180;
      const viewAspect = camera.aspect;
      const camZNow = camera.position.z;
      /** 0 = zoomed out (see all), 1 = max zoom in. */
      const p = THREE.MathUtils.clamp(
        (CAM_Z_MAX - camZNow) / (CAM_Z_MAX - CAM_Z_MIN),
        0,
        1,
      );
      if (p < RESET_POST_BELOW_P) {
        postProgress = 0;
        targetPostProgress = 0;
      }
      const uiLerp =
        p >= 0.982 ? UI_P_LERP_NEAR_END : p >= 0.9 ? UI_P_LERP_MID : UI_P_LERP;
      uiP += (p - uiP) * uiLerp;
      uiP = THREE.MathUtils.clamp(uiP, 0, 1);
      const pHtml = uiP;
      const sm = THREE.MathUtils.smoothstep;

      const storyToBlack = sm(postProgress, 0, STORY_FADE_P1);
      const artHide = sm(postProgress, ART_HIDE_P0, ART_HIDE_P1);

      /** frame 2 base — TLV ratio isi band mein settle (frame 2 jaisa timing). */
      const mulMidBase = THREE.MathUtils.lerp(
        LAYER_START_MUL[1],
        1,
        sm(p, MID_BASE_P0, MID_BASE_P1),
      );
      const midExitZoom = THREE.MathUtils.lerp(1, FRAME_EXIT_SCALE, sm(p, MID_EXIT_P0, MID_EXIT_P1));
      const mulMid = mulMidBase * midExitZoom;
      /** TLV = frame 2 jaisa: same `mulMidBase` × inset ratio × `midExitZoom` (scroll + zoom past + fade line up). */
      const tlvRatio = THREE.MathUtils.lerp(
        TLV_TO_MID0,
        TLV_MAX_SCALE,
        sm(p, MID_BASE_P0, MID_BASE_P1),
      );
      const mulTlv = mulMidBase * tlvRatio * TLV_FRAME_INSET * midExitZoom;
      /** FrameBG: zoom past + fade (pehle band). */
      const mulBg = THREE.MathUtils.lerp(LAYER_START_MUL[2], FRAME_EXIT_SCALE, sm(p, 0, 0.38));

      const muls: readonly [number, number, number] = [mulTlv, mulMid, mulBg];

      /** FrameBG → frame 2 + TLV; chapter 2 mein art fade. */
      materials[2].opacity = (1 - sm(p, 0.24, 0.46)) * (1 - artHide);
      const midLayerFade = (1 - sm(p, MID_EXIT_P0, MID_EXIT_P1)) * (1 - artHide);
      materials[1].opacity = midLayerFade;
      materials[0].opacity = midLayerFade;

      let taglineOpacity =
        sm(pHtml, TAGLINE_P0, TAGLINE_P1) * (1 - sm(pHtml, TAGLINE_OUT_P0, TAGLINE_OUT_P1));
      let descriptionOpacity = sm(pHtml, DESCRIPTION_P0, DESCRIPTION_P1);
      taglineOpacity *= 1 - storyToBlack;
      descriptionOpacity *= 1 - storyToBlack;

      const charactersOpacity = sm(postProgress, CHARACTERS_P0, CHARACTERS_P1);

      allowNativePageScroll =
        postProgress < 0.04 &&
        taglineOpacity < 0.06 &&
        descriptionOpacity > 0.04;

      materials.forEach((m, i) => {
        planes[i]!.visible = m.opacity > 0.004;
      });

      const dist = camera.position.z - STACK_Z;
      planes.forEach((plane, i) => {
        const visibleH = 2 * Math.tan(vFov / 2) * dist;
        const visibleW = visibleH * viewAspect;
        const { w: tw, h: th } = texDims[i]!;
        const texAspect = tw / th;
        let planeW: number;
        let planeH: number;
        if (texAspect > viewAspect) {
          planeW = visibleW;
          planeH = planeW / texAspect;
        } else {
          planeH = visibleH;
          planeW = planeH * texAspect;
        }
        const mul = muls[i]!;
        plane.scale.set(planeW * mul, planeH * mul, 1);
      });

      onZoomProgress?.({
        p,
        taglineOpacity,
        descriptionOpacity,
        charactersOpacity,
        postProgress,
      });
    }

    function setSize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      fitPlanes();
    }

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    /** `window` + capture — overlay / link / khali jagah; pointer canvas ke bahar bhi parallax + zoom. */
    const wheelOpts: AddEventListenerOptions = { passive: false, capture: true };
    const touchMoveOpts: AddEventListenerOptions = { passive: false, capture: true };
    const touchStartOpts: AddEventListenerOptions = { passive: true, capture: true };

    window.addEventListener("pointermove", onPointerMove);

    /** Lerp lag ya float — dono se check; warna chapter 2 kabhi gate nahi hota. */
    const isAtMaxZoom = () => {
      const z = Math.min(camZ, targetCamZ);
      return z <= CAM_Z_MIN + 0.055;
    };

    const onWheel = (e: WheelEvent) => {
      const delta = wheelDelta(e) * ZOOM_WHEEL_SCALE;
      /** `delta < 0` → `targetCamZ` badhe = camera peeche = zoom bahar. Story phase mein sirf andar page-scroll chhodna. */
      const zoomOut = delta < 0;
      const atMax = isAtMaxZoom();
      /**
       * Max zoom ke baad chapter 2 — yahan native scroll chhodna mat: page par aksar overflow nahi,
       * wheel kha jaata hai aur `postProgress` kabhi badhta nahi.
       */
      if (allowNativePageScroll && !zoomOut && !atMax) {
        return;
      }
      e.preventDefault();
      if (atMax && delta > 0) {
        if (uiP < CHAPTER2_REQUIRES_UI_P) {
          uiP = Math.min(1, uiP + Math.abs(delta) * WHEEL_UI_P_NUDGE_MUL);
        }
        if (uiP >= CHAPTER2_REQUIRES_UI_P) {
          targetPostProgress = Math.min(1, targetPostProgress + Math.abs(delta) * POST_SCROLL_WHEEL_MUL);
        }
        return;
      }
      if (atMax && zoomOut && targetPostProgress > 0) {
        targetPostProgress = Math.max(0, targetPostProgress - Math.abs(delta) * POST_SCROLL_WHEEL_MUL * 1.15);
        return;
      }
      targetCamZ -= delta;
      targetCamZ = Math.min(CAM_Z_MAX, Math.max(CAM_Z_MIN, targetCamZ));
    };

    let lastTouchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const dy = y - lastTouchY;
      lastTouchY = y;
      const dTouch = dy * 0.045 * ZOOM_WHEEL_SCALE;
      /** `dTouch > 0` finger neeche = zoom bahar (same as wheel). */
      const zoomOut = dTouch > 0;
      const atMax = isAtMaxZoom();
      if (allowNativePageScroll && !zoomOut && !atMax) {
        return;
      }
      e.preventDefault();
      if (atMax && dTouch < 0) {
        if (uiP < CHAPTER2_REQUIRES_UI_P) {
          uiP = Math.min(1, uiP + Math.abs(dTouch) * WHEEL_UI_P_NUDGE_MUL * 9);
        }
        if (uiP >= CHAPTER2_REQUIRES_UI_P) {
          targetPostProgress = Math.min(1, targetPostProgress + Math.abs(dTouch) * POST_SCROLL_TOUCH_MUL);
        }
        return;
      }
      if (atMax && zoomOut && targetPostProgress > 0) {
        targetPostProgress = Math.max(0, targetPostProgress - Math.abs(dTouch) * POST_SCROLL_TOUCH_MUL * 1.1);
        return;
      }
      targetCamZ += dTouch;
      targetCamZ = Math.min(CAM_Z_MAX, Math.max(CAM_Z_MIN, targetCamZ));
    };

    window.addEventListener("wheel", onWheel, wheelOpts);
    window.addEventListener("touchstart", onTouchStart, touchStartOpts);
    window.addEventListener("touchmove", onTouchMove, touchMoveOpts);

    const resetToHeroView = () => {
      camZ = INITIAL_CAM_Z;
      targetCamZ = INITIAL_CAM_Z;
      uiP = 0;
      postProgress = 0;
      targetPostProgress = 0;
      px = 0;
      py = 0;
      targetPx = 0;
      targetPy = 0;
      layerGroup.position.set(0, 0, 0);
      starPoints.position.set(0, 0, 0);
      starPoints.scale.setScalar(1);
      starMaterial.uniforms.uStarZoom.value = 1;
      starMixPoints.position.set(0, 0, 0);
      starMixPoints.scale.setScalar(1);
      starMixMaterial.uniforms.uStarZoom.value = 1;
      camera.position.y = 0;
    };

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) resetToHeroView();
    };
    window.addEventListener("pageshow", onPageShow);

    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);

      camZ += (targetCamZ - camZ) * LERP;
      camera.position.z = camZ;

      postProgress += (targetPostProgress - postProgress) * POST_PROGRESS_LERP;
      if (Math.abs(targetPostProgress - postProgress) < 0.0004) {
        postProgress = targetPostProgress;
      }

      const smPost = THREE.MathUtils.smoothstep;
      const rawRise = smPost(postProgress, STAR_RISE_P0, STAR_RISE_P1) * STAR_RISE_MAX_Y;
      starPoints.position.y = rawRise;
      starMixPoints.position.y = rawRise * STAR_MIX_RISE_MUL;
      const lookDown = smPost(postProgress, CAM_LOOK_DOWN_P0, CAM_LOOK_DOWN_P1) * CAM_LOOK_DOWN_MAX;
      camera.position.y = -lookDown;
      /** Scroll ke saath lagatar zoom — main tez, mix thoda kam (depth mix). */
      const scrollZoom = 1 + postProgress * 1.05;
      const scrollZoomMix = 1 + postProgress * 0.82;
      starMaterial.uniforms.uStarZoom.value = scrollZoom;
      starMixMaterial.uniforms.uStarZoom.value = scrollZoomMix;
      starPoints.scale.setScalar(1 + postProgress * 0.12);
      starMixPoints.scale.setScalar(1 + postProgress * 0.08);

      px += (targetPx - px) * PARALLAX_LERP;
      py += (targetPy - py) * PARALLAX_LERP;
      layerGroup.position.x = px;
      layerGroup.position.y = py;

      fitPlanes();
      const t = performance.now() * 0.001;
      starMaterial.uniforms.uTime.value = t;
      starMixMaterial.uniforms.uTime.value = t * 0.92;
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("wheel", onWheel, wheelOpts);
      window.removeEventListener("touchstart", onTouchStart, touchStartOpts);
      window.removeEventListener("touchmove", onTouchMove, touchMoveOpts);
      ro.disconnect();
      scene.remove(starPoints);
      starPoints.geometry.dispose();
      starMaterial.dispose();
      scene.remove(starMixPoints);
      starMixPoints.geometry.dispose();
      starMixMaterial.dispose();
      scene.remove(layerGroup);
      sharedGeometry.dispose();
      materials.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onZoomProgress]);

  return <div ref={mountRef} className={className} />;
}
