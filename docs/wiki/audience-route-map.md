# Audience Route Map

> **導航層，非事實來源。** 說明同一個 KB claim 如何被 Developer / Power User / General 三種受眾版本重述。
>
> 本檔不引入新事實。受眾「框架／密度」依 `../../content/audiences/*` 與 `../../content/drafts/*`；事實依 `../../content/knowledge-base.md`；來源依 `../../sources/source-index.md`、`../../sources/source-map.md`。
> 路由＝「在哪一章、用什麼框架呈現」，**不改變技術意義**（`AGENTS.md` #8）。無法確認者標 `TODO: verify`。

## Purpose

讓維護者一眼看到：一條共用事實，在三個受眾版本分別落在哪一章、用什麼角度（精確機制 / 風險解讀 / 比喻）呈現，以及牽動哪些來源與圖。

> 章節編號取自各 audience spec 的逐節大綱（`content/audiences/*.md`）。若草稿（`content/drafts/*`）與 spec 章節不一致，以實際草稿為準並更新本表。

## Audience Route Table

| KB Claim Area | Developer Route | Power User Route | General Route | Related Source IDs | Related Diagrams | Notes |
|---|---|---|---|---|---|---|
| Request lifecycle | ch4「請求生命週期」+ ch5「Attested Request Handling」（機制層） | ch3「你的請求的旅程」（簡化、白話） | ch5「手機怎麼決定」（大眾化決策） | S04, S05 | D3；D1（大眾） | KB §3.3 / §3.3.1；對應 PCC-CLAIM-003 |
| Attestation | ch3「信任根與開機鏈」+ ch5「節點驗證三檢查」 | ch4「為什麼可驗證」白話「認證」 | 以 M3「收據」間接承載；正文不出現術語 | S14, S16, S04, S05, S23 | D2、D4；M3 | KB §3.3/§3.4；對應 PCC-CLAIM-005 |
| Transparency log | ch7「可驗證透明性」（log 結構、90 天、log-backed map） | ch4「別人能查 Apple 的宣稱」（簡化） | ch4c「人人都能查驗的收據」（M3） | S05, S30, S43, S12 | D4；M3 | KB §3.5.1；對應 PCC-CLAIM-009 |
| VRE | ch8「動手驗證：VRE 實戰」（pccvre 流程） | ch4 概念帶過「可親自查驗」 | 不單獨出現（避免技術名詞，依 general spec G 政策） | S12, S32, S33, S34, S18, S08 | D6 | KB §3.5.2/§3.5.3；VRE≠REM（見 claim-index CLAIM-006） |
| Stateless computation | ch2 ①（含未來快取密碼學例外） | ch2 類比「用完即丟、不留底」 | ch4a「用完就自我清空的房間」（M1） | S03, S20, S16 | M1 | KB §3.2①/§3.9；對應 PCC-CLAIM-007 |
| OHTTP / relay | ch4（TGT/OTT、OHTTP、Cloudflare/Fastly、金鑰透明） | ch3「匿名轉送、用完即棄」 | ch5 簡化為「送到上鎖的雲」 | S04, S11 | D3 | KB §3.2④/§3.3；relay 仍暴露概略地理區域（KB §3.9）；對應 PCC-CLAIM-004 |
| Data retention | ch2 ① + ch9「管理與維運」（log/metrics/crash 過濾、保留期） | ch3「用完即棄」 | ch4a「自我清空的房間」（M1） | S03, S04, S16, S07 | M1 | KB §3.2①/§3.9/§3.11；維運出口有受控有限保留；對應 PCC-CLAIM-010 |
| Google Cloud extension | ch12「2026 擴展」（confidential VM、雙信任根、硬體帳本、控制權界線） | ch6「標準在擴大，但 Apple 仍掌控簽核」 | TODO: verify（大眾版大綱未列 2026 擴展章節，是否刻意省略待確認） | S13 | D8 | KB §3.7；核心紅線見 trust-boundary-map §4；對應 PCC-CLAIM-012 |

## 使用說明

- **要改某 claim 在某受眾的呈現**：先確認本表對應的 KB §（事實不動），再去 `content/audiences/*` 改框架、`design/*` 改視覺。
- **三版一致性檢查**：同一列的三條路由，深淺可不同、**事實不得矛盾**（對應 `tasks/07` 與 `tasks/09` 的稽核項）。
- **新增列**：先在 `claim-index.md` 建對應 claim group，再回填本表；無法確認的格子標 `TODO: verify`，不要臆測。

## 已知待確認（TODO: verify）

- **General × Google Cloud extension**：大眾版大綱（`content/audiences/general-public.md`，ch0–ch8）未含 2026 擴展；需確認為刻意省略或待補。
- **General × Attestation / VRE**：大眾版依設計**正文不出現技術名詞**，故以比喻（M3）間接承載或不出現——此為設計選擇而非遺漏，但實際草稿落點仍建議人工複核。
