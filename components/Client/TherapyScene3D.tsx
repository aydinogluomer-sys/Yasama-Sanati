"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/** Standing-anatomy chakra heights as fractions of body height (feet = 0, crown of head = 1). */
const CHAKRA_HEIGHT_FRACTIONS: Record<string, number> = {
  crown: 1.03,
  third_eye: 0.925,
  throat: 0.845,
  heart: 0.715,
  solar: 0.615,
  sacral: 0.525,
  root: 0.465,
};

interface ChakraZone {
  id: string;
  name: string;
  sanskritName: string;
  color: string;
  position: [number, number, number];
  emotion: string;
  therapy: string;
  bodyArea: string;
  meridians: string[];
  desc: string;
}

const CHAKRA_ZONES: ChakraZone[] = [
  {
    id: "crown",
    name: "Taç Çakra",
    sanskritName: "Sahasrara",
    color: "#a855f7",
    position: [0, 1.78, 0],
    emotion: "İlahi Bağ & Anlam",
    therapy: "Transpersonal çalışma, meditasyon, vizyon çalışması",
    bodyArea: "Tepe, beyin kabuğu, sinir sistemi",
    meridians: ["Tüm meridyanlar — bütünleşik merkez"],
    desc: "Varoluşsal anlam arayışı ve evrensel bilinçle bağlantının merkezi. Terapi sürecinde bu çakranın açılması derin içgörü, kabul ve yaşamda anlam kazanımı getirir. Egzistansiyel kriz ve amaç kaybı yaşayan danışanlarda öncelikli çalışma noktasıdır.",
  },
  {
    id: "third_eye",
    name: "Üçüncü Göz",
    sanskritName: "Ajna",
    color: "#6366f1",
    position: [0, 1.60, 0.13],
    emotion: "Sezgi & Netlik",
    therapy: "Bilinçaltı çalışma, hipnoterapi, iç görüntüleme",
    bodyArea: "Alın, pineal bez, göz kasları",
    meridians: ["Safra Kesesi (GB)", "Mesane (BL)"],
    desc: "İç görü, sezgi ve zihinsel netliğin merkezi. Kronik belirsizlik, karar verememe ve sürekli zihin karmaşası yaşayan danışanlarda bu bölge bloke olur. Hipnoterapi ve bilinçaltı görüntüleme seanslarında birincil odak noktası.",
  },
  {
    id: "throat",
    name: "Boğaz Çakrası",
    sanskritName: "Vishuddha",
    color: "#06b6d4",
    position: [0, 1.42, 0.08],
    emotion: "İfade & Özgünlük",
    therapy: "Ses terapisi, anlatı çalışması, sınır koyma",
    bodyArea: "Boğaz, boyun, tiroid bezi",
    meridians: ["Akciğer (LU)", "Kalın Bağırsak (LI)"],
    desc: "Kendini ifade etme, gerçeği söyleme ve özgün ses bulmanın merkezi. İçini dökelememe, kronik boğaz gerginliği ve sınır koyma güçlüğü bu bölgede blokaj işareti verir. Terapi sürecinde güvenli anlatı alanı oluşturmak bu çakrayı besler.",
  },
  {
    id: "heart",
    name: "Kalp Çakrası",
    sanskritName: "Anahata",
    color: "#22c55e",
    position: [0, 1.12, 0.1],
    emotion: "Sevgi & Şifa",
    therapy: "Travma iyileştirme, bağlanma çalışması, af süreci",
    bodyArea: "Kalp, akciğerler, el ve kollar",
    meridians: ["Kalp (HT)", "Perikart (PC)", "Karaciğer (LR)"],
    desc: "Duygusal iyileşmenin ve bağlanma kapasitesinin merkezi. Kayıp, reddedilme, ilişki travmaları burada depolanır. Bütünsel terapi çalışmalarında kalp çakrası hem birincil ağrı noktası hem de iyileşme portalidir. Öz-şefkat pratikleri bu merkezi besler.",
  },
  {
    id: "solar",
    name: "Solar Pleksus",
    sanskritName: "Manipura",
    color: "#eab308",
    position: [0, 0.88, 0.1],
    emotion: "Güç & Kimlik",
    therapy: "Güç geri alma çalışması, sınır netleştirme, öz saygı",
    bodyArea: "Mide, pankreas, sindirim organları",
    meridians: ["Mide (ST)", "Dalak (SP)"],
    desc: "Kişisel güç, öz-kimlik ve iraden merkezi. Kaygı bozukluğu, kontrol ihtiyacı, sürekli mide gerginliği ve başkalarını memnun etme zorunluluğu bu bölgenin dengesizliğini gösterir. Sınır koyma ve öz saygı çalışmaları solar pleksusu güçlendirir.",
  },
  {
    id: "sacral",
    name: "Sakral Çakra",
    sanskritName: "Svadhisthana",
    color: "#f97316",
    position: [0, 0.6, 0.07],
    emotion: "Yaratıcılık & Haz",
    therapy: "Beden farkındalığı, duygu akışı, yaratıcı ifade",
    bodyArea: "Alt karın, üreme organları, bel bölgesi",
    meridians: ["Böbrek (KI)", "Mesane (BL)"],
    desc: "Duygu akışı, yaratıcılık, zevk kapasitesi ve ilişkiselliğin merkezi. Duygusal uyuşukluk, cinsellik ile ilgili şame, yaratıcılık blokajı bu merkezi etkiler. Beden temelli terapi ve somatik çalışmalar bu bölgeyi canlandırır.",
  },
  {
    id: "root",
    name: "Kök Çakra",
    sanskritName: "Muladhara",
    color: "#ef4444",
    position: [0, 0.32, 0.05],
    emotion: "Güvenlik & Köklenme",
    therapy: "Topraklama, beden oryantasyonu, güvenli alan yaratma",
    bodyArea: "Perine, alt omurga, bacaklar, ayaklar",
    meridians: ["Böbrek (KI)", "Mesane (BL)", "Karaciğer (LR)"],
    desc: "Varoluşsal güvenlik, ait olma ve hayatta kalma içgüdülerinin temel merkezi. Erken yaşam travmaları, ihmal ve güvensiz bağlanma örüntüleri burada kök salar. Tüm terapi çalışmalarının temeli: danışan önce güvende hissetmeli. Topraklama egzersizleri kök çakradan başlar.",
  },
];

export default function TherapyScene3D() {
  const [selectedZone, setSelectedZone] = useState<ChakraZone>(CHAKRA_ZONES[3]); // default: heart
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const selectedNodeRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<{
    group: THREE.Group | null;
    chakraNodes: Map<string, THREE.Mesh>;
    halos: Map<string, THREE.Mesh[]>;
    auras: Map<string, THREE.Mesh>;
    targetRotY: number;
    targetRotX: number;
    isDragging: boolean;
    prevPointer: { x: number; y: number };
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    particles: THREE.Points | null;
    spotLight: THREE.SpotLight | null;
  }>({
    group: null,
    chakraNodes: new Map(),
    halos: new Map(),
    auras: new Map(),
    targetRotY: 0,
    targetRotX: 0,
    isDragging: false,
    prevPointer: { x: 0, y: 0 },
    targetCamPos: new THREE.Vector3(0, 0.9, 2.8),
    targetLookAt: new THREE.Vector3(0, 0.9, 0),
    currentLookAt: new THREE.Vector3(0, 0.9, 0),
    particles: null,
    spotLight: null,
  });

  useEffect(() => setIsClient(true), []);

  // Re-highlight active chakra when selectedZone changes without reiniting scene
  useEffect(() => {
    if (!isClient) return;
    const { chakraNodes, halos, auras } = sceneRef.current;
    chakraNodes.forEach((node, id) => {
      const isActive = id === selectedZone.id;
      (node.material as THREE.MeshBasicMaterial).opacity = isActive ? 1.0 : 0.35;
      (node.material as THREE.MeshBasicMaterial).color.set(
        isActive ? new THREE.Color(selectedZone.color) : new THREE.Color("#ced1bf")
      );

      const zoneHalos = halos.get(id) || [];
      zoneHalos.forEach((h) => {
        const zone = CHAKRA_ZONES.find((z) => z.id === id);
        (h.material as THREE.MeshBasicMaterial).color.set(zone?.color || "#ced1bf");
        (h.material as THREE.MeshBasicMaterial).opacity = isActive ? 0.3 : 0.0;
      });

      const aura = auras.get(id);
      if (aura) {
        (aura.material as THREE.MeshBasicMaterial).opacity = isActive ? 0.12 : 0.0;
      }
    });

    // Update spot light color
    if (sceneRef.current.spotLight) {
      sceneRef.current.spotLight.color.set(selectedZone.color);
    }
  }, [selectedZone, isClient]);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 600;

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a2420");
    scene.fog = new THREE.FogExp2("#1a2420", 0.18);

    // ── Camera ───────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 20);
    camera.position.copy(sceneRef.current.targetCamPos);

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── Lighting ─────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);

    const spotLight = new THREE.SpotLight(
      new THREE.Color(selectedZone.color),
      2.5
    );
    spotLight.position.set(0, 4, 1.5);
    spotLight.target.position.set(0, 0.9, 0);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 0.7;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(1024, 1024);
    scene.add(spotLight);
    scene.add(spotLight.target);
    sceneRef.current.spotLight = spotLight;

    const warmFill = new THREE.PointLight(0xca7d57, 0.8);
    warmFill.position.set(-1.8, 1.5, 0.5);
    scene.add(warmFill);

    const coolFill = new THREE.PointLight(0x4488aa, 0.4);
    coolFill.position.set(1.8, 0.8, -0.5);
    scene.add(coolFill);

    const backRim = new THREE.PointLight(0x334455, 0.6);
    backRim.position.set(0, 2, -2);
    scene.add(backRim);

    // ── Environment: Floor ───────────────────────────────────────────────────
    const floorGeom = new THREE.CircleGeometry(2.4, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x243028,
      roughness: 0.9,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.92;
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor glow ring
    const ringGeom = new THREE.RingGeometry(0.55, 0.56, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xced1bf,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.91;
    scene.add(ring);

    // Inner platform disc
    const discGeom = new THREE.CircleGeometry(0.5, 64);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x2c3d35,
      roughness: 0.7,
      metalness: 0.1,
    });
    const disc = new THREE.Mesh(discGeom, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -0.915;
    disc.receiveShadow = true;
    scene.add(disc);

    // Meditation cushion
    const cushionGeom = new THREE.CylinderGeometry(0.22, 0.24, 0.07, 32);
    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x4a5e52,
      roughness: 0.85,
    });
    const cushion = new THREE.Mesh(cushionGeom, cushionMat);
    cushion.position.set(0, -0.89, 0);
    cushion.castShadow = true;
    cushion.receiveShadow = true;
    scene.add(cushion);

    // ── Ambient Floating Particles ────────────────────────────────────────────
    const pCount = 320;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 1.6;
      pPositions[i * 3] = Math.cos(angle) * radius;
      pPositions[i * 3 + 1] = -0.9 + Math.random() * 3.2;
      pPositions[i * 3 + 2] = Math.sin(angle) * radius - 0.2;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xced1bf,
      size: 0.007,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);
    sceneRef.current.particles = particles;

    // ── Main Group (rotatable) ────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);
    sceneRef.current.group = group;

    // ── Human Figure ─────────────────────────────────────────────────────────
    // Primary: anatomical GLB model (shared asset with the meridian scene), normalized to the
    // scene and re-skinned with the translucent energy-body material. The primitive meditation
    // figure below stays as the immediate paint + fallback if the GLB fails to load.

    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0x3d5248,
      transparent: true,
      opacity: 0.18,
      roughness: 0.25,
      metalness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xced1bf,
      wireframe: true,
      transparent: true,
      opacity: 0.045,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const figureGroup = new THREE.Group();
    group.add(figureGroup);

    const addBodyPart = (
      geom: THREE.BufferGeometry,
      pos: [number, number, number],
      rot: [number, number, number] = [0, 0, 0],
      scale: [number, number, number] = [1, 1, 1]
    ) => {
      const mesh = new THREE.Mesh(geom, skinMat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh.scale.set(...scale);
      mesh.castShadow = true;
      figureGroup.add(mesh);

      const wire = new THREE.Mesh(geom, wireMat);
      wire.position.set(...pos);
      wire.rotation.set(...rot);
      wire.scale.set(scale[0] * 1.012, scale[1] * 1.012, scale[2] * 1.012);
      figureGroup.add(wire);
    };

    // Head with more detail
    addBodyPart(new THREE.SphereGeometry(0.135, 28, 28), [0, 1.33, 0]);
    // Neck
    addBodyPart(new THREE.CylinderGeometry(0.058, 0.07, 0.115, 18), [0, 1.185, 0]);
    // Clavicle area
    addBodyPart(new THREE.CylinderGeometry(0.145, 0.13, 0.08, 20), [0, 1.1, 0]);
    // Upper torso
    addBodyPart(new THREE.CylinderGeometry(0.155, 0.145, 0.32, 20), [0, 0.935, 0]);
    // Lower torso
    addBodyPart(new THREE.CylinderGeometry(0.145, 0.13, 0.32, 20), [0, 0.615, 0]);
    // Pelvis
    addBodyPart(new THREE.CylinderGeometry(0.13, 0.15, 0.18, 20), [0, 0.37, 0]);

    // Sitting legs — bent at knee
    // Upper leg (thigh) angled forward
    addBodyPart(
      new THREE.CylinderGeometry(0.068, 0.052, 0.48, 14),
      [0.13, 0.14, 0.22],
      [-Math.PI / 2.4, 0, 0.1]
    );
    addBodyPart(
      new THREE.CylinderGeometry(0.068, 0.052, 0.48, 14),
      [-0.13, 0.14, 0.22],
      [-Math.PI / 2.4, 0, -0.1]
    );
    // Knee to lower leg
    addBodyPart(
      new THREE.CylinderGeometry(0.052, 0.036, 0.42, 12),
      [0.15, -0.1, 0.42],
      [Math.PI / 5, 0, 0.05]
    );
    addBodyPart(
      new THREE.CylinderGeometry(0.052, 0.036, 0.42, 12),
      [-0.15, -0.1, 0.42],
      [Math.PI / 5, 0, -0.05]
    );
    // Feet
    addBodyPart(new THREE.SphereGeometry(0.048, 14, 10), [0.18, -0.26, 0.55], [0, 0, 0], [1, 0.6, 1.4]);
    addBodyPart(new THREE.SphereGeometry(0.048, 14, 10), [-0.18, -0.26, 0.55], [0, 0, 0], [1, 0.6, 1.4]);

    // Arms — resting on knees (meditation pose)
    // Upper arm
    addBodyPart(
      new THREE.CylinderGeometry(0.044, 0.034, 0.44, 12),
      [0.22, 0.88, 0.04],
      [0, 0, -Math.PI / 3.2]
    );
    addBodyPart(
      new THREE.CylinderGeometry(0.044, 0.034, 0.44, 12),
      [-0.22, 0.88, 0.04],
      [0, 0, Math.PI / 3.2]
    );
    // Forearm — bent forward & down toward knees
    addBodyPart(
      new THREE.CylinderGeometry(0.034, 0.024, 0.4, 12),
      [0.41, 0.67, 0.18],
      [Math.PI / 5, 0, -Math.PI / 6]
    );
    addBodyPart(
      new THREE.CylinderGeometry(0.034, 0.024, 0.4, 12),
      [-0.41, 0.67, 0.18],
      [Math.PI / 5, 0, Math.PI / 6]
    );
    // Hands open, resting on knees
    addBodyPart(new THREE.SphereGeometry(0.036, 12, 10), [0.5, 0.5, 0.34], [0, 0, 0], [1.1, 0.7, 1.3]);
    addBodyPart(new THREE.SphereGeometry(0.036, 12, 10), [-0.5, 0.5, 0.34], [0, 0, 0], [1.1, 0.7, 1.3]);

    // ── Central Energy Column (spine) ────────────────────────────────────────
    const buildSpinePoints = (fromY: number, toY: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < 30; i++) {
        const t = i / 29;
        pts.push(new THREE.Vector3(
          Math.sin(t * 0.4) * 0.015,
          fromY + t * (toY - fromY),
          0.02
        ));
      }
      return pts;
    };
    let spinePoints = buildSpinePoints(0.3, 1.7);
    const spineGeom = new THREE.BufferGeometry().setFromPoints(spinePoints);
    const spineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Line(spineGeom, spineMat));

    // ── Chakra Nodes ─────────────────────────────────────────────────────────
    const chakraNodesMap = new Map<string, THREE.Mesh>();
    const halosMap = new Map<string, THREE.Mesh[]>();
    const aurasMap = new Map<string, THREE.Mesh>();
    const pointsGroup = new THREE.Group();
    group.add(pointsGroup);

    CHAKRA_ZONES.forEach((zone) => {
      const isActive = zone.id === selectedZone.id;
      const zoneColor = new THREE.Color(zone.color);

      // Core node
      const nodeGeom = new THREE.SphereGeometry(0.028, 20, 20);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: isActive ? zoneColor : new THREE.Color("#ced1bf"),
        transparent: true,
        opacity: isActive ? 1.0 : 0.35,
        blending: THREE.AdditiveBlending,
      });
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.set(...zone.position);
      node.userData = { zone };
      pointsGroup.add(node);
      chakraNodesMap.set(zone.id, node);

      // Halo rings (2 per node)
      const nodeHalos: THREE.Mesh[] = [];
      [0.055, 0.085].forEach((r, i) => {
        const hGeom = new THREE.SphereGeometry(r, 20, 20);
        const hMat = new THREE.MeshBasicMaterial({
          color: zoneColor,
          transparent: true,
          opacity: isActive ? (i === 0 ? 0.3 : 0.15) : 0.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const halo = new THREE.Mesh(hGeom, hMat);
        halo.position.set(...zone.position);
        pointsGroup.add(halo);
        nodeHalos.push(halo);
      });
      halosMap.set(zone.id, nodeHalos);

      // Large aura sphere
      const aGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const aMat = new THREE.MeshBasicMaterial({
        color: zoneColor,
        transparent: true,
        opacity: isActive ? 0.12 : 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      });
      const aura = new THREE.Mesh(aGeom, aMat);
      aura.position.set(...zone.position);
      pointsGroup.add(aura);
      aurasMap.set(zone.id, aura);
    });

    sceneRef.current.chakraNodes = chakraNodesMap;
    sceneRef.current.halos = halosMap;
    sceneRef.current.auras = aurasMap;

    // ── Energy Flow Lines between chakras ────────────────────────────────────
    const flowLinePoints = CHAKRA_ZONES.map((z) => new THREE.Vector3(...z.position));
    const flowLineGeom = new THREE.BufferGeometry().setFromPoints(flowLinePoints);
    const flowLineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Line(flowLineGeom, flowLineMat));

    // ── Floating energy particles along spine ─────────────────────────────────
    const spineParticleCount = 60;
    const spineParticlePos = new Float32Array(spineParticleCount * 3);
    let spineParticleCurve = new THREE.CatmullRomCurve3(spinePoints);

    // ── Camera home (updated when the GLB re-lays the anatomy) ────────────────
    const homeLookAt = new THREE.Vector3(0, 0.9, 0);
    const homeCamPos = new THREE.Vector3(0, 0.9, 2.8);

    // Re-lay chakra nodes/halos/auras, spine and flow line onto a standing body
    // spanning [feetY, feetY + bodyHeight].
    const placeChakrasOnBody = (feetY: number, bodyHeight: number) => {
      CHAKRA_ZONES.forEach((zone) => {
        const f = CHAKRA_HEIGHT_FRACTIONS[zone.id];
        if (f === undefined) return;
        const y = feetY + f * bodyHeight;
        const node = chakraNodesMap.get(zone.id);
        if (node) node.position.set(zone.position[0], y, zone.position[2]);
        (halosMap.get(zone.id) || []).forEach((h) => h.position.set(zone.position[0], y, zone.position[2]));
        const aura = aurasMap.get(zone.id);
        if (aura) aura.position.set(zone.position[0], y, zone.position[2]);
      });
      const rootY = feetY + CHAKRA_HEIGHT_FRACTIONS.root * bodyHeight;
      const crownY = feetY + CHAKRA_HEIGHT_FRACTIONS.crown * bodyHeight;
      spinePoints = buildSpinePoints(rootY, crownY);
      spineGeom.setFromPoints(spinePoints);
      spineParticleCurve = new THREE.CatmullRomCurve3(spinePoints);
      const newFlowPoints: THREE.Vector3[] = [];
      CHAKRA_ZONES.forEach((zone) => {
        const node = chakraNodesMap.get(zone.id);
        if (node) newFlowPoints.push(node.position.clone());
      });
      flowLineGeom.setFromPoints(newFlowPoints);
      const heartY = feetY + CHAKRA_HEIGHT_FRACTIONS.heart * bodyHeight;
      homeLookAt.set(0, heartY, 0);
      homeCamPos.set(0, heartY + 0.1, 2.9);
      sceneRef.current.targetLookAt.copy(homeLookAt);
      sceneRef.current.targetCamPos.copy(homeCamPos);
    };

    // ── Anatomical GLB model (upgrade path; primitives remain as fallback) ────
    const FLOOR_Y = -0.92;
    const GLB_BODY_HEIGHT = 2.35;
    let glbRoot: THREE.Group | null = null;
    let glbBaseScale = 1;
    let glbMixer: THREE.AnimationMixer | null = null;
    const glbGeometries: THREE.BufferGeometry[] = [];
    new GLTFLoader().load(
      "/models/human.glb",
      (gltf) => {
        const model = gltf.scene;
        // Skeletal idle-breathing if the clip survived optimization; procedural fallback otherwise.
        const idleClip = gltf.animations.find((c) => c.name === "Idle_Loop");
        if (idleClip) {
          glbMixer = new THREE.AnimationMixer(model);
          glbMixer.clipAction(idleClip).play();
        }
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        const rawHeight = size.y > 0 ? size.y : 1;
        glbBaseScale = GLB_BODY_HEIGHT / rawHeight;
        model.scale.setScalar(glbBaseScale);
        model.position.set(
          -center.x * glbBaseScale,
          FLOOR_Y - box.min.y * glbBaseScale,
          -center.z * glbBaseScale
        );
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            glbGeometries.push(mesh.geometry);
            mesh.material = skinMat;
            mesh.castShadow = true;
          }
        });
        figureGroup.visible = false;
        cushion.visible = false;
        group.add(model);
        glbRoot = model;
        placeChakrasOnBody(FLOOR_Y, GLB_BODY_HEIGHT);
      },
      undefined,
      () => {
        // GLB unavailable — the primitive meditation figure stays visible.
      }
    );
    for (let i = 0; i < spineParticleCount; i++) {
      const p = spineParticleCurve.getPointAt(i / spineParticleCount);
      spineParticlePos[i * 3] = p.x;
      spineParticlePos[i * 3 + 1] = p.y;
      spineParticlePos[i * 3 + 2] = p.z;
    }
    const spParticleGeom = new THREE.BufferGeometry();
    spParticleGeom.setAttribute("position", new THREE.BufferAttribute(spineParticlePos, 3));
    const spParticleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.016,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const spineParticles = new THREE.Points(spParticleGeom, spParticleMat);
    group.add(spineParticles);

    // ── Pointer / Camera Controls ─────────────────────────────────────────────
    const handlePointerDown = (e: PointerEvent) => {
      sceneRef.current.isDragging = true;
      sceneRef.current.prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(mx, my), camera);
      const hits = ray.intersectObjects(pointsGroup.children);
      const nodeHit = hits.find((h) => h.object.userData.zone);
      container.style.cursor = nodeHit
        ? "pointer"
        : sceneRef.current.isDragging
        ? "grabbing"
        : "grab";

      if (!sceneRef.current.isDragging) return;
      const dx = e.clientX - sceneRef.current.prevPointer.x;
      const dy = e.clientY - sceneRef.current.prevPointer.y;
      sceneRef.current.targetRotY += dx * 0.007;
      sceneRef.current.targetRotX += dy * 0.007;
      sceneRef.current.targetRotX = Math.max(-0.55, Math.min(0.55, sceneRef.current.targetRotX));
      sceneRef.current.prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      sceneRef.current.isDragging = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(mx, my), camera);
      const hits = ray.intersectObjects(pointsGroup.children);
      const nodeHit = hits.find((h) => h.object.userData.zone);

      if (nodeHit) {
        const zone = nodeHit.object.userData.zone as ChakraZone;
        setSelectedZone(zone);
        selectedNodeRef.current = nodeHit.object as THREE.Mesh;

        const worldPos = new THREE.Vector3();
        nodeHit.object.getWorldPosition(worldPos);
        sceneRef.current.targetLookAt.copy(worldPos);

        const offset = new THREE.Vector3(0, 0.1, 0.9);
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), group.rotation.y);
        sceneRef.current.targetCamPos.copy(worldPos).add(offset);
      } else {
        selectedNodeRef.current = null;
        sceneRef.current.targetLookAt.copy(homeLookAt);
        sceneRef.current.targetCamPos.copy(homeCamPos);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = new THREE.Vector3().subVectors(camera.position, sceneRef.current.targetLookAt).normalize();
      const dist = camera.position.distanceTo(sceneRef.current.targetLookAt);
      const newDist = Math.max(1.2, Math.min(5.0, dist + e.deltaY * 0.005));
      sceneRef.current.targetCamPos.copy(sceneRef.current.targetLookAt).addScaledVector(dir, newDist);
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("click", handleClick);
    container.addEventListener("wheel", handleWheel, { passive: false });

    // ── Animation Loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;

      // Breathing: skeletal Idle_Loop when available, procedural micro-scale otherwise.
      if (glbMixer) {
        glbMixer.update(delta);
      } else if (glbRoot) {
        glbRoot.scale.y = glbBaseScale * (1 + Math.sin(elapsed * 0.9) * 0.005);
      }

      // Auto-rotate when idle
      if (!sceneRef.current.isDragging && !selectedNodeRef.current) {
        sceneRef.current.targetRotY += 0.0018;
      }

      group.rotation.y += (sceneRef.current.targetRotY - group.rotation.y) * 0.07;
      group.rotation.x += (sceneRef.current.targetRotX - group.rotation.x) * 0.07;

      camera.position.lerp(sceneRef.current.targetCamPos, 0.065);
      sceneRef.current.currentLookAt.lerp(sceneRef.current.targetLookAt, 0.065);
      camera.lookAt(sceneRef.current.currentLookAt);

      // Animate chakra halos
      chakraNodesMap.forEach((node, id) => {
        const zoneHalos = halosMap.get(id) || [];
        const isActive = id === selectedZone.id;
        zoneHalos.forEach((h, i) => {
          if (isActive) {
            const pulse = 1.0 + Math.sin(elapsed * 3.5 + i * Math.PI) * 0.22;
            h.scale.setScalar(pulse);
          }
        });

        const aura = aurasMap.get(id);
        if (aura && isActive) {
          const auraS = 1.0 + Math.sin(elapsed * 1.8) * 0.08;
          aura.scale.setScalar(auraS);
        }
      });

      // Animate spine particles
      const spPosAttr = spParticleGeom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < spineParticleCount; i++) {
        const t = ((i / spineParticleCount) + elapsed * 0.22) % 1.0;
        const p = spineParticleCurve.getPointAt(t);
        spPosAttr.setXYZ(i, p.x, p.y, p.z);
      }
      spPosAttr.needsUpdate = true;

      // Gentle ambient particle drift
      const pPos = pGeom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < pCount; i++) {
        let py = pPos.getY(i);
        py += 0.0004;
        if (py > 2.4) py = -0.9;
        pPos.setY(i, py);
      }
      pPos.needsUpdate = true;

      // Subtle body breathing effect on skin mesh opacity (slightly higher base once the
      // anatomical GLB is in — its thin shell needs more presence than the primitive volumes)
      const breatheBase = glbRoot ? 0.24 : 0.17;
      const breathe = breatheBase + Math.sin(elapsed * 1.1) * 0.02;
      (skinMat as THREE.MeshPhysicalMaterial).opacity = breathe;

      // Spot light follows active chakra color (already set in other useEffect)
      spotLight.intensity = 2.2 + Math.sin(elapsed * 1.4) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // ── Tooltip projection ────────────────────────────────────────────────────
    const tooltipLoop = setInterval(() => {
      if (selectedNodeRef.current && tooltipRef.current) {
        const wp = new THREE.Vector3();
        selectedNodeRef.current.getWorldPosition(wp);
        wp.project(camera);
        const tx = (wp.x * 0.5 + 0.5) * container.clientWidth;
        const ty = (-wp.y * 0.5 + 0.5) * (container.clientHeight || 600);
        tooltipRef.current.style.left = `${tx}px`;
        tooltipRef.current.style.top = `${ty}px`;
        tooltipRef.current.style.opacity = "1";
      } else if (tooltipRef.current) {
        tooltipRef.current.style.opacity = "0";
      }
    }, 30);

    // ── Resize ────────────────────────────────────────────────────────────────
    const resizeObs = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width: w, height: h } = e.contentRect;
        camera.aspect = w / (h || 600);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h || 600);
      }
    });
    resizeObs.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(tooltipLoop);
      resizeObs.disconnect();
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("wheel", handleWheel);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (glbRoot) {
        group.remove(glbRoot);
        glbGeometries.forEach((g) => g.dispose());
      }
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs text-[#E09A6C] font-semibold tracking-widest uppercase">
          İnteraktif Terapi Sahnesi
        </span>
        <h2 className="text-28 md:text-40 font-light text-white leading-tight">
          Terapiye Gelen Kişinin Enerji Haritası
        </h2>
        <p className="text-sm md:text-base font-light text-[#ced1bf]/75 leading-relaxed">
          Figür üzerindeki parlayan enerji merkezlerine tıklayın. Her çakranın duygusal anlamı,
          terapi yaklaşımı ve bağlantılı meridyanları ortaya çıksın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
        {/* 3D Viewport */}
        <div className="relative min-h-[520px] md:min-h-[600px] bg-[#1a2420] rounded border border-[#ced1bf]/10 overflow-hidden select-none">
          <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

          {/* Floating tooltip */}
          <div
            ref={tooltipRef}
            className="absolute pointer-events-none z-30 opacity-0 transition-opacity duration-200"
            style={{ transform: "translate(-50%, -115%)", top: 0, left: 0 }}
          >
            <div className="bg-[#1e3028]/96 backdrop-blur-md px-4 py-3 rounded border border-[#ced1bf]/15 shadow-2xl w-52 space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedZone.color }}
                />
                <span className="text-white font-medium text-sm">{selectedZone.name}</span>
              </div>
              <p className="text-[10px] text-[#ced1bf]/75 font-light italic">{selectedZone.sanskritName}</p>
              <p className="text-xs text-[#ced1bf]/80 font-light leading-snug line-clamp-2">{selectedZone.emotion}</p>
            </div>
          </div>

          {/* Control hints */}
          <div className="absolute bottom-4 left-4 bg-[#1a2420]/80 backdrop-blur-sm px-3 py-2 rounded border border-[#ced1bf]/10 text-[10px] text-[#ced1bf]/55 space-y-0.5 pointer-events-none">
            <div>Sürükle — döndür &nbsp;·&nbsp; Scroll — yaklaştır</div>
            <div>Parlayan noktaya tıkla — detay aç</div>
          </div>

          {/* Active chakra badge */}
          <div
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium"
            style={{
              backgroundColor: `${selectedZone.color}18`,
              borderColor: `${selectedZone.color}40`,
              color: selectedZone.color,
            }}
          >
            <span className="size-2 rounded-full" style={{ backgroundColor: selectedZone.color }} />
            {selectedZone.name}
          </div>

          {/* Chakra quick-select dots overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5">
            {CHAKRA_ZONES.map((z) => (
              <button
                key={z.id}
                title={z.name}
                onClick={() => setSelectedZone(z)}
                className="size-3 rounded-full border transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: z.id === selectedZone.id ? z.color : "transparent",
                  borderColor: z.color,
                  opacity: z.id === selectedZone.id ? 1 : 0.45,
                }}
              />
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-4">
          {/* Zone selector */}
          <div className="grid grid-cols-2 gap-2">
            {CHAKRA_ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z)}
                className="px-3 py-2.5 text-left rounded text-xs transition-all duration-300 border cursor-pointer group"
                style={
                  z.id === selectedZone.id
                    ? {
                        backgroundColor: `${z.color}22`,
                        borderColor: `${z.color}60`,
                        color: z.color,
                      }
                    : {
                        backgroundColor: "rgba(48,73,61,0.2)",
                        borderColor: "rgba(206,209,191,0.08)",
                        color: "rgba(206,209,191,0.6)",
                      }
                }
              >
                <span className="font-medium block leading-tight">{z.name}</span>
                <span className="text-[10px] opacity-60 italic">{z.sanskritName}</span>
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div
            className="flex-1 rounded border p-5 space-y-5 transition-all duration-500"
            style={{
              backgroundColor: `${selectedZone.color}0d`,
              borderColor: `${selectedZone.color}25`,
            }}
          >
            {/* Title */}
            <div className="space-y-1 border-b border-white/8 pb-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="size-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedZone.color }}
                />
                <h3 className="text-lg font-medium text-white">{selectedZone.name}</h3>
              </div>
              <p className="text-xs text-[#ced1bf]/45 italic pl-5">{selectedZone.sanskritName} — {selectedZone.bodyArea}</p>
            </div>

            {/* Emotion */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#ced1bf]/40">Duygusal Tema</span>
              <p className="text-sm font-medium" style={{ color: selectedZone.color }}>
                {selectedZone.emotion}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[#ced1bf]/40">Klinik Bağlam</span>
              <p className="text-xs font-light leading-relaxed text-[#ced1bf]/75">
                {selectedZone.desc}
              </p>
            </div>

            {/* Therapy approach */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[#ced1bf]/40">Terapi Yaklaşımı</span>
              <p className="text-xs font-light text-[#ced1bf]/70 italic">{selectedZone.therapy}</p>
            </div>

            {/* Meridians */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#ced1bf]/40">İlişkili Meridyanlar</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedZone.meridians.map((m) => (
                  <span
                    key={m}
                    className="text-[10px] px-2 py-0.5 rounded font-mono border"
                    style={{
                      backgroundColor: `${selectedZone.color}12`,
                      borderColor: `${selectedZone.color}30`,
                      color: `${selectedZone.color}cc`,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
