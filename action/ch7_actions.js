/**
 * 試算表魔法冒險 v2 - 第七章禁術動作實作
 * 包含：公式解析、絕對引用、RANK、跳躍式求和
 */

window.ch7Actions = {
    handleFormula(rIdx, cIdx, input) {
        const state = window.orchestrator.state;
        const currentTask = state.activeChapterModule?.simulator?.tasks?.[state.currentTaskIndex];
        if (!currentTask) return;

        const val = input.toString().trim();
        const data = state.gridData;
        const taskId = currentTask.id;
        const chap = state.currentChapter.toString();

        // 1. 檢查是否以 = 開頭
        if (!val.startsWith('=')) {
            if (taskId === "FORMULA_ARITH_TASK") window.orchestrator.playStorySegment("fail_FORMULA_no_equal");
            return;
        }

        const formula = val.substring(1).toUpperCase();

        // 2. 針對不同任務進行解析與反饋
        if (taskId === "FORMULA_ARITH_TASK") {
            // Ch70: =D2+E2+F2, G欄 (6)
            // Ch75: =D2+E2, G欄 (6)
            if (cIdx !== 6) { 
                window.orchestrator.playStorySegment("fail_FORMULA_wrong_col");
                return;
            }
            const expectedRow = rIdx + 1; 
            const d = `D${expectedRow}`, e = `E${expectedRow}`, f = `F${expectedRow}`;
            
            let isTextError = false;
            let isCorrect = false;

            // 嚴格模式：引導玩家學會 *1 或 +0 處理文本格式
            if (chap === "70") {
                if (formula === `${d}+${e}+${f}` || formula === `SUM(${d},${e},${f})`) isTextError = true;
                else if (formula === `${d}*1+${e}+${f}` || formula === `${d}+0+${e}+${f}` || formula.includes(`${d}*1`) || formula.includes(`${d}+0`)) isCorrect = true;
            } else if (chap === "75") {
                if (formula === `${d}+${e}` || formula === `SUM(${d},${e})`) isTextError = true;
                else if (formula === `${d}*1+${e}` || formula === `${d}+0+${e}` || formula.includes(`${d}*1`) || formula.includes(`${d}+0`)) isCorrect = true;
            }

            if (isTextError) {
                data[rIdx][cIdx] = "137"; 
                if (window.gridRenderer) window.gridRenderer.render();
                window.orchestrator.playStorySegment("fail_FORMULA_text_unhandled");
            } else if (isCorrect) {
                this._simulateDragFill(rIdx, cIdx, (r) => {
                    const dVal = parseFloat(data[r][3]) || 0;
                    const eVal = parseFloat(data[r][4]) || 0;
                    const fVal = chap === "70" ? (parseFloat(data[r][5]) || 0) : 0;
                    return dVal + eVal + fVal;
                });
                window.orchestrator.validateAction("FORMULA_SUM_APPLY");
            }
        } 
        else if (taskId === "ABS_REF_TASK") {
            // Ch70: =D2+E2+F2*$K$1, K1係數
            // Ch75: =(D2+E2)*$J$1, J1係數
            const targetCell = chap === "70" ? "K1" : "J1";
            const targetAbs = chap === "70" ? "$K$1" : "$J$1";

            if (formula.includes(targetCell) && !formula.includes(targetAbs)) {
                window.orchestrator.playStorySegment("fail_ABS_NO_DOLLAR");
                return;
            }
            if (formula.includes("$") && !formula.includes(targetAbs)) {
                window.orchestrator.playStorySegment("fail_ABS_WRONG_CELL");
                return;
            }
            
            const expectedRow = rIdx + 1;
            const d = `D${expectedRow}`, e = `E${expectedRow}`, f = `F${expectedRow}`;
            let isCorrect = false;

            if (chap === "70" && (formula === `${d}+${e}+${f}*${targetAbs}` || formula === `${d}*1+${e}+${f}*${targetAbs}` || formula === `${d}+0+${e}+${f}*${targetAbs}`)) {
                isCorrect = true;
                this._simulateDragFill(rIdx, cIdx, (r) => {
                    return (parseFloat(data[r][3]) || 0) + (parseFloat(data[r][4]) || 0) + ((parseFloat(data[r][5]) || 0) * 1.5);
                });
            } else if (chap === "75" && (formula === `(${d}+${e})*${targetAbs}` || formula === `(${d}*1+${e})*${targetAbs}` || formula === `(${d}+0+${e})*${targetAbs}`)) {
                isCorrect = true;
                this._simulateDragFill(rIdx, cIdx, (r) => {
                    return ((parseFloat(data[r][3]) || 0) + (parseFloat(data[r][4]) || 0)) * 1.2;
                });
            }

            if (isCorrect) window.orchestrator.validateAction("ABS_REF_APPLY");
        }
        else if (taskId === "RANK_TASK") {
            // Ch70 & Ch75: =RANK(G2,$G$2:$G$21,0)
            if (formula.includes("G2:G21") && !formula.includes("$G$2:$G$21")) {
                window.orchestrator.playStorySegment("fail_RANK_no_abs");
                return;
            }
            if (formula.endsWith(",1)")) {
                window.orchestrator.playStorySegment("fail_RANK_wrong_order");
                return;
            }
            
            const expectedRow = rIdx + 1;
            if (formula === `RANK(G${expectedRow},$G$2:$G$21,0)`) {
                const scores = [];
                for(let r=1; r<=20; r++) scores.push(parseFloat(data[r][6]) || 0);
                const sorted = [...scores].sort((a,b) => b - a);
                
                this._simulateDragFill(rIdx, cIdx, (r) => {
                    const s = parseFloat(data[r][6]) || 0;
                    return sorted.indexOf(s) + 1;
                });
                window.orchestrator.validateAction("RANK_APPLY");
            }
        }
        else if (taskId === "SUM_SKIP_TASK") {
            const cleanFormula = formula.replace(/\s+/g, '');
            
            if (chap === "70") {
                // Ch70: 3, 8, 17 號 -> row 4, 9, 18 -> SUM(D4,F4,D9,F9,D18,F18)
                if (cleanFormula === "SUM(D4,E4,F4,D9,E9,F9,D18,E18,F18)") {
                    window.orchestrator.playStorySegment("fail_SUM_WRONG_COL"); return;
                }
                if (cleanFormula === "SUM(D3,F3,D8,F8,D17,F17)") {
                     window.orchestrator.playStorySegment("fail_SUM_WRONG_RANGE"); return;
                }
                if (cleanFormula === "SUM(D4,F4,D9,F9,D18,F18)") {
                    data[rIdx][cIdx] = "463";
                    if (window.gridRenderer) window.gridRenderer.render();
                    window.orchestrator.validateAction("SUM_NONCONTIG_APPLY");
                }
            } else if (chap === "75") {
                // Ch75: 2, 7, 14 號 -> row 3, 8, 15 -> SUM(D3,E3,D8,E8,D15,E15)
                if (cleanFormula === "SUM(D3,E3,F3,D8,E8,F8,D15,E15,F15)") {
                    window.orchestrator.playStorySegment("fail_SUM_WRONG_COL"); return;
                }
                if (cleanFormula === "SUM(D2,E2,D7,E7,D14,E14)") {
                     window.orchestrator.playStorySegment("fail_SUM_WRONG_RANGE"); return;
                }
                if (cleanFormula === "SUM(D3,E3,D8,E8,D15,E15)") {
                    // 計算總和:
                    // 2: D3=920, E3=28
                    // 7: D8=870, E8=31
                    // 14: D15=1050, E15=38
                    // 總計 = 920+28+870+31+1050+38 = 2937
                    data[rIdx][cIdx] = "2937";
                    if (window.gridRenderer) window.gridRenderer.render();
                    window.orchestrator.validateAction("SUM_NONCONTIG_APPLY");
                }
            }
        }
    },

    _simulateDragFill(startRow, cIdx, calcFn) {
        const state = window.orchestrator.state;
        const data = state.gridData;
        let r = startRow;
        
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
};
