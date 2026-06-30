# 圖表清單與規格（= PLAN §6.3）

> 畫一次、主題化重用。每張：來源 `[S0X]`、SVG 存 `assets/`。
> Phase 6 狀態：D1–D8、M1–M3 已產出**中性配色 self-contained SVG**（深藍/暖橘兩套基調）並接好 include；
> 「三主題各一套配色」為後續美術迭代項。
>
> **維護規格**：圖表的家族分類、信任邊界畫法、來源標示與 Do / Don't 見 [`diagram-style.md`](diagram-style.md)；
> 視覺整體規格見 [`../DESIGN.md`](../DESIGN.md)。本檔（`diagrams.md`）是**圖 → 來源 `[S0X]`** 的權威對照表。

## 流程/結構圖（`assets/diagrams/`）
| 編號 | 主題 | 來源 | 用於 |
|---|---|---|---|
| D1 | 端上 vs PCC 卸載決策 | S11 | 開發者 ch1、大眾 ch5 |
| D2 | 信任根 → Secure Boot → TXM 開機/碼信任鏈 | S14, S16 | 開發者 ch3 |
| D3 | 請求生命週期（裝置 → relay → 節點 → 銷毀） | S04 | 開發者 ch4、使用者 ch3 |
| D4 | attestation + 透明性日誌（核對量測值才封裝金鑰） | S05 | 開發者 ch5、使用者 ch4 |
| D5 | 五大要求一覽 | S03 | 三版皆用（簡化程度不同） |
| D6 | VRE 工作流程 | S12 | 開發者 ch6 |
| D7 | 威脅模型 / 信任邊界 | S07 | 開發者 ch7 |
| D8 | 2026 Google Cloud 拓樸（confidential VM、硬體帳本） | S13 | 開發者 ch9 |

## 大眾版比喻插圖（`assets/illustrations/`）
| 編號 | 比喻 | 對應概念 | 來源 |
|---|---|---|---|
| M1 | 用完就自我清空的房間 | 無狀態/用完即棄 | S03, S11 |
| M2 | 只有你有鑰匙的盒子 | 無特權存取 | S03, S11 |
| M3 | 人人都能查驗的收據 | 可驗證透明性 | S05, S11 |

## 大眾版敘事插圖（`assets/illustrations/`，設計修訂新增）
> 取代原大綱中的「（插圖：…）」文字佔位，使大眾版真正圖像化。warm 配色，drawn 圖形（不依賴 emoji）。

| 編號 | 章節 | 內容 |
|---|---|---|
| G0-cover | 0 封面 | 手機 + 發光上鎖的雲 |
| G1-needsee | 1 | AI 要幫忙得先看過你的內容 |
| G2-someonesees | 2 | 資料送到別人電腦 → 有人能看 |
| G3-appleidea | 3 | 上鎖的雲、只有你有鑰匙 |
| G5-decision | 5 | 簡單留手機 / 難的送上鎖的雲 |
| G6-relaxed | 6 | 安心使用、強大與私密兼得 |
| G8-summary | 8 | 三句話：清空 / 上鎖 / 可查驗 |

## 維護規則（補強，2026-06-28）
> 低風險補充，不更動上述清單與來源對照。完整規格見 [`diagram-style.md`](diagram-style.md)。

- **家族區分**：D-series（`assets/diagrams/`）是**技術圖**；M-series 與 G-series（`assets/illustrations/`）是**比喻／敘事插圖**。兩者規則不同——D-series 描述機制，M／G-series 建立直覺。
- **不得新增技術 claim**：任何圖（含比喻圖）都**不得引入** `content/knowledge-base.md` 沒有的機制、節點或信任關係；比喻可簡化，但不得重新定義 PCC 或加入新的技術性質。
- **修改先查 source-map**：新增或改圖時，須確認圖表達的關係能回溯到 KB／`sources/source-map.md`；無法確認對應者標 `TODO: verify`，不要臆測。
- **受眾主題界線**：受眾 theme 可調整圖的**色彩與密度**，但**不得改變圖的事實結構**（節點關係、流向、信任邊界）。
- **來源標示**：本檔的「圖 → `[S0X]`」對照表是圖的權威 provenance；文件嵌圖時 `figcaption`／鄰近內文須保留對應來源（大眾版集中於文末「依據」頁）。
