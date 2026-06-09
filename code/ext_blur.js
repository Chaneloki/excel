/**
 * 試算表魔法冒險 v2 - 背景模糊擴展插件 (強化調試版)
 */
(function() {
    console.log("✨ [ext_blur.js] 背景模糊插件已啟動，等待 uiManager...");

    const initExtension = () => {
        if (!window.uiManager || !window.uiManager.updateVisuals) {
            setTimeout(initExtension, 100);
            return;
        }

        const originalUpdateVisuals = window.uiManager.updateVisuals;

        window.uiManager.updateVisuals = function(line) {
            // 執行原始邏輯
            originalUpdateVisuals.call(this, line);

            const blurLayer = document.getElementById('story-bg-blur');
            if (blurLayer) {
                if (line.bgBlur !== undefined && line.bgBlur !== null) {
                    const blurValue = typeof line.bgBlur === 'number' ? `${line.bgBlur}px` : line.bgBlur;
                    console.log(`[Blur] Applying: ${blurValue}`); // 調試用日誌
                    blurLayer.style.backdropFilter = `blur(${blurValue})`;
                    blurLayer.style.webkitBackdropFilter = `blur(${blurValue})`;
                } else if (!line.isMemory) {
                    // 非回憶模式下自動恢復清晰
                    blurLayer.style.backdropFilter = 'blur(0px)';
                    blurLayer.style.webkitBackdropFilter = 'blur(0px)';
                }
            }
        };
        
        console.log("✅ [ext_blur.js] 模糊擴展已掛載至 uiManager.updateVisuals");
    };

    initExtension();
})();
