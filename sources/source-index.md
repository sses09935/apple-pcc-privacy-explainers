# Source Index（唯一來源清單）

> 對應 `docs/PLAN.md` §2。本檔為**唯一來源清單**，引用慣例：`[S0X]`。
>
> **收錄原則**：只收 Apple 官方來源（`security.apple.com` 與 `github.com/apple/*`）。
> 第三方解讀文章一律**不納入**。**完整指南章節（TOC）已於 2026-06-22 用 Claude in Chrome
> 開啟 S02（/navigation）JS 渲染後抓取**，存檔於 `primary/S02-navigation.md`。
>
> 編號規則：**唯一遞增、不重用**；編號順序反映「發現順序」，非 TOC 順序（TOC 順序見下方分組）。

## A. 主參考 / 配套資源 / 官方背景

| 編號 | 層級 | 名稱 | 連結 | 用途 |
|---|---|---|---|---|
| **S01** | **主參考** | PCC Security Guide（主指南入口） | `https://security.apple.com/documentation/private-cloud-compute` | 主連結；整份指南起點 |
| S02 | 指南導覽 | Navigating the Security Guide（TOC） | `.../private-cloud-compute/navigation` | 權威完整目錄（已存檔） |
| S08 | 配套資源 | apple/security-pcc（開源碼） | `https://github.com/apple/security-pcc` | 官方源碼，供獨立驗證（**限用授權、禁再散布**） |
| S09 | 配套資源 | Apple Security Bounty | `https://security.apple.com/bounty` | PCC 漏洞獎勵入口 |
| S10 | 配套資源 | Bounty Guidelines | `https://security.apple.com/bounty/guidelines/` | 獎勵規則與資格 |
| S11 | 官方背景 | A new frontier for AI privacy（2024 公告） | `https://security.apple.com/blog/private-cloud-compute/` | PCC 首次發表（已存檔） |
| S12 | 官方背景 | Security research on PCC（2024/10） | `https://security.apple.com/blog/pcc-security-research/` | 指南+VRE+源碼+Bounty（已存檔） |
| S13 | 官方背景 | Expanding PCC（2026） | `https://security.apple.com/blog/expanding-pcc/` | 擴展至 Google Cloud + NVIDIA（已存檔） |

## B. 指南章節（依官方 TOC 分組）
> 連結基底：`https://security.apple.com/documentation/private-cloud-compute/<slug>`

| 編號 | 章節 | slug |
|---|---|---|
| **Core Requirements** | | |
| S03 | Core Security & Privacy Requirements | `corerequirements` |
| S20 | Stateless Computation and Enforceable Guarantees | `statelessandenforcable` |
| S21 | No Privileged Runtime Access | `noprivilegedaccess` |
| S22 | Non-Targetability | `nontargetability` |
| S05 | Verifiable Transparency | `verifiabletransparency` |
| **Hardware and Software** | | |
| S14 | Hardware Root of Trust | `hardwarerootoftrust` |
| S15 | Hardware Integrity | `hardwareintegrity` |
| S16 | Software Foundations | `softwarefoundations` |
| S17 | Software Layering | `softwarelayering` |
| **Request Processing** | | |
| S04 | Request Flow | `requestflow` |
| S23 | Attested Request Handling | `requesthandling` |
| S24 | Runtime Configuration and Assets | `runtimeconfigassets` |
| S25 | Transitive Trust | `transitivetrust` |
| S26 | Stateless Inference | `statelessinference` |
| S27 | PCC Agent | `pccagent` |
| S28 | Visual Lookup | `visuallookup` |
| S29 | Private Information Retrieval | `pir` |
| **Transparency and Management** | | |
| S30 | Release Transparency | `releasetransparency` |
| S06 | Management & Operations | `management` |
| **Security Analysis** | | |
| S07 | Anticipating Attacks | `attacks` |
| S31 | Source Code（指南內導覽至 S08） | `sourcecode` |
| **Virtual Research Environment** | | |
| S32 | Virtual Research Environment | `virtualresearchenvironment` |
| S33 | Get Started with the VRE | `vresetup` |
| S34 | Interact with the VRE | `vreinteraction` |
| S35 | Research Variant | `vreresearchvariant` |
| S36 | Shadow Tunneling | `vreshadow` |
| S18 | Inspecting Releases | `inspectingreleases` |
| **Reference** | | |
| S19 | Release Notes | `releasenotes` |
| S37 | Reporting Issues | `reportingissues` |
| S38 | Appendix: Secure Boot Tags | `appendix_secureboot` |
| S39 | Appendix: Trust Cache Format | `appendix_trustcache` |
| S40 | Appendix: Secure Boot Ticket Canonicalization | `appendix_uniqtags` |
| S41 | Appendix: System Configuration | `appendix_systemconfig` |
| S42 | Appendix: Attestation Bundle Contents | `appendix_attestationbundle` |
| S43 | Appendix: Transparency Log | `appendix_transparencylog` |
| S44 | Appendix: Apple Intelligence Report | `appendix_appleintelligencereport` |

## 配套資源內含元件（非獨立 URL）
S08 內含 `CloudAttestation`（建構/驗證節點 attestation）、`Thimble`（`privatecloudcomputed` daemon，搭配透明性驗證）、`splunkloggingd`（log 過濾）、`srd_tools`（VRE 工具）等，限研究用途授權。**VRE 無獨立公開 URL**，透過 S08 + Apple silicon Mac 上 macOS 取得；引用記為 `S08 / VRE`，操作說明見 S32–S36。

## 維護規則
1. 新增來源只能 `security.apple.com` 或 `github.com/apple/*`。
2. 唯一編號遞增，不重用。
3. KB 不得引用清單外來源。

> **Phase 0 狀態（2026-06-22）**：S02 完整 TOC 已抓取，§2 章節**已對照補齊**（新增 S14–S44）。
> 各章節**內文**（S03–S07、S14–S44）尚未逐頁細讀 → 由 Phase 1 寫 KB 時依需求逐頁擷取校正。
