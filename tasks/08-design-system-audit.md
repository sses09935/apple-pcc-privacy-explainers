# Task 08 — 設計系統稽核（Design System Audit）

## 目標
驗證 PCC 的視覺改動遵循 [`DESIGN.md`](../DESIGN.md)，且**未改變技術意義**。

## 必讀
- `DESIGN.md`
- `design/base.css`
- `design/site.css`
- `design/theme-developer.css`
- `design/theme-power-user.css`
- `design/theme-general.css`
- `design/diagram-style.md`
- `design/diagrams.md`

## 不變式（AGENTS.md）
- #10 視覺單一來源：視覺改動須遵循 `DESIGN.md`，不得新增技術事實。
- #8 受眾隔離、#9 管線單一：密度／詞彙只改 audiences + theme CSS，視覺差異一律走 CSS。

## 檢查清單
- [ ] `DESIGN.md` 存在，且與目前的 CSS／圖表系統相符。
- [ ] CSS 改動遵循已宣告的 design tokens 與受眾模式。
- [ ] PDF 版面改動保留來源標示與 claim 可追溯性。
- [ ] Web UI 改動未模仿 Apple 官方頁面。
- [ ] D-series 圖維持技術性。
- [ ] M／G-series 插圖維持比喻性。
- [ ] 視覺強調未加強技術宣稱（不超出 KB／source-map 支持）。
- [ ] 來源標示維持可見且可讀。
- [ ] 無障礙與可讀性維持可接受（對比、CJK 字型嵌入、語意標籤）。

## 產出
把設計稽核結果記入 `qa-report.md` 或對應的 release note。

## 禁止
- 不得在無證據下標 pass。
- 不得為了版面而隱藏來源標示或弱化準確性紅線。
