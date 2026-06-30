# [S01] Private Cloud Compute Security Guide（主指南入口）

- **URL**：https://security.apple.com/documentation/private-cloud-compute
- **擷取日**：2026-06-22
- **性質**：主指南頁為 **JavaScript 渲染**，正文無法機器擷取。以下為站內搜尋確認之章節清單 +
  官方對指南涵蓋範圍之描述。**章節原文內容待 Phase 1 以瀏覽器逐頁校正（`TODO(verify)`）。**

## 指南涵蓋範圍（官方描述）
指南提供 PCC 各元件及其協作的完整技術細節，主題包含：
- PCC attestation 如何建立在硬體實作的不可變基礎之上；
- PCC 請求如何被認證與路由以達成 non-targetability；
- 如何在技術上確保你能檢視 Apple 資料中心實際執行的軟體；
- PCC 的隱私與安全特性在各種攻擊情境下如何成立。

## 章節清單（經 security.apple.com 站內搜尋確認 URL 存在）
| 編號 | 章節 | URL slug |
|---|---|---|
| S02 | Navigating the Security Guide | `/navigation` |
| S19 | Release Notes | `/releasenotes` |
| S03 | Core Security & Privacy Requirements | `/corerequirements` |
| S14 | Hardware Root of Trust | `/hardwarerootoftrust` |
| S15 | Hardware Integrity | `/hardwareintegrity` |
| S16 | Software Foundations | `/softwarefoundations` |
| S17 | Software Layering | `/softwarelayering` |
| S04 | Request Flow | `/requestflow` |
| S05 | Verifiable Transparency | `/verifiabletransparency` |
| S18 | Inspecting Releases | `/inspectingreleases` |
| S06 | Management & Operations | `/management` |
| S07 | Anticipating Attacks | `/attacks` |

> 順序為依官方資訊架構推定；**確切 TOC 順序與是否仍有遺漏，待瀏覽器開啟 S02 核對**。
