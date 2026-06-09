/**
 * 試算表魔法冒險 v2 - 第二章禁術動作實作
 * 包含：跨欄置中、所有框線、斜線、填滿色彩、格式刷、自訂格式、自動加總
 */

window.ch2Actions = {
    /**
     * 禁術：跨欄置中 (A1:E1)
     */
    mergecenter() {
        console.log("Action: Executing mergecenter");
        const state = window.orchestrator.state;
        const data = state.gridData;
        const range = state.selectedRange;
        const chapterId = state.currentChapter.toString();

        // 1. 驗證選取範圍是否正確 (A1:E1 -> r:0, c:0-4)
        if (!range || range.minRow !== 0 || range.maxRow !== 0 || range.minCol !== 0 || range.maxCol !== 4) {
            window.orchestrator.playStorySegment('fail_MERGE_wrong_range');
            return;
        }
        
        // 2. 物理合併數據 (僅保留 A1，其餘設為空)
        let title = (chapterId === "25") ? "金穗鎮豐收祭嘉獎名冊" : "魔法學院本屆新生名冊";
        data[0][0] = title;
        for (let i = 1; i <= 4; i++) data[0][i] = "";

        // 3. 視覺合併效果 (利用 CSS Grid 的 grid-column)
        // 注意：在 GridRenderer 中，第一欄是行號(50px)，後續每欄 150px。
        // A1 對應 Grid 的第 2 條線。 span 5 代表跨越 5 欄。
        if (!state.cellStyles["A1"]) state.cellStyles["A1"] = {};
        state.cellStyles["A1"].gridColumn = "span 5";
        state.cellStyles["A1"].textAlign = "center";
        state.cellStyles["A1"].display = "flex";
        state.cellStyles["A1"].alignItems = "center";
        state.cellStyles["A1"].justifyContent = "center";
        state.cellStyles["A1"].fontWeight = "bold";
        state.cellStyles["A1"].fontSize = "18px";
        state.cellStyles["A1"].backgroundColor = "#fdf5e6";
        state.cellStyles["A1"].zIndex = "10";

        // 隱藏被跨越的格子 (B1-E1)
        ["B1", "C1", "D1", "E1"].forEach(id => {
            if (!state.cellStyles[id]) state.cellStyles[id] = {};
            state.cellStyles[id].display = "none";
        });

        window.gridRenderer.render();
        window.orchestrator.validateAction("MERGE_CENTER");
    },

    /**
     * 禁術：所有框線 (A2:E10)
     */
    allborders() {
        console.log("Action: Executing allborders");
        const state = window.orchestrator.state;
        const range = state.selectedRange;

        // [優化]: 放寬驗證選取範圍 (只要包含核心區域 A2:E10 即可)
        if (!range || range.minRow > 1 || range.maxRow < 9 || range.minCol > 0 || range.maxCol < 4) {
            window.orchestrator.playStorySegment('fail_BORDER_wrong_range');
            return;
        }
        
        // 僅對範圍內的前 5 欄 (A-E) 進行處理
        for (let r = 1; r <= 9; r++) {
            for (let c = 0; c <= 4; c++) {
                const id = String.fromCharCode(65 + c) + (r + 1);
                if (!state.cellStyles[id]) state.cellStyles[id] = {};
                state.cellStyles[id].border = "1px solid #333";
            }
        }

        window.gridRenderer.render();
        window.orchestrator.validateAction("ALL_BORDERS");
    },

    /**
     * 禁術：斜線 (A2)
     */
    diagonalborder() {
        console.log("Action: Executing diagonalborder");
        const state = window.orchestrator.state;
        const range = state.selectedRange;
        const data = state.gridData;
        const chapterId = state.currentChapter.toString(); // [修正]: 補上缺失的定義

        // [優化]: 只要選取範圍包含 A2 即可執行 (r:1, c:0)
        if (!range || range.minRow > 1 || range.maxRow < 1 || range.minCol > 0 || range.maxCol < 0) {
            window.orchestrator.playStorySegment('fail_SLASH_wrong_cell');
            return;
        }
        
        // 1. [同步高度]: 僅針對第 2 列進行微調，確保行號與儲存格絕對對齊
        const ROW_HEIGHT = "32px"; 
        const rowNumEl = document.getElementById("row-head-2");
        if (rowNumEl) rowNumEl.style.height = ROW_HEIGHT;

        ["A2", "B2", "C2", "D2", "E2"].forEach(id => {
            if (!state.cellStyles[id]) state.cellStyles[id] = {};
            state.cellStyles[id].height = ROW_HEIGHT;
            state.cellStyles[id].display = "flex";
            state.cellStyles[id].alignItems = "center";
            state.cellStyles[id].justifyContent = (id === "A2") ? "space-between" : "flex-start";
        });

        // 2. A2 特化佈局 (清晰易讀版)
        const a2Style = state.cellStyles["A2"];
        a2Style.flexDirection = "column";
        a2Style.justifyContent = "space-between";
        a2Style.backgroundImage = "linear-gradient(to top right, transparent calc(50% - 0.5px), #333, transparent calc(50% + 0.5px))";
        a2Style.whiteSpace = "pre"; 
        a2Style.padding = "2px 6px"; 
        a2Style.lineHeight = "1";
        a2Style.textAlign = "left"; 
        a2Style.fontSize = "12px"; 

        // 自動填入「雙標籤」內容 (配合 12px 字體微調空白數)
        let labelText = (chapterId === "25") ? "                       資料\n功勳者" : "                       學生資料\n姓名";
        data[1][0] = labelText; 

        const modal = document.getElementById('excel-format-modal');
        if (modal) modal.style.display = 'none';

        window.gridRenderer.render();
        window.orchestrator.validateAction("DIAGONAL_BORDER");
    },

    /**
     * 禁術：填滿色彩 (A2:E2 & A3:E3)
     */
    fillcolor() {
        console.log("Action: Executing fillcolor");
        const state = window.orchestrator.state;
        const range = state.selectedRange;

        // 初始化追蹤標記
        if (state.hasHeaderColor === undefined) state.hasHeaderColor = false;
        if (state.hasRowColor === undefined) state.hasRowColor = false;

        // 驗證選取範圍
        const isHeader = range && range.minRow === 1 && range.maxRow === 1 && range.minCol === 0 && range.maxCol === 4;
        const isFirstRow = range && range.minRow === 2 && range.maxRow === 2 && range.minCol === 0 && range.maxCol === 4;

        if (!isHeader && !isFirstRow) {
            window.orchestrator.playStorySegment('fail_COLOR_wrong_range');
            return;
        }
        
        if (isHeader) {
            // 標題列：淺褐色 + 垂直置中 + 靠左
            const ROW_HEIGHT = "32px";
            for (let c = 0; c <= 4; c++) {
                const id = String.fromCharCode(65 + c) + "2";
                if (!state.cellStyles[id]) state.cellStyles[id] = {};
                state.cellStyles[id].backgroundColor = "#d2b48c"; 
                state.cellStyles[id].color = "#fff";
                state.cellStyles[id].fontWeight = "bold";
                state.cellStyles[id].display = "flex";
                state.cellStyles[id].alignItems = "center";
                // A2 保持 space-between，其餘靠左
                state.cellStyles[id].justifyContent = (c === 0) ? "space-between" : "flex-start";
            }
            state.hasHeaderColor = true;
            console.log("Header colored.");
        } else if (isFirstRow) {
            // 第一行資料：銀灰色 (更明顯) + 垂直置中 + 靠左
            for (let c = 0; c <= 4; c++) {
                const id = String.fromCharCode(65 + c) + "3";
                if (!state.cellStyles[id]) state.cellStyles[id] = {};
                state.cellStyles[id].backgroundColor = "#e0e0e0"; 
                state.cellStyles[id].color = "#333";
                state.cellStyles[id].display = "flex";
                state.cellStyles[id].alignItems = "center";
                state.cellStyles[id].justifyContent = "flex-start"; 
            }
            state.hasRowColor = true;
            console.log("Data row 1 colored.");
        }

        window.gridRenderer.render();

        // 只有兩者都完成才通過任務
        if (state.hasHeaderColor && state.hasRowColor) {
            window.orchestrator.validateAction("FILL_COLOR");
        } else {
            const nextPart = !state.hasHeaderColor ? "標題列 (A2:E2)" : "第一行資料 (A3:E3)";
            window.uiManager.showMagicToast(`已完成部分填色！接下來請選取 ${nextPart} 並再次點擊填滿色彩。`, 'success');
        }
    },

    /**
     * 禁術：格式刷 (A3:E3 -> A4:E10)
     */
    formatpainter() {
        console.log("Action: Executing formatpainter");
        const state = window.orchestrator.state;
        const range = state.selectedRange;

        // 1. 驗證來源範圍 (A3:E3 -> r:2, c:0-4)
        if (!range || range.minRow !== 2 || range.maxRow !== 2 || range.minCol !== 0 || range.maxCol !== 4) {
            window.orchestrator.playStorySegment('fail_FORMAT_wrong_source');
            return;
        }
        
        // 2. 進入「格式刷模式」
        state.isFormatPainting = true;
        state.formatPainterSource = { r: 2, cStart: 0, cEnd: 4 };
        
        window.uiManager.showMagicToast("✨ 格式已吸取！現在請選取目標區域 A4:E10 來塗抹樣式。", 'success');
        
        // 更新導師提示，引導下一步
        const et = document.getElementById('e-t');
        if (et) et.innerHTML = "✨ 格式已吸取！現在請框選 <span class='hl-excel'>A4:E10</span> 來完成樣式拓印！";
        
        window.gridRenderer.render();
        // 注意：這裡不呼叫 validateAction，因為任務尚未真正完成
    },

    /**
     * 禁術：自訂格式 (D3:D10 -> 0"分" 或 $0)
     */
    customformat(fmt) {
        console.log("Action: Executing customformat", fmt);
        const state = window.orchestrator.state;
        const data = state.gridData;
        const range = state.selectedRange;
        const chapterId = state.currentChapter.toString();

        // 1. 驗證選取範圍 (D 欄判定)
        if (!range || range.minCol !== 3 || range.maxCol !== 3) {
            window.uiManager.showMagicToast("請先選取點數或金額範圍 (D 欄)，再施展自訂格式！", 'error');
            return;
        }

        // 2. 確定格式符號 (優先使用傳入的 fmt，否則根據章節自動判定)
        let prefix = "", suffix = "";
        
        if (fmt) {
            if (fmt.includes("$")) prefix = "$";
            if (fmt.includes("\"分\"")) suffix = "分";
        } else {
            suffix = (chapterId === "25") ? "" : "分";
            prefix = (chapterId === "25") ? "$" : "";
        }

        for (let r = range.minRow; r <= range.maxRow; r++) {
            let val = data[r][3];
            if (val !== undefined && val !== "") {
                // 移除非數字字符，保留純數字
                let numStr = val.toString().replace(/[^0-9]/g, "");
                let num = parseInt(numStr) || 0;
                data[r][3] = prefix + num + suffix;
            }
            // 同步對齊樣式
            const id = String.fromCharCode(65 + 3) + (r + 1);
            if (!state.cellStyles[id]) state.cellStyles[id] = {};
            state.cellStyles[id].display = "flex";
            state.cellStyles[id].alignItems = "center";
            state.cellStyles[id].justifyContent = "flex-start";
        }

        window.gridRenderer.render();
        window.orchestrator.validateAction("CUSTOM_FORMAT");
    },

    /**
     * [Ch 2.5 專屬]: 劇情插入 - 補上林阿姨的資料
     */
    add_lin_auntie() {
        const state = window.orchestrator.state;
        const data = state.gridData;
        
        // 尋找「總計金額」或「總計學分」所在的行
        let totalRowIdx = data.findIndex(row => row[0].includes("總計"));
        if (totalRowIdx === -1) totalRowIdx = 10; // 備援

        // 在總計行之前插入 (如果該行是空的則直接使用，否則向上找一個空格)
        let targetIdx = totalRowIdx - 1;
        
        data[targetIdx][0] = "林阿姨";
        data[targetIdx][1] = "後勤";
        data[targetIdx][2] = "0"; // 預算
        data[targetIdx][3] = "11"; // 點數 (11年)
        data[targetIdx][4] = "讓豐收祭成真的手";

        // 套用與其他列一致的基礎樣式
        for(let c=0; c<5; c++) {
            const id = String.fromCharCode(65+c) + (targetIdx+1);
            if (!state.cellStyles[id]) state.cellStyles[id] = {};
            state.cellStyles[id].display = "flex";
            state.cellStyles[id].alignItems = "center";
            state.cellStyles[id].justifyContent = "flex-start";
            state.cellStyles[id].height = "32px";
        }

        window.gridRenderer.render();
        window.uiManager.showMagicToast("✨ 劇情力量：已將『林阿姨』補入功勳名冊！", 'success');
    },

    /**
     * 禁術：自動加總 (D11)
     */
    autosum() {
        console.log("Action: Executing autosum");
        const state = window.orchestrator.state;
        const data = state.gridData;
        const range = state.selectedRange;
        const chapterId = state.currentChapter.toString();

        // 尋找總計行
        let totalRowIdx = data.findIndex(row => row[0].includes("總計"));
        if (totalRowIdx === -1) totalRowIdx = 10;
        const totalCellId = "D" + (totalRowIdx + 1);

        // 1. 驗證選取範圍 (目標儲存格必須在 D 欄的總計行)
        if (!range || range.minRow !== totalRowIdx || range.maxRow !== totalRowIdx || range.minCol !== 3 || range.maxCol !== 3) {
            window.orchestrator.playStorySegment('fail_SUM_wrong_cell');
            return;
        }

        // 2. 執行加總計算
        let total = 0;
        const suffix = (chapterId === "25") ? "" : "分";
        const prefix = (chapterId === "25") ? "$" : "";

        // 遍歷所有數據列 (從第 3 列開始，直到總計列之前)
        for (let r = 2; r < totalRowIdx; r++) {
            let val = data[r] ? data[r][3] : "0";
            // 移除非數字字符 (處理 $ 或 "分")
            let num = parseInt(val.toString().replace(/[^0-9]/g, "")) || 0;
            total += num;
        }
        data[totalRowIdx][3] = prefix + total + suffix;

        // 3. 應用樣式
        if (!state.cellStyles[totalCellId]) state.cellStyles[totalCellId] = {};
        state.cellStyles[totalCellId].fontWeight = "bold";
        state.cellStyles[totalCellId].borderTop = "2px double #333";
        state.cellStyles[totalCellId].backgroundColor = "#fffdf5";
        state.cellStyles[totalCellId].display = "flex";
        state.cellStyles[totalCellId].alignItems = "center";
        state.cellStyles[totalCellId].justifyContent = "flex-start";

        window.gridRenderer.render();
        window.orchestrator.validateAction("AUTO_SUM");
    }
};
