import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#070608",
          backgroundImage:
            "radial-gradient(900px 500px at 80% -10%, rgba(232,163,61,0.28), transparent)",
          color: "#F4EFE6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #E8A33D, #B9772A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#070608",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 18px",
            marginTop: 48,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 940,
          }}
        >
          <span>Construa com IA</span>
          <span style={{ color: "#E8A33D", fontStyle: "italic" }}>sem virar um risco.</span>
        </div>

        <div style={{ display: "flex", marginTop: 36, fontSize: 32, color: "rgba(244,239,230,0.65)" }}>
          {`${site.tagline} · ${site.role}`}
        </div>
      </div>
    ),
    size
  );
}
