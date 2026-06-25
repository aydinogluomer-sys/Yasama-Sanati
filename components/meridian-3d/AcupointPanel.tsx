import React from "react";
import { Acupoint } from "../../types/meridian";

interface AcupointPanelProps {
  acupoint: Acupoint | null;
  onClose: () => void;
  meridianName: string;
  meridianColor: string;
}

export default function AcupointPanel({
  acupoint,
  onClose,
  meridianName,
  meridianColor,
}: AcupointPanelProps) {
  if (!acupoint) return null;

  return (
    <div
      role="region"
      aria-label={`${acupoint.name} akupresür noktası ayrıntıları`}
      className="absolute bottom-4 right-6 top-20 z-50 flex w-full max-w-[380px] flex-col max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:right-0 max-md:top-auto max-md:h-[65vh] max-md:max-w-none md:right-16"
    >
      {/* Glassmorphism Panel Container */}
      <div className="flex-1 flex flex-col bg-[#0b1411]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden max-md:rounded-t-2xl max-md:border-x-0 max-md:border-b-0">
        
        {/* Header Drag Bar (Mobile Only) */}
        <div className="hidden max-md:flex items-center justify-center py-2.5 border-b border-white/5">
          <div className="w-12 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Header Area */}
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-2 py-0.5 rounded font-mono font-medium tracking-wide"
                style={{
                  backgroundColor: `${meridianColor}15`,
                  color: meridianColor,
                  border: `1px solid ${meridianColor}30`,
                }}
              >
                {acupoint.code}
              </span>
              <span className="text-white font-medium text-lg leading-normal">
                {acupoint.name}
              </span>
            </div>
            <p className="text-xs text-[#a7c0b0]/50 italic pl-0.5 mt-0.5">{acupoint.trName}</p>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Nokta ayrıntılarını kapat"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a96d]"
            title="Kapat"
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/5">
          
          {/* Meridian Relation */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-[#a7c0b0]/75">Bağlı Enerji Kanalı</span>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: meridianColor }} />
              <span className="text-sm text-white font-light">{meridianName}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-[#a7c0b0]/75">Terapötik Etki</span>
            <p className="text-xs text-[#a7c0b0]/80 leading-relaxed font-light">
              {acupoint.description}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-[#a7c0b0]/75">Nokta Konumu</span>
            <p className="text-xs text-[#a7c0b0]/70 leading-relaxed font-light italic">
              {acupoint.location}
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-2.5">
            <span className="text-xs font-medium uppercase tracking-wider text-[#a7c0b0]/75">Temel Yararları</span>
            <ul className="space-y-2">
              {acupoint.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#a7c0b0]/80 font-light">
                  <span className="text-[#e0a96d] text-[10px] mt-0.5">✦</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Caution Section */}
          <div className="p-3.5 bg-[#ef4444]/5 border border-[#ef4444]/15 rounded-lg space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#ff8c8c]">Önemli Uyarı</span>
            <p className="text-xs font-light leading-relaxed text-[#ffb0b0]">
              {acupoint.caution}
            </p>
          </div>
        </div>

        {/* Footer Medical Disclaimer */}
        <div className="p-4 bg-black/30 border-t border-white/[0.04]">
          <p className="text-center text-xs font-light leading-relaxed text-[#a7c0b0]/75">
            Bu platformdaki bilgiler bilgilendirme amaçlıdır; tıbbi teşhis, tedavi veya profesyonel sağlık önerisi yerine geçmez. Sağlık sorunlarınız için her zaman bir uzmana başvurun.
          </p>
        </div>
      </div>
    </div>
  );
}
