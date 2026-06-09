/**
 * 試算表魔法冒險 v2 - 核心工具庫 (Utilities)
 * 功能：智慧文字高亮、背景切換、音效管理
 */

class TextHighlighter {
    constructor() {
        // 定義預設顏色，方便在對話中直接引用名稱
        this.colorMap = {
            'excel': '#217346',
            'gold': '#daa520',
            'danger': '#ff4757',
            'fairy': '#2ed573',
            'system': '#7f8c8d'
        };
        this.cache = new Map(); // [新增]: 文本解析快取
    }

    /**
     * 解析智慧高亮語法
     * 支援格式：
     * 1. [[文字|顏色代碼或名稱]] -> <span style="color:...">文字</span>
     * 2. 『文字』 -> <strong>文字</strong>
     */
    highlight(text) {
        if (!text) return "";
        
        // 檢查快取
        if (this.cache.has(text)) return this.cache.get(text);

        // 1. 處理 [[文字|顏色]]
        let processedText = text.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, content, color) => {
            const finalColor = this.colorMap[color] || color;
            return `<span class="highlight" style="color: ${finalColor}; font-weight: bold;">${content}</span>`;
        });

        // 2. 處理 『文字』 (加粗)
        processedText = processedText.replace(/『(.*?)』/g, (match, content) => {
            return `<strong class="emphasize">${content}</strong>`;
        });

        // 存入快取 (限制快取大小防止記憶體溢出)
        if (this.cache.size > 500) this.cache.clear();
        this.cache.set(text, processedText);

        return processedText;
    }
}

class BackgroundManager {
    constructor(defaultContainerId) {
        this.defaultContainerId = defaultContainerId;
    }

    /**
     * 切換背景圖片 (帶有淡入淡出效果)
     */
    set(url, targetId) {
        if (!url) return;
        const container = document.getElementById(targetId || this.defaultContainerId) || document.body;
        console.log(`BackgroundManager: Switching to ${url} on ${container.id || 'body'}`);
        
        container.style.backgroundImage = `url('BG/${url}')`;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
    }
}

class SoundManager {
    constructor() {
        this.bgm = null;
        this.currentBgmUrl = null;
    }

    /**
     * 播放背景音樂 (自動循環)
     */
    playBGM(url, volume = 0.5) {
        if (this.currentBgmUrl === url) return; // 避免重複播放同一首
        
        if (this.bgm) {
            this.bgm.pause();
        }

        this.bgm = new Audio(url);
        this.bgm.loop = true;
        this.bgm.volume = volume;
        this.currentBgmUrl = url;

        this.bgm.play().catch(e => {
            console.warn("SoundManager: BGM autoplay blocked. Waiting for user interaction.", e);
        });
    }

    /**
     * 停止背景音樂
     */
    stopBGM() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm = null;
            this.currentBgmUrl = null;
        }
    }

    /**
     * 播放單次音效
     */
    playSFX(url, volume = 1.0) {
        const sfx = new Audio(url);
        sfx.volume = volume;
        sfx.play().then(() => {
            console.log(`[SoundManager] 成功播放 SFX: ${url}`);
        }).catch(e => {
            console.error(`[SoundManager] 播放 SFX 失敗: ${url}. 請檢查檔案路徑或瀏覽器權限。`, e);
        });
    }
}

// 建立全域實例
window.textHighlighter = new TextHighlighter();
window.backgroundManager = new BackgroundManager('game-container'); // 假設 UI 容器為 game-container
window.soundManager = new SoundManager();

/**
 * 試算表魔法冒險 v2 - 全域常量系統 (Constants)
 */
window.GameConstants = {
    PHASES: {
        STORY_START: 'STORY_START',
        SIMULATOR: 'SIMULATOR',
        STORY_END: 'STORY_END'
    },
    EVENTS: {
        CHAPTER_LOADED: 'chapterLoaded',
        PLAY_STORY: 'playStory',
        START_SIMULATOR: 'startSimulator',
        TASK_CHANGED: 'taskChanged',
        SKILL_UNLOCKED: 'skillUnlocked',
        COINS_CHANGED: 'coinsChanged',
        SHEET_ADDED: 'sheetAdded',
        SHEET_SWITCHED: 'sheetSwitched',
        PLAY_BGM: 'playBGM'
    },
    STORY_TYPES: {
        PHASE: 'PHASE',
        SEGMENT: 'SEGMENT'
    },
    STORAGE: {
        SAVE_KEY: 'magic_excel_v2_save',
        FEEDBACK_KEY: 'adventure_feedback'
    }
};

/**
 * 試算表魔法冒險 v2 - 高效率 DOM 生成器 (DOM Builder)
 * 用於簡化複雜 UI 元件的建立與嵌套
 */
window.el = (tag, props = {}, children = []) => {
    const element = document.createElement(tag);
    
    // 處理屬性與事件
    Object.entries(props).forEach(([key, value]) => {
        if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else if (key === 'className' || key === 'class') {
            element.className = value;
        } else if (key === 'innerText' || key === 'textContent') {
            element.innerText = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else {
            element.setAttribute(key, value);
        }
    });

    // 處理子元素
    if (!Array.isArray(children)) children = [children];
    children.forEach(child => {
        if (child === null || child === undefined) return;
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement || child instanceof DocumentFragment) {
            element.appendChild(child);
        }
    });

    return element;
};

/**
 * [優化]: 安全 DOM 選取器
 * 解決「頭重腳輕」的防衛性檢查，若找不到元素則返回一個空物件(Proxy)防止崩潰
 */
window.safeEl = (id) => {
    const el = document.getElementById(id);
    if (el) return el;
    
    console.warn(`⚠️ [Defensive] 找不到 DOM 元素: #${id}，已啟用魔法避禍機制。`);
    // 返回一個 Proxy 物件，攔截所有屬性存取而不報錯
    return new Proxy({}, {
        get: (target, prop) => {
            if (prop === 'style') return {};
            if (prop === 'classList') return { add: () => {}, remove: () => {}, toggle: () => {} };
            return () => {};
        }
    });
};
