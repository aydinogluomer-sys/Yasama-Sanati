import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Yaşama Sanatı — Bütünsel Şifa ve Eğitim Akademisi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card: deep-green field, copper kicker, large brand name, discipline line.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#2B3530",
          backgroundImage:
            "radial-gradient(circle at 78% 28%, rgba(67,103,84,0.45), transparent 55%)",
          color: "#F3EFE6",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#E0A878",
            }}
          >
            BÜTÜNSEL ŞİFA & EĞİTİM AKADEMİSİ
          </div>
          <div style={{ fontSize: 22, letterSpacing: 3, color: "rgba(243,239,230,0.55)" }}>
            yasamasanati.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, lineHeight: 1, letterSpacing: -2, color: "#F4EFE4" }}>
            Yaşama Sanatı
          </div>
          <div style={{ display: "flex", marginTop: 26, height: 3, width: 280, backgroundColor: "#C9875B" }} />
        </div>

        <div style={{ fontSize: 30, color: "rgba(243,239,230,0.78)" }}>
          Nefes · Reiki · Meridyen Terapi · Hipnoterapi · Yaşam Koçluğu
        </div>
      </div>
    ),
    { ...size },
  );
}
