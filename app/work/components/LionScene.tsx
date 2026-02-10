"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Confetti from "react-confetti";
import * as THREE from "three";

useGLTF.preload("/models/Lion.glb");
useGLTF.preload("/models/Bowtie.glb");

const PRESET_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ffffff",
  "#1f2937",
];

const LION_HEAD_MESH_NAME = "Lion_01_Circle005_1_4";

const JUMP_DURATION = 0.5;
const JUMP_HEIGHT = 8;
const TARGET_MODEL_SIZE = 2.5;

function applyLionHeadColor(scene: THREE.Object3D, color: string) {
  const threeColor = new THREE.Color(color);
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      const isHeadMesh = child.name === LION_HEAD_MESH_NAME;

      if (isHeadMesh) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat) => {
          if (
            mat instanceof THREE.MeshStandardMaterial ||
            mat instanceof THREE.MeshPhongMaterial ||
            mat instanceof THREE.MeshLambertMaterial
          ) {
            mat.color.copy(threeColor);
          }
        });
      }
    }
  });
}

function LionModel({
  jumpTriggerRef,
  headColor,
  groupRef,
}: {
  jumpTriggerRef?: React.RefObject<boolean>;
  headColor?: string;
  groupRef: React.RefObject<THREE.Group | null>;
}) {
  const { scene } = useGLTF("/models/Lion.glb");
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    cloned.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = TARGET_MODEL_SIZE / maxDim;
    cloned.scale.set(scale, scale, scale);
    return cloned;
  }, [scene]);
  const jumpStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (headColor) {
      applyLionHeadColor(clonedScene, headColor);
    }
  }, [clonedScene, headColor]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    if (jumpTriggerRef?.current) {
      jumpTriggerRef.current = false;
      jumpStartRef.current = performance.now() / 1000;
    }

    if (jumpStartRef.current !== null) {
      const elapsed = performance.now() / 1000 - jumpStartRef.current;
      const t = Math.min(elapsed / JUMP_DURATION, 1);
      const y = 4 * JUMP_HEIGHT * t * (1 - t);
      group.position.y = y;
      group.position.x = -1.5;

      if (t >= 1) {
        jumpStartRef.current = null;
        group.position.y = 0;
      }
    }
  });

  return React.createElement(
    "group",
    { ref: groupRef, position: [-1.5, 0, 0] },
    React.createElement("primitive", {
      object: clonedScene,
      scale: 1,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    }),
  );
}

function AttachedBowtie({
  parentRef,
  color,
}: {
  parentRef: React.RefObject<THREE.Group | null>;
  color: string;
}) {
  const { scene } = useGLTF("/models/Bowtie.glb");
  const [attached, setAttached] = useState(false);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    const threeColor = new THREE.Color(color);
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.color.copy(threeColor);
          }
        });
      }
    });
  }, [clonedScene, color]);

  useEffect(() => {
    if (clonedScene && parentRef.current && !attached) {
      clonedScene.scale.set(1.2, 1.2, 1.2);
      clonedScene.position.set(0, 3, 2);
      parentRef.current.add(clonedScene);
      setAttached(true);
    }
  }, [clonedScene, parentRef, attached]);

  return null;
}

function ZoomController({
  zoomRef,
}: {
  zoomRef: React.RefObject<{ in: number; out: number }>;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (!zoomRef?.current) return;
    const { in: zoomIn, out: zoomOut } = zoomRef.current;
    if (zoomIn > 0 || zoomOut > 0) {
      const currentZoom = camera.zoom;
      if (zoomIn > 0) {
        camera.zoom = Math.min(currentZoom * 1.15, 5);
        zoomRef.current.in--;
      }
      if (zoomOut > 0) {
        camera.zoom = Math.max(currentZoom / 1.15, 0.2);
        zoomRef.current.out--;
      }
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

function CameraInitializer({
  groupRef,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
}) {
  const { camera } = useThree();
  const initialized = useRef(false);

  useFrame(() => {
    if (initialized.current || !groupRef.current) return;
    const group = groupRef.current;
    if (group.children.length === 0) return;

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraDistance *= 1.8;

    camera.position.set(-1.5, size.y * 0.5, cameraDistance);
    camera.lookAt(-1.5, 0, 0);
    camera.updateProjectionMatrix();
    initialized.current = true;
  });

  return null;
}

export function LionScene() {
  const [color, setColor] = useState("#ef4444");
  const [lionHeadColor, setLionHeadColor] = useState("#eab308");
  const [showConfetti, setShowConfetti] = useState(false);
  const jumpTriggerRef = useRef(false);
  const zoomRef = useRef({ in: 0, out: 0 });
  const lionGroupRef = useRef<THREE.Group>(null);

  const handleJumpClick = () => {
    jumpTriggerRef.current = true;
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleScreenshot = () => {
    const canvas = canvasContainerRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `lion-scene-${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="relative flex flex-col gap-3">
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 300}
          height={typeof window !== "undefined" ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={150}
        />
      )}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-neutral-700">
            사자 머리 색상
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={`lion-${c}`}
                type="button"
                onClick={() => setLionHeadColor(c)}
                className="h-7 w-7 rounded-full border-2 border-neutral-300 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <label className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">직접 선택</span>
            <input
              type="color"
              value={lionHeadColor}
              onChange={(e) => setLionHeadColor(e.target.value)}
              className="h-7 w-7 cursor-pointer rounded border border-neutral-300 bg-transparent"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-neutral-700">
            Bowtie 리본 색상
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className="h-7 w-7 rounded-full border-2 border-neutral-300 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <label className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">직접 선택</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-7 w-7 cursor-pointer rounded border border-neutral-300 bg-transparent"
            />
          </label>
        </div>
        <div className="flex items-center gap-2 border-l border-neutral-200 pl-4">
          <button
            type="button"
            onClick={handleJumpClick}
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            점프
          </button>
          <button
            type="button"
            onClick={handleScreenshot}
            className="rounded-lg bg-pink-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            스크린샷
          </button>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => {
                zoomRef.current.in += 1;
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              title="줌 인"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                zoomRef.current.out += 1;
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              title="줌 아웃"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <div
        ref={canvasContainerRef}
        className="h-[400px] w-full overflow-hidden rounded-xl bg-neutral-200"
      >
        <Canvas
          camera={{ position: [4, 2, 4], fov: 50 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          style={{ width: "100%", height: "100%" }}
        >
          {React.createElement("ambientLight", { intensity: 0.6 })}
          {React.createElement("directionalLight", {
            position: [5, 5, 5],
            intensity: 1,
          })}
          {React.createElement("directionalLight", {
            position: [-3, -2, 2],
            intensity: 0.4,
          })}
          <Suspense
            fallback={React.createElement(
              "mesh",
              null,
              React.createElement("boxGeometry", { args: [0.5, 0.5, 0.5] }),
              React.createElement("meshStandardMaterial", {
                color: "orange",
                wireframe: true,
              }),
            )}
          >
            <LionModel
              jumpTriggerRef={jumpTriggerRef}
              headColor={lionHeadColor}
              groupRef={lionGroupRef}
            />
            <AttachedBowtie parentRef={lionGroupRef} color={color} />
          </Suspense>
          <ZoomController zoomRef={zoomRef} />
          <CameraInitializer groupRef={lionGroupRef} />
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </div>
    </div>
  );
}
