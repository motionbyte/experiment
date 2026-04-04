import React from "react";
import * as THREE from "three";
import { runFrameLoop } from "../../../utils/visibilityFrame";
// @ts-expect-error three/examples has no TS types in-core
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import styles from "./LogoTop.module.css";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const LogoTop: React.FC = () => {
  const mountRef = React.useRef<HTMLDivElement | null>(null);
  const hostRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

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
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 4000);
    camera.position.set(0, 0, 260);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x3ef3ff, 1.25);
    key.position.set(1.5, 1.2, 1.8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff3ed6, 0.95);
    rim.position.set(-1.2, 0.2, 1.0);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

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
        uIntensity: { value: 2.2 },
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
    const url = "/assets/logo.obj";
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
            (mesh as any).material = baseMat;
          }
        });

        const box = new THREE.Box3().setFromObject(obj);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 52 / Math.max(1e-6, maxDim);
        obj.scale.setScalar(scale);

        const boxScaled = new THREE.Box3().setFromObject(obj);
        const center = new THREE.Vector3();
        boxScaled.getCenter(center);
        obj.position.sub(center);

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

        const boxFinal = new THREE.Box3().setFromObject(container);
        const centerFinal = new THREE.Vector3();
        boxFinal.getCenter(centerFinal);
        container.position.sub(centerFinal);
      },
      undefined,
      () => undefined
    );

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer?.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });

    const clock = new THREE.Clock();
    const stopLoop = runFrameLoop(() => {
      const dt = clock.getDelta();
      const t = (performance.now() / 1000) % 1000;
      if (logoRoot) {
        logoRoot.rotation.y += dt * 0.65;
        (glowMat.uniforms.uIntensity.value as number) =
          2.2 + Math.sin(t * 3.2) * 0.18;
        logoRoot.rotation.x = lerp(logoRoot.rotation.x, 0, 0.08);
        logoRoot.rotation.z = lerp(logoRoot.rotation.z, 0, 0.08);
      }
      renderer?.render(scene, camera);
    }, { intersectTarget: hostRef.current ?? undefined });

    return () => {
      stopLoop();
      window.removeEventListener("resize", onResize);
      renderer?.dispose();
      if (renderer?.domElement && renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={hostRef} className={styles.host} aria-label="Logo">
      <div className={styles.star} aria-hidden="true" />
      <div ref={mountRef} className={styles.mount} />
    </div>
  );
};

