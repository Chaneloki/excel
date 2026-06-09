/**
 * 試算表魔法冒險 v2 - 第三章專屬動作
 */

window.ch3Actions = {
    find: () => {
        window.ch3Actions.openFindReplaceModal('find');
    },
    replace: () => {
        window.ch3Actions.openFindReplaceModal('replace');
    },
    fuzzy: () => {
        window.ch3Actions.openFindReplaceModal('find');
    },
    empty: () => {
        window.ch3Actions.openGoToModal();
    },

    openFindReplaceModal: (tab = 'find') => {
        let m = document.getElementById('excel-fr-modal');
        if (!m) {
            m = document.createElement('div');
            m.id = 'excel-fr-modal';
            m.className = 'excel-modal fr-modal';
            m.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#f3f2f1; border:1px solid #999; box-shadow:0 4px 15px rgba(0,0,0,0.2); z-index:10000; font-family:sans-serif; width:340px;";
            m.innerHTML = `
                <div class="excel-modal-header" style="background:#fff; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; font-size:13px; font-weight:bold;">
                    <div class="fr-tabs" style="display:flex; gap:15px; cursor:pointer;">
                        <span id="tab-f" style="padding:2px 5px; color:#666;" onclick="window.ch3Actions.switchFRTab('find')">尋找</span>
                        <span id="tab-r" style="padding:2px 5px; color:#666;" onclick="window.ch3Actions.switchFRTab('replace')">取代</span>
                    </div>
                    <span class="close" style="cursor:pointer; font-size:16px; color:#666;" onclick="this.parentElement.parentElement.style.display='none'">✕</span>
                </div>
                <div class="excel-modal-body" style="padding:15px; font-size:12px;">
                    <div class="fr-row" style="margin-bottom:10px; display:flex; align-items:center; gap:5px;">
                        <span style="width:80px; display:inline-block">尋找目標(N):</span>
                        <input type="text" id="fr-find" style="width:200px">
                    </div>
                    <div class="fr-row" id="replace-row" style="display:none; margin-bottom:10px; display:flex; align-items:center; gap:5px;">
                        <span style="width:80px; display:inline-block">取代為(P):</span>
                        <input type="text" id="fr-replace" style="width:200px">
                    </div>
                    <div id="fr-options" style="display:none; margin-top:10px; border-top:1px solid #ddd; padding-top:10px">
                        <div style="display:flex; align-items:center; gap:10px">
                            <span>格式：</span>
                            <div id="fr-format-preview" style="width:60px; height:20px; border:1px solid #999; background:#fff"></div>
                            <button onclick="window.ch3Actions.setFRFormat()" style="font-size:11px">設定格式...</button>
                            <button onclick="window.ch3Actions.clearFRFormat()" style="font-size:11px">清除格式</button>
                        </div>
                    </div>
                    <div style="text-align:right; margin-top:15px; display:flex; justify-content:space-between">
                        <button onclick="window.ch3Actions.toggleFROptions()" style="font-size:11px">選項(T) >></button>
                        <div>
                            <button id="btn-replace-all" style="display:none; padding:4px 10px; margin-left:3px; cursor:pointer;" onclick="window.ch3Actions.executeReplace(true)">全部取代</button>
                            <button onclick="window.ch3Actions.executeFind()" style="padding:4px 10px; margin-left:3px; cursor:pointer;">找下一個</button>
                            <button onclick="window.ch3Actions.executeFindAll()" style="padding:4px 10px; margin-left:3px; cursor:pointer;">全部尋找</button>
                            <button onclick="this.parentElement.parentElement.parentElement.parentElement.style.display='none'" style="padding:4px 10px; margin-left:3px; cursor:pointer;">關閉</button>
                        </div>
                    </div>
                </div>`;
            document.body.appendChild(m);
            
            // Add active tab style
            const style = document.createElement('style');
            style.innerHTML = `
                .fr-tabs span.active { color:#000 !important; border-bottom:2px solid #217346; }
                @keyframes marching-ants { 0% { background-position: 0 0, 100% 100%, 0 100%, 100% 0; } 100% { background-position: 20px 0, -20px 100%, 0 -20px, 100% 20px; } }
                .referencing { position: relative; z-index: 5; box-shadow: 0 0 0 2px #fff; outline: 2px dashed #217346 !important; animation: marching-ants 0.5s linear infinite; }
            `;
            document.head.appendChild(style);
        }
        m.style.display = 'block';
        window.ch3Actions.switchFRTab(tab);
        document.getElementById('fr-find').focus();
    },

    switchFRTab: (tab) => {
        const row = document.getElementById('replace-row'), 
              btnRA = document.getElementById('btn-replace-all'), 
              tf = document.getElementById('tab-f'), 
              tr = document.getElementById('tab-r');
        if (tab === 'replace') { 
            row.style.display = 'flex'; 
            btnRA.style.display = 'inline-block'; 
            tf.classList.remove('active'); 
            tr.classList.add('active'); 
        } else { 
            row.style.display = 'none'; 
            btnRA.style.display = 'none'; 
            tf.classList.add('active'); 
            tr.classList.remove('active'); 
        }
    },

    toggleFROptions: () => { 
        const opt = document.getElementById('fr-options'); 
        opt.style.display = (opt.style.display === 'none') ? 'block' : 'none'; 
    },

    setFRFormat: () => { 
        const preview = document.getElementById('fr-format-preview'); 
        preview.style.backgroundColor = '#217346'; 
        preview.style.color = '#ffffff'; 
        preview.innerText = '樣式'; 
        preview.style.fontSize = '10px'; 
        preview.style.textAlign = 'center'; 
        preview.style.lineHeight = '20px';
        window.ch3Actions._frSelectedFormat = { backgroundColor: '#217346', color: '#ffffff', fontWeight: 'bold' }; 
    },

    clearFRFormat: () => { 
        const preview = document.getElementById('fr-format-preview'); 
        preview.style.backgroundColor = '#ffffff'; 
        preview.style.color = '#000000';
        preview.innerText = ''; 
        window.ch3Actions._frSelectedFormat = null; 
    },

    executeFind: () => {
        const val = document.getElementById('fr-find').value; 
        if (!val) return;
        const state = window.orchestrator.state;
        const data = state.gridData;
        
        let currentR = state.selectedCell.r;
        let startIdx = (currentR + 1) % data.length;
        
        const regex = new RegExp('^' + val.replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
        const isFuzzy = val.includes('*') || val.includes('?');

        for (let count = 0; count < data.length; count++) {
            let i = (startIdx + count) % data.length;
            if (i === 0) continue; // Skip header
            for (let j = 0; j < data[i].length; j++) {
                const cellVal = String(data[i][j] || "");
                if (isFuzzy ? regex.test(cellVal) : cellVal.includes(val)) {
                    state.selectedCell = { r: i, c: j };
                    state.selectedRange = { minRow: i, maxRow: i, minCol: j, maxCol: j };
                    
                    if (window.gridRenderer) {
                        const wrapper = document.getElementById('wrapper');
                        const rowHeight = window.gridRenderer.rowHeight || 32;
                        if (wrapper) {
                            wrapper.scrollTop = i * rowHeight - wrapper.clientHeight / 2;
                        }
                        window.gridRenderer.render();

                        // 自動聚焦至目標單元格
                        const colLabel = String.fromCharCode(65 + j);
                        const cellId = colLabel + (i + 1);
                        const el = document.getElementById(cellId);
                        if (el) el.focus();
                    }
                    window.orchestrator.validateStateChange({ type: 'ACTION', id: 'SEARCH_DONE', value: val });
                    return;
                }
            }
        }
        
        // [反向教學]: 找不到項目時播放對話，並關閉視窗避免遮擋
        const m = document.getElementById('excel-fr-modal');
        if (m) m.style.display = 'none';
        window.orchestrator.playStorySegment('fail_SEARCH_not_found');
    },

    executeFindAll: () => {
        const val = document.getElementById('fr-find').value; 
        if (!val) return;

        // [反向教學]: 檢查是否在需要模糊搜尋的任務中忘記加萬用字元
        const state = window.orchestrator.state;
        const currentTask = state.activeChapterModule.simulator.tasks[state.currentTaskIndex];
        
        // [反向教學]: 檢查是否在需要模糊搜尋的任務中忘記加萬用字元
        if ((currentTask.id === 'FUZZY_TASK' || currentTask.id === 'PRECISE_FUZZY_TASK' || 
             currentTask.id === 'FUZZY_WU_TASK' || currentTask.id === 'FUZZY_INFANT_TASK') && 
            !val.includes('*') && !val.includes('?')) {
            const m = document.getElementById('excel-fr-modal');
            if (m) m.style.display = 'none';
            window.orchestrator.playStorySegment('fail_FUZZY_missing_wildcard');
            return;
        }

        // [反向教學]: 檢查是否在需要標記格式的任務中忘記設定格式
        if ((currentTask.id === 'FUZZY_TASK' || currentTask.id === 'PRECISE_FUZZY_TASK' || 
             currentTask.id === 'FUZZY_WU_TASK' || currentTask.id === 'FUZZY_INFANT_TASK') && 
            !window.ch3Actions._frSelectedFormat) {
            const m = document.getElementById('excel-fr-modal');
            if (m) m.style.display = 'none';
            window.orchestrator.playStorySegment('fail_FUZZY_no_format');
            return;
        }

        const data = state.gridData;
        let count = 0;
        let firstMatchIdx = -1;
        
        const regex = new RegExp('^' + val.replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
        const isFuzzy = val.includes('*') || val.includes('?');

        for (let i = 1; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const cellVal = String(data[i][j] || "");
                if (isFuzzy ? regex.test(cellVal) : cellVal.includes(val)) {
                    const idStr = String.fromCharCode(65 + j) + (i + 1);
                    if (window.ch3Actions._frSelectedFormat) {
                        state.cellStyles[idStr] = { ...state.cellStyles[idStr], ...window.ch3Actions._frSelectedFormat };
                    }
                    if (firstMatchIdx === -1) firstMatchIdx = i;
                    count++;
                }
            }
        }
        
        if (count > 0) { 
            if (window.gridRenderer) {
                const wrapper = document.getElementById('wrapper');
                const rowHeight = window.gridRenderer.rowHeight || 32;
                if (wrapper && firstMatchIdx !== -1) {
                    wrapper.scrollTop = firstMatchIdx * rowHeight - wrapper.clientHeight / 2;
                }
                window.gridRenderer.render();
            }
            // alert(`已找到並標記 ${count} 個項目。`); 
            window.orchestrator.validateStateChange({ type: 'ACTION', id: 'FUZZY_DONE', value: val });
        } else { 
            const m = document.getElementById('excel-fr-modal');
            if (m) m.style.display = 'none';
            window.orchestrator.playStorySegment('fail_SEARCH_not_found');
        }
    },

    executeReplace: (all = true) => {
        const oldVal = document.getElementById('fr-find').value, 
              newVal = document.getElementById('fr-replace').value; 
        if (!oldVal) return;
        const state = window.orchestrator.state;
        
        // [反向教學]: 若任務是尋找，卻點了取代
        const currentTask = state.activeChapterModule.simulator.tasks[state.currentTaskIndex];
        if (currentTask && currentTask.id === 'SEARCH_TASK') {
            const m = document.getElementById('excel-fr-modal');
            if (m) m.style.display = 'none';
            window.orchestrator.playStorySegment('fail_SEARCH_use_replace');
            return;
        }

        // [資料保護]: 若目前任務是取代，先檢查輸入是否正確，避免破壞性修改後無法重來
        if (currentTask && currentTask.id === 'REPLACE_TASK' && currentTask.expectedCondition && currentTask.expectedCondition.type === 'REPLACE_CHECK') {
            const expectedOld = currentTask.expectedCondition.oldVal;
            const expectedNew = currentTask.expectedCondition.newVal;

            if (oldVal !== expectedOld) {
                const m = document.getElementById('excel-fr-modal');
                if (m) m.style.display = 'none';
                window.orchestrator.playStorySegment('fail_REPLACE_wrong_old_val');
                return; // 終止操作，保護數據
            }

            if (newVal !== expectedNew) {
                const m = document.getElementById('excel-fr-modal');
                if (m) m.style.display = 'none';
                window.orchestrator.playStorySegment('fail_REPLACE_wrong_new_val');
                return; // 終止操作，保護數據
            }

            // [反向教學]: 檢查是否誤用了格式設定（針對用戶反饋：取代任務不應帶格式）
            if (window.ch3Actions._frSelectedFormat) {
                const m = document.getElementById('excel-fr-modal');
                if (m) m.style.display = 'none';
                window.orchestrator.playStorySegment('fail_REPLACE_with_format');
                return; 
            }
        }

        const data = state.gridData;
        let count = 0;
        let firstMatchIdx = -1;

        for (let i = 1; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (String(data[i][j]) === oldVal) {
                    data[i][j] = newVal;
                    const idStr = String.fromCharCode(65 + j) + (i + 1);
                    if (window.ch3Actions._frSelectedFormat) {
                        state.cellStyles[idStr] = { ...state.cellStyles[idStr], ...window.ch3Actions._frSelectedFormat };
                    }
                    if (firstMatchIdx === -1) firstMatchIdx = i;
                    count++;
                    if (!all) break;
                }
            }
            if (!all && count > 0) break;
        }
        
        if (count > 0) { 
            if (window.gridRenderer) {
                const wrapper = document.getElementById('wrapper');
                const rowHeight = window.gridRenderer.rowHeight || 32;
                if (wrapper && firstMatchIdx !== -1) {
                    wrapper.scrollTop = firstMatchIdx * rowHeight - wrapper.clientHeight / 2;
                }
                window.gridRenderer.render();
            }
            // alert(`完成！已取代 ${count} 個項目。`); 
            window.orchestrator.validateStateChange({ 
                type: 'ACTION', 
                id: 'REPLACE_DONE', 
                oldVal: oldVal, 
                newVal: newVal 
            });
        } else { 
            const m = document.getElementById('excel-fr-modal');
            if (m) m.style.display = 'none';
            window.orchestrator.playStorySegment('fail_REPLACE_wrong_val');
        }
    },

    openGoToModal: () => {
        let m = document.getElementById('excel-goto-base-modal');
        if (!m) {
            m = document.createElement('div');
            m.id = 'excel-goto-base-modal';
            m.className = 'excel-modal';
            m.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#f3f2f1; border:1px solid #999; box-shadow:0 4px 15px rgba(0,0,0,0.2); z-index:10000; font-family:sans-serif; width:300px;";
            m.innerHTML = `
                <div class="excel-modal-header" style="background:#fff; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; font-size:13px; font-weight:bold;">
                    <span>到...</span>
                    <span class="close" style="cursor:pointer; font-size:16px; color:#666;" onclick="this.parentElement.parentElement.style.display='none'">✕</span>
                </div>
                <div class="excel-modal-body" style="padding:15px; font-size:12px;">
                    <div style="margin-bottom:10px">至(R)：</div>
                    <input type="text" id="goto-ref" style="width:100%; margin-bottom:15px">
                    <div style="text-align:right">
                        <button onclick="window.ch3Actions.executeGoToRef()" style="padding:4px 10px; margin-left:3px; cursor:pointer;">確定</button>
                        <button onclick="this.parentElement.parentElement.parentElement.style.display='none'" style="padding:4px 10px; margin-left:3px; cursor:pointer;">取消</button>
                        <button onclick="window.ch3Actions.openGoToSpecialModal()" style="margin-left:15px; padding:4px 10px; cursor:pointer;">特殊(S)...</button>
                    </div>
                </div>`;
            document.body.appendChild(m);
        }
        m.style.display = 'block';
        document.getElementById('goto-ref').focus();
    },

    executeGoToRef: () => {
        const ref = document.getElementById('goto-ref').value.toUpperCase(); 
        if (!ref) return;
        const colMatch = ref.match(/[A-Z]+/);
        const rowMatch = ref.match(/\d+/);
        if (!colMatch || !rowMatch) { window.uiManager.showMagicToast("參考無效。", 'error'); return; }
        
        const colLabel = colMatch[0];
        const rowNum = parseInt(rowMatch[0]);
        const cIdx = colLabel.charCodeAt(0) - 65;
        const rIdx = rowNum - 1;
        
        const state = window.orchestrator.state;
        const data = state.gridData;
        
        if (data[rIdx] && data[rIdx][cIdx] !== undefined) {
            state.selectedCell = { r: rIdx, c: cIdx };
            state.selectedRange = { minRow: rIdx, maxRow: rIdx, minCol: cIdx, maxCol: cIdx };
            if (window.gridRenderer) {
                const wrapper = document.getElementById('wrapper');
                const rowHeight = window.gridRenderer.rowHeight || 32;
                if (wrapper) {
                    wrapper.scrollTop = rIdx * rowHeight - wrapper.clientHeight / 2;
                }
                window.gridRenderer.render();

                // 自動聚焦
                const el = document.getElementById(ref);
                if (el) el.focus();
            }
            document.getElementById('excel-goto-base-modal').style.display = 'none';
        } else {
            window.uiManager.showMagicToast("參考無效。", 'error');
        }
    },

    openGoToSpecialModal: () => {
        if (document.getElementById('excel-goto-base-modal')) document.getElementById('excel-goto-base-modal').style.display = 'none';
        let m = document.getElementById('excel-goto-modal');
        if (!m) {
            m = document.createElement('div');
            m.id = 'excel-goto-modal';
            m.className = 'excel-modal';
            m.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#f3f2f1; border:1px solid #999; box-shadow:0 4px 15px rgba(0,0,0,0.2); z-index:10000; font-family:sans-serif; width:300px;";
            m.innerHTML = `
                <div class="excel-modal-header" style="background:#fff; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; font-size:13px; font-weight:bold;">
                    <span>定位條件</span>
                    <span class="close" style="cursor:pointer; font-size:16px; color:#666;" onclick="this.parentElement.parentElement.style.display='none'">✕</span>
                </div>
                <div class="excel-modal-body" style="padding:15px; font-size:12px;">
                    <div style="display:grid; grid-template-columns: 1fr; gap:10px; margin-bottom:15px">
                        <label><input type="radio" name="goto-type" value="blanks" checked> 空格</label>
                    </div>
                    <div style="text-align:right">
                        <button onclick="window.ch3Actions.executeGoTo()" style="padding:4px 10px; margin-left:3px; cursor:pointer;">確定</button>
                        <button onclick="this.parentElement.parentElement.parentElement.style.display='none'" style="padding:4px 10px; margin-left:3px; cursor:pointer;">取消</button>
                    </div>
                </div>`;
            document.body.appendChild(m);
        }
        m.style.display = 'block';
    },

    executeGoTo: () => {
        const type = document.querySelector('input[name="goto-type"]:checked')?.value; 
        if (!type) return;
        if (type === 'blanks') {
            const state = window.orchestrator.state;
            const data = state.gridData;
            
            // 動態判斷目標欄位：第 3 章為 E 欄 (4)，第 3.5 章為 F 欄 (5)
            const targetCol = (state.currentChapter.toString() === "35") ? 5 : 4;
            
            state.multiSelectedCells = [];
            let firstBlank = null;
            
            for (let i = 1; i < data.length; i++) {
                if (data[i][targetCol] === "") {
                    state.multiSelectedCells.push({ r: i, c: targetCol });
                    if (!firstBlank) firstBlank = { r: i, c: targetCol };
                }
            }
            
            if (firstBlank) {
                state.selectedCell = firstBlank;
                state.selectedRange = { minRow: firstBlank.r, maxRow: firstBlank.r, minCol: firstBlank.c, maxCol: firstBlank.c };
                
                // 隱藏選單 (立刻執行避免遮擋)
                document.getElementById('excel-goto-modal').style.display = 'none';

                if (window.gridRenderer) {
                    const wrapper = document.getElementById('wrapper');
                    const rowHeight = window.gridRenderer.rowHeight || 32;
                    if (wrapper) {
                        wrapper.scrollTop = firstBlank.r * rowHeight - wrapper.clientHeight / 2;
                    }
                    window.gridRenderer.render();
                }
                
                // [權威聚焦]: 確保活動格 (Active Cell) 立即獲得焦點並可輸入，無需點擊
                const triggerFocus = () => {
                    const colLabel = String.fromCharCode(65 + firstBlank.c);
                    const cellId = colLabel + (firstBlank.r + 1);
                    const el = document.getElementById(cellId);
                    
                    if (el) {
                        el.focus();
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.selectNodeContents(el);
                        range.collapse(false);
                        sel.removeAllRanges();
                        sel.addRange(range);
                        console.log(`🎯 [executeGoTo] 已自動聚焦至 ${cellId}，準備輸入。`);
                    }
                };

                // 分兩次聚焦確保穩定性 (一次立即，一次在渲染與 Toast 後)
                triggerFocus();

                setTimeout(() => {
                    const colLabel = String.fromCharCode(65 + firstBlank.c);
                    const cellId = colLabel + (firstBlank.r + 1);
                    window.uiManager.showMagicToast(`已精確定位所有空格。活動格 (${cellId}) 已準備就緒，請直接鍵入『=↑』並按 Ctrl + Enter。`, 'success');
                    
                    // Toast 顯示後再次確保焦點，防止被 UI 元件搶走
                    setTimeout(triggerFocus, 100);
                }, 100);

                window.orchestrator.validateStateChange({ type: 'ACTION', id: 'GOTO_DONE' });
            }
        } else {
            document.getElementById('excel-goto-modal').style.display = 'none';
        }
    },

    handleCtrlEnter: (val) => {
        const state = window.orchestrator.state;
        const data = state.gridData;
        const range = state.selectedRange;
        const multi = state.multiSelectedCells || [];
        
        // [反向教學]: 若未選取多個單元格，提示需要 Ctrl + Enter
        const hasRange = range && (range.minRow !== range.maxRow || range.minCol !== range.maxCol);
        const hasMulti = multi.length > 1;

        if (!hasRange && !hasMulti) {
            window.orchestrator.playStorySegment('fail_EMPTY_no_ctrl_enter');
            return;
        }
        
        const normVal = val.toUpperCase().replace('＝', '=');
        if (normVal === "=↑" || normVal === "=UP") {
            if (hasMulti) {
                // 優先使用非連續選取 (定位空格場景)
                multi.forEach(cell => {
                    if (cell.r > 0) {
                        data[cell.r][cell.c] = data[cell.r-1][cell.c];
                    }
                });
            } else {
                // 使用傳統矩形範圍
                for (let r = range.minRow; r <= range.maxRow; r++) {
                    for (let c = range.minCol; c <= range.maxCol; c++) {
                        if (r > 0) {
                            data[r][c] = data[r-1][c];
                        }
                    }
                }
            }
            if (window.gridRenderer) window.gridRenderer.render();
            window.orchestrator.validateStateChange({ type: 'ACTION', id: 'FILL_DONE' });
        } else {
            // [反向教學]: 公式輸入錯誤
            window.orchestrator.playStorySegment('fail_EMPTY_wrong_formula');
        }
    },

    // --- 第 3.5 章 挑戰模式自動化動作 (Popup Only) ---
    autoSearch: (target, rowIdx, colIdx) => {
        const state = window.orchestrator.state;
        state.selectedCell = { r: rowIdx, c: colIdx };
        state.selectedRange = { minRow: rowIdx, maxRow: rowIdx, minCol: colIdx, maxCol: colIdx };
        if (window.gridRenderer) {
            const wrapper = document.getElementById('wrapper');
            const rowHeight = window.gridRenderer.rowHeight || 32;
            if (wrapper) wrapper.scrollTop = rowIdx * rowHeight - wrapper.clientHeight / 2;
            window.gridRenderer.render();
        }
        window.orchestrator.validateStateChange({ type: 'ACTION', id: 'SEARCH_DONE', value: target });
    },

    autoReplace: (oldVal, newVal, colIdx = 4) => {
        const state = window.orchestrator.state;
        const data = state.gridData;
        for (let i = 1; i < data.length; i++) {
            if (data[i][colIdx] === oldVal) data[i][colIdx] = newVal;
        }
        if (window.gridRenderer) window.gridRenderer.render();
        window.orchestrator.validateStateChange({ type: 'ACTION', id: 'REPLACE_DONE' });
    },

    autoFuzzyMark: (pattern, color, colIdx = 1) => {
        const state = window.orchestrator.state;
        const data = state.gridData;
        const format = { backgroundColor: color, color: '#ffffff', fontWeight: 'bold' };
        const prefix = pattern.replace('*', '').replace('?', '');
        const isPreciseFuzzy = pattern.includes('?');
        for (let i = 1; i < data.length; i++) {
            const cellVal = String(data[i][colIdx] || "");
            let match = isPreciseFuzzy ? (cellVal.startsWith(prefix) && cellVal.length === 4) : cellVal.startsWith(prefix);
            if (match) {
                for (let j = 0; j < data[i].length; j++) {
                    const idStr = String.fromCharCode(65 + j) + (i + 1);
                    state.cellStyles[idStr] = { ...state.cellStyles[idStr], ...format };
                }
            }
        }
        if (window.gridRenderer) window.gridRenderer.render();
        window.orchestrator.validateStateChange({ type: 'ACTION', id: 'FUZZY_DONE', value: pattern });
    },

    autoEmptyFill: (colIdx = 5) => {
        const state = window.orchestrator.state;
        const data = state.gridData;
        for (let i = 1; i < data.length; i++) {
            if (data[i][colIdx] === "" && i > 0) data[i][colIdx] = data[i-1][colIdx];
        }
        if (window.gridRenderer) window.gridRenderer.render();
        window.orchestrator.validateStateChange({ type: 'ACTION', id: 'FILL_DONE' });
    }
};

// 使用 addEventListener 以避免與 ui.js 衝突
document.addEventListener('keydown', (e) => {
    const orchestrator = window.orchestrator;
    if (!orchestrator || !orchestrator.state) return;

    const chapterId = orchestrator.state.currentChapter.toString();
    if (chapterId === "30" || chapterId === "35") {
        const k = e.key.toLowerCase();
        const focused = document.activeElement;
        const isCell = focused && focused.classList.contains('cell');
        
        // 僅在模擬器階段生效
        if (orchestrator.state.currentPhase !== 'SIMULATOR') return;

        // --- 公式輔助功能：當輸入 = 後按方向鍵，自動轉為箭頭 ---
        if (isCell && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            const text = focused.innerText.trim();
            if (text === '=' || text === '＝') {
                e.preventDefault();
                let symbol = '';
                if (e.key === 'ArrowUp') symbol = '↑';
                if (e.key === 'ArrowDown') symbol = '↓';
                if (e.key === 'ArrowLeft') symbol = '←';
                if (e.key === 'ArrowRight') symbol = '→';
                
                focused.innerText = text + symbol;
                
                // 將光標移至末尾
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(focused);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
                return;
            }
        }

        if (e.ctrlKey && k === 'f') { 
            e.preventDefault(); 
            window.ch3Actions.find(); 
            return; 
        }
        if (e.ctrlKey && k === 'h') { 
            e.preventDefault(); 
            window.ch3Actions.replace(); 
            return; 
        }
        if (e.key === 'F5') { 
            e.preventDefault(); 
            window.ch3Actions.empty(); 
            return; 
        }
        if (e.ctrlKey && e.key === 'Enter') {
            if (isCell) {
                window.ch3Actions.handleCtrlEnter(focused.innerText.trim());
            }
            return;
        }
    }
});
