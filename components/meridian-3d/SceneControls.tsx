import React from "react";

interface SceneControlsProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onResetView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isolateSelected: boolean;
  onToggleIsolate: () => void;
  hasSelection: boolean;
}

export default function SceneControls({
  autoRotate,
  onToggleAutoRotate,
  onResetView,
  onZoomIn,
  onZoomOut,
  isolateSelected,
  onToggleIsolate,
  hasSelection,
}: SceneControlsProps) {
  return (
    <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-40 pointer-events-auto flex flex-col gap-4 max-md:top-20 max-md:right-6 max-md:translate-y-0">
      
      {/* Container wrapper matching mockup style */}
      <div className="bg-[#0b1411]/85 backdrop-blur-xl border border-white/[0.08] rounded-full p-2 shadow-2xl flex flex-col items-center gap-3">
        {/* Reset View / Focus Button */}
        <button
          onClick={onResetView}
          aria-label="Görünümü sıfırla"
          className="group flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a96d]"
          title="Görünümü Sıfırla / Odaklan"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px] text-[#a7c0b0]/70 group-hover:text-white transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364-2.121 2.121M8.758 15.242l-2.122 2.122m10.606 0-2.122-2.122M8.758 8.758L6.636 6.636M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        </button>

        {/* Zoom In Button */}
        <button
          onClick={onZoomIn}
          aria-label="Yakınlaştır"
          className="group flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a96d]"
          title="Yakınlaştır"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px] text-[#a7c0b0]/70 group-hover:text-white transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602ZM10.5 7v7m3.5-3.5h-7" />
          </svg>
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={onZoomOut}
          aria-label="Uzaklaştır"
          className="group flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a96d]"
          title="Uzaklaştır"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px] text-[#a7c0b0]/70 group-hover:text-white transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602ZM7.5 10.5h6" />
          </svg>
        </button>

        {/* Pan / Drag Indicator Button (Static / Toggle helper) */}
        <span
          className="size-9 rounded-full hover:bg-white/5 text-white flex items-center justify-center transition-all duration-300 cursor-default group"
          title="Kaydır ve Döndür"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px] text-[#a7c0b0]/70 transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.5 1.5 0 0 0-1.93 1.93l1.583 3.693a.75.75 0 0 1-.603 1.05l-4.148.367a1.5 1.5 0 0 0-1.312 1.258l-.66 3.626a5.125 5.125 0 0 0 4.12 5.922l2.67.534a.75.75 0 0 0 .787-.417l2.846-5.69a.75.75 0 0 1 1.217-.184l3.18 3.18a1.5 1.5 0 0 0 2.122 0l2.25-2.25a1.5 1.5 0 0 0 0-2.122l-3.18-3.18a.75.75 0 0 1-.184-1.217l5.69-2.846a.75.75 0 0 0 .417-.787l-.534-2.67a5.125 5.125 0 0 0-5.922-4.12l-3.626.66a1.5 1.5 0 0 0-1.258 1.312l-.367 4.148a.75.75 0 0 1-1.05.603L10.05 4.575Z" />
          </svg>
        </span>

        {/* Auto Rotate Button */}
        <button
          onClick={onToggleAutoRotate}
          aria-label={autoRotate ? "Otomatik dönüşü kapat" : "Otomatik dönüşü aç"}
          aria-pressed={autoRotate}
          className={`group flex size-11 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a96d] ${
            autoRotate ? "text-[#e0a96d]" : "text-[#a7c0b0]/70"
          }`}
          title={autoRotate ? "Otomatik Dönüşü Kapat" : "Otomatik Dönüşü Aç"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-[18px] transition-transform duration-300 group-hover:text-white ${autoRotate ? "text-[#e0a96d] animate-spin" : "text-[#a7c0b0]/70"}`} style={{ animationDuration: "12s" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.656 48.656 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3M3 12c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M3 12l3 3m-3-3-3 3" />
          </svg>
        </button>

        {/* Isolate Selected Meridian Button */}
        {hasSelection && (
          <button
            onClick={onToggleIsolate}
            aria-label={isolateSelected ? "Tüm kanalları göster" : "Yalnız seçili kanalı göster"}
            aria-pressed={isolateSelected}
            className={`group flex size-11 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a96d] ${
              isolateSelected ? "text-[#e0a96d]" : "text-[#a7c0b0]/70"
            }`}
            title={isolateSelected ? "Tüm Kanalları Göster" : "Sadece Seçili Kanalı Göster"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-[18px] group-hover:text-white transition-colors ${isolateSelected ? "text-[#e0a96d]" : "text-[#a7c0b0]/70"}`}>
              {isolateSelected ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              )}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
