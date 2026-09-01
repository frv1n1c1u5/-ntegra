// PNG pixel sampler — decode RGBA8 non-interlaced PNG and report dominant colors by region
import { inflateSync } from "node:zlib";
import { readFileSync } from "node:fs";

function decodePNG(file) {
  const buf = readFileSync(file);
  let pos = 8; let w = 0, h = 0, colorType = 0; let idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4); colorType = data[9];
    } else if (type === "IDAT") idat.push(data);
    pos += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const stride = w * channels;
  const px = Buffer.alloc(h * stride);
  let off = 0;
  const paeth = (a, b, c) => {
    const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < h; y++) {
    const filter = raw[off++];
    const rowStart = y * stride;
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[off++];
      const a = x >= channels ? px[rowStart + x - channels] : 0;
      const b = y > 0 ? px[rowStart - stride + x] : 0;
      const c = (x >= channels && y > 0) ? px[rowStart - stride + x - channels] : 0;
      let val = rawByte;
      if (filter === 1) val = (rawByte + a) & 0xff;
      else if (filter === 2) val = (rawByte + b) & 0xff;
      else if (filter === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) val = (rawByte + paeth(a, b, c)) & 0xff;
      px[rowStart + x] = val;
    }
  }
  return { w, h, channels, px };
}
function sample(img, x, y) {
  const i = (y * img.w + x) * img.channels;
  return "#" + [img.px[i], img.px[i+1], img.px[i+2]].map(n => n.toString(16).padStart(2, "0")).join("");
}
function regionColors(img, x0, y0, x1, y1, step = 40) {
  const counts = {};
  for (let y = y0; y < y1; y += step) for (let x = x0; x < x1; x += step) {
    const c = sample(img, x, y);
    counts[c] = (counts[c] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c, n]) => c + "x" + n);
}

const base = "D:/DeepSeek/Integra/integra-site/.gauntlet/evidence/";
// NEW home desktop
const nh = decodePNG(base + "new/home-desktop.png");
console.log("NEW home " + nh.w + "x" + nh.h);
console.log("  nav band (top 40-80px):", regionColors(nh, 0, 40, nh.w, 80).join(" "));
console.log("  hero left column (y 300-500):", regionColors(nh, 80, 300, 700, 500).join(" "));
console.log("  hero right art (x 760-1380, y 250-600):", regionColors(nh, 760, 250, 1380, 600).join(" "));
// NEW home full — find CTA band (dark) at bottom
const nhf = decodePNG(base + "new/home-desktop-full.png");
console.log("NEW home-full " + nhf.w + "x" + nhf.h);
console.log("  bottom band (y h-300..h-40):", regionColors(nhf, 0, nhf.h - 300, nhf.w, nhf.h - 40).join(" "));
console.log("  mid dossier section (y 1400-1700):", regionColors(nhf, 100, 1400, 1340, 1700).join(" "));
// BASELINE home
const bh = decodePNG(base + "baseline/home-desktop.png");
console.log("BASELINE home " + bh.w + "x" + bh.h);
console.log("  hero left (y 300-500):", regionColors(bh, 80, 300, 700, 500).join(" "));
console.log("  hero right art (x 760-1380, y 250-600):", regionColors(bh, 760, 250, 1380, 600).join(" "));
// BASELINE full bottom
const bhf = decodePNG(base + "baseline/home-audit-desktop-full.png");
console.log("BASELINE full " + bhf.w + "x" + bhf.h);
console.log("  bottom band:", regionColors(bhf, 0, bhf.h - 300, bhf.w, bhf.h - 40).join(" "));
