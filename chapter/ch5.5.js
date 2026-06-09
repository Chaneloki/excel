/**
 * 試算表魔法冒險 v2 - 第 5.5 章【金穗鎮的帳】
 * 挑戰模式：無引導，使用彈窗試煉
 *
 * 故事定位：
 * - 銜接 ch5 結尾（村正提到金穗鎮管事的姑娘出了麻煩）
 * - 開場為王子視角碎片場景（背影立繪 + 神秘人物）
 * - 帳目被人動過手腳，主角用技術還原真相
 * - 章末收到皇宮邀請信 → 葛蕾正式決定入隊
 * - 葛蕾的離開是主動選擇，不是被說服
 *
 * 教學內容（挑戰模式，與 ch5 完全相同）：
 * 單層分類匯總(小計) → 嵌套匯總(多層小計) → 資料驗證
 */

const generateCh5_5Data = () => {
    const dates = [
        "三月初一", "三月初二", "三月初三", "三月初四", "三月初五",
        "三月初六", "三月初七", "三月初八", "三月初九", "三月初十",
        "三月十一", "三月十二", "三月十三", "三月十四", "三月十五"
    ];
    const registrars = ["葛蕾", "阿穗", "阿禾"];
    const categories = ["糧食", "藥材", "布匹", "淨水符", "工具"];
    const posts = ["東區安置點", "西區安置點", "南區安置點", "北區安置點"];
    const statuses = ["已簽收", "已簽收", "已簽收", "待簽收"];

    // ── 被竄改的條目（由「外派員」登記，數量異常偏高）──
    const tamperedRows = [
        { id: 6,  date: "三月初三", reg: "外派員", cat: "糧食",   qty: 95, post: "東區安置點", stat: "已簽收" },
        { id: 14, date: "三月初七", reg: "外派員", cat: "藥材",   qty: 80, post: "西區安置點", stat: "已簽收" },
        { id: 21, date: "三月十一", reg: "外派員", cat: "糧食",   qty: 88, post: "南區安置點", stat: "已簽收" },
        { id: 27, date: "三月十四", reg: "外派員", cat: "布匹",   qty: 72, post: "北區安置點", stat: "已簽收" }
    ];

    const rows = [["編號", "登記日期", "登記人", "物資類別", "數量", "接收據點", "簽收狀態"]];

    let normalIdx = 0;
    const normalPool = [];
    for (let i = 0; i < 30; i++) {
        normalPool.push({
            date: dates[Math.floor(Math.random() * dates.length)],
            reg:  registrars[Math.floor(Math.random() * registrars.length)],
            cat:  categories[Math.floor(Math.random() * categories.length)],
            qty:  2 + Math.floor(Math.random() * 18),
            post: posts[Math.floor(Math.random() * posts.length)],
            stat: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }

    for (let i = 0; i < 30; i++) {
        const rIdx = i + 1;
        const tampered = tamperedRows.find(t => t.id === rIdx);
        if (tampered) {
            rows.push([tampered.id, tampered.date, tampered.reg, tampered.cat, tampered.qty, tampered.post, tampered.stat]);
        } else {
            const n = normalPool[normalIdx++];
            rows.push([rIdx, n.date, n.reg, n.cat, n.qty, n.post, n.stat]);
        }
    }
    return rows;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["55"] = {
    meta: {
        title: "第 5.5 章：金穗鎮的帳",
        sheetName: "📋 難民安置物資帳目",
        reward: 2800
    },

    initialGridData: generateCh5_5Data(),

    skillDefs: {
        SORT_SIMPLE:     { n: "排序",   s: "開始→排序和篩選",  d: "按單一欄位快速排列所有資料",       cat: "start", icon: "icon/sort&filter.png" },
        SUBTOTAL:        { n: "小計", s: "資料→小計",   d: "依一個欄位分組，自動算出每組的小計與總計", cat: "data", icon: "icon/小計.png" },
        SUBTOTAL_NESTED: { n: "嵌套小計",     s: "資料→小計（取消「取代目前小計」）", d: "在既有小計之上，再疊一層更細的分組匯總", cat: "data", icon: "icon/小計.png" },
        VALIDATION:      { n: "資料驗證",     s: "資料→資料驗證", d: "替欄位設規則，從源頭擋下錯誤的輸入", cat: "data", icon: "icon/資料check.png" }
    },

    story: {

        start: [
            { n: "系統", t: "（房間安靜得讓人有些發冷。）", a: "system", bg: "CG/ch5.5 head.png"
            , bgm: "conspiracy.mp3", bgPos: "bottom", bgZoom: 2.0,bgBlur: 20},
            { n: "系統", t: "（窗外的光影在地板上靜靜挪動，感受不到半絲風的流動。）", a: "system"
            , env: "light/1", envFrames: 25, envspeed:40, envOpacity: 0.2, envDrift:true, bgPos: "center", bgZoom: 1.1 , bgDur:"10s",bgBlur: 20 },
            { n: "???", t: "金穗鎮那邊，交給你。", a: "head",bgBlur: 10},
            { n: "???", t: "（沉默了半晌）知道了。", a: "unknown_figure",bgBlur: 10},
            { n: "???", t: "你去的話，小心一點。", a: "head", bgPos: "left bottom",bgBlur: 10},
            { n: "系統", t: "（那個人沒有回話，只是停在門口的腳步略微頓了一下。）", a: "system", bgPos: "center bottom", bgZoom: 1.5,bgBlur: 5},
            { n: "系統", t: "（木門合上的聲音很輕，室內的光影依舊，彷彿什麼都沒有變。）", a: "system",bgBlur: 5 },
            { n: "系統", t: "（兩天後。金穗鎮。）", a: "system", bg: "bg5.5.png", bgm: "winter.mp3"
            ,env:null, bgPos: "center", bgZoom: 1.1 , bgDur:"10s"},
            { n: "我", t: "（上一次來這裡的時候，廣場上還堆滿了為了豐收祭而準備的鮮艷橫幅。）", a: "me"},
            { n: "我", t: "（現在那些燦爛的色彩都不見了，取而代之的是一排排灰濛濛的臨時帳篷。）", a: "me"
            , env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.2, envDrift:true},

            { n: "米羅", t: "這裡就是金穗鎮？", a: "miro", bgPos: "center", bgZoom: 1.5},
            { n: "米羅", t: "看起來與其說是小鎮，倒更像是個龐大的難民安置點。", a: "miro"},
            { n: "夏特", t: "（白金披風在晨風中微微飄動）撥款一旦斷絕，鎮子就得自己想辦法在亂世求生。", a: "chate", bgPos: "left"},
            { n: "夏特", t: "在哪裡都一樣。", a: "chate" },

            { n: "鎮民甲", t: "（揉了揉眼睛，認出你後驚叫出聲）啊！你不就是上次幫忙整理名冊的那位！", a: "npc1", bgm: "bad things.mp3",shake:true},
            { n: "我", t: "大叔好。聽說這邊最近出了點岔子？", a: "me",se: "girl_en1.mp3", vol: 1.0 },
            { n: "鎮民甲", t: "（臉色瞬間沉了下來）唉，葛蕾姑娘這次是攤上大麻煩了。", a: "npc1",se: "man ha.mp3", vol: 1.0 
            , bgPos: "center", bgZoom: 1.1},
            { n: "鎮民甲", t: "帳目對不上。上頭派來的審查員硬說帳上的數字比實際物資多了不少。", a: "npc1"
            ,bg:"CG/ch5.5 comic.png", bgPos: "left bottom", bgZoom: 1.5},
            { n: "鎮民甲", t: "說是物資去向不明，葛蕾姑娘難辭其咎。", a: "npc1"
            , bgPos: "top", bgZoom: 1.5 , flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "我", t: "（我皺了皺眉。雖然相處時間不長，但我知道葛蕾絕不是那種人。）", a: "me"
            ,se: "girl_annoyed.mp3", vol: 1.0,bg:"bg5.5.png"},
            { n: "鎮民甲", t: "大家心裡都信她，可在那白紙黑字的帳冊面前，誰也拿不出證明她是清白的證據。", a: "npc1"},
            { n: "我", t: "她現在人在哪裡？", a: "me"
            ,bg:"bg5.5.png",flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.0 , bgDur:"2s"},
            { n: "鎮民甲", t: "就在廣場盡頭那頂最大的辦公帳篷裡。", a: "npc1"},
            { n: "鎮民甲", t: "不過……她現在可能誰也不想見。", a: "npc1", bgPos: "center", bgZoom: 1.5 , bgDur:"5s"},

            { n: "賽爾", t: "既然是別有用心的詭計，這關就由你獨自應對。", a: "fairy" },
            { n: "賽爾", t: "本仙子在旁邊盯著。 ", a: "fairy" },

            { n: "系統", t: "（掀開帳篷，一股墨水與蠟燭燃燒後的氣味撲面而來。）", a: "system"
            , bg: "CG/ch5.5_tent.png",se: "paper down.mp3", vol: 1.0, bgm: "kingdom sad.mp3",env:null},
            { n: "系統", t: "（葛蕾依舊坐在那張凌亂的桌前，眼下的青黑濃得有些嚇人。）", a: "system", bgPos: "top", bgZoom: 1.1 , bgDur:"5s"},

            { n: "葛蕾", t: "三月初七，藥材八十。", a: "glea",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "葛蕾", t: "這個數字無論怎麼算都對不上，可我就是抓不住那個原因。", a: "glea", shake:true},
            { n: "我", t: "葛蕾。", a: "me", bgPos: "center", bgZoom: 1.1,bg:"bg5.5.png"},
            { n: "葛蕾", t: "（她猛地抬頭，看清是你後，下意識地將桌上最亂的一疊帳冊推向暗處。）", a: "glea"
            ,flash:true, flashSFX: "bell.mp3", vol: 1.0,shake:true, bg: "CG/ch5.5_tent.png"},
            { n: "葛蕾", t: "你怎麼來了？", a: "glea"},
            { n: "我", t: "路過。順便聽到了一些不大好聽的消息。", a: "me",bg:"bg5.5.png"},
            { n: "葛蕾", t: "（嘴唇抿成一條線）熱紅茶還沒來得及泡，你這傢伙來得真不是時候。", a: "glea", bg: "CG/ch5.5_tent.png"},
            { n: "我", t: "茶可以等會兒再說。", a: "me" ,bg:"bg5.5.png"},
            { n: "我", t: "先告訴我，你這邊具體是怎麼回事。", a: "me", bgPos: "center", bgZoom: 1.5},
            { n: "葛蕾", t: "帳目裡混進了幾個不該出現的數字。", a: "glea", bg: "CG/ch5.5_tent.png" },
            { n: "葛蕾", t: "我在查。這沒什麼大不了的。", a: "glea",flash: true, flashSFX: "flash.mp3", vol: 1.0},

            { n: "米羅", t: "（小心翼翼地從帳篷外探進頭來）隊長？", a: "miro"
            ,bg:"bg5.5.png",se: "clothes1.mp3", vol: 1.1, bgPos: "left", bgZoom: 1.5 , bgDur:"2s"},
            { n: "我", t: "這是米羅，我們隊上的記帳高手。", a: "me", bgPos: "center", bgZoom: 1.5},
            { n: "葛蕾", t: "（簡短地掃了一眼，語氣依舊俐落）葛蕾。", a: "glea",se: "girl_en1.mp3", vol: 1.0},
            { n: "夏特", t: "（也跟著走進來，眼睛掃過那一堆疊如山的紙張）三十筆流水帳，你要全靠肉眼去翻？", a: "chate"
            , bgPos: "right", bgZoom: 1.1 , bgDur:"2s"},
            { n: "葛蕾", t: "這位是？", a: "glea"},
            { n: "夏特", t: "夏特。隊上負責讓這世間萬物變得稍微優雅好看一些的人。 ", a: "chate",se: "boy_attraction.mp3", vol: 1.0   },
            { n: "葛蕾", t: "優雅？這東西在金穗鎮連一口飽飯都換不來。", a: "glea",se: "girl_underest.mp3", vol: 1.0
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0},

            { n: "我", t: "葛蕾，那本帳冊先借我看看。", a: "me"},
            { n: "葛蕾", t: "（看著我手中的魔導書）你上次就是用這本古怪的書幫我整好名冊的。", a: "glea" },
            { n: "我", t: "對，這一次它同樣能發揮作用。", a: "me",se: "girl_en1.mp3", vol: 1.0   },
            { n: "葛蕾", t: "（指節在桌面上敲擊了一下）行吧。反正你來都來了。", a: "glea",se: "put down.mp3", vol: 1.0,shake:true},
            { n: "葛蕾", t: "三十筆出入記錄，橫跨了半個月的時間。", a: "glea",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "葛蕾", t: "那個差額就像藏在森林裡的針，我怎麼也找不到。", a: "glea" },
            { n: "我", t: "數據能用。", a: "me" , bgPos: "center", bgZoom: 1.5},
            { n: "我", t: "如果是逐行核對，當然會陷入迷霧之中。", a: "me" },
            { n: "我", t: "我們得施展魔法將它徹底拆開。 ", a: "me",flash: true, flashSFX: "boom.mp3", vol: 1.0}
        ],

        success_SUBTOTAL: [
            { n: "我", t: "[[分類匯總魔法|gold]]完成了。", a: "me" },
            { n: "我", t: "每一類物資的發放總量，現在已經是一目了然了。", a: "me" },
            { n: "我", t: "葛蕾，你看看這筆「糧食」類的總量合計。", a: "me" },
            { n: "葛蕾", t: "（瞳孔微微收縮）這不可能。", a: "glea" },
            { n: "葛蕾", t: "這段時間糧食的正常消耗頂多就一百出頭。", a: "glea" },
            { n: "葛蕾", t: "這份清單顯示的數字，竟然比所有其他類別加起來還要誇張。 ", a: "glea" },
            { n: "夏特", t: "藥材這欄也呈現出同樣的病態。", a: "chate" },
            { n: "夏特", t: "八十單位。這種數量，足夠讓一整個據點撐過三個月的寒冬了。", a: "chate" },
            { n: "我", t: "現在糾結「多了多少」已經沒有意義了，問題在於「是誰登記的」。", a: "me" },
            { n: "葛蕾", t: "你的意思是……有人在我的眼皮底下，故意灌入了這些虛假的數字？", a: "glea" },
            { n: "我", t: "帳目確實被動了手腳。剛才是按「類別」分組。", a: "me" },
            { n: "如果我們能再疊加一層[[嵌套魔法|gold]]，按「登記人」將它拆開看——", a: "me" },
            { n: "葛蕾", t: "我也就能一眼揪出，到底是誰在登記時耍了這些下三濫的小聰明。", a: "glea" }
        ],

        mid_story: [
            { n: "葛蕾", t: "（聲音壓得極低，帶著一絲不易察覺的疲憊）三天。", a: "glea" },
            { n: "葛蕾", t: "我在這裡翻了整整三天，一筆一筆地運算，一行一行地比對。 ", a: "glea" },
            { n: "葛蕾", t: "其實我早就感覺到有幾筆帳不對勁，可我死活找不到那種規律。 ", a: "glea" },
            { n: "葛蕾", t: "沒想到，你只用了一個區區的「小計」魔法，就讓真相自己浮出了水面。", a: "glea" },
            { n: "我", t: "這不過是工具運用的差別而已。", a: "me" },
            { n: "我", t: "你能靠直覺察覺到其中的違和感，這份敏銳其實比任何魔法都要快。", a: "me" },
            { n: "葛蕾", t: "（撇過頭去）少在那裡說好聽話了。告訴我，接下來該怎麼做？", a: "glea" }
        ],

        success_SUBTOTAL_NESTED: [
            { n: "我", t: "第二層[[嵌套小計|gold]]施展完畢。", a: "me" },
            { n: "我", t: "現在每個登記人的經手數量，都被清清楚楚地標記了出來。", a: "me" },
            { n: "我", t: "看這裡。在糧食類別下，有一個叫「外派員」的角色。 ", a: "me" },
            { n: "我", t: "他一個人的登記量就高達一百八十多個單位。", a: "me" },
            { n: "葛蕾", t: "外派員。", a: "glea" },
            { n: "葛蕾", t: "就在審查員到來的前幾天，上面確實派了一個人過來，說是幫忙分擔雜務。", a: "glea" },
            { n: "葛蕾", t: "那個人走的時候還特意向我交代，說帳冊交接無誤，叫我不必再操心。", a: "glea" },
            { n: "葛蕾", t: "（五指猛地攥緊了拳頭，關節隱隱發白）而我，竟然真的在那時候放下了戒備。 ", a: "glea" },
            { n: "夏特", t: "先由特定的人灌入假帳，再由特定的人過來查帳。", a: "chate" },
            { n: "夏特", t: "這份「默契」真是天衣無縫。", a: "chate" },
            { n: "葛蕾", t: "不管是誰想要這頂黑鍋，我都絕不接受。帳目我現在就改回來。 ", a: "glea" },
            { n: "葛蕾", t: "除此之外，我還要給這份帳冊加上一道任何人都打不開的鎖。 ", a: "glea" },
            { n: "葛蕾", t: "以後任何人都別想再往裡面塞入這種荒謬的數字。", a: "glea" },
            { n: "我", t: "這正是[[資料驗證禁術|gold]]發揮效用的時刻。", a: "me" },
            { n: "我", t: "我們只需要設定一個合理的上限，所有超出規矩的數字，都會被這道門鎖攔下。", a: "me" },
            { n: "葛蕾", t: "快。現在就施展這道魔法。", a: "glea" }
        ],

        success_VALIDATION: [
            { n: "我", t: "[[驗證鎖|gold]]已經設好了。", a: "me" },
            { n: "我", t: "嘗試輸入「95」——你看，系統瞬間就跳出了紅色的警告。 ", a: "me" },
            { n: "葛蕾", t: "這下子，連他們最後的退路都徹底堵死了。", a: "glea" },
            { n: "米羅", t: "以後就算真的再有人想灌假帳，也絕對過不了這道鋼鐵般的關卡了。", a: "miro" },
            { n: "夏特", t: "（抱著雙臂，難得露出了一絲讚許的神色）從源頭斬斷混亂。", a: "chate" },
            { n: "夏特", t: "這比起事後的辛苦追查，確實要乾淨俐落得多。 ", a: "chate" }
        ],

        end: [
            { n: "系統", t: "（帳篷外的風聲漸漸止了。）", bg: "bg5.5.png", a: "system", bgm: "finish.mp3", bgPos: "left", bgZoom: 1.1 , bgDur:"10s"},
            { n: "系統", t: "（葛蕾推開門簾走出，身後是那頂依舊殘留著墨水與蠟燭焦味的辦公帳篷。）", a: "system", se: "clothes1.mp3", vol: 1.0 },
            { n: "葛蕾", t: "（她毫不客氣地將那疊厚重且修正過的帳冊塞進了管事的手裡，動作利落得不帶一絲猶豫。）", a: "glea"
            , se: "paper down.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5},
            { n: "葛蕾", t: "查清了。這上面每一處惡意的竄改，現在都白紙黑字列得清清楚楚。", a: "glea",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "葛蕾", t: "拿去給那個審查員看。告訴他，金穗鎮的帳，不是隨便什麼人都能動得了的。", a: "glea",shake:true},

            { n: "系統", t: "（就在這時，一陣急促且沈重的馬蹄聲敲碎了營地的寧靜。）", a: "system"
            , se: "horse run.mp3", vol: 1.0, env: "horse run/1", envFrames: 24, envspeed:80, envOpacity: 1.0, envDrift:true},
            { n: "系統", t: "（煙塵滾滾中，一名身著官制披風的信使勒馬而立。）", a: "system",env:null},
            { n: "信使", t: "（信使那雙帶著審視意味的目光掃過眾人，最後精準地定格在魔導書上。）",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "信使", t: "請問，哪位是那本《試算表魔導書》正式持有者？", bgPos: "right", bgZoom: 1.1},
            { n: "我", t: "是我。有何貴幹？", a: "me", se: "girl_en1.mp3", vol: 1.0, bgPos: "left", bgZoom: 1.1},
            { n: "信使", t: "（他翻身下馬，恭敬地呈上一封厚重的信函。）" , se: "paper down.mp3", vol: 1.0,shake:true},
            { n: "信使", t: "（那上面的燙金封蠟在夕陽下閃爍著令人不安的輝光。）", bgPos: "center", bgZoom: 1.1,bgDur:"10s"},
            { n: "信使", t: "皇宮典儀廳親筆相邀。諸位在各地的義舉已傳至王城。" },
            { n: "信使", t: "若能前往一敘，食宿行程皆由皇室全額供奉。"},

            { n: "系統", t: "（信使轉身離去。空氣中陷入了一種近乎壓抑的死寂。）", a: "system" },
            { n: "系統", t: "（葛蕾接過信函，指尖在那枚精緻的封蠟上緩緩摩挲過。）", a: "system" },
            { n: "葛蕾", t: "（她的語氣依舊平靜）這封信來得倒是真快。", a: "glea" },
            { n: "我", t: "（我看著那封信，心頭微微一沉）先收起來吧。", a: "me", se: "girl_en1.mp3", vol: 1.0  },
            { n: "我", t: "這背後的深水，我們到了官道上再行商量。", a: "me" },

            { n: "葛蕾", t: "（她忽然抬起頭，目光銳利如刃）你們接下來，打算往哪個方向走？", a: "glea", bgm: "goofy.mp3"
            , se: "girl_attraction.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5},
            { n: "我", t: "暫時還沒定論。不過，既然王城盛情難卻，我們也該去看看那座權力中心的真面目。", a: "me" , se: "girl_ow.mp3", vol: 1.0 },
            { n: "葛蕾", t: "（指尖在桌沿輕輕一敲，發出清脆的、不容置疑的聲響）既然如此，帶上我一起走。", a: "glea", se: "put down.mp3", vol: 1.0 
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "米羅", t: "（猛地愣住）誒？葛蕾姑娘……你要離開金穗鎮？", a: "miro" , se: "boy_ah1.mp3", vol: 1.0,shake:true},
            { n: "葛蕾", t: "（她利落地收拾起行囊說道）這不是在尋求你們的庇護。", a: "glea" , se: "clothes1.mp3", vol: 1.0
            , bgPos: "right", bgZoom: 1.1 , bgDur:"10s",bg:"CG/ch5.5 join.png"},
            { n: "葛蕾", t: "而是等價交換。", a: "glea" },
            { n: "葛蕾", t: "我看過你們這支隊伍了。有強大的禁術，敏銳的眼光，還有個還算細心的記帳員。", a: "glea" },
            { n: "葛蕾", t: "但若想在那座吃人不吐骨頭的王城立足，還缺一個能將萬千物資調度得精準的人。",bg:"bg3 kingdom.png"
            , bgPos: "center", bgZoom: 1.5,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "葛蕾", t: "金穗鎮的日常我已交代妥當", a: "glea",bg:"bg5.5.png", bgPos: "left", bgZoom: 1.1 , bgDur:"10s",bg:"CG/ch5.5 join.png"},
            { n: "葛蕾", t: "她們即便沒有我，靠著那幾道『驗證禁術』也能再撐一年半載。", a: "glea" },
            { n: "葛蕾", t: "留在這裡，我終究會在那種低劣的權力博弈下枯萎。", a: "glea" },
            { n: "葛蕾",t: "唯有去到更高、更混亂的地方，我的『能力』才有真正的發揮餘地。", a: "glea"},
            { n: "葛蕾",t: "我需要弄清楚是誰在大幕後動我的帳，而你們，需要一個最頂尖的後勤官。", a: "glea" },
            { n: "葛蕾",t: "這就叫各取所需。", a: "glea",shake:true},
            { n: "葛蕾", t: "（她繫好包裹，直起身子，眼神中透著一種近乎執拗的強悍）", a: "glea", se: "clothes1.mp3", vol: 1.0  },
            { n: "葛蕾", t: "實力才是這亂世中唯一的硬通貨。這筆買賣，夠簡單明瞭了吧？", a: "glea", se: "girl_attraction.mp3", vol: 1.0
            ,flash: true, flashSFX: "bell.mp3", vol: 1.0},
            { n: "夏特", t: "（夏特站在光影交界處，嘴角勾起一抹極其罕見的弧度）", a: "chate", se: "boy_smile.mp3", vol: 1.0
            , bgPos: "center", bgZoom: 1.1,bg:"bg5.5.png"},
            { n: "夏特", t: "『實力交換』。這可真是我聽過最為硬核且優雅的入隊說辭了。", a: "chate" },
            { n: "我", t: "（我忍不住笑了）這話聽起來怎麼這麼耳熟？", a: "me" , se: "fairy_smile.mp3", vol: 1.0,shake:true, bgPos: "left", bgZoom: 1.1},
            { n: "米羅", t: "上次夏特先生加入的時候，好像也是類似的藉口……說什麼『剛好合適』。", a: "miro", bgPos: "right", bgZoom: 1.5 , bgDur:"2s"},
            { n: "夏特", t: "（挑了挑眉，語氣從容）這不叫藉口，記帳的。這叫智者之間不謀而合的共識。", a: "chate", bgPos: "center", bgZoom: 1.1 , bgDur:"4s"},
            { n: "葛蕾", t: "（冷哼一聲，背起行囊便往外走）", a: "glea" , bgPos: "left", bgZoom: 1.5},
            { n: "葛蕾", t: "誰跟你有共識？我是去幹活的，你是去負責好看的。這能一樣嗎？", a: "glea", se:"girl_underest.mp3", vol: 1.0,shake:true},
            { n: "夏特", t: "（被噎了一下，難得沒有立刻還嘴）……", a: "chate"},
            { n: "賽爾", t: "（在魔導書的扉頁裡笑得打滾）哈哈哈哈！銀毛孔雀遇到剋星了！", a: "fairy", se:"fairy_laugh.mp3", vol: 1.0,shake:true },
            { n: "賽爾", t: "本仙子對這個新來的守門人非常滿意！", a: "fairy" },

            { n: "系統", t: "（夕陽的餘暉將五個人的影子拉得極長。）", a: "system", bg: "road dust.png", bgm: "sweet2.mp3", bgPos: "center", bgZoom: 1.5 , bgDur:"10s"},
            { n: "系統", t: "（在那片漸漸模糊的暮色中，他們緩緩離開了這片重歸秩序的金穗鎮。）", a: "system",se:"horse run.mp3",vol:1.0},
            { n: "系統", t: "（走出鎮門的那一刻，葛蕾回頭望向那片金色的麥田，看了很久。）", a: "system",bg:"CG/ch5.5 road.png",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "系統", t: "（隨後她毅然轉身，腳步踏在官道的塵土上，再無半點遲疑。）", a: "system", se:"clothes1.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.1}
        ],

        fail_SUBTOTAL_wrong: [
            { n: "葛蕾", t: "分組的欄位完全不對。我們要看的是每一類「物資」的總數。", a: "glea" },
            { n: "我", t: "你說得對。應該以物資類別作為分組依據。", a: "me" }
        ],
        fail_SUBTOTAL_NESTED_wrong: [
            { n: "葛蕾", t: "這次得按「登記人」再細拆一層。記得取消勾選取代，別把我剛算好的結果給弄丟了。", a: "glea" },
            { n: "我", t: "差點大意了，這就重新調整魔法。 ", a: "me" }
        ],
        fail_VALIDATION_wrong: [
            { n: "葛蕾", t: "這道驗證鎖得設在「數量」那一欄。你點錯位置了。", a: "glea" },
            { n: "我", t: "看走眼了，這就改過來。 ", a: "me" }
        ],

        // ── 隱藏獎勵：驗證生效後的嘗試 ──
        bonus_VALIDATION_ok: [
            { n: "葛蕾", t: "（看著你修改數據，微微皺眉）雖然規則允許你這麼改，但這些帳目關乎金穗鎮的存亡，隨便更動可不是什麼好習慣。", a: "glea" },
            { n: "我", t: "只是想測試一下鎖的穩定性，現在就改回去。 ", a: "me" }
        ],
        bonus_VALIDATION_fail: [
            { n: "葛蕾", t: "（看到錯誤數字被彈回，嘴角露出一絲微不可察的笑意）看來這道鎖確實夠硬。那些想灌假帳的傢伙，這下該踢到鐵板了。", a: "glea" },
            { n: "我", t: "這就是禁術的威力，它從不對貪婪的人妥協。 ", a: "me" }
        ],
        bonus_VALIDATION_subtotal: [
            { n: "葛蕾", t: "那一格是魔法自動匯總出來的結果。別去動它，否則整個帳目的平衡都會被破壞。", a: "glea" },
            { n: "我", t: "明白了。自動化產出的真相，不該受人為的隨意干預。 ", a: "me" }
        ]
    },

    simulator: {
        bgm: "BGM/game_bgm.mp3",
        tasks: [
            {
                id: "SORT_TASK",
                tutorHint: "先按「物資類別」進行排序。點選該欄位任何一個儲存格，然後點擊【排序】按鈕。",
                playerText: "要分類匯總之前，必須先讓相同的東西排在一起。我得先把「物資類別」排好序。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_SIMPLE",
                tab: "start",
                quiz: {
                    situation: "帳目記錄極其混亂，若直接施展匯總魔法，相同的物資會散落在各地。 ",
                    options: [
                        { t: "先按「物資類別」進行 A 到 Z 排序", correct: true  },
                        { t: "直接開啟小計對話框進行運算",         correct: false },
                        { t: "按「數量」大小進行降冪排序",           correct: false }
                    ],
                    success_msg: "洞察正確！排序是所有分類匯總的基石。 "
                },
                expectedCondition: { type: "ACTION", actionId: "SORT_ASC", col: 3 },
                storySegmentAfter: null // 確保任務完成後能直接進入下一項或播放 midStory
            },
            {
                id: "SUBTOTAL_TASK",
                tutorHint: "使用【資料 → 小計】，將分組依據設為『物資類別』，並匯總『數量』。",
                playerText: "三十筆流水帳用肉眼看實在太低效了。先按類別進行歸併，算出各類物資的總量，看看哪裡出了妖蛾子。",
                unlockBtnId: "data_group",
                unlockSkillId: "SUBTOTAL",
                tab: "start",
                quiz: {
                    situation: "現在需要迅速判斷每一類物資的總發放量是否處於正常範圍。 ",
                    options: [
                        { t: "按「物資類別」分組施展小計魔法", correct: true  },
                        { t: "一行一行地進行手動加總",         correct: false },
                        { t: "靠目測粗略估計大概的數值",           correct: false }
                    ],
                    success_msg: "先按「物資類別」排序，再運用小計功能，將魔力精確引導至「數量」的加總. "
                },
                expectedCondition: { type: "ACTION", actionId: "SUBTOTAL_APPLY", col: 3 },
                storySegmentAfter: "success_SUBTOTAL",
                midStoryAfter: "mid_story"
            },
            {
                id: "SUBTOTAL_NESTED_TASK",
                tutorHint: "再次開啟【小計】，分組依據改選為『登記人』，並務必[[取消勾選「取代目前小計」|gold]]。",
                playerText: "物資總數的異常已經顯露。現在得深入每一類內部，按「登記人」進行解構，看看誰才是罪魁禍首。千萬別覆蓋了現有的成果。",
                unlockBtnId: "data_group",
                unlockSkillId: "SUBTOTAL_NESTED",
                tab: "start",
                quiz: {
                    situation: "糧食與藥材的總數明顯病態偏高。現在需要在既有分類中，進一步鎖定具體的登記來源。 ",
                    options: [
                        { t: "嵌套魔法：按「登記人」再拆一層（不取代目前小計）", correct: true  },
                        { t: "刪除現有小計，重新按登記人進行歸併",                     correct: false },
                        { t: "用眼睛在凌亂的行間逐一比對登記人",                           correct: false }
                    ],
                    success_msg: "再次施展小計並謹記取消取代選項，如此一來，兩層魔法的輝光便會層層疊加。 "
                },
                expectedCondition: { type: "ACTION", actionId: "SUBTOTAL_NESTED_APPLY" },
                storySegmentAfter: "success_SUBTOTAL_NESTED"
            },
            {
                id: "VALIDATION_TASK",
                tutorHint: "選取「數量」整欄，運用【資料 → 資料驗證】，將規則設為『整數，介於 1 到 50』。",
                playerText: "最後一塊拼圖。設下一道嚴密的規則禁術。任何企圖混入帳單的瘋狂數字，從這一秒起都將被徹底拒之門外。",
                unlockBtnId: "validation_btn",
                unlockSkillId: "VALIDATION",
                tab: "start",
                quiz: {
                    situation: "幕後真相已然揭開。現在需要從源頭建立防禦體系，杜絕類似的竄改再度發生。 ",
                    options: [
                        { t: "設置資料驗證規則，立下嚴格的數量上限", correct: true  },
                        { t: "將帳冊徹底上鎖，不允許任何人再行編輯",     correct: false },
                        { t: "規定管理員每天必須進行一次手動查核",           correct: false }
                    ],
                    success_msg: "選取「數量」整欄，透過資料驗證魔法築起高牆，讓不合理的數據無所遁形。 "
                },
                expectedCondition: { type: "ACTION", actionId: "VALIDATION_APPLY", col: 4 },
                storySegmentAfter: "success_VALIDATION"
            }
        ]
    }
};
