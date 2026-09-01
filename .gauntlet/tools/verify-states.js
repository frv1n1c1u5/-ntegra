
const puppeteer = require('D:/OpenDesign/resources/app/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js');
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/EdgeCore/151.0.4129.107/msedge.exe', headless: 'new', defaultViewport: { width: 1440, height: 900 } });
  const p = await b.newPage();
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  const nav0 = await p.evaluate(() => document.querySelector('.nav').className);
  await p.evaluate(() => window.scrollTo(0, 500));
  await new Promise(r => setTimeout(r, 700));
  const nav1 = await p.evaluate(() => document.querySelector('.nav').className);
  console.log('NAV 0:', nav0);
  console.log('NAV 1:', nav1);
  const faqCount = await p.evaluate(() => document.querySelectorAll('.faq-item').length);
  console.log('FAQ ITEMS:', faqCount);
  await p.evaluate(() => document.querySelector('.faq-item button').click());
  await new Promise(r => setTimeout(r, 600));
  const faqOpen = await p.evaluate(() => {
    const div = document.querySelector('.faq-item [style*="max-height"]');
    return div ? div.style.maxHeight : 'none';
  });
  console.log('FAQ OPENED maxHeight:', faqOpen);
  console.log('HERO CARD:', await p.evaluate(() => !!document.querySelector('.hero-card')));
  console.log('FINAL CTA:', await p.evaluate(() => !!document.querySelector('.editorial-final-cta')));
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
