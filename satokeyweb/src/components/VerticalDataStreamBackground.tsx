import { useEffect, useRef } from "react";
import * as THREE from "three";

const COLUMNS = 48;
const KEYS_PER_COLUMN = 42;
const KEY_SPACING = 0.078;
const BASE_SPEED = 0.11;
const ELECTRIC_BLUE = new THREE.Color("#0ea5e9");
const DEEP_PURPLE = new THREE.Color("#6d28d9");
const OBSIDIAN_BLACK = 0x050508;

function createKeyShape(): THREE.Shape {
  const shape = new THREE.Shape();
  const w = 0.06;
  const h = 0.2;
  shape.moveTo(-w / 2, h / 2);
  shape.lineTo(-w / 2, -h / 2);
  shape.lineTo(-w / 4, -h / 2);
  shape.lineTo(-w / 4, 0);
  shape.lineTo(w / 4, 0);
  shape.lineTo(w / 4, -h / 2);
  shape.lineTo(w / 2, -h / 2);
  shape.lineTo(w / 2, h / 2);
  shape.absarc(0, h / 2, w / 2, Math.PI, 0, false);
  shape.closePath();
  return shape;
}

function createKeyGeometry(): THREE.BufferGeometry {
  const shape = createKeyShape();
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.008,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 1,
  });
}

function createFobGeometry(): THREE.BufferGeometry {
  return new THREE.PlaneGeometry(0.055, 0.08);
}

export function VerticalDataStreamBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(OBSIDIAN_BLACK);
    scene.fog = new THREE.Fog(OBSIDIAN_BLACK, 6, 22);

    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.objectFit = "cover";
    container.appendChild(renderer.domElement);

    const keyGeometry = createKeyGeometry();
    const fobGeometry = createFobGeometry();
    const keyCount = Math.floor((COLUMNS * KEYS_PER_COLUMN) * 0.6);
    const fobCount = COLUMNS * KEYS_PER_COLUMN - keyCount;

    const keyMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
      vertexColors: false,
    });

    const keys = new THREE.InstancedMesh(keyGeometry, keyMaterial, keyCount);
    const fobs = new THREE.InstancedMesh(fobGeometry, keyMaterial.clone(), fobCount);

    const keyData: Array<{ x: number; y: number; z: number; color: THREE.Color }> = [];
    const fobData: Array<{ x: number; y: number; z: number; color: THREE.Color }> = [];

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let c = 0; c < COLUMNS; c++) {
      for (let i = 0; i < KEYS_PER_COLUMN; i++) {
        const x = (c / COLUMNS) * 2.5 - 1.25;
        const y = -1.8 + i * KEY_SPACING + (c % 2) * 0.04;
        const z = (Math.random() - 0.5) * 1.4;
        const t = c / COLUMNS;
        color.lerpColors(DEEP_PURPLE, ELECTRIC_BLUE, t * 0.9 + 0.05);

        if ((c * KEYS_PER_COLUMN + i) % 5 < 3) {
          keyData.push({ x, y, z, color: color.clone() });
        } else {
          fobData.push({ x, y, z, color: color.clone() });
        }
      }
    }

    keyData.forEach((d, i) => {
      dummy.position.set(d.x, d.y, d.z);
      dummy.rotation.z = 0;
      dummy.updateMatrix();
      keys.setMatrixAt(i, dummy.matrix);
      keys.setColorAt(i, d.color);
    });
    keys.instanceMatrix.needsUpdate = true;
    keys.instanceColor!.needsUpdate = true;
    scene.add(keys);

    fobData.forEach((d, i) => {
      dummy.position.set(d.x, d.y, d.z);
      dummy.rotation.z = 0;
      dummy.updateMatrix();
      fobs.setMatrixAt(i, dummy.matrix);
      fobs.setColorAt(i, d.color);
    });
    fobs.instanceMatrix.needsUpdate = true;
    fobs.instanceColor!.needsUpdate = true;
    scene.add(fobs);

    const keyPositions = new Float32Array((keyCount + fobCount) * 3);
    const keyYs = new Float32Array(keyCount + fobCount);
    keyData.forEach((d, i) => {
      keyPositions[i * 3] = d.x;
      keyPositions[i * 3 + 1] = d.y;
      keyPositions[i * 3 + 2] = d.z;
      keyYs[i] = d.y;
    });
    fobData.forEach((d, i) => {
      const idx = keyCount + i;
      keyPositions[idx * 3] = d.x;
      keyPositions[idx * 3 + 1] = d.y;
      keyPositions[idx * 3 + 2] = d.z;
      keyYs[idx] = d.y;
    });

    const hexPlateRadius = 0.22;
    function createHexPlate(r: number, thin = true) {
      const shape = new THREE.Shape();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      return new THREE.ExtrudeGeometry(shape, {
        depth: thin ? 0.015 : 0.03,
        bevelEnabled: true,
        bevelThickness: 0.008,
        bevelSize: 0.008,
        bevelSegments: 1,
      });
    }

    const vaultGroup = new THREE.Group();
    const plateMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.2,
      metalness: 0.9,
      roughness: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.12,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });

    const hexPositions = [
      [0, 0],
      [hexPlateRadius * 1.73, 0],
      [hexPlateRadius * 0.866, hexPlateRadius * 1.5],
      [-hexPlateRadius * 0.866, hexPlateRadius * 1.5],
      [-hexPlateRadius * 1.73, 0],
      [-hexPlateRadius * 0.866, -hexPlateRadius * 1.5],
      [hexPlateRadius * 0.866, -hexPlateRadius * 1.5],
    ];

    hexPositions.forEach(([px, py], i) => {
      const geo = createHexPlate(hexPlateRadius, i > 0);
      const plate = new THREE.Mesh(geo, plateMaterial.clone());
      plate.rotation.x = Math.PI / 2;
      plate.position.set(px * 2.2, py * 2.2, -0.3);
      vaultGroup.add(plate);
    });

    vaultGroup.position.set(0, 0, 0);
    vaultGroup.scale.setScalar(1.85);
    scene.add(vaultGroup);

    const vaultPlates = vaultGroup.children as THREE.Mesh[];
    const clock = new THREE.Clock();
    const wrapY = KEYS_PER_COLUMN * KEY_SPACING + 0.6;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.1);
      const t = clock.getElapsedTime();

      for (let i = 0; i < keyCount; i++) {
        keyYs[i] -= BASE_SPEED * dt;
        if (keyYs[i] < -2.2) keyYs[i] += wrapY;
        dummy.position.set(keyPositions[i * 3], keyYs[i], keyPositions[i * 3 + 2]);
        dummy.updateMatrix();
        keys.setMatrixAt(i, dummy.matrix);
      }
      keys.instanceMatrix.needsUpdate = true;

      for (let i = 0; i < fobCount; i++) {
        const idx = keyCount + i;
        keyYs[idx] -= BASE_SPEED * dt;
        if (keyYs[idx] < -2.2) keyYs[idx] += wrapY;
        dummy.position.set(keyPositions[idx * 3], keyYs[idx], keyPositions[idx * 3 + 2]);
        dummy.updateMatrix();
        fobs.setMatrixAt(i, dummy.matrix);
      }
      fobs.instanceMatrix.needsUpdate = true;

      let absorbFactor = 0;
      for (let i = 0; i < keyCount + fobCount; i++) {
        const ky = keyYs[i];
        if (Math.abs(ky) < 0.9) absorbFactor += 0.012;
      }
      absorbFactor = Math.min(1, absorbFactor);

      const pulse = 0.12 + absorbFactor * 0.4 + Math.sin(t * 1.5) * 0.06;
      vaultPlates.forEach((plate) => {
        const mat = plate.material as THREE.MeshPhysicalMaterial;
        mat.emissiveIntensity = pulse;
        mat.opacity = 0.18 + absorbFactor * 0.15;
      });

      vaultGroup.rotation.z = t * 0.15;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      keyGeometry.dispose();
      fobGeometry.dispose();
      keyMaterial.dispose();
      vaultPlates.forEach((p) => {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 w-screen h-screen"
      aria-hidden
    />
  );
}
