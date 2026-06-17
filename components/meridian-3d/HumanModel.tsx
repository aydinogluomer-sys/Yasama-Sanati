"use client";

import React, { useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

// ============================================================================
// MODEL TRANSFORMATION ADJUSTMENTS CONFIGURATION
// If the imported human.glb is lying down, scaled weirdly, or off-center,
// use these settings to tweak rotation, position offset, and scale.
// ============================================================================
const MODEL_CONFIG = {
  // Rotation offsets in radians. E.g., [Math.PI / 2, 0, 0] if rotated on X axis
  rotation: [0, 0, 0] as [number, number, number],
  
  // Custom manual position adjustments if you want to shift the model
  position: [0, 0, 0] as [number, number, number],
  
  // Extra scale multiplier to apply on top of the auto-height normalization (1.9 units)
  extraScale: 1.0,

  // Premium Holographic Material Configuration
  material: {
    color: "#203b30", // Rich emerald jade glass tint
    opacity: 0.40, // Recommended: 0.32 - 0.48
    roughness: 0.25, // Recommended: 0.18 - 0.35
    metalness: 0.10, // Recommended: 0.05 - 0.15
    transmission: 0.30, // Recommended: low/medium (e.g. 0.3)
    thickness: 1.0,
    ior: 1.45,
    emissive: "#e0a96d", // Light warm gold rim glow
    emissiveIntensity: 0.08, // Very light
    depthWrite: false,
    side: THREE.DoubleSide,
  }
};

export default function HumanModel() {
  // Load model from runtime public directory '/models/human.glb'
  const { scene } = useGLTF("/models/human.glb");

  // Create a high-fidelity translucent glassmorphic medical hologram material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(MODEL_CONFIG.material.color),
      roughness: MODEL_CONFIG.material.roughness,
      metalness: MODEL_CONFIG.material.metalness,
      transmission: MODEL_CONFIG.material.transmission,
      thickness: MODEL_CONFIG.material.thickness,
      ior: MODEL_CONFIG.material.ior,
      transparent: true,
      opacity: MODEL_CONFIG.material.opacity,
      depthWrite: MODEL_CONFIG.material.depthWrite,
      side: MODEL_CONFIG.material.side,
      emissive: new THREE.Color(MODEL_CONFIG.material.emissive),
      emissiveIntensity: MODEL_CONFIG.material.emissiveIntensity,
    });
  }, []);

  // Compute bounding box, automatically normalize height to 1.9 units, and apply glass material
  useMemo(() => {
    if (!scene) return;

    // 1. Calculate the bounding box size of the loaded model
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    // 2. Normalize height (Y axis) to fit the meridian/acupoints coordinates grid (approx. 1.9 units)
    const height = size.y > 0 ? size.y : 1.0;
    const targetHeight = 1.9;
    const scaleFactor = targetHeight / height;
    
    scene.scale.setScalar(scaleFactor);

    // 3. Override materials on all child meshes
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = glassMaterial;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene, glassMaterial]);

  return (
    <group 
      position={MODEL_CONFIG.position}
      scale={MODEL_CONFIG.extraScale}
    >
      {/* Drei <Center> handles auto-centering the bounding box at (0, 0, 0) */}
      <Center>
        <primitive 
          object={scene} 
          rotation={MODEL_CONFIG.rotation}
        />
      </Center>
    </group>
  );
}

// Preload to optimize R3F loading stages
useGLTF.preload("/models/human.glb");
