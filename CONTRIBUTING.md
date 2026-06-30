# 貢獻指南（Contributing）

本專案的核心是 **provenance discipline**：事實只定義一次、逐條附 Apple 官方來源 `[S0X]`、用引用稽核降低內容漂移（見 [`AGENTS.md`](AGENTS.md) 不變式與 [`qa-report.md`](qa-report.md)）。為維持這點，貢獻規則刻意嚴格。

## 接受的 PR

1. **修正錯字、排版、PDF/HTML 渲染問題。**
2. **補充 Apple 官方來源**（`security.apple.com` 或 `github.com/apple/*`）——新增來源請給唯一遞增的 `S0X`，並更新 `sources/source-index.md`、`sources/source-map.md`。
3. **修正與 Apple 官方來源不一致的敘述**（請附上對應官方頁面/章節）。
4. **改善繁體中文可讀性**，但**不得新增未引用的事實**。

## 不接受的 PR

- 第三方新聞、部落格、轉述或行銷話術作為來源。
- 未經 Apple 官方確認的模型規格、參數量或數字。
- 對 Apple PCC 能力的延伸推測（例如「所以它一定也能…」）。
- 任何會稀釋準確性紅線的敘述（見下）。

## 準確性紅線（務必遵守）

- 不寫「Apple 永遠看不到任何資料」式的誇大；保證適用於 PCC 請求、威脅模型有假設邊界。
- 區分「**Apple 宣稱**」與「**可獨立驗證**」；**不得**宣稱可重現建置（Apple 未提供 reproducible builds）。
- 2026 的 Google Cloud 擴展 **不等於**把資料交給第三方任意處理。
- 不確定的名稱/數字 → 標 `TODO(verify)`，不以第三方填補。

## 提交前自我檢查

```bash
cd build && npm install
node build.mjs            # 重新產出 dist/*.pdf（需要本機 Chrome）
node check-sources.mjs    # 來源純度：只允許 Apple 官方網域
node check-refs.mjs       # 引用完整性：每個 [S0X] 都對應 source-index
```

CI（GitHub Actions）會在 PR 上自動跑上述 `check-sources` 與 `check-refs`，以及 PDF build 冒煙測試。**這些必須通過**才會考慮合併。

## 設計與圖表變更

在修改 CSS、圖表、PDF 版面或 Web UI 前：

1. 先讀 [`DESIGN.md`](DESIGN.md)。
2. 若改動觸及圖表，先讀 [`design/diagram-style.md`](design/diagram-style.md)。
3. 確認視覺改動**不改變技術意義**。
4. 確認 D-series 圖維持技術性、M／G-series 插圖維持比喻性。
5. 確認來源標示與 claim 可追溯性完整未受損。

## Claim wiki 變更

[`docs/wiki/`](docs/wiki/) 下的檔案是導航輔助。編輯時：

1. 不得新增技術事實。
2. claim 一律回連 [`content/knowledge-base.md`](content/knowledge-base.md)。
3. 來源權威一律回連 [`sources/source-index.md`](sources/source-index.md) 與 [`sources/source-map.md`](sources/source-map.md)。
4. 不確定處標 `TODO: verify`，不要臆測。

## 用詞與語言

- 內容語言：繁體中文，技術術語首次出現附英文。
- 用詞依 [`docs/GLOSSARY.md`](docs/GLOSSARY.md)；若引入新詞，請先補術語表再使用。

謝謝你協助維持這份文件的可信度。
