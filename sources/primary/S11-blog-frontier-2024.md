# [S11] Private Cloud Compute: A new frontier for AI privacy in the cloud

- **URL**：https://security.apple.com/blog/private-cloud-compute/
- **擷取日**：2026-06-22
- **性質**：WebFetch 擷取**摘要（非逐字）**；數字/措辭於 Phase 1 需對指南原文校正。

## 動機
Apple Intelligence 需要雲端大型基礎模型處理超出裝置能力的複雜請求。傳統雲端安全模型不足：無法驗證隱私承諾、無法提供執行期透明、無法強制限制特權存取。PCC 把「Apple 裝置業界領先的安全與隱私帶進雲端」。

## 五大核心要求
1. **Stateless computation on personal user data**：個資僅為完成請求而處理，對任何人（含 Apple 員工）不可得，回應後不留痕跡。
2. **Enforceable guarantees**：「保證在完全技術可強制時最強」，不依賴信任邊界外元件或管理性後門。
3. **No privileged runtime access**：排除 SSH、remote shell 等管理介面，避免員工於故障/事件時繞過隱私保證。
4. **Non-targetability**：攻擊者無法在不破壞整個 PCC 系統的前提下鎖定特定使用者資料，即使具實體硬體存取。
5. **Verifiable transparency**：研究者需能「以高度信心驗證」隱私保證與公開承諾相符，透過可檢視的生產軟體。

## 請求生命週期
裝置直接把請求加密給已驗證之 PCC 節點公鑰，繞過信任邊界外的 load balancer。請求含有限 metadata、不含 PII，並帶基於 **RSA Blind Signatures** 的單次用憑證。第三方營運的 **OHTTP relay** 遮蔽來源 IP。回應後資料刪除；加密金鑰每次重開機隨機產生且不持久化，達成密碼學抹除。

## 硬體與軟體基礎
- **硬體**：自研 Apple silicon 伺服器，採 iPhone 級安全——Secure Enclave 與 Secure Boot 阻止未授權碼執行。
- **軟體**：以 iOS/macOS 為基礎的 hardened OS 子集，縮小攻擊面；Code Signing 與 sandboxing 強制執行期完整性；機器學習堆疊以 Swift on Server 實作，確保記憶體安全。
- **Attestation 與透明性**：Secure Enclave UID 憑證驗證硬體真實性；生產軟體量測值寫入 append-only transparency log 防竄改；裝置端在送出加密請求前驗證 PCC 節點跑的是已公開登錄的軟體。

## 端上優先
Apple 優先在裝置端處理，PCC 以密碼學強制（而非政策承諾）把此模型延伸到雲端工作負載。

## Binary 發布政策
承諾公開發布「每個 PCC 生產 build」，於「納入 log 後 90 天內，或相關軟體更新可得時，以較早者為準」。

## 透明性創舉
PCC 將以**明文**釋出 **sepOS 韌體**與 **iBoot bootloader**，提供前所未有的 bootloader 層碼存取。並提供 PCC Virtual Research Environment 於 Apple silicon Mac 模擬節點，定期隨 binary 釋出關鍵安全源碼。
