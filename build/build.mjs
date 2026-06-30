// build.mjs — md → html → pdf（Playwright 驅動系統 Chrome；不下載 Chromium）
//   node build.mjs          → 渲染三份草稿到 dist/
//   node build.mjs --smoke  → 只渲染 CJK 冒煙測試到 dist/_cjk-smoke.pdf
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import { PDFDocument } from 'pdf-lib';
import { mdToHtml } from './md2html.mjs';

async function pageCount(p) {
  try { return (await PDFDocument.load(fs.readFileSync(p))).getPageCount(); }
  catch { return '?'; }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const DIST = path.join(REPO, 'dist');
const SMOKE = process.argv.includes('--smoke');

function footer(title) {
  return `<div style="font-family:'PingFang TC',sans-serif;font-size:8px;color:#888;width:100%;padding:0 14mm;
    display:flex;justify-content:space-between;">
    <span>${title}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;
}
const emptyHeader = `<div></div>`;

async function launchChrome() {
  // 1) 環境變數指定的執行檔（CI 用 setup-chrome 設定 CHROME_PATH）
  const envPath = process.env.CHROME_PATH || process.env.PUPPETEER_EXECUTABLE_PATH;
  if (envPath) {
    try { return await chromium.launch({ executablePath: envPath, headless: true }); } catch { }
  }
  // 2) 已安裝的瀏覽器 channel
  for (const channel of ['chrome', 'chromium', 'msedge']) {
    try { return await chromium.launch({ channel, headless: true }); } catch { }
  }
  // 3) macOS 預設路徑
  const mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  return await chromium.launch({ executablePath: mac, headless: true });
}

async function renderHtmlToPdf(page, html, outPath, { margin, docTitle, cacheName }) {
  // 寫成真實 file:// 檔再 goto——setContent 的 about:blank 來源會擋 file:// 圖片
  const cacheDir = path.join(REPO, 'build/.cache');
  fs.mkdirSync(cacheDir, { recursive: true });
  const htmlPath = path.join(cacheDir, `${cacheName}.html`);
  fs.writeFileSync(htmlPath, html);
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: emptyHeader,
    footerTemplate: footer(docTitle),
    margin,
  });
}

async function main() {
  fs.mkdirSync(DIST, { recursive: true });
  const browser = await launchChrome();
  const page = await browser.newPage();

  if (SMOKE) {
    const out = path.join(DIST, '_cjk-smoke.pdf');
    const smokeUrl = pathToFileURL(path.join(REPO, 'build/smoke/cjk-test.html')).href;
    await page.goto(smokeUrl, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({ path: out, format: 'A4', printBackground: true,
      displayHeaderFooter: true, headerTemplate: emptyHeader,
      footerTemplate: footer('CJK 冒煙測試'),
      margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' } });
    console.log('✓ smoke →', path.relative(REPO, out));
    await browser.close();
    return;
  }

  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'render.config.json'), 'utf8'));
  for (const a of cfg.audiences) {
    const { html, footnoteCount } = mdToHtml(a.draft, { theme: a.theme, docTitle: a.docTitle, lang: a.lang });
    const out = path.join(DIST, a.out);
    await renderHtmlToPdf(page, html, out, { margin: a.margin, docTitle: a.docTitle, cacheName: a.key });
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    const pages = await pageCount(out);
    console.log(`✓ ${a.key.padEnd(11)} → ${a.out}  (${pages} 頁, ${kb} KB, 註腳 ${footnoteCount})`);
  }
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
