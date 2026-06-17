import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Meridian, Acupoint } from "../../types/meridian";
import { ACUPOINTS } from "../../data/acupoints";

interface MeridianLinesProps {
  meridians: Meridian[];
  acupoints: Acupoint[];
  selectedId: string | null;
  isolateSelected: boolean;
  opacityMultiplier?: number;
}

export default function MeridianLines({
  meridians,
  acupoints,
  selectedId,
  isolateSelected,
  opacityMultiplier = 1.0,
}: MeridianLinesProps) {
  const [introProgress, setIntroProgress] = useState(0);

  // Animation progress when page loads
  useEffect(() => {
    let animFrame: number;
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds draw time

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      setIntroProgress(progress);
      if (progress < 1.0) {
        animFrame = requestAnimationFrame(update);
      }
    };

    update();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Compute CatmullRomCurve3 and TubeGeometry for each meridian pathway
  // Binds spline vertices to dynamic acupoint coordinates when calibrated.
  const lineData = useMemo(() => {
    return meridians.map((m) => {
      const points = m.points.map((p) => {
        // Find if this spline vertex is coincident with an initial acupoint location
        const matchingAcupoint = acupoints.find((ap) => {
          const initialAp = ACUPOINTS.find((init) => init.id === ap.id);
          if (!initialAp) return false;
          const dist = Math.sqrt(
            Math.pow(initialAp.position[0] - p[0], 2) +
            Math.pow(initialAp.position[1] - p[1], 2) +
            Math.pow(initialAp.position[2] - p[2], 2)
          );
          return dist < 0.02; // Coincident check within 2cm threshold
        });

        if (matchingAcupoint) {
          return new THREE.Vector3(...matchingAcupoint.position);
        }
        return new THREE.Vector3(...p);
      });

      const curve = new THREE.CatmullRomCurve3(points);
      // Tube Geometry: curve, segments=64, radius=0.0055 (slightly thicker), radialSegments=8, closed=false
      const geometry = new THREE.TubeGeometry(curve, 64, 0.0055, 8, false);
      return {
        id: m.id,
        color: m.color,
        geometry,
      };
    });
  }, [meridians, acupoints]);

  return (
    <group>
      {lineData.map((ld) => {
        const isSelected = selectedId === ld.id;
        const hasSelection = selectedId !== null;

        // Opacity checks: isolation mode dims other lines completely
        let opacity = 0.85;
        if (hasSelection) {
          if (isSelected) {
            opacity = 1.0;
          } else {
            opacity = isolateSelected ? 0.0 : 0.35;
          }
        }
        opacity *= opacityMultiplier;

        const colorHex = isSelected ? "#e0a96d" : ld.color; // Selected has gold glow

        return (
          <SingleMeridianLine
            key={ld.id}
            geometry={ld.geometry}
            color={colorHex}
            opacity={opacity}
            progress={introProgress}
          />
        );
      })}
    </group>
  );
}

// Shader-based drawing animation and glowing tube flow for premium look
function SingleMeridianLine({
  geometry,
  color,
  opacity,
  progress,
}: {
  geometry: THREE.TubeGeometry;
  color: string;
  opacity: number;
  progress: number;
}) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  const shader = useMemo(() => {
    return {
      uniforms: {
        color: { value: new THREE.Color(color) },
        progress: { value: progress },
        opacity: { value: opacity },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float progress;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          if (vUv.x > progress) discard;
          
          float glow = 1.0 - abs(vUv.y - 0.5) * 2.0;
          glow = pow(glow, 2.2);
          
          float flow = sin(vUv.x * 25.0 - time * 5.0) * 0.15 + 0.85;
          
          gl_FragColor = vec4(color, glow * opacity * flow);
        }
      `,
    };
  }, [color, progress, opacity]);

  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.progress.value = progress;
      shaderRef.current.uniforms.opacity.value = opacity;
      shaderRef.current.uniforms.color.value.set(color);
    }
  }, [progress, opacity, color]);

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={shaderRef}
        args={[shader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
