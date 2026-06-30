// i18n-svg.mjs — 從繁中 SVG 圖（assets/diagrams、assets/illustrations）產生英文版到 en/ 子目錄。
//   做法：以「文字節點精確字串」對照表替換 >中文< → >English<，並把字型換成 Latin sans。
//   英文圖是繁中圖的 source-aligned 視覺翻譯：只換文字、不改幾何/顏色，不新增 claim。
//   重跑安全；若有未對照的中文會列出並 exit 1（避免漏譯）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['assets/diagrams', 'assets/illustrations'];
// 不含空白字型名 → 可安全放進 font-family="..."（避免內嵌引號破壞屬性）
const LATIN_FONT = 'Inter, system-ui, -apple-system, Helvetica, Arial, sans-serif';

// 繁中文字節點 → 英文（與 content/drafts/en/* 與 docs/BILINGUAL_TERMS.md 用語一致）
const TR = {
  '2026：PCC on Google Cloud（要求不變）': '2026: PCC on Google Cloud (requirements unchanged)',
  'AP（應用處理器）開機鏈': 'AP (Application Processor) boot chain',
  'Google Cloud 機房（NVIDIA GPU）— Apple 完整保留 PCC 軟體控制': 'Google Cloud data center (NVIDIA GPU) — Apple fully retains control of PCC software',
  'PAC/Swift/REM/擴散': 'PAC / Swift / REM / diffusion',
  'PCC 五大核心要求': "PCC's five core requirements",
  'PCC 節點': 'PCC node',
  'PCC 節點推論': 'PCC node inference',
  'PKA 把量測值（SEAL_DATA / SEAL_DATA_A）': 'PKA takes measurements (SEAL_DATA / SEAL_DATA_A)',
  'SEP（Secure Enclave）獨立信任根': 'SEP (Secure Enclave) independent root of trust',
  'VRE 工作流程（pccvre）': 'VRE workflow (pccvre)',
  'append-only 可驗證': 'append-only, verifiable',
  'append-only、不可竄改': 'append-only, tamper-evident',
  'attestation 與透明性日誌': 'attestation + transparency log',
  'attested 金鑰': 'attested keys',
  'demo 模型': 'demo model',
  '— 空 —': '— empty —',
  '≥2 獨立廠商信任根': '≥2 independent-vendor roots of trust',
  '① 意外資料揭露': '① Accidental data disclosure',
  '① 查量測值是否在 log': '① Check measurements are in the log',
  '① 無狀態運算': '① Stateless computation',
  '① 驗 log': '① Verify log',
  '② 下載 binary': '② Download binary',
  '② 可強制執行的保證': '② Enforceable guarantees',
  '② 外部入侵（請求）': '② External intrusion (request)',
  '② 比對': '② Compare',
  '③ 實體/內部存取': '③ Physical / insider access',
  '③ 無特權存取': '③ No privileged access',
  '③ 相符': '③ Match',
  '④ 不可被指定目標': '④ Non-targetability',
  '④ 推論': '④ Inference',
  '⑤ 可驗證透明性': '⑤ Verifiable transparency',
  '⑤ 驗': '⑤ Verify',
  '一致性': 'Consistency',
  '上了鎖': 'Locked',
  '之後什麼都不留': 'Nothing kept afterward',
  '人人都能查驗的收據': 'A receipt anyone can verify',
  '任何人': 'Anyone',
  '任務夠簡單？': 'Task simple enough?',
  '你的手機': 'Your phone',
  '你的東西不留底': 'Your stuff leaves no trace',
  '你的資料': 'Your data',
  '你（有鑰匙）': 'You (hold the key)',
  '使用者裝置': 'User device',
  '使用者請求': 'User request',
  '使用者資料': 'User data',
  '信任邊界＝PCC 節點': 'Trust boundary = PCC node',
  '僅給符合者': 'Only to matching nodes',
  '僅記憶體內、用完即棄': 'In memory only; discarded after use',
  '公開紀錄（只能往上加）': 'Public record (append-only)',
  '匿名轉送': 'Anonymous relay',
  '只有你有鑰匙': 'Only you have the key',
  '只有你有鑰匙的盒子': 'A box only you have the key to',
  '可查驗': 'Verifiable',
  '否': 'No',
  '含 Apple 也無法繞過': 'Even Apple cannot bypass',
  '回應': 'Response',
  '在裝置上發起': 'Initiated on device',
  '外部可檢查實際軟體': 'Externally inspectable software',
  '大型模型、用完即棄': 'Large model; discarded after use',
  '威脅模型：三大情境與信任邊界': 'Threat model: three scenarios and the trust boundary',
  '實際用的軟體，攤在陽光下': 'The software actually used, out in the open',
  '封裝請求金鑰': 'Wrap request key',
  '封裝金鑰給 REK': 'Wrap key to REK',
  '專屬 namespace': 'Dedicated namespace',
  '專屬 process': 'Dedicated process',
  '強大和私密，不必二選一': 'Powerful and private — not either-or',
  '打不開': 'Cannot open it',
  '提出 attestation': 'Presents attestation',
  '擴展 ≠ 把資料交給 Google 任意處理': 'Expansion ≠ handing data to Google to use freely',
  '是': 'Yes',
  '有人有機會看到': 'Someone can see it',
  '有人能替你查': 'Someone can check for you',
  '核對後才封裝金鑰': 'Wrap key only after checking',
  '根本不出門': 'Never leaves',
  '每請求網路解析': 'Per-request network resolution',
  '比較難的事': 'Harder tasks',
  '準備＋加密請求': 'Prepare + encrypt request',
  '無法鎖定特定使用者': 'Cannot target a specific user',
  '用完即棄': 'Discarded after use',
  '用完即棄、不留存': 'Use once; not retained',
  '用完就清空': 'Cleared after use',
  '用完就自我清空的房間': 'A room that clears itself after use',
  '由技術而非政策保障': 'By technology, not policy',
  '界限：虛擬 SEP／paravirtualized GPU；無 reproducible builds，源碼僅作分析輔助。': 'Limits: virtual SEP / paravirtualized GPU; no reproducible builds — source is an analysis aid only.',
  '留在手機自己做': 'Done on the phone',
  '留在裝置端處理': 'Handled on device',
  '研究者': 'Researcher',
  '硬體 attestation': 'Hardware attestation',
  '硬體帳本': 'Hardware ledger',
  '移除可被偵測': 'Removal is detectable',
  '管理員 / Apple': 'Admin / Apple',
  '節點選擇': 'Node selection',
  '簡單的事': 'Simple tasks',
  '縱深防禦：預防 → 偵測 → 圍堵 → 時間限界 → 目標擴散。已知限界：sandbox 較粗、節點同質性、無 reproducible builds。': 'Defense in depth: prevent → detect → contain → time-bound → target diffusion. Known limits: coarser sandbox, node homogeneity, no reproducible builds.',
  '自我清空、可查驗': 'Self-clearing, verifiable',
  '與外部輸入隔離': 'Isolated from external input',
  '與金鑰雜湊後，以 DCIK 簽署 → 綁定開機狀態': 'hashed with the key, signed by DCIK → bound to boot state',
  '藏來源 IP': 'Hides source IP',
  '處理你的請求時': 'While processing your request',
  '裝置': 'Device',
  '裝置只信任「經 Apple 密碼學簽核」的 PCC 軟體': 'The device only trusts PCC software cryptographically signed by Apple',
  '裝置能處理？': 'Device can handle it?',
  '要幫忙，得先看過這些': 'To help, it must first see these',
  '請求生命週期（端到端）': 'Request lifecycle (end to end)',
  '起點 Boot ROM / SEPROM 於製造時置入矽晶，不可變（連 Apple 也無法更改）。': 'The Boot ROM / SEPROM origin is fused into silicon at manufacture, immutable (not even Apple can change it).',
  '較小的端上模型': 'Smaller on-device model',
  '辦完事': 'When done',
  '送到 PCC（私有雲端）': 'Sent to PCC (private cloud)',
  '送到上鎖的雲': 'Sent to the locked cloud',
  '透明性日誌': 'Transparency log',
  '連做的人都打不開': 'Even its makers cannot open it',
  '連我們自己都打不開': 'Not even we can open it',
  '金鑰只封裝給「量測值符合公開透明性日誌」的節點；回應後狀態銷毀。': 'The key is wrapped only to nodes whose measurements match the public transparency log; state is destroyed after the response.',
  '開蓋斷電/anti-replay': 'Tamper cut-power / anti-replay',
  '隔離/過濾/Ephemeral': 'Isolation / filtering / Ephemeral',
  '驗 APTicket': 'Verify APTicket',
  '驗 attestation': 'Verify attestation',
  '（量測值＋公鑰）': '(measurements + public key)',
};

// 部分英文較長的圖：整體縮一點字級以免溢出（只在 en 版套用）
const FONT_SCALE = { 'D2.svg': 0.92, 'D3.svg': 0.92, 'D4.svg': 0.94, 'D6.svg': 0.92, 'D7.svg': 0.8, 'D8.svg': 0.9 };

const CJK = /[㐀-鿿豈-﫿]/;
let unmapped = [];

function translate(svg, file) {
  // 文字節點：>中文< → >English<（長字串先換，避免子字串誤замена）
  for (const zh of Object.keys(TR).sort((a, b) => b.length - a.length)) {
    svg = svg.split(`>${zh}<`).join(`>${TR[zh]}<`);
  }
  // 字型換 Latin sans（match font-family="...PingFang...">）
  svg = svg.replace(/font-family="[^"]*"/g, `font-family="${LATIN_FONT}"`);
  // 視需要縮字級
  const scale = FONT_SCALE[file];
  if (scale) {
    svg = svg.replace(/font-size="(\d+(?:\.\d+)?)"/g, (_, n) => `font-size="${(+n * scale).toFixed(1)}"`);
  }
  // 檢查殘留中文
  for (const m of svg.matchAll(/>([^<>]*)</g)) if (CJK.test(m[1])) unmapped.push(`${file}: ${m[1]}`);
  return svg;
}

let made = 0;
for (const dir of DIRS) {
  const abs = path.join(REPO, dir);
  const enDir = path.join(abs, 'en');
  fs.mkdirSync(enDir, { recursive: true });
  for (const name of fs.readdirSync(abs)) {
    if (!name.endsWith('.svg')) continue;
    const src = fs.readFileSync(path.join(abs, name), 'utf8');
    fs.writeFileSync(path.join(enDir, name), translate(src, name));
    made++;
  }
}

if (unmapped.length) {
  console.error(`✗ i18n-svg：${unmapped.length} 個未對照的中文文字節點（請補 TR）：\n` + unmapped.map(u => '  - ' + u).join('\n'));
  process.exit(1);
}
console.log(`✓ i18n-svg：產生 ${made} 個英文 SVG → assets/{diagrams,illustrations}/en/，無殘留中文。`);
