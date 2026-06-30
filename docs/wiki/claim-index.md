# Claim Index

> **導航層（navigation layer），非事實來源。** 供維護者與 AI agent 在 claim → source → KB → audience → diagram 之間追蹤。
>
> 本檔**不引入任何新事實**，也不得寫得比 KB 更強。權威事實來源仍為：
>
> - `../../content/knowledge-base.md`（技術事實）
> - `../../sources/source-index.md`（來源權威）
> - `../../sources/source-map.md`（claim → 來源對照）
>
> 若本檔與上述任一檔衝突，**以 KB 與 source 檔為準**。不確定的對應一律標 `TODO: verify`，不臆測。

## Purpose

把分散在 KB、source-map、audience 草稿與圖表中的對應關係，集中成一份可瀏覽的索引，讓：

- agent 修改某 claim 時，能一眼看到它牽動哪些來源、章節、受眾版本與圖。
- 維護者檢查某主題是否「事實一致、來源完整、受眾不漂移」。

## How to Use This File

- 從某個 claim group 出發，沿「Source IDs → Knowledge base location → 圖／受眾」追蹤。
- **要改技術事實**：去 `knowledge-base.md`，不要在本檔改。
- **要改來源**：去 `source-index.md` / `source-map.md`。
- **要改呈現**：去 `DESIGN.md` / `design/*` / audience 草稿。
- 看到 `TODO: verify`：表示對應位置尚未人工確認，請查證後再更新，不要直接當事實使用。

> 來源編號（`S0X`）定義見 `source-index.md`；以下僅為導航引用，非新增來源。

## Claim Groups

### PCC-CLAIM-001: PCC 的目的——把端上隱私模型延伸到雲端 AI 運算

- Claim summary: Apple Intelligence 的複雜請求需要雲端大型基礎模型；傳統雲端安全模型無法讓人驗證／強制隱私承諾，PCC 的目標是把裝置級安全與隱私帶進雲端，並以**技術機制**（而非政策）強制達成。
- Source IDs: S11, S03
- Knowledge base location: KB §3.1
- Source map location: source-map.md §3.1
- Audience usage:
  - Developer: ch1「為何 server AI 需要新模型」（D1）
  - Power User: ch1「兩種隱私承諾：口頭 vs 技術」
  - General: ch1–ch3「AI 需要看你的東西 / 平常有人看得到 / Apple 的點子」
- Related diagrams: D1
- Accuracy risk: 不得寫成「PCC 讓你完全不必信任 Apple」；是**降低**而非**消除**信任需求（見 trust-boundary-map §3）。
- Notes: 目的句以 KB §3.1 為上限，勿加強。

### PCC-CLAIM-002: 五大核心要求

- Claim summary: PCC 圍繞五項核心要求設計——①無狀態運算 ②可強制執行的保證 ③無特權執行期存取 ④不可被指定目標 ⑤可驗證的透明性。
- Source IDs: S03, S20, S21, S22, S05, S11
- Knowledge base location: KB §3.2（①–⑤）
- Source map location: source-map.md §3.2
- Audience usage:
  - Developer: ch2「五大核心要求（深度）」（D5，每項：定義／機制／如何強制／可驗證點）
  - Power User: ch2「五大要求類比」（D5 簡化）
  - General: ch4a/4b/4c 以三比喻承載其中三項（M1/M2/M3）
- Related diagrams: D5（總覽）；M1/M2/M3（大眾化承載 ①③⑤）
- Accuracy risk: 五項是**設計要求/保證**；不得整體改寫成「已被外部獨立驗證的事實」。
- Notes: 各子項另見 CLAIM-004/005/006/007/008。

### PCC-CLAIM-003: 請求生命週期（端到端）

- Claim summary: 裝置為策略根，先驗證節點 attestation 再把請求金鑰封裝給該節點；經匿名權杖與第三方 relay 送達；僅封裝給「量測值在透明性日誌內」的節點；處理後刪除。
- Source IDs: S04, S05（細節 S23, S25）
- Knowledge base location: KB §3.3（含 §3.3.1 Attested Request Handling）
- Source map location: source-map.md §3.3
- Audience usage:
  - Developer: ch4「請求生命週期」（D3）＋ ch5「Attested Request Handling」
  - Power User: ch3「你的請求的旅程」（D3 簡化）
  - General: ch5「手機怎麼決定」（D1 大眾化）
- Related diagrams: D3（生命週期）；D1（卸載決策，大眾）
- Accuracy risk: 圖／文不得新增 KB 未述的通道或節點；簡化處須標明（diagram-style §7）。
- Notes: §3.3.1 細節（CloudBoard、REK/DEK、k 子集）僅開發者版使用。

### PCC-CLAIM-004: OHTTP / relay / 請求不可連結（unlinkability）

- Claim summary: 所有請求經第三方 Oblivious Relay 隱藏來源 IP（OHTTP chunked 變體）；以 RSA Blind Signatures（RFC 9474 / Privacy Pass RFC 9578）建構的 TGT/OTT 使權杖兌換與請求**密碼學不可連結**；簽發身分與請求路由分離。
- Source IDs: S04, S11（relay 營運商：Cloudflare、Fastly）
- Knowledge base location: KB §3.2 ④、KB §3.3（步驟 3–4、8）
- Source map location: source-map.md §3.2、§3.3
- Audience usage:
  - Developer: ch4（TGT/OTT、OHTTP、relay、金鑰透明）
  - Power User: ch3「匿名轉送、用完即棄」
  - General: ch5（簡化為「送到上鎖的雲」）
- Related diagrams: D3
- Accuracy risk: relay 仍會暴露概略地理區域、請求帶非識別性 header（KB §3.9 已知限界）；不得寫成「完全匿名、零 metadata」。
- Notes: 「不可連結」是密碼學性質，非「無任何 metadata」。

### PCC-CLAIM-005: Attestation（硬體根植 + 節點驗證）

- Claim summary: SEP 以硬體身分簽署軟體量測值；裝置（及代驗的 proxy 節點）只把請求金鑰封裝給「attested 量測值符合公開透明性日誌中某發布」的節點。
- Source IDs: S14, S16, S04, S05, S23
- Knowledge base location: KB §3.3（步驟 5、7）、§3.3.1、§3.4.1、§3.4.2
- Source map location: source-map.md §3.3、§3.4
- Audience usage:
  - Developer: ch3「信任根與開機鏈」（D2）＋ ch5「節點驗證三檢查」
  - Power User: ch4「為什麼可驗證是關鍵」（D4 簡化，白話「認證」）
  - General: 以 M3「人人都能查驗的收據」間接承載
- Related diagrams: D2（信任鏈）、D4（attestation + 日誌）
- Accuracy risk: 區分「Apple 宣稱」與「可獨立驗證」；attestation 鏈可驗證，但**非**「源碼 ↔ binary 可重現建置」（見 CLAIM-011）。
- Notes: REM（Restricted Execution Mode）為**不同概念**，見 CLAIM-006 Notes。

### PCC-CLAIM-006: 無特權執行期存取（No privileged runtime access）

- Claim summary: PCC 不得有讓 SRE 繞過隱私保證的特權介面（即使處理重大事故），也不得在執行期擴大特權；節點移除/停用 shell、直譯器、除錯器、JIT。
- Source IDs: S03, S21, S16
- Knowledge base location: KB §3.2 ③、§3.4.3（TXM、REM）
- Source map location: source-map.md §3.2、§3.4
- Audience usage:
  - Developer: ch2 ③、ch3（TXM/REM 機制）、ch9「管理與維運」
  - Power User: ch2 類比（白話「技術上做不到偷看」）
  - General: ch4b「只有你有鑰匙的盒子」（M2）
- Related diagrams: D2；M2（大眾比喻）
- Accuracy risk: 「無特權存取」**不等於**「零風險」；KB §3.9 自陳已知限界（同質性、sandbox 粒度等）。
- Notes: **REM（Restricted Execution Mode，KB §3.4.3）** 與 **VRE（Virtual Research Environment，CLAIM-009）** 是兩個不同東西，勿混用；REM 是節點上限制執行的單向轉換，VRE 是研究者用的虛擬環境。

### PCC-CLAIM-007: 無狀態運算 / 用完即棄（Stateless computation）

- Claim summary: PCC 只為完成當次請求使用個資；個資不提供給使用者以外任何人（含 Apple，即使處理中）；回應送回後不得保留（含 logging/debugging）。機制：Ephemeral Data Mode、每次開機隨機化金鑰、`mobile_obliterator`。
- Source IDs: S03, S20, S16
- Knowledge base location: KB §3.2 ①、§3.9（Ephemeral Data Mode）
- Source map location: source-map.md §3.2
- Audience usage:
  - Developer: ch2 ①（含未來快取的密碼學例外）
  - Power User: ch2 類比「用完即丟、不留底」
  - General: ch4a「用完就自我清空的房間」（M1）
- Related diagrams: M1（大眾比喻）
- Accuracy risk: 「無狀態」**不等於**「資料從不存在」；資料在處理當下存在，只是用完即棄、不持久（trust-boundary-map §6）。
- Notes: 未來快取例外仍以密碼學金鑰控制維持無狀態，勿略過此但書。

### PCC-CLAIM-008: 不可被指定目標（Non-targetability）

- Claim summary: 攻擊者若不對整個 PCC 系統發動廣泛（易偵測）攻擊，就不應能鎖定特定使用者的個資；以不可連結權杖 + 第三方 relay + 節點選擇（k 子集）達成。
- Source IDs: S22, S04, S11, S23
- Knowledge base location: KB §3.2 ④、§3.3.1（節點選擇與 k）、§3.9 ③
- Source map location: source-map.md §3.2、§3.3
- Audience usage:
  - Developer: ch2 ④、ch5（k 子集）、ch10（威脅模型）
  - Power User: ch2 類比「沒辦法被點名鎖定」
  - General: TODO: verify（大眾版未單列此項；可能併入整體安心訊息）
- Related diagrams: D7（威脅模型/信任邊界）
- Accuracy risk: 是「提高鎖定成本/使其易被偵測」，非「絕對不可能被鎖定」。
- Notes: 與 CLAIM-004（unlinkability）機制重疊但概念不同。

### PCC-CLAIM-009: 可驗證透明性 / 透明性日誌 + VRE

- Claim summary: PCC 把每個生產 build 的軟體映像公開供研究；量測值發布到 append-only、密碼學防竄改的透明性日誌（移除可被偵測，log-backed map，類比 iMessage CKV）；90 天發布政策；VRE 是 Apple 首次釋出的研究工具組，可在 Apple silicon Mac 上模擬 PCC 節點、驗證日誌一致性。
- Source IDs: S05, S30, S43（日誌）；S12, S32, S33, S34, S18, S08（VRE/工具/源碼）
- Knowledge base location: KB §3.2 ⑤、§3.5.1、§3.5.2、§3.5.3
- Source map location: source-map.md §3.2、§3.3、§3.5
- Audience usage:
  - Developer: ch7「可驗證透明性」（D4）＋ ch8「VRE 實戰」（D6）
  - Power User: ch4「為什麼可驗證是關鍵」（D4 簡化）
  - General: ch4c「人人都能查驗的收據」（M3）
- Related diagrams: D4（attestation + 日誌）、D6（VRE 流程）；M3（大眾比喻）
- Accuracy risk: 透明性是**可強制的保證**且可被研究者驗證；但仍須區分「日誌一致性可驗證」與「binary 由源碼可重現」（後者 Apple 未提供，CLAIM-011）。
- Notes: VRE（Virtual Research Environment）≠ REM（見 CLAIM-006）。VRE 界限見 KB §3.5.4。

### PCC-CLAIM-010: 資料保留 / 請求後處理（Data retention）

- Claim summary: 回應送回後不得保留個資；金鑰每次重開機隨機、不持久化，達成密碼學抹除；Ephemeral Data Mode 確保即使重設也無法在保留使用者資料下重啟內省工具。
- Source IDs: S03, S04, S16, S07
- Knowledge base location: KB §3.2 ①、§3.3（步驟 4/刪除）、§3.9 ①、§3.11
- Source map location: source-map.md §3.2、§3.3
- Audience usage:
  - Developer: ch2 ①、ch9「管理與維運」（log/metrics/crash 過濾與保留期）
  - Power User: ch3「用完即棄」
  - General: ch4a「自我清空的房間」（M1）
- Related diagrams: M1
- Accuracy risk: 可觀測性資料（log/metrics）**有**受控、過濾後的有限保留（KB §3.9/§3.11）；不得寫成「完全不產生任何紀錄」。
- Notes: 與 CLAIM-007 高度相關；此 group 聚焦「請求後」與維運出口。

### PCC-CLAIM-011: Apple 宣稱 vs 可獨立驗證的性質

- Claim summary: 開發者版須區分「Apple 宣稱」與「可獨立驗證」。可驗證：attestation ↔ 透明性日誌、VRE 比對、公開 binary/源碼分析。**不能**：Apple 未提供 reproducible builds，故公開源碼無法證明「發布 binary 由該源碼編譯」，源碼僅為分析輔助。
- Source IDs: S05, S07, S12
- Knowledge base location: KB §3.5.4、§3.8（準確性紅線）
- Source map location: source-map.md §3.5、§3.8
- Audience usage:
  - Developer: 全程貫穿（ch2/ch5/ch6/ch7「宣稱 vs 可驗證」對照）
  - Power User: ch4「別人能查 Apple 的宣稱」（不深入 reproducible build 議題）
  - General: 不直接出現（避免技術名詞）
- Related diagrams: D4（標示「可驗證點」）
- Accuracy risk: **核心紅線**——不得把 Apple 宣稱呈現成已被外部獨立驗證的事實；不得宣稱「可重現建置」。
- Notes: 此 group 是其他多數 group 的準確性護欄，對應 trust-boundary-map §1。

### PCC-CLAIM-012: 2026 擴展——PCC on Google Cloud

- Claim summary: Apple 首次把 PCC 延伸到第三方基礎設施（與 Google、NVIDIA 合作，於 Google Cloud 用 NVIDIA GPU）；五大核心要求不變；attested 金鑰置於與外部輸入隔離的專屬 confidential VM；維護所有硬體的可驗證 append-only 帳本；Apple 完整保留 PCC 軟體控制，裝置只信任 Apple 密碼學簽核的軟體。
- Source IDs: S13
- Knowledge base location: KB §3.7
- Source map location: source-map.md §3.7
- Audience usage:
  - Developer: ch12「2026 擴展」（D8）
  - Power User: ch6「標準在擴大，但 Apple 仍掌控簽核」
  - General: TODO: verify（大眾版大綱未明列 2026 擴展章節）
- Related diagrams: D8（Google Cloud 拓樸）
- Accuracy risk: **核心紅線**——擴展**不等於**把資料交給第三方任意處理；必須呈現 Apple 控制權與密碼學簽核（trust-boundary-map §4）。
- Notes: 目前全數來自 S13 部落格；若指南另有對應章節錨點可補（KB 文末 TODO 4）。

---

## 涵蓋度備註（供後續補強）

- 上述 group 對齊任務要求主題清單；**General 受眾在 CLAIM-008 / CLAIM-012 的對應標為 `TODO: verify`**，因大眾版大綱未單列這兩項。
- 其他主題（推論引擎 §3.10、管理維運 §3.11、Bounty §3.6、硬體完整性 §3.4）尚未獨立成 claim group，可於後續擴充；新增時一律先回 KB／source-map 取對應，不臆測。
