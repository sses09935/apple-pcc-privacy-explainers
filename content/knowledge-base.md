# Knowledge Base（唯一事實庫）

> **單一真實來源**。三份草稿只能引用本檔，不得新增事實（AGENTS #1）。
> 每條事實附 `[S0X]`（來源見 `sources/source-index.md`，對照見 `source-map.md`）。
> 受眾中立：此處只記「事實」，深淺框架由 `content/audiences/*` 決定。
> 引用慣例：直接讀過官方章節原文者標該章節編號；僅來自部落格者標 S11/S12/S13。
> 措辭校正狀態（2026-06-22）：§3.1–§3.5 已用 Chrome 開官方專頁逐頁核對；`TODO(verify)` 見文末。

---

## 3.1 動機：為何 server AI 需要新模型

- Apple Intelligence 對於超出裝置端能力的複雜請求，需要雲端的大型基礎模型（large foundation models）。`[S11]`
- 傳統雲端安全模型不足以處理 AI 的個資：無法讓研究者**驗證**隱私承諾、缺乏執行期透明、難以**強制**限制特權存取——服務方一次改版就可能悄悄開始記錄資料，研究者通常無從察覺。`[S11]`
- PCC 的目標是把「Apple 裝置業界領先的安全與隱私」帶進雲端，並以**技術機制**（而非政策承諾）強制達成。`[S11]`
- 對照組：傳統雲端設計中，每台應用伺服器通常持有整個資料庫的存取憑證，單台被攻陷即足以存取任何使用者的資料——即使該使用者當下沒有連線。PCC 刻意不採此模型。`[S03]`

---

## 3.2 五大核心要求

> 官方標準措辭（讀自 Core Security & Privacy Requirements 專頁）。`[S03]`

### ① 個資的無狀態運算 Stateless computation on personal user data
- **定義**：PCC 只為「完成使用者當次請求」而使用其個資；個資**永不**提供給使用者以外的任何人，**包含 Apple 員工，即使在處理進行中**；回應送回後**不得保留**，也不得透過 logging 或 debugging 留存。`[S03]`
- **機制（軟體）**：節點採 **Ephemeral Data Mode**——可變資料寫在與唯讀系統卷（Signed System Volume）分離的專屬 data volume；SEP 在**每次開機隨機化**該卷的儲存金鑰階層，密碼學上保證任一 session 寫入的資料無法被後續開機讀取；`mobile_obliterator` 開機任務丟棄前次加密 data volume 並重建乾淨卷。`[S16]`
- **未來快取的例外**：未來若允許跨請求快取，仍以**密碼學金鑰控制**維持無狀態——PCC 以裝置提供的金鑰加密快取，並在請求後**抹除自己那份金鑰**；除非裝置在後續請求附上解密金鑰，PCC 無法解密快取。`[S03]`

### ② 可強制執行的保證 Enforceable guarantees
- **定義**：當保證**完全可由技術強制**時最為穩固；意即所有對整體保證有關鍵貢獻的元件都必須可被**約束與分析**。`[S03]`
- **機制**：因此 PCC 的核心保證**不依賴**難以推理的外部元件（官方舉例：TLS-terminating load balancer 在 debug session 中可能對資料做什麼，極難推理）；維運需求（伺服器指標、錯誤日誌）須以**不破壞隱私**的機制支援。`[S03]`

### ③ 無特權執行期存取 No privileged runtime access
- **定義**：PCC **不得**包含可讓 Apple 站點可靠性（SRE）人員繞過隱私保證的特權介面，**即使在處理重大故障/事故時**；亦不得有任何在執行期**擴大特權範圍**的機制（例如載入額外軟體）。`[S03]`
- **機制**：節點移除/停用動態執行碼的途徑——系統 shell（如 zsh）、直譯器（如 JavaScriptCore）、除錯器（如 debugserver）、JIT 編譯。`[S16]`

### ④ 不可被指定目標 Non-targetability
- **定義**：攻擊者若不對**整個 PCC 系統**發動廣泛攻擊，就不應能鎖定並危害**特定目標使用者**的個資；此性質**即使對能在供應鏈做實體攻擊、或惡意進入資料中心的高階攻擊者**亦須成立。換言之，有限度的入侵不得讓攻擊者把特定使用者的請求**導向**被攻陷節點；鎖定使用者應需要大範圍、易被偵測的攻擊。`[S03]`
- **機制（身分/限流）**：PCC 以**密碼學上不可連結（unlinkable）的權杖**施加使用限制，而非用帳號/裝置憑證認證。流程用 **Token Granting Token (TGT)** 與 **One-Time Tokens (OTT)**，皆以 **RSA Blind Signatures**（RFC 9474；Privacy Pass RFC 9578）建構，使權杖兌換與其請求**密碼學不可連結**；簽發 TGT 的 PCC Identity Service 與請求路由/處理**完全分離**。`[S04]`
- **機制（網路）**：所有請求經**第三方中繼**隱藏來源 IP，採 **Oblivious HTTP（chunked 變體）**；用戶端以 **HPKE** 對 Apple **Oblivious Gateway** 加密，並隨機選用由不同第三方營運的 **Oblivious Relay**（目前為 **Cloudflare 與 Fastly**）。`[S04]`

### ⑤ 可驗證的透明性 Verifiable transparency
- **定義**：研究者必須能**高度確信**地驗證 PCC 的隱私/安全保證與公開承諾相符，且能驗證**生產環境實際執行的軟體**與他們檢查過的軟體**為同一份**。`[S03]`
- 細節見 §3.5。`[S05]`

---

## 3.3 請求生命週期（端到端）

> 讀自 Request Flow 專頁。`[S04]`

1. **裝置為一切策略的根**：提交請求時，裝置先驗證 PCC 提供的 **attestation bundle**，決定是否信任，並把該請求的加密金鑰**封裝（wrap）給該節點**。`[S04]`
2. **編排（orchestration）**：裝置端 `modelmanagerd` 決定 on-device 或 server 模型；送往 PCC 的請求先經 `PrivateMLClientInferenceProviderService` 擴充，再交給 `privatecloudcomputed` daemon。`modelmanagerd` 會為相關請求指派 **Session UUID / Session Set UUID**，這些識別碼與分享給 PCC 的請求識別碼**不同**，其對應關係**不分享給 Apple**。`[S04]`
3. **匿名存取權杖**：裝置向 PCC Identity Service 取得 TGT（每使用者每裝置），再向 Token Granting Service 換取一批 OTT；每個請求附一枚 OTT 作為授權證明，PCC 用 OTT 公鑰驗證有效性而**不得知使用者/裝置身分**。`[S04]`
4. **送出請求**：經第三方 Oblivious Relay + 加密請求協定送達。`[S04]`
5. **節點選擇與金鑰封裝**：裝置驗證各節點 attestation，僅把請求金鑰封裝給「**attested 量測值符合公開透明性日誌中某發布**」之節點的 REK（節點公鑰）。`[S04, S05]`
6. **解密與處理**：PCC 節點解密並由 PCC 雲端應用處理；初始由 **proxy node** 接手，分派給一個或多個 **compute node**。`[S04]`
7. **節點間遞移信任（transitive trust）**：節點代表裝置驗證其他節點的 attestation，僅把請求金鑰**重新封裝**給「執行了經裝置驗證在日誌內之發布」的節點。`[S05]`
8. **防鎖定的金鑰透明**：PCC 對外公告的 OHTTP 金鑰與 TGT/OTT 簽章金鑰都會發布到**透明性日誌**，用戶端確認收到的金鑰已記錄在案；研究者可藉日誌驗證「某時段只使用一組金鑰」，避免以專屬金鑰鎖定特定裝置。`[S04]`

### 3.3.1 Attested Request Handling 細節 `[S23]`
- **CloudBoard**：節點進入 REM 後，CloudBoard 一族 daemon 管理請求生命週期：`cloudboardd`（中央協調、接受網路連線、**無解密金鑰存取**以隔離攻擊面）、`cb_attestationd`（組 attestation bundle）、`cb_jobauthd`（TGT/OTT 簽章公鑰）、`cb_jobhelper`（**每請求**一個，做密碼握手、以 REK 解密、驗 TGT/OTT）、`cb_bridged`（對外請求如 PIR）。`[S23]`
- **金鑰**：`cloudboardd` 建立 SEP 保護的 **REK（Request Encryption Key）** 金鑰對；裝置每請求產生對稱 **DEK（Data Encryption Key）** 加密負載，並以 **HPKE** 把 DEK 封裝給節點 REK，形成雙向端到端加密通道。`[S23]`
- **預取（prefetch）**：裝置常於離線時段以 OHTTP 向 PCC Gateway 預取 attestation；每個預取 attestation **只用一次**以防 Gateway 指紋化。`[S23]`
- **節點驗證（CloudAttestation 三檢查）**：① DCACA 簽發之 provisioning 憑證（證明是真 Apple 硬體）；② SEP Attestation 安全狀態；③ 透明性日誌包含該軟體量測值。安全政策另斷言：`SEAL_DATA_A` = AP Image4 ticket 的 SHA2-384、Cryptex Manifest Register 重放相符且鎖定、Configuration Seal Register 相符、REK 金鑰選項為 OS-bound + sealed-hashes-bound、anti-replay = 應用 metadata 的 SHA-256、SoC production-fused、Ephemeral Data Mode 與 REM 啟用、Developer mode 關閉、`config-security-policy=customer`。`[S23]`
- **節點選擇與 k**：請求只加密給一個大小為 **k** 的節點子集，使單點被攻陷僅能解密少量請求（支撐 non-targetability）。just-in-time k=2、最壞 k=4；目標 QoS：90% 使用率下 99% 請求無額外延遲。客戶端對 k 設上限；伺服器可經 OHTTP **調低（不可調高）** k。proxy 節點先收、可選候選集由 proxy 以密碼學方式選定，避免 Gateway 單方面指定節點。`[S23]`
- **隱私保護路由 metadata**：proxy 對 Gateway 的路由 metadata 經**分桶 + 對稱雜訊**降精度以防指紋化。`[S23]`

---

## 3.4 硬體與軟體支柱

### 3.4.1 信任根：Apple silicon `[S14]`
- PCC 的信任根是**自研 Apple silicon 伺服器**；安全特性根植於矽晶、製造後**不可變**（連 Apple 也無法更改）。`[S14]`
- Apple silicon 三項關鍵不可變特性：
  1. **硬體層密碼學身分**：金鑰於製造時產生並熔入矽晶，僅 Secure Enclave Processor（SEP）可用以證明身分，受硬體保護、不可匯出。`[S14]`
  2. **安全且量測式開機 Secure & Measured Boot**：Secure Boot 量測並驗證所有執行碼；起點 Boot ROM 於製造時置入矽晶、不可變。`[S14]`
  3. **硬體式 attestation**：SEP 以硬體身分簽署軟體量測值。`[S14]`
- **Secure Enclave（SEP）**：SoC 上的協同處理器，含真隨機數產生器、Public-Key Accelerator（PKA）、專屬 AES 引擎；製造時將 **Unique ID (UID)** 熔入矽晶，PKA 金鑰與 UID 糾纏綁定，UID 與 PKA 私鑰**永不暴露給任何軟體**。`[S14]`
- PCC 新增 **Data Center Identity Key (DCIK)**：在 SEP 的 PKA 內以固定種子產生，公鑰於製造時記入 Apple 裝置資料庫。`[S14]`

### 3.4.2 開機鏈 `[S14, S16]`
- AP 端：Boot ROM → 驗證 **Image4** 開機清單（**APTicket**，經 Trusted Signing Service 簽核）→ 量測 iBoot 並鎖入唯寫一次暫存器 **SEAL_DATA_A** → iBoot 續驗 **SPTM（Secure Page Table Monitor）**、**TXM（Trusted Execution Monitor）**、Kernel Cache → SPTM 啟動記憶體管理與 TXM → kernel → user space（由 Code Signing 延伸 Secure Boot）。`[S16]`
- SEP 端：SEPROM（不可變）→ 驗證並執行 sepOS，鎖入 **SEAL_DATA**。`[S14, S16]`
- **硬體 attestation**：PKA 把待證金鑰公鑰與 SEAL_DATA / SEAL_DATA_A 暫存器內容雜湊後，以 DCIK 等長效金鑰簽署，將金鑰對綁定到開機量測值；此行為全在硬體中，不可變。`[S14]`

### 3.4.3 軟體基礎 `[S16]`
- PCC 節點作業系統是 **iOS 的最小化、強化子集**，設計目標：可被研究者分析、整套可執行軟體**可量測且由 attestation 描述**、執行期**不可變**（只能經重開機改變，而重開機會使先前 attested 金鑰失效）。`[S16]`
- 攻擊/稽核面最小化：排除未用硬體的驅動與韌體；保留 GPU、ANE（Apple Neural Engine）與 Metal stack。`[S16]`
- **Cryptex**：LLM 功能與應用邏輯以 cryptex 打包載入——完整簽署且完整性驗證的獨立軟體分發包。`[S16]`
- **Trusted Execution Monitor (TXM)**：碼執行政策由**獨立於 kernel 的監控層 TXM** 管理，故**單純攻陷 kernel 不足以執行任意碼**，攻擊者還須突破 TXM。TXM 政策：所有碼須被 trust cache 涵蓋、不可建立 JIT 映射、不可啟用 Developer Mode、不支援除錯。`[S16]`
- **Software Sealed Registers (SSR)**：類似 TPM 的 PCR，量測值以**棘輪（ratchet）**方式累積、可鎖定且不可回滾，並納入 attestation；PCC 用兩個 SSR：Cryptex Manifest Register、Configuration Seal Register。`[S16]`
- **Restricted Execution Mode (REM)**：由 TXM 強制的**單向轉換**，進入後拒絕載入新 trust cache；標記為「before」的碼須在進入前被終止，以縮小處理使用者資料前的攻擊面。`[S16]`
- 為利研究，PCC 映像將 **sepOS 韌體與 iBoot bootloader 以明文包含**。`[S11, S12]`

---

## 3.5 可驗證性與工具

### 3.5.1 透明性承諾 `[S05]`
- PCC 把**每個部署到生產環境的 build 的軟體映像**公開供研究——這項透明性本身就是**可強制的保證**：裝置只把資料送給能**密碼學 attest 自己執行公開登錄軟體**的節點。`[S05]`
- 四項承諾：① 把 PCC 上所有執行碼的量測值發布到**append-only、密碼學防竄改的透明性日誌**；② 公開日誌與對應 binary 供檢視驗證；③ 維護一套官方研究工具；④ 透過 Apple Security Bounty 獎勵重要發現。`[S05]`
- **90 天發布政策**：每個生產映像（OS、應用、所有相關可執行檔）於**納入日誌後 90 天內，或相關軟體更新可得時，以較早者為準**發布供獨立 binary 檢視。`[S05]`
- **不可移除性**：發布一旦簽入日誌，**移除即可被偵測**——類比 iMessage Contact Key Verification 之 Key Transparency 所用的 **log-backed map** 結構。`[S05]`

### 3.5.2 Virtual Research Environment（VRE）`[S12, S32]`
- VRE 是 **Apple 首次為其平台釋出**的研究工具組，在 Apple silicon Mac 上模擬 PCC 節點，可 boot 經最小修改以利虛擬化的 PCC 軟體。`[S05, S12]`
- 能力：列出/檢視軟體發布、**驗證透明性日誌一致性**、下載發布 binary、虛擬環境 boot、對展示模型推論、修改與除錯 PCC 軟體。`[S12]`
- 技術特點：含**虛擬 Secure Enclave Processor（SEP）**（首次可對此元件做安全研究）、paravirtualized graphics。`[S12]`
- 取得需求：Apple silicon Mac、16GB+ 統一記憶體（建議 24GB+）；macOS Sequoia 15.1 以上。`[S12, S33]`
- 操作（CLI `pccvre`，位於 `/System/Library/SecurityResearch/usr/bin`）：於 recoveryOS 執行 `csrutil allow-research-guests enable` 啟用研究 VM → `pccvre license` 接受授權 → `pccvre release download <index>` → `pccvre instance create` / `instance start` → `pccvre instance inference-request -N <name> --prompt "…"` 對 demo 模型推論。`[S33, S34]`
- 驗證 attestation：`pccvre attestation parse` / `verify`（用主機 CloudAttestation 框架）；**生產節點**的 attestation 可從裝置端「Apple Intelligence Report」取得後檢視。`[S34, S44]`
- demo 模型：架構近似 Apple 伺服器端 Foundation model 但縮小；僅語言預訓練、未指令微調，只能文字補全，as-is（無安全防護）。`[S33]`

### 3.5.3 開源元件 `[S08, S12]`
- 經 `apple/security-pcc` GitHub repo，以**限用授權**釋出：`CloudAttestation`（建構與驗證 attestation）、`Thimble`（`privatecloudcomputed` daemon）、`splunkloggingd`（log 過濾）、`srd_tools`（VRE 工具）等。`[S08, S12]`
- **授權限制（重要）**：`apple/security-pcc` 為「Private Cloud Compute Source Code Internal Use License」——自下載起 90 天、限單一 Apple 電腦、僅供驗證 PCC 安全/隱私之用、**禁止再散布**、AS IS、加州法管轄；專案不接受外部 code 貢獻。`[S08]`

### 3.5.4 驗證的能與不能（準確性關鍵）`[S05, S07]`
- **可驗證**：裝置（及代為驗證的 proxy 節點）只把請求金鑰封裝給「attested 量測值符合公開透明性日誌中某發布」的節點；研究者可用 VRE 對照 Apple Intelligence Report 中的 attestation、檢視日誌一致性、分析公開 binary 與源碼。`[S05, S07]`
- **不能**：Apple **未提供可重現建置（reproducible builds）**——公開源碼無法證明「發布的 binary 確由該源碼編譯」，故源碼僅作為**分析輔助**。`[S07]`
- VRE 界限：paravirtualized GPU、virtualized SEP（可除錯 SEP 碼但無法呼叫真實矽晶 SEP 功能）；無法動態觸發生產環境每條碼路徑，部分須人工檢視 binary；VRE 產生的 release 因 SoC 識別碼／虛擬 kext／demo 模型不同，**不會**對應生產 release（驗證時須加 `--no-strict-certificate-validation` 等旗標）。`[S07, S34]`

---

## 3.6 Apple Security Bounty（PCC）`[S09, S10, S12]`

- 因 PCC 把裝置級安全帶上雲，獎勵類別對齊指南最關鍵威脅。`[S12]`
- 對齊的**三大威脅情境**（即威脅模型 §3.9 的三類）：意外資料揭露、來自使用者請求的外部入侵、實體或內部存取。`[S07, S12]`
- 官方最高獎勵（S12 公布）：
  - 具 entitlements 的**遠端任意碼執行**：**US$1,000,000**
  - 取得**信任邊界外**的使用者請求資料：**US$250,000**
  - 具**特權網路位置**存取請求資料：**US$150,000**
  - **未經 attest** 之碼執行能力：**US$100,000**
  - **意外資料揭露**（部署/設定缺陷）：**US$50,000** `[S12]`
- 即使不符既定類別，凡對 PCC 有重大影響之安全問題**仍會評估**給獎。`[S12]`

---

## 3.7 2026 擴展：PCC on Google Cloud `[S13]`

- Apple **首次**把 PCC 延伸到第三方基礎設施，與 **Google、NVIDIA** 合作，在 **Google Cloud**（使用 **NVIDIA GPU**）運行 Apple Intelligence 工作負載。`[S13]`
- 新一代 Apple Foundation Models 借助「**Gemini** 系列模型背後的技術」，用於 agentic 工具使用與推理等複雜任務。`[S13]`
- **五大核心要求完全不變**：stateless computation、enforceable guarantees、no privileged runtime access、non-targetability、verifiable transparency。`[S13]`
- 架構：每請求的**初始網路資料解析**在**專屬 namespace 內的專屬 process**；共用推論軟體經**短生命週期回收**；**attested 金鑰置於與外部輸入隔離的獨立專屬 confidential VM**。`[S13]`
- 供應鏈防護：維護 PCC 機隊中**所有 Google Cloud 硬體的密碼學可驗證 append-only 帳本**；對可被濫用的敏感元件，**軟體 attestation 根植於至少兩個來自獨立廠商的信任根**。`[S13]`
- **關鍵界線**：**Apple 完整保留對 PCC 軟體的控制；Apple 裝置只會信任經 Apple 密碼學核准的 PCC 軟體**。所有 binary 仍公開可檢視，並透過 bounty 維持研究存取。`[S13]`

---

## 3.8 準確性紅線（QA 必查，非事實句）

- 不寫「Apple 永遠看不到任何東西」。精確說法：保證適用於 **PCC 請求**；威脅模型有其假設邊界。`[S07]`
- 開發者版須區分「**Apple 宣稱**」與「**可獨立驗證**」（透過 VRE / 透明性日誌 / 可重現 build）。`[S05, S12]`
- S13 擴展**不等於**把資料交給 Google 任意處理——須強調 Apple 控制權與密碼學簽核信任鏈。`[S13]`
- 不確定的名稱/數字 → `TODO(verify)`，不得以第三方/記憶填補。
- **不可宣稱「可重現 build」**：Apple 未提供 reproducible builds；可驗證鏈是「attestation ↔ 透明性日誌」，**不是**「源碼 ↔ binary」。源碼是分析輔助。`[S07]`

---

## 3.9 威脅模型與防禦 `[S07]`

> PCC 設計目標：即使遭攻擊，五大要求**永不被違反**。考量三大威脅情境，採**縱深防禦（defense-in-depth）**。`[S07]`

- **① 意外資料揭露 Accidental disclosure**：信任邊界＝PCC 節點。e2e 加密（裝置↔節點、節點↔節點）；運算 process 與「收發/解密」process 隔離、不暴露網路、sandbox；可觀測性資料（log/metrics）集中於少數出口、過濾＋多階段審查（log 格式字串執行期可能帶出資料）、mutual TLS、限保留期；流量分析緩解（token 長度攻擊；Visual Lookup 一律執行 PIR 查詢以防時序推斷）；Ephemeral Data Mode。`[S07]`
- **② 來自使用者請求的外部入侵 External compromise**：預防（Pointer Authentication Codes、對不可信輸入用記憶體安全 Swift、Protobuf 等結構化格式、最小化攻擊面）→ 偵測（隱私安全的 security event monitor）→ 圍堵（REM、process 分離、網路過濾、SecureConfig 靜態編組 ensemble、最小化可解密某請求的節點集合、PIR 每請求金鑰隔離 `cb_jobhelper`）→ 時間限界（每請求 process 實例、定期回收長壽 process、Ephemeral Data Mode 限單次開機）→ 目標擴散（匿名權杖、第三方中繼、透明性日誌、Request Execution Log）。`[S07]`
- **③ 實體或內部存取 Physical/internal access**：單一員工即使有授權內部輸入也無法取得使用者資料；硬體介面視為不可信；製造時逐機殼成像比對參考影像；**開蓋即斷電並抹除機殼 attestation anti-replay 值**，每日重驗、異常即隔離調查；anti-replay 防重放側通道；無遠端管理 shell；PCC Gateway 攻擊由非選中 proxy 節點回 **NACK**（記入 Apple Intelligence Report），路由偏置會在 **Request Execution Log** 顯現。`[S07]`
- **已知限界（官方自陳）**：sandbox 較 WebKit/BlastDoor 粗粒度；節點軟體同質性使單點軟體攻擊可能規模化；relay 會暴露概略地理區域、請求帶非識別性 header（如 "iPhone"、OS build version）；無 reproducible builds。`[S07]`

---

## 3.10 推論引擎與分散式推論 `[S26]`

- **TIE（The Inference Engine）+ MetalLM**：自研推論伺服器 + 以 Metal shader/compute kernel 運算的推論框架；PCC 使用 **AFM-server（Apple Foundation Model server）**。`[S26]`
- 模型機制：runtime 可換 **adapter**（小型神經模組）、SentencePiece tokenizer、影像 tokenizer（影像→embedding）、可用 draft model 做 **speculative decoding**、可用 **constrained decoding**（BNF/JSON Schema 文法，TokenGenerationSE）；輸出串流並**加 padding 以防 token 長度側通道**。`[S26]`
- TIE daemon：`tie-model-owner`（以 ModelCatalogSE 載入權重、提供唯讀記憶體參照）、`tie-controllerd`（協調、回收、KV cache、抓 prompt deny list）、`tie-cloud-app`（**每請求** process：反序列化 Protobuf、驗參數、tokenize、以**記憶體安全 Swift JPEG 解碼器**解影像）、`tie-inference`（共用、**定期終止重啟**以防殘留使用者資料）。用 process pooling 降低啟動成本。`[S26]`
- **分散式推論 ensemble**：最多 8 節點組成，leader 對外接請求；以 **AppleCIOMesh**（kext + framework）經 USB4／Ethernet 連接，提供 MPI-like 原語；資料以 **AES-128-GCM**（96-bit anti-replay：64-bit 隨機 + 32-bit 計數）加密，解密失敗或斷鏈即 catastrophic failure → 整組重開。`[S26]`
- **Ensemble attestation**：leader 驗證每個 follower（DCIK 憑證、軟體量測值與 leader 相同、chip/board ID 與 fusing bits 相同、REM/EDM/dev mode 與 config-security-policy 相同）；`ensembled` 以 **Attested TLS**（mutual TLS 1.3、SEP-attested NIST P-384 ECDSA、attestation 序列化進 X.509v3 擴充）配對；拓樸**最多兩機殼、每殼至多四節點**，且因 secure-config 不可變而整個開機 session 固定。`[S26]`
- **請求交接（KV cache handoff）**：分 **First Token（FT）** 與 **Extend Token（ET）** 兩階段，可跨 ensemble 交接；KV cache 以從 DEK 衍生的 **KVDEK** 加密；`EnsemblePorter`/`ensemblewarden`（皆每請求、entitlement 隔離）管理金鑰，`ensembled` 只見密文金鑰；短 TTL、傳輸完成即刪。對應源碼：`AppleCIOMesh`、`AppleComputeEnsembler`、`EnsembleWarden`、`CloudBoard`（皆於 S08）。`[S26, S08]`

## 3.11 管理與維運 `[S06]`

> 設計張力：維運需要可觀測/除錯，但安全模型要阻擋一切內省——PCC 在每個資料**出口**做過濾，規則隨映像公開可查。`[S06]`

- **刻意移除/替換**：互動式 shell、sysdiagnose（進 REM 即停用）、OS Analytics、執行追蹤（如 Instruments Time Profiler）；Ephemeral Data Mode 確保即使重設也無法在保留使用者資料下重啟這些工具。`[S06]`
- **Metrics**：`CloudMetrics`（swift-metrics 後端）→ `cloudmetricsd` 本地聚合 → 經 OpenTelemetry 匯出；有可匯出指標**允許清單**（隨 PrivateCloudSupport cryptex 發布）。`[S06]`
- **Log 過濾**：`os_log` + `splunkloggingd` **逐 log 行**過濾（依「Mach-O 發送者 + format string」允許清單，比對未組裝的 format string）；只有預先核可的 log 行能離開節點。`[S06]`
- **Crash/panic**：區分 intrinsically safe 與 process-state-dependent；partial/full 兩種遮蔽（暫存器、無法解析的堆疊框、僅留最後 32 框）；每節點每小時至多 3 筆 partial、隨機 20%。`[S06]`
- **遠端診斷**：`CloudRemoteDiagnostics`/`cloudremotediagd`，僅對配對 BMC；ping/traceroute、PCAP（**僅外部介面**）、stackshot（每小時 1 次）、CPU/記憶體；皆有速率限制以壓低側通道頻寬。`[S06]`
- **安全事件**：`securitymonitorlited`（EndpointSecurity）擷取 process/檔案/IOKit/SSH/網路等 metadata 事件送遠端分析（**只記 metadata、不內省 process 內資料**）。`[S06]`
- **網路防火牆**：`denaliSE`（PrivateCloudSupport cryptex 內）對 Denali 控制面 mTLS、下載**僅允許營運 PCC 所需最小網路存取**的政策，於 L2/L3/L4 強制。對應源碼多數於 S08（CloudMetrics、CloudRemoteDiagnostics、SecurityMonitorLite…）。`[S06, S08]`

---

## 待解 TODO(verify)
1. **裝置端模型參數量**：官方專頁（已讀 §3.1–§3.5）未給精確參數量；不引用第三方數字。維持 TODO，待 S01/S03 或官方模型文件。
2. **Bounty 金額**：已用 S12 官方表格填入；如需再保險可對 S09/S10 頁面複核（本階段未開該頁）。
3. ~~§3.6 三大類別的官方分類名稱~~ → **已解（Phase 7）**：三大威脅情境＝ S07 明列之三類（意外資料揭露／來自請求的外部入侵／實體或內部存取）；五級獎勵金額為 S12 表格。
4. **2026 §3.7**：目前全數來自 S13 部落格；若指南另有對應章節（如管理/attacks 提及跨雲），可補章節錨點。
