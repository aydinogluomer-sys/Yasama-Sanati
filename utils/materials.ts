import * as THREE from "three";

/**
 * Procedural hologram material with rim light (Fresnel) effect.
 */
export const createHologramShaderMaterial = (colorHex: string = "#5f7e6f", glowIntensity: number = 1.0) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(colorHex) },
      coeficient: { value: 0.2 },
      power: { value: 2.0 },
      intensity: { value: glowIntensity },
      time: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float coeficient;
      uniform float power;
      uniform float intensity;
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        
        // Fresnel factor
        float fresnel = pow(coeficient + (1.0 - abs(dot(normal, viewDir))), power);
        
        // Add a subtle wave animation
        float wave = sin(vViewPosition.y * 12.0 - time * 2.0) * 0.05 + 0.95;
        
        gl_FragColor = vec4(glowColor, fresnel * intensity * wave * 0.45);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
};

/**
 * Glassmorphic skin material using standard physical parameters
 */
export const getMannequinMaterial = (baseColor: string = "#2c3d35") => {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(baseColor),
    transparent: true,
    opacity: 0.18,
    roughness: 0.2,
    metalness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.7,
    thickness: 0.5,
    ior: 1.45,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
};

/**
 * Golden/silver glowing material for selected lines and nodes
 */
export const getGlowMaterial = (color: string = "#d97706", opacity: number = 0.8) => {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
};
