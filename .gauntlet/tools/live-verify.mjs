// live-verify.mjs
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const [,, url, mobile] = process.argv;
const isMobile = mobile === "--mobile";
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: "new",
  args: ["--disable-gpu", "--no-first-run", "--hide-scrollbars"],
  defaultViewport: { width: isMobile ? 390 : 1440, height: isMobile ? 844 : 900, deviceScaleFactor: 1 },
});
try {
  const page = await browser.newPage();
  if (isMobile) await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
  const errors = [];
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push("PAGEERROR: " + e.message));
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));

  const out = await page.evaluate(() => {
    const q = s => document.querySelector(s);
    const qa = s => Array.from(document.querySelectorAll(s));
    const cs = (el, p) => el ? getComputedStyle(el).getPropertyValue(p).trim() : null;
    const rgbToHex = rgb => {
      const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return rgb;
      const h = n => n.toString(16).padStart(2, "0");
      return "#" + h(+m[1]) + h(+m[2]) + h(+m[3]);
    };
    const lum = hex => {
      const c = hex.replace("#", "");
      const rgb = [0,2,4].map(i => parseInt(c.slice(i,i+2),16)/255).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
      return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
    };
    const contrast = (a, b) => { const l1 = lum(a), l2 = lum(b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2); };

    const h1 = q("h1");
    const heroSelectors = [".article-hero", ".blog-hero", ".privacy-header", ".editorial-hero", ".login-brand-panel", ".login-form-panel", ".editorial-page-intro"];
    const heroes = {};
    for (const sel of heroSelectors) {
      const el = q(sel);
      if (el) {
        const bg = cs(el, "background-color");
        heroes[sel] = { bg: rgbToHex(bg), bgRaw: bg, h1ColorOnIt: h1 ? rgbToHex(cs(h1, "color")) : null, contrast: h1 ? contrast(rgbToHex(cs(h1, "color")), rgbToHex(bg)) : null };
      }
    }
    // body bg + main bg
    heroes["body"] = { bg: rgbToHex(cs(document.body, "background-color")) };
    // all visible text colors on article-content if present
    let articleText = null;
    const content = q(".article-content");
    if (content) {
      const p = content.querySelector("p");
      articleText = { color: rgbToHex(cs(p, "color")), bg: rgbToHex(cs(content, "background-color")), contrast: contrast(rgbToHex(cs(p, "color")), rgbToHex(cs(content, "background-color"))) };
    }
    // generic section bg (unclassed)
    const unclassed = qa("section").filter(s => !s.className).slice(0, 3).map(s => ({ bg: rgbToHex(cs(s, "background-color")), bgRaw: cs(s, "background-color") }));
    return { heroes, articleText, unclassed, errors: [] };
  });
  // interactions (desktop home)
  if (!isMobile && url.includes("localhost:3000/")) {
    const navBefore = await page.$eval(".nav", el => getComputedStyle(el).boxShadow + "|" + getComputedStyle(el).backgroundColor);
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(r => setTimeout(r, 600));
    const navAfter = await page.$eval(".nav", el => getComputedStyle(el).boxShadow + "|" + getComputedStyle(el).backgroundColor);
    out.navScroll = { before: navBefore, after: navAfter };
    // FAQ accordion
    const faqBtn = await page.$(".faq-item button");
    if (faqBtn) {
      const before = await faqBtn.evaluate(el => el.getAttribute("aria-expanded"));
      await faqBtn.click();
      await new Promise(r => setTimeout(r, 500));
      const after = await faqBtn.evaluate(el => el.getAttribute("aria-expanded"));
      const answerVisible = await page.evaluate(() => { const d = document.querySelector(".faq-item div[style]"); return d ? getComputedStyle(d).opacity : null; });
      out.faq = { before, after, answerOpacity: answerVisible };
    }
    // focus ring on a nav link
    await page.focus(".nav-links a");
    await new Promise(r => setTimeout(r, 200));
    out.focusOutline = await page.$eval(".nav-links a", el => getComputedStyle(el).outline + " | " + getComputedStyle(el).outlineStyle + " " + getComputedStyle(el).outlineWidth);
  }
  // mobile interactions
  if (isMobile) {
    const convBar = await page.$eval(".mobile-conversion-bar", el => ({ display: getComputedStyle(el).display, bg: getComputedStyle(el).backgroundColor }));
    const menuBtn = await page.$(".mobile-menu-button");
    const menuBtnDisplay = await menuBtn.evaluate(el => getComputedStyle(el).display);
    if (menuBtnDisplay !== "none") {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 500));
      const panel = await page.$eval("#mobile-menu", el => ({ display: getComputedStyle(el).display, links: el.querySelectorAll("a").length }));
      out.mobileMenu = { convBar, menuBtnDisplay, panel };
    } else out.mobileMenu = { convBar, menuBtnDisplay };
  }
  out.consoleErrors = errors;
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
