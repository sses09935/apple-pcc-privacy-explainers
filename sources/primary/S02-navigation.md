# [S02] Navigating the Security Guide（完整 TOC）

- **URL**：https://security.apple.com/documentation/private-cloud-compute/navigation
- **擷取日**：2026-06-22
- **方式**：Claude in Chrome 擴充開啟，**JS 渲染後**抓取（含各章節 href slug）。此為權威完整目錄。

## Overview（官方導言）
> 指南分成模組化章節，可逐步學習 PCC。建議從 **Core Requirements** 開始（PCC 的主要安全與隱私設計準則 + 達成方式概觀）。**Hardware and Software** 解釋可信硬體/軟體組成，支撐 **Request Processing** 中更高處理層的信任。最後 **Transparency and Management**、**Security Analysis**、**Virtual Research Environment** 說明研究者如何理解與驗證生產 PCC 系統的安全特性。

## 完整章節（依官方分組，附 slug）
**Core Requirements**
- `corerequirements` — Core Security & Privacy Requirements
- `statelessandenforcable` — Stateless Computation and Enforceable Guarantees
- `noprivilegedaccess` — No Privileged Runtime Access
- `nontargetability` — Non-Targetability
- `verifiabletransparency` — Verifiable Transparency

**Hardware and Software**
- `hardwarerootoftrust` — Hardware Root of Trust
- `hardwareintegrity` — Hardware Integrity
- `softwarefoundations` — Software Foundations
- `softwarelayering` — Software Layering

**Request Processing**
- `requestflow` — Request Flow
- `requesthandling` — Attested Request Handling
- `runtimeconfigassets` — Runtime Configuration and Assets
- `transitivetrust` — Transitive Trust
- `statelessinference` — Stateless Inference
- `pccagent` — PCC Agent
- `visuallookup` — Visual Lookup
- `pir` — Private Information Retrieval

**Transparency and Management**
- `releasetransparency` — Release Transparency
- `management` — Management & Operations

**Security Analysis**
- `attacks` — Anticipating Attacks
- `sourcecode` — Source Code

**Virtual Research Environment**
- `virtualresearchenvironment` — Virtual Research Environment
- `vresetup` — Get Started with the VRE
- `vreinteraction` — Interact with the VRE
- `vreresearchvariant` — Research Variant
- `vreshadow` — Shadow Tunneling
- `inspectingreleases` — Inspecting Releases

**Reference**
- `releasenotes` — Release Notes
- `reportingissues` — Reporting Issues
- `appendix_secureboot` — Appendix: Secure Boot Tags（Image4 manifest 格式）
- `appendix_trustcache` — Appendix: Trust Cache Format
- `appendix_uniqtags` — Appendix: Secure Boot Ticket Canonicalization
- `appendix_systemconfig` — Appendix: System Configuration
- `appendix_attestationbundle` — Appendix: Attestation Bundle Contents
- `appendix_transparencylog` — Appendix: Transparency Log（與透明性日誌服務通訊協定）
- `appendix_appleintelligencereport` — Appendix: Apple Intelligence Report（裝置端可得之透明性資料）
