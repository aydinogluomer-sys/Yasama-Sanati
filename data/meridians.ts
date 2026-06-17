import { Meridian } from "../types/meridian";

export const MERIDIANS: Meridian[] = [
  {
    id: "lu",
    name: "Akciğer Meridyeni",
    shortName: "LU",
    color: "#ffffff", // Metal (White)
    element: "Metal",
    time: "03:00 - 05:00",
    emotion: "Hüzün & Bırakabilme",
    physical: "Solunum sistemi, cilt, bağışıklık gücü",
    desc: "Yaşam enerjisinin (Qi) dış dünyadan bedenimize ana giriş kapısıdır. Solunum kalitesi ve direnç seviyemizi yönetir.",
    points: [
      [0.06, 0.60, 0.08],
      [0.12, 0.70, 0.06], // LU1 (Chest)
      [0.18, 0.65, 0.04], 
      [0.22, 0.55, 0.03], // LU3 (Tianfu)
      [0.28, 0.30, 0.02],  // LU7 (Forearm)
      [0.34, 0.11, 0.02],  // LU9 (Wrist)
    ]
  },
  {
    id: "ht",
    name: "Kalp Meridyeni",
    shortName: "HT",
    color: "#ef4444", // Fire (Red)
    element: "Ateş",
    time: "11:00 - 13:00",
    emotion: "Sevgi, Neşe & Huzur",
    physical: "Kalp, kan dolaşımı, uyku, zihinsel odak",
    desc: "Zihnin ve duyguların merkezidir. İçsel neşeyi, ruhsal dinginliği ve sevgi akışını kontrol eder.",
    points: [
      [-0.04, 0.55, 0.08],
      [-0.10, 0.53, 0.06], // HT1 (Axilla)
      [-0.18, 0.40, 0.03], 
      [-0.24, 0.29, 0.02],
      [-0.27, 0.12, 0.03], // HT7 (Shenmen)
      [-0.32, 0.09, 0.02], // HT9 (Pinky Finger)
    ]
  },
  {
    id: "st",
    name: "Mide Meridyeni",
    shortName: "ST",
    color: "#fbbf24", // Earth (Yellow)
    element: "Toprak",
    time: "07:00 - 09:00",
    emotion: "Endişe & Hazım",
    physical: "Sindirim organları, bacak gücü, yüz kasları",
    desc: "Dış dünyadan aldığımız besinleri ve hayat deneyimlerini hazmetme yeteneğimizi temsil eder.",
    points: [
      [0.03, 0.98, 0.08],  // ST1 (Under eye)
      [0.05, 0.90, 0.07],  
      [0.08, 0.70, 0.08],   
      [0.06, 0.43, 0.09],  // ST25 (Tianshu)
      [0.08, -0.15, 0.06],  
      [0.10, -0.55, 0.05],  
      [0.12, -0.65, 0.05], // ST36 (Zusanli)
      [0.13, -0.80, 0.05], 
      [0.14, -0.96, 0.06], 
    ]
  },
  {
    id: "ki",
    name: "Böbrek Meridyeni",
    shortName: "KI",
    color: "#3b82f6", // Water (Blue)
    element: "Su",
    time: "17:00 - 19:00",
    emotion: "Korku & Yaşam Gücü",
    physical: "Kemikler, kulaklar, böbrekler, üreme sistemi",
    desc: "Doğumla getirdiğimiz öz yaşam enerjisinin (Jing) deposudur. Cesaret, irade ve canlılık merkezidir.",
    points: [
      [-0.10, -0.96, 0.02], // KI1 (Sole)
      [-0.07, -0.92, 0.03], // KI3 (Inner ankle)
      [-0.06, -0.75, 0.03],  
      [-0.04, -0.55, 0.03],  
      [-0.03, -0.30, 0.04],   
      [-0.015, 0.03, 0.05],  
      [-0.015, 0.43, 0.06],   
      [-0.018, 0.60, 0.06],  
      [-0.025, 0.73, 0.06],  // KI27 (Collarbone)
    ]
  },
  {
    id: "lr",
    name: "Karaciğer Meridyeni",
    shortName: "LR",
    color: "#10b981", // Wood (Green)
    element: "Ağaç",
    time: "01:00 - 03:00",
    emotion: "Öfke & Vizyonerlik",
    physical: "Karaciğer, tendonlar, göz sağlığı, detoks",
    desc: "Bedenin genel enerji akışının serbest olmasını yönetir. Planlama, yaratıcılık ve vizyon gücümüzü uyarır.",
    points: [
      [0.10, -0.97, 0.06], // LR1 (Big Toe)
      [0.09, -0.96, 0.06], // LR3 (Taichong)
      [0.08, -0.75, 0.03],   
      [0.06, -0.55, 0.03],  
      [0.04, -0.30, 0.04],  
      [0.03, 0.10, 0.05],  
      [0.04, 0.43, 0.06],  
      [0.04, 0.55, 0.06],  // LR14 (Ribcage)
    ]
  },
  {
    id: "li",
    name: "Kalın Bağırsak Meridyeni",
    shortName: "LI",
    color: "#a1a1aa", // Metal/Gray
    element: "Metal",
    time: "05:00 - 07:00",
    emotion: "Tutma & Arınma",
    physical: "Kalın bağırsak, cilt sağlığı, boşaltım sistemi",
    desc: "Hem fiziksel hem zihinsel olarak artık bize hizmet etmeyen, toksik yükleri serbest bırakma ve arınma kanalıdır.",
    points: [
      [-0.34, 0.07, 0.02],  
      [-0.32, 0.06, 0.03], // LI4 (Hegu)
      [-0.28, 0.27, 0.02], 
      [-0.22, 0.39, 0.03], // LI11 (Elbow crease)
      [-0.14, 0.70, 0.04], 
      [-0.05, 0.83, 0.06], 
      [0.0, 0.92, 0.08],
      [0.015, 0.96, 0.08], // LI20 (Nose)
    ]
  },
  {
    id: "pc",
    name: "Perikard Meridyeni",
    shortName: "PC",
    color: "#ec4899", // Fire (Pink)
    element: "Ateş",
    time: "19:00 - 21:00",
    emotion: "Duygusal Koruma & Samimiyet",
    physical: "Perikard (kalp zarı), damarlar, otonom sinir sistemi",
    desc: "Kalbi duygusal travmalardan ve aşırı uyarılmalardan koruyan koruyucu kalkandır. İlişkilerde açıklık sağlar.",
    points: [
      [-0.04, 0.55, 0.07],
      [-0.12, 0.50, 0.06],
      [-0.18, 0.39, 0.04],
      [-0.24, 0.27, 0.03],
      [-0.26, 0.15, 0.04], // PC6 (Neiguan)
      [-0.30, 0.11, 0.02],
    ]
  },
  {
    id: "sp",
    name: "Dalak Meridyeni",
    shortName: "SP",
    color: "#d97706", // Earth (Orange/Amber)
    element: "Toprak",
    time: "09:00 - 11:00",
    emotion: "Düşünce Karmaşası & Denge",
    physical: "Dalak, pankreas, kas tonusu, sıvı dengesi",
    desc: "Besinlerin özünü çıkarıp bedene yaymaktan sorumludur. Konsantrasyon, odaklanma ve zihinsel berraklık kazandırır.",
    points: [
      [-0.10, -0.97, 0.06],
      [-0.09, -0.95, 0.05],
      [-0.08, -0.82, 0.04], // SP6 (Sanyinjiao)
      [-0.06, -0.55, 0.03],
      [-0.04, -0.30, 0.04],
      [-0.05, 0.10, 0.05],
      [-0.06, 0.43, 0.06],
      [-0.08, 0.63, 0.06],
    ]
  },
  {
    id: "cv",
    name: "Konsept Damarı (Ren Mai)",
    shortName: "CV",
    color: "#06b6d4", // Cyan
    element: "Yin",
    time: "Sürekli",
    emotion: "Besleme & Kabullenme",
    physical: "Ön gövde orta hattı, üreme sistemi, iç salgılar",
    desc: "Bedendeki tüm Yin meridyenlerinin denizidir. Bedeni besler, hamileliği yönetir ve derin kabullenme enerjisi taşır.",
    points: [
      [0.0, -0.05, 0.09],
      [0.0, 0.10, 0.09],
      [0.0, 0.22, 0.09], // CV6 (Qihai)
      [0.0, 0.43, 0.08],
      [0.0, 0.60, 0.08],
      [0.0, 0.75, 0.07],
      [0.0, 0.85, 0.07],
      [0.0, 0.95, 0.08],
    ]
  },
  {
    id: "gv",
    name: "Yönetici Damar (Du Mai)",
    shortName: "GV",
    color: "#8b5cf6", // Purple
    element: "Yang",
    time: "Sürekli",
    emotion: "Koruma & İrade",
    physical: "Arka omurga orta hattı, beyin, sinir sistemi",
    desc: "Bedendeki tüm Yang meridyenlerinin denizidir. İrade gücü, dik duruş, omurga sağlığı ve zihinsel uyanıklık sağlar.",
    points: [
      [0.0, -0.05, -0.09],
      [0.0, 0.23, -0.09],
      [0.0, 0.50, -0.08],
      [0.0, 0.77, -0.07],
      [0.0, 0.95, -0.05],
      [0.0, 0.95, 0.0], // GV20 (Baihui)
      [0.0, 0.82, 0.08], // GV24.5 (Yintang)
      [0.0, 0.77, 0.09],
    ]
  }
];
