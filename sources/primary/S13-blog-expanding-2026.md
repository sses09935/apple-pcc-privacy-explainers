# [S13] Expanding Private Cloud Compute（2026）

- **URL**：https://security.apple.com/blog/expanding-pcc/
- **擷取日**：2026-06-22
- **性質**：WebFetch 擷取**摘要（非逐字）**；措辭於 Phase 1 對原文校正。

## 核心擴展
Apple 首次把 PCC 延伸到第三方基礎設施，與 **Google** 和 **NVIDIA** 合作，在 **Google Cloud** 上運行 Apple Intelligence 工作負載，同時維持隱私保護。先前 PCC「為雲端 AI 隱私立下新標竿」，僅在 Apple silicon 上運行。

## 合作細節
與 Google 合作打造新一代 Apple Foundation Models，借助「其 **Gemini** 系列模型背後的技術」。對於 agentic 工具使用與推理等複雜任務，雙方「將 PCC 基礎設施部署到使用 **NVIDIA GPU** 的 Google Cloud 系統，同時維持 Apple 強大的安全與隱私保護」。

## 五大要求不變
Apple 確認「我們的核心 PCC 要求完全不變：stateless computation、enforceable guarantees、no privileged runtime access、non-targetability、verifiable transparency」。

## 技術架構（Google Cloud 上）
- 「每個請求的初始網路資料解析在其專屬 namespace 內的專屬 process 進行」
- 共用推論軟體經短生命週期回收
- 「attested 金鑰置於與外部輸入隔離的獨立、專屬 confidential VM」

## 供應鏈防護
維護「PCC 機隊中所有 Google Cloud 硬體的密碼學可驗證 append-only 帳本」。對敏感元件，「軟體 attestation 根植於至少兩個來自獨立廠商的信任根」。

## 控制與透明
關鍵：「**Apple 完整保留對 PCC 軟體的控制；Apple 裝置只會信任經 Apple 密碼學核准的 PCC 軟體**」。所有 binary 將可公開檢視，並透過 Apple security bounty 維持研究存取。
