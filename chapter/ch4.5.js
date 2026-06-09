/**
 * 試算表魔法冒險 v2 - 第 4.5 章【天才的落腳處】
 * 挑戰模式：無引導，使用彈窗試煉
 * 
 * 優化重點：
 * 1. 調整語氣，將文風與第 5 章對齊，增加感官描寫與角色動作重量。
 * 2. 強化夏特「優雅但落魄」的形象，以及米羅「務實但好學」的特質。
 * 3. 保持劇情邏輯與技術任務不變。
 */

const generateCh4_5Data = () => {
    const surnames = ["趙", "錢", "孫", "周", "鄭", "馮", "陳", "褚", "衛", "蔣",
                      "沈", "韓", "楊", "朱", "秦", "尤", "許", "何", "呂", "施"];
    const firstNames = ["承宗", "宛兒", "守義", "鳳娘", "鐵生", "招弟", "文光", "巧雲",
                        "進財", "秀蘭", "阿土", "金枝", "永福", "玉蟬", "得勝", "翠屏",
                        "長庚", "小滿", "立春", "三冬"];

    const fixedRows = [
        { id: 4,  name: "周鐵生", group: "陷落區", urgency: "命危", wait: 0.5, supply: "急救包",   tag: "立即發放" },
        { id: 9,  name: "施長庚", group: "斷糧區", urgency: "虛弱", wait: 6.0, supply: "口糧",     tag: "優先發放" },
        { id: 16, name: "孫小滿", group: "斷糧區", urgency: "穩定", wait: 7.5, supply: "口糧",     tag: "一般發放" },
        { id: 23, name: "韓玉蟬", group: "陷落區", urgency: "命危", wait: 5.5, supply: "急救包",   tag: "立即發放" },
        { id: 30, name: "尤翠屏", group: "山路組", urgency: "穩定", wait: 0.5, supply: "無需物資", tag: "一般發放" }
    ];

    const groups    = ["陷落區", "斷糧區", "山路組", "渡口組", "孤兒隊", "傷患營"];
    const urgencies  = ["命危", "虛弱", "穩定", "穩定", "穩定"];
    const supplies   = ["口糧", "急救包", "淨水符", "口糧", "無需物資",
                        "淨水符", "急救包", "口糧", "無需物資", "口糧"];
    const waitHours  = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 7.5];

    let pool = [];
    for (const s of surnames) for (const f of firstNames) pool.push(s + f);
    const excluded = fixedRows.map(r => r.name);
    pool = pool.filter(n => !excluded.includes(n));
    pool.sort(() => Math.random() - 0.5);

    const rows = [["編號", "姓名", "所屬隊伍", "緊急程度", "等待時數", "所需物資", "發放優先度"]];

    for (let i = 0; i < 30; i++) {
        const rIdx = i + 1;
        const fixed = fixedRows.find(r => r.id === rIdx);
        if (fixed) {
            rows.push([fixed.id, fixed.name, fixed.group, fixed.urgency, fixed.wait, fixed.supply, fixed.tag]);
        } else {
            const u   = urgencies[Math.floor(Math.random() * urgencies.length)];
            const sup = supplies[Math.floor(Math.random() * supplies.length)];
            const w   = waitHours[Math.floor(Math.random() * waitHours.length)];
            const tag = u === "命危" ? "立即發放" : u === "虛弱" ? "優先發放" : "一般發放";
            rows.push([rIdx, pool[i], groups[Math.floor(Math.random() * groups.length)], u, w, sup, tag]);
        }
    }
    return rows;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["45"] = {
    meta: {
        title: "第 4.5 章：天才的落腳處",
        sheetName: "📦 邊境收容所配給名冊",
        reward: 2000
    },

    initialGridData: generateCh4_5Data(),

    skillDefs: {
        SORT_SIMPLE: { n: "簡單排序",   s: "開始→排序和篩選", d: "按單一欄位快速排列所有資料",       cat: "data", icon: "icon/sort&filter.png" },
        SORT_CUSTOM: { n: "自訂排序",   s: "自訂序列",         d: "用自訂的規則（不依大小）排列資料", cat: "data", icon: "icon/sort&filter.png" },
        SORT_MULTI:  { n: "多條件排序", s: "自訂排序",         d: "按多個欄位依序決定排列優先順序",   cat: "data", icon: "icon/sort&filter.png" },
        FILTER:      { n: "篩選",       s: "開始→篩選",        d: "只顯示符合條件的資料列",           cat: "data", icon: "icon/sort&filter.png" }
    },

    story: {
        // ── 開場：夏特重逢 ──────────────────────────────────────────
        start: [
            { n: "系統", t: "（走出小鎮後，我們在官道上又跋涉了大半日)", a: "system", bg: "road.png", bgm: "daily.mp3"
            ,se:"horse run.mp3",vol:1.0,bgPos: "center", bgZoom: 1.2},
            { n: "系統", t: "（腳步踏在乾燥的泥土上揚起陣陣細碎的微塵）", a: "system", bg: "road.png",se:"walk.mp3",vol:1.0
            ,bgPos: "center", bgZoom: 1.5, bgDur:"5s"},
            { n: "系統", t: "（道路兩側，滿載著破舊家當的逃難車隊愈發密集）", a: "system",bg:"ch4.5 road.png"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "系統", t: "（木輪碾過地面的咿呀聲在荒野間迴盪不絕）", a: "system", se: "rust.mp3", vol: 1.0, shake:true},
            { n: "賽爾", t: "（它輕盈地坐在行李包最頂端，警覺地嗅了嗅空氣） 唔，這味道不太對勁。", a: "fairy", se: "fairy_q.mp3", vol: 1.0
            ,bgPos: "left", bgZoom: 1.1},
            { n: "米羅", t: "（他一邊牽著老馬，一邊回過頭，額際沁著細汗） 什麼味道？", a: "miro", se: "clothes1.mp3", vol: 1.0
            , env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.8, envDrift:true},
            { n: "賽爾", t: "人擠在一起的渾濁氣味。本仙子敢打賭，前面肯定有個棘手的大爛攤子。", a: "fairy", se: "fairy_infosmile.mp3", vol: 1.0,shake:true},
            { n: "我", t: "（我順著她指引的方向望去。)", a: "me", bg: "bg4.5.png"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1},
            { n: "我", t: "（前方低窪的山坳裡，正橫七豎八地紮著一大片灰撲撲的臨時帳篷。）", a: "me",bgPos: "right", bgZoom: 1.1,bgDur:"8s"
            , env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true},
            { n: "我", t: "看來是邊境收容所。應該是從王城那邊一路退下來的人吧。", a: "me", se: "girl_en1.mp3", vol: 1.0  },

            { n: "系統", t: "（帳篷區邊緣，一道有些落寞卻依然挺拔的銀髮身影正俯身翻閱著名冊）", a: "system", se: "book.mp3" },
            { n: "系統", t: "（清冷的聲音在喧囂中顯得格外刺耳）", a: "system",flash: true, flashSFX: "bell.mp3", vol: 1.0},
            { n: "清冷的聲音", t: "照這種愚蠢的排法，命危的人會被死死壓在名冊最底下。", se: "boy_breath.mp3", vol: 1.0 },
            { n: "我", t: "（我腳下的步履微微一頓） 這聲音……聽著還真是耳熟得讓人頭疼。", a: "me",shake:true },
            { n: "米羅", t: "（他有些侷促地壓低聲音問道） 隊長，是熟人嗎？", a: "miro" },
            { n: "我", t: "學院試煉時的老對手。夏特，那個雲端尖塔的首席天才。", a: "me", se: "girl_en1.mp3", vol: 1.0  },

            { n: "夏特", t: "（他緩緩抬起頭，視線與你交匯)", a: "chate", bg: "CG/ch4.5.png", bgm: "school.mp3",env:null,
            bgPos: "top", bgZoom: 1.1, bgDur:"5s"},
            { n: "夏特", t: "（指尖那支白金羽毛筆熟練地轉了一個漂亮的圓弧） 果然是你。", a: "chate", se: "boy_lowsmile.mp3", vol: 1.0
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0,bgPos: "top", bgZoom: 2.0},
            { n: "夏特", t: "（他的語氣帶著幾分見到故人的隨性，眉宇間卻藏著一絲倦意） ", a: "chate", vol: 1.0
            ,bgPos: "left", bgZoom: 1.5,bgDur:"6s"},
            { n: "夏特", t: "懷裡還抱著那本書。看來這段日子，你過得比我有意思多了。", a: "chate",
            se: "put down.mp3", vol: 1.0},
            { n: "賽爾", t: "（它從書頁中探出半個小脑袋，打了個大大的哈欠） ", a: "fairy", se: "fairy_sleep.mp3", bg: "bg4.5.png"},
            { n: "賽爾", t: "喲，這不是銀毛孔雀嗎？怎麼，還沒被拔毛呢？", a: "fairy",
            bgPos: "center", bgZoom: 1.1},
            { n: "夏特", t: "（他淡淡地瞥了精靈一眼，似乎已經沒了鬥嘴的興致） 嗯，還活著。", a: "chate"
            , bg: "CG/ch4.5.png",bgPos: "top", bgZoom: 2.0},
            { n: "我", t: "堂堂雲端尖塔的首席，怎麼會淪落到跑來這種邊境收容所幫忙？", a: "me", bg: "bg4.5.png"},
            { n: "夏特", t: "（他坦然地聳了聳肩，目光投向遠方） 王城封鎖那天，王室的撥款就徹底斷了。" , se: "clothes1.mp3"
            , bg: "bg3 kingdom.png",bgPos: "center", bgZoom: 1.1,isMemory:true},
            { n: "夏特", t: "尖塔的人跑光了，那些自命清高的導師也沒了音訊。",bgPos: "right bottom", bgZoom: 1.5,bgDur:"8s",isMemory:true},
            { n: "夏特", t: "首席徽章現在對我來說，就是塊不能填飽肚子的金屬。", se: "coin.mp3", vol: 1.0,isMemory:true},
            { n: "夏特", t: "我幫收容所整理這堆亂七八糟的名冊，換兩口維持體力的熱湯喝。", a: "chate", bg: "CG/ch4.5.png",bgPos: "top", bgZoom: 2.0},
            { n: "夏特", t: "（他的眼神中透出一種找到同類的鬆動） ", a: "chate",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "夏特", t: "你呢？公會最底層的那個小倉庫，現在還剩什麼？", a: "chate"},
            { n: "我", t: "倉庫早沒了。現在我身邊只剩一本書和一匹老馬，到處幫人收拾沒人管的殘局。", a: "me", bg: "bg4.5.png"},
            { n: "夏特", t: "（他低笑一聲，那笑聲中竟帶了幾分自嘲） 彼此彼此。招牌沒了，心裡反倒清淨了。 ", a: "chate", se: "boy_smile.mp3"
            , bg: "CG/ch4.5.png",bgPos: "center", bgZoom: 1.5, bgDur:"4s"},

            { n: "管事", t: "（一名管事急急忙忙地跑過來，滿頭大汗） 夏特先生！壞了，名冊又亂套啦！", a: "npc1", bgm: "bad things.mp3", bg: "bg4.5.png"
            , se: "run.mp3", vol: 1.0,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "管事", t: "今早三個片區同時湧進一堆難民，登記的人手各記各的，全混在一起了！", a: "npc1",bgPos: "center", bgZoom: 1.1},
            { n: "管事", t: "命危的、斷糧好幾個小時的、剛到的，全攪成了一團！", a: "npc1"},
            { n: "管事", t: "倉庫門口現在快為了領物資打起來了！", a: "npc1",shake:true},
            { n: "夏特", t: "（他皺著眉翻閱著手中那疊凌亂的名冊） ", a: "chate"},
            { n: "夏特", t: "三十多行紀錄，毫無規律可言。要重新謄寫出一份工整的，至少也要小半天工夫。", a: "chate", se: "boy_breath.mp3" },
            { n: "管事", t: "（急得直跺腳） 哎呀，等不了啦！外面那些人現在就要領物資救命啊！", a: "npc1", se: "man hurry.mp3",shake:true},

            { n: "我", t: "（我冷靜地伸出手） 名冊給我看看。", a: "me", se: "clothes1.mp3",bgPos: "left", bgZoom: 1.5},
            { n: "夏特", t: "（他很自然地將紙張遞給你） 學院那次，你那魔法我可是一直記著。", a: "chate", se: "paper down.mp3",flash:true},
            { n: "我", t: "（我快速掃視著凌亂的行間） 這種時候慢慢抄寫太沒效率了。", a: "me", se: "girl_ow.mp3" },

            { n: "賽爾", t: "（它懶洋洋地縮回書頁深處） 這一關我相信你們的能力。", a: "fairy", se: "fairy_sleep.mp3"},
            { n: "我", t: "（我早就料到她會這麼說，逕自走向那張充滿混亂與焦慮的名冊。）", a: "me", se: "walk.mp3",bgPos: "center", bgZoom: 1.1,bgDur:"3s"},

            { n: "米羅", t: "（他湊過來，比對著自己小本子上的筆記）", a: "miro", se: "paper down.mp3",shake:true}, 
            { n: "米羅", t: "隊長，這份清單……跟柔依那本病患名冊一樣亂得驚人。", a: "miro" },
            { n: "夏特", t: "（他的目光轉向米羅，原本放鬆的態度瞬間收斂，挑了挑精緻的眉毛） 這位是？", a: "chate", se: "boy_lowq.mp3"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "米羅", t: "（他並沒有退縮，而是直接抬起頭對視） 米羅，以前是楓鈴驛站管帳的。", a: "miro", se: "clothes1.mp3"
            ,bgPos: "center", bgZoom: 1.5},
            { n: "夏特", t: "（他意味深長地掃了一眼米羅手中的本子，語氣冷淡了幾分） ", a: "chate",bgPos: "center", bgZoom: 1.1, bgDur:"10s"},
            { n: "夏特", t: "驛站……記帳的啊。怪不得。", a: "chate" },
            { n: "米羅", t: "（他沒理會對方的語氣，指尖點著名冊的一行）", a: "miro", se: "put down.mp3"   }, 
            { n: "米羅", t: "第十七行這個命危的，不該被排在這種無關緊要的位置。", a: "miro" },
            { n: "夏特", t: "（他瞥了米羅一眼，轉頭注視著你） 那麼，你打算怎麼排這張表？", a: "chate",bgPos: "center", bgZoom: 1.5},
            { n: "夏特", t: "我倒是很想看看，你的選擇跟我想像中的答案，到底一不一樣。", a: "chate" ,flash: true, flashSFX: "boom.mp3", vol: 1.0}
        ],

        // ── 中場：衝突開場 ───────────────────
        mid_story: [
            { n: "我", t: "（我調用了自訂排序功能，強行定義了命危第一、虛弱第二。名冊內的所有數據瞬間各就各位，歸於秩序。）", a: "me" },
            { n: "夏特", t: "（他手中的羽毛筆猛地停在半空，眼神中閃過一絲激賞的光芒） 你……竟然親手定義了優先級。 ", a: "chate" },
            { n: "夏特", t: "既然冰冷的工具不懂人命的重量。你就親手教導它規則。這一手。確實漂亮。 ", a: "chate" },
            { n: "我", t: "那麼，現在呈現出來的結果，跟你心裡的答案是否一模一樣呢？", a: "me" },
            { n: "夏特", t: "（他難得大方地對你點了點頭） 分毫不差。", a: "chate" },
            { n: "夏特", t: "（他盯著魔導書螢幕上重新歸位的名冊，慢條斯理地開口） 數據排是排對了，但這份名冊的理解效率，還能更快。", a: "chate" },
            { n: "我", t: "（我手中的動作稍微停了下來） 怎麼說？", a: "me" },
            { n: "夏特", t: "命危的人雖然排在了頂部，但發放物資的人是用眼睛快速掃視的。", a: "chate" },
            { n: "夏特", t: "在這一片黑壓壓的墨跡中，他還是得逐行去確認字義。", a: "chate" },
            { n: "夏特", t: "如果我們能把命危那幾行染成醒目的紅色，倉庫的人一眼就能精確捕捉，甚至連讀都不必讀。 ", a: "chate" },
            { n: "夏特", t: "真正的秩序不只是排列正確，而是要讓看的人在瞬間洞察真相。", a: "chate" },
            { n: "米羅", t: "（他皺著眉頭抬起頭） 可現在這樣排對了，就已經能立刻開始發放物資了。", a: "miro" },
            { n: "米羅", t: "先讓人領到東西救命，配色這種美觀細節，之後再說也不遲。", a: "miro" },
            { n: "夏特", t: "（他冷淡地瞥了米羅一眼，語氣帶刺） 『之後再說』。 ", a: "chate" },
            { n: "夏特", t: "記帳的，你們驛站辦事之所以總是又慢又顯得粗糙，就是因為死在了這四個字上面。", a: "chate" },
            { n: "米羅", t: "（他放下了筆，並未因對方的氣勢而退縮） 外面斷糧六個鐘頭的施長庚老先生，他現在要的是能填飽肚子的口糧，而不是什麼高雅的紅色。 ", a: "miro" },
            { n: "米羅", t: "在這種時候，能領到東西，比好看要重要千倍萬倍。 ", a: "miro" },
            { n: "夏特", t: "（他語氣平淡地反擊） 我並沒說不讓他領。我強調的是，要讓他領得更快、更準。 ", a: "chate" },
            { n: "夏特", t: "這兩件事之間的本質差別，你似乎完全分不清楚。 ", a: "chate" },
            { n: "系統", t: "（空氣瞬間僵住了，兩個人在狹窄的帳篷內對峙著。）", a: "system" },
            { n: "系統", t: "（一個主張『先求實用』，一個追求『追求極致』，其實兩邊的出發點都並無過錯。）", a: "system" },
            { n: "我", t: "（我靜靜觀察著。我知道夏特的提議是對的，但他話裡的刺，顯然是衝著米羅去的。）", a: "me" },
            { n: "賽爾", t: "（它躲在書頁後面偷偷壞笑，露出一雙大眼睛看得津津有味。）", a: "fairy" },
            { n: "我", t: "我看這樣吧：先按夏特說的，把命危的數據標紅再行發放。效率更高，也不會耽誤多少時間。 ", a: "me" },
            { n: "夏特", t: "（他理所當然地點了點頭） 這才像句人話。", a: "chate" },
            { n: "米羅", t: "（他深深地看了夏特一眼，沒再繼續爭辯，而是默默地把『標紅』這個視覺優化的概念記在了自己的小本子上。）", a: "miro" },
            { n: "夏特", t: "（他發現米羅竟然在做紀錄，神色微微愣了一下，隨即有些不自然地別開臉，握筆的手也稍微放鬆了些。）", a: "chate" }
        ],

        // ── 結局：收編天才 ─────────────────────
        end: [
            { n: "系統", t: "（兩小時過後。收容所倉庫門口的隊伍重新歸於秩序。）", a: "system", bg: "bg4.5.png", bgm: "finish.mp3"
            ,bgPos: "right", bgZoom: 1.5, bgDur:"10s"},
            { n: "系統", t: "（名冊上，命危人員的數據被標成了醒目的緋紅色，一切顯得井然有序。）", a: "system" },
            { n: "管事", t: "（他激動得聲音都在顫抖） 這份名冊簡直太清楚了！ ", a: "npc1", se: "happy.mp3", vol: 1.0,shake:true},
            { n: "管事", t: "那幾行通紅的字跡，讓倉庫的小夥子們瞄一眼就抓到了關鍵。這簡直是神技啊！", a: "npc1",shake:true},
            { n: "夏特", t: "（他瞥了米羅一眼，臉上雖然不動聲色，語氣卻透著一絲得意） ", a: "chate"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0}, 
            { n: "夏特", t: "那個標紅的視覺魔法，是我的主意。 ", a: "chate", se: "boy_attraction.mp3", vol: 1.0  },
            { n: "米羅", t: "（他的語氣平淡而堅實） 關鍵的排序是隊長親手排出來的。", a: "miro",bgPos: "center", bgZoom: 1.1},
            { n: "管事", t: "（他顯然沒空理會這兩人的暗中較勁） 總之太謝謝各位英雄了！ ", a: "npc1",shake:true},
            { n: "系統", t: "（管事捧著名冊匆匆離去。狹小的帳篷裡，剩下我們四個人和一本泛著微光的書。）", a: "system", se: "run.mp3", vol: 1.0  },

            { n: "夏特", t: "（他從容地收起羽毛筆，語氣輕鬆了不少） ", a: "chate"
            ,bg:"CG/ch4.5 all.png",bgPos: "left top", bgZoom: 2.0},
            { n: "夏特", t: "剛才那份名冊。我們合作得很完美。 ", a: "chate", bgm: "goofy.mp3"},
            { n: "夏特", t: "你看見了數據的順序，而我解決了人類的理解成本。這兩者缺一不可。", a: "chate"},
            { n: "我", t: "（我心裡其實已經猜到他接下來想說什麼了） 所以呢？你想表達什麼？", a: "me", se: "girl_underest.mp3", vol: 1.0
            ,bgPos: "right", bgZoom: 2.0},
            { n: "夏特", t: "（他微微一笑，不疾不徐地展開雙手） 所以你缺少的，正好是我最擅長的領域。 ", a: "chate", se: "clothes1.mp3", vol: 1.0
            ,bgPos: "left top", bgZoom: 2.0},
            { n: "夏特", t: "而我現在所缺少的舞台，你這支奇妙的小隊伍正好具備。 ", a: "chate" },
            { n: "夏特", t: "（他挑了挑眉，顯得很坦然） 這並不是在請求收留。只是剛好合適。", a: "chate",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "我", t: "（我忍不住笑出聲來，這傢伙即便落魄了，連求入隊都要講得這麼漂亮） 行吧。", a: "me"
            , se: "fairy_smile.mp3", vol: 1.0,bgPos: "right", bgZoom: 2.0,shake:true},
            { n: "我", t: "既然你算盤打得這麼精。如果不讓你加入，倒顯得是我這個隊長沒眼光了。", a: "me"},
            { n: "夏特", t: "（他理所當然地回覆，神色恢復了往常的高傲） ", a: "chate",bgPos: "left"
            ,bgPos: "left top", bgZoom: 2.0},
            { n: "夏特", t: "反正是你本來就會做的決定，我只不過是幫你把這句話提早講清楚罷了。", a: "chate" },
            { n: "賽爾", t: "（它鑽出書頁，笑得前仰後合） 喲，繞了這麼大一圈，原來是真的想留下來啊，銀毛孔雀。", a: "fairy", se: "fairy_laugh.mp3", vol: 1.0
            ,bgPos: "right", bgZoom: 1.5,shake:true,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "夏特", t: "（他斜睨了精靈一眼） 僅僅是因為和聰明人共事會比較節省體力，理由就這麼簡單。"
            , a: "chate",bgPos: "left top", bgZoom: 2.0},

            { n: "米羅", t: "（他走到一旁，有些不安地對我小聲說道） ", a: "miro", se: "whisper.mp3", vol: 1.0
            ,bgPos: "right", bgZoom: 1.5,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "米羅", t: "隊長，他真的要加入嗎？我覺得我跟他可能這輩子都合不來。 ", a: "miro",bgPos: "center top", bgZoom: 1.5,bgDur:"5s"},
            { n: "我", t: "你看，你今天早上不就已經跟他槓過一回了嗎？不是也挺精彩的。", a: "me"},
            { n: "米羅", t: "（他悶悶地低著頭） 槓歸槓…… ", a: "miro", se: "clothes.mp3", vol: 1.0,bgPos: "right", bgZoom: 1.5, bgDur:"2s"},
            { n: "米羅", t: "（他沉默了片刻，聲音變得更低了些） 但……他提的法子，我確實記在心裡了。 ", a: "miro"},
            { n: "米羅", t: "之前在驛站要是也能這樣標記。老醫生看診確實會看得更快些。 ", a: "miro"},
            { n: "米羅", t: "（他不情不願地補了一句，聲音細若蚊蠅） 這點……算他說對了吧。", a: "miro",flash:true},
            { n: "我", t: "（我沒有當面說破，只是用力拍了拍米羅那略顯單薄的肩膀。）", a: "me", se: "put down.mp3", vol: 1.0,bgPos: "left"
            ,bgPos: "center", bgZoom: 1.1,shake:true},

            { n: "夏特", t: "（他邁步走過來，眼神居高臨下卻已不顯得刻薄） 接下來的戰術安排聽你的我絕不干涉。", a: "chate"
            ,bg:"bg4.5.png", se: "walk.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.5,bgDur:"4s"},
            { n: "夏特", t: "但今後名冊的所有『臉面』問題，都必須歸我管。", a: "chate" },
            { n: "米羅", t: "（他立刻抬頭反駁） 救命的東西必須優先，臉面什麼的，再說。 ", a: "miro", bg: "CG/ch4.5 conflict.png", bgm: "sweet.mp3"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0,bgPos: "left", bgZoom: 2.0},
            { n: "夏特", t: "（他驚訝地挑了挑眉） 記帳的，你現在這句，倒是比今天早上那句要聰明得多了。", a: "chate"
            , se: "boy_lowsmile.mp3", vol: 1.0,bgPos: "top", bgZoom: 2.0,bgDur:"2s"},
            { n: "米羅", t: "（他顯然沒想到會突然被誇獎，整個人愣了一下，聲音頓時變小了） 銀毛孔雀……", a: "miro"
            , se: "boy_annoyed.mp3", vol: 1.0,bgPos: "center", bgZoom: 2.0,bgDur:"2s"},
            { n: "賽爾", t: "（它輕巧地落在你肩上，一副幸災樂禍的表情） ", a: "fairy"
            , se: "fairy_infosmile.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1,bgDur:"4s"},
            { n: "賽爾", t: "嘖嘖，隊長。看來你這支小隊伍，以後的路會變得很熱鬧呢。", a: "fairy"},
        ],

        // ── 成功回饋 ──────────────
        success_SORT_SIMPLE: [
            { n: "我", t: "（按照『緊急程度』進行了一次逆序排列，結果『穩定』的人員竟然全部躍居到了最上方。）", a: "me" },
            { n: "夏特", t: "（他注視著螢幕，略顯驚訝地挑起眉毛） 『穩定』的人反而排在了最前面？這就是你的魔法？", a: "chate" },
            { n: "我", t: "這僅僅是工具布下的邏輯陷阱，它只是單純按筆劃多少在排列。別急，我有更好的法子治它。", a: "me" },
            { n: "夏特", t: "哦？那我倒是要睜大眼睛，看看你打算怎麼治它。 ", a: "chate" }
        ],

        success_SORT_CUSTOM: [
            
            
        ],

        success_SORT_MULTI: [
            { n: "米羅", t: "（他緊緊盯著螢幕，聲音嚴肅地問道） 隊長，那如果是緊急程度完全一樣的人，到底誰該排在前面先領？", a: "miro" },
            { n: "我", t: "（我側過頭看著他，反問道） 你在驛站整理了三年帳冊。你覺得呢？", a: "me" },
            { n: "米羅", t: "（他飛快地翻動著手裡的小本子） 同樣被評定為命危。韓玉蟬女士已經在這裡等了五個半鐘頭，而周鐵生先生才剛到半小時。 ", a: "miro" },
            { n: "米羅", t: "於情於理。都應該讓等待最久的人先領到物資。 ", a: "miro" },
            { n: "我", t: "那就再加上第二層篩選條件：讓等待時數由大到小排列。這樣一來，既能救命，也保住了公平。 ", a: "me" },
            { n: "夏特", t: "（他靜靜地看著米羅，似乎欲言又止，但最終還是保持了沉默，只是目光稍微柔和了些。）", a: "chate" },
            { n: "管事", t: "（他氣喘吁吁地再次衝進帳篷） 糟了！淨水符的儲備快見底了！快先把急需淨水符的人給挑出來！", a: "npc1" }
        ],

        success_FILTER: [
            { n: "我", t: "（我在『所需物資』欄位中僅勾選了淨水符，龐雜的清單在瞬間過濾完成。）", a: "me" },
            { n: "夏特", t: "（他注視著最終呈現在眼前的清晰數據，良久，才從牙縫裡擠出四個字的評價） ……乾淨俐落。", a: "chate" }
        ],

        // ── 失敗提示 ──────────────
        fail_SORT_wrong_column: [
            { n: "米羅", t: "（他湊過來好心指點著） 隊長，你剛才點選的欄位似乎不太對勁？", a: "miro" },
            { n: "我", t: "（我重新檢查了一下） 確實，手快了一點，我們重來一次。 ", a: "me" }
        ],
        fail_SORT_wrong_order: [
            { n: "夏特", t: "（他的語氣中帶著一絲慣有的戲謔） 順序反了。那些最急需救命的人，被你那一筆魔法沉到名冊底部去了。 ", a: "chate" },
            { n: "我", t: "看到了。這就重新修正排序邏輯。 ", a: "me" }
        ],
        fail_SORT_selection: [
            { n: "米羅", t: "（他顯得有些緊張，急忙提醒道） 等等！隊長！你似乎只選中了一欄進行排序？這樣一來。名字跟後面的資料會徹底脫鉤亂掉的！ ", a: "miro" },
            { n: "我", t: "（我立刻停下了手中的動作） 你提醒得對。在試算表裡。只需要點選一個格子。千萬別選中整欄。否則資料會發生錯位脫節。 ", a: "me" }
        ],
        fail_FILTER_wrong: [
            { n: "管事", t: "這……這篩選出來的好像不是淨水符啊？怎麼別的東西也混進來了？", a: "npc1" },
            { n: "我", t: "抱歉。手滑了一下。這就重新精確勾選。 ", a: "me" }
        ],
        fail_FILTER_empty: [
            { n: "夏特", t: "（他皺著眉頭湊過來） 你把名冊裡的人全部弄不見了。 ", a: "chate" },
            { n: "夏特", t: "收容所倉庫又不是在對著空氣發物資。名單為什麼是空的？ ", a: "chate" },
            { n: "我", t: "看來篩選條件設定得太過苛刻了。我們重新來過。 ", a: "me" }
        ],
        fail_FILTER_wrong_column: [
            { n: "夏特", t: "「（他挑了挑眉，語氣微涼） 看來即便是所謂的天才。也有看走眼的時候。你剛才過濾的根本就不是物資那一欄。」", a: "chate" },
            { n: "夏特", t: "「我們要尋找的是[[所需物資|gold]]。別在那些無關緊要的地方浪費時間。」", a: "chate" }
        ]
    },

    simulator: {
        bgm: "BGM/game_bgm.mp3",
        tasks: [
            {
                id: "SORT_LIMIT_TASK",
                tutorHint: "點選「緊急程度」欄，嘗試【從 Z 到 A 排序】。",
                playerText: "夏特在旁邊盯著，賽爾又不幫忙。先試試最直接的簡單排序，看看「緊急程度」會怎麼跳。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_SIMPLE",
                tab: "start",
                quiz: {
                    situation: "名冊如糾結的亂麻般堆疊，命危之人的姓名淹沒在平庸的數據海中。你需要施展最迅捷的魔法，將混亂初步歸位。",
                    options: [
                        { t: "施展簡單排序禁術（逆序排列）", correct: true  },
                        { t: "開啟篩選魔法只留存命危者",          correct: false },
                        { t: "依憑體力進行手動搬動數據",      correct: false }
                    ],
                    success_msg: "魔力已精確導向緊急程度欄位，混亂的數據在逆序魔法的洗禮下，初步展現出強弱的輪廓。"
                },
                expectedCondition: { type: "ACTION", actionId: "SORT_DESC", col: 3 },
                storySegmentAfter: "success_SORT_SIMPLE"
            },
            {
                id: "CUSTOM_SORT_TASK",
                tutorHint: "自訂清單並輸入等級順序：命危、虛弱、穩定。",
                playerText: "魔法不通人性。我得親自定義什麼才是「嚴重」：命危、虛弱、穩定。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_CUSTOM",
                tab: "start",
                quiz: {
                    situation: "簡單排序魔法在筆劃規則面前失效。魔導書無法理解生命的重量，你必須賦予它自訂的規則。",
                    options: [
                        { t: "重鑄秩序：手動定義自訂序列", correct: true  },
                        { t: "切換為升序魔法進行排列",          correct: false },
                        { t: "將穩定的人員從名冊中徹底抹除",        correct: false }
                    ],
                    success_msg: "透過自訂清單，你成功教導了魔導書真正的優先順序。秩序，從此由你定義。",
                    customOrder: ["命危", "虛弱", "穩定"] // 用於 UIManager 驗證
                },
                expectedCondition: { type: "ACTION", actionId: "SORT_CUSTOM" },
                storySegmentAfter: "success_SORT_CUSTOM",
                midStoryAfter: "mid_story",
                onMidStoryComplete: () => {
                    const state = window.orchestrator.state;
                    state.ch45_red_marked = true; // 設定動態標紅旗標
                    if (window.gridRenderer) window.gridRenderer.render();
                }
            },
            {
                id: "MULTI_SORT_TASK",
                tutorHint: "新增層級，第二條件「等待時數」設為大到小。",
                playerText: "米羅提醒得對，同樣程度的人，等得久的人該先發。在自訂排序裡疊加「等待時數」當第二條件吧。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_MULTI",
                tab: "start",
                quiz: {
                    situation: "當生機的權重持平時，時間便成了唯一的公正法度。你需要在既有的魔法陣上疊加第二道律法。",
                    options: [
                        { t: "疊加層級：將等待時數納入法度", correct: true  },
                        { t: "維持現狀，將命運交還給隨機",             correct: false },
                        { t: "改按姓名筆劃的淺顯規律排列",                   correct: false }
                    ],
                    success_msg: "多條件排序魔法已然生效。在緊急程度的基礎上，漫長的等待也獲得了應有的尊重。"
                },
                expectedCondition: { type: "ACTION", actionId: "SORT_MULTI" },
                storySegmentAfter: "success_SORT_MULTI"
            },
            {
                id: "FILTER_TASK",
                tutorHint: "篩選物資「淨水符」。",
                playerText: "物資告急！我得立刻把所有需要「淨水符」的人挑出來，一個都不能漏掉。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "FILTER",
                tab: "start",
                quiz: {
                    situation: "淨水符庫存告急。管事下達了最後通牒，必須在那片數據汪洋中，精確鎖定渴求淨水的人員。",
                    options: [
                        { t: "施展篩選結界：鎖定「淨水符」項", correct: true  },
                        { t: "憑藉肉眼在凌亂行間逐一搜尋",               correct: false },
                        { t: "將名冊拓印出無數份分發給眾人",             correct: false }
                    ],
                    success_msg: "篩選魔法如同一道細密的濾網，將不相干的雜質剔除，唯有最重要的目標得以顯現。"
                },
                expectedCondition: { type: "ACTION", actionId: "FILTER_APPLY" },
                storySegmentAfter: "success_FILTER"
            }
        ]
    }
};
