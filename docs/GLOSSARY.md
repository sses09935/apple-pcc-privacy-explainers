# GLOSSARY（術語表）

> 對應 `docs/PLAN.md` §4。目的：三份文件對同一概念**用詞一致**。
> 每詞：英文 / 繁中首選譯名 / 一句定義 / 用於哪些版本（**D**=開發者, **P**=使用者, **G**=大眾）。
>
> 反漂移規則：草稿撰寫時若引入新詞，**先補本表再使用**（對應 `AGENTS.md` 不變式 #6）。

| 英文 | 繁中 | 一句定義 | 用於 |
|---|---|---|---|
| Private Cloud Compute (PCC) | 私有雲端運算 | Apple 為私密 AI 推論打造的雲端系統 | D P G |
| Stateless computation | 無狀態運算 | 用完即棄、不留存個資 | D P G |
| Enforceable guarantees | 可強制執行的保證 | 由技術而非政策保障 | D P |
| No privileged access | 無特權存取 | 無人（含 Apple）能繞過保護讀資料 | D P G |
| Non-targetability | 不可被指定目標 | 無法鎖定特定使用者的資料 | D P |
| Verifiable transparency | 可驗證透明性 | 外部可檢查實際執行的軟體 | D P G |
| Attestation | 證明/認證 | 節點證明自己跑的是某已知軟體 | D（P 用比喻） |
| Transparency log | 透明性日誌 | 公開、僅可附加的軟體紀錄 | D（P/G 用「人人可查的紀錄」） |
| Secure Enclave | 安全隔離區 | 晶片內保護金鑰的子系統 | D（P 提及） |
| Secure Boot | 安全開機 | 只開機簽章驗證過的 OS | D |
| Trusted Execution Monitor (TXM) | 受信執行監控 | 獨立於 kernel 的監控層，只允許 trust cache 涵蓋的碼執行 | D |
| OHTTP relay | OHTTP 中繼 | 去識別來源、阻止指定目標的轉送層 | D（P 用「匿名轉送」） |
| Virtual Research Environment (VRE) | 虛擬研究環境 | Mac 上獨立驗證 PCC 的工具組 | D |
| Confidential VM / confidential computing | 機密虛擬機/機密運算 | 記憶體內資料對主機亦加密隔離 | D |
| Root of trust | 信任根 | 信任鏈的硬體起點 | D |

## 深度機制術語（多為開發者版 D 專用，Phase 1 由 KB 引入）

> 校正自官方專頁（2026-06-22）。`TEM` 經官方確認應為 **TXM**；新增 `SPTM`。

| 英文 | 繁中 | 一句定義 | 用於 |
|---|---|---|---|
| Secure Page Table Monitor (SPTM) | 安全頁表監控 | 開機鏈中啟動記憶體管理、初始化 TXM 的監控層 | D |
| Cryptex | 加密軟體包 | 完整簽署且完整性驗證的獨立軟體分發包（裝 LLM/應用邏輯） | D |
| Restricted Execution Mode (REM) | 受限執行模式 | TXM 強制的單向轉換，之後拒載新 trust cache、縮小攻擊面 | D |
| Ephemeral Data Mode | 短暫資料模式 | 每次開機隨機化資料卷金鑰，保證資料不跨開機留存 | D |
| Data Center Identity Key (DCIK) | 資料中心身分金鑰 | PCC 在 SEP 內產生、用於節點 attestation 的長效身分金鑰 | D |
| Token Granting Token / One-Time Token (TGT / OTT) | 授權權杖／單次權杖 | 以盲簽章建構、與身分不可連結的存取憑證 | D |
| RSA Blind Signatures | RSA 盲簽章 | 使權杖兌換與簽發請求不可連結的密碼學技術（RFC 9474/9578） | D |
| Oblivious HTTP (OHTTP) / Oblivious Relay / Gateway | 遮蔽式 HTTP／中繼／閘道 | 經第三方中繼隱藏來源 IP 的轉送架構 | D（P 用「匿名轉送」） |
| HPKE (Hybrid Public Key Encryption) | 混合公鑰加密 | 用戶端加密請求給閘道公鑰所用 | D |
| Transparency log / log-backed map | 透明性日誌／日誌支撐映射 | append-only 防竄改的軟體量測紀錄；移除可被偵測 | D（P/G 用「人人可查的紀錄」） |

## 用詞政策摘要
- **D（開發者）**：可直接使用全部術語（首次出現附英文）。
- **P（使用者）**：`attestation` → 認證；`transparency log` → 人人可查的紀錄；`OHTTP relay` → 匿名轉送。
- **G（大眾）**：正文**禁止技術名詞**，僅用白話與比喻（見三比喻 M1/M2/M3）。
