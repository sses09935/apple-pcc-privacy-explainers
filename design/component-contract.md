# Component Contract — PCC Privacy Explainers

> PDF / Web 共用的元件命名與行為契約（component naming + behaviour contract）。
> 從屬於 [`DESIGN.md`](../DESIGN.md)（§14）。設計來源思想參考 **google-labs-code/design.md**
> （把設計系統寫成人類與 AI agent 都能讀的 source of truth），但本檔為本 repo 自行撰寫，**未照抄任何外部範例視覺或程式碼**。
>
> 權威邊界（呼應 `AGENTS.md`、`DESIGN.md`、`docs/KNOWLEDGE_GOVERNANCE.md`）：
> - 技術事實 → `content/knowledge-base.md`；來源權威 → `sources/source-index.md`、`sources/source-map.md`。
> - 視覺與呈現 → `DESIGN.md` + `design/*`。本檔**不得新增 PCC 技術宣稱**。

---

## 1. 這份契約的用途

AI agent 或 contributor 在改 CSS／template／可讀性之前，本檔是「元件層」的單一查詢點：每個元件的**規範名稱**、**實作狀態**、**用途**、**何時用／何時避免**、**PDF/Web 支援**、以及**與 AFM3 對齊**時要保持的命名／語意。

新增 component → **先更新本檔**，再寫 CSS／template（`DESIGN.md` §15）。

## 2. 狀態定義

| Status | 意義 |
|---|---|
| **Implemented** | 已有對應實作（專屬 class 或穩定語意化 HTML）。改它要遵守本契約。 |
| **Alias** | 已實作，但目前用既有 class 名（如 `.fnref`），規範名稱保留為對齊用。 |
| **Proposed** | 規範名稱已保留，CSS／wiring 尚未全部落地；落地前須先更新本檔。 |

## 3. 觸發方式（callout 家族）

callout 在 Markdown 中以 **GitHub-style alert** 開頭觸發；無標記的 blockquote 等於預設 `.callout`：

```md
> [!NOTE] 一般提示
> [!BOUNDARY] 查核邊界：可以確定 vs 不能推論
> [!WARNING] 準確性紅線提醒
> [!MISCONCEPTION] 常見誤解澄清
> [!SUMMARY] 先講結論 / 讀完帶走什麼
```

PDF（`build/md2html.mjs`）與 Web（`build/build-html.mjs`）皆解析同一套標記，輸出 `<blockquote class="callout callout-<type>">`。

## 4. 元件表

> 所有元件一律受 `DESIGN.md` §10（Source and Claim Presentation）與 §11（Do / Don't）約束：不得放未引用的新事實、不得加強宣稱強度、不得淡化來源或紅線。

| 規範名稱 | 用途 | 何時使用 | 何時避免 | PDF | Web | AFM3 對齊（命名／語意保持一致） |
|---|---|---|---|---|---|---|
| `.source-ref` | 來源引用標記（`[S0X]` → 文末來源） | 任何事實句後標來源 | 大眾版正文（改集中於「依據」頁） | ✅（`.fnref`） | ✅（可點擊 pill） | 命名 `.source-ref`；語意＝可追溯來源徽章，兩 repo 一致 |
| `.status-pill` | 狀態／屬性標籤（Apple 宣稱 vs 可獨立驗證、版本／更新狀態） | 標示一句話的認識論強度或 metadata | 用來暗示比來源更強的保證 | ✅ | ✅ | 同名；語意＝狀態徽章，非裝飾 |
| `.callout` | 一般提示／解讀框（預設 blockquote） | 重點、解讀、提示 | 放未引用的新事實 | ✅ | ✅ | 同名；容器語意一致 |
| `.callout-note` | 補充說明 | 旁註、延伸、操作提示 | 當成事實來源 | ✅ | ✅ | 同名 |
| `.callout-boundary` | 查核邊界（可以確定 vs 不能推論） | 區分官方支持事實與不可推論之處 | 淡化或省略邊界 | ✅ | ✅ | 同名；**語意是 PCC/AFM3 共用的紅線容器** |
| `.callout-warning` | 準確性紅線提醒 | 提醒易誇大或常見錯誤強化 | 製造恐嚇或誇張語氣 | ✅ | ✅ | 同名 |
| `.callout-misconception` | 常見誤解澄清 | 「別這樣讀 PCC」對照 | 新增 KB 沒有的「事實」 | ✅ | ✅ | 同名 |
| `.callout-summary` | 先講結論／讀完帶走什麼 | 章首導讀、章末 takeaway | 引入正文沒有的新點 | ✅ | ✅ | 同名 |
| `.reader-route-card` | 首頁受眾路由卡 | 首頁選「給誰／讀多久／入口」 | 改變受眾識別色（見 `DESIGN.md` §4.3） | —（Web 概念） | ✅（`.card`） | 命名 `.reader-route-card`；卡片需含 who／時間／深度／入口 |
| `.reader-tools` | 閱讀工具列容器（如模式切換） | 包裹 reader/check 控制 | 遮蔽或弱化來源標示 | —（Web） | ✅ | 同名；位置／語意一致 |
| `.reader-mode-toggle` | 閱讀／查核模式切換 | 切換來源高亮（查核模式） | 用「查核模式」改變事實，而非只改呈現 | —（Web） | ✅ | 同名；查核模式只高亮 `.source-ref`，不改內容 |
| `.language-switcher` | 繁中 ↔ 英文語言切換 | nav 右側、CTA 前；連到**對應語言的同一頁** | 只連回首頁、或隱藏到看不見 | —（Web） | ✅ | 同名；必須連對應頁、語意與位置一致 |
| `.toc` | 章節目錄 | 長文導覽 | 自動編號疊加既有章節編號（歷史雷區） | —（PDF 走分頁） | ✅ | 同名 |
| `.toc-group` | 目錄分組（章 → 節） | 把長 TOC 分群（快速理解／邊界／技術驗證／誤解／來源／附錄） | 改變章節結構或含義 | — | ⚠️ Proposed（現為扁平 `.toclist`＋mobile 收合） | 同名；分群標籤兩 repo 對齊 |
| `.table-wrap` | 表格溢出包裹（mobile 橫向捲動／長表跨頁） | 任何寬表 | 用表格擠入超過來源支持的細節 | ✅（表格樣式） | ✅（`.tablewrap`） | 命名 `.table-wrap` |
| `.diagram-figure` | 圖卡框（D／M／G 系列圖＋圖說） | 任何圖＋圖說 | 圖／圖說新增技術 claim（見 `design/diagram-style.md`） | ✅（`figure`） | ✅（`figure`） | 命名 `.diagram-figure` |
| `.section-summary` | 章節頂部「先講結論」框 | 主要 H2 章首 | 引入新 claim；摘要只能改寫既有正文 | ✅ | ✅ | 同名；現以 `.callout-summary` 實現 |
| `.takeaway-list` | 章末重點清單 | 每篇結尾「讀完帶走什麼」 | 加強宣稱強度；須可回溯既有 claim | ✅ | ✅ | 同名；現以 `.callout-summary` ＋有序清單實現 |

### 狀態對照與別名

| 規範名稱 | 目前實作（v1.2.0 → 本 pass） | Status |
|---|---|---|
| `.source-ref` | `.fnref` | Alias |
| `.status-pill` | 新增 CSS（本 pass）；沿用 `.fnref` 徽章語彙 | Implemented |
| `.callout` / `-note` / `-boundary` / `-warning` / `-misconception` / `-summary` | 新增 CSS ＋ `[!TYPE]` 解析（本 pass）；無標記 blockquote＝`.callout` | Implemented |
| `.reader-route-card` | `.card` | Alias |
| `.reader-tools` / `.reader-mode-toggle` / `.reader-mode-hint` | Web 閱讀／查核模式切換；切換 `<html data-reader-mode>`＋localStorage 持久化（見 §7） | Implemented |
| `.language-switcher` | 新增（雙語 pass，繁中 ↔ 英文 nav 切換） | Implemented |
| `.toc` | `.toc` / `.toclist` / `.toc-h`（＋mobile 收合） | Implemented |
| `.toc-group` | 尚未分群（扁平 `.toclist`） | Proposed |
| `.table-wrap` | `.tablewrap` | Alias |
| `.diagram-figure` | `figure` + `figcaption` | Alias |
| `.section-summary` / `.takeaway-list` | 以 `.callout-summary` 實現；語意別名保留 | Proposed |

> 改名（別名 → 規範名）時，須一次更新 CSS、`build/md2html.mjs`、`build/build-html.mjs` 與本表，並於 `qa-report.md` 記錄。在此之前以現有別名為準；不要為「對齊命名」新增重複 class 定義。

### 繁中 / 英文共用

所有元件都是**語言中立（language-neutral）**：繁中與英文版共用同一套 class、CSS 與 template，差別只在內容文字。**唯一語言相關的是 `.language-switcher`**——它在繁中頁顯示「English」、英文頁顯示「繁體中文」，並連到**對應語言的同一頁**（見 `DESIGN.md` §18、`docs/I18N.md`）。callout 標籤文字（如 `Audit boundary` / `查核邊界`）隨語言不同，但 class 與語意相同。

## 5. 與 AFM3 的相容性

本系列（Apple AI Explainers）規劃中的姊妹專案 **AFM3** 將共用同一套呈現語言：

- **共用的是元件命名與呈現契約**（本表規範名稱），**不是事實內容**。PCC 與 AFM3 各自維持獨立的 KB 與來源邊界。
- 新增／改名元件時，採對兩 repo 都中性的命名；避免 PCC 專有字眼鎖死契約。
- 任何「會影響 AFM3 對齊」的元件命名／契約改動，於 `CHANGELOG.md` 或 `qa-report.md` 註明（`DESIGN.md` §15）。
- **知識邊界永遠分離**：相容只到「設計語言」這層；跨 repo 不得共用或搬移 claim、來源解讀或不確定性標籤。

## 6. Agent compatibility（lint mindset）

完整 agent 規則見 [`DESIGN.md`](../DESIGN.md) §15。摘要：改 CSS／template／可讀性前先讀 `DESIGN.md` 與本契約；新增 component → 先更新本檔；新增 token → 先更新 `DESIGN.md` §4；改來源／狀態／callout 呈現 → 更新 `qa-report.md`；影響 AFM3 對齊 → 在 `CHANGELOG.md` 或 `qa-report.md` 註明。

## 7. Reading / Audit mode behaviour（Web）

模式狀態載於 **`<html data-reader-mode="reading|audit">`**（非 `body.checkmode` 單狀態；勿用 `!important`）。完整設計見 [`DESIGN.md`](../DESIGN.md) §19。

| 元件 / 選擇器 | 用途 | Reading mode | Audit mode | PDF | 繁/英 |
|---|---|---|---|---|---|
| `.reader-mode-toggle` | 切換按鈕（在 `.reader-tools`） | 顯示「切換到查核模式」 | 顯示「切換到閱讀模式」、按鈕填 accent | 不出現 | 共用（文字隨語言） |
| `[data-reader-mode="reading"]` | 閱讀狀態根 | 正文優先；來源／次要元素降低權重 | — | 預設（無 JS） | 共用 |
| `[data-reader-mode="audit"]` | 查核狀態根 | — | 來源／邊界／限制浮出 | 不套用 | 共用 |
| `.source-ref`（`.fnref`） | 來源引用 | opacity ~.55、細框、低權重（**不隱藏**） | opacity 1、粗框、accent 底＋ring | 用 base 樣式 | 共用 |
| `.callout-boundary` | 查核邊界 | opacity ~.86 | 左框 6px＋slate 淡底＋外圈浮出 | 一般 | 共用 |
| `.callout-misconception` | 常見誤解 | opacity ~.86 | 左框 6px＋rose 淡底＋外圈浮出 | 一般 | 共用 |
| `.callout-warning` | 準確性紅線 | opacity ~.86 | 左框 6px＋amber 淡底＋外圈浮出 | 一般 | 共用 |
| `.status-pill` | 狀態徽章 | opacity ~.8 | opacity 1、加粗、外圈 | 一般 | 共用 |
| `.toc` / `.doc-top` / `.foot` | 導覽／頁尾 metadata | 中性 | TOC accent 框＋底；標題卡 accent rail；頁尾 accent 上框 | n/a | 共用 |

規則：① 兩模式都**不得隱藏來源**（reading 只降權重，不可 `display:none`）；② audit 必須讓 source／boundary／limitation **明顯強於** reading（至少三類元素變化）；③ 持久化用 `localStorage['pcc-reader-mode']`，預設 `reading`；④ 可測性由 [`build/debug-web.mjs`](../build/debug-web.mjs) 驗證。
