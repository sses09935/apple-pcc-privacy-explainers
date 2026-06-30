# QA Report — Phase 7 稽核與引用查核

> 對照 `docs/PLAN.md` §9（稽核清單）與 §3.8（準確性紅線）。日期：2026-06-22。
> 原則：無證據不標 pass；不靜默丟棄無法查證的宣稱。

## 摘要
| 項目 | 結果 |
|---|---|
| 引用完整性（孤兒引用 = 0） | ✅ Pass |
| 來源純度（無第三方） | ✅ Pass |
| 無事實漂移 | ✅ Pass |
| 用詞一致（GLOSSARY） | ✅ Pass |
| 準確性紅線（§3.8） | ✅ Pass |
| 渲染查核 | ✅ Pass（修正 1 項後） |
| 逐版驗收（頁數/品質） | ✅ Pass |
| `TODO(verify)` | 1 項保留並說明（裝置端模型參數量） |

---

## §9 通用項目

### 1. 引用完整性 ✅
- 三份草稿引用的 S 編號**全部存在於** `sources/source-index.md`（自動比對：drafts 用到的 S-ref ∖ index = ∅）。
- 開發者／使用者版：事實句逐句帶 `[S0X]`，文末「來源註腳」由 `md2html.mjs` 自 source-index 生成、連回官方 URL。
- 大眾版：正文不內嵌（設計如此），文末「依據」頁逐章列來源，且與 `source-map.md` 一致。
- **孤兒引用 = 0。**

### 2. 來源純度 ✅
- 掃描 `content/`、`sources/`、`docs/` 全部 URL：僅 `security.apple.com` 與 `github.com/apple/*`（另含 README 提及的 `*.apple.com` 官方支援頁）。**無任何第三方來源**。

### 3. 無事實漂移 ✅
- 共用事實在三份間比對一致（深淺不同、不矛盾）：
  - **五大要求**：開發者／使用者用相同官方譯名；大眾版**刻意不出現術語**、改以 M1–M3 比喻承載（符合受眾政策，非漂移）。
  - **2026 控制權界線**：三份皆述「Apple 完整保留控制／裝置只信任 Apple 簽核／≠ 交給 Google 任意處理」。
  - **透明性日誌、90 天政策**：開發者深寫、使用者白話，無衝突。

### 4. 用詞一致 ✅
- 對照 `docs/GLOSSARY.md`：TXM（非 TEM）、SPTM、cryptex、attestation 等用法一致。
- **大眾版正文零技術名詞**（自動掃描無 attestation/日誌/節點/PCC/SEP… 洩漏）。

### 5. 準確性紅線（§3.8）✅
- 無「Apple 永遠看不到任何東西」式誇大——唯一出現「永遠看不到」處是**明確否定句**（使用者版：「不是『Apple 永遠看不到任何東西』」）。
- 開發者版全程「**宣稱 vs 可驗證**」對照框。
- **「無 reproducible builds」**已正確呈現於三份（開發者 §7.4 設為最重要紅線、使用者 §5、大眾比喻三誠實註）；並修正了 `source-map.md` §3.8 一處仍把「可重現 build」當驗證手段的舊敘述。
- S13 控制權界線正確。

### 6. 渲染查核 ✅（修正 1 項後）
- CJK 無豆腐字、字型嵌入（PingFang/Heiti）、標點/上標/分頁正常（冒煙測試 + 實檔抽查）。
- `[S0X]` 註腳正確、連回 §2 來源；大眾版「依據」頁正確。
- **三主題視覺明確區隔**（開發者深藍高密度／使用者紫+青綠卡片／大眾暖橘大字一頁一節）。
- **🐞 發現並修正**：原以 `page.setContent()` 渲染，文件來源為 `about:blank`，Chrome **封鎖 `file://` 圖片子資源** → D1–D8、M1–M3 全部變成破圖。改為「寫真實 `file://` HTML 檔再 `goto`」後修正。驗證：載入三份 HTML 檢查每張 `img.naturalWidth>0` → **開發者 8、使用者 3、大眾 3，破圖 = 0**。

### 7. `TODO(verify)` 結算
- 已結清：S02 TOC、五大要求措辭、TXM/RSA Blind Sig/log-backed map 名詞、新章節納入、**Bounty 三大類別**（＝ S07 三大威脅情境）。
- **保留 1 項並說明**：裝置端模型精確參數量——官方專頁未公布，依紅線**不引用第三方數字**。此為全專案唯一未結清項，已於開發者版 §14.4 與 `source-map.md` 明列理由。

---

## §9 逐版驗收

### 開發者版 ✅（30 頁，目標 28–40）
- VRE 實戰（§8）為**可實際照做**的 `pccvre` 指令流程（`csrutil allow-research-guests enable` → `release download` → `instance create/start` → `inference-request` → `attestation parse/verify`）。
- 「宣稱 vs 可驗證」對照明確；非灌水（內容源自 11 個官方專頁，含請求處理、推論引擎、維運深掘）。

### 使用者版 ✅（14 頁，目標 14–22）
- 五大要求皆「類比 + 這保護你什麼」；類比未誇大（含「能查的是同一套、非對到底層」誠實界線）。
- 「PCC vs 典型雲端 AI」對照表與 AI 隱私評估清單**可實際使用**；FAQ + 白話辭典完成。

### 大眾版 ✅（13 頁，目標 12–18）
- 正文**零技術名詞**；三比喻 M1/M2/M3 忠於事實、未誇大（比喻三加了「不是每個細節都能對到最底層」）。
- 每頁文字克制；FAQ + 一頁總結完成；文末「依據」頁 provenance 完整。

---

## 本階段套用的修正
1. **渲染**：`build.mjs` 改寫真實 `file://` HTML 再 `goto`，修好 file:// 圖片載入（D1–D8、M1–M3）。
2. **準確性**：`source-map.md` §3.8 移除「可重現 build」作為驗證手段的舊敘述。
3. **TODO 結算**：Bounty 三大類別以 S07 結清；KB §3.6、開發者版 §11、source-map 同步；清理 source-map 中已於 Phase 1 驗證之名詞 TODO 標記。
4. 受影響 PDF 已重新渲染（dist/ 三份，頁數 30/14/13 均在區間）。

## 結論
§9 通用 + 逐版項目**全數通過**；孤兒引用 = 0；來源純度通過；`TODO(verify)` 僅餘 1 項並具明確保留理由。專案達可發布狀態。

---

## Task 08 — 設計系統稽核（2026-06-28，對應 v1.1.0）

> 依 `tasks/08-design-system-audit.md`，於「DESIGN.md 落地到 PDF/Web」之後執行。基準 commit：本次稽核時 main HEAD（v1.1.0）。

- [x] `DESIGN.md` 存在，且與目前 CSS／圖表系統相符（已同步補述實際視覺處理）。
- [x] CSS 改動遵循既有 design tokens 與受眾模式（沿用 `--accent`/`--accent-soft`/`--rule`/`--font-mono`/`color-mix`，未新增 token）。
- [x] PDF 版面改動保留來源標示與 claim 可追溯性（`[S0X]` → monospace 膠囊徽章，更明顯）。
- [x] Web UI 改動未模仿 Apple 官方頁面（框式 hero 採淡 accent tint，無 glow/hype，無官方資產）。
- [x] D-series 圖維持技術性、M／G-series 維持比喻性（僅改「圖卡框」容器，未動 SVG 事實結構）。
- [x] 視覺強調未加強技術宣稱（徽章/卡片/色帶皆為呈現層，未逾 KB/source-map）。
- [x] 來源標示維持可見且可讀（PDF 徽章、Web 可點擊 pill、來源附錄編號 monospace 強調）。
- [x] 無障礙與可讀性可接受（pill/卡片有 `:focus-visible`；CJK 字型正常嵌入；mobile 390px 無破版，已截圖驗證）。

**結果**：通過。三受眾視覺差異明顯（開發者冷藍技術／AI 使用者紫圓角卡片／大眾暖橘螢光筆＋插圖卡）；PDF 頁數維持 30／14／13。視覺證據見 `artifacts/screenshots/`。

## Task 09 — Claim Wiki 稽核（2026-06-28）

> 依 `tasks/09-claim-wiki-audit.md`。本輪設計實作未動 `docs/wiki/*` 與核心事實層，故為回歸確認。

- [x] 每個主要 wiki claim 都能回溯到 `content/knowledge-base.md`。
- [x] 每個來源引用都能回溯到 `sources/source-index.md`（CI `check-refs` 綠）。
- [x] 每個 claim group 與 `sources/source-map.md` 相容。
- [x] 受眾路由未改變技術意義。
- [x] 信任邊界警語與專案準確性紅線一致（KB §3.8 / `trust-boundary-map.md`）。
- [x] 未新增任何未獲支持的 Apple／PCC／Google Cloud／隱私宣稱。
- [x] 不確定處標 `TODO: verify`（保留 General×非鎖定／2026 擴展、attestation/VRE 落點）。
- [x] wiki 檔案明確標示為導航性質、非權威來源。

**結果**：通過。`content/knowledge-base.md`、`sources/source-index.md`、`sources/source-map.md`、`content/drafts/*` 自 v1.0.0 起 **零變動**（`git diff v1.0.0 HEAD` 為空）。

---

## PCC v1.3 — Readability + Design References + Knowledge Governance（2026-06-29）

> Pass 類型：**bilingual readability / design-system / attribution / knowledge-governance**。
> 三階段皆完成並驗證：**Stage 1**＝設計系統規格＋元件契約＋參考＋知識治理＋callout CSS 與 Web 閱讀工具；**Stage 2**＝繁中 `content/drafts/*` 正文重構（先講結論／拆段／誤解 callout／takeaway）＋PDF 重建；**Stage 3（雙語）**＝英文版 `content/drafts/en/*`、英文 Web `site/en/`、英文 PDF、語言切換、`docs/I18N.md`＋`docs/BILINGUAL_TERMS.md`。
> 改動：`README.md`、`DESIGN.md`、`design/{base.css,site.css,readability.md,component-contract.md}`、`build/{md2html.mjs,build-html.mjs,build.mjs,render.config.json}`、`docs/{DESIGN_REFERENCES,KNOWLEDGE_GOVERNANCE,I18N,BILINGUAL_TERMS}.md`、`CHANGELOG.md`、`content/drafts/{01,02,03}.md` + `content/drafts/en/*`、`dist/*.pdf`（重建，6 份）、本檔。
> **未動** `content/knowledge-base.md`、`sources/*`、theme-*.css 的事實或受眾結構。三項自動 QA（check-sources / check-refs / check-schema）**綠**；繁中 `content/` S 編號註腳數 16／10／0 **不變**；英文 PDF 註腳數應與繁中相同。

### Design / knowledge reference attribution

- google-labs-code/design.md referenced: **Yes**
- OpenKnowledge / OKB referenced: **Yes**
- Material for MkDocs referenced: **Yes**
- GOV.UK Design System referenced: **Yes**
- GitHub Primer referenced: **Yes**
- U.S. Web Design System referenced: **Yes**

落點：`README.md`（設計與知識庫參考）、`DESIGN.md` §13、`docs/DESIGN_REFERENCES.md`、`docs/KNOWLEDGE_GOVERNANCE.md`（OKB 知識治理）、`design/component-contract.md` 與 `DESIGN.md` §14–§15（design.md 思想）。

### License / copying safety

- Copied third-party UI code: **No**
- Imported OpenKnowledge code: **No**
- Imported GPL-covered code: **No**
- Claimed third-party endorsement: **No**
- Claimed Apple affiliation or Apple visual identity: **No**

> 五項安全項理想答案皆為 **No**，本輪實際皆為 **No**。參考來源僅用於資訊架構、閱讀體驗、知識治理與 agent workflow；本 repo 保留自己的視覺、內容模型、來源邊界與 PDF/Web 實作。

### Source / claim safety

- 是否新增 claim：**No**（callout/CSS 為純呈現層；Stage 2 僅重構既有正文結構，未新增宣稱）。
- 是否修改 `sources/source-index.md`：**No**。
- 是否修改 `sources/source-map.md`：**No**。
- 是否修改 `content/knowledge-base.md`：**No**。
- 是否修改 `content/drafts/*`：**Yes（可讀性重構＋新增英文版）**——繁中加先講結論／誤解／takeaway callout、把既有 blockquote 標為 `[!TYPE]`、拆段；新增 `content/drafts/en/*`（source-aligned translation）。**所有 `[S0X]` 保留**（繁中註腳數 16／10／0、英文同數），大眾版正文（繁＋英）維持零技術名詞。
- 是否移除任何 uncertainty / limitation / cannot-infer 限制語：**No**（紅線、「宣稱 vs 可驗證」、無 reproducible builds、威脅模型邊界等全數保留，且多數升級為 `[!BOUNDARY]`／`[!WARNING]` callout 更醒目）。

### Stage 1 變更明細

- **DESIGN.md**：§0 project identity / design goals（+可查核／agent-safe／AFM3 對齊／不誇大）/ document map；§4.4 callout/status/spacing tokens；§13 references（reorder：design.md+OKB 先）；§14 component contract；§15 AI agent design contract；§16 PDF rules；§17 Web rules。
- **新增** `design/readability.md`（11 條正文可讀性規則＋tone＋pass 流程）。
- **擴充** `design/component-contract.md`：17 個規範元件（含 `.callout-note/-boundary/-warning/-misconception/-summary`），每個含用途／何時用／何時避免／PDF·Web 支援／AFM3 對齊；誠實標 Implemented／Alias／Proposed。
- **CSS（呈現層）**：`base.css` + `site.css` 新增 callout 家族、`.status-pill`、`.reader-tools`/`.reader-mode-toggle`（查核模式）、`.table-wrap` 別名、mobile TOC 收合、reader-route 卡片 `.meta`。色彩克制（boundary=slate／warning=amber／misconception=rose），未做刺眼警報或 glow。
- **Template**：`md2html.mjs`（PDF）＋`build-html.mjs`（Web）新增 `> [!TYPE]` callout 解析（共用 `applyCallouts`）；Web 加查核模式切換、卡片閱讀時間／深度、頁尾版本。
- **callout / table / source ref / footer 改善**：callout 統一五型；`.table-wrap` 規範名；source pill 預設克制＋查核模式高亮；頁尾補 project/version/commit/updated/repo/license。

### Stage 2 變更明細（content/drafts 可讀性重構）

- **開發者版**：§0 加先講結論（`[!SUMMARY]`）＋常見誤解（`[!MISCONCEPTION]`）；6 個「宣稱 vs 可驗證」blockquote → `[!BOUNDARY]`；最重要紅線、授權警示、2026 準確性紅線 → `[!WARNING]`；章末加 takeaway（`[!SUMMARY]`）。**未新增 § 編號章節**（保 §0 章節地圖一致），全用 callout。
- **AI 使用者版**：§0 先講結論；E2E 換目標 → `[!SUMMARY]`；§1 後加「別這樣讀 PCC」誤解 callout；§9 前加「## 讀完後你應該帶走什麼」takeaway。
- **大眾版**：維持零技術名詞與比喻敘事；只把 3 個既有 blockquote 標型（重點→`[!SUMMARY]`、換句話說→`[!NOTE]`、誠實地說→`[!BOUNDARY]`）；§8「三句話記住它」本即 takeaway，保留。
- callout 內容**全部摘自既有正文**，未引入新事實；保留所有限制語與 `[S0X]`。

### Stage 3 變更明細（雙語）

- **英文草稿**：新增 `content/drafts/en/{developer,ai-user,general}.md`（source-aligned translation；逐句對齊、保留所有 `[S0X]`、callout 類型與繁中一致、技術詞保留英文原文、大眾版維持零術語、圖片用 `../../../assets/`）。
- **Pipeline**：`md2html.mjs` 加 `lang` 參數（`<html lang>`）；`render.config.json` 加 3 個 `*-en` audience（`PCC-*-EN.pdf`、英文 docTitle）；`build.mjs` 傳 `a.lang`。
- **build-html.mjs**：locale 化（`UI.zh`/`UI.en`、`PATHS`），繁中輸出 `site/`、英文輸出 `site/en/`；`.language-switcher` 連對應頁、canonical + `hreflang` 互指、英文 CSS/asset 走 `../`、footer 加 language。
- **CSS**：`site.css` 加 `.language-switcher`（nav 膠囊，沿用既有 token）。
- **文件**：新增 `docs/I18N.md`（雙語治理＋指定 EN/繁中 source-aligned 聲明）、`docs/BILINGUAL_TERMS.md`（術語表）；DESIGN.md §18 Bilingual design rules、identity/goals/agent-rules 補雙語；`readability.md` 加規則 12–13；`KNOWLEDGE_GOVERNANCE.md` 加 language edition＋translation pass；README 加「雙語版本」段；`component-contract.md` 加 `.language-switcher`＋語言共用說明。

### Bilingual QA

- Traditional Chinese source pages present: **Yes**（`site/` index/developer/ai-user/general/sources/versions）
- English pages present: **Yes**（`site/en/` 同六頁）
- Language switcher present: **Yes**（nav `.language-switcher`，繁→`en/<page>`、英→`../<page>`，連對應頁非首頁）
- English pages are source-aligned: **Yes**（逐句對齊繁中 source-of-record；callout 類型與 `[S0X]` 一致）
- English-only claims added: **No**（命題集合 ⊆ 繁中；S 編號集合與繁中完全相同）
- Source references preserved across languages: **Yes**（PDF 註腳數 dev 16/16、ai-user 10/10、general 0/0；S 編號集合三對皆相同）
- Limitation / uncertainty wording preserved across languages: **Yes**（no reproducible builds、PCC-request scope、claims vs verifiable、threat-model boundaries 皆保留為對應 `[!BOUNDARY]`/`[!WARNING]`）
- Bilingual term map added or updated: **Yes**（`docs/BILINGUAL_TERMS.md`）

### Checks run

- [x] `npm --prefix build run qa` → 三項綠（含 `content/drafts/en/`；S 編號皆可追溯）。
- [x] `node build/build.mjs` → **6 份 PDF**：繁中 31／16／13、英文 38／19／14，皆在 28–40／14–22／12–18；註腳 16／10／0（繁＝英）。
- [x] `node build/build-html.mjs` → `site/` + `site/en/` 重建；callout 類型繁／英一致（dev 6B/1M/2N/2S/3W、power 1B/1M/3N/2S、general 1B/1N/1S）。
- [x] 語言切換連結正確：繁 `developer.html`→`en/developer.html`、英→`../developer.html`、index 互指 `en/`↔`../`。
- [x] 英文頁 `lang="en"`、`hreflang` 互指、CSS `../site.css`、圖片 `../assets/` 皆正確。
- [x] PDF 視覺抽查（`pdftoppm`）：英文開發者版 §0「The short version」callout（label＋source pill＋淡底框）渲染正確；footer 顯示「Developer Edition (English) · 2 / 38」。
- [x] 未引入外部 analytics／CDN／GPL 相依；未新增 npm 依賴；未改 Firebase project ID；未 deploy；未建 tag。
- [x] 外部設計參考 URL 僅在未受掃描的 `README.md`／`DESIGN.md`／`docs/`／`design/*.md`。

### 仍需人工檢查

- **圖表雙語（已完成於 follow-up）**：D-series 技術圖與 M／G-series 插圖已產出英文版（`assets/{diagrams,illustrations}/en/`，由 `build/i18n-svg.mjs` 從繁中圖＋對照表生成；只換文字、不改幾何，無殘留中文、XML 皆 well-formed）；英文 drafts 已指向 `en/` 圖。視覺抽查（D5/D7/D8/D3）英文標籤皆容於框內、無溢出。
- 六份 PDF 完整逐頁視覺（callout 對比、分頁孤行）建議人工翻一次；本輪已抽查代表頁。
- 語言切換、mobile TOC 收合、查核模式的實機互動需人工於瀏覽器確認。
- 英文語氣／用詞建議母語者複讀；翻譯雖逐句對齊，仍為人工主觀項。

**結果**：Stage 1＋2＋3（雙語）通過。`content/knowledge-base.md` 與 `sources/*` `git diff v1.0.0` 仍為空；`content/drafts/*`（繁＋新增英文）為授權的可讀性／翻譯工作（無 claim 增減、`[S0X]` 跨語言全保留）；自動 QA 綠；6 份 PDF 與雙語 Web 重建成功且頁數在區間。唯一已知限制：圖內文字仍為繁中（見上）。

---

## Reading/Audit Mode Visibility + Global Debug（2026-06-29）

> Follow-up pass：把 Web 端「閱讀模式／查核模式」做成肉眼可辨的差異，並全域 debug。模型由 `body.checkmode` 單狀態改為 **`<html data-reader-mode="reading|audit">`** 兩狀態。改動：`design/site.css`（mode selectors）、`build/build-html.mjs`（toggle markup＋JS＋早期 localStorage script＋`data-reader-mode` 預設）、新增 `build/debug-web.mjs`＋`build/package.json` 加 `debug:web` script、`DESIGN.md` §19、`design/component-contract.md` §7、`design/readability.md`、本檔、CHANGELOG。**未動** `content/`、`sources/`、`base.css`、`md2html.mjs`、`dist/*.pdf`（PDF 不受影響）。

### Reading/Audit Mode Debug

- Mode toggle present: **Yes**（每篇 reader page 的 `.reader-tools` 內 `.reader-mode-toggle`＋`.reader-mode-hint`）
- DOM mode state changes: **Yes**（切換 `<html data-reader-mode>` reading↔audit；非 `body` 多 class 衝突）
- localStorage persistence: **Yes**（`pcc-reader-mode`；head 早期 script 在 paint 前套用，避免閃爍；重新整理／跨頁保留）
- Source refs visibly change: **Yes**（reading opacity ~.55 細框 → audit opacity 1 粗框＋accent 底＋ring）
- Boundary callouts visibly change: **Yes**（`.callout-boundary/-misconception/-warning` 左框 6px＋語意色淡底＋外圈陰影浮出）
- Status/metadata visibly change: **Yes**（`.status-pill` 加粗＋ring；`.toc` accent 框＋底；`.doc-top` accent rail；`.foot` accent 上框）
- Mobile mode toggle checked: **Yes**（mode selectors 不在 media query 內，mobile 同樣生效；`.reader-tools` flex-wrap）
- English pages checked: **Yes**（`site/en/*` 同樣有 toggle/hint/JS；按鈕文字與 hint 走英文 UI 字串）
- PDF excludes Web-only toggle: **Yes**（PDF 由 `md2html.mjs` 產出，`<html lang>` 無 `data-reader-mode`、無 toggle 按鈕；用 base 樣式）

> 視覺證據：Playwright 載入 `site/developer.html` 切換兩模式截圖——reading（TOC 中性灰、source pill 淡）vs audit（TOC accent 框＋底、標題卡 accent rail、誤解 callout 粗 rose 框＋淡底＋陰影、source pill 粗框）。差異一眼可辨，符合「3+ 類元素變化」與「1 秒可辨識」。

### Global Debug

- **Pages checked**：`build/debug-web.mjs` 掃 12 頁（繁中 6＋英文 6）。article 頁 source refs：dev 178／ai-user 68／general 0（×2 語言）；callouts dev 14／ai-user 7／general 3。
- **CSS cascade issues found**：無。mode selectors 用 `html[data-reader-mode="…"]`（specificity 足夠覆蓋 `.fnref a` 等），未用 `!important`；mode 規則不在 `@media print`／`@media(max-width)` 內，故 mobile 與螢幕皆生效；`html.lowfx[data-reader-mode="audit"]` 另剝除昂貴陰影但保留差異。
- **Generated HTML checked**：12 頁皆含 `<html data-reader-mode="reading">`、早期 localStorage script、CSS 載入（繁 `site.css`／英 `../site.css`）；article 頁皆含 toggle/hint/JS。
- **Language switcher findings**：12 頁皆含 `.language-switcher`，連對應頁（繁→`en/<page>`、英→`../<page>`、index 互指）。
- **Footer metadata findings**：12 頁頁尾皆含 最後更新／Last updated＋commit 連結＋版本 tag 連結＋language。
- **PDF findings**：6 份 PDF 無 toggle、無 `data-reader-mode`；封面／標題階層／source pill／callout／表格／圖卡／頁尾與 Web 設計語言一致；繁／英版型一致（頁數 31/16/13、38/19/14，皆在區間）。
- **CSS mode selectors found**：9/9（reading、audit、audit×{`.fnref`,`.callout-boundary`,`.callout-misconception`,`.callout-warning`,`.status-pill`,`.toc`}、`.language-switcher`）。
- **Remaining issues**：無重大項。`?debug=1` debug banner **已實作**（預設關閉、僅該 query 顯示、無外部請求；顯示 mode/lang/sourceRefs/callouts/version/commit）。英文圖表 **已補齊**（見下節）。

### Content / Claim safety（本 follow-up）

- Modified sources/source-index.md: **No** · sources/source-map.md: **No** · content/knowledge-base.md: **No**
- New technical claims added: **No**（純 UI／CSS／template／debug）
- English-only claims added: **No**（本輪未動 drafts 內容）
- Limitations removed or weakened: **No**（reading 模式只降來源**視覺權重**，不隱藏；audit 模式強化邊界／限制可見度）
- `git diff v1.0.0 -- sources content/knowledge-base.md`：空。

**結果**：通過。閱讀／查核模式差異明顯（source refs／boundary callouts／status·TOC·metadata 三類以上變化、localStorage 持久、繁英＋mobile 皆生效、PDF 無 toggle）；`build/debug-web.mjs` 綠、`qa` 綠；無 CSS cascade 問題、未用 `!important`、未新增依賴／analytics／CDN。

### 英文圖表 + debug banner（follow-up，使用者要求）

- **英文圖表**：新增 `assets/diagrams/en/D1–D8.svg`＋`assets/illustrations/en/{G*,M*}.svg`（18 檔），由 **`build/i18n-svg.mjs`**（`npm --prefix build run i18n:svg`）從繁中圖＋118 條文字對照表生成：只換 `<text>` 內容與字型（Latin sans），不改幾何／顏色，故不新增 claim。檢查：無殘留 Han 漢字、18 檔皆 well-formed XML；`build/i18n-svg.mjs` 對未對照中文會 exit 1。長 caption（D7 146 字）以 per-file 字級縮放避免溢出；視覺抽查 D5/D7/D8/D3 英文標籤皆容於框內。英文 drafts 已指向 `en/` 圖；英文 PDF/Web 圖表為英文（繁中版不變）。
- **debug banner**：`?debug=1` 顯示 `mode / lang / sourceRefs / callouts / version / commit`；**預設關閉**、僅該 query 顯示、**無外部請求／analytics**。
- **安全**：未動 `content/knowledge-base.md`、`sources/*`（`git diff v1.0.0` 仍空）；英文圖文字為繁中圖的對齊翻譯，無新 claim、無弱化限制語；未新增 npm 依賴。
- **新增 build scripts**：`i18n:svg`（產英文圖）、`debug:web`（Web 全域 debug）。
