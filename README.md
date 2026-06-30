# PCC Privacy Explainers

**Apple AI Explainers Series** 的獨立 **PCC 專題** repo。把 Apple **Private Cloud Compute（PCC，私有雲端運算）** 在「AI 隱私」上做的事，
做成 **三份受眾不同的解說**（PDF + Web，**繁體中文與英文雙語**）。每份都回答三個問題：**為何要做 / 如何做到 / 做到了代表什麼**。

> 繁中為 source-of-record，英文為 **source-aligned translation**——英文版不新增繁中或來源沒有支持的 claim。本 repo 的核心原則是 **source-bounded explanation**，不把推論寫成事實。

[![CI](https://github.com/sses09935/apple-pcc-privacy-explainers/actions/workflows/ci.yml/badge.svg)](https://github.com/sses09935/apple-pcc-privacy-explainers/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Release](https://img.shields.io/badge/release-v2.0.0-blue.svg)](https://github.com/sses09935/apple-pcc-privacy-explainers/releases/latest)

> 非 Apple 官方出版品，與 Apple Inc. 無隸屬關係。只引用 Apple 官方來源。授權 Apache-2.0。

📖 **線上閱讀**：[apple-pcc-explainers.web.app](https://apple-pcc-explainers.web.app)（網頁版，含章節導覽與可點擊來源）· **English**：[apple-pcc-explainers.web.app/en/](https://apple-pcc-explainers.web.app/en/)

## 雙語版本 / Bilingual editions

本 repo 同時提供**繁體中文與英文**的 PDF 與 Web 版本，共用同一套設計系統與事實庫。

- **Web**：繁中在站根（`/developer.html` …），英文在 `/en/`（`/en/developer.html` …）；每頁右上角可一鍵切換語言，且**連到對應頁面**而非首頁。
- **PDF**：6 份 = 3 受眾 × 2 語言。繁中沿用既有檔名（`PCC-開發者版.pdf` 等）；英文為 `PCC-Developer-EN.pdf`、`PCC-AI-User-EN.pdf`、`PCC-General-Public-EN.pdf`。
- **治理**：繁中為 source-of-record，英文為 source-aligned translation；翻譯紀律見 [`docs/I18N.md`](docs/I18N.md)，術語對照見 [`docs/BILINGUAL_TERMS.md`](docs/BILINGUAL_TERMS.md)。英文版**不得新增繁中或來源沒有支持的技術 claim**，且保留所有 limitation／uncertainty／來源邊界語氣。

## 先看哪一份？

| 你是誰 | 建議閱讀（點擊下載最新版） | 目的 |
|---|---|---|
| 工程師 / 安全研究員 | **[PCC-Developer.pdf](https://github.com/sses09935/apple-pcc-privacy-explainers/releases/latest/download/PCC-Developer.pdf)** | 看威脅模型、attestation、VRE 驗證 |
| AI 工具重度使用者 | **[PCC-AI-User.pdf](https://github.com/sses09935/apple-pcc-privacy-explainers/releases/latest/download/PCC-AI-User.pdf)** | 判斷 PCC 對個人隱私的實際意義 |
| 非技術讀者 | **[PCC-General-Public.pdf](https://github.com/sses09935/apple-pcc-privacy-explainers/releases/latest/download/PCC-General-Public.pdf)** | 用比喻理解 Apple 為何需要 PCC |

> 以上連結指向最新 [Release](https://github.com/sses09935/apple-pcc-privacy-explainers/releases/latest)。也可在 repo 的 `dist/`（中文檔名）直接瀏覽原檔。

## 這份文件不主張什麼

- 不主張「Apple 永遠看不到任何資料」——保證適用於 PCC 請求，威脅模型有其假設邊界。
- 不主張 PCC 等於完全去信任 Apple——它降低、而非消除你對 Apple 的信任需求。
- 不主張本專案能取代 Apple 官方文件——這是受眾化的解說，原始依據以 Apple 官方為準。
- 不使用第三方爆料、推測或未經官方確認的模型規格（不確定者標 `TODO(verify)`，不以第三方填補）。

## 設計原則：單一真實來源 + 反漂移
事實只定義一次（`content/knowledge-base.md`），三份文件只是不同視角的再框架。四條正交軸，任一改動只碰一個檔：

| 軸 | 唯一所在 |
|---|---|
| 事實 | `content/knowledge-base.md`（每條附 `[S0X]`） |
| 來源 | `sources/source-index.md`（只收 Apple 官方來源） |
| 受眾差異 | `content/audiences/*` + theme CSS |
| 視覺／圖 | `design/*` + `assets/` |

規則由 [`AGENTS.md`](AGENTS.md) 的 11 條不變式強制執行。完整計畫見 [`docs/PLAN.md`](docs/PLAN.md)。

## 設計系統（Design system）

本 repo 收錄 [`DESIGN.md`](DESIGN.md)，定義 PCC 解說的視覺與版面規則：PDF 樣式、Web 呈現、圖表、來源標示與受眾密度。圖表的維護規格另見 [`design/diagram-style.md`](design/diagram-style.md)。

`DESIGN.md` **不定義技術事實**——技術事實仍以 [`content/knowledge-base.md`](content/knowledge-base.md) 為準，來源權威仍以 [`sources/source-index.md`](sources/source-index.md) 與 [`sources/source-map.md`](sources/source-map.md) 為準。

## 設計與知識庫參考

本專案使用自己的 PDF / Web 文件系統，**沒有複製 Apple 官方視覺**，也**沒有直接搬移**其他設計系統或 OpenKnowledge 的 UI 程式碼，**未 import 任何 GPL-covered 程式碼**。

PCC 的閱讀體驗與知識治理參考了以下開源或公開設計／文件系統的**原則**：

- **google-labs-code/design.md**：以 `DESIGN.md` 作為人類與 AI agent 都能讀懂的設計系統 source of truth。
- **OpenKnowledge / OKB**：agent-native knowledge base、LLM wiki、Markdown-first knowledge workflow、source / status navigation 與 claim traceability。
- **Material for MkDocs**：長文文件導覽、Markdown-first 文件站、callout / admonition 與搜尋體驗。
- **GOV.UK Design System**：白話寫作、短段落、低干擾公共資訊設計與可及性導向內容結構。
- **GitHub Primer**：中性的開源 UI 語言，包含 label、badge、alert、metadata 與 source / status reference 呈現。
- **U.S. Web Design System**：政府級公共資訊網站的可及性、手機友善與排版紀律。

這些來源僅作為**設計靈感、資訊架構、知識治理與 agent workflow 參考**。本 repo 保留自己的實作、內容模型、來源邊界與視覺身份；**列出參考不代表對方背書，也不代表任何隸屬關係**。PCC 的核心仍是 **source-bounded explanation**，不把推論寫成事實。

> 完整角色說明見 [`docs/DESIGN_REFERENCES.md`](docs/DESIGN_REFERENCES.md)；設計規則見 [`DESIGN.md`](DESIGN.md) §13；正文可讀性見 [`design/readability.md`](design/readability.md)；元件契約見 [`design/component-contract.md`](design/component-contract.md)；知識治理見 [`docs/KNOWLEDGE_GOVERNANCE.md`](docs/KNOWLEDGE_GOVERNANCE.md)。
> 注意：這些是**設計／文件系統參考**，與本 repo 的**內容來源**（只引用 Apple 官方來源）是兩件不同的事，請勿混用。

## Claim wiki（claim 導航層）

[`docs/wiki/`](docs/wiki/) 提供給維護者與 AI agent 的導航檔，把 claim 對應到來源、KB 位置、受眾草稿與圖表：

- [`claim-index.md`](docs/wiki/claim-index.md)：claim → source → KB → audience → diagram 索引
- [`trust-boundary-map.md`](docs/wiki/trust-boundary-map.md)：易誤讀信任邊界的安全／不安全措辭對照
- [`audience-route-map.md`](docs/wiki/audience-route-map.md)：同一事實在三受眾版本的呈現路由

wiki 層**僅供導航，不得新增事實**；與 KB／來源檔衝突時以後者為準。

## 目錄結構
```
DESIGN.md    視覺單一規格（PDF/Web/diagram/來源標示/受眾密度/設計參考/agent 契約）
docs/        PLAN.md（完整計畫）、GLOSSARY.md（術語表）、wiki/（claim 導航層）、
             DESIGN_REFERENCES.md（設計與知識庫參考）、KNOWLEDGE_GOVERNANCE.md（知識治理）
sources/     source-index.md（唯一來源清單）、source-map.md（claim→S0X）、primary/（頁面存檔）
content/     knowledge-base.md（唯一事實庫）、audiences/（受眾規格）、drafts/（三份草稿）
design/      base.css + theme-*.css + diagrams.md + diagram-style.md + component-contract.md
assets/      diagrams/（D1–D8 SVG）、illustrations/（M1–M3 + G 系列大眾版插圖）
build/       build.mjs、md2html.mjs、render.config.json、smoke/cjk-test.html
dist/        產出的三份 PDF
tasks/       每階段一支提示（00–07）＋ 稽核任務（08 設計系統、09 claim wiki）
```

## 如何 build
> 管線：`Markdown → HTML → PDF`（Playwright Chromium 列印），三份共用 `base.css`，各掛 theme CSS。
> 詳見 `docs/PLAN.md` §6（設計系統）、§7（管線）。

```bash
npm install            # 安裝 Playwright 等相依
# CJK 字型：macOS 可用系統內建 PingFang TC；Linux/CI 需安裝 Noto Sans/Serif CJK TC
node build/build.mjs   # md → html → dist/*.pdf
```

### 網站與品質關卡
```bash
npm --prefix build run build:html   # 產生 site/（Firebase 靜態站）
npm --prefix build run qa           # 稽核：來源純度 + 引用完整性 + 來源 schema
npm --prefix build run deploy       # 防漂移部署：須 commit 且 == origin/main，重建+QA 後才部署 Firebase
```
> **部署**：`deploy` 在 commit 且 `HEAD == origin/main`、重建 + QA 通過後，才把 **Firebase** 部署到同一個 commit（固定 `--project apple-pcc-explainers`）。本 repo **無 GitHub Actions workflow**；QA 改為本地手動執行（`npm --prefix build run qa`）。

## 執行階段（Phase 0 → 7）
- **Phase 0** 研究擷取 → `sources/source-map.md` + `primary/` 存檔
- **Phase 1** 建事實庫 → `content/knowledge-base.md` + `docs/GLOSSARY.md`
- **Phase 2** 定義受眾 → `content/audiences/*`
- **Phase 3–5** 三份草稿（共用同一 KB，可並行）
- **Phase 6** 設計與渲染 → `design/*` + `assets/*` + `build/*` + `dist/*.pdf`
- **Phase 7** 稽核與引用查核 → `qa-report.md`

## 來源與授權
- 內容僅引用 Apple 官方來源（`security.apple.com` 與 `github.com/apple/*`），清單見 `sources/source-index.md`。
- 本 repo 為**獨立的科普／教育用途**說明文件，**非 Apple 官方出版品**，與 Apple Inc. 無隸屬關係。
- "Apple"、"Private Cloud Compute" 等為 Apple Inc. 之商標，僅作指稱與說明之用。
- Apple PCC 開源碼（`github.com/apple/security-pcc`）採 Apple 自有限用授權、**禁止再散布**，故**不包含**於本 repo；如需請逕至 Apple 官方取得。

## 貢獻
歡迎貢獻，但本專案對來源把關嚴格——**只接受有 Apple 官方來源的內容**，不收第三方推測或行銷話術。規則見 [`CONTRIBUTING.md`](CONTRIBUTING.md)。貢獻前請在本地跑 `npm --prefix build run qa`（來源純度、引用完整性、來源 schema）。

### 授權（License）
本專案（文字、圖表、build 腳本）以 **Apache License 2.0** 釋出，全文見 [`LICENSE`](LICENSE)。

```
Copyright 2026 Nick Lian (github.com/sses09935)
Licensed under the Apache License, Version 2.0.
```
