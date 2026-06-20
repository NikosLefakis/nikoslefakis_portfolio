import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nikos Lefakis - Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020305",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Cyan orb top-left */}
        <div style={{
          position: "absolute", top: "-120px", left: "-80px",
          width: "580px", height: "580px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 68%)",
        }} />
        {/* Indigo orb bottom-right */}
        <div style={{
          position: "absolute", bottom: "-80px", right: "-60px",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle, rgba(6,182,212,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* NL logo box */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "60px", height: "60px", borderRadius: "13px",
          background: "rgba(6,182,212,0.1)",
          border: "1.5px solid rgba(6,182,212,0.35)",
          marginBottom: "52px",
        }}>
          <span style={{ color: "#06B6D4", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>NL</span>
        </div>

        {/* Name */}
        <div style={{
          fontSize: "76px", fontWeight: "800", color: "#f8fafc",
          lineHeight: 1.03, letterSpacing: "-2px", marginBottom: "18px",
        }}>
          Nikos Lefakis
        </div>

        {/* Divider + title */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          <div style={{ width: "40px", height: "2px", background: "rgba(6,182,212,0.6)", borderRadius: "2px" }} />
          <span style={{ fontSize: "28px", color: "#06B6D4", fontWeight: "500", letterSpacing: "-0.5px" }}>
            Full Stack Developer
          </span>
        </div>

        {/* Description */}
        <div style={{
          fontSize: "21px", color: "#64748b", maxWidth: "640px", lineHeight: 1.55, fontWeight: "400",
        }}>
          Building modern web applications and AI-powered products — from concept to deployed product.
        </div>

        {/* Bottom row */}
        <div style={{
          position: "absolute", bottom: "72px", left: "80px", right: "80px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#34d399" }} />
            <span style={{ color: "#475569", fontSize: "17px", fontWeight: "500" }}>Open to opportunities</span>
          </div>
          <span style={{ color: "#334155", fontSize: "17px" }}>nikoslefakis.vercel.app</span>
        </div>

        {/* Right accent line */}
        <div style={{
          position: "absolute", right: "0", top: "15%", bottom: "15%",
          width: "3px",
          background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.5), transparent)",
        }} />
      </div>
    ),
    { ...size }
  );
}
