/**
 * 試算表魔法冒險 v2 - 核心引擎總控 (v45 行為驅動版)
 */

class GameState {
    constructor() {
        this.currentChapter = 10;
        this.currentPhase = 'STORY_START'; 
        this.currentStoryIndex = 0; // [新增]: 逐行存檔點
        this.activeStoryType = null; // [新增]: 當前故事類型 ('PHASE' | 'SEGMENT')
        this.activeStoryKey = null;  // [新增]: 當前劇情片段 Key
        this.sheets = {}; // { [sheetId]: gridData }
        this.sheetNames = {}; // { [sheetId]: label }
        this.activeSheetId = 'st-1';
        this.cellStyles = {}; // { [cellId]: { CSS props } }
        this.unlockedSkills = [];
        this.coins = 1000;
        
        // 互動狀態
        this.selectedCell = { r: 0, c: 0 };
        this.selectedRange = { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };
        this.isSelecting = false;
        
        this.currentTaskIndex = 0;
        this.hasPlayedMidStory = false;
        
        this.playerConfig = { gender: 'girl' };
        this.activeChapterModule = null;
        this.multiSelectedCells = []; // [新增]: 支援非連續選取 (如定位空格)
        this.isFilterActive = false; // [新增]: 紀錄是否開啟篩選模式 (顯示漏斗箭頭)
        this.isOutlineVisible = false; // [新增]: 支援小計後的大綱按鈕
        this.editingCell = null; // [新增]: 追蹤當前正在編輯的儲存格 (用於公式點選)
        this.formulaRefs = []; // [新增]: 追蹤公式中引用的儲存格 (用於視覺標記)
        }

        get gridData() {
        return this.sheets[this.activeSheetId] || [];
    }

    resetChapterData() {
        this.activeSheetId = 'st-1';
        this.sheets = {};
        this.sheetNames = {};
        this.cellStyles = {};
        this.currentTaskIndex = 0;
        this.currentStoryIndex = 0;
        this.activeStoryType = null;
        this.activeStoryKey = null;
        this.hasPlayedMidStory = false;
        this.isSelecting = false;
        this.selectedCell = { r: 0, c: 0 };
        this.selectedRange = { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };
        this.multiSelectedCells = [];
        this.isFormatPainting = false;
        this.isDraggingCol = false;
        this.isDraggingFill = false;
        this.fillPreviewRange = null; 
        this.isFilterActive = false; 
        this.isOutlineVisible = false; 
        this.formulaRefs = []; // [新增]: 重置公式標記
        }
}

class Orchestrator {
    constructor() {
        this.state = new GameState();
        this.eventBus = new EventTarget();
        this.skillDefs = {}; // 會由章節模組填充
        
        // 判定條件處理器
        this.conditionHandlers = {
            'SCROLL_CHECK': (cond) => {
                const wrapper = document.getElementById('wrapper');
                return wrapper && wrapper.scrollTop >= (cond.minScroll || 10);
            },
            'ACTION': (cond, signal) => {
                const isMatch = signal && signal.type === 'ACTION' && signal.id === cond.actionId;
                if (!isMatch) return false;
                // [優化]: 優先檢查信號中的 col，若無則檢查當前選取格
                if (cond.col !== undefined) {
                    const actualCol = (signal.col !== undefined) ? signal.col : this.state.selectedCell.c;
                    return actualCol === cond.col;
                }
                return true;
            },
            'CELL_VALUE': (cond) => {
                const data = this.state.gridData;
                const v = data[cond.r] ? data[cond.r][cond.c] : "";
                return cond.regex ? new RegExp(cond.regex).test(v) : v === cond.value;
            },
            'MATRIX_COLUMN_CONTENT': (cond) => {
                const data = this.state.gridData;
                return data[0] && data[0][cond.colIdx] === cond.expectedTitle;
            }
        };
    }

    get ChapterSequence() { return ["10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75"]; }

    async init() {
        console.log("Orchestrator: Initializing...");
        // 1. 初始化渲染器 (關鍵修正：否則表格不顯示)
        if (window.gridRenderer) window.gridRenderer.init();
        
        // 2. 預設載入目前章節
        await this.loadChapter(this.state.currentChapter);
        
        // 3. 啟動預載入 (針對下一章節)
        this.preloadNextChapterAssets();
        
        // 4. 啟動流程 (注意：原本是 auto startFlow，現配合 v45 改由 UI 按鈕啟動)
    }

    /**
     * [性能優化]: 預載入策略 (Preloading)
     * 利用 requestIdleCallback 在瀏覽器空閒時下載下一章資源
     */
    preloadNextChapterAssets() {
        if (!window.requestIdleCallback) return;

        const seq = this.ChapterSequence;
        const currentIdx = seq.indexOf(this.state.currentChapter.toString());
        const nextChapterId = seq[currentIdx + 1];

        if (!nextChapterId) return;

        requestIdleCallback(() => {
            console.log(`🚀 [Preloader] 偵測到閒置，開始預載入 Ch ${nextChapterId} 資源...`);
            
            // 嘗試載入模組 (如果尚未載入)
            const module = window.V2_CHAPTERS[nextChapterId];
            if (!module) return;

            // 1. 提取所有背景圖與 CG
            const assets = new Set();
            const extractAssets = (lines) => {
                if (!lines) return;
                lines.forEach(line => {
                    if (line.bg) {
                        const path = line.bg.includes('/') ? line.bg : `BG/${line.bg}`;
                        assets.add(path);
                    }
                    if (line.bgm) assets.add(`BGM/${line.bgm}`);
                    
                    // [新增] 提取音效並預載入 (包含性別處理)
                    if (line.se) {
                        if (line.se.startsWith('me_')) {
                            const baseName = line.se.substring(3);
                            assets.add(`sound_effect/boy_${baseName}`);
                            assets.add(`sound_effect/girl_${baseName}`);
                        } else {
                            assets.add(`sound_effect/${line.se}`);
                        }
                    }
                });
            };

            extractAssets(module.story?.start);
            extractAssets(module.story?.end);
            Object.values(module.story || {}).forEach(extractAssets);
            if (module.simulator?.bgm) assets.add(`BGM/${module.simulator.bgm}`);

            // 2. 執行非阻塞下載
            assets.forEach(url => {
                if (url.endsWith('.mp3')) {
                    const audio = new Audio();
                    audio.src = url;
                    audio.preload = "auto";
                } else {
                    const img = new Image();
                    img.src = url;
                }
            });
            console.log(`✅ [Preloader] 已預載入 ${assets.size} 個資源項。`);
        }, { timeout: 2000 });
    }

    async loadChapter(chapterId) {
        const chapterModule = window.V2_CHAPTERS[chapterId];
        if (!chapterModule) {
            console.error(`[Orchestrator] 找不到章節模組: ${chapterId}`);
            return;
        }

        this.state.activeChapterModule = chapterModule;
        
        // 只有在非「載入存檔」的情況下才重置所有數據
        if (!this._isLoadingFromSave) {
            this.state.resetChapterData();
            this.state.currentPhase = 'STORY_START';
        }
        
        if (chapterModule.customConditionHandlers) {
            Object.assign(this.conditionHandlers, chapterModule.customConditionHandlers);
        }

        if (chapterModule.initialGridData) {
            // [關鍵修正]: 如果不是載入存檔，則強制寫入新章節數據，確保舊數據不殘留
            if (!this._isLoadingFromSave) {
                this.state.sheets = {
                    "st-1": JSON.parse(JSON.stringify(chapterModule.initialGridData))
                };
                this.state.sheetNames = {
                    "st-1": chapterModule.meta?.sheetName || "🛡️ 裝備清單"
                };
            }
        }
        
        if (chapterModule.skillDefs) {
            Object.assign(this.skillDefs, chapterModule.skillDefs);
        }

        const nTitle = document.getElementById('notice-title');
        if (nTitle && chapterModule.meta) nTitle.innerText = chapterModule.meta.title;

        this.emit('chapterLoaded', { chapterId });
        
        // 載入當前章節後，啟動下一章預載
        this.preloadNextChapterAssets();
    }

    /**
     * [新增]: 自動存檔邏輯
     */
    saveGame() {
        const saveData = {
            currentChapter: this.state.currentChapter,
            currentPhase: this.state.currentPhase,
            currentStoryIndex: this.state.currentStoryIndex, 
            activeStoryType: this.state.activeStoryType, // [新增]
            activeStoryKey: this.state.activeStoryKey,   // [新增]
            currentTaskIndex: this.state.currentTaskIndex,
            unlockedSkills: this.state.unlockedSkills,
            coins: this.state.coins,
            playerConfig: this.state.playerConfig,
            sheets: this.state.sheets,
            sheetNames: this.state.sheetNames,
            activeSheetId: this.state.activeSheetId,
            cellStyles: this.state.cellStyles,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('magic_excel_v2_save', JSON.stringify(saveData));
        console.log("💾 [Orchestrator] 自動存檔完成:", saveData);
    }

    /**
     * [新增]: 手動讀檔邏輯
     */
    async loadGame() {
        const raw = localStorage.getItem('magic_excel_v2_save');
        if (!raw) {
            alert("找不到可用的存檔！請先開始冒險。");
            return;
        }

        try {
            const data = JSON.parse(raw);
            this._isLoadingFromSave = true; 
            
            this.state.currentChapter = data.currentChapter;
            this.state.currentPhase = data.currentPhase || 'STORY_START';
            this.state.currentStoryIndex = data.currentStoryIndex || 0;
            this.state.activeStoryType = data.activeStoryType || null; // [恢復]
            this.state.activeStoryKey = data.activeStoryKey || null;   // [恢復]
            this.state.currentTaskIndex = data.currentTaskIndex || 0;
            this.state.unlockedSkills = data.unlockedSkills || [];
            this.state.coins = data.coins || 0;
            this.state.playerConfig = data.playerConfig || { gender: 'girl' };
            
            if (data.sheets) this.state.sheets = data.sheets;
            if (data.sheetNames) this.state.sheetNames = data.sheetNames;
            if (data.activeSheetId) this.state.activeSheetId = data.activeSheetId;
            if (data.cellStyles) this.state.cellStyles = data.cellStyles;

            await this.loadChapter(this.state.currentChapter);
            
            const overlay = document.getElementById('notice-overlay');
            if (overlay) overlay.style.display = 'none';
            
            console.log(`📖 [Orchestrator] 讀檔成功，恢復階段: ${this.state.currentPhase}, 行號: ${this.state.currentStoryIndex}`);
            
            // [關鍵優化]: 根據存檔中的故事狀態進行恢復
            if (this.state.activeStoryType === 'SEGMENT' && this.state.activeStoryKey) {
                // 如果存檔時正在進行劇情片段，先觸發基礎階段，再恢復片段
                this.triggerPhase(this.state.currentPhase, true); // 靜默觸發基礎階段
                this.playStorySegment(this.state.activeStoryKey);
            } else {
                this.triggerPhase(this.state.currentPhase);
            }
            
            this._isLoadingFromSave = false; 
            
        } catch (e) {
            console.error("❌ [Orchestrator] 讀檔失敗:", e);
            alert("存檔損毀，無法載入。");
            this._isLoadingFromSave = false;
        }
    }

    switchSheet(id) {
        if (this.state.activeSheetId === id) return;
        this.state.activeSheetId = id;
        this.emit('sheetSwitched', { id });
        if (window.gridRenderer) window.gridRenderer.render();
    }

    addSheet(id, data, label) {
        this.state.sheets[id] = data;
        this.state.sheetNames[id] = label; // [關鍵修正]: 儲存工作表名稱
        this.emit('sheetAdded', { id, label });
        this.switchSheet(id);
    }

    addCoins(amount) {
        this.state.coins += amount;
        this.emit('coinsChanged', { coins: this.state.coins });
        this.saveGame();
    }

    startFlow() { this.triggerPhase(this.state.currentPhase); }

    triggerPhase(phase) {
        this.state.currentPhase = phase;
        this.saveGame(); // [核心優化]: 階段切換時即刻存檔
        if (!this.state.activeChapterModule) return;
        const story = this.state.activeChapterModule.story || {};
        const simulator = this.state.activeChapterModule.simulator || {};

        if (phase === 'SIMULATOR') {
            // [核心規範]: 所有遊戲階段統一使用 game_bgm.mp3
            this.emit('playBGM', { file: 'game_bgm.mp3' });
        } else {
            const lines = (phase === 'STORY_START') ? story.start : (phase === 'STORY_END' ? story.end : []);
            if (lines && lines.length > 0) {
                const firstBgmLine = lines.find(l => l.bgm);
                if (firstBgmLine) {
                    this.emit('playBGM', { file: firstBgmLine.bgm });
                } else {
                    const cId = this.state.currentChapter.toString();
                    if (cId === "10") this.emit('playBGM', { file: 'story_bgm1.mp3' });
                    else if (cId === "15") this.emit('playBGM', { file: 'story_bgm1.5.mp3' });
                    else if (cId === "20") this.emit('playBGM', { file: 'story_bgm2.mp3' });
                    else if (cId === "25") this.emit('playBGM', { file: 'story_bgm2.5.mp3' });
                    else if (cId === "30") this.emit('playBGM', { file: 'story_bgm2.mp3' });
                    else if (cId === "35") this.emit('playBGM', { file: 'story_bgm2.5.mp3' });
                    else if (cId === "40") this.emit('playBGM', { file: 'begin.mp3' });
                    else if (cId === "45") this.emit('playBGM', { file: 'good friend.mp3' });
                    else if (cId === "50") this.emit('playBGM', { file: 'good friend.mp3' });
                }
            }
        }

        switch (phase) {
            case 'STORY_START': 
                this.emit('playStory', { type: 'PHASE', data: story.start }); 
                break;
            case 'SIMULATOR': 
                this.emit('startSimulator', { config: simulator, coins: this.state.coins }); 
                if (window.gridRenderer) window.gridRenderer.render();
                
                // [新增]: 啟動時播放第一項任務的引導劇情 (如有)
                const firstTask = simulator.tasks?.[this.state.currentTaskIndex];
                if (firstTask && firstTask.storySegmentBefore && !this._isLoadingFromSave) {
                    this.playStorySegment(firstTask.storySegmentBefore);
                }
                break;
            case 'STORY_END': 
                this.addCoins(this.state.activeChapterModule.meta.reward || 0);
                this.unlockAllChapterSkills(); // [新增]: 章節結束時自動補完解鎖所有技能
                this.emit('playStory', { type: 'PHASE', data: story.end }); 
                break;
        }
    }

    /**
     * [新增]: 自動解鎖當前章節模組中定義的所有技能
     */
    unlockAllChapterSkills() {
        if (!this.state.activeChapterModule || !this.state.activeChapterModule.simulator) return;
        const tasks = this.state.activeChapterModule.simulator.tasks || [];
        tasks.forEach(task => {
            if (task.unlockSkillId) {
                this.unlockSkill(task.unlockSkillId);
            }
        });
    }

    validateStateChange(externalSignal) {
        if (this.state.currentPhase !== 'SIMULATOR') return;

        if (this.state.isFormatPainting) {
            const range = this.state.selectedRange;
            if (range && range.minRow === 3 && range.maxRow === 9 && range.minCol === 0 && range.maxCol === 4) {
                console.log("[Orchestrator] 格式刷目標範圍正確，開始拓印樣式");
                const sourceRow = this.state.formatPainterSource.r;
                for (let r = range.minRow; r <= range.maxRow; r++) {
                    for (let c = range.minCol; c <= range.maxCol; c++) {
                        const sourceId = String.fromCharCode(65 + c) + (sourceRow + 1);
                        const targetId = String.fromCharCode(65 + c) + (r + 1);
                        if (this.state.cellStyles[sourceId]) {
                            this.state.cellStyles[targetId] = { ...this.state.cellStyles[sourceId] };
                        }
                    }
                }
                this.state.isFormatPainting = false;
                if (window.gridRenderer) window.gridRenderer.render();
                this.validateAction("FORMAT_PAINTER");
                return;
            }
        }
        
        const tasks = this.state.activeChapterModule.simulator.tasks;
        const currentTask = tasks[this.state.currentTaskIndex];

        if (currentTask && this.checkCondition(currentTask.expectedCondition, externalSignal)) {
            console.log(`🎯 [Orchestrator] 任務完成: ${currentTask.id}`);
            const finishTask = () => {
                if (currentTask.unlockSkillId) {
                    this.unlockSkill(currentTask.unlockSkillId);
                }

                // [優化順序]: 先播成功回饋 (storySegmentAfter)，再播劇情推進 (midStoryAfter)
                const playMidStory = () => {
                    if (currentTask.midStoryAfter) {
                        this.state.hasPlayedMidStory = true;
                        this.playStorySegment(currentTask.midStoryAfter, () => {
                            if (currentTask.onMidStoryComplete) currentTask.onMidStoryComplete();
                            this.nextTask();
                        });
                    } else {
                        this.nextTask();
                    }
                };

                if (currentTask.storySegmentAfter) {
                    this.playStorySegment(currentTask.storySegmentAfter, playMidStory);
                } else {
                    playMidStory();
                }
            };
            
            // 全域章節中點劇情 (僅針對未定義 midStoryAfter 的任務)
            const midPointIndex = Math.floor(tasks.length / 2);
            if (!this.state.hasPlayedMidStory && this.state.currentTaskIndex === midPointIndex && !currentTask.midStoryAfter) {
                this.state.hasPlayedMidStory = true;
                this.playStorySegment('mid_story', finishTask);
            } else {
                finishTask();
            }
        }
    }

    validateAction(actionId) {
        this.validateStateChange({ type: 'ACTION', id: actionId });
    }

    checkCondition(cond, signal) {
        if (!cond) return false;
        const handler = this.conditionHandlers[cond.type];
        if (handler) return handler(cond, signal);
        return false;
    }

    unlockSkill(id) {
        if (this.state.unlockedSkills.includes(id)) return;
        this.state.unlockedSkills.push(id);
        const skill = this.skillDefs[id];
        this.emit('skillUnlocked', { id, skill });
        this.saveGame();
    }

    playStorySegment(key, cb) {
        const seg = this.state.activeChapterModule.story[key];
        if (!seg) { if(cb) cb(); return; }
        
        // [修正]: 除非有明確背景更換 (bg)，否則預設走 SEGMENT (側邊欄小氣泡)
        const hasBG = seg.some(line => line.bg);
        const type = hasBG ? 'PHASE' : 'SEGMENT';

        console.log(`🎬 [Orchestrator] 播放片段: ${key}, 模式: ${type}`);
        this.emit('playStory', { type, data: seg, onComplete: cb });
    }

    nextTask() {
        const tasks = this.state.activeChapterModule.simulator.tasks;
        this.state.currentTaskIndex++;
        this.saveGame(); // 自動存檔新進度
        if (this.state.currentTaskIndex >= tasks.length) {
            this.next();
        } else {
            const nextTask = tasks[this.state.currentTaskIndex];
            // [新增]: 任務切換時播放引導劇情 (如有)
            if (nextTask && nextTask.storySegmentBefore) {
                this.playStorySegment(nextTask.storySegmentBefore);
            }
            this.emit('taskChanged', { task: nextTask });
        }
    }

    next() {
        const flow = ['STORY_START', 'SIMULATOR', 'STORY_END'];
        const currentIdx = flow.indexOf(this.state.currentPhase);
        const nextIdx = currentIdx + 1;
        this.saveGame(); // 存檔目前章節進度
        if (nextIdx < flow.length) {
            this.triggerPhase(flow[nextIdx]);
        } else {
            this.loadNextChapter();
        }
    }

    async loadNextChapter() {
        const seq = this.ChapterSequence;
        const currentIdx = seq.indexOf(this.state.currentChapter.toString());
        const nextIdx = currentIdx + 1;
        if (nextIdx < seq.length) {
            const nextId = seq[nextIdx];
            // 檢查下一個章節是否已定義，若未定義則視為通關
            if (!window.V2_CHAPTERS[nextId]) {
                this.handleGameComplete();
                return;
            }
            this.state.currentChapter = nextId;
            await this.loadChapter(this.state.currentChapter);
            this.saveGame(); // 存檔新章節狀態
            this.startFlow();
        } else {
            this.handleGameComplete();
        }
    }

    handleGameComplete() {
        const overlay = document.getElementById('notice-overlay');
        const title = document.getElementById('notice-title');
        const content = document.getElementById('notice-content');
        const btn = document.getElementById('notice-btn');
        
        if (overlay && title && content && btn) {
            title.innerText = "🎉 恭喜！冒險暫告一段落";
            content.innerHTML = `
                <div style="text-align:center; padding:20px;">
                    <p style="font-size:18px;">您已完成了目前開放的所有章節！</p>
                    <p>您的數據禁術已經達到了巔峰等級。</p>
                    <p style="color:#217346; font-weight:bold; margin-top:10px;">總獲取金幣：${this.state.coins} G</p>
                    <hr style="border:1px dashed #d2b48c; margin:20px 0;">
                    <p style="font-size:12px; color:#666;">（敬請期待後續更多精彩章節）</p>
                </div>
            `;
            btn.innerText = "✨ 回到起點重新挑戰";
            btn.onclick = () => {
                localStorage.removeItem('magic_excel_v2_save');
                window.location.reload();
            };
            overlay.style.display = 'flex';
        } else {
            alert("恭喜！您已完成目前所有的魔法試煉！");
        }
    }

    start() {
        const overlay = document.getElementById('notice-overlay');
        if (overlay) overlay.style.display = 'none';
        this.startFlow();
    }

    /**
     * [新增]: 處理儲存格編輯後的邏輯 (支援反向教學與隱藏獎勵)
     */
    handleCellEdit(rIdx, cIdx, oldValue, newValue) {
        const chapter = this.state.currentChapter.toString();

        // --- Ch 7 專屬邏輯：公式解析與驗證 ---
        if (chapter === "70" || chapter === "75") {
            if (window.ch7Actions && window.ch7Actions.handleFormula) {
                window.ch7Actions.handleFormula(rIdx, cIdx, newValue);
            } else {
                this._handleCh7Formula(rIdx, cIdx, newValue);
            }
            return; 
        }

        const isCh50 = chapter === "50";
        const isCh55 = chapter === "55";

        if (!isCh50 && !isCh55) return;
        if (!this.state.ch5_validation_active) return;

        // 針對 數量 欄位的編輯 (50: D欄[3], 55: E欄[4])
        const qtyCol = isCh50 ? 3 : 4;
        const catCol = isCh50 ? 2 : 3;
        const hhCol = isCh50 ? 1 : 2;

        if (cIdx === qtyCol) {
            const num = parseInt(newValue);
            const row = this.state.gridData[rIdx];
            const isSubtotal = row && (
                (row[catCol] && row[catCol].includes("總計")) || 
                (row[hhCol] && row[hhCol].includes("小計")) ||
                (row[catCol] === "總計")
            );

            if (isSubtotal) {
                // 情境：編輯小計列
                this.playStorySegment("bonus_VALIDATION_subtotal");
                // 恢復原值 (小計格不可隨意手動改)
                this.state.gridData[rIdx][cIdx] = oldValue;
                if (window.gridRenderer) window.gridRenderer.render();
            } else if (!isNaN(num)) {
                if (num > 50) {
                    // 情境：輸入無效數據 (>50)
                    this.playStorySegment("bonus_VALIDATION_fail");
                    this.state.gridData[rIdx][cIdx] = oldValue;
                    if (window.gridRenderer) window.gridRenderer.render();
                } else {
                    // 情境：輸入有效數據 (1-50)，但提醒不要改真實帳目
                    this.playStorySegment("bonus_VALIDATION_ok");
                }
            }
        }
    }

    /**
     * [核心擴充]: Ch7 公式解析與驗證引擎
     */
    _handleCh7Formula(rIdx, cIdx, input) {
        const currentTask = this.state.activeChapterModule?.simulator?.tasks?.[this.state.currentTaskIndex];
        if (!currentTask) return;

        const val = input.toString().trim();
        const data = this.state.gridData;
        const taskId = currentTask.id;

        // 1. 檢查是否以 = 開頭
        if (!val.startsWith('=')) {
            if (taskId === "FORMULA_ARITH_TASK") this.playStorySegment("fail_FORMULA_no_equal");
            return;
        }

        const formula = val.substring(1).toUpperCase();

        // 2. 針對不同任務進行解析與反饋
        if (taskId === "FORMULA_ARITH_TASK") {
            // 預期公式：=D2+E2+F2 或 =D2*1+E2+F2
            if (cIdx !== 6) { // G 欄
                this.playStorySegment("fail_FORMULA_wrong_col");
                return;
            }
            const expectedRow = rIdx + 1; // e.g., rIdx 1 (第二行) 對應 D2
            const d = `D${expectedRow}`;
            const e = `E${expectedRow}`;
            const f = `F${expectedRow}`;
            
            if (formula === `${d}+${e}+${f}`) {
                // 模擬未轉數值的結果 (假設武試是文字)
                data[rIdx][cIdx] = "137"; // 故意給個錯的分數
                if (window.gridRenderer) window.gridRenderer.render();
                this.playStorySegment("fail_FORMULA_text_unhandled");
            } else if (formula === `${d}*1+${e}+${f}` || formula === `${d}+0+${e}+${f}`) {
                // 正確處理
                this._simulateDragFill(rIdx, cIdx, (r) => {
                    const wu = parseFloat(data[r][3]) || 0;
                    const wen = parseFloat(data[r][4]) || 0;
                    const ce = parseFloat(data[r][5]) || 0;
                    return wu + wen + ce;
                });
                this.validateAction("FORMULA_SUM_APPLY");
            }
        } 
        else if (taskId === "ABS_REF_TASK") {
            // 預期公式：=D2+E2+F2*$K$1
            if (formula.includes("K1") && !formula.includes("$K$1")) {
                this.playStorySegment("fail_ABS_NO_DOLLAR");
                return;
            }
            if (formula.includes("$") && !formula.includes("$K$1")) {
                this.playStorySegment("fail_ABS_WRONG_CELL");
                return;
            }
            
            const expectedRow = rIdx + 1;
            const d = `D${expectedRow}`, e = `E${expectedRow}`, f = `F${expectedRow}`;
            if (formula === `${d}+${e}+${f}*$K$1` || formula === `${d}*1+${e}+${f}*$K$1` || formula === `${d}+0+${e}+${f}*$K$1`) {
                this._simulateDragFill(rIdx, cIdx, (r) => {
                    const wu = parseFloat(data[r][3]) || 0;
                    const wen = parseFloat(data[r][4]) || 0;
                    const ce = parseFloat(data[r][5]) || 0;
                    return wu + wen + (ce * 1.5);
                });
                this.validateAction("ABS_REF_APPLY");
            }
        }
        else if (taskId === "RANK_TASK") {
            // 預期公式：=RANK(G2,$G$2:$G$21,0)
            if (formula.includes("G2:G21") && !formula.includes("$G$2:$G$21")) {
                this.playStorySegment("fail_RANK_no_abs");
                return;
            }
            if (formula.endsWith(",1)")) {
                this.playStorySegment("fail_RANK_wrong_order");
                return;
            }
            
            const expectedRow = rIdx + 1;
            if (formula === `RANK(G${expectedRow},$G$2:$G$21,0)`) {
                // 收集所有分數進行排名
                const scores = [];
                for(let r=1; r<=20; r++) scores.push(parseFloat(data[r][6]) || 0);
                const sorted = [...scores].sort((a,b) => b - a);
                
                this._simulateDragFill(rIdx, cIdx, (r) => {
                    const s = parseFloat(data[r][6]) || 0;
                    return sorted.indexOf(s) + 1;
                });
                this.validateAction("RANK_APPLY");
            }
        }
        else if (taskId === "SUM_SKIP_TASK") {
            // 預期公式：=SUM(D4,F4,D9,F9,D18,F18)
            const cleanFormula = formula.replace(/\s+/g, '');
            if (cleanFormula === "SUM(D4,E4,F4,D9,E9,F9,D18,E18,F18)") {
                this.playStorySegment("fail_SUM_WRONG_COL");
                return;
            }
            if (cleanFormula === "SUM(D3,F3,D8,F8,D17,F17)") {
                 this.playStorySegment("fail_SUM_WRONG_RANGE");
                 return;
            }
            
            if (cleanFormula === "SUM(D4,F4,D9,F9,D18,F18)") {
                // 計算總和 (id 3, 8, 17 在資料中是 index 3, 8, 17，因為第一行是標題，所以對應行數+1= 4, 9, 18)
                // 3(index3): 72+80=152
                // 8(index8): 92+58=150
                // 17(index17): 76+85=161
                // 總計: 463
                data[rIdx][cIdx] = "463";
                if (window.gridRenderer) window.gridRenderer.render();
                this.validateAction("SUM_NONCONTIG_APPLY");
            }
        }
    }

    /**
     * 模擬往下拖拉填滿 (為 Ch7 提供視覺反饋)
     */
    _simulateDragFill(startRow, cIdx, calcFn) {
        const data = this.state.gridData;
        let r = startRow;
        
        // 簡單的動畫效果，一格格填滿
        const interval = setInterval(() => {
            if (r > 20) {
                clearInterval(interval);
                return;
            }
            data[r][cIdx] = calcFn(r);
            if (window.gridRenderer) window.gridRenderer.render();
            r++;
        }, 50);
    }

    /**
     * [新增]: 處理表頭點擊 (選取整欄) 的反向教學邏輯
     */
    handleHeaderClick(colIdx) {
        const chapter = this.state.currentChapter.toString();
        const isCh50 = chapter === "50";
        const isCh55 = chapter === "55";

        if (!isCh50 && !isCh55) return;
        const tasks = this.state.activeChapterModule?.simulator?.tasks;
        if (!tasks) return;
        const currentTask = tasks[this.state.currentTaskIndex];
        if (!currentTask) return;

        const qtyCol = isCh50 ? 3 : 4;

        if (currentTask.id === "SORT_TASK") {
            // 情境：排序任務中選取整欄 (錯誤做法)
            if (isCh50) this.playStorySegment("discovery_COLUMN_SELECT_SORT");
        } else if (currentTask.id === "VALIDATION_TASK" && colIdx === qtyCol) {
            // 情境：驗證任務中選取整欄 (正確且高明的做法)
            this.playStorySegment("discovery_COLUMN_SELECT_VALIDATION");
        }
    }

    emit(n, d) { this.eventBus.dispatchEvent(new CustomEvent(n, { detail: d })); }
    on(n, cb) { this.eventBus.addEventListener(n, (e) => cb(e.detail)); }
}

window.orchestrator = new Orchestrator();
