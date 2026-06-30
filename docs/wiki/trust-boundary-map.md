# Trust Boundary Map

> **導航與維護輔助，非新事實來源。** 集中處理 PCC 容易被誤讀的信任邊界。
>
> 本檔不引入新事實；安全措辭一律以 `../../content/knowledge-base.md`（特別是 §3.8 準確性紅線、§3.5.4、§3.9）與 `../../sources/source-map.md` 為準。衝突時以 KB／source 為準。
> 無法確認對應位置者標 `TODO: verify`。

## Purpose

PCC 的多數宣稱都有「容易被放大成更強保證」的風險。本檔逐一列出邊界區，給出**安全措辭**與**不安全措辭**對照，作為撰寫與審查時的護欄。對應 [`claim-index.md`](claim-index.md) 的 Accuracy risk 欄。

## Boundary Areas

### 1. Apple Claim vs Independently Verifiable Property

- Safe wording: 「Apple 宣稱…」；「研究者可透過 attestation ↔ 透明性日誌、VRE 比對、公開 binary／源碼分析來檢查…」。
- Unsafe wording: 「已被外部獨立驗證為事實」；「源碼可重現建置證明 binary 與源碼一致」（Apple **未提供** reproducible builds）。
- KB reference: KB §3.5.4、§3.8
- Source-map reference: source-map.md §3.5、§3.8
- Audience-specific caution: 開發者版**全程**區分宣稱 vs 可驗證；使用者版可說「別人能查 Apple 的宣稱」但不深入 reproducible build；大眾版不觸及此技術區分。
- Notes: 對應 claim-index PCC-CLAIM-011、PCC-CLAIM-005。可驗證鏈是「attestation ↔ 透明性日誌」，**不是**「源碼 ↔ binary」。

### 2. PCC Requests vs All Apple Cloud Services

- Safe wording: 「這些保證適用於 **PCC 請求**」。
- Unsafe wording: 「Apple 在所有雲端服務都看不到你的資料」；把 PCC 的性質套用到 Apple 全部雲端產品。
- KB reference: KB §3.8（保證適用 PCC 請求）、§3.2
- Source-map reference: source-map.md §3.8
- Audience-specific caution: 三版皆須把範圍限定在 PCC 請求；大眾版用比喻時，避免暗示「Apple 所有服務都這樣」。
- Notes: 圖（diagram-style §6）不得把 PCC 請求路徑畫成涵蓋全部 Apple 雲端服務。

### 3. Reducing Trust vs Eliminating Trust

- Safe wording: 「PCC **降低**你對 Apple 的信任需求」；「以技術機制而非純政策承諾來強制」。
- Unsafe wording: 「PCC 等於完全不需要信任 Apple」；「完全去信任」。
- KB reference: KB §3.1、§3.2（enforceable guarantees）；專案 README「不主張」段
- Source-map reference: source-map.md §3.1、§3.2
- Audience-specific caution: 使用者版「技術上做不到偷看」須與「完全不必信任」區分；大眾版安心訊息不得滑向「零信任也沒差」。
- Notes: 對應 claim-index PCC-CLAIM-001。

### 4. Google Cloud Extension vs Third-Party Free Processing

- Safe wording: 「Apple 完整保留對 PCC 軟體的控制；裝置只信任 Apple 密碼學核准的 PCC 軟體；binary 仍公開可檢視」。
- Unsafe wording: 「資料交給 Google／第三方任意處理」；「Apple 把使用者資料外包給 Google」。
- KB reference: KB §3.7、§3.8
- Source-map reference: source-map.md §3.7、§3.8
- Audience-specific caution: 開發者版須呈現 confidential VM 隔離、雙信任根、硬體帳本與控制權界線；使用者版強調「Apple 仍掌控簽核」；大眾版若提及，避免「交給別人」的措辭。
- Notes: 對應 claim-index PCC-CLAIM-012。五大核心要求在擴展後不變。

### 5. No Privileged Runtime Access vs Zero Risk

- Safe wording: 「不存在讓 Apple 維運人員繞過隱私保證的特權介面（即使處理重大事故）」。
- Unsafe wording: 「PCC 零風險／不可能被攻破」；把「無特權介面」說成「沒有任何攻擊面」。
- KB reference: KB §3.2 ③、§3.9（已知限界：同質性、sandbox 粒度、無 reproducible builds）
- Source-map reference: source-map.md §3.2
- Audience-specific caution: 開發者版須保留 KB §3.9 的「已知限界（官方自陳）」；使用者／大眾版不得把「沒人能繞過」誇大成「絕對安全」。
- Notes: 對應 claim-index PCC-CLAIM-006。

### 6. Stateless Computation vs No Data Ever Exists

- Safe wording: 「個資只為完成當次請求而使用，回應後不保留（用完即棄）；金鑰每次開機隨機化達成密碼學抹除」。
- Unsafe wording: 「你的資料從不存在」；「PCC 從不接觸你的資料」。
- KB reference: KB §3.2 ①、§3.9（Ephemeral Data Mode）、§3.11（受控、過濾後的有限可觀測性資料）
- Source-map reference: source-map.md §3.2
- Audience-specific caution: 大眾版 M1「自我清空的房間」可表達「用完即棄」，但**不得**暗示「資料從未進入房間」；開發者版須保留「未來快取的密碼學例外」但書與維運出口的有限保留。
- Notes: 對應 claim-index PCC-CLAIM-007、PCC-CLAIM-010。

---

## 與其他檔的關係

- 本檔的每個邊界對應 `claim-index.md` 的 Accuracy risk 欄與 `knowledge-base.md` §3.8。
- 圖表的信任邊界畫法見 [`../../design/diagram-style.md`](../../design/diagram-style.md) §6。
- 撰寫／稽核時，本檔是「措辭護欄」；遇到本檔未涵蓋的新邊界，先回 KB §3.8 確認，再於此補列（標 `TODO: verify` 直到確認）。
