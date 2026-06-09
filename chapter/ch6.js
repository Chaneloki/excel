/**
 * 試算表魔法冒險 v2 - 第 6 章【船上的帳】
 * 
 * 最終群像強化版：
 * 1. 強化開場：米羅、夏特、葛蕾的三方互動，展現小隊旅行的日常氛圍。
 * 2. 精準性格：葛蕾用數據邏輯給予生澀安慰，主角主動出擊尋找任務。
 * 3. 完整收束：豐富結尾細節，強調五人影子交疊的沈浸感。
 */

const generateCh6Data = () => {
    const ports = ["北港", "東港", "南港", "西港", "河口鎮"];
    const months = ["一月", "二月", "三月", "四月", "五月", "六月"];
    const categories = ["糧食", "布匹", "藥材", "鐵器", "香料"];
    const rows = [["編號", "港口", "月份", "貨物類別", "數量(箱)", "金額(銀幣)"]];
    let id = 1;
    const fixed = [
        [id++, "北港", "一月", "糧食",  120, 3600],
        [id++, "北港", "一月", "藥材",   15, 4500],
        [id++, "東港", "二月", "布匹",   40, 2000],
        [id++, "東港", "三月", "香料",    8, 6400],
        [id++, "南港", "一月", "鐵器",   25, 5000],
        [id++, "南港", "四月", "糧食",   95, 2850],
        [id++, "西港", "五月", "布匹",   60, 3000],
        [id++, "河口鎮", "六月", "藥材", 10, 3000]
    ];
    for (const f of fixed) rows.push(f);
    for (let i = 0; i < 32; i++) {
        const p = ports[Math.floor(Math.random() * ports.length)];
        const m = months[Math.floor(Math.random() * months.length)];
        const c = categories[Math.floor(Math.random() * categories.length)];
        const qty = 5 + Math.floor(Math.random() * 150);
        const price = [20, 30, 50, 80, 100, 200, 300][Math.floor(Math.random() * 7)];
        const amt = qty * price;
        rows.push([id++, p, m, c, qty, amt]);
    }
    return rows;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["60"] = {
    meta: { title: "第 6 章：船上的帳", sheetName: "📦 多港口貨運帳目", reward: 3000 },
    initialGridData: generateCh6Data(),
    skillDefs: {
        PIVOT_CREATE: { n: "建立樞紐分析表", s: "插入→樞紐分析表", d: "把散落的數據重新組合成你想看的樣子——拖拽欄位到行、列、值，一秒看全局", cat: "insert", icon: "icon/樞紐分析表.png" },
        PIVOT_METHOD: { n: "更改匯總方式",   s: "雙擊值欄位→值欄位設定", d: "同一份數據可以看總和、也可以看平均、計數——換個角度看全局", cat: "insert", icon: "icon/樞紐分析表.png" },
        PIVOT_GROUP:  { n: "組合（分組）",    s: "右鍵→組成群組",   d: "把日期按季度歸組、把數字按區間切段——讓密密麻麻的明細變成有意義的類別", cat: "data", icon: "icon/樞紐分析表.png" }
    },

    story: {
        start: [
            { n: "系統", t: "（離開金穗鎮的第三天。通往王城的官道被坍塌的巨木與碎石死死堵住）", a: "system", bg: "road.png", bgm: "daily.mp3", trans: true, bgPos: "center", bgZoom: 1.2 },
            { n: "米羅", t: "（揉著酸痛的小腿，踢開腳邊的碎石）……這得繞多遠？我的腿已經沒知覺了。", a: "miro", se: "boy_breath.mp3", shake: true },
            { n: "夏特", t: "（拍掉披風下擺的落葉）所以我說過，步行是效率最低的移動方式。", a: "chate", bgPos: "left", bgZoom: 1.5 },
            { n: "夏特", t: "那邊有馬車不坐，非要走這條小路。", a: "chate"},
            { n: "葛蕾", t: "（抖開羊皮地圖看了一眼）繞水路。從河口鎮上船順江而下，三天就能到主城外港。", a: "glea"
            , se: "paper down.mp3", bgPos: "center", bgZoom: 1.2  },
            { n: "賽爾", t: "（趴在魔導書上翻了個身）雖然我討厭江水的濕氣，但總比聽米羅抱怨要好。走吧！", a: "fairy", se: "fairy laugh.mp3", vol: 1.0},
            { n: "我", t: "走吧。趕在天黑前到碼頭。", a: "me", se: "horse run.mp3",shake:true},

            { n: "系統", t: "（河口鎮碼頭。江風帶著腥味，一艘客貨兩用的木船收起跳板。）", a: "system", bg: "bg6_dock.png"
            , bgPos: "center", bgZoom: 1.5,bgDur:"8s"  , env: "white smoke/1", envFrames: 25, envspeed: 80, envOpacity: 0.2, envDrift: true },
            { n: "系統", t: "（船離了岸。兩岸的燈火在水波的搖晃中退遠。）", a: "system", bg: "bg6_boat.png", bgm: "silent.mp3",flash: true, flashSFX: "bell.mp3", vol: 1.0  },

            { n: "系統", t: "（深夜。江水拍打船腹。月光把甲板的木紋照得發白。）", a: "system", bgPos: "right", bgZoom: 1.3, bgDur: "5s"
            , se: "wind1.mp3",bg:"bg6_boat night.png"},
            { n: "系統", t: "（我獨自走出船艙。卻看見葛蕾正靜靜地坐在船尾的陰影處。）", a: "system",bg:"bg6 boat.png"
            ,bgm:"conspiracy.mp3",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "葛蕾", t: "（聽見腳步聲，沒有回頭）……睡不著？", se: "girl_breath.mp3", bgPos: "left", bgZoom: 1.5},
            { n: "我", t: "（我在她旁邊的貨堆坐下）嗯。妳呢。在這裡坐很久了吧。", a: "me", se: "clothes1.mp3"},
            { n: "葛蕾", t: "（她沒有接話。江風吹亂她的短髮)", se: "wind1.mp3", vol: 1.0},
            { n: "我", t: "有心事？從上船開始，妳的眉頭就沒鬆開過。", a: "me"},
            { n: "葛蕾", t: "（她的食指在膝蓋上輕輕敲了一下）", se: "put down.mp3", vol: 1.0},
            { n: "葛蕾", t: "十一年來",bg:"bg2.5.png",bgBlur: 10,isMemory:true,bgPos: "center", bgZoom: 1.1,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "葛蕾", t: "我每天睡前都會在腦子裡過一遍明天的調度清單……"},
            

            { n: "我", t: "（初見面時的風風火火。我沒想過葛蕾有這樣的時刻。）", a: "me"
            , bgPos: "center", bgZoom: 1.5, bgDur: "10s",bg:"CG/ch2.5.png",isMemory:true},
            { n: "我", t: "（帶她走的時候，也沒想過這一層。）", a: "me" ,bg:"CG/ch2.5 coin.png",isMemory:true},
            { n: "我", t: "（她說得沒錯。等價交換。）", a: "me" ,bg:"CG/ch2.5 last.png",isMemory:true},
            { n: "我", t: "（她有很好的能力。我也很喜歡跟她共事。）", a: "me" ,bg:"CG/ch2.5 three.png",isMemory:true},
            { n: "我", t: "（但我真的有想到她嗎？）", a: "me" ,isMemory:true,bgPos: "left top", bgZoom: 1.5,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "我", t: "（甚至現在，我想到的反而也是自己。）", a: "me",bg:"bg6_boat night.png"},

            { n: "我", t: "（我望著月影，語氣平淡）……我每天早上醒來，也不知道今天要做什麼。", a: "me",flash: true, flashSFX: "bell.mp3", vol: 1.0,bgm:"sweet.mp3"},
            { n: "我", t: "拿到魔導書之前的事，我幾乎都不記得了。", a: "me"
            ,bg:"road night.png",bgBlur: 20, bgPos: "center", bgZoom: 2.0},
            { n: "我", t: "就像一張被塗黑的表，連自己是誰都看不清。", a: "me", bgPos: "center", bgZoom: 1.5, bgDur: "10s" ,bg:"bg6 boat.png"},
            { n: "葛蕾", t: "（沒說話，只是看著江面。）", bgPos: "center", bgZoom: 1.5 , bgDur:"10s",bg:"bg6 boat.png"},
            { n: "我", t: "但我好像也沒你那麼認真。就只是發呆。", a: "me", se: "girl_embrass.mp3", vol: 1.0,shake:true},
            { n: "葛蕾", t: "……哼。你那是懶。", bgPos: "center", bgZoom: 1.1},
            { n: "我", t: "也許吧。", a: "me"},
            { n: "葛蕾", t: "（良久，她才再次開口，語氣依舊生硬）聽著。", a: "glea",shake:true},
            { n: "葛蕾", t: "一張表被塗黑了，最好的辦法不是去刮開墨跡，而是直接在新的格子上填入數據。", a: "glea"},
            { n: "葛蕾", t: "既然現在是空的，那就塞滿它。這是你目前唯一能做的事。", a: "glea",se: "bell.mp3", vol: 1.0},
            { n: "系統", t: "（她是在安慰我，卻更像是在對她自己說。)", a: "system", bgPos: "center", bgZoom: 1.5 , bgDur:"10s" },
            { n: "系統", t: "（那種生澀的語氣，反而透著一種令人安心的踏實。）", a: "system" },
            { n: "葛蕾", t: "（她站起身，拍掉灰塵）走吧。江風會讓數據分析力下降。回去睡覺。"
            ,env:null, bgPos: "center", bgZoom: 1.2,flash: true, flashSFX: "flash.mp3", vol: 1.0, a: "glea", se: "walk.mp3",bg:"bg6_boat night.png"},

            { n: "系統", t: "（翌日清晨。晨光撕裂了江面的薄霧。）", a: "system"
            , bg: "bg6_boat.png", bgm: "goofy.mp3", env: "light/1", envFrames: 25, envspeed: 80, envDrift: true },
            { n: "米羅", t: "（扶著欄杆，臉色慘白得像張紙）……嘔……為什麼……這船一直在晃……", a: "miro", se: "boy_breath.mp3", shake: true },
            { n: "夏特", t: "（悠雅地坐在甲板上看書，眼皮都沒抬一下）", a: "chate", bgPos: "left", bgZoom: 1.5, se: "boy attraction.mp3", vol: 1.0},
            { n: "夏特", t: "因為你在呼吸，而大自然在嫌棄你。離我遠點，別吐在我的靴子上。", a: "chate",shake:true},
            { n: "葛蕾", t: "（依舊坐在那個角落。望著江面，雙手平放在膝蓋上，眼神卻顯得有些空洞。）", a: "glea"},
            { n: "我", t: "（看來她還沒找到那份『新的數據』。如果不給她一點事做，她恐怕會焦慮到主城。）", a: "me", bgPos: "center", bgZoom: 1.5},
            { n: "我", t: "（我轉過身，開始主動向貨艙走去，試圖尋找一些能讓她重新聚焦的東西。）", a: "me", se: "walk.mp3",bgPos: "center", bgZoom: 1.1,bgDur:"4s"},

            { n: "我", t: "（在貨艙入口，我看到一位老商人正對著滿地的帳單抓耳撓腮）大叔，遇到麻煩了？", a: "me"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0, se: "girl_attraction.mp3", vol: 1.0},
            { n: "商人", t: "（苦著臉）哎喲！我這跑了五個港口的轉運帳目，全亂成一團了！", a: "npc1", se: "man ha.mp3", shake: true },
            { n: "商人", t: "等到了主城要交帳，但我這腦袋算不過來啊……", a: "npc1", bgPos: "center", bgZoom: 1.5},
            { n: "我", t: "（我接過那疊沉甸甸的紙張）這件事，我認識一個全王國最專業的人。", a: "me", se: "paper down.mp3",shake:true,flash: true, flashSFX: "bell.mp3", vol: 1.0},

            { n: "系統", t: "（我走回船尾，將帳單遞到葛蕾面前。）", a: "system", se: "put down.mp3", bgPos: "right", bgZoom: 1.5 },
            { n: "我", t: "葛蕾，別發呆了。有份緊急帳目需要處理。", a: "me",shake:true},
            { n: "系統", t: "（在觸及帳冊的瞬間，葛蕾眼眼中閃過銳利的光芒）", a: "system", flash: true, flashSFX: "flash.mp3" },
            { n: "葛蕾", t: "（她一把搶過帳冊，指尖飛速翻動）五個港口，四十筆數據……多管。嫌事。", a: "glea", se: "paper down.mp3",shake:true },
            { n: "葛蕾", t: "（語速恢復了精準的節奏）要求什麼維度？快說。別浪費我的分析時間。", a: "glea",shake:true  },

            { n: "賽爾", t: "（從書裡鑽出來）葛蕾這副樣子，簡直像被重新注入魔力的石像呢。開始吧！", a: "fairy"
            , se: "fairy_infosmile.mp3", bgPos: "center", bgZoom: 1.1,flash: true, flashSFX: "boom.mp3", vol: 1.0}],
        
        discovery_PIVOT_CREATE: [
            { n: "賽爾", t: "這種『碎數據看全局』的需求，最適合用[[樞紐分析表|gold]]。點擊插入區，開啟【樞紐分析表】。", a: "fairy" },
            { n: "賽爾", t: "記得：按住「港口」[[拉進|gold]]列區域，「貨物類別」[[拉進|gold]]欄區域，「金額」[[拉進|gold]]值區域。上帝視角即刻解鎖！", a: "fairy" }
        ],
        success_PIVOT_CREATE: [
            { n: "我", t: "（配置完畢。雜亂的流水帳瞬間變成了一張清晰的二維矩陣。）", a: "me" },
            { n: "葛蕾", t: "（她盯著那些數據，手指在桌面上無意識地敲擊，語氣裡滿是驚訝）……效率驚人。直接跳過了底層運算完成了聚合？", a: "glea", shake: true },
            { n: "葛蕾", t: "……效率驚人。直接跳過了底層運算完成了聚合？", a: "glea", shake: true },
            { n: "葛蕾", t: "（似乎覺得自己表現得太過驚訝，連忙別過臉去。空氣安靜了幾秒，才傳來她那輕得像蚊子嗡嗡般的聲音)", a: "glea" },
            { n: "葛蕾", t: "(空氣安靜了幾秒，才傳來她那輕得像蚊子嗡嗡般的聲音)……幹得好。", a: "glea" }
        ],

        mid_story: [
            { n: "商人", t: "（他看著那張清晰的矩陣，眼睛都亮了，猛地一拍大腿）", a: "npc1", shake: true },
            { n: "商人", t: "這太棒了！不過，能不能再幫我算算每個港口『平均』每筆賣出去多少錢？", a: "npc1", shake: true },
            { n: "葛蕾", t: "（看向主角，嘴角勾起一抹帶著挑戰意味的弧度）平均值。換一個匯總函數的事。你應該會吧？", a: "glea" },
            { n: "葛蕾", t: "平均值。只要換個算數的方式就成了。應該難你不倒吧？", a: "glea" },
            { n: "系統", t: "（話音剛落，葛蕾那隻修長的手突然伸了過來。）", a: "system", se: "clothes1.mp3" },
            { n: "系統", t: "（從懷裡摸出一塊包得精緻的特產糕點，直接塞進了我的手心裡。）", a: "system", se: "clothes1.mp3" },
            { n: "葛蕾", t: "(別過頭，語氣還是一貫的強硬", a: "glea" },
            { n: "葛蕾", t: "……這是剛才那商人給的定金。我不愛吃甜的，拿去吧，別在那兒磨蹭，擋住我看螢幕了。", a: "glea" },
            { n: "賽爾", t: "（小聲嘀咕）那是她昨晚在碼頭特意買的特色點心耶，本仙子明明看到她挑了很久……", a: "fairy" },
            { n: "葛蕾", t: "（她猛地回頭，一掌拍在木桶上，力道大得讓上面的木屑都抖了抖，聲音顯得又急又躁）賽爾！閉嘴！幹活！", a: "glea", shake: true },
            { n: "葛蕾", t: "賽爾！閉嘴！幹活！", a: "glea", shake: true }
        ],

        discovery_PIVOT_METHOD: [
            { n: "賽爾", t: "雙擊左上角帶有金色高亮的欄位標題，進入[[值欄位設定|gold]]。", a: "fairy" },
            { n: "賽爾", t: "把「求和」改成「平均值」。", a: "fairy" }
        ],
        success_PIVOT_METHOD: [
            { n: "我", t: "（數據更新。表格展示了平均交易價值。）", a: "me" },
            { n: "商人", t: "太感謝了！最後一個要求……能不能按『季度』幫我把這些數據分組看看？", a: "npc1" },
            { n: "商人", t: "我想知道這些錢是在什麼時候流入的。", a: "npc1" }
        ],

        discovery_PIVOT_GROUP: [
            { n: "賽爾", t: "最後一步，我們要按[[季度|gold]]觀察。但現在報表裡還沒有[[時間欄位|gold]]呢。", a: "fairy" },
            { n: "賽爾", t: "再次開啟[[樞紐分析表|gold]]，把[[「月份」|gold]]拉進欄區域。然後對著下方[[金色高亮的月份標題|gold]]點右鍵，施展[[組成群組|gold]]！", a: "fairy" }
        ],
        success_PIVOT_GROUP: [
            { n: "我", t: "（分組完成。一到六月併入了兩個季度。）", a: "me" },
            { n: "葛蕾", t: "（看著結果，嘴角露出極淡的弧度）", a: "glea" },
            { n: "葛蕾", t: "完成。不改變底層，只改變維度。這招很強。", a: "glea" }
        ],

        end: [
            { n: "系統", t: "（入夜。商人高興地帶著帳冊走了，留下了滿滿一籃熱騰騰的當地烤魚和乾糧。）", a: "system"
            , bgm: "goofy.mp3",bg:"bg6_boat night.png", bgPos: "center", bgZoom: 1.5 , bgDur:"8s"},
            { n: "米羅", t: "（終於擺脫了暈船，兩眼放光地抓起烤魚）嗚喔喔喔！活過來了！這魚也太香了吧！", a: "miro", shake: true
            , se: "boy_wa.mp3", vol: 1.0},
            { n: "夏特", t: "（用手帕墊著，動作優雅地撕開餅乾）", a: "chate", se: "paper down.mp3", vol: 1.0},
            { n: "夏特", t: "米羅，你的吃相讓我有種跟野獸同行的錯覺。注意點，魚骨頭別噴到甲板上。", a: "chate", se: "lowsmile.mp3", vol: 1.0 },
            { n: "米羅", t: "（含糊不清）管他什麼野獸……這可是葛蕾姊算出來的勝利果實啊！", a: "miro" },
            { n: "米羅", t: "夏特你這傢伙還不是在偷吃！", a: "miro",shake:true, bgPos: "left", bgZoom: 1.1},
            { n: "夏特", t: "（挑了挑眉，語氣平靜）這叫品鑑。而且，如果沒有我盯著數據排版，這張表根本沒法看。", a: "chate", se: "boy_attraction.mp3", vol: 1.0},
            { n: "葛蕾", t: "（手裡拿著筆記，正快速地寫著什麼）……幼稚。", a: "glea", bgPos: "left", bgZoom: 2.0, se: "paper down.mp3", vol: 1.0},
            { n: "我", t: "（我走過去看了一眼）明天的清單列好了!", a: "me", bgm: "finish.mp3",flash: true, flashSFX: "bell.mp3", vol: 1.0},
            { n: "葛蕾", t: "（停下筆，沉默了片刻）……嗯。", a: "glea", se: "pen.mp3", vol: 1.0 },
            { n: "葛蕾", t: "第一條是：盯好那本魔導書，別讓賽爾又把墨水灑在重要記錄上。"
            , a: "glea",bg:"CG/ch6 glea.png",flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.1},
            { n: "葛蕾", t: "（她看向主角，語氣依然生硬卻透著溫度）", a: "glea", bgPos: "center", bgZoom: 1.5 , bgDur:"8s"},
            { n: "葛蕾", t: "畢竟現在有人幫我找活幹，要是連工具都壞了，會很困擾。", a: "glea" },

            { n: "系統", t: "（江風微涼。五個人就這樣坐在甲板上。雖然彼此嫌棄，但沒人打算離開。）", a: "system"
            ,bg:"CG/ch6 all.png", bgPos: "center", bgZoom: 1.1, bgDur: "10s" , bgm: "sweet.mp3"},
            { n: "賽爾", t: "（在眾人頭頂盤旋）餵！給我留點肉乾啊！你們這些自私的人類！", a: "fairy", bgPos: "top", bgZoom: 2.0 , shake:true},
            { n: "米羅", t: "賽爾妳又不吃飯！過來幫我吹吹風啦，我又有點暈了……", a: "miro",flash: true, flashSFX: "flash.mp3", vol: 1.0,bgPos: "top", bgZoom: 1.5 },
            { n: "夏特", t: "（嘆了口氣，卻默默遞給米羅一塊手帕）……廢物。",a: "chate", bgPos: "left", bgZoom: 2.0, bgDur:"2s" },
            { n: "葛蕾", t: "（看著吵鬧的眾人，嘴角極細微地牽動了一下，隨即又恢復了嚴肅）", a: "glea", bgPos: "right", bgZoom: 1.5,bgDur:"2s" },
            { n: "我", t: "（我看著這一幕。是什麼時候變成這樣的呢。）", a: "me", bgPos: "center", bgZoom: 1.1,bgDur:"10s"
            ,bgm:"no.mp3", se:"sea.mp3"},
            { n: "我", t: "（上一次獨自一人趕路，好像已經是很久以前的事了。）", a: "me",bgm:"sweet2.mp3"},
            { n: "我", t: "（看著這群人……我突然覺得，有大家在就夠了。）", a: "me" },
            { n: "系統", t: "（江水奔流不息。五個人的影子交疊在一起。）", a: "system",bg:"CG/ch6 last.png", bgPos: "right", bgZoom: 1.5,bgDur:"5s", se:"sea.mp3"},
            { n: "系統", t: "（木船載著這群靈魂，緩緩駛入了主城外港的燈火之中。）", a: "system" }
        ],

        fail_PIVOT_wrong: [ { n: "賽爾", t: "「欄位放錯位置了喔！港口去列，類別去欄，金額去值。再試一次！」", a: "fairy" } ],
        fail_METHOD_wrong: [ { n: "賽爾", t: "「切換成『平均值』，這才是商人想看的關鍵數據。」", a: "fairy" } ],
        fail_GROUP_wrong: [ { n: "賽爾", t: "「選中月份點進右鍵，準確地選取『季度』分組吧！」", a: "fairy" } ]
    },

    simulator: {
        bgm: "BGM/game_bgm.mp3",
        tasks: [
            {
                id: "PIVOT_CREATE_TASK",
                tutorHint: "點擊插入→樞紐分析表→ 確定 → 將「港口」拉到[[列|gold]]，「貨物類別」拉到[[欄|gold]]，「金額」拉到[[值|gold]]。",
                playerText: "葛蕾需要指令。用透視表把這疊亂帳重新組合成上帝視角。",
                unlockBtnId: "insert_group",
                unlockSkillId: "PIVOT_CREATE",
                tab: "insert",
                expectedCondition: { type: "ACTION", actionId: "PIVOT_CREATE" },
                storySegmentBefore: "discovery_PIVOT_CREATE",
                storySegmentAfter: "success_PIVOT_CREATE",
                midStoryAfter: "mid_story"
            },
            {
                id: "PIVOT_METHOD_TASK",
                tutorHint: "雙擊左上角儲存格的欄位名稱 → 把「求和」改成「平均值」。",
                playerText: "同一張表換個角度。把統計方式從總和切換成平均值。",
                unlockBtnId: "insert_group",
                unlockSkillId: "PIVOT_METHOD",
                tab: "insert",
                expectedCondition: { type: "ACTION", actionId: "PIVOT_METHOD_CHANGE" },
                storySegmentBefore: "discovery_PIVOT_METHOD",
                storySegmentAfter: "success_PIVOT_METHOD"
            },
            {
                id: "PIVOT_GROUP",
                tutorHint: "[[樞紐分析表|gold]]→ 將[[「月份」|gold]]拉進欄區域 → 確定 → 右鍵點擊報表中的月份標題([[金色高亮的月份標題|gold]]) → [[組成群組|gold]]→ 季度。",
                playerText: "把月份摺疊成季度趨勢。先在配置面板加入時間欄位，再執行群組魔法。",
                unlockBtnId: "insert_group",
                unlockSkillId: "PIVOT_GROUP",
                tab: "insert",
                expectedCondition: { type: "ACTION", actionId: "PIVOT_GROUP_APPLY" },
                storySegmentBefore: "discovery_PIVOT_GROUP",
                storySegmentAfter: "success_PIVOT_GROUP"
            }
        ]
    }
};
