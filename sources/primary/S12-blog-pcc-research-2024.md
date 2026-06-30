# [S12] Security research on Private Cloud Compute（2024/10）

- **URL**：https://security.apple.com/blog/pcc-security-research/
- **擷取日**：2026-06-22
- **性質**：WebFetch 擷取**摘要（非逐字）**；金額/措辭於 Phase 1 對 S09/S10 再校。

## 四項釋出
1. **Security Guide**：PCC 架構完整技術細節（attestation 根植硬體、請求認證與 non-targetability、軟體檢視能力、攻擊情境分析）。
2. **Virtual Research Environment (VRE)**：Apple 首次為其平台打造的 VRE。在 VM 中以「僅微幅修改」執行 PCC 節點軟體。能力：
   - 列出/檢視 PCC 軟體發布
   - 驗證 transparency log 一致性
   - 下載發布 binary
   - 在虛擬環境 boot 發布
   - 對展示模型推論
   - 修改與除錯 PCC 軟體
   - 技術特點：**虛擬 Secure Enclave Processor（SEP）**（首次可對此元件做安全研究）、paravirtualized graphics。
   - 需求：Apple silicon Mac、16GB+ 統一記憶體；macOS Sequoia 15.1 Developer Preview 提供。
3. **Source Code**（限用授權，經 apple/security-pcc GitHub repo）：
   - **CloudAttestation**（建構與驗證 attestation）
   - **Thimble**（privatecloudcomputed daemon）
   - **splunkloggingd** daemon（log 過濾）
   - **srd_tools**（VRE 工具）
4. **Apple Security Bounty 擴展**：PCC 專屬類別，對齊關鍵威脅。

## Bounty 類別與最高獎勵（官方公布）
| 類別 | 最高獎勵 |
|---|---|
| 具 entitlements 的遠端任意碼執行 | $1,000,000 |
| 取得信任邊界外的使用者請求資料 | $250,000 |
| 具特權網路位置存取請求資料 | $150,000 |
| 未經 attest 之碼執行能力 | $100,000 |
| 意外資料揭露（部署/設定缺陷） | $50,000 |

Apple 表示，即使不符既定類別，凡對 PCC 有重大影響之安全問題仍會評估給獎。
