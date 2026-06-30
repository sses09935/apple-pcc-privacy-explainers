# Knowledge Governance — PCC Privacy Explainers

> 知識治理規格：本 repo 如何維持 **source-bounded explanation**（來源邊界內的解說），
> 以及哪些內容人類或 AI agent 可以安全地修改、哪些不可以。
>
> 本檔從屬於 [`AGENTS.md`](../AGENTS.md) 不變式與 [`DESIGN.md`](../DESIGN.md)。
> 若本檔與 `content/knowledge-base.md`、`sources/source-index.md`、`sources/source-map.md` 衝突，**以後三者為準**。

---

This repo borrows the knowledge-governance idea of an agent-friendly, Markdown-first knowledge base. It does not copy OpenKnowledge code or implementation. The purpose is to make the repo easier for humans and AI agents to audit, navigate, and update safely.

本 repo 借鑑 agent-friendly、Markdown-first knowledge base 的知識治理思路，但不複製 OpenKnowledge 的程式碼或實作。目的在於讓人類與 AI agent 都能更安全地查核、導覽與更新文件。

---

## 1. Source-bounded explanation（來源邊界內的解說）

本 repo 的核心紀律：**事實只定義一次，且每條事實都綁定 Apple 官方來源。** 解說可以換受眾、換密度、換語氣，但不得越過來源邊界把推論寫成事實。

落地方式：

- **單一事實庫**：所有技術事實只存在於 `content/knowledge-base.md`（KB），每條附 `[S0X]`。
- **單一來源清單**：可用來源僅 `sources/source-index.md`（只收 `security.apple.com` 與 `github.com/apple/*`）。
- **逐條對照**：`sources/source-map.md` 把每條 claim 對到 `S0X`。
- **三份草稿只「再框架」**：`content/drafts/*` 只引用 KB，不自行新增宣稱。
- **不確定即標記**：查不到官方依據的內容標 `TODO(verify)`，**不以第三方或記憶填補**。
- **準確性紅線**：遵守 KB §3.8——不寫「Apple 永遠看不到任何東西」；保證適用於 PCC 請求且威脅模型有假設邊界；開發者版區分「**Apple 宣稱** vs **可獨立驗證**」；Apple **未提供 reproducible builds**，可驗證鏈是 attestation ↔ 透明性日誌，而非源碼 ↔ binary。

> 一句話：**呈現可變，事實邊界不可越。**

## 2. claim、source、status、reader route 的關係

四個概念是不同的層，**不可互相替代**：

| 概念 | 是什麼 | 唯一所在 | 誰可改 |
|---|---|---|---|
| **claim（宣稱）** | 一條關於 PCC 的事實陳述 | `content/knowledge-base.md` | 只有在有 Apple 官方來源時，且須同步 source-map |
| **source（來源）** | 支持某條 claim 的 Apple 官方頁面／repo | `sources/source-index.md`（`S0X`） | 只能新增官方來源、給遞增 `S0X` |
| **status（狀態）** | 該 claim 的**認識論強度**：是「Apple 宣稱」還是「可獨立驗證」，或標了 `TODO(verify)` | KB 行內用詞＋`docs/wiki/trust-boundary-map.md` 對照 | 不可在沒有依據下「升級」狀態（把宣稱講成已驗證） |
| **reader route（受眾路由）** | 同一條 claim 在開發者／使用者／大眾三版本怎麼呈現 | `content/audiences/*` + `docs/wiki/audience-route-map.md` + theme CSS | 可改呈現密度／語氣，**不可改事實意義** |
| **language edition（語言版本）** | 同一條 claim 的繁中（source-of-record）與英文（source-aligned translation） | 繁中 `content/drafts/*` + 英文 `content/drafts/en/*`；治理見 `docs/I18N.md` | 可翻譯與調整語序，**不可新增繁中沒有的 claim、不可弱化限定語** |

對照導航層在 [`docs/wiki/`](wiki/)（`claim-index.md`、`trust-boundary-map.md`、`audience-route-map.md`）——**僅供導航，不得新增事實**。

> 關鍵：**status 是 claim 的屬性，不是樣式。** 把一條「Apple 宣稱」用更強的視覺或措辭呈現成「已被獨立驗證」，即使沒改 KB 文字，也是一種漂移。

## 3. AI agent 可以安全修改的內容

以下屬於**呈現與導航層**，在遵守 `DESIGN.md` 與 component contract 的前提下，agent 可以修改：

- **可讀性（readability）**：繁體中文語句通順度、斷句、標點、術語首次出現附英文。
- **版面（layout）**：CSS、間距、密度、受眾 theme、PDF/Web 版面——一律遵循 [`DESIGN.md`](../DESIGN.md) 與 [`design/component-contract.md`](../design/component-contract.md)。
- **由既有正文導出的摘要（summaries derived from existing text）**：章節摘要、重點清單——只能**改寫既有已引用的內容**，不得引入新事實或新來源。
- **callout 結構**：把既有內容組織成 callout／解讀框／表格——不得藉此放進未引用的新宣稱。
- **bilingual translation aligned with source text（與來源對齊的雙語翻譯）**：把繁中譯成英文（`content/drafts/en/*`）——逐句對齊、保留所有 `[S0X]` 與限定語，**不得新增 claim**（見 [`I18N.md`](I18N.md)）。
- **README / DESIGN / docs 導航**：目錄、連結、章節順序、索引、交叉引用。

## 4. AI agent **不可**擅自修改的內容

以下屬於**事實與來源層**，agent **不得**在沒有 Apple 官方依據與人類審查下變更：

- **factual claim（事實宣稱）**：`content/knowledge-base.md` 的任何技術事實。
- **source interpretation（來源解讀）**：某段官方文字「代表什麼」的解讀，不得擴張或弱化。
- **source-index factual mapping（來源索引的事實對應）**：`sources/source-index.md` 與 `sources/source-map.md` 的 `S0X ↔ claim` 對應。
- **Apple official statement boundaries（Apple 官方陳述的邊界）**：不得把「Apple 宣稱」呈現成「已被獨立驗證」，不得移除「保證適用於 PCC 請求／威脅模型有邊界」這類限定。
- **uncertainty labels（不確定性標籤）**：`TODO(verify)`、「Apple 宣稱」、「無 reproducible builds」等標記不得被靜默刪除或淡化。
- **English-only new claims（英文版獨有的新 claim）**：英文版不得出現繁中 source-of-record 沒有、或 source map 不支持的 claim；翻譯只能對齊，不能擴張。

> 若 readability／layout 改動**無法在不動到上述任一項的情況下完成**，那就不是 readability 改動——停下來，回報，交人類決定。

## 5. 如何判斷一個新段落是否新增了 claim

改寫或新增段落前，逐項自問：

1. **這句話有沒有對應的 KB 條目？** 沒有 → 它是新 claim，需要來源，不能直接寫。
2. **它有沒有引用 `[S0X]`？** 開發者／使用者版每個事實句都該能對到來源；找不到來源就是越界。
3. **它是否比 KB 說得更強？**（更絕對、更廣、把「宣稱」說成「已驗證」、把「PCC 請求」放大成「所有情況」）→ 是漂移。
4. **它是不是只是把既有 claim 換句話說？** 是 → 屬 readability，允許。
5. **它有沒有引入新的數字、名稱、能力、機制？** 有，且 KB 沒有 → 需要官方來源，否則標 `TODO(verify)`。

> 快速法則：**能用既有 `[S0X]` 標注且不超出該來源範圍 → 不是新 claim。否則就是。**

## 6. 如何做 readability pass 而不改事實

安全的可讀性修訂流程：

1. **先讀 KB 與 source-map**：確認該段落對應哪些 claim 與 `S0X`。
2. **只動表達，不動命題**：改語序、拆長句、補連接詞、修標點；保留每個事實句與其 `[S0X]`。
3. **不動限定語**：「在 PCC 請求」「Apple 宣稱」「威脅模型假設」「不等於交給第三方任意處理」等限定詞**原樣保留**。
4. **術語一致**：依 `docs/GLOSSARY.md`（例如 TXM 非 TEM）；大眾版正文維持零技術名詞政策。
5. **改完自我比對**：句子數可變，**命題集合不可變**；確認沒有新增／刪除任何 claim、沒有升級任何 status。
6. **跑 QA**：`npm --prefix build run qa`（來源純度／引用完整性／schema 應維持綠）。
7. **留痕**：若改動觸及來源／狀態／callout 呈現，於 `qa-report.md` 記錄。

### Translation pass（如何翻譯而不新增 claim）

英文版（`content/drafts/en/*`）是與繁中對齊的翻譯，流程同 readability pass 的紀律再加上雙語檢查：

1. 以**繁中對應檔為 source-of-record**，逐句翻譯；保留每個 `[S0X]` 於對應位置。
2. **命題集合 ⊆ 繁中**：英文不得新增 claim、數字、能力或保證；語氣句不得攜帶新事實。
3. **保留所有限定語**（PCC 請求範圍、Apple claims vs verifiable、no reproducible builds、threat-model boundaries、cannot directly infer）。
4. 技術詞首次出現用英文原文＋縮寫；大眾版維持 plain English 無術語。
5. 翻完比對：英文句若找不到對應繁中句與來源，就是越界——刪除或標記，不要保留。
6. 跑 `npm --prefix build run qa`（`check-refs` 會掃 `content/` 含 `en/`）；英文 PDF 註腳數應等於繁中。
7. 完整規則見 [`I18N.md`](I18N.md) §2–§3；術語見 [`BILINGUAL_TERMS.md`](BILINGUAL_TERMS.md)。

## 7. 與 AFM3 維持設計語言一致、但知識邊界分離

本系列（**Apple AI Explainers**）規劃中的姊妹專案 **AFM3** 將共用同一套**設計語言與元件命名**，但**知識庫各自獨立**。

- **共用**：`DESIGN.md` 的呈現規則、design tokens 對應關係、[`design/component-contract.md`](../design/component-contract.md) 的元件規範名稱、受眾密度模型、來源／狀態的呈現紀律。
- **不共用**：claim、source-index、source-map、來源解讀、不確定性標籤——PCC 與 AFM3 各自維護，**不得跨 repo 搬移或合併**。
- **獨立 repo**：PCC 與 AFM3 是分開的 repo，不把彼此的事實庫互相 import。
- **改動留痕**：任何會影響 AFM3 對齊的元件命名／契約改動，於 `CHANGELOG.md` 或 `qa-report.md` 註明（見 `DESIGN.md` §15）。

> 一句話：**設計語言可以對齊，知識邊界必須各自獨立。**

## 8. 授權與不複製聲明

- 本 repo 借鑑 OpenKnowledge / OKB 的**知識治理概念**（agent-native、Markdown-first、source/status 導航、claim 可追溯），**不複製其程式碼、UI 實作或 GPL-covered implementation**。
- 本 repo 借鑑 google-labs-code/design.md 的「`DESIGN.md` as source of truth」**規格思想**，**不照抄其範例視覺**。
- 本 repo 保留自己的內容模型、來源邊界與 PDF/Web 實作，**未複製 Apple 官方視覺識別**，與 Apple Inc. 無隸屬關係。

完整參考說明見 [`docs/DESIGN_REFERENCES.md`](DESIGN_REFERENCES.md) 與 [`DESIGN.md`](../DESIGN.md) §13。
