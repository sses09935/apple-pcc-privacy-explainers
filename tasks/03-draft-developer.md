# Task 03 — 開發者版草稿

## 目標
依 `content/audiences/developer.md` 的逐節大綱，產出 `content/drafts/01-developer.md`：
一份 **28–40 頁**的技術參考，回答 為何/如何/代表什麼，事實全部來自 KB 並逐句附 `[S0X]`。

## 輸入
- `content/audiences/developer.md`（結構與 persona）
- `content/knowledge-base.md`（事實來源）
- `sources/source-map.md`、`sources/source-index.md`（§2，來源編號）
- `docs/GLOSSARY.md`、`design/diagrams.md`（圖表規格）
- `docs/PLAN.md` §5.1

## 不變式（AGENTS.md）
- #1 事實只引自 KB，不自行推導。
- #3 每個事實句必須帶 `[S0X]`。
- #4 不確定 → `TODO(verify)`，不得以第三方/記憶填補。
- #5 準確性紅線：明確區分「Apple 宣稱」與「可獨立驗證」。
- #6 用詞依 GLOSSARY；#7 繁中、術語首次附英文。

## 步驟
1. 依 §5.1 章節順序（0–11）撰寫，逐節命中「內容重點」與目標頁數。
2. **每個事實句末附 `[S0X]`**；多來源逗號分隔。事實一律取自 KB。
3. 依大綱在指定處插入**圖片佔位**（如 `![D2 信任根→Secure Boot→TXM](../../assets/diagrams/D2.svg)`）+ 圖說 + `[S0X]`。需要的圖：D1–D8、D5。
4. 在第 2/5/6 章特別維持 **「宣稱 vs 可驗證」** 對照（哪些是設計主張、哪些可用 VRE/log/可重現 build 證實）。
5. 第 6 章（VRE 實戰）寫成**讀者可照做的步驟**：環境需求 → 驗 log 一致性 → 下載對應 binary → 虛擬環境 build → 對展示模型推論；附 `CloudAttestation`/`Thimble` 源碼導覽。引 `[S08, S12]`。
6. 允許在大綱許可處放虛擬碼/碼區塊（樣式由主題階段處理）。
7. 保留並逐一處理 `TODO(verify)`（如裝置端模型參數量）——能以 S01/S03 校正則填，否則留標記。
8. 第 11 章附錄：GLOSSARY 摘錄 + `[S01–S13]` 來源對照表 + 延伸驗證清單。

## 完成定義（逐項勾選）
- [ ] 章節結構與 §5.1（0–11）一致；估計頁數落在 28–40。
- [ ] 每個事實句皆有 `[S0X]`；無孤兒宣稱。
- [ ] 指定處皆有圖片佔位（D 編號正確）+ 圖說。
- [ ] VRE 步驟具體可照做。
- [ ] 「宣稱 vs 可驗證」對照明確。
- [ ] `TODO(verify)` 已解或明確標記。

## 禁止
- 不得使用 KB 以外的事實或 §2 以外的來源。
- 不得引用第三方數字。
- 不得為湊頁數灌水（稽核會檢查「非灌水」）。
