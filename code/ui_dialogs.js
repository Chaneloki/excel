/**
 * 試算表魔法冒險 v2 - 對話框模組 (ui_dialogs.js)
 */
console.log("💎 [ui_dialogs.js] 檔案已成功載入！");

    // --- [新增] 排序對話框管理 ---
UIManager.prototype.openSortDialog = function() {
        const modal = document.getElementById('excel-sort-modal');
        const body = document.getElementById('sort-levels-body');
        if (!modal || !body) return;

        // [關鍵優化]: 只有在第一次打開（且沒有現有層級）時才初始化
        // 這樣可以記憶玩家上一次的配置，避免重複輸入自訂序列
        if (!this._sortLevels || this._sortLevels.length === 0) {
            body.innerHTML = ""; 
            this._sortLevels = []; 
            this.addSortLevel(); 

            // 預設選中「病情等級」
            const firstRow = body.querySelector('tr');
            if (firstRow) {
                const colSelect = firstRow.querySelector('.sort-col');
                if (colSelect) colSelect.value = "3"; 
            }
        }

        modal.style.display = 'block';
    }

UIManager.prototype.closeSortDialog = function() {
        const modal = document.getElementById('excel-sort-modal');
        if (modal) modal.style.display = 'none';
        // 注意：不清除 this._sortLevels 以保持記憶
    }

UIManager.prototype.addSortLevel = function() {
        const body = document.getElementById('sort-levels-body');
        const row = document.createElement('tr');
        const levelIdx = this._sortLevels ? this._sortLevels.length : 0;
        
        // 取得目前的表格標題作為下拉選項
        const headers = window.orchestrator.state.gridData[0] || [];
        const colOptions = headers.map((h, i) => `<option value="${i}">${h}</option>`).join('');

        row.innerHTML = `
            <td style="padding:5px; border-right:1px solid #eee;">
                <select class="sort-col" style="width:100%; border:1px solid #ccc; font-size:11px;">
                    ${colOptions}
                </select>
            </td>
            <td style="padding:5px; border-right:1px solid #eee;">
                <select style="width:100%; border:1px solid #ccc; font-size:11px;">
                    <option>值</option>
                </select>
            </td>
            <td style="padding:5px;">
                <select class="sort-order" onchange="window.uiManager.handleSortOrderChange(this, ${levelIdx})" style="width:100%; border:1px solid #ccc; font-size:11px;">
                    <option value="asc">A 到 Z</option>
                    <option value="desc">Z 到 A</option>
                    <option value="custom">自訂清單...</option>
                </select>
            </td>
        `;

        body.appendChild(row);
        if (!this._sortLevels) this._sortLevels = [];
        this._sortLevels.push(row);
    }

UIManager.prototype.deleteSortLevel = function() {
        if (this._sortLevels && this._sortLevels.length > 1) {
            const row = this._sortLevels.pop();
            row.remove();
        }
    }

UIManager.prototype.handleSortOrderChange = function(selectEl, idx) {
        if (selectEl.value === 'custom') {
            // 紀錄是哪個下拉選單觸發的，以便回傳結果
            this._activeSortOrderSelect = selectEl;
            // 關鍵路徑：從排序對話框跳轉到自訂清單
            this.openFormatDialog('customlist');
            // 將 select 重置為 desc，避免重複觸發，待自訂完成後會再檢查
            selectEl.value = 'desc'; 
        }
    }

UIManager.prototype.confirmSortDialog = function() {
        const levels = [];
        const rows = document.querySelectorAll('#sort-levels-body tr');
        rows.forEach(row => {
            const col = parseInt(row.querySelector('.sort-col').value);
            const order = row.querySelector('.sort-order').value;
            levels.push({ col, order });
        });

        // 呼叫章節動作執行排序
        const state = window.orchestrator.state;
        const currentChap = state.currentChapter.toString();
        if (currentChap === "50" && window.ch5Actions) {
            window.ch5Actions.execute_complex_sort(levels);
        } else if (window.ch4Actions) {
            window.ch4Actions.execute_complex_sort(levels);
        }
        this.closeSortDialog();
    }

    // --- 格式對話框管理 ---
UIManager.prototype.openFormatDialog = function(defaultTab = 'number') {
        this.hideContextMenu();
        const modal = document.getElementById('excel-format-modal');
        if (!modal) return;

        // [新增]: 針對「自訂清單」任務優化
        const state = window.orchestrator.state;
        const currentTask = state.activeChapterModule?.simulator?.tasks[state.currentTaskIndex];
        
        // 如果是自訂排序任務，強行切換到專屬分頁
        if (currentTask && currentTask.id === "CUSTOM_SORT_TASK") {
            defaultTab = 'customlist';
        }

        this.switchFormatTab(defaultTab);

        if (defaultTab === 'number') {
            const chapterId = state.currentChapter.toString();
            const isCh25 = chapterId === "25";
            
            if (isCh25) {
                this.switchFormatCategory('貨幣');
                const input = document.getElementById('custom-format-input');
                if (input) input.value = "$#,##0";
            } else {
                this.switchFormatCategory('自訂');
                const input = document.getElementById('custom-format-input');
                if (input) input.value = '0"分"';
            }
            this.renderCustomFormatList(isCh25);
        }

        // [新增]: 動態修改自訂清單的提示文字
        if (defaultTab === 'customlist') {
            const hintEl = document.getElementById('custom-list-hint');
            if (hintEl) {
                if (state.currentChapter.toString() === "45") {
                    hintEl.innerText = "待排序項目：命危、虛弱、穩定";
                } else {
                    hintEl.innerText = "提示：在右側輸入「重症」、「中症」、「輕症」（每行一個），然後點擊新增。";
                }
            }
        }

        // [優化]: 移除 redundant JS transition，由 CSS fadeIn 處理
        modal.style.display = 'block';
    }

UIManager.prototype.closeFormatDialog = function() {
        const modal = document.getElementById('excel-format-modal');
        if (modal) modal.style.display = 'none';
    }

UIManager.prototype.switchFormatTab = function(tabName) {
        // [新增]: 處理分頁標籤欄的顯示/隱藏 (自訂清單在 Excel 是獨立對話框)
        const tabsStrip = document.getElementById('excel-tabs-strip');
        if (tabName === 'customlist') {
            if (tabsStrip) tabsStrip.style.display = 'none';
            const headerTitle = document.querySelector('.excel-dialog-header span');
            if (headerTitle) headerTitle.innerText = "自訂清單";
        } else {
            if (tabsStrip) tabsStrip.style.display = 'flex';
            const headerTitle = document.querySelector('.excel-dialog-header span');
            if (headerTitle) headerTitle.innerText = "設定儲存格格式";
        }

        // 切換按鈕樣式
        document.querySelectorAll('.excel-tab').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
        });
        // 切換內容顯示
        document.querySelectorAll('.tab-content').forEach(c => {
            c.style.display = (c.id === `tab-content-${tabName}`) ? 'block' : 'none';
        });
    }

    /**
     * [新增] 切換格式對話框內的左側類別 (如：一般、數值、貨幣、自訂)
     */
UIManager.prototype.switchFormatCategory = function(catName) {
        const isCustom = catName === 'custom' || catName === '自訂';
        const isCurrency = catName === 'currency' || catName === '貨幣';
        
        const items = document.querySelectorAll('.category-item');
        items.forEach(item => {
            const text = item.innerText.trim();
            let isMatch = false;
            
            if (isCustom && text.indexOf('自訂') !== -1) isMatch = true;
            else if (isCurrency && text.indexOf('貨幣') !== -1) isMatch = true;
            else if (catName && text.indexOf(catName) !== -1) isMatch = true;
            
            if (isMatch) {
                item.classList.add('active');
            } else {
                // 只有在設定儲存格格式或自訂清單的清單內才清除 active
                const parent = item.closest('.excel-category-list');
                if (parent) {
                    item.classList.remove('active');
                }
            }
        });
    }

    /**
     * [新增] 渲染自訂格式列表
     */
UIManager.prototype.renderCustomFormatList = function(isCh25 = false) {
        const list = document.getElementById('custom-format-list');
        if (!list) return;

        const formats = isCh25 ? ["$0", "$#,##0", "$#,##0.00"] : ["0\"分\"", "0.0\"分\"", "#,##0\"分\""];
        list.innerHTML = "";
        
        formats.forEach(fmt => {
            const item = el('div', {
                className: 'category-item',
                innerText: fmt,
                onclick: () => {
                    const input = document.getElementById('custom-format-input');
                    if (input) input.value = fmt;
                }
            });
            list.appendChild(item);
        });
    }

    /**
     * [新增]: 模擬 Excel 自訂清單新增邏輯
     */
UIManager.prototype.addCustomListFromUI = function() {
        const textarea = document.getElementById('excel-custom-entries');
        const pane = document.getElementById('excel-custom-lists-pane');
        if (!textarea || !pane) return;

        const lines = textarea.value.split('\n').map(l => l.trim()).filter(l => l !== "");
        if (lines.length === 0) {
            this.showMagicToast("請輸入清單項目！", "error");
            return;
        }

        // [優化]: 驗證是否符合目前章節任務要求
        const state = window.orchestrator.state;
        const currentTask = state.activeChapterModule?.simulator?.tasks[state.currentTaskIndex];
        const expected = currentTask?.quiz?.customOrder || ["重症", "中症", "輕症"];
        
        const isMatch = expected.length > 0 && expected.every(e => lines.includes(e));

        if (isMatch) {
            // 在左側選單新增一個項目，並使其可點擊選取
            const newItem = el('div', {
                className: 'category-item',
                innerText: lines.join(', '),
                onclick: (e) => {
                    // 切換選取狀態
                    pane.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this._selectedCustomList = lines;
                }
            });
            pane.appendChild(newItem);
            
            this.showMagicToast("清單已成功新增！現在請在左側選取該清單並按確定。", "success");
            textarea.value = ""; // 清空輸入區
        } else {
            this.showMagicToast(`排序序列似乎不符合邏輯（提示：需要包含 ${expected.join('、')}）`, "error");
        }
    }

UIManager.prototype.confirmFormatDialog = function() {
        const activeTab = document.querySelector('.tab-content[style*="display: block"]')?.id;
        
        if (activeTab === 'tab-content-number') {
            const fmt = document.getElementById('custom-format-input')?.value || "";
            window.ch2Actions.customformat(fmt);
        } else if (activeTab === 'tab-content-border') {
            window.ch2Actions.diagonalborder();
        } else if (activeTab === 'tab-content-customlist') {
            // [關鍵修正]: 回傳清單至排序對話框，而非直接執行
            if (this._selectedCustomList) {
                if (this._activeSortOrderSelect) {
                    const listStr = this._selectedCustomList.join(', ');
                    
                    // 檢查是否已有該選項，避免重複
                    let exists = false;
                    for (let opt of this._activeSortOrderSelect.options) {
                        if (opt.value === 'custom_done') {
                            opt.text = listStr;
                            exists = true;
                            break;
                        }
                    }

                    if (!exists) {
                        const newOpt = new Option(listStr, 'custom_done');
                        this._activeSortOrderSelect.add(newOpt, 0); // 插到最前面
                    }
                    this._activeSortOrderSelect.value = 'custom_done';
                    this._activeSortOrderSelect = null;
                }
                
                this.showMagicToast("自訂序列已套用至排序規則！", "success");
                this.closeFormatDialog();
                return;
            } else {
                this.showMagicToast("請先在左側清單中選取您剛才新增的排序規則！", "error");
                return;
            }
        }
        this.closeFormatDialog();
    }



    // --- 禁術試煉 (Trials) ---
UIManager.prototype.openTrialModal = function(trial) {
        const modal = document.getElementById('trial-modal');
        const situation = document.getElementById('trial-situation');
        const optionsContainer = document.getElementById('trial-options');
        if (!modal || !situation || !optionsContainer) return;

        this.isTrialActive = true; 
        situation.innerHTML = this.highlightText(trial.situation);
        optionsContainer.innerHTML = "";

        trial.options.forEach(opt => {
            const btn = el('button', {
                className: 'trial-opt-btn',
                innerText: opt.t,
                onclick: () => {
                    if (opt.correct) {
                        this.playSFX('success.mp3');
                        modal.style.display = 'none';
                        this.isTrialActive = false;
                        if (trial.success_msg) this.showMagicToast(trial.success_msg);
                        if (trial.onComplete) trial.onComplete();
                    } else {
                        this.playSFX('fail.mp3');
                        btn.classList.add('shake');
                        setTimeout(() => btn.classList.remove('shake'), 500);
                    }
                }
            });
            optionsContainer.appendChild(btn);
        });

        // 使用 requestAnimationFrame 確保顯示流暢
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        requestAnimationFrame(() => {
            modal.style.transition = 'opacity 0.3s';
            modal.style.opacity = '1';
        });
    }

