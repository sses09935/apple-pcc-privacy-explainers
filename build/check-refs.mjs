// check-refs.mjs — 引用完整性稽核：content/ 內每個 [S0X]（及依據頁的 S 編號）
// 都必須存在於 sources/source-index.md。發現孤兒引用 → exit 1。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 1) source-index.md 內定義的合法 S 編號
const indexText = fs.readFileSync(path.join(REPO, 'sources/source-index.md'), 'utf8');
const valid = new Set();
for (const line of indexText.split('\n')) {
  const m = line.match(/^\|\s*\*{0,2}(S\d+)\*{0,2}\s*\|/);
  if (m) valid.add(m[1]);
}
if (valid.size === 0) { console.error('✗ 無法從 source-index.md 解析任何 S 編號'); process.exit(1); }

// 2) 掃描 content/（草稿 + 知識庫）所有 S 編號引用
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

let orphans = [];
for (const file of walk(path.join(REPO, 'content'))) {
  const text = fs.readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    // 取 [S0X] / [S0X, S0Y] 內的編號，以及「依據」表中的裸 S 編號
    for (const m of line.matchAll(/\bS\d+\b/g)) {
      const id = m[0];
      if (!valid.has(id)) orphans.push(`${path.relative(REPO, file)}:${i + 1}  ${id}`);
    }
  });
}

if (orphans.length) {
  console.error(`✗ 引用完整性失敗：發現 ${orphans.length} 個孤兒引用（不在 source-index）\n` +
    orphans.map(v => '  ' + v).join('\n'));
  process.exit(1);
}
console.log(`✓ 引用完整性：content/ 內所有 S 編號（共 ${valid.size} 個合法來源）皆可追溯`);
