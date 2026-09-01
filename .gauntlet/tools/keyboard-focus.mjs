// keyboard-focus.mjs
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const [,, url] = process.argv;
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--disable-gpu", "--no-first-run"], defaultViewport: { width: 1440, height: 900 } });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 1200));
  const results = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    await new Promise(r => setTimeout(r, 120));
    const el = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a) return null;
      const s = getComputedStyle(a);
      return {
        tag: a.tagName, cls: (a.className || "").toString().slice(0, 40), text: (a.textContent || "").trim().slice(0, 30),
        outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth, outlineColor: s.outlineColor,
        boxShadow: s.boxShadow.slice(0, 60),
      };
    });
    if (el) results.push(el);
  }
  console.log(JSON.stringify(results, null, 1));
} finally { await browser.close(); }
