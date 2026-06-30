# Source Map（claim → 來源對照）

> Phase 0 產出。每條事實 → 來源編號（見 `source-index.md`）+ 章節定位 + 進 KB / 僅背景。
> 不變式：KB 每條事實、草稿每個事實句都必須能對應到此表的 `S0X`（AGENTS #3）。
> 標記說明：**KB** = 進 `knowledge-base.md`；**背景** = 僅供脈絡，不直接成為事實句；
> `TODO(verify)` = 需在 Phase 1 以 S01–S07 原文（瀏覽器）校正。
>
> 擷取方式與限制（2026-06-22）：指南章節（S01–S07, S14–S19）為 JS 渲染，本階段以
> `security.apple.com` 站內搜尋確認 URL 存在；事實內容主要來自 S11/S12/S13 官方部落格之
> WebFetch 擷取摘要（**非逐字**），數字與機制名稱於 Phase 1 需對指南原文再校。

## §3.1 動機：為何 server AI 需要新模型
| claim | 來源 | 章節定位 | 去向 |
|---|---|---|---|
| 雲端 AI 需對請求/個資未加密存取，無法沿用端到端加密 | S11 | blog「motivation」段 | KB |
| 傳統雲端安全模型缺口：隱私宣稱難驗證、難強制 | S11, S03 | blog；Core Requirements | KB |
| on-device 優勢（使用者掌控、可檢視、Apple 無特權）需「帶進雲端」 | S11 | blog 開篇 | KB |

## §3.2 五大核心要求
| claim | 來源 | 章節定位 | 去向 |
|---|---|---|---|
| ①無狀態運算 + ②可強制執行的保證（用完即棄、Apple 不可得；技術而非政策、避開 TLS-terminating LB 等難推理元件） | S20, S03, S11 | statelessandenforcable（專頁，①②合一）；corerequirements；blog | KB |
| ③無特權存取 No privileged runtime access（無 SSH/remote shell；Apple 維運不可得） | S21, S03, S11 | noprivilegedaccess（專頁）；blog | KB |
| ④不可被指定目標 Non-targetability（OHTTP relay 去識別、負載平衡阻止鎖定節點） | S22, S04, S11 | nontargetability（專頁）；requestflow；blog | KB |
| ⑤可驗證透明性 Verifiable transparency（append-only log；裝置只與 log 內節點通訊） | S05, S11 | verifiabletransparency（專頁）；blog | KB |

## §3.3 請求生命週期（端到端）
| claim | 來源 | 章節定位 | 去向 |
|---|---|---|---|
| 裝置直接把請求加密給「已驗證 PCC 節點公鑰」，繞過信任邊界外的 LB | S04, S11 | requestflow；blog | KB |
| 單次用憑證基於 RSA Blind Signatures；metadata 不含 PII | S04, S11 | requestflow；blog | KB（已確認 RFC 9474/9578） |
| 第三方營運 OHTTP relay 遮蔽來源 IP | S04, S11 | requestflow | KB |
| 回應後刪除；金鑰每次重開機隨機、不持久化 → 密碼學抹除 | S04, S11 | requestflow；blog | KB |
| 裝置代為驗證其他節點 attestation（transitive trust）；attested 請求處理保留客戶端匿名 | S25, S23 | transitivetrust；requesthandling | KB |
| 發布簽入 log 後移除即可被偵測（log-backed map，類比 iMessage Key Transparency） | S05, S30, S43 | verifiabletransparency；releasetransparency；appendix_transparencylog | KB（已確認＝iMessage CKV 結構） |

## §3.4 硬體/軟體支柱
| claim | 來源 | 章節定位 | 去向 |
|---|---|---|---|
| 自研 Apple silicon 伺服器；Secure Enclave、Secure Boot | S14, S15, S11 | hardwarerootoftrust；hardwareintegrity；blog | KB |
| Hardened OS（iOS/macOS 子集）、Code Signing、sandboxing、Swift on Server（記憶體安全） | S16, S17, S11 | softwarefoundations；softwarelayering | KB |
| Trusted Execution Monitor（只跑簽章驗證過的碼） | S16, S11 | softwarefoundations | KB（已確認 TXM） |
| Secure Enclave UID 憑證驗證硬體真實性；attestation 根植硬體不可變基礎 | S14, S11 | hardwarerootoftrust | KB |
| 端上優先：簡單任務裝置端較小模型，超出才卸載到 PCC | S11 | blog | KB |
| 裝置端模型精確參數量 | — | — | **TODO(verify)**：不引用第三方數字；待 S01/S03 |
| PCC 映像將 sepOS 韌體與 iBoot bootloader 以明文包含 | S11, S12 | blog | KB |

## §3.5 可驗證性與工具（VRE）
| claim | 來源 | 章節定位 | 去向 |
|---|---|---|---|
| VRE：Apple 首次為其平台釋出的研究工具組 | S12 | blog | KB |
| VRE 能力：列出/檢視發布、驗 log 一致性、下載 binary、虛擬環境 boot、對 demo 模型推論、改/除錯 | S12, S32, S34, S18 | blog；virtualresearchenvironment；vreinteraction；inspectingreleases | KB |
| 含虛擬 SEP（首次可研究該元件）、paravirtualized graphics | S12, S32 | blog；virtualresearchenvironment | KB |
| VRE 取得：Apple silicon Mac、16GB+ 統一記憶體、macOS Sequoia 15.1 Developer Preview | S12, S33 | blog；vresetup | KB |
| research variant / shadow tunneling（深入研究、以可控 proxy 取代 cloud apps） | S35, S36 | vreresearchvariant；vreshadow | 背景（開發者版 §5.1 ch6 可用） |
| binary 90 天發布政策（納入 log 後 90 天內，或相關更新可得時，以較早者為準） | S11, S12 | blog | KB |
| 開源元件：CloudAttestation、Thimble（privatecloudcomputed daemon）、splunkloggingd、srd_tools | S08, S12 | repo；blog | KB |
| **S08 授權**：Private Cloud Compute Source Code Internal Use License —— 自下載起 90 天、限單一 Apple 電腦、僅供驗證 PCC 安全/隱私之用、**禁止再散布**、AS IS、加州法管轄；不接受外部 code 貢獻 | S08 | LICENSE；CONTRIBUTING.md | 背景（**重要**：本 repo 開源時不得內含 S08 源碼） |

## §3.6 Apple Security Bounty（PCC）
| claim | 來源 | 章節定位 | 去向 |
|---|---|---|---|
| 三大類對齊最關鍵威脅：意外資料揭露 / 來自請求的外部入侵 / 實體或內部存取 | S07, S09, S10, S12 | attacks；bounty；blog | KB |
| 官方獎勵上限（S12 公布）：遠端任意碼執行+entitlements **$1,000,000**；信任邊界外取得使用者請求資料 **$250,000**；具特權網路位置存取請求資料 **$150,000**；未經 attest 之碼執行 **$100,000**；意外資料揭露（部署/設定）**$50,000** | S12 | blog 表格 | KB（取代舊「報導區間」；仍可對 S09/S10 再校） |
| 即使不符既定類別，重大影響仍評估 | S12 | blog | KB |

## §3.7 2026 擴展：PCC on Google Cloud
| claim | 來源 | 章節定位 | 去向 |
|---|---|---|---|
| 擴展到自家資料中心之外，與 Google、NVIDIA 合作於 Google Cloud（NVIDIA GPU） | S13 | blog | KB |
| 新一代 Apple Foundation Models 借助 Gemini 系列技術 | S13 | blog | KB |
| 五大核心要求不變（逐字列出五項） | S13 | blog | KB |
| 架構：每請求初始網路解析於獨立 namespace 專屬 process；共用推論軟體短 TTL 回收；attested 金鑰置於與外部輸入隔離之專屬 confidential VM | S13 | blog | KB |
| 供應鏈：所有 Google Cloud 硬體之可驗證 append-only 帳本；可被濫用元件之 attestation 根植「至少兩個獨立廠商信任根」 | S13 | blog | KB |
| 關鍵界線：Apple 完整保留 PCC 軟體控制；裝置只信任 Apple 加密簽核之 PCC 軟體 | S13 | blog | KB |

## §3.8 準確性紅線（QA 必查，非事實句）
| 紅線 | 來源 |
|---|---|
| 不寫「Apple 永遠看不到任何東西」；保證適用 PCC 請求、威脅模型有假設邊界 | S07 |
| 開發者版區分「Apple 宣稱」vs「可獨立驗證」（VRE/log/binary 檢視；**非**可重現 build——Apple 未提供 reproducible builds） | S05, S07, S12 |
| S13 擴展 ≠ 把資料交給 Google 任意處理 | S13 |
| 不確定名稱/數字 → `TODO(verify)`，不以第三方填補 | — |

## 待解 TODO(verify) 清單（交棒 Phase 1）
1. ~~S02 完整 TOC 順序與遺漏章節~~ → **已解（2026-06-22，Claude in Chrome 抓取，存 `primary/S02-navigation.md`，補進 S14–S44）**。
2. 裝置端模型參數量（不引用第三方；待 S01/S03）。**未解**——官方專頁 §3.1–§3.5 未給。
3. ~~RSA Blind Signatures、Trusted Execution Monitor、log-backed map 等名詞~~ → **已解（Phase 1，讀 S04/S05/S16）**：確認為 **TXM**（非 TEM）、RSA Blind Signatures = RFC 9474/Privacy Pass 9578、log-backed map 確為 iMessage CKV 同結構。
4. ~~五大要求逐字官方措辭~~ → **已解（Phase 1，讀 S03 + 確認專頁存在）**：KB §3.2 已採官方標準措辭。
5. ~~新發現相關章節待評估是否進 KB~~ → **已解（Phase 6b）**：Stateless Inference（S26）、Attested Request Handling（S23）、Management（S06）已讀並入 KB §3.3.1/§3.10/§3.11；PCC Agent/Visual Lookup/PIR 以 S26/S07 概述入開發者版 §6.5；Apple Intelligence Report（S44）用於開發者版 §8。
6. ~~§3.6 三大類別原始分類名稱~~ → **已解（Phase 7）**：三大威脅情境＝ S07 明列之三類；五級金額為 S12 表格。
7. **唯一未解**：裝置端模型參數量（官方未公布、不引第三方）。

## Phase 1 新增來源錨點（讀過官方專頁）
S03（五大要求標準措辭）、S04（TGT/OTT、RSA Blind Sig、OHTTP、Cloudflare/Fastly、REK、orchestration daemons）、S05（90 天、log-backed map、device-wraps-key-to-logged-node、transitive trust）、S14（Apple silicon 三特性、SEP/UID/DCIK、Boot ROM/SEAL_DATA、PKA attestation）、S16（hardened iOS 子集、停用 shell/JIT/debugger、cryptex、TXM/SPTM、SSR、REM、Ephemeral Data Mode、mobile_obliterator）。存檔：`primary/S02-navigation.md`。
