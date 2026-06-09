/**
 * 試算表魔法冒險 v2 - 第 1.5 章
 * 腳本優化：將文風與第 5 章對齊，增加感官描寫與角色動作重量。
 * 閱讀優化：進一步拆分長句，確保每行文字長度適中。
 */

const generateCh1_5Data = () => {
    const base = [
        ["品項", "等級", "類別", "數量", "入庫日期", "", ""],
        ["馬草", "E", "飼料", "300", "", "", ""],
        ["燕麥", "D", "飼料", "500", "", "", ""],
        ["止痛藥", "F", "消耗品", "120", "", "", ""],
        ["馬蹄鐵", "B", "裝備", "50", "", "", ""],
        ["高級馬鞍", "A", "裝備", "15", "", "", ""],
    ];
    for(let i=6; i<=100; i++) {
        base.push([`普通草料-${i}`, "F", "飼料", Math.floor(Math.random()*100), "", "", ""]);
    }
    return base;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["15"] = {
    meta: {
        title: "第 1.5 章：驛站的爛攤子",
        sheetName: "🌾 補給總冊",
        reward: 600
    },

    skillDefs: {
        F: { n: "凍結窗格", s: "Alt+W+F+R", d: "捲動時將標題列固定在最上方", cat: "org", icon: "icon/凍結窗格.png" },
        NAV: { n: "快速跳轉", s: "Ctrl+方向鍵", d: "在大量數據中快速移動到邊界", cat: "move" },
        SWAP: { n: "欄位對調", s: "Shift+拖曳", d: "快速交換整列或整欄的位置", cat: "org" },
        S: { n: "新增工作表", s: "底部 [+] ", d: "在同一個檔案中建立新的數據分頁", cat: "org" },
        FILL: { n: "自動填滿", s: "右下角方塊", d: "依照選取儲存格的規律自動產生序列", cat: "data" },
        DATE: { n: "插入日期", s: "Ctrl+;", d: "在儲存格中輸入當前系統日期", cat: "data" }
    },

    story: {
        start: [
            { n: "系統", t: "（我牽著早已疲憊不堪的老馬，在楓鈴驛站那扇略顯破舊的大門前停下腳步。）", a: "me", bgm: "daily.mp3", bg: "CG/ch1.5 start.png",trans: true,se:"walk.mp3", vol:1.0, bgPos: "center", bgZoom: 1.0,shake: true },
            { n: "系統", t: "（遠處傳來陣陣馬嘶聲，夾雜著泥土與乾草混合的獨特氣味。）", a: "system",se:"horse.mp3", vol:1.0 , vol:1.0, bgPos: "left", bgZoom: 1.5, bgDur:"3s" },
            { n: "我", t: "（肩膀猛地一沉，賽爾這傢伙不知何時又蹲在了上面，還不安分地晃著它那兩條纖細的小腿。）", a: "me" , bgPos: "right", bgZoom: 1.5, bgDur: "1s", flash:true,se:"fall.mp3", vol:1.0  },
            { n: "我", t: "賽爾，妳能不能稍微安分一點點？妳這麼一直晃，晃得我腦袋都要暈了。 ", a: "me", bgPos: "right top 20%"},
            { n: "賽爾", t: "哼，本仙子這是在幫你鍛鍊肩膀的承重極限，你應當感到榮幸才對！", a: "fairy", se: "fairy.mp3", bgPos: "right", se:"clothes1.mp3", vol:1.0},
            { n: "賽爾", t: "先別管你那可憐的肩膀了，少年，快看那邊！", a: "fairy" },
            { n: "賽爾", t: "那個穿著驛站制服、灰頭土臉的小鬼，看起來簡直快要當眾哭出來了。 ", a: "fairy" },
            { n: "系統", t: "（一名年輕的驛站職員雙手死死抱著一本封面磨損、幾乎快要散架的《補給總冊》。）", a: "miro", bg: "CG/ch1.5 miro.png", bgm: "goofy.mp3",flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "left bottom", bgZoom: 2.0 },
            { n: "系統", t: "（他正對著眼前一名氣勢洶洶的驛站主管，卑微地拼命點頭哈腰。）", a: "miro", vol: 1.0, bgPos: "right top", bgZoom: 2.0  },
            { n: "米羅", t: "主管，真的對不起！前任記錄員走得實在太倉促了，把裡面的編號全弄亂了……", a: "miro", se:"boy_sorry.mp3", vol:1.0, bgPos: "center", bgZoom: 1.0, bgDur:"10s" },
            { n: "米羅", t: "我……我這幾天真的已經盡全力在梳理了，可是……", a: "miro" },
            { n: "驛站主管", t: "（猛地一拍桌子，震得灰塵四起）我可沒閒工夫聽你抱怨什麼前任留下的爛攤子！", a: "npc1", se: "boy_underest.mp3", vol: 1.0, flash: true, flashSFX: "pa.mp3", vol:1.0, shake:true, bgPos: "left top", bgZoom: 2.0 },
            { n: "驛站主管", t: "明天下午皇家的補給稽核員就要到了！如果這本總冊到那時還對不上帳……", a: "npc1" },
            { n: "驛站主管", t: "你明天就給我收拾東西捲鋪蓋滾蛋！回你那窮鄉僻壤的老家繼續搬貨去吧！", a: "npc1", flash: true, flashSFX: "flash.mp3", vol:1.0, shake:true },
            { n: "系統", t: "（主管轉身離去，留下米羅獨自站在原地，瘦弱的肩膀劇烈地顫抖著。）", a: "miro", se: "boy_tear.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.0, bgDur:"10s"  },
            { n: "米羅", t: "可是格式根本不對，編號也完全對不上……這種混亂的帳目，到底要怎麼辦啊。", a: "miro" },
            { n: "米羅", t: "我辛苦搬了整整三年的重貨，好不容易才爭取到這個記錄員的位置……", a: "miro" },
            { n: "米羅", t: "難道我真的就像他們嘲笑的那樣，這輩子註定只能在碼頭搬貨嗎。 ", a: "miro" },
            
            { n: "我", t: "（我看著他那副失魂落魄的模樣，走過去遞給他一塊乾淨的抹布，輕聲開口。）", a: "me",bg:"bg1.5.png", bgm: "daily.mp3", se: "girl_attraction.mp3", vol: 1.0, trans: true   },
            { n: "我", t: "打擾一下，這份工作，或許我能幫上一點微薄的小忙。 ", a: "me" },
            { n: "我", t: "我剛好從這邊路過，本來只是想進來討杯水喝，結果聽到了你們主管的咆哮。 ", a: "me" },
            { n: "我", t: "你懷裡抱著的這本，應該就是那份讓人生畏的物資清單吧？", a: "me" },
            { n: "系統", t: "（米羅猛地驚起，像是受驚的兔子一般望向你，眼神中充滿了戒備與迷茫。）", a: "miro", se: "boy_scare.mp3", vol: 1.0, shake:true },
            { n: "米羅", t: "哇啊！？你、你是什麼時候從哪裡冒出來的？", a: "miro" },
            { n: "米羅", t: "（他意識到自己的失態，侷促地低下頭）抱歉，飲用水就在旁邊的木桶裡，你隨意。 ", a: "miro", se: "boy_sorry.mp3", vol: 1.0   },
            { n: "米羅", t: "這本確實是驛站的內部數據，雖然現在在我手裡，看起來跟廢紙沒兩樣。 ", a: "miro", se: "paper down.mp3", vol: 1.0 },
            { n: "我", t: "（露出自信的微笑）實話告訴你吧，我前幾天才剛在公會那座幽暗的魔法倉庫裡……", a: "me", se: "girl_smile1.mp3", vol: 1.0 },
            { n: "我", t: "獨自對付過比這還要恐怖十倍的物資大山。", a: "me", flash: true, flashSFX: "boom.mp3", vol:1.0, bg:"bg1.png", bgPos:"center", bgZoom:3.0 },
            { n: "我", t: "你先去幫我把這匹累壞的馬給餵了，順便讓自己緊繃的神經歇會兒吧。 ", a: "me",bg:"bg1.5.png", bgPos:"center", bgZoom:1.0 },
            { n: "我", t: "至於這本亂糟糟的清單……我就順手幫你理清楚了。 ", a: "me", se: "book.mp3", vol: 1.0   },
            { n: "系統", t: "（米羅半信半疑地張大嘴巴，看著眼前這個神祕的旅行者。）", a: "miro", se: "boy_ah1.mp3", vol: 1.0, shake:true   },
            { n: "米羅", t: "順、順手幫我看看？這可是橫跨了數百個欄位的複雜數據啊。", a: "miro" },
            { n: "米羅", t: "裡面藏著幾千筆不同日期、不同區域的物資，你真的……不是在拿我開玩笑嗎？", a: "miro" },
            { n: "賽爾", t: "（它在一旁發出了銀鈴般的偷笑聲，眼神中透著一股捉弄人的興奮。）", a: "fairy", se: "fairy_smile.mp3", vol: 1.0  },
            { n: "賽爾", t: "少年這傢伙現在可是自信心爆棚呢。就乾脆交給他去露一手吧！", a: "fairy",flash: true, flashSFX: "boom.mp3", vol: 1.0 }
        ],
        mid_story: [
            { n: "系統", t: "（我正全神貫注地伏在桌案前核對著那些跳動的數據，忽然感到一絲異樣，疑惑地抬起頭。）", a: "me" },
            { n: "我", t: "賽爾，妳聽……外頭怎麼又傳來了那種沉重的挑水聲？", a: "me" },
            { n: "賽爾", t: "（它慵懶地指了指窗外）是米羅那小子啦。他一邊在幫你餵馬……", a: "fairy" },
            { n: "賽爾", t: "一邊還順便把你們驛站門口那四個乾枯的大木桶全給挑滿了水。 ", a: "fairy" },
            { n: "賽爾", t: "現在正一邊喘著粗氣，一邊拿著他那件破襯衫在瘋狂擦汗呢。", a: "fairy" },
            { n: "我", t: "（我心頭微微一緊）糟了，這孩子怎麼勤快到連地都想幫我順便擦了？", a: "me" },
            { n: "我", t: "他幹得這麼賣力，我這半吊子的禁術技術要是等一下把他的賬冊給算歪了……", a: "me" },
            { n: "我", t: "那我不就是徹底害慘了他，讓他得回老家搬貨去了嗎？", a: "me" },
            { n: "賽爾", t: "（它露出了一副幸災樂禍的表情）哼哼，現在終於感覺到沉重的壓力了吧？", a: "fairy" },
            { n: "賽爾", t: "本仙子早就放下話了，這一關我是絕對不會動用半點魔力插手幫忙的。 ", a: "fairy" },
            { n: "賽爾", t: "你只能在數據的汪洋中自求多福囉。", a: "fairy" },
            { n: "我", t: "（我深吸一口氣，再次緊握手中的筆）誰稀罕妳那點微薄的幫忙了？妳就睜大眼睛看著瞧吧。", a: "me" },
            { n: "我", t: "我一定能憑自己的本事搞定這一切。 ", a: "me" },
            { n: "我", t: "既然人家連馬都幫我餵飽了，我作為這本魔導書的持有者，也絕對不能落後。 ", a: "me" },
            { n: "我", t: "就算只用第一章學到的那些皮毛招式，就算是死磕到底……", a: "me" },
            { n: "我", t: "我也得在天黑前，把這後半張迷宮般的表格全部理得乾乾淨淨！", a: "me" }
        ],
        end: [
            { n: "我", t: "（我重重地將手中的羽毛筆擱在桌案上，發出一聲清脆的響動。）", a: "me", bg: "bg1.5.png", bgm: "daily.mp3", se: "pen.mp3", vol: 1.0  },
            { n: "系統", t: "（整個人彷彿脫力一般癱軟在僵硬的木椅上，長長地吐出了一口胸中的濁氣。）", a: "system", se: "girl_ow.mp3", vol: 1.0},
            { n: "我", t: "（一邊機械地揉著那雙酸痛到幾乎失去知覺的手腕，一邊看著眼前整齊劃一的數據。）", a: "me", bg:"stuff/hand pain.png", bgPos:"center", bgZoom:3.0, bgDur:"8s"  },
            { n: "我", t: "呼……總算是將這堆亂麻全部對齊了。 ", a: "me", se: "paper down.mp3", vol: 1.0 },
            { n: "我", t: "第一次獨自應對這種規模的數據洪流，老實說，我剛才手心裡全是冷汗。 ", a: "me" },
            { n: "我", t: "萬幸，最後還是趕在崩潰前守住了防線。 ", a: "me", flash: true, bg: "bg1.5.png", bgPos:"center", bgZoom:1.0},

            { n: "賽爾", t: "（它輕盈地盤旋在半空，發出一陣戲謔的笑聲）居然真的被你給徹底理乾淨了 ", a: "fairy", se: "fairy_smile.mp3", vol: 1.0 },
            { n: "賽爾", t: "本仙子不在旁邊監督你也能發揮到這種程度，算你這次勉強跨過了及格線吧。", a: "fairy" },
            { n: "系統", t: "（這時，米羅提著水桶，滿臉疲憊地走進來。目光不經意地掃過桌面的清單。）", a: "miro", se: "boy_wa.mp3", vol: 1.0, bgm: "sweet.mp3", se: "walk.mp3"  },
            { n: "米羅", t: "（整個人僵立在原地，手中的水桶哐噹掉落在地）這……真的是我剛才交給你的那本破爛賬冊嗎？", a: "miro", shake: true, flash: true, flashSFX: "flash.mp3" },
            { n: "米羅", t: "原本估計要耗費數日夜去死磕的跨區編號，你竟然……只是隨手拉一下就全部對齊了？！", a: "miro" },
            { n: "米羅", t: "（他的眼眶漸漸泛紅）以前……公會的人都說我毫無天賦……", a: "miro", se: "boy_tear.mp3", vol: 1.0  },
            { n: "米羅", t: "說我這輩子註定與數據無緣，只能在陰暗的碼頭搬貨到老……", a: "miro" },
            { n: "米羅", t: "原來……這些冰冷的數據，也是可以變得這麼聽話、這麼整齊的啊。 ", a: "miro" },
            { n: "我", t: "（我看著他那副模樣，有些侷促地抓了抓頭髮，將沉甸甸的名冊推向他的懷中。）", a: "me", bg: "CG/Ch1.5.png",shake:true, bgPos:"center", bgZoom:2.0, se: "fall.mp3", vol: 1.0 },
            { n: "我", t: "快拿去向主管交差吧，拿出點氣勢來，別再讓他們看扁了。加油。", a: "me", bgPos:"center", bgZoom:1.0, bgDur:"6s"   },
            { n: "我", t: "其實我也不是什麼天才。", a: "me", se: "girl_embrass.mp3", vol: 1.0  },
            { n: "我", t: "這些技巧，我也僅僅是前幾天才剛從一個愛捉弄人的精靈那裡學會的。 ", a: "me" },
            { n: "我", t: "這本名冊之所以能對齊，更多是因為你之前的底子原本就記錄得非常紮實。 ", a: "me" }, 
            { n: "系統", t: "（米羅抬起頭，眼神中閃爍著一種前所未有的、熾熱的光芒。）", a: "miro", bgPos:"top", bgZoom:1.5, bgDur:"2s"  }, 
            { n: "米羅", t: "謝謝你！真的萬分感謝！那個……我能不能……以後也跟著你學習這些神祕的招式？", a: "miro" }, 
            { n: "米羅", t: "我想變得跟你一樣強大！我不想再體會那種邊加班邊哭著跪求別人的無力感了。 ", a: "miro" }, 
            { n: "我", t: "只要你是真心想踏入這條禁術之路，多加磨練，你未來的造詣肯定會在我之上。 ", a: "me", bg: "CG/Ch1.5.png" },
            { n: "我", t: "對了，我叫--。以後若是有緣，這片大陸的某個角落我們總會再見的。 ", a: "me", bgPos:"center", bgZoom:1.0, bgDur:"6s"  }, 
            { n: "系統", t: "（米羅站在塵土飛揚的驛站門口，呆呆地凝視著你翻身上馬、逐漸遠去的背影。）", a: "miro", bg: "bg1.5.png", se: "horse run.mp3", vol: 1.0  },
            { n: "米羅", t: "--……我記住了。我一定會瘋狂練習，直到比誰都熟練的那一天！", a: "miro", shake:true },
            { n: "系統", t: "（賽爾優哉游哉地盤腿坐在我的肩膀上)", a: "fairy", bg: "CG/ch1.5 road.png", bgm: "sweet2.mp3", bgPos:"right", bgZoom:3.0 },
            { n: "系統", t: "(饒有興致地回頭望了一眼那個在夕陽下依舊挺立的身影。）", a: "fairy"},
            { n: "賽爾", t: "（它嘴角露出一抹難得的淺笑）", a: "fairy", se: "fairy_smile.mp3", vol: 1.0, bgPos:"center", bgZoom:1.0, bgDur:"15s" },
            { n: "賽爾", t: "那小子剛才看你的那種眼神……讓我想起了很久以前見過的某位大人物。", a: "fairy"},
            { n: "賽爾", t: "擁有這種近乎執拗性格的人，命運遲早會把我們再次推到同一個祭壇前的。 ", a: "fairy" },
            { n: "賽爾", t: "走吧少年，別磨蹭了", a: "fairy" },
            { n: "賽爾", t: "前方那座繁華到令人窒息的王城，可正揮舞著金幣在向我們招手呢！", a: "fairy" }
            ],
        success_F: [{ n: "賽爾", t: "還行嘛，看來你還沒忘記怎麼固定標題列。", a: "fairy" }],
        success_NAV: [{ n: "賽爾", t: "快速跳轉這招也掌握得不錯，值得表揚。", a: "fairy" }],
        success_SWAP: [{ n: "賽爾", t: "居然還記得怎麼對調欄位，本仙子對你有點刮目相看了。", a: "fairy" }],
        success_S: [{ n: "賽爾", t: "開闢新分頁的動作挺熟練的，繼續保持。", a: "fairy" }],
        success_FILL: [{ n: "賽爾", t: "自動填滿這招用得不錯，看來你掌握了訣竅。", a: "fairy" }],
        success_DATE: [{ n: "賽爾", t: "最後的日期也順利蓋上了！這下子大功告成啦！", a: "fairy" }]
    },

    initialGridData: generateCh1_5Data(),

    simulator: {
        mode: 'GUIDED',
        bgm: 'game_bgm.mp3',
        defaultTab: 'view',
        tasks: [
            { 
                id: "FREEZE", 
                tutorHint: "任務: 固定標題列。", 
                playerText: "「標題列一捲動就看不見了，得趕快把它給固定住才行。」",
                expectedCondition: { type: 'ACTION', actionId: 'FREEZE_PANES' },
                unlockSkillId: "F",
                storySegmentAfter: "success_F", 
                unlockBtnId: "freezePanes",
                tab: "view",
                quiz: {
                    situation: "「可惡，一捲動標題就不見了，這堆數據根本沒法看啊！賽爾，快教我那一招！」",
                    options: [
                        { t: "凍結窗格", correct: true },
                        { t: "自動填滿", correct: false },
                        { t: "新增工作表", correct: false }
                    ],
                    success_msg: "沒錯，就是這招！現在請點擊工具列完成操作吧。"
                }
            },
            { 
                id: "NAV", 
                tutorHint: "任務: 快速跳到清單最底部。", 
                playerText: "「這表實在太長了，有什麼快捷鍵能讓我一秒跳到最下面嗎？」",
                expectedCondition: { type: 'ACTION', actionId: 'QUICK_JUMP' }, 
                unlockSkillId: "NAV",
                storySegmentAfter: "success_NAV",
                quiz: {
                    situation: "「這清單也太長了吧！要是能像瞬移一樣直接跳到最後一行就好了，救命啊。」",
                    options: [
                        { t: "快速跳轉", correct: true },
                        { t: "欄位對調", correct: false },
                        { t: "新增工作表", correct: false }
                    ],
                    success_msg: "對啦，這就是瞬移禁術！按住 Ctrl + ↓ 試試看吧。"
                }
            },
            { 
                id: "SWAP", 
                tutorHint: "任務: 將 B 欄與 C 欄對調。", 
                playerText: "「糟了，等級和類別的位置放反了，得趕緊換過來才行。」",
                expectedCondition: { type: 'ACTION', actionId: 'COLUMN_SWAP' }, 
                unlockSkillId: "SWAP",
                storySegmentAfter: "success_SWAP",
                quiz: {
                    situation: "「糟了，我不小心把等級跟類別給填反了，難道得全部刪掉重打嗎？我拒絕這種悲劇！」",
                    options: [
                        { t: "欄位對調", correct: true },
                        { t: "插入日期", correct: false },
                        { t: "凍結窗格", correct: false }
                    ],
                    success_msg: "冷靜點，用這招對調空間就行了。去把 B 欄拖到 C 欄右邊去吧。"
                }
            },
            { 
                id: "ADD_SHEET", 
                tutorHint: "任務: 建立一個新的空白工作表。", 
                playerText: "「我得準備一張新表來另外記錄這些特殊的數據。」",
                expectedCondition: { type: 'ACTION', actionId: 'ADD_SHEET' },
                unlockSkillId: "S",
                storySegmentAfter: "success_S",
                quiz: {
                    situation: "「藥水資料得另外放一張表，我該在哪裡開拓新的存儲維度呢？」",
                    options: [
                        { t: "新增工作表", correct: true },
                        { t: "自動填滿", correct: false },
                        { t: "快速跳轉", correct: false }
                    ],
                    success_msg: "沒錯！點擊底部的 + 號來開闢一個新的空間吧。"
                }
            },
            { 
                id: "AUTO_FILL", 
                tutorHint: "任務: 完成編號的自動填滿。", 
                playerText: "「這麼長的連續編號，總不能讓我一行行手打吧，太累了。」",
                expectedCondition: { type: 'ACTION', actionId: 'AUTO_FILL' }, 
                unlockSkillId: "FILL",
                storySegmentAfter: "success_FILL",
                quiz: {
                    situation: "「這幾百行的編號，要是讓我手打，我今天就別想回家吃飯了。賽爾救命！」",
                    options: [
                        { t: "自動填滿", correct: true },
                        { t: "插入日期", correct: false },
                        { t: "凍結窗格", correct: false }
                    ],
                    success_msg: "這招最適合像你這樣的懶人了。選取 A2 跟 A3，然後勇敢地往下拖曳吧。"
                }
            },
            { 
                id: "INSERT_DATE", 
                tutorHint: "任務: 填上今天的日期。", 
                playerText: "「最後一步，蓋上今天的日期就算大功告成了。」",
                expectedCondition: { type: 'ACTION', actionId: 'INSERT_DATE' }, 
                unlockSkillId: "DATE",
                storySegmentAfter: "success_DATE",
                quiz: {
                    situation: "「呼，終於到最後了。蓋上今天的日期戳記就能交差，日期術是哪一招來著？」",
                    options: [
                        { t: "插入日期", correct: true },
                        { t: "欄位對調", correct: false },
                        { t: "快速跳轉", correct: false }
                    ],
                    success_msg: "答對了！在 D 欄按下 Ctrl + ; 結束這次的任務吧。"
                }
            }
        ]
    }
};
