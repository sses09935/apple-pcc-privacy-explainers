# PCC Diagram Style Guide

> PCC 圖表系統的**維護規格**。隸屬 [`../DESIGN.md`](../DESIGN.md) 第 9 節，與 [`diagrams.md`](diagrams.md)（圖表清單與來源對照）搭配使用。
>
> 本檔**只定義圖表的呈現與維護規則**，**不新增任何 PCC 技術事實**。
> 圖表所表達的事實一律以 `../content/knowledge-base.md` 為準，來源以 `../sources/source-index.md`、`../sources/source-map.md` 為準。

---

## 1. Purpose

定義 PCC 專案圖表的：家族分類、共用視覺語彙、信任邊界畫法、箭頭與流向規則、來源標示、受眾主題對應、維護清單與 Do / Don't。

目的是讓 agent 與 contributor 在新增或修改圖時，能維持**事實結構不漂移、來源可追溯、受眾一致**。

## 2. Diagram Families

| 家族 | 位置 | 性質 | 對應清單 |
|---|---|---|---|
| **D-series** | `assets/diagrams/`（鏡像 `site/assets/diagrams/`） | 技術圖（technical） | `diagrams.md`「流程/結構圖」 |
| **M-series** | `assets/illustrations/` | 比喻插圖（metaphorical），三個核心比喻 | `diagrams.md`「大眾版比喻插圖」 |
| **G-series** | `assets/illustrations/` | 大眾版敘事插圖（narrative，比喻家族的延伸） | `diagrams.md`「大眾版敘事插圖」 |

- D-series 與 M/G-series 是**兩種不同性質**的圖：前者描述機制，後者建立直覺。兩者規則不同（見 §3、§4）。
- G-series 在性質上屬於比喻／敘事家族，與 M-series 適用相同的「不得新增技術含義」規則。

> 目前實作狀態（來自 `diagrams.md`）：D-series 以冷藍基調、M／G-series 以暖色基調的 **self-contained SVG** 產出；「三主題各一套配色」為後續美術迭代項。修改時請以此現況為基準，勿假設已有完整主題切換。

## 3. D-Series Technical Diagrams

D-series 是**技術圖**。可用來說明：

- 請求生命週期（request lifecycle）
- OHTTP / relay 流程
- attestation
- VRE
- 透明性日誌（transparency log）
- 信任邊界（trust boundary）
- 無狀態運算（stateless computation）
- 無特權執行期存取（no privileged runtime access）

規則：

- 每張 D-series 圖**必須能回溯**到 KB claim 或 source-map 條目（對照在 `diagrams.md`）。
- 技術圖**不得引入新的架構細節**（KB 沒寫的機制不得出現在圖上）。
- 技術圖**不得把未驗證的信任關係畫成已驗證事實**（區分「Apple 宣稱」與「可獨立驗證」）。
- 在適當處使用來源標示（見 §8）。
- 簡化是允許的（省略次要節點），但簡化不得改變流向或信任方向。

## 4. M-Series Metaphorical Illustrations

M-series（及 G-series）是**比喻圖**。可用來說明：

- 隱私直覺（privacy intuition）
- 面向使用者的心智模型（mental model）
- 給非技術讀者的簡化解釋

規則：

- 比喻可以簡化，但**不得重新定義 PCC**。
- 比喻**不得加入技術性質**（例如不得讓「房間自我清空」暗示出 KB 沒有的加密機制細節）。
- 每張 M／G 插圖應**至少回溯到一個** KB claim、D-series 圖或 source-map 條目。
- 若某比喻有過度宣稱（overclaim）風險，**加註警語或直接避免該比喻**。

目前三個核心比喻（不得擴張其技術含義）：

| 圖 | 比喻 | 對應概念 | 來源（見 KB） |
|---|---|---|---|
| M1 | 用完就自我清空的房間 | 無狀態／用完即棄 | S03, S11 |
| M2 | 只有你有鑰匙的盒子 | 無特權存取 | S03, S11 |
| M3 | 人人都能查驗的收據 | 可驗證透明性 | S05, S11 |

## 5. Shared Visual Vocabulary

> 以下為**現況彙整**，供維持一致；非強制美術規範。新增圖時沿用既有語彙，避免每張圖各自發明符號。

- **節點／方塊**：圓角矩形（`rx≈12`）＝流程中的一個角色或階段。
- **強調色**：D-series 用冷藍（`#0a5ad6` 系），M／G-series 用暖橘／暖黃（`#e8743b` / `#f2b705`）。
- **次要文字**：灰（`#5b6470` / `#7a7480`）放在方塊內的補充說明。
- **箭頭**：帶 marker 的線段表示流向（見 §7）。
- **字型**：SVG 內嵌 `PingFang TC, Hiragino Sans GB, sans-serif`，與內文 CJK 一致。
- 色值應對齊 `DESIGN.md` §4 的 token；勿在圖上引入與 token 衝突的新色。

## 6. Trust Boundary Rules

圖表在表達信任時，必須清楚區分以下邊界（與 [`../docs/wiki/trust-boundary-map.md`](../docs/wiki/trust-boundary-map.md) 一致）：

- **Apple claim vs independently verifiable property**：可獨立驗證者（attestation／透明性日誌／公開 binary）與僅為 Apple 宣稱者，視覺上不得混同。
- **PCC request vs all Apple cloud services**：圖只描述 PCC 請求路徑，不得暗示涵蓋 Apple 所有雲端服務。
- **reducing trust vs eliminating trust**：圖不得暗示「完全不需要信任 Apple」；PCC 是**降低**而非**消除**信任需求。
- **stateless computation vs data never exists**：可畫「用完即棄」，但不得畫成「資料從不存在」。
- **no privileged runtime access vs zero risk**：可畫「無特權介面」，但不得畫成「零風險」。
- **Google Cloud extension vs third-party free processing**：S13 擴展圖必須呈現 Apple 保留控制／密碼學簽核，不得畫成第三方可任意處理資料。

> 信任邊界線（boundary line）建議用明顯的框或虛線標示「信任邊界＝PCC 節點」，避免讓邊界內外看起來同質。

## 7. Arrow and Flow Rules

- 箭頭方向 = **資料／請求的實際流向**；不得為了版面美觀而反向或省略關鍵跳轉。
- 加密／封裝關係（如「金鑰封裝給 REK」）若要畫，須與 KB 的描述一致，不得新增 KB 未述的通道。
- 「驗證」步驟（如 attestation 檢查）應可辨識為一個獨立節點或標註，避免讓讀者以為信任是無條件傳遞。
- 雙向端到端加密、transitive trust 等多步關係，若簡化，須在圖說標明已簡化。

## 8. Source Label Rules

- 圖的 provenance **集中記錄在 `diagrams.md`** 的對照表（每張圖 → `[S0X]`），這是圖的權威來源標示。
- 在文件中嵌入圖時，`figcaption` 或鄰近內文應帶該圖對應的 `[S0X]`（大眾版集中於文末「依據」頁）。
- 不得因為「圖看起來乾淨」而在文件中移除圖的來源標示。
- 若一張圖綜合多個 claim，應列出所有相關 `S0X`；無法確認對應者標 `TODO: verify`，不要臆測。

## 9. Audience Theme Mapping

| 受眾 | 主要使用的圖 | 主題色（呼應 DESIGN.md §4） | 密度 |
|---|---|---|---|
| Developer | D1–D8（完整技術圖） | 冷藍 | 高 |
| Power User | D3／D4／D5 的**簡化版** | 紫 | 中 |
| General | M1–M3、G0–G8、D1／D5 的**大眾化版** | 暖橘／暖黃 | 低 |

- 受眾 theme 可調整**色彩與密度**（例如大眾版用更少節點、更大字），但**不得改變圖的事實結構**（節點關係、流向、信任邊界）。
- 同一張概念圖跨受眾重用時，化簡只能「拿掉細節」，不能「改寫關係」。

## 10. Maintenance Checklist

新增或修改任何圖前後，逐項確認：

- [ ] 這張圖屬於 D-series 還是 M／G-series？規則用對了嗎？
- [ ] 圖表達的每個關係都能在 KB 找到對應？（無則回 `diagrams.md` 補對照或標 `TODO: verify`）
- [ ] 沒有新增 KB 未述的機制、節點或信任關係？
- [ ] 未驗證的信任沒有被畫成已驗證事實？
- [ ] 信任邊界（§6）沒有被誤導性地放大或抹除？
- [ ] 箭頭流向與 KB 一致，簡化處有標明？
- [ ] 來源標示（`diagrams.md` 對照 + figcaption）完整且可讀？
- [ ] 受眾化只改了色彩／密度，沒改事實結構？
- [ ] 色值對齊 `DESIGN.md` §4 token，沒有引入炒作風格的發光／賽博龐克效果？

## 11. Do / Don't

### Do

- 讓 D-series 維持技術性、M／G-series 維持比喻性。
- 讓每張圖都能回溯到 KB／source-map。
- 用一致的視覺語彙（節點、箭頭、邊界）。
- 跨受眾重用時只調色彩與密度。
- 簡化時標明，並保留來源標示。

### Don't

- 不要在圖上新增 KB 沒有的技術細節。
- 不要把未驗證的信任關係畫成已驗證。
- 不要讓比喻圖引入新的技術含義。
- 不要把 PCC 請求路徑畫成涵蓋全部 Apple 雲端服務。
- 不要用視覺（發光、誇張箭頭、絕對化標語）加強超出來源的宣稱。
- 不要為了乾淨而拿掉來源標示。
