/**
 * 試算表魔法冒險 v2 - 第 6.5 章【船上的偶遇】
 * 
 * 性格與文風重塑版 (主題：真誠的交匯 + 全面 Show Don't Tell 校準)
 * 1. 「我」：透過感官觀察來引導玩家感受角色，而非直接定義角色性格。
 * 2. 晏 (王子)：天生魅力，其強大與優雅體現於物理穩定感與細節捕捉中。
 * 3. 柔依 (Royi)：理性敏感，動作帶著事務性的俐落與冷幽默。
 * 4. 遵守文風強制規則：感官先行、拒絕科技隱喻、對話口語化、不說滿。
 */

const generateCh6_5Data = () => {
    const regions = ["北境", "東郡", "南域", "西川", "中原"];
    const months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    const herbs = ["青蓮根", "曉霧草", "赤心葉", "沉香木", "晨露珠"];
    const rows = [["編號", "產地", "月份", "藥材種類", "重量(斤)", "收購價(銀幣)"]];
    let id = 1;
    for (let i = 0; i < 40; i++) {
        const r = regions[Math.floor(Math.random() * regions.length)];
        const m = months[Math.floor(Math.random() * months.length)];
        const h = herbs[Math.floor(Math.random() * herbs.length)];
        const weight = 5 + Math.floor(Math.random() * 100);
        const unitPrice = [30, 50, 70, 80, 100, 200, 400][Math.floor(Math.random() * 7)];
        const amt = weight * unitPrice;
        rows.push([id++, r, m, h, weight, amt]);
    }
    return rows;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["65"] = {
    meta: { title: "第 6.5 章：船上的偶遇", sheetName: "🌿 跨境藥材採購帳目", reward: 3200 },
    initialGridData: generateCh6_5Data(),
    skillDefs: {
        PIVOT_CREATE: { n: "創建樞紐分析表", s: "插入→樞紐分析表", d: "把散落的數據重新組合成你想看的樣子——拖拽欄位到行、列、值，一秒看全局", cat: "insert", icon: "icon/樞紐分析表.png" },
        PIVOT_METHOD: { n: "更改匯總方式",   s: "雙擊值欄位→值欄位設定", d: "同一份數據可以看總和、也可以看平均、計數——換個角度看全局", cat: "insert", icon: "icon/樞紐分析表.png" },
        PIVOT_GROUP:  { n: "組合（分組）",    s: "右鍵→組成群組",   d: "把日期按季度歸組、把數字按區間切段——讓密密麻麻的明細變成有意義的類別", cat: "data", icon: "icon/樞紐分析表.png" }
    },

    story: {
        start: [
            { n: "系統", t: "（翌日。江面反光刺眼，甲板曬得燙腳，空氣裡混著江水和桐油的味道。）", a: "system",
              bg: "bg6_boat.png", bgm: "daily.mp3", bgPos: "center", bgZoom: 1.5,
              env: "light/1", envFrames: 25, envspeed: 80, envOpacity: 0.4, envDrift: true },
 
            { n: "我", t: "（靠在船舷上，胳膊壓著魔導書，有一搭沒一搭地看江岸。）", a: "me" 
            , se: "sea.mp3", vol: 1.0,bg:"CG/ch6.5 main.png",flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.1},
            { n: "我", t: "（昨晚跟葛蕾聊到太晚，腦袋裡灌了漿糊似的。）", a: "me", se: "sea.mp3", vol: 1.0, bgPos: "bottom", bgZoom: 1.5,bgDur:"5s" },
            { n: "我", t: "（我瞇起眼，任由江風在臉頰上刮過。）", a: "me", bgPos: "bottom", bgZoom: 1.5, se: "bell.mp3", vol: 1.0},
            { n: "米羅", t: "（盤腿坐在甲板角落啃乾餅，餅屑掉了一襟）……還要多久才能到啊。", a: "miro", se: "boy_breath.mp3",bg: "bg6_boat.png",shake:true },
            { n: "夏特", t: "（翻過一頁書，紙張摩擦聲很乾脆）今日傍晚。", a: "chate", bgPos: "left", bgZoom: 1.5, bgPos: "center", bgZoom: 1.1},
            { n: "我", t: "你怎麼知道？", a: "me",shake:true, bgPos: "center", bgZoom: 1.5},
            { n: "夏特", t: "（視線未曾離開文字）葛蕾畫的路線圖就攤在甲板上。你正踩著它呢。", a: "chate", se: "boy_attraction.mp3", vol: 0.8},
            { n: "我", t: "（低頭一看，腳底下確實壓著一角羊皮紙）……啊。", a: "me", shake: true },
            { n: "葛蕾", t: "（指尖按住圖紙邊緣）拿開。炭跡要糊了。", a: "glea", se: "paper down.mp3", vol: 0.8, flash: true, flashSFX: "flash.mp3" },
            { n: "我", t: "（趕緊挪腳）抱歉抱歉。", a: "me" },
            { n: "米羅", t: "（忍著笑）隊長妳是故意的吧。", a: "miro", shake: true },
            { n: "我", t: "我哪知道她放這裡了！", a: "me" },
            { n: "賽爾", t: "（從書頁縫隙擠出來，揉眼睛）大清早的，大家的活力還真是充足呢。", a: "fairy", se: "fairy laugh.mp3", vol: 0.8 },
            { n: "賽爾", t: "（她晃了晃翅膀，看了看兩岸）今天風裡有股苦苦的香味，不錯嘛。", a: "fairy" },

             { n: "系統", t: "（船艙前段，幾口木箱旁邊，有兩個人。）", a: "system"
              ,bgm:"showup.mp3",bg: "bg6_boat.png", bgPos: "right", bgZoom: 2.0, se: "put down.mp3", vol: 1.0},
            { n: "我", t: "（我先看到一截淡青色。)", a: "me"
            ,bgBlur:10, bgPos: "right", bgZoom: 2.5,bgDur:"2s",bg: "CG/ch6.5 royi.png", se: "trans.mp3", vol: 1.0},
            { n: "我", t: "（風吹起來的時候才看清，是髮尾。)", a: "me"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "right", bgZoom: 2.0,bg: "CG/ch6.5 royi.png"},
            { n: "我", t: "(她蹲在箱子邊上，指尖在貨單上跑得很快，甲縫裡卡著墨漬。）柔依？", a: "me"
            , bgPos: "center", bgZoom: 1.1,bg:"10s",bg: "CG/ch6.5 royi.png"},

            { n: "米羅", t: "誰？", a: "miro",bg: "bg6_boat.png" },
            { n: "我", t: "馬尾那個。之前的義診所管理員。", a: "me" },
            { n: "米羅", t: "（探頭看了一眼，整個人彈了起來）……啊！真的是她！走，去打招呼！", a: "miro", se: "boy_wa.mp3", vol: 0.9,shake:true },
 
            { n: "系統", t: "（我們走過去。木板發出沈悶的腳步聲。)", a: "system",
             se: "walk.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5 , bgDur:"4s"},
            { n: "系統", t: "（柔依旁的少年動作停了一瞬，視線在我們每個人手上轉了一圈。）", a: "system",
              flash: true, flashSFX: "flash.mp3", vol: 0.8},
            { n: "米羅", t: "柔依姊！好久不見！", a: "miro",shake:true},
            { n: "柔依", t: "（手上的筆停了一下，抬起頭）", a: "royi", bgPos: "center top", bgZoom: 1.5 },
            { n: "柔依", t: "……是你們？看來這艘船的壓艙物，比預計的要重一點。", a: "royi"},
            { n: "我", t: "好巧。這船上除了藥味就是餅味，遇到妳算是唯一的意外收獲了。", a: "me",bg: "bg6_boat.png", se: "girl_smile1.mp3", vol: 1.0},
            { n: "柔依", t: "（站起身拍拍手上的灰，動作俐落）確實巧。", a: "royi", se: "clothes1.mp3", vol: 1.0},
            { n: "柔依", t: "我本來還以為，下次見面時，我是拿著一堆帳單去堵你們的路。", a: "royi" },
            { n: "米羅", t: "哈哈，那柔依姊後來診所怎麼樣了？還那麼忙嗎？", a: "miro", bgPos: "center", bgZoom: 1.1, se: "boy_smile.mp3", vol: 1.0},
            { n: "柔依", t: "比你們來的那天好多了。名冊理順之後，後面的排班就沒再出過亂子。", a: "royi", se: "girl_en1.mp3", vol: 1.0},
            { n: "我", t: "（我轉頭跟夏特和葛蕾說了一下）", a: "me", se: "girl_attraction.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5 },
            { n: "我", t: "就是之前的義診所，那次名冊亂得一塌糊塗，我們幫她重新排過。", a: "me" },
            { n: "夏特", t: "（看了一眼柔依身邊的木箱）藥材商？", a: "chate",bg: "bg6.5 royi.png"
            , bgPos: "left", bgZoom: 2.0,flash: true, flashSFX: "trans.mp3", vol: 1.0 },
            { n: "柔依", t: "診所的藥一直是我在跑採購的。北境的青蓮根今年產季提早了，得親自去看一趟行情。", a: "royi",bg: "bg6_boat.png", bgPos: "center", bgZoom: 1.5 },
 
            { n: "晏", t: "（少年直起身，隨手將皮水袋拋向米羅。)"
            , a: "prince", se: "walk.mp3", vol: 0.7,bg:"CG/ch6.5 prince.png"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "left bottom", bgZoom: 2.0,bgm:"prince.mp3"},
            { n: "晏", t: "(浪剛好打在船身，甲板猛地一晃，他站起來的時候腰間的帶子晃了一下)"
            , a: "prince", se: "sea.mp3", vol: 0.7, se: "bell.mp3", vol: 1.0,shake:true, bgPos: "bottom", bgZoom: 2.0},
            { n: "晏", t: "(但甲板搖成這樣，他的重心卻像是釘在那裡的。", a: "prince"
            ,flash: true, flashSFX: "trans.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5},
            { n: "晏", t: "(手指在空中輕輕一扣，水袋穩穩落入米羅懷中）", a: "prince"
            , se: "put down.mp3", vol: 0.7,shake:true },
            { n: "晏", t: "喝點薑水吧。喉嚨裡的苦味能壓住翻騰的胃。我是晏，柔依的朋友。", a: "prince", bgPos: "center", bgZoom: 1.0 , bgDur:"5s"},
            { n: "米羅", t: "（有些愣住地抱著水袋）啊……謝謝！晏兄你……怎麼看出我……", a: "miro", shake: true,bg: "bg6_boat.png" },
            { n: "晏", t: "（笑著指了指自己的眼底，那裡倒映著碎金般的陽光）", a: "prince"
            ,se: "put down.mp3",flash: true, flashSFX: "bell.mp3", vol: 1.0
            , vol: 1.0,env: "light/1", envFrames: 25, envspeed: 80, envOpacity: 0.1, envDrift: true },
            { n: "晏", t: "因為你走過來的時候，視線死死摳在地板的木紋上。", a: "prince"},
            { n: "晏", t: "柔依，這幾位就是妳提到的救星？", a: "prince", bgPos: "center", bgZoom: 1.5},
            { n: "柔依", t: "嗯。幫過大忙。那天的帳要是沒他們，我大概會把整個診所燒了。", a: "royi", se: "girl_en1.mp3", vol: 1.0},
            { n: "晏", t: "（點了下頭）家裡有事去主城，正好跟柔依搭個伴。", a: "prince", bgPos: "center", bgZoom: 1.1 },
            { n: "晏", t: "這一路上看她折騰這些貨物，我也算長了見識。", a: "prince" },
            { n: "夏特", t: "（夏特盯著晏，視線在晏那雙乾淨的手上轉了半圈）", a: "chate"
            , bgPos: "bottom", bgZoom: 1.1,flash: true, flashSFX: "trans.mp3", vol: 1.0},
            { n: "夏特", t: "你的指節沒有搬運過箱木的繭，氣質也不像是長期在貨艙走動的人。", a: "chate" },
            { n: "晏", t: "（晏笑了笑，大方地把雙手攤開在我們面前。)"
            , a: "prince",bg:"CG/ch6.5 hand.png",flash: true, flashSFX: "trans.mp3", vol: 1.0, bgPos: "right", bgZoom: 2.0},
            { n: "晏", t: "（那雙手乾淨得過分，指尖輪廓流暢，沒有一點長期搬運貨物留下的粗糙痕跡。)", a: "prince", bgPos: "center", bgZoom: 2.0,bgDur:"10s"},
            { n: "晏", t: "（他在我面前晃了晃手心，動作舒展得像是在舞臺上謝幕，透著一股這地方少見的從容。）", a: "prince",shake:true},
            { n: "晏", t: "被揭穿了。", a: "prince", bgPos: "center", bgZoom: 1.1},
            { n: "晏", t: "我確實對藥理一竅不通，就是個蹭路的。", a: "prince", bgPos: "center top", bgZoom: 2.0 },
            { n: "晏", t: "不過這幾天看她細心打理這些貨物，確實挺辛苦。", a: "prince" },
 
            { n: "米羅", t: "（小聲對我說）這人說話好風趣，而且感覺挺好相處的。", a: "miro",bg: "bg6_boat.png" },
            { n: "我", t: "（我看著晏。他笑起來的時候眼睛會瞇成一條線，嘴角先動，聲音後到。)", a: "me",bg:"CG/ch6.5 prince.png", bgPos: "right", bgZoom: 1.1 , bgDur:"10s"},
            { n: "我", t: "(我不知道自己什麼時候也跟著笑了。）", a: "me" , se: "fairy_smile.mp3", vol: 1.0,shake:true},
 
            { n: "系統", t: "（柔依再次蹲下。風吹動了她的髮絲。）", a: "system", bgm: "conspiracy.mp3"
            ,bg: "CG/ch6.5 royi.png", se: "wind1.mp3", vol: 1.0, bgPos: "left", bgZoom: 1.5 , bgDur:"10s"},
            { n: "系統", t: "（她手指在貨單邊緣不安地扣弄著，眉頭擰成了一個結。）", a: "system"},
            { n: "柔依", t: "（她發出一聲很輕的嘆息。）", a: "royi", se: "boy_breath.mp3", vol: 1.0},
            { n: "柔依", t: "（那聲音混雜在藥草的苦味和水聲裡，連帶著周圍的空氣都沉重了幾分。）", a: "royi"},
            { n: "柔依", t: "帳目太多了。五個產地，四十幾筆記錄。手算慢得讓人發瘋。", a: "royi", bgPos: "left", bgZoom: 1.1},
            { n: "晏", t: "（晏轉向柔依，眼裡的笑意褪去了不少，只剩下細碎的擔憂）", a: "prince"
            ,se: "put down.mp3", vol: 1.0,bg:"CG/ch6.5 worry.png", bgPos: "top", bgZoom: 2.0 , bgDur:"10s"},
            { n: "晏", t: "柔依昨晚對帳到蠟燭熄滅。", a: "prince"},
            { n: "晏", t: "今年物價波動大，要是均價算不準，這趟北境之行恐怕要虧在運費上了。", a: "prince" },
            { n: "晏", t: "（目光落在魔導書上，停留了極短的一瞬）", a: "prince",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "晏", t: "如果你們那本神奇的書能幫幫她，我想這姑娘一定會開心得請大家喝茶的。", a: "prince" },
            { n: "我", t: "可以的。之前那次是排序和篩選，這次?", a: "me",bg: "bg6_boat.png", se: "girl_en1.mp3", vol: 1.0},
            { n: "柔依", t: "我想看跨產地和跨季節的採購全貌。上次整理名冊那招，還能用嗎？", a: "royi",shake:true },
            { n: "賽爾", t: "（從書頁探出頭）嘿嘿，你上次學的那個東西，正好用得上嘛。", a: "fairy"
            , se: "fun1.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.1 },
            { n: "柔依", t: "（摸出幾枚銀幣，放在箱子上）幫忙的錢。別嫌少。", a: "royi", se: "coin2.mp3", vol: 1.0},
            { n: "我", t: "（笑著推回）不用了。", a: "me", se: "girl_smile1.mp3", vol: 1.0 },
            { n: "柔依", t: "那行。既然你們喜歡做白工，這個人情我就心安理得地欠著了。", a: "royi"
            ,flash: true, flashSFX: "boom.mp3", vol: 1.0, se: "paper down.mp3", vol: 0.9 },

        ],
 
        discovery_PIVOT_CREATE: [
            { n: "系統", t: "（挑戰模式：讓數據歸位。「產地」，「藥材種類」，「收購價(銀幣)」。）", a: "system" }
        ],
        success_PIVOT_CREATE: [
            { n: "我", t: "（配置完畢。矩陣生成。數據在螢幕上整齊地舒展開來。）", a: "me" },
            { n: "柔依", t: "（湊近螢幕，指尖在北境那一欄停住）", a: "royi", shake: true },
            { n: "柔依", t: "原來比例比預想的大這麼多。看來今年的霜降，比往年還要狠啊。", a: "royi", shake: true },
            { n: "柔依", t: "不過如果能算『平均』每筆賣出去多少錢，我就能判斷這批藥材的真實水位了。", a: "royi" }
        ],

        mid_story: [
            { n: "葛蕾", t: "產地均價。妳在尋求一種跨地域的套利邏輯。這帳目我看可不只是為了報銷用的吧？", a: "glea", isDramatic: true },
            { n: "柔依", t: "（沒有閃躲）判斷哪個產地值得長線加量罷了。", a: "royi" },
            { n: "柔依", t: "利潤要是蓋不過運費，總不能把那一整批藥材綁在身上游回去", a: "royi" },
            { n: "晏", t: "（自然地接過話頭，看向葛蕾手裡的規劃冊）", a: "prince", se: "walk.mp3" },
            { n: "晏", t: "妳這打算倒是精明。用單價優勢去平攤水路多出來的一成半損耗。", a: "prince" },
            { n: "我", t: "好了，讓柔依先看數據吧。", a: "me" }
        ],

        discovery_PIVOT_METHOD: [
            { n: "系統", t: "（挑戰模式：將值欄位名稱，函數切換為『平均值』。）", a: "system" }
        ],
        success_PIVOT_METHOD: [
            { n: "我", t: "（數字跳動，均價整齊地排成一列。）", a: "me" },
            { n: "柔依", t: "（在貨單上記下數字）最後一個。能按『季節』分組看嗎？月份太碎了。", a: "royi", se: "pen.mp3", vol: 0.8 }
        ],
        // ── 任務 3 引導 ──
        discovery_PIVOT_GROUP: [
            { n: "系統", t: "（挑戰模式：將「月份」組成按「季節」分組）", a: "system" }
        ],
        success_PIVOT_GROUP: [
            { n: "我", t: "（分組完成。原本的 12 個月份被整併為四季。）", a: "me" },
            { n: "柔依", t: "（合上冊子，目光清亮）夠了。比我自己埋頭翻上一整夜快得多。多謝。", a: "royi" },
            { n: "系統", t: "（她站起來，從木箱深處翻出一個包得緊實、帶著苦香的油紙包，放到了我的手邊。）", a: "system", se: "put down.mp3", vol: 0.8 }
        ],

 end: [
     { n: "系統", t: "（傍晚了。江風撲在臉上帶著一股涼意提醒著我們離主城不遠了。）", a: "system",
       bg: "bg6 boat dusk.png", bgm: "sweet.mp3", bgPos: "center", bgZoom: 1.1,
       env: "white smoke/1", envFrames: 25, envspeed: 60, envOpacity: 0.15, envDrift: true },
            { n: "系統", t: "（抬頭看見亮橘色的日頭沉了下去，主城外港連綿的屋脊像剪影一樣從薄霧中擠出來。）", a: "system",
            bgPos: "right", bgZoom: 1.5,bgDur: "10s" },
            { n: "系統", t: "（船速慢了下來，那種搖晃感淡去。）", a: "system"
            ,flash: true, flashSFX: "trans.mp3", vol: 1.0},
            { n: "系統", t: "（水聲顯得空靈而清晰，聽著竟有種終於要解脫的錯覺。）", a: "system",
              se: "sea2.mp3",vol:1.0},
 
            { n: "米羅", t: "（扛起包袱往舷邊擠，兩眼放光)", a: "miro"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0, bgm: "finish.mp3", bgPos: "center", bgZoom: 1.1},
            { n: "米羅", t: "（那種迫不及待想要踏上陸地的樣子，跟前幾天在艙裡暈得半死的人簡直判若兩人。）", a: "miro", 
            bgm: "finish.mp3" },
            { n: "米羅", t: "到了！妳看那碼頭的火光，我感覺自己活過來啦！", a: "miro",
              se: "boy_wa.mp3", vol: 1.0, shake: true, bgm: "finish.mp3" },
            { n: "夏特", t: "（伸手理了理領口。）", a: "chate"
            , bgPos: "center", bgZoom: 1.5 ,flash: true, flashSFX: "clothes1.mp3", vol: 1.0},
            { n: "夏特", t: "你從未面臨過危險。不過這份解脫感倒是不假。", a: "chate" },
            { n: "米羅", t: "你不懂！", a: "miro",shake:true},
 
            { n: "系統", t: "（晏站在眾人中心。橘色的餘暉落在他半邊臉上。）", a: "system"
            , bgPos: "left", bgZoom: 1.5,bgm:"prince2.mp3",bg:"CG/ch6.5 bye.png"},
            { n: "晏", t: "遇見妳們令這趟水路很精彩。這本書的用法尤其有趣。", a: "prince", bgPos: "center", bgZoom: 1.1,bgDur:"10s" },
            { n: "我", t: "有機會再教妳操作。說到做到。", a: "me",bg:"bg6.5 dock.png",flash: true, flashSFX: "bell.mp3", vol: 1.0},
            { n: "晏", t: "（他爽朗地大笑起來，手指在腦袋旁晃了晃。）", a: "prince",bg:"CG/ch6.5 bye.png"},
            { n: "晏", t: "真的？那我可得好好等著了。朋友們，後會有期。"
            , a: "prince",shake:true,bg:"CG/ch6.5 bye.png", bgPos: "center", bgZoom: 1.5,bgDur:"10s" },
            { n: "米羅", t: "記得找我們吃飯啊！晏兄！", a: "miro",bg:"bg6.5 dock.png" },
            { n: "晏", t: "好。主城挺大的，說不定又碰到呢。", a: "prince",bg:"CG/ch6.5 bye.png"},
            { n: "葛蕾", t: "（頭也不抬，目光依舊鎖在那些密密麻麻的規劃冊上，隨口就拋出句）", a: "glea",bg:"bg6.5 dock.png"  },
            { n: "葛蕾", t: "主城東門進去比較近。你要是不認路，問守衛就行。", a: "glea" },
            { n: "夏特", t: "（合上書，看了晏一眼）路上小心。", a: "chate"},
            { n: "晏", t: "（笑了笑）嗯。你們也是。", a: "prince" ,bg:"CG/ch6.5 bye.png" },
            { n: "系統", t: "（他轉身走進了那片熱鬧的煙火氣裡，身影沒多久就和那些趕路的人群重疊在一起。)"
            ,bg:"CG/ch6.5 prince back.png",flash: true, flashSFX: "trans.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1 , bgDur:"5s" ,a: "system"},
            { n: "系統", t: "（那個背影走得這樣從容，下一次見面時，一定會很有意思。）", a: "system" },
 
            { n: "系統", t: "（碼頭的味道，魚腥、濕繩、烤餅煙撲面而來。）", a: "system",
              bg: "CG/ch6.5 all.png", bgm: "finish.mp3", bgPos: "right", bgZoom: 4.0},
            { n: "柔依", t: "（聲音混著碼頭的風聲傳過來）採購的下一站也在城東商貿區。", a: "royi"
            , bgPos: "center", bgZoom: 1.1,bgDur:"25s" ,se: "wind1.mp3", vol: 1.0},
            { n: "柔依", t: "如果不嫌棄，進城這段路，結個伴？", a: "royi" },
            { n: "葛蕾", t: "順路。走吧。", a: "glea"},
            { n: "我", t: "那就一起走吧。米羅這傢伙要是沒人盯著，估計會在碼頭把自己弄丟。", a: "me"
            , se: "girl_laugh.mp3", vol: 1.0},
            { n: "米羅", t: "（重重跺了兩下石板路）地！地！妳看，這地面居然一點都不晃！哇哈哈！"
            , se: "boy_wa.mp3", vol: 1.0},
            { n: "夏特", t: "（看著米羅耍寶，嘴角難得放鬆）主城比我想像中龐大。"},
            { n: "柔依", t: "（她輕哼了一聲，語調帶著點笑意）主城人多十倍。米羅，希望你到時候不會因為人多而暈陸地。", a: "royi"
            },
            { n: "米羅", t: "柔依姊！別取笑我啦！", a: "miro"
            ,shake:true},
            { n: "賽爾", t: "（打了個哈欠）我覺得柔依的提議不錯呢，乾脆把他也寫進零件維護手冊好了。", a: "fairy"
            , se: "fairy_sleep.mp3", vol: 1.0},
 
            { n: "系統", t: "（六個人並肩走進了港口的深處。晚霞將大家的影子拉得很長。）", a: "system",
              bg: "CG/ch6.5 last.png", bgPos: "center", bgZoom: 1.5, bgDur: "5s", se: "sea.mp3",bgm:"sweet2.mp3",flash: true, flashSFX: "bell.mp3", vol: 1.0 },
            { n: "我", t: "（米羅還在和夏特為了晚飯吃什麼拌嘴。）", a: "me"},
            { n: "我", t: "（江風刮過，魔導書的硬皮貼著我懷裡，涼得厲害。）", a: "me" },
            { n: "我", t: "(我趕緊快走幾步，跟上他們的腳步。）", a: "me", bgPos: "center", bgZoom: 1.1, },
            { n: "系統", t: "（江水被拋在身後了。腳下的路，終於不再搖晃。）", a: "system" }
        ],
 
        fail_PIVOT_wrong: [ { n: "系統", t: "（欄位似乎迷路了。產地去列，月份去欄，收購價(銀幣)去值。再試一次吧。）", a: "system" } ],
        fail_METHOD_wrong: [ { n: "系統", t: "（她需要的是單價的平均值。雙擊值欄位切換吧。）", a: "system" } ],
        fail_GROUP_wrong: [ { n: "系統", t: "（右鍵點擊月份，選「組成群組」，整併為季節大局吧。）", a: "system" } ]
    },

    simulator: {
        bgm: "BGM/game_bgm.mp3",
        tasks: [
            {
                id: "PIVOT_CREATE_TASK",
                tutorHint: "任務：建立樞紐分析表。",
                playerText: "用透視表將跨產地、跨月份的藥材帳目織成一張上帝視角的網。",
                unlockBtnId: "insert_group",
                unlockSkillId: "PIVOT_CREATE",
                tab: "insert",
                expectedCondition: { type: "ACTION", actionId: "PIVOT_CREATE" },
                storySegmentBefore: "discovery_PIVOT_CREATE",
                storySegmentAfter: "success_PIVOT_CREATE",
                midStoryAfter: "mid_story",
                quiz: {
                    situation: "（挑戰模式）「柔依想要看不同藥材、不同產地的彙總，我該如何配置？」",
                    options: [
                        { t: "列：產地 / 欄：藥材種類 / 值：收購價(銀幣)", correct: true },
                        { t: "列：編號 / 欄：重量 / 值：藥材種類", correct: false }
                    ],
                    success_msg: "直覺非常敏銳。點擊【插入 → 樞紐分析表】，然後依此配置欄位吧。"
                }
            },
            {
                id: "PIVOT_METHOD_TASK",
                tutorHint: "任務：將匯總方式切換為「平均值」。",
                playerText: "幫助柔依看清真正的價值核心。將匯總方式切換成平均值。",
                unlockBtnId: "insert_group",
                unlockSkillId: "PIVOT_METHOD",
                tab: "insert",
                expectedCondition: { type: "ACTION", actionId: "PIVOT_METHOD_CHANGE" },
                storySegmentBefore: "discovery_PIVOT_METHOD",
                storySegmentAfter: "success_PIVOT_METHOD",
                quiz: {
                    situation: "（挑戰模式）「柔依想要看『實際的平均單價』，我應該雙擊標題後選擇哪項計算？」",
                    options: [
                        { t: "加總", correct: false },
                        { t: "平均值", correct: true }
                    ],
                    success_msg: "沒錯。數據的真面目就藏在平均值裡。雙擊左上角標籤進行設定。"
                }
            },
            {
                id: "PIVOT_GROUP_TASK",
                tutorHint: "任務：執行「組成群組」將月份摺疊為季節。",
                playerText: "月份太零碎了。將其摺疊為季節大局。",
                unlockBtnId: "insert_group",
                unlockSkillId: "PIVOT_GROUP",
                tab: "insert",
                expectedCondition: { type: "ACTION", actionId: "PIVOT_GROUP_APPLY" },
                storySegmentBefore: "discovery_PIVOT_GROUP",
                storySegmentAfter: "success_PIVOT_GROUP",
                quiz: {
                    situation: "（挑戰模式）「月份數據太雜，想要看季度的週期規律，該施展哪一項禁術？」",
                    options: [
                        { t: "資料驗證", correct: false },
                        { t: "組成群組", correct: true }
                    ],
                    success_msg: "正確。將散落的月份摺疊起來吧。記得先用【樞紐分析表】加入月份欄位。"
                }
            }
        ]
    }
};
