/**
 * 試算表魔法冒險 v2 - 第四章禁術動作實作
 * 包含：排序 (單一、多重、自訂)、篩選 (一般、進階、公式)
 * ★ 教學優化版 ★
 */

window.ch4Actions = {
    /**
     * 下拉選單：排序與篩選 (標準 Excel 版)
     */
    sort_filter_group(anchorEl) {
        window.uiManager.showDropdown([
            { icon: '⏫', text: '從 A 到 Z 排序', action: 'sort_asc' },
            { icon: '⏬', text: '從 Z 到 A 排序', action: 'sort_desc' },
            { icon: '🔀', text: '自訂排序...', action: 'open_sort_dialog' },
            { icon: '🔍', text: '篩選', action: 'filter_apply' }
        ], anchorEl);
    },

    /**
     * 禁術：單一條件排序 (從 A 到 Z / 最小到最大)
     */
    sort_asc() {
        console.log("Action: Executing sort_asc");
        const state = window.orchestrator.state;

        // [新增]: 驗證選取範圍。如果是整欄或多格選取，提示錯誤 habit
        const range = state.selectedRange;
        if (range && (range.minRow !== range.maxRow || range.minCol !== range.maxCol)) {
            window.orchestrator.playStorySegment("fail_SORT_selection");
            return;
        }

        const data = state.gridData;
        const colIdx = state.selectedCell.c;
        if (data.length <= 1) return;

        const header = data[0];
        const body = data.slice(1);

        body.sort((a, b) => {
            const valA = a[colIdx] ? a[colIdx].toString() : "";
            const valB = b[colIdx] ? b[colIdx].toString() : "";
            const nA = parseFloat(valA), nB = parseFloat(valB);
            if (!isNaN(nA) && !isNaN(nB)) return nA - nB;
            return valA.localeCompare(valB, 'zh-Hant');
        });

        state.sheets[state.activeSheetId] = [header, ...body];
        window.gridRenderer.render();
        window.orchestrator.validateAction("SORT_ASC");
    },

    filter(anchorEl) {
        window.uiManager.showDropdown([
            { icon: '🔍', text: '套用篩選', action: 'filter_apply' },
            { icon: '⚡', text: '進階篩選', action: 'filter_adv' },
            { icon: '🧪', text: '公式篩選', action: 'filter_formula' }
        ], anchorEl);
    },

    /**
     * 禁術：單一條件排序 (從 Z 到 A)
     * 會根據目前選取的欄位執行
     */
    sort_desc() {
        console.log("Action: Executing sort_desc (Stroke Count Mode)");
        const state = window.orchestrator.state;

        // [新增]: 驗證選取範圍。如果是整欄或多格選取，提示錯誤 habit
        const range = state.selectedRange;
        if (range && (range.minRow !== range.maxRow || range.minCol !== range.maxCol)) {
            window.orchestrator.playStorySegment("fail_SORT_selection");
            return;
        }

        const data = state.gridData;
        const colIdx = state.selectedCell.c;

        if (data.length <= 1) return;

        const header = data[0];
        const body = data.slice(1);

        // 模擬繁體中文 Excel 筆劃排序 (Z-A 降序: 筆劃多到少)
        // 輕 (14) > 重 (9) > 中 (4) | 穩 (19) > 虛 (12) > 命 (8)
        const strokeMap = { 
            "輕": 14, "重": 9, "中": 4,
            "穩": 19, "虛": 12, "命": 8
        };

        body.sort((a, b) => {
            const valA = a[colIdx] ? a[colIdx].toString() : "";
            const valB = b[colIdx] ? b[colIdx].toString() : "";
            
            // 如果是等級相關欄位 (Ch4 病情, Ch4.5 緊急程度)，使用筆劃模擬
            if (colIdx === 3) {
                const sA = strokeMap[valA[0]] || 0;
                const sB = strokeMap[valB[0]] || 0;
                if (sA !== sB) return sB - sA; 
            }

            // 處理數值與一般字串
            const nA = parseFloat(valA), nB = parseFloat(valB);
            if (!isNaN(nA) && !isNaN(nB)) return nB - nA;
            return valB.localeCompare(valA, 'zh-Hant'); // 使用繁體中文排序慣例
        });

        state.sheets[state.activeSheetId] = [header, ...body];
        window.gridRenderer.render();
        window.orchestrator.validateAction("SORT_DESC");
    },

    /**
     * 開啟自訂排序對話框 (擬真 Excel 版)
     */
    open_sort_dialog() {
        console.log("Action: Opening Realistic Sort Dialog");
        window.uiManager.openSortDialog();
    },

    /**
     * 執行複雜排序 (支援多層級與自訂清單)
     * @param {Array} levels - [{col: number, order: 'asc'|'desc'|'custom'}]
     */
    execute_complex_sort(levels) {
        console.log("Action: Executing complex sort", levels);
        const state = window.orchestrator.state;
        const data = state.gridData;
        if (data.length <= 1) return;

        const header = data[0];
        const body = data.slice(1);
        
        // 優先級對照表 (動態判定章節)
        const chapterId = state.currentChapter.toString();
        const priorityOrder = (chapterId === "45") 
            ? { "命危": 1, "虛弱": 2, "穩定": 3 }
            : { "重症": 1, "中症": 2, "輕症": 3 };

        body.sort((a, b) => {
            for (const lvl of levels) {
                const colIdx = lvl.col;
                const valA = a[colIdx];
                const valB = b[colIdx];

                // 處理自訂清單 (針對等級欄位)
                if (colIdx === 3 && (lvl.order === 'custom_done' || lvl.order === 'custom')) {
                    const pA = priorityOrder[valA] || 99;
                    const pB = priorityOrder[valB] || 99;
                    if (pA !== pB) return pA - pB;
                    continue; // 同級則看下一層
                }

                // 一般排序
                if (valA === valB) continue;

                const nA = parseFloat(valA), nB = parseFloat(valB);
                if (!isNaN(nA) && !isNaN(nB)) {
                    if (nA !== nB) {
                        return lvl.order === 'asc' ? nA - nB : nB - nA;
                    }
                    continue; // 數值相等則看下一層
                }

                const res = valA.toString().localeCompare(valB.toString(), 'zh-Hant');
                if (res !== 0) {
                    return lvl.order === 'asc' ? res : -res;
                }
            }
            return 0;
        });

        state.sheets[state.activeSheetId] = [header, ...body];
        window.gridRenderer.render();

        // 驗證邏輯：根據目前任務判定是否過關
        const currentTask = state.activeChapterModule.simulator.tasks[state.currentTaskIndex];
        
        if (currentTask.id === "CUSTOM_SORT_TASK") {
            // 驗證是否選對欄位與自訂序列
            const isCorrect = levels.some(lvl => lvl.col === 3 && (lvl.order === 'custom_done' || lvl.order === 'custom'));
            if (isCorrect) {
                window.orchestrator.validateAction("SORT_CUSTOM");
            } else {
                window.uiManager.showMagicToast("記得在「病情等級」欄位套用「自訂清單」喔！", "error");
            }
        } else if (currentTask.id === "MULTI_SORT_TASK") {
            // [嚴格驗證]: 必須至少兩層，且順序正確
            const lv0 = levels[0], lv1 = levels[1];
            
            console.log("Validation MULTI_SORT_TASK:", levels);

            // 判斷第一層是否為自訂排序 (可能是 custom_done 或是文字 "重症, 中症, 輕症")
            const isLv0Custom = lv0 && (lv0.order === 'custom_done' || lv0.order === 'custom' || String(lv0.order).includes('重症'));
            const isLv0Correct = lv0 && lv0.col === 3 && isLv0Custom;
            
            // 判斷第二層是否為等待時數且為 desc
            const isLv1Correct = lv1 && lv1.col === 4 && (lv1.order === 'desc');

            if (levels.length >= 2 && isLv0Correct && isLv1Correct) {
                window.orchestrator.validateAction("SORT_MULTI");
            } else {
                if (levels.length < 2) {
                    window.uiManager.showMagicToast("米羅提醒：需要「新增層級」來同時考慮等待時間喔！", "error");
                } else if (!isLv0Correct) {
                    window.uiManager.showMagicToast("第一條件應為「病情等級」的自訂序列。", "error");
                } else if (!isLv1Correct) {
                    window.uiManager.showMagicToast("第二條件應為「等待時數」且從 Z 到 A 排序。", "error");
                }
            }
        }
    },

    /**
     * 禁術：多條件排序
     * [邏輯]: 第一條件：病情等級 (自訂序列)，第二條件：等待時數 (大->小)
     */
    sort_multi() {
        console.log("Action: Executing sort_multi");
        const state = window.orchestrator.state;
        const data = state.gridData;
        if (data.length <= 1) return;

        const header = data[0];
        const body = data.slice(1);
        const order = { "重症": 1, "中症": 2, "輕症": 3 };

        body.sort((a, b) => {
            // 第一條件: 病情等級 (第 3 欄)
            const priorityA = order[a[3]] || 99;
            const priorityB = order[b[3]] || 99;
            if (priorityA !== priorityB) return priorityA - priorityB;

            // 第二條件: 等待時數 (第 4 欄)
            return parseFloat(b[4]) - parseFloat(a[4]);
        });

        state.sheets[state.activeSheetId] = [header, ...body];
        window.gridRenderer.render();
        window.orchestrator.validateAction("SORT_MULTI");
    },

    /**
     * 禁術：自訂排序 (病情等級)
     * [序列]: 重症 > 中症 > 輕症
     */
    sort_custom() {
        console.log("Action: Executing sort_custom");
        const state = window.orchestrator.state;
        const data = state.gridData;
        if (data.length <= 1) return;

        const header = data[0];
        const body = data.slice(1);
        const order = { "重症": 1, "中症": 2, "輕症": 3 };

        body.sort((a, b) => {
            const valA = order[a[3]] || 99;
            const valB = order[b[3]] || 99;
            return valA - valB;
        });

        state.sheets[state.activeSheetId] = [header, ...body];
        window.gridRenderer.render();
        window.orchestrator.validateAction("SORT_CUSTOM");
    },

    /**
     * 禁術：切換篩選模式 (開啟漏斗箭頭)
     */
    filter_apply() {
        const state = window.orchestrator.state;
        state.isFilterActive = !state.isFilterActive;
        
        console.log("Action: Toggle Filter Mode", state.isFilterActive);
        window.gridRenderer.render();
        
        if (state.isFilterActive) {
            window.uiManager.showMagicToast("篩選模式已開啟！請點選欄位標題旁的 ▼ 進行過濾。", "success");
        } else {
            this.reset_data(); // 關閉篩選時還原資料
        }
    },

    /**
     * 執行特定欄位的篩選
     */
    execute_column_filter(colIdx, selectedValues) {
        const state = window.orchestrator.state;
        
        // 驗證任務：檢查是否過濾了正確的欄位
        const currentTask = state.activeChapterModule.simulator.tasks[state.currentTaskIndex];
        if (currentTask.id === "FILTER_TASK") {
            const expectedCol = 5; // 所需藥材 (Ch4) / 所需物資 (Ch4.5)
            if (colIdx !== expectedCol) {
                window.orchestrator.playStorySegment("fail_FILTER_wrong_column");
                // 在真實 Excel 中，即使點錯欄位篩選也會執行。我們這裡也執行渲染，但給予劇情提示。
            }
        }

        // 永遠從原始數據開始篩選，以支援連續多次篩選
        const originalData = JSON.parse(JSON.stringify(state.activeChapterModule.initialGridData));
        if (!originalData || originalData.length <= 1) return;

        const header = originalData[0];
        const body = originalData.slice(1);

        const filteredBody = body.filter(row => {
            const val = row[colIdx] ? row[colIdx].toString() : "";
            return selectedValues.includes(val);
        });

        state.sheets[state.activeSheetId] = [header, ...filteredBody];
        window.gridRenderer.render();
        
        // 驗證過關條件
        if (currentTask.id === "FILTER_TASK" && colIdx === 5) {
            const chapterId = state.currentChapter.toString();
            const expectedVal = (chapterId === "45") ? "淨水符" : "青霜草";
            
            // 1. 成功判定：只選了正確的物資
            if (selectedValues.length === 1 && selectedValues[0] === expectedVal) {
                window.orchestrator.validateAction("FILTER_APPLY");
            } 
            // 2. 失敗判定：選了空內容
            else if (selectedValues.length === 0) {
                window.orchestrator.playStorySegment("fail_FILTER_empty");
                this.reset_data(); // 自動還原
            }
            // 3. 失敗判定：選錯藥材或選了多個
            else {
                window.orchestrator.playStorySegment("fail_FILTER_wrong");
            }
        }
    },

    reset_data() {
        const state = window.orchestrator.state;
        if (state.activeChapterModule && state.activeChapterModule.initialGridData) {
            state.sheets[state.activeSheetId] = JSON.parse(JSON.stringify(state.activeChapterModule.initialGridData));
            window.gridRenderer.render();
        }
    },

    /**
     * 禁術：進階篩選 (來源村莊 = 霧谷村 OR 病情等級 = 重症)
     */
    filter_adv() {
        const state = window.orchestrator.state;
        const data = state.gridData;
        if (data.length <= 1) return;

        const header = data[0];
        const body = data.slice(1);
        const filteredBody = body.filter(row => row[2] === "霧谷村" || row[3] === "重症");

        state.sheets[state.activeSheetId] = [header, ...filteredBody];
        window.gridRenderer.render();
        window.orchestrator.validateAction("FILTER_ADV");
    },

    /**
     * 禁術：公式篩選 (等待時數 > 3)
     */
    filter_formula() {
        const state = window.orchestrator.state;
        const data = state.gridData;
        if (data.length <= 1) return;

        const header = data[0];
        const body = data.slice(1);
        const filteredBody = body.filter(row => parseFloat(row[4]) > 3);

        state.sheets[state.activeSheetId] = [header, ...filteredBody];
        window.gridRenderer.render();
        window.orchestrator.validateAction("FILTER_FORMULA");
    }
};
