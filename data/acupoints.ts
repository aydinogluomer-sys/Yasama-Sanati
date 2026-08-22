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
    description: "Geleneksel Çin tıbbında zihinsel dinginlik ve iç odak temalarıyla ilişkilendirilen, alnın merkezindeki klasik noktadır.",
    location: "İki kaşın tam ortasında, alnın merkez noktasındadır.",
    benefits: [
      "Zihinsel berraklık temasıyla ilişkilendirilir",
      "Sakinleşme pratiklerinde kullanılır",
      "Uyku öncesi dinginlik rutinlerinde tercih edilir",
      "Göz çevresini dinlendirme amaçlı kullanılır"
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
    description: "Geleneksel öğretide akciğer Qi'sinin akışıyla ve göğüs alanının açıklığıyla ilişkilendirilen noktadır.",
    location: "Kolun ön kısmında, koltuk altı kıvrımının 3 cun (yaklaşık 4 parmak) altında, biceps kasının radial kenarındadır.",
    benefits: [
      "Derin nefes çalışmalarında kullanılır",
      "Göğüs alanını açma pratiklerinde kullanılır",
      "Solunum temasıyla ilişkilendirilir"
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
    description: "Geleneksel akupresür pratiğinde en çok bilinen noktalardan biridir; mide bölgesi ve zihinsel sükunet temalarıyla ilişkilendirilir.",
    location: "El bilek çizgisine yaklaşık 2 cun (3 parmak) mesafede, iki tendon (flexor carpi radialis ve palmaris longus) arasındadır.",
    benefits: [
      "Mide bölgesi temasıyla ilişkilendirilir",
      "Sakinleşme pratiklerinde kullanılır",
      "İç gerginliği gevşetme rutinlerinde kullanılır"
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
    description: "Geleneksel öğretide birincil yaşam enerjisinin (Yuan Qi) deposu sayılan, alt karın bölgesindeki merkez noktadır.",
    location: "Karın ön orta hattında, göbeğin yaklaşık 1.5 cun (iki parmak eninde) altındadır.",
    benefits: [
      "Genel canlılık temasıyla ilişkilendirilir",
      "Geleneksel öğretide direnç temasıyla anılır",
      "Sindirim ritmi temasıyla ilişkilendirilir"
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
    description: "Geleneksel Çin tıbbının en çok anılan noktalarından biridir; sindirim ritmi ve genel canlılık temalarıyla ilişkilendirilir.",
    location: "Diz kapağının alt kenarından 3 cun (4 parmak) aşağıda, kaval kemiğinin (tibia) dış kenarından bir parmak lateralde.",
    benefits: [
      "Sindirim ritmi temasıyla ilişkilendirilir",
      "Geleneksel öğretide direnç temasıyla anılır",
      "Bacak bölgesini gevşetme pratiklerinde kullanılır",
      "Zindelik temasıyla ilişkilendirilir"
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
    description: "Geleneksel öğretide el sırtındaki en bilinen noktadır; baş ve yüz bölgesi temalarıyla ilişkilendirilir.",
    location: "Başparmak ile işaret parmağı arasındaki birinci dorsal interosseus kasının en yüksek olduğu tümsekte yer alır.",
    benefits: [
      "Baş ve boyun bölgesi temasıyla ilişkilendirilir",
      "Geleneksel öğretide arınma temasıyla anılır",
      "Yüz ve sinüs bölgesi temasıyla ilişkilendirilir"
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
    description: "Geleneksel öğretide Karaciğer, Böbrek ve Dalak Yin meridyenlerinin kesişimi olarak tarif edilen noktadır.",
    location: "İci ayak bileği kemiğinin (medial malleolus) en yüksek noktasından 3 cun (4 parmak) yukarıda, kaval kemiğinin hemen arkasındadır.",
    benefits: [
      "Geleneksel öğretide döngüsel denge temasıyla anılır",
      "Dinginlik rutinlerinde kullanılır",
      "Geleneksel öğretide sıvı dengesi temasıyla anılır"
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
    description: "Geleneksel öğretide Karaciğer Qi'sinin akışı ve öfke temasıyla ilişkilendirilen noktadır.",
    location: "Ayak sırtında, birinci ve ikinci ayak parmak kemiklerinin birleştiği çöküntü alandadır.",
    benefits: [
      "Öfke temasıyla ilişkilendirilir",
      "Baş bölgesi ve göz çevresi temasıyla anılır",
      "Geleneksel öğretide Karaciğer Qi akışıyla anılır"
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
    description: "Geleneksel öğretide ruhsal dinginlik (Shen) temasıyla ilişkilendirilen, bilek içindeki noktadır.",
    location: "El bileği kıvrımının en ulnar (serçe parmak tarafı) ucunda, tendonun (flexor carpi ulnaris) hemen radial tarafındaki çöküntüdedir.",
    benefits: [
      "Yoğun duygusal anlarda sakinleşme amaçlı kullanılır",
      "Uyku öncesi dinginlik rutinlerinde kullanılır",
      "Duygusal denge temasıyla ilişkilendirilir"
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
    description: "Geleneksel öğretide başın tepesindeki buluşma noktasıdır; yukarı yönlü enerji ve zihinsel açıklık temalarıyla ilişkilendirilir.",
    location: "Başın en üst tepe noktasında, iki kulak kepçesinin en yüksek noktalarını birleştiren çizginin tam ortasındadır.",
    benefits: [
      "Odaklanma temasıyla ilişkilendirilir",
      "Canlılık temasıyla ilişkilendirilir",
      "Baş bölgesi temasıyla ilişkilendirilir"
    ],
    caution: "Bebeklerde (bıngıldak açıkken) ve kafatası travması geçirmiş kişilerde bu noktaya basılmamalıdır."
  }
];
