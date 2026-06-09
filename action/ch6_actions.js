/**
 * 試算表魔法冒險 v2 - 第六章禁術動作實作
 * 包含：樞紐分析表 (Pivot Table) 創建、匯總方式更改、欄位分組
 */

window.ch6Actions = {
    // 狀態存儲：當前配置中的欄位
    _pivotState: {
        fields: ["編號", "港口", "月份", "貨物類別", "數量(箱)", "金額(銀幣)"], // Ch6 預設
        rows: [],
        cols: [],
        vals: [],
        filters: [],
        shouldHighlightA1: false,
        _highlightInterval: null,
        isGrouped: false, // 紀錄是否已執行季度分組
        currentMethod: 'sum'
    },

    // 取得當前章節的欄位配置
    _getColConfig() {
        const chapter = window.orchestrator.state.currentChapter.toString();
        if (chapter === "65") {
            return { 
                row: 1, // 產地
                col: 2, // 月份
                val: 5, // 收購價
                group: 2, // 月份
                rowName: "產地", colName: "月份", valName: "收購價(銀幣)",
                fields: ["編號", "產地", "月份", "藥材種類", "重量(斤)", "收購價(銀幣)"]
            };
        }
        // 預設為 Ch 6 (60)
        return { 
            row: 1, // 港口
            col: 3, // 貨物類別
            val: 5, // 金額
            group: 2, // 月份
            rowName: "港口", colName: "貨物類別", valName: "金額(銀幣)",
            fields: ["編號", "港口", "月份", "貨物類別", "數量(箱)", "金額(銀幣)"]
        };
    },

    insert_group(anchorEl) {
        window.uiManager.showDropdown([
            { icon: '📊', text: '樞紐分析表', action: 'pivot_create' },
            { icon: '🖼️', text: '圖片', action: 'todo' },
            { icon: '📈', text: '圖表', action: 'todo' }
        ], anchorEl);
    },

    todo() {
        window.uiManager.showMagicToast("「此功能尚未被魔導書解鎖喔！」", "error");
    },

    pivot_create() {
        const state = window.orchestrator.state;
        if (state.activeSheetId.startsWith('st-pivot')) {
            this._renderPivotSetupUI();
            document.getElementById('ch6-pivot-setup-modal').style.display = 'flex';
            return;
        }
        if (state.selectedCell.r > 10) {
            window.uiManager.showMagicToast("「請先點選數據區域內的任意儲存格。」", "error");
            return;
        }
        const modalId = 'ch6-pivot-range-modal';
        let modal = document.getElementById(modalId);
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal-layer';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.zIndex = '9000';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <div class="excel-dialog" style="width: 400px;">
                <div class="excel-dialog-header"><span>建立樞紐分析表</span><button class="excel-close" onclick="document.getElementById('${modalId}').style.display='none'">×</button></div>
                <div class="excel-dialog-body" style="padding: 15px; font-size:12px;">
                    <p style="margin-top:0;">請選擇要分析的資料：</p>
                    <div style="margin-left:10px; border:1px solid #ccc; padding:10px; background:#f9f9f9;">
                        <label><input type="radio" checked> 選取區域(S):</label>
                        <input type="text" value="$A$1:$F$41" disabled style="width:100%; margin-top:5px; border:1px solid #ccc; padding:2px;">
                    </div>
                    <p style="margin-top:15px;">選擇放置樞紐分析表的位置：</p>
                    <div style="margin-left:10px; display:flex; flex-direction:column; gap:8px;">
                        <label><input type="radio" name="pivot-pos" checked> 新工作表(N)</label>
                        <label><input type="radio" name="pivot-pos" onclick="window.uiManager.showMagicToast('「此章節必須在『新工作表』中施展禁術喔！」'); this.checked=false; document.getElementsByName('pivot-pos')[0].checked=true;"> 現有工作表(E)</label>
                    </div>
                </div>
                <div class="excel-dialog-footer"><button class="excel-ok" onclick="window.ch6Actions._confirmRangeAndSheet()" style="padding: 5px 25px;">確定</button></div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    _confirmRangeAndSheet() {
        document.getElementById('ch6-pivot-range-modal').style.display = 'none';
        const newSheetId = "st-pivot-" + Date.now();
        const label = "📊 樞紐分析表 1";
        window.orchestrator.addSheet(newSheetId, [["(樞紐分析表區域)"]], label);
        window.uiManager.showMagicToast("「已建立新工作表，請開始配置欄位。」");

        setTimeout(() => {
            const modalId = 'ch6-pivot-setup-modal';
            let modal = document.getElementById(modalId) || document.createElement('div');
            modal.id = modalId; modal.className = 'modal-layer'; modal.style.zIndex = '9000'; document.body.appendChild(modal);
            const cfg = this._getColConfig();
            this._pivotState = { fields: cfg.fields, rows: [], cols: [], vals: [], filters: [], isGrouped: false, currentMethod: 'sum' };
            this._renderPivotSetupUI();
            modal.style.display = 'flex';
        }, 800);
    },

    _renderPivotSetupUI() {
        const modal = document.getElementById('ch6-pivot-setup-modal');
        const s = this._pivotState;
        modal.innerHTML = `
            <div class="excel-dialog" style="width: 600px; height: 500px; display:flex; flex-direction:column;">
                <div class="excel-dialog-header"><span>樞紐分析表欄位清單</span><button class="excel-close" onclick="document.getElementById('ch6-pivot-setup-modal').style.display='none'">×</button></div>
                <div class="excel-dialog-body" style="flex:1; padding: 15px; display: flex; gap: 20px; background: #f3f3f3; overflow:hidden;">
                    <div style="width: 220px; display:flex; flex-direction:column; background: #fff; border: 1px solid #ccc; padding: 10px;">
                        <p style="font-weight:bold; margin-top:0; font-size:12px;">拖動欄位到下方區域：</p>
                        <div style="flex:1; overflow-y:auto; border: 1px solid #eee;">
                            ${s.fields.map(f => `<div class="pivot-field-item" draggable="true" ondragstart="window.ch6Actions._onDragStart(event, '${f}')" style="padding: 8px 12px; cursor:grab; font-size:12px; display:flex; align-items:center; gap:8px; background: #fff; border-bottom: 1px solid #f0f0f0;">
                                <span style="color: #666;">⠿</span><span>${f}</span></div>`).join('')}
                        </div>
                    </div>
                    <div style="flex:1; display:grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap:10px;">
                        ${this._renderDropArea("篩選", "filters", s.filters)} ${this._renderDropArea("欄", "cols", s.cols)}
                        ${this._renderDropArea("列", "rows", s.rows)} ${this._renderDropArea("值", "vals", s.vals)}
                    </div>
                </div>
                <div class="excel-dialog-footer">
                    <p style="flex:1; font-size:11px; color:#666; text-align:left; margin:0;">提示：從左側按住欄位，拖曳（Pull）至右側方框中放開。</p>
                    <button class="excel-ok" onclick="window.ch6Actions.confirm_pivot_manual()" style="padding: 5px 25px;">確定</button>
                </div>
            </div>
            <style>
                .pivot-field-item:hover { background: #eef7ff; }
                .pivot-area-box { background: #fff; border: 1px solid #ccc; padding: 8px; display:flex; flex-direction:column; }
                .pivot-area-box.drag-over { border: 2px solid #217346; background: #e8f5e9; }
                .pivot-area-title { font-size:11px; font-weight:bold; margin-bottom:5px; color:#444; border-bottom: 1px solid #eee; }
                .pivot-area-list { flex:1; border: 1px dashed #ddd; overflow-y:auto; font-size:11px; min-height: 40px; }
                .pivot-tag { background: #e8f5e9; border: 1px solid #c8e6c9; margin: 2px; padding: 2px 8px; display:flex; justify-content:space-between; border-radius:3px; color: #217346; }
            </style>
        `;
    },

    _renderDropArea(label, key, data) {
        return `<div class="pivot-area-box" ondragover="window.ch6Actions._onDragOver(event)" ondragleave="window.ch6Actions._onDragLeave(event)" ondrop="window.ch6Actions._onDrop(event, '${key}')">
                <div class="pivot-area-title"><span>${label}</span></div><div class="pivot-area-list">${data.map(f => `<div class="pivot-tag"><span>${f}</span><span onclick="window.ch6Actions._removeField('${key}', '${f}')" style="cursor:pointer; color:#999; margin-left:8px;">×</span></div>`).join('')}</div></div>`;
    },

    _onDragStart(e, f) { e.dataTransfer.setData("text/plain", f); e.target.style.opacity = "0.5"; },
    _onDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); },
    _onDragLeave(e) { e.currentTarget.classList.remove('drag-over'); },
    _onDrop(e, key) {
        e.preventDefault(); const f = e.dataTransfer.getData("text/plain"); e.currentTarget.classList.remove('drag-over');
        ["rows", "cols", "vals", "filters"].forEach(k => this._pivotState[k] = this._pivotState[k].filter(item => item !== f));
        this._pivotState[key].push(f); this._renderPivotSetupUI();
    },

    _removeField(key, f) { this._pivotState[key] = this._pivotState[key].filter(item => item !== f); this._renderPivotSetupUI(); },

    confirm_pivot_manual() {
        const s = this._pivotState; const cfg = this._getColConfig();
        if (!s.rows.includes(cfg.rowName) || s.cols.length === 0 || !s.vals.includes(cfg.valName)) {
            window.orchestrator.playStorySegment("fail_PIVOT_wrong"); return;
        }
        document.getElementById('ch6-pivot-setup-modal').style.display = 'none';
        this._generatePivotData(cfg);
    },

    _getFieldIdx(fieldName) { return this._getColConfig().fields.indexOf(fieldName); },

    _generatePivotData(cfg) {
        const state = window.orchestrator.state; const s = this._pivotState;
        const sourceData = state.sheets["st-1"]; if (!sourceData) return;
        const dataRows = sourceData.slice(1);
        const rowFieldName = s.rows[0], valFieldName = s.vals[0], colFieldNames = s.cols;
        const rIdx = this._getFieldIdx(rowFieldName), vIdx = this._getFieldIdx(valFieldName), cIndices = colFieldNames.map(f => this._getFieldIdx(f));
        const rowLabels = [...new Set(dataRows.map(r => r[rIdx]))].sort();
        
        // [分組映射邏輯]
        const getGroupedVal = (val, fieldName) => {
            if (!s.isGrouped) return val;
            
            if (fieldName === "月份") {
                // 統一對齊真實 Excel 格式：第一季、第二季...
                if (["一月", "二月", "三月"].includes(val)) return "第一季";
                if (["四月", "五月", "六月"].includes(val)) return "第二季";
                if (["七月", "八月", "九月"].includes(val)) return "第三季";
                if (["十月", "十一月", "十二月"].includes(val)) return "第四季";
                return "下半年";
            }
            if (fieldName === "季節") {
                if (["春季", "夏季"].includes(val)) return "上半年";
                if (["秋季", "冬季"].includes(val)) return "下半年";
            }
            return val;
        };

        // [智慧排序邏輯]: 確保月份按 1-12 排序
        const monthOrder = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
        const sortLabels = (labels, fieldName) => {
            if (fieldName === "月份" && !s.isGrouped) {
                return labels.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
            }
            return labels.sort();
        };

        let pivotGrid = [];
        if (cIndices.length === 1) {
            const colLabels = sortLabels([...new Set(dataRows.map(r => getGroupedVal(r[cIndices[0]], colFieldNames[0])))], colFieldNames[0]);
            pivotGrid.push([`${s.currentMethod === 'avg' ? '平均值' : '加總'} - ${valFieldName}`, ...colLabels, "總計"]);
            rowLabels.forEach(row => {
                const rowData = [row]; let rowTotal = 0;
                colLabels.forEach(col => {
                    const filtered = dataRows.filter(r => r[rIdx] === row && getGroupedVal(r[cIndices[0]], colFieldNames[0]) === col);
                    let val = 0;
                    if (filtered.length) {
                        const sum = filtered.reduce((acc, r) => acc + (parseFloat(r[vIdx]) || 0), 0);
                        val = s.currentMethod === 'avg' ? Math.round(sum/filtered.length * 10)/10 : sum;
                    }
                    rowData.push(val); rowTotal += val;
                });
                rowData.push(rowTotal); pivotGrid.push(rowData);
            });
        } else {
            const topLabels = [...new Set(dataRows.map(r => r[cIndices[0]]))].sort();
            const subLabels = sortLabels([...new Set(dataRows.map(r => getGroupedVal(r[cIndices[1]], colFieldNames[1])))], colFieldNames[1]);
            const header1 = [`${s.currentMethod === 'avg' ? '平均值' : '加總'} - ${valFieldName}`], header2 = [""];
            topLabels.forEach(top => subLabels.forEach((sub, i) => { header1.push(i === 0 ? top : ""); header2.push(sub); }));
            header1.push("總計"); header2.push(""); pivotGrid.push(header1, header2);
            rowLabels.forEach(row => {
                const rowData = [row]; let rowTotal = 0;
                topLabels.forEach(top => subLabels.forEach(sub => {
                    const filtered = dataRows.filter(r => r[rIdx] === row && r[cIndices[0]] === top && getGroupedVal(r[cIndices[1]], colFieldNames[1]) === sub);
                    let val = 0;
                    if (filtered.length) {
                        const sum = filtered.reduce((acc, r) => acc + (parseFloat(r[vIdx]) || 0), 0);
                        val = s.currentMethod === 'avg' ? Math.round(sum/filtered.length * 10)/10 : sum;
                    }
                    rowData.push(val); rowTotal += val;
                }));
                rowData.push(rowTotal); pivotGrid.push(rowData);
            });
        }
        state.sheets[state.activeSheetId] = pivotGrid;
        window.gridRenderer.render();
        const task = state.activeChapterModule?.simulator?.tasks?.[state.currentTaskIndex];
        if (task?.id === "PIVOT_CREATE_TASK") { this._pivotState.shouldHighlightA1 = true; this._applyA1Highlight(); window.orchestrator.validateStateChange({ type: "ACTION", id: "PIVOT_CREATE" }); }
        else if ((s.cols.includes("月份") || s.cols.includes("季節")) && !s.isGrouped) {
             window.uiManager.showMagicToast(`「時間欄位已加入！請右鍵點選下方帶有金色高亮的標籤進行【組成群組】。」`);
             setTimeout(() => { const targetCell = document.getElementById('B2'); if (targetCell) {
                    let styleEl = document.getElementById('ch6-group-guide-style') || document.createElement('style');
                    styleEl.id = 'ch6-group-guide-style'; styleEl.innerHTML = `#B2 { animation: pivot-pulse-strong 1s infinite !important; z-index: 200 !important; border: 3px solid #ffcf4d !important; background-color: #fff9c4 !important; }`;
                    if (!document.getElementById('ch6-group-guide-style')) document.head.appendChild(styleEl);
             }}, 1000);
        }
    },

    _applyA1Highlight() {
        if (!this._pivotState.shouldHighlightA1) { const oldStyle = document.getElementById('ch6-guide-style'); if (oldStyle) oldStyle.remove(); return; }
        let styleEl = document.getElementById('ch6-guide-style') || document.createElement('style');
        styleEl.id = 'ch6-guide-style'; styleEl.innerHTML = `#A1 { animation: pivot-pulse-strong 1s infinite !important; z-index: 200 !important; border: 3px solid #ffcf4d !important; background-color: #fff9c4 !important; }`;
        document.head.appendChild(styleEl);
    },

    pivot_method_change() {
        const modalId = 'ch6-pivot-method-modal';
        let modal = document.getElementById(modalId) || document.createElement('div');
        modal.id = modalId; modal.className = 'modal-layer'; modal.style.zIndex = '9000'; document.body.appendChild(modal);
        const cfg = this._getColConfig();
        modal.innerHTML = `
            <div class="excel-dialog" style="width: 380px;"><div class="excel-dialog-header"><span>值欄位設定</span><button class="excel-close" onclick="document.getElementById('${modalId}').style.display='none'">×</button></div>
                <div class="excel-dialog-body" style="padding: 15px; font-size:12px;">
                    <p>來源名稱: ${cfg.valName}</p><p>自訂名稱: <input type="text" value="${this._pivotState.currentMethod === 'avg' ? '平均值' : '加總'} - ${cfg.valName}" style="width:180px;"></p>
                    <div style="margin-top:10px; border-bottom: 1px solid #ccc; display:flex;"><div style="padding: 5px 12px; background:#fff; border: 1px solid #ccc; border-bottom:none; position:relative; top:1px;">摘要值方式</div></div>
                    <div style="background:#fff; border: 1px solid #ccc; border-top:none; padding:12px;"><p>計算類型：</p>
                        <div id="pivot-method-list" style="height: 110px; overflow-y:auto; border:1px solid #ddd;">
                            <div class="method-opt ${this._pivotState.currentMethod === 'sum' ? 'active' : ''}" data-val="sum" style="padding:4px 10px; cursor:pointer;">加總</div>
                            <div class="method-opt ${this._pivotState.currentMethod === 'avg' ? 'active' : ''}" data-val="avg" style="padding:4px 10px; cursor:pointer;">平均值</div>
                        </div></div></div>
                <div class="excel-dialog-footer"><button class="excel-ok" onclick="window.ch6Actions.confirm_method_change()">確定</button></div></div>
            <style>.method-opt:hover { background: #f5f5f5; }.method-opt.active { background: #cce4f7 !important; border: 1px solid #0078d4; }</style>
        `;
        modal.querySelectorAll('.method-opt').forEach(opt => opt.onclick = () => { modal.querySelectorAll('.method-opt').forEach(o => o.classList.remove('active')); opt.classList.add('active'); this._selectedMethod = opt.dataset.val; });
        this._selectedMethod = this._pivotState.currentMethod; modal.style.display = 'flex';
    },

    confirm_method_change() {
        if (this._selectedMethod !== 'avg') return;
        document.getElementById('ch6-pivot-method-modal').style.display = 'none';
        this._pivotState.shouldHighlightA1 = false; this._pivotState.currentMethod = 'avg';
        this._generatePivotData(this._getColConfig());
        window.orchestrator.validateStateChange({ type: "ACTION", id: "PIVOT_METHOD_CHANGE" });
    },

    pivot_group_apply() {
        const state = window.orchestrator.state; 
        const activeSheet = state.sheets[state.activeSheetId];
        if (!activeSheet || !state.selectedCell) return;
        
        const r = state.selectedCell.r, c = state.selectedCell.c;
        const val = activeSheet[r]?.[c]?.toString() || "";
        const chap = state.currentChapter.toString();
        
        // [關鍵修正]: 支援所有時間標籤，包含月份、季節
        const isTimeLabel = val.includes("月") || val.includes("季") || 
                           ["春", "夏", "秋", "冬", "上半年", "下半年"].some(s => val.includes(s));
        
        // 判定是否點選了標頭行中的時間標籤
        if (!((r === 0 || r === 1) && isTimeLabel)) {
            window.uiManager.showMagicToast(`「請右鍵點選報表標題中的『時間欄位』（如：月份）標籤。」`, "error"); 
            return;
        }

        const modalId = 'ch6-group-modal';
        let modal = document.getElementById(modalId);
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal-layer';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.zIndex = '9000';
            document.body.appendChild(modal);
        }

        const listContent = `<div class="group-opt" style="padding: 3px 10px;">月</div><div class="group-opt active" style="padding: 3px 10px; background:#0078d4; color:#fff;">季</div><div class="group-opt" style="padding: 3px 10px;">年</div>`;

        modal.innerHTML = `
            <div class="excel-dialog" style="width: 280px;">
                <div class="excel-dialog-header">
                    <span>群組</span>
                    <button class="excel-close" onclick="document.getElementById('${modalId}').style.display='none'">×</button>
                </div>
                <div class="excel-dialog-body" style="padding: 15px; font-size:12px;">
                    <div style="margin-bottom:10px; border:1px solid #ccc; padding:10px; background:#f9f9f9; color:#666;">
                        <label><input type="checkbox" checked disabled> 起始於(S): 2026/01/01</label><br>
                        <label><input type="checkbox" checked disabled> 結束於(E): 2026/12/31</label>
                    </div>
                    
                    <p style="margin-top:10px; margin-bottom:5px; color:#444;">依據下列項目的分組方式：</p>
                    <div style="border: 1px solid #999; background: #fff; height: 100px; overflow-y: auto;">
                        ${listContent}
                    </div>
                </div>
                <div class="excel-dialog-footer">
                    <button class="excel-ok" onclick="window.ch6Actions.confirm_group()" style="padding: 5px 25px;">確定</button>
                    <button class="excel-cancel" onclick="document.getElementById('${modalId}').style.display='none'" style="padding: 5px 25px;">取消</button>
                </div>
            </div>
            <style>
                .group-opt:hover { background: #f0f0f0; color: #000; }
                .group-opt.active { background: #0078d4 !important; color: #fff !important; }
            </style>
        `;
        modal.style.display = 'flex';
    },

    confirm_group() {
        document.getElementById('ch6-group-modal').style.display = 'none';
        const oldStyle = document.getElementById('ch6-group-guide-style'); if (oldStyle) oldStyle.remove();
        this._pivotState.isGrouped = true; this._generatePivotData(this._getColConfig());
        window.orchestrator.validateStateChange({ type: "ACTION", id: "PIVOT_GROUP_APPLY" });
    }
};
