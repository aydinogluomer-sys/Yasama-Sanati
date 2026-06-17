"use client";

import React, { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Acupoint } from "../../types/meridian";

interface AcupointNodesProps {
  acupoints: Acupoint[];
  selectedId: string | null; // Selected acupoint ID
  selectedMeridianId: string | null; // Selected meridian ID
  meridianColors: Record<string, string>;
  onSelect: (acupoint: Acupoint) => void;
  opacityMultiplier?: number;
}

export default function AcupointNodes({
  acupoints,
  selectedId,
  selectedMeridianId,
  meridianColors,
  onSelect,
  opacityMultiplier = 1.0,
}: AcupointNodesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <group>
      {acupoints.map((ap) => {
        const isSelected = selectedId === ap.id;
        const isHovered = hoveredId === ap.id;
        const color = meridianColors[ap.meridian] || "#fbbf24";
        
        // Dynamic node opacity
        let currentOpacityMultiplier = 1.0;
        if (selectedId !== null) {
          // An acupoint is selected
          currentOpacityMultiplier = isSelected ? 1.0 : 0.15;
        } else if (selectedMeridianId !== null) {
          // A meridian is selected
          currentOpacityMultiplier = selectedMeridianId === ap.meridian ? 1.0 : 0.25;
        } else if (hoveredId !== null) {
          // A node is hovered
          currentOpacityMultiplier = isHovered ? 1.0 : 0.4;
        }

        return (
          <SingleAcupointNode
            key={ap.id}
            acupoint={ap}
            isSelected={isSelected}
            isHovered={isHovered}
            selectedId={selectedId}
            selectedMeridianId={selectedMeridianId}
            color={color}
            opacityMultiplier={opacityMultiplier * currentOpacityMultiplier}
            onHover={(hovered) => setHoveredId(hovered ? ap.id : null)}
            onClick={() => onSelect(ap)}
          />
        );
      })}
    </group>
  );
}

function SingleAcupointNode({
  acupoint,
  isSelected,
  isHovered,
  selectedId,
  selectedMeridianId,
  color,
  opacityMultiplier,
  onHover,
  onClick,
}: {
  acupoint: Acupoint;
  isSelected: boolean;
  isHovered: boolean;
  selectedId: string | null;
  selectedMeridianId: string | null;
  color: string;
  opacityMultiplier: number;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const haloRef2 = useRef<THREE.Mesh>(null);

  // Show label only if selected, hovered, or belongs to the selected meridian (when no acupoint is selected)
  const showLabel = isSelected || isHovered || (selectedMeridianId === acupoint.meridian && selectedId === null);

  // Lerping and pulsing animations inside useFrame
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. Core scale lerp (Expand slightly when hovered or selected)
    if (coreRef.current) {
      const targetScale = isSelected ? 1.5 : isHovered ? 1.3 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }

    // 2. Halo pulse (expanding ring that fades out)
    if (haloRef.current) {
      const cycle = (elapsed * 1.2) % 1.0; // 0 to 1 loop
      const scale = 1.0 + cycle * 2.2;
      haloRef.current.scale.set(scale, scale, scale);
      
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1.0 - cycle) * 0.45 * opacityMultiplier;
    }

    // 3. Second offset halo for double-layer rich glowing aesthetics
    if (haloRef2.current) {
      const cycle = ((elapsed * 1.2) + 0.5) % 1.0;
      const scale = 1.0 + cycle * 2.2;
      haloRef2.current.scale.set(scale, scale, scale);
      
      const mat = haloRef2.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1.0 - cycle) * 0.3 * opacityMultiplier;
    }
  });

  // Material memory optimization
  const coreMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.95 * opacityMultiplier,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, opacityMultiplier]);

  const haloMat1 = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.45 * opacityMultiplier,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, opacityMultiplier]);

  const haloMat2 = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.3 * opacityMultiplier,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, opacityMultiplier]);

  // Skin anchor ring material (dark translucent backing ring)
  const anchorMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.5 * opacityMultiplier,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [color, opacityMultiplier]);

  const coreGeom = useMemo(() => new THREE.SphereGeometry(0.016, 16, 16), []);
  const haloGeom = useMemo(() => new THREE.RingGeometry(0.024, 0.026, 32), []);
  const anchorGeom = useMemo(() => new THREE.RingGeometry(0.005, 0.018, 24), []);

  // Compute 3D WebGL line points from local origin (0, 0, 0) to labelOffset
  const lineGeometry = useMemo(() => {
    const offset = acupoint.labelOffset || [0.2, 0, 0];
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(offset[0], offset[1], offset[2]),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [acupoint.labelOffset]);

  // Material for the 3D line
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: showLabel ? (isSelected || isHovered ? 0.9 : 0.45) * opacityMultiplier : 0.0,
    });
  }, [color, isSelected, isHovered, showLabel, opacityMultiplier]);

  // Create dynamic THREE.Line primitive to bypass TypeScript SVG JSX collision
  const dynamicLine = useMemo(() => {
    return new THREE.Line(lineGeometry, lineMaterial);
  }, [lineGeometry, lineMaterial]);

  const labelOffsetPos = acupoint.labelOffset || [0.2, 0, 0];

  return (
    <group
      position={acupoint.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* 1. Core Glowing Sphere */}
      <mesh ref={coreRef} geometry={coreGeom} material={coreMat} />

      {/* 2. Expanding outer halo ring (Billboards towards camera) */}
      <mesh ref={haloRef} geometry={haloGeom} material={haloMat1} />
      
      {/* 3. Second outer halo ring (Offset cycle) */}
      <mesh ref={haloRef2} geometry={haloGeom} material={haloMat2} />

      {/* 4. Skin Anchor ring (Flat on X-Z plane to visually anchor the node to the mesh skin) */}
      <mesh geometry={anchorGeom} material={anchorMat} rotation-x={Math.PI / 2} position-y={-0.002} />

      {/* 5. 3D WebGL connecting line to label offset (primitive wrapper) */}
      <primitive object={dynamicLine} />

      {/* 6. Floating HTML UI Label projected at the 3D labelOffset location */}
      <Html
        position={new THREE.Vector3(labelOffsetPos[0], labelOffsetPos[1], labelOffsetPos[2])}
        distanceFactor={2.4}
        center
        style={{ pointerEvents: "none" }}
        className="transition-all duration-300 select-none animate-fade-in"
      >
        <AcupointLabel
          acupoint={acupoint}
          isHovered={isHovered}
          isSelected={isSelected}
          color={color}
          visible={showLabel}
        />
      </Html>
    </group>
  );
}

function AcupointLabel({
  acupoint,
  isHovered,
  isSelected,
  color,
  visible,
}: {
  acupoint: Acupoint;
  isHovered: boolean;
  isSelected: boolean;
  color: string;
  visible: boolean;
}) {
  const isLeft = (acupoint.labelOffset?.[0] ?? 0) < 0;
  
  // Opacity transitions based on visibility state
  const opacityClass = visible
    ? (isSelected || isHovered ? "opacity-100 scale-105" : "opacity-75 scale-100")
    : "opacity-0 scale-95 pointer-events-none";

  const alignClass = isLeft ? "items-end text-right" : "items-start text-left";
  
  // Offset the text block so it starts next to the WebGL line end
  const transformStyle = isLeft
    ? { transform: "translate(calc(-100% - 6px), -50%)" }
    : { transform: "translate(6px, -50%)" };

  return (
    <div
      style={{
        position: "absolute",
        ...transformStyle,
        width: "130px",
      }}
      className={`flex flex-col gap-0.5 select-none pointer-events-none transition-all duration-300 ${opacityClass} ${alignClass}`}
    >
      <div className="text-[10px] font-bold tracking-wider text-white uppercase font-sans whitespace-nowrap leading-normal">
        {acupoint.name}
      </div>
      <div className="text-[8px] font-semibold tracking-widest uppercase font-mono leading-normal" style={{ color }}>
        {acupoint.code === "Yintang" ? "Extra Point" : acupoint.code.replace(/([A-Z]+)(\d+)/, "$1 $2")}
      </div>
      {acupoint.trName && (
        <div className="text-[7.5px] text-[#a7c0b0]/45 font-light italic leading-normal max-md:hidden">
          {acupoint.trName}
        </div>
      )}
    </div>
  );
}
