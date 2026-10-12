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
          backgroundColor: "#081A23",
          backgroundImage:
            "radial-gradient(900px 500px at 80% -10%, rgba(56,189,248,0.28), transparent)",
          color: "#F1F6F8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #38BDF8, #0369A1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#081A23",
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
          <span style={{ color: "#38BDF8", fontStyle: "italic" }}>sem virar um risco.</span>
        </div>

        <div style={{ display: "flex", marginTop: 36, fontSize: 32, color: "rgba(241,246,248,0.65)" }}>
          {`${site.tagline} · ${site.role}`}
        </div>
      </div>
    ),
    size
  );
}
