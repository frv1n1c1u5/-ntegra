// image-stats.mjs <pngPath> <pngPath2...>
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
import { readFileSync } from "node:fs";
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const files = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--disable-gpu", "--no-first-run"], defaultViewport: { width: 800, height: 600 } });
try {
  const page = await browser.newPage();
  await page.goto("about:blank");
  for (const f of files) {
    const buf = readFileSync(f);
    const b64 = buf.toString("base64");
    const stats = await page.evaluate(async (b64, name) => {
      const img = new Image();
      img.src = "data:image/png;base64," + b64;
      await img.decode();
      const W = 120, H = Math.max(1, Math.round(img.naturalHeight * W / img.naturalWidth));
      const c = document.createElement("canvas");
      c.width = W; c.height = H;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;
      let light = 0, dark = 0, greenish = 0, accentGreen = 0, total = W * H;
      let rSum = 0, gSum = 0, bSum = 0;
      const lum = (r,g,b) => 0.2126*r/255 + 0.7152*g/255 + 0.0722*b/255;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        rSum += r; gSum += g; bSum += b;
        const l = lum(r,g,b);
        if (l > 0.85) light++;
        else if (l < 0.25) dark++;
        const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
        if (mx - mn > 25 && g >= r && g >= b) greenish++;
        if (r < 110 && g > 70 && g < 130 && b > 50 && b < 110) accentGreen++;
      }
      // sample rows: average lightness per 10% band (top to bottom)
      const bands = [];
      for (let band = 0; band < 10; band++) {
        let s = 0, n = 0;
        for (let y = Math.floor(band * H / 10); y < Math.floor((band + 1) * H / 10); y++) {
          for (let x = 0; x < W; x++) {
            const i = (y * W + x) * 4;
            s += lum(data[i], data[i+1], data[i+2]); n++;
          }
        }
        bands.push(+(s/n).toFixed(3));
      }
      return { file: name, avg: [+(rSum/total).toFixed(0), +(gSum/total).toFixed(0), +(bSum/total).toFixed(0)], lightPct: +(light/total*100).toFixed(1), darkPct: +(dark/total*100).toFixed(1), greenishPct: +(greenish/total*100).toFixed(1), accentGreenPct: +(accentGreen/total*100).toFixed(2), bands };
    }, b64, f.split("/").pop());
    console.log(JSON.stringify(stats));
  }
} finally { await browser.close(); }
