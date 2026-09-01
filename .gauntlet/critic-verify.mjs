// Critic independent verification harness
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
import { writeFileSync, mkdirSync } from "node:fs";

const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const OUT = "D:/DeepSeek/Integra/integra-site/.gauntlet/evidence/critic";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE, headless: "new",
  args: ["--disable-gpu", "--no-first-run", "--hide-scrollbars", "--window-size=1440,900"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

const relLum = (hex) => {
  const c = hex.replace("#", "");
  const rgb = [0,2,4].map(i => parseInt(c.slice(i,i+2),16)/255).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
};
const contrast = (a, b) => { const l1 = relLum(a), l2 = relLum(b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)); };
const hex = (rgb) => {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return rgb;
  if (m[4] !== undefined && parseFloat(m[4]) === 0) return "TRANSPARENT";
  const h = (n) => (+n).toString(16).padStart(2, "0");
  return "#" + h(m[1]) + h(m[2]) + h(m[3]);
};

const routes = ["/", "/solucoes", "/como-funciona", "/precos", "/blog", "/blog/coe-perguntas-antes-de-assinar", "/privacidade", "/entrar"];
const results = {};

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push("[console] " + m.text()); });
  page.on("pageerror", (e) => errors.push("[pageerror] " + e.message));
  try {
    await page.goto("http://localhost:3000" + route, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise(r => setTimeout(r, 1800));
    const data = await page.evaluate(() => {
      const q = (s) => document.querySelector(s);
      const qa = (s) => Array.from(document.querySelectorAll(s));
      const effBg = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
          const c = getComputedStyle(n).backgroundColor;
          if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") return c;
          n = n.parentElement;
        }
        return getComputedStyle(document.body).backgroundColor;
      };
      const info = (el) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { text: el.textContent.trim().slice(0, 70), font: cs.fontFamily.split(",")[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, bg: effBg(el), tracking: cs.letterSpacing, radius: cs.borderRadius };
      };
      const h1 = q("h1");
      const h1i = info(h1);
      const nav = q(".nav");
      const navBg = nav ? getComputedStyle(nav).backgroundColor : null;
      const navBlur = nav ? getComputedStyle(nav).backdropFilter : null;
      const navBorder = nav ? getComputedStyle(nav).borderBottomColor + " " + getComputedStyle(nav).borderBottomWidth : null;
      const ctas = qa("a[href*='wa.me']").map(a => ({ href: a.href.slice(0, 80), hasOnClick: a.getAttribute("onclick") !== null }));
      const priceVisible = document.body.innerText.includes("R$ 229") || document.body.innerText.includes("R$229");
      const fortyEight = document.body.innerText.includes("48h");
      const overflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      // first fold (viewport 900): positions of key elements
      const fold = {};
      const hero = q(".editorial-hero, .blog-hero, .privacy-header, .article-hero, .login-brand-panel, .editorial-page-intro");
      if (hero) { const r = hero.getBoundingClientRect(); fold.hero = { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height) }; }
      if (h1) { const r = h1.getBoundingClientRect(); fold.h1Top = Math.round(r.top); }
      const ctaBtn = q(".editorial-cta, .button-primary, .button-accent");
      if (ctaBtn) { const r = ctaBtn.getBoundingClientRect(); fold.ctaTop = Math.round(r.top); }
      // card styling sample
      const card = q(".service-card, .pricing-card, .content-card, .blog-card, .faq-item");
      const cardInfo = card ? (() => { const cs = getComputedStyle(card); return { border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, radius: cs.borderRadius, shadow: cs.boxShadow, bg: cs.backgroundColor }; })() : null;
      const hairline = qa(".section, .pricing-card, .service-card, .faq-item, .content-card, .blog-card, .split, .steps, .principles, .footer").filter(el => { const cs = getComputedStyle(el); return cs.borderTopWidth !== "0px" && parseFloat(cs.borderTopWidth) <= 2; }).length;
      return { h1: h1i, navBg, navBlur, navBorder, ctas, priceVisible, fortyEight, overflowX, fold, cardInfo, hairlineCount: hairline, bodyBg: getComputedStyle(document.body).backgroundColor };
    });
    // compute real contrast h1 vs effective bg
    if (data.h1) {
      const fg = data.h1.color, bg = data.h1.bg;
      data.h1.contrast = (fg.startsWith("rgb") && !bg.startsWith("TRANSPARENT")) ? contrast(hex(fg), hex(bg)).toFixed(2) : null;
    }
    data.errors = errors;
    results[route] = data;
  } catch (e) {
    results[route] = { fatal: e.message, errors };
  }
  await page.close();
}

// Interactions on home: scroll, FAQ, mobile
const home = await browser.newPage();
home.on("console", (m) => { if (m.type() === "error") (results.interactions = results.interactions || { errors: [] }).errors.push(m.text()); });
await home.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1800));
const scrollTest = await home.evaluate(async () => {
  const nav = document.querySelector(".nav");
  const before = getComputedStyle(nav).backgroundColor;
  window.scrollTo(0, 800);
  await new Promise(r => setTimeout(r, 600));
  const after = getComputedStyle(nav).backgroundColor;
  const cls = nav.className;
  // FAQ accordion
  const faqBtn = document.querySelectorAll(".faq-item button")[1];
  const beforeAria = faqBtn ? faqBtn.getAttribute("aria-expanded") : null;
  if (faqBtn) faqBtn.click();
  await new Promise(r => setTimeout(r, 500));
  const afterAria = faqBtn ? faqBtn.getAttribute("aria-expanded") : null;
  const panel = faqBtn ? faqBtn.nextElementSibling : null;
  const panelH = panel ? getComputedStyle(panel).maxHeight : null;
  // mobile menu (force viewport 390)
  return { navBefore: before, navAfter: after, navClass: cls, faqBefore: beforeAria, faqAfter: afterAria, panelMaxH: panelH, overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
});
results.scrollFaq = scrollTest;

const mob = await browser.newPage();
await mob.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
mob.on("console", (m) => { if (m.type() === "error") (results.mobile = results.mobile || { errors: [] }).errors.push(m.text()); });
await mob.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1800));
const mobData = await mob.evaluate(async () => {
  const btn = document.querySelector(".mobile-menu-button");
  const panel0 = document.querySelector(".mobile-menu-panel");
  const before = panel0 ? getComputedStyle(panel0).display : "ABSENT";
  if (btn) btn.click();
  await new Promise(r => setTimeout(r, 500));
  const panel = document.querySelector(".mobile-menu-panel");
  const after = panel ? getComputedStyle(panel).display : "ABSENT";
  const convBarEl = document.querySelector(".mobile-conversion-bar");
  const convBar = convBarEl ? getComputedStyle(convBarEl).display : "ABSENT";
  const convBarPos = convBarEl ? getComputedStyle(convBarEl).position : null;
  const h1 = document.querySelector("h1");
  const r = h1.getBoundingClientRect();
  return { menuBefore: before, menuAfter: after, convBar, convBarPos, h1Top: Math.round(r.top), h1Size: getComputedStyle(h1).fontSize, overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
});
results.mobile = { ...results.mobile, ...mobData };
await mob.close();

// Also grab full HTML of home for od lint
const htmlPage = await browser.newPage();
await htmlPage.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1500));
const html = await htmlPage.content();
writeFileSync(OUT + "/home-rendered.html", html, "utf8");
await htmlPage.close();

writeFileSync(OUT + "/critic-report.json", JSON.stringify(results, null, 2), "utf8");
console.log(JSON.stringify(results, null, 2));
await browser.close();
