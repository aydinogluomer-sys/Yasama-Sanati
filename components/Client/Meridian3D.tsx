"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

interface Acupoint {
  code: string;
  name: string;
  trName: string;
  desc: string;
  position: [number, number, number];
}

interface MeridianInfo {
  id: string;
  name: string;
  element: string;
  time: string;
  emotion: string;
  physical: string;
  desc: string;
  color: string;
  organName: string;
  acupoints: Acupoint[];
}

const MERIDIANS: MeridianInfo[] = [
  {
    id: "lu",
    name: "Akciğer Meridyeni (Lung)",
    element: "Metal",
    time: "03:00 - 05:00",
    emotion: "Hüzün ve Bırakabilme",
    physical: "Solunum sistemi, akciğerler, cilt ve bağışıklık",
    desc: "Yaşam enerjisinin (Qi) dış dünyadan bedenimize giriş kapısıdır. Doğru solunum pratikleriyle bu kanal uyarılır, göğüs kafesi açılır ve bedensel direnç artar.",
    color: "#e2e8f0", // Metalic white
    organName: "Akciğerler (Lungs)",
    acupoints: [
      { code: "LU1", name: "Zhongfu", trName: "Orta Depo", desc: "Göğüs kafesini açar, öksürük ve solunum sıkıntılarını yatıştırır.", position: [0.18, 1.05, 0.08] },
      { code: "LU7", name: "Lieque", trName: "Çatlak Geçit", desc: "Baş ve boyun ağrılarını hafifletir, bağışıklık sistemini destekler.", position: [0.48, 0.65, 0.01] },
      { code: "LU9", name: "Taiyuan", trName: "Büyük Derinlik", desc: "Akciğer enerjisini (Qi) güçlendirir, nabız dolaşımını düzenler.", position: [0.60, 0.46, 0.01] }
    ]
  },
  {
    id: "ht",
    name: "Kalp Meridyeni (Heart)",
    element: "Ateş",
    time: "11:00 - 13:00",
    emotion: "Neşe, Huzur ve Sevgi",
    physical: "Kalp, kan dolaşımı, uyku düzeni ve zihinsel berraklık",
    desc: "Zihnin ve duyguların merkezidir. Sevgi akışını, samimiyeti ve içsel huzuru yönetir. Dengelendiğinde derin bir sükunet ve duygusal denge hissi verir.",
    color: "#ef4444", // Fire red
    organName: "Kalp (Heart)",
    acupoints: [
      { code: "HT1", name: "Jiquan", trName: "Zirve Kaynağı", desc: "Stres, kaygı ve göğüsteki daralma hissini hafifletir.", position: [-0.16, 0.88, 0.08] },
      { code: "HT7", name: "Shenmen", trName: "Ruh Kapısı", desc: "Zihni yatıştırır, uykusuzluk ve çarpıntıya iyi gelir.", position: [-0.46, 0.54, 0.02] },
      { code: "HT9", name: "Shaochong", trName: "Küçük Hücum", desc: "Duygusal kriz anlarında kalbi rahatlatır, bilinci açar.", position: [-0.60, 0.44, 0.01] }
    ]
  },
  {
    id: "st",
    name: "Mide Meridyeni (Stomach)",
    element: "Toprak",
    time: "07:00 - 09:00",
    emotion: "Endişe ve Güvensizlik",
    physical: "Sindirim sistemi, mide, bacak gücü ve yüz kasları",
    desc: "Dışarıdan aldığımız gıdaları ve hayat deneyimlerini hazmetme kapasitemizi temsil eder. Bize köklenme, kararlılık ve yaşama güven hissi verir.",
    color: "#eab308", // Earth yellow
    organName: "Mide (Stomach)",
    acupoints: [
      { code: "ST1", name: "Chengqi", trName: "Yaş Kabı", desc: "Göz yorgunluğunu giderir, görme yetisini destekler.", position: [0.04, 1.36, 0.12] },
      { code: "ST25", name: "Tianshu", trName: "Cennet Ekseni", desc: "Sindirim sistemini düzenler, şişkinlik ve kabızlığı azaltır.", position: [0.09, 0.78, 0.11] },
      { code: "ST36", name: "Zusanli", trName: "Üç Mil Noktası", desc: "Vücudun genel enerji seviyesini artırır, bağışıklığı güçlendirir.", position: [0.15, -0.34, 0.06] }
    ]
  },
  {
    id: "ki",
    name: "Böbrek Meridyeni (Kidney)",
    element: "Su",
    time: "17:00 - 19:00",
    emotion: "Korku ve Yaşam Gücü",
    physical: "Böbrekler, kemikler, eklemler ve üreme sistemi",
    desc: "Doğumla getirdiğimiz temel yaşam enerjisinin (Jing) deposudur. Korkuları dönüştürerek irade gücü, cesaret, canlılık ve yaşlanma karşıtı direnç kazandırır.",
    color: "#3b82f6", // Water blue
    organName: "Böbrekler (Kidneys)",
    acupoints: [
      { code: "KI1", name: "Yongquan", trName: "Fışkıran Kaynak", desc: "Bedeni topraklar, zihni yatıştırır, uykuya dalmayı kolaylaştırır.", position: [-0.14, -0.78, 0.02] },
      { code: "KI3", name: "Taixi", trName: "Büyük Vadi", desc: "Böbrek özünü besler, bel ağrısı ve yorgunluğu giderir.", position: [-0.10, -0.74, 0.03] },
      { code: "KI27", name: "Shufu", trName: "Depo Evi", desc: "Solunumu rahatlatır, astım ve öksürük krizlerini hafifletir.", position: [-0.035, 1.08, 0.09] }
    ]
  },
  {
    id: "lr",
    name: "Karaciğer Meridyeni (Liver)",
    element: "Ağaç",
    time: "01:00 - 03:00",
    emotion: "Öfke ve Vizyonerlik",
    physical: "Karaciğer, gözler, tendonlar ve toksin arınımı",
    desc: "Bedenin genel enerji akışının pürüzsüz olmasını sağlar. Planlama, yaratıcılık, vizyon geliştirme ve esneklik yeteneğimizi kontrol eder.",
    color: "#10b981", // Tree green
    organName: "Karaciğer (Liver)",
    acupoints: [
      { code: "LR1", name: "Dadun", trName: "Büyük Platform", desc: "Öfke patlamalarını yatıştırır, üreme sistemi enerjisini dengeler.", position: [0.14, -0.78, 0.08] },
      { code: "LR3", name: "Taichong", trName: "Büyük Taşkın", desc: "Vücuttaki Qi sıkışmasını çözer, baş ağrısı ve stresi azaltır.", position: [0.13, -0.76, 0.07] },
      { code: "LR14", name: "Qimen", trName: "Döngü Kapısı", desc: "Karaciğer meridyenini rahatlatır, hazımsızlık ve göğüs ağrısını hafifletir.", position: [0.06, 0.90, 0.09] }
    ]
  },
  {
    id: "li",
    name: "Kalın Bağırsak Meridyeni (Large Intestine)",
    element: "Metal",
    time: "05:00 - 07:00",
    emotion: "Tutma ve Arınma",
    physical: "Kalın bağırsak, cilt sağlığı ve eliminasyon sistemi",
    desc: "Hem fiziksel hem zihinsel olarak artık bize hizmet etmeyen, toksik yükleri serbest bırakma ve arınma kanalıdır. Bırakmanın şifasını taşır.",
    color: "#64748b", // Slate gray
    organName: "Kalın Bağırsak (Large Intestine)",
    acupoints: [
      { code: "LI4", name: "Hegu", trName: "Vadi Birleşimi", desc: "Vücuttaki tüm ağrıları yatıştırır, baş ağrısı ve sinüzite iyi gelir.", position: [-0.54, 0.49, 0.02] },
      { code: "LI11", name: "Quchi", trName: "Kıvrımlı Havuz", desc: "Bedendeki aşırı ısıyı (ateşi) temizler, cilt kaşıntılarını azaltır.", position: [-0.35, 0.74, 0.03] },
      { code: "LI20", name: "Yingxiang", trName: "Koku Karşılama", desc: "Burun tıkanıklığını giderir, koku alma duyusunu iyileştirir.", position: [0.02, 1.34, 0.13] }
    ]
  },
];

export default function Meridian3D() {
  const [selectedId, setSelectedId] = useState<string>("lu");
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const selectedNodeRef = useRef<THREE.Mesh | null>(null);

  const selectedInfo = MERIDIANS.find((m) => m.id === selectedId) || MERIDIANS[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#2B3530");

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
    const targetCameraPos = new THREE.Vector3(0, 0.5, 2.3);
    camera.position.copy(targetCameraPos);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight1.position.set(2, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xca7d57, 0.4);
    dirLight2.position.set(-2, -2, -3);
    scene.add(dirLight2);

    // Main rotating group
    const group = new THREE.Group();
    scene.add(group);

    // 5. Holographic Mannequin Geometry
    const bodyGroup = new THREE.Group();
    const wireGroup = new THREE.Group();
    group.add(bodyGroup);
    group.add(wireGroup);

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x3d4e46,
      transparent: true,
      opacity: 0.15,
      roughness: 0.3,
      metalness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xced1bf,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const addPart = (geom: THREE.BufferGeometry, pos: [number, number, number], rot: [number, number, number] = [0, 0, 0]) => {
      const mesh = new THREE.Mesh(geom, bodyMat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      bodyGroup.add(mesh);

      const wireMesh = new THREE.Mesh(geom, wireMat);
      wireMesh.position.set(...pos);
      wireMesh.rotation.set(...rot);
      wireMesh.scale.multiplyScalar(1.015);
      wireGroup.add(wireMesh);
    };

    // Humanoid primitives
    const headGeom = new THREE.SphereGeometry(0.13, 24, 24);
    const neckGeom = new THREE.CylinderGeometry(0.055, 0.065, 0.11, 16);
    const torsoGeom = new THREE.CylinderGeometry(0.16, 0.12, 0.72, 16);
    const pelvisGeom = new THREE.CylinderGeometry(0.12, 0.14, 0.16, 16);
    const armGeom = new THREE.CylinderGeometry(0.042, 0.032, 0.48, 12);
    const forearmGeom = new THREE.CylinderGeometry(0.032, 0.022, 0.42, 12);
    const legGeom = new THREE.CylinderGeometry(0.065, 0.048, 0.58, 12);
    const shinGeom = new THREE.CylinderGeometry(0.048, 0.032, 0.52, 12);

    addPart(headGeom, [0, 1.32, 0]);
    addPart(neckGeom, [0, 1.18, 0]);
    addPart(torsoGeom, [0, 0.78, 0]);
    addPart(pelvisGeom, [0, 0.34, 0]);

    // Outstretched arms matching our curves
    addPart(armGeom, [0.24, 0.88, 0.02], [0, 0, -Math.PI / 3]);
    addPart(forearmGeom, [0.46, 0.70, 0.01], [0, 0, -Math.PI / 4]);
    addPart(armGeom, [-0.24, 0.88, 0.02], [0, 0, Math.PI / 3]);
    addPart(forearmGeom, [-0.46, 0.70, 0.01], [0, 0, Math.PI / 4]);

    // Legs
    addPart(legGeom, [0.11, 0.05, 0.03]);
    addPart(shinGeom, [0.12, -0.46, 0.03]);
    addPart(legGeom, [-0.11, 0.05, 0.03]);
    addPart(shinGeom, [-0.12, -0.46, 0.03]);

    // 6. Holographic Internal Organs Setup
    const organsGroup = new THREE.Group();
    group.add(organsGroup);

    // Organ materials map
    const organMaterials: { [key: string]: THREE.MeshPhysicalMaterial } = {
      lu: new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.03, roughness: 0.1, metalness: 0.2 }), // Lung (White)
      ht: new THREE.MeshPhysicalMaterial({ color: 0xff3333, transparent: true, opacity: 0.03, roughness: 0.1, metalness: 0.2 }), // Heart (Red)
      st: new THREE.MeshPhysicalMaterial({ color: 0xffaa00, transparent: true, opacity: 0.03, roughness: 0.1, metalness: 0.2 }), // Stomach (Yellow-Orange)
      ki: new THREE.MeshPhysicalMaterial({ color: 0x3399ff, transparent: true, opacity: 0.03, roughness: 0.1, metalness: 0.2 }), // Kidney (Blue)
      lr: new THREE.MeshPhysicalMaterial({ color: 0x10b981, transparent: true, opacity: 0.03, roughness: 0.1, metalness: 0.2 }), // Liver (Green)
      li: new THREE.MeshPhysicalMaterial({ color: 0x8899aa, transparent: true, opacity: 0.03, roughness: 0.1, metalness: 0.2 }), // Large Intestine (Slate)
    };

    // Organ Geometries & Meshes
    // Lungs (Two squashed spheres)
    const lungGeom = new THREE.SphereGeometry(0.06, 16, 16);
    const leftLung = new THREE.Mesh(lungGeom, organMaterials.lu);
    leftLung.scale.set(0.8, 1.4, 0.7);
    leftLung.position.set(-0.065, 0.94, 0.03);
    const rightLung = new THREE.Mesh(lungGeom, organMaterials.lu);
    rightLung.scale.set(0.8, 1.4, 0.7);
    rightLung.position.set(0.065, 0.94, 0.03);
    organsGroup.add(leftLung, rightLung);

    // Heart
    const heartGeom = new THREE.SphereGeometry(0.045, 16, 16);
    const heartMesh = new THREE.Mesh(heartGeom, organMaterials.ht);
    heartMesh.scale.set(0.9, 1.1, 0.9);
    heartMesh.position.set(-0.015, 0.90, 0.04);
    organsGroup.add(heartMesh);

    // Stomach (Curved box/sphere)
    const stomachGeom = new THREE.SphereGeometry(0.058, 16, 16);
    const stomachMesh = new THREE.Mesh(stomachGeom, organMaterials.st);
    stomachMesh.scale.set(1.3, 0.8, 0.9);
    stomachMesh.position.set(0.045, 0.73, 0.03);
    stomachMesh.rotation.z = -Math.PI / 8;
    organsGroup.add(stomachMesh);

    // Kidneys (Two small back-placed spheres)
    const kidneyGeom = new THREE.SphereGeometry(0.032, 12, 12);
    const leftKidney = new THREE.Mesh(kidneyGeom, organMaterials.ki);
    leftKidney.scale.set(0.7, 1.2, 0.7);
    leftKidney.position.set(-0.06, 0.58, -0.05);
    const rightKidney = new THREE.Mesh(kidneyGeom, organMaterials.ki);
    rightKidney.scale.set(0.7, 1.2, 0.7);
    rightKidney.position.set(0.06, 0.58, -0.05);
    organsGroup.add(leftKidney, rightKidney);

    // Liver
    const liverGeom = new THREE.SphereGeometry(0.068, 16, 16);
    const liverMesh = new THREE.Mesh(liverGeom, organMaterials.lr);
    liverMesh.scale.set(1.4, 0.7, 0.9);
    liverMesh.position.set(-0.045, 0.78, 0.03);
    organsGroup.add(liverMesh);

    // Large Intestine (Circular tubing)
    const intestineGeom = new THREE.TorusGeometry(0.08, 0.02, 8, 24);
    const intestineMesh = new THREE.Mesh(intestineGeom, organMaterials.li);
    intestineMesh.rotation.x = Math.PI / 2;
    intestineMesh.position.set(0, 0.48, 0.03);
    intestineMesh.scale.set(1, 1, 0.7);
    organsGroup.add(intestineMesh);

    // 7. Define Meridian Splines
    const meridianCurves: { [key: string]: THREE.CatmullRomCurve3 } = {
      lu: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, 0.95, 0.12),
        new THREE.Vector3(0.18, 1.05, 0.08), // LU1
        new THREE.Vector3(0.28, 1.0, 0.04), 
        new THREE.Vector3(0.38, 0.85, 0.02),
        new THREE.Vector3(0.48, 0.65, 0.01),  // LU7
        new THREE.Vector3(0.60, 0.46, 0.01),  // LU9
      ]),
      ht: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.06, 0.9, 0.12),
        new THREE.Vector3(-0.16, 0.88, 0.08), // HT1
        new THREE.Vector3(-0.28, 0.75, 0.04), 
        new THREE.Vector3(-0.38, 0.64, 0.02),
        new THREE.Vector3(-0.46, 0.54, 0.02), // HT7
        new THREE.Vector3(-0.60, 0.44, 0.01), // HT9
      ]),
      st: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.04, 1.36, 0.12),  // ST1
        new THREE.Vector3(0.07, 1.25, 0.09),  
        new THREE.Vector3(0.11, 1.05, 0.1),   
        new THREE.Vector3(0.09, 0.78, 0.11),  // ST25
        new THREE.Vector3(0.12, 0.20, 0.07),  
        new THREE.Vector3(0.14, -0.24, 0.06),  
        new THREE.Vector3(0.15, -0.34, 0.06), // ST36
        new THREE.Vector3(0.16, -0.55, 0.04), 
        new THREE.Vector3(0.18, -0.78, 0.08), 
      ]),
      ki: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.14, -0.78, 0.02), // KI1
        new THREE.Vector3(-0.10, -0.74, 0.03), // KI3
        new THREE.Vector3(-0.08, -0.50, 0.04),  
        new THREE.Vector3(-0.06, -0.24, 0.04),  
        new THREE.Vector3(-0.05, 0.05, 0.05),   
        new THREE.Vector3(-0.02, 0.38, 0.07),  
        new THREE.Vector3(-0.02, 0.78, 0.09),   
        new THREE.Vector3(-0.025, 0.95, 0.09),  
        new THREE.Vector3(-0.035, 1.08, 0.09),  // KI27
      ]),
      lr: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.14, -0.78, 0.08), // LR1
        new THREE.Vector3(0.13, -0.76, 0.07), // LR3
        new THREE.Vector3(0.11, -0.50, 0.04),   
        new THREE.Vector3(0.08, -0.24, 0.04),  
        new THREE.Vector3(0.06, 0.05, 0.05),  
        new THREE.Vector3(0.04, 0.45, 0.07),  
        new THREE.Vector3(0.06, 0.78, 0.08),  
        new THREE.Vector3(0.06, 0.90, 0.09),  // LR14
      ]),
      li: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.60, 0.42, 0.01),  
        new THREE.Vector3(-0.54, 0.49, 0.02), // LI4
        new THREE.Vector3(-0.45, 0.62, 0.02), 
        new THREE.Vector3(-0.35, 0.74, 0.03), // LI11
        new THREE.Vector3(-0.22, 1.05, 0.04), 
        new THREE.Vector3(-0.08, 1.18, 0.07), 
        new THREE.Vector3(0.0, 1.30, 0.12),
        new THREE.Vector3(0.02, 1.34, 0.13), // LI20
      ]),
    };

    // 8. Render Energy Lines & Pulse Particle Flows
    const lineObjects: { [key: string]: THREE.Line } = {};
    const flowParticleSystems: { [key: string]: THREE.Points } = {};

    const createFlowSystem = (curve: THREE.CatmullRomCurve3, colorHex: string, size: number = 0.018) => {
      const pointsCount = 100;
      const points = curve.getPoints(pointsCount);
      
      const positions = new Float32Array(pointsCount * 3);
      points.forEach((p, i) => {
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      });

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.4, "rgba(255, 255, 255, 0.6)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      const pTex = new THREE.CanvasTexture(canvas);

      const mat = new THREE.PointsMaterial({
        color: new THREE.Color(colorHex),
        size: size,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        map: pTex,
        depthWrite: false,
      });

      return new THREE.Points(geom, mat);
    };

    Object.keys(meridianCurves).forEach((key) => {
      const curve = meridianCurves[key];
      const isSelected = key === selectedId;
      const themeColor = MERIDIANS.find((m) => m.id === key)?.color || "#ced1bf";

      // 1. Static base curve
      const points = curve.getPoints(80);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(themeColor),
        transparent: true,
        opacity: isSelected ? 0.95 : 0.08,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      lineObjects[key] = line;
      group.add(line);

      // 2. Animated Flowing Points System
      const flowPoints = createFlowSystem(curve, themeColor, isSelected ? 0.022 : 0.0);
      flowParticleSystems[key] = flowPoints;
      group.add(flowPoints);
    });

    // 9. Render Interactive Acupoint Nodes
    const pointsGroup = new THREE.Group();
    group.add(pointsGroup);

    const activeMeridian = MERIDIANS.find((m) => m.id === selectedId) || MERIDIANS[0];
    const nodeGeom = new THREE.SphereGeometry(0.026, 16, 16);
    const haloGeom = new THREE.SphereGeometry(0.048, 16, 16);

    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });

    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeMeridian.color),
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });

    const halosArray: THREE.Mesh[] = [];

    activeMeridian.acupoints.forEach((pt) => {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.set(...pt.position);
      node.userData = { pt };
      pointsGroup.add(node);

      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.position.copy(node.position);
      pointsGroup.add(halo);
      halosArray.push(halo);
    });

    // 10. Outer Ring Platform
    const platformRingGeom = new THREE.RingGeometry(0.45, 0.46, 64);
    const platformRingMat = new THREE.MeshBasicMaterial({
      color: 0xced1bf,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
    });
    const platformRing = new THREE.Mesh(platformRingGeom, platformRingMat);
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.y = -0.72;
    group.add(platformRing);

    // 11. Smooth Rotation and Camera Control States
    let isDragging = false;
    let previousPointerPos = { x: 0, y: 0 };
    
    let targetRotationY = 0;
    let targetRotationX = 0;

    const targetLookAt = new THREE.Vector3(0, 0.4, 0);
    const currentLookAt = new THREE.Vector3(0, 0.4, 0);

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Hover state pointer styling
      const rect = renderer.domElement.getBoundingClientRect();
      const mX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(mX, mY), camera);
      const hits = ray.intersectObjects(pointsGroup.children);
      
      const nodeHits = hits.filter(h => h.object instanceof THREE.Mesh && h.object.geometry.type === "SphereGeometry" && h.object.scale.x === 1);
      container.style.cursor = nodeHits.length > 0 ? "pointer" : (isDragging ? "grabbing" : "grab");

      if (!isDragging) return;

      const deltaX = e.clientX - previousPointerPos.x;
      const deltaY = e.clientY - previousPointerPos.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));

      previousPointerPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // Raycaster Click Event to focus nodes and display tooltips
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const clickRay = new THREE.Raycaster();
      clickRay.setFromCamera(new THREE.Vector2(mX, mY), camera);
      
      const hits = clickRay.intersectObjects(pointsGroup.children);
      const nodeHit = hits.find(h => h.object.userData.pt !== undefined);

      if (nodeHit) {
        const clickedNode = nodeHit.object as THREE.Mesh;
        const data = clickedNode.userData.pt as Acupoint;

        selectedNodeRef.current = clickedNode;

        // Position camera to look closer at the point
        const nodeWorldPos = new THREE.Vector3();
        clickedNode.getWorldPosition(nodeWorldPos);

        targetLookAt.copy(nodeWorldPos);
        
        const zoomOffset = new THREE.Vector3(0, 0.05, 0.5);
        zoomOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), group.rotation.y);
        targetCameraPos.copy(nodeWorldPos).add(zoomOffset);

        // Update tooltip content
        const tCode = document.getElementById("tooltip-code");
        const tName = document.getElementById("tooltip-name");
        const tTrName = document.getElementById("tooltip-trname");
        const tDesc = document.getElementById("tooltip-desc");
        
        if (tCode) tCode.innerText = data.code;
        if (tName) tName.innerText = data.name;
        if (tTrName) tTrName.innerText = data.trName;
        if (tDesc) tDesc.innerText = data.desc;
      } else {
        // Reset view
        selectedNodeRef.current = null;
        targetLookAt.set(0, 0.4, 0);
        targetCameraPos.set(0, 0.5, 2.3);
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("click", handleCanvasClick);

    // 12. Animation Loop
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Slow idle rotation when not dragging or zooming in
      if (!isDragging && !selectedNodeRef.current) {
        targetRotationY += 0.0025;
      }

      // Interpolate rotation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.08;

      // Interpolate camera
      camera.position.lerp(targetCameraPos, 0.07);
      currentLookAt.lerp(targetLookAt, 0.07);
      camera.lookAt(currentLookAt);

      // Pulse halos
      halosArray.forEach((h, idx) => {
        const s = 1.0 + Math.sin(elapsed * 4.5 + idx) * 0.24;
        h.scale.set(s, s, s);
      });

      // Animate flowing light dots along curves
      Object.keys(meridianCurves).forEach((key) => {
        const flowPoints = flowParticleSystems[key];
        if (flowPoints) {
          const isSel = key === selectedId;
          const posAttr = flowPoints.geometry.getAttribute("position") as THREE.BufferAttribute;
          const curve = meridianCurves[key];
          const count = posAttr.count;

          const baseSpeed = isSel ? 0.4 : 0.15;
          const offsetTime = elapsed * baseSpeed;

          for (let i = 0; i < count; i++) {
            const t = ((i / count) + offsetTime) % 1.0;
            const p = curve.getPointAt(t);
            posAttr.setXYZ(i, p.x, p.y, p.z);
          }
          posAttr.needsUpdate = true;
        }
      });

      // Dynamic Organ Lighting & Pulse Animations
      Object.keys(organMaterials).forEach((key) => {
        const mat = organMaterials[key];
        const isSel = key === selectedId;

        if (isSel) {
          // Glow/pulse active organ
          mat.opacity = 0.85;
          const pulseScale = 1.0 + Math.sin(elapsed * 4.0) * 0.07;
          
          if (key === "lu") {
            leftLung.scale.set(0.8 * pulseScale, 1.4 * pulseScale, 0.7 * pulseScale);
            rightLung.scale.set(0.8 * pulseScale, 1.4 * pulseScale, 0.7 * pulseScale);
          } else if (key === "ht") {
            heartMesh.scale.set(0.9 * pulseScale, 1.1 * pulseScale, 0.9 * pulseScale);
          } else if (key === "st") {
            stomachMesh.scale.set(1.3 * pulseScale, 0.8 * pulseScale, 0.9 * pulseScale);
          } else if (key === "ki") {
            leftKidney.scale.set(0.7 * pulseScale, 1.2 * pulseScale, 0.7 * pulseScale);
            rightKidney.scale.set(0.7 * pulseScale, 1.2 * pulseScale, 0.7 * pulseScale);
          } else if (key === "lr") {
            liverMesh.scale.set(1.4 * pulseScale, 0.7 * pulseScale, 0.9 * pulseScale);
          } else if (key === "li") {
            intestineMesh.scale.set(1 * pulseScale, 1 * pulseScale, 0.7 * pulseScale);
          }
        } else {
          // Dim non-active organs
          mat.opacity = 0.02;
        }
      });

      // Project tooltip in 2D overlay space
      if (selectedNodeRef.current && tooltipRef.current) {
        const worldPos = new THREE.Vector3();
        selectedNodeRef.current.getWorldPosition(worldPos);
        worldPos.project(camera);

        const x = (worldPos.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-worldPos.y * 0.5 + 0.5) * (container.clientHeight || 500);

        tooltipRef.current.style.left = `${x}px`;
        tooltipRef.current.style.top = `${y}px`;
        tooltipRef.current.style.opacity = "1";
      } else if (tooltipRef.current) {
        tooltipRef.current.style.opacity = "0";
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / (h || 500);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h || 500);
      }
    });
    resizeObs.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObs.disconnect();
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("click", handleCanvasClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      bodyMat.dispose();
      wireMat.dispose();
      nodeMat.dispose();
      haloMat.dispose();
      headGeom.dispose();
      neckGeom.dispose();
      torsoGeom.dispose();
      pelvisGeom.dispose();
      armGeom.dispose();
      forearmGeom.dispose();
      legGeom.dispose();
      shinGeom.dispose();
      nodeGeom.dispose();
      haloGeom.dispose();
      platformRingGeom.dispose();
      platformRingMat.dispose();
      lungGeom.dispose();
      heartGeom.dispose();
      stomachGeom.dispose();
      kidneyGeom.dispose();
      liverGeom.dispose();
      intestineGeom.dispose();
      
      Object.values(organMaterials).forEach((m) => m.dispose());
      Object.values(lineObjects).forEach((l) => l.geometry.dispose());
      Object.values(flowParticleSystems).forEach((fs) => {
        fs.geometry.dispose();
        if (Array.isArray(fs.material)) {
          fs.material.forEach((m) => m.dispose());
        } else {
          fs.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [isClient, selectedId]);

  return (
    <section className="space-y-12 border-b border-[#ced1bf]/15 pb-16 md:pb-24">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs text-[#ca7d57] font-semibold tracking-widest uppercase">
          Anatomik Deneyim
        </span>
        <h2 className="text-28 md:text-40 font-light text-white leading-tight">
          İnteraktif 3D Meridyen & Organ Bağlantıları
        </h2>
        <p className="text-sm md:text-base font-light text-[#ced1bf]/75 leading-relaxed">
          Geleneksel Çin Tıbbı (TCM) doğrultusunda vücuttaki enerji akışını ve meridyen hatlarını 3D hologram üzerinde inceleyin. 
          Soldaki menüden bir kanal seçtiğinizde, **ilgili iç organ (Zang-Fu)** beden içinde aydınlanacak, canlanacak ve onunla bağlantılı enerji akışı akmaya başlayacaktır. 
          🔘 Glowing noktalara tıklayarak akupresür noktalarının detaylarını öğrenebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-stretch">
        {/* Interactive Viewport (WebGL Canvas) */}
        <div className="relative min-h-[450px] md:min-h-[500px] bg-[#2B3530]/50 rounded border border-[#ced1bf]/10 overflow-hidden flex items-center justify-center select-none">
          {/* 3D WebGL Canvas container */}
          <div
            ref={containerRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          />

          {/* HTML Overlay Tooltip for 3D coordinates projection */}
          <div
            ref={tooltipRef}
            className="absolute pointer-events-none bg-[#30493D]/95 backdrop-blur-md p-4 rounded border border-[#ced1bf]/20 text-xs text-[#ced1bf] shadow-xl w-60 z-[30] transition-opacity duration-300 opacity-0 space-y-2"
            style={{ transform: "translate(-50%, -120%)", top: 0, left: 0 }}
          >
            <div className="flex justify-between items-center border-b border-[#ced1bf]/10 pb-1">
              <span className="font-bold text-[#ca7d57]" id="tooltip-code">LU9</span>
              <span className="font-medium text-white" id="tooltip-name">Taiyuan</span>
            </div>
            <p className="text-white/90 font-semibold" id="tooltip-trname">Büyük Derinlik</p>
            <p className="text-[#ced1bf]/75 font-light leading-relaxed" id="tooltip-desc">Detaylar...</p>
          </div>

          {/* Floating UI Helper (Desktop only) */}
          <div className="absolute bottom-4 left-4 bg-[#2B3530]/80 backdrop-blur-sm px-3 py-1.5 rounded border border-[#ced1bf]/10 text-[11px] text-[#ced1bf]/70 space-y-0.5 pointer-events-none">
            <div>🖱️ Sürükleyerek 3D modeli döndürün</div>
            <div>🔘 Glowing noktalara tıklayarak detayları açın</div>
          </div>
        </div>

        {/* Meridian Selector & Details Card */}
        <div className="flex flex-col justify-between space-y-6">
          {/* Meridian List Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
            {MERIDIANS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`px-4 py-3 text-left rounded text-xs transition-all duration-300 border cursor-pointer ${
                  selectedId === m.id
                    ? "bg-[#ca7d57] border-[#ca7d57] text-white font-medium shadow-md shadow-[#ca7d57]/20"
                    : "bg-[#30493D]/30 border-[#ced1bf]/10 text-[#ced1bf]/70 hover:bg-[#30493D]/60 hover:text-[#ced1bf]"
                }`}
              >
                {m.name.split(" ")[0]} {m.name.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* Details Panel */}
          <div className="flex-1 bg-[#30493D] p-6 md:p-8 rounded border border-[#ced1bf]/15 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ced1bf]/15 pb-4">
                <h3 className="text-lg md:text-xl font-medium text-white">
                  {selectedInfo.name}
                </h3>
                <span
                  style={{
                    backgroundColor: `${selectedInfo.color}15`,
                    borderColor: `${selectedInfo.color}40`,
                    color: selectedInfo.color,
                  }}
                  className="text-xs px-2.5 py-1 rounded font-medium border"
                >
                  {selectedInfo.element} Elementi
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <span className="text-[#ced1bf]/55 block">İlişkili Organ</span>
                  <span className="text-white font-medium">{selectedInfo.organName}</span>
                </div>
                <div>
                  <span className="text-[#ced1bf]/55 block">Aktif Saat Dilimi</span>
                  <span className="text-white font-medium">{selectedInfo.time}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <span className="text-[#ced1bf]/55 block">İlişkili Duygu</span>
                  <span className="text-white font-medium">{selectedInfo.emotion}</span>
                </div>
                <div>
                  <span className="text-[#ced1bf]/55 block">Fiziksel Etki Alanı</span>
                  <p className="text-white/90 font-medium">{selectedInfo.physical}</p>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-xs text-[#ced1bf]/55 block">Açıklama & Önemi</span>
                <p className="text-sm text-[#ced1bf]/80 font-light leading-relaxed">
                  {selectedInfo.desc}
                </p>
              </div>
            </div>

            {/* List of Acupoints on this meridian as inline indicators */}
            <div className="border-t border-[#ced1bf]/10 pt-4 space-y-2">
              <span className="text-[11px] text-[#ced1bf]/55 block">Bu Kanal Üzerindeki Temel Noktalar:</span>
              <div className="flex flex-wrap gap-2">
                {selectedInfo.acupoints.map((pt) => (
                  <span
                    key={pt.code}
                    className="bg-[#2B3530] text-[#ced1bf] px-2 py-0.5 rounded text-2xs border border-[#ced1bf]/10 font-mono"
                  >
                    {pt.code} ({pt.name})
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
