/**
 * 試算表魔法冒險 v2 - Ribbon 與 UI 面板模組 (ui_ribbon.js)
 */
console.log("💎 [ui_ribbon.js] 檔案已成功載入！");

    // --- Ribbon 分頁系統 ---
UIManager.prototype.switchTab = function(tabId) {
        this.activeTab = tabId;
        document.querySelectorAll('.ribbon-tabs .tab').forEach(t => {
            t.classList.toggle('active', t.id === `tab-${tabId}`);
        });
        this.renderRibbon(window.orchestrator.state.activeChapterModule?.simulator);
    }

UIManager.prototype.renderRibbon = function(config) {
        const container = document.getElementById('ribbon-btns');
        if (!container || !config) return;
        container.innerHTML = "";
        
        const state = window.orchestrator.state;
        const tasks = config.tasks;
        const currentTask = tasks[state.currentTaskIndex];
        const chapterId = state.currentChapter.toString();
        const isChallenge = ["25", "35", "55"].includes(chapterId); // 移除 "15"，使其與 Ch1 同步

        // [挑戰模式]: 顯示所有該章節需要的技能
        if (isChallenge) {
            let challengeBtns = [];
            if (chapterId === "25") {
                challengeBtns = [
                    { id: "mergecenter", skill: "MERGE_CENTER" },
                    { id: "border", skill: "BORDER" },
                    { id: "fillcolor", skill: "FILL" },
                    { id: "formatpainter", skill: "FORMAT" },
                    { id: "autosum", skill: "SUM" }
                ];
            } else if (chapterId === "35") {
                challengeBtns = [
                    { id: "find_group", skill: "SEARCH" }
                ];
            } else if (chapterId === "55") {
                challengeBtns = [
                    { id: "sort_filter_group", skill: "SORT_SIMPLE" },
                    { id: "data_group", skill: "SUBTOTAL" },
                    { id: "validation_btn", skill: "VALIDATION" }
                ];
            }
            
            challengeBtns.forEach(btnCfg => {
                const skill = window.orchestrator.skillDefs[btnCfg.skill];
                if (skill) {
                    let taskTab = 'start';
                    if (skill.cat === 'move' || skill.cat === 'view') taskTab = 'view';
                    if (skill.cat === 'data') taskTab = 'data';
                    if (skill.cat === 'insert') taskTab = 'insert';
                    
                    if (taskTab === this.activeTab) {
                        this._createRibbonBtn(btnCfg.id, btnCfg.skill, container);
                    }
                }
            });
        } else {
            // 標準模式 (Ch1, Ch1.5, Ch2, Ch3, Ch4, Ch5)
            const renderedBtns = new Set();

            if (currentTask && currentTask.unlockBtnId) {
                const taskTab = currentTask.tab || 'start';

                if (taskTab === this.activeTab) {
                    this._createRibbonBtn(currentTask.unlockBtnId, currentTask.unlockSkillId, container);
                    renderedBtns.add(currentTask.unlockBtnId);
                }
            }

            tasks.forEach(task => {
                if (task.unlockBtnId && state.unlockedSkills.includes(task.unlockSkillId)) {
                    if (!renderedBtns.has(task.unlockBtnId)) {
                        const skill = window.orchestrator.skillDefs[task.unlockSkillId];
                        let taskTab = task.tab || 'start';
                        // [新增]: 優先使用技能定義中的 cat
                        if (skill && skill.cat === 'data') taskTab = 'data'; 
                        if (skill && skill.cat === 'insert') taskTab = 'insert';
                        if (skill && (skill.cat === 'move' || skill.cat === 'view')) taskTab = 'view';

                        if (taskTab === this.activeTab) {
                            this._createRibbonBtn(task.unlockBtnId, task.unlockSkillId, container);
                            renderedBtns.add(task.unlockBtnId);
                        }
                    }
                }
            });
        }
    }

UIManager.prototype._createRibbonBtn = function(btnId, skillId, container) {
        const skill = window.orchestrator.skillDefs[skillId];
        let btnLabel = skill ? skill.n : btnId;
        
        // [新增]: 針對進階篩選進行特殊樣式處理 (圖示在左，文字在右)
        const isAdvFilter = btnId === 'adv_filter';
        if (isAdvFilter) btnLabel = "進階"; // 強制縮短名稱

        const children = [];
        if (skill && skill.icon) {
            children.push(el('img', { src: skill.icon, alt: btnLabel }));
        }
        children.push(el('span', { innerText: btnLabel }));

        const btn = el('button', {
            className: `ribbon-btn ${isAdvFilter ? 'medium-horizontal' : 'big'}`,
            onclick: (e) => this.triggerAction(btnId, e.currentTarget)
        }, children);
        
        container.appendChild(btn);
    }

    // --- 工作表系統 ---
UIManager.prototype.renderSheetBar = function() {
        const bar = document.getElementById('sheet-bar');
        const addBtn = document.getElementById('add-sheet');
        if (!bar || !addBtn) return;

        // 移除現有的標籤 (保留新增按鈕)
        bar.querySelectorAll('.sheet').forEach(s => s.remove());

        const state = window.orchestrator.state;
        const sheets = state.sheets;

        Object.keys(sheets).forEach(id => {
            const label = state.sheetNames[id] || "🛡️ 裝備清單";
            const tab = el('div', {
                className: 'sheet' + (id === state.activeSheetId ? ' active' : ''),
                id: id,
                innerText: label,
                onclick: () => window.orchestrator.switchSheet(id)
            });
            
            addBtn.before(tab);
        });
    }

UIManager.prototype.updateSheetTabUI = function(activeId) {
        document.querySelectorAll('.sheet').forEach(tab => {
            tab.classList.toggle('active', tab.id === activeId);
        });
    }

UIManager.prototype.updateCoins = function(coins) {
        const el = document.getElementById('coin-count');
        if (el) el.innerText = coins;
    }

    // --- 技能系統 ---
UIManager.prototype.openSkills = function() {
        const m = document.getElementById('s-modal');
        if (!m) return;
        const isOpening = m.style.display !== 'block';
        m.style.display = isOpening ? 'block' : 'none';
        if (isOpening) this.renderSkillList();
    }

UIManager.prototype.showSkillUnlockToast = function(id, skill) {
        const toast = document.getElementById('skill-toast');
        const name = document.getElementById('skill-toast-name');
        if (!toast || !name) return;
        name.innerText = skill ? skill.n : id;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 3000);
        if (document.getElementById('s-modal')?.style.display === 'block') this.renderSkillList();
    }

UIManager.prototype.setSkillFilter = function(cat, btn) {
        this.currentSkillFilter = cat;
        document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
        if (btn) btn.classList.add('active');
        this.renderSkillList();
    }

UIManager.prototype.renderSkillList = function() {
        const container = document.getElementById('s-list');
        const searchVal = document.getElementById('skill-search')?.value.toLowerCase() || "";
        const filter = this.currentSkillFilter || 'all';
        const orchestrator = window.orchestrator;
        
        if (!container) return;

        const unlocked = orchestrator.state.unlockedSkills;
        const defs = orchestrator.skillDefs;

        const filtered = unlocked.filter(id => {
            const s = defs[id];
            if (!s) return false;
            const matchCat = (filter === 'all' || s.cat === filter);
            const matchSearch = (s.n.toLowerCase().includes(searchVal) || s.d.toLowerCase().includes(searchVal));
            return matchCat && matchSearch;
        });

        // 使用 DocumentFragment 進行效能優化，減少 DOM 操作次數
        const fragment = document.createDocumentFragment();

        if (filtered.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.style.cssText = "text-align:center;padding:20px;color:#666;";
            emptyMsg.innerText = "尚未領悟相關禁術";
            fragment.appendChild(emptyMsg);
        } else {
            filtered.forEach(id => {
                const s = defs[id];
                const card = document.createElement('div');
                card.className = 's-card';
                card.style.contain = "content"; // 提示瀏覽器此元素內容獨立，優化渲染
                card.innerHTML = `
                    <div style="display:flex; gap:15px; align-items:flex-start">
                        <div style="font-size:30px; background:rgba(139,69,19,0.1); padding:10px; border-radius:10px">📜</div>
                        <div style="flex:1">
                            <h4 style="margin:0; color:#8b4513">${s.n}</h4>
                            <p style="margin:5px 0; font-size:13px; color:#5d4037">${s.d}</p>
                            <code style="font-size:11px; background:rgba(33,115,70,0.1); color:#217346; padding:2px 5px; border-radius:3px">${s.s}</code>
                        </div>
                    </div>
                `;
                fragment.appendChild(card);
            });
        }

        // 一次性更新容器內容
        container.innerHTML = '';
        container.appendChild(fragment);
    }

UIManager.prototype.updatePlayerSBtn = function() {
        const sBtn = document.getElementById('s-btn');
        if (!sBtn) return;
        const chapter = window.orchestrator.state.currentChapter;
        const gender = window.orchestrator.state.playerConfig.gender;

        if (chapter >= 1.5) {
            sBtn.innerHTML = `<img src="Charater/main ${gender}.png" style="width:100%; height:100%; object-fit: cover;">`;
            sBtn.style.borderRadius = '50%';
            sBtn.style.border = '3px solid #ffd700';
            sBtn.style.overflow = 'hidden';
            sBtn.style.background = '#fff';
        } else {
            sBtn.innerHTML = '📜';
            sBtn.style.borderRadius = '10px';
            sBtn.style.border = 'none';
        }
    }

