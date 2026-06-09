/**
 * 試算表魔法冒險 v2 - 第一章禁術動作實作
 * 包含：凍結、跳轉、交換、新增工作表、自動填滿、插入日期
 */

window.ch1Actions = {
    /**
     * 禁術：凍結窗格 (入口)
     * 現在由 UIManager 接管，點擊後會顯示下拉選單
     */
    freezepanes() {
        console.log("Action: Clicked freezepanes ribbon button");
        // 邏輯已搬移至 UIManager.triggerAction 與子動作
    },

    /**
     * 實際執行：凍結頂端列 (下拉選單選項之一)
     */
    freeze_top() {
        console.log("Action: Executing freeze_top");
        const state = window.orchestrator.state;
        
        state.isFrozen = true;

        // 鎖定第一列 A-F 欄
        const targetCols = ['A', 'B', 'C', 'D', 'E', 'F'];
        targetCols.forEach(col => {
            const cellId = `${col}1`;
            if (!state.cellStyles[cellId]) state.cellStyles[cellId] = {};
            
            state.cellStyles[cellId].position = 'sticky';
            state.cellStyles[cellId].top = '28px';
            state.cellStyles[cellId].zIndex = '200';
            
            state.cellStyles[cellId].backgroundColor = "#f4faf6"; 
            state.cellStyles[cellId].borderBottom = "2px solid #217346";
            state.cellStyles[cellId].fontWeight = "bold";
        });

        window.gridRenderer.render();
        // 📡 關鍵：這才是任務要求的驗證點
        window.orchestrator.validateAction("FREEZE_PANES");
    },

    /**
     * 下拉選單其他選項 (擴充用)
     */
    freeze_logic() { window.orchestrator.playStorySegment('fail_FREEZE_wrong'); },
    freeze_first_col() { window.orchestrator.playStorySegment('fail_FREEZE_wrong'); },

    /**
     * 禁術：快速跳轉 (智慧邊界偵測 - Ctrl + Down)
     */
    quickjump: () => {
        console.log("Action: Executing smart quickjump (Down)");
        const self = window.ch1Actions;
        const state = window.orchestrator.state;
        const data = state.gridData;
        const start = state.selectedCell;
        
        if (!data || !start) return;

        const targetRowIdx = self._findBoundaryRow(data, start.r, start.c, 'down');
        const targetColIdx = start.c;

        self._performJump(targetRowIdx, targetColIdx);
        window.orchestrator.validateAction('QUICK_JUMP');
    },

    /**
     * [內部輔助]: 尋找資料邊界行索引
     */
    _findBoundaryRow: (data, startRow, startCol, direction) => {
        const totalRows = data.length;
        const step = direction === 'down' ? 1 : -1;
        const isEmpty = (r) => {
            if (r < 0 || r >= totalRows) return true;
            const val = data[r][startCol];
            return val === "" || val === undefined || val === null;
        };

        let curr = startRow;
        const next = curr + step;

        if (isEmpty(curr)) {
            // 1. 從空白跳到下一個非空白
            while (curr + step >= 0 && curr + step < totalRows) {
                curr += step;
                if (!isEmpty(curr)) return curr;
            }
        } else if (next >= 0 && next < totalRows && isEmpty(next)) {
            // 2. 從非空白跳到下一個非空白 (跨過空白區)
            while (curr + step >= 0 && curr + step < totalRows) {
                curr += step;
                if (!isEmpty(curr)) return curr;
            }
        } else {
            // 3. 從非空白跳到當前區塊的邊緣
            while (curr + step >= 0 && curr + step < totalRows) {
                if (isEmpty(curr + step)) return curr;
                curr += step;
            }
        }
        
        return direction === 'down' ? totalRows - 1 : 0;
    },

    /**
     * [內部輔助]: 執行跳轉視覺與聚焦
     */
    _performJump: (rIdx, cIdx) => {
        const state = window.orchestrator.state;
        const wrapper = document.getElementById('wrapper');
        const rowHeight = window.gridRenderer.rowHeight || 32;

        // 1. 更新選取狀態
        window.gridRenderer.updateSelectionRange(cIdx, rIdx, cIdx, rIdx);
        state.selectedCell = { r: rIdx, c: cIdx };
        window.gridRenderer.render();

        // 2. 執行捲動
        if (wrapper) {
            const targetScrollTop = rIdx * rowHeight - wrapper.clientHeight / 2;
            wrapper.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: 'smooth'
            });
        }

        // 3. 強制聚焦
        setTimeout(() => {
            const colLabel = String.fromCharCode(65 + cIdx);
            const targetCellId = `${colLabel}${rIdx + 1}`;
            const targetEl = document.getElementById(targetCellId);
            if (targetEl) {
                targetEl.focus({ preventScroll: true }); 
            }
        }, 300);
    },

    /**
     * 禁術：欄位對調 (B 欄「等級」與 C 欄「類別」對調)
     */
    columnswap() {
        console.log("Action: Executing columnswap");
        const state = window.orchestrator.state;
        const data = state.gridData;
        
        // 1. 物理交換數據 (每一列的索引 1 與 2)
        data.forEach((row) => {
            const tempVal = row[1];
            row[1] = row[2];
            row[2] = tempVal;
        });

        // 2. 視覺反饋：自動選取新的 C 欄 (原 B 欄已移至此)
        window.gridRenderer.updateSelectionRange(2, 0, 2, data.length - 1);
        window.gridRenderer.render();

        // 3. 📡 呼叫大腦驗證
        window.orchestrator.validateAction('COLUMN_SWAP');
    },

    /**
     * 禁術：新增工作表
     */
    addsheet() {
        console.log("Action: Executing addsheet");
        const newData = [
            ["(新分頁：草料物資庫)", "", "", "", "", ""],
            ["編號", "品項", "類別", "狀態", "", ""],
            ["MP-001", "優質乾草", "普通", "已入庫", "", ""],
            ["MP-002", "魔法燕麥", "稀有", "待檢驗", "", ""],
            ["", "世界樹嫩葉", "傳說", "運送中", "", ""],
            ["", "晨曦苜蓿", "稀有", "已入庫", "", ""],
            ["", "地底苔蘚", "普通", "待檢驗", "", ""],
            ["", "甜味漿果", "普通", "運送中", "", ""],
            ["", "發光小麥", "稀有", "已入庫", "", ""],
            ["", "冰原冷草", "稀有", "待檢驗", "", ""],
            ["", "沙漠仙人掌", "普通", "運送中", "", ""],
            ["", "月光草", "傳說", "待檢驗", "", ""]
        ];
        
        // 使用新系統新增工作表
        window.orchestrator.addSheet('st-1_2', newData, "🌾 草料物資庫");
        
        window.orchestrator.validateAction("ADD_SHEET");
    },
/**
 * 禁術：自動填滿 (智慧識別版 - 穩健強化)
 */
autofill() {
    console.log("Action: Executing autofill (Robust Mode)");
    const state = window.orchestrator.state;
    const data = state.gridData;
    const source = state.fillSourceRange;
    const fullRange = state.selectedRange;

    if (!source || !fullRange || !data) return;

    // 清除公式引用的視覺標記
    state.formulaRefs = [];

    // [優化]: 支援多欄同時填滿，並處理向上/向下兩個方向
    for (let colIdx = fullRange.minCol; colIdx <= fullRange.maxCol; colIdx++) {
        // 取得源頭範圍的數據
        const sourceCells = [];
        for (let r = source.minRow; r <= source.maxRow; r++) {
            sourceCells.push(data[r][colIdx]);
        }

        const sourceHeight = sourceCells.length;
        if (sourceHeight === 0) continue;

        const baseValRaw = sourceCells[0];
        const baseVal = (baseValRaw !== undefined && baseValRaw !== null) ? baseValRaw.toString() : "";

        if (sourceHeight === 1) {
            // --- 模式 A：公式拓印 或 複製術 ---
            for (let r = fullRange.minRow; r <= fullRange.maxRow; r++) {
                // 跳過源頭單元格
                if (r >= source.minRow && r <= source.maxRow) continue;
                if (!data[r]) continue;

                if (baseVal.startsWith('=')) {
                    const rowOffset = r - source.minRow;
                    data[r][colIdx] = this._adjustFormulaRow(baseVal, rowOffset);
                } else {
                    data[r][colIdx] = baseValRaw; // 複製原始值與類型
                }
            }
            
            // 觸發反向教學 (僅在特定任務中)
            if (!baseVal.startsWith('=')) {
                const task = state.activeChapterModule?.simulator?.tasks?.[state.currentTaskIndex];
                if (task && task.id === "AUTO_FILL") {
                    window.orchestrator.playStorySegment('fail_FILL_single');
                }
            }
        } else if (sourceHeight === 2) {
            // --- 模式 B：序列術 ---
            const val1Raw = sourceCells[0];
            const val2Raw = sourceCells[1];
            const val1 = (val1Raw !== undefined && val1Raw !== null) ? val1Raw.toString() : "";
            const val2 = (val2Raw !== undefined && val2Raw !== null) ? val2Raw.toString() : "";

            const match1 = val1.match(/\d+/);
            const match2 = val2.match(/\d+/);

            if (match1 && match2) {
                const num1 = parseInt(match1[0]) || 0;
                const num2 = parseInt(match2[0]) || 0;
                const prefix = val1.replace(/\d+/, "");
                const step = num2 - num1;

                for (let r = fullRange.minRow; r <= fullRange.maxRow; r++) {
                    if (r >= source.minRow && r <= source.maxRow) continue;
                    if (!data[r]) continue;

                    // 計算相對於 source.maxRow 的偏移
                    const offset = r - source.maxRow;
                    const nextNum = num2 + (step * offset);
                    const formattedNum = String(nextNum).padStart(match1[0].length, '0');
                    data[r][colIdx] = prefix + formattedNum;
                }
            } else {
                // 交替重複模式
                for (let r = fullRange.minRow; r <= fullRange.maxRow; r++) {
                    if (r >= source.minRow && r <= source.maxRow) continue;
                    if (!data[r]) continue;
                    const offset = r - source.minRow;
                    data[r][colIdx] = (offset % 2 === 0) ? val1Raw : val2Raw;
                }
            }
        }
    }

    // [核心]: 修改後立即強制渲染，確保 textContent 更新
    window.gridRenderer.render();

    // 📡 廣播可能的動作訊號
    const signals = ["AUTO_FILL", "FORMULA_SUM_APPLY", "ABS_REF_APPLY", "RANK_APPLY"];
    signals.forEach(sig => window.orchestrator.validateAction(sig));
},

    /**
     * [內部輔助]: 調整公式中的相對引用行號
     */
    _adjustFormulaRow(formula, rowOffset) {
        // Regex 匹配儲存格引用，如 A1, $A1, A$1, $A$1
        return formula.replace(/(\$?)([A-Z]+)(\$?)([0-9]+)/g, (match, colAbs, col, rowAbs, row) => {
            if (rowAbs === '$') {
                return match; // 絕對引用行號，不予調整
            }
            const newRow = parseInt(row) + rowOffset;
            return colAbs + col + rowAbs + newRow;
        });
    },

    /**
     * 禁術：插入日期 (Ctrl + ;)
     */
    insertdate() {
        console.log("Action: Executing insertdate");
        const state = window.orchestrator.state;
        const data = state.gridData;
        const range = state.selectedRange;
        const today = new Date().toLocaleDateString();
        
        // [反向教學]: 檢查分頁與欄位
        if (state.activeSheetId !== 'st-1') {
            window.orchestrator.playStorySegment('fail_DATE_wrong_sheet');
            return;
        }

        if (range && (range.minCol !== 4 || range.maxCol !== 4)) {
            window.orchestrator.playStorySegment('fail_DATE_wrong_col');
            return;
        }

        if (range) {
            for (let r = range.minRow; r <= range.maxRow; r++) {
                for (let c = range.minCol; c <= range.maxCol; c++) {
                    if (data[r]) data[r][c] = today;
                }
            }
        } else {
            if (data[0]) data[0][0] = today;
        }

        window.gridRenderer.render();
        window.orchestrator.validateAction("INSERT_DATE");
    },

    /**
     * 禁術：回跳頂端 (智慧邊界偵測 - Ctrl + Up)
     */
    jumpup: () => {
        console.log("Action: Executing smart jumpup (Up)");
        const self = window.ch1Actions;
        const state = window.orchestrator.state;
        const data = state.gridData;
        const start = state.selectedCell;

        if (!data || !start) return;

        const targetRowIdx = self._findBoundaryRow(data, start.r, start.c, 'up');
        const targetColIdx = start.c;

        self._performJump(targetRowIdx, targetColIdx);
        window.orchestrator.validateAction('JUMP_UP');
    },
};
