# Audience Spec — 開發者版（`PCC-開發者版.pdf`）

> 受眾隔離層（AGENTS #8）。此檔定義「深度與框架」，**不新增事實**；事實一律引自 `content/knowledge-base.md`。
> 草稿（`drafts/01-developer.md`）必須嚴格遵循本檔的章節結構與用詞政策。

## Persona
- **假設背景**：平台／安全工程師或進階開發者。熟悉公鑰密碼學、TEE／Secure Enclave、attestation、code signing、threat modeling；理解 iOS 安全模型基礎。讀本文是想知道 PCC 的**機制細節**與**如何親手驗證**。
- **詞彙層級**：可直接使用 GLOSSARY 全部標 **D** 的詞 + 「深度機制術語」表（TXM、SPTM、SSR、REM、cryptex、DCIK、TGT/OTT、HPKE、OHTTP、HPKE）。術語**首次出現附英文**；RFC 編號、暫存器名（SEAL_DATA）、daemon 名（`privatecloudcomputed`）可出現。
- **深度**：到機制／協定層。允許虛擬碼、指令、流程圖、表格。
- **篇幅目標**：**28–40 頁**（非灌水；稽核會查）。
- **語氣**：精確、技術、中性。全程區分「**Apple 宣稱**」與「**可獨立驗證**」。
- **禁用清單**：不誇大保證（不寫「永遠看不到」）；不引用第三方數字；不為湊頁數灌水。

## 用詞政策
- **可直接使用**：五大要求英文原名、attestation、transparency log、Secure Enclave、Secure Boot、TXM/SPTM、cryptex、SSR、REM、Ephemeral Data Mode、OHTTP、HPKE、TGT/OTT、RSA Blind Signatures、DCIK、Image4/APTicket、REK。
- **首次附英文**：所有術語第一次出現時 `繁中（English）`。
- **不需類比**：本版以精確為先；比喻僅在點題時輔助，不取代機制描述。

## 逐節大綱（轉錄自 PLAN §5.1，來源錨點已依 Phase 0/1 更新）

| # | 章節 | 頁 | 內容重點 | 圖 | 來源 |
|---|---|---|---|---|---|
| 0 | 封面 + 摘要 + 如何閱讀 | 2 | 一頁摘要（五大要求各一句）、讀者假設、章節地圖 | D5 | S03, S11 |
| 1 | 為何 server AI 需要新模型 | 3 | 未加密存取的必然、傳統雲端安全的缺口（不可驗證/不可強制）、on-device 取捨 | D1 | S11 |
| 2 | 五大核心要求（深度） | 6–7 | 每要求一節：定義／機制／如何強制／可驗證點 | D5 | S03, S20, S21, S22, S05, S11 |
| 3 | 信任根與開機鏈 | 3–4 | Apple silicon 三特性、Secure Enclave/UID/PKA/DCIK、Boot ROM→iBoot→SPTM→TXM、SEAL_DATA；attestation 如何根植硬體不可變基礎 | D2 | S14, S16 |
| 4 | 請求生命週期（端到端） | 4–5 | orchestration（modelmanagerd）→TGT/OTT 匿名權杖→OHTTP relay（Cloudflare/Fastly）→節點 attestation 驗證→金鑰封裝至 log 內節點 REK→proxy/compute→transitive trust→銷毀 | D3 | S04, S05 |
| 5 | Attested Request Handling | 3–4 | CloudBoard daemon、DEK/REK/HPKE 通道、節點驗證三檢查＋安全政策、節點選擇與 k、請求時序綜整 | — | S23 |
| 6 | 推論引擎與分散式推論 | 3–4 | TIE/MetalLM/AFM-server、ensemble（≤8）、AppleCIOMesh、ensemble attestation、KV cache handoff、其他應用（PCC Agent/Visual Lookup/PIR） | — | S26, S07 |
| 7 | 可驗證透明性 | 3–4 | log 結構（append-only、log-backed map，類比 iMessage CKV）、90 天政策、能與不能（無 reproducible builds）、與 SGX/Nitro 對比 | D4 | S05, S07 |
| 8 | 動手驗證：VRE 實戰 | 4–5 | 環境需求、pccvre 流程、attestation parse/verify、進一步研究能力、源碼導覽 | D6 | S08, S12, S32, S33, S34, S18 |
| 9 | 管理與維運 | 2–3 | 移除/替換的工具、metrics/log/crash 過濾、遠端診斷、安全事件、防火牆 denaliSE | — | S06 |
| 10 | 威脅模型與攻擊面 | 3–4 | 三情境＋縱深防禦、PCC Gateway 攻擊、工程師憑證、已知限界 | D7 | S07 |
| 11 | Apple Security Bounty（PCC） | 1 | 五級獎勵金額/提交要求 | — | S09, S10, S12 |
| 12 | 2026 擴展：PCC on Google Cloud | 1–2 | 相同五要求、confidential VM、雙信任根、硬體帳本、Apple 保留控制 | D8 | S13 |
| 13 | 對你系統的啟示 | 1 | 把「可驗證」當設計目標、控制面/資料面隔離、誠實標示界線 | — | — |
| 14 | 附錄 | 2–3 | 完整 GLOSSARY、`[S01–S44]` 來源對照表、延伸驗證清單 | — | 全 |

> Phase 6b（擴寫）後，原 §5.1 的 0–11 章深化為 **0–14**：把請求處理（§5）、推論引擎（§6）、管理維運（§9）獨立成章，事實源 S23/S26/S06 已補入 KB。

## 三問題對應
- **為何要做**：ch1。
- **如何做到**：ch2（要求）→ ch3（信任根）→ ch4（生命週期）→ ch5（請求處理）→ ch6（推論）→ ch7（透明性）→ ch8（VRE 實證）→ ch9（維運）→ ch10（威脅模型）。
- **做到代表什麼**：ch11（Bounty/驗證生態）、ch12（跨硬體延伸）、ch13（對你系統的啟示）。

## 形式
`[S0X]` 註腳式引用、流程圖、表格、必要處虛擬碼/碼區塊；ch2/ch5/ch6 維持「宣稱 vs 可驗證」對照。
