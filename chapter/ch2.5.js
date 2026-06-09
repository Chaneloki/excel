/**
 * 試算表魔法冒險 v2 - 第 2.5 章【豐收祭的後勤】
 * 挑戰模式：無引導，使用彈窗試煉
 * 腳本優化：將文風與第 5 章對齊，增加感官描寫與角色情感深度。
 * 閱讀優化：進一步拆分長句，確保每行文字長度適中，提升閱讀節奏。
 */

const generateCh2_5Data = () => {
    const baseData = [
        ["金穗鎮豐收祭嘉獎名冊", "", "", "", "", "", ""],
        ["", "組別", "參與點數", "預算", "備註", "", ""],
        ["魔法師", "助力", "25", "3000", "效率", "", ""],
        ["釀酒大師", "生產", "20", "2500", "冠軍", "", ""],
        ["巡邏隊長", "安保", "18", "2200", "守護", "", ""],
        ["搭棚工頭", "建設", "15", "2000", "辛勞", "", ""],
        ["麥田農夫", "生產", "22", "2800", "豐收", "", ""],
        ["祭典主持", "禮儀", "10", "1500", "優雅", "", ""],
        ["搬運工", "後勤", "12", "1800", "重力", "", ""],
        ["", "", "", "", "", "", ""],
        ["總計金額", "", "", "", "", "", ""],
    ];

    const rows = 20;
    const cols = 10;
    const expandedData = [];
    for (let r = 0; r < rows; r++) {
        const newRow = [];
        for (let c = 0; c < cols; c++) {
            newRow.push((baseData[r] && baseData[r][c] !== undefined) ? baseData[r][c] : "");
        }
        expandedData.push(newRow);
    }
    return expandedData;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["25"] = {
    meta: {
        title: "第 2.5 章：豐收祭的後勤",
        sheetName: "🌾 嘉獎名冊",
        reward: 1000
    },

    initialGridData: generateCh2_5Data(),

    skillDefs: {
        MERGE_CENTER: { n: "跨欄置中", s: "Alt+H+M+C", d: "將選取的儲存格合併並文字居中", cat: "org", icon: "icon/跨欄置中.png" },
        BORDER: { n: "框線", s: "Alt+H+B", d: "為選取的儲存格加上框線", cat: "style", icon: "icon/框線.png" },
        FILL: { n: "填滿色彩", s: "Alt+H+H", d: "變更儲存格背景顏色", cat: "style", icon: "icon/fill colour.png" },
        FORMAT: { n: "格式刷", s: "Alt+H+FP", d: "複製選取格的樣式並套用到其他區域", cat: "style", icon: "icon/format brush.png" },
        NUMBER: { n: "自訂格式", s: "Ctrl+1", d: "設定數據的顯示單位與格式", cat: "data", icon: "icon/所有框線.png" },
        SUM: { n: "自動加總", s: "Alt+=", d: "快速計算選取區域的總和", cat: "start", icon: "icon/auto sum.png" }
    },

    story: {
        "start": [
            { n: "系統", t: "（金穗鎮繁忙的廣場上）", a: "system"
            , bg: "bg2.5 ppl.png", bgm: "goofy.mp3",bgPos: "center", bgZoom: 1.1 },
            { n: "系統", t: "（鼎沸的人聲與遠處的麥浪聲交織在一起。）"
            , a: "system", se: "people.mp3", vol: 1.0,bgPos: "right bottom", bgZoom: 2.0 },
            { n: "我", t: "（我望著眼前那疊堆積如山的祭典文書，感到一陣隱隱作痛的頭大。）", a: "me"
            ,bgPos: "left bottom", bgZoom: 2.0,flash:true, flashSFX:"boom.mp3",vol:1.0},
            { n: "我", t: "呼，好不容易才從學院那個整天談論靈魂與美學的地方脫身。 ", a: "me"
            , se: "girl_ow.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1, bgDur:"6s" },
            { n: "我", t: "本來打算直奔王城的", a: "me" },
            { n: "我", t: "結果半路又被公會這幫討債鬼給強行攔截了。 ", a: "me" },
            { n: "冒險者公會會長", t: "『金穗鎮的豐收祭急需後勤支援。』", a: "head"
            , isMemory: true, bg: "bg1.png",flash:true, flashSFX:"flash.mp3",vol:1.0 },
            { n: "冒險者公會會長", t: "『這是我們公會對地方應盡的義務』", a: "head", isMemory: true, bg: "bg1.png" },
            { n: "冒險者公會會長", t: "『你就當作是新手的磨練，多擔待點吧。』", a: "head", isMemory: true, bg: "bg1.png" },
            { n: "我", t: "（我有些無奈地撇了撇嘴）義務……", a: "me", isMemory: true, bg: "bg1.png" },
            { n: "我", t: "好吧，至少這份義務比回後山去跟雙足飛龍的糞便打交道要強得多了。", a: "me"
            , isMemory: true, bg: "bg1.png"},
            { n: "系統", t: "（空氣中瀰漫著剛出爐烤麵包的香甜與釀造中的麥酒那股醇厚氣息。）", a: "system"
            , bg: "bg2.5.png", bgm: "story_bgm2.5.mp3", 
            env: "trans1/1", envFrames: 21, envspeed:100, envOpacity: 1.0,envDrift:true, envLoop: false,se:"fun1.mp3",vol:1.0},
            { n: "賽爾", t: "這地方看起來充滿了生命力呢。 ", a: "fairy", se: "fairy_laugh.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.5,env:null},
            { n: "賽爾", t: "少年，別總是一副苦瓜臉，試著去感受這份豐收的喜悅吧。", a: "fairy" },
            { n: "我", t: "賽爾，這次妳能不能……哪怕是一次也好，在旁邊稍微提點我一下？", a: "me" },
            { n: "我", t: "求妳了，這份名冊的數量真的有點嚇人。 ", a: "me",bgPos: "center", bgZoom: 1.1},
            { n: "賽爾", t: "（它優雅地在空中翻了個身，露出一個狡黠的微笑）", a: "fairy", se: "fairy_infosmile.mp3", vol: 1.0 },
            { n: "賽爾", t: "聽好了少年！ ", a: "fairy",shake:true },
            { n: "賽爾", t: "這一關的試煉，妳必須完全憑藉自己的意志去完成。 ", a: "fairy" },
            { n: "賽爾", t: "我就在魔導書的扉頁裡靜靜地觀察……", a: "fairy" },
            { n: "賽爾", t: "不到萬劫不復的最後關頭，我是絕對不會發出半點提示音的喔。", a: "fairy" },
            { n: "我", t: "（我壓低聲音嘀咕了一句） ", a: "me", se: "girl_ow.mp3", vol: 1.0 },
            { n: "我", t: "我就知道，妳這傢伙永遠在最需要的時候靠不住。 ", a: "me" },

            { n: "系統", t: "（一名英氣十足、穿著俐落後勤制服的女性朝你走來）", a: "system", se: "walk.mp3", vol: 1.0,
            bg:"CG/ch2.5.png",bgPos: "center top 20%", bgZoom: 2.5,flash:true, flashSFX:"flash.mp3",vol:1.0 
             },
            { n: "系統", t: "（腳步聲乾脆而急促。）", a: "system" },
            { n: "葛蕾", t: "你就是公會派過來的那個援手？", a: "glea", se: "girl_hi.mp3", vol: 1.0  },
            { n: "葛蕾", t: "太好了。我是後勤組的葛蕾。 ", a: "glea" },
            { n: "葛蕾", t: "這本《豐收祭嘉獎名冊》三天後就必須呈遞給鎮長", a: "glea",bgPos: "center", bgZoom: 2.5, bgDur:"3s" },
            { n: "葛蕾", t: "現在它簡直就是個災難。 ", a: "glea" }, 
            { n: "葛蕾", t: "你看，標題歪七扭八，數據毫無裝幀可言，", a: "glea",bgPos: "right bottom", bgZoom: 1.5, bgDur:"3s" },
            { n: "葛蕾", t: "連最基本的邊框都缺漏嚴重。 ", a: "glea" },
            { n: "葛蕾", t: "鎮長要是看到這種連草稿都算不上的東西，絕對會當場氣到吐血的。", a: "glea" },
            { n: "我", t: "（我翻開那本沈重的名冊，眉頭不由得緊緊鎖了起來）", a: "me", bg: "bg2.5.png" },
            { n: "我", t: "嗯，這種混亂的程度跟當初學院那本《新生名冊》簡直是如出一轍。", a: "me" },
            { n: "我", t: "放心吧，這本名冊的秩序就交給我來重塑。", a: "me", a: "me"
            , se: "girl_en1.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1,flash: true, flashSFX: "boom.mp3", vol: 1.0}
        ],
        "mid_story": [
            { n: "系統", t: "（試煉室內，我正屏氣凝神）", a: "system" }, 
            { n: "系統", t: "（指尖在魔導書發光的頁面上快速游移，比對著原始資料。）", a: "system" }, 
            { n: "我", t: "（隨著核對的深入，我的筆尖突然在一處空白處停了下來）", a: "me" },
            { n: "我", t: "奇怪……", a: "me" },
            { n: "我", t: "這裡，似乎遺漏了一個極其重要的紀錄項目。 ", a: "me" },
            { n: "我", t: "鎮長最初的那份手寫原稿上，明明清晰地標註著一位「林阿姨」。 ", a: "me" },
            { n: "我", t: "她是負責這十一年來後勤伙食的核心。 ", a: "me" },
            { n: "我", t: "為什麼到了這份準備公諸於世的正式嘉獎名冊上卻找不到她的名字了？", a: "me" },
            { n: "系統", t: "（葛蕾不知何時出現在我身後隨意掃了一眼名冊，嘴角扯出一抹自嘲的弧度。）", a: "system" }, 
            { n: "葛蕾", t: "（語氣平淡如冰）這結果早就在我的意料之中。 ", a: "glea" },
            { n: "葛蕾", t: "林阿姨跟著我處理雜務已經整整十一個年頭了。 ", a: "glea" },
            { n: "葛蕾", t: "但在那些坐在高位、只關心麥穗產量的大人物眼中……", a: "glea" },
            { n: "葛蕾", t: "做飯的，還有我們這些終日與账本為伍的人都屬於沒有產出的『雜訊』。", a: "glea" },
            { n: "葛蕾", t: "他們的眼裡，永遠只看得到前線那些閃閃發光的成就。 ", a: "glea" },
            { n: "葛蕾", t: "卻永遠看不見在背後支撐著這一切的那雙佈滿老繭的手。 ", a: "glea" },
            { n: "我", t: "所以……妳真的打算就這樣默默地忍受這份不公嗎？", a: "me" },
            { n: "葛蕾", t: "（她轉過身，聲音變得有些決絕）算了。 ", a: "glea" },
            { n: "葛蕾", t: "想要多補寫一個人的名字，又要跟那幫王室派來的審批官磨破嘴皮子。", a: "glea" },
            { n: "葛蕾", t: "就這樣吧。截止日已在眼前，", a: "glea" },
            { n: "葛蕾", t: "只要這份名冊能用、整理得夠快……那就足夠了。 ", a: "glea" },
            { n: "我", t: "（我沉默著沒有再回話，只是低頭凝視著魔導書那幽幽的綠芒。）", a: "me" },
            { n: "我", t: "（在那一刻，我在內心深處，做出了一個大膽且不合規矩的決定。）", a: "me" }
        ],
        "end": [
            { n: "系統", t: "（落日的餘暉透過帳篷的縫隙灑入。）", bgm: 'winter.mp3', bg: 'bg2.5.png'
            , bgPos: "left top", bgZoom: 1.5, bgDur: "3s"
            , env: "light/1", envFrames: 25, envspeed:50, envOpacity: 0.8, envDrift:true}, 
            { n: "系統", t: "（葛蕾急匆匆地推簾而入，步履依舊匆忙。）", bg:"CG/ch2.5.png", se: "run.mp3", vol: 1.0
            , bgPos: "center top", bgZoom: 2.0}, 
            { n: "葛蕾", t: "那本名冊的重塑工作到底完成了沒有？", a: "glea" },
            { n: "葛蕾", t: "鎮長那邊已經開始在桌子上拍巴掌了。 ", a: "glea" },
            { n: "我",   t: "（我將那本被魔法重新賦予了秩序的名冊，重重地推到了她的面前。）", a: "me", bg: 'CG/ch2.5 read.png'
            ,se:"paper down.mp3",bgPos: "center", bgZoom: 1.1, bgDur: "8s"},
            { n: "我",   t: "完成了。請務必，由妳親自來揭開這份最終的結果。 ", a: "me", bg: 'CG/ch2.5 read.png' },
            { n: "系統", t: "（葛蕾有些狐疑地翻開名冊，原本麻利的動作）", a: "system", bg: 'CG/ch2.5 read.png', bgm: 'no.mp3' },
            { n: "系統", t: "（在觸碰到第一頁的瞬間，徹底凝固了。）", a: "system" , se: "heartbeat.mp3", vol: 1.0},
            { n: "系統", t: "（在名冊最顯眼的位置，那個原本被邊緣化的『後勤支援組』，被賦予了最為宏大的標題與配色。）", a: "system", bg: 'CG/ch2.5 read.png', se: "book.mp3", vol: 1.0 },
            { n: "系統", t: "（在那行工整的文字下方，我悄悄刻上了一句備註：）", a: "system", bg: 'CG/ch2.5 read.png', bgm: 'sweet2.mp3' },
            { n: "系統", t: "（『致使這場豐收祭成真的每一雙手』。）", a: "system",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "系統", t: "（她有些失神地往後翻閱，指尖在紙面上輕輕顫抖著。）", a: "system", bg: 'CG/ch2.5 read.png',shake:true
            ,bgPos: "bottom", bgZoom: 1.5, bgDur: "8s"},
            { n: "系統", t: "（在義工組的最前列，林阿姨的名字被整齊地補寫在那裡，後方緊跟著『十一年不懈奉獻』的金色批註。）", a: "system", bg: 'CG/ch2.5 read.png' },
            { n: "葛蕾", t: "（她死死盯著那些閃爍著魔力光輝的格子，眼神中的冰霜在這一刻出現了明顯的裂痕。）", a: "glea", bg: 'CG/ch2.5 read.png' },
            { n: "葛蕾", t: "（原本那副武裝到牙齒的防禦姿態，終於在這一瞬，徹底瓦解了。）", a: "glea", bg: 'CG/ch2.5 read.png'
            ,flash: true},

            { n: "系統", t: "（砰！帳篷的簾被大步掀開）", a: "system", bg: 'bg2.5.png', se: "boom.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.5},
            { n: "系統", t: "（鎮長帶著一身酒氣與爽朗的笑聲走進了室內。）", a: "system", se: "walk.mp3", vol: 1.0 },
            { n: "鎮長", t: "葛蕾！那本嘉獎名冊該交出來了吧！", a: "npc1", se: "man haya.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.1,bgDur:"3s"},
            { n: "系統", t: "（鎮長敏銳地察覺到室內這份異樣的沈默，不由得愣在原地。）", a: "system",shake:true },
            { n: "鎮長", t: "咦？妳這孩子……怎麼露出一副像是要哭出來的表情？", a: "npc1" },
            { n: "葛蕾", t: "（她迅速側過頭，語氣恢復了以往的乾脆）沒什麼。 ", a: "glea", se: "girl_attraction.mp3", vol: 1.0 },
            { n: "葛蕾", t: "名冊已經重塑完畢了。你自己看清楚。 ", a: "glea",se:"paper down.mp3", vol:1.0 },
            { n: "系統", t: "（鎮長有些驚訝地接過名冊，翻閱的速度越來越快，）", a: "system", se: "book.mp3", vol: 1.0},
            { n: "系統", t: "（渾濁的眼睛也隨之亮了起來。）", a: "system" },
            { n: "鎮長", t: "噢！這份表格的氣勢……", a: "npc1",shake:true },
            { n: "鎮長", t: "比以前那些亂七八糟的東西要整齊漂亮太多了！", a: "npc1" },
            { n: "鎮長", t: "咦，這個名字是……林阿姨？", a: "npc1",bgPos: "center", bgZoom: 1.5},
            { n: "鎮長", t: "還有這句話，『讓豐收祭成真的每一雙手』……", a: "npc1",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "鎮長", t: "葛蕾，這不是妳一直負責的後勤組嗎？", a: "npc1" },
            { n: "鎮長", t: "為什麼這一次，會被排在如此醒目的位置？", a: "npc1" },
            { n: "我", t: "鎮長，請恕我多言。有些人或許未曾親自下田耕耘，也未曾親手釀造名酒……", a: "me"
            , se: "girl_attraction.mp3", bg:"CG/ch2.5 main.png", vol: 1.0,bgPos: "right", bgZoom: 1.1,bgDur:"6s"  },
            { n: "我", t: "但如果沒有他們長年累月在幕後打點每一件瑣碎的物資……", a: "me" },
            { n: "我", t: "這場華麗的豐收祭，恐怕連黃昏都撐不過去。 ", a: "me"},
            { n: "我", t: "我認為，那些默默無聞的奉獻與汗水，同樣值得被最工整、最尊嚴地記錄在冊。", a: "me"
            ,bgPos: "center", bgZoom: 1.1,flash: true},
            { n: "系統", t: "（鎮長沈默了許久，指尖滑過林阿姨的名字，最後重重地點了點頭。）", a: "system"
            , bg: 'bg2.5.png', se: "clothes1.mp3", vol: 1.0,bgPos: "left", bgZoom: 1.5, bgDur:"8s" },
            { n: "鎮長", t: "你說得對。是我們這些老傢伙，平日裡太過糊塗了。 ", a: "npc1", se: "man en1.mp3", vol: 1.0  },
            { n: "鎮長", t: "葛蕾，這十一年來，整個後勤體系全靠妳一個人在咬牙硬撐……", a: "npc1" },
            { n: "鎮長", t: "妳真的辛苦了。 ", a: "npc1" },
            { n: "葛蕾", t: "（她似乎被這份遲來了十年的認可弄得有些措手不及，指尖不安地絞著衣角。）", a: "glea"
            ,flash: true, flashSFX: "clothes1.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1},
            { n: "葛蕾", t: "這本來就是我的分內之事……鎮長您，太過抬舉了。 ", a: "glea" },
            { n: "葛蕾", t: "鎮長，若數據沒問題就請儘快簽字吧，大家都還等著撥發預算。 ", a: "glea" },
            { n: "系統", t: "（鎮長哈哈大笑起來，一隻厚實的大手用力拍在了我的肩膀上，震得我生疼。）", a: "system", se: "man haha.mp3", vol: 1.0, bg: 'bg2.5.png' },
            { n: "鎮長", t: "年輕人，你的腦子裡裝著一些非常了不起的東西！", a: "npc1",shake:true },
            { n: "鎮長", t: "以後路過金穗鎮，直接進我的辦公室找我喝茶，這裡永遠歡迎你！", a: "npc1" },
            { n: "我", t: "那我就先行謝過鎮長的好意了！", a: "me", se: "girl_yes.mp3", vol: 1.0,bg:"CG/ch2.5 main.png"  },

            { n: "系統", t: "（隨着鎮長那爽朗的笑聲遠去，空蕩蕩的帳篷內，再次只剩下我與葛蕾兩個人。）", 
            a: "system", bgm: 'no.mp3', se: "wind1.mp3", vol: 1.0,bg:"CG/ch2.5 two.png",bgPos: "bottom", bgZoom: 2.0},
            { n: "葛蕾", t: "你這傢伙……膽子真的比我想像中的還要大。 ", a: "glea", bgm: 'sweet.mp3'
            ,bgPos: "left top", bgZoom: 2.0, bgDur:"4s"},
            { n: "葛蕾", t: "自作主張改動呈報的名冊，萬一鎮長發起火來，公會那邊可護不住你。", a: "glea" },
            { n: "我", t: "我有什麼好畏懼的？鎮長剛才不是已經親口給出答案了嗎？", a: "me",bgPos: "right top", bgZoom: 2.0, bgDur:"4s" },
            { n: "我", t: "他說——『你說得很對』。 ", a: "me" },
            { n: "我", t: "而且在我看來，有些人的靈魂與付出，本來就不該被當作垃圾隨便塞在最底層。", a: "me" },
            { n: "系統", t: "（葛蕾凝視了我片刻，那雙銳利的眸子裡第一次褪去了敵意）", a: "system",bgPos: "center", bgZoom: 1.1, bgDur:"4s" },
            { n: "葛蕾", t: "……隨便你怎麼吹牛吧。 ", a: "glea" },
            { n: "葛蕾", t: "不過，你的辦事效率與對數據結構的掌控力，確實有點本事。 ", a: "glea" },
            { n: "葛蕾", t: "至少這一次，你沒有浪費我的寶貴時間。 ", a: "glea" },

            { n: "系統", t: "（她從制服口袋裡掏出一枚磨得發亮的古銅色徽章，隨手朝我拋了過來。）", a: "system", se: "coin.mp3", vol: 1.0
            ,bg:"CG/ch2.5 coin.png",bgPos: "left", bgZoom: 1.5,flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "葛蕾", t: "收下吧。這是我們金穗鎮辦事人員的信物。 ", a: "glea",bgPos: "right top", bgZoom: 1.1, bgDur:"4s" },
            { n: "葛蕾", t: "以後若是你在附近接了什麼棘手的表格任務……", a: "glea" },
            { n: "葛蕾", t: "可以憑這個直接調用我的後勤物資，省得你又在那些雜務上浪費體力。", a: "glea" },
            { n: "我", t: "（我穩穩地接過那枚帶有體溫的徽章，對她燦爛一笑）", a: "me", se: "girl_smile1.mp3", vol: 1.0,bg:"CG/ch2.5 main.png"  }, 
            { n: "我", t: "謝了，葛蕾。妳其實，真的是個挺溫柔的人呢。 ", a: "me" },
            { n: "葛蕾", t: "（她迅速轉身掩飾臉上的神情）少囉嗦，我只是在按規章辦事而已。", a: "glea", se: "girl_attraction.mp3", vol: 1.0,bg:"CG/ch2.5 coin.png"  },

            { n: "系統", t: "（就在這時，魔導書的封皮發出『啪』的一聲脆響，賽爾像彈簧一樣從裡面鑽了出來。）", a: "system"
            ,bg:"bg2.5.png", se: "fun1.mp3", vol: 1.0  },
            { n: "賽爾", t: "（它伸了一個誇張無比的大懶腰） 呼啊——！", a: "fairy",se:"fairy_sleep",vol:1.0 },
            { n: "賽爾", t: "在魔導書裡近距離觀察你們這群人類的內心戲，簡直比讀遠古捲軸還過癮！", a: "fairy", se: "fairy_smile.mp3", vol: 1.0
            ,bg:"CG/ch2.5 three.png",bgPos: "right", bgZoom: 1.5},
            { n: "葛蕾", t: "這……這本書竟然真的會開口說話？", a: "glea"
            ,bgPos: "left top", bgZoom: 1.5, shake:true },
            { n: "葛蕾", t: "還有，這是什麼發光的使魔？", a: "glea" },
            { n: "我", t: "呃，這說來話長。她是我的……", a: "me", se: "girl_embrass.mp3", vol: 1.0
            ,bgPos: "right top", bgZoom: 1.5, bgDur:"3s"},
            { n: "我", t: "嗯，不太靠譜的搭檔，賽爾。 ", a: "me" },
            { n: "賽爾", t: "雖然這小子總愛自作主張，但剛才他在名冊上施展的那幾道魔法，確實無懈可擊。", a: "fairy"
            ,bgPos: "right", bgZoom: 1.5, bgDur:"3s"},
            { n: "賽爾", t: "這場挑戰，就算他拿到了優等生的門票吧。 ", a: "fairy" },
            { n: "賽爾", t: "葛蕾姑娘，面對這種難得一見的人才，妳那珍藏的頂級紅茶……可千萬別省著不請啊。", a: "fairy" },
            { n: "葛蕾", t: "（她重新恢復了那副冷淡而專業的表情） 真是浮誇的戲法。 ", a: "glea"
            ,bgPos: "center", bgZoom: 1.1,bg:"bg2.5.png" },
            { n: "葛蕾", t: "既然名冊已經落實，我還得去核對後續的財政撥款。 ", a: "glea"},
            { n: "葛蕾", t: "兩位，請自便。 ", a: "glea" },
            { n: "賽爾", t: "嘖嘖，真是一位冷若冰霜、無懈可擊的後勤女王呢。 ", a: "fairy" },
            { n: "賽爾", t: "少年，這裡的因果已經圓滿了。我們走吧！", a: "fairy" },
            { n: "賽爾", t: "正式踏入那條通往王城的官道！", a: "fairy" },
            { n: "系統", t: "（就在葛蕾踏入帳篷深處，背對着你，身影即將消失在陰影中的那一刻。）", a: "system", bgm: 'no.mp3', se: "wind1.mp3", vol: 1.0 },
            { n: "葛蕾", t: "（她的腳步頓了一下，聲音清冷卻依舊清晰地傳來）", a: "glea", bgm: 'sweet.mp3'
            ,flash:true,flashSFX:"flash.mp3", bg:"CG/ch2.5 last.png" ,bgPos: "center", bgZoom: 1.1},
            { n: "葛蕾", t: "金穗鎮的紅茶，確實是全大陸最頂尖的。 ", a: "glea" , se: "girl_attraction.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.5, bgDur:"4s"},
            { n: "葛蕾", t: "以後如果路過這裡，隨時進來喝一杯吧。不收你錢。 ", a: "glea" },
            { n: "我", t: "（我對著那個背影大聲回應）我記住了！", a: "me", bg:"CG/ch2.5 main.png" ,bgPos: "right", bgZoom: 1.1 },
            { n: "我", t: "等我見過國王回來，一定打擾！", a: "me" },
            { n: "葛蕾", t: "總之……一路上小心王城官僚。 ", a: "glea", bg:"CG/ch2.5 last.png",bgPos: "center", bgZoom: 1.1},
            { n: "我", t: "嗯！賽爾，我們走吧！", a: "me", bg:"CG/ch2 last.png",env:null },
            { n: "系統", t: "（賽爾輕盈地坐在我的肩膀上，目光越過地平線）", a: "system" },
            { n: "系統", t: "（望向遠方那座沈睡在暮色中的宏偉王城。）", a: "system" },
        ],

        "success_MERGE": [{ n: "系統", t: "[[跨欄置中|excel]] 禁術釋放成功。碎片熔煉為一體。", a: "system" }],
        "success_BORDER": [{ n: "系統", t: "[[所有框線|excel]] 骨架繪製完畢。秩序得以重塑。", a: "system" }],
        "success_SLASH": [{ n: "系統", t: "空間禁術：儲存格[[斜線|excel]] 切割完成。因果兩分。", a: "system" }],
        "success_COLOR": [{ n: "系統", t: "色彩魔法：[[填滿色彩|excel]] 噴塗完成。視覺重心已鎖定。", a: "system" }],
        "success_FORMAT": [{ n: "系統", t: "權能拓印：[[格式刷|excel]] 複製完成。美學與維度同步。", a: "system" }],
        "success_NUMBER": [{ n: "系統", t: "最終武裝：[[自訂數字格式|excel]] 著裝完畢。數值已具備神性。", a: "system" }],
        "success_SUM": [{ n: "系統", t: "終極結算：[[自動加總|excel]] 運算完成。數據之長河歸於真理。", a: "system" }]
    },

    initialGridData: generateCh2_5Data(),

    simulator: {
        bgm: "game_bgm.mp3",
        tasks: [
            {
                id: "MERGE_TASK",
                tutorHint: "任務: 選取 A1:E1，釋放【跨欄置中】魔法。",
                playerText: "「首先得讓這散亂的標題重新歸位。葛蕾剛才說過，這種破碎的排版簡直是視覺災難。」",
                unlockBtnId: "mergecenter",
                unlockSkillId: "MERGE_CENTER",
                quiz: {
                    situation: "名冊標題散亂在五個侷促的格子裡，葛蕾指出這會導致大人物們失去閱讀的耐心。",
                    options: [
                        { t: "跨欄置中", correct: true },
                        { t: "所有框線", correct: false },
                        { t: "格式刷", correct: false }
                    ],
                    success_msg: "慧眼獨具！使用『跨欄置中』將文字禁錮在中央，氣場瞬間就提升了。 "
                },
                expectedCondition: { type: "ACTION", actionId: "MERGE_CENTER" },
                storySegmentAfter: "success_MERGE"
            },
            {
                id: "BORDER_TASK",
                tutorHint: "任務: 為 A2:E10 烙印下整齊的【框線】。",
                playerText: "「名冊現在看起來就像一片無序的流沙。得趕快為它注入剛強的骨架。」",
                unlockBtnId: "border",
                unlockSkillId: "BORDER",
                quiz: {
                    situation: "整份名冊缺乏邊界的束縛，數據隨時可能在視覺中逸散，需要建立堅固的防禦體系。",
                    options: [
                        { t: "所有框線", correct: true },
                        { t: "跨欄置中", correct: false },
                        { t: "自訂數值格式", correct: false }
                    ],
                    success_msg: "慧眼獨具！使用『跨欄置中』將文字禁錮在中央，氣場瞬間就提升了。 "
                },
                expectedCondition: { type: "ACTION", actionId: "ALL_BORDERS" },
                storySegmentAfter: "success_BORDER"
            },
            {
                id: "SLASH_TASK",
                tutorHint: "任務: 在 A2 格內劃下切割時空的【斜線】。",
                playerText: "「左上角的 A2 祭壇需要同時祭獻『功勳類別』與『姓名』，只能動用空間分割術了。」",
                quiz: {
                    situation: "狹小的單元格空間內，必須同時標註出組別與姓名兩重不同的維度資訊。",
                    options: [
                        { t: "斜線", correct: true },
                        { t: "跨欄置中", correct: false },
                        { t: "自動加總", correct: false }
                    ],
                    success_msg: "神乎其技！在一格內劃出深淵般的斜線，讓兩重資訊得以和諧共存。 "
                },
                expectedCondition: { type: "ACTION", actionId: "DIAGONAL_BORDER" },
                storySegmentAfter: "success_SLASH"
            },
            {
                id: "COLOR_TASK",
                tutorHint: "任務: 替 A2:E2 與 A3:E3 設定具備沈浸感的【填滿色彩】。",
                playerText: "「為了引導閱讀者的視線，我得在標題維度與數據位面之間，噴塗上一層清晰的色彩邊界。」",
                unlockBtnId: "fillcolor",
                unlockSkillId: "FILL",
                quiz: {
                    situation: "純白的數據海洋會讓人迷失方向，透過底色的渲染，能讓重要的欄位在瞬間脫穎而出。",
                    options: [
                        { t: "填滿色彩", correct: true },
                        { t: "格式刷", correct: false },
                        { t: "跨欄置中", correct: false }
                    ],
                    success_msg: "這就是色彩的權能！名冊的深度與專業感，在這一刻得到了質的飛躍。 "
                },
                expectedCondition: { type: "ACTION", actionId: "FILL_COLOR" },
                storySegmentAfter: "success_COLOR",
                midStoryAfter: "mid_story", 
                onMidStoryComplete: () => { window.ch2Actions.add_lin_auntie(); }
            },
            {
                id: "FORMAT_TASK",
                tutorHint: "任務: 揮動【格式刷】，將 A3:E3 的美學奧義傳遞至下方區域。",
                playerText: "「我已經定義了一行完美的樣版……剩下的枯燥工作，就該交給權能的快速拓印了。」",
                unlockBtnId: "formatpainter",
                unlockSkillId: "FORMAT",
                quiz: {
                    situation: "你已經親手打造了一個完美的風格樣本，現在需要將這份美學瞬間覆蓋至整本名冊。",
                    options: [
                        { t: "格式刷", correct: true },
                        { t: "跨欄置中", correct: false },
                        { t: "斜線", correct: false }
                    ],
                    success_msg: "明智的抉擇！『格式刷』能讓妳在繁瑣的複製工作中，依然保持優雅的節奏。 "
                },
                expectedCondition: { type: "ACTION", actionId: "FORMAT_PAINTER" },
                storySegmentAfter: "success_FORMAT"
            },
            {
                id: "NUMBER_TASK",
                tutorHint: "任務: 將 D3:D10 的數值包裝為莊嚴的【貨幣】格式。",
                playerText: "「預算金額那一欄顯得過於赤裸。必須賦予它們神聖的貨幣符號，才能匹配它們的身價。」",
                quiz: {
                    situation: "枯燥的數字無法體現其背後真正的價值。穿上貨幣的盛裝，才能贏得鎮長的尊重。",
                    options: [
                        { t: "自訂數值格式", correct: true },
                        { t: "自動加總", correct: false },
                        { t: "格式刷", correct: false }
                    ],
                    success_msg: "武裝完畢！自訂數值格式成功，讓這些冰冷的數字流露出應有的權威感。 "
                },
                expectedCondition: { type: "ACTION", actionId: "CUSTOM_FORMAT" },
                storySegmentAfter: "success_NUMBER"
            },
            {
                id: "SUM_TASK",
                tutorHint: "任務: 在 D11 格位內觸發【自動加總】，得出最終的命運數值。",
                playerText: "「最後的終結技了。在此處匯聚整份名冊的預算總量。希望能得出一個完美的答案。」",
                unlockBtnId: "autosum",
                unlockSkillId: "SUM",
                quiz: {
                    situation: "最後的審判時刻。讓所有紛亂的預算數值在此匯流，得出最終那份沈甸甸的總額吧！",
                    options: [
                        { t: "自動加總", correct: true },
                        { t: "自訂數值格式", correct: false },
                        { t: "跨欄置中", correct: false }
                    ],
                    success_msg: "契成！自動加總魔法啟動，所有的努力在這一秒，終於得到了最終的見證。 "
                },
                expectedCondition: { type: "ACTION", actionId: "AUTO_SUM" },
                storySegmentAfter: "success_SUM"
            }
        ]
    }
};
