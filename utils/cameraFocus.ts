import * as THREE from "three";

export interface FocusArea {
  target: [number, number, number];
  position: [number, number, number];
}

export const getCameraFocusTarget = (
  acupointPos: [number, number, number],
  mannequinRotationY: number
): FocusArea => {
  const [px, py, pz] = acupointPos;
  
  // Create a Vector3 for the acupoint position
  const targetVec = new THREE.Vector3(px, py, pz);
  
  // Calculate camera offset relative to the body's rotation
  const offset = new THREE.Vector3(0, 0.05, 1.1); // Focus zoom distance (increased from 0.5 to 1.1)
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), mannequinRotationY);
  
  const camPosVec = new THREE.Vector3().copy(targetVec).add(offset);
  
  return {
    target: [targetVec.x, targetVec.y, targetVec.z],
    position: [camPosVec.x, camPosVec.y, camPosVec.z],
  };
};

export const DEFAULT_CAMERA = {
  position: [0, 0.2, 5.6] as [number, number, number],
  target: [0, -0.12, 0] as [number, number, number],
};
