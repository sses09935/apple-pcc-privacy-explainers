// source-meta.mjs — 來源解析與分類（loadSources + type/year/domain）的單一真實來源。
// 「純 Node、零相依」——供網站產生（build-html.mjs）與 QA 檢查（check-schema.mjs）共用，
// 後者在 CI 於 npm ci 之前執行，故此模組不得 import 任何 npm 套件（如 markdown-it）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 解析 sources/source-index.md → { S03: {id, name, url}, ... }
export function loadSources() {
  const text = fs.readFileSync(path.join(REPO, 'sources/source-index.md'), 'utf8');
  const base = 'https://security.apple.com/documentation/private-cloud-compute/';
  const map = {};
  for (const line of text.split('\n')) {
    const m = line.match(/^\|\s*\*{0,2}(S\d+)\*{0,2}\s*\|(.*\|.*)$/);
    if (!m) continue;
    const id = m[1];
    const cells = m[2].split('|').map(c => c.replace(/[`*]/g, '').trim()).filter(c => c !== '');
    // 找 URL 欄；表 A（編號|層級|名稱|連結|用途）名稱在連結欄前一格，表 B（編號|章節|slug）名稱在首格
    let urlIdx = -1, url = '';
    for (let i = 0; i < cells.length; i++) {
      if (/^https?:\/\//.test(cells[i])) { url = cells[i]; urlIdx = i; break; }
      if (/^\.\.\.\//.test(cells[i])) { url = cells[i].replace(/^\.\.\./, 'https://security.apple.com/documentation'); urlIdx = i; break; }
    }
    let name;
    if (urlIdx >= 0) {
      name = cells[urlIdx - 1] || cells[0];
    } else {
      name = cells[0];
      const slug = cells[cells.length - 1];
      if (slug && /^[a-z_]+$/.test(slug)) url = base + slug;
    }
    if (!map[id]) map[id] = { id, name: name || id, url };
  }
  return map;
}

export const TYPES = ['主參考', '指南章節', 'Blog', '源碼', '配套資源'];

export const srcDomain = url => { try { return new URL(url).hostname; } catch { return ''; } };

export const srcYear = name => { const m = (name || '').match(/20\d\d(?:\/\d{1,2})?/); return m ? m[0] : ''; };

export const srcType = url => {
  if (!url) return '';
  if (url.includes('/blog/')) return 'Blog';
  if (url.includes('github.com')) return '源碼';
  if (url.includes('/bounty')) return '配套資源';
  if (/\/documentation\/private-cloud-compute\/?$/.test(url)) return '主參考';
  if (url.includes('/documentation/')) return '指南章節';
  return '';
};

export const cleanName = name => ((name || '').replace(/（[^（）]*）\s*$/, '').trim() || name);

// 網域白名單：*.apple.com 或 github.com/apple/*
export const domainAllowed = url => {
  try {
    const u = new URL(url); const h = u.hostname.toLowerCase();
    if (h === 'apple.com' || h.endsWith('.apple.com')) return true;
    if (h === 'github.com' && /^\/apple(\/|$)/i.test(u.pathname)) return true;
    return false;
  } catch { return false; }
};
