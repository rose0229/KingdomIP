import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kingdom IP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#FCFAF6", color: "#171F2E", display: "flex", padding: 64, fontFamily: "Georgia", position: "relative" }}>
        <div style={{ position: "absolute", right: 64, top: 64, width: 180, height: 180, background: "#B0451A", color: "#FFFFFF", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 112, fontWeight: 700 }}>
          K
        </div>
        <div style={{ alignSelf: "flex-end", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#B0451A", fontSize: 28, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>Kingdom IP</div>
          <div style={{ maxWidth: 820, marginTop: 24, fontSize: 82, lineHeight: 1, fontWeight: 700 }}>Built at a real church. Ready for yours.</div>
        </div>
      </div>
    ),
    size
  );
}
