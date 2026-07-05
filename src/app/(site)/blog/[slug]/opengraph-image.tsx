import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { getPostBySlug } from "@/lib/posts";

export const alt = "Post do blog Rodrigo Munhoz Reis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  const title = post?.title || site.name;
  const tag = post?.tags?.[0] || "Blog";

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
          backgroundColor: "#070608",
          backgroundImage:
            "radial-gradient(900px 500px at 85% -10%, rgba(232,163,61,0.32), transparent), radial-gradient(700px 400px at 5% 110%, rgba(232,163,61,0.14), transparent)",
          color: "#F4EFE6",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: logo + nome + kicker da tag */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #E8A33D, #B9772A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#070608",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              R
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#F4EFE6" }}>{site.name}</div>
              <div style={{ fontSize: 15, color: "rgba(244,239,230,0.55)", letterSpacing: 2, textTransform: "uppercase" }}>
                {site.tagline}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: 999,
              border: "1.5px solid rgba(232,163,61,0.45)",
              color: "#E8A33D",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {tag}
          </div>
        </div>

        {/* Título do post: o herói do card */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 56 : title.length > 45 ? 66 : 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            maxWidth: 1040,
            color: "#F4EFE6",
          }}
        >
          {title}
        </div>

        {/* Footer: URL + assinatura */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1.5px solid rgba(244,239,230,0.12)",
            fontSize: 22,
            color: "rgba(244,239,230,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>{site.domain}/blog</div>
          <div style={{ display: "flex", color: "#E8A33D" }}>Leia →</div>
        </div>
      </div>
    ),
    size
  );
}
