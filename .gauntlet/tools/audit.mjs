// Íntegra gauntlet — visual + design audit harness
// Usage: node audit.mjs <url> <outPrefix> [--mobile]
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [,, url, outPrefix, flag] = process.argv;
const mobile = flag === "--mobile";
const width = mobile ? 390 : 1440;
const height = mobile ? 844 : 900;
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";

mkdirSync(dirname(outPrefix), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--disable-gpu", "--no-first-run", "--hide-scrollbars", "--window-size=" + width + "," + height],
  defaultViewport: { width, height, deviceScaleFactor: mobile ? 2 : 1 },
});

try {
  const page = await browser.newPage();
  if (mobile) await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, mobile ? 1200 : 2200));

  const report = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const qa = (s) => Array.from(document.querySelectorAll(s));
    const css = (el, p) => el ? getComputedStyle(el).getPropertyValue(p).trim() : null;
    const rgbToHex = (rgb) => {
      const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return rgb;
      const h = (n) => n.toString(16).padStart(2, "0");
      return "#" + h(+m[1]) + h(+m[2]) + h(+m[3]);
    };
    const relLum = (hex) => {
      const c = hex.replace("#", "");
      const rgb = [0,2,4].map(i => parseInt(c.slice(i,i+2),16)/255).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
      return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
    };
    const contrast = (a, b) => { const l1 = relLum(a), l2 = relLum(b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)); };

    const h1 = q("h1"); const hero = q(".editorial-hero, .hero, .blog-hero, .privacy-header, .article-hero");
    const nav = q(".nav"); const body = document.body;
    const docBg = css(body, "background-color");
    const h1Font = css(h1, "font-family"); const h1Size = css(h1, "font-size"); const h1Color = css(h1, "color");
    const h1Track = css(h1, "letter-spacing");
    const navBg = css(nav, "background-color");
    const navPos = css(nav, "position");
    const h1Contrast = h1Color ? contrast(rgbToHex(h1Color), rgbToHex(docBg || "#ffffff")) : null;
    const h1OnHero = hero && h1 ? contrast(rgbToHex(css(h1, "color")), rgbToHex(css(hero, "background-color"))) : null;

    const overflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const allFonts = new Set();
    qa("h1,h2,h3,.section-title,.editorial-kicker,.section-kicker").forEach(el => allFonts.add(css(el, "font-family")?.split(",")[0]));
    const accents = new Set();
    qa(".button-accent,.button-primary,.editorial-cta,.editorial-kicker,.section-kicker,.brand-mark").forEach(el => {
      const c = rgbToHex(css(el, "background-color"));
      if (c && c !== "transparent" && !/^#(f{6}|0{6})$/i.test(c)) accents.add(c);
    });
    const priceEl = q(".dossier-price strong, .price, .hero-facts strong");
    const priceFontVariant = priceEl ? css(priceEl, "font-variant-numeric") : null;
    const facts = qa(".hero-facts span, .proof-item").map(el => ({ text: el.textContent.trim().slice(0, 60), color: rgbToHex(css(el, "color")) }));
    const buttons = qa("a.button, .editorial-cta, button.button").slice(0, 4).map(el => ({ text: el.textContent.trim().slice(0, 40), bg: rgbToHex(css(el, "background-color")), color: rgbToHex(css(el, "color")), radius: css(el, "border-radius") }));
    const imgs = qa("img").map(el => ({ src: el.getAttribute("src"), w: el.naturalWidth, h: el.naturalHeight })).slice(0, 8);
    const sections = qa("section").map(el => ({ cls: el.className.slice(0, 40), bg: rgbToHex(css(el, "background-color")) }));
    const navLinks = qa(".nav-links a").map(a => a.textContent.trim());
    const ctaHrefs = qa("a[href*='wa.me']").map(a => a.href.slice(0, 120));
    const headings = qa("h1,h2,h3").slice(0, 12).map(h => ({ tag: h.tagName, text: h.textContent.trim().slice(0, 50), size: css(h, "font-size"), weight: css(h, "font-weight") }));
    return {
      url: location.href, title: document.title, width: innerWidth, docBg, h1Font, h1Size, h1Color, h1Track, h1Contrast: h1Contrast?.toFixed(2), h1OnHero: h1OnHero?.toFixed(2),
      navBg, navPos, overflowX, allFonts: [...allFonts], accents: [...accents], priceFontVariant, facts, buttons, imgs, sections, navLinks, ctaHrefs, headings
    };
  });

  await page.screenshot({ path: outPrefix + (mobile ? "-mobile.png" : "-desktop.png") });
  await page.screenshot({ path: outPrefix + (mobile ? "-mobile-full.png" : "-desktop-full.png"), fullPage: true });

  report.errors = errors;
  writeFileSync(outPrefix + (mobile ? "-mobile.json" : "-desktop.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
