/**
 * 試算表魔法冒險 v2 - 第四章【義診與三人行】
 * ★ 教學邏輯終極修正版 ★
 * 順序：簡單排序(陷阱) -> 自訂排序(解) -> 多條件(全) -> 篩選
 */

const generateCh4Data = () => {
    const surnames = ["陳", "林", "黃", "張", "李", "王", "吳", "劉", "蔡", "楊", "許", "鄭", "謝", "郭", "洪", "曾", "邱", "廖", "賴", "周"];
    const firstNames = ["大為", "小玲", "志明", "春嬌", "美雲", "建國", "淑芬", "俊傑", "雅婷", "明輝", "秀英", "家豪", "怡君", "建輝", "欣怡", "正雄", "淑華", "志強", "雅雯", "智傑"];
    
    const fixedPatients = [
        { id: 5,  name: "林春嬌", village: "西山村", cond: "重症", wait: 0.5, med: "赤根散",      prio: "立即處置" },
        { id: 12, name: "石來福", village: "楓林村", cond: "中症", wait: 3.0, med: "玄月露",      prio: "優先等候" },
        { id: 18, name: "吳明生", village: "霧谷村", cond: "輕症", wait: 5.0, med: "青霜草",      prio: "一般等候" },
        { id: 25, name: "陳阿婆", village: "霧谷村", cond: "重症", wait: 4.5, med: "青霜草",      prio: "立即處置" },
        { id: 28, name: "黃小妹", village: "東谷村", cond: "輕症", wait: 0.5, med: "無需特殊藥材", prio: "一般等候" }
    ];

    const villages  = ["楓林村", "石橋村", "漁港村", "東谷村", "霧谷村", "西山村"];
    const conditions = ["重症", "中症", "輕症", "輕症", "輕症"];
    const medicines  = ["青霜草", "赤根散", "無需特殊藥材", "無需特殊藥材", "無需特殊藥材",
                        "青霜草", "玄月露", "無需特殊藥材", "赤根散", "無需特殊藥材"];
    const waitHours  = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    // 生成所有可能的名字組合
    let allPossibleNames = [];
    for (const s of surnames) {
        for (const f of firstNames) {
            allPossibleNames.push(s + f);
        }
    }
    // 排除固定病患的名字
    const excludedNames = fixedPatients.map(p => p.name);
    allPossibleNames = allPossibleNames.filter(n => !excludedNames.includes(n));
    
    // 隨機打亂名字
    allPossibleNames.sort(() => Math.random() - 0.5);

    const rows = [["編號", "姓名", "來源村莊", "病情等級", "等待時數", "所需藥材", "處置優先度"]];
    
    for (let i = 0; i < 30; i++) {
        const rIdx = i + 1;
        const fixed = fixedPatients.find(p => p.id === rIdx);
        
        if (fixed) {
            rows.push([fixed.id, fixed.name, fixed.village, fixed.cond, fixed.wait, fixed.med, fixed.prio]);
        } else {
            const cond     = conditions[Math.floor(Math.random() * conditions.length)];
            const med      = medicines[Math.floor(Math.random() * medicines.length)];
            const wait     = waitHours[Math.floor(Math.random() * waitHours.length)];
            const priority = cond === "重症" ? "立即處置" : cond === "中症" ? "優先等候" : "一般等候";
            rows.push([rIdx, allPossibleNames[i], villages[Math.floor(Math.random() * villages.length)],
                       cond, wait, med, priority]);
        }
    }
    return rows;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["40"] = {
    meta: {
        title: "第四章：義診與三人行",
        sheetName: "🏥 病患名冊",
        reward: 1800
    },

    initialGridData: generateCh4Data(),

    skillDefs: {
        SORT_SIMPLE:    { n: "簡單排序",   s: "開始→排序和篩選",  d: "按單一欄位快速排列所有資料",       cat: "data", icon: "icon/sort&filter.png" },
        SORT_MULTI:     { n: "多條件排序", s: "自訂排序",          d: "按多個欄位依序決定排列優先順序",   cat: "data", icon: "icon/sort&filter.png" },
        SORT_CUSTOM:    { n: "自訂排序",   s: "自訂序列",          d: "用自訂的規則（不依大小）排列資料", cat: "data", icon: "icon/sort&filter.png" },
        FILTER:         { n: "篩選",       s: "開始→篩選",         d: "只顯示符合條件的資料列",           cat: "data", icon: "icon/sort&filter.png" },
        FILTER_ADV:     { n: "進階篩選",   s: "資料→進階",         d: "用條件區域設定複雜的且/或篩選",    cat: "data", icon: "icon/sort&filter.png" },
        FILTER_FORMULA: { n: "公式篩選",   s: "條件區域輸入公式",  d: "用公式作為篩選條件",               cat: "data", icon: "icon/sort&filter.png" }
    },

    story: {
        start: [
            { n: "系統", t: "（結伴上路的第一天。三個人一匹馬，還有一本在夕陽餘暉下泛著微光的魔導書）", a: "system"
            , bg: "CG/ch4 three.png", bgm: "daily.mp3",bgPos: "center", bgZoom: 1.1, bgDur:"2s"},
            { n: "系統", t: "（官道上的泥土還帶著雨後的潮氣。那匹老馬喘著粗氣，勉強負載三個人的行囊。）", a: "system"
            , env: "white smoke/1", envFrames: 25, envspeed:80, envOpacity: 0.2, envDrift:true},
            { n: "賽爾", t: "（它輕盈地陷在行李包最柔軟的褶皺裡，悠閒地晃動著透明的小腳丫。）", a: "fairy",
            bgPos: "right top", bgZoom: 2.0, bgDur:"5s"
             },
            { n: "賽爾", t: " 本仙子現在正式宣布：今天的天氣真的很好哦。", a: "fairy", bgm: "goofy.mp3",se: "fairy_laugh.mp3", vol: 1.0  },
            { n: "米羅", t: "（他在前面牽著馬，回頭露出一抹溫和的笑意。）", a: "miro"
            ,bgPos: "right", bgZoom: 2.0, bgDur:"3s"
             },
            { n: "米羅", t: " 昨天還在下雨，今天就徹底放晴了，天氣確實很不錯呢。", a: "miro", se: "boy_accept.mp3", vol: 1.0  },
            { n: "我", t: "妳今天已經重複說了八次「天氣很好」這句話了。", a: "me", se: "girl_smile.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 2.0,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "賽爾", t: "本仙子在悶熱的抽屜裡被關了三百年，出來第一天當然要多說幾次！", a: "fairy"
            ,shake:true,bgPos: "right top", bgZoom: 2.0},
            { n: "賽爾", t: "你管得著嗎？", a: "fairy" },
            { n: "我", t: "那等到了第二天呢？妳打算說什麼？", a: "me",bgPos: "center", bgZoom: 2.0 },
            { n: "賽爾", t: "第二天的話，我就會說「昨天的天氣真的很好」。", a: "fairy",bgPos: "right top", bgZoom: 2.0 },
            { n: "我", t: "（我沉默了兩秒，在這種奇妙的邏輯鬥嘴上，我意識到自己輸得徹底。） ", a: "me", se: "six point.mp3", vol: 1.0 },
            { n: "我", t: "……好吧，算妳贏了。", a: "me", se: "girl_embrass.mp3", vol: 1.0  },
            { n: "米羅", t: "（他在一旁牽著馬，看著我們鬥嘴，忍不住偷偷笑出聲來。）", a: "miro", se: "boy_smile.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.1},

            { n: "米羅", t: "隊長你看，前面好像有個規模不小的城鎮。", a: "miro",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "賽爾", t: "（它好奇地從行李頂端探出小腦袋） 有炊煙，有繁忙的市集……", a: "fairy", bg: "bg4 out.png", bgm: "daily.mp3"},
            { n: "賽爾", t: "哎呀，那邊好多人在排隊啊。", a: "fairy",shake:true},
            { n: "我", t: "（我抬頭望去。街道盡頭那間原本應當平靜的小診所正被厚重的人聲所包圍。）", a: "me", se: "people.mp3", vol: 1.0
            ,bgPos: "right", bgZoom: 2.0, bgDur:"10s"},
            { n: "我", t: "（門外的隊伍如蜿蜒的亂麻般排到了街角，現場的秩序幾乎已經潰散。）", a: "me" },
            { n: "我", t: "那些排隊的人群，完全沒有進行任何有效的分流。", a: "me" },
            { n: "賽爾", t: "（它從背包頂端再次探頭過來，眼神中帶著一絲不解） 奇怪。", a: "fairy", se: "fairy_q.mp3", vol: 1.0
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "賽爾", t: "你怎麼第一眼就注意到這種奇怪的地方了？", a: "fairy" },
            { n: "我", t: "沒辦法，可能是這幾天整理表格留下的職業病吧。", a: "me", se: "girl_attraction.mp3", vol: 1.0 },

            { n: "柔依", t: "（一名扎著俐落高馬尾的女孩神色匆匆，猛地從診所那扇厚重的木門後衝了出來。）", a: "royi", se: "pa.mp3", vol: 1.0
            ,bg:"CG/ch4.png",bgPos: "center", bgZoom: 1.1,flash:true,flashSFX:"flash.mp3"},
            { n: "柔依", t: "（她懷裡死死抱著一疊邊緣捲曲、厚重的紙張，險些撞上迎面的路人。）", a: "royi", se: "run.mp3", vol: 1.0,shake:true},
            { n: "柔依", t: " 借過！請大家讓一讓，急診！", a: "royi",shake:true},
            { n: "柔依", t: "（她急促的腳步猛地釘在石階上，驚訝地打量了你們三個一眼。）", a: "royi"
            ,bgPos: "top", bgZoom: 2.0},
            { n: "柔依", t: "你們……是剛好路過的冒險者嗎？", a: "royi" },
            { n: "我", t: "沒錯，我們只是路過這裡。", a: "me", se: "girl_en1.mp3", vol: 1.0,bg:"bg4.png"},
            { n: "柔依", t: "既然是路過的，你們能不能行個好幫個忙？", a: "royi",flash:true,flashSFX:"flash.mp3",bg:"CG/ch4.png"},
            { n: "柔依", t: "今天病患突然多了三倍，診所的名冊完全沒有進行排序。", a: "royi" },
            { n: "柔依", t: "醫生現在根本沒辦法按照輕重緩急來看診。", a: "royi" },
            { n: "柔依", t: "（她一臉焦急地把那疊凌亂不堪、甚至還沾著墨漬的紙張遞了過來。）", a: "royi", se: "paper down.mp3", vol: 1.0,shake:true},
            { n: "柔依", t: "現在重症病患和等了五個小時的輕症全混在一起……", a: "royi" },
            { n: "柔依", t: "大家都在外面不停地催促，場面快失控了。", a: "royi" },
            { n: "我", t: "（我伸手接過名冊翻開第一頁，密密麻麻的紀錄僅僅是按時間堆疊。）", a: "me", se: "book.mp3", vol: 1.0 
            ,bgPos: "center", bgZoom: 2.0, bgDur:"4s",bg:"bg4.png"},
            { n: "我", t: "（毫無章法可言。重症與輕症的數據糾纏不清，看得我眉頭緊鎖。）", a: "me" },
            { n: "我", t: "……到底是誰設計了這麼不科學的名冊啊？", a: "me" },
            { n: "柔依", t: "是七八個義工輪流登記的，大家當時都忙瘋了。", a: "royi",bg:"CG/ch4.png",bgPos: "top", bgZoom: 2.0},
            { n: "我", t: "（我合上名冊，表情嚴肅地將它夾在腋下） 帶我們進去診所吧。", a: "me", se: "put down.mp3", vol: 1.0,shake:true,bg:"bg4.png"},
            { n: "賽爾", t: "（它輕巧地飛回我的肩膀上，貼著耳邊壓低聲音戲謔道） ", a: "fairy", se: "fun1.mp3", vol: 1.0 
            ,bgPos: "center", bgZoom: 1.1, bgDur:"10s"},
            { n: "賽爾", t: "嘿嘿，你剛才才說這是「職業病」，現在竟然又主動接了活。", a: "fairy" },
            { n: "我", t: "（我也目不斜視地小聲回應道） 妳給我閉嘴啦。", a: "me",shake:true},
            { n: "賽爾", t: "（它發出一串銀鈴般的笑聲） 本仙子就說嘛，今天天氣果然很好。", a: "fairy", se: "fairy_smile.mp3", vol: 1.0},
            { n: "米羅", t: "（在一旁有些侷促地壓低聲音問道） 隊長，「天氣很好」是她的萬用台詞嗎？", a: "miro" },
            { n: "我", t: "這點你慢慢習慣就好了，她就是這樣。", a: "me",env:null,flash: true, flashSFX: "boom.mp3", vol: 1.0}
        ],

        // ── 任務 1：簡單排序 (發現筆劃問題) ──
        discovery_SORT_LIMIT: [
            { n: "賽爾", t: "先試試看[[簡單排序|gold]]吧。點選「病情等級」欄，讓魔導書施展【從 Z 到 A 排序】的魔法。", a: "fairy" }
        ],

        // ── 任務 2：自訂排序 (解決筆劃問題) ──
        discovery_CUSTOM_SORT: [
            { n: "我", t: "（我盯著螢幕上跳出的結果，眉頭皺得更深了） 奇怪，排出來的順序竟然是『輕症』在最上面？", a: "me" },
            { n: "賽爾", t: "（它飛到螢幕前，語氣理所當然） 傻瓜，魔導書預設是按『筆劃』排列的，「輕」有 14 劃，「重」只有 9 劃，當然排前面。", a: "fairy" },
            { n: "賽爾", t: "它根本不知道什麼是救命優先度！這就是簡單工具的邏輯極限。", a: "fairy" },
            { n: "賽爾", t: "你得使用[[自訂排序|gold]]來親手教它這世界的規矩：重症第一、中症第二、輕症第三。", a: "fairy" },
            { n: "我", t: "原來如此。這就是數據魔法的盲區嗎……我明白了，必須手動定義優先權。", a: "me" }
        ],

        // ── 任務 3：多條件排序 (米羅的公平觀) ──
        discovery_MULTI_SORT: [
            { n: "系統", t: "（診所內的空氣漸漸恢復了流動，名冊的整理工作已完成大半。）", a: "system" },
            { n: "系統", t: "（門外原本嘈雜的隊伍安靜了不少，疲憊的病患們紛紛尋找空位坐下。）", a: "system" },
            { n: "米羅", t: "（他一直注視著螢幕上跳動的數據，忽然眉頭微蹙，開口問道） 隊長，這樣排真的對嗎？", a: "miro" },
            { n: "我", t: "你指哪裡不對？", a: "me" },
            { n: "米羅", t: "你看，這位吳明生先生是輕症，但他已經在風裡等了五個小時了。", a: "miro" },
            { n: "米羅", t: "而這位林春嬌女士雖然是重症，但她才剛來半個小時。", a: "miro" },
            { n: "米羅", t: "按照現在的排序規則，林女士會被優先接診。", a: "miro" },
            { n: "我", t: "沒錯啊，醫生的原則本來就是重症優先處置。", a: "me" },
            { n: "米羅", t: "（他眼神中透出一絲執拗的認真） 但如果接下來一直有重症病患進來？", a: "miro" },
            { n: "米羅", t: "那吳先生豈不是永遠都排不到了嗎？他已經等了五個小時啊。", a: "miro" },
            { n: "我", t: "（我手上的動作猛地停住了，轉過頭，第一次認真地審視著身邊的米羅。）", a: "me" },
            { n: "我", t: "米羅，你以前在楓鈴驛站也經常見到這種情況嗎？", a: "me" },
            { n: "米羅", t: "嗯。很多時候先到的人會一直被後來的「急件」給蓋掉。", a: "miro" },
            { n: "米羅", t: "我那時候就覺得不太公平，但一直沒想出好辦法解決。", a: "miro" },
            { n: "賽爾", t: "（它從書頁中探出半個身子，驚訝地看著米羅） 哇哦。", a: "fairy" },
            { n: "賽爾", t: "看來你這個新人竟然捕捉到了第二個關鍵的排序邏輯呢。", a: "fairy" },
            { n: "米羅", t: "（他愣了一下，有些侷促地低下頭） 我只是覺得那樣對等很久的人不公平。", a: "miro" },
            { n: "我", t: "辨別到底在哪裡不公平，這件事比學會使用工具要難得多。", a: "me" },
            { n: "我", t: "當病情等級相同的時候，等待時數越長的人就應該越優先。", a: "me" },
            { n: "我", t: "米羅，這就是你剛才精確挖掘出來的複合規則。", a: "me" },
            { n: "米羅", t: "（他的眼睛裡第一次閃爍出某種確信的光芒） 既然這樣，那我們快把它加進去吧！", a: "miro" },
            { n: "賽爾", t: "（落回到你的肩上，讚許地扇動著翅膀） 不錯嘛，這個新隊友挺有前途。", a: "fairy" },
            { n: "我", t: "（我特意將魔導書的畫面往米羅那邊側了側，讓他能看清細節。）", a: "me" },
            { n: "我", t: "來，這個你發現的問題，就由你親自來把它解決掉吧。", a: "me" },
            { n: "米羅", t: "我？真的讓我來動手施展這種程度的魔法嗎？", a: "miro" },
            { n: "我", t: "沒錯。是你發現的問題，當然就該由你來親手終結它。", a: "me" },
            { n: "賽爾", t: "去【自訂排序】增加層級。第一條件是『病情』，第二條件是『等待時數』。這就是[[多條件排序|gold]]！", a: "fairy" }
        ],

        // ── 任務 4：篩選 (物資短缺) ──
        discovery_FILTER: [
            { n: "柔依", t: "糟糕！我們的「青霜草」藥材快見底了，必須先集中處理需要這項藥材的人！", a: "royi" },
            { n: "我", t: "我們得把名冊中需要青霜草的病患過濾出來。可是，名冊這麼長，要一個一個人工挑選嗎？", a: "me" },
            { n: "賽爾", t: "笨！施展[[篩選魔法|gold]]啊。點選「所需藥材」的小箭頭，只勾選「青霜草」就行了！", a: "fairy" }
        ],

        success_FORMULA: [
            { n: "我", t: "（原本混亂無章的名冊此刻變得層次分明，每一行數據都各安其位。）", a: "me" },
            { n: "柔依", t: "（她有些不敢置信地接過名冊，視線在清晰的列表上快速掃過） 效率太驚人了！這簡直是……", a: "royi" },
            { n: "柔依", t: "謝謝你們。這份謝禮（新任務）拿去，這才是最有誠意的報答方式！", a: "royi" }
        ],

        end: [
            { n: "系統", t: "（兩個小時後。診所外那條蜿蜒的隊伍已經縮短了一大半。）", a: "system", bg: "bg4 clinic.png", bgm: "finish.mp3"
            , env: "light/1", envFrames: 25, envspeed:80, envDrift:true,bgPos: "center", bgZoom: 1.1},
            { n: "系統", t: "（空氣中原本浮動的焦慮感漸漸消散，病患們安靜地等待著接診。）", a: "system"
            ,bgPos: "center", bgZoom: 2.0, bgDur:"10s"},
            { n: "柔依", t: "（她欣慰地抹了抹額頭的汗水，看著整齊的名冊） 呼，終於全部做完了。", a: "royi", se: "girl_yes.mp3", vol: 1.0,shake:true},
            { n: "我", t: "嗯，總算是搞一段落了。（我小心地將最後一份數據封裝存檔。） ", a: "me", se: "girl_en1.mp3", vol: 1.0  },
            { n: "我", t: "現在裡面有六個大分類，包含三種不同層次的篩選條件。", a: "me" },
            { n: "我", t: "醫生只要打開第一頁，就能看到今天最需要優先處理的人是誰了。", a: "me" },
            { n: "柔依", t: "（她驚訝地停頓了一下，眼神中露出一絲銳利的探究） ", a: "royi",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "柔依", t: "這種處理數據的精準手法，看起來絕對不像是隨便在哪裡就能學到的。", a: "royi" },
            { n: "柔依", t: "你們……到底是從哪裡過來的冒險者？", a: "royi",bgPos: "center", bgZoom: 1.1},
            { n: "我", t: "我們是從楓鈴驛站那邊過來的，只是路過這裡。不必太在意。", a: "me", se: "girl_attraction.mp3", vol: 1.0  },
            { n: "柔依", t: "那麼，你們接下來打算往哪個方向繼續前進？", a: "royi" },
            { n: "我", t: "我們也還沒定。哪裡有緊急任務，我們就往哪裡走吧。", a: "me" },
            { n: "柔依", t: "（她突然把手裡最後一份厚重、泛黃的統計記錄遞了過來。） ", a: "royi", bg: "CG/ch4 royi.png", se: "paper down.mp3"
            , vol: 1.0, bgm:"conspiracy.mp3",bgPos: "top", bgZoom: 2.0},
            { n: "柔依", t: "這份是今天的就診統計，你們順便幫我歸檔，作為謝禮。", a: "royi",bgPos: "center", bgZoom: 1.1,bgDur:"10s"},
            { n: "我", t: "居然拿「派發新工作」來當作謝禮？我說，妳以後肯定會是個不得了的人物。", a: "me"},
            { n: "柔依", t: "（她已經帥氣地轉身離去，輕快的笑聲在夕照中遠遠地飄過來。） ", a: "royi", se: "girl_smile1.mp3", vol: 1.0   },
            { n: "柔依", t: "謝禮本來就應該讓對方再做點事，才顯得更有誠意嘛。", a: "royi" },
            { n: "賽爾", t: "（它目送著女孩遠去的背影，意味深長地嘖嘖兩聲） ", a: "fairy" },
            { n: "賽爾", t: "這個小姑娘，倒是個挺有意思的狠角色。", a: "fairy" },
            { n: "米羅", t: "（他走到我身邊，聲音壓得很低） 隊長你有注意到嗎？", a: "miro" , bg: "bg4 clinic.png", bgm: "begin.mp3"
            ,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "米羅", t: "剛才她注視魔導書的時候，眼神明顯停滯了一下。", a: "miro"},
            { n: "我", t: "我當然注意到了。（我默默地把記錄收入行囊） 沒關係，我們走吧。", a: "me" , se: "put down.mp3", vol: 1.0  },

            { n: "系統", t: "（傍晚時分。晚霞將長街照得一片金紅，三個人重新踏上旅程。）", a: "system", bg: "bg4 road.png", bgm:"sweet2.mp3",env:null
            ,bgPos: "center", bgZoom: 1.5
            },
            { n: "系統", t: "（小鎮街道旁的燈籠一盞接一盞地亮起，光影在青石板路上交錯重疊。）", a: "system"
            ,bgPos: "left", bgZoom: 1.1, bgDur:"10s"},
            { n: "米羅", t: "（他一邊走，一邊看著自己的雙手，有些感嘆） ", a: "miro" },
            { n: "米羅", t: "隊長，我感覺今天我做了一件非常有意義的事。", a: "miro" ,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "我", t: "你在楓鈴驛站管了三年帳冊，心裡早就明白什麼叫做真正的公平。", a: "me" },
            { n: "我", t: "這種對於秩序的洞察力，是靠學習任何工具都換不來的財富。", a: "me" },
            { n: "米羅", t: "（他聽完沉默了很久，最後才在夜色中聲音很輕地說道） 謝謝你，隊長。", a: "miro",shake:true },
            { n: "賽爾", t: "（它趴在行李包頂端，懶洋洋地補了一刀） ", a: "fairy" ,bg:"CG/ch4 all.png",bgPos: "left", bgZoom: 2.0},
            { n: "賽爾", t: "雖然技術層面上只是最基本的魔法應用，別太驕傲哦小伙子。", a: "fairy", se: "fairy_smile.mp3", vol: 1.0},
            { n: "米羅", t: "賽爾！妳難道就不能讓這種氣氛多維持幾秒鐘嗎！", a: "miro", se: "boy_attraction.mp3", vol: 1.0
            ,bgPos: "right", bgZoom: 2.0},
            { n: "賽爾", t: "不行。隨時打擊你的自滿情緒，也是本仙子的職責所在嘛。", a: "fairy",bgPos: "left", bgZoom: 2.0},
            { n: "我", t: "（我看著米羅第一次敢在賽爾面前大聲鬥嘴，嘴角忍不住微微上揚。）", a: "me", se: "girl_smile1.mp3", vol: 1.0
            ,bgPos: "center", bgZoom: 1.1, bgDur:"10s"},
            { n: "我", t: "（心想：跟一個月前那個唯唯諾諾的他相比，他現在確實變了很多。）", a: "me" },
            { n: "我", t: "（看著名冊。在數據歸位的那一刻，那種混亂歸於秩序的爽快感，確實讓人著迷。）", a: "me" },
            { n: "我", t: "（不過，時間只剩下最後兩天了，我們得加快腳步。）", a: "me",bg:"road dust.png"  },
            { n: "賽爾", t: "（它飛到我面前，輕聲說道，彷彿能看穿我此刻的所有思慮） 別想那麼多了。", a: "fairy",bgPos: "center", bgZoom: 1.5},
            { n: "賽爾", t: "出發吧，冒險少年。", a: "fairy",shake:true},
            { n: "我", t: "（我深吸一口帶著涼意的晚風，邁開了腳步） 嗯，出發！", a: "me",flash: true, flashSFX: "flash.mp3", vol: 1.0 }
        ],

        fail_SORT_wrong_column: [
            { n: "賽爾", t: "「魔力的焦點對錯地方了喔！我們要處理的是『病情等級』，先點選那一欄的任何一個格子吧。」", a: "fairy" }
        ],
        fail_SORT_wrong_order: [
            { n: "賽爾", t: "「魔法的流向反了！我們要讓最重要的重症病患優先浮到名冊最上方，試試看施展【從 Z 到 A 排序】吧！」", a: "fairy" }
        ],
        fail_SORT_selection: [
            { n: "賽爾", t: "「喂！別學那些壞習慣！在魔導書的邏輯裡，隨便選取整欄來排序是非常危險的。」", a: "fairy" },
            { n: "賽爾", t: "「這樣可能會導致這欄的資料跟旁邊的名字、編號脫鉤，整張名冊就廢了！」", a: "fairy" },
            { n: "賽爾", t: "「雖然本仙子的魔法會幫你自動擴展，但你還是得養成好習慣：[[只點選該欄的一個儲存格|gold]]就好。」", a: "fairy" },
            { n: "我", t: "喔……原來還有這種風險，我明白了。我重新只點選一格施法看看。", a: "me" }
        ],
        fail_FILTER_wrong: [
            { n: "賽爾", t: "「哎呀，魔力的過濾網漏掉了關鍵項！現在診所急需的是[[青霜草|gold]]，快把其他的干擾項取消勾選吧！」", a: "fairy" },
            { n: "我", t: "抱歉，手滑了。我重新精確勾選一次。", a: "me" }
        ],
        fail_FILTER_empty: [
            { n: "賽爾", t: "「你把大家都變不見了！醫生的診所可不是變魔術的地方，快把消失的病患名單找回來！」", a: "fairy" }
        ],
        fail_FILTER_wrong_column: [
            { n: "賽爾", t: "「等等，你要過濾的是藥材吧？怎麼在撥弄別的欄位？」", a: "fairy" },
            { n: "賽爾", t: "「現在我們要專注在[[所需藥材|gold]]這一欄的魔力引導喔！」", a: "fairy" }
        ]
    },

    simulator: {
        bgm: "BGM/game_bgm.mp3",
        tasks: [
            {
                id: "SORT_LIMIT_TASK",
                tutorHint: "點選「病情等級」欄，嘗試【從 Z 到 A 排序】。",
                playerText: "（雖然賽爾說有陷阱，但我還是先試試看簡單排序吧……）",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_SIMPLE",
                tab: "start",
                expectedCondition: { type: "ACTION", actionId: "SORT_DESC", col: 3 },
                storySegmentBefore: "discovery_SORT_LIMIT",
                storySegmentAfter: "discovery_CUSTOM_SORT"
            },
            {
                id: "CUSTOM_SORT_TASK",
                tutorHint: "在【自訂排序】對話框中，點擊順序欄位的下拉選單，選擇【自訂清單...】並輸入等級順序。",
                playerText: "魔法不通人性。我得親自定義什麼才是「嚴重」。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_CUSTOM",
                tab: "start",
                expectedCondition: { type: "ACTION", actionId: "SORT_CUSTOM" },
                storySegmentAfter: "discovery_MULTI_SORT" // 直接跳轉到米羅的公平觀對話
            },
            {
                id: "MULTI_SORT_TASK",
                tutorHint: "現在，在剛才的【自訂排序】對話框點擊「新增層級」，加入第二條件「等待時數」(大到小 Z到A)。",
                playerText: "原來還能疊加條件……這下子既救急又公平了！",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "SORT_MULTI",
                tab: "start",
                expectedCondition: { type: "ACTION", actionId: "SORT_MULTI" },
                storySegmentAfter: "discovery_FILTER"
            },
            {
                id: "FILTER_TASK",
                tutorHint: "開啟【篩選】，在「所需藥材」欄只勾選「青霜草」。",
                playerText: "藥材告急！立刻找出所有需要「青霜草」的病患。",
                unlockBtnId: "sort_filter_group",
                unlockSkillId: "FILTER",
                tab: "start",
                expectedCondition: { type: "ACTION", actionId: "FILTER_APPLY" },
                storySegmentAfter: "success_FORMULA"
            }
        ]
    }
};
