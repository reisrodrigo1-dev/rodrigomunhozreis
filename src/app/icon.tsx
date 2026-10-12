import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #38BDF8, #0369A1)",
          color: "#081A23",
          fontSize: 22,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        R
      </div>
    ),
    size
  );
}
