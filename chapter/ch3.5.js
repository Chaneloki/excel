/**
 * 試算表魔法冒險 v2 - 第 3.5 章【賽爾不在的那一天】
 * 挑戰模式：無引導，使用彈窗試煉
 * 腳本優化：文風與第 5 章對齊，強化沈浸感與角色情感重量。
 * 閱讀優化：拆分長句，確保視覺節奏舒緩。
 */

const generateCh3_5Data = () => {
    const rows = [
        ["編號", "姓名", "年齡", "家族", "到達狀態", "戶號"],
        [1,  "石老伯", "71", "石氏", "已確認撤離", "A01"],
        [2,  "石大柱", "45", "石氏", "待確認",     "A01"],
        [3,  "石阿梅", "43", "石氏", "待確認",     "A01"],
        [4,  "石小寶", "12", "石氏", "待確認",     ""],
        [5,  "石鐵蛋", "9",  "石氏", "待確認",     ""],
        [6,  "林春福", "55", "林氏", "待確認",     "A02"],
        [7,  "林桂花", "52", "林氏", "待確認",     ""],
        [8,  "林阿旺", "28", "林氏", "待確認",     ""],
        [9,  "林小燕", "24", "林氏", "待確認",     ""],
        [10, "林毛毛", "6",  "林氏", "待確認",     ""],
        [11, "霧大壯", "42", "霧氏", "待確認",     "A03"],
        [12, "霧二壯", "38", "霧氏", "待確認",     "A03"],
        [13, "霧阿蓮", "35", "霧氏", "待確認",     "A03"],
        [14, "霧阿福", "67", "霧氏", "待確認",     "A03"],
        [15, "霧明生", "19", "霧氏", "待確認",     ""],
        [16, "霧春桃", "44", "霧氏", "待確認",     ""],
        [17, "霧秋水", "8",  "霧氏", "待確認",     ""],
        [18, "霧長安", "5",  "霧氏", "待確認",     ""],
        [19, "陳老根", "63", "陳氏", "待確認",     "A04"],
        [20, "陳阿芳", "58", "陳氏", "待確認",     ""],
        [21, "黃大牛", "40", "黃氏", "待確認",     "A05"],
        [22, "黃春梅", "37", "黃氏", "待確認",     ""],
        [23, "黃小虎", "10", "黃氏", "待確認",     ""],
        [24, "吳阿海", "50", "吳氏", "待確認",     "A06"],
        [25, "吳玉珠", "48", "吳氏", "待確認",     ""],
        [26, "方來發", "33", "方氏", "待確認",     "A07"],
        [27, "方素梅", "30", "方氏", "待確認",     ""],
        [28, "孟志遠", "45", "孟氏", "待確認",     "A08"],
        [29, "孟阿嬌", "42", "孟氏", "待確認",     ""],
        [30, "謝三順", "55", "謝氏", "待確認",     "A09"],
        [31, "幼兒-1", "1",  "不明", "待確認",     ""],
        [32, "幼兒-2", "2",  "不明", "待確認",     ""],
        [33, "幼兒-3", "0",  "不明", "待確認",     ""],
        [34, "幼兒-4", "3",  "不明", "待確認",     ""],
        [35, "幼兒-5", "1",  "不明", "待確認",     ""],
        [36, "幼兒-6", "2",  "不明", "待確認",     ""],
        [37, "幼兒-7", "0",  "不明", "待確認",     ""],
        [38, "陳阿貴", "28", "陳氏", "待確認",     "A04"],
        [39, "陳二順", "25", "陳氏", "待確認",     ""],
        [40, "黃老三", "70", "黃氏", "待確認",     "A05"],
        [41, "吳小明", "15", "吳氏", "待確認",     "A06"],
        [42, "吳阿英", "13", "吳氏", "待確認",     ""],
        [43, "方鐵柱", "60", "方氏", "待確認",     "A07"],
        [44, "方阿蓮", "55", "方氏", "待確認",     ""],
        [45, "孟大壯", "20", "孟氏", "待確認",     "A08"],
        [46, "謝阿芳", "50", "謝氏", "待確認",     "A09"],
        [47, "謝玉蘭", "45", "謝氏", "待確認",     ""],
        [48, "林大樹", "35", "林氏", "待確認",     "A02"],
        [49, "林秀花", "32", "林氏", "待確認",     ""],
        [50, "石阿根", "68", "石氏", "待確認",     "A01"],
    ];
    return rows;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["35"] = {
    meta: {
        title: "第 3.5 章：賽爾不在的那一天",
        sheetName: "🌫️ 霧谷村轉移名冊",
        reward: 1200
    },

    initialGridData: generateCh3_5Data(),

    skillDefs: {
        SEARCH:  { n: "尋找",     s: "Ctrl + F",  d: "於千行之中，瞬間鎖定唯一的真相",  cat: "start", icon: "icon/find.png" },
        REPLACE: { n: "取代", s: "Ctrl + H",  d: "言出法隨，於瞬息間改寫眾生的既定狀態",    cat: "start", icon: "icon/find.png" },
        FUZZY:   { n: "萬用字元", s: "* / ?",     d: "通曉萬物之虛影，令隱藏的規律無所遁形",    cat: "start", icon: "icon/find.png" },
        EMPTY:   { n: "特殊定位", s: "F5 → 空格", d: "於名冊之空隙中降下秩序，讓斷裂的時空圓滿",      cat: "start", icon: "icon/find.png" }
    },

    story: {
        start: [
            { n: "系統", t: "（楓鈴驛站。隔日清晨。）", a: "system", bg: "bg1.5.png", bgm: "great mission.mp3"
            ,trans:true,se:"wind1.mp3",vol:1.0 },
            { n: "系統", t: "（昨夜掛起的燈籠尚未熄滅，在稀薄的晨霧中沈默地搖曳著。）", a: "system"
            , env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true},
            { n: "我", t: "（我揉了揉尚有些惺忪的睡眼，下意識地伸手摸向旁邊那張破舊的木凳。）"
            , a: "me",env:null,stuff:"chair.png",stuffShake:true, se:"door open.mp3",vol:1.0, stuffScale:2.0,stuffVPos:"bottom" },
            { n: "我", t: "（直到指尖觸碰到那本冰冷魔導書的質地，我才稍微放下了心。）", a: "me"
            ,stuff:"charater/魔導書.png", se: "clothes1.mp3", vol: 1.0 },
            { n: "我", t: "賽爾？妳還在嗎？", a: "me" },
            { n: "系統", t: "（四周靜謐得有些詭異，預想中那陣尖銳且充滿活力的聲音並沒有響起。）", a: "system" },
            { n: "系統", t: "（唯有遠處幾聲稀疏的雞鳴，在大地沈睡的邊緣不安地迴盪著。）", a: "system", se: "chicken.mp3", vol: 1.0
            ,bgPos: "left", bgZoom: 1.1, bgDur:"10s"},
            { n: "我", t: "（我猛地站起身，焦急地環視了一圈這個空曠且寂寥的院落。）", a: "me" , se: "heartbeat.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.5},
            { n: "我", t: "賽爾！別開這種無聊的玩笑了，趕快給我出來！", a: "me",flash: true, flashSFX: "flash.mp3", vol: 1.0,shake:true },

            { n: "系統", t: "（米羅端著兩碗正冒著熱氣的稀粥走進了視野，看著我失態的模樣，不由得愣住了。）", a: "miro", se: "walk.mp3", vol: 1.0  },
            { n: "米羅", t: "隊長，你這麼大聲是在呼喚誰呢？", a: "miro", bgm: "conspiracy.mp3" , se: "bell.mp3", vol: 1.0   },
            { n: "我", t: "賽爾……就是那隻平時一直繞著書飛的精靈。", a: "me",
            bg:"CG/ch3.5 two.png" ,bgPos: "left", bgZoom: 1.5, bgDur:"5s"},
            { n: "我", t: "昨晚睡前她明明還在的，現在竟然消失得無影無蹤了。", a: "me" },
            { n: "系統", t: "（米羅輕輕地將粥碗擱下，神色前所未有地認真，往四周的陰影中打量了一圈。）", a: "miro", se: "put down.mp3", vol: 1.0
            ,bgPos: "right"},
            { n: "米羅", t: "那位總是在發光的精靈姐姐……真的不在這裡了嗎？", a: "miro" },
            { n: "我", t: "（我急切地扯開魔導書的扉頁。）", a: "me", se: "book.mp3", vol: 1.0
            ,bgPos: "left",stuff:"charater/魔導書.png",stuffScale: 0.5, stuffPos: "right",stuffVPos:"bottom"},
            { n: "系統", t: "（在書皮與內頁的夾縫間，一張被折疊得極其歪斜的小紙條，無聲無息地滑落了下來。）", a: "system", se: "paper down.mp3", vol: 1.0
            ,stuff:"paper.png",stuffPos: "right",stuffVPos:"bottom",stuffShake:true},

            { n: "系統", t: "（紙條上的字跡深可入骨，筆尖幾乎要將單薄的紙面徹底戳穿。）", a: "system"
            ,bgPos: "center", bgZoom: 1.5, bgDur:"5s"},
            { n: "系統", t: "（在那處泛黃的紙角，幾抹早已乾涸、呈現出暗紅褐色的痕跡，在那裡顯得極其刺眼。）", a: "system" },
            { 
                n: "賽爾·字條", 
                t: "（凌亂的筆觸，揭示了寫信人當時那種幾乎要溢出紙面的匆忙與決絕。）", 
                a: "fairy",
                note: true,
                noteContent: "別來找我。我去把後面那條討厭的尾巴給引開。\n[[別擔心我。|strike]]\n聽著，有人衝著這本魔導書來。\n魔導書我留給你了，第三章學的那五招你全用過，自己動動腦袋好好用。\n米羅雖然才剛入隊，但他並不笨，記得讓他幫你。\n萬一我真的沒能回來，[[你就找個地方把這本魔導書給燒了吧。|strike]]你一定可以做到的，我相信你。我也會努力回..."
            , bgm: "no.mp3" , se: "book.mp3", vol: 1.0 , se: "wind1.mp3", vol: 1.0 },

            { n: "系統", t: "（當指尖觸碰到紙條邊緣那抹冷硬且不詳的暗紅時，我的心跳猛地漏了一拍。）", a: "system", bgm: "bad things.mp3" ,se: "heartbeat.mp3", vol: 1.0
            ,shake:true,bgPos: "left"},
            { n: "我", t: "（這哪裡是去辦什麼正事……她分明是抱著必死的覺悟，去充當那誘餌。 ）", a: "me" },
            { n: "系統", t: "（米羅的神色在一瞬間變得慘白，死死地盯著那道突然中斷、再無下文的墨痕。）", a: "miro",bgPos: "right" },
            { n: "米羅", t: "她是不是……遭遇了什麼不可挽回的意外？", a: "miro" },
            { n: "我", t: "（我深吸一口氣，強行將內心那股止不住的顫抖壓入深淵，把紙條塞進了口袋最隱祕的一角。）", a: "me", se: "paper down.mp3", vol: 1.0
            ,bgPos: "left", bgDur:"10s"},
            { n: "我", t: "她在那張紙條裡叫我們繼續前進。如果我們現在選擇在這裡停步……", a: "me" },
            { n: "我", t: "那麼她的這場冒險，就真的要以悲劇收尾了。", a: "me" },
            { n: "系統", t: "（我看著那本沈默不語的魔導書，眼神中透出了一種前所未有的、冷峻而決絕的光芒。）", a: "system",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "我", t: "走吧。今日我們所要處理的，不單單只是一份名冊。 ", a: "me",shake:true,bgPos: "center"},
            { n: "我", t: "我們必須重塑秩序。唯有如此，當她回來的那一刻才能看見一個能讓她落腳的歸宿", a: "me" },

            { n: "系統", t: "（就在這時，院牆外傳來了一陣急促且沈重的馬蹄聲像是敲碎了這清晨最後的寂靜）", a: "system"
            , bgm: "great mission.mp3", se:"horse run.mp3",vol:1.0,
            env: "horse run/1", envFrames: 24, envspeed:80, envOpacity: 1.0, envDrift:true  },
            { n: "系統", t: "（一名滿面塵埃、幾乎脫力的少年信使，踉踉蹌蹌地從馬背上跌落在地。）", a: "system"
            , se:"door open.mp3",vol:1.0, bg:"bg1.5.png",env:null},
            { n: "信使", t: "（他大口地喘著粗氣，眼神中盛滿了驚恐與哀求） ", a: "npc1", se: "boy_strong breath.mp3", vol: 1.0,shake:true  },
            { n: "信使", t: "請問，這裡可是楓鈴驛站？這裡有沒有……能讀懂這些魔力名冊的大人？", a: "npc1" },
            { n: "信使", t: "霧谷村那邊……出天大的亂子了！", a: "npc1",shake:true },
            { n: "系統", t: "（米羅毫不猶豫地跨步上前，穩穩地扶住了那個搖搖欲墜的身影。）", a: "miro" , se: "run.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.5},
            { n: "米羅", t: "冷靜點。先喝口水，慢慢把情況說清楚。 ", a: "miro" },

            { n: "信使", t: "霧谷村被突如其來的大霧封鎖了整整三週……", a: "npc1" 
            ,bg:"CG/ch3.5 smoke.png",bgPos: "top", bgZoom: 2.0
            , env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.8, envDrift:true},
            { n: "信使", t: "昨日好不容易被某種力量撕開了一道缺口", a: "npc1"
            ,bgPos: "right top", bgZoom: 2.0, bgDur:"2s",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "信使", t: "村長這才拼命派我帶著全村的名冊突圍出來。 ", a: "npc1" 
            ,bgPos: "right center", bgZoom: 2.0, bgDur:"2s"},
            { n: "系統", t: "（他顫抖著雙手，遞過一本邊緣早已被汗水浸得發黃、皺皺巴巴的冊子。）", a: "system", se: "paper down.mp3", vol: 1.0
            ,shake:true},
            { n: "信使", t: "可是這份名冊的格式徹底亂了……附近的驛站都不肯給我們簽發糧食憑條……", a: "npc1"
            ,bgPos: "right bottom", bgZoom: 3.0, bgDur:"2s"},
            { n: "信使", t: "村裡的孩子們……已經整整三日沒能喝上一口飽粥了。 ", a: "npc1"
            ,bgPos: "right bottom", bgZoom: 2.0, shake:true},

            { n: "我", t: "（我沈默地接過那本充滿苦難的名冊", a: "me", se: "put down.mp3", vol: 1.0,env:null
            ,bg:"CG/ch3.5 read.png",bgPos: "left", bgZoom: 1.5, bgDur:"5s"},
            { n: "我", t: "(翻開的第一眼，那種繁複的混亂便躍入眼簾。）", a: "me",se:"book.mp3",},
            { n: "系統", t: "（米羅也湊到了書案前，看著那些凌亂的筆觸，用力地攥緊了拳頭。）", a: "miro"
            ,bgPos: "right top", bgZoom: 1.5, bgDur:"2s"},
            { n: "米羅", t: "這種讓人生畏的亂象……我昨日才剛剛領教過。 ", a: "miro",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "米羅", t: "這一次，請務必讓我也出一份力。我不想再僅僅是在一旁看著了。 ", a: "miro",shake:true },
            { n: "我", t: "（我下意識地按住了口袋中那張帶血的紙條，指尖隱隱作痛。）", a: "me", se: "paper down.mp3", vol: 1.0,
            bgPos: "left", bgZoom: 1.5, shake:true},
            { n: "我", t: "好。就我們兩個。讓我們把這攤支離破碎的命運……重新拼湊完整。 ", a: "me",bgPos: "center", bgZoom: 1.1,flash:true,flash: true, flashSFX: "boom.mp3", vol: 1.0}
        ],

        mid_story: [
            { n: "系統", t: "（隨著權能的注入，名冊上的雜訊正如同退潮般迅速消散。）", a: "system" },
            { n: "米羅", t: "（他驚愕地看著那些在一瞬間便煥然一新的欄位）這招簡直太不可思議了……一瞬間就完成了改寫。 ", a: "miro" },
            { n: "米羅", t: "可是隊長，我們……我們會不會在這種快速的權能中，誤傷了哪一項關鍵的因果？", a: "miro" },
            { n: "我", t: "只要我們鎖定的關鍵字足夠精準，這部魔導書就不會漏掉任何一個靈魂。 ", a: "me" },
            { n: "我", t: "它更不會去隨意干涉那些與當下無關的內容。 ", a: "me" },
            { n: "系統", t: "（米羅沈默了片刻，悄悄將手邊那支本打算用來一筆一劃手動修正的鵝毛筆，輕輕收進了筆筒。）", a: "system" },
            { n: "系統", t: "（名冊的數據重塑工作已近半途。院子裡，信使正焦急地守在門口，眼神中充滿了對生存的渴望。）", a: "system" },
            { n: "米羅", t: "（他盯著名冊的殘留部分，語氣變得有些沈重而認真）", a: "miro" },
            { n: "米羅", t: "隊長，若要精確定位到霧氏家族的所有成員……我看，我們是否該一頁一頁地去親手翻找？", a: "miro" },
            { n: "我", t: "一頁一頁地人肉翻找？那得要消耗多少無謂的精力與時光啊。 ", a: "me" },
            { n: "米羅", t: "雖然只有五十多行……但我想，只要我們速度夠快的話……", a: "miro" },
            { n: "我", t: "（我原本脫口欲出的那句『本仙子絕不允許這種低效率的愚行』……）", a: "me" },
            { n: "我", t: "（在觸碰到空氣的瞬間，卻因主人的缺失而卡在了喉嚨裡。）", a: "me" },
            { n: "我", t: "我們有一種更為睿智的途徑，叫做『因果模糊』。這比任何肉眼的搜查都要迅捷百倍。 ", a: "me" },
            { n: "米羅", t: "萬用字元？那也是那種記載在書裡的、高深莫測的位階禁術嗎？具體該如何吟唱？", a: "miro" },
            { n: "系統", t: "（在那一刻，我腦海中無比清晰地浮現出賽爾平時那副目中無人、卻又準確得嚇人的教導聲。）", a: "system" },
            { n: "我", t: "聽好了。那顆『星號』象徵著命運中任意長度的未知。只要在此輸入『霧*』……", a: "me" },
            { n: "我", t: "無論是霧大壯還是霧阿蓮，只要是流著霧氏血脈的人，都將被這道座標一次性精確標記。 ", a: "me" },
            { n: "系統", t: "（米羅的眼睛在那一瞬間燃起了熾熱的光，他連忙從懷裡掏出那本已經寫了一半的小本子。）", a: "miro" },
            { n: "米羅", t: "等等，這段真言太過重要了，我必須將它一字不差地刻進我的筆記裡。 ", a: "miro" },
            { n: "我", t: "（我看著他在那裡拼命揮動筆桿的模樣，不禁有些失神地停下了手中的動作。）", a: "me" },
            { n: "我", t: "你為什麼……連這種基礎的東西都要記錄得這麼詳細？", a: "me" },
            { n: "米羅", t: "（他甚至連頭都沒有抬起來，語氣中透出一種近乎頑固的誠懇）", a: "miro" },
            { n: "米羅", t: "因為……因為那位賽爾精靈姐姐，現在不在我們身邊啊。 ", a: "miro" },
            { n: "米羅", t: "你教給我的每一句話，我都必須記到骨子裡。下次當你忙到失神時，我也好替她提醒你啊。 ", a: "miro" },
            { n: "我", t: "（我沈默了良久，喉嚨深處突然翻開了一陣難言的酸澀感。）", a: "me" },
            { n: "我", t: "別擔心。等她回來了，妳就不用這麼辛苦地扮演她的角色了。 ", a: "me" },
            { n: "米羅", t: "（他點了點頭，語氣卻異常堅定）多記一些總是好的。唯有如此，我的心裡才算踏實。 ", a: "miro" },
            { n: "米羅", t: "（他低頭繼續在紙上快速摩擦著） 『星號……象徵任意多個字符的命運碎片』……", a: "miro" },
            { n: "米羅", t: "好了。我已經記下了。隊長，讓我們繼續解開下一個死結吧。 ", a: "miro" }
        ],

        end: [
            { n: "系統", t: "（名冊終於重歸秩序。村民的狀態更新完畢，戶號也已被全部填補。）", a: "system", bg: "bg1.5.png", bgm: "sad.mp3"  },
            { n: "信使", t: "（顫抖著雙手接過名冊，聲音中帶著一絲喜極而泣的顫抖。）", a: "npc1", bg: "bg1.5.png",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "信使", t: "有了這份名冊下一個驛站的主管，真的…真的就會為我們簽發救命的糧草了嗎？", a: "npc1", bg: "bg1.5.png" },
            { n: "系統", t: "（米羅跨步上前，用他那雙佈滿老繭的手，重重地拍在了信使單薄的肩膀上。）", a: "miro", bg: "bg1.5.png"
            , se: "put down.mp3", vol: 1.0,shake:true},
            { n: "米羅", t: "你儘管帶著它前行。 ", a: "miro", bg: "bg1.5.png" },
            { n: "米羅", t: "若有人膽敢再次刁難，你便告訴他這是由楓鈴驛站與魔導書親手認證的真理。 ", a: "miro", bg: "bg1.5.png" },
            { n: "信使", t: "（信使對著你們深深地鞠了一躬，甚至低到了塵埃裡） ", a: "npc1", bg: "bg1.5.png" },
            { n: "信使", t: "萬分感謝！我替村裡的孩子們，叩謝恩人的大恩大德！", a: "npc1", bg: "bg1.5.png"
            ,bgPos: "center", bgZoom: 1.5, shake:true},
            { n: "系統", t: "（急促的馬蹄聲在沈寂的晨霧中漸遠，視線的盡頭只留下一路久久不散的塵煙）", a: "system", bg: "bg1.5.png"
            , se: "horse run.mp3", vol: 1.0, env: "horse run/1", envFrames: 24, envspeed:80, envOpacity: 1.0, envDrift:true},

            { n: "系統", t: "（米羅獨自佇立在院落中央，凝視著那片象徵著生機的塵埃。）", a: "miro", bg: "bg1.5.png" },
            { n: "米羅", t: "呼……我們總算，把這攤原本不可能理清的命運，給徹底理順了。 ", a: "miro", bg: "bg1.5.png" 
            , se: "boy_breath.mp3", vol: 1.0,env:null },
            { n: "我", t: "嗯。我們做到了。 ", a: "me", bg: "bg1.5.png", se: "girl_en1.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.1},
            { n: "米羅", t: "雖然這一次，精靈姐姐不在身邊時刻『咆哮』……", a: "miro", bg: "CG/ch3.5 letter.png"
            ,bgPos: "right", bgZoom: 1.5, bgDur:"3s"},
            { n: "米羅", t: "但隊長你，終究還是憑藉著自己的意志，將那些深奧的禁術全部具現化了呢。 ", a: "miro"},
            { n: "我", t: "（我沈默地將魔導書收回背包深處）", a: "me", se: "paper down.mp3", vol: 1.0
            ,bgPos: "left", bgZoom: 1.5},
            { n: "我", t: "她平日教我的時候雖然語氣冷冽。 ", a: "me" },
            { n: "我", t: "但現在回想起來，每一句話其實都切中了數據最核心的要害。 ", a: "me" },
            { n: "米羅", t: "（他壓低了聲音，悄悄靠了過來，眼神中透著一絲純粹的好奇）", a: "miro"
            ,bgPos: "right", bgZoom: 1.5, bgDur:"5s"},
            { n: "米羅", t: "對了隊長……那張紙條上被刻意塗抹掉的那行字……你猜，她究竟寫了些什麼？", a: "miro"},
            { n: "我", t: "我想……大概是一些聽起來極其肉麻卻溫柔的話吧。 ", a: "me", bg: "bg1.5.png"
            ,bgPos: "center", bgZoom: 1.1, bgDur:"10s"},
            { n: "我", t: "依照她的性格，肯定不捨得讓我看見她脆弱的一面所以才故意將其扼殺在了墨痕裡", a: "me"},
            { n: "系統", t: "（米羅若有所思地點了點頭，清澈的嘴角難得地浮現出一抹溫暖且理解的笑意。）", a: "miro"},

            { n: "系統", t: "（就在這時，驛站斑駁的牆角邊緣突然微弱地閃過了一道搖搖欲墜的翠綠色熒光）", a: "system", bg: "bg1.5.png", bgm: "no.mp3"
            , se: "appear.mp3", vol: 1.0 ,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "系統", t: "（那光點忽明忽暗，宛如一隻隨時會被這世間的冷風徹底吹滅的螢火蟲。）", a: "system", se: "wind1.mp3", vol: 1.0  },
            { n: "系統", t: "（賽爾從高高的院牆上無力地跌落了下來，她那對原本剔透的翅膀，此刻顯得異常凌亂且沈重。）", a: "fairy", bg: "bg1.5.png", se: "fall.mp3", vol: 1.0  },
            { n: "系統", t: "（在雙腳踏地的瞬間，她竟然踉蹌了一下，險些再次栽倒在塵土之中。）", a: "fairy", bg: "bg1.5.png", se: "heartbeat.mp3", vol: 1.0,shake:true},
            { n: "系統", t: "（但她隨即被某種自尊心支撐著，倔強地端正了姿態清了清嘶啞的嗓子）", a: "fairy", bg: "bg1.5.png",se: "girl_attraction.mp3", vol: 1.0 
            ,bgPos: "center", bgZoom: 1.5},
            { n: "賽爾", t: "怎麼？本仙子才稍微離開了那麼一小會兒，你們就把名冊給搞砸了嗎？", a: "fairy", bg: "bg1.5.png",shake:true },
            { n: "我", t: "（我瞪大了雙眼，驚喜地看著眼前這個滿身倦意的小生命）  ", a: "me", bg: "bg1.5.png", bgm: "sweet.mp3"
            ,bgPos: "center", bgZoom: 1.1,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "我", t: "賽爾！妳這傢伙……總算捨得滾回來了。 ", a: "me", bg: "bg1.5.png" },
            { n: "賽爾", t: "我辦完該辦的麻煩事，自然就會回來了。瞧你那副沒見過世面的樣子。 ", a: "fairy", bg: "bg1.5.png", se: "fairy.mp3", vol: 1.0   },
            { n: "系統", t: "（語氣依舊臭屁，但她那對薄如蟬翼的翅膀還是忍不住發出了一陣細微且劇烈的顫抖）", a: "fairy", bg: "bg1.5.png"
            ,bgPos: "left", bgZoom: 1.1, bgDur:"10s"},
            { n: "米羅", t: "（焦急地湊到我的耳畔，聲音壓得極低） ", a: "miro", bg: "bg1.5.png" },
            { n: "米羅", t: "隊長……精靈姐姐看起來，似乎真的已經精疲力竭了。 ", a: "miro", bg: "bg1.5.png" },
            { n: "賽爾", t: "（她那雙敏銳的長耳朵竟然捕捉到了這句低語） ", a: "fairy", bg: "bg1.5.png" },
            { n: "賽爾", t: "誰、誰累了！本仙子現在的魔力……可是充沛得很呢！", a: "fairy", bg: "bg1.5.png",bgPos: "right bottom", bgZoom: 2.0},

            { n: "系統", t: "（我看著她那副逞強的模樣，沒有說出任何揭穿她的大道理，只是沈默地平伸出了我的手掌。）", a: "me", bg: "CG/Ch3.5.png"
            , se: "bell.mp3", vol: 1.0,bgPos: "top", bgZoom: 1.5, bgDur:"10s"},
            { n: "系統", t: "（賽爾在半空中顯然猶豫了片刻，最終她還是緩緩地、安靜地落在了我的掌中心）", a: "me", bg: "CG/Ch3.5.png", se: "paper down.mp3", vol: 1.0   },
            { n: "系統", t: "（那一瞬間的感觸，讓我知道她此刻的重量，竟然比平時感覺要輕了許多、許多。）", a: "me", bg: "CG/Ch3.5.png" },
            { n: "我", t: "辛苦妳了，賽爾。這一次，真的謝謝妳。 ", a: "me", bg: "CG/Ch3.5.png" },
            { n: "系統", t: "（她徹底沈默了下來。那對凌亂的翅膀在我的掌心中，發出了近乎透明的顫抖。）", a: "fairy", bg: "CG/Ch3.5.png" },
            { n: "系統", t: "（她似乎想出言反駁，但最終，卻只是沈默地低下了頭。）", a: "fairy", bg: "CG/Ch3.5.png" },
            { n: "賽爾", t: "話說回來……那本麻煩到極點的名冊，最後到底……有沒有做完？", a: "fairy", bg: "CG/Ch3.5.png",flash:true },
            { n: "我", t: "放心吧。一處瑕疵都沒有。 ", a: "me", bg: "CG/Ch3.5.png",bgPos: "center", bgZoom: 1.1},

            { n: "系統", t: "（賽爾滿意地微微頷首，語氣中終於透出了一絲極其難得的、由衷的驕傲。）", a: "fairy", bg: "CG/Ch3.5.png",bgPos: "left", bgZoom: 1.5, bgDur:"10s" },
            { n: "賽爾", t: "哼。那是自然。畢竟你可是我親手教導出來的唯一學生啊。 ", a: "fairy", bg: "CG/Ch3.5.png", se: "fairy_infosmile.mp3", vol: 1.0   },
            { n: "系統", t: "（她停頓了良久，隨即像是害羞一般，輕輕踢了踢我的指關節。）", a: "fairy", bg: "CG/Ch3.5.png",shake:true  },
            { n: "賽爾", t: "好了啦！別老是這樣托著本仙子，感覺……怪肉麻的。 ", a: "fairy", bg: "CG/Ch3.5.png" },
            { n: "我", t: "可是妳剛才降落的時候，腳踝明明就飄了一下吧？", a: "me", bg: "CG/Ch3.5.png",flash:true },
            { n: "賽爾", t: "那是……那是因為你們這驛站的地板根本沒鋪平！才不是本仙子的問題！", a: "fairy", bg: "CG/Ch3.5.png", se: "fairy.mp3", vol: 1.0   },
            { n: "系統", t: "（米羅一臉認真地蹲了下去，仔細審視著地面。）", a: "miro", bg: "CG/Ch3.5.png" },
            { n: "米羅", t: "奇怪了……這地板明明看起來就很平整啊？", a: "miro", bg: "CG/Ch3.5.png" },
            { n: "賽爾", t: "（她發出了一聲憤怒的驚叫）你這個討厭的新面孔！趕快給我閉上你的嘴巴啦！", a: "fairy", bg: "CG/Ch3.5.png",shake:true },
            { n: "系統", t: "（院落深處的晨霧終於在此刻徹底散去了。金色的陽光在大地之上無私地灑落了下來）", a: "system", bg: "CG/Ch3.5.png"
            , env: "light/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true},

            { n: "系統", t: "（賽爾疲憊地靠在我的肩膀上，聲音比剛才明顯衰弱了許多。）", a: "fairy", bg: "road dust.png" },
            { n: "賽爾", t: "聽著少年……那個一直躲在陰影中跟蹤你的人，我已經將他暫時引向西邊的荒野了。 ", a: "fairy"},
            { n: "賽爾", t: "你現在，只有三天的時限。三天後，他也許會重新鎖定你，也許不會。 ", a: "fairy",shake:true},
            { n: "我", t: "那個人到底具備什麼樣的身份？為什麼要糾纏著我？", a: "me",bgPos: "center", bgZoom: 1.2},
            { n: "系統", t: "（賽爾沈默了許久、許久，終究還是沒有給出那個正面回答。）", a: "system"},
            { n: "賽爾", t: "別再追問了。趕快出發吧。我們現在，只剩下這區區三日的自由了。 ", a: "fairy",se:"bell.mp3",vol:1.0 },
            { n: "賽爾", t: "能在這場狩獵中走多遠……就看你自己的造化了。 ", a: "fairy"}
        ],

         success_SEARCH: [
            { n: "我", t: "（我成功找到了。石老伯，71 歲，當前狀態已確認。）", a: "me" },
            { n: "我", t: "既然村長的名字在名冊上，那這份名冊的真實性就沒問題了。", a: "me" },
            { n: "米羅", t: "哇！Ctrl + F 找起人來，竟然比手動翻名冊快這麼多啊！", a: "miro" }
        ],

        success_REPLACE: [
            { n: "我", t: "（我果斷按下了全部取代按鈕。）", a: "me" },
            { n: "我", t: "（幾十個『待確認』全部被替換成了『已確認撤離』。）", a: "me" },
        ],

        success_FUZZY_WU: [
            { n: "我", t: "（我輸入了『霧*』並點擊全部尋找。）", a: "me" },
            { n: "我", t: "（一瞬間，那八個家族成員的條目全都明亮地顯示了出來。）", a: "me" },
            { n: "米羅", t: "天哪，那個小星號竟然可以代表後面所有的文字嗎？！", a: "miro" },
            { n: "我", t: "沒錯，它代表的是任意長度的字符。", a: "me" }
        ],

        success_FUZZY_INFANT: [
            { n: "我", t: "（我輸入了『幼兒-?』的指令。）", a: "me" },
            { n: "我", t: "（轉眼間，七個幼兒的相關條目便全被清晰地標記了出來。）", a: "me" },
            { n: "米羅", t: "隊長，這個問號跟剛才那個星號的作用有什麼不一樣嗎？", a: "miro" },
            { n: "我", t: "問號代表的是『精確的一個字』。", a: "me" }
        ],

        success_EMPTY: [
            { n: "我", t: "（我熟練地定位到所有空格，輸入公式後按下 Ctrl + Enter。）", a: "me" },
            { n: "我", t: "（所有的空白戶號在一瞬間被全部填滿了。）", a: "me" },
            { n: "米羅", t: "（他呆呆地盯著螢幕，好半天都沒說話） ", a: "miro" },
            { n: "米羅", t: "虧我昨天整理日期時，還是一格一格在那裡手打的。", a: "miro" }
        ],

        // ── 失敗提示：只有米羅在旁邊，好心幫倒忙 ────────────────────────
        fail_SEARCH_use_replace: [
            { n: "米羅", t: "大事不好了！隊長，村長的名字怎麼突然不見了？", a: "miro" },
            { n: "我", t: "糟了，是我不小心點錯按鈕了。", a: "me" }
        ],

        fail_REPLACE_wrong_old_val: [
            { n: "米羅", t: "咦？隊長，我們不應該是針對『待確認』去處理嗎？", a: "miro" },
            { n: "我", t: "（我感到臉上一陣燥熱） 抱歉，剛才一瞬間眼花了。", a: "me" }
        ],

        fail_REPLACE_wrong_new_val: [
            { n: "米羅", t: "字體雖然換掉了，但這『已確認撤離』你是不是寫錯了？", a: "miro" },
            { n: "我", t: "（我緊緊咬著牙關，重新修正輸入內容。）", a: "me" }
        ],

        fail_REPLACE_with_format: [
            { n: "米羅", t: "「隊長，字雖然換好了，但為什麼這些格子全都變綠了？感覺好刺眼啊……」", a: "miro" },
            { n: "我", t: "「（看著滿屏綠色） 咳，剛才忘記把搜尋選項裡的格式給清空了。」", a: "me" }
        ],

        fail_SEARCH_not_found: [
            { n: "米羅", t: "奇怪，這上面是不是壓根就沒寫這個人的名字啊？", a: "miro" },
            { n: "我", t: "（我盯著空白的輸入框，有些無奈） 打錯字了。", a: "me" }
        ],

        fail_REPLACE_wrong_val: [
            { n: "米羅", t: "這名冊上面的字看起來好像特別固執呢。", a: "miro" },
            { n: "我", t: "（我沉默著不說話，重新檢查操作步驟。）", a: "me" }
        ],

        fail_FUZZY_missing_wildcard: [
            { n: "米羅", t: "咦？這家人明明有好幾個，怎麼只有這一個亮起來了？", a: "miro" },
            { n: "我", t: "（看著依然凌亂的名冊） 搜尋範圍太過狹窄了。", a: "me" }
        ],

        fail_FUZZY_no_format: [
            { n: "米羅", t: "（他疑惑地揉雙眼） 隊長，你剛才不是已經唸過咒語了？", a: "miro" },
            { n: "米羅", t: "但我看這名冊，好像依然還是白茫茫的？", a: "miro" },
            { n: "我", t: "（我尷尬地停下動作，忘記設定格式標記了。）", a: "me" }
        ],

        fail_EMPTY_no_ctrl_enter: [
            { n: "米羅", t: "隊長，你竟然在那裡一格一格地填寫啊，你真的很有耐心。", a: "miro" },
            { n: "我", t: "（我的手微微抖了一下） 我這並不是在練習耐力修煉。", a: "me" }
        ],

        fail_EMPTY_wrong_formula: [
            { n: "米羅", t: "隊長，你寫的到底是什麼代碼啊？還是在寫詩？", a: "miro" },
            { n: "我", t: "（我趕緊默默地把打錯的那行代碼刪除掉） 操作意外。", a: "me" }
        ]
    },

    simulator: {
        bgm: "game_bgm.mp3",
        tasks: [
            {
                id: "SEARCH_TASK",
                tutorHint: "在尋找框中輸入『石老伯』，確認他的位置。",
                playerText: "信使說名冊是幾個人輪流抄的，真假難辨。得先確認送出求救信號的村長石老伯有沒有在名冊上。五十行裡找一個名字，我記得有個比逐行翻找快得多的辦法。",
                unlockBtnId: "find_group",
                unlockSkillId: "SEARCH",
                tab: "start",
                quiz: {
                    situation: "名冊總共有五十幾行，現在急需確認『石老伯』這個名字到底有沒有出現在裡面。",
                    options: [
                        { t: "使用 Ctrl + F 尋找功能",  correct: true  },
                        { t: "使用 Ctrl + H 取代功能",  correct: false },
                        { t: "施展 定位空格 禁術",    correct: false }
                    ],
                    success_msg: "沒錯！準確輸入『石老伯』後，點擊找下一個就行了。"
                },
                expectedCondition: { type: "SEARCH_VAL", value: "石老伯" },
                storySegmentAfter: "success_SEARCH"
            },
            {
                id: "REPLACE_TASK",
                tutorHint: "將名冊中所有的『待確認』批次改為『已確認撤離』。",
                playerText: "你看，名冊上村民的狀態都還停留在『待確認』，那是封路前填寫的舊資料。現在既然路通了，這批人都是鐵定要撤離的。如果一個個改會改到天黑，我記得有一個能一口氣全部換掉的高效率方法。",
                unlockBtnId: "find_group",
                unlockSkillId: "REPLACE",
                tab: "start",
                quiz: {
                    situation: "現在需要將名冊裡所有標註為『待確認』的狀態，批量修改為『已確認撤離』。",
                    options: [
                        { t: "Ctrl + H 啟動全部取代",  correct: true  },
                        { t: "Ctrl + F 進行逐一尋找",  correct: false },
                        { t: "使用 模糊搜尋 * 功能",          correct: false }
                    ],
                    success_msg: "正確！在尋找目標填入『待確認』，取代目標填入『已確認撤離』，最後按下全部取代即可。"
                },
                expectedCondition: { type: "REPLACE_CHECK", oldVal: "待確認", newVal: "已確認撤離" },
                storySegmentAfter: "success_REPLACE",
                midStoryAfter: "mid_story"
            },
            {
                id: "FUZZY_WU_TASK",
                tutorHint: "找出所有霧氏家族的成員，並統一標記為綠色。",
                playerText: "霧氏家族要優先安排同戶安置。但問題是他們的名字格式全都不一樣。姓『霧』是唯一特徵。我記得有個符號代表『後面不論接什麼都算』，讓我想想是哪一個。",
                unlockBtnId: "find_group",
                unlockSkillId: "FUZZY",
                tab: "start",
                quiz: {
                    situation: "霧氏家族成員眾多且名字後半段各異，只有姓氏相同，現在需要一次性把他們全部找出來。",
                    options: [
                        { t: "輸入『霧*』，* 代表任意長度的字", correct: true  },
                        { t: "直接輸入『霧』進行精確搜尋",            correct: false },
                        { t: "Ctrl + H 使用取代功能",                 correct: false }
                    ],
                    success_msg: "沒錯，星號就代表任意多個字！輸入『霧*』就能精準抓住所有霧開頭的名字。別忘了在選項裡設定好醒目的綠色標記哦。"
                },
                expectedCondition: { type: "FUZZY_DONE_SIGNAL", pattern: "霧*" },
                storySegmentAfter: "success_FUZZY_WU"
            },
            {
                id: "FUZZY_INFANT_TASK",
                tutorHint: "找出所有的幼兒代號（幼兒-1 到 幼兒-7），並統一標記為綠色。",
                playerText: "幼兒目前只用了代號記錄，像是『幼兒-1』，後面跟著的都是一位數字。這批脆弱的孩子必須優先安排安置。我記得問號代表的是『剛好一個字』，用在這裡再合適不過了。",
                unlockBtnId: "find_group",
                unlockSkillId: "FUZZY",
                tab: "start",
                quiz: {
                    situation: "幼兒代號的格式統一為『幼兒-』加上一位數字，現在需要精確地找出所有的幼兒，不能多也不能少。",
                    options: [
                        { t: "輸入『幼兒-?』，? 代表剛好一個字", correct: true  },
                        { t: "輸入『幼兒-*』，* 代表任意多個字", correct: false },
                        { t: "直接輸入『幼兒-』進行精確搜尋",            correct: false }
                    ],
                    success_msg: "完全正確！問號代表的是『剛好一個字』。輸入『幼兒-?』能精準抓取所有個位數代號，而不會誤抓到未來可能出現的兩位數代號。現在去設好綠色標記吧。"
                },
                expectedCondition: { type: "FUZZY_DONE_SIGNAL", pattern: "幼兒-?" },
                storySegmentAfter: "success_FUZZY_INFANT"
            },
            {
                id: "EMPTY_TASK",
                tutorHint: "定位空格 ➡️ 輸入 =↑ ➡️ 最後按下 Ctrl + Enter，一次性填滿空白戶號。",
                playerText: "戶號欄有一半是空的。發放糧食憑條是按戶點算的，同一戶的人要有相同戶號。這些空白應該和上面同一批人的戶號一樣。我記得在第三章用過一個巧妙辦法，可以一口氣填完。",
                unlockBtnId: "find_group",
                unlockSkillId: "EMPTY",
                tab: "start",
                quiz: {
                    situation: "戶號欄中存在大量空格，每個空格理應填入與其上一格相同的戶號數據。",
                    options: [
                        { t: "定位空格 ➡️ 輸入 =↑ ➡️ Ctrl+Enter", correct: true  },
                        { t: "使用 Ctrl + H 將空格批量取代",               correct: false },
                        { t: "一格一格手動填入數據",                       correct: false }
                    ],
                    success_msg: "太棒了！先選中所有空白格子，接著輸入『=↑』讓每格自動抓取上方數值，最後按下 Ctrl+Enter 即可完美填滿所有空格。"
                },
                expectedCondition: { type: "EMPTY_FILL_CHECK" },
                storySegmentAfter: "success_EMPTY"
            }
        ]
    },

    customConditionHandlers: {
        'SEARCH_VAL': (cond, signal) => {
            return signal && signal.type === 'ACTION' && signal.id === 'SEARCH_DONE' && signal.value === cond.value;
        },
        'REPLACE_CHECK': (cond, signal) => {
            if (signal && signal.type === 'ACTION' && signal.id === 'REPLACE_DONE') {
                if (signal.oldVal !== cond.oldVal) {
                    window.orchestrator.playStorySegment('fail_REPLACE_wrong_old_val');
                    return false;
                }
                if (signal.newVal !== cond.newVal) {
                    window.orchestrator.playStorySegment('fail_REPLACE_wrong_new_val');
                    return false;
                }
                const data = window.orchestrator.state.gridData;
                return !data.some(row => row.includes(cond.oldVal));
            }
            return false;
        },
        'FUZZY_DONE_SIGNAL': (cond, signal) => {
            return signal && signal.type === 'ACTION' && signal.id === 'FUZZY_DONE' && signal.value === cond.pattern;
        },
        'EMPTY_FILL_CHECK': (cond, signal) => {
            if (signal && signal.type === 'ACTION' && signal.id === 'FILL_DONE') {
                const data = window.orchestrator.state.gridData;
                return !data.slice(1).some(row => row[5] === "");
            }
            return false;
        }
    }
};
