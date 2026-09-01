// live-verify2.mjs
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
  const out = {};
  const hasNav = await page.$(".nav");
  out.hasNav = !!hasNav;

  if (hasNav) {
    const before = await page.$eval(".nav", el => getComputedStyle(el).backgroundColor);
    await page.evaluate(() => window.scrollTo(0, 800));
    await new Promise(r => setTimeout(r, 700));
    const after = await page.$eval(".nav", el => getComputedStyle(el).backgroundColor + "|" + getComputedStyle(el).boxShadow);
    out.navScroll = { before, after };
    out.navScrolledClassApplied = await page.evaluate(() => !!document.querySelector(".nav.nav-scrolled"));
    // mobile menu + conversion bar
    const conv = await page.$eval(".mobile-conversion-bar", el => ({ display: getComputedStyle(el).display, bg: getComputedStyle(el).backgroundColor }));
    const menuBtn = await page.$(".mobile-menu-button");
    const menuBtnDisplay = menuBtn ? await menuBtn.evaluate(el => getComputedStyle(el).display) : "none";
    if (menuBtn && menuBtnDisplay !== "none") {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 600));
      const panel = await page.$eval("#mobile-menu", el => ({ display: getComputedStyle(el).display, bg: getComputedStyle(el).backgroundColor, links: el.querySelectorAll("a").length }));
      out.mobile = { conv, menuBtnDisplay, panel };
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 300));
    } else out.mobile = { conv, menuBtnDisplay };
  }
  // FAQ accordion (home)
  const faqBtn = await page.$(".faq-item button");
  if (faqBtn) {
    const b = await faqBtn.evaluate(el => el.getAttribute("aria-expanded"));
    await faqBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const a = await faqBtn.evaluate(el => el.getAttribute("aria-expanded"));
    const ans = await page.evaluate(() => { const d = document.querySelector(".faq-item button[aria-expanded='true']")?.parentElement?.querySelector("div"); return d ? getComputedStyle(d).opacity + "|" + d.scrollHeight : null; });
    out.faq = { before: b, after: a, answer: ans };
  }
  // entrar/login specifics
  const brandPanel = await page.$(".login-brand-panel");
  if (brandPanel) {
    const bg = await brandPanel.evaluate(el => getComputedStyle(el).backgroundColor);
    const h1 = await page.$eval(".login-brand-panel h1, .login-copy h1, h1", el => ({ color: getComputedStyle(el).color, size: getComputedStyle(el).fontSize }));
    out.loginBrandPanel = { bg, h1 };
    const formPanel = await page.$eval(".login-form-panel", el => getComputedStyle(el).backgroundColor);
    out.loginFormPanelBg = formPanel;
  }
  // focus ring check
  await page.focus(".nav-links a, .login-form input, a.button, .login-form button, button, a").catch(() => {});
  await new Promise(r => setTimeout(r, 200));
  out.focus = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const s = getComputedStyle(el);
    return { tag: el.tagName, cls: el.className, outline: s.outlineStyle + " " + s.outlineWidth + " " + s.outlineColor, boxShadow: s.boxShadow };
  });
  out.consoleErrors = errors;
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
