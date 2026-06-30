// build-html.mjs — 產生繁中（site/）與英文（site/en/）雙語靜態網站
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import MarkdownIt from 'markdown-it';
import { loadSources, applyCallouts } from './md2html.mjs';
import { srcType, srcYear, srcDomain, cleanName } from './source-meta.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(REPO, 'site');
const REL = 'https://github.com/sses09935/apple-pcc-privacy-explainers/releases/latest/download/';
const GH = 'https://github.com/sses09935/apple-pcc-privacy-explainers';
const CANON = 'https://apple-pcc-explainers.web.app/'; // 正規網址（Firebase）；Pages 鏡像 canonical 亦指向此
const md = new MarkdownIt({ html: true, linkify: false });

// 最後更新時間 = git 最後一次 commit；最新發布版本 = 最新 git tag
const BUILD = (() => {
  try {
    const date = execSync(`git -C "${REPO}" log -1 --date=format:%Y-%m-%d --format=%cd`).toString().trim();
    const hash = execSync(`git -C "${REPO}" rev-parse --short HEAD`).toString().trim();
    return { date, hash };
  } catch { return { date: new Date().toISOString().slice(0, 10), hash: '' }; }
})();
const VERSION = (() => {
  // 最新發布版本 = 最高 semver tag（reachable from HEAD）。
  // 不可用 `git describe`：當多個 tag 指向同一 commit（單一歷史，v1.0.0 與 v2.0.0 同 commit）時，
  // describe 的 tie-break 會回傳較舊的 v1.0.0，而非 canonical 的 v2.0.0。
  try {
    const tags = execSync(`git -C "${REPO}" tag --list --sort=-v:refname --merged HEAD`).toString().trim().split('\n').filter(Boolean);
    return tags[0] || '';
  } catch { return ''; }
})();

// 每語言的路徑前綴（en 頁面位於 site/en/，故資源與 CSS 多一層 ../）
const PATHS = {
  zh: { htmlLang: 'zh-Hant', css: 'site.css', asset: '', self: '', other: 'en/' },
  en: { htmlLang: 'en', css: '../site.css', asset: '../', self: 'en/', other: '../' },
};

// 受眾文件（繁中為 source-of-record，英文為 source-aligned translation）
const DOCS = [
  {
    key: 'developer', cls: 'dev', icon: '🛡️', out: 'developer.html', pdf: 'PCC-Developer.pdf', pdfEn: 'PCC-Developer-EN.pdf',
    zh: { file: 'content/drafts/01-developer.md', title: '開發者版', who: '工程師 / 安全研究員', goal: '看威脅模型、attestation、VRE 驗證', mins: '約 25–35 分', depth: '深度：高（技術）', desc: 'PCC 威脅模型、attestation、開機信任鏈、請求生命週期與 VRE 動手驗證——繁中技術解說，逐條附 Apple 官方來源。' },
    en: { file: 'content/drafts/en/developer.md', title: 'Developer edition', who: 'Engineers / security researchers', goal: 'Threat model, attestation, hands-on VRE verification', mins: '~25–35 min', depth: 'Depth: high (technical)', desc: 'PCC threat model, attestation, boot trust chain, request lifecycle and hands-on VRE verification — a source-bounded technical explainer citing Apple official sources only.' },
  },
  {
    key: 'ai-user', cls: 'power', icon: '💬', out: 'ai-user.html', pdf: 'PCC-AI-User.pdf', pdfEn: 'PCC-AI-User-EN.pdf',
    zh: { file: 'content/drafts/02-power-user.md', title: 'AI 使用者版', who: 'AI 工具重度使用者', goal: '判斷 PCC 對個人隱私的實際意義', mins: '約 12–18 分', depth: '深度：中', desc: 'PCC 對個人隱私的實際意義：五大要求類比、請求旅程、評估任何 AI 服務的清單——繁中解說，只引用 Apple 官方來源。' },
    en: { file: 'content/drafts/en/ai-user.md', title: 'AI user edition', who: 'Heavy AI-tool users', goal: 'What PCC actually means for your privacy', mins: '~12–18 min', depth: 'Depth: medium', desc: 'What PCC actually means for your privacy: analogies for the five requirements, the request journey, and a checklist for evaluating any AI service — citing Apple official sources only.' },
  },
  {
    key: 'general', cls: 'general', icon: '🌱', out: 'general.html', pdf: 'PCC-General-Public.pdf', pdfEn: 'PCC-General-Public-EN.pdf',
    zh: { file: 'content/drafts/03-general-public.md', title: '普羅大眾版', who: '非技術讀者', goal: '用比喻理解 Apple 為何需要 PCC', mins: '約 8–12 分', depth: '深度：低（比喻）', desc: '用三個生活化比喻，零術語理解 Apple 為何需要 Private Cloud Compute，以及它如何保護你——繁中解說。' },
    en: { file: 'content/drafts/en/general.md', title: 'General edition', who: 'Non-technical readers', goal: 'Understand why Apple needs PCC, through analogies', mins: '~8–12 min', depth: 'Depth: low (analogies)', desc: 'Three everyday analogies to understand, with no jargon, why Apple needs Private Cloud Compute and how it protects you.' },
  },
];

// UI 字串（繁中 / 英文）
const UI = {
  zh: {
    siteName: 'Apple PCC 隱私解說',
    siteDesc: '繁體中文 Apple Private Cloud Compute 隱私解說：以 Apple 官方來源為唯一依據，提供開發者、AI 使用者與非技術讀者三種版本。',
    brand: ['PCC', '·', '隱私解說'], navDev: '開發者', navAi: 'AI 使用者', navGen: '大眾', navSrc: '來源', cta: 'GitHub ↗',
    switchLabel: 'English', switchAria: '切換到英文版',
    footDisclaimer: '非 Apple 官方出版品，與 Apple Inc. 無隸屬關係。只引用 Apple 官方來源。授權 Apache-2.0。',
    footSrc: '原始碼', footAll: '所有來源', footVer: '版本紀錄', footUpdated: '最後更新', footVersion: '版本', footLang: '語言', langName: '繁體中文',
    tocTitle: '章節', pdfLabel: pdf => `⬇ 下載 PDF（${pdf}）`,
    readerActReading: '切換到查核模式', readerActAudit: '切換到閱讀模式',
    readerHintReading: '目前：閱讀模式 · 降低來源標記干擾，適合順讀', readerHintAudit: '目前：查核模式 · 高亮來源、邊界與限制，適合查核',
    endSources: '來源', endIndex: '索引', endBack: '回到內文',
    homeTitle: '首頁',
    heroEyebrow: '繁體中文 · 只引用 Apple 官方來源', heroH1: 'Apple Private Cloud Compute<br>隱私解說',
    heroLede: '把 Apple 在 AI 隱私上做的事，講給三種人聽——<strong>為何要做 / 如何做到 / 做到代表什麼</strong>。事實只定義一次、逐條附官方來源、由 CI 自動稽核。',
    heroStart: '開始閱讀', heroSources: '看所有來源',
    pick: '先看哪一份？', cardFor: '給：', cardRead: '線上閱讀 →', cardPdf: '下載 PDF',
    notClaimTitle: '這份文件不主張什麼',
    notClaimIntro: '本專案解釋 PCC 的<strong>隱私與安全設計</strong>——<strong>不是 Apple Intelligence 使用手冊</strong>，不說明功能可用地區、裝置支援或操作教學。',
    notClaim: ['不主張「Apple 永遠看不到任何資料」——保證適用於 PCC 請求，威脅模型有其假設邊界。', '不主張 PCC 等於完全去信任 Apple——它降低、而非消除你對 Apple 的信任需求。', '不主張本專案能取代 Apple 官方文件——原始依據以 Apple 官方為準。', '不使用第三方爆料、推測或未經官方確認的模型規格。'],
    trustTitle: '怎麼維持可信？',
    trustBody: '事實只定義一次（單一事實庫），逐條附 Apple 官方來源編號，並由 CI 自動稽核<strong>來源純度</strong>與<strong>引用完整性</strong>。所有來源見 <a href="sources.html">來源索引</a>；更新時間見 <a href="versions.html">版本紀錄</a>。',
    citeTitle: '引用本專案（給媒體 / 社群）',
    citeIntro: '歡迎引用、轉述與分享。為避免轉述失真，建議使用以下標準說明：',
    citeQuote: '本專案是繁體中文 Apple Private Cloud Compute 隱私解說套件，僅引用 Apple 官方來源，提供開發者、AI 使用者與非技術讀者三種版本。它不是 Apple 官方文件，也不主張 PCC 等於完全去信任 Apple。',
    citeLicense: l => `授權 Apache-2.0；轉載請註明出處並連結 <a href="${l}">${l}</a>。`,
    srcTitle: '來源索引',
    srcIntro: n => `本專案只引用 Apple 官方來源（<code>security.apple.com</code> 與 <code>github.com/apple/*</code>）。共 ${n} 項；名稱可點擊連到官方頁面，每列附固定 anchor（<code>#S0X</code>）供內文註腳回跳。`,
    srcNote: '類型：主參考 = 指南入口；指南章節 = Security Guide 各節；Blog = 官方研究部落格（含 2024 初始、2026 擴展）；源碼 = apple/security-pcc；配套資源 = Bounty 等。',
    srcCols: ['編號', '類型', '名稱', '年份/日期', '網域'],
    verTitle: '版本與更新紀錄',
    verIntro: (d, h) => `本頁記錄各版本依 Apple 官方來源更新的時間點。最細緻的變更歷史見 <a href="${GH}/commits/main">commit 紀錄</a>；目前站台建置於 <strong>${d}</strong>${h ? `（<a href="${GH}/commit/${h}">${h}</a>）` : ''}。`,
    verCols: ['版本', '日期', 'commit', '變更'], verNone: '尚無標記版本（開發中）。',
    verNote: '每次推送都會由 CI 重建本站並重跑來源／引用稽核，因此「最後更新」即反映內容最新依據時間。',
  },
  en: {
    siteName: 'Apple PCC Privacy Explainer',
    siteDesc: 'A source-bounded explainer of Apple Private Cloud Compute privacy, citing Apple official sources only, in developer, AI-user and general editions. English is a source-aligned translation of the Traditional Chinese source text.',
    brand: ['PCC', '·', 'Privacy Explainer'], navDev: 'Developer', navAi: 'AI user', navGen: 'General', navSrc: 'Sources', cta: 'GitHub ↗',
    switchLabel: '繁體中文', switchAria: 'Switch to Traditional Chinese',
    footDisclaimer: 'Not an official Apple publication; not affiliated with Apple Inc. Cites Apple official sources only. Licensed under Apache-2.0.',
    footSrc: 'Source', footAll: 'All sources', footVer: 'Versions', footUpdated: 'Last updated', footVersion: 'Version', footLang: 'Language', langName: 'English',
    tocTitle: 'Sections', pdfLabel: pdf => `⬇ Download PDF (${pdf})`,
    readerActReading: 'Switch to audit mode', readerActAudit: 'Switch to reading mode',
    readerHintReading: 'Now: Reading mode · source markers dimmed for continuous reading', readerHintAudit: 'Now: Audit mode · sources, boundaries and limits highlighted',
    endSources: 'Sources', endIndex: 'index', endBack: 'back to text',
    homeTitle: 'Home',
    heroEyebrow: 'English · Apple official sources only', heroH1: 'Apple Private Cloud Compute<br>Privacy Explainer',
    heroLede: 'What Apple does for AI privacy, explained for three audiences — <strong>why it is needed / how it works / what it means</strong>. Facts are defined once, each cited to an official source, and audited by CI. English is a source-aligned translation.',
    heroStart: 'Start reading', heroSources: 'See all sources',
    pick: 'Which edition first?', cardFor: 'For: ', cardRead: 'Read online →', cardPdf: 'Download PDF',
    notClaimTitle: 'What this project does not claim',
    notClaimIntro: 'This project explains PCC\'s <strong>privacy and security design</strong> — it is <strong>not an Apple Intelligence user manual</strong>, and does not cover feature availability, device support or how-to steps.',
    notClaim: ['It does not claim "Apple can never see any data" — the guarantees apply to PCC requests, and the threat model has its assumed boundaries.', 'It does not claim PCC means fully removing trust in Apple — it reduces, rather than eliminates, how much you must trust Apple.', 'It does not claim to replace Apple official documentation — the primary basis remains Apple\'s official sources.', 'It does not use third-party leaks, speculation, or unconfirmed model specifications.'],
    trustTitle: 'How is trust maintained?',
    trustBody: 'Facts are defined once (a single knowledge base), each cited to an Apple official source number, and CI audits <strong>source purity</strong> and <strong>citation integrity</strong>. See the <a href="sources.html">source index</a>; for update times see <a href="versions.html">versions</a>.',
    citeTitle: 'Citing this project (for media / community)',
    citeIntro: 'Quoting and sharing are welcome. To avoid distortion, the following standard description is suggested:',
    citeQuote: 'This project is a source-bounded explainer of Apple Private Cloud Compute privacy, citing Apple official sources only, in developer, AI-user and general editions. It is not Apple official documentation, and does not claim PCC means fully removing trust in Apple.',
    citeLicense: l => `Licensed under Apache-2.0; when reusing, please attribute and link <a href="${l}">${l}</a>.`,
    srcTitle: 'Source index',
    srcIntro: n => `This project cites Apple official sources only (<code>security.apple.com</code> and <code>github.com/apple/*</code>). ${n} entries; names link to the official pages, and each row has a stable anchor (<code>#S0X</code>) for footnote back-references.`,
    srcNote: 'Types: Primary = guide entry; Guide section = Security Guide sections; Blog = official research blog (2024 launch, 2026 expansion); Source code = apple/security-pcc; Companion resource = Bounty etc.',
    srcCols: ['ID', 'Type', 'Name', 'Year/date', 'Domain'],
    verTitle: 'Versions and updates',
    verIntro: (d, h) => `This page records when each version was updated against Apple official sources. For the finest-grained history see the <a href="${GH}/commits/main">commit log</a>; this site was built on <strong>${d}</strong>${h ? ` (<a href="${GH}/commit/${h}">${h}</a>)` : ''}.`,
    verCols: ['Version', 'Date', 'commit', 'Changes'], verNone: 'No tagged versions yet (in development).',
    verNote: 'Every push rebuilds this site via CI and re-runs the source/citation audits, so "last updated" reflects the latest source basis.',
  },
};

const SRC_TYPE_EN = { '主參考': 'Primary', '指南章節': 'Guide section', 'Blog': 'Blog', '源碼': 'Source code', '配套資源': 'Companion resource' };

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function nav(active, lang, switchHref) {
  const t = UI[lang];
  const link = (href, label, key) => `<a href="${href}"${key === active ? ' style="color:var(--accent);font-weight:600"' : ''}>${label}</a>`;
  return `<nav class="nav"><div class="in">
    <a class="brand" href="index.html">${t.brand[0]}<span class="dot">${t.brand[1]}</span>${t.brand[2]}</a>
    ${link('developer.html', t.navDev, 'developer')}
    ${link('ai-user.html', t.navAi, 'ai-user')}
    ${link('general.html', t.navGen, 'general')}
    ${link('sources.html', t.navSrc, 'sources')}
    <span class="spacer"></span>
    <a class="language-switcher" href="${switchHref}" aria-label="${t.switchAria}">${t.switchLabel}</a>
    <a class="cta" href="${GH}">${t.cta}</a>
  </div></nav>`;
}

function shell({ cls, title, body, active, wide, out = '', desc, lang }) {
  const t = UI[lang], P = PATHS[lang];
  const url = CANON + P.self + out;
  const altUrl = CANON + PATHS[lang === 'zh' ? 'en' : 'zh'].self + out; // 對應另一語言頁
  const description = desc || t.siteDesc;
  const ogTitle = `${title} — ${t.siteName}`;
  // 語言切換連到對應頁面（index：out=''）
  const switchHref = P.other + out;
  const navHtml = nav(active, lang, switchHref);
  return `<!doctype html><html lang="${P.htmlLang}" data-reader-mode="reading"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${lang === 'zh' ? 'zh-Hant' : 'en'}" href="${url}">
<link rel="alternate" hreflang="${lang === 'zh' ? 'en' : 'zh-Hant'}" href="${altUrl}">
<meta property="og:type" content="${out ? 'article' : 'website'}">
<meta property="og:site_name" content="${esc(t.siteName)}">
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${lang === 'zh' ? 'zh_Hant_TW' : 'en'}">
<meta name="twitter:card" content="summary">
<title>${esc(title)} — ${esc(t.siteName)}</title>
<link rel="stylesheet" href="${P.css}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='26'>🛡️</text></svg>">
<script>/* 裝置分級：低階省效能、高階釋放效能；早於 paint 設 class 避免閃爍 */
(function(){var d=document.documentElement,n=navigator,m=n.deviceMemory||4,c=n.hardwareConcurrency||4,
co=n.connection||{},save=!!co.saveData,slow=/(^|-)([2-3]g)$/.test(co.effectiveType||''),
rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var low=rm||save||slow||m<=4||c<=4,high=!low&&m>=8&&c>=8;
d.classList.add(low?'lowfx':(high?'hifx':'midfx'));
if(!low){var k=0,t0=performance.now();requestAnimationFrame(function loop(t){k++;if(t-t0<480){requestAnimationFrame(loop);}
else if(k/((t-t0)/1000)<45){d.classList.remove('hifx','midfx');d.classList.add('lowfx');}});}})();</script>
<script>/* reader/audit mode 早期套用（讀 localStorage，避免切換閃爍）；無 JS 時靜態預設 reading */
(function(){try{if(localStorage.getItem('pcc-reader-mode')==='audit')document.documentElement.setAttribute('data-reader-mode','audit');}catch(e){}})();</script></head>
<body class="${cls}">
${navHtml}
${wide ? body : `<main>${body}</main>`}
<div class="foot">${t.footDisclaimer}
· <a href="${GH}">${t.footSrc}</a> · <a href="sources.html">${t.footAll}</a> · <a href="versions.html">${t.footVer}</a><br>
${t.footUpdated}：${BUILD.date}${BUILD.hash ? ` · <a href="${GH}/commit/${BUILD.hash}">${BUILD.hash}</a>` : ''}${VERSION ? ` · ${t.footVersion} <a href="${GH}/releases/tag/${VERSION}">${VERSION}</a>` : ''} · ${t.footLang}：${t.langName}</div>
<div id="pcc-debug" hidden style="position:fixed;left:0;bottom:0;z-index:9999;background:#0b1020;color:#7CFFB2;font:12px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;padding:.4em .8em;border-top-right-radius:8px;max-width:100%;overflow:auto"></div>
<script>/* debug banner：僅 ?debug=1 顯示，無外部請求、無 tracking；預設關閉 */
(function(){if(!/[?&]debug=1(&|$)/.test(location.search))return;var el=document.getElementById('pcc-debug');if(!el)return;
function n(s){return document.querySelectorAll(s).length;}
el.textContent='PCC debug · mode='+(document.documentElement.getAttribute('data-reader-mode')||'-')+' · lang='+(document.documentElement.lang||'-')+' · sourceRefs='+n('.fnref')+' · callouts='+n('.callout')+' · version=${VERSION || '-'} · commit=${BUILD.hash || '-'}';
el.hidden=false;})();</script>
</body></html>`;
}

function figuresAndImages(html, assetPrefix) {
  html = html.replace(/<p>(<img\s+[^>]*>)<\/p>\s*<p><em>([\s\S]*?)<\/em><\/p>/g,
    (_, img, cap) => `<figure>${img}<figcaption>${cap}</figcaption></figure>`);
  html = html.replace(/<p>(<img\s+[^>]*alt="([^"]*)"[^>]*>)<\/p>/g,
    (_, img, alt) => `<figure>${img}${alt ? `<figcaption>${alt}</figcaption>` : ''}</figure>`);
  html = html.replace(/src="(?:\.\.\/)+assets\//g, `src="${assetPrefix}assets/`);
  return html.replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

function wrapTables(html) {
  return html.replace(/<table>[\s\S]*?<\/table>/g, m => `<div class="tablewrap">${m}</div>`);
}

function headingAnchors(html) {
  const seen = {};
  return html.replace(/<(h[123])>([\s\S]*?)<\/\1>/g, (_, tag, inner) => {
    let base = inner.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '').slice(0, 50) || 'sec';
    seen[base] = (seen[base] || 0) + 1;
    const id = seen[base] > 1 ? `${base}-${seen[base]}` : base;
    return `<${tag} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="anchor">#</a></${tag}>`;
  });
}

function footnotes(html, sources, lang) {
  const t = UI[lang];
  const pre = [];
  html = html.replace(/<pre[\s\S]*?<\/pre>/g, m => { pre.push(m); return ` \0PRE${pre.length - 1}\0 `; });
  const order = [];
  const anchored = new Set();
  const idx = id => { let i = order.indexOf(id); if (i < 0) { order.push(id); i = order.length - 1; } return i + 1; };
  html = html.replace(/\[(S\d+(?:\s*,\s*S\d+)*)\]/g, (_, grp) => {
    const links = grp.split(',').map(s => s.trim()).map(id => {
      const n = idx(id);
      const first = !anchored.has(id); if (first) anchored.add(id);
      return `<a ${first ? `id="ref-${id}" ` : ''}href="#fn-${id}">${n}</a>`;
    }).join(', ');
    return `<sup class="fnref">${links}</sup>`;
  });
  html = html.replace(/ \0PRE(\d+)\0 /g, (_, i) => pre[i]);
  let end = '';
  if (order.length) {
    end = `\n<section class="endnotes"><h2 id="sources">${t.endSources}</h2><ol>` +
      order.map(id => {
        const s = sources[id] || { id, name: id, url: '' };
        const link = s.url ? ` <a href="${s.url}">${s.url}</a>` : '';
        return `<li id="fn-${id}"><strong>${id}</strong> — ${esc(s.name)}.${link} · <a href="sources.html#${id}">${t.endIndex}</a> <a class="backref" href="#ref-${id}" aria-label="${t.endBack}">↩</a></li>`;
      }).join('') + `</ol></section>`;
  }
  return html + end;
}

function stripLeadingMeta(html) {
  const hr = html.indexOf('<hr>'); const bq = html.indexOf('<blockquote>');
  if (bq !== -1 && (hr === -1 || bq < hr)) {
    const end = html.indexOf('</blockquote>') + '</blockquote>'.length;
    return html.slice(0, bq) + html.slice(end);
  }
  return html;
}

function tocFrom(html, lang) {
  const items = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<a class="anchor"/g)]
    .map(m => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
    .filter(i => i.id !== 'sources');
  if (items.length < 3) return '';
  return `<nav class="toc"><div class="toc-h">${UI[lang].tocTitle}</div><ul class="toclist">` +
    items.map(i => `<li><a href="#${i.id}">${esc(i.text)}</a></li>`).join('') + `</ul></nav>`;
}

function buildDoc(doc, sources, lang) {
  const t = UI[lang], P = PATHS[lang], L = doc[lang];
  let html = md.render(fs.readFileSync(path.join(REPO, L.file), 'utf8'));
  html = stripLeadingMeta(html);
  html = applyCallouts(html);
  html = figuresAndImages(html, P.asset);
  html = wrapTables(html);
  html = headingAnchors(html);
  html = footnotes(html, sources, lang);
  const h1m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const titleHtml = h1m ? h1m[1].replace(/<a class="anchor"[\s\S]*?<\/a>/, '').trim() : esc(L.title);
  if (h1m) html = html.replace(h1m[0], '');
  const pdf = lang === 'en' ? doc.pdfEn : doc.pdf;
  const top = `<div class="doc-top"><div class="kicker">${esc(L.who)}</div>
    <h1>${titleHtml}</h1>
    <div class="reader-tools" role="group" aria-label="reader mode">
      <span class="reader-mode-hint">${esc(t.readerHintReading)}</span>
      <button type="button" class="reader-mode-toggle" aria-pressed="false"
        data-act-reading="${esc(t.readerActReading)}" data-act-audit="${esc(t.readerActAudit)}"
        data-hint-reading="${esc(t.readerHintReading)}" data-hint-audit="${esc(t.readerHintAudit)}">${esc(t.readerActReading)}</button></div>
    <a class="pdf" href="${REL}${pdf}">${t.pdfLabel(pdf)}</a></div>`;
  // Reading/Audit mode：切換 <html data-reader-mode>、按鈕動作文字與提示，持久化到 localStorage。只改呈現，不改事實。
  const togglejs = `<script>(function(){
var root=document.documentElement,b=document.querySelector('.reader-mode-toggle'),h=document.querySelector('.reader-mode-hint');
if(!b)return;
function render(mode){var audit=mode==='audit';root.setAttribute('data-reader-mode',mode);
b.textContent=audit?b.dataset.actAudit:b.dataset.actReading;b.setAttribute('aria-pressed',audit?'true':'false');
if(h)h.textContent=audit?b.dataset.hintAudit:b.dataset.hintReading;}
var cur;try{cur=localStorage.getItem('pcc-reader-mode');}catch(e){}
render(cur==='audit'?'audit':'reading');
b.addEventListener('click',function(){var next=root.getAttribute('data-reader-mode')==='audit'?'reading':'audit';
render(next);try{localStorage.setItem('pcc-reader-mode',next);}catch(e){}});
})();</script>`;
  return shell({ cls: doc.cls, title: L.title, active: doc.key, out: doc.out, desc: L.desc, lang, body: top + tocFrom(html, lang) + html + togglejs });
}

function buildIndex(lang) {
  const t = UI[lang];
  const cards = DOCS.map(d => { const L = d[lang]; const pdf = lang === 'en' ? d.pdfEn : d.pdf; return `<div class="card ${d.cls}">
    <a class="card-main" href="${d.out}"><div class="ico">${d.icon}</div>
    <h3>${L.title}</h3><div class="who">${t.cardFor}${L.who}</div>
    <div class="meta"><span>${L.mins}</span><span>${L.depth}</span></div>
    <p>${L.goal}</p></a>
    <div class="links"><a href="${d.out}">${t.cardRead}</a><a href="${REL}${pdf}">${t.cardPdf}</a></div></div>`; }).join('');
  const hero = `<header class="hero">
    <span class="eyebrow">${t.heroEyebrow}</span>
    <h1>${t.heroH1}</h1>
    <p class="lede">${t.heroLede}</p>
    <div class="actions"><a class="btn primary" href="developer.html">${t.heroStart}</a><a class="btn ghost" href="sources.html">${t.heroSources}</a></div>
  </header>`;
  const body = `<section class="section"><h2 id="pick">${t.pick}</h2><div class="cards">${cards}</div></section>
<section class="section"><h2 id="not-claim">${t.notClaimTitle}</h2>
<p>${t.notClaimIntro}</p>
<ul>${t.notClaim.map(x => `<li>${x}</li>`).join('')}</ul></section>
<section class="section"><h2 id="trust">${t.trustTitle}</h2>
<p>${t.trustBody}</p></section>
<section class="section"><h2 id="cite">${t.citeTitle}</h2>
<p>${t.citeIntro}</p>
<blockquote class="callout">${t.citeQuote}</blockquote>
<p class="muted">${t.citeLicense(CANON)}</p></section>`;
  return shell({ cls: 'dev', title: t.homeTitle, active: 'index', wide: true, out: '', desc: t.siteDesc, lang, body: hero + body });
}

function buildSources(sources, lang) {
  const t = UI[lang];
  const rows = Object.values(sources).sort((a, b) => +a.id.slice(1) - +b.id.slice(1))
    .map(s => {
      const name = esc(cleanName(s.name));
      const nameCell = s.url ? `<a href="${s.url}">${name}</a>` : name;
      const ty = srcType(s.url); const tyLabel = lang === 'en' ? (SRC_TYPE_EN[ty] || ty || '—') : (ty || '—');
      return `<tr id="${s.id}"><td><strong>${s.id}</strong></td><td>${tyLabel}</td><td>${nameCell}</td><td>${srcYear(s.name) || '—'}</td><td><code>${srcDomain(s.url) || '—'}</code></td></tr>`;
    }).join('');
  const body = `<h1>${t.srcTitle}</h1>
<p>${t.srcIntro(Object.keys(sources).length)}</p>
<p class="muted">${t.srcNote}</p>
<div class="tablewrap"><table><thead><tr>${t.srcCols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  return shell({ cls: 'dev', title: t.srcTitle, active: 'sources', out: 'sources.html', lang, desc: t.siteDesc, body });
}

function gitTags() {
  try {
    const out = execSync(`git -C "${REPO}" tag --sort=-creatordate`).toString().trim();
    if (!out) return [];
    return out.split('\n').map(tag => {
      const date = execSync(`git -C "${REPO}" log -1 ${tag} --date=format:%Y-%m-%d --format=%cd`).toString().trim();
      const hash = execSync(`git -C "${REPO}" rev-parse --short ${tag}^{commit}`).toString().trim();
      let note = '';
      try { note = execSync(`git -C "${REPO}" tag -l ${tag} --format='%(contents:subject)'`).toString().trim(); } catch {}
      if (!note) { try { note = execSync(`git -C "${REPO}" log -1 ${tag} --format=%s`).toString().trim(); } catch {} }
      return { tag, date, hash, note };
    });
  } catch { return []; }
}

const VERSION_NOTES = {
  'v2.0.0': '整併 v1.0.0 以來的雙語、可讀性設計系統與查核模式工作為現行 canonical 版本：新增英文版（Web `/en/`＋6 份雙語 PDF）、繁中 ↔ 英文語言切換、source-aligned 翻譯治理與術語表；統一 PDF/Web 可讀性設計系統（callout 五型、source pill、章首先講結論／誤解／takeaway）；Reading/Audit 兩模式（查核模式高亮來源與邊界，localStorage 持久）；英文圖表（`assets/**/en/`）；opt-in `?debug=1` debug banner 與 `build/debug-web.mjs`。DESIGN.md 升為人類＋AI-agent 設計 source of truth，新增 design references（design.md／OpenKnowledge／MkDocs／GOV.UK／Primer／USWDS）與 knowledge governance；footer／版本 metadata 對齊 apple-afm3-explainers 版本線。技術事實、KB 與所有來源自 v1.0.0 起零變動。',
  'v1.0.0': '三份解說 PDF + Web 站台（Firebase 正規站 + GitHub Pages 鏡像）；單一事實庫逐條附 Apple 官方來源、來源索引、內文↔來源雙向註腳；CI 自動稽核 + 防漂移部署；SEO；Apache-2.0。',
};
const VERSION_NOTES_EN = {
  'v2.0.0': 'Consolidates the bilingual, readability design-system and audit-mode work since v1.0.0 into the current canonical release: English editions (Web `/en/` + 6 bilingual PDFs), TC ↔ EN language switching, source-aligned translation governance and a term map; a unified PDF/Web readability design system (five callout types, source pill, section summaries / misconception / takeaway); Reading/Audit modes (audit highlights sources and boundaries, persisted in localStorage); English diagrams (`assets/**/en/`); an opt-in `?debug=1` banner and `build/debug-web.mjs`. DESIGN.md upgraded into a human + AI-agent design source of truth with design references (design.md / OpenKnowledge / MkDocs / GOV.UK / Primer / USWDS) and knowledge governance; footer/version metadata aligned with the apple-afm3-explainers release line. Technical facts, KB and all sources unchanged since v1.0.0.',
  'v1.0.0': 'Three audience PDFs + web site (Firebase canonical + GitHub Pages mirror); single knowledge base with per-claim Apple official sources, source index, two-way footnotes; CI audits + anti-drift deploy; SEO; Apache-2.0.',
};

function buildVersions(lang) {
  const t = UI[lang];
  const notes = lang === 'en' ? VERSION_NOTES_EN : VERSION_NOTES;
  const tags = gitTags();
  const rows = tags.length
    ? tags.map(x => `<tr><td><strong>${esc(x.tag)}</strong></td><td>${x.date}</td><td><a href="${GH}/releases/tag/${encodeURIComponent(x.tag)}">release</a> · <a href="${GH}/commit/${x.hash}">${x.hash}</a></td><td>${esc(notes[x.tag] || x.note || '')}</td></tr>`).join('')
    : `<tr><td colspan="4">${t.verNone}</td></tr>`;
  const body = `<h1>${t.verTitle}</h1>
<p>${t.verIntro(BUILD.date, BUILD.hash)}</p>
<div class="tablewrap"><table><thead><tr>${t.verCols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
<p class="muted">${t.verNote}</p>`;
  return shell({ cls: 'dev', title: t.verTitle, active: 'versions', out: 'versions.html', lang, desc: t.siteDesc, body });
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

function writeLocale(lang, dir, sources) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildIndex(lang));
  fs.writeFileSync(path.join(dir, 'sources.html'), buildSources(sources, lang));
  fs.writeFileSync(path.join(dir, 'versions.html'), buildVersions(lang));
  for (const doc of DOCS) fs.writeFileSync(path.join(dir, doc.out), buildDoc(doc, sources, lang));
}

function main() {
  fs.rmSync(SITE, { recursive: true, force: true });
  fs.mkdirSync(SITE, { recursive: true });
  const sources = loadSources();
  copyDir(path.join(REPO, 'assets'), path.join(SITE, 'assets'));
  fs.copyFileSync(path.join(REPO, 'design/site.css'), path.join(SITE, 'site.css'));
  fs.writeFileSync(path.join(SITE, '.nojekyll'), '');
  writeLocale('zh', SITE, sources);          // 繁中 → site/
  writeLocale('en', path.join(SITE, 'en'), sources); // 英文 → site/en/

  // sitemap.xml + robots.txt（含雙語頁面；正規網址）
  const PAGE_OUTS = ['', 'developer.html', 'ai-user.html', 'general.html', 'sources.html', 'versions.html'];
  const urls = [...PAGE_OUTS.map(p => CANON + p), ...PAGE_OUTS.map(p => CANON + 'en/' + p)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc><lastmod>${BUILD.date}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(SITE, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(SITE, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${CANON}sitemap.xml\n`);

  console.log(`✓ site/ 產生：繁中（index, sources, versions, ${DOCS.map(d => d.out).join(', ')}）+ en/ 同頁面 + sitemap.xml + robots.txt`);
}
main();
