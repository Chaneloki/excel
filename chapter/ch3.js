/**
 * 試算表魔法冒險 v2 - 第三章【小隊重組之章】
 * 定稿版：風格與第 5 章深度對齊。
 * 腳本優化：強化混亂與沈重的氛圍、細化角色心理，並拆分長句以提升閱讀節奏。
 */

const generateCh3Data = () => {
    const gridData_ch3 = [
        ["編號", "姓名", "身分", "家鄉", "報到日期", "當前狀態"],
    ];

    const identities = ["商人", "農民", "傭兵", "吟遊詩人", "工匠", "學者", "信使"];
    const towns = ["東谷", "西山", "北寒地", "中原城", "南境·楓林", "南境·石橋", "南境·漁港"];
    const lastNames = ["張", "王", "李", "趙", "陳", "劉", "周", "林", "黃", "吳", "徐", "孫", "胡", "朱", "高", "林"];
    const firstNames = ["明", "芳", "偉", "娜", "強", "敏", "軍", "靜", "洋", "勇", "丹", "剛", "平", "超", "健", "雲"];

    let currentBatchDate = "5/10";
    let batchCount = 0;

    for (let i = 1; i <= 1217; i++) {
        let iden = identities[Math.floor(Math.random() * identities.length)];
        let town = towns[Math.floor(Math.random() * towns.length)];
        let status = "進京待發";
        let name = "";

        if (i % 50 === 0) {
            const day = 10 + (i / 50);
            currentBatchDate = `5/${day}`;
            batchCount = 0;
        }

        if (i === 387) {
            gridData_ch3.push([i, "江舟", "遊方醫者", "遙遠東方", currentBatchDate, "進京待發"]);
            batchCount++;
            continue;
        }

        if (i >= 30 && i <= 39) {
            name = `旅客 ${i}`;
        } else {
            const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
            const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
            name = ln + fn;
        }

        let displayDate = (batchCount === 0) ? currentBatchDate : "";
        batchCount++;

        gridData_ch3.push([i, name, iden, town, displayDate, status]);
    }
    return gridData_ch3;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["30"] = {
    meta: {
        title: "第三章：小隊重組之章",
        sheetName: "📜 滯留旅客名冊",
        reward: 1500
    },

    initialGridData: generateCh3Data(),

    skillDefs: {
        SEARCH: { n: "尋找", s: "Ctrl + F", d: "於千行洪流之中，瞬間鎖定唯一的真相", cat: "start", icon: "icon/find.png" },
        REPLACE: { n: "取代", s: "Ctrl + H", d: "言出法隨，於瞬息間改寫眾生的既定狀態", cat: "start", icon: "icon/find.png" }, 
        FUZZY: { n: "萬用字元", s: "* / ?", d: "通曉萬物之虛影，令隱藏的規律無所遁形", cat: "start", icon: "icon/find.png" },
        EMPTY: { n: "特殊定位", s: "F5 → 特殊定位", d: "於名冊之空隙中降下秩序，讓斷裂的時空圓滿", cat: "start", icon: "icon/find.png" }
    },

    story: {
        start: [
            { n: "系統", t: "（楓鈴驛站早已不復往日的祥和，視線所及之處，皆是擠滿了避難人潮的陰影。）", a: "system", bg: "bg3 out.png", se: "bell.mp3", vol: 1.0
            , se: "wind1.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1, bgDur:"4s"},
            { n: "系統", t: "（門口那塊顯眼的木牌在寒風中吱呀作響，上面潦草地刻著『糧食已售罄』的絕望字樣。）", a: "system", se: "wind1.mp3", vol: 1.0
            ,bgPos: "right top", bgZoom: 1.5, bgDur:"4s"},
            { n: "我", t: "（我費力地在粘稠的人潮中擠出一條生路，看見一名憔悴的母親正死死摟著懷中的幼子。）", a: "me", bg: "CG/ch3 sick.png", bgm: "no.mp3"
            , se: "wind1.mp3", vol: 1.0,bgPos: "center", bgZoom: 1.1, bgDur:"4s"},
            { n: "我", t: "（孩子的小臉燒得如炭火般通紅，那種近乎沈寂的虛弱，令人感到一陣錐心的寒意。）", a: "me", bgm: "sad.mp3"  },
            { n: "我", t: "我從王城那片死寂中一路馬不停蹄地趕回楓鈴驛站，只為了找到米羅……", a: "me"
            ,bgPos: "top", bgZoom: 1.5, bgDur:"4s"},
            { n: "我", t: "我原以為，在那扇冰冷的城門前已經見識過了這世間最壞的光景。 "
            ,flash:true,flashSFX:"flash.mp3", bg:"bg3 kingdom.png" ,bgPos: "bottom", bgZoom: 1.5, isMemory:true},
            { n: "我", t: "但沒想到，這裡所承載的痛苦與混亂，竟比那座王城還要厚重得多。 ", a: "me"
            , bg:"CG/ch3 sick.png",bgPos: "center", bgZoom: 1.1, bgDur:"4s"},
            { n: "米羅", t: "（遠處傳來他沙啞的嘶吼）", a: "miro", bg: "bg3 out.png",bgPos: "center", bgZoom: 1.1},
            { n: "米羅", t: "將三號房先騰出來給帶孩子的家眷！所有馬匹的草料配給即刻減半！", a: "miro", 
            bg: "bg1.5.png",bgPos: "center", bgZoom: 1.5,flash:true},
            { n: "系統", t: "（米羅猛地回過頭，視線在不經意間撞見了我的身影。）", a: "miro",bgPos: "center", bgZoom: 1.1 },
            { n: "系統", t: "（他整個人瞬間僵立在了原地，手中的賬冊險些跌落塵土。）", a: "miro" },
            { n: "米羅", t: "你？（他的聲音在劇烈地顫抖著）", a: "miro", shake:true},
            { n: "米羅", t: "你為什麼……為什麼會在這個時候，出現在這種地獄般的荒野？", a: "miro" },
            { n: "我", t: "米羅，先冷靜下來。看著我，聽我說完這一切。 ", a: "me" },
            { n: "我", t: "（我深吸了一口氣，胸口感到一陣壓抑的沈重）", a: "me", bgm: "no.mp3", se: "wind1.mp3", vol: 1.0 },
            { n: "我", t: "這段時間發生的變故，我必須從頭向你解釋。 ", a: "me"},
            { n: "我", t: "就在幾天前，我帶著那封沉甸甸的推薦信，終於抵達了那座傳說中的王城。 ", a: "me"},
        
            { n: "系統", t: "（回憶的灰燼在眼前緩緩燃起。）", a: "system", bg: "bg3 kingdom.png", bgm: "kingdom sad.mp3", isMemory: true
            ,env: "trans1/1", envFrames: 21, envspeed:100, envOpacity: 1.0,envDrift:true, envLoop: false},
            { n: "我", t: "那裡的城門已經封閉了整整十六個晝夜", a: "me", isMemory: true,
            bgPos: "center 20%", bgZoom: 3.0, bgDur:"6s"},
            { n: "我", t: "那座高牆之內的王，冷酷地拒絕了外界的所有哀求。 ", a: "me", isMemory: true },
            { n: "我", t: "曾經視為進身之階的國王親筆信在那扇鏽跡斑斑的鐵門前，與隨風飄散的廢紙毫無二致 ", a: "me", isMemory: true,
            bgPos: "right bottom 20%", bgZoom: 3.0, bgDur:"6s"},
            { n: "我", t: "就在那條充滿絕望與死亡氣息的排隊人龍中，我看見了一個絕對不該出現在此的人。 ", a: "me", isMemory: true },
            { n: "我", t: "竟然是……那位曾經意氣風發、公會權威的象徵，會長大人。 ", a: "me", isMemory: true, shake:true },

            { n: "系統", t: "（會長那張平時總是不怒自威的臉龐，此刻卻寫滿了前所未有的支離破碎。）", a: "head", isMemory: true },
            { n: "冒險者公會會長", t: "公會的每一枚金幣、每一寸運作，這些年來全是仰賴王室那施捨般的撥款。 ", a: "head", isMemory: true
            ,flash:true,flashSFX:"flash.mp3"},
            { n: "冒險者公會會長", t: "現在，城門一封，所有的命脈就被徹底切斷了。 ", a: "head", isMemory: true },
            { n: "冒險者公會會長", t: "（他看著我，眼神中透出一股死寂的平靜）孩子，我不得不向你傳達這最後的殘酷。 ", a: "head", isMemory: true, se: "man ha.mp3", vol: 1.0 
            ,bgPos: "center", bgZoom: 1.1, bgDur:"15s"},
            { n: "冒險者公會會長", t: "就在昨天，我已經親手，正式解散了公會。 ", a: "head", isMemory: true },
            { n: "冒險者公會會長", t: "我跟每一個離去的人都說了同樣的一段話：", a: "head", isMemory: true },
            { n: "冒險者公會會長", t: "別再寄望於那些坐在雲端的大機構會來替你撐傘了。 ", a: "head", isMemory: true },
            { n: "冒險者公會會長", t: "去尋找三五個真正能交付脊背的夥伴，去組建一支只屬於你們的小隊。 ", a: "head", isMemory: true },
            { n: "冒險者公會會長", t: "在那場即將吞噬一切的洪水到來前……先想盡一切辦法，活下去。 ", a: "head", isMemory: true },
            { n: "賽爾", t: "（它坐在殘破的城牆邊緣）走吧少年，別再對這片廢墟留戀了。 ", a: "fairy", isMemory: true
            ,bgPos: "center", bgZoom: 1.5, bgDur:"10s"},
            { n: "賽爾", t: "國王神隱，公會崩塌。聽起來簡直像是要把世界推向深淵，對吧？", a: "fairy", isMemory: true },
            { n: "賽爾", t: "但在本仙子這漫長的三百年記憶中……", a: "fairy", isMemory: true, bgm: "no.mp3" },
            { n: "賽爾", t: "那些真正被後世傳頌的冒險史詩，幾乎全都是以這樣的廢墟作為開場。 ", a: "fairy", isMemory: true
            ,bgPos: "center", bgZoom: 1.1, flash:true, flashSFX: "high peach.mp3", vol: 1.0, bg: "CG/ch3 text.png", bgm: "rose.mp3", env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.4, envDrift:true},
            { n: "賽爾", t: "這一次，別讓我再在那座無聊的抽屜裡，等下一個三百年了。 ", a: "fairy", isMemory: true,
            bgPos: "left bottom", bgZoom: 1.1, bgDur:"5s"},
            { n: "賽爾", t: "去吧，去把你內心真正認可的夥伴……一個接著一個地，從這亂世中找回來。 ", a: "fairy", isMemory: true },

            { n: "系統", t: "（回憶散去。米羅聽完這番話後，整個人如遭雷擊，怔怔地站在冷風中。）", a: "miro", bg: "bg1.5.png", bgm: "sad.mp3", se: "wind1.mp3", vol: 1.0, env:null },
            { n: "系統", t: "（他雙手緊緊抱住那本磨損的名冊，像是要在這崩塌的世界中抓住最後一根浮木。）", a: "miro"
            ,bgPos: "center", bgZoom: 1.1, shake:true},
            { n: "米羅", t: "公會……竟然就這樣……消失了嗎？（他的語氣低微得近乎呢喃）", a: "miro" },
            { n: "米羅", t: "那……那你現在，究竟打算要去向何方？", a: "miro"},
            { n: "我", t: "會長說得沒錯，往後的黑暗，得靠我們自己人互相掌燈前行了。 ", a: "me" },
            { n: "我", t: "米羅，我這次不遠千里地折返楓鈴驛站，絕非僅僅只是路過。 ", a: "me" },
            { n: "我", t: "我正在籌建一支屬於我自己的冒險小隊，一支能掌握自身命運的小隊。 ", a: "me" },
            { n: "我", t: "而在這份剛剛落筆的名單上，我第一個想要找回來的夥伴……就是你。 ", a: "me"
            ,bg:"CG/ch3 main.png",bgPos: "right", bgZoom: 1.1, se: "catch1.mp3", vol: 1.0  },
            { n: "系統", t: "（米羅猛地抬起頭，那雙佈滿紅血絲的眼睛裡閃過一抹微弱的希冀，但隨即又迅速黯淡了下去。）", a: "miro"
            ,bg:"bg1.5.png"},
            { n: "系統", t: "（他轉過頭，望向院子裡那成千上百位在苦難中掙扎的滯留旅客，聲音壓得極低。）", a: "miro"
            , se: "clothes1.mp3", vol: 1.0,flash:true,bg:"bg3 out.png" },
            { n: "米羅", t: "你也看見現在的局勢了。一千兩百多個靈魂卡在這座驛站裡，他們連明天的口糧在哪都不知道。 ", a: "miro"
            ,bgPos: "right", bgZoom: 1.5, bgDur:"4s"},
            { n: "米羅", t: "在這種生死關頭……我怎麼……怎麼可能拋下他們獨自離去呢？", a: "miro" },
            { n: "我", t: "所以我現在，並不是在要求你立刻就給我一個肯定的答覆。 ", a: "me",bg:"bg1.5.png"},
            { n: "我", t: "我們得先聯手，把眼前這團亂麻般的爛攤子給理清楚。 ", a: "me" },
            { n: "我", t: "只有當你先重塑了這座驛站的秩序，你才有資格，也才有底氣去談論那份『自由』。 ", a: "me" },
            { n: "我", t: "這幾天，你一邊工作一邊慢慢考慮。等這份名冊圓滿了，你再回答我。 ", a: "me" },
            { n: "系統", t: "（米羅沈默了許久，最後他長舒一口氣，眼神變得前所未有的決絕。）", a: "miro", se: "boy_breath.mp3", vol: 1.0
            ,flash:true, flashSFX:"flash.mp3"  },
            { n: "系統", t: "（他將那本幾乎要被汗水浸濕的厚重冊子，鄭重地遞到了我的手中。）", a: "miro",se:"put down.mp3",vol:1.0,shake:true },
            { n: "米羅", t: "若想看清目前的生死缺口，所有的關鍵……全都在這本《滯留旅客名冊》裡。 ", a: "miro" },
            { n: "米羅", t: "一千兩百一十七個名字，這堆雜亂無章的數據裡，藏著所有人的生機。 ", a: "miro" },
            { n: "米羅", t: "可是它真的太過混亂了。我翻爛了這本賬，熬了三個通宵，依然數不出精確的補給準數。 ", a: "miro" },
            { n: "我", t: "（我接過名冊，翻開的第一頁，那種排山倒海而來的混亂感，確實讓我也感到了瞬間的麻木。）", a: "me"
            , se: "book.mp3", vol: 1.0,bg:"CG/ch3 main.png",bgPos: "right", bgZoom: 1.1 },
            { n: "我", t: "整整一千兩百多行雜訊……竟然連一行是對齊的都沒有。 ", a: "me",shake:true },
            { n: "我", t: "好啦賽爾，別再看戲了，該是我們展現魔法禁術的時候了。 ", a: "me" },
            { n: "系統", t: "（賽爾從魔導書的扉頁中探出半個腦袋，這一次，它難得地沒有第一時間開口挖苦。）", a: "fairy",bg:"bg1.5.png" },
            { n: "賽爾", t: "少年，別在那裡對著廢紙發愣了。施展你手中的權能，趕快動手吧。 ", a: "fairy",flash: true, flashSFX: "boom.mp3", vol: 1.0},
        ],
        mid_story: [
            { n: "系統", t: "（名冊的數據重塑工作正在如火如荼地進行中，綠色的魔力光點在指尖跳躍。）", a: "system" },
            { n: "系統", t: "（驛站的另一端，忽然傳來了一陣急促且充滿活力的腳步聲，踏碎了原有的壓抑。）", a: "system" },
            { n: "米羅", t: "（他快步跑回我的桌案前，那張連日來一直緊繃如弦的臉龐，終於綻放出了真正的笑容。）", a: "miro" },
            { n: "米羅", t: "我們終於定位到那位神祕的遊方醫者了！他已經背著藥箱及時趕到了。 ", a: "miro" },
            { n: "米羅", t: "藥汁才剛灌下去不到半個時辰，那個發燒得快要死掉的孩子的燒，就已經開始退了。 ", a: "miro" },
            { n: "我", t: "（我終於從繁重的運算中移開視線，長長地鬆了一口氣）看來，我們找對了人。 ", a: "me" },
            { n: "系統", t: "（米羅看著我手中那份逐漸變得井然有序、宛如散發著光芒的名冊，指尖輕輕摩挲過那些邊角。）", a: "miro" },
            { n: "米羅", t: "就在三天前，當我面對這種如山般的混沌時，內心其實只有絕望與想放聲大哭的衝動。 ", a: "miro" },
            { n: "米羅", t: "但直到剛才那一刻我才明白……原來這些冰冷的數據，並不是什麼甩不掉的麻煩。 ", a: "miro" },
            { n: "系統", t: "（他話音未落，只是沈默地回望向那個孩子安穩睡去的方向，眼底閃過一絲晶瑩。）", a: "miro" },
            { n: "我", t: "（我體貼地將名冊朝他的方向挪了挪，讓兩人的視線重合在一起。）", a: "me" },
            { n: "我", t: "事情還遠未大功告成。剩下的這些殘破數據，你跟我一起，將它們理得徹頭徹尾順利。 ", a: "me" },
            { n: "系統", t: "（賽爾從魔導書的陰影中悄悄探出半個小腦袋，瞇起眼看著並肩而坐的兩人，嘴角掛著一抹狡黠的笑意。）", a: "fairy" }
        ],
        end: [
            { n: "系統", t: "（夜幕降臨。驛站的院子裡總算是恢復了久違的、名為『秩序』的安寧。）"
            , bg: "bg3 rule.png", a: "system", bgm: "conspiracy.mp3",bgPos: "center", bgZoom: 1.1  },
            { n: "系統", t: "（旅客們依照名冊上精確的號次，一列一列、安安靜靜地領到了今晚維持生命的口糧。）", a: "system"
            ,bgPos: "center", bgZoom: 1.5, bgDur:"8s"},
            { n: "米羅", t: "（他那雙粗糙的手顫抖著捧起這本煥然一新的名冊，聲音因為過度的激動而哽咽。）", a: "miro new"
            , se: "clothes1.mp3", vol: 1.0, shake:true},
            { n: "米羅", t: "一千兩百一十七個靈魂……現在，全部都精確地對上號了。 ", a: "miro new"
            ,flash:true,bg:"CG/ch3 two.png",bgPos: "right", bgZoom: 2.0, bgDur:"3s"},
            { n: "米羅", t: "誰該排在第一順位、糧食儲備還能支撐多少個晝夜……這一切，現在都像星空一樣清晰。 ", a: "miro new" },
            { n: "米羅", t: "三天前對我來說還像大山一樣沉重得要壓斷我脊樑的東西，現在我終於能捧得動了。 ", a: "miro new" },
            { n: "我", t: "米羅。我那天在官道上問你的那個關於未來的抉擇，你現在，心裡有答案了嗎？", a: "me"
            ,bgPos: "left"},
            { n: "米羅", t: "（他點了點頭，眼神中展現出一種脫胎換骨般的清澈）想清楚了。 ", a: "miro new"
            ,bgPos: "right",flash:true,flashSFX:"flash.mp3" },
            { n: "米羅", t: "你那天跟我說過：唯有當我先徹底理清了驛站的這場亂象……", a: "miro new" , bg: "CG/Ch3 bond.png"
            , bgm: "sweet2.mp3",bgPos: "left", bgZoom: 1.1, bgDur:"10s" },
            { n: "米羅", t: "我才有資格，去與你談論所謂的『走』與『不走』。 ", a: "miro new" },
            { n: "米羅", t: "（他用那佈滿老繭的手掌，用力拍了拍那本名冊） ", a: "miro new" },
            { n: "米羅", t: "現在，這本秩序之冊，就是這裡的規矩。 ", a: "miro new" },
            { n: "米羅", t: "哪怕明天我不在了，這座楓鈴驛站也絕對垮不了，這就是數據教給我的底氣。 ", a: "miro new" },
            { n: "系統", t: "（他輕輕地、卻無比鄭重地將名冊安放在桌面正中央。）", a: "miro new", se: "put down.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.1, bgDur:"10s"},
            { n: "米羅", t: "你第一次出現在這座驛站時，救了我那本即將被生活撕碎的爛帳冊。 ", a: "miro new" },
            { n: "米羅", t: "那天我在心底發過誓，我要變成一個像你一樣，能夠掌控數據、掌握秩序的人。 ", a: "miro new" },
            { n: "米羅", t: "這幾天緊跟著你的每一步操作看著那些混亂在魔法下臣服。 ", a: "miro new" },
            { n: "米羅", t: "我的內心變得前所未有的確定。 ", a: "miro new" },
            { n: "米羅", t: "我決定跟你走。--，請把我也算進那支正在成型的小隊裡吧！", a: "miro new",shake:true },
            { n: "我", t: "（我露出了欣慰的笑容，伸出手去，拍了拍他略顯單薄卻寬闊了不少的肩膀。）", a: "me"
            , se: "girl_smile1.mp3", vol: 1.0,bg:"CG/ch3 two.png",bgPos: "left"},
            { n: "我", t: "很好。這支隊伍的第一個核心成員，果然就該是你。歡迎加入，隊友。 ", a: "me"},
            { n: "米羅", t: "（他重重地回握住我的手，眼神中燃燒著一種名為『勇氣』的火焰，用力地點頭。） 嗯！", a: "miro new",bgPos: "right",shake:true},
            { n: "系統", t: "（夕陽的最後一抹餘暉中，賽爾咻地一聲飛回了我的肩膀。）", a: "system", bg: "bg3 rule.png", bgm: "sweet.mp3", se: "fun2.mp3", vol: 1.0  },
            { n: "賽爾", t: "一支具備靈魂的隊伍，總算是湊齊了最基石的第一塊碎片。 ", a: "fairy" },
            { n: "賽爾", t: "這份實感，可比那一封見不到國王的燙金廢紙，要實在得太多了。 ", a: "fairy" },
            { n: "我", t: "賽爾，那我們的下一個節點，究竟該往這片大陸的哪個方向進發？", a: "me"},
            { n: "賽爾", t: "（它優雅地伸了個懶腰）你急什麼。", a: "fairy",se:"fairy_sleep",shake:true},
            { n: "賽爾", t: "天都黑透了，大家先在這間整齊的驛站裡好好睡上一覺吧。 ", a: "fairy"},
            { n: "賽爾", t: "這三天三夜的瘋狂重塑，你這小子的臉色也沒比米羅好看到哪裡去。 ", a: "fairy" },
            { n: "賽爾", t: "你要記住，夥伴是用來互相分擔命運壓力的，不是用來讓你一個人在那裡逞強的。 ", a: "fairy"},
            { n: "賽爾", t: "明天的路……我們等明天睜開眼，再一起踏上去吧。 ", a: "fairy",flash:true}
        ],
        success_SEARCH: [
            { n: "賽爾", t: "【尋找內容】禁術施展成功！", a: "fairy" },
            { n: "我", t: "找到了！就在第 388 行，標註著『遊方醫者，江舟』。", a: "me" },
            { n: "我", t: "孩子，終於有救了。", a: "me" },
            { n: "我", t: "奇怪……名冊上每個人的狀態，全寫著『進京待發』。城門封了十六天，這欄整片都是廢話，擋著我沒法分類。", a: "me" },
            { n: "賽爾", t: "現在學第二招：【全部取代】！", a: "fairy" },
            { n: "賽爾", t: "快速按下 Ctrl + H，讓我們把沒用的廢話一口氣全都換掉。", a: "fairy" }
        ],
        success_REPLACE: [
            { n: "賽爾", t: "【全部取代】魔法完成！", a: "fairy" },
            { n: "賽爾", t: "僅僅只是一個詞的更動，就足以改寫這一千個人的處境。", a: "fairy" },
            { n: "我", t: "原本那一千個礙眼的『進京待發』，在一瞬間全都變換了。", a: "me" },
            { n: "我", t: "名冊這下子，終於肯對我們說點實話了。", a: "me" },
            { n: "我", t: "南境的小路還通，可以先送一批人回頭. 可家鄉欄『南境·楓林』 『南境·石橋』……寫法全不一樣，一個個挑要挑到天黑。", a: "me" },
            { n: "賽爾", t: "接下來是第三招：【模糊搜尋】！", a: "fairy" },
            { n: "賽爾", t: "當你記不清名字時，就用星號『*』來代表不確定的部分。", a: "fairy" },
            { n: "賽爾", t: "現在輸入『南境*』試試看。", a: "fairy" }
        ],
        success_FUZZY: [
            { n: "賽爾", t: "模糊搜尋大成功！", a: "fairy" },
            { n: "賽爾", t: "你看這道綠色的魔法座標，讓南境人的資料一眼就能被瞧見。", a: "fairy" },
            { n: "我", t: "上百個同鄉的資料全都被標記出來了。明早第一件事，送他們回家。", a: "me" },
            { n: "我", t: "你有沒有發現……名冊裡有些旅客的編號很奇怪，好像是故意被隱藏起來的特定小隊. 比如『旅客 30』到『旅客 39』。", a: "me" },
            { n: "賽爾", t: "現在是第四招：精確模糊(?)禁術！", a: "fairy" },
            { n: "賽爾", t: "問號代表的是『剛好一個字符』。", a: "fairy" },
            { n: "賽爾", t: "輸入『旅客 3?』，精準鎖定那些隱藏的編號吧。", a: "fairy" }
        ],
        success_PRECISE_FUZZY: [
            { n: "賽爾", t: "精確定位成功！不多也不少，剛好就是你要找的那十個人。", a: "fairy" },
            { n: "我", t: "果然如我所料。這十個人全都是精銳傭兵出身……", a: "me" },
            { n: "我", t: "得趕快把他們編入驛站的守備隊才行。", a: "me" },
            { n: "我", t: "名冊理得差不多了，但最後還有個大麻煩：『報到日期』這一欄。", a: "me" },
            { n: "我", t: "驛站的人潮是成批到達的，前任書記只記了每一批領頭人的日期，後面的隨行人員全空著。", a: "me" },
            { n: "我", t: "如果日期不準，物資就沒法按天核對。", a: "me" },
            { n: "賽爾", t: "最後還有一招：【多重填充】！", a: "fairy" },
            { n: "賽爾", t: "先點擊尋找，然後選擇『到...』中的『特殊定位』。", a: "fairy" },
            { n: "賽爾", t: "勾選『空格』來打開定位條件吧。", a: "fairy" }
        ],
        success_EMPTY: [
            { n: "賽爾", t: "多重填充完美成功！", a: "fairy" },
            { n: "賽爾", t: "僅僅只花了一秒鐘，你就理清了這一千多人的時間線。", a: "fairy" }
        ],
        fail_SEARCH_use_replace: [
            { n: "賽爾", t: "「喂！我們是要找人，不是要消除他啊！你點到『取代』了！」", a: "fairy" },
            { n: "我", t: "「呃……手滑。」", a: "me" }
        ],
        fail_REPLACE_wrong_old_val: [
            { n: "賽爾", t: "「少年，你在改什麼？我们要抓的是『進京待發』，你剛才改掉的是別的資料吧！」", a: "fairy" }
        ],
        fail_REPLACE_wrong_new_val: [
            { n: "賽爾", t: "「取代成功了，但……你這新詞寫得不對吧！要改成『滯留待安置』，少一個字或錯一個字，公會那邊可是不認帳的！」", a: "fairy" }
        ],
        fail_REPLACE_with_format: [
            { n: "賽爾", t: "「等等！你是不是忘了把剛才的格式設定關掉？我們現在只是要改文字，不需要把名冊塗得綠油油的喔！」", a: "fairy" },
            { n: "我", t: "「喔對，差點忘了把選項裡的格式清除掉。」", a: "me" }
        ],
        fail_SEARCH_not_found: [
            { n: "賽爾", t: "「找不到？檢查一下關鍵字有沒有打錯。我們要找的是『遊方醫者』，少一個字或打成繁體/簡體不同字都會失敗喔！」", a: "fairy" },
            { n: "我", t: "「（揉揉眼） 好像真的打錯字了……」", a: "me" }
        ],
        fail_REPLACE_wrong_val: [
            { n: "賽爾", t: "「取代失敗！你是不是打錯『尋找目標』了？要精準輸入『進京待發』，魔導書才能抓到它們並改寫！」", a: "fairy" }
        ],
        fail_FUZZY_missing_wildcard: [
            { n: "賽爾", t: "「少年，這不是普通尋找！要施展模糊搜尋，必須加上『*』(代表多個字) 或『?』(代表一個字)。試試輸入『南境*』！」", a: "fairy" },
            { n: "米羅", t: "「原來那顆星星是魔法符號嗎？受教了。」", a: "miro" }
        ],
        fail_FUZZY_no_format: [
            { n: "賽爾", t: "「只搜尋不標記的話，一千行名冊還是會看花眼的！點開右下角的【選項 >>】，在格式裡設定一個醒目的綠色吧！」", a: "fairy" },
            { n: "我", t: "「喔對，標記出來才好分類送人回家。」", a: "me" }
        ],
        fail_EMPTY_wrong_formula: [
            { n: "賽爾", t: "「公式下錯了！我們要把上面的日期抓下來，正確的禁語是『=↑』或是輸入『=』後按『↑』方向鍵！」", a: "fairy" },
            { n: "我", t: "「公式這東西還真是嚴謹啊……」", a: "me" }
        ],
        fail_EMPTY_no_ctrl_enter: [
            { n: "賽爾", t: "「等等！你只填了一格？我們現在要一次填滿所有空格，輸入公式後要按下 [[Ctrl + Enter|gold]] 才能發動全體魔法！」", a: "fairy" }
        ]
    },

    simulator: {
        bgm: "BGM/game_bgm.mp3",
        tasks: [
            {
                id: "SEARCH_TASK",
                tutorHint: "在尋找框輸入『遊方醫者』，按下【找下一個】。",
                playerText: "一千兩百多行……那個發燒的孩子，等不了我一行行翻。名冊記著各人身分——只要有人登記『遊方醫者』，我得立刻找到他。",
                unlockBtnId: "find_group",
                unlockSkillId: "SEARCH",
                tab: "start",
                expectedCondition: { type: "SEARCH_VAL", value: "遊方醫者" },
                storySegmentAfter: "success_SEARCH"
            },
            {
                id: "REPLACE_TASK",
                playerText: "奇怪……名冊上每個人的狀態，全寫著『進京待發』。城門封了十六天，這欄整片都是廢話，擋著我沒法分類。",
                tutorHint: "按 Ctrl + H，把所有『進京待發』換成『滯留待安置』。",
                unlockBtnId: "find_group",
                unlockSkillId: "REPLACE",
                tab: "start",
                expectedCondition: { type: "REPLACE_CHECK", oldVal: "進京待發", newVal: "滯留待安置" },
                storySegmentAfter: "success_REPLACE"
            },
            {
                id: "FUZZY_TASK",
                playerText: "南境的小路還通，可以先送一批人回頭. 可家鄉欄『南境·楓林』 『南境·石橋』……寫法全不一樣，一個個挑要挑到天黑。",
                tutorHint: "輸入『南境*』，並在【選項】中設定好綠色樣式後按【全部尋找】。",
                unlockBtnId: "find_group",
                unlockSkillId: "FUZZY",
                tab: "start",
                expectedCondition: { type: "FUZZY_DONE_SIGNAL", pattern: "南境*" },
                storySegmentAfter: "success_FUZZY"
            },
            {
                id: "PRECISE_FUZZY_TASK",
                playerText: "（盯著名冊）米羅，你有沒有發現……名冊裡有些旅客的編號很奇怪，好像是故意被隱藏起來的特定小隊. 比如『旅客 30』到『旅客 39』。",
                tutorHint: "輸入『旅客 3?』並記得在【選項】中設定好樣式，按下【全部尋找】。",
                unlockBtnId: "find_group",
                unlockSkillId: "FUZZY",
                tab: "start",
                expectedCondition: { type: "FUZZY_DONE_SIGNAL", pattern: "旅客 3?" },
                storySegmentAfter: "success_PRECISE_FUZZY"
            },
            {
                id: "EMPTY_TASK",
                playerText: "名冊理得差不多了，但最後還有個大麻煩：『報到日期』這一欄。驛站的人潮是成批到達的，前任書記只記了每一批領頭人的日期，後面的隨行人員全空著。如果日期不準，物資就沒法按天核對。",
                tutorHint: "按下 尋找 後按 到... -> 特殊 定位【空格】。在 E3 輸入『=↑』並按下 Ctrl + Enter。",
                unlockBtnId: "find_group",
                unlockSkillId: "EMPTY",
                tab: "start",
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
                return !data.slice(1).some(row => row[4] === "");
            }
            return false;
        }
    }
};