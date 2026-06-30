# Task 00 — 研究擷取

## 目標
建立 `sources/source-map.md` 骨架,補齊 `source-index.md`（§2）遺漏章節,並存檔關鍵頁面。
這是所有後續階段的地基:來源與 provenance 不穩,其餘全部不可信。

## 輸入
- `sources/source-index.md`（S01–S13）
- `AGENTS.md`（特別是不變式 #2、#4）

## 不變式（AGENTS.md）
- #2 只收 `security.apple.com` 與 `github.com/apple/*`。
- 任何新章節給新編號 `S14+`,附用途,不重編既有 S01–S13。
- #4 不確定資訊標 `TODO(verify)`,不得引用第三方。

## 步驟
1. 開啟 **S01**,從 **S02（/navigation）** 取完整章節清單；
   把 §2 未列章節（預期:簡介、主要硬體與軟體元件、Apple Security Bounty for PCC 等）新增為 **S14+**。
2. 逐一確認 S01–S13（+新編）連結可達；將 S01/S11/S12/S13 等關鍵頁存檔到 `sources/primary/`,
   檔名用 `S0X-...` 對應。
3. 確認 **S08** 的 VRE 取得方式與**授權條款**（限研究用途）,記入 source-map 備註。
4. 建立 `sources/source-map.md`,欄位：`claim | 來源編號 | 章節定位（頁內錨點/小節）`。
   先把 PLAN §3 的種子事實逐條填為起始列。
5. 比對 S11/S12/S13 與指南差異,標註哪些事實進 KB、哪些僅作背景。

## 完成定義（逐項勾選）
- [ ] §2 章節已對照 S02 補齊（或註明 S02 無新增）。
- [ ] 所有來源連結可達；關鍵頁已存檔 `sources/primary/`。
- [ ] `source-map.md` 已建立且含 §3 全部種子事實列。
- [ ] VRE 授權條款已記錄。

## 禁止
- 不得新增 §2 以外網域之來源。
- 不得在本階段撰寫面向讀者的內容。
