/**
 * 試算表魔法冒險 v2 - 開發者工具模組 (ui_dev.js)
 */
console.log("💎 [ui_dev.js] 檔案已成功載入！");

    // --- [新增] 開發者工具邏輯 ---
UIManager.prototype.openDevMenu = function() {
        const modal = document.getElementById('dev-modal');
        if (!modal) return;
        const isOpening = modal.style.display !== 'block';
        modal.style.display = isOpening ? 'block' : 'none';

        if (isOpening) {
            const container = document.getElementById('dev-segments');
            const chapter = window.orchestrator.state.activeChapterModule;
            if (!container || !chapter) return;

            container.innerHTML = "";
            const exclude = ['start', 'end'];
            Object.keys(chapter.story).forEach(key => {
                if (!exclude.includes(key)) {
                    const btn = document.createElement('button');
                    btn.className = 'dev-opt';
                    btn.style.fontSize = '12px';
                    btn.innerText = `段落：${key}`;
                    btn.onclick = () => {
                        this.openDevMenu();
                        window.orchestrator.playStorySegment(key);
                    };
                    container.appendChild(btn);
                }
            });
        }
    };

    /**
     * [新增] 全螢幕切換功能
     */
UIManager.prototype.toggleFullscreen = function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`無法進入全螢幕模式: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // --- [新增] 進階篩選對話框管理 ---
UIManager.prototype.openAdvFilterDialog = async function() {
        const modal = document.getElementById('excel-adv-filter-modal');
        if (modal) modal.style.display = 'block';
    };

UIManager.prototype.closeAdvFilterDialog = async function() {
        const modal = document.getElementById('excel-adv-filter-modal');
        if (modal) modal.style.display = 'none';
    };

UIManager.prototype.confirmAdvFilterDialog = async function() {
        // 在模擬器中，目前點擊確定即代表執行進階篩選動作
        const state = window.orchestrator.state;
        const currentChap = state.currentChapter.toString();
        if (currentChap === "50" && window.ch5Actions) {
            window.ch5Actions.filter_adv();
        } else if (window.ch4Actions) {
            window.ch4Actions.filter_adv();
        }
        this.closeAdvFilterDialog();
    };

    // --- [新增] 欄位篩選系統 ---
UIManager.prototype.showColumnFilterDropdown = async function(colIdx, anchorEl) {
        const dropdown = document.getElementById('filter-dropdown');
        if (!dropdown || !anchorEl) return;

        // 1. 取得該欄位所有不重複的值
        // [關鍵修正]: 必須從原始數據抓取選項，否則篩選後其他選項會消失，導致玩家無法還原！
        const state = window.orchestrator.state;
        const originalData = state.activeChapterModule?.initialGridData;
        const currentData = state.gridData;
        if (!originalData || originalData.length <= 1) return;

        const colName = originalData[0][colIdx];
        const uniqueValues = [...new Set(originalData.slice(1).map(row => row[colIdx] ? row[colIdx].toString() : ""))];
        uniqueValues.sort();

        // 判斷目前畫面上還有哪些值（決定預設打勾狀態）
        const currentVisibleValues = new Set(currentData.slice(1).map(row => row[colIdx] ? row[colIdx].toString() : ""));
        const isAllSelected = currentData.length === originalData.length;

        // 2. 構建下拉選單內容
        dropdown.innerHTML = `
            <div class="filter-header">篩選：${colName}</div>
            <div class="filter-search"><input type="text" placeholder="搜尋..." oninput="window.uiManager.filterSearchItems(this.value)"></div>
            <div class="filter-list" id="filter-val-list">
                <div class="filter-item">
                    <input type="checkbox" id="filter-select-all" ${isAllSelected ? 'checked' : ''} onchange="window.uiManager.toggleFilterSelectAll(this.checked)">
                    <label for="filter-select-all" style="flex:1">(全選)</label>
                </div>
                ${uniqueValues.map((val, i) => `
                    <div class="filter-item">
                        <input type="checkbox" class="filter-val-check" value="${val}" id="f-val-${i}" ${currentVisibleValues.has(val) ? 'checked' : ''}>
                        <label for="f-val-${i}" style="flex:1">${val || "(空白)"}</label>
                    </div>
                `).join('')}
            </div>
            <div class="filter-footer">
                <button class="excel-ok" onclick="window.uiManager.confirmColumnFilter(${colIdx})" style="width:70px;">確定</button>
                <button class="excel-cancel" onclick="window.uiManager.hideFilterDropdown()" style="width:70px;">取消</button>
            </div>
        `;

        // 3. 定位
        const rect = anchorEl.getBoundingClientRect();
        dropdown.style.top = rect.bottom + 'px';
        dropdown.style.left = (rect.right - 200) + 'px'; // 靠右對齊
        dropdown.style.display = 'block';

        // 4. 點擊外部關閉
        const closer = (e) => {
            if (!dropdown.contains(e.target) && !anchorEl.contains(e.target)) {
                this.hideFilterDropdown();
                document.removeEventListener('mousedown', closer);
            }
        };
        setTimeout(() => document.addEventListener('mousedown', closer), 10);
    };

UIManager.prototype.toggleFilterSelectAll = async function(isChecked) {
        document.querySelectorAll('.filter-val-check').forEach(cb => {
            cb.checked = isChecked;
        });
    };

UIManager.prototype.filterSearchItems = async function(val) {
        const needle = val.toLowerCase();
        document.querySelectorAll('.filter-item').forEach(item => {
            if (item.querySelector('#filter-select-all')) return;
            const text = item.innerText.toLowerCase();
            item.style.display = text.includes(needle) ? 'flex' : 'none';
        });
    };

UIManager.prototype.hideFilterDropdown = async function() {
        const dropdown = document.getElementById('filter-dropdown');
        if (dropdown) dropdown.style.display = 'none';
    };

UIManager.prototype.confirmColumnFilter = async function(colIdx) {
        const checks = document.querySelectorAll('.filter-val-check:checked');
        const selectedValues = Array.from(checks).map(c => c.value);
        
        const state = window.orchestrator.state;
        const currentChap = state.currentChapter.toString();
        if (currentChap === "50" && window.ch5Actions) {
            window.ch5Actions.execute_column_filter(colIdx, selectedValues);
        } else if (window.ch4Actions) {
            window.ch4Actions.execute_column_filter(colIdx, selectedValues);
        }
        this.hideFilterDropdown();
    };

UIManager.prototype.jumpToChapter = async function(chapterId, phase) {
        this.openDevMenu();
        this.hideOverlay();
        document.getElementById('game-main').classList.remove('in-story');
        
        console.log(`[DevTool] 跳轉至章節 ${chapterId}, 階段 ${phase}`);
        
        // 更新章節並載入
        window.orchestrator.state.currentChapter = chapterId;
        await window.orchestrator.loadChapter(chapterId);
        window.orchestrator.triggerPhase(phase);
    };

UIManager.prototype.jumpTo = function(phase) {
        this.openDevMenu();
        // 確保先關閉當前可能正在運行的劇情
        this.hideOverlay();
        document.getElementById('game-main').classList.remove('in-story');
        window.orchestrator.triggerPhase(phase);
    };
