# Bilingual Term Map — PCC Privacy Explainers

> PCC 專用繁中 / 英文術語對照與使用規則。配合 [`docs/I18N.md`](I18N.md)（雙語治理）與 [`docs/GLOSSARY.md`](GLOSSARY.md)（繁中術語表）。
> 原則：英文是與繁中來源對齊的翻譯；**術語不得在翻譯中改變 claim 強度**（不要把可驗證邊界寫成 absolute guarantee）。

## 1. 核心定位術語

| 繁中 | English | 使用規則 |
|---|---|---|
| 私有雲端運算 | Private Cloud Compute | 第一次出現寫 Private Cloud Compute（PCC） |
| PCC | PCC | 不要重新翻譯縮寫 |
| 可驗證邊界 | verifiable boundary | 不要翻成 absolute guarantee |
| 雲端推論 | cloud inference | 保留 inference，不要寫成 generic cloud processing |
| 端側處理 | on-device processing | 不要與 local-only 混用 |
| 來源邊界 | source boundary | 用於 claim governance |
| 不能直接推論 | cannot directly infer | 不要寫成 impossible unless source says impossible |
| 官方文件顯示 | official documentation indicates | 不要寫成 Apple proves |
| 查核邊界 | audit boundary / verification boundary | 依上下文選用 |
| 常見誤解 | common misconception | 用於 misconception callout |

## 2. PCC 五大要求（官方標準措辭）

| 繁中 | English | 使用規則 |
|---|---|---|
| 無狀態運算 | Stateless computation | 用官方詞；不要寫成 "deletes everything" 式誇大 |
| 可強制執行的保證 | Enforceable guarantees | 強調 enforceable by technology，非 policy |
| 無特權執行期存取 | No privileged runtime access | 含 Apple 維運在內；不要寫成 "no access ever" |
| 不可被指定目標 | Non-targetability | 不要寫成 "cannot be attacked" |
| 可驗證透明性 | Verifiable transparency | 指軟體可驗證；不要擴張成 "everything is verifiable" |

## 3. 技術機制術語（首次出現保留英文＋縮寫）

| 繁中 | English | 使用規則 |
|---|---|---|
| 認證 / 證明 | attestation | 大眾版用「人人可查的紀錄／證明」白話；技術版用 attestation |
| 透明性日誌 | transparency log / log-backed map | append-only、移除可被偵測；不要寫成 "immutable forever" |
| 安全隔離區 | Secure Enclave（SEP） | 首次寫全名＋SEP |
| 安全開機 | Secure Boot | — |
| 受信執行監控 | Trusted Execution Monitor（TXM） | 官方名為 TXM，**非** TEM |
| 安全頁表監控 | Secure Page Table Monitor（SPTM） | — |
| 受限執行模式 | Restricted Execution Mode（REM） | — |
| 短暫資料模式 | Ephemeral Data Mode | — |
| 加密軟體包 | cryptex | 小寫；獨立簽署的軟體分發包 |
| 遮蔽式 HTTP | Oblivious HTTP（OHTTP） | 含 Oblivious Relay / Oblivious Gateway |
| 混合公鑰加密 | HPKE (Hybrid Public Key Encryption) | — |
| 盲簽章 | RSA Blind Signatures | RFC 9474 / 9578；使兌換與簽發不可連結 |
| 匿名轉送 / 中繼站 | relay (anonymous forwarding) | 大眾版用「匿名轉送」白話 |
| 一次性權杖 | One-Time Token（OTT）/ Token Granting Token（TGT） | 與身分不可連結 |
| 推論編組 | ensemble | 最多 8 節點 |

## 4. 準確性紅線措辭（雙語都必須守）

| 不要寫（避免） | 要寫（偏向） |
|---|---|
| Apple cannot know anything / Apple 永遠看不到任何東西 | guarantees apply to PCC requests; the threat model has assumed boundaries |
| absolute privacy / 絕對隱私 | a verifiable privacy boundary |
| completely secure / 完全安全 | designed so the five requirements are not violated even under attack |
| reproducible builds / 可重現建置（宣稱可逐位元組對照） | the verifiable chain is attestation ↔ transparency log, not source ↔ binary |
| data never goes to the cloud / 資料永遠不上雲 | on-device when possible; only harder requests go to PCC |
| handed to Google to use freely / 交給 Google 任意處理 | Apple retains control; the device only trusts Apple-approved PCC software |
| Apple proves… / Apple 證明… | the official documentation indicates… |

## 5. 受眾語氣差異

- **developer**：可用全部技術詞＋縮寫，全程「claimed vs verifiable」對照。
- **ai-user**：技術詞給白話對應（attestation→verification / a record anyone can check）。
- **general**：正文**無技術名詞**；英文版同樣 plain English、用比喻承載，技術詞只在文末 provenance 出現。

> 新增術語：先補本表，再在內文使用（呼應 `AGENTS.md` #6 與 `GLOSSARY.md`）。英文若無官方標準譯名，保留英文原文。
