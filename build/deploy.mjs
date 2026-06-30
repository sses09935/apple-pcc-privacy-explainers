// deploy.mjs — 防漂移部署：確保 Firebase 部署的產物 = GitHub Pages 會建置的同一 commit。
// 流程：① 工作目錄須乾淨 ② 本地須 == origin/main（已 push）③ 重建 site/ + 跑 QA ④ 才 firebase deploy。
// 並固定 --project apple-pcc-explainers，避免誤部署到其他 Firebase 專案。
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BUILD = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(BUILD, '..');
const out = c => execSync(c, { cwd: REPO }).toString().trim();
const run = c => execSync(c, { cwd: BUILD, stdio: 'inherit' });
const die = m => { console.error(`✗ ${m}`); process.exit(1); };

// ① 工作目錄乾淨（site/、build/.cache、node_modules 皆 gitignored，不會出現在 porcelain）
if (out('git status --porcelain')) die('工作目錄有未提交變更，請先 commit 再部署（避免 Firebase 與 Pages 漂移）。');

// ② 與 origin/main 同步
run('git fetch -q origin main');
const local = out('git rev-parse HEAD');
const remote = out('git rev-parse origin/main');
if (local !== remote) die(`本地 HEAD (${local.slice(0, 7)}) ≠ origin/main (${remote.slice(0, 7)})。請先 git push，讓 Firebase 與 GitHub Pages 部署同一 commit。`);
console.log(`部署 commit ${local.slice(0, 7)} → Firebase（apple-pcc-explainers），與 GitHub Pages 同源。`);

// ③ 重建 + QA（與 CI 同一套關卡）
run('node build-html.mjs');
run('node check-sources.mjs');
run('node check-refs.mjs');
run('node check-schema.mjs');

// ④ 部署（固定專案）
run('firebase deploy --only hosting --project apple-pcc-explainers --non-interactive');
console.log('✓ 部署完成，且與 origin/main 同 commit。');
