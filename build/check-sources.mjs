// check-sources.mjs — 來源純度稽核：content/ 與 sources/ 內的 URL
// 只允許 Apple 官方網域（*.apple.com）與 github.com/apple/*。發現其他來源 → exit 1。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIRS = ['content', 'sources'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function allowed(url) {
  let u;
  try { u = new URL(url); } catch { return true; } // 解析失敗者不視為違規
  const host = u.hostname.toLowerCase();
  if (host === 'apple.com' || host.endsWith('.apple.com')) return true;
  if (host === 'github.com' && /^\/apple(\/|$)/i.test(u.pathname)) return true;
  return false;
}

const URL_RE = /https?:\/\/[^\s`)<>"'\]]+/g;
let violations = [];
for (const dir of SCAN_DIRS) {
  const abs = path.join(REPO, dir);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    const text = fs.readFileSync(file, 'utf8');
    text.split('\n').forEach((line, i) => {
      for (const m of line.matchAll(URL_RE)) {
        const url = m[0].replace(/[.,;]+$/, '');
        if (!allowed(url)) violations.push(`${path.relative(REPO, file)}:${i + 1}  ${url}`);
      }
    });
  }
}

if (violations.length) {
  console.error(`✗ 來源純度失敗：發現 ${violations.length} 個非 Apple 官方來源\n` +
    violations.map(v => '  ' + v).join('\n'));
  process.exit(1);
}
console.log('✓ 來源純度：content/ 與 sources/ 內所有 URL 皆為 Apple 官方來源');
