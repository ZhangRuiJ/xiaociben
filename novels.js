function novelChapter(id, title, titleZh, pages, questions) {
  return { id, title, titleZh, pages, questions };
}

function page(lines) {
  return lines;
}

const NOVELS = [
  {
    id: "star-school",
    title: "The New Kid at Star School",
    titleZh: "星星学校的新生",
    author: "小词本原创",
    kind: "original",
    kindZh: "原创长篇",
    level: 2,
    summary: "Lina arrives at a night school among the stars, with only an ordinary pencil.",
    summaryZh: "莉娜带着一支普通铅笔，来到夜空里的星星学校。",
    tags: ["魔法", "学校", "猫头鹰", "友谊"],
    chapters: [
      novelChapter(
        "ss-1",
        "The Ordinary Pencil",
        "普通的铅笔",
        [
          page([
            { en: "Star School did not look like other schools. The windows glowed after sunset.", zh: "星星学校看起来不像别的学校。太阳下山后，窗户还会发光。" },
            { en: "Lina stood in the doorway with a suitcase and a very ordinary pencil.", zh: "莉娜站在门口，手里是行李箱，还有一支很普通的铅笔。" },
            { en: "A boy in a patched coat said, \"First-years sit by the owl cages.\"", zh: "一个穿着补丁外套的男孩说：“一年级坐在猫头鹰笼子旁边。”" },
          ]),
          page([
            { en: "The hall smelled like rain and warm bread.", zh: "大厅闻起来像雨，也像热面包。" },
            { en: "Owls turned their heads as Lina walked by.", zh: "莉娜走过时，猫头鹰都转过头来。" },
            { en: "She held the pencil tight. It was the only thing from home.", zh: "她把铅笔握得很紧。这是家里带来的唯一东西。" },
          ]),
          page([
            { en: "At dinner, her cup filled itself with apple water.", zh: "晚饭时，她的杯子自己满上了苹果水。" },
            { en: "\"The school likes you,\" whispered a girl named Kai.", zh: "一个叫凯的女孩低声说：“学校喜欢你。”" },
            { en: "Lina smiled, but her stomach felt full of butterflies.", zh: "莉娜笑了，可肚子里像有蝴蝶在飞。" },
          ]),
          page([
            { en: "That night the pencil left a tiny star of light on her desk.", zh: "那天夜里，铅笔在桌上留下一颗很小的光星星。" },
            { en: "Lina hid it under her pillow.", zh: "莉娜把它藏到枕头下面。" },
            { en: "\"I do not know magic yet,\" she said. \"But I can learn.\"", zh: "她说：“我还不会魔法。可是我能学。”" },
          ]),
        ],
        [
          { q: "Where did first-years sit?", options: ["By the owl cages", "On the roof", "In the kitchen"], answer: 0 },
          { q: "What did the pencil leave on the desk?", options: ["A button", "A tiny star of light", "A map"], answer: 1 },
        ],
      ),
      novelChapter(
        "ss-2",
        "The Owl Yard",
        "猫头鹰院子",
        [
          page([
            { en: "Morning bells sounded like wind chimes.", zh: "早晨的铃听起来像风铃。" },
            { en: "Kai pulled Lina to the owl yard before class.", zh: "上课前，凯把莉娜拉到猫头鹰院子。" },
            { en: "A gray owl landed on Lina's shoulder, as if it already knew her.", zh: "一只灰猫头鹰落到莉娜肩上，好像早就认识她。" },
          ]),
          page([
            { en: "\"That's Nib,\" Kai said. \"He picks people. He picked you.\"", zh: "凯说：“那是尼布。他会选人。他选了你。”" },
            { en: "Nib dropped a silver button into Lina's hand.", zh: "尼布把一颗银纽扣丢进莉娜手里。" },
            { en: "Every first-year wore one. It meant, \"You belong here today.\"", zh: "每个一年级都戴一颗。意思是：“今天你属于这里。”" },
          ]),
          page([
            { en: "A tall teacher clapped. \"Owls are friends, not toys.\"", zh: "一位高高的老师拍拍手：“猫头鹰是朋友，不是玩具。”" },
            { en: "Lina nodded. Nib blinked slowly, like a yes.", zh: "莉娜点头。尼布慢慢眨眼，像在说“对”。" },
            { en: "In the first class, they learned to say thank you in Owl.", zh: "第一节课，他们学着用猫头鹰的话谢谢。" },
          ]),
          page([
            { en: "Lina's thank you came out as a squeak. The class laughed kindly.", zh: "莉娜的“谢谢”变成一声尖叫。同学们温柔地笑了。" },
            { en: "Nib did not mind. He cleaned her hair with his beak.", zh: "尼布不在意。他用嘴整理她的头发。" },
            { en: "Lina thought, Maybe I can do this.", zh: "莉娜想：也许我可以做到。" },
          ]),
        ],
        [
          { q: "What did Nib give Lina?", options: ["A paper star", "A silver button", "A cup"], answer: 1 },
          { q: "What did the silver button mean?", options: ["You belong here today", "Go home now", "Keep quiet"], answer: 0 },
        ],
      ),
      novelChapter(
        "ss-3",
        "Paper Stars",
        "纸星星",
        [
          page([
            { en: "Flying class was not on brooms. Students rode paper stars.", zh: "飞行课不骑扫帚。学生们骑纸星星。" },
            { en: "The stars were as wide as doors and warm like sun on a roof.", zh: "那些星星有门那么宽，暖得像屋顶上的太阳。" },
            { en: "\"Hold the front. Lean where you want to go,\" said Teacher Reed.", zh: "里德老师说：“抓住前面。想去哪，就往哪边倾。”" },
          ]),
          page([
            { en: "Kai shot up like a spark. Lina's star sat still.", zh: "凯像火花一样冲上去。莉娜的星星一动不动。" },
            { en: "\"It will not move,\" Lina said.", zh: "莉娜说：“它不肯动。”" },
            { en: "\"Ask it,\" Reed said. \"Stars listen better than they push.\"", zh: "里德说：“求它。星星更会听，不会硬推。”" },
          ]),
          page([
            { en: "Lina whispered, \"Please. Just a little.\"", zh: "莉娜低声说：“拜托，只要一点点。”" },
            { en: "The star lifted. The ground became a map of roofs and yards.", zh: "星星升起来。地面变成屋顶和院子的地图。" },
            { en: "She did not go high. She did go.", zh: "她飞得不高。可她飞起来了。" },
          ]),
          page([
            { en: "After class her knees shook, but she grinned.", zh: "下课后她膝盖在抖，可她笑得很开。" },
            { en: "Kai squeezed her hand. \"First flights are the bravest ones.\"", zh: "凯捏了捏她的手：“第一次飞，才最勇敢。”" },
            { en: "Lina kept that warm feeling in her chest.", zh: "莉娜把那份暖意留在胸口。" },
          ]),
        ],
        [
          { q: "What did students ride in flying class?", options: ["Horses", "Paper stars", "Carpets"], answer: 1 },
          { q: "How did Lina make the star move?", options: ["She kicked it", "She asked it please", "She threw water"], answer: 1 },
        ],
      ),
      novelChapter(
        "ss-4",
        "Night Maps",
        "夜空地图",
        [
          page([
            { en: "Night Map class was in a dark room with a silver ceiling.", zh: "夜空地图课在一间黑屋子里，天花板是银色的。" },
            { en: "Dots of light made rivers, hills, and a path between stars.", zh: "光点连成河流、小山，还有星星之间的路。" },
            { en: "\"If you get lost, the map remembers your last safe step,\" said Head Mora.", zh: "莫拉校长说：“如果你迷路，地图会记得你上一步安全的地方。”" },
          ]),
          page([
            { en: "Lina could not read the dots. They jumped when she looked.", zh: "莉娜读不懂那些点。她一看，它们就跳。" },
            { en: "She copied Kai's paper and still got the path wrong.", zh: "她抄了凯的纸，路还是画错了。" },
            { en: "Mora did not scold her. \"Some eyes need time. Time is a kind of magic.\"", zh: "莫拉没有骂她：“有的眼睛需要时间。时间也是一种魔法。”" },
          ]),
          page([
            { en: "That night Lina dreamed of a clock under the school.", zh: "那天夜里，莉娜梦见学校下面有一座钟。" },
            { en: "In the dream, the clock ticked slower and slower.", zh: "梦里，钟走得越来越慢。" },
            { en: "She woke with the pencil glowing again.", zh: "她醒来时，铅笔又在发光。" },
          ]),
          page([
            { en: "She drew the dream clock in her notebook.", zh: "她把梦里的钟画在笔记本上。" },
            { en: "In the morning, the drawing had a tiny crack across it.", zh: "早上，那幅画上多了一道细细的裂缝。" },
            { en: "Lina did not know why that scared her.", zh: "莉娜不知道自己为什么害怕。" },
          ]),
        ],
        [
          { q: "What did Lina dream about?", options: ["A clock under the school", "A boat", "A picnic"], answer: 0 },
          { q: "What appeared on her drawing?", options: ["A bird", "A tiny crack", "A button"], answer: 1 },
        ],
      ),
      novelChapter(
        "ss-5",
        "Missing Buttons",
        "失踪的纽扣",
        [
          page([
            { en: "By Friday, three first-years had lost their silver buttons.", zh: "到了星期五，三个一年级丢了银纽扣。" },
            { en: "\"I put mine on the sink,\" said a boy. \"Then it was gone.\"", zh: "一个男孩说：“我放在洗手池上，后来就没了。”" },
            { en: "Kai checked her own button ten times a day.", zh: "凯一天要检查自己的纽扣十次。" },
          ]),
          page([
            { en: "Lina's button stayed, but Nib seemed worried. He paced the rail.", zh: "莉娜的纽扣还在，可尼布好像担心。它在栏杆上来回走。" },
            { en: "After lights-out, Lina heard a soft tick in the walls.", zh: "熄灯后，莉娜听见墙里有轻轻的滴答声。" },
            { en: "She and Kai followed it to the old tower door.", zh: "她和凯跟着声音，走到旧塔的门前。" },
          ]),
          page([
            { en: "The door was locked. A moth waited on the handle.", zh: "门锁着。一只飞蛾停在门把手上。" },
            { en: "\"You heard the clock,\" the moth said, in a voice like dry leaves.", zh: "飞蛾说：“你们听见钟了。”声音像干叶子。" },
            { en: "Lina almost dropped her pencil. Kai grabbed her sleeve.", zh: "莉娜差点丢掉铅笔。凯抓住她的袖子。" },
          ]),
          page([
            { en: "\"Clocks do not talk. Moths do not either,\" Kai whispered.", zh: "凯低声说：“钟不会说话。飞蛾也不会。”" },
            { en: "\"This one does,\" said the moth. \"My name is Pip. The school is getting sleepy.\"", zh: "飞蛾说：“这一只会。我叫皮普。学校正在发困。”" },
            { en: "Pip's wings showed a faint map of stairs.", zh: "皮普的翅膀上，隐约有一张楼梯地图。" },
          ]),
        ],
        [
          { q: "What was going missing?", options: ["Hats", "Silver buttons", "Books"], answer: 1 },
          { q: "Who spoke at the tower door?", options: ["A moth named Pip", "Head Mora", "Teacher Reed"], answer: 0 },
        ],
      ),
      novelChapter(
        "ss-6",
        "The Talking Moth",
        "会说话的飞蛾",
        [
          page([
            { en: "Pip led them through a back stair that smelled of soap.", zh: "皮普带他们走后面的楼梯，那里有肥皂味。" },
            { en: "\"Head Mora hid a clock that keeps Star School in the night sky,\" Pip said.", zh: "皮普说：“莫拉校长藏了一座钟，让星星学校留在夜空里。”" },
            { en: "\"If it stops, the windows go dark. The owls cannot find home.\"", zh: "“如果它停了，窗户会变黑。猫头鹰就找不到家。”" },
          ]),
          page([
            { en: "Lina thought of Nib. Her throat felt tight.", zh: "莉娜想起尼布。喉咙发紧。" },
            { en: "\"Who is taking the buttons?\" Kai asked.", zh: "凯问：“谁在拿走纽扣？”" },
            { en: "\"The night keeper collects small bright things,\" Pip said. \"He is lonely, not cruel.\"", zh: "皮普说：“守夜人收集亮晶晶的小东西。他孤单，并不残忍。”" },
          ]),
          page([
            { en: "They found a room of jars: buttons, bells, a marble, a red thread.", zh: "他们找到一间放满罐子的屋子：纽扣、铃铛、一颗弹珠、一根红线。" },
            { en: "A man in gray sat among them. His eyes were kind and tired.", zh: "一个穿灰衣服的人坐在中间。眼睛温和，也很累。" },
            { en: "\"I am Nox,\" he said. \"The clock used to sing. Now it only ticks.\"", zh: "他说：“我是诺克斯。钟以前会唱歌。现在只会滴答。”" },
          ]),
          page([
            { en: "He held up a jar of silver buttons. \"I borrowed these. They shine like the old song.\"", zh: "他举起一罐银纽扣：“我借来的。它们亮得像以前的歌。”" },
            { en: "Lina stepped closer. \"We need them back. And we need the clock.\"", zh: "莉娜走近一步：“我们要它们回去。我们也需要那座钟。”" },
            { en: "Nox looked at her ordinary pencil. \"That might be the last key.\"", zh: "诺克斯看着她那支普通铅笔：“那也许是最后一把钥匙。”" },
          ]),
        ],
        [
          { q: "Why did Nox take the buttons?", options: ["He was lonely and they shone", "He wanted to sell them", "Head Mora told him to"], answer: 0 },
          { q: "What did Nox call Lina's pencil?", options: ["A toy", "The last key", "A broom"], answer: 1 },
        ],
      ),
      novelChapter(
        "ss-7",
        "The Sleeping Clock",
        "睡着的钟",
        [
          page([
            { en: "Nox took them under the tower, down stone steps.", zh: "诺克斯带他们走到塔下，沿着石阶下去。" },
            { en: "The clock was as tall as three doors. Its face had moons, not numbers.", zh: "那座钟有三扇门那么高。盘面上是月亮，不是数字。" },
            { en: "One moon was cracked. The hands had almost stopped.", zh: "有一轮月亮裂了。指针几乎停住。" },
          ]),
          page([
            { en: "\"I tried to wind it,\" Nox said. \"My hands are only hands.\"", zh: "诺克斯说：“我试过上发条。可我的手只是手。”" },
            { en: "Lina touched the crack with the pencil.", zh: "莉娜用铅笔点了点那道裂缝。" },
            { en: "Starlight ran along the wood like quiet water.", zh: "星光顺着木头流过去，像安静的水。" },
          ]),
          page([
            { en: "\"It needs more than light,\" Pip said. \"It needs a promise from a new kid.\"", zh: "皮普说：“它需要的不只是光。它需要一个新生的承诺。”" },
            { en: "Lina swallowed. \"I promise to learn, even when the maps jump.\"", zh: "莉娜咽了咽：“我保证要学，就算地图会跳。”" },
            { en: "Kai put her button on the ledge. \"I promise to stay with her.\"", zh: "凯把纽扣放在台沿上：“我保证陪着她。”" },
          ]),
          page([
            { en: "Nox set the other buttons down, too. \"I promise not to hide the shine.\"", zh: "诺克斯也放下其余纽扣：“我保证不再藏起光亮。”" },
            { en: "The hands moved. The cracked moon closed with a thin gold line.", zh: "指针动了。裂开的月亮合上，留下一条细细的金线。" },
            { en: "Far above, an owl called, bright and sure.", zh: "高处，一只猫头鹰叫了，声音明亮、肯定。" },
          ]),
        ],
        [
          { q: "What did the clock need besides light?", options: ["A promise from a new kid", "A loud song", "More water"], answer: 0 },
          { q: "What happened to the cracked moon?", options: ["It fell off", "It closed with a gold line", "It turned into a bird"], answer: 1 },
        ],
      ),
      novelChapter(
        "ss-8",
        "Lina Belongs",
        "莉娜属于这里",
        [
          page([
            { en: "In the morning, the windows glowed like a fresh page.", zh: "早上，窗户亮得像一张新纸。" },
            { en: "First-years found their buttons on their pillows, polished.", zh: "一年级在枕头上找到纽扣，擦得很亮。" },
            { en: "Head Mora waited in the hall. She already knew.", zh: "莫拉校长在大厅等着。她已经知道了。" },
          ]),
          page([
            { en: "\"Star School stays up because people take care of it,\" she said.", zh: "她说：“星星学校还能亮着，是因为有人在照顾它。”" },
            { en: "She looked at Lina. \"A key can be small. A promise can be large.\"", zh: "她看着莉娜：“钥匙可以很小。承诺可以很大。”" },
            { en: "Lina's pencil still looked ordinary. That felt right.", zh: "莉娜的铅笔看起来还是普通。这样刚刚好。" },
          ]),
          page([
            { en: "In flying class, her paper star rose on the first ask.", zh: "飞行课上，她的纸星星第一次请求就升起来。" },
            { en: "In Night Map class, the dots held still long enough to read.", zh: "夜空地图课上，光点能停住，让她读完。" },
            { en: "Nib brought her a twig, as if to say, You did well.", zh: "尼布衔来一根小枝，好像在说：你做得很好。" },
          ]),
          page([
            { en: "Kai bumped her shoulder. \"Not a new kid now. Just a kid.\"", zh: "凯碰了碰她的肩：“现在不是新生了。只是一个孩子。”" },
            { en: "Lina laughed. The sound filled the owl yard.", zh: "莉娜笑了。笑声装满猫头鹰院子。" },
            { en: "She put the pencil in her pocket, ready for the next hard day.", zh: "她把铅笔放进口袋，准备好迎接下一个难的日子。" },
          ]),
        ],
        [
          { q: "Why does Star School stay up, according to Mora?", options: ["Because people take care of it", "Because of a balloon", "Because of rain"], answer: 0 },
          { q: "What did Kai call Lina at the end?", options: ["A teacher", "Just a kid", "A witch"], answer: 1 },
        ],
      ),
    ],
  },
  {
    id: "oz",
    title: "The Wonderful Wizard of Oz",
    titleZh: "绿野仙踪",
    author: "L. Frank Baum",
    kind: "classic",
    kindZh: "公版经典 · 三年级改写",
    level: 2,
    summary: "Dorothy is carried to Oz and walks the yellow brick road to find a way home.",
    summaryZh: "多萝西被卷到奥兹，沿着黄砖路走，想找到回家的办法。",
    tags: ["冒险", "友谊", "回家", "奥兹"],
    chapters: [
      novelChapter(
        "oz-1",
        "The Gray Prairie",
        "灰色的草原",
        [
          page([
            { en: "Dorothy lived with Uncle Henry and Aunt Em in Kansas.", zh: "多萝西和亨利叔叔、艾姆婶婶住在堪萨斯。" },
            { en: "The house was small. The land was flat and gray.", zh: "房子很小。土地又平又灰。" },
            { en: "Even the grass looked tired.", zh: "连草看起来都累了。" },
          ]),
          page([
            { en: "Dorothy's dog, Toto, was not gray. He was lively and full of play.", zh: "多萝西的狗托托不是灰色的。他很活，很爱玩。" },
            { en: "Aunt Em worked hard and did not laugh often.", zh: "艾姆婶婶很辛苦，很少笑。" },
            { en: "Uncle Henry looked at the sky more than he looked at jokes.", zh: "亨利叔叔看天，比看笑话还多。" },
          ]),
          page([
            { en: "Dorothy loved them. She also wanted a little color.", zh: "多萝西爱他们。她也想要一点点颜色。" },
            { en: "Toto chased his tail and made her smile.", zh: "托托追自己的尾巴，逗她笑。" },
            { en: "One afternoon the air grew still and strange.", zh: "一天下午，空气变得又静又奇怪。" },
          ]),
          page([
            { en: "Uncle Henry shouted, \"Cyclone! Get to the cellar!\"", zh: "亨利叔叔喊：“旋风！快去地窖！”" },
            { en: "Aunt Em ran. Dorothy ran for Toto.", zh: "艾姆婶婶跑了。多萝西跑去找托托。" },
            { en: "Toto hid under the bed.", zh: "托托藏到床底下。" },
          ]),
        ],
        [
          { q: "Where did Dorothy live?", options: ["Kansas", "The Emerald City", "England"], answer: 0 },
          { q: "What did Uncle Henry shout about?", options: ["Rain", "A cyclone", "A picnic"], answer: 1 },
        ],
      ),
      novelChapter(
        "oz-2",
        "The Cyclone",
        "旋风",
        [
          page([
            { en: "Dorothy grabbed Toto. The house began to shake.", zh: "多萝西抓住托托。房子开始摇。" },
            { en: "She could not reach the cellar door in time.", zh: "她来不及跑到地窖门口。" },
            { en: "The house rose up, as if the wind had hands.", zh: "房子升起来，好像风长了手。" },
          ]),
          page([
            { en: "They sat on the floor. Toto barked. Dorothy held him close.", zh: "他们坐在地板上。托托叫。多萝西把他抱紧。" },
            { en: "For a long time there was only the roar of the wind.", zh: "很长一段时间，只有风的吼声。" },
            { en: "Dorothy grew tired and fell asleep.", zh: "多萝西累了，睡着了。" },
          ]),
          page([
            { en: "When she woke, the house was still.", zh: "她醒来时，房子不动了。" },
            { en: "Sunlight came through the window, bright and green.", zh: "阳光从窗户进来，又亮又绿。" },
            { en: "She opened the door and gasped.", zh: "她打开门，倒吸一口气。" },
          ]),
          page([
            { en: "Flowers stood tall. Birds sang. The sky looked new.", zh: "花儿站得很高。鸟在唱。天看起来是新的。" },
            { en: "The house had landed in a strange, beautiful country.", zh: "房子落在一个奇怪又美丽的国家。" },
            { en: "Under the house, two feet in silver shoes stuck out. Dorothy felt afraid.", zh: "房子底下伸出两只穿着银鞋的脚。多萝西害怕了。" },
          ]),
        ],
        [
          { q: "What happened to the house?", options: ["It sank in a river", "The wind lifted it", "It burned"], answer: 1 },
          { q: "What stuck out under the house?", options: ["A wagon", "Two feet in silver shoes", "A lion"], answer: 1 },
        ],
      ),
      novelChapter(
        "oz-3",
        "Munchkin Country",
        "芒奇金乡",
        [
          page([
            { en: "A little woman in a white hat walked up with kind eyes.", zh: "一个戴白帽子的小妇人走过来，眼睛很温和。" },
            { en: "Short people in blue clothes cheered around her.", zh: "穿蓝衣服的矮个子人们围着她欢呼。" },
            { en: "\"You have freed us,\" the woman said. \"I am the Witch of the North.\"", zh: "妇人说：“你救了我们。我是北方女巫。”" },
          ]),
          page([
            { en: "\"I am not a witch,\" Dorothy said. \"I am a girl from Kansas.\"", zh: "多萝西说：“我不是女巫。我是堪萨斯来的女孩。”" },
            { en: "\"The Wicked Witch of the East is under your house,\" said the Witch of the North.", zh: "北方女巫说：“东方恶女巫在你的房子下面。”" },
            { en: "\"She was cruel to the Munchkins. They are free now.\"", zh: "“她对芒奇金人很残酷。他们现在自由了。”" },
          ]),
          page([
            { en: "The silver shoes were empty now. The good witch set them on Dorothy's feet.", zh: "银鞋现在空了。好心的女巫把它们穿到多萝西脚上。" },
            { en: "\"These shoes are yours. They have power. I do not know all of it.\"", zh: "“这双鞋是你的。它们有力量。我也不全知道。”" },
            { en: "Dorothy asked, \"How do I get home to Aunt Em and Uncle Henry?\"", zh: "多萝西问：“我怎么回家找艾姆婶婶和亨利叔叔？”" },
          ]),
          page([
            { en: "\"The Wizard of Oz lives in the Emerald City. He may help you.\"", zh: "“奥兹巫师住在绿宝石城。他也许能帮你。”" },
            { en: "\"Follow the yellow brick road,\" said the witch. \"And do not be afraid.\"", zh: "女巫说：“沿着黄砖路走。不要怕。”" },
            { en: "She kissed Dorothy's forehead. The kiss shone like a small round mark.", zh: "她亲了多萝西的额头。那个吻亮得像一个小圆印。" },
          ]),
        ],
        [
          { q: "Who was under Dorothy's house?", options: ["The Wizard", "The Wicked Witch of the East", "Aunt Em"], answer: 1 },
          { q: "Where should Dorothy go for help?", options: ["The Emerald City", "The cellar", "The river"], answer: 0 },
        ],
      ),
      novelChapter(
        "oz-4",
        "The Scarecrow",
        "稻草人",
        [
          page([
            { en: "Dorothy and Toto walked along the yellow bricks.", zh: "多萝西和托托沿着黄砖走。" },
            { en: "The fields were bright. The road was easy to see.", zh: "田野很亮。路很好认。" },
            { en: "At a corner of the cornfield stood a scarecrow on a pole.", zh: "玉米地的角落，杆子上站着一个稻草人。" },
          ]),
          page([
            { en: "His head was a sack. His smile was painted on.", zh: "他的头是一只袋子。笑容是画上去的。" },
            { en: "\"Good day,\" said the Scarecrow.", zh: "稻草人说：“你好。”" },
            { en: "Dorothy jumped. \"You can talk!\"", zh: "多萝西跳起来：“你会说话！”" },
          ]),
          page([
            { en: "\"I can. But I cannot get down. And I have no brains.\"", zh: "“我会。可我下不来。而且我没有脑子。”" },
            { en: "Dorothy helped him off the pole. He bowed, a little wobbly.", zh: "多萝西帮他下来。他鞠了一躬，有点晃。" },
            { en: "\"I am going to Oz to ask for a way home,\" she said.", zh: "她说：“我要去奥兹，求一条回家的路。”" },
          ]),
          page([
            { en: "\"May I come? I will ask the Wizard for brains,\" said the Scarecrow.", zh: "稻草人说：“我能去吗？我要向巫师要脑子。”" },
            { en: "Toto sniffed him and decided he was a friend.", zh: "托托闻了闻他，决定他是朋友。" },
            { en: "They walked on together, talking about farms and sky.", zh: "他们一起走，聊着农场和天空。" },
          ]),
        ],
        [
          { q: "What did the Scarecrow want?", options: ["A heart", "Brains", "A balloon"], answer: 1 },
          { q: "Where did Dorothy find him?", options: ["In a cornfield", "In a castle", "In a river"], answer: 0 },
        ],
      ),
      novelChapter(
        "oz-5",
        "The Tin Woodman",
        "铁皮樵夫",
        [
          page([
            { en: "They heard a groan in the woods.", zh: "他们在树林里听见一声呻吟。" },
            { en: "A man made of tin stood still, with an ax in his hands.", zh: "一个铁皮人站着不动，手里拿着斧子。" },
            { en: "His joints were rusty. He could not move.", zh: "他的关节生锈了。他动不了。" },
          ]),
          page([
            { en: "Dorothy found an oil can and oiled his neck, arms, and legs.", zh: "多萝西找到油壶，给他的脖子、胳膊和腿上油。" },
            { en: "\"Thank you,\" he said. \"I was a woodman once. A wicked spell made me tin.\"", zh: "他说：“谢谢。我曾经是樵夫。一个恶毒的咒语把我变成铁皮。”" },
            { en: "\"I have no heart. I cannot feel love the way I did.\"", zh: "“我没有心。我不能再像从前那样感受爱。”" },
          ]),
          page([
            { en: "Dorothy told him about Oz.", zh: "多萝西把奥兹的事告诉他。" },
            { en: "\"I will come,\" said the Tin Woodman. \"I will ask for a heart.\"", zh: "铁皮樵夫说：“我要去。我要去要一颗心。”" },
            { en: "The Scarecrow liked him at once. They shared the road.", zh: "稻草人立刻喜欢他。他们一起走路。" },
          ]),
          page([
            { en: "That night they slept under trees. Toto kept watch.", zh: "那天夜里他们睡在树下。托托守着。" },
            { en: "Dorothy thought of Kansas and the gray house.", zh: "多萝西想起堪萨斯和那座灰房子。" },
            { en: "The silver shoes were quiet on her feet.", zh: "银鞋安安静静地穿在她脚上。" },
          ]),
        ],
        [
          { q: "Why couldn't the Tin Woodman move?", options: ["He was sleepy", "His joints were rusty", "He was lost"], answer: 1 },
          { q: "What did he want from the Wizard?", options: ["A heart", "Brains", "Wings"], answer: 0 },
        ],
      ),
      novelChapter(
        "oz-6",
        "The Cowardly Lion",
        "胆小的狮子",
        [
          page([
            { en: "A lion jumped onto the road and roared.", zh: "一头狮子跳到路上吼起来。" },
            { en: "Toto barked. The Lion opened his mouth.", zh: "托托叫。狮子张开嘴。" },
            { en: "Dorothy slapped his nose. \"Do not bite a little dog!\"", zh: "多萝西打他的鼻子：“不许咬小狗！”" },
          ]),
          page([
            { en: "The Lion sat down and wiped his eyes. \"I am sorry. I am a coward.\"", zh: "狮子坐下擦眼睛：“对不起。我是个胆小鬼。”" },
            { en: "\"You are a lion,\" said the Scarecrow. \"Lions are brave.\"", zh: "稻草人说：“你是狮子。狮子应该勇敢。”" },
            { en: "\"I should be. I am not. I shake when I must fight.\"", zh: "“我应该勇敢。可我不是。要打架时我会发抖。”" },
          ]),
          page([
            { en: "Dorothy felt sorry for him. \"Come with us. Ask Oz for courage.\"", zh: "多萝西替他难过：“跟我们走。向奥兹要勇气。”" },
            { en: "The Lion walked beside them, trying to look tall.", zh: "狮子走在旁边，想让自己看起来很高。" },
            { en: "Now they were four friends and one small dog.", zh: "现在他们是四个朋友，外加一只小狗。" },
          ]),
          page([
            { en: "They told stories to keep the dark woods from feeling too big.", zh: "他们讲故事，好让黑暗的树林不显得太大。" },
            { en: "The Lion still jumped at small sounds, then laughed at himself.", zh: "狮子还是会被小声音吓跳，然后自己笑自己。" },
            { en: "Dorothy said, \"Wanting to be brave is already a start.\"", zh: "多萝西说：“想变得勇敢，已经是开始了。”" },
          ]),
        ],
        [
          { q: "What did the Lion say he was?", options: ["A king", "A coward", "A wizard"], answer: 1 },
          { q: "What did Dorothy tell him to ask for?", options: ["Courage", "Silver shoes", "Oil"], answer: 0 },
        ],
      ),
      novelChapter(
        "oz-7",
        "The Emerald City",
        "绿宝石城",
        [
          page([
            { en: "The yellow road led to a high green wall and a gate.", zh: "黄砖路通向一堵高高的绿墙和一扇门。" },
            { en: "A guard in green glasses let them in.", zh: "一个戴绿眼镜的卫兵让他们进去。" },
            { en: "The city shone so bright that the glasses kept their eyes safe.", zh: "城市亮得刺眼，眼镜保护他们的眼睛。" },
          ]),
          page([
            { en: "Streets were green. Houses were green. Even the sunlight looked green.", zh: "街道是绿的。房子是绿的。连阳光看起来也是绿的。" },
            { en: "They waited days to see the Wizard.", zh: "他们等了好几天，才见到巫师。" },
            { en: "Each one met him in a different shape: a giant head, a lady, a beast, a ball of fire.", zh: "每个人见到的他都不一样：巨大的头、一位女士、一头野兽、一团火球。" },
          ]),
          page([
            { en: "The Wizard's voice was loud. \"I will help you. First, destroy the Wicked Witch of the West.\"", zh: "巫师的声音很大：“我会帮你们。先除掉西方恶女巫。”" },
            { en: "Dorothy felt cold. \"I do not want to kill anyone.\"", zh: "多萝西发冷：“我不想杀死任何人。”" },
            { en: "\"Then I will not help you,\" said the voice.", zh: "那个声音说：“那我就不帮你们。”" },
          ]),
          page([
            { en: "They left the hall with heavy hearts.", zh: "他们心情沉重地离开大厅。" },
            { en: "The Lion whispered, \"We can try. We can be careful.\"", zh: "狮子低声说：“我们可以试试。我们可以小心。”" },
            { en: "Dorothy looked at her friends. She did not want to lose her chance to go home.", zh: "多萝西看着朋友们。她不想失去回家的机会。" },
          ]),
        ],
        [
          { q: "What color was the city?", options: ["Blue", "Green", "Gray"], answer: 1 },
          { q: "What did the Wizard tell them to do first?", options: ["Plant roses", "Destroy the Wicked Witch of the West", "Build a house"], answer: 1 },
        ],
      ),
      novelChapter(
        "oz-8",
        "The Witch of the West",
        "西方女巫",
        [
          page([
            { en: "The Wicked Witch of the West saw them coming.", zh: "西方恶女巫看见他们来了。" },
            { en: "She sent wolves. The Tin Woodman stopped them with his ax.", zh: "她派出狼。铁皮樵夫用斧子挡住它们。" },
            { en: "She sent crows. The Scarecrow scared them away.", zh: "她派出乌鸦。稻草人把它们吓走。" },
          ]),
          page([
            { en: "She sent bees. The Tin Woodman kept the others safe.", zh: "她派出蜜蜂。铁皮樵夫护住同伴。" },
            { en: "At last she used the Golden Cap to call the winged monkeys.", zh: "最后她用金帽子召来飞猴。" },
            { en: "The monkeys carried Dorothy and Toto to the Witch's castle.", zh: "飞猴把多萝西和托托带到女巫的城堡。" },
          ]),
          page([
            { en: "They dropped the Scarecrow and the Tin Woodman far away. The Lion was caged.", zh: "他们把稻草人和铁皮樵夫丢到远处。狮子被关进笼子。" },
            { en: "The Witch saw the silver shoes and wanted them.", zh: "女巫看见银鞋，想要占为己有。" },
            { en: "She tripped Dorothy. One shoe came off.", zh: "她绊倒多萝西。一只鞋掉了。" },
          ]),
          page([
            { en: "Dorothy grew angry. She threw a bucket of water.", zh: "多萝西生气了。她泼出一桶水。" },
            { en: "The Witch screamed. Water was her end. She melted away.", zh: "女巫尖叫。水就是她的终点。她化掉了。" },
            { en: "Dorothy was shocked. She had only wanted her shoe back.", zh: "多萝西吓住了。她本来只想拿回自己的鞋。" },
          ]),
        ],
        [
          { q: "What melted the Wicked Witch?", options: ["Fire", "Water", "Wind"], answer: 1 },
          { q: "Why did Dorothy throw the water?", options: ["The Witch took her shoe", "She was washing the floor", "The Lion asked her to"], answer: 0 },
        ],
      ),
      novelChapter(
        "oz-9",
        "The Wizard's Secret",
        "巫师的秘密",
        [
          page([
            { en: "The winged monkeys, now free, helped the friends meet again.", zh: "飞猴现在自由了，帮助朋友们重聚。" },
            { en: "They returned to the Emerald City with the news.", zh: "他们带着消息回到绿宝石城。" },
            { en: "The Wizard would not see them. Toto ran at a screen.", zh: "巫师不见他们。托托朝一块屏风冲过去。" },
          ]),
          page([
            { en: "The screen fell. A little old man stood there, afraid.", zh: "屏风倒了。一个小老头站在那里，很害怕。" },
            { en: "\"I am a balloon man from Omaha,\" he said. \"I am not a great wizard.\"", zh: "他说：“我是奥马哈来的气球人。我不是伟大的巫师。”" },
            { en: "\"I used tricks. People believed me. I was stuck here after my balloon came down.\"", zh: "“我用了把戏。人们相信我。气球落后，我就被困在这里。”" },
          ]),
          page([
            { en: "The friends were angry, then sad, then curious.", zh: "朋友们先生气，再难过，然后好奇。" },
            { en: "\"You still need brains, a heart, and courage,\" Dorothy said.", zh: "多萝西说：“你们还是需要脑子、心和勇气。”" },
            { en: "The man gave the Scarecrow a mix of bran and pins. \"This is bran-new brains.\"", zh: "他给稻草人一包麸皮和别针：“这是崭新的脑子。”" },
          ]),
          page([
            { en: "He gave the Tin Woodman a silk heart stuffed with sawdust.", zh: "他给铁皮樵夫一颗装满锯末的丝绸心。" },
            { en: "He gave the Lion a drink. \"This is courage.\"", zh: "他给狮子一杯喝的：“这是勇气。”" },
            { en: "They felt better, because they had already been smart, kind, and brave on the road.", zh: "他们感觉好多了，因为路上他们已经又聪明、又善良、又勇敢。" },
          ]),
        ],
        [
          { q: "What was the Wizard really?", options: ["A giant head", "A balloon man from Omaha", "A lion"], answer: 1 },
          { q: "Why did the gifts work, in a way?", options: ["The friends had already shown those things", "The shoes sang", "The bees came back"], answer: 0 },
        ],
      ),
      novelChapter(
        "oz-10",
        "Home Again",
        "又回家了",
        [
          page([
            { en: "The Wizard said he would take Dorothy home in a balloon.", zh: "巫师说要用气球带多萝西回家。" },
            { en: "Toto jumped away at the last moment. Dorothy ran after him.", zh: "最后一刻托托跳开。多萝西追过去。" },
            { en: "The balloon rose without her. The Wizard drifted into the sky.", zh: "气球没有等她就升起来。巫师飘向天空。" },
          ]),
          page([
            { en: "Dorothy cried. A soldier told her to ask Glinda, the Good Witch of the South.", zh: "多萝西哭了。一个士兵让她去找南方的好女巫格林达。" },
            { en: "They traveled to Glinda. The Lion, Scarecrow, and Tin Woodman kept her safe.", zh: "他们去找格林达。狮子、稻草人和铁皮樵夫保护她。" },
            { en: "Glinda smiled. \"Your silver shoes can take you home. You had the power all along.\"", zh: "格林达笑了：“你的银鞋能带你回家。力量一直都在你身上。”" },
          ]),
          page([
            { en: "\"Why didn't anyone tell me?\" Dorothy asked.", zh: "多萝西问：“为什么没有人告诉我？”" },
            { en: "\"You would not have believed it,\" Glinda said. \"You needed the journey.\"", zh: "格林达说：“你那时不会相信。你需要这一路。”" },
            { en: "Dorothy kissed her friends. She said goodbye to Oz.", zh: "多萝西亲了亲朋友们。她跟奥兹说再见。" },
          ]),
          page([
            { en: "She clicked the heels of the silver shoes three times. \"Take me home to Aunt Em.\"", zh: "她把银鞋后跟碰了三下：“带我回家，回到艾姆婶婶那里。”" },
            { en: "The wind whirled. She landed in Kansas, in a new house Uncle Henry had built.", zh: "风转起来。她落在堪萨斯，亨利叔叔盖的新房子里。" },
            { en: "Aunt Em held her. Toto barked. The prairie was still gray, but it was home.", zh: "艾姆婶婶抱住她。托托叫。草原还是灰的，可那是家。" },
          ]),
        ],
        [
          { q: "What could take Dorothy home?", options: ["The silver shoes", "The oil can", "Green glasses"], answer: 0 },
          { q: "Where did Dorothy land at the end?", options: ["The Witch's castle", "Kansas", "The tea table"], answer: 1 },
        ],
      ),
    ],
  },
  {
    id: "alice",
    title: "Alice's Adventures in Wonderland",
    titleZh: "爱丽丝漫游奇境",
    author: "Lewis Carroll",
    kind: "classic",
    kindZh: "公版经典 · 三年级改写",
    level: 2,
    summary: "Alice follows a White Rabbit down a hole and finds a land of riddles.",
    summaryZh: "爱丽丝跟着白兔掉进洞里，来到一个充满谜语的世界。",
    tags: ["奇境", "兔子", "谜语", "梦"],
    chapters: [
      novelChapter(
        "al-1",
        "Down the Hole",
        "掉进洞里",
        [
          page([
            { en: "Alice sat by her sister on the bank and felt bored.", zh: "爱丽丝坐在岸边姐姐旁边，觉得很无聊。" },
            { en: "A White Rabbit ran by, looking at a watch. \"I am late!\"", zh: "一只白兔跑过，看着表：“我迟到了！”" },
            { en: "Alice had never seen a rabbit with a watch.", zh: "爱丽丝从没见过带着表的兔子。" },
          ]),
          page([
            { en: "She ran after him and fell down a long hole.", zh: "她追过去，掉进一个很长的洞。" },
            { en: "She fell slowly, past cupboards and maps and jars.", zh: "她掉得很慢，经过碗柜、地图和罐子。" },
            { en: "\"I wonder how many miles I have fallen,\" she said.", zh: "她说：“我在想，我掉了多少英里。”" },
          ]),
          page([
            { en: "At last she landed on a pile of leaves, not hurt.", zh: "最后她落在一堆叶子上，没有受伤。" },
            { en: "The White Rabbit hurried down a hall.", zh: "白兔急急忙忙走过一条大厅。" },
            { en: "Alice followed, just in time to see him go.", zh: "爱丽丝跟着，刚好看见他走开。" },
          ]),
          page([
            { en: "She found a little door and a little key.", zh: "她发现一扇小门和一把小钥匙。" },
            { en: "Through the door she saw a lovely garden.", zh: "透过门，她看见一座可爱的花园。" },
            { en: "She was too big to go through.", zh: "她太大了，钻不过去。" },
          ]),
        ],
        [
          { q: "What was the White Rabbit looking at?", options: ["A cake", "A watch", "A shoe"], answer: 1 },
          { q: "Why couldn't Alice enter the garden at first?", options: ["She was too big", "It was night", "The Queen said no"], answer: 0 },
        ],
      ),
      novelChapter(
        "al-2",
        "Drink Me, Eat Me",
        "喝我，吃我",
        [
          page([
            { en: "A bottle said, \"DRINK ME.\"", zh: "一个瓶子写着：“喝我。”" },
            { en: "Alice tasted it. It was good, like pie and toast and candy.", zh: "爱丽丝尝了尝。味道很好，像馅饼、烤面包和糖。" },
            { en: "She shrank until she was the size of a doll.", zh: "她缩小到玩偶那么大。" },
          ]),
          page([
            { en: "Now she was small enough, but she had left the key on the table.", zh: "现在她够小了，可钥匙还留在桌上。" },
            { en: "A cake said, \"EAT ME.\"", zh: "一块蛋糕写着：“吃我。”" },
            { en: "She ate it and grew very tall. Her head hit the ceiling.", zh: "她吃了，变得非常高。头碰到天花板。" },
          ]),
          page([
            { en: "Alice cried. Her tears made a pool on the floor.", zh: "爱丽丝哭了。眼泪在地板上积成水池。" },
            { en: "She found the bottle again, shrank, and fell into her own tears.", zh: "她又找到瓶子，缩小，掉进自己的眼泪里。" },
            { en: "\"I shall be drowned in my own tears,\" she said.", zh: "她说：“我要淹死在自己的眼泪里了。”" },
          ]),
          page([
            { en: "A Mouse swam by, wet and angry.", zh: "一只老鼠游过来，又湿又生气。" },
            { en: "Alice tried to talk to him about cats. The Mouse did not like that.", zh: "爱丽丝跟他聊猫。老鼠不喜欢这个话题。" },
            { en: "They swam to a bank with other wet animals.", zh: "他们游到岸边，那里还有别的湿漉漉的动物。" },
          ]),
        ],
        [
          { q: "What happened when Alice drank from the bottle?", options: ["She shrank", "She grew wings", "She woke up"], answer: 0 },
          { q: "Why was the Mouse angry?", options: ["Alice talked about cats", "Alice took his watch", "Alice painted roses"], answer: 0 },
        ],
      ),
      novelChapter(
        "al-3",
        "The Race and the Rabbit",
        "赛跑和兔子",
        [
          page([
            { en: "A Dodo said they needed a race to get dry.", zh: "渡渡鸟说，要弄干身体，得赛跑。" },
            { en: "Everyone ran in circles until they were dry. That was the race.", zh: "大家转着圈跑，直到干了。这就是比赛。" },
            { en: "The Dodo said everyone had won. Alice had to give out prizes.", zh: "渡渡鸟说每个人都赢了。爱丽丝得发奖。" },
          ]),
          page([
            { en: "She gave the animals bits of candy from her pocket.", zh: "她把口袋里的糖分给动物们。" },
            { en: "She gave the Mouse a thimble. He looked grave and proud.", zh: "她给老鼠一个顶针。他看起来又严肃又骄傲。" },
            { en: "Then Alice spoke of her cat, Dinah, again.", zh: "然后爱丽丝又提起她的猫黛娜。" },
          ]),
          page([
            { en: "The animals left in a hurry.", zh: "动物们匆忙离开了。" },
            { en: "Alice was alone and ready to cry once more.", zh: "爱丽丝又剩下一个人，又想哭。" },
            { en: "The White Rabbit returned, looking for his gloves and fan.", zh: "白兔回来了，在找手套和扇子。" },
          ]),
          page([
            { en: "He took Alice for his maid. \"Mary Ann! Fetch them!\"", zh: "他把爱丽丝当成女仆：“玛丽·安！去拿来！”" },
            { en: "Alice ran to a little house, because she did not know what else to do.", zh: "爱丽丝跑进一栋小房子，因为她不知道还能做什么。" },
            { en: "Inside she found the fan, the gloves, and another bottle.", zh: "里面有扇子、手套，还有另一个瓶子。" },
          ]),
        ],
        [
          { q: "Who won the Dodo's race?", options: ["Only Alice", "Everyone", "Only the Mouse"], answer: 1 },
          { q: "What was the White Rabbit looking for?", options: ["Gloves and a fan", "A golden cap", "Green glasses"], answer: 0 },
        ],
      ),
      novelChapter(
        "al-4",
        "Too Big for the House",
        "房子装不下",
        [
          page([
            { en: "Alice drank and grew huge inside the Rabbit's house.", zh: "爱丽丝喝了，在兔子房子里变得巨大。" },
            { en: "Her arm stuck out a window. Her foot filled the chimney.", zh: "她的胳膊伸出窗户。脚塞满了烟囱。" },
            { en: "The Rabbit was horrified. He called for help.", zh: "兔子吓坏了。他喊人帮忙。" },
          ]),
          page([
            { en: "Animals threw pebbles. The pebbles turned into little cakes.", zh: "动物们扔小石子。石子变成了小蛋糕。" },
            { en: "Alice ate a cake and shrank again.", zh: "爱丽丝吃了一块蛋糕，又缩小了。" },
            { en: "She ran out of the house before they could catch her.", zh: "他们还没抓住她，她就跑出了房子。" },
          ]),
          page([
            { en: "In the woods she met a giant puppy. She was still very small.", zh: "树林里她遇见一只巨大的小狗。她自己还很小。" },
            { en: "She tricked the puppy with a stick and slipped away.", zh: "她用一根棍子引开小狗，悄悄溜走。" },
            { en: "\"I must get back to my right size,\" she said.", zh: "她说：“我得变回原来的大小。”" },
          ]),
          page([
            { en: "She saw a mushroom as big as a stool.", zh: "她看见一朵蘑菇，有凳子那么大。" },
            { en: "A Caterpillar sat on it, smoking, and looking at her.", zh: "一只毛毛虫坐在上面，吸着烟，看着她。" },
            { en: "\"Who are you?\" asked the Caterpillar.", zh: "毛毛虫问：“你是谁？”" },
          ]),
        ],
        [
          { q: "What happened in the Rabbit's house?", options: ["Alice grew huge", "Alice found Toto", "Alice baked bread"], answer: 0 },
          { q: "Who asked, \"Who are you?\"", options: ["The Queen", "The Caterpillar", "Uncle Henry"], answer: 1 },
        ],
      ),
      novelChapter(
        "al-5",
        "The Caterpillar and the Cat",
        "毛毛虫和猫",
        [
          page([
            { en: "Alice tried to explain that she kept changing size.", zh: "爱丽丝想解释，她一直在变大变小。" },
            { en: "The Caterpillar was not easy to please.", zh: "毛毛虫不太好讨好。" },
            { en: "He told her that one side of the mushroom would make her taller.", zh: "他告诉她，蘑菇的一边会让她变高。" },
          ]),
          page([
            { en: "The other side would make her shorter.", zh: "另一边会让她变矮。" },
            { en: "Alice broke off two pieces.", zh: "爱丽丝掰下两块。" },
            { en: "She nibbled until she was not too tall and not too small.", zh: "她小口咬，直到不太高也不太小。" },
          ]),
          page([
            { en: "She felt more like herself again.", zh: "她觉得又有点像自己了。" },
            { en: "She walked on and found a house in the trees.", zh: "她继续走，看见树丛里有一栋房子。" },
            { en: "A Cheshire Cat appeared in the branches, grinning.", zh: "柴郡猫出现在树枝上，咧着嘴笑。" },
          ]),
          page([
            { en: "\"Which way?\" Alice asked.", zh: "爱丽丝问：“走哪边？”" },
            { en: "\"That way lives a Hatter. That way lives a March Hare. Both are mad.\"", zh: "“那边住着帽匠。那边住着三月兔。他们都疯了。”" },
            { en: "The Cat faded until only the grin was left.", zh: "猫渐渐消失，最后只剩下笑容。" },
          ]),
        ],
        [
          { q: "What could the mushroom do?", options: ["Change Alice's size", "Open the cellar", "Call the monkeys"], answer: 0 },
          { q: "What was left when the Cheshire Cat faded?", options: ["His watch", "His grin", "His shoes"], answer: 1 },
        ],
      ),
      novelChapter(
        "al-6",
        "The Mad Tea Party",
        "疯狂茶会",
        [
          page([
            { en: "Alice sat down at a long table under a tree.", zh: "爱丽丝在树下一张长桌旁坐下。" },
            { en: "The Mad Hatter, the March Hare, and a sleeping Dormouse were there.", zh: "疯帽匠、三月兔，还有一只睡着的睡鼠在那里。" },
            { en: "\"No room!\" they cried, though the table was long.", zh: "他们喊：“没位子！”可桌子明明很长。" },
          ]),
          page([
            { en: "\"There is plenty of room,\" Alice said, and sat.", zh: "爱丽丝说：“位子多的是。”然后坐下。" },
            { en: "They asked a riddle: \"Why is a raven like a writing desk?\"", zh: "他们出了个谜语：“为什么乌鸦像写字台？”" },
            { en: "The Hatter did not know the answer. Alice did not either.", zh: "帽匠不知道答案。爱丽丝也不知道。" },
          ]),
          page([
            { en: "Time, they said, had stopped at six o'clock. It was always tea time.", zh: "他们说，时间停在六点。永远都是喝茶时间。" },
            { en: "They moved one seat over when the cups got dirty.", zh: "杯子脏了，他们就往旁边挪一个位子。" },
            { en: "Alice thought this was the silliest tea she had ever seen.", zh: "爱丽丝觉得这是她见过的最傻的茶会。" },
          ]),
          page([
            { en: "She left when they were rude about her hair and her ideas.", zh: "他们嘲笑她的头发和想法，她就离开了。" },
            { en: "\"I will never go there again,\" she said.", zh: "她说：“我再也不去那儿了。”" },
            { en: "In the woods she saw a door in a tree and walked through.", zh: "树林里，她看见树上有一扇门，就走了进去。" },
          ]),
        ],
        [
          { q: "Why was it always tea time?", options: ["Time had stopped at six o'clock", "The Queen said so", "It was Kansas"], answer: 0 },
          { q: "Did the Hatter know the riddle's answer?", options: ["Yes", "No", "Only Toto knew"], answer: 1 },
        ],
      ),
      novelChapter(
        "al-7",
        "The Queen's Garden",
        "王后的花园",
        [
          page([
            { en: "Alice was in the garden at last.", zh: "爱丽丝终于进了花园。" },
            { en: "Three gardeners painted white roses red.", zh: "三个园丁把白玫瑰涂成红色。" },
            { en: "\"The Queen wanted red roses,\" they said. \"We planted the wrong ones.\"", zh: "他们说：“王后要红玫瑰。我们种错了。”" },
          ]),
          page([
            { en: "The Queen of Hearts arrived with a crowd, a King, and soldiers like cards.", zh: "红心王后带着一群人来了，还有国王，以及像纸牌一样的士兵。" },
            { en: "\"Who is this?\" snapped the Queen.", zh: "王后厉声问：“这是谁？”" },
            { en: "Alice stood straight. \"My name is Alice, so please your Majesty.\"", zh: "爱丽丝站直：“我叫爱丽丝，王后陛下。”" },
          ]),
          page([
            { en: "The Queen shouted, \"Off with her head!\" for almost every small mistake.", zh: "王后几乎每见一个小错，就喊：“砍掉她的头！”" },
            { en: "The King quietly pardoned people behind her back.", zh: "国王悄悄在她背后赦免那些人。" },
            { en: "They played croquet with flamingos for mallets and hedgehogs for balls.", zh: "他们打槌球：火烈鸟当槌，刺猬当球。" },
          ]),
          page([
            { en: "The game was all quarrel and no rules.", zh: "这场球全是吵架，没有规则。" },
            { en: "The Cheshire Cat's head appeared in the air. The King wanted it gone.", zh: "柴郡猫的头出现在空中。国王想让它消失。" },
            { en: "Alice said the Cat belonged to the Duchess, so they fetched her.", zh: "爱丽丝说猫是公爵夫人的，于是他们去把她找来。" },
          ]),
        ],
        [
          { q: "Why were the gardeners painting the roses?", options: ["They planted white ones by mistake", "It was raining", "Alice asked them to"], answer: 0 },
          { q: "What did they use as croquet balls?", options: ["Apples", "Hedgehogs", "Buttons"], answer: 1 },
        ],
      ),
      novelChapter(
        "al-8",
        "The Trial and the Bank",
        "审判和岸边",
        [
          page([
            { en: "A trial began. Someone had stolen the Queen's tarts.", zh: "审判开始了。有人偷了王后的馅饼。" },
            { en: "The Knave of Hearts stood accused.", zh: "红心杰克站在被告席上。" },
            { en: "The Mad Hatter was a witness and made no sense.", zh: "疯帽匠来作证，可他说的话毫无道理。" },
          ]),
          page([
            { en: "The Cook put pepper in the court. Everyone sneezed.", zh: "厨子把胡椒撒进法庭。大家都打喷嚏。" },
            { en: "Alice began to grow again, without meaning to.", zh: "爱丽丝又开始变大，她自己也没想变。" },
            { en: "The Dormouse complained she was taking all the air.", zh: "睡鼠抱怨她占了所有空气。" },
          ]),
          page([
            { en: "The Queen wanted the sentence first and the verdict after.", zh: "王后要先判刑，再裁决有没有罪。" },
            { en: "\"That is nonsense,\" Alice said. She had grown very large.", zh: "爱丽丝说：“这太荒唐了。”她已经长得非常大。" },
            { en: "\"Hold your tongue!\" said the Queen. \"Off with her head!\"", zh: "王后说：“闭嘴！砍掉她的头！”" },
          ]),
          page([
            { en: "\"Who cares for you?\" said Alice. \"You are nothing but a pack of cards!\"", zh: "爱丽丝说：“谁怕你们？你们不过是一副纸牌！”" },
            { en: "The cards flew up into the air and came down on her.", zh: "纸牌飞到空中，又落在她身上。" },
            { en: "She woke on the bank. Her sister was brushing leaves from her face. It had been a dream, but a very large one.", zh: "她在岸边醒来。姐姐正把叶子从她脸上拂开。原来是一场梦，可这场梦很大。" },
          ]),
        ],
        [
          { q: "What had been stolen?", options: ["The Queen's tarts", "Silver shoes", "A pencil"], answer: 0 },
          { q: "Where did Alice wake up?", options: ["In the Emerald City", "On the bank beside her sister", "In Star School"], answer: 1 },
        ],
      ),
    ],
  },
];

function findNovel(id) {
  return NOVELS.find((item) => item.id === id) || null;
}

function novelChapterCount(novel) {
  return novel.chapters.length;
}

function novelPageLabel(novel, chapterIndex, pageIndex) {
  const chapter = novel.chapters[chapterIndex];
  if (!chapter) return "";
  return `第 ${chapterIndex + 1} 章 · 第 ${pageIndex + 1} 页`;
}
