/**
 * 試算表魔法冒險 v2 - 第 5 章【兩個人的村歌】
 * 主章節：賽爾引導模式（非 .5 挑戰模式）
 *
 * 故事定位：
 * - 銜接 ch4.5 結尾（小隊四人成形：主角、賽爾、米羅、夏特）
 * - 本章核心是「建立小隊感情」，不是推進主線、不是衝突升級
 * - 米羅與夏特其實來自同一個小村落（螢火村，火災後已不在；不是陰影，是純真的回憶）
 * - 一首那一帶的村歌，讓兩人各自起了「會不會是他」的念頭
 * - 但這只是「試探」——兩人都不夠勇敢直接問、不敢表露真正的意圖
 * - 於是各自抓住一個「根本不成立」的證據，說服自己「不是同一個地方」，然後退回去
 * - 結尾兩人都以為不是同村人，鬆一口氣，回到原本（甚至更凶）
 * - 但玩家知道：他們真的來自同一個地方，那點「證據」根本站不住腳
 * - 結尾皇宮招募高手的流言，作為主線鉤
 *
 * 教學內容：小計(透過大綱按鈕) → 嵌套小計 → 資料驗證
 */

const generateCh5Data = () => {
    const households = [
        "東頭李家", "東頭王家", "溪邊張家", "溪邊周家", "後山陳家",
        "後山林家", "曬穀場趙家", "曬穀場吳家", "井口黃家", "井口許家",
        "渡口何家", "渡口呂家", "竹林施家", "竹林孟家", "村尾鄭家"
    ];
    const categories = ["糧食", "藥材", "布匹", "柴火"];
    const registrars = ["阿禾", "阿穗", "村正"];

    const rows = [["編號", "戶名", "物資種類", "數量", "登記人"]];

    // 增加重複項，確保小計有意義
    const fixed = [
        [1,  "東頭李家",  "糧食", 12, "阿禾"],
        [2,  "東頭李家",  "糧食", 5,  "阿穗"], // 重複：東頭李家 - 糧食
        [3,  "東頭李家",  "藥材", 3,  "阿禾"],
        [4,  "溪邊張家",  "糧食", 8,  "阿穗"],
        [5,  "溪邊張家",  "糧食", 15, "村正"], // 重複：溪邊張家 - 糧食
        [6,  "溪邊張家",  "柴火", 20, "阿穗"],
        [7,  "後山陳家",  "布匹", 5,  "村正"]
    ];
    for (const f of fixed) rows.push(f);

    let id = 8;
    for (let i = 0; i < 25; i++) {
        const h   = households[Math.floor(Math.random() * households.length)];
        const c   = categories[Math.floor(Math.random() * categories.length)];
        const qty = 1 + Math.floor(Math.random() * 20);
        const r   = registrars[Math.floor(Math.random() * registrars.length)];
        rows.push([id++, h, c, qty, r]);
    }
    return rows;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["50"] = {
    meta: {
        title: "第 5 章：兩個人的村歌",
        sheetName: "🌾 青來村互助分配清單",
        reward: 2500
    },

    initialGridData: generateCh5Data(),

    skillDefs: {
        SORT_SIMPLE:     { n: "簡單排序",   s: "開始→排序和篩選",  d: "按單一欄位快速排列所有資料",       cat: "data", icon: "icon/sort&filter.png" },
        SUBTOTAL:        { n: "大綱",       s: "資料→大綱→小計", d: "依一個欄位分組，自動算出每組的小計與總計", cat: "data", icon: "icon/大綱.png" },
        SUBTOTAL_NESTED: { n: "嵌套小計",     s: "資料→大綱→小計", d: "在既有小計之上，再疊一層更細的分組匯總", cat: "data", icon: "icon/大綱.png" },
        VALIDATION:      { n: "資料驗證",     s: "資料→資料驗證", d: "替欄位設規則，從源頭擋下錯誤的輸入", cat: "data", icon: "icon/資料check.png" }
    },

    story: {

        // ── 開場：村歌 ──────────────────────────────────────────────
        start: [
            { n: "系統", t: "（走出了那個壓抑的收容所，迎面而來的陽光倒也乾脆。）", a: "system", bg: "road.png", bgm: "daily.mp3"
            , env: "light/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true},
            { n: "系統", t: "（四個人沿著官道行，影子在地上拖得老長。）", a: "system"
            , se: "horse run.mp3", vol: 1.0,bgPos: "left", bgZoom: 1.2, bgDur:"5s"},
            { n: "賽爾", t: "（趴在行李頂端，懶洋洋地打了個哈欠）", a: "fairy", se: "fairy_sleep.mp3", vol: 1.0  },
            { n: "賽爾", t: "難得這一整天並沒人塞爛攤子給我們，這才叫生活嘛。", a: "fairy" },
            { n: "夏特", t: "（走在最前面，白金披風一塵不染）別高興得太早。", a: "chate"
            ,bgPos: "center", bgZoom: 1.2, bgDur:"10s"},
            { n: "夏特", t: "按照經驗，這種安穩日子通常短得讓人失望。", a: "chate" },
            { n: "米羅", t: "（一邊牽著馬，一邊忍不住撇了撇嘴）你就不能講句好聽的來聽聽？", a: "miro", se: "boy_annoyed.mp3", vol: 1.0
            ,shake:true,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "米羅", t: "空氣這麼好都被你講壞了。", a: "miro" },
            { n: "夏特", t: "只有盲目樂觀的人才會覺得實話難聽。", a: "chate" },

            { n: "系統", t: "（轉過一個平緩的山坳，風裡忽然捎來一陣若有似無的歌聲。）", a: "system", bgm: "sunset.mp3"
            ,bg:"CG/ch5 sing.png",bgPos: "left top", bgZoom: 2.5, bgDur:"10s"},
            { n: "系統", t: "（清脆、稚嫩，是個孩子在哼唱。）", a: "system" },
            { n: "系統", t: "「日頭落了炊煙起，阿娘喚我回家去。」", a: "system" },
            { n: "系統", t: "（就在這句歌詞飄進耳朵的瞬間，米羅的腳步，猛地釘在了原處。）", a: "system",bgPos: "right", bgZoom: 2.5},
            { n: "系統", t: "（幾乎在同一秒鐘，走在最前面的夏特也停了下來。他挺拔的身影微微一僵。）", a: "system", se: "wind1.mp3", vol: 1.0
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0,bgPos: "right", bgZoom: 1.5},

            { n: "米羅", t: "（那熟悉的旋律讓他的心猛跳了一下。）", a: "miro", se: "heartbeat.mp3", vol: 1.0
            ,bgPos: "right", bgZoom: 2.0},
            { n: "米羅", t: "（這是我們村子裡的調子。）", a: "miro",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "夏特", t: "（他的眼神閃過一絲極難察覺的動搖。）", a: "chate"
            , se: "heartbeat.mp3", vol: 1.0,bgPos: "right", bgZoom: 1.5},
            { n: "夏特", t: "（怎麼會出現在這種偏僻的地方。）", a: "chate"
            ,bgPos: "center", bgZoom: 1.2, bgDur:"5s"},
            { n: "系統", t: "（空氣陷入了短暫而詭異的沉默。兩個人誰都沒開口，卻都在原地定格了許久。）", a: "system"},

            { n: "我", t: "（我走在他們中間，將這兩份截然不同卻同樣劇烈的反應看在眼底。）"
            , a: "me" , bgm: "sad.mp3", bg: "road.png", se: "bell", vol: 1.0},
            { n: "我", t: "（這兩個平時見面就互掐的傢伙，今天怎麼會同步定住了？）", a: "me",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "賽爾", t: "（也察覺到了氣氛的微妙，飛到我肩上壓低聲音）喂，你也看到了吧？", a: "fairy",bgPos: "right", bgZoom: 1.2},
            { n: "賽爾", t: "那兩個人的表情。", a: "fairy" },
            { n: "我", t: "看到了。很反常。", a: "me", se: "girl_en1.mp3", vol: 1.0},
            { n: "賽爾", t: "（眼睛滴溜溜地轉，露出一副看好戲的表情）有意思。", a: "fairy" },
            { n: "賽爾", t: "這可真是太有意思了。", a: "fairy",shake:true},

            { n: "我", t: "（我沒有當面點破，只是順著那清脆的歌聲望向前方）", a: "me"},
            { n: "我", t: "走吧，過去看看是怎麼回事。", a: "me",flash: true, flashSFX: "bell.mp3", vol: 1.0},

            { n: "系統", t: "（山坳深處坐落一個靜謐的村落。在亂世中這裡竟維持著一種難得的恬靜與秩序）", a: "system"
            , bg: "bg5.png", bgm: "winter.mp3",bgPos: "left", bgZoom: 2.0},
            { n: "系統", t: "（村中央的曬穀場上堆滿了各家送來的物資——穀物、布匹、柴火、藥材。）", a: "system"
            ,bgPos: "center", bgZoom: 1.1, bgDur:"10s" },
            { n: "系統", t: "（整齊地疊成了幾座小山。）", a: "system" },
            { n: "系統", t: "（一個梳著雙髻的小女孩正坐在穀堆上，悠閒地晃著腿。）", a: "system", se: "clothes1.mp3", vol: 1.0  },
            { n: "系統", t: "（嘴裡反覆哼著那首古老的村歌。）", a: "system" },
            { n: "我", t: "（在這種年頭，居然還能看到這樣守望相助的光景，真是不容易。）", a: "me", se: "girl_smile1.mp3", vol: 1.0  },
            { n: "米羅", t: "（他的聲音不知不覺輕了下來，目光柔軟）他們在湊東西。 ", a: "miro" },
            { n: "米羅", t: "把各家的餘裕拿出來，分給那些快撐不下去的人。 ", a: "miro" },
            { n: "夏特", t: "（難得沒有發出刻筆的評論，只是平靜地注視著一切）", a: "chate" },
            { n: "夏特", t: "在這種世道，唯有抱團取暖才能活得長久。", a: "chate" },

            { n: "村正", t: "（一位白髮蒼蒼的老人家緩緩迎了上來，眉宇間鎖著幾分愁緒）", a: "npc2"
            , se: "walk.mp3", vol: 1.0,flash: true, flashSFX: "bell.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.5, bgDur:"5s"},
            { n: "村正", t: "幾位客人是從遠方過路的？", a: "npc2" },
            { n: "我", t: "是。我們看見村子在分配物資，氣氛不錯，就過來打個招呼。", a: "me", se: "girl_en1.mp3", vol: 1.0},
            { n: "村正", t: "（重重地嘆了口氣）唉，分是想分，可現在手頭上的帳全亂套了。", a: "npc2" 
            , se: "girl_ow.mp3", vol: 1.0,shake:true,bg:"CG/ch5 comic.png"},
            { n: "村正", t: "各家送來的東西，由三個不同的登記人各自記帳。"
            , a: "npc2",bgPos: "left top", bgZoom: 2.0},
            { n: "村正", t: "糧食、藥材、布匹還有柴火，全一股腦混在一張單子上。", a: "npc2"
            ,bgPos: "left bottom", bgZoom: 2.0, bgDur:"2s"},
            { n: "村正", t: "到現在誰也算不清每樣東西到底湊了多少，夠不夠分給所有人。", a: "npc2"
            ,bgPos: "right", bgZoom: 1.5, bgDur:"2s"},
            { n: "村正", t: "再這樣算不清楚，怕是要為了幾把柴火傷了鄰里的和氣。"
            , a: "npc2",bgPos: "center", bgZoom: 1.1, bgDur:"4s"},
            { n: "我", t: "（我接過那張皺巴巴的單子掃了一眼。上面密密麻麻地寫了三十多筆流水帳。）", a: "me"
            , se: "paper down.mp3", vol: 1.0,shake:true ,bg: "bg5.png"},
            { n: "我", t: "（確實連個分類標籤都沒有。）", a: "me" },
            { n: "我", t: "老人家別急。這事交給我。我會讓這張單子自己學會把帳算清楚。", a: "me",flash:true},

            { n: "賽爾", t: "（在空中伸了個大懶腰）", a: "fairy", se: "fairy_sleep.mp3", vol: 1.0},
            { n: "賽爾", t: "這種分類算帳的雜事，正是本仙子最擅長的魔法。", a: "fairy",bgPos: "left", bgZoom: 1.1},

            // 兩人各自給自己一個「緩和」的理由 —— 但只敢試探，不敢直問
            { n: "米羅", t: "（主動湊了過來，眼角卻一直不自覺地瞄著夏特的臉色）", a: "miro", bgm: "goofy.mp3"
            ,bgPos: "center", bgZoom: 1.1},
            { n: "米羅", t: "隊長，我來幫你核對數字吧。", a: "miro", se: "boy_attraction.mp3", vol: 1.0,shake:true},
            { n: "夏特", t: "（竟然也跟著走過來）核對數字這種粗活留給記帳的。版面美觀由我來盯著。", a: "chate"
            , se: "walk.mp3", vol: 1.0,flash:true,bgPos: "center", bgZoom: 1.5},
            { n: "米羅", t: "（心裡直犯咕噥：夏特剛才那個反應，會不會也是螢火村的人？）", a: "miro", se: "heartbeat.mp3", vol: 1.0    },
            { n: "米羅", t: "（不對，這種話我怎麼問得出口。）", a: "miro" },
            { n: "米羅", t: "（他不自然地清了清喉嚨，語氣異常僵硬）那個，孔雀。", a: "miro", se: "boy_attraction.mp3", vol: 1.0    },
            { n: "米羅", t: "你平時盯版面的眼光，其實……還挺不錯的。", a: "miro" },
            { n: "夏特", t: "（握筆的手猛地停在半空，一臉見了鬼的表情）你居然在誇我？", a: "chate"
            , se: "boy_lowq.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1},
            { n: "米羅", t: "（迅速別開臉，語氣生硬）就事論事而已。你別想太多。", a: "miro",shake:true},
            { n: "夏特", t: "（心中暗自思忖：這記帳的今天肯定不對勁。難道他也聽出那首歌了？）", a: "chate", se: "heartbeat.mp3", vol: 1.0    },
            { n: "夏特", t: "（算了，我憑什麼先開口。）", a: "chate",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "夏特", t: "（語氣突然放得極其溫和，甚至有些生疏）記帳的。", a: "chate" },
            { n: "夏特", t: "你那本小冊子上記的東西，其實整理得還算仔細。", a: "chate" },
            { n: "米羅", t: "（像是被踩到尾巴的貓，猛地抬頭一臉警惕）夏特，你今天出什麼問題了？病了嗎？", a: "miro"
            , se: "boy_ah1.mp3", vol: 1.0,shake:true},
            { n: "夏特", t: "（表情瞬間恢復了往常的高傲）……沒事。趕快專心做事。", a: "chate",bgPos: "center", bgZoom: 1.5},
            { n: "我", t: "（這兩個人今天是中了什麼邪，講話客氣得讓人發毛。）", a: "me", se: "girl_embrass.mp3", vol: 1.0    },
            { n: "我", t: "（算了，先把正事辦完。）", a: "me",flash: true, flashSFX: "boom.mp3", vol: 1.0}
        ],

        // ── 任務 0 引導：排序 ──
        discovery_SORT: [
            { n: "賽爾", t: "這份帳單太亂了，如果不先歸類，我們根本算不清總數。", a: "fairy" },
            { n: "賽爾", t: "施展[[排序魔法|gold]]吧！選取『物資種類』這一欄的任何一個儲存格。", a: "fairy" },
            { n: "賽爾", t: "然後點擊工具列上的【從 A 到 Z 排序】，讓相同的東西排在一起。", a: "fairy" }
        ],

        // ── 任務 1 引導：小計 (透過大綱按鈕) ──
        discovery_SUBTOTAL: [
            { n: "賽爾", t: "很好！相同的東西排在一起後，小計魔法才能生效。", a: "fairy" },
        ],

        // ── 中場：試探繼續（仍然只敢繞圈）──
        mid_story: [
            { n: "夏特", t: "（盯著螢幕點了點頭）一眼就能看出每樣東西湊了多少。", a: "chate" },
            { n: "夏特", t: "確實比用手指頭在那邊點快多了。", a: "chate" },
            { n: "賽爾", t: "這就是小計的奧妙。先歸類，再結算。簡單又俐落，對吧？", a: "fairy" },
            { n: "村正", t: "（激動得雙眼發亮）每樣東西的總數一下子全出來了！", a: "npc2" },
            { n: "村正", t: "老朽活了這麼久，頭一次見到這麼快的算帳法！", a: "npc2" },
            { n: "我", t: "這只是第一步。我們還能把帳算得更細緻一點。", a: "me" },
            { n: "夏特", t: "（雙手抱胸，狀似不經意地隨口問道）……記帳的。你是哪裡人家？", a: "chate" },
            { n: "米羅", t: "（手抖了一下，心跳瞬間漏了一拍）問、問這個幹什麼？", a: "miro" },
            { n: "夏特", t: "（其實內心同樣緊張，但表面上裝得雲淡風輕）沒什麼，隨口一問。", a: "chate" },
            { n: "夏特", t: "看你管帳的手法，倒像是那種小地方磨練出來的精打細算。", a: "chate" },
            { n: "米羅", t: "（深吸一口氣，試探地放輕了聲音）那你呢？", a: "miro" },
            { n: "米羅", t: "你那套排版美學，學院那種象牙塔可教不出『把柴火堆得整整齊齊』這種古怪的龜毛習慣。", a: "miro" },
            { n: "夏特", t: "（心中一驚：他的觀察力竟然這麼細。不行，我還不能承認。）只是巧合罷了。", a: "chate" },
            { n: "系統", t: "（兩人對視了一眼，又極有默契地將真正想問的那句話給嚥了回去。）", a: "system" },
            { n: "賽爾", t: "（躲在書頁後面偷偷觀察，憋笑憋得渾身發抖）", a: "fairy" },
        ],

        success_SUBTOTAL: [
            { n: "我", t: "（我沒工夫理會他們之間的暗流湧動，準備把分類再往下拆一層。賽爾，接著怎麼做？）", a: "me" },
            { n: "米羅", t: "（盯著螢幕，語氣變得格外認真）隊長。光知道物資總數其實還不夠。", a: "miro" },
            { n: "米羅", t: "要想分得公平，就得看每一戶人家在每種物資上各自出了多少。", a: "miro" },
            { n: "米羅", t: "誰出得多、誰出得少，大夥兒心裡得有個譜。", a: "miro" },
            { n: "我", t: "（我停下動作，深深看了米羅一眼）……你考慮得很周到。你說得對。", a: "me" },
            { n: "賽爾", t: "（讚許地對米羅點了點頭）那就施展[[嵌套小計|gold]]吧。", a: "fairy" },
            { n: "賽爾", t: "這樣新的一層才會疊加在舊的上面，而不是把剛才的結果蓋掉。", a: "fairy" }
        ],


        // ── 任務 2 引導：嵌套小計 ──
        discovery_SUBTOTAL_NESTED: [],

        success_SUBTOTAL_NESTED: [
            { n: "我", t: "（在原有的種類分類下，按「戶名」又疊加了一層明細。）", a: "me" },
            { n: "我", t: "（每戶人家對每樣物資的貢獻一目了然。）", a: "me" },
            { n: "米羅", t: "（眼睛亮了起來）這樣誰多出、誰少出一看就知道了，分發物資的時候也能更公平些。", a: "miro" },
            { n: "夏特", t: "（冷淡地瞥了米羅一眼，難得沒有反駁）……這次，算你說得有道理。", a: "chate" },
            { n: "米羅", t: "（愣了愣神，沒接話。心想：這傢伙怎麼又開始講人話了。）", a: "miro" },
            { n: "村正", t: "（急急忙忙地跑過來）不好了！阿穗剛才手抖，把其中一筆『布匹 5』給寫成了『布匹 500』了！", a: "npc2" },
            { n: "我", t: "（語氣平穩，毫不慌張）老人家別擔心。", a: "me" },
            { n: "我", t: "與其事後一筆筆去抓錯，不如讓那些離譜的數字根本進不了帳單。", a: "me" },
            { n: "賽爾", t: "這招叫[[資料驗證|gold]]", a: "fairy" },
            { n: "賽爾", t: "從源頭立下規矩，任何超出範圍的錯誤輸入，都會被當場擋在門外。", a: "fairy" }
        ],

        // ── 任務 3 引導：資料驗證 ──
        discovery_VALIDATION: [],

        success_VALIDATION: [
            { n: "我", t: "（設定完成後，嘗試輸入『500』。系統瞬間跳出警告訊息，數字被拒絕輸入。）", a: "me" },
            { n: "村正", t: "（看得連連驚嘆）連寫錯的機會都給堵死了……這簡直是神技啊！", a: "npc2" },
            { n: "夏特", t: "（微微點頭）與其在事後費心找錯，不如一開始就防範於未然。這一手確實乾淨漂亮。", a: "chate" }
        ],

        // ── 結局：試探 → 退縮 → 回歸 ─────────────────────
        end: [
            { n: "系統", t: "（清單整理完畢。每一份物資的來源、總量與分配建議都列得井井有條一目了然）", a: "system", bg: "bg5.png"
            , bgm: "finish.mp3", bgPos: "right", bgZoom: 1.2 , bgDur:"10s" },
            { n: "村正", t: "（雙手捧著名冊，激動得連連作揖）太清楚了！", a: "npc2"
            , se: "woman_smile.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "村正", t: "這下大夥兒再也不會為了帳目吵架了。真是太謝謝各位了！", a: "npc2"},
            { n: "村正", t: "（轉過身大聲招呼著）阿禾、阿穗！快照著這份單子分發物資！", a: "npc2", se: "paper down.mp3", vol: 1.0,shake:true},
            { n: "村正", t: "千萬別漏了渡口那兩戶人家！", a: "npc2" },
            { n: "系統", t: "（村民們在指引下，井然有序地忙碌起來。曬穀場上充滿了歡聲笑語。）"
            , a: "system", bgPos: "center", bgZoom: 1.1 , bgDur:"10s"},
            { n: "系統", t: "（遠處，那個小女孩又開始哼唱起那首熟悉的歌謠。）", a: "system" },

            // 試探的最後一搏 —— 但誰都不敢真的問清楚
            { n: "米羅", t: "（終於鼓起了所有的勇氣，語氣卻還是繞著圈子）……喂。孔雀。", a: "miro", se: "boy_attraction.mp3", vol: 1.0
            , bgm: "sweet.mp3",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "米羅", t: "你剛才聽到那首歌的時候，是不是也愣住了？", a: "miro" },
            { n: "夏特", t: "（沉默了兩秒，視線游移）……那不過是一首隨處可見的破童謠，誰都能哼上兩句。", a: "chate"
            , se: "clothes1.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5},
            { n: "米羅", t: "（把心一橫，拋出一個只有在那座村子生活過的人才懂的細節）", a: "miro",shake:true},

            { n: "米羅", t: "我們那兒，曬穀場的井邊有一棵巨大的老柳樹。", a: "miro"
            ,bg: "CG/ch5 memory.png", bgPos: "left top", bgZoom: 2.0,isMemory:true},
            { n: "米羅", t: "每到趕集日，小孩子都喜歡爬到樹頂去看熱鬧，你見過嗎？", a: "miro"
            , bgPos: "right top", bgZoom: 2.0 , bgDur:"2s",isMemory:true},
            { n: "夏特", t: "（心頭像是被什麼東西撞了一下。井、趕集日、爬樹……）", a: "chate", se: "heartbeat.mp3", vol: 1.0
            ,bg: "bg5.png",shake:true},
            { n: "夏特", t: "（這些畫面，在他的腦海中竟然是如此清晰。）", a: "chate"
            ,bg: "CG/ch5 memory.png", bgPos: "left top", bgZoom: 2.0 , bgDur:"10s",isMemory:true,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "夏特", t: "（可他家住在村落後的半山腰，平日裡很少往曬穀場跑)", a: "chate"
            , bgPos: "right bottom", bgZoom: 2.0, isMemory:true},
            { n: "夏特", t: "（那棵樹究竟是不是柳樹，他現在竟然有些想不真切了）", a: "chate" 
            , se: "wind1.mp3", vol: 1.0,bgBlur: 20, bgPos: "left bottom", bgZoom: 2.0, isMemory:true, env: "sand/1", envFrames: 31, envspeed:200, envOpacity: 1.0, envDrift:true},
            { n: "夏特", t: "（更何況。萬一真的對上了……）", a: "chate",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "夏特", t: "（於是他迅速別開臉，語氣輕飄飄地說）……我們那邊靠著後山。", a: "chate"
            , se: "boy_attraction.mp3", vol: 1.0,env:null,bg: "bg5.png"},
            { n: "夏特", t: "在我的印象裡，好像沒見過什麼柳樹。", a: "chate", bgPos: "center", bgZoom: 1.1},

            // 退縮：兩人都抓住一個根本不成立的「證據」
            { n: "米羅", t: "（內心苦笑了一下，後山……沒看過柳樹……看來終究不是同一個村落吧。）", a: "miro"
            , bgPos: "center", bgZoom: 1.5,bgDur:"10s"},
            { n: "夏特", t: "（心中暗自鬆了口氣)", a: "chate", se: "boy_breath.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.1},
            { n: "夏特", t: "(他是在曬穀場那一帶生活……跟我記不太上。看來，應該是不同的地方）", a: "chate"},
            { n: "系統", t: "（兩人都沒有再繼續追問。）", a: "system"
            , bgPos: "right", bgZoom: 1.5 , bgDur:"10s", se: "wind1.mp3", vol: 1.0},
            { n: "米羅", t: "（像是放下了什麼負擔，又莫名感到一絲空落）……哦。", a: "miro", se: "boy_can.mp3", vol: 1.0,shake:true},
            { n: "米羅", t: "那大概只是同一帶的歌謠吧。沒什麼大不了的。", a: "miro" },
            { n: "夏特", t: "（心裡也悄悄鬆了一口氣，迅速恢復了那副欠揍的表情）", a: "chate", bgPos: "center", bgZoom: 1.1},
            { n: "夏特", t: "（既然是一首破童謠，你有什麼好激動的？", a: "chate",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "米羅", t: "（立刻被點著了火藥桶，炸毛道）誰激動了！明明是你先在那裡發愣的！", a: "miro", se: "boy_annoyed.mp3", vol: 1.0  },
            { n: "夏特", t: "（慢條斯理地整理著袖口）我那是陷入深思。", a: "chate" },
            { n: "夏特", t: "跟你那種大驚小怪，層次上根本就不在同一個維度。", a: "chate" },
            { n: "米羅", t: "（咬牙切齒）你這隻傲慢的銀毛孔雀……", a: "miro" },

            { n: "系統", t: "（兩個人又開始吵起來了，甚至比平時吵得還要凶。）", a: "system", bgm: "no.mp3", se: "wind1.mp3", vol: 1.0
            , bgPos: "right", bgZoom: 2.0 , bgDur:"5s"  },
            { n: "系統", t: "（曬穀場上的歌聲依舊。微風吹過，彷彿將時間吹回了那個已經回不去的小時候。）", a: "system", se: "bell.mp3", vol: 1.0  },

            // ── 上帝視角：童年的擦身 ─────────────────────
            { n: "系統", t: "許多年以前。螢火村。熱鬧的趕集日。", a: "system", bg: "CG/Ch5 childhood.png"
            , bgPos: "right", bgZoom: 1.5, bgm: "sunset.mp3" , isMemory: true },
            { n: "系統", t: "井邊那棵高大的老柳樹下，一個滿身是泥的小孩仰著頭望向樹梢，嘴裡含含糊糊地哼著旋律。", a: "system"},
            { n: "泥巴小孩", t: "日頭落了炊煙起…………欸。後面那句是怎麼唱來著？"},
            { n: "系統", t: "就在他身旁一個將衣角摺得整整齊齊的小孩，正蹲在地上專心地將撿來的鵝卵石排成一列。"
            , bgPos: "left", bgZoom: 2.0 , bgDur:"5s" , a: "system"},
            { n: "乾淨小孩", t: "「阿娘喚我回家去。」",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "泥巴小孩", t: "（眼睛猛地亮了起來）對！就是這句！沒想到你也會唱！"
            , se: "kid_rmb.mp3", vol: 1.0,shake:true,bgPos: "right", bgZoom: 1.5},
            { n: "乾淨小孩", t: "（只是淡淡地哼了一聲，繼續認真排著他的石頭）誰不會啊。", bgPos: "left", bgZoom: 2.0},
            { n: "系統", t: "兩個孩子短暫地對視了一眼。就那一眼。", a: "system", bgPos: "center", bgZoom: 2.0},
            { n: "遠處大人的聲音", t: "「回家吃飯囉！」", bgPos: "right top", bgZoom: 4.0},
            { n: "系統", t: "兩個小孩幾乎同時應了一聲。隨即朝著相反的方向奔跑開來。", a: "system"
            , se: "run.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.1,bgDur:"6s",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "系統", t: "一個跑向了溪邊，一個跑向了後山。", a: "system"},
            { n: "系統", t: "在那棵巨大的柳樹底下，那句沒人唱完的歌謠，就這樣被微風輕輕地接了過去。", a: "system"
            , se: "wind1.mp3", vol: 1.0, bgPos: "top", bgZoom: 2.0 , bgDur:"10s"},
            // ── 回到現在 ─────────────────────

            { n: "系統", t: "（風停了。曬穀場中央，小女孩剛好將那首歌唱到了最後一句尾音。）", a: "system", bg: "bg5.png", se: "bell.mp3", vol: 1.0   },
            { n: "系統", t: "（那棵柳樹早已不復存在。當初的村子也換了模樣。）", a: "system" },
            { n: "系統", t: "（但那兩個跑開的小孩，此刻正並肩站在這裡。）", a: "system" },
            { n: "系統", t: "（他們正為了各種微不足道而吵得面紅耳赤。）", a: "system" },
            { n: "系統", t: "（這份突如其來的凶狠，與他們今早那場笨拙的、彆扭的示好。）", a: "system" },
            { n: "系統", t: "（其實，都是同一枚硬幣的兩面。）", a: "system" ,flash: true, flashSFX: "bell.mp3", vol: 1.0},

            // 主線鉤：皇宮流言
            { n: "村正", t: "（分發完物資後走過來道謝，順口提了一句）對了，幾位若是繼續往官道走，不妨繞去金穗鎮看看。", a: "npc2"
            , bgm: "kingdom sad.mp3", bgPos: "center", bgZoom: 1.1 },
            { n: "我", t: "金穗鎮怎麼了？", a: "me",shake:true},
            { n: "村正", t: "聽過路的客商說，那邊有個管事的姑娘攤上麻煩了。帳目出了問題，鬧得有點難看。", a: "npc2" },
            { n: "村正", t: "（笑了笑）那姑娘在附近頗有名氣，挺多人替她說話的，只是……這種事說不清楚。", a: "npc2" },
            { n: "米羅", t: "（隨口問道）管事的姑娘？是什麼樣的人？", a: "miro"},
            { n: "村正", t: "金色短髮，說話快，雷厲風行那種。", a: "npc2"
            ,bg:"CG/ch2.5 coin.png",isMemory:true,flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5},
            { n: "系統", t: "（我和賽爾對看了一眼。）", a: "system" , se: "clothes1.mp3", vol: 1.0,bg:"bg5.png", bgPos: "center", bgZoom: 1.1},
            { n: "賽爾", t: "（懶洋洋地伸了個懶腰）……金穗鎮順路嘛。", a: "fairy", se: "fairy_sleep.mp3", vol: 1.0},

            { n: "我", t: "（我將這件事先記在心底。眼前的路，還是得一步一個腳印地走下去。）", a: "me",se:"wind1.mp3"},
            { n: "我", t: "（朝還在發愣的兩人大喊一聲）走了！趁著天黑前，得找個能落腳的地方。", a: "me", se: "clothes.mp3", vol: 1.0,shake:true},
            { n: "米羅", t: "（大聲應了一聲）這就來了！", a: "miro", bgPos: "left", bgZoom: 1.5},
            { n: "夏特", t: "（已經再次走在了最前面，步履從容）真是墨跡。", a: "chate" },

            { n: "系統", t: "（四個人漸漸離開了村子。）", a: "system", bg: "road dust.png", bgm: "sweet2.mp3"
            , bgPos: "center", bgZoom: 1.5,bgDur:"10s"},
            { n: "系統", t: "（在他們身後，那首古老的歌謠依然在曬穀場上空輕輕地盤旋著。）", a: "system",bg:"CG/ch5 childhood.png",bgBlur:10},
            { n: "系統", t: "（他們誰都沒有回頭去看。）", a: "system",bgBlur:5},
            { n: "系統", t: "（但走出很遠之後，那兩個人的腳步，竟然不約而同地慢了半拍……）", a: "system",bgBlur:0}
        ],

        // ── 失敗提示 (反向教學) ──
        fail_SORT_wrong: [
            { n: "賽爾", t: "「這招排序魔法得點對地方。先點選『物資種類』這一欄的任何一個格子，再施展排序，相同的東西才會乖乖排在一起喔。」", a: "fairy" }
        ],
        fail_SORT_col_0: [
            { n: "賽爾", t: "「編號只是為了記錄順序，按編號排序並不能幫我們歸類物資喔。快點選『物資種類』那一欄吧！」", a: "fairy" }
        ],
        fail_SORT_col_1: [
            { n: "賽爾", t: "「雖然按戶名排序能看到每家出了什麼，但村正現在最想知道的是『每種物資』的總數。我們先按『物資種類』來排序吧！」", a: "fairy" }
        ],
        fail_SORT_col_3: [
            { n: "賽爾", t: "「單純按數量大小排序，並不能把同類型的物資湊在一起喔。我們要先解決歸類問題，請點選『物資種類』。」", a: "fairy" }
        ],
        fail_SORT_col_4: [
            { n: "賽爾", t: "「登記人雖然重要，但現在的當務之急是按物資分類。請點選『物資種類』那一欄來進行排序。」", a: "fairy" }
        ],
        fail_SORT_desc: [
            { n: "賽爾", t: "「雖然從後往前排也不是不行，但螢火村的規矩是『由輕到重、由始至終』。為了配合村民們的查帳習慣，我們還是用[[從 A 到 Z 排序|gold]]來施展魔法吧！」", a: "fairy" }
        ],
        fail_SUBTOTAL_no_sort: [
            { n: "賽爾", t: "「哎呀，你發現了嗎？如果沒有先[[排序|gold]]就直接施展小計，相同的東西會散落在各地，魔法就沒辦法把它們彙整在一起了。」", a: "fairy" },
            { n: "賽爾", t: "「就像分發糧食，不先把袋子紮好，灑得到處都是可就麻煩啦。快去補一個[[排序|gold]]吧！」", a: "fairy" }
        ],
        fail_SUBTOTAL_wrong_col: [
            { n: "賽爾", t: "「分組依據選錯囉！我們要算的是『每種物資』有多少，所以魔法得依據『物資種類』來分類才對。」", a: "fairy" }
        ],
        fail_NESTED_replaced: [
            { n: "賽爾", t: "「糟糕，你把剛才算好的總數給弄丟了！第二次施展小計時，一定要[[取消勾選「取代目前小計」|gold]]。」", a: "fairy" },
            { n: "賽爾", t: "「這樣就像蓋房子，第二層要疊在第一層上面，而不是把第一層拆掉重蓋喔！」", a: "fairy" }
        ],
        fail_VALIDATION_wrong_range: [
            { n: "賽爾", t: "「規矩立得不太對。村正說大家手抖通常是寫成幾百，所以我們要把範圍限制在『1 到 50』之間才保險。」", a: "fairy" }
        ],
        fail_VALIDATION_wrong_col: [
            { n: "賽爾", t: "「你選錯欄位啦！我們要保護的是『數量』那一欄，點擊 D 欄的表頭選取整欄，再施展資料驗證魔法吧。」", a: "fairy" }
        ],

        // ── 隱藏獎勵：驗證生效後的嘗試 ──
        bonus_VALIDATION_ok: [
            { n: "賽爾", t: "「哎呀，雖然魔法允許你修改，但這些物資數據可是村民們辛苦登記的真實帳目，隨意更動可能會讓大家分不到糧食喔。我們還是維持現狀吧！」", a: "fairy" }
        ],
        bonus_VALIDATION_fail: [
            { n: "賽爾", t: "「看吧！這就是資料驗證魔法的威力。當有人想輸入大於 50 的錯誤數字時，魔法會自動彈開它，保護帳單不被弄亂！」", a: "fairy" }
        ],
        bonus_VALIDATION_subtotal: [
            { n: "賽爾", t: "「這一格是自動算出來的魔法總計。在真實的 Excel 中，資料驗證通常只會擋下『手動輸入』，不會干擾原本存在的公式結果。」", a: "fairy" },
            { n: "賽爾", t: "「但如果你嘗試手動把總計改成錯誤的數字……嘿嘿，魔法一樣會把它擋下來喔！」", a: "fairy" }
        ],
        discovery_COLUMN_SELECT_SORT: [
            { n: "賽爾", t: "「等等！施展排序魔法時，不需要選取整欄喔。只要點選欄位中的任何一個格子，魔法就會自動帶著整列資料一起移動。」", a: "fairy" },
            { n: "賽爾", t: "「在真實的 Excel 中，如果你只選一欄來排序，很容易把其他欄位的對應關係給搞丟（變成錯位），那可是很嚴重的魔力失控喔！」", a: "fairy" }
        ],
        discovery_SORT_RANGE: [
            { n: "賽爾", t: "「哎呀！不要只選取『一部分』格子來排序。這樣會導致被選中的格子排好了，但旁邊的資料卻留在原地，整張帳單就『錯位』壞掉啦！」", a: "fairy" },
            { n: "賽爾", t: "「記得喔，施展排序魔法最好的方式，是只點選一個儲存格，或是選取整張表。快點擊旁邊空白處取消選取，再試一次吧！」", a: "fairy" }
        ],
        discovery_COLUMN_SELECT_VALIDATION: [
            { n: "賽爾", t: "「好眼力！點擊表頭來[[選取整欄|gold]]是施展資料驗證最高明的做法。這樣一來，無論是原本的數據，還是未來新增的帳目，都會被納入魔法的守護之下喔！」", a: "fairy" }
        ]
    },

    simulator: {
        bgm: "BGM/game_bgm.mp3",
        tasks: [
            {
                id: "SORT_TASK",
                tutorHint: "先將資料按「物資種類」排序。點選該欄位任何一個儲存格，然後點擊【排序】按鈕。",
                playerText: "要分類匯總之前，必須先讓相同的東西排在一起。我得先把「物資種類」排好序。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_SIMPLE",
                tab: "start",
                expectedCondition: { type: "ACTION", actionId: "SORT_ASC", col: 2 },
                storySegmentBefore: "discovery_SORT"
            },
            {
                id: "SUBTOTAL_TASK",
                tutorHint: "先點選「物資種類」欄位排好序，再開啟【資料 → 大綱 → 小計】，分組依據選擇『物資種類』，匯總『數量』欄位。",
                /*playerText: "這三十幾筆流水帳太亂了。得先把同類的東西歸在一起，算出村子到底湊了多少物資。",*/
                unlockBtnId: "data_group",
                unlockSkillId: "SUBTOTAL",
                tab: "data",
                expectedCondition: { type: "ACTION", actionId: "SUBTOTAL_APPLY", col: 2 },
                storySegmentBefore: "discovery_SUBTOTAL",
                storySegmentAfter: "success_SUBTOTAL",
                midStoryAfter: "mid_story"
            },
            {
                id: "SUBTOTAL_NESTED_TASK",
                tutorHint: "再次開啟【小計】，分組依據改選『戶名』，並務必【取消勾選】「取代目前小計」，讓資料層層疊加。",
                playerText: "光有總數還不夠公平。得讓村正看清楚每一戶人家到底出了多少，這樣分配才不會有怨言。",
                unlockBtnId: "data_group",
                unlockSkillId: "SUBTOTAL_NESTED",
                tab: "data",
                expectedCondition: { type: "ACTION", actionId: "SUBTOTAL_NESTED_APPLY" },
                storySegmentBefore: "discovery_SUBTOTAL_NESTED",
                storySegmentAfter: "success_SUBTOTAL_NESTED"
            },
            {
                id: "VALIDATION_TASK",
                tutorHint: "選取「數量」整欄，點擊工具列上的【資料驗證】，設定「允許：整數」、「介於 1 到 50」。",
                playerText: "既然有人會手抖把 5 寫成 500，那我得立個規矩。與其事後辛苦抓錯，不如讓錯誤的數字打從一開始就輸不進去。",
                unlockBtnId: "validation_btn",
                unlockSkillId: "VALIDATION",
                tab: "data",
                expectedCondition: { type: "ACTION", actionId: "VALIDATION_APPLY", col: 3 },
                storySegmentBefore: "discovery_VALIDATION",
                storySegmentAfter: "success_VALIDATION"
            }
        ]
    }
};
