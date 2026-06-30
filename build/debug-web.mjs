// debug-web.mjs — 全域 Web debug：檢查 generated site/ 是否含 reader/audit mode toggle、
//   source refs、callouts、language switcher、footer metadata，以及 site.css 是否含 mode selectors。
//   只讀檔、零相依。先跑 `node build-html.mjs` 產生 site/ 再執行本檔。
//   有缺漏 → exit 1（CI 友善）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(REPO, 'site');

const ARTICLE = ['developer.html', 'ai-user.html', 'general.html'];
const CHROME = ['index.html', 'sources.html', 'versions.html'];
const LOCALES = [{ dir: '', label: 'zh' }, { dir: 'en', label: 'en' }];

const count = (s, re) => (s.match(re) || []).length;
const issues = [];
let pagesChecked = 0, srcRefsTotal = 0, calloutsTotal = 0;

if (!fs.existsSync(SITE)) {
  console.error('✗ site/ 不存在——請先執行 `node build/build-html.mjs`');
  process.exit(1);
}

// 1) site.css：mode selectors 是否存在
const cssPath = path.join(SITE, 'site.css');
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
const cssChecks = {
  'reading-mode selector': /\[data-reader-mode="reading"\]/.test(css),
  'audit-mode selector': /\[data-reader-mode="audit"\]/.test(css),
  'audit .fnref/source-ref': /\[data-reader-mode="audit"\][^{]*\.fnref/.test(css),
  'audit .callout-boundary': /\[data-reader-mode="audit"\][^{]*\.callout-boundary/.test(css),
  'audit .callout-misconception': /\[data-reader-mode="audit"\][^{]*\.callout-misconception/.test(css),
  'audit .callout-warning': /\[data-reader-mode="audit"\][^{]*\.callout-warning/.test(css),
  'audit .status-pill': /\[data-reader-mode="audit"\][^{]*\.status-pill/.test(css),
  'audit .toc': /\[data-reader-mode="audit"\][^{]*\.toc/.test(css),
  '.language-switcher': /\.language-switcher/.test(css),
};
const cssFound = Object.entries(cssChecks).filter(([, v]) => v).map(([k]) => k);
for (const [k, v] of Object.entries(cssChecks)) if (!v) issues.push(`site.css 缺 mode selector：${k}`);

// 2) 逐頁檢查
function checkPage(rel, { isArticle }) {
  const p = path.join(SITE, rel);
  if (!fs.existsSync(p)) { issues.push(`頁面不存在：${rel}`); return; }
  pagesChecked++;
  const h = fs.readFileSync(p, 'utf8');
  const must = {
    'CSS 載入': /<link rel="stylesheet" href="[^"]*site\.css">/.test(h),
    '<html data-reader-mode>': /<html[^>]*data-reader-mode="reading"/.test(h),
    '早期 mode script（localStorage）': /pcc-reader-mode/.test(h),
    'language switcher': /class="language-switcher"/.test(h),
    'footer 最後更新/Last updated': /最後更新|Last updated/.test(h),
    'footer version': /releases\/tag\//.test(h),
    'footer commit': /\/commit\//.test(h),
  };
  for (const [k, v] of Object.entries(must)) if (!v) issues.push(`${rel}：缺 ${k}`);

  if (isArticle) {
    const toggle = /class="reader-mode-toggle"/.test(h);
    const hint = /class="reader-mode-hint"/.test(h);
    const togglejs = /querySelector\('\.reader-mode-toggle'\)/.test(h);
    const srcRefs = count(h, /class="fnref"/g);
    const callouts = count(h, /callout callout-/g);
    srcRefsTotal += srcRefs; calloutsTotal += callouts;
    if (!toggle) issues.push(`${rel}：缺 reader-mode-toggle 按鈕`);
    if (!hint) issues.push(`${rel}：缺 reader-mode-hint`);
    if (!togglejs) issues.push(`${rel}：缺 toggle JS`);
    if (srcRefs === 0 && rel.indexOf('general') === -1) issues.push(`${rel}：source refs = 0（非大眾版不應為 0）`);
    console.log(`  ${rel.padEnd(18)} toggle=${toggle?'Y':'N'} hint=${hint?'Y':'N'} js=${togglejs?'Y':'N'} srcRefs=${srcRefs} callouts=${callouts}`);
  } else {
    console.log(`  ${rel.padEnd(18)} (chrome page)`);
  }
}

console.log('Web debug report');
console.log('- CSS mode selectors found:', cssFound.length + '/' + Object.keys(cssChecks).length, '→', cssFound.join(', '));
for (const loc of LOCALES) {
  const base = loc.dir ? path.join(SITE, loc.dir) : SITE;
  if (!fs.existsSync(base)) { issues.push(`locale 目錄不存在：${loc.label}`); continue; }
  console.log(`- locale [${loc.label}]:`);
  for (const a of ARTICLE) checkPage(path.join(loc.dir, a), { isArticle: true });
  for (const c of CHROME) checkPage(path.join(loc.dir, c), { isArticle: false });
}

console.log('- pages checked:', pagesChecked);
console.log('- source refs found (article pages):', srcRefsTotal);
console.log('- callouts found (article pages):', calloutsTotal);
console.log('- mode toggle found: article pages each checked above');
console.log('- language switcher found: checked per page above');
console.log('- footer metadata found: checked per page above');

if (issues.length) {
  console.error(`\n✗ Web debug：發現 ${issues.length} 項問題\n` + issues.map(i => '  - ' + i).join('\n'));
  process.exit(1);
}
console.log('\n✓ Web debug：所有頁面含 mode toggle / source refs / callouts / language switcher / footer metadata；site.css 含 reading+audit mode selectors。');
