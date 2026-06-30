# Apple PCC 隱私白皮書 ×3 —— Claude Code 執行計畫（詳版）

> **目標**:把 Apple Private Cloud Compute（PCC）在「AI 隱私」上做的事，做成 **三份受眾不同的 PDF**，
> 每份回答三個問題:**為何要做 / 如何做到 / 做到了代表什麼**。
> **設計原則**:單一真實來源(single source of truth)+ 反漂移。事實只定義一次,三份文件只是不同視角的「再框架」。
> 本版加厚了知識庫(§3)、加入術語表(§4)、把三份 PDF 擴成逐節大綱與更高頁數(§5)、補上完整設計系統(§6)、CJK/PDF 管線細節(§7)、可直接貼用的任務提示(§8)。
> 最後更新:2026-06-22

---

## 目錄
- §0 核心架構決策
- §1 Repo 結構
- §2 參考來源清單（= `sources/source-index.md`）
- §3 事實核心（knowledge-base 種子，已掛 `[S0X]`）
- §4 術語表（跨三份文件的用詞一致性）
- §5 三份 PDF 詳細大綱（含頁數、圖表、來源）
- §6 設計系統（三套主題 + 圖表清單 + 字型）
- §7 Build Pipeline（md → html → pdf，含 CJK/註腳）
- §8 Claude Code 任務拆解（含完整 Phase 0／Phase 1 提示）
- §9 品質稽核
- §10 里程碑與工作量
- §11 啟動步驟

---

## 0. 核心架構決策

```
        sources/source-index.md（§2，唯一來源清單，S01..S13）
                      │
                      ▼
        content/knowledge-base.md  ← 唯一定義事實之處，每條事實附 [S0X]
                      │  （對應關係記於 sources/source-map.md）
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   developer        power-user    general-public      ← 受眾 spec + 逐節大綱
        │             │             │
        ▼             ▼             ▼
   drafts/01      drafts/02      drafts/03            ← 敘事草稿（為何/如何/代表什麼）
        │             │             │
        └─────────────┼─────────────┘
                      ▼
   單一管線：Markdown → HTML → PDF（Playwright），三套 CSS 主題 + 共用圖庫
                      │
                      ▼
   dist/  PCC-開發者版.pdf / PCC-AI使用者版.pdf / PCC-普羅大眾版.pdf
```

**四條正交軸**(任一改動只影響單一檔案):
1. **事實** → `knowledge-base.md`
2. **來源** → `source-index.md`(§2)
3. **受眾差異** → `audiences/*.md` + theme CSS
4. **視覺/圖** → `design/*` + `assets/`

---

## 1. Repo 結構

```
pcc-privacy-explainers/
├── AGENTS.md                      # Agent 不變式（§8.0）
├── README.md                      # 專案說明 + 如何 build
├── docs/
│   ├── PLAN.md                    # 本檔
│   └── GLOSSARY.md                # = §4，跨文件用詞一致性
├── sources/
│   ├── source-index.md            # ★ 唯一來源清單（= §2，已定稿）
│   ├── source-map.md              # claim → S0X 對照（Phase 0 建）
│   └── primary/                   # 重要頁面存檔（離線可讀）
│       ├── S01-security-guide.md
│       ├── S11-blog-frontier-2024.md
│       ├── S12-blog-pcc-research-2024.md
│       └── S13-blog-expanding-2026.md
├── content/
│   ├── knowledge-base.md          # ★ 唯一事實庫，逐條附 [S0X]
│   ├── audiences/
│   │   ├── developer.md           # persona spec + 逐節大綱（= §5.1）
│   │   ├── power-user.md          # （= §5.2）
│   │   └── general-public.md      # （= §5.3）
│   └── drafts/
│       ├── 01-developer.md
│       ├── 02-power-user.md
│       └── 03-general-public.md
├── design/
│   ├── base.css                   # 共用排版基底
│   ├── theme-developer.css
│   ├── theme-power-user.css
│   ├── theme-general.css
│   └── diagrams.md                # 圖表清單與規格（= §6.3）
├── assets/
│   ├── diagrams/                  # D1..D8 原始檔（SVG）
│   └── illustrations/             # M1..M3 大眾版插圖
├── build/
│   ├── build.mjs                  # 主管線
│   ├── md2html.mjs                # markdown→html + [S0X] 註腳 + 圖片
│   ├── render.config.json         # 每份的頁面/邊界/主題對應
│   └── smoke/cjk-test.html        # CJK 字型冒煙測試頁
├── dist/                          # 產出 PDF
└── tasks/                         # 每階段一支提示（§8）
    ├── 00-research-ingest.md
    ├── 01-build-knowledge-base.md
    ├── 02-define-audiences.md
    ├── 03-draft-developer.md
    ├── 04-draft-power-user.md
    ├── 05-draft-general-public.md
    ├── 06-design-and-render.md
    └── 07-qa-and-citation-check.md
```

---

## 2. 參考來源清單（= `sources/source-index.md`）

> 收錄原則:**只收 Apple 官方來源**(`security.apple.com` 與 `github.com/apple/*`)。第三方解讀文章一律**不納入**。
> 主指南頁為 JavaScript 渲染,連結經搜尋確認;**完整章節以 S02(/navigation)為權威來源**。引用慣例:`[S0X]`。

| 編號 | 層級 | 名稱 | 連結 | 用途 |
|---|---|---|---|---|
| **S01** | **主參考** | PCC Security Guide(主指南入口) | `https://security.apple.com/documentation/private-cloud-compute` | 主連結;整份指南起點 |
| S02 | 指南章節 | Navigating the Security Guide(導覽/目錄) | `https://security.apple.com/documentation/private-cloud-compute/navigation` | 權威完整目錄(TOC) |
| S03 | 指南章節 | Core Security & Privacy Requirements | `https://security.apple.com/documentation/private-cloud-compute/corerequirements` | 五大核心要求 |
| S04 | 指南章節 | Request Flow | `https://security.apple.com/documentation/private-cloud-compute/requestflow` | 請求流程與路由 |
| S05 | 指南章節 | Verifiable Transparency | `https://security.apple.com/documentation/private-cloud-compute/verifiabletransparency` | 可驗證透明性 |
| S06 | 指南章節 | Management & Operations | `https://security.apple.com/documentation/private-cloud-compute/management` | 管理與維運 |
| S07 | 指南章節 | Anticipating Attacks | `https://security.apple.com/documentation/private-cloud-compute/attacks` | 威脅模型/攻擊防禦 |
| S08 | 配套資源 | apple/security-pcc(開源碼) | `https://github.com/apple/security-pcc` | 官方源碼,供獨立驗證 |
| S09 | 配套資源 | Apple Security Bounty | `https://security.apple.com/bounty` | PCC 漏洞獎勵入口 |
| S10 | 配套資源 | Bounty Guidelines | `https://security.apple.com/bounty/guidelines/` | 獎勵規則與資格 |
| S11 | 官方背景 | A new frontier for AI privacy(2024 原始公告) | `https://security.apple.com/blog/private-cloud-compute/` | PCC 首次發表 |
| S12 | 官方背景 | Security research on PCC(2024/10) | `https://security.apple.com/blog/pcc-security-research/` | 釋出指南+VRE+源碼+Bounty |
| S13 | 官方背景 | Expanding PCC(2026) | `https://security.apple.com/blog/expanding-pcc/` | 擴展至 Google Cloud + NVIDIA |

**配套資源內含元件(非獨立 URL)**:S08 內含 `CloudAttestation`(建構/驗證節點 attestation)、`Thimble`(裝置端 daemon,搭配做透明性驗證)等,限研究用途授權。**VRE 無獨立網頁**,透過 S08 + Apple silicon Mac 上 macOS 取得;引用記為 `S08 / VRE`。
**維護規則**:① 新增來源只能 `security.apple.com` 或 `github.com/apple/*`;② 唯一編號遞增,不重用;③ KB 不得引用清單外來源。

---

## 3. 事實核心（`knowledge-base.md` 種子）

> 每條附 `[S0X]`。Phase 0 用 S02 補章節、S01/S03 校細節。**數字與機制名稱以官方 Security Guide 為準**;不確定者標 `TODO(verify)`,不得以第三方填補。

### 3.1 動機:為何 server AI 需要新模型 `[S11]`
- 雲端 AI 要用大型模型,需對使用者請求與個資做**未加密存取**,因此無法沿用端到端加密。
- 傳統雲端安全模型的缺口:隱私宣稱**難以驗證、難以強制**。例如服務聲稱「不記錄某資料」,研究者通常無法驗證,服務方也難以持久強制(一次改版就可能意外開始記錄)。
- on-device 的優勢(使用者掌控裝置、軟硬體可檢視、Secure Boot 保證執行透明、Apple 無特權存取)需要被「帶進雲端」,這就是 PCC。

### 3.2 五大核心要求 `[S03, S11]`
逐一展開(每項:定義 / 機制 / 如何強制 / 可驗證點):
1. **無狀態運算 Stateless computation**:僅為當次請求處理個資,記憶體內、用完即棄,事後 Apple 不可得。
2. **可強制執行的保證 Enforceable guarantees**:保證源自技術機制而非政策;所有影響保證的元件都須可約束、可分析(故不依賴像 TLS-terminating load balancer 之類難以推理的外部元件)。
3. **無特權存取 No privileged access**:不存在可繞過保護的特權執行通道/後門 shell;Apple 維運人員亦不可得使用者資料(類比:裝置端 Data Protection 在密碼學上阻止 Apple 停用或猜測 iPhone 密碼)。
4. **不可被指定目標 Non-targetability** `[S04, S11]`:經 OHTTP/第三方 relay 去識別與路由,PCC 無法得知使用者身分,外部也無法把請求導向選定節點;負載平衡阻止鎖定特定節點。
5. **可驗證的透明性 Verifiable transparency** `[S05, S11]`:每個生產映像登錄於 append-only transparency log;裝置只與「量測值已在 log 中」的節點通訊;研究者可檢視實際執行的軟體。

### 3.3 請求生命週期(端到端) `[S04, S05]`
裝置端準備請求 → 經 relay 去識別來源 → 選擇節點 → **裝置僅把請求負載金鑰封裝給「attested 量測值符合 log 中某發布」的節點公鑰** → 節點推論 → 回傳結果 → 釋放/銷毀狀態。
要點:一旦某發布簽入 log,**移除即可被偵測**(類似 iMessage Contact Key Verification 的 Key Transparency 的 log-backed map 結構)。

### 3.4 硬體/軟體支柱 `[S01, S11]`
- 自研 Apple silicon 伺服器;**Secure Enclave**(保護金鑰)、**Secure Boot**(OS 須簽章驗證)、**Trusted Execution Monitor**(只跑簽章驗證過的碼)、code signing、attestation 鏈、transparency log。
- attestation 建立在**硬體實作的不可變基礎**上。
- 端上優先:較簡單任務由裝置端較小模型處理,超出能力才安全卸載到 PCC。`[S11]`(裝置端模型精確參數量 → `TODO(verify against S01/S03)`,不引用第三方數字)
- 資料傳輸加密、僅記憶體內處理(ephemeral)、無持久化儲存/無剖析/無使用者活動日誌 → 鑑識攻擊面大幅縮小。
- 為利研究,PCC 映像將 **sepOS 韌體與 iBoot bootloader 以明文包含**。`[S11]`

### 3.5 可驗證性與工具 `[S08, S12]`
- **VRE(Virtual Research Environment)**:Apple 首次為其平台釋出的工具組,在 Apple silicon Mac 上可:驗證 log 一致性、下載各版本 binary、虛擬化環境 build release、對展示模型推論。**含虛擬 Secure Enclave Processor(SEP)**,並用 macOS 內建 paravirtualized graphics 支援推論。
- **binary 發布政策**:每個生產映像皆發布供獨立檢視,於納入 log 後 90 天內(或相關更新可得時,以較早者為準)。`[S11]`
- **開源元件**:`CloudAttestation`、`Thimble` 等於 S08 釋出。`[S08]`

### 3.6 Apple Security Bounty(PCC) `[S09, S10, S12]`
- 三大類別對齊指南最關鍵威脅:**意外資料揭露**(設定/設計缺陷)、**來自使用者請求的外部入侵**、**實體或內部存取**。
- 因 PCC 把裝置級安全帶上雲,獎勵**與 iOS 相當**(報導區間約 US$50,000–1,000,000;最高給「能將資料帶出 PCC 信任邊界」者)。即使不符既定類別,只要對 PCC 有重大影響仍會評估。
- 數字屬報導值 → 正文引用前以 S09/S10 校正,必要處標 `TODO(verify)`。

### 3.7 最新進展(2026):PCC on Google Cloud `[S13]`
- Apple 將 PCC **擴展到自家資料中心之外**,與 **Google、NVIDIA** 合作於 **Google Cloud** 運行新 Apple Intelligence 工作負載;新一代 Apple Foundation Models 借助 **Gemini** 系列技術。
- **核心五大要求不變**;沿用相同架構:每請求初始網路解析在獨立 namespace 的專屬 process、共用推論軟體短 TTL 回收、attested 金鑰置於與外部輸入隔離的專屬 confidential VM。
- 供應鏈防護:維護所有 PCC 機隊 Google Cloud 硬體的**可驗證 append-only 帳本**;可被濫用於外洩資料的元件,其軟體 attestation 根植於**至少兩個獨立廠商的信任根**。
- 透明承諾延續:所有 binary 公開檢視,提供研究工具,並透過 Bounty 提供 research mode 的 live 節點存取。
- **關鍵界線**:無論主機在哪,**Apple 完整保留對 PCC 軟體的控制;裝置只信任經 Apple 加密簽核的 PCC 軟體**。

### 3.8 準確性紅線(QA 必查)
- 不寫「Apple 永遠看不到任何東西」。精確:保證適用於 **PCC 請求**;威脅模型有假設邊界。`[S07]`
- 開發者版區分「**Apple 宣稱**」vs「**可獨立驗證**」(VRE/log/可重現 build)。
- S13 擴展**不等於**把資料交給 Google 任意處理——強調 Apple 控制權與簽核信任鏈。`[S13]`
- 不確定的名稱/數字 → `TODO(verify)`。

---

## 4. 術語表（= `docs/GLOSSARY.md`）

> 目的:三份文件對同一概念**用詞一致**。每詞:英文 / 繁中首選譯名 / 一句定義 / 哪些版本會用到(D=開發者, P=使用者, G=大眾)。

| 英文 | 繁中 | 一句定義 | 用於 |
|---|---|---|---|
| Private Cloud Compute (PCC) | 私有雲端運算 | Apple 為私密 AI 推論打造的雲端系統 | D P G |
| Stateless computation | 無狀態運算 | 用完即棄、不留存個資 | D P G |
| Enforceable guarantees | 可強制執行的保證 | 由技術而非政策保障 | D P |
| No privileged access | 無特權存取 | 無人(含 Apple)能繞過保護讀資料 | D P G |
| Non-targetability | 不可被指定目標 | 無法鎖定特定使用者的資料 | D P |
| Verifiable transparency | 可驗證透明性 | 外部可檢查實際執行的軟體 | D P G |
| Attestation | 證明/認證 | 節點證明自己跑的是某已知軟體 | D (P 用比喻) |
| Transparency log | 透明性日誌 | 公開、僅可附加的軟體紀錄 | D (P/G 用「人人可查的紀錄」) |
| Secure Enclave | 安全隔離區 | 晶片內保護金鑰的子系統 | D (P 提及) |
| Secure Boot | 安全開機 | 只開機簽章驗證過的 OS | D |
| Trusted Execution Monitor (TXM) | 受信執行監控 | 獨立於 kernel 的監控層，只允許 trust cache 涵蓋的碼執行 | D |
| OHTTP relay | OHTTP 中繼 | 去識別來源、阻止指定目標的轉送層 | D (P 用「匿名轉送」) |
| Virtual Research Environment (VRE) | 虛擬研究環境 | Mac 上獨立驗證 PCC 的工具組 | D |
| Confidential VM / confidential computing | 機密虛擬機/機密運算 | 記憶體內資料對主機亦加密隔離 | D |
| Root of trust | 信任根 | 信任鏈的硬體起點 | D |

> Phase 1 把本表落地為 `GLOSSARY.md`;草稿撰寫時若引入新詞,先補表再使用(對應 AGENTS 反漂移)。

---

## 5. 三份 PDF 詳細大綱

**頁數目標(已上調;大眾版以視覺撐頁,文字密度低)**

| 版本 | 受眾 | 目標頁數 | 文字密度 | 主要形式 |
|---|---|---|---|---|
| 開發者版 | 懂密碼學/TEE/attestation | **28–40** | 高 | 技術參考 + 圖 + 驗證實戰 + 附錄 |
| 使用者版 | 常用 ChatGPT/Claude/Gemini | **14–22** | 中 | 概念 + 類比 + 對照表 + 清單 |
| 大眾版 | 零技術背景 | **12–18** | 低 | 大圖 + 比喻 + FAQ + 總結頁 |

**三問題 × 三受眾 內容矩陣**

| | 為何要做 | 如何做到 | 做到代表什麼 |
|---|---|---|---|
| 開發者 | 雲端 AI 隱私缺口、不可驗證/不可強制 | 五大要求技術細節 + 信任鏈 + 生命週期 + VRE 實證 | 可驗證雲端 AI 標竿、對自身架構啟示、跨硬體延伸 |
| 使用者 | 你的資料去哪、口頭 vs 技術承諾 | 五大要求類比 + 請求旅程 + 為何「可驗證」是關鍵 | 一把評估 AI 服務隱私的尺、檢查清單 |
| 大眾 | AI 要看你的東西才能幫忙 | 三個比喻 + 手機如何決定上雲 | 不必犧牲隱私也能用聰明 AI、產業訊號 |

---

### 5.1 開發者版（`PCC-開發者版.pdf`｜28–40 頁）

| # | 章節 | 頁 | 內容重點 | 圖 | 來源 |
|---|---|---|---|---|---|
| 0 | 封面 + 摘要 + 如何閱讀 | 2 | 一頁摘要(五大要求一句話)、讀者假設、章節地圖 | D5 | S03,S11 |
| 1 | 為何 server AI 需要新模型 | 3 | 未加密存取的必然、傳統雲端安全的缺口、on-device 取捨 | D1 | S11 |
| 2 | 五大核心要求(深度) | 6–7 | 每要求一節:定義/機制/強制/可驗證點 | D5 | S03,S11 |
| 3 | 信任根與開機鏈 | 3–4 | Secure Enclave、sepOS、iBoot、code signing、TXM/SPTM;attestation 如何根植硬體不可變基礎 | D2 | S01 |
| 4 | 請求生命週期(端到端) | 4–5 | 裝置準備→relay 去識別→節點選擇→金鑰封裝至符合 log 之節點公鑰→推論→銷毀 | D3 | S04 |
| 5 | 可驗證透明性 | 3–4 | log 結構(append-only、log-backed map,類比 iMessage Key Transparency)、90 天發布政策、裝置只信任 log 內節點 | D4 | S05,S11 |
| 6 | 動手驗證:VRE 實戰 | 5–6 | 環境需求、虛擬 SEP、paravirtualized graphics;流程:驗 log→下載 binary→build→對 demo 模型推論;源碼導覽 CloudAttestation/Thimble | D6 | S08,S12 |
| 7 | 威脅模型與攻擊面 | 3–4 | 信任邊界、攻擊類別、供應鏈;對應 Bounty 三類 | D7 | S07 |
| 8 | Apple Security Bounty(PCC) | 1–2 | 類別/獎勵區間/提交要求(數字以 S09/S10 校正) | — | S09,S10,S12 |
| 9 | 2026 擴展:PCC on Google Cloud | 3–4 | 相同要求、confidential VM 模式、雙信任根、硬體帳本、Apple 保留控制 | D8 | S13 |
| 10 | 對你系統的啟示 | 2–3 | 把「可驗證」當設計目標、威脅建模可套用 | — | — |
| 11 | 附錄 | 2–3 | 詞彙、`[S01–S13]` 來源對照、延伸驗證清單 | — | 全 |

形式:`[S0X]` 註腳式引用、流程圖、表格、必要處虛擬碼;區分「宣稱 vs 可驗證」。

---

### 5.2 常用 AI 者版（`PCC-AI使用者版.pdf`｜14–22 頁）

| # | 章節 | 頁 | 內容重點 | 圖 | 來源 |
|---|---|---|---|---|---|
| 0 | 封面 + 開場 | 1–2 | 你每天用 AI,你的資料去哪了? | — | — |
| 1 | 兩種隱私承諾:口頭 vs 技術 | 2 | 「相信我們不看」vs「技術上做不到偷看」 | — | S11 |
| 2 | PCC 怎麼運作(五大要求類比) | 4–5 | 每要求:一段類比 + 一句「這保護你什麼」 | D5(簡化) | S03 |
| 3 | 你的請求的旅程 | 2–3 | 端上優先、必要才上雲;匿名轉送、用完即棄(簡化流程) | D3(簡化) | S04 |
| 4 | 為什麼「可驗證」是關鍵差異 | 2–3 | 別人能查 Apple 的宣稱;對比一般雲端 AI | D4(簡化) | S05,S12 |
| 5 | 把它當尺:評估任何 AI 服務 | 3–4 | 檢查清單 + 「PCC vs 典型雲端 AI」對照表 + 要問的問題 | 表 | S03,S05 |
| 6 | 2026:標準在擴大 | 1–2 | 擴展到更多基礎設施但 Apple 仍掌控簽核 | — | S13 |
| 7 | FAQ + 名詞小辭典 | 1–2 | 常見疑問、精簡詞彙 | — | §4 |

形式:對照表、清單卡片、pull-quote、輕量視覺;比喻不失真。

---

### 5.3 普羅大眾版（`PCC-普羅大眾版.pdf`｜12–18 頁，視覺為主）

| # | 章節（多為跨頁大圖） | 頁 | 內容重點 | 圖 | 來源 |
|---|---|---|---|---|---|
| 0 | 封面 | 1 | 一句主標 + 主視覺 | — | — |
| 1 | AI 很聰明,但它需要看你的東西 | 1–2 | 用日常例子帶出 | 插圖 | S11 |
| 2 | 平常這代表有人看得到 | 1–2 | 問題具象化 | 插圖 | S11 |
| 3 | Apple 的點子:連我們自己都看不到 | 1–2 | 核心訊息 | — | S11 |
| 4a | 比喻一:用完就自我清空的房間(無狀態) | 2 | 跨頁插圖 + 短句 | M1 | S03 |
| 4b | 比喻二:只有你有鑰匙的盒子(無特權存取) | 2 | 跨頁插圖 + 短句 | M2 | S03 |
| 4c | 比喻三:人人都能查驗的收據(可驗證透明) | 2 | 跨頁插圖 + 短句 | M3 | S05 |
| 5 | 手機怎麼決定:簡單自己做,難的送到私密雲端 | 1–2 | 簡化決策圖 | D1(大眾化) | S04 |
| 6 | 這對你代表什麼 | 1–2 | 你能安心用聰明功能 | — | — |
| 7 | 常見問題 | 1–2 | 3–5 題白話 QA | — | §4 |
| 8 | 一頁總結 | 1 | 把全篇濃縮成一張圖 | D5(大眾化) | — |

形式:大字、大圖、留白、軟色;每頁文字極簡;零術語。

---

## 6. 設計系統

### 6.1 共用基底（`base.css`）
- 版面:A4;網格與基線一致;統一的標題階層、圖說、表格樣式、頁尾(標題 + 頁碼)。
- 引用:`[S0X]` 渲染為頁尾編號註腳,連回 §2 來源(見 §7)。
- 無障礙:足夠對比、語意標籤、圖片替代文字(即使輸出 PDF 也利於後續轉檔)。

### 6.2 三套主題
| 面向 | 開發者(`theme-developer`) | 使用者(`theme-power-user`) | 大眾(`theme-general`) |
|---|---|---|---|
| 調性 | 精確、技術 | 友善、清楚 | 親切、圖像 |
| 色彩 | 單色 + 一個冷調強調色 | 雙色 + 卡片底 | 柔和多彩 |
| 字型(內文) | Noto Sans CJK TC | Noto Sans CJK TC | Noto Sans CJK TC(可加圓體標題) |
| 等寬 | JetBrains Mono / IBM Plex Mono(碼) | 少量 | 無 |
| 排版密度 | 高;窄邊界;雙欄可選 | 中;留白多 | 低;大量留白 |
| 元件 | 流程圖、表、註腳、虛擬碼框 | 對照表、清單卡、pull-quote | 跨頁插圖、大標、FAQ 卡 |

### 6.3 圖表清單（= `design/diagrams.md`，畫一次、主題化重用）
- **D1** 端上 vs PCC 卸載決策
- **D2** 信任根 → Secure Boot → TXM 開機/碼信任鏈
- **D3** 請求生命週期(裝置 → relay → 節點 → 銷毀)
- **D4** attestation + transparency log(裝置先核對節點量測值在 log 中才封裝金鑰)
- **D5** 五大要求一覽
- **D6** VRE 工作流程
- **D7** 威脅模型/信任邊界
- **D8** 2026 Google Cloud 拓樸(雙信任根、confidential VM、硬體帳本)
- **M1/M2/M3** 大眾版三比喻插圖(自我清空的房間 / 只有你有鑰匙的盒子 / 人人可查的收據)

每張圖:來源 `[S0X]`、三主題各一套配色、SVG 存 `assets/diagrams/`。

### 6.4 CJK 字型與 PDF 注意事項(重要)
- 容器內**安裝 Noto Sans CJK TC / Noto Serif CJK TC**(或思源黑體/宋體);CSS `font-family` 以 CJK 字型為首,英文/數字 fallback 到 Inter/IBM Plex。
- Playwright `page.pdf()` **必須 `printBackground: true`**;Chromium 預設會嵌入實際使用到的字型 → 確保 CJK 不變豆腐字。
- 先跑 `build/smoke/cjk-test.html`(含中英混排、標點、註腳上標)驗證字型與分頁,再渲染正式內容。
- 分頁控制用 `break-before/break-inside`;圖與圖說避免跨頁切斷。

---

## 7. Build Pipeline（md → html → pdf）

**推薦路徑**:`Markdown → HTML(一次轉換) → PDF(Playwright Chromium 列印)`,三份共用 `base.css`,各掛 theme CSS。
理由:同引擎產三份、差異只在 CSS;Playwright 尊重 `@page`、`@media print`、分頁;大眾版插圖排版最自由。

`build/md2html.mjs` 職責:
```
1) 解析 markdown → 語意 HTML
2) 偵測 [S0X] token → 轉為頁尾編號註腳，註腳內容取自 source-index.md（§2）
3) 處理圖片 include（assets/diagrams、illustrations）與圖說
4) 套用對應 audience 的 HTML 外殼
```
`build/build.mjs` 職責:
```js
// for each audience in [developer, power-user, general]:
//   html = md2html(content/drafts/<n>.md)
//   inject base.css + theme-<audience>.css
//   page.pdf({ format:'A4', printBackground:true,
//             margin: render.config[audience].margin,
//             displayHeaderFooter:true,
//             headerTemplate/footerTemplate: 標題 + 頁碼 })
//   → dist/<name>.pdf
```
`render.config.json`:每份對應 主題 / 邊界 / 頁首頁尾 / 是否雙欄。

**替代單一工具**:免瀏覽器可用 **Typst**(CJK 佳、template 好維護)或 **Pandoc + LaTeX**(開發者版碼排版強),但犧牲大眾版視覺自由度。先用 Playwright,需要再換。

---

## 8. Claude Code 任務拆解

### 8.0 AGENTS.md 不變式
1. **事實單一來源**:事實只定義於 `knowledge-base.md`;草稿只引用,不自行新增宣稱。
2. **來源單一來源**:可用來源僅 §2 所列;只收 `security.apple.com` 與 `github.com/apple/*`;新增須給唯一 `S0X`。
3. **逐條可追溯**:KB 每條事實、草稿每個事實句,都對應 `source-map.md` 的 `S0X`。
4. **不發明能力**:不確定 → `TODO(verify)`,不得以第三方/記憶填補。
5. **準確性紅線**:遵守 §3.8。
6. **用詞一致**:依 §4 GLOSSARY;引入新詞先補表。
7. **內容語言**:繁體中文,術語首次附英文。
8. **受眾隔離**:深度/詞彙只改 `audiences/*` 與 theme CSS,不改 KB。
9. **管線單一**:視覺差異走 CSS,不另立第二套 build。

### 8.1 階段總表
| 階段 | 任務檔 | 產出 | 驗收 |
|---|---|---|---|
| 0 研究擷取 | `00-research-ingest.md` | `source-map.md` 骨架 + `sources/primary/` 存檔 + 補齊 S14+ | §8.2 清單全過 |
| 1 建事實庫 | `01-build-knowledge-base.md` | `knowledge-base.md` + `GLOSSARY.md` | §3/§4 齊全;每條附 `[S0X]`;`TODO` 結清或標明 |
| 2 定義受眾 | `02-define-audiences.md` | `audiences/*.md`×3(persona + §5 大綱) | 三份各含假設/詞彙/深度/篇幅/語氣 |
| 3 開發者草稿 | `03-draft-developer.md` | `drafts/01-developer.md` | 對齊 §5.1;事實全引自 KB;含 VRE 實證 |
| 4 使用者草稿 | `04-draft-power-user.md` | `drafts/02-power-user.md` | 對齊 §5.2;類比不失真;含評估清單 |
| 5 大眾草稿 | `05-draft-general-public.md` | `drafts/03-general-public.md` | 對齊 §5.3;零術語;FAQ |
| 6 設計與渲染 | `06-design-and-render.md` | `design/*` + `assets/*` + `build/*` + `dist/*.pdf` | 三份 PDF;三主題明確不同;CJK/註腳正確;分頁正常 |
| 7 稽核 | `07-qa-and-citation-check.md` | 稽核報告 + 修正 | §9 全過 |

### 8.2 `tasks/00-research-ingest.md`(完整,可直接貼)
```
## 目標
建立 sources/source-map.md 骨架，補齊 source-index.md（§2）遺漏章節，並存檔關鍵頁面。

## 輸入
- sources/source-index.md（S01–S13）
- AGENTS.md（特別是不變式 2、4）

## 不變式
- 只收 security.apple.com 與 github.com/apple/*。
- 任何新章節給新編號 S14+，附用途，不重編既有 S01–S13。
- 不確定資訊標 TODO(verify)，不得引用第三方。

## 步驟
1. 開啟 S01，從 S02(/navigation) 取完整章節清單；
   把 §2 未列章節（預期：簡介、主要硬體與軟體元件、Bounty for PCC 等）新增為 S14+。
2. 逐一確認 S01–S13（+新編）連結可達；將 S01/S11/S12/S13 等關鍵頁存檔到 sources/primary/，
   檔名用 S0X-... 對應。
3. 確認 S08 的 VRE 取得方式與授權條款（限研究用途），記入 source-map 備註。
4. 建立 sources/source-map.md，欄位：claim | 來源編號 | 章節定位（頁內錨點/小節）。
   先把 §3 種子事實逐條填為起始列。
5. 比對 S11/S12/S13 與指南差異，標註哪些事實進 KB、哪些僅作背景。

## 完成定義（逐項勾選）
- [ ] §2 章節已對照 S02 補齊（或註明 S02 無新增）。
- [ ] 所有來源連結可達；關鍵頁已存檔 sources/primary/。
- [ ] source-map.md 已建立且含 §3 全部種子事實列。
- [ ] VRE 授權條款已記錄。

## 禁止
- 不得新增 §2 以外網域之來源。
- 不得在本階段撰寫面向讀者的內容。
```

### 8.3 `tasks/01-build-knowledge-base.md`(完整,可直接貼)
```
## 目標
產出 content/knowledge-base.md（受眾中立、逐條附 [S0X]）與 docs/GLOSSARY.md。

## 輸入
- sources/source-index.md（§2）、sources/source-map.md、sources/primary/*
- 本計畫 §3、§4

## 不變式
- 每條事實必須對應 source-map 的 S0X；無來源者不得寫入。
- 機制名稱/數字以 Security Guide 為準；不確定標 TODO(verify)。
- 遵守 §3.8 準確性紅線（區分宣稱 vs 可驗證）。

## 步驟
1. 依 §3 結構撰寫事實庫：動機 / 五大要求 / 生命週期 / 硬體支柱 / 可驗證性與工具 /
   Bounty / 2026 擴展 / 準確性紅線。
2. 每條事實末尾標 [S0X]；多來源以逗號分隔。
3. 把裝置端模型參數量等第三方數字維持 TODO(verify)，或以 S01/S03 校正後填入。
4. 落地 §4 為 GLOSSARY.md。

## 完成定義
- [ ] §3 全部小節皆有對應內容且逐條附 [S0X]。
- [ ] 無任何無來源宣稱；TODO(verify) 已列清單待解。
- [ ] GLOSSARY.md 完成，與 KB 用詞一致。

## 禁止
- 不得引用 §2 以外來源；不得為「讓敘述更順」而加入未經查證的細節。
```

### 8.4 階段 2–7 提示(規格,沿用同一模板)
每支沿用「目標 / 輸入 / 不變式 / 步驟 / 完成定義 / 禁止」六段。重點:
- **02**:把 §5.1/§5.2/§5.3 大綱 + persona(假設背景、詞彙層級、深度、篇幅、語氣)寫進 `audiences/*.md`。
- **03–05**:嚴格依對應大綱與頁數目標撰寫;事實一律引 KB 的 `[S0X]`;大眾版禁術語、需 FAQ;使用者版需對照表與清單。
- **06**:實作 `base.css` + 三 theme、`md2html.mjs`/`build.mjs`、安裝 CJK 字型、跑 `cjk-test.html`、產三份 PDF。
- **07**:依 §9 稽核並修正。

---

## 9. 品質稽核（Phase 7）

通用:
- [ ] **引用完整性**:每個事實句對應 `source-map.md` 的 `S0X`;無孤兒宣稱。
- [ ] **來源純度**:無非 Apple 官方來源混入(對照 §2)。
- [ ] **無事實漂移**:三份對同一事實描述一致(僅深淺不同)。
- [ ] **用詞一致**:對照 §4 GLOSSARY。
- [ ] **準確性**:五大要求名稱/機制無誤;無「永遠看不到」式誇大;S13 控制權界線正確;`TODO(verify)` 全結清。
- [ ] **渲染**:CJK 不變豆腐字、註腳正確、分頁正常、三主題視覺明確區隔、字型嵌入。

逐版:
- [ ] **開發者**:VRE 實證步驟可被讀者實際照做;區分宣稱 vs 可驗證;達 28–40 頁且非灌水。
- [ ] **使用者**:類比正確不誤導;評估清單可實際拿去用;達 14–22 頁。
- [ ] **大眾**:零術語;比喻不誤導;每頁文字量克制;達 12–18 頁。

---

## 10. 里程碑與工作量（相對估計，依你節奏調整）

| 里程碑 | 涵蓋階段 | 相對工作量 | 關鍵風險 |
|---|---|---|---|
| M1 來源與事實底定 | 0–1 | 中 | S02 章節遺漏、第三方數字混入 |
| M2 受眾與大綱定稿 | 2 | 小 | 三版差異不夠明確 |
| M3 三份草稿完成 | 3–5 | 大 | 事實漂移、大眾版誤用術語 |
| M4 設計與渲染 | 6 | 中 | CJK 字型、分頁、三主題辨識度 |
| M5 稽核出版 | 7 | 中 | 引用孤兒、頁數灌水 |

建議節奏:M1 一個工作段落先打穩(其餘全靠它);M3 三份草稿可並行但共用同一 KB;M4 先把開發者版跑通管線,再套另兩主題。

---

## 11. 啟動步驟
1. `git init pcc-privacy-explainers`,建立 §1 目錄骨架。
2. 落地:§2 → `sources/source-index.md`、§4 → `docs/GLOSSARY.md`、本檔 → `docs/PLAN.md`、§8.0 → `AGENTS.md`。
3. 跑 `tasks/00-research-ingest.md`(§8.2):打開 S01,從 S02 補齊章節與配套資源確切 URL,存檔 `sources/primary/`,建 `source-map.md`。
4. 逐階段 0→7,一階段一 commit;每階段先讀 `AGENTS.md`。

> 主參考起點:`https://security.apple.com/documentation/private-cloud-compute`(S01);該頁需 JavaScript,Phase 0 以 S02 為權威目錄補齊。
