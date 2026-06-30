# Design and Knowledge References — PCC Privacy Explainers

> 本檔集中說明本 repo 在**設計、文件與知識治理**上參考過的開源／公開系統，以及每個參考的**角色**與**邊界**。
> 這些來源僅作為**設計靈感、資訊架構、知識治理與 agent workflow 參考**，本 repo 保留自己的實作、內容模型、來源邊界與視覺身份。
>
> 注意：此處列的是**設計／文件系統參考**，與本 repo 的**內容來源**（只引用 Apple 官方來源，見 [`sources/source-index.md`](../sources/source-index.md)）是**兩件不同的事**，請勿混用。

---

## 不複製聲明（先講清楚）

- 本 repo 使用**自己的 PDF / Web 文件系統**，**沒有複製 Apple 官方視覺**。
- **沒有直接搬移**任何第三方設計系統或 OpenKnowledge 的 **UI 程式碼或實作**。
- **沒有 import 任何 GPL-covered 程式碼**。
- 參考來源僅用於**資訊架構、閱讀體驗、知識治理與 agent-friendly documentation**。
- PCC 的核心仍是 **source-bounded explanation**：不把推論寫成事實（見 [`docs/KNOWLEDGE_GOVERNANCE.md`](KNOWLEDGE_GOVERNANCE.md)）。
- 列出這些參考**不代表**對方為本專案背書，也**不代表**任何隸屬或合作關係。

## 六個主要參考

> 角色不同，請勿混用：① 設計系統參考（MkDocs / GOV.UK / Primer / USWDS）著重**閱讀體驗與 UI 語言**；② 知識治理參考（OpenKnowledge / OKB）著重**知識庫治理與 agent workflow**；③ design.md 參考（google-labs-code/design.md）著重**把 `DESIGN.md` 當 source of truth 的規格思想**。

### 1. Material for MkDocs
- **用途**：長文文件閱讀、TOC、搜尋、admonition / callout、Markdown-first documentation flow。
- **本 repo 用法**：借鑑文件站資訊架構，**不遷移技術棧**（本 repo 自有 `Markdown → HTML → PDF` 管線）。
- **連結**：<https://squidfunk.github.io/mkdocs-material/>

### 2. GOV.UK Design System
- **用途**：plain language、短段落、低干擾公共資訊設計、任務導向內容。
- **本 repo 用法**：借鑑正文可讀性與資訊分層，**不仿政府品牌外觀**。
- **連結**：<https://design-system.service.gov.uk/>

### 3. GitHub Primer
- **用途**：neutral open-source UI、badge、label、alert、metadata、status / reference UI。
- **本 repo 用法**：借鑑 source pill、status badge、callout、footer metadata 的開源 UI 語言。
- **連結**：<https://primer.style/>

### 4. U.S. Web Design System（USWDS）
- **用途**：accessibility、mobile-friendly public information design、排版紀律。
- **本 repo 用法**：作為可及性、手機閱讀與公共資訊可信度的輔助參考。
- **連結**：<https://designsystem.digital.gov/>

### 5. OpenKnowledge / OKB
- **用途**：agent-native knowledge base、LLM wiki、Markdown-first knowledge structure、source-aware documentation workflow。
- **本 repo 用法**：借鑑**知識庫治理、agent-friendly documentation、source / status navigation、claim traceability**（落地於 [`docs/KNOWLEDGE_GOVERNANCE.md`](KNOWLEDGE_GOVERNANCE.md) 與 [`docs/wiki/`](wiki/)）。
- **限制**：**不可複製 OpenKnowledge 程式碼、UI 實作或 GPL-covered implementation**。只能參考**資訊架構與 workflow 概念**。

### 6. google-labs-code/design.md
- **用途**：把 `DESIGN.md` 作為 **human-readable 與 AI-readable** 的設計系統 source of truth。
- **本 repo 用法**：讓 PCC 的 [`DESIGN.md`](../DESIGN.md) 包含設計目標、tokens、component contract、PDF/Web rules、agent instructions。
- **限制**：**不要照抄範例視覺**；只採用「`DESIGN.md` as source of truth」的**規格思想**。

## 角色對照（避免混用）

| 參考 | 主要角色 | 在本 repo 對應到 |
|---|---|---|
| Material for MkDocs | 文件站資訊架構、閱讀導覽 | `DESIGN.md` §6（Web rules）、TOC、callout |
| GOV.UK Design System | 白話、可讀性、資訊分層 | 受眾密度模型、大眾版寫作政策 |
| GitHub Primer | 中性開源 UI 語言（badge/label/alert/metadata） | source pill、status pill、footer metadata（`design/component-contract.md`） |
| U.S. Web Design System | 可及性、手機友善、排版紀律 | 無障礙底線、mobile 行為、字級／對比 |
| OpenKnowledge / OKB | 知識庫治理、agent workflow、claim traceability | `docs/KNOWLEDGE_GOVERNANCE.md`、`docs/wiki/` |
| google-labs-code/design.md | `DESIGN.md` 作為單一 source of truth 的規格思想 | `DESIGN.md`、`design/component-contract.md` |

## 與 Apple 官方來源的區別

- 本檔列的是**設計／文件／知識治理參考**，用於「怎麼把內容做得好讀、好查、好維護」。
- 本 repo 的**事實內容**只引用 Apple 官方來源（`security.apple.com`、`github.com/apple/*`），清單見 [`sources/source-index.md`](../sources/source-index.md)。
- 兩者不可混為一談：設計參考**不是**內容來源，**不會**被當成 claim 的依據。
