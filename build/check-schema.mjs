// check-schema.mjs — 來源 schema 稽核（資料治理）。
// 每個來源都必須具備 id / type / title / domain / url，且：
//   domain ∈ { *.apple.com, github.com/apple/* }
//   type   ∈ { 主參考, 指南章節, Blog, 源碼, 配套資源 }
//   Blog 類型必須有年份/日期
// 任一不符 → exit 1。
import { loadSources, srcType, srcYear, srcDomain, domainAllowed, TYPES } from './source-meta.mjs';

const sources = loadSources();
const ids = Object.keys(sources);
if (ids.length === 0) { console.error('✗ 無法從 source-index.md 載入任何來源'); process.exit(1); }

const errs = [];
for (const s of Object.values(sources)) {
  const id = s.id;
  if (!s.name) errs.push(`${id}: 缺 title/name`);
  if (!s.url) { errs.push(`${id}: 缺 url`); continue; }
  if (!domainAllowed(s.url)) errs.push(`${id}: 網域不在白名單（${srcDomain(s.url) || s.url}）`);
  const t = srcType(s.url);
  if (!TYPES.includes(t)) errs.push(`${id}: type 無法分類（'${t || '∅'}'，url=${s.url}）`);
  if (t === 'Blog' && !srcYear(s.name)) errs.push(`${id}: Blog 缺年份/日期（title=${s.name}）`);
}

if (errs.length) {
  console.error(`✗ 來源 schema 失敗（${errs.length}）：\n` + errs.map(e => '  ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ 來源 schema：${ids.length} 項皆具 id/type/title/domain/url；type/網域在白名單；Blog 皆有年份`);
