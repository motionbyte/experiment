import React from "react";
import * as THREE from "three";
// @ts-expect-error three/examples has no TS types in-core
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import styles from "./LogoIntro.module.css";

type Status =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "missingAsset" }
  | { kind: "error"; message: string };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const LogoIntro: React.FC = () => {
  const mountRef = React.useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = React.useState<Status>({ kind: "loading" });

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setStatus({ kind: "loading" });

    let renderer: any = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
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

    // Lighting tuned for "bright star" vibe
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x3ef3ff, 1.5);
    key.position.set(1.5, 1.2, 1.8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff3ed6, 1.1);
    rim.position.set(-1.2, 0.2, 1.0);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x9b5bff, 0.75);
    fill.position.set(0.2, -1.4, 0.8);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);
    group.position.set(0, 0, 0);

    const baseMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#050513"),
      roughness: 0.18,
      metalness: 0.82,
      clearcoat: 0.85,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.0,
    });

    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        uColorA: { value: new THREE.Color("#3ef3ff") },
        uColorB: { value: new THREE.Color("#ff3ed6") },
        uPower: { value: 1.35 },
        uIntensity: { value: 2.6 },
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
                const n = geo && geo.getAttribute ? geo.getAttribute("normal") : null;
                if (!n || (n as any).count === 0) geo.computeVertexNormals();
              }
            });

            obj.traverse((child: any) => {
              const mesh = child as any;
              if ((mesh as any).isMesh) mesh.material = baseMat;
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
    onResize();
    window.addEventListener("resize", onResize, { passive: true });

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

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const dt = clock.getDelta();
      const t = (performance.now() / 1000) % 1000;

      if (logoRoot) {
        // Auto / inertia behaviour when not dragging
        if (!isPressed) {
          // Free spin from last drag
          logoRoot.rotation.y += velY;
          logoRoot.rotation.x += velX;

          // Dampen velocity (friction)
          const damping = Math.pow(0.94, dt * 60);
          velX *= damping;
          velY *= damping;

          // When almost stopped, go back to gentle default spin & upright pose
          if (Math.abs(velX) < 0.0002 && Math.abs(velY) < 0.0002) {
            logoRoot.rotation.y += dt * 0.65;
            logoRoot.rotation.x = lerp(logoRoot.rotation.x, 0, 0.08);
            logoRoot.rotation.z = lerp(logoRoot.rotation.z, 0, 0.08);
          }
        }

        // tiny "star pulse"
        (glowMat.uniforms.uIntensity.value as number) = 2.6 + Math.sin(t * 3.2) * 0.22;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      targetEl.removeEventListener("pointerdown", handlePointerDown as any);
      targetEl.removeEventListener("pointermove", handlePointerMove as any);
      targetEl.removeEventListener("pointerup", handlePointerUp as any);
      targetEl.removeEventListener("pointercancel", handlePointerUp as any);
      renderer?.dispose();
      if (renderer?.domElement && renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className={styles.stage} aria-label="Intro logo">
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

