import React, { useState } from "react";
import { Meridian, Acupoint } from "../../types/meridian";

interface MeridianSidebarProps {
  meridians: Meridian[];
  acupoints: Acupoint[];
  selectedMeridianId: string | null;
  selectedAcupointId: string | null;
  onSelectMeridian: (id: string | null) => void;
  onSelectAcupoint: (acupoint: Acupoint | null) => void;
  meridianColors: Record<string, string>;
  calibrationMode: boolean;
  onToggleCalibration: () => void;
}

type TabType = "report" | "meridians" | "acupoints" | "therapy" | "diagnostics" | "settings";

export default function MeridianSidebar({
  meridians,
  acupoints,
  selectedMeridianId,
  selectedAcupointId,
  onSelectMeridian,
  onSelectAcupoint,
  meridianColors,
  calibrationMode,
  onToggleCalibration,
}: MeridianSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>("report");
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const tabs = [
    {
      id: "report",
      label: "REPORT",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    {
      id: "meridians",
      label: "MERIDIANS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    },
    {
      id: "acupoints",
      label: "ACUPOINTS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4">
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      )
    },
    {
      id: "therapy",
      label: "THERAPY",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 6.747M12 3a9.004 9.004 0 0 0-8.716 6.747" />
        </svg>
      )
    },
    {
      id: "diagnostics",
      label: "DIAGNOSTICS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h3.375l1.688-4.5 3.375 9 1.688-4.5h4.875" />
        </svg>
      )
    },
    {
      id: "settings",
      label: "SETTINGS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      )
    },
  ];

  return (
    <div className="absolute left-6 md:left-16 top-6 bottom-6 w-full max-w-[200px] z-50 pointer-events-auto flex flex-col gap-6 max-md:fixed max-md:inset-x-0 max-md:top-4 max-md:bottom-auto max-md:max-w-none max-md:px-4 max-md:h-auto">
      
      {/* 0. Lotus Logo (Mockup Top Left branding) */}
      <div className="flex items-center gap-3 pl-3 max-md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} className="size-7 text-[#e0a96d]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 6.747M12 3a9.004 9.004 0 0 0-8.716 6.747" />
        </svg>
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#e0a96d] uppercase font-sans">ELEMENTIS</span>
      </div>

      {/* 1. Main Navigation Tab Bubble */}
      <div className="bg-[#0b1411]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3 shadow-2xl flex flex-col gap-2.5 max-md:flex-row max-md:w-full max-md:p-2 max-md:justify-between max-md:overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (activeTab === tab.id) {
                  setIsPanelOpen(!isPanelOpen);
                } else {
                  setActiveTab(tab.id as TabType);
                  setIsPanelOpen(true);
                }
              }}
              className={`w-full flex items-center gap-3.5 py-3 px-4 rounded-lg text-[10px] tracking-widest transition-all duration-300 cursor-pointer text-left font-sans font-medium max-md:w-auto max-md:py-2.5 max-md:px-3.5 max-md:flex-1 max-md:justify-center ${
                isActive
                  ? "bg-[#e0a96d]/15 text-[#e0a96d] border border-[#e0a96d]/20"
                  : "text-[#a7c0b0]/60 border border-transparent hover:text-white/80 hover:bg-white/[0.02]"
              }`}
            >
              <span className={`transition-colors duration-300 ${isActive ? "text-[#e0a96d]" : "text-[#a7c0b0]/60"}`}>
                {tab.icon}
              </span>
              <span className="max-md:hidden uppercase">{tab.label}</span>
              {tab.id === "acupoints" && (
                <svg
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeTab === "acupoints") {
                      setIsPanelOpen(!isPanelOpen);
                    } else {
                      setActiveTab("acupoints");
                      setIsPanelOpen(true);
                    }
                  }}
                  className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 text-[#e0a96d] max-md:hidden ${
                    isPanelOpen && activeTab === "acupoints" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Sub-list Panel Container (Slides out or appears below navigation) */}
      <div className={`w-[260px] bg-[#0b1411]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 shadow-2xl flex flex-col min-h-0 transition-all duration-300 md:absolute md:left-[280px] md:top-[52px] md:bottom-0 ${
        isPanelOpen ? "max-md:flex max-md:max-h-[300px] max-md:overflow-y-auto" : "hidden"
      }`}>
        
        {/* Tab content: REPORT */}
        {activeTab === "report" && (
          <div className="flex-col flex flex-1 min-h-0 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 font-bold border-b border-white/[0.04] pb-2">Meridyen Terapi Raporu</span>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-light text-[#a7c0b0]/80 scrollbar-thin scrollbar-thumb-white/5">
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5 hover:border-[#e0a96d]/20 transition-colors duration-200">
                <h4 className="font-semibold text-[#e0a96d] text-xs">Özet</h4>
                <p className="text-[10px] leading-relaxed text-[#a7c0b0]/90">
                  Enerji akışını sade, görünür ve takip edilebilir tutan bir ince ayar yaklaşımı.
                </p>
              </div>
              
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5 hover:border-[#e0a96d]/20 transition-colors duration-200">
                <h4 className="font-semibold text-[#e0a96d] text-xs">Odak Alanı</h4>
                <p className="text-[10px] leading-relaxed text-[#a7c0b0]/90">
                  Geleneksel yapı, modern kullanım diliyle yeniden düzenlenir; nokta, kanal ve seans ilişkisi öne çıkar.
                </p>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5 hover:border-[#e0a96d]/20 transition-colors duration-200">
                <h4 className="font-semibold text-[#e0a96d] text-xs">Kısa Not</h4>
                <p className="text-[10px] leading-relaxed text-[#a7c0b0]/90">
                  Panel, ana ilişkileri hızlı tarama için özetler ve gereksiz yoğunluğu geri çeker.
                </p>
              </div>

              <div className="p-3 bg-white/[0.02] border border-[#e0a96d]/15 rounded-lg space-y-1.5 hover:border-[#e0a96d]/30 transition-colors duration-200 bg-[#e0a96d]/[0.01]">
                <h4 className="font-semibold text-[#e0a96d] text-xs flex items-center gap-1.5">
                  <span className="text-[#e0a96d]">✦</span> Kullanım Notu
                </h4>
                <p className="text-[10px] leading-relaxed text-[#a7c0b0]/90 font-light">
                  Kısa seçimler, temiz geri bildirim ve düşük görsel yük ile panel okunabilir kalır.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab content: MERIDIANS */}
        {activeTab === "meridians" && (
          <div className="flex-col flex flex-1 min-h-0 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
              <span className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 font-bold">Kanal Listesi</span>
              {selectedMeridianId && (
                <button
                  onClick={() => onSelectMeridian(null)}
                  className="text-[9px] text-[#e0a96d] hover:underline cursor-pointer"
                >
                  Temizle
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-white/5">
              {meridians.map((m) => {
                const isSelected = selectedMeridianId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectMeridian(isSelected ? null : m.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded transition-all duration-200 cursor-pointer text-left ${
                      isSelected
                        ? "bg-white/[0.04] border border-white/10"
                        : "border border-transparent hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="size-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                      <div className="flex flex-col">
                        <span className="text-xs text-white leading-snug">{m.name}</span>
                        <span className="text-[9px] text-[#a7c0b0]/40 font-mono leading-none">
                          {m.shortName} · {m.element}
                        </span>
                      </div>
                    </div>
                    {isSelected && <span className="text-xs text-[#e0a96d]">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab content: ACUPOINTS */}
        {activeTab === "acupoints" && (
          <div className="flex-col flex flex-1 min-h-0 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
              <span className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 font-bold">Terapi Noktaları</span>
              {selectedAcupointId && (
                <button
                  onClick={() => onSelectAcupoint(null)}
                  className="text-[9px] text-[#e0a96d] hover:underline cursor-pointer"
                >
                  Sıfırla
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-white/5">
              {acupoints.map((ap) => {
                const isSelected = selectedAcupointId === ap.id;
                const mColor = meridianColors[ap.meridian] || "#fbbf24";
                return (
                  <button
                    key={ap.id}
                    onClick={() => onSelectAcupoint(ap)}
                    className={`w-full flex items-center justify-between p-2.5 rounded transition-all duration-200 cursor-pointer text-left ${
                      isSelected
                        ? "bg-white/[0.04] border border-white/10"
                        : "border border-transparent hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="size-2 rounded-full flex-shrink-0" style={{ backgroundColor: mColor }} />
                      <div className="flex flex-col">
                        <span className="text-xs text-white leading-snug">{ap.name}</span>
                        <span className="text-[9px] text-[#a7c0b0]/40 font-mono leading-none">
                          {ap.code} · {ap.trName}
                        </span>
                      </div>
                    </div>
                    {isSelected && <span className="text-xs text-[#e0a96d]">✦</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab content: THERAPY */}
        {activeTab === "therapy" && (
          <div className="flex-col flex flex-1 min-h-0 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 font-bold border-b border-white/[0.04] pb-2">Terapi Protokolleri</span>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-light text-[#a7c0b0]/80">
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5">
                <h4 className="font-medium text-white text-xs">Anti-Stres & Anksiyete</h4>
                <p className="text-[10px] leading-relaxed">Yintang, Hegu (LI4) ve Shenmen (HT7) ile kısa rahatlama protokolü.</p>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5">
                <h4 className="font-medium text-white text-xs">Vitalite & Enerji Artışı</h4>
                <p className="text-[10px] leading-relaxed">Qihai (CV6) ve Zusanli (ST36) ile destekleyici enerji çalışması.</p>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5">
                <h4 className="font-medium text-white text-xs">Hormonal Denge</h4>
                <p className="text-[10px] leading-relaxed">Sanyinjiao (SP6) ile ritim ve denge odaklı yaklaşım.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab content: DIAGNOSTICS */}
        {activeTab === "diagnostics" && (
          <div className="flex-col flex flex-1 min-h-0 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 font-bold border-b border-white/[0.04] pb-2">Enerji Teşhisi</span>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-light text-[#a7c0b0]/80">
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5">
                <h4 className="font-medium text-white text-xs">Kas Testi (Kinesiyoloji)</h4>
                <p className="text-[10px] leading-relaxed">Kas yanıtı üzerinden blokaj ve dengesizlik okumak için kullanılır.</p>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg space-y-1.5">
                <h4 className="font-medium text-white text-xs">Akustik Nabız Analizi</h4>
                <p className="text-[10px] leading-relaxed">Nabız kalıplarını izleyerek yin-yang dengesine dair ipuçları toplar.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab content: SETTINGS */}
        {activeTab === "settings" && (
          <div className="flex-col flex flex-1 min-h-0 space-y-4">
            <span className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 font-bold border-b border-white/[0.04] pb-2">Görsel Ayarlar</span>
            <div className="space-y-4 text-xs font-light text-[#a7c0b0]/80">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 block font-medium">Beden Opaklığı</label>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-white/40">Düşük</span>
                  <div className="flex-1 h-1 bg-white/10 rounded relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-[#e0a96d]" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40">Yüksek</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-medium text-white text-xs">WebGL Performansı</h4>
                <p className="text-[10px] leading-relaxed text-[#a7c0b0]/50 font-light">Donanım ivmesi açık olduğunda sahne daha akıcı çalışır.</p>
              </div>
              <div className="pt-3 border-t border-white/[0.04] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#a7c0b0]/40 block font-medium">Geliştirici Araçları</span>
                <button
                  onClick={onToggleCalibration}
                  className={`w-full flex items-center justify-between p-2 rounded text-[10px] transition-all duration-200 border cursor-pointer font-medium font-mono ${
                    calibrationMode
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                  }`}
                >
                  <span>🔧 Kalibrasyon Modu</span>
                  <span>{calibrationMode ? "AÇIK" : "KAPALI"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
