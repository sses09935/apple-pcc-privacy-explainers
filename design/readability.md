# Readability — PCC Privacy Explainers 正文可讀性規則

> PCC 正文（PDF／Web）的可讀性單一規格。從屬於 [`DESIGN.md`](../DESIGN.md) 與 [`AGENTS.md`](../AGENTS.md)。
> 目標：用**結構分層、短段落、導讀、callout、takeaway、來源降噪**降低閱讀負擔，
> **而不是**刪除技術限制或來源邊界。
>
> 鐵則：**可讀性只能改「怎麼說」，不能改「說了什麼」。** 任何讓事實、來源或不確定性改變的修訂，都不是可讀性修訂。
> 判斷「這是 readability 還是新 claim」的方法見 [`docs/KNOWLEDGE_GOVERNANCE.md`](../docs/KNOWLEDGE_GOVERNANCE.md) §5–§6。

---

## 1. 每個主要大節先講結論

每個主要章節（H2）開頭，先給 2–4 句或 1–3 點的「先講結論」，讓讀者在細節前先拿到主線。

```md
### 先講結論

這一節只要先記住三件事：

1. ……
2. ……
3. ……
```

- 導讀**只能來自該節既有內容**，不得新增新 claim、不得比來源說得更強。
- 大眾版可用更白話的「先講重點」，但仍**零技術名詞**。

## 2. 長段落拆短

避免一段同時塞入「主張＋來源邊界＋技術限制＋例外＋讀者提醒」。拆成可掃讀的單元，並把「可以確定」與「不能推論」分開（見 §5）。

## 3. 每段只承載一個主要概念

一段一個概念。需要並列多個概念時改用清單或表格，不要堆在同一段。

## 4. 技術詞首次出現給白話定義

技術詞（如 PCC／Private Cloud Compute、attestation、verifiable privacy boundary、cloud inference、on-device processing）**第一次出現**時，給一句白話定義。

```md
Private Cloud Compute（PCC）可以先理解成 Apple 為部分雲端 AI 任務設計的隱私保護執行環境。
重點不是「完全不上雲」，而是讓需要雲端能力的請求在受限制、可驗證的環境中處理。
```

- 這是寫法示例，**請依既有內容與來源邊界調整，不得新增超出來源的 claim**。
- **例外（受眾政策）**：**大眾版正文維持零技術名詞**（`AGENTS.md` #8、GLOSSARY「G 政策」）。大眾版不採用本條，改以比喻承載；技術詞只在文末「依據」頁出現。

## 5. 「可以確定」與「不能推論」分開寫

把官方支持的事實，與不能由它推得的結論，明確分開。建議用對照寫法或 `boundary` callout：

```md
**可以確定的是：**
……（附 [S0X]）

**不能直接推論的是：**
……（說明這不能由上面推得，或官方未說）
```

- **不得刪除**「不能推論／官方未說／威脅模型有邊界」這類限制語。

## 6. 常見誤解獨立成小節或 callout

把常見誤解獨立出來，用 `misconception` callout 或小節澄清。PCC 至少應涵蓋：

- PCC **不等於**資料永遠不上雲。
- PCC **不等於**可以無條件相信所有雲端 AI。
- PCC **不等於** Apple 公開了所有內部實作細節。
- PCC **不應**被簡化成一般雲端代管服務。
- PCC 的重點是**隱私邊界、可驗證性與官方聲明限制**。

> 澄清誤解只能**還原既有來源邊界**，不得新增 KB 沒有的「事實」。

## 7. 表格前加入「怎麼讀這張表」

較複雜的表格前，加一句導讀，告訴讀者欄位意義與該怎麼比較。

```md
### 怎麼讀這張表

左欄是 Apple 官方文件可確認的性質，右欄是它**不能**保證的事。重點在兩者的界線，而不是逐格背誦。
```

## 8. 每篇結尾加入 takeaway

每篇文章結尾加入「讀完後你應該帶走什麼」：

```md
## 讀完後你應該帶走什麼

1. ……
2. ……
3. ……
```

- takeaway **必須來自既有內容**，不得新增新 claim。

## 9. 保留來源邊界

每個事實句維持其 `[S0X]`（大眾版正文不內嵌，集中於文末「依據」頁——仍須完整且與 `source-map.md` 一致）。可讀性修訂**不得移除或弱化**來源標示。

## 10. 不為了好讀刪除限制語

「保證適用於 PCC 請求」「Apple 宣稱 vs 可獨立驗證」「無 reproducible builds」「2026 擴展 ≠ 交第三方任意處理」「威脅模型有假設邊界」等限定語**一律保留**。寧可多一句限定，也不要少一句。

## 11. 不把官方文件沒說的補成推論

不確定 → 標 `TODO(verify)`，不以第三方或記憶填補（`AGENTS.md` #4）。不把「合理推測」寫成事實。

## 12. 英文版要自然可讀，但不得新增 claim

英文版（`content/drafts/en/*`）是 source-aligned translation：可為英文語序拆句、調整連接詞、用自然英文片語（"the official documentation indicates"、"what can be confirmed"），但**命題集合 ⊆ 繁中**，不得新增繁中沒有的 claim、數字或能力（見 [`docs/I18N.md`](../docs/I18N.md)）。

## 13. 英文版保留 limitation / uncertainty / cannot-infer 語氣

英文版必須保留等效的限定語氣：「保證適用於 PCC 請求」「Apple claims vs independently verifiable」「no reproducible builds」「the threat model has assumed boundaries」「cannot directly infer」。**不得**為了讀起來更順而弱化或省略這些邊界（術語對照見 [`docs/BILINGUAL_TERMS.md`](../docs/BILINGUAL_TERMS.md) §4）。

---

## PCC 專屬語氣（tone）

正文語氣應：**清楚、克制、可信、不誇張、不行銷、不恐嚇**，不替 Apple 做品牌宣傳，不把官方沒說的說滿。

**避免**：革命性、完全安全、絕對隱私、Apple 無法得知任何資訊、業界唯一、徹底解決、完美保護、顛覆式。

**偏向**：目前官方文件顯示、可以確認的是、不能直接推論的是、這裡的重點在於、較精確的說法是、此處仍需依官方後續文件確認。

---

## 套用順序（readability pass 流程）

1. 先讀 KB 與 `source-map.md`，確認該段對應的 claim 與 `S0X`。
2. 加「先講結論」（只摘既有內容）。
3. 拆長段、一段一概念；分開「可以確定／不能推論」。
4. 首次技術詞給白話定義（**大眾版除外**）。
5. 誤解獨立成 callout；複雜表格加導讀。
6. 章末加 takeaway。
7. 全程保留 `[S0X]` 與所有限制語。
8. 跑 `npm --prefix build run qa`；改到來源／狀態／callout 呈現則更新 `qa-report.md`。
9. 命題集合不可變——句子可變、事實不可變。

> callout 的實作（`.callout` / `.callout-note` / `.callout-boundary` / `.callout-warning` / `.callout-misconception` / `.callout-summary`）見 [`design/component-contract.md`](component-contract.md)；
> 在 Markdown 中以 `> [!NOTE]` / `> [!BOUNDARY]` / `> [!WARNING]` / `> [!MISCONCEPTION]` / `> [!SUMMARY]` 開頭的 blockquote 觸發（無標記者為一般 `.callout`）。
>
> **閱讀模式 / 查核模式**：Web 端 callout 與 source-ref 的視覺權重會隨 `<html data-reader-mode>` 改變——閱讀模式降低干擾、查核模式讓邊界與來源浮出（見 [`DESIGN.md`](../DESIGN.md) §19、`component-contract.md` §7）。可讀性寫作不需特別處理：照常用 `[!BOUNDARY]`／`[!WARNING]`／`[!MISCONCEPTION]` 標記查核邊界，兩模式會自動呈現對應強度。
