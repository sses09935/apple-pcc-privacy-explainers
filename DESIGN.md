# PCC Privacy Explainers Design System

> 視覺單一規格來源（visual single source of truth）。
> 本檔**只定義呈現規則**：PDF、Web、diagram、來源標示、受眾密度的設計原則。
> **不取代** CSS（實作仍在 `design/*`），**不取代** KB（技術事實仍在 `content/knowledge-base.md`）。
>
> 權威邊界（呼應 `AGENTS.md`）：
> - 技術事實 → `content/knowledge-base.md`
> - 來源權威 → `sources/source-index.md`、`sources/source-map.md`
> - 視覺與呈現 → 本檔 + `design/*` + `assets/*`
>
> 本檔**不得新增任何 PCC 技術宣稱**。若某視覺規則需要引用事實，請指回 KB，不要在此複述或加強。

---

## 0. Project identity, goals, and document map

> `DESIGN.md` 是 PCC PDF/Web 設計系統的**唯一入口**（single entry point），給人類與 AI agent 共讀。
> 本節先交代「這是什麼專案、設計目標、以及到哪裡找什麼」，細節在後續各節。

### Project identity

- **系列**：Apple AI Explainers Series——一組**獨立、受眾化、來源導向**的繁體中文解說，說明 Apple 在 AI 上的隱私工程。
- **本專題**：PCC（Private Cloud Compute）私有雲端運算。規劃中的姊妹專題（如 **AFM3**）會共用同一套設計語言，但**知識庫各自獨立**（見 §15、[`docs/KNOWLEDGE_GOVERNANCE.md`](docs/KNOWLEDGE_GOVERNANCE.md) §7）。
- **主題軸**：privacy（隱私）／ trust（信任）／ verification（驗證）／ boundary（邊界）。
- **雙語**：支援繁體中文與英文雙語輸出（PDF + Web）；繁中為 source-of-record，英文為 source-aligned translation（見 §18、[`docs/I18N.md`](docs/I18N.md)）。
- **非官方**：本系列**非 Apple 官方出版品**，與 Apple Inc. 無隸屬關係，**不複製 Apple 官方視覺識別**。

### Design goals

1. **PDF / Web 統一**：同一套設計語言、同一批事實，貫穿三份 PDF 與網站。
2. **Bilingual publishing**：繁中 + 英文雙語輸出，同一套元件與設計語言；英文為 source-aligned translation（見 §18）。
3. **長文可讀**：服務長篇技術解說的閱讀體驗（導覽、密度、留白、來源可見）；規則見 [`design/readability.md`](design/readability.md)。
4. **source-bounded**：呈現不得越過來源邊界；視覺不得把宣稱講得比來源更強。
5. **可查核**：來源標示是內容的一部分；claim → source 永遠可追溯（見 [`docs/KNOWLEDGE_GOVERNANCE.md`](docs/KNOWLEDGE_GOVERNANCE.md)）。
6. **可由 AI agent 安全維護**：本檔＋component contract＋knowledge governance 讓 agent 能在不動事實的前提下安全改呈現。
7. **可與 AFM3 對齊**：預留共用元件命名與 component contract，與規劃中的姊妹 repo 對齊；但知識庫各自獨立。
8. **不仿 Apple**：不模仿 Apple 官方頁面或視覺識別。
9. **不行銷化、不誇大官方文件**：克制、教育白皮書調性，不做 hype deck 或無條件保證宣傳品；不把官方沒說的說滿。

### Document map（到哪裡找什麼）

| 你要找 | 看這裡 |
|---|---|
| 專案定位／設計目標 | 本節（§0）、§1 Purpose、§2 Visual Positioning |
| 設計原則 | §3 Design Principles |
| **正文可讀性規則** | [`design/readability.md`](design/readability.md) |
| **設計與知識庫參考**（六個來源） | **§13** + [`docs/DESIGN_REFERENCES.md`](docs/DESIGN_REFERENCES.md) |
| Design tokens（色彩／字級／間距） | §4 Design Tokens |
| Typography | §5 Typography |
| **PDF rules**（封面／標題／間距／來源／callout／表格／圖／頁尾） | §5–§6、§10、§4.1–§4.2 |
| **Web rules**（首頁路由／頂部摘要／TOC／mobile／來源互動／reader 模式／頁尾） | §4.3、§6、§10、§14 |
| **Component contract** | §8（現況）＋ **§14**（規範契約）＋ [`design/component-contract.md`](design/component-contract.md) |
| 圖表規則 | §9 + [`design/diagram-style.md`](design/diagram-style.md) |
| **Agent rules / AI agent design contract** | §12 + **§15** |
| **Bilingual design rules（雙語）** | **§18** + [`docs/I18N.md`](docs/I18N.md) + [`docs/BILINGUAL_TERMS.md`](docs/BILINGUAL_TERMS.md) |
| **Reading / Audit mode** | **§19** + [`design/component-contract.md`](design/component-contract.md) |
| 知識治理（哪些事實可改／不可改） | [`docs/KNOWLEDGE_GOVERNANCE.md`](docs/KNOWLEDGE_GOVERNANCE.md) |

---

## 1. Purpose

`DESIGN.md` 是 PCC Privacy Explainers 的視覺與呈現規格中心，服務三個目標：

- 讓 **AI agent 長期維護**時，對「該長什麼樣、不該長什麼樣」有單一可查依據。
- 讓 **人類 contributor** 在改 CSS／圖表／PDF／Web 前，先讀到一致的設計意圖與紅線。
- 讓 **同一批事實**在三種受眾版本之間，只調整呈現密度而不改變技術意義。

本檔涵蓋：design tokens、字體、版面密度、受眾模式、元件、圖表規則、來源與 claim 呈現、Do / Don't、Agent 規則。

本檔**不**涵蓋：PCC 的技術機制、任何新的安全性宣稱、任何來源的重新解讀。那些一律以 KB 與 source 檔為準。

## 2. Visual Positioning

PCC Privacy Explainers 是一個**可稽核的繁體中文 AI 隱私解說專案**。

視覺調性應接近：

- 安全研究簡報（security research briefing）
- 技術解說（technical explainer）
- 教育用白皮書（educational white paper）

整體應該是：**清楚、克制、來源可見、可讀**。

它**不應該**看起來像：

- Apple 官方網頁或官方視覺識別
- 行銷導向的 landing page
- AI 炒作簡報（hype deck）
- 賽博龐克／高光發光（glow-heavy）的科技海報
- 一個「無條件隱私保證」的宣傳品

> 視覺上若讓人覺得「這是 Apple 官方說法」或「這是被證明過的絕對保證」，即違反定位——本專案是**獨立、受眾化、來源導向**的解說。

## 3. Design Principles

1. **單一事實、多重框架**：三份文件共用同一 KB；視覺只負責「換密度、換語氣」，不換事實。
2. **來源永遠可見**：來源標示（`[S0X]`／文末「依據」頁）是內容的一部分，不得為了版面乾淨而隱藏。
3. **可追溯優先於美觀**：任何讓 claim → source 追蹤更難的視覺改動都不可接受。
4. **密度分受眾**：開發者高密度、使用者中密度、大眾低密度；但三者事實基礎相同。
5. **克制勝於華麗**：少用發光、漸層、動畫；對比與留白優先於裝飾。
6. **可讀性與無障礙是底線**：足夠對比、語意標籤、CJK 字型正確嵌入、圖片可加替代描述。
7. **不以視覺加強宣稱**：強調、配色、圖示都不得讓某個保證看起來比來源支持的更強。

## 4. Design Tokens

> 以下 tokens **整理自 repo 既有 CSS**，不是新發明的設計系統。
> 實作仍以 CSS 檔為準；本表是導航與審查用的彙整。
> PDF 與 Web 各有一套 token 來源：**PDF** 走 `design/base.css` + `design/theme-*.css`；**Web** 走 `design/site.css`（部署後鏡像為 `site/site.css`）。

### 4.1 共用基底（PDF，`design/base.css` 安全預設）

| Token | Source | Value | Purpose | Notes |
|---|---|---|---|---|
| `--fg` | `design/base.css` | `#1d1d1f` | 主要文字色 | theme 會覆寫 |
| `--bg` | `design/base.css` | `#ffffff` | 頁面背景 | theme 會覆寫 |
| `--muted` | `design/base.css` | `#6e6e73` | 次要／圖說文字 | |
| `--accent` | `design/base.css` | `#0066cc` | 強調色（標題底線、連結） | 受眾各自覆寫 |
| `--accent-soft` | `design/base.css` | `#e8f0fe` | callout／表頭底 | |
| `--rule` | `design/base.css` | `#d2d2d7` | 分隔線、表格框線 | |
| `--card-bg` | `design/base.css` | `#f5f5f7` | 卡片／表頭背景 | |
| `--code-bg` / `--code-fg` | `design/base.css` | `#eef0f2` / `#1d1d1f` | 行內 code 底／字 | |
| `--pre-bg` / `--pre-fg` | `design/base.css` | `#f5f5f7` / `#1d1d1f` | 程式碼框底／字 | dev theme 改深色 |
| `--font-body` | `design/base.css` | PingFang TC → Hiragino → Heiti → … | 內文字型（CJK 優先） | |
| `--font-mono` | `design/base.css` | SF Mono → JetBrains Mono → … | 等寬字型 | |
| `--fs-body` | `design/base.css` | `10.5pt` | 內文字級（安全預設） | theme 覆寫 |
| `--lh-body` | `design/base.css` | `1.62` | 行高 | theme 覆寫 |
| `--h1/2/3-size` | `design/base.css` | `22 / 15 / 12pt` | 標題階層字級 | theme 覆寫 |

### 4.2 受眾主題覆寫（PDF，`design/theme-*.css`）

| Token | Developer | Power User | General | 來源檔 |
|---|---|---|---|---|
| `--accent`（主強調） | `#0a5ad6`（冷藍） | `#5a3ec8`（紫） | `#e8743b`（暖橘） | `theme-*.css` |
| `--accent-2`（次強調） | —（單色） | `#00a39a`（青綠） | `#f2b705`（暖黃） | `theme-power-user.css` / `theme-general.css` |
| `--accent-soft` | `#eaf1fd` | `#efe9fc` | `#fdeee5` | `theme-*.css` |
| `--bg` | `#ffffff` | `#ffffff` | `#fffdfa`（暖白） | `theme-*.css` |
| `--pre-bg` | `#0f1419`（深色碼框） | 繼承淺色 | 繼承淺色 | `theme-developer.css` |
| `--fs-body` | `11.5pt` | `12pt` | `13pt`（大字） | `theme-*.css` |
| `--lh-body` | `1.8` | `1.85` | `1.85` | `theme-*.css` |
| `--h1/2/3-size` | `23 / 16 / 12.5pt` | `23 / 15.5 / 12.5pt` | `28 / 20 / 15pt` | `theme-*.css` |
| 分頁節奏 | 每個 `h2` 另起一頁 | 每個 `h2` 另起一頁 | 每個 `h2` 另起一頁、留白多 | `theme-*.css` |

### 4.3 Web 主題（`design/site.css`，body class 切換）

| Token | dev (`body.dev`) | power (`body.power`) | general (`body.general`) | Notes |
|---|---|---|---|---|
| `--accent` | `#1d4ed8` | `#6d28d9` | `#ea6a2c` | Web 與 PDF 強調色為**相近但不同**的值 |
| `--accent-2` | `#3b82f6` | `#8b5cf6` | `#f59e0b` | |
| `--accent-soft` | `#eef3ff` | `#f2ecfe` | `#fdf0e6` | |
| `--accent-ink` | `#0b2e7a` | `#3b0f73` | `#8a3b12` | 深色標題用 |

> 設計意圖：PDF 與 Web 共用「冷藍＝開發者、紫＝使用者、暖橘＝大眾」的**色相對應**，但因媒材（紙本印刷 vs 螢幕）對比需求不同而採不同色值。修改任一端時，**維持色相對應關係**，不要讓某一受眾在兩端變成不同識別色。
> 若需新增 token：先確認 CSS 是否已有可重用變數，避免重複定義；不確定的值標 `TODO: verify`，不要臆測。

### 4.4 Callout / status / spacing tokens（本 pass 新增）

> 為 callout 家族與 status-pill 提供**語意化、克制**的色彩。皆以既有 `--accent`/`--rule`/`--muted` 為基底或低彩度，避免賽博龐克發光；boundary/warning/misconception 不得做成刺眼警報色。
> 定義於 `design/base.css`（PDF）與 `design/site.css`（Web）。

| Token | 用途 | 取向 |
|---|---|---|
| `--callout-note-*`（bg/border） | 一般補充 callout | 沿用 `--accent-soft` / `--accent` |
| `--callout-boundary-*` | 查核邊界（可確定 vs 不能推論） | 中性 slate/ink（嚴肅、非警報） |
| `--callout-warning-*` | 準確性紅線提醒 | 克制 amber |
| `--callout-misconception-*` | 常見誤解澄清 | 低彩度 rose |
| `--callout-summary-*` | 先講結論／takeaway | 跟隨受眾 `--accent`（章首/章末呼應主色） |
| `--status-claim` | 「Apple 宣稱」標籤 | 中性 slate |
| `--status-verifiable` | 「可獨立驗證」標籤 | 沉穩 teal（不可暗示「絕對安全」） |
| `.language-switcher`（樣式，非新 token） | 語言切換鈕（Web nav） | 沿用 `--accent`/`--rule`/`--accent-soft`，膠囊外框；不新增 token |

**Spacing scale（彙整自既有 CSS，PDF/Web 共用節奏）**：段距 `~.7em`、清單項距 `~.3em`、區塊（callout/figure/table）上下 `~1–1.2em`、章節 `h2` 上 `~1.7em`。PDF 走 A4 分頁（每章另起頁）；Web 走連續捲動＋章節留白。新增間距前先確認既有值，不要新造一套尺標。

## 5. Typography

- **內文以 CJK 字型為首**：PingFang TC → Hiragino → Heiti → Noto Sans/Serif CJK TC（CI/Linux），英數 fallback 到 Inter / system。
- **技術術語首次出現附英文**（呼應 `AGENTS.md` #7 與 `docs/GLOSSARY.md`）：`繁中（English）`。
- **等寬字型**只用於 code、daemon 名、暫存器名、指令；不要把等寬當裝飾字體。
- **字級隨受眾放大**：開發者 11.5pt → 使用者 12pt → 大眾 13pt；標題階層同步放大。
- **行高偏鬆**（1.62–1.85）以利中英混排與長句閱讀。
- **PDF 字型嵌入**：渲染須 `printBackground: true`，確認 CJK 不變豆腐字（先過 `build/smoke/cjk-test.html`）。

## 6. Layout and Density

| 面向 | Developer | Power User | General |
|---|---|---|---|
| 密度 | 高；可用密表、密圖 | 中；留白多、卡片化 | 低；大量留白、大圖 |
| 主要元件 | 流程圖、表格、註腳、（必要）虛擬碼框 | 對照表、清單卡、pull-quote、解讀框 | 跨頁插圖、大標、FAQ 卡 |
| 章節分頁 | 每章另起頁 | 每章另起頁 | 每章另起頁、頁首留白大 |
| 來源呈現 | 內文 `[S0X]` 註腳式 | 內文 `[S0X]` 註腳式 | 文末「依據」頁集中列出 |

- 版面：A4，統一標題階層、圖說、表格樣式。
- 表格長表跨頁：重複表頭、列不被切斷（`break-inside: avoid`）。
- 圖與圖說避免跨頁切斷。

## 7. Audience Modes

> 三種模式**只調整呈現密度與語氣，不改變技術意義**（`AGENTS.md` #8）。

### Developer

- 最高資訊密度。
- 適用：威脅模型、attestation、VRE、請求生命週期、透明性日誌、部署限制。
- 可用技術表格、密集圖表、精確術語；可出現 RFC 編號、暫存器名、daemon 名。
- 全程區分「**Apple 宣稱**」與「**可獨立驗證**」。
- **不得**讓宣稱超過 KB 或 source-map 支持的範圍。

### Power User

- 中等資訊密度。
- 適用：風險解讀、隱私預期、資料流解釋、實用閱讀指引。
- 可用檢查清單與「解讀框」（highlighted interpretation box）。
- 解釋技術名詞時**不得改變其意義**；類比不得誇大。

### General Public

- 最低資訊密度。
- 適用：比喻式說明、短段落、簡化圖。
- 可用類比；正文**不出現技術名詞**（依 GLOSSARY「G 政策」）。
- 類比**不得創造新的技術事實**；有過度宣稱風險時加註或捨棄該類比。

## 8. Components

> 以下為目前 CSS 實際提供的元件。多數以語意化 HTML + theme 變數實現，少數尚無專屬 class（已標註）。

| 元件 | 實作 | 用途 | 可出現於 | 不得做什麼 |
|---|---|---|---|---|
| **Source reference label** | `.fnref` 上標 + `.endnotes`（base/site.css）；**現以 monospace 膠囊徽章呈現**（PDF）／**可點擊 source pill**（Web，含 hover/focus），來源附錄編號以 `<strong>` monospace 強調 | 標示 `[S0X]` 與文末來源 | 三版皆有（大眾集中於「依據」頁） | 不得移除、不得縮到不可讀 |
| **Callout / note block** | `blockquote`（accent-soft 底 + 左邊框）；受眾差異：開發者較方、使用者圓角卡片＋淡陰影、大眾大圓角柔和 | 重點、解讀、提示 | 三版皆可 | 不得用來放未引用的新事實 |
| **Warning / accuracy boundary block** | 目前以 `blockquote` 表達（**無專屬 class**） | 標示準確性紅線、信任邊界提醒 | 開發者／使用者優先 | 不得淡化紅線；若新增專屬樣式，先更新本檔 |
| **Table** | `table`（+ `.tablewrap` on Web）；受眾差異：開發者 accent 表頭明確、使用者放寬、大眾降壓 | 對照、規格、清單 | 三版皆可（大眾從簡） | 不得用表格擠入超過來源支持的細節 |
| **Code block** | `pre` / `code`（dev 用深色框） | 指令、daemon 名、虛擬碼 | 開發者為主、使用者少量、大眾不用 | 不得在大眾版正文出現 |
| **Diagram figure** | `figure` + `figcaption`；**現以「圖卡框」呈現**（淡 accent 底 + 邊框 + 圓角 + 圖說細上分隔線；大眾為更大圓角暖色閱讀卡） | D-series / M-series / G-series 圖 | 依圖種類見 `design/diagram-style.md` | 圖與圖說不得新增技術 claim |
| **Cover / title section** | `.cover` / `.doc-top`（Web）；**PDF 標題上方加受眾色 accent rule**；Web hero 為框式＋淡 radial accent tint | 封面、標題頁 | 三版皆有 | 不得模仿 Apple 官方封面風格 |
| **Section opener（章節標頭）** | PDF `h2`：開發者左側冷藍 bar、使用者柔和圓角色帶、大眾暖色螢光筆底線（`::after`）；Web `h2` 既有 accent 底線 | 章節起始的受眾識別 | 三版（各自樣式） | 不得改變章節結構或新增含義 |
| **Audience-specific emphasis block** | `blockquote` + theme accent（**無專屬 class**） | 使用者版「解讀框」、大眾版重點句 | 使用者／大眾 | 強調不得加強宣稱強度 |

> 若要新增元件 class，請：① 先在本節登記用途與限制；② 確認與既有 token 一致；③ 確認不會破壞來源可見性。
>
> **實作現況（v1.1.0，2026-06-28）**：上述「現以…呈現」之視覺處理已實際套用到 PDF 與 Web，皆**沿用既有 design tokens**（`--accent`/`--accent-soft`/`--rule`/`--font-mono` + `color-mix`），**未新增 token、未新增技術事實**。視覺證據見 `artifacts/screenshots/`。

## 9. Diagram Rules

圖表系統的完整規格在 **[`design/diagram-style.md`](design/diagram-style.md)**；本節只列摘要：

- 圖分兩大家族：**D-series**（技術圖，`assets/diagrams/`）與**插圖家族**（`assets/illustrations/`，含 **M-series** 三比喻與 **G-series** 大眾敘事插圖）。
- 每張圖都必須能回溯到 KB claim 或 source-map（對照表在 `design/diagrams.md`）。
- 圖表**不得新增**技術 claim、不得把未驗證的信任關係畫成已驗證事實。
- 受眾 theme 可調整圖的**色彩與密度**，但不得改變圖的**事實結構**。
- 比喻圖（M／G）可以簡化，但不得重新定義 PCC，也不得加入新的技術性質。

## 10. Source and Claim Presentation

- **開發者／使用者版**：事實句後緊接 `[S0X]` 註腳式引用，渲染為文末來源清單並可回跳。
- **大眾版**：正文不內嵌 `[S0X]`（保版面乾淨），改在文末「依據」頁逐章列來源；**provenance 仍須完整**且與 `source-map.md` 一致。
- 來源標示是**內容**，不是裝飾：縮小、淡化、移到難以察覺處都違反設計原則。
- 「Apple 宣稱」「官方文件」「可獨立驗證的性質」三者在呈現上應可區分（用詞、callout、或註記），不可混為一談。
- 任何 claim 的呈現強度，以 `content/knowledge-base.md` 與 `sources/source-map.md` 為上限。

## 11. Do / Don't

### Do

- 維持接近安全簡報與教育白皮書的調性。
- 讓來源標示清楚可讀。
- 讓 claim 可追溯**更容易**，而非更難。
- 允許不同受眾用不同密度。
- 在所有受眾版本間維持**相同的事實基礎**。
- 區分 Apple 宣稱、官方文件、可獨立驗證的性質。

### Don't

- 不要模仿 Apple 官方視覺識別。
- 不要使用過度發光、賽博龐克或 AI 炒作美學。
- 不要用視覺暗示 PCC 是「通用隱私保證」。
- 不要把 Apple 宣稱呈現成已被獨立驗證的事實。
- 不要讓比喻圖引入新的技術含義。
- 不要為了視覺乾淨而隱藏來源標示。

## 12. Agent Rules

- 任何 CSS、diagram、Web UI、PDF layout 或視覺系統的改動，**必須遵循本檔**。
- 本檔可定義呈現規則、design tokens、受眾密度、視覺限制；**不得**定義 PCC 技術事實。
- 技術事實仍屬 `content/knowledge-base.md`；來源權威仍屬 `sources/source-index.md` 與 `sources/source-map.md`。
- 若本檔與 KB／source 檔衝突，**以 KB 與 source 檔為準**，並回報衝突而非自行決定。
- 不確定的 token 值、色彩、對應關係 → 標 `TODO: verify`，不要臆測。
- 改視覺前後，對照 [`tasks/08-design-system-audit.md`](tasks/08-design-system-audit.md) 自查。

## 13. Design and knowledge references

> 本 repo 使用**自己的**視覺與文件系統，**未複製 Apple 官方視覺**，**未直接搬移**任何第三方設計系統或 OpenKnowledge 的 UI 程式碼，**未 import GPL-covered 程式碼**。
> 以下來源僅作為**資訊架構、閱讀體驗、知識治理與 agent workflow** 的參考。完整角色說明見 [`docs/DESIGN_REFERENCES.md`](docs/DESIGN_REFERENCES.md)。
> **注意**：這些是**設計／文件系統參考**，與本 repo 的**內容來源**（只引用 Apple 官方來源）是兩件不同的事，**請勿混用**。

| 參考 | 用途 | 本 repo 用法 | 限制 |
|---|---|---|---|
| **google-labs-code/design.md** | 把 `DESIGN.md` 作為 human-readable 與 AI-readable 的設計系統 source of truth；讓 AI agent 改 CSS／template／PDF/Web UI 前有明確規格 | 讓本檔包含設計目標、tokens、component contract、PDF/Web rules、agent instructions | **不照抄範例視覺**；不宣稱與 Google 合作或背書；只採用「`DESIGN.md` as source of truth」的規格思想 |
| **OpenKnowledge / OKB** | agent-native knowledge base、LLM wiki、Markdown-first knowledge structure、source / status navigation、claim traceability | 借鑑知識庫治理、agent-friendly documentation、source / status navigation、claim traceability（見 [`docs/KNOWLEDGE_GOVERNANCE.md`](docs/KNOWLEDGE_GOVERNANCE.md)） | **不可複製 OpenKnowledge 程式碼、UI 實作或 GPL-covered implementation**、不移植 OKB UI；只參考資訊架構與 workflow 概念 |
| **Material for MkDocs** | Markdown-first 文件閱讀、長文、TOC / navigation、admonition / callout、搜尋與 discoverability | 借鑑文件站資訊架構 | 不遷移到 MkDocs、不複製 theme code（本 repo 自有 `md → html → pdf` 管線） |
| **GOV.UK Design System** | plain language、短段落、低干擾公共資訊設計、task-oriented content、accessibility-conscious writing | 借鑑正文可讀性與資訊分層 | 不仿 GOV.UK 品牌外觀 |
| **GitHub Primer** | neutral open-source UI、badge / label / alert、metadata、status and reference UI patterns | 借鑑 source pill、status badge、callout、footer metadata 的開源 UI 語言 | 不複製 Primer component code |
| **U.S. Web Design System（USWDS）** | accessibility、mobile-friendly public information design、typography discipline、government-grade readability | 可及性、手機閱讀、公共資訊可信度的輔助參考 | 不仿 USWDS 視覺品牌 |

> 角色不同，勿混用：google-labs-code/design.md 影響的是**把本檔當單一 source of truth 的規格思想**；OpenKnowledge / OKB 影響的是**知識治理與 agent workflow**；MkDocs / GOV.UK / Primer / USWDS 影響的是**閱讀體驗與 UI 語言**。
> 這些來源僅作為設計靈感、資訊架構、知識治理與 agent workflow 參考，**不是背書，也不是程式碼來源**。正文可讀性規則見 [`design/readability.md`](design/readability.md)。

## 14. Component contract

> 元件層的**規範命名與行為契約**。本節是摘要；完整契約（含每個元件的實作狀態、別名、限制）在 [`design/component-contract.md`](design/component-contract.md)。
> §8「Components」描述**目前 CSS 的真實現況**；本節描述**規範名稱**（部分尚未落地、保留為 Proposed，以利與 AFM3 的命名相容）。兩者不衝突：§8 是現在，§14 是契約。

規範元件名稱（canonical names）：

- `.source-ref`——來源引用標記（現以 `.fnref` 實作）。
- `.status-pill`——狀態／屬性標籤（Apple 宣稱 vs 可獨立驗證、版本／凍結狀態；Proposed）。
- `.callout`——一般提示／解讀框（現以 `blockquote` 實作）。
- `.callout-boundary`——準確性紅線／信任邊界提醒（Proposed）。
- `.callout-misconception`——常見誤解／「別這樣讀」對照（Proposed）。
- `.reader-route-card`——首頁受眾路由卡（現以 `.card` 實作）。
- `.reader-tools`——閱讀工具列（Proposed）。
- `.reader-mode-toggle`——閱讀／查核模式切換（Proposed）。
- `.toc`——章節目錄（已實作）。
- `.toc-group`——目錄分組（現以 `.toc-h` 部分承載；Proposed 容器）。
- `.table-wrap`——表格溢出包裹（現以 `.tablewrap` 實作）。
- `.diagram-figure`——圖卡框（現以 `figure` 實作）。
- `.section-summary`——章節頂部摘要框（Proposed；摘要只能改寫既有正文）。
- `.takeaway-list`——重點整理清單（Proposed；不得加強宣稱強度）。

規則：

- 所有元件受 §10（Source and Claim Presentation）與 §11（Do / Don't）約束；不得用任何元件放進未引用的新事實或加強宣稱。
- **新增 component → 先更新 [`design/component-contract.md`](design/component-contract.md)**，再寫 CSS／template。
- 把 Proposed 落地，或把別名（`.fnref`/`.tablewrap`/`.card`/`figure`）改名為規範名稱時，須一次更新 CSS、`build/md2html.mjs`、`build/build-html.mjs` 與契約檔，並於 `qa-report.md` 記錄。

## 15. AI agent design contract

> 本節是 design.md-inspired 的 **lint mindset**：AI agent 在改 PDF/Web UI 前的必讀規則。呼應 §12 Agent Rules，但聚焦「修改流程」。

### 15.1 必讀與遵守

- `DESIGN.md` 是 AI agent 修改 PDF/Web UI **前必讀**的文件。
- agent 修改 **CSS / template / content readability** 時，**必須遵守** [`design/component-contract.md`](design/component-contract.md) 的元件契約。

### 15.2 改動前的前置更新（先更新規格，再動實作）

- 若**新增 component** → **必須先更新** [`design/component-contract.md`](design/component-contract.md)。
- 若**新增色彩 / spacing / typography token** → **必須先更新** `DESIGN.md` §4（Design Tokens）。
- 若**修改 source / status / callout 的呈現** → **必須更新** [`qa-report.md`](qa-report.md)。
- 若**改動雙語結構**（語言切換、檔案佈局、命名、URL 規則）→ **必須更新** [`docs/I18N.md`](docs/I18N.md)。
- 若改動會**影響 AFM3 對齊** → **必須在** [`CHANGELOG.md`](CHANGELOG.md) **或** [`qa-report.md`](qa-report.md) **註明**。

### 15.3 紅線（與 §12、`AGENTS.md`、知識治理一致）

- **Do not invent claims.** 不發明宣稱；不確定標 `TODO(verify)`。
- **Do not remove source boundaries.** 不移除來源標示、限定語或不確定性標籤。
- **Do not imitate Apple's official visual identity.** 不模仿 Apple 官方視覺識別。
- **Do not copy UI code from referenced projects.** 不複製被參考專案的 UI 程式碼。
- **Do not import GPL-covered code.** 不 import GPL-covered 程式碼（含 OpenKnowledge 實作）。
- **Keep PCC and AFM3 separate repos.** PCC 與 AFM3 維持分離 repo、知識庫各自獨立。
- **Keep shared component names compatible with AFM3 future alignment.** 共用元件命名維持與 AFM3 的相容性。
- **English pages must not introduce claims absent from the Traditional Chinese source text.** 英文版不得新增繁中原文沒有、或 source map 不支持的 claim（見 [`docs/I18N.md`](docs/I18N.md)）。

> 判斷「這是 readability 還是新 claim」的方法，見 [`docs/KNOWLEDGE_GOVERNANCE.md`](docs/KNOWLEDGE_GOVERNANCE.md) §5–§6。
> 若視覺改動無法在不動到事實／來源／狀態的情況下完成——停下來，回報，交人類決定。

## 16. PDF rules

> PDF 應像**正式文件產品**，不是 Markdown 直出。視覺方向：克制、可信、隱私與信任感、不華麗、不仿 Apple、不過度 glow/glass/hero marketing。實作在 `design/base.css` + `design/theme-*.css`，渲染走 `build/build.mjs`（Playwright 列印 A4）。

| 面向 | 規則 |
|---|---|
| **Cover（封面）** | 獨立標題頁：上方留白（`main > h1:first-child` ~9%）、頂端受眾色 accent rule（4px）；不模仿 Apple 官方封面。 |
| **Heading hierarchy** | `h1`（封面 30pt／內文 22pt 級）→ `h2`（章，accent 底線＋受眾標頭：dev 冷藍 bar／power 圓角色帶／general 螢光筆 `::after`，每章另起頁）→ `h3`（accent 色）→ `h4`。 |
| **Paragraph spacing** | 段距 `~.7em`、行高隨受眾 1.8–1.85、`orphans/widows: 2`；一段一概念，長段拆短（`readability.md` §2–§3）。 |
| **Source refs** | `[S0X]` → `.source-ref`（`.fnref`）monospace 膠囊徽章；文末「來源註腳」自 `source-index` 生成、編號 `<strong>` monospace。大眾版正文不內嵌、集中「依據」頁。 |
| **Callouts** | `.callout` 家族（note/boundary/warning/misconception/summary），`> [!TYPE]` 觸發；色彩走 §4.4 token，克制不刺眼；不得放未引用的新事實。 |
| **Tables** | 表頭 accent 底、長表重複表頭（`thead{display:table-header-group}`）、列不切斷（`break-inside:avoid`）；複雜表前加「怎麼讀這張表」導讀。 |
| **Diagrams** | `.diagram-figure`（`figure`）圖卡框，圖與圖說綁定不跨頁切斷；規則見 `design/diagram-style.md`，不得新增 claim。 |
| **Footer metadata** | 文末來源附錄＝可追溯 metadata；版本／commit／更新日／repo 在網站頁尾統一（PDF 以來源附錄與封面承載）。 |
| **Language metadata** | PDF `<html lang>` 隨語言（zh-Hant / en，由 `build/md2html.mjs` 的 `lang` 參數）；檔名以語言後綴區分（繁中沿用既有名、英文 `PCC-*-EN.pdf`）。 |

## 17. Web rules

> 提升長文閱讀體驗，同時保留可查核性。實作在 `design/site.css` + `build/build-html.mjs`，輸出 `site/`（部署到 Firebase 正規站 + GitHub Pages 鏡像）。

| 面向 | 規則 |
|---|---|
| **Homepage reader routes** | 首頁 `.reader-route-card`（現 `.card`）：每張含**用途一句**、**適合誰**、**預期閱讀時間／深度**、**Web/PDF 入口**；三受眾識別色一致（§4.3）。 |
| **Article top summary** | 每篇頂部導讀（`你會讀到什麼／先講結論／適合誰／不適合誰`）：先給主線，再給查核邊界；只摘既有內容。 |
| **TOC behavior** | `.toc`（`.toclist`）章節導覽；長文可考慮 `.toc-group` 分群（快速理解／隱私與雲端邊界／技術與驗證／常見誤解／查核與來源／附錄）；**mobile 收合、不佔滿首屏**（CSS 限高捲動）。 |
| **Mobile behavior** | 流體字級（`clamp()`）、卡片單欄、表格 `.table-wrap` 可橫向捲動；圖片 `loading=lazy`；裝置分級（lowfx/midfx/hifx）關閉重特效。 |
| **Source reference interaction** | `.source-ref` 預設克制、hover/focus 清楚、可點擊跳來源並可回跳；**不得隱藏到不可見**。 |
| **Reader / check mode** | `.reader-tools` + `.reader-mode-toggle`：閱讀模式（預設、低干擾）↔ 查核模式（高亮所有 `.source-ref`）。查核模式**只改呈現、不改事實**。 |
| **Language switcher** | `.language-switcher` 置於 nav 右側（CTA 前）；連到**對應頁面**的另一語言（`developer.html ↔ en/developer.html`），非只回首頁；清楚但不喧賓奪主。 |
| **Footer metadata** | 統一顯示 project name／version／commit／last updated／**language**／GitHub repo／license；格式預留與 AFM3 對齊。 |

## 18. Bilingual design rules

> 雙語發布的設計規則。治理細節（翻譯紀律、source-of-record）見 [`docs/I18N.md`](docs/I18N.md)；術語對照見 [`docs/BILINGUAL_TERMS.md`](docs/BILINGUAL_TERMS.md)。

| 面向 | 規則 |
|---|---|
| **語言切換位置** | Web：`.language-switcher` 在 nav 右側、CTA 之前；繁中頁顯示「English」、英文頁顯示「繁體中文」。 |
| **繁中／英文頁面對應** | 一對一對應：`developer.html ↔ en/developer.html`、`ai-user.html ↔ en/ai-user.html`、`general.html ↔ en/general.html`、`index/sources/versions` 同理。切換**連到對應頁**，不是回首頁。 |
| **source-aligned translation** | 繁中為 source-of-record；英文為對齊翻譯，**不得新增繁中沒有的 claim、不得弱化限定語**。每個 `[S0X]` 對齊（PDF 註腳數應相同）。 |
| **雙語 PDF 命名** | 繁中沿用既有名（`PCC-開發者版.pdf` 等）；英文 ASCII＋`-EN` 後綴（`PCC-Developer-EN.pdf`、`PCC-AI-User-EN.pdf`、`PCC-General-Public-EN.pdf`）。可清楚區分 audience／language。 |
| **雙語 Web URL** | 繁中在站根（`/developer.html`）；英文在 `/en/` 子目錄（`/en/developer.html`）。canonical 與 `hreflang` 互指。 |
| **術語表位置** | [`docs/BILINGUAL_TERMS.md`](docs/BILINGUAL_TERMS.md)（繁中／英文／使用規則）。 |
| **雙語 QA** | `qa-report.md` 的「Bilingual QA」區塊：英文頁存在、語言切換正確、英文 source-aligned、無 English-only claim、`[S0X]` 與限定語跨語言保留、術語表已更新。 |
| **內容模型** | 繁中 `content/drafts/*.md`、英文 `content/drafts/en/*.md`；同一 build pipeline（`build.mjs` 多 audience、`build-html.mjs` 多 locale），共用 CSS／元件。 |
| **雙語圖表** | 繁中圖 `assets/{diagrams,illustrations}/*.svg`；英文圖 `…/en/*.svg`，由 `build/i18n-svg.mjs` 從繁中圖＋對照表生成（只換文字／字型，不改幾何）。英文 drafts 引用 `en/` 圖。見 [`docs/I18N.md`](docs/I18N.md) §4b。 |

## 19. Reading mode and audit mode

Reading mode prioritizes continuous reading.
Audit mode prioritizes source and boundary verification.
Both modes must preserve source visibility.
Audit mode must make source references, boundary callouts, and limitation markers visibly stronger than reading mode.

### 實作（Web only）

- 狀態載於 **`<html data-reader-mode="reading|audit">`**；靜態預設 `reading`（無 JS 時即為閱讀模式）。
- 一段 head 早期 script 讀 `localStorage['pcc-reader-mode']`，若為 `audit` 則在 paint 前套用（避免閃爍）。
- `.reader-mode-toggle`（在 `.reader-tools` 內，每篇 reader page）切換 `data-reader-mode`、按鈕動作文字與 `.reader-mode-hint`，並寫回 `localStorage`（重新整理／跨頁保留）。繁中與英文頁、所有 reader pages、mobile 皆有效。
- CSS 選擇器一律用 `html[data-reader-mode="reading"]` / `html[data-reader-mode="audit"]`（避免 `body.checkmode` 單狀態與 `!important`）。

### 兩模式的視覺差異（至少三類元素明顯變化）

| 元素 | Reading | Audit |
|---|---|---|
| `.source-ref`（`.fnref`） | opacity ~.55、細框、低權重（**仍可見**） | opacity 1、粗框、accent 底＋外圈 ring（一眼可掃描） |
| `.callout-boundary` / `-misconception` / `-warning` | opacity ~.86，克制 | 左邊框加粗到 6px、語意色淡底、外圈＋陰影浮出 |
| `.status-pill` | opacity ~.8 | opacity 1、加粗、外圈 |
| `.toc` | 中性灰卡 | accent 左邊框＋accent-soft 底 |
| `.doc-top` / footer metadata | 一般 | 標題卡左側 accent rail；頁尾 accent 上框、文字加深 |

### 規則

- **PDF 不含 toggle**：PDF 由 `build/md2html.mjs` 產出，`<html lang>` 無 `data-reader-mode`，故 reading/audit selectors 不生效，PDF 用 base 樣式（source pill 可辨識但不喧賓奪主）。PDF 不得出現「Reading mode / Audit mode」按鈕。
- **兩模式都不得隱藏來源**：reading 只是降低視覺權重，不可 `display:none`。
- 變更 mode 呈現 → 更新 `qa-report.md`（見 `§15.2`）。可測性由 `build/debug-web.mjs` 驗證。
