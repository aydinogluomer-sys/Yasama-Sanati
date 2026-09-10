# 3D Terapi Sahnesi — Detaylı Geliştirme Planı

## Mevcut Durum

`components/Client/Meridian3D.tsx` dosyasında Three.js ile:
- Basit geometrik şekillerden (cylinder, sphere) oluşan bir insan figürü
- 6 meridyen kanalı (akupunktur çizgileri)
- Tıklanabilir akupresür noktaları
- Sürükleyerek döndürebilme

---

## Hedef: İnteraktif Terapi Sahnesi

Terapiye gelen bir kişiyi merkeze alan, gerçekçi, interaktif bir 3D görünüm.

---

## Adım 1 — Gerçekçi İnsan Karakteri (GLTF/GLB Model)

### Problem
Mevcut mannequin ilkel geometrilerden oluşuyor. Gerçekçi bir insan figürü için hazır 3D model gerekiyor.

### Çözüm: Ücretsiz GLB Modelleri

Şu kaynaklardan ücretsiz, lisanslı insan modeli indirin:

1. **Mixamo (Adobe)** — https://www.mixamo.com
   - Ücretsiz hesap ile insan karakterleri ve animasyonlar
   - FBX formatında indirip Blender ile GLB'ye dönüştürün
   - Önerilen karakter: "YBot" veya "XBot" (nötr, cinsiyet belirsiz)
   - Önerilen animasyonlar: "Breathing Idle", "Sitting Relaxed"

2. **Sketchfab** — https://sketchfab.com/3d-models?features=downloadable&license=4
   - CC0 lisanslı modeller arayın: "human body anatomy" veya "sitting person"

3. **Ready Player Me** — https://readyplayer.me
   - Özelleştirilebilir avatar oluşturup GLB olarak export edin

### Blender ile Dönüştürme (FBX → GLB)
```
1. Blender'ı açın (ücretsiz: blender.org)
2. File > Import > FBX (.fbx)
3. Ölçeği kontrol edin (1 unit = 1 metre olmalı)
4. File > Export > glTF 2.0 (.glb)
   - Format: GLB (Binary)
   - Include: Animations işaretli
5. public/models/therapy-client.glb olarak kaydedin
```

### Three.js'e Yükleme Kodu

```typescript
// Mevcut Meridian3D.tsx'e eklenecek
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';

// useEffect içinde:
const loader = new GLTFLoader();
loader.load('/models/therapy-client.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1, 1, 1);
  model.position.set(0, -0.9, 0);
  group.add(model);

  // Animasyon
  if (gltf.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0]); // Breathing Idle
    action.play();
    
    // animate() içinde:
    mixer.update(clock.getDelta());
  }
});
```

---

## Adım 2 — Terapi Odası Ortamı

### Sahne Bileşenleri

```typescript
// Zemin
const floorGeom = new THREE.PlaneGeometry(6, 6);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x3d4a40,
  roughness: 0.8,
  metalness: 0.1,
});
const floor = new THREE.Mesh(floorGeom, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.9;
scene.add(floor);

// Arka duvar
const wallGeom = new THREE.PlaneGeometry(6, 4);
const wallMat = new THREE.MeshStandardMaterial({
  color: 0x2a3530,
  roughness: 0.9,
});
const wall = new THREE.Mesh(wallGeom, wallMat);
wall.position.set(0, 1, -2.5);
scene.add(wall);

// Terapi koltuğu / minderi (basit geometriler)
const cushionGeom = new THREE.BoxGeometry(0.8, 0.1, 0.8);
const cushionMat = new THREE.MeshStandardMaterial({ color: 0x4a6055 });
const cushion = new THREE.Mesh(cushionGeom, cushionMat);
cushion.position.set(0, -0.85, 0);
scene.add(cushion);

// Çevre ışığı partikülleri (enerji atmosferi)
const particleCount = 200;
const particleGeom = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 4;
}
particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({
  color: 0xced1bf,
  size: 0.008,
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending,
});
const particles = new THREE.Points(particleGeom, particleMat);
scene.add(particles);
```

### Gelişmiş Aydınlatma

```typescript
// Yumuşak terapi ışığı (üstten)
const softLight = new THREE.SpotLight(0xfff5e0, 1.5);
softLight.position.set(0, 3, 1);
softLight.angle = Math.PI / 6;
softLight.penumbra = 0.5;
softLight.castShadow = true;
scene.add(softLight);

// Renk sıcaklığı için ikinci ışık
const warmFill = new THREE.PointLight(0xca7d57, 0.6);
warmFill.position.set(-1.5, 1, 0.5);
scene.add(warmFill);

// Soğuk dolgu ışığı
const coolFill = new THREE.PointLight(0x3b82f6, 0.3);
coolFill.position.set(1.5, 0.5, -0.5);
scene.add(coolFill);

// Renderer'a gölge etkinleştirme
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
```

---

## Adım 3 — İnteraktif Vücut Noktaları (Terapist Bakış Açısı)

### Tıklanabilir Vücut Bölgeleri

Her bölgeye tıklayınca ilgili enerji merkezi ve bilgi açılır:

```typescript
const bodyZones = [
  {
    id: "crown",
    name: "Taç Çakra",
    trName: "Sahasrara",
    desc: "Evrensel bilinç bağlantısı. Terapi sürecinde açıldığında derin içgörü ve anlam kazanımı yaşanır.",
    color: "#9333ea",
    position: [0, 1.75, 0] as [number, number, number],
    meridians: ["Tüm meridyanlar"]
  },
  {
    id: "heart_center",
    name: "Kalp Merkezi",
    trName: "Anahata",
    desc: "Duygusal işleme ve iyileşme merkezi. Travma çalışmalarında ilk ele alınan bölge.",
    color: "#22c55e",
    position: [0, 1.1, 0.1] as [number, number, number],
    meridians: ["Kalp (HT)", "Karaciğer (LR)"]
  },
  {
    id: "solar_plexus",
    name: "Solar Pleksus",
    trName: "Manipura",
    desc: "Güç ve kimlik merkezi. Kaygı ve kontrol sorunları burada kök salar.",
    color: "#eab308",
    position: [0, 0.85, 0.1] as [number, number, number],
    meridians: ["Mide (ST)", "Dalak"]
  },
  {
    id: "sacral",
    name: "Sakral Merkez",
    trName: "Svadhisthana",
    desc: "Yaratıcılık ve ilişki enerjisinin merkezi.",
    color: "#f97316",
    position: [0, 0.55, 0.05] as [number, number, number],
    meridians: ["Böbrek (KI)"]
  },
  {
    id: "root",
    name: "Kök Çakra",
    trName: "Muladhara",
    desc: "Güvenlik ve hayatta kalma içgüdülerinin merkezi. Travma çalışmasının temeli.",
    color: "#ef4444",
    position: [0, 0.3, 0.05] as [number, number, number],
    meridians: ["Böbrek (KI)", "Mesane"]
  },
];
```

---

## Adım 4 — Story Section Entegrasyonu

### Terapi Hikayesi Akışı

`app/the-story/page.tsx` sayfasına interaktif 3D sahneyi entegre edin:

```tsx
// app/the-story/page.tsx içine eklenecek bölüm

import dynamic from 'next/dynamic';

// SSR'sız yükleme (Three.js browser-only)
const TherapyScene3D = dynamic(
  () => import('@/components/Client/TherapyScene3D'),
  { ssr: false, loading: () => <div className="h-[600px] bg-[#2B3530] rounded animate-pulse" /> }
);

// Sayfa içinde:
<section className="space-y-12 border-b border-[#ced1bf]/15 pb-16">
  <div className="space-y-4 max-w-3xl">
    <span className="text-xs text-[#ca7d57] font-semibold tracking-widest uppercase">
      İnteraktif Deneyim
    </span>
    <h2 className="text-3xl md:text-40 font-light text-white leading-tight">
      Bir Terapi Seansı: Enerji Haritanız
    </h2>
    <p className="text-base font-light text-[#ced1bf]/75 leading-relaxed">
      Terapiye gelen bir kişinin enerji haritasını keşfedin. 
      Vücut üzerindeki parlayan noktalara tıklayarak her bölgenin 
      duygusal ve fiziksel anlamını öğrenin.
    </p>
  </div>
  <TherapyScene3D />
</section>
```

---

## Adım 5 — Yeni Bileşen: TherapyScene3D

`components/Client/TherapyScene3D.tsx` olarak yeni bileşen oluşturun.

Mevcut `Meridian3D.tsx` kodunu temel alarak şu değişiklikleri yapın:

### Değişiklik Listesi

1. **Mannequin → GLB Model**
   - `bodyGroup` ve `wireGroup` geometrilerini kaldırın
   - GLTFLoader ile `/public/models/therapy-client.glb` yükleyin
   - `AnimationMixer` ile "Breathing Idle" animasyonu ekleyin

2. **Zemin ve Ortam**
   - Zemin düzlemi ekleyin
   - Arka duvar ekleyin  
   - Ambient particle sistemi ekleyin

3. **Gelişmiş Işıklar**
   - SpotLight (yukarıdan yumuşak)
   - PointLight (warm + cool dolgu)
   - Gölge aktif

4. **Çakra/Enerji Noktaları**
   - Meridyan noktaları yerine veya ek olarak çakra noktaları
   - Her noktanın kendine özgü rengi ve aura efekti

5. **Kamera Davranışı**
   - Başlangıç pozisyonu: Biraz uzaktan, figürü tam gören açı
   - Tıklama ile yakınlaşma: Kameranın tıklanan bölgeye smooth hareket
   - "Sıfırla" butonu

6. **UI Paneli Güncellemesi**
   - Meridyan listesi yerine çakra/bölge listesi
   - Her bölge için: isim, duygu, bağlantılı meridyanlar, terapi yaklaşımı

---

## Adım 6 — OrbitControls Entegrasyonu (Önerilen)

Mevcut manuel drag sistemi yerine Three.js'in yerleşik OrbitControls'u kullanın:

```typescript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1.5;
controls.maxDistance = 4;
controls.maxPolarAngle = Math.PI / 1.8; // Zeminin altına gitmesin
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// Click durumunda autoRotate kapat
container.addEventListener('pointerdown', () => {
  controls.autoRotate = false;
});

// animate() içine ekle:
controls.update();
```

---

## Adım 7 — Environment Map (HDRI Ortam Aydınlatması)

Daha gerçekçi yansımalar için:

```typescript
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const pmremGenerator = new THREE.PMREMGenerator(renderer);
new RGBELoader()
  .setPath('/hdri/')
  .load('therapy-room.hdr', (texture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    scene.background = envMap;
    texture.dispose();
    pmremGenerator.dispose();
  });
```

Ücretsiz HDRI: https://polyhaven.com/hdris (indoor/studio kategorisi)

---

## Dosya Yapısı (Son Durum)

```
Elementis-SOTD/
├── public/
│   ├── models/
│   │   └── therapy-client.glb        ← Yeni: Mixamo'dan indirilecek
│   └── hdri/
│       └── therapy-room.hdr          ← Opsiyonel: polyhaven.com
├── components/Client/
│   ├── Meridian3D.tsx                 ← Mevcut (değişmeyecek)
│   └── TherapyScene3D.tsx             ← Yeni bileşen
└── app/the-story/
    └── page.tsx                       ← TherapyScene3D entegre edilecek
```

---

## Hızlı Başlangıç için AI Promptu

Aşağıdaki prompt'u Cursor, Claude veya ChatGPT'ye verin:

---

```
Bir Next.js + Three.js projesinde çalışıyorum. 
Dosya: components/Client/TherapyScene3D.tsx oluştur.

Gereksinimler:
1. Three.js ile WebGL sahne
2. GLTFLoader ile /public/models/therapy-client.glb yükle
   (model yoksa Mixamo'dan indirilen basit bir insan figürü kullan)
3. AnimationMixer ile "idle breathing" animasyonu oynat
4. OrbitControls ile döndürme/zoom
5. Sahne: koyu yeşil zemin (#2B3530), yumuşak SpotLight üstten, 
   warm PointLight soldan, ambient partiküller
6. 5 tıklanabilir enerji noktası (çakralar):
   - Taç (mor, y:1.75)
   - Kalp (yeşil, y:1.1) 
   - Solar pleksus (sarı, y:0.85)
   - Sakral (turuncu, y:0.55)
   - Kök (kırmızı, y:0.3)
7. Her noktaya tıklayınca:
   - Kamera smooth yakınlaşır
   - HTML overlay tooltip açılır (Türkçe bilgi)
   - Diğer noktalar solar/dim olur
8. Sağ panelde tıklanan çakranın detaylı bilgisi
9. "use client" direktifi — SSR yok
10. TypeScript, mevcut Tailwind renk şeması: bg-[#2B3530], text-[#ced1bf], accent [#ca7d57]

Mevcut Meridian3D.tsx dosyası referans için:
[Meridian3D.tsx içeriğini buraya yapıştırın]
```

---

## Öncelik Sırası

1. **İlk adım (en kritik)**: Mixamo'dan GLB model indir → `public/models/therapy-client.glb`
2. **İkinci adım**: `TherapyScene3D.tsx` oluştur (Meridian3D.tsx temel alınarak)
3. **Üçüncü adım**: `app/the-story/page.tsx`'e entegre et
4. **Dördüncü adım**: Animasyon, ışık ve atmosfer iyileştirmeleri
5. **Beşinci adım (opsiyonel)**: HDRI ortam haritası

---

## Tahmini Süre

| Adım | Süre |
|------|------|
| GLB model hazırlama | 30 dk |
| TherapyScene3D yazma | 2-3 saat |
| Story page entegrasyonu | 30 dk |
| İnce ayar ve test | 1 saat |
| **Toplam** | **~4-5 saat** |
