# Task 06 — 設計與渲染（md → html → pdf）

## 目標
實作設計系統與單一渲染管線,在 `dist/` 產出三份 PDF：
`PCC-開發者版.pdf`、`PCC-AI使用者版.pdf`、`PCC-普羅大眾版.pdf`。

## 輸入
- `content/drafts/*.md`（三份草稿）
- `sources/source-index.md`（§2，註腳內容來源）
- `design/`（`base.css`、`theme-*.css`、`diagrams.md`）、`assets/`
- `build/`（`build.mjs`、`md2html.mjs`、`render.config.json`、`smoke/cjk-test.html`）
- `docs/PLAN.md` §6（設計系統）、§7（管線）

## 不變式（AGENTS.md）
- #8 受眾差異**只走 CSS**,不分叉 build 邏輯。
- #9 管線單一。
- §6.4 CJK 要求:中文不得變豆腐字。

## 步驟
1. 實作 `base.css` + 三套 `theme-*.css`,依 §6.2（色彩/字型/密度/元件）。
2. 產出圖：`assets/diagrams/` 的 D1–D8 與 `assets/illustrations/` 的 M1–M3（SVG）。
   - 至少先接好 include；最終美術可後續迭代。提供三主題配色變體。
3. 實作 `md2html.mjs`：
   - markdown → 語意 HTML
   - `[S0X]` → 頁尾編號註腳,內容取自 `source-index.md`（§2）
   - 大眾版的文末「依據」頁照常渲染（該版正文無內嵌 `[S0X]`）
   - 處理圖片 include 與圖說
4. 實作 `build.mjs`（Playwright）：
   - `page.pdf({ format:'A4', printBackground:true, displayHeaderFooter:true, margin: render.config[audience].margin, headerTemplate/footerTemplate: 標題+頁碼 })`
   - 套用 `break-before/break-inside`,避免圖與圖說跨頁切斷
5. **CJK 字型**：
   - macOS（Apple silicon）：可直接用系統內建 **PingFang TC**；
   - Linux/CI：安裝 **Noto Sans CJK TC / Noto Serif CJK TC**。
   - CSS `font-family` 以 CJK 字型為首,英文/數字 fallback Inter/IBM Plex。
   - 先渲染 `smoke/cjk-test.html`,確認中英混排、標點、註腳上標、分頁皆正常。
6. 渲染三份草稿 → `dist/`。
7. 抽查:頁數對照 §5 目標；三主題視覺明顯不同。

## 完成定義（逐項勾選）
- [ ] `dist/` 三份 PDF 產出。
- [ ] CJK 冒煙測試通過,正式 PDF 中文無豆腐字、字型已嵌入。
- [ ] `[S0X]` 註腳正確,且連回 §2 來源；大眾版「依據」頁正確。
- [ ] 三主題視覺明確區隔。
- [ ] 分頁乾淨（無切斷的圖/圖說）；頁數落在 §5 目標區間。

## 禁止
- 不得為個別受眾分叉 build 邏輯（差異一律走 CSS）。
- 不得在排版階段更動 KB 事實或草稿事實內容。
