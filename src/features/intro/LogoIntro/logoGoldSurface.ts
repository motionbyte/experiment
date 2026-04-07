import * as THREE from "three";

type BufferGeometryT = InstanceType<typeof THREE.BufferGeometry>;

const TEX_SIZE = 512;

function fract(n: number) {
  return n - Math.floor(n);
}

function hash2(ix: number, iy: number) {
  return fract(Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453);
}

function smoothNoise(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = hash2(x0, y0);
  const b = hash2(x0 + 1, y0);
  const c = hash2(x0, y0 + 1);
  const d = hash2(x0 + 1, y0 + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

function fbm(x: number, y: number) {
  let v = 0;
  let a = 0.5;
  let X = x;
  let Y = y;
  for (let i = 0; i < 5; i++) {
    v += a * smoothNoise(X, Y);
    X *= 2.08;
    Y *= 2.08;
    a *= 0.5;
  }
  return v;
}

function heightAt(u: number, v: number) {
  const streak =
    Math.sin(v * 14.0 + u * 2.4) * 0.22 + Math.sin(v * 6.2 - u * 0.8) * 0.12;
  const macro = fbm(u * 0.35, v * 0.35);
  const grain = fbm(u * 3.1, v * 3.1) * 0.28;
  const micro = fbm(u * 18.0, v * 18.0) * 0.08;
  return streak * 0.55 + macro * 0.28 + grain + micro;
}

function clamp255(n: number) {
  return Math.max(0, Math.min(255, Math.round(n))) | 0;
}

/**
 * Procedural brushed-gold microsurface: roughness breakup + fine normal detail
 * so the metal reads less “flat plastic” and more like cast / worked gold.
 */
export function createBrushedGoldSurfaceTextures() {
  const w = TEX_SIZE;
  const h = TEX_SIZE;
  const height = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = (x / w) * 10;
      const v = (y / h) * 10;
      height[y * w + x] = heightAt(u, v);
    }
  }

  const roughData = new Uint8Array(w * h * 4);
  const normalData = new Uint8Array(w * h * 4);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const xp = (x + 1) % w;
      const xm = (x - 1 + w) % w;
      const yp = (y + 1) % h;
      const ym = (y - 1 + h) % h;
      const hx = height[y * w + xp] - height[y * w + xm];
      const hy = height[yp * w + x] - height[ym * w + x];
      const s = 5.2;
      let nx = -hx * s;
      let ny = -hy * s;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;
      const ni = (y * w + x) * 4;
      const enc = (t: number) => clamp255((t * 0.5 + 0.5) * 255);
      normalData[ni] = enc(nx);
      normalData[ni + 1] = enc(ny);
      normalData[ni + 2] = enc(nz);
      normalData[ni + 3] = 255;

      const H = height[y * w + x];
      const vv = (y / h) * 10;
      const r01 = 0.42 + H * 0.38 + Math.sin(vv * 12.0) * 0.06;
      const g = clamp255(r01 * 255);
      roughData[ni] = g;
      roughData[ni + 1] = g;
      roughData[ni + 2] = g;
      roughData[ni + 3] = 255;
    }
  }

  const roughnessMap = new THREE.DataTexture(roughData, w, h);
  roughnessMap.colorSpace = THREE.NoColorSpace;
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.generateMipmaps = true;
  roughnessMap.minFilter = THREE.LinearMipmapLinearFilter;
  roughnessMap.magFilter = THREE.LinearFilter;
  roughnessMap.needsUpdate = true;

  const normalMap = new THREE.DataTexture(normalData, w, h);
  normalMap.colorSpace = THREE.NoColorSpace;
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.generateMipmaps = true;
  normalMap.minFilter = THREE.LinearMipmapLinearFilter;
  normalMap.magFilter = THREE.LinearFilter;
  normalMap.needsUpdate = true;

  const dispose = () => {
    roughnessMap.dispose();
    normalMap.dispose();
  };

  return { roughnessMap, normalMap, dispose };
}

/** OBJs often ship without UVs or with bad UVs — spherical projection makes maps wrap cleanly. */
export function applySphericalUvIfMissing(geometry: BufferGeometryT): void {
  if (geometry.getAttribute("uv")) return;
  const pos = geometry.getAttribute("position");
  if (!pos) return;

  const box = new THREE.Box3().setFromBufferAttribute(pos);
  const center = new THREE.Vector3();
  box.getCenter(center);

  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i) - center.x;
    const vy = pos.getY(i) - center.y;
    const vz = pos.getZ(i) - center.z;
    const len = Math.hypot(vx, vy, vz) || 1;
    const nx = vx / len;
    const ny = vy / len;
    const nz = vz / len;
    uv[i * 2] = 0.5 + Math.atan2(nx, nz) / (Math.PI * 2);
    uv[i * 2 + 1] = 0.5 - Math.asin(Math.max(-1, Math.min(1, ny))) / Math.PI;
  }

  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}
