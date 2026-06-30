# Task 01 — 建立事實庫（knowledge-base + glossary）

## 目標
產出 `content/knowledge-base.md`（受眾中立、逐條附 `[S0X]`）與 `docs/GLOSSARY.md`（= PLAN §4）。
這是三份草稿的**唯一事實來源**;之後任何草稿只能引用,不能新增事實。

## 輸入
- `sources/source-index.md`（§2）、`sources/source-map.md`、`sources/primary/*`
- `docs/PLAN.md` §3（事實核心結構）、§4（術語表）

## 不變式（AGENTS.md）
- #1 事實單一來源：事實只定義於 `knowledge-base.md`。
- #2 來源單一來源：只用 §2 所列來源（`security.apple.com` / `github.com/apple/*`）。
- #3 每條事實必須對應 `source-map.md` 的 `S0X`；無來源者不得寫入。
- #4 機制名稱/數字以 Security Guide 為準；不確定標 `TODO(verify)`,不得以第三方/記憶填補。
- #5 遵守 §3.8 準確性紅線（區分「Apple 宣稱」vs「可獨立驗證」）。
- #6 用詞依 GLOSSARY；#7 繁中、術語首次附英文。

## 步驟
1. 依 §3 結構撰寫事實庫,逐節：
   - 3.1 動機（為何 server AI 需要新模型）
   - 3.2 五大核心要求（逐項：定義 / 機制 / 如何強制 / 可驗證點）
   - 3.3 請求生命週期（端到端）
   - 3.4 硬體/軟體支柱
   - 3.5 可驗證性與工具（VRE / binary 90 天發布政策 / 開源元件 CloudAttestation·Thimble）
   - 3.6 Apple Security Bounty（PCC，三類別 + 獎勵區間）
   - 3.7 2026 擴展（PCC on Google Cloud：相同要求、confidential VM、雙信任根、硬體帳本、Apple 保留控制）
   - 3.8 準確性紅線
2. 每條事實末尾標 `[S0X]`；多來源逗號分隔；與 `source-map.md` 對齊（缺列則補）。
3. 第三方數字（如裝置端模型參數量、Bounty 金額區間）維持 `TODO(verify)`,或以 S01/S03/S09/S10 校正後填入；彙整成 TODO 清單。
4. 落地 §4 為 `docs/GLOSSARY.md`（英 / 繁 / 一句定義 / 用於 D·P·G）,與 KB 用詞一致。
5. 自我檢查：KB 內每個事實句皆可回溯 `S0X`；無孤兒宣稱。

## 完成定義（逐項勾選）
- [ ] §3 全部小節皆有對應內容,且逐條附 `[S0X]`。
- [ ] 無任何無來源宣稱；`TODO(verify)` 已彙整成清單待解。
- [ ] `source-map.md` 與 KB 一致（每條事實可對應）。
- [ ] `docs/GLOSSARY.md` 完成,與 KB 用詞一致。

## 禁止
- 不得引用 §2 以外來源。
- 不得為「讓敘述更順」而加入未經查證的細節。
- 不得在此階段撰寫面向特定受眾的框架（那是 02–05）。
