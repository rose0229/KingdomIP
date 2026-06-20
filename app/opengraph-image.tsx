import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kingdom IP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#111111", color: "#f7f3e8", display: "flex", padding: 64, fontFamily: "Arial", position: "relative" }}>
        <div style={{ position: "absolute", right: 64, top: 64, width: 180, height: 180, background: "#d8ff3f", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 112, fontWeight: 900 }}>
          K
        </div>
        <div style={{ alignSelf: "flex-end", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#d8ff3f", fontSize: 28, fontWeight: 900, letterSpacing: 4, textTransform: "uppercase" }}>Kingdom IP</div>
          <div style={{ maxWidth: 820, marginTop: 24, fontSize: 82, lineHeight: 0.92, fontWeight: 900 }}>Find what is holding your church back.</div>
        </div>
      </div>
    ),
    size
  );
}
