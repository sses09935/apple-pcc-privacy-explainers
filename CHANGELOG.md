# Changelog

本專案的版本與變更紀錄。版本真實來源為 **git tag + [GitHub Releases](https://github.com/sses09935/apple-pcc-privacy-explainers/releases)**；線上版另有自動產生的[版本紀錄頁](https://apple-pcc-explainers.web.app/versions.html)（由 git tag 與 `build/build-html.mjs` 的 `VERSION_NOTES` 產生）。本檔為對應的靜態摘要，新增版本時請與 `VERSION_NOTES` 一併更新。

格式參考 [Keep a Changelog](https://keepachangelog.com/)，版本依 [Semantic Versioning](https://semver.org/lang/zh-TW/)。所有版本的 PDF 內容與來源**皆以 Apple 官方來源為唯一依據**；技術事實、`content/knowledge-base.md` 與 `sources/*` 自 v1.0.0 起零變動。

> **版本線**：本 repo 採單一歷史、兩點 canonical 版本（`v1.0.0` 初版、`v2.0.0` 現行）。`v2.0.0` 整併先前的設計系統、雙語與可讀性／查核模式工作為單一發布，對齊 `apple-afm3-explainers` 版本線。

## [2.0.0] — 2026-06-30

Bilingual PCC Readability and Audit Mode System — 整併 v1.0.0 以來的雙語、可讀性設計系統與查核模式工作為現行 canonical 版本（核心事實層 `content/knowledge-base.md`、`sources/*` 自 v1.0.0 起 **零變動**）。

### Added
- 新增英文版 PCC Web（`site/en/`）與 PDF 輸出，繁體中文 ↔ 英文語言切換；共 6 份雙語 PDF。
- 新增英文圖表／插圖變體（`assets/{diagrams,illustrations}/en/`），由 `build/i18n-svg.mjs` 從繁體中文圖檔生成（僅翻譯文字、幾何不變）。
- 新增雙語治理與術語表文件（source-aligned translation，未新增繁中沒有的 claim）。
- 新增 Reading／Audit 兩種閱讀模式：查核模式強化來源引用、邊界／誤解／警告 callout、狀態膠囊、TOC 與 footer metadata；模式狀態存於 `<html data-reader-mode>` + localStorage（跨頁、雙語、行動裝置；PDF 不含切換）。
- 新增 opt-in `?debug=1` debug banner（目前模式／語言／來源引用與 callout 數／版本／commit；預設關閉、無外部請求）與 `build/debug-web.mjs` 全域 Web 除錯腳本。
- 新增 `DESIGN.md`（PDF／Web 視覺單一規格）、`design/diagram-style.md`，與 `docs/wiki/*`（claim→source→KB→audience→diagram 導航，僅導航、不新增事實）。

### Changed
- 統一 PCC PDF／Web 可讀性設計系統：封面 accent rule、來源引用膠囊徽章（PDF）／可點擊 source pill（Web）、圖卡框、五型 callout、章首先講結論／誤解／takeaway，三受眾明顯視覺差異。
- 改善 Web 閱讀流程、TOC 行為、callout 一致性、來源引用與表格可讀性；新增或精修章節 summary、誤解 callout 與 takeaway。
- 加入明確的設計與知識參考（google-labs-code/design.md、OpenKnowledge／OKB、Material for MkDocs、GOV.UK Design System、GitHub Primer、U.S. Web Design System）。
- 將 `DESIGN.md` 升為人類＋AI-agent 工作流的 PCC PDF／Web 設計 source of truth；新增 source-bounded、agent-safe 的知識治理註記。
- footer／版本 metadata 與版本紀錄頁（`versions.html`）對齊 `apple-afm3-explainers` 版本線；元件契約名稱（`.callout-*`、`.status-pill`、`.reader-*`、`.language-switcher` 等）保持相容，知識邊界維持分離。
- 維持事實來源邊界，未新增任何技術 claim。

### Notes
- 英文版為 source-aligned translation，不得引入繁中來源文字所無的 claim。
- 外部系統僅作為設計、文件與知識治理靈感參考；本 repo 不複製 Apple 官方視覺識別、不匯入 GPL 程式碼，保留自有內容模型、來源邊界與 PDF／Web 實作。

## [1.0.0] — 2026-06-22

首次公開發布：三份受眾不同的繁體中文 PCC 隱私解說。

- 三份解說 PDF（開發者 30 頁／AI 使用者 14 頁／普羅大眾 13 頁）＋ Web 站台（Firebase）。
- 單一事實庫逐條附 Apple 官方來源、來源索引（type／年份／網域）、內文↔來源雙向註腳。
- 來源純度／引用完整性／來源 schema 稽核（本地 `npm --prefix build run qa`）＋ 防漂移 Firebase 部署；SEO（sitemap／robots／canonical／OG）。Apache-2.0。

[2.0.0]: https://github.com/sses09935/apple-pcc-privacy-explainers/releases/tag/v2.0.0
[1.0.0]: https://github.com/sses09935/apple-pcc-privacy-explainers/releases/tag/v1.0.0
