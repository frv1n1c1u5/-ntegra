import { ImageResponse } from "next/og";

export const alt = "Íntegra — Dossiê Expresso para decisões financeiras";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", background: "#071713", color: "#f2eee3", padding: "66px", position: "relative" }}><div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "67%" }}><div style={{ display: "flex", fontSize: 25, letterSpacing: 4, color: "#b8dbc9" }}>ÍNTEGRA · LEITURA INDEPENDENTE</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontSize: 82, lineHeight: 0.98, fontFamily: "serif" }}>Dossiê<br />Expresso</div><div style={{ display: "flex", marginTop: 28, fontSize: 29, color: "#ced8d2" }}>Clareza antes da decisão.</div></div><div style={{ display: "flex", gap: 32, fontSize: 23, color: "#d6bf82" }}>R$ 229 <span>·</span> entrega em até 48h <span>·</span> sem comissão</div></div><div style={{ position: "absolute", right: 64, top: 85, width: 330, height: 440, border: "1px solid #b79a5b", borderRadius: 16, background: "linear-gradient(145deg, #30473c, #101c18 72%)", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(6deg)" }}><div style={{ width: 170, height: 170, border: "10px solid #c5a566", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 70, color: "#c5a566" }}>Í</div></div></div>, size);
}
