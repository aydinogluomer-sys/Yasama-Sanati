export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string; // HTML-safe content for reading
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sifa-bir-teknik-degildir-butunsel-saglik",
    title: "Şifa Bir Teknik Değildir: Bütünsel Sağlığa Giden Yol",
    category: "Bütünsel Şifa",
    date: "24 Mayıs 2026",
    excerpt: "Modern tıp semptomları bastırmaya odaklanırken, kadim öğretiler bizi bir bütün olarak ele alır. Fiziksel bir rahatsızlığın ardındaki zihinsel ve enerjetik kökleri bulup bunları dönüştürmediğimiz sürece gerçek şifalanma gerçekleşemez.",
    readTime: "7 Dk",
    coverImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Elif Kozanoğlu",
      role: "Kurucu & Eğitmen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    },
    tags: ["Bütünsel Sağlık", "Kadim Öğretiler", "Farkındalık", "Enerji Bedeni"],
    content: `
      <p class="lead text-lg text-[#ced1bf]/90 mb-8 font-light">Modern tıp semptomları bastırmaya odaklanırken, kadim öğretiler bizi bir bütün olarak ele alır. Fiziksel bir rahatsızlığın ardındaki zihinsel ve enerjetik kökleri bulup bunları dönüştürmediğimiz sürece gerçek şifalanma gerçekleşemez.</p>
      
      <p class="mb-6">Hepimiz hayatımızın bir döneminde kendimizi fiziksel veya duygusal olarak tıkanmış hissetmişizdir. Genellikle bu durumlarda hemen en yakın semptom gidericiye koşarız: Bir ağrı kesici, geçici bir rahatlama seansı ya da zihnimizi dağıtacak bir meşguliyet. Ancak gerçek şifa, sadece belirtileri yok etmekle değil, bu belirtilerin altındaki derin mesajları okumakla başlar.</p>
      
      <blockquote class="border-l-2 border-[#ca7d57] pl-6 my-8 italic text-lg text-white/90 font-light">
        "Şifa bir teknik değil, bir yaşama sanatıdır. Bedeni, zihni ve ruhu aynı anda besleyen bir uyum sürecidir."
      </blockquote>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Bütünsel Sağlık Nedir?</h3>
      <p class="mb-6">Bütünsel şifa yaklaşımında, insan varlığı sadece et ve kemikten oluşan biyolojik bir makine olarak görülmez. Bizler fiziksel bedenimiz, zihinsel yapımız, duygusal dünyamız ve enerjetik alanımızla bir bütünüz. Bir bölgede meydana gelen tıkanıklık (örneğin aşırı zihinsel yorgunluk), er ya da geç fiziksel bedende ağrı veya hastalık olarak kendini gösterir.</p>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Altı Şifa Disiplininin Ortak Rolü</h3>
      <p class="mb-6">Nefes Koçluğu, Meridyen Terapisi, Hipnoterapi ve Reiki gibi farklı kadim ve modern teknikler aslında aynı amaca hizmet eder: Bedenin kendi kendini iyileştirme gücünü (homeostazis) harekete geçirmek.</p>
      <ul class="list-disc list-inside space-y-3 mb-8 text-[#ced1bf]/80 font-light">
        <li><strong>Nefes:</strong> Oksijenlenmeyi artırarak sinir sistemini dengeler ve hücresel düzeyde toksin atımını hızlandırır.</li>
        <li><strong>Meridyenler:</strong> Akupunktur noktaları boyunca akan yaşam enerjisini (Qi) dengeleyerek organların fonksiyonlarını düzenler.</li>
        <li><strong>Zihinsel Dönüşüm:</strong> Bilinçaltı seviyesinde çalışan hipnoterapi gibi yöntemlerle bizi sınırlayan eski inanç kalıplarını serbest bırakır.</li>
        <li><strong>Reiki:</strong> Evrensel yaşam enerjisini doğrudan çakralarımıza aktararak derin bir zihinsel ve fiziksel dinlenme sağlar.</li>
      </ul>

      <p class="mb-6">Kendinize şu soruyu sorun: En son ne zaman sadece nefesinizle baş başa kaldınız ve bedeninizin ne anlatmak istediğini dinlediniz? Şifalanma süreci bir yolculuktur ve bu yolculukta atacağınız ilk adım, kendi bütünlüğünüzü kabul etmektir.</p>
    `
  },
  {
    slug: "dogal-nefese-donmenin-3-altin-kurali",
    title: "Günlük Yaşamda Doğal Nefese Dönmenin 3 Altın Kuralı",
    category: "Nefes Koçluğu",
    date: "12 Mayıs 2026",
    excerpt: "Nefesimiz, fiziksel ve zihinsel durumumuzun anlık aynasıdır. Gün içinde farkında olmadan tuttuğumuz veya sığlaştırdığımız nefesleri serbest bırakarak stresi azaltmanın ve yaşam enerjisini (Qi) dengelemenin pratik yolları.",
    readTime: "5 Dk",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Elif Kozanoğlu",
      role: "Kurucu & Eğitmen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    },
    tags: ["Nefes", "Stres Yönetimi", "Pranayama", "Zindelik"],
    content: `
      <p class="lead text-lg text-[#ced1bf]/90 mb-8 font-light">Nefesimiz, fiziksel ve zihinsel durumumuzun anlık aynasıdır. Gün içinde farkında olmadan tuttuğumuz veya sığlaştırdığımız nefesleri serbest bırakarak stresi azaltmanın ve yaşam enerjisini (Qi) dengelemenin pratik yolları.</p>
      
      <p class="mb-6">Doğduğumuz ilk an aldığımız derin ve doğal nefes, büyüdükçe yerini stres, endişe ve toplumsal kalıplarla sınırlandırılmış sığ göğüs nefeslerine bırakır. Doğal nefes, diyaframın aktif olarak kullanıldığı, çaba sarf etmeden akan ve tüm bedeni besleyen nefestir. İşte günün her anında bu doğal akışa dönmenizi sağlayacak 3 altın kural:</p>

      <h3 class="text-24 font-light text-white mt-10 mb-4">1. Burun Nefesine Öncelik Verin</h3>
      <p class="mb-6">Burun, nefes almak için tasarlanmış özel bir organdır. Aldığımız havayı filtre eder, ısıtır, nemlendirir ve akciğerlerimize en uygun seviyeye getirir. Ağızdan alınan nefes ise sinir sistemine sürekli bir 'savaş veya kaç' sinyali gönderir. Gün boyunca ağzınızın kapalı, dilinizin ise damağınızda hafifçe dinleniyor olmasına özen gösterin.</p>

      <h3 class="text-24 font-light text-white mt-10 mb-4">2. Diyafram Kasını Hissedin (Karın Nefesi)</h3>
      <p class="mb-6">Elinizi karnınızın üzerine koyun. Nefes alırken karnınızın bir balon gibi şiştiğini, nefes verirken ise indiğini hissedin. Göğsünüzün ve omuzlarınızın yukarı kalkmadığından emin olun. Günde sadece 5 dakika boyunca bu diyafram hareketini izlemek, kortizol (stres) seviyenizi yarı yarıya indirecektir.</p>

      <blockquote class="border-l-2 border-[#ca7d57] pl-6 my-8 italic text-lg text-white/90 font-light">
        "Nefesinizi kontrol ettiğinizde zihninizi kontrol edersiniz. Nefesinizi serbest bıraktığınızda ise kendinizi serbest bırakırsınız."
      </blockquote>

      <h3 class="text-24 font-light text-white mt-10 mb-4">3. Nefes Aralarındaki Boşlukları Fark Edin</h3>
      <p class="mb-6">Nefes alıp verme döngüsü kesintisiz bir daire gibidir ancak nefes alışın bitişi ile verişin başlangıcı arasında çok ince bir dinginlik anı bulunur. Bu boşluk anlarına odaklanmak, zihindeki düşünce gürültüsünü anında keser ve sizi 'şimdi ve burada' olmanın huzuruna taşır.</p>
    `
  },
  {
    slug: "meridyen-terapisi-bedenin-enerji-aglari",
    title: "Meridyen Terapisi Nedir? Bedenin Enerji Ağlarını Keşfedin",
    category: "Meridyen Terapi",
    date: "28 Nisan 2026",
    excerpt: "Geleneksel Çin Tıbbı'nın temelini oluşturan 14 ana enerji kanalını ve bu hatlar üzerindeki tıkanıklıkların fiziksel / duygusal rahatsızlıklara olan etkilerini detaylıca inceliyoruz.",
    readTime: "6 Dk",
    coverImage: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ahmet Yılmaz",
      role: "Meridyen Terapisti",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    },
    tags: ["Meridyen", "Akupresür", "Çin Tıbbı", "Yaşam Enerjisi"],
    content: `
      <p class="lead text-lg text-[#ced1bf]/90 mb-8 font-light">Geleneksel Çin Tıbbı'nın temelini oluşturan 14 ana enerji kanalını ve bu hatlar üzerindeki tıkanıklıkların fiziksel / duygusal rahatsızlıklara olan etkilerini detaylıca inceliyoruz.</p>
      
      <p class="mb-6">Modern anatomi bize kan damarlarını ve sinir yollarını öğretir. Ancak kadim doğu bilgeliği, fiziksel bedenimizin hemen altında, gözle görülmeyen muazzam bir enerji haritası olduğunu söyler. Meridyenler, yaşam enerjimiz olan "Qi"nin tüm bedeni dolaşmasını sağlayan nehirler gibidir.</p>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Enerji Tıkanıklıkları Nasıl Oluşur?</h3>
      <p class="mb-6">Yaşadığımız travmalar, bastırılmış duygular, hareketsiz yaşam tarzı ve sağlıksız beslenme alışkanlıkları bu meridyen kanallarında tıkanıklıklara (blokajlara) yol açar. Tıpkı bir nehirde biriken çöplerin suyun akışını engellemesi gibi, enerji akışı engellendiğinde de o meridyenin beslediği organlarda fiziksel rahatsızlıklar veya kronik ağrılar baş gösterir.</p>

      <blockquote class="border-l-2 border-[#ca7d57] pl-6 my-8 italic text-lg text-white/90 font-light">
        "Bedeniniz asla yalan söylemez. Her fiziksel semptom, enerjetik bir tıkanıklığın dışa vurulmuş çığlığıdır."
      </blockquote>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Duygular ve Meridyenlerin Bağlantısı</h3>
      <p class="mb-6">Her ana meridyen kanalı, belirli bir organ ve duygu grubu ile ilişkilidir. Örneğin:</p>
      <ul class="list-disc list-inside space-y-3 mb-8 text-[#ced1bf]/80 font-light">
        <li><strong>Karaciğer Meridyeni:</strong> Öfke ve hayal kırıklığı duygularını taşır.</li>
        <li><strong>Akciğer Meridyeni:</strong> Keder, hüzün ve bırakamama durumları ile ilgilidir.</li>
        <li><strong>Böbrek Meridyeni:</strong> Korku ve güvensizlik duygularıyla bağlantılıdır.</li>
      </ul>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Meridyen Terapisinin Faydaları</h3>
      <p class="mb-6">Özel bası teknikleri (akupresür), esneme hareketleri ve enerjetik çalışmalar sayesinde tıkanıklıklar çözülür. Enerji akışı dengelendiğinde, derin bir gevşeme hissiyle birlikte bedenin kronik ağrılardan arındığı, uyku kalitesinin arttığı ve zihinsel berraklığa ulaşıldığı görülür.</p>
    `
  },
  {
    slug: "bilincalti-kaliplarini-donusturmede-hipnoterapi",
    title: "Bilinçaltı Kalıplarını Dönüştürmede Hipnoterapi Rolü",
    category: "Hipnoterapi",
    date: "15 Nisan 2026",
    excerpt: "Alışkanlıklarımızı, korkularımızı ve tekrarlayan yaşam döngülerimizi yöneten bilinçaltı düzeyine nasıl ulaşırız? Trans ve telkin yöntemlerinin derin zihinsel dönüşümlerdeki etkisi.",
    readTime: "5 Dk",
    coverImage: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Selin Aksoy",
      role: "Klinik Hipnoterapist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
    tags: ["Bilinçaltı", "Hipnoz", "Zihinsel Dönüşüm", "Telkin"],
    content: `
      <p class="lead text-lg text-[#ced1bf]/90 mb-8 font-light">Alışkanlıklarımızı, korkularımızı ve tekrarlayan yaşam döngülerimizi yöneten bilinçaltı düzeyine nasıl ulaşırız? Trans ve telkin yöntemlerinin derin zihinsel dönüşümlerdeki etkisi.</p>
      
      <p class="mb-6">Zihnimizin sadece %5'lik kısmını bilinçli olarak kullanırız. Kararlarımız, alışkanlıklarımız, korkularımız ve aşamadığımız engeller aslında kalan %95'lik devasa bir arşivde, yani bilinçaltımızda saklanır. Hipnoterapi, zihnin eleştirel filtresini hafifçe gevşeterek bu arşive güvenli bir şekilde erişme yöntemidir.</p>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Trans Hali Nedir?</h3>
      <p class="mb-6">Medya ve filmlerin aksine, hipnotik trans hali bilincinizi kaybetmek ya da kontrolü başkasına vermek demek değildir. Trans, aslında gün içinde televizyon izlerken ya da araba sürerken kendiliğinden girdiğimiz derin odaklanma haline benzer. Son derece güvenli, huzurlu ve kişinin her an kontrol sahibi olduğu bir zihinsel gevşemedir.</p>

      <blockquote class="border-l-2 border-[#ca7d57] pl-6 my-8 italic text-lg text-white/90 font-light">
        "Bilinçaltı, ekilen her tohumu büyüten verimli bir toprak gibidir. Negatif inanç tohumlarını söküp yerine yenilerini ekmek sizin elinizde."
      </blockquote>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Tekrarlayan Döngüleri Kırmak</h3>
      <p class="mb-6">Çocukluk yıllarımızda çevremizden duyarak kaydettiğimiz "Yetersizim", "Para kazanmak zordur", "Güvenmek tehlikelidir" gibi kök inançlar, bugün yetişkin hayatımızı sabote eden görünmez iplerdir. Hipnoterapi ile bu kayıtların oluştuğu anlara gidip, onları yetişkin bilincimizle yeniden anlamlandırırız. Böylece hayatımızdaki kısıtlayıcı kısır döngüler kalıcı olarak çözülür.</p>
    `
  },
  {
    slug: "reiki-ile-kendi-kendini-sifalandirma-ve-cakra-dengeleme",
    title: "Reiki ile Kendi Kendini Şifalandırma ve Çakra Dengeleme",
    category: "Reiki",
    date: "02 Nisan 2026",
    excerpt: "Evrensel yaşam enerjisini ellerimiz aracılığıyla bedene aktarma sanatı olan Reiki'nin birinci derece prensipleri ve günlük çakra dengeleme meditasyonu rehberi.",
    readTime: "5 Dk",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Elif Kozanoğlu",
      role: "Reiki Master & Eğitmen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    },
    tags: ["Reiki", "Çakra", "Enerji Şifası", "Meditasyon"],
    content: `
      <p class="lead text-lg text-[#ced1bf]/90 mb-8 font-light">Evrensel yaşam enerjisini ellerimiz aracılığıyla bedene aktarma sanatı olan Reiki'nin birinci derece prensipleri ve günlük çakra dengeleme meditasyonu rehberi.</p>
      
      <p class="mb-6">Japonca bir kelime olan Reiki; "Rei" (Evrensel, heryerde var olan) ve "Ki" (Ruhsal yaşam enerjisi) sözcüklerinin birleşiminden oluşur. Bu yöntem, evrende serbestçe dolaşan saf ve yüksek frekanslı şifa enerjisini ellerimiz aracılığıyla kendimize veya bir başkasına aktarma sanatıdır.</p>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Reiki'nin 5 Temel Prensibi</h3>
      <p class="mb-6">Reiki sadece seanslarda ellerimizi koymak değildir; o bir zihinsel yaşam disiplinidir. Mikao Usui tarafından ortaya konan bu 5 altın kuralı her gün tekrarlamak enerjisel korumanızı güçlendirir:</p>
      <ol class="list-decimal list-inside space-y-2 mb-8 text-[#ced1bf]/80 font-light">
        <li>Sırf bugün, öfkelenme.</li>
        <li>Sırf bugün, endişelenme.</li>
        <li>Sırf bugün, şükret ve minnettar ol.</li>
        <li>Sırf bugün, dürüst ve özveriyle çalış.</li>
        <li>Sırf bugün, tüm canlılara karşı nazik ol.</li>
      </ol>

      <blockquote class="border-l-2 border-[#ca7d57] pl-6 my-8 italic text-lg text-white/90 font-light">
        "Enerji nereye odaklanırsanız oraya akar. Ellerinizi kalbinize koyun ve evrenin sonsuz sevgisinin içinize akmasına izin verin."
      </blockquote>

      <h3 class="text-24 font-light text-white mt-10 mb-4">Kendi Kendine Çakra Dengeleme Uygulaması</h3>
      <p class="mb-6">Her akşam yatağa yatınca ellerinizi sırayla 7 ana çakra merkezinizin (Taç, Üçüncü Göz, Boğaz, Kalp, Karın, Sakral ve Kök) üzerine yerleştirin. Her bir bölgede en az 3 dakika kalarak oraya sıcak, parlak bir ışığın dolduğunu hayal edin. Bu basit rutin, gün içinde biriken elektromanyetik kirliliği temizleyerek güne taze bir enerjiyle başlamanızı sağlar.</p>
    `
  }
];
