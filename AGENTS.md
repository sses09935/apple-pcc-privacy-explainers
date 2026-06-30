# AGENTS.md — Agent 不變式

> 對應 `docs/PLAN.md` §8.0。**每個階段開工前先讀本檔。**
> 核心設計哲學：**單一真實來源（single source of truth）+ 反漂移**。
> 事實只定義一次，三份文件只是不同視角的「再框架」。

## 不變式（強制）

1. **事實單一來源**：事實只定義於 `content/knowledge-base.md`；草稿只引用，不自行新增宣稱。
2. **來源單一來源**：可用來源僅 `sources/source-index.md`（§2）所列；只收 `security.apple.com` 與 `github.com/apple/*`；新增須給唯一 `S0X`（遞增、不重用）。
3. **逐條可追溯**：KB 每條事實、草稿每個事實句，都對應 `sources/source-map.md` 的 `S0X`。
4. **不發明能力**：不確定 → 標 `TODO(verify)`，不得以第三方／記憶填補。
5. **準確性紅線**：遵守 §3.8——不寫「Apple 永遠看不到任何東西」；保證適用於 **PCC 請求**且威脅模型有假設邊界；開發者版區分「**Apple 宣稱** vs **可獨立驗證**」；S13 擴展不等於把資料交給第三方任意處理。
6. **用詞一致**：依 `docs/GLOSSARY.md`（§4）；引入新詞先補表再使用。
7. **內容語言**：繁體中文，術語首次出現附英文。
8. **受眾隔離**：深度／詞彙差異只改 `content/audiences/*` 與 theme CSS，不改 KB 事實。
9. **管線單一**：視覺差異一律走 CSS，不另立第二套 build。
10. **視覺單一來源**：任何 CSS、diagram、Web UI、PDF layout 或視覺系統的改動都必須遵循 `DESIGN.md`（圖表另見 `design/diagram-style.md`）。`DESIGN.md` 可定義呈現規則、design tokens、受眾密度與視覺限制，但**不得新增技術事實**；技術事實仍屬 `content/knowledge-base.md`，來源權威仍屬 `sources/source-index.md` 與 `sources/source-map.md`。
11. **Claim wiki 僅供導航**：`docs/wiki/` 下的檔案是導航與維護輔助，**不得新增事實、新的來源解讀，或比 KB 更強的宣稱**。若 wiki 條目與 `content/knowledge-base.md`、`sources/source-index.md` 或 `sources/source-map.md` 衝突，以 KB 與來源檔為準。

## 階段紀律
- 一階段一 commit；每階段先讀本檔，再讀對應 `tasks/0X-*.md`。
- 順序：Phase 0 → 1 → 2 → 3/4/5（可並行，共用同一 KB）→ 6 → 7。
- Phase 7 是**全部不變式的強制執行關卡**：不得在無證據下標 pass；不得靜默刪除無法查證的宣稱（補來源或刪除並註明二選一）。
