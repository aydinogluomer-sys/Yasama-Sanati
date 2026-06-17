import React, { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import HumanModel from "./HumanModel";
import MeridianLines from "./MeridianLines";
import AcupointNodes from "./AcupointNodes";
import AcupointPanel from "./AcupointPanel";
import SceneControls from "./SceneControls";
import MeridianSidebar from "./MeridianSidebar";

import { MERIDIANS } from "../../data/meridians";
import { ACUPOINTS } from "../../data/acupoints";
import { Acupoint } from "../../types/meridian";
import { getCameraFocusTarget, DEFAULT_CAMERA } from "../../utils/cameraFocus";

export default function MeridianScene() {
  const [acupointsList, setAcupointsList] = useState<Acupoint[]>(ACUPOINTS);
  const [calibrationMode, setCalibrationMode] = useState<boolean>(false);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  const [selectedMeridianId, setSelectedMeridianId] = useState<string | null>(null);
  const [selectedAcupoint, setSelectedAcupoint] = useState<Acupoint | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isolateSelected, setIsolateSelected] = useState<boolean>(false);

  const [cameraTargetPos, setCameraTargetPos] = useState<[number, number, number]>(DEFAULT_CAMERA.position);
  const [cameraLookAt, setCameraLookAt] = useState<[number, number, number]>(DEFAULT_CAMERA.target);

  const [glbExists, setGlbExists] = useState<boolean | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const bodyRotationRef = useRef<number>(0);

  // Check if human.glb exists in /public/models/
  useEffect(() => {
    fetch("/models/human.glb", { method: "HEAD" })
      .then((res) => {
        setGlbExists(res.ok);
      })
      .catch(() => {
        setGlbExists(false);
      });
  }, []);

  // Map meridian ID to its specific color for quick lookup
  const meridianColors = useMemo(() => {
    const map: Record<string, string> = {};
    MERIDIANS.forEach((m) => {
      map[m.id] = m.color;
    });
    return map;
  }, []);

  // Sync selectedAcupoint with any coordinates changed inside state
  const activeAcupoint = useMemo(() => {
    if (!selectedAcupoint) return null;
    return acupointsList.find((ap) => ap.id === selectedAcupoint.id) || selectedAcupoint;
  }, [selectedAcupoint, acupointsList]);

  // Update active meridian if acupoint changes
  useEffect(() => {
    if (activeAcupoint) {
      setSelectedMeridianId(activeAcupoint.meridian);
      
      const focusTarget = getCameraFocusTarget(
        activeAcupoint.position,
        bodyRotationRef.current
      );
      setCameraTargetPos(focusTarget.position);
      setCameraLookAt(focusTarget.target);
    } else {
      setCameraTargetPos(DEFAULT_CAMERA.position);
      setCameraLookAt(DEFAULT_CAMERA.target);
    }
  }, [activeAcupoint]);

  // Selected meridian details for the information panel
  const activeMeridian = useMemo(() => {
    if (!activeAcupoint) return null;
    return MERIDIANS.find((m) => m.id === activeAcupoint.meridian) || null;
  }, [activeAcupoint]);

  // Keyboard shortcut key listeners for developer calibration
  useEffect(() => {
    if (!calibrationMode || !selectedAcupoint) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if the user is typing in input fields
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const step = e.altKey ? 0.001 : 0.01;
      let dx = 0;
      let dy = 0;
      let dz = 0;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (e.shiftKey) {
          dz = step; // Move forward/back on Z
        } else {
          dy = step; // Move up/down on Y
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (e.shiftKey) {
          dz = -step;
        } else {
          dy = -step;
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        dx = -step; // Move left/right on X
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        dx = step;
      }

      if (dx !== 0 || dy !== 0 || dz !== 0) {
        setAcupointsList((prev) =>
          prev.map((ap) => {
            if (ap.id === selectedAcupoint.id) {
              return {
                ...ap,
                position: [
                  Number((ap.position[0] + dx).toFixed(4)),
                  Number((ap.position[1] + dy).toFixed(4)),
                  Number((ap.position[2] + dz).toFixed(4)),
                ],
              };
            }
            return ap;
          })
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [calibrationMode, selectedAcupoint]);

  // Coordinate handlers
  const handlePositionChange = (index: number, val: number) => {
    if (!selectedAcupoint) return;
    setAcupointsList((prev) =>
      prev.map((ap) => {
        if (ap.id === selectedAcupoint.id) {
          const newPos = [...ap.position] as [number, number, number];
          newPos[index] = Number(val.toFixed(4));
          return { ...ap, position: newPos };
        }
        return ap;
      })
    );
  };

  const handleOffsetChange = (index: number, val: number) => {
    if (!selectedAcupoint) return;
    setAcupointsList((prev) =>
      prev.map((ap) => {
        if (ap.id === selectedAcupoint.id) {
          const newOffset = [...(ap.labelOffset || [0.2, 0, 0])] as [number, number, number];
          newOffset[index] = Number(val.toFixed(4));
          return { ...ap, labelOffset: newOffset };
        }
        return ap;
      })
    );
  };

  // Copy Clipboard handlers
  const copySinglePosition = () => {
    if (!activeAcupoint) return;
    const data = {
      id: activeAcupoint.id,
      code: activeAcupoint.code,
      position: activeAcupoint.position,
      labelOffset: activeAcupoint.labelOffset,
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      .then(() => {
        setCopiedStatus("Nokta konumu kopyalandı!");
        setTimeout(() => setCopiedStatus(null), 2000);
      });
  };

  const copyAllAcupoints = () => {
    const minified = acupointsList.map(ap => ({
      id: ap.id,
      code: ap.code,
      name: ap.name,
      trName: ap.trName,
      meridian: ap.meridian,
      bodyRegion: ap.bodyRegion,
      side: ap.side,
      position: ap.position,
      labelOffset: ap.labelOffset,
      description: ap.description,
      location: ap.location,
      benefits: ap.benefits,
      caution: ap.caution
    }));
    navigator.clipboard.writeText(JSON.stringify(minified, null, 2))
      .then(() => {
        setCopiedStatus("Tüm noktalar kopyalandı!");
        setTimeout(() => setCopiedStatus(null), 2000);
      });
  };

  // Handle zooming using floating controls
  const handleZoom = (direction: "in" | "out") => {
    if (controlsRef.current) {
      const zoomFactor = direction === "in" ? 0.82 : 1.18;
      const cam = controlsRef.current.object;
      const target = controlsRef.current.target;
      
      const newPos = new THREE.Vector3()
        .subVectors(cam.position, target)
        .multiplyScalar(zoomFactor)
        .add(target);
        
      setCameraTargetPos([newPos.x, newPos.y, newPos.z]);
    }
  };

  const handleResetView = () => {
    setSelectedAcupoint(null);
    setSelectedMeridianId(null);
    setCameraTargetPos(DEFAULT_CAMERA.position);
    setCameraLookAt(DEFAULT_CAMERA.target);
  };

  return (
    <div className="relative w-full h-full bg-[#030806] md:rounded-2xl border border-white/[0.08] overflow-hidden select-none animate-fade-in">
      
      {/* GLB File Validation State */}
      {glbExists === null && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#030806] text-[#a7c0b0]/40 text-xs">
          3D Sahne ve Model Doğrulanıyor...
        </div>
      )}

      {glbExists === false && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#030806]/95 text-center">
          <div className="max-w-md bg-[#0b1411]/90 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="size-16 rounded-full bg-red-950/20 border border-red-500/20 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-[#e0a96d]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium text-lg">Görsel Model Yüklenemedi</h3>
              <p className="text-xs text-[#a7c0b0]/60 font-mono leading-relaxed bg-[#030806] p-3 rounded border border-white/[0.04]">
                Missing /models/human.glb — please add a human GLB model.
              </p>
            </div>
            <p className="text-xs text-[#a7c0b0]/70 leading-relaxed font-light">
              Bu kalite için gerçek bir <code className="text-[#e0a96d] bg-white/5 px-1 py-0.5 rounded font-mono">human.glb</code> asset eklenmelidir. Placeholder (ilkel şekil) modelleriyle premium sonuç alınamaz.
            </p>
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas Layer */}
      {glbExists === true && (
        <Canvas
          camera={{ fov: 26, position: DEFAULT_CAMERA.position }}
          shadows
          gl={{ antialias: true }}
          className="w-full h-full"
        >
          <color attach="background" args={["#030806"]} />
          <fogExp2 attach="fog" args={["#030806", 0.22]} />

          <ambientLight intensity={0.4} />
          
          <spotLight
            position={[0, 4, 2]}
            angle={Math.PI / 6}
            penumbra={0.8}
            intensity={activeAcupoint ? 1.6 : 1.0}
            color={activeAcupoint ? meridianColors[activeAcupoint.meridian] : "#ffffff"}
            castShadow
          />

          <pointLight position={[-2, 1, 0.5]} intensity={0.4} color="#5f7e6f" />
          <pointLight position={[2, 0.5, 0.5]} intensity={0.6} color="#ca7d57" />
          <pointLight position={[0, 1.5, -2.5]} intensity={1.8} color="#e6eed8" />

          {/* Main interactive content group */}
          <Suspense fallback={null}>
            <SceneContent
              acupoints={acupointsList}
              selectedMeridianId={selectedMeridianId}
              selectedAcupointId={activeAcupoint ? activeAcupoint.id : null}
              isolateSelected={isolateSelected}
              meridianColors={meridianColors}
              onSelectAcupoint={setSelectedAcupoint}
              bodyRotationRef={bodyRotationRef}
            />
          </Suspense>

          {/* Camera Lerp Controller */}
          <CameraController
            targetPos={cameraTargetPos}
            targetLookAt={cameraLookAt}
            autoRotate={autoRotate && !activeAcupoint}
            controlsRef={controlsRef}
          />
        </Canvas>
      )}

      {/* HTML Sidebar Overlay */}
      <MeridianSidebar
        meridians={MERIDIANS}
        acupoints={acupointsList}
        selectedMeridianId={selectedMeridianId}
        selectedAcupointId={activeAcupoint ? activeAcupoint.id : null}
        onSelectMeridian={setSelectedMeridianId}
        onSelectAcupoint={setSelectedAcupoint}
        meridianColors={meridianColors}
        calibrationMode={calibrationMode}
        onToggleCalibration={() => setCalibrationMode(!calibrationMode)}
      />

      {/* HTML Acupoint Details Card Overlay */}
      <AcupointPanel
        acupoint={activeAcupoint}
        onClose={() => setSelectedAcupoint(null)}
        meridianName={activeMeridian ? activeMeridian.name : ""}
        meridianColor={activeMeridian ? activeMeridian.color : ""}
      />

      {/* HTML Floating Controls Overlay */}
      <SceneControls
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onResetView={handleResetView}
        onZoomIn={() => handleZoom("in")}
        onZoomOut={() => handleZoom("out")}
        isolateSelected={isolateSelected}
        onToggleIsolate={() => setIsolateSelected(!isolateSelected)}
        hasSelection={selectedMeridianId !== null}
      />

      {/* 🔧 Developer Calibration Overlay Panel */}
      {calibrationMode && (
        <div className="absolute top-4 left-[236px] right-[400px] z-50 pointer-events-auto max-md:left-4 max-md:right-4 max-md:top-24">
          <div className="bg-[#0b1411]/90 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <div className="flex items-center gap-2">
                <span className="animate-pulse size-2 rounded-full bg-amber-500" />
                <span className="font-bold tracking-wider text-amber-400 uppercase font-sans">AKUPRESÜR KALİBRASYON PANELİ</span>
              </div>
              <button
                onClick={() => setCalibrationMode(false)}
                className="text-[#a7c0b0]/40 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {activeAcupoint ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm block">{activeAcupoint.name}</span>
                    <span className="text-[10px] text-amber-500 font-mono">{activeAcupoint.code} · {activeAcupoint.meridian.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copySinglePosition}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Konumu Kopyala
                    </button>
                    <button
                      onClick={copyAllAcupoints}
                      className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-400 hover:bg-amber-500/30 transition-colors cursor-pointer"
                    >
                      Tümünü Kopyala
                    </button>
                  </div>
                </div>

                {copiedStatus && (
                  <div className="text-center bg-emerald-500/10 border border-emerald-500/20 rounded p-1.5 text-emerald-400 font-medium text-[10px]">
                    {copiedStatus}
                  </div>
                )}

                {/* Coordinate Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Position Coordinates */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-white/50 uppercase block font-sans">Nokta Koordinatı (Position)</span>
                    <div className="space-y-1.5">
                      {["X (Sağ/Sol)", "Y (Yukarı/Aşağı)", "Z (Ön/Arka)"].map((axis, i) => (
                        <div key={axis} className="flex items-center justify-between gap-2">
                          <label className="text-[10px] text-[#a7c0b0]/60 font-mono">{axis}</label>
                          <input
                            type="number"
                            value={activeAcupoint.position[i]}
                            step="0.001"
                            onChange={(e) => handlePositionChange(i, parseFloat(e.target.value) || 0)}
                            className="w-20 bg-black/40 border border-white/[0.08] rounded px-1.5 py-0.5 text-right font-mono text-white text-[10px] focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LabelOffset Coordinates */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-white/50 uppercase block font-sans">Etiket Ofseti (LabelOffset)</span>
                    <div className="space-y-1.5">
                      {["X Ofset", "Y Ofset", "Z Ofset"].map((axis, i) => (
                        <div key={axis} className="flex items-center justify-between gap-2">
                          <label className="text-[10px] text-[#a7c0b0]/60 font-mono">{axis}</label>
                          <input
                            type="number"
                            value={(activeAcupoint.labelOffset || [0.2, 0, 0])[i]}
                            step="0.001"
                            onChange={(e) => handleOffsetChange(i, parseFloat(e.target.value) || 0)}
                            className="w-20 bg-black/40 border border-white/[0.08] rounded px-1.5 py-0.5 text-right font-mono text-white text-[10px] focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Keyboard controls instructions */}
                <div className="bg-black/30 border border-white/[0.03] rounded p-2.5 space-y-1 font-mono text-[9px] text-[#a7c0b0]/50">
                  <span className="text-[10px] font-bold text-[#a7c0b0]/70 uppercase block font-sans">KLAVYE KONTROLLERİ</span>
                  <div>⬆️ / ⬇️ : Y Ekseni (Yükseklik)</div>
                  <div>⬅️ / ➡️ : X Ekseni (Genişlik)</div>
                  <div>Shift + ⬆️/⬇️ : Z Ekseni (Derinlik)</div>
                  <div>Alt + Tuş : İnce Ayar (0.001 adım)</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-[#a7c0b0]/50 leading-relaxed font-light">
                Kalibre etmek istediğiniz akupresür noktasını listeden veya model üzerinden seçin.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tech Overlay lines */}
      <div className="absolute bottom-4 left-4 pointer-events-none text-[9px] text-[#a7c0b0]/40 font-mono space-y-0.5 max-md:hidden">
        <div>SYS.RENDER: WebGL2 / ReactThreeFiber</div>
        <div>SYS.MODEL: Holographic Human Mesh v1.0</div>
      </div>
    </div>
  );
}

// Subcomponent to wrap models inside the Canvas for useFrame access
function SceneContent({
  acupoints,
  selectedMeridianId,
  selectedAcupointId,
  isolateSelected,
  meridianColors,
  onSelectAcupoint,
  bodyRotationRef,
}: {
  acupoints: Acupoint[];
  selectedMeridianId: string | null;
  selectedAcupointId: string | null;
  isolateSelected: boolean;
  meridianColors: Record<string, string>;
  onSelectAcupoint: (ap: Acupoint) => void;
  bodyRotationRef: React.MutableRefObject<number>;
}) {
  const modelGroupRef = useRef<THREE.Group>(null);

  // Track rotation to dynamically calculate camera zoom orientation
  useFrame(() => {
    if (modelGroupRef.current) {
      bodyRotationRef.current = modelGroupRef.current.rotation.y;
    }
  });

  return (
    <group ref={modelGroupRef}>
      {/* 1. Translucent/Glow Human Form */}
      <HumanModel />

      {/* 2. Tube-curved Meridian pathways */}
      <MeridianLines
        meridians={MERIDIANS}
        acupoints={acupoints}
        selectedId={selectedMeridianId}
        isolateSelected={isolateSelected}
      />

      {/* 3. Acupressure Node elements */}
      <AcupointNodes
        acupoints={acupoints}
        selectedId={selectedAcupointId}
        selectedMeridianId={selectedMeridianId}
        meridianColors={meridianColors}
        onSelect={onSelectAcupoint}
      />

      {/* 4. Holographic Floor Platform */}
      <HolographicPlatform />

      {/* 5. Ambient energy sparks */}
      <EnergyParticles />

      {/* 6. Mockup-style surrounding aura rings */}
      <DecorativeAuraRings />
    </group>
  );
}

// Camera control helper
function CameraController({
  targetPos,
  targetLookAt,
  autoRotate,
  controlsRef,
}: {
  targetPos: [number, number, number];
  targetLookAt: [number, number, number];
  autoRotate: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controlsRef: React.MutableRefObject<any>;
}) {
  const tPos = useMemo(() => new THREE.Vector3(...targetPos), [targetPos]);
  const tLook = useMemo(() => new THREE.Vector3(...targetLookAt), [targetLookAt]);

  useFrame((state) => {
    state.camera.position.lerp(tPos, 0.05);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(tLook, 0.05);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={1.0}
      maxDistance={7.5}
      autoRotate={autoRotate}
      autoRotateSpeed={0.3}
      maxPolarAngle={Math.PI / 1.7} // Prevent rotating below the floor platform
    />
  );
}

// Decorative concentric rings centered around the torso
function DecorativeAuraRings() {
  const ringGeom = useMemo(() => new THREE.RingGeometry(0.72, 0.725, 80), []);

  const goldMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#e0a96d"),
        transparent: true,
        opacity: 0.09,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const greenMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#a7c0b0"),
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Vertical frontal ring */}
      <mesh geometry={ringGeom} material={goldMat} />

      {/* 2. Vertical profile ring */}
      <mesh geometry={ringGeom} material={greenMat} rotation-y={Math.PI / 2} />

      {/* 3. Horizontal waist ring */}
      <mesh geometry={ringGeom} material={greenMat} rotation-x={Math.PI / 2} scale={[1.15, 1.15, 1.15]} />
    </group>
  );
}

// Procedural Holographic Platform
function HolographicPlatform() {
  const floorGeom = useMemo(() => new THREE.CylinderGeometry(0.52, 0.55, 0.02, 32), []);
  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x07110d,
        roughness: 0.85,
        metalness: 0.1,
      }),
    []
  );

  const ringGeom = useMemo(() => new THREE.RingGeometry(0.53, 0.54, 64), []);
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xe0a96d,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const gridGeom = useMemo(() => new THREE.RingGeometry(0.64, 0.65, 64), []);
  const gridMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xa7c0b0,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.05,
      }),
    []
  );

  return (
    <group position={[0, -1.02, 0]}>
      {/* Dark physical disc */}
      <mesh geometry={floorGeom} material={floorMat} receiveShadow />
      
      {/* Glowing gold inner ring */}
      <mesh geometry={ringGeom} material={ringMat} rotation-x={Math.PI / 2} position-y={0.011} />
      
      {/* Outer concentric grid ring */}
      <mesh geometry={gridGeom} material={gridMat} rotation-x={Math.PI / 2} position-y={0.011} />
    </group>
  );
}

// Rising atmospheric energy dust particles
function EnergyParticles() {
  const count = 180;
  const geomRef = useRef<THREE.BufferGeometry>(null);

  // Generate initial random particles inside a cylinder
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.5; // Stay near the platform radius
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -1.02 + Math.random() * 2.12;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      spd[i] = 0.0015 + Math.random() * 0.0025;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    if (geomRef.current) {
      const posAttr = geomRef.current.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        let y = posAttr.getY(i);
        y += speeds[i]; // Move upwards
        
        if (y > 1.1) {
          y = -1.02;
        }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    }
  });

  const pTex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(167, 192, 176, 0.6)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const pMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.008,
        transparent: true,
        opacity: 0.35,
        map: pTex,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [pTex]
  );

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <primitive object={pMat} />
    </points>
  );
}
