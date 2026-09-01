// article-tail.mjs
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--disable-gpu", "--no-first-run"], defaultViewport: { width: 1440, height: 900 } });
try {
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/blog/coe-perguntas-antes-de-assinar", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));
  const out = await page.evaluate(() => {
    const rgbToHex = rgb => { const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if (!m) return rgb; const h = n => n.toString(16).padStart(2,"0"); return "#" + h(+m[1]) + h(+m[2]) + h(+m[3]); };
    const qa = s => Array.from(document.querySelectorAll(s));
    return qa("section, .article-cover, .article-next, .article-layout, header").map(el => ({
      tag: el.tagName, cls: (el.className || "").toString().slice(0, 40),
      bg: rgbToHex(getComputedStyle(el).backgroundColor),
      top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      h: Math.round(el.getBoundingClientRect().height),
    })).filter(x => x.h > 40);
  });
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
