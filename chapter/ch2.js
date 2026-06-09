/**
 * 試算表魔法冒險 v2 - 第二章【學院與美學】
 * 完整定稿版：風格與第 5 章高度對齊。
 * 腳本優化：強化感官描寫、角色心理權重。
 * 閱讀優化：進一步拆分長句，確保每行文字長度適中，提升閱讀節奏。
 */

// 輔助函式：產生第二章初始數據 (新生名冊)
const generateCh2Data = () => {
    const baseData = [
        ["魔法學院本屆新生名冊", "", "", "", "", "", ""],
        ["", "性別", "錄取類別", "學分", "入學金", "", ""],
        ["夏特", "男", "藝術設計", "25", "1000", "", ""],
        ["凱琳", "女", "一般研修", "18", "500", "", ""],
        ["巴特", "男", "武官選拔", "20", "650", "", ""],
        ["索菲亞", "女", "魔法理論", "22", "800", "", ""],
        ["萊恩", "男", "商貿管理", "19", "700", "", ""],
        ["奧莉薇", "女", "藝術設計", "21", "900", "", ""],
        ["米羅", "男", "一般研修", "15", "450", "", ""],
        ["帝尹", "女", "武官選拔", "20", "0", "", ""],
        ["總計學分", "", "", "", "", "", ""],
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

window.V2_CHAPTERS["20"] = {
    meta: {
        title: "第二章：學院與美學",
        sheetName: "📜 新生名冊",
        reward: 800
    },

    initialGridData: generateCh2Data(),

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
            { n: "系統", t: "（老馬緩緩停靠在那座被浮雲環繞的尖塔之下。）", a: "system", bg: "CG/ch2 school.png"
                , bgm: "school.mp3", env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true, bgPos: "center", bgZoom: 1.2},
            { n: "系統", t: "（高塔的巨大陰影遮蔽了晨曦的溫度。）", a: "system", bgPos: "top", bgZoom: 1.5, bgDur:"10s"},
            { n: "賽爾", t: "少年，在我們正式踏入王城那座權力旋渦之前，你得先在這裡看清楚一件事。 ", a: "fairy" },
            { n: "賽爾", t: "王宮裡那幫眼睛長在頭頂上的典儀官，可不像公會倉庫裡的大叔那麼好說話。 ", a: "fairy" },
            { n: "賽爾", t: "他們會僅僅因為一條略微歪掉的框線，或是配色太過庸俗……", a: "fairy" },
            { n: "賽爾", t: "就毫不留情地將你的奏摺丟出大殿，順便把你本人也轟出去。 ", a: "fairy" },
            { n: "賽爾", t: "你那套在地下室磨練出來的『土法煉鋼』，在那些優雅的魔鬼面前恐怕撐不過三秒。 ", a: "fairy" },
            { n: "我", t: "等等，賽爾，（我有些不耐地將額前的碎髮撥開）我們當初不是說好了嗎？", a: "me", se: "girl_attraction.mp3", vol: 1.0  },
            { n: "我", t: "先去公會酒館痛快慶功，把我手裡那份加倍的酬金換成熱騰騰的麥酒和烤肉。 ", a: "me" },
            { n: "我", t: "結果妳竟然在天還沒亮的時候，就把我拖到了這座……", a: "me" },
            { n: "我", t: "（我仰頭望著那座直插雲霄、散發著冰冷光輝的高級學院。）", a: "me", se: "girl_annoyed.mp3", vol: 1.0   },
            { n: "蘭吉教授", t: "（一位身著墨色天鵝絨長袍、鬚髮皆白的老者步出學院。）", 
            a: "lange",bg: "bg2.png",flash: true, flashSFX: "flash.mp3", vol: 1.0,env:null},
            { n: "蘭吉教授", t: "（他拄著指引手杖，目光如同閱盡滄桑的捲軸。）", 
            a: "lange" ,se:"walk.mp3",vol:1.0,bgPos: "center", bgZoom: 1.2, bgDur:"3s"},
            { n: "蘭吉教授", t: "慶功的醇酒隨時可以開啟，但對於美感與秩序的修煉，一刻都延誤不得。 ", a: "lange" },
            { n: "蘭吉教授", t: "我是這座學院『裝幀美學講座』的主持教授——蘭吉。 ", a: "lange" },
            { n: "蘭吉教授", t: "年輕人，想要踏入那座莊嚴得近乎壓抑的王廷……", a: "lange",bgPos: "left", bgZoom: 1.2, bgDur:"3s" },
            { n: "蘭吉教授", t: "你就必須先學會，如何讓那些冰冷生硬的數據，變得如詩歌般優雅動人。 "
            , a: "lange",flash: true, flashSFX: "flash.mp3", vol: 1.0, shake:true},
            { n: "我", t: "（優雅？在我的認知裡，表格只要能把數字算對、不漏掉關鍵的報表……）", a: "me" },
            { n: "我", t: "（我就已經謝天謝地了。至於優雅……）", a: "me" },
            
            { n: "系統", t: "（在高處那道漢白玉雕花的欄杆旁，一名青年正孤傲地倚在那裡。）", a: "system"
            , bg: "CG/ch2 start.png",bgPos: "right top", bgZoom: 2.0
            ,flash: true, flashSFX: "flash.mp3",env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true 
             },
            { n: "系統", t: "（他冷靜地俯視著下方的眾人。）", a: "system",bgPos: "right top", bgZoom: 1.5, bgDur:"5s" },
            { n: "夏特", t: "（他的聲音清冷且富有節奏感，像是羽毛筆劃過紙面的沙沙聲）", a: "chate" },
            { n: "夏特", t: "蘭吉教授。", a: "chate" },
            { n: "夏特", t: "王室今年的撥款指標中，明確要求了所有呈報的名冊，", a: "chate" },
            { n: "夏特", t: "都必須具備極其嚴謹的字體層級與色彩流向。 ", a: "chate" },
            { n: "夏特", t: "這位公會派來的冒險者，身上似乎連最基礎的裝幀規範都感知不到。 ", a: "chate" },
            { n: "夏特", t: "讓他參與這種級別的試煉，恐怕很難勝任。 ", a: "chate", se: "boy_ho.mp3", vol: 1.0 },
            { n: "我", t: "（我有些火大地抬頭對上他的目光）你又是哪位？一上來就拿王室的規矩來壓人？", a: "me" },
            { n: "我", t: "口氣倒是挺不小的嘛。", a: "me", se: "girl_annoyed.mp3", vol: 1.0   },
            { n: "蘭吉教授", t: "（他看著意氣風發的兩人，露出一抹帶點無奈的苦笑。）", a: "lange", se: "woman_smile.mp3", vol: 1.0  },
            { n: "蘭吉教授", t: "這是我的首席弟子，夏特。 ", a: "lange",bg: "bg2.png",env: null },
            { n: "蘭吉教授", t: "年輕人別介意，他在學術上追求極致的純粹與完美。 ", a: "lange" },
            { n: "蘭吉教授", t: "對表格的邏輯與規範，有著近乎於刻板的嚴苛執著。 ", a: "lange" },
            { n: "蘭吉教授", t: "既然你是帶著那本傳說中的神聖魔導書而來……", a: "lange" },
            { n: "蘭吉教授", t: "那麼今天的『新生名冊裝幀試煉』，就由夏特來擔任你的對手吧。 ", a: "lange" },
            { n: "夏特", t: "（他優雅地整理了一下那塵埃不染的衣袖。）", a: "chate"
            , bg: "CG/ch2 start.png",env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true },
            { n: "夏特", t: "（眼神中閃過一抹銳利的寒芒。）", a: "chate"
            ,flash: true, flashSFX: "flash.mp3",env:null,bg: "bg2.png" },
            { n: "夏特", t: "明白了。既然是學院正式的公開試煉，我會嚴格執行王室最為考究的稽核標準。 ", a: "chate", se: "boy_lowen.mp3", vol: 1.0  },
            { n: "夏特", t: "任何格式上的混亂、排版上的粗糙線條……", a: "chate" },
            { n: "夏特", t: "在我們這些追求秩序的人眼中，都是絕對不允許存在的『瑕疵』。 ", a: "chate",shake:true },
            { n: "夏特", t: "動手吧。讓我親眼見識一下公會所認可的真功夫……", a: "chate" },
            { n: "夏特", t: "到底有沒有資格通過王廷體制那道鐵律般的稽核。 ", a: "chate" },
            { n: "我", t: "（我活動了一下僵硬的指關節）既然你都把話說到這份上了，那就來比劃比劃吧。誰怕誰啊！"
            , a: "me", se: "girl_underest.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.2,flash: true, flashSFX: "boom.mp3", vol: 1.0}
        ],
        "mid_story": [
            { n: "系統", t: "（試煉廳內的空氣凝重，唯有筆尖劃過紙面的沙沙聲與魔導書的微光交織。）", a: "system" },
            { n: "我", t: "（我稍微活動了一下有些僵硬的頸部，試圖緩解那種壓抑的專注感。）", a: "me"}, 
            { n: "我", t: "（一抬頭，正好看見對面正陷入極致專注狀態的夏特。）", a: "me"}, 
            { n: "我", t: "他筆下的每個儲存格都規整得宛如藝術品，落筆速度更是快得令人驚駭。 ", a: "me" },
            { n: "我", t: "『名校首席』的實力果然名不虛傳……這種無形的壓力，還真是沈重。 ", a: "me" },
            { n: "系統", t: "（夏特靜靜端坐，目光如冰封般冷峻，指尖在白金羽毛筆上熟練地律動。）", a: "system" }, 
            { n: "系統", t: "（然而，當他用眼角的餘光瞥見我那本魔導書上的畫面時，他的動作猛地僵住了。）", a: "system" }, 
            { n: "系統", t: "（羽毛筆在名冊一角頓挫，在雪白的紙面上留下了一道極其刺眼的墨痕。）", a: "system" }, 
            { n: "夏特", t: "（他的臉色在那一瞬間變得慘白，死死地攥緊了手中的筆桿。）", a: "chate" }, 
            { n: "夏特", t: "（隨即他迅速用指尖抹去了那道汙點，強迫自己再次低下頭。）", a: "chate" }, 
            { n: "我", t: "（我看著對面那股突然變得極其緊繃的氣氛，心裡有些納悶。）", a: "me"}, 
            { n: "我", t: "雖然完全搞不清楚他到底受到了什麼刺激……", a: "me"}, 
            { n: "我", t: "但那種近乎窒息的壓抑感，連我這個門外漢都能清晰地感受到。 ", a: "me"}, 
            { n: "我", t: "算了，管他呢！既然對方都已經開始拼命了，我也絕對不能在這裡掉鏈子。 ", a: "me"}, 
            { n: "我", t: "繼續死磕後半張表，讓這堆混亂歸位！", a: "me"}, 
        ],
        "end": [
            { n: "我", t: "（我長長地吐出了一口濁氣，發出一聲清脆的響動。）", a: "me", bg: "bg2.png", bgm: "school.mp3", se: "girl_ow.mp3", vol: 1.0  },
            { n: "我", t: "（我重重地放下了手中的羽毛筆。）", a: "me", se: "pen.mp3", vol: 1.0, shake:true },
            { n: "我", t: "呼……雖然這整套排版的過程繁瑣到讓人抓狂。 ", a: "me",bgPos: "center", bgZoom: 1.5, bgDur:"3s"  },
            { n: "我", t: "但現在回頭看去，原本密密麻麻的新生數據，確實變得賞心悅目了不少。 ", 
            a: "me",bgPos: "center", bgZoom: 1.2, flash:true, flashSFX:"flash.mp3",vol:1.0 },
            { n: "系統", t: "（蘭吉教授緩步走到兩人的作品前，整個人屏住呼吸，細細端詳了良久。）", a: "system", se: "walk.mp3", vol: 1.0 },
            { n: "蘭吉教授", t: "（最後，他帶著一絲震撼，用那雙微微顫抖的手讚許地拍了拍我的肩膀。）", a: "lange", se: "put down.mp3", vol: 1.0 },
            { n: "蘭吉教授", t: "結構極其嚴謹，配色更是展現出一種罕見的克制。 ", 
            a: "lange",bg: "CG/ch2 lange.png",bgPos: "right top", bgZoom: 1.5 },
            { n: "蘭吉教授", t: "這上面完全沒有任何多餘的視覺冗餘，簡直……大巧若拙。 ", a: "lange",bgPos: "center", bgZoom: 1.2, bgDur:"5s" },
            { n: "蘭吉教授", t: "年輕人，你成功地將在倉庫中磨練出來的生命力，注入了枯燥的美學之中。 ", a: "lange" },
            { n: "蘭吉教授", t: "這場關於『秩序』的對決，是你贏了。 ", a: "lange",se:"woman_smile.mp3", vol:1.0},
            { n: "蘭吉教授", t: "這是我親筆簽署的王廷推薦函，是你應得的獎賞。 ", a: "lange",se:"paper down.mp3", vol:1.0, bg: "bg2.png" },
            
            { n: "系統", t: "（夏特看著那份名冊，眼底的高傲微微收斂了一些。）", a: "system", bgm: "sweet.mp3",bg:"CG/ch2 start.png",bgPos: "right top", bgZoom: 2.0  },
            { n: "夏特", t: "……是我輸了。", a: "chate", flash:true, flashSFX:"flash.mp3",vol:1.0 },
            { n: "夏特", t: "（他低聲喃喃自語）徹底打破陳規的切分邏輯……不帶任何諂媚的色彩的流向……", a: "chate",bgPos: "right top", bgZoom: 1.5, bgDur:"5s"},
            { n: "夏特", t: "（我曾經也……）", a: "chate" },
            { n: "系統", t: "（他抬起頭，重新打量著眼前這個不修邊幅的冒險者。）", a: "system"
            ,bg:"CG/ch2 main.png",bgPos: "right top", bgZoom: 1.5 },
            { n: "夏特", t: "我原以為在學院這種等級森嚴的地方，沒有人會接受這種實用至上的排版。", a: "chate",bg:"CG/ch2 start.png" },
            { n: "夏特", t: "一個從未受過正統美學訓練的人，竟然能如此理所當然地把它實踐出來。", a: "chate" },
            { n: "夏特", t: "看來，不被規則定義的自由……確實是存在的。", a: "chate" },
            
            { n: "我", t: "（我完全沒有察覺到夏特此刻翻江倒海的內心，只是隨意地把推薦函塞進背包。）", a: "me"
            ,bg:"CG/ch2 main.png",se:"clothes1.mp3", vol:1.0, flash:true, flashSFX:"flash.mp3",vol:1.0},
            { n: "我", t: "（我伸了個懶腰，隨意地揉了揉早已空空如也的肚子）終於收工了！", a: "me"
            , se: "girl_yes.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.2, bgDur:"5s"  },
            { n: "我", t: "拿到了這封保命的推薦信，我的這份『義務勞動』總算是能暫時畫上句號了吧？", a: "me" },
            { n: "我", t: "賽爾，快走吧！我的肚子已經抗議到快要爆炸了。 ", a: "me",shake:true },
            { n: "我", t: "學院這裡的伙食看起來就有點太過『清心寡欲』了，我現在只想大口吃肉。 ", a: "me",bgPos: "right", bgZoom: 1.5, bgDur:"8s" },
            { n: "賽爾", t: "（它輕盈地落在我的鼻尖，笑得意味深長）少年，你今天似乎在無意之間……", a: "fairy", 
            bg:"bg2.png",se: "fairy_infosmile.mp3", vol: 1.0  },
            { n: "賽爾", t: "給那個把自己關在金絲籠裡的天才，劈開了一扇了不得的命運之窗呢。 ", a: "fairy" },
            { n: "賽爾", t: "算啦！填飽肚子要緊，我們這就出發大餐一頓吧！", a: "fairy",shake:true },
            
            { n: "系統", t: "（就在我即將踏出試煉廳大門的那一刻，身後傳來了一陣急促的腳步聲。）", a: "system"
            , se: "run.mp3", bgm: "no.mp3",bgPos: "center", bgZoom: 1.2},
            { n: "夏特", t: "（他突然大步追了上來，對著我深深地鞠了一躬。）", a: "chate"
            ,bg: "CG/Ch2.png",bgPos: "bottom", bgZoom: 2.0, flash:true, flashSFX:"flash.mp3",vol:1.0},
            { n: "夏特", t: "萬分感謝。這場試煉，確實是我徹底敗北了。 ", a: "chate", bgm: "sweet.mp3",bgPos: "top", bgZoom: 1.5, bgDur:"8s"  },
            { n: "夏特", t: "希望在不久的將來，我也能拿出一本真正具備靈魂、不被束縛的作品……", a: "chate" },
            { n: "夏特", t: "再次請閣下，親自過目。 ", a: "chate" },
            
            { n: "我", t: "（我有些驚訝地回過頭，有些侷促地抓著後腦勺。）", a: "me",bg:"CG/ch2 main.png", flash:true, flashSFX:"flash.mp3",vol:1.0 },
            { n: "我", t: "（露出豪爽的笑容。）", a: "me" , se: "girl_laugh.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.2, bgDur:"5s" },
            { n: "我", t: "謝我做什麼？你剛才那些表格做得其實也超級厲害啊！", a: "me" },
            { n: "我", t: "每個格子都對得嚴絲合縫，簡直比強迫症還要完美。 ", a: "me",shake:true },
            { n: "我", t: "雖然我確實搞不懂你們那些深奧的宮廷藝術……", a: "me" },
            { n: "我", t: "但那種對數據專注到骨子裡的勁頭，真的很讓人佩服。 ", a: "me",flash:true },
            { n: "我", t: "那我們就王城再見吧，名校第一的天才。 ", a: "me",bgPos: "right", bgZoom: 1.2 },
            
            { n: "系統", t: "（夏特靜靜地佇立在夕陽下，凝視著那個遠去的背影。）", a: "chate",bg:"road dust.png" },
            { n: "系統", t: "（他的嘴角第一次泛起了一抹真正釋懷、且對未來充滿渴望的微笑。）", a: "chate"
            , se: "boy_lowsmile.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.2 },
            { n: "夏特", t: "（他在風中輕聲呢喃）我們一定，會在王城再見的。 ", a: "chate" },
            
            { n: "系統", t: "（賽爾咻地一聲竄回了我的肩頭，用一種調侃的眼神看著我。）", a: "system"
            , flash:true, flashSFX:"fun1.mp3",vol:1.0, bg: "CG/ch2 last.png",bgPos: "right", bgZoom: 2.0 },
            { n: "賽爾", t: "好了啦！別在這裡跟那位憂鬱的天才依依不捨了，簡直看得我肉麻。 ", a: "fairy" },
            { n: "賽爾", t: "全速出發吧少年！目標是——王城！！", a: "fairy",shake:true },
            { n: "我", t: "（一開始，真的只是想混口飯吃，活著就好。）", a: "me",bgPos: "center", bgZoom: 1.5, bgDur:"4s", bgm: "sweet2.mp3"  },                             
            { n: "我", t: "（但親手把那些混亂理順……看著他們鬆口氣的樣子。那種被需要的重量。）", a: "me" },       
            { n: "我", t: "（我很快樂。）", a: "me" },                                                   
            { n: "我", t: "（我望向官道的盡頭，語氣平靜且堅定）……王城。走吧。", a: "me" }  ,
            { n: "我", t: "（我深吸一口氣，目光望向遠方，變得無比堅定）出發！前進王城！！", a: "me",
            bgPos: "center", bgZoom: 1.2 ,flash:true, flashSFX:"bell.mp3",vol:1.0 }
        ],

        "init_dialogue": [
            { n: "賽爾", t: "這裡是學院專門用來測試的「裝幀試煉廳」。", a: "fairy" },
            { n: "賽爾", t: "你看桌上這本《本屆新生名冊》，簡直是歷年來品相最慘的一本。", a: "fairy" },
            { n: "賽爾", t: "少年，先仔細看看它到底有多醜。", a: "fairy" },
            { n: "我", t: "「這標題都裂成五塊了，整頁連一條線都沒有。」", a: "me" },
            { n: "我", t: "「夏特還在隔壁桌偷笑，可惡，這場試煉我非贏不可。」", a: "me" },
            { n: "我", t: "「標題『魔法學院本屆新生名冊』被硬塞進五個小格，看起來散亂不堪。」", a: "me" },
            { n: "我", t: "「夏特那邊的標題，早就排得漂漂亮亮了。」", a: "me" },
            { n: "賽爾", t: "別慌張！現在施展第一道招式：[[跨欄置中|excel]]！", a: "fairy" },
            { n: "賽爾", t: "快去框選 A1 到 E1 的範圍，讓碎片立刻熔為一體！", a: "fairy" }
        ],

        // 成功回饋
        "success_MERGE": [
            { n: "賽爾", t: "[[跨欄置中|excel]]禁術完成！碎片完美融合。", a: "fairy" },
            { n: "賽爾", t: "標題總算有了該有的宏大氣派。", a: "fairy" },
            { n: "我", t: "「原本五塊變一塊，字體還自動居中對齊。」", a: "me" },
            { n: "我", t: "「我剛瞄到夏特挑了一下眉毛，哼，這才僅僅是個開始呢。」", a: "me" }
        ],
        "success_BORDER": [
            { n: "賽爾", t: "[[所有框線|excel]]繪製完成！表格的骨架總算是確立下來了。", a: "fairy" },
            { n: "我", t: "「線條一畫上去，整份名冊瞬間變得清爽了許多。」", a: "me" },
            { n: "我", t: "「連遠處的教授也微微點了點點頭。」", a: "me" }
        ],
        "success_SLASH": [
            { n: "賽爾", t: "儲存格[[斜線|excel]]切割完成！", a: "fairy" },
            { n: "賽爾", t: "現在一格就能完美容下兩重不同的標籤了。", a: "fairy" },
            { n: "我", t: "「原來只要加一條簡單的斜線就能搞定。」", a: "me" },
            { n: "我", t: "「夏特探頭看了一眼，這次他明顯笑不出來了。」", a: "me" }
        ],
        "success_COLOR": [
            { n: "賽爾", t: "[[填滿色彩|excel]]噴塗完成！視覺重心現在非常清晰。", a: "fairy" },
            { n: "我", t: "「上了底色之後，名冊的層次感瞬間提升了好幾個檔次。接下來……」", a: "me" }
        ],
        "success_FORMAT": [
            { n: "賽爾", t: "[[格式刷|excel]]複製完成！樣式拓印得非常完美。", a: "fairy" },
            { n: "我", t: "「這刷子簡直太神了，一秒鐘就把後面的格式全同步了。我看到夏特的筆尖停住了。」", a: "me" }
        ],
        "success_NUMBER": [
            { n: "賽爾", t: "[[自訂數字格式|excel]]著裝完畢！數據現在看起來非常專業。", a: "fairy" },
            { n: "我", t: "「套上格式後，整份名冊的氣勢完全不同了。」", a: "me" },
            { n: "我", t: "「我好像有點懂『美源於秩序』的真諦了。」", a: "me" }
        ],
        "success_SUM": [
            { n: "賽爾", t: "[[自動加總|excel]]結算完成！", a: "fairy" },
            { n: "賽爾", t: "美感與秩序的六大裝幀技巧，你已經全數掌握在手中了！", a: "fairy" },
            { n: "我", t: "「從最初殘破不堪的草稿，到現在這本學院級的典籍。」", a: "me" },
            { n: "我", t: "「我看最後贏的人肯定是我。」", a: "me" }
        ],
        "fail_MERGE_wrong_range": [
            { n: "賽爾", t: "「少年，你想合併哪裡？魔導書的碎片需要正確的共鳴，請精準選取 [[A1:E1|gold]] 這個範圍！」", a: "fairy" },
            { n: "夏特", t: "「（在旁邊優雅地喝了一口紅茶） 連範圍都抓不準嗎？看來公會的訓練確實比較……隨興呢。」", a: "chate" },
            { n: "我", t: "「（嘖，被那傢伙嘲笑了……） 閉嘴！我只是在測試魔導書的反應範圍而已！」", a: "me" }
        ],
        "fail_BORDER_wrong_range": [
            { n: "賽爾", t: "「哎呀！線畫得太少會被說簡陋，畫得太多又太雜亂。蘭吉教授要求的是 [[A2:E10|gold]] 這個名冊核心區喔！」", a: "fairy" },
            { n: "我", t: "「（看著畫歪的框線） 確實……這樣看起來一點都不優雅。」", a: "me" }
        ],
        "fail_SLASH_wrong_cell": [
            { n: "賽爾", t: "「你想在一般儲存格畫斜線？那樣只會把數據切斷而已。去 [[A2|gold]] 標題格試試，那才是展示『一格雙標』的最佳舞台！」", a: "fairy" },
            { n: "我", t: "「懂了，要把兩個標籤塞在一起才需要斜線。」", a: "me" }
        ],
        "fail_COLOR_wrong_range": [
            { n: "賽爾", t: "「喂喂，不要亂塗顏色！裝幀美學的首要規則就是『克制』。先幫 [[標題列 (A2:E2)|gold]] 或 [[第一列 (A3:E3)|gold]] 定下基準色！」", a: "fairy" },
            { n: "夏特", t: "「（嘆氣） 雖然色彩能賦予生命，但盲目的施色只是在弄髒紙面。請專注於核心結構。」", a: "chate" }
        ],
        "fail_FORMAT_wrong_source": [
            { n: "賽爾", t: "「格式刷需要先吸取一個『完美的樣本』。你現在選的格子空空如也，是想刷出空氣嗎？先選中 [[A3:E3|gold]] 再刷吧！」", a: "fairy" }
        ],
        "fail_SUM_wrong_cell": [
            { n: "賽爾", t: "「你把總和算在這裡，那真正的總計欄位 D11 不就空著了嗎？這可過不了蘭吉教授的法眼喔！」", a: "fairy" },
            { n: "我", t: "「（看著 D11） 喔對，那格才是專門留給計算結果的。」", a: "me" }
        ]
    },

    simulator: {
        bgm: "game_bgm.mp3",
        tasks: [
            {
                id: "MERGE_TASK",
                tutorHint: "選取 A1:E1，點擊工具列的【跨欄置中】。",
                playerText: "「這裡就是裝幀試煉廳嗎……感覺氣氛完全不一樣了。」",
                unlockBtnId: "mergecenter",
                unlockSkillId: "MERGE_CENTER",
                expectedCondition: { type: "ACTION", actionId: "MERGE_CENTER" },
                storySegmentBefore: "init_dialogue",
                storySegmentAfter: "success_MERGE"
            },
            {
                id: "BORDER_TASK",
                tutorHint: "表格怎能沒有骨架？選取 A2:E10，點擊工具列的【框線】按鈕，選擇【所有框線】。",
                playerText: "「不妙，每位新生的資料全飄在空中，連一條分隔線都沒有，看久了眼睛好花……」",
                unlockBtnId: "border",
                unlockSkillId: "BORDER",
                expectedCondition: { type: "ACTION", actionId: "ALL_BORDERS" },
                storySegmentAfter: "success_BORDER"
            },
            {
                id: "SLASH_TASK",
                tutorHint: "這叫一格雙標。在 A2 點擊【框線】→【其他框線】選【斜線】。",
                playerText: "「最刁鑽的來了，左上角這格要同時寫『學生資料』和『姓名』，一個格子怎麼塞兩件事？」",
                expectedCondition: { type: "ACTION", actionId: "DIAGONAL_BORDER" },
                storySegmentAfter: "success_SLASH"
            },
            {
                id: "COLOR_TASK",
                tutorHint: "選取 A2:E2，點擊工具列的【填滿色彩】，幫它塗上一個克制的底色。再對第一位新生 A3:E3 重複同樣的操作。",
                playerText: "「標題列得跟下面的數據區分開來，不然整片白茫茫的根本分不清楚。」",
                unlockBtnId: "fillcolor",
                unlockSkillId: "FILL",
                expectedCondition: { type: "ACTION", actionId: "FILL_COLOR" },
                storySegmentAfter: "success_COLOR"
            },
            {
                id: "FORMAT_TASK",
                tutorHint: "別做白工。選中那行排好的格子 A3:E3，點一下工具列的【格式刷】，再刷過下方區域 A4:E10。樣式瞬間同步！",
                playerText: "「第一行我是排得很漂亮了……可後面還有幾十行，難道要我一行一行手動重複重複上色？」",
                unlockBtnId: "formatpainter",
                unlockSkillId: "FORMAT",
                expectedCondition: { type: "ACTION", actionId: "FORMAT_PAINTER" },
                storySegmentAfter: "success_FORMAT"
            },
            {
                id: "NUMBER_TASK",
                tutorHint: "幫數字穿上制服。選取 D3:D10，右鍵 ➡️ 設定儲存格格式 ➡️ 自訂，輸入 0\"分\"。這才體面！",
                playerText: "「學分那一欄只有光溜溜的數字，看起來很不正式，像隨手塗的草稿。」",
                expectedCondition: { type: "ACTION", actionId: "CUSTOM_FORMAT" },
                storySegmentAfter: "success_NUMBER"
            },
            {
                id: "SUM_TASK",
                tutorHint: "何必狼狽！點選總額那格 D11，直接點工具列右上角的【自動加總】即可。",
                playerText: "「最後一步結算，這幾十個人的總學分，難道要我自己拿算盤一個個加起來？」",
                unlockBtnId: "autosum",
                unlockSkillId: "SUM",
                expectedCondition: { type: "ACTION", actionId: "AUTO_SUM" },
                storySegmentAfter: "success_SUM"
            }
        ]
    }
};