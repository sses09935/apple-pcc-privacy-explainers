# Task 09 — Claim Wiki 稽核（Claim Wiki Audit）

## 目標
驗證 `docs/wiki/` 維持**導航性質**，且**未引入新事實**。

## 必讀
- `docs/wiki/claim-index.md`
- `docs/wiki/trust-boundary-map.md`
- `docs/wiki/audience-route-map.md`
- `content/knowledge-base.md`
- `sources/source-index.md`
- `sources/source-map.md`
- `AGENTS.md`
- `CONTRIBUTING.md`

## 不變式（AGENTS.md）
- #11 Claim wiki 僅供導航：不得新增事實、新的來源解讀或更強宣稱；衝突時以 KB／source 為準。
- #3 逐條可追溯、#4 不發明能力、#5 準確性紅線。

## 檢查清單
- [ ] 每個主要 wiki claim 都能回溯到 `content/knowledge-base.md`。
- [ ] 每個來源引用都能回溯到 `sources/source-index.md`。
- [ ] 每個 claim group 與 `sources/source-map.md` 相容（不矛盾）。
- [ ] 受眾路由未改變技術意義。
- [ ] 信任邊界警語與專案準確性紅線一致（對照 KB §3.8 / `trust-boundary-map.md`）。
- [ ] 未新增任何未獲支持的 Apple、PCC、Google Cloud 或隱私宣稱。
- [ ] 不確定處標 `TODO: verify`，而非以臆測解決。
- [ ] wiki 檔案明確標示為導航性質、非權威來源。

## 產出
把 claim wiki 稽核結果記入 `qa-report.md` 或對應的 release note。

## 禁止
- 不得在無證據下標 pass。
- 不得靜默把 `TODO: verify` 改寫成事實；補來源或保留標記二選一。
