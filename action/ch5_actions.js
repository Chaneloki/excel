/**
 * 試算表魔法冒險 v2 - 第五章禁術動作實作
 * 包含：分類匯總(小計)、嵌套小計、資料驗證
 */

window.ch5Actions = {
    // 取得當前章節的欄位配置
    _getColConfig() {
        const chapter = window.orchestrator.state.currentChapter.toString();
        if (chapter === "55") {
            return { hh: 2, cat: 3, qty: 4, reg: 2, catName: "物資類別", hhName: "登記人" };
        }
        // 預設為 Ch 5 (50)
        return { hh: 1, cat: 2, qty: 3, reg: 4, catName: "物資種類", hhName: "戶名" };
    },

    sort_filter_group(anchorEl) {
        window.uiManager.showDropdown([
            { icon: '⏫', text: '從 A 到 Z 排序', action: 'sort_asc' },
            { icon: '⏬', text: '從 Z 到 A 排序', action: 'sort_desc' }
        ], anchorEl);
    },

    sort_asc() {
        const state = window.orchestrator.state;
        const data = state.gridData;
        const cfg = this._getColConfig();
        const colIdx = state.selectedCell?.c ?? cfg.cat; 
        if (data.length <= 1) return;

        const currentTask = state.activeChapterModule?.simulator?.tasks[state.currentTaskIndex];
        const range = state.selectedRange;
        const isWholeColumn = range && range.minRow === 0 && range.maxRow >= data.length - 1;
        
        const isCh50 = state.currentChapter.toString() === "50";
        const isCh55 = state.currentChapter.toString() === "55";

        if (isWholeColumn && currentTask?.id === "SORT_TASK") {
            if (isCh50) window.orchestrator.playStorySegment("discovery_COLUMN_SELECT_SORT");
            return;
        }

        const isPartialRange = range && (range.maxRow > range.minRow || range.maxCol > range.minCol) && !isWholeColumn;
        if (isPartialRange && isCh50) {
            window.orchestrator.playStorySegment("discovery_SORT_RANGE");
            return;
        }

        // [反向教學]: 在整個第 5 章中，精準判斷選錯的欄位並給予理由
        if (isCh50 && colIdx !== cfg.cat) {
            const failMap = { 0: "fail_SORT_col_0", 1: "fail_SORT_col_1", 3: "fail_SORT_col_3", 4: "fail_SORT_col_4" };
            window.uiManager.showMagicToast(`「點錯欄位囉！請先點選『${cfg.catName}』。」`, "error");
            window.orchestrator.playStorySegment(failMap[colIdx] || "fail_SORT_wrong");
            return;
        }
        
        if (isCh55 && colIdx !== cfg.cat) {
            window.uiManager.showMagicToast(`「排序位置不對喔，請再想想。」`, "error");
            return;
        }

        const header = data[0];
        const body = data.slice(1);

        body.sort((a, b) => {
            const valA = a[colIdx]?.toString() || "";
            const valB = b[colIdx]?.toString() || "";
            const nA = parseFloat(valA), nB = parseFloat(valB);
            let cmp = (!isNaN(nA) && !isNaN(nB)) ? nA - nB : valA.localeCompare(valB, 'zh-Hant');
            if (cmp === 0) {
                const secondaryIdx = (colIdx === cfg.cat) ? cfg.hh : cfg.cat;
                return (a[secondaryIdx]?.toString()||"").localeCompare(b[secondaryIdx]?.toString()||"", 'zh-Hant');
            }
            return cmp;
        });

        state.sheets[state.activeSheetId] = [header, ...body];
        state.cellStyles = {};
        window.gridRenderer.render();
        
        const validatedCol = state.selectedCell?.c ?? colIdx;
        window.orchestrator.validateStateChange({ type: "ACTION", id: "SORT_ASC", col: validatedCol });
    },

    sort_desc() {
        const state = window.orchestrator.state;
        const data = state.gridData;
        const cfg = this._getColConfig();
        const colIdx = state.selectedCell?.c ?? cfg.cat;
        if (data.length <= 1) return;

        const currentTask = state.activeChapterModule?.simulator?.tasks[state.currentTaskIndex];
        const range = state.selectedRange;
        const isWholeColumn = range && range.minRow === 0 && range.maxRow >= data.length - 1;

        const isCh50 = state.currentChapter.toString() === "50";
        const isCh55 = state.currentChapter.toString() === "55";

        if (isWholeColumn && currentTask?.id === "SORT_TASK") {
            if (isCh50) window.orchestrator.playStorySegment("discovery_COLUMN_SELECT_SORT");
            return;
        }

        const isPartialRange = range && (range.maxRow > range.minRow || range.maxCol > range.minCol) && !isWholeColumn;
        if (isPartialRange && isCh50) {
            window.orchestrator.playStorySegment("discovery_SORT_RANGE");
            return;
        }

        if (isCh50 && colIdx !== cfg.cat) {
            const failMap = { 0: "fail_SORT_col_0", 1: "fail_SORT_col_1", 3: "fail_SORT_col_3", 4: "fail_SORT_col_4" };
            window.uiManager.showMagicToast(`「點錯欄位囉！請先點選『${cfg.catName}』。」`, "error");
            window.orchestrator.playStorySegment(failMap[colIdx] || "fail_SORT_wrong");
            return;
        }

        if (isCh55 && colIdx !== cfg.cat) {
            window.uiManager.showMagicToast(`「排序位置不對喔，請再想想。」`, "error");
            return;
        }

        if (currentTask && currentTask.id === "SORT_TASK") {
            if (isCh50) window.orchestrator.playStorySegment("fail_SORT_desc");
            return;
        }

        const header = data[0];
        const body = data.slice(1);
        body.sort((a, b) => {
            const valA = a[colIdx]?.toString() || "";
            const valB = b[colIdx]?.toString() || "";
            const nA = parseFloat(valA), nB = parseFloat(valB);
            let cmp = (!isNaN(nA) && !isNaN(nB)) ? nB - nA : valB.localeCompare(valA, 'zh-Hant');
            if (cmp === 0) {
                const secondaryIdx = (colIdx === cfg.cat) ? cfg.hh : cfg.cat;
                return (b[secondaryIdx]?.toString()||"").localeCompare(a[secondaryIdx]?.toString()||"", 'zh-Hant');
            }
            return cmp;
        });

        state.sheets[state.activeSheetId] = [header, ...body];
        state.cellStyles = {};
        window.gridRenderer.render();
        const validatedCol = state.selectedCell?.c ?? colIdx;
        window.orchestrator.validateStateChange({ type: "ACTION", id: "SORT_DESC", col: validatedCol });
    },

    data_group(anchorEl) {
        window.uiManager.showDropdown([
            { icon: '<img src="icon/小計.png" style="width:16px;vertical-align:middle;">', text: '小計...', action: 'open_subtotal_dialog' }
        ], anchorEl);
    },

    validation_btn(anchorEl) {
        this.open_validation_dialog();
    },

    open_subtotal_dialog() {
        const modalId = 'ch5-subtotal-modal';
        let modal = document.getElementById(modalId);
        const cfg = this._getColConfig();
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal-layer';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.zIndex = '9000';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="excel-dialog" style="width: 320px;">
                <div class="excel-dialog-header">
                    <span>小計</span>
                    <button class="excel-close" onclick="document.getElementById('${modalId}').style.display='none'">×</button>
                </div>
                <div class="excel-dialog-body" style="padding: 15px; font-size:12px;">
                    <label>分組小計欄位(A):</label><br>
                    <select id="subtotal-group-col" style="width:100%; margin:5px 0; border: 1px solid #ccc; padding: 3px;">
                        <option value="${cfg.cat}">${cfg.catName}</option>
                        <option value="${cfg.hh}">${cfg.hhName}</option>
                    </select>
                    <br><br>
                    <label>使用函數(U):</label><br>
                    <select style="width:100%; margin:5px 0; border: 1px solid #ccc; padding: 3px;" disabled>
                        <option>加總</option>
                    </select>
                    <br><br>
                    <label>新增小計位置(V):</label><br>
                    <div style="border:1px solid #999; height:80px; background:#fff; padding:5px; overflow-y:auto; margin:5px 0;">
                        <label><input type="checkbox" id="subtotal-sum-col" value="${cfg.qty}" checked> 數量</label><br>
                        <label><input type="checkbox" disabled> 編號</label><br>
                    </div>
                    <br>
                    <label><input type="checkbox" id="subtotal-replace" checked> 替換目前小計(R)</label>
                </div>
                <div class="excel-dialog-footer">
                    <button class="excel-ok" onclick="window.ch5Actions.confirm_subtotal()" style="padding: 5px 25px;">確定</button>
                    <button class="excel-cancel" onclick="document.getElementById('${modalId}').style.display='none'" style="padding: 5px 25px;">取消</button>
                </div>
            </div>
        `;
        
        const state = window.orchestrator.state;
        const currentTask = state.activeChapterModule?.simulator?.tasks[state.currentTaskIndex];
        document.getElementById('subtotal-replace').checked = true;
        if (currentTask?.id === "SUBTOTAL_NESTED_TASK") {
            document.getElementById('subtotal-group-col').value = cfg.hh.toString();
            document.getElementById('subtotal-replace').checked = false;
        } else {
            document.getElementById('subtotal-group-col').value = cfg.cat.toString();
        }
        modal.style.display = 'flex';
    },

    confirm_subtotal() {
        const groupCol = parseInt(document.getElementById('subtotal-group-col').value);
        const replace = document.getElementById('subtotal-replace').checked;
        const cfg = this._getColConfig();
        const sumCol = cfg.qty;
        
        document.getElementById('ch5-subtotal-modal').style.display = 'none';

        const state = window.orchestrator.state;
        const currentTask = state.activeChapterModule.simulator.tasks[state.currentTaskIndex];
        state.cellStyles = {};

        if (currentTask.id === "SUBTOTAL_TASK") {
            if (groupCol !== cfg.cat) {
                window.orchestrator.playStorySegment("fail_SUBTOTAL_wrong_col");
                return;
            }

            const dataRows = state.gridData.slice(1);
            let isSorted = true;
            for(let i=0; i < dataRows.length - 1; i++) {
                if (dataRows[i][cfg.cat] && dataRows[i+1][cfg.cat] && dataRows[i][cfg.cat].localeCompare(dataRows[i+1][cfg.cat], 'zh-Hant') > 0) {
                    isSorted = false; break;
                }
            }
            if (!isSorted) {
                window.orchestrator.playStorySegment("fail_SUBTOTAL_no_sort");
                return;
            }
            
            const newData = [state.gridData[0]];
            let lastGroup = dataRows[0][cfg.cat];
            let subtotal = 0, grandTotal = 0;
            const subtotalRowIndices = [];

            for(let i=0; i < dataRows.length; i++) {
                if (dataRows[i][cfg.cat] !== lastGroup) {
                    const subtotalRow = Array(state.gridData[0].length).fill("");
                    subtotalRow[cfg.cat] = lastGroup + " 總計";
                    subtotalRow[cfg.qty] = subtotal;
                    subtotalRowIndices.push(newData.length);
                    newData.push(subtotalRow);
                    grandTotal += subtotal; lastGroup = dataRows[i][cfg.cat]; subtotal = 0;
                }
                newData.push(dataRows[i]);
                subtotal += Number(dataRows[i][cfg.qty]) || 0;
            }
            const lastSubtotalRow = Array(state.gridData[0].length).fill("");
            lastSubtotalRow[cfg.cat] = lastGroup + " 總計"; lastSubtotalRow[cfg.qty] = subtotal;
            subtotalRowIndices.push(newData.length); newData.push(lastSubtotalRow);
            grandTotal += subtotal;
            const totalRow = Array(state.gridData[0].length).fill("");
            totalRow[cfg.cat] = "總計"; totalRow[cfg.qty] = grandTotal;
            subtotalRowIndices.push(newData.length); newData.push(totalRow);
            
            state.sheets[state.activeSheetId] = newData;
            state.isOutlineVisible = true;
            subtotalRowIndices.forEach(rIdx => {
                for (let c = 0; c < state.gridData[0].length; c++) {
                    const cellId = String.fromCharCode(65 + c) + (rIdx + 1);
                    state.cellStyles[cellId] = { fontWeight: 'bold', backgroundColor: '#f2f2f2' };
                }
            });
            window.gridRenderer.render();
            window.orchestrator.validateStateChange({ type: "ACTION", id: "SUBTOTAL_APPLY", col: cfg.cat });

        } else if (currentTask.id === "SUBTOTAL_NESTED_TASK") {
            if (replace) {
                window.orchestrator.playStorySegment("fail_NESTED_replaced");
                return;
            }
            if (groupCol !== cfg.hh) return;

            const dataRows = state.gridData.slice(1);
            let isGroupBroken = false, currentCat = dataRows[0] ? dataRows[0][cfg.cat] : null, hasSeenSubtotal = false;
            for(let i = 0; i < dataRows.length; i++) {
                const r = dataRows[i];
                if (r[cfg.cat] === "總計") break;
                if (r[cfg.cat] && r[cfg.cat].includes("總計")) {
                    hasSeenSubtotal = true;
                    if (dataRows[i+1] && dataRows[i+1][cfg.cat] !== "總計") currentCat = dataRows[i+1][cfg.cat];
                    continue;
                }
                if (r[cfg.cat] !== currentCat && !hasSeenSubtotal) { isGroupBroken = true; break; }
                hasSeenSubtotal = false;
            }
            if (isGroupBroken) {
                window.uiManager.showMagicToast(`「糟糕，之前的分組結構被破壞了。請先重新按『${cfg.catName}』排序並執行第一次小計。」`, "error");
                return;
            }

            const currentData = state.gridData, newData = [currentData[0]], subtotalRowIndices = [];
            let i = 1;
            while (i < currentData.length) {
                const row = currentData[i];
                if (row[cfg.cat] && row[cfg.cat].includes("總計")) {
                    newData.push(row); subtotalRowIndices.push(newData.length - 1); i++; continue;
                }
                const category = row[cfg.cat];
                let householdSubtotal = 0, lastHousehold = row[cfg.hh];
                while (i < currentData.length) {
                    const innerRow = currentData[i];
                    if (innerRow[cfg.cat] && innerRow[cfg.cat].includes(category + " 總計")) break;
                    if (innerRow[cfg.cat] === "總計") break;
                    if (innerRow[cfg.hh] !== lastHousehold) {
                        const hhSubRow = Array(currentData[0].length).fill("");
                        hhSubRow[cfg.hh] = lastHousehold + " 小計"; hhSubRow[cfg.qty] = householdSubtotal;
                        subtotalRowIndices.push(newData.length); newData.push(hhSubRow);
                        lastHousehold = innerRow[cfg.hh]; householdSubtotal = 0;
                    }
                    newData.push(innerRow);
                    householdSubtotal += Number(innerRow[cfg.qty]) || 0; i++;
                }
                if (lastHousehold && !lastHousehold.includes("小計")) {
                    const hhSubRow = Array(currentData[0].length).fill("");
                    hhSubRow[cfg.hh] = lastHousehold + " 小計"; hhSubRow[cfg.qty] = householdSubtotal;
                    subtotalRowIndices.push(newData.length); newData.push(hhSubRow);
                }
            }
            state.sheets[state.activeSheetId] = newData;
            subtotalRowIndices.forEach(rIdx => {
                const isHH = newData[rIdx][cfg.hh].includes("小計");
                for (let c = 0; c < state.gridData[0].length; c++) {
                    const cellId = String.fromCharCode(65 + c) + (rIdx + 1);
                    state.cellStyles[cellId] = { 
                        fontWeight: 'bold', backgroundColor: isHH ? '#fafafa' : '#f2f2f2',
                        color: isHH ? '#555' : '#000'
                    };
                }
            });
            window.gridRenderer.render();
            window.orchestrator.validateStateChange({ type: "ACTION", id: "SUBTOTAL_NESTED_APPLY" });
        }
    },

    open_validation_dialog() {
        const modalId = 'ch5-validation-modal';
        let modal = document.getElementById(modalId);
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal-layer';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.zIndex = '9000';
            modal.innerHTML = `
                <div class="excel-dialog" style="width: 320px;">
                    <div class="excel-dialog-header">
                        <span>資料驗證</span>
                        <button class="excel-close" onclick="document.getElementById('${modalId}').style.display='none'">×</button>
                    </div>
                    <div class="excel-dialog-body" style="padding: 15px; font-size:12px;">
                        <label>儲存格內允許(A):</label><br>
                        <select id="validation-type" style="width:100%; margin:5px 0; border: 1px solid #ccc; padding: 3px;" onchange="window.ch5Actions.toggle_validation_input()">
                            <option value="ANY">任何值</option>
                            <option value="WHOLE">整數</option>
                            <option value="LIST">清單</option>
                        </select>
                        <br><br>
                        <div id="validation-numeric-range" style="display:none">
                            <label>資料(D): 介於</label><br>
                            <div style="display:flex; gap:5px; margin-top:5px;">
                                <input type="number" id="val-min" style="width:50%; padding:3px;" placeholder="最小值">
                                <input type="number" id="val-max" style="width:50%; padding:3px;" placeholder="最大值">
                            </div>
                        </div>
                        <div id="validation-list-input" style="display:none">
                            <label>來源(S):</label><br>
                            <input type="text" id="val-source" style="width:100%; padding:3px; border: 1px solid #ccc;" placeholder="例: A,B,C">
                        </div>
                    </div>
                    <div class="excel-dialog-footer">
                        <button class="excel-ok" onclick="window.ch5Actions.confirm_validation()" style="padding: 5px 25px;">確定</button>
                        <button class="excel-cancel" onclick="document.getElementById('${modalId}').style.display='none'" style="padding: 5px 25px;">取消</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        document.getElementById('validation-type').value = "WHOLE";
        this.toggle_validation_input();
        modal.style.display = 'flex';
    },

    toggle_validation_input() {
        const type = document.getElementById('validation-type').value;
        document.getElementById('validation-numeric-range').style.display = (type === 'WHOLE') ? 'block' : 'none';
        document.getElementById('validation-list-input').style.display = (type === 'LIST') ? 'block' : 'none';
    },

    confirm_validation() {
        const type = document.getElementById('validation-type').value;
        const min = parseInt(document.getElementById('val-min').value);
        const max = parseInt(document.getElementById('val-max').value);
        const cfg = this._getColConfig();
        
        document.getElementById('ch5-validation-modal').style.display = 'none';
        const state = window.orchestrator.state;
        const selectedCol = state.selectedCell?.c;

        if (selectedCol !== cfg.qty) {
            window.orchestrator.playStorySegment("fail_VALIDATION_wrong_col");
            return;
        }
        if (type === "WHOLE" && (min !== 1 || max !== 50)) {
            window.orchestrator.playStorySegment("fail_VALIDATION_wrong_range");
            return;
        }
        if (type === "WHOLE" && min === 1 && max === 50) {
            state.ch5_validation_active = true;
            window.orchestrator.validateStateChange({ type: "ACTION", id: "VALIDATION_APPLY", col: cfg.qty });
        } else {
            window.orchestrator.playStorySegment("fail_VALIDATION_wrong_range");
        }
    }
};
