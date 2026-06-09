/**
 * 試算表魔法冒險 v2 - 核心渲染引擎 (v45 行為克隆 + 性能優化版)
 * [Change Log 2026-05-25]: 
 * 1. 導入 cellMap 與 headerMap 快取 DOM 節點。
 * 2. 分離「結構渲染 (_renderFull)」與「視覺更新 (_updateVisuals)」。
 * 3. 互動事件 (滑鼠拖曳選取) 改為僅觸發視覺更新，大幅提升流暢度。
 */

class GridRenderer {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.isInitialized = false;
        this.cellMap = new Map(); // 快取儲存 (rIdx,cIdx) -> DOM
        this.headerMap = new Map(); // 快取儲存 (colIdx) -> Header DOM
        
        // --- 虛擬渲染參數 ---
        this.rowHeight = 32;
        this.colWidth = 150;
        this.rowHeadWidth = 50;
        this.bufferRows = 10; // 上下多渲染的緩衝行數
        this.lastScrollTop = 0;
    }

    init() {
        this.container = document.getElementById(this.containerId);
        const wrapper = document.getElementById('wrapper');
        
        if (!this.container || !wrapper) return;

        // --- 性能優化：節流捲動監聽 (虛擬捲動核心) ---
        let isScrolling = false;
        wrapper.onscroll = () => {
            if (isScrolling) return;
            isScrolling = true;
            window.requestAnimationFrame(() => {
                const state = window.orchestrator.state;
                // [優化]: 捲動時僅在跨越行高閾值時觸發重繪
                const scrollTop = wrapper.scrollTop;
                if (Math.abs(scrollTop - this.lastScrollTop) > this.rowHeight) {
                    this.render(); 
                    this.lastScrollTop = scrollTop;
                }
                
                if (wrapper.scrollTop > 30) {
                    window.orchestrator.validateStateChange();
                }
                isScrolling = false;
            });
        };

        // --- [新增]: 高性能自動捲動偵測 ---
        this._setupAutoScroll(wrapper);

        // --- 訂閱大腦事件 ---
        window.orchestrator.on('chapterLoaded', () => this.render());
        window.orchestrator.on('startSimulator', () => this.render());
        window.orchestrator.on('taskChanged', () => this.render());
        window.orchestrator.on('sheetSwitched', () => this.render());

        this.isInitialized = true;
        console.log("Renderer: Virtual Scrolling mode active (32px).");
    }

    /**
     * [內部] 自動捲動邏輯 (使用 requestAnimationFrame 確保流暢)
     */
    _setupAutoScroll(wrapper) {
        let scrollTick = null;
        
        const stopScroll = () => { if (scrollTick) { cancelAnimationFrame(scrollTick); scrollTick = null; } };

        wrapper.addEventListener('mousemove', (e) => {
            const state = window.orchestrator.state;
            if (!state.isSelecting && !state.isDraggingFill && !state.isDraggingCol) {
                stopScroll();
                return;
            }

            const rect = wrapper.getBoundingClientRect();
            const threshold = 50;
            let vx = 0, vy = 0;

            if (e.clientX > rect.right - threshold) vx = 15;
            else if (e.clientX < rect.left + threshold) vx = -15;

            if (e.clientY > rect.bottom - threshold) vy = 15;
            else if (e.clientY < rect.top + threshold) vy = -15;

            if (vx !== 0 || vy !== 0) {
                if (!scrollTick) {
                    const tick = () => {
                        wrapper.scrollLeft += vx;
                        wrapper.scrollTop += vy;
                        // [優化]: 自動捲動時僅觸發視覺更新，避免重建 DOM 導致拖拉中斷
                        if (state.isDraggingFill || state.isSelecting) {
                            // 主動觸發一次全域移動處理以更新範圍
                            if (window.uiManager && window.uiManager.lastMouseX !== undefined) {
                                window.uiManager.handleGlobalMouseMove({
                                    clientX: window.uiManager.lastMouseX,
                                    clientY: window.uiManager.lastMouseY
                                });
                            }
                        }
                        scrollTick = requestAnimationFrame(tick);
                    };
                    scrollTick = requestAnimationFrame(tick);
                }
            } else {
                stopScroll();
            }
        });

        document.addEventListener('mouseup', stopScroll);
    }

    /**
     * 更新選取範圍 (由動作腳本呼叫)
     */
    updateSelectionRange(minCol, minRow, maxCol, maxRow) {
        window.orchestrator.state.selectedRange = { minCol, minRow, maxCol, maxRow };
    }

    /**
     * 全量渲染入口 (相容舊版，執行完整的結構重建)
     */
    render() {
        if (!this.container) return;

        const state = window.orchestrator.state;
        const data = state.gridData;
        if (!data || data.length === 0) return;

        let maxC = 0;
        data.forEach(row => { if (row.length > maxC) maxC = row.length; });
        
        this._renderFull(data, maxC);
    }

    /**
     * [內部] 結構渲染：重建所有 DIV 元素並綁定基本事件
     * [優化]: 虛擬渲染版，只繪製可見區域
     */
    _renderFull(data, maxC) {
        const state = window.orchestrator.state;
        
        // [新增]: 動態重新計算紅字標記 (針對 Ch 4.5)
        if (state.ch45_red_marked) {
            state.cellStyles = {}; // 每次渲染時清空重建，避免篩選後殘留
            for (let rIdx = 1; rIdx < data.length; rIdx++) {
                if (data[rIdx][3] === "命危") {
                    for (let cIdx = 0; cIdx < data[rIdx].length; cIdx++) {
                        const colLabel = String.fromCharCode(65 + cIdx);
                        const cellId = colLabel + (rIdx + 1);
                        state.cellStyles[cellId] = { color: '#b22222', fontWeight: 'bold', backgroundColor: '#ffe6e6' };
                    }
                }
            }
        }

        const wrapper = document.getElementById('wrapper');
        const styles = state.cellStyles || {};
        
        this.cellMap.clear();
        this.headerMap.clear();

        // 1. 計算可見範圍
        const scrollTop = wrapper.scrollTop;
        const wrapperHeight = wrapper.clientHeight || 600; // 增加回退值避免計算為 0
        
        const startIdx = Math.max(0, Math.floor(scrollTop / this.rowHeight) - this.bufferRows);
        const endIdx = Math.min(data.length - 1, Math.ceil((scrollTop + wrapperHeight) / this.rowHeight) + this.bufferRows);

        // 2. 設定容器總高度 (維持捲動軸感) 與 Grid 佈局
        // 重要：必須設定 gridTemplateRows 以確保 grid-row 定位正確
        const totalHeight = (data.length + 1) * this.rowHeight; 
        const isOutline = state.isOutlineVisible;
        const colShift = isOutline ? 1 : 0;

        this.container.style.height = `${totalHeight}px`;
        this.container.style.display = 'grid';
        
        const gridCols = [];
        if (isOutline) gridCols.push('30px');
        gridCols.push(`${this.rowHeadWidth}px`);
        gridCols.push(`repeat(${maxC}, ${this.colWidth}px)`);
        this.container.style.gridTemplateColumns = gridCols.join(' ');
        this.container.style.gridTemplateRows = `repeat(${data.length + 1}, ${this.rowHeight}px)`;
        
        const fragment = document.createDocumentFragment();

        // 2.5 渲染大綱側邊欄 (如果啟用)
        if (isOutline) {
            const outlineSidebar = el('div', {
                className: 'outline-sidebar',
                style: {
                    gridRow: `2 / span ${data.length}`,
                    gridColumn: '1',
                    position: 'sticky',
                    left: '0px',
                    zIndex: '950'
                }
            });
            
            // 模擬一些大綱按鈕
            data.forEach((row, rIdx) => {
                if (rIdx === 0) return;
                if (row[1] && (row[1].includes("總計") || row[1].includes("小計"))) {
                    const btn = el('div', {
                        className: 'outline-btn',
                        innerText: '-',
                        onclick: () => {
                            window.uiManager.showMagicToast("「這道封印暫時不可觸碰，請先專心處理眼前的帳目。」", "error");
                        }
                    });
                    // 計算按鈕位置：使用絕對定位或簡單插入到 sidebar
                    btn.style.position = 'absolute';
                    btn.style.top = `${(rIdx) * this.rowHeight + 9}px`;
                    outlineSidebar.appendChild(btn);
                }
            });
            fragment.appendChild(outlineSidebar);
        }

        // 3. 渲染標題列 (固定在第 1 行)
        const headers = [' '];
        for (let i = 0; i < maxC; i++) headers.push(String.fromCharCode(65 + i));
        
        headers.forEach((h, idx) => {
            const colIdx = idx - 1;
            const div = el('div', {
                className: 'l-head' + (idx > 0 ? ' letter' : ''),
                innerText: h,
                style: {
                    position: 'sticky',
                    top: '0px',
                    zIndex: '1000',
                    gridRow: '1',
                    gridColumn: (idx + 1 + colShift)
                },
                onmousedown: colIdx >= 0 ? (e) => {
                    if (e.button !== 0) return;
                    e.stopPropagation();
                    state.selectedCell = { r: 0, c: colIdx };
                    state.selectedRange = { minRow: 0, maxRow: data.length - 1, minCol: colIdx, maxCol: colIdx };
                    state.isDraggingCol = true;
                    state.draggedColIdx = colIdx;
                    this._updateVisuals(data, maxC, startIdx, endIdx);
                    window.orchestrator.handleHeaderClick(colIdx);
                } : null
            });

            if (colIdx >= 0) this.headerMap.set(colIdx, div);
            fragment.appendChild(div);
        });

        // 4. 渲染可見資料格
        const renderRow = (rIdx) => {
            const row = data[rIdx];
            if (!row) return; // 邊界檢查
            const rNum = rIdx + 1;
            const gridRowPos = rIdx + 2; 

            const rowLabel = el('div', {
                className: `l-head r-${rNum}`,
                innerText: rNum,
                style: {
                    gridRow: gridRowPos,
                    gridColumn: (1 + colShift),
                    position: 'sticky',
                    left: isOutline ? '30px' : '0px',
                    zIndex: '900',
                    ...(rIdx === 0 && state.isFrozen ? { top: `${this.rowHeight}px`, zIndex: '1001' } : {})
                }
            });
            
            fragment.appendChild(rowLabel);

            row.forEach((cellVal, cIdx) => {
                const colLabel = String.fromCharCode(65 + cIdx);
                const cellId = colLabel + rNum;
                
                // [新增]: 樞紐分析表任務引導高亮注入
                let extraClass = "";
                if (cellId === 'A1' && window.ch6Actions?._pivotState?.shouldHighlightA1) {
                    extraClass = " tutorial-highlight-pulse";
                }

                const cell = el('div', {
                    id: cellId,
                    className: `cell r-${rNum}${extraClass}`,
                    textContent: cellVal.toString().trim(), // [修復]: 使用 textContent 避免 innerText 帶來的隱藏 <br> 問題
                    contentEditable: "plaintext-only", // [優化]: 僅限純文字，防止 HTML 與換行注入
                    style: {
                        gridRow: gridRowPos,
                        gridColumn: (cIdx + 2 + colShift),
                        lineHeight: '32px', // [修復]: 固定行高確保垂直居中穩定
                        ...(styles[cellId] || {}),
                        ...(rIdx === 0 && state.isFrozen ? { position: 'sticky', top: `${this.rowHeight}px`, zIndex: '1000' } : {})
                    },
                    "data-r": rIdx,
                    "data-c": cIdx,
                    oninput: (e) => {
                        // [修復]: 強制移除所有換行符，避免數據污染，改讀 textContent
                        const cleanVal = e.target.textContent.replace(/\r?\n|\r/g, "");
                        data[rIdx][cIdx] = cleanVal;
                    },
                    onfocus: (e) => {
                        // 紀錄編輯前的值，以便還原或比對
                        e.target._oldValue = e.target.textContent;
                        state.editingCell = { r: rIdx, c: cIdx, el: e.target };
                        
                        // [終極修復]: 如果儲存格是空的，直接清空其 HTML，消滅隱形 <br> 或幽靈文字節點
                        if (e.target.textContent.trim() === '') {
                            e.target.innerHTML = '';
                        }
                        
                        // [修復]: 聚焦時全選內容，並清理可能存在的隱形空白
                        requestAnimationFrame(() => {
                            const range = document.createRange();
                            range.selectNodeContents(e.target);
                            const sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        });
                    },
                    onkeydown: (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            e.target.blur(); // 模擬 Excel 按下 Enter 完成編輯
                        }
                    },
                    onblur: (e) => {
                        const oldVal = e.target._oldValue;
                        // [修復]: 離開時再次清理數據
                        const newVal = e.target.textContent.replace(/\r?\n|\r/g, "").trim();
                        e.target.textContent = newVal;
                        
                        // [新增]: 延遲清除編輯狀態，給 mousedown 留出判斷時間
                        setTimeout(() => {
                            if (state.editingCell && state.editingCell.el === e.target) {
                                state.editingCell = null;
                                // [修復]: 清除公式標記，但如果正在拖拉 (isDraggingFill)，則延後渲染，避免 DOM 重建導致拖拉中斷
                                state.formulaRefs = [];
                                if (window.gridRenderer && !state.isDraggingFill) {
                                    window.gridRenderer.render();
                                }
                            }
                        }, 200);

                        if (oldVal !== newVal) {
                            window.orchestrator.handleCellEdit(rIdx, cIdx, oldVal, newVal);
                            window.orchestrator.saveGame();
                        }
                    },
                    onmousedown: (e) => {
                        if (e.button !== 0) return;
                        e.stopPropagation();

                        // [新增]: 模擬 Excel 點選儲存格自動填入公式功能
                        const editing = state.editingCell;
                        if (editing && editing.el && editing.el.textContent.startsWith('=')) {
                            // 如果點擊的不是正在編輯的格子
                            if (editing.r !== rIdx || editing.c !== cIdx) {
                                e.preventDefault(); // 阻止焦點轉移
                                const targetAddr = String.fromCharCode(65 + cIdx) + (rIdx + 1);
                                
                                // 檢查最後一個字元，決定是「替換」還是「追加」
                                const currentText = editing.el.textContent;
                                const lastChar = currentText.slice(-1);
                                const operators = ['+', '-', '*', '/', '(', ',', '='];
                                
                                if (operators.includes(lastChar)) {
                                    editing.el.textContent += targetAddr;
                                } else {
                                    // 點擊即選取，預設行為：如果是第一個引用的儲存格且前面只有等號，則直接追加；否則提示或加上 +
                                    if (currentText === "=") {
                                        editing.el.textContent += targetAddr;
                                    } else {
                                        editing.el.textContent += "+" + targetAddr;
                                    }
                                }
                                
                                // [新增]: 視覺標記邏輯
                                state.formulaRefs = state.formulaRefs || [];
                                state.formulaRefs.push({ r: rIdx, c: cIdx, id: targetAddr });
                                
                                // 同步數據至 state
                                data[editing.r][editing.c] = editing.el.textContent;
                                
                                // [修復]: 修改內容後，瀏覽器會重置游標位置到開頭。強制將游標移至文字最後。
                                const range = document.createRange();
                                range.selectNodeContents(editing.el);
                                range.collapse(false); // 摺疊到最後
                                const sel = window.getSelection();
                                sel.removeAllRanges();
                                sel.addRange(range);
                                
                                // [新增]: 觸發音效與視覺更新
                                if (window.uiManager) window.uiManager.playSFX('coin2.mp3', 0.5);
                                this._updateVisuals(data, maxC, startIdx, endIdx);
                                return;
                            }
                        }
                        
                        // [優化]: 如果點擊在已選取的「多重選取」儲存格內，不要清除清單，僅更新活動格
                        const isPartOfMulti = state.multiSelectedCells && state.multiSelectedCells.some(c => c.r === rIdx && c.c === cIdx);
                        if (isPartOfMulti) {
                            state.selectedCell = { r: rIdx, c: cIdx };
                        } else {
                            state.multiSelectedCells = []; // 手動選取一般區域時清除多重選取
                            state.selectedCell = { r: rIdx, c: cIdx };
                        }

                        const isAlreadyActive = state.selectedCell && state.selectedCell.r === rIdx && state.selectedCell.c === cIdx;
                        const hasRange = state.selectedRange && (state.selectedRange.minRow !== state.selectedRange.maxRow || state.selectedRange.minCol !== state.selectedRange.maxCol);
                        
                        state.isSelecting = true;
                        if (!isPartOfMulti) {
                            state.selectedRange = { minRow: rIdx, maxRow: rIdx, minCol: cIdx, maxCol: cIdx };
                        }
                        
                        this._updateVisuals(data, maxC, startIdx, endIdx);
                    },
                    onmouseover: (e) => {
                        if (state.isSelecting) {
                            const start = state.selectedCell;
                            state.selectedRange = {
                                minRow: Math.min(start.r, rIdx),
                                maxRow: Math.max(start.r, rIdx),
                                minCol: Math.min(start.c, cIdx),
                                maxCol: Math.max(start.c, cIdx)
                            };
                            this._updateVisuals(data, maxC, startIdx, endIdx);
                        }
                    }
                });

                // [優化]: 使用 JS 屬性快取座標，速度比 getAttribute 快 10 倍
                cell._rIdx = rIdx;
                cell._cIdx = cIdx;

                // [新增]: 篩選箭頭邏輯
                if (rIdx === 0 && state.isFilterActive) {
                    const filterBtn = el('div', {
                        className: 'excel-filter-icon',
                        innerText: '▼',
                        onclick: (e) => {
                            e.stopPropagation();
                            window.uiManager.showColumnFilterDropdown(cIdx, e.currentTarget);
                        }
                    });
                    cell.appendChild(filterBtn);
                    cell.classList.add('has-filter');
                }

                if (rIdx === 0 && state.isFrozen) cell.classList.add('frozen');
                this.cellMap.set(`${rIdx},${cIdx}`, cell);
                fragment.appendChild(cell);
            });
        };

        if (state.isFrozen && startIdx > 0) renderRow(0);

        for (let i = startIdx; i <= endIdx; i++) {
            if (i === 0 && state.isFrozen && startIdx > 0) continue; 
            renderRow(i);
        }

        this.container.innerHTML = '';
        this.container.appendChild(fragment);
        
        this._updateVisuals(data, maxC, startIdx, endIdx);
    }

    /**
     * [重點優化] 視覺更新：不重建 DOM，僅更新 CSS 類別與填充柄
     */
    _updateVisuals(data, maxC, startIdx, endIdx) {
        const state = window.orchestrator.state;
        const range = state.selectedRange;
        const fillRange = state.fillPreviewRange;

        // [新增優化]: 預先計算 Set 以實現 O(1) 查找速度
        const multiSet = new Set();
        if (state.multiSelectedCells) {
            state.multiSelectedCells.forEach(c => multiSet.add(`${c.r},${c.c}`));
        }
        
        const formulaSet = new Set();
        if (state.formulaRefs) {
            state.formulaRefs.forEach(ref => formulaSet.add(`${ref.r},${ref.c}`));
        }

        // 1. 更新 Header 高亮
        this.headerMap.forEach((div, colIdx) => {
            const isColSelected = range && range.minCol === colIdx && range.maxCol === colIdx && 
                                 range.minRow === 0 && range.maxRow >= data.length - 1;
            div.classList.toggle('selected', !!isColSelected);
        });

        // 2. 更新 Cell 狀態 (僅針對已繪製的 Cell)
        let handleTargetCell = null;

        this.cellMap.forEach((cell, key) => {
            const rIdx = cell._rIdx;
            const cIdx = cell._cIdx;
            
            const isMulti = multiSet.has(`${rIdx},${cIdx}`);
            const isInRange = (range && rIdx >= range.minRow && rIdx <= range.maxRow && 
                                      cIdx >= range.minCol && cIdx <= range.maxCol) || isMulti;
            
            // [新增]: 填充預覽邏輯 (模擬 Excel 虛線框)
            const isInFillRange = fillRange && rIdx >= fillRange.minRow && rIdx <= fillRange.maxRow && 
                                  cIdx >= fillRange.minCol && cIdx <= fillRange.maxCol;

            const isFullColSel = range && cIdx >= range.minCol && cIdx <= range.maxCol && 
                                 range.minRow === 0 && range.maxRow >= data.length - 1;

            // [性能優化]: 只有在狀態改變時才觸發 classList 操作，減少 DOM 負擔
            if (cell.classList.contains('selected') !== !!isInRange) {
                cell.classList.toggle('selected', !!isInRange);
            }
            if (cell.classList.contains('fill-preview') !== !!isInFillRange) {
                cell.classList.toggle('fill-preview', !!isInFillRange);
            }
            if (cell.classList.contains('l-sel') !== !!isFullColSel) {
                cell.classList.toggle('l-sel', !!isFullColSel);
            }

            // [優化]: 公式標記視覺化
            const isFormulaRef = formulaSet.has(`${rIdx},${cIdx}`);
            if (cell.classList.contains('formula-marking') !== !!isFormulaRef) {
                cell.classList.toggle('formula-marking', !!isFormulaRef);
            }

            // [優化]: 紀錄哪一個儲存格應該擁有填充柄 (注意：拖拉預覽時，柄應跟隨預覽末尾)
            const isHandleTarget = fillRange 
                ? (rIdx === fillRange.maxRow && cIdx === fillRange.maxCol)
                : (isInRange && rIdx === range.maxRow && cIdx === range.maxCol);

            if (isHandleTarget) {
                handleTargetCell = cell;
            }
        });

        // [優化]: 集中處理填充柄 (Fill Handle) DOM 操作，使用實例快取
        if (this._currentHandleCell !== handleTargetCell) {
            if (this._currentHandleEl && this._currentHandleEl.parentNode) {
                this._currentHandleEl.remove();
            }
            if (handleTargetCell) {
                if (!this._fillHandleEl) {
                    this._fillHandleEl = el('div', {
                        className: 'fill-handle',
                        onmousedown: (e) => {
                            e.stopPropagation();
                            state.isDraggingFill = true;
                            state.fillSourceRange = JSON.parse(JSON.stringify(state.selectedRange));
                            // [關鍵]: 開始拖拉時快取座標參考點，避免 mousemove 時觸發 getBoundingClientRect
                            if (window.uiManager) window.uiManager.cacheDragReference();
                        }
                    });
                }
                handleTargetCell.appendChild(this._fillHandleEl);
                this._currentHandleEl = this._fillHandleEl;
            }
            this._currentHandleCell = handleTargetCell;
        }
    }

    _checkIsSelected(state, r, c) {
        if (state.selectedCell && state.selectedCell.r === r && state.selectedCell.c === c) return true;
        const range = state.selectedRange;
        return range && r >= range.minRow && r <= range.maxRow && c >= range.minCol && c <= range.maxCol;
    }
}

window.gridRenderer = new GridRenderer('grid');
