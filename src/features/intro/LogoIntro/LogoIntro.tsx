import React from "react";
import * as THREE from "three";
import { runFrameLoop } from "../../../utils/visibilityFrame";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import styles from "./LogoIntro.module.css";
import {
  applySphericalUvIfMissing,
  createBrushedGoldSurfaceTextures,
} from "./logoGoldSurface";

type Status =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "missingAsset" }
  | { kind: "error"; message: string };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const LogoIntro: React.FC = () => {
  const mountRef = React.useRef<HTMLDivElement | null>(null);
  const stageRef = React.useRef<HTMLElement | null>(null);
  const [status, setStatus] = React.useState<Status>({ kind: "loading" });

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setStatus({ kind: "loading" });

    THREE.ColorManagement.enabled = true;

    let renderer: any = null;
    let envMap: { dispose: () => void } | null = null;
    let disposeGoldSurface: (() => void) | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      /* Punchy highlights + deep valleys (reference: satin gold on black) */
      renderer.toneMappingExposure = 0.96;
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "WebGL renderer init failed";
      setStatus({ kind: "error", message: msg });
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 4000);
    camera.position.set(0, 0, 240);
    camera.lookAt(0, 0, 0);

    /* Room IBL so MeshPhysical metalness actually reads as polished gold (reflections). */
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    /* Lower sigma = sharper IBL reflections (reads more “jewelry / studio”) */
    envMap = pmrem.fromScene(roomEnv, 0.01).texture;
    scene.environment = envMap;
    pmrem.dispose();

    const goldSurface = createBrushedGoldSurfaceTextures();
    disposeGoldSurface = goldSurface.dispose;
    const maxAniso = renderer.capabilities.getMaxAnisotropy?.() ?? 1;
    goldSurface.roughnessMap.anisotropy = maxAniso;
    goldSurface.normalMap.anisotropy = maxAniso;
    const mapRepeat = 4;
    goldSurface.roughnessMap.repeat.set(mapRepeat, mapRepeat);
    goldSurface.normalMap.repeat.set(mapRepeat, mapRepeat);

    // Strong key from top-left, low ambient = deep grooves + sharp speculars (like reference)
    const ambient = new THREE.AmbientLight(0xd4c4a8, 0.22);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff2d4, 2.05);
    key.position.set(2.4, 2.5, 1.35);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9a54a, 0.95);
    rim.position.set(-1.35, 0.15, 1.05);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x6b5230, 0.48);
    fill.position.set(0.15, -1.5, 0.75);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);
    group.position.set(0, 0, 0);

    /* Physical gold + procedural roughness/normal = richer breakup (not flat “local” CG) */
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c9a050"),
      metalness: 1,
      roughness: 0.26,
      roughnessMap: goldSurface.roughnessMap,
      normalMap: goldSurface.normalMap,
      normalScale: new THREE.Vector2(0.14, 0.14),
      envMapIntensity: 1.92,
      emissive: new THREE.Color("#120c06"),
      emissiveIntensity: 0.045,
      specularIntensity: 1.05,
      specularColor: new THREE.Color("#fff4dc"),
      clearcoat: 0.12,
      clearcoatRoughness: 0.22,
      anisotropy: 0.32,
      anisotropyRotation: Math.PI * 0.5,
    });

    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        uColorA: { value: new THREE.Color("#d4b068") },
        uColorB: { value: new THREE.Color("#6a5220") },
        uPower: { value: 1.38 },
        uIntensity: { value: 1.22 },
      },
      vertexShader: `
        varying vec3 vN;
        varying vec3 vV;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vN = normalize(mat3(modelMatrix) * normal);
          vV = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uPower;
        uniform float uIntensity;
        varying vec3 vN;
        varying vec3 vV;
        void main() {
          float fres = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), uPower);
          vec3 col = mix(uColorA, uColorB, fres);
          gl_FragColor = vec4(col * fres * uIntensity, fres);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    let logoRoot: any = null;
    const primaryUrl = "/assets/logo.obj";
    const fallbackUrl = "/assets/thelostsymbolslogo.obj";

    const resolveUrl = async () => {
      const tryHead = async (u: string) => {
        const res = await fetch(u, { method: "HEAD" });
        return res.ok;
      };
      if (await tryHead(primaryUrl)) return primaryUrl;
      if (await tryHead(fallbackUrl)) return fallbackUrl;
      return null;
    };

    resolveUrl()
      .then((res) => {
        if (!res) throw new Error("missing");
        return res;
      })
      .then((url) => {
        const loader = new OBJLoader();
        loader.load(
          url,
          (obj: any) => {
            obj.traverse((child: any) => {
              const mesh = child as any;
              if ((mesh as any).isMesh) {
                const geo = (mesh as any).geometry;
                if (geo) {
                  const n = geo.getAttribute?.("normal");
                  if (!n || n.count === 0) geo.computeVertexNormals();
                  /* Vertex colors from OBJ often multiply down to black — remove */
                  if (geo.getAttribute?.("color"))
                    geo.deleteAttribute("color");
                  applySphericalUvIfMissing(geo);
                  try {
                    if (geo.index) {
                      geo.computeTangents();
                      (geo as any).userData.tangentsOk = true;
                    } else {
                      (geo as any).userData.tangentsOk = false;
                    }
                  } catch {
                    (geo as any).userData.tangentsOk = false;
                  }
                }
              }
            });

            obj.traverse((child: any) => {
              const mesh = child as any;
              if (!(mesh as any).isMesh) return;
              /* Per-mesh material so multi-group OBJs don’t share broken refs */
              const mat = baseMat.clone();
              mat.vertexColors = false;
              const geo = (mesh as any).geometry as
                | InstanceType<typeof THREE.BufferGeometry>
                | undefined;
              if (geo && (geo as any).userData?.tangentsOk === false) {
                mat.normalMap = null;
                mat.normalScale?.set(1, 1);
              }
              if (Array.isArray(mesh.material)) {
                mesh.material = mesh.material.map(() => mat.clone());
              } else {
                mesh.material = mat;
              }
            });

            const box = new THREE.Box3().setFromObject(obj);
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();
            box.getSize(size);
            box.getCenter(center);

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 200 / Math.max(1e-6, maxDim); // much bigger center logo
            obj.scale.setScalar(scale);

            // Center AFTER scaling (so pivot is accurate)
            const boxScaled = new THREE.Box3().setFromObject(obj);
            const centerScaled = new THREE.Vector3();
            boxScaled.getCenter(centerScaled);
            obj.position.sub(centerScaled);

            // Camera closer so logo fills more of the view
            const scaledSize = new THREE.Vector3();
            boxScaled.getSize(scaledSize);
            const maxDimScaled = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
            const fov = (camera.fov * Math.PI) / 180;
            const fitHeight = (maxDimScaled * 0.5) / Math.tan(fov * 0.5);
            const fitWidth = fitHeight / camera.aspect;
            const distance = 1.25 * Math.max(fitHeight, fitWidth);
            camera.position.set(0, 0, distance + 80);
            camera.lookAt(0, 0, 0);

            const glowGroup = obj.clone(true);
            glowGroup.traverse((child: any) => {
              const mesh = child as any;
              if ((mesh as any).isMesh) {
                (mesh as any).material = glowMat;
                (mesh as any).scale.setScalar(1.035);
              }
            });
            glowGroup.position.copy(obj.position);

            const container = new THREE.Group();
            container.add(obj);
            container.add(glowGroup);
            logoRoot = container;
            group.add(container);

            // Final centering pass on the combined container (robust for quirky OBJ origins)
            const boxFinal = new THREE.Box3().setFromObject(container);
            const centerFinal = new THREE.Vector3();
            boxFinal.getCenter(centerFinal);
            container.position.sub(centerFinal);

            // Ensure camera is aimed at the origin (where container is centered now)
            camera.lookAt(0, 0, 0);

            // Re-run resize once OBJ is attached (ensures correct aspect sizing)
            onResize();

            setStatus({ kind: "ready" });
          },
          undefined,
          () => {
            setStatus({
              kind: "error",
              message: "OBJ load failed. Check the file format and path.",
            });
          }
        );
      })
      .catch(() => setStatus({ kind: "missingAsset" }));

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer?.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    let resizeRaf = 0;
    const scheduleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => onResize());
    };
    onResize();
    window.addEventListener("resize", scheduleResize, { passive: true });

    // Pointer / touch interaction for rotating logo in-place.
    // Drag applies angular impulse; after release logo keeps spinning then eases back to default.
    let isPressed = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    const ROT_Y_FACTOR = 0.008; // radians per pixel (horizontal)
    const ROT_X_FACTOR = 0.006; // radians per pixel (vertical)

    const targetEl = renderer?.domElement ?? mount;

    const handlePointerDown = (e: PointerEvent) => {
      if (!logoRoot) return;
      isPressed = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velX = 0;
      velY = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPressed || !logoRoot) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      const deltaY = dx * ROT_Y_FACTOR;
      const deltaX = dy * ROT_X_FACTOR;
      logoRoot.rotation.y += deltaY;
      logoRoot.rotation.x += deltaX;

      velY = deltaY;
      velX = deltaX;
    };

    const handlePointerUp = () => {
      isPressed = false;
    };

    targetEl.addEventListener("pointerdown", handlePointerDown, { passive: true });
    targetEl.addEventListener("pointermove", handlePointerMove, { passive: true });
    targetEl.addEventListener("pointerup", handlePointerUp, { passive: true });
    targetEl.addEventListener("pointercancel", handlePointerUp, { passive: true });

    const clock = new THREE.Clock();
    const stopLoop = runFrameLoop(() => {
      const dt = clock.getDelta();
      const t = (performance.now() / 1000) % 1000;

      if (logoRoot) {
        if (!isPressed) {
          logoRoot.rotation.y += velY;
          logoRoot.rotation.x += velX;

          const damping = Math.pow(0.94, dt * 60);
          velX *= damping;
          velY *= damping;

          if (Math.abs(velX) < 0.0002 && Math.abs(velY) < 0.0002) {
            logoRoot.rotation.y += dt * 0.65;
            logoRoot.rotation.x = lerp(logoRoot.rotation.x, 0, 0.08);
            logoRoot.rotation.z = lerp(logoRoot.rotation.z, 0, 0.08);
          }
        }

        (glowMat.uniforms.uIntensity.value as number) = 1.22 + Math.sin(t * 3.2) * 0.06;
      }

      renderer.render(scene, camera);
    }, { intersectTarget: stageRef.current ?? undefined });

    return () => {
      stopLoop();
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", scheduleResize);
      targetEl.removeEventListener("pointerdown", handlePointerDown as any);
      targetEl.removeEventListener("pointermove", handlePointerMove as any);
      targetEl.removeEventListener("pointerup", handlePointerUp as any);
      targetEl.removeEventListener("pointercancel", handlePointerUp as any);
      envMap?.dispose();
      scene.environment = null;
      disposeGoldSurface?.();
      disposeGoldSurface = null;
      renderer?.dispose();
      if (renderer?.domElement && renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section ref={stageRef} className={styles.stage} aria-label="Intro logo">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.centerStack}>
        <div className={styles.orb} aria-hidden="true" />
        <div className={styles.starburst} aria-hidden="true" />
        <div className={styles.centerCrosshair} aria-hidden="true" />
        <div className={styles.canvasWrap}>
          <div ref={mountRef} className={styles.canvasMount} />
        </div>
      </div>

      {status.kind !== "ready" && (
        <div className={styles.status}>
          {status.kind === "loading" && (
            <span>
              Loading 3D logo… (<code>{"/assets/logo.obj"}</code>)
            </span>
          )}
          {status.kind === "missingAsset" && (
            <span>
              Logo file missing. Copy{" "}
              <code>/Users/admin/Downloads/thelostsymbolslogo.obj</code> →{" "}
              <code>public/assets/logo.obj</code>
            </span>
          )}
          {status.kind === "error" && <span>{status.message}</span>}
        </div>
      )}
    </section>
  );
};

