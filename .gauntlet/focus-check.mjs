// Focus + reduced-motion verification
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--disable-gpu", "--no-first-run"], defaultViewport: { width: 1440, height: 900 } });
try {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  const rm = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const card = document.querySelector(".editorial-hero-art");
    const facts = document.querySelector(".hero-facts");
    const allVisible = [h1, card, facts].every(el => el && getComputedStyle(el).opacity !== "0" && getComputedStyle(el).visibility !== "hidden");
    return { h1Opacity: getComputedStyle(h1).opacity, cardOpacity: card ? getComputedStyle(card).opacity : null, cardTransform: card ? getComputedStyle(card).transform : null, allVisible };
  });
  // Focus visibility: tab through nav links and hero CTA
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.reload({ waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1500));
  const focus = await page.evaluate(async () => {
    const results = [];
    const check = (el, label) => {
      const cs = getComputedStyle(el);
      results.push({ label, outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow.slice(0, 80) });
    };
    // focus nav CTA link
    const navCta = document.querySelector(".desktop-nav-cta, .nav a.button");
    if (navCta) { navCta.focus(); check(navCta, "nav-cta"); }
    // focus hero primary CTA
    const heroCta = document.querySelector(".editorial-hero-actions a");
    if (heroCta) { heroCta.focus(); check(heroCta, "hero-cta"); }
    // tab simulation: keydown Tab and see first focused
    const links = Array.from(document.querySelectorAll("a, button")).filter(el => el.offsetParent !== null);
    links[0].focus();
    check(links[0], "first-link");
    return results;
  });
  console.log(JSON.stringify({ reducedMotion: rm, focus }, null, 1));
} finally { await browser.close(); }
