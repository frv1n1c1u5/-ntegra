// final-checks.mjs
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--disable-gpu", "--no-first-run"], defaultViewport: { width: 1440, height: 900 } });
try {
  const page = await browser.newPage();
  // reduced motion emulation
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 1200));
  const out = await page.evaluate(() => {
    const serif = Array.from(document.querySelectorAll("*")).filter(el => {
      const f = getComputedStyle(el).fontFamily.toLowerCase();
      return f.includes("serif") && !f.includes("sans-serif") && el.offsetParent !== null;
    }).length;
    const heroCard = document.querySelector(".hero-card");
    const heroCardOpacity = heroCard ? getComputedStyle(heroCard).opacity : null;
    const heroCardTransform = heroCard ? getComputedStyle(heroCard).transform : null;
    // check any element has visible transition after reduced motion (sampling hero)
    const heroH1 = document.querySelector(".editorial-hero h1");
    const h1Opacity = heroH1 ? getComputedStyle(heroH1).opacity : null;
    return { visibleSerifCount: serif, heroCardOpacity, heroCardTransform, h1Opacity };
  });
  console.log(JSON.stringify(out));
} finally { await browser.close(); }
