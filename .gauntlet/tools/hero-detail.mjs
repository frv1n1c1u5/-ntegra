// hero-detail.mjs
import puppeteer from "file:///D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
const EDGE = "C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe";
const [,, url] = process.argv;
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--disable-gpu", "--no-first-run"], defaultViewport: { width: 1440, height: 900 } });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));
  const out = await page.evaluate(() => {
    const q = s => document.querySelector(s);
    const qa = s => Array.from(document.querySelectorAll(s));
    const cs = (el, p) => el ? getComputedStyle(el).getPropertyValue(p).trim() : null;
    const rgbToHex = rgb => { const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if (!m) return rgb; const h = n => n.toString(16).padStart(2, "0"); return "#" + h(+m[1]) + h(+m[2]) + h(+m[3]); };
    const lum = hex => { const c = hex.replace("#",""); const r = [0,2,4].map(i => parseInt(c.slice(i,i+2),16)/255).map(v => v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4)); return 0.2126*r[0]+0.7152*r[1]+0.0722*r[2]; };
    const contrast = (a,b) => { const l1=lum(a), l2=lum(b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2); };
    // hero art structure
    const art = q(".editorial-hero-art");
    let artInfo = null;
    if (art) {
      artInfo = { html: art.outerHTML.slice(0, 1200), bg: rgbToHex(cs(art, "background-color")), border: cs(art, "border"), radius: cs(art, "border-radius"), shadow: cs(art, "box-shadow").slice(0, 80) };
    }
    // above-the-fold texts
    const hero = q(".editorial-hero");
    const heroTexts = hero ? qa("h1, p, a, strong", hero).filter(el => el.offsetParent !== null).map(el => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 70) })).slice(0, 20) : [];
    // where does the fold fall: bottom of hero vs viewport
    const fold = hero ? { heroBottom: Math.round(hero.getBoundingClientRect().bottom), vh: innerHeight } : null;
    // contrast of muted text on its actual bg: find a p with color #5b6a64-ish
    const mutedSamples = [];
    qa("p").forEach(p => {
      const c = rgbToHex(cs(p, "color"));
      if (c === "#5b6a64" && mutedSamples.length < 3) {
        let bg = p;
        let bgHex = "transparent";
        while (bg && bg !== document.body) {
          const b = cs(bg, "background-color");
          if (b && b !== "rgba(0, 0, 0, 0)") { bgHex = rgbToHex(b); break; }
          bg = bg.parentElement;
        }
        mutedSamples.push({ text: p.textContent.trim().slice(0, 50), color: c, bg: bgHex, contrast: contrast(c, bgHex) });
      }
    });
    return { artInfo, heroTexts, fold, mutedSamples };
  });
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
