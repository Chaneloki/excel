/**
 * 試算表魔法冒險 v2 - 第一章【倉庫與禁術】
 * 完整定稿版：整合 v41 劇情與 v2 清晰邏輯
 * 腳本優化：將文風與第 5 章對齊，增加感官描寫與角色動作重量。
 * 閱讀優化：進一步拆分長句，確保每行文字長度適中。
 */

const generateCh1Data = () => {
    const base = [
        ["品項", "等級", "類別", "數量", "入庫日期", "", ""], 
        ["鐵劍", "E", "武器", "300", "", "", ""],
        ["鋼盔", "D", "防具", "500", "", "", ""],
        ["解毒劑", "F", "消耗品", "120", "", "", ""],
        ["傳送卷軸", "B", "道具", "50", "", "", ""],
        ["魔法水晶", "A", "材料", "15", "", "", ""],
    ];
    for(let i=6; i<=100; i++) {
        base.push([`生鏽長槍-${i}`, "F", "武器", Math.floor(Math.random()*100), "", "", ""]);
    }
    base[99] = ["[[祕寶·世界樹之種]]", "S", "神物", "1", "", "", ""]; 
    return base;
};

window.V2_CHAPTERS = window.V2_CHAPTERS || {};

window.V2_CHAPTERS["10"] = {
    meta: {
        title: "第一章：倉庫與禁術",
        sheetName: "🛡️ 裝備清單",
        reward: 500
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
            { n: "我", t: "（挺起胸膛，眼神如鷹般掃視著前方。）",bg: "war.png", bgm: "story_bgm1.mp3", bgPos: "center 20%", bgZoom: 1.5, bgDur: "4s" },
            { n: "我", t: "看著我的背影吧！沒錯，我就是那個傳說中的王牌冒險者，公會最鋒利的那把劍。",bg: "CG/Ch1 main.png",flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "我", t: "無論是多麼險惡的戰役，只要我踏入戰場，局勢就會立刻倒向我們這一邊。", bgPos: "center 20%", bgZoom: 1.0, bgDur: "4s"},
            { n: "我", t: "因為這座公會需要我，這個國家的人民依賴著我的力量，我是所有人最後的希望。", bgPos: "left", bgZoom: 1.5, bgDur: "4s"},
            { n: "我", t: "想要挑戰我？在那之前，先學會怎麼仰望我那輝煌的背影吧！",bg: "war.png",flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.0},
            { n: "系統", t: "（轟隆——！英雄的輝煌幻象被刺鼻的鏽味與冰冷的現實擊得粉碎。）",bg: "bg1.png",flash: true, flashSFX: "boom.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.0},
// ...接著接回原本的倉庫開場
            { n: "系統", t: "（公會最底層的地下倉庫，空氣中瀰漫著陳年盔甲那股刺鼻的鐵鏽味。）", a: "system", bg: "bg1.png", bgm: "goofy.mp3", bgPos: "center 20%", bgZoom: 1.5, bgDur: "3s"  },
            { n: "系統", t: "（頭頂那盞老舊的魔導燈泡忽明忽暗，微弱的光影在如山般的物資堆上緩緩挪動。）", a: "system", bgPos: "left top", bgZoom: 3.0, bgDur: "3s"  },
            { n: "我", t: "（我低頭看著手裡那張破損不堪、邊緣捲曲的羊皮紙清單。）", a: "me", bgPos: "center 20%", bgZoom: 1.0, bgDur: "3s", se: "paper down.mp3", vol: 1.0  },
            { n: "我", t: "（手心沁出了一層冷汗。）", a: "me" },
            { n: "我", t: "我是不是被公會那幫老傢伙給騙了？", a: "me", se: "ha.mp3", vol: 1.0 },
            { n: "我", t: "當初招募時說得天花亂墜，什麼『許你踏上通往榮耀與史詩的冒險者之路』。", a: "me" },
            { n: "我", t: "結果誰能想到，我那所謂的專屬『武器』，竟然只是一支毛尖開了叉的破舊毛筆。", a: "me" },
            { n: "我", t: "（視線落在清單上，那些被劣質墨水糊成一團的數字，看得我一陣暈眩。）", a: "me",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "我", t: "鐵劍三百、鋼盔五百，還有這些……甚至都不知道有沒有過期的解毒劑。", a: "me", bgPos: "right top", bgZoom: 2.0, bgDur: "3s"  },
            { n: "我", t: "這歪歪扭扭的字跡，簡直就像是史萊姆爬過一樣，根本無法閱讀。 ", a: "me" },
            { n: "我", t: "這哪裡是在冒險，這分明是一場對視神經的公開酷刑。", a: "me" },

            { n: "系統", t: "（砰！一聲巨響，沉重的倉庫鐵門被人猛力踹開。）", a: "system", se: "pa.mp3", vol: 1.0,shake:true },
            { n: "系統", t: "（湧進一股帶著霉味的寒風。）", a: "system", se: "wind1.mp3", vol: 3.0  },
            { n: "冒險者公會會長", t: "（會長那張寫滿焦慮、佈滿黑眼圈的臉孔在火光中顯得格外猙獰。）",bg:"stuff/head eyes.png" ,se: "popup.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.0 },
            { n: "冒險者公會會長", t: "（他死死抓著一個古老的沙漏，指節因為過度用力而顯得有些發白。）", a: "head",bg:"bg1.png" },
            { n: "冒險者公會會長", t: "別在那裡嘀咕了！看看你身後那座堆到天花板去的物資山！", a: "head" },
            { n: "冒險者公會會長", t: "聽好了。三天後，皇家的稽查小隊就要正式進駐這個倉庫。 ", a: "head", se: "boy_attraction.mp3", vol: 1.0  },
            { n: "冒險者公會會長", t: "那幫坐在王城金殿裡的典儀官，最擅長的就是在紙堆裡吹毛吹疵。", a: "head" },
            { n: "冒險者公會會長", t: "這份清單只要錯漏一個格子、少畫一條邊界線，他們就會以『帳目紊亂』為由……", a: "head" },
            { n: "冒險者公會會長", t: "當場摘掉我們公會的這塊百年招牌！", a: "head",shake:true },
            { n: "冒險者公會會長", t: "（他長長地吐出一口濁氣，指尖用力揉著青筋暴跳的太陽穴，顯得精疲力竭。）", a: "head", se: "man ha.mp3", vol: 1.0 },
            { n: "冒險者公會會長", t: "前線那些拿命去搏殺的兄弟，能不能拿到補給、買不買得起新盾牌，", a: "head" },
            { n: "冒險者公會會長", t: "全看這本清單能不能按時交上去。", a: "head" },
            { n: "冒險者公會會長", t: "年輕人，你是我今年最後的一根救命稻草了。", a: "head", se: "put down.mp3", vol: 1.0  },
            { n: "冒險者公會會長", t: "在沙漏的最後一顆沙粒落下之前，所有的數據，必須給我整整齊齊地對齊！", a: "head",shake:true  },
            { n: "我", t: "會、會長您先冷靜一下！", a: "me", se: "girl_scare.mp3", vol: 1.0   },
            { n: "我", t: "這種規模的點算量，根本不是區區人力在三天內能完成的啊！", a: "me" },
            { n: "系統", t: "（會長甚至沒給予我辯解的機會，轉身便消失在陰暗的走廊中。）", a: "system", bgPos: "left", bgZoom: 1.5, bgDur: "3s"  },
            { n: "冒險者公會會長", t: "算不出來的話，下個月你就給我在後山點算飛龍的糞便到天荒地老吧！", a: "head", se: "boy_angry.mp3", vol: 1.0 },
            { n: "冒險者公會會長", t: "自己看著辦！", a: "head", se: "pa.mp3", vol: 1.0, shake:true },

            { n: "我", t: "點算飛龍糞便……我現在申請辭職逃跑還來得及嗎？", a: "me" },
            { n: "系統", t: "（就在這時，咔噠一聲脆響，那個生鏽多年的抽屜竟毫無預兆地彈開了一道縫隙。）", a: "system", se: "door open.mp3", vol: 1.0, bgm: "no.mp3",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "系統", t: "（一抹耀眼的流光瞬間噴湧而出，將這間潮濕昏暗的倉庫映照得宛如白晝。）", a: "system", se: "appear.mp3", vol: 1.0 },

            { n: "系統", t: "（一隻巴掌大小、生著網格狀半透明翅膀的精靈，輕盈地從小抽屜裡振翅飛出。）", a: "system", se: "fun1.mp3", vol: 1.0 },
            { n: "賽爾", t: "（它在空中得意地劃過一個優美的圓弧，綠色的光塵點點飄落。）", a: "fairy", bgm: "goofy.mp3" },
            { n: "賽爾", t: "哈！整整三百年了，總算有個倒霉蛋……啊不，有緣人把這道命運的抽屜打開了。 ", a: "fairy" },
            { n: "賽爾", t: "少年，雖然你一臉寫滿了絕望，但卻沒在那老頭的咆哮下拔腿就跑，", a: "fairy" },
            { n: "賽爾", t: "這份骨氣，本仙子倒是不討厭。 ", a: "fairy", se: "fairy_smile.mp3", vol: 1.0 },
            { n: "我", t: "哇啊！？一隻會發光的……蟲子？不，這難道是傳說中的守護精靈？", a: "me", se: "girl_scare.mp3", vol: 1.0 },
            { n: "我", t: "你、你懷裡抱著的那本墨綠色的書又是什麼東西？", a: "me" },
            { n: "我", t: "封面上刻著那串閃爍著微光的古老符文，是『X-C-E-L』嗎？", a: "me", stuff:"charater/魔導書.png",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "賽爾", t: "（它輕巧地撫過那根由純粹光芒凝聚而成的指引棒，自戀地拍了拍它那精緻的小斗篷。）", a: "fairy", se: "put down.mp3", vol: 1.0  },
            { n: "賽爾", t: "這可是遠古神聖書記官所遺留下的唯一孤本——《試算表魔導書》！", a: "fairy", se: "fairy_infosmile.mp3", vol: 1.0  },
            { n: "賽爾", t: "而我，就是這神聖權能的唯一守護者，精靈賽爾。", a: "fairy",shake: true },
            { n: "賽爾", t: "只要你能領悟這本書中記載的位階禁術，別說區區這幾千件破爛……", a: "fairy" },
            { n: "賽爾", t: "就算是這世間成千上萬的紛亂數據，也能在彈指一揮間歸於秩序。 ", a: "fairy", se: "finger click.mp3", vol: 1.0  },
            { n: "賽爾", t: "走吧少年，踏入這座被數據魔法所洗禮的倉庫，", a: "fairy" },
            { n: "賽爾", t: "你的命運轉職，現在正式拉開序幕！", a: "fairy",flash: true, flashSFX: "boom.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.0 }
        ],
        end: [
            { n: "我", t: "（我緩緩放下那支早已被握得發燙的毛筆。）", a: "me", bg: "bg1.png", bgm: "finish.mp3", se: "pen.mp3", vol: 1.0 },
            { n: "我", t: "（揉了揉那雙因為長時間專注而酸澀無比的手腕。）", bg:"stuff/hand pain.png", bgPos: "center", bgZoom: 1.5, bgDur: "4s"   },
            { n: "我", t: "（我看著眼前這份變得煥然一新的清單，長長地舒了一口氣。）", bg: "bg1.png",a: "me", se: "paper down.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.0  },
            { n: "我", t: "呼，總算是在極限邊緣搞定了。這招『凍結視窗』的魔法也太過驚人了。 ", a: "me" },
            { n: "我", t: "無論我如何將視角向下延伸，那行關鍵的表頭竟然都穩如泰山。", a: "me" },
            { n: "賽爾", t: "（它輕盈地落在我的肩頭）哼哼，本仙子的指導才僅僅是這部魔導書最基礎的皮毛罷了。", a: "fairy", se: "fairy.mp3", vol: 1.0 ,flash: true, flashSFX: "flash.mp3", vol: 1.0},
            { n: "賽爾", t: "瞧你那副沒見過世面的傻樣，倒是比我預想中的要有樂趣。 ", a: "fairy" },
            { n: "我", t: "是是是，妳說得都對。有了這份傑作，至少能跟那個暴躁的老頭交差了吧？", a: "me" },

            { n: "系統", t: "（砰的一聲悶響，會長再次如狂風般推門而入。）", a: "system", se: "pa.mp3", vol: 1.0,shake: true},
            { n: "系統", t: "（手裡那隻殘餘沒幾顆沙粒的沙漏顯得岌岌可危。）", a: "system" },
            { n: "冒險者公會會長", t: "最後的時限已到！臭小子，要是沒弄完，就乖乖認——", a: "head",se: "boy_attraction.mp3", vol: 1.0 },
            { n: "系統", t: "（會長的目光落在那張被整齊擺放在桌中央的清單上。）", a: "system", bgm: "no.mp3",flash: true, flashSFX: "flash.mp3", vol: 1.0, bgPos: "center 20%", bgZoom: 1.5, bgDur: "1s"  },
            { n: "系統", t: "（整個人如同被石化術定住了一般，咆哮戛然而止。）", a: "system" },
            { n: "冒險者公會會長", t: "（他的臉上露出了某種近乎於神聖的震撼。）", a: "head", bg: "CG/Ch1.png", bgPos: "center", bgZoom: 1.0, bgDur: "3s"  },
            { n: "冒險者公會會長", t: "（顫抖著雙手戴起了那副佈滿裂痕的老花眼鏡。）", a: "head", bg: "CG/Ch1.png" },
            { n: "系統", t: "（他的一隻手重重按在桌面上，開始逐行逐格地審視起來。）", a: "system", bg: "CG/Ch1.png", se: "book.mp3", vol: 1.0, bgPos: "center", bgZoom: 1.5, bgDur: "10s"  },
            { n: "系統", t: "（當他的指尖停留在被完美凍結的標題以及精準得無懈可擊的彙整數據時）", a: "system", bg: "CG/Ch1.png", se: "book.mp3", vol: 1.0 },
            { n: "系統", t: "（他的呼吸變得急促起來。）", a: "system", bg: "CG/Ch1.png", se: "boy_breath.mp3", vol: 1.0 },
            { n: "系統", t: "（那一瞬間，他看向清單的眼神中，閃過了一抹深深的悸動。）", a: "system", bg: "CG/Ch1.png", bgm: "daily.mp3",flash: true, flashSFX: "flash.mp3", vol: 1.0 },
            { n: "冒險者公會會長", t: "無懈可擊、一格不差，連這複雜的總額數據，竟然都計算得如此精確……", a: "head", bg: "CG/Ch1.png" },
            { n: "冒險者公會會長", t: "我這輩子親自送走過十七個新人，從未見過有人能將清單整理到如此境界。 ", a: "head", bg: "CG/Ch1.png" },
            { n: "我", t: "我只是單純不想在後半生與後山的飛龍糞便為伍罷了。", a: "me", bg: "CG/Ch1.png" },
            { n: "我", t: "不過會長，看您這表情……掃龍糞那份『優渥』的差事，現在應該暫時輪不到我了吧？", a: "me", bg: "CG/Ch1.png", se: "girl_attraction.mp3", vol: 1.0 },
            { n: "系統", t: "（會長盯著我看了許久，那張飽經滄桑的臉上難得地綻開了一抹欣慰的笑意。）", a: "system", bg: "bg1.png", se: "man haha.mp3", vol: 1.0 },
            { n: "冒險者公會會長", t: "（他將那隻沙漏隨手塞回口袋，長舒了一口氣。）", a: "head", bg: "bg1.png" },
            { n: "冒險者公會會長", t: "好，算你夠狠！有這份神妙的表格在，那幫皇家稽查隊絕對只能乖乖閉上嘴巴。 ", a: "head",shake: true },
            { n: "冒險者公會會長", t: "前線兄弟們的補給金這下總算是保住了。公會現在最缺的，就是像你這種腦子靈活的傢伙。", a: "head" },
            { n: "冒險者公會會長", t: "至於你今年的補給酬金……我個人決定，直接給你加倍！", a: "head",shake: true  },

            { n: "我", t: "（接過那袋沉甸甸、發出清脆金屬碰撞聲的酬金，我微微挑了挑眉。）", a: "me", se: "coin2.mp3", vol: 1.0 },
            { n: "我", t: "多謝會長抬愛。動動腦子掌握禁術，確實比單純的苦力搬磚要划算得多。 ", a: "me", se: "me_yes.mp3", vol: 1.0 },
            { n: "系統", t: "（隨著會長那豪邁的腳步聲遠去，地下室再次回歸寂靜。）", a: "system", se: "pa.mp3", vol: 1.0, bgm: "no.mp3" },
            { n: "系統", t: "（昏暗的地下室裡，只剩下你與漂浮在半空的賽爾。）", a: "system" , bgPos: "center ", bgZoom: 1.0, bgDur: "3s" },
            { n: "系統", t: "（此時，一隻摺疊成飛鳥狀、散發著淡淡香氣的燙金信箋從窄小的氣窗外悠然飛入。）", a: "system", se: "bird.mp3", vol: 1.0 },
            { n: "系統", t: "（信箋劃過一道優美的弧線，穩穩地降落在這張落滿塵埃的桌面上。）", a: "system", bgm: "kingdom.mp3" },
            { n: "我", t: "這是……什麼？那封蠟上的印記，居然是皇宮禁衛軍的專屬紋章。 ", a: "me",se:"girl_scare", vol:1.0 },
            { n: "我", t: "難道這是一封指名道姓寄給我的信函嗎？", a: "me", letter: true },
            { n: "賽爾", t: "（它從小抽屜邊緣探出半個身子，瞇起眼盯著那枚燙金紋章。）", a: "fairy" },
            { n: "賽爾", t: "（露出了深不可測的笑意。）", a: "fairy", a: "fairy",se:"fairy_infosmile.mp3", vol:1.0 },
            { n: "賽爾", t: "呵，看來王城那幫大人物的嗅覺，遠比我們想像中的還要敏銳得多啊。 ", a: "fairy" },
            { n: "賽爾", t: "少年，今晚先好好沉入夢鄉吧。我敢打賭，明天的行程估計會讓你忙得焦頭爛額的。", a: "fairy"  }
        ],

        discovery_F: [
            { n: "我", t: "「不妙！！這表格只要往下一捲，標題列就跟著消失了。」", a: "me" },
            { n: "我", t: "「現在哪一欄是價格，我根本分不出來啊！」", a: "me" },
            { n: "賽爾", t: "別慌張！現在教你第一道招式：[[凍結頂端列|excel]]！", a: "fairy" },
            { n: "賽爾", t: "快去點擊工具列上的【凍結窗格】。", a: "fairy" }
        ],
        success_F_intro_NAV: [
            { n: "賽爾", t: "凍結完成！標題現在死死地黏在最上面了。", a: "fairy" },
            { n: "賽爾", t: "不過，這張清單可是有整整一百列哦，你打算怎麼辦？", a: "fairy" },
            { n: "我", t: "「可惡，難道要我一格一格往下捲到底嗎？」", a: "me" },
            { n: "我", t: "「在那之前我的手腕會先宣告投降的。」", a: "me" },
            { n: "賽爾", t: "那你就試試第二道招式：[[快速跳轉|gold]]吧！", a: "fairy" },
            { n: "賽爾", t: "按住 Ctrl 再加上方向鍵下 (↓) 試試看。", a: "fairy" }
        ],
        success_NAV_intro_SWAP: [
            { n: "賽爾", t: "咻地一聲，直達清單最底部！這就是魔法禁術帶來的極致速度。", a: "fairy" },
            { n: "我", t: "等等，賽爾，這份清單的最後一行居然寫著……", a: "me" },
            { n: "我", t: "『[[祕寶·世界樹之種|gold]]』，S 級神物，數量 1。這是什麼鬼東西？", a: "me" },
            { n: "我", t: "倉庫裡真的有這種東西存在嗎？", a: "me" },
            { n: "賽爾", t: "（它的笑容收斂了一瞬，眼神望向遠方的虛空，顯得有些深沉。）", a: "fairy" },
            { n: "賽爾", t: "「那一格數據你最好暫時當作沒看見。至少現在，還不是你該知道的時候。」", a: "fairy" },
            { n: "我", t: "「等等！！類別和等級這兩欄居然寫反了，這樣我到底該從哪裡看起才對？」", a: "me" },
            { n: "賽爾", t: "完全不必重打！現在施展第三道招式：[[欄位對調|gold]]。", a: "fairy" },
            { n: "賽爾", t: "按住 Shift 鍵，然後把 B 欄直接甩到 C 欄的右側去！", a: "fairy" }
        ],
        success_SWAP_intro_ADD: [
            { n: "賽爾", t: "兩塊空間，完美對調！這就是神不知鬼不覺的位移術，嘿嘿。", a: "fairy" },
            { n: "我", t: "「糟了，會長剛才說要藥水另列一張表，可是這張紙已經完全塞爆了啊。」", a: "me" },
            { n: "賽爾", t: "那就再開闢一個新的維度吧！第四道招式：[[新增工作表|gold]]。", a: "fairy" },
            { n: "賽爾", t: "去點擊底部的那個【+】號。", a: "fairy" }
        ],
        success_S_intro_FILL: [
            { n: "賽爾", t: "新分頁開闢完成！看，這是一整片乾淨且完美的空白。", a: "fairy" },
            { n: "我", t: "「但是編號欄現在又是一片空白，難道真的要我手動敲到一百號嗎？」", a: "me" },
            { n: "賽爾", t: "看好了，這是第五道招式：[[自動填滿|excel]]！", a: "fairy" },
            { n: "賽爾", t: "先選中兩格找出規律，然後抓著那個小綠點往下拖曳！", a: "fairy" }
        ],
        success_FILL_intro_DATE: [
            { n: "賽爾", t: "你看，數字自己跳著往下排，這種感覺是不是很療癒啊？", a: "fairy" },
            { n: "我", t: "「最後一步了，契約必須簽上今天的具體日期。今天到底是幾月幾號來著？」", a: "me" },
            { n: "賽爾", t: "這就是最後一招：[[插入日期|gold]]！", a: "fairy" },
            { n: "賽爾", t: "在 【🛡️ 裝備清單】的 E 欄按下 Ctrl + ; 就行了。", a: "fairy" }
        ],
        fail_FILL_single: [
            { n: "賽爾", t: "「哎呀！你只選了一個儲存格就急著往下拖，這僅僅只是『普通的複製術』而已喔。」", a: "fairy" },
            { n: "我", t: "「呃，搞砸了，所有的號碼怎麼全都變成一樣的了？」", a: "me" },
            { n: "賽爾", t: "「想要產生連續的序列，你必須先[[同時選取兩個儲存格|gold]]讓魔導書抓到變化的規律……」", a: "fairy" },
            { n: "賽爾", t: "「再點擊綠點往下拖！再來嘗試一次吧！」", a: "fairy" }
        ],
        success_DATE: [
            { n: "賽爾", t: "快速日期·完成！這六道倉庫招式你已經全掌握了——轉職大成功！", a: "fairy" }
        ],
        fail_DATE_wrong_col: [
            { n: "賽爾", t: "「等等！你在這欄蓋日期要做什麼？會長明明說要在 E 欄簽約……」", a: "fairy" },
            { n: "賽爾", t: "「你卻簽在別的地方，稽查員會以為你是在亂塗鴉的喔！」", a: "fairy" },
            { n: "我", t: "「呃，真尷尬，抱歉我剛才手滑了一下。」", a: "me" },
            { n: "賽爾", t: "「重新再來一次吧！先準確選中 [[E 欄|gold]] 的那個儲存格，然後再施展日期禁術！」", a: "fairy" }
        ],
        fail_DATE_wrong_sheet: [
            { n: "賽爾", t: "「哎呀！日期必須得簽在【🛡️ 裝備清單】這一頁的主契約上才算有效。」", a: "fairy" },
            { n: "賽爾", t: "「你如果簽在草料庫或者其他雜七雜八的地方，會長是絕對看不到的喔！」", a: "fairy" },
            { n: "我", t: "「原來如此，這份既然是正式文件，確實不能隨便簽在那些草稿紙上呢。」", a: "me" }
        ],
        fail_FREEZE_wrong: [
            { n: "賽爾", t: "「你想凍結哪裡？這裡的魔法流動顯得很不穩定。」", a: "fairy" },
            { n: "賽爾", t: "「目前我們先專心修煉最穩定的[[凍結頂端列|gold]]，這能確保標題永遠留在你的視野裡！」", a: "fairy" }
        ],
        mid_story: [
            { n: "賽爾", t: "少年你聽，接待大廳那邊是不是傳來了演奏樂器的聲音？", a: "fairy" },
            { n: "賽爾", t: "還有酒杯碰撞的清脆聲響？", a: "fairy" },
            { n: "我", t: "樂器？我現在滿腦子都塞滿了清單，哪來的閒情逸致去聽什麼音樂啊。", a: "me" },
            { n: "會長", t: "（大門外隱約傳來會長刻意壓低、卻顯得無比熱情開朗的笑聲） ", a: "head" },
            { n: "會長", t: "奧蘭多大人，這可是我們金穗鎮珍藏了整整三十年的頂級麥酒……", a: "head" },
            { n: "會長", t: "在王城那種地方可是絕對喝不到的寶貝！", a: "head" },
            { n: "會長", t: "稽查的名冊？哎呀，底下的人正在做最後的用印程序呢。", a: "head" },
            { n: "會長", t: "您先請，咱們再乾一杯，一會兒我親自陪您進倉庫視察。", a: "head" },
            { n: "我", t: " 咦？會長他，原來他的社交手腕竟然這麼厲害的嗎？", a: "me" },
            { n: "我", t: "完全看不出來。", a: "me" },
            { n: "賽爾", t: "少年，你還是太天真了點。這在人類的世界裡，就叫做人情世故。", a: "fairy" },
            { n: "賽爾", t: "那個老頭雖然開場時對你兇得要命，但他留在桌上的那個計時沙漏……", a: "fairy" },
            { n: "賽爾", t: "其實在他出門前的一瞬間，被他故意給橫著放倒了。", a: "fairy" },
            { n: "賽爾", t: "因為他心裡很清楚，要是這張清單交不出來，公會明年的撥款可就全都要打水漂了。", a: "fairy" },
            { n: "賽爾", t: "他現在可是正拿著自己的面子在外面拼命幫你偷時間呢。", a: "fairy" },
            { n: "賽爾", t: "你以為那杯酒，真的那麼好喝嗎？", a: "fairy" },
            { n: "我", t: "（我盯著桌上那個被橫放的沙漏，愣了一會兒。）", a: "me" },
            { n: "我", t: " 橫著放倒沙漏，原來還能這樣啊，他在幫我爭取時間。", a: "me" },
            { n: "我", t: "（用力揉了揉手腕） 既然會長在外面已經幫我把時間給卡住了……", a: "me" },
            { n: "我", t: "我也絕對不能在這裡掉鍊子。拼了！", a: "me" },
            { n: "賽爾", t: "（它滿意地在空中轉了一個圈，指引棒指向下一個儲存格。）", a: "fairy" },
            { n: "賽爾", t: " 很有幹勁嘛少年！既然如此，那就繼續戰鬥吧！", a: "fairy" }
        ]
    },

    initialGridData: generateCh1Data(),

    simulator: {
        mode: 'GUIDED',
        bgm: 'game_bgm.mp3',
        defaultTab: 'view', // 第一章預設開啟「檢視」分頁
        tasks: [
            { 
                id: "SCROLL", 
                tutorHint: "任務: 把表格往下[[捲動|gold]]看看。", 
                playerText: "「這份清單比惡魔領主的血條還要長。讓我深呼吸一下，先試著往下看看吧。」",
                expectedCondition: { type: 'SCROLL_CHECK', minScroll: 50 }, 
                storySegmentAfter: "discovery_F" 
            },
            { 
                id: "FREEZE", 
                tutorHint: "任務: 點工具列【檢視】→【凍結窗格】。", 
                playerText: "「如果標題能固定住就好了，我記得【檢視】工具列裡好像有什麼魔法可以達成這種效果？」",
                expectedCondition: { type: 'ACTION', actionId: 'FREEZE_PANES' },
                unlockSkillId: "F",
                storySegmentAfter: "success_F_intro_NAV", 
                unlockBtnId: "freezePanes",
                tab: "view" // 關聯至檢視分頁
            },
            { 
                id: "NAV", 
                tutorHint: "任務: 按住【 Ctrl 】+ 【 ↓ 】跳到最後一列。", 
                playerText: "「這表到底有多長？我可不想按一整天的向下鍵，既然賽爾說了，那就試試快捷鍵吧。」",
                expectedCondition: { type: 'ACTION', actionId: 'QUICK_JUMP' }, 
                unlockSkillId: "NAV",
                storySegmentAfter: "success_NAV_intro_SWAP"
            },
            { 
                id: "SWAP", 
                tutorHint: "任務: 按住【 Shift 】，把 B 欄拖到 C 欄右側。", 
                playerText: "「類別和等級寫反了，這樣去查帳絕對會被罵個半死的，得趕緊把它們的位置對調才行。」",
                expectedCondition: { type: 'ACTION', actionId: 'COLUMN_SWAP' }, 
                unlockSkillId: "SWAP",
                storySegmentAfter: "success_SWAP_intro_ADD" 
            },
            { 
                id: "ADD_SHEET", 
                tutorHint: "任務: 點底部的【+】，新增一張表。", 
                playerText: "「會長要求把藥水另外造冊，看來我得開拓一個全新的維度空間來專門處理它了。」",
                expectedCondition: { type: 'ACTION', actionId: 'ADD_SHEET' },
                unlockSkillId: "S",
                storySegmentAfter: "success_S_intro_FILL"
            },
            { 
                id: "AUTO_FILL", 
                tutorHint: "任務: 選取 A3 與 A4 兩格，抓綠點往下拖。", 
                playerText: "「接下來是編號，如果要我手動敲幾百行，我大概會因為過勞被抬出倉庫的，救命啊。」",
                expectedCondition: { type: 'ACTION', actionId: 'AUTO_FILL' }, 
                unlockSkillId: "FILL",
                storySegmentAfter: "success_FILL_intro_DATE" 
            },
            { 
                id: "INSERT_DATE", 
                tutorHint: "任務: 在 【🛡️ 裝備清單】 E 欄按【 Ctrl 】 +【 ; 】 蓋上日期。", 
                playerText: "「這已經是最後一步了，簽上今天的日期，這份艱鉅的工作就算完美結束啦！」",
                expectedCondition: { type: 'ACTION', actionId: 'INSERT_DATE' }, 
                unlockSkillId: "DATE",
                storySegmentAfter: "success_DATE" 
            }
        ]
    }
};
