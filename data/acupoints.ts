import { Acupoint } from "../types/meridian";

export const ACUPOINTS: Acupoint[] = [
  {
    id: "yintang",
    code: "Yintang",
    name: "Yintang",
    trName: "Zihin Sarayı (Alın Noktası)",
    meridian: "gv", // Extra/Governing Vessel association
    bodyRegion: "face",
    side: "center",
    position: [0.0, 0.82, 0.08],
    labelOffset: [0.25, 0.05, 0.05],
    description: "Zihni sakinleştirir, stresi azaltır ve içsel sezgiyi güçlendirir. Uykusuzluk, baş ağrısı ve yoğun endişe hallerinde çok etkilidir.",
    location: "İki kaşın tam ortasında, alnın merkez noktasındadır.",
    benefits: [
      "Zihinsel berraklık kazandırır",
      "Kaygıyı ve derin stresi yatıştırır",
      "Uykusuzluğu gidermeye yardımcı olur",
      "Göz yorgunluğunu hafifletir"
    ],
    caution: "Çok yumuşak basınç uygulayın. Hamilelikte ve cilt lezyonlarında sert baskıdan kaçının."
  },
  {
    id: "tianfu",
    code: "LU3",
    name: "Tianfu",
    trName: "Cennet Sarayı",
    meridian: "lu",
    bodyRegion: "arm",
    side: "right",
    position: [0.22, 0.55, 0.03],
    labelOffset: [0.28, 0.0, 0.0],
    description: "Akciğer enerjisini (Qi) temizler ve aşağıya yönlendirir. Solunum güçlüğü, astım belirtileri ve göğüsteki sıkışma hissini rahatlatır.",
    location: "Kolun ön kısmında, koltuk altı kıvrımının 3 cun (yaklaşık 4 parmak) altında, biceps kasının radial kenarındadır.",
    benefits: [
      "Nefesi derinleştirir ve rahatlatır",
      "Göğüs kafesindeki tıkanıklığı açar",
      "Hafif öksürük ve hırıltıyı yatıştırır"
    ],
    caution: "Derin ve sivri basılmamalı, sadece hafif dairesel masaj yapılmalıdır."
  },
  {
    id: "neiguan",
    code: "PC6",
    name: "Neiguan",
    trName: "İç Kapı",
    meridian: "pc",
    bodyRegion: "arm",
    side: "left",
    position: [-0.26, 0.15, 0.04],
    labelOffset: [-0.28, 0.0, 0.0],
    description: "Bulantı, kusma ve mide rahatsızlıklarını gidermede dünya çapında bilinen en etkili akupresür noktasıdır. Kalbi ve zihni yatıştırır.",
    location: "El bilek çizgisine yaklaşık 2 cun (3 parmak) mesafede, iki tendon (flexor carpi radialis ve palmaris longus) arasındadır.",
    benefits: [
      "Bulantıyı (seyahat, gebelik veya stres kaynaklı) hızla keser",
      "Çarpıntıyı ve ani kaygı krizlerini yatıştırır",
      "Uykusuzluğa ve iç gerginliğe iyi gelir"
    ],
    caution: "Tendonların arasına dik ve çok sert baskı yapmayın; parmak ucuyla dairesel bastırın."
  },
  {
    id: "qihai",
    code: "CV6",
    name: "Qihai",
    trName: "Enerji Denizi",
    meridian: "cv",
    bodyRegion: "abdomen",
    side: "center",
    position: [0.0, 0.22, 0.09],
    labelOffset: [0.25, 0.0, 0.0],
    description: "Bedendeki birincil yaşam enerjisi (Yuan Qi) deposudur. Kronik yorgunluk, bağışıklık zayıflığı ve yaşamsal çöküş durumlarında temel şifa kapısıdır.",
    location: "Karın ön orta hattında, göbeğin yaklaşık 1.5 cun (iki parmak eninde) altındadır.",
    benefits: [
      "Genel bedensel enerjiyi ve vitaliteyi artırır",
      "Bağışıklık sistemini destekler ve güçlendirir",
      "Sindirim gücünü artırır ve gazı azaltır"
    ],
    caution: "Hamilelik döneminde karın bölgesindeki bu noktaya kesinlikle baskı uygulanmamalıdır."
  },
  {
    id: "zusanli",
    code: "ST36",
    name: "Zusanli",
    trName: "Üç Mil Noktası",
    meridian: "st",
    bodyRegion: "leg",
    side: "right",
    position: [0.12, -0.65, 0.05],
    labelOffset: [0.25, 0.0, 0.0],
    description: "Çin tıbbında 'Tüm Hastalıkların Şifa Noktası' olarak bilinir. Sindirimi düzenler, kas yorgunluğunu anında giderir ve genel gücü artırır.",
    location: "Diz kapağının alt kenarından 3 cun (4 parmak) aşağıda, kaval kemiğinin (tibia) dış kenarından bir parmak lateralde.",
    benefits: [
      "Sindirim sistemini uyarır, şişkinliği ve hazımsızlığı çözer",
      "Bağışıklık hücresi üretimini artırır",
      "Bacak kaslarındaki yorgunluğu ve ağrıları giderir",
      "Zihinsel yorgunluğa karşı zindelik verir"
    ],
    caution: "Akut ateşli hastalıklarda uyarılmamalıdır."
  },
  {
    id: "hegu",
    code: "LI4",
    name: "Hegu",
    trName: "Vadi Birleşimi",
    meridian: "li",
    bodyRegion: "hand",
    side: "left",
    position: [-0.32, 0.06, 0.03],
    labelOffset: [-0.28, -0.05, 0.0],
    description: "Tüm bedendeki ağrıları giderme özelliğiyle tanınan en güçlü ağrı kesici noktadır. Baş ağrısı, diş ağrısı ve stres için birincil odak noktasıdır.",
    location: "Başparmak ile işaret parmağı arasındaki birinci dorsal interosseus kasının en yüksek olduğu tümsekte yer alır.",
    benefits: [
      "Şiddetli baş, diş ve boyun ağrılarını hafifletir",
      "Vücuttaki toksinlerin atılmasını ve bağırsak hareketini uyarır",
      "Sinüs yollarını açar, grip semptomlarını azaltır"
    ],
    caution: "UYARI: Rahim kasılmalarını tetikleyebileceğinden, hamile kadınlarda bu noktaya BASILMAMALIDIR."
  },
  {
    id: "sanyinjiao",
    code: "SP6",
    name: "Sanyinjiao",
    trName: "Üç Yin Birleşimi",
    meridian: "sp",
    bodyRegion: "leg",
    side: "left",
    position: [-0.08, -0.82, 0.04],
    labelOffset: [-0.25, 0.0, 0.0],
    description: "Karaciğer, Böbrek ve Dalak Yin meridyenlerinin kesiştiği çok önemli bir kadın sağlığı ve hormon dengeleme noktasıdır. Sinir sistemini yatıştırır.",
    location: "İci ayak bileği kemiğinin (medial malleolus) en yüksek noktasından 3 cun (4 parmak) yukarıda, kaval kemiğinin hemen arkasındadır.",
    benefits: [
      "Hormonal sistemi dengeler, regl sancılarını hafifletir",
      "Uykusuzluğu, stres kaynaklı çarpıntıyı azaltır",
      "Ödem atılımına ve sıvı dengesine yardımcı olur"
    ],
    caution: "UYARI: Hegu gibi rahim kasılmalarını uyarabilir; hamilelik süresince bu noktaya baskı yapılmamalıdır."
  },
  {
    id: "taichong",
    code: "LR3",
    name: "Taichong",
    trName: "Büyük Taşkın",
    meridian: "lr",
    bodyRegion: "foot",
    side: "right",
    position: [0.09, -0.96, 0.06],
    labelOffset: [0.22, 0.05, 0.0],
    description: "Öfke, kızgınlık, hayal kırıklığı ve stres kaynaklı enerji sıkışmalarını çözmede en etkili arınma noktalarından biridir. Karaciğer Qi'sini serbest bırakır.",
    location: "Ayak sırtında, birinci ve ikinci ayak parmak kemiklerinin birleştiği çöküntü alandadır.",
    benefits: [
      "Öfkeyi, sinirliliği ve kas spazmlarını yatıştırır",
      "Baş ağrısını, migreni ve göz kuruluğunu azaltır",
      "Kan dolaşımını ve karaciğer detoksunu uyarır"
    ],
    caution: "Çok hassas bir nokta olabilir; parmağı bastırıp hafifçe geri çekerek dairesel uyarın."
  },
  {
    id: "shenmen",
    code: "HT7",
    name: "Shenmen",
    trName: "Ruh Kapısı",
    meridian: "ht",
    bodyRegion: "hand",
    side: "left",
    position: [-0.27, 0.12, 0.03],
    labelOffset: [-0.28, 0.05, 0.0],
    description: "Doğrudan ruhsal dinginliği (Shen) besler. Anksiyete, panik hissi, heyecan ve uykuya dalamama durumlarında zihni saniyeler içinde yatıştırır.",
    location: "El bileği kıvrımının en ulnar (serçe parmak tarafı) ucunda, tendonun (flexor carpi ulnaris) hemen radial tarafındaki çöküntüdedir.",
    benefits: [
      "Çarpıntı, aşırı heyecan ve panik halini yatıştırır",
      "Zihni sakinleştirerek derin bir uykuya hazırlar",
      "Duygusal çalkantıları dengeler"
    ],
    caution: "Derin tendonların olduğu bir bölgedir; parmak ucuyla nazikçe basınç uygulayın."
  },
  {
    id: "baihui",
    code: "GV20",
    name: "Baihui",
    trName: "Yüz Buluşma Noktası",
    meridian: "gv",
    bodyRegion: "head",
    side: "center",
    position: [0.0, 0.95, 0.0],
    labelOffset: [-0.22, 0.15, -0.05],
    description: "Bütün enerjiyi başa çeken ve yukarı kaldıran 'Tepe Çakrası' eşdeğeridir. Hafızayı güçlendirir, kronik baş dönmesini giderir ve depresif hisleri azaltır.",
    location: "Başın en üst tepe noktasında, iki kulak kepçesinin en yüksek noktalarını birleştiren çizginin tam ortasındadır.",
    benefits: [
      "Zihni yukarı kaldırır, odaklanmayı ve hafızayı uyarır",
      "Depresif veya yorgun ruh hallerine canlılık getirir",
      "Baş ağrısı ve vertigo hissini azaltır"
    ],
    caution: "Bebeklerde (bıngıldak açıkken) ve kafatası travması geçirmiş kişilerde bu noktaya basılmamalıdır."
  }
];
