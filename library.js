/* 美国小学三年级读力：三年级浅 → 三年级 → 三年级深
   故事和书都是原创，方便听、读、搜索。 */

const LEVELS = [
  { id: 1, name: "三年级浅", hint: "美国小学三年级上，句子短一些" },
  { id: 2, name: "三年级", hint: "美国小学三年级标准" },
  { id: 3, name: "三年级深", hint: "三年级下，更长，要想一想" },
];

function levelName(level) {
  return LEVELS.find((item) => item.id === level)?.name || "三年级浅";
}

const SEARCH_HINTS = [
  { test: /harry|potter|霍格|哈利|魔法学校/i, message: "《哈利·波特》有版权，不能放进软件。", suggest: "魔法 猫头鹰 学校" },
  { test: /frozen|elsa|安娜|冰雪/i, message: "冰雪奇缘有版权，不能放进软件。", suggest: "冬天 友谊" },
  { test: /spiderman|蜘蛛侠|marvel|复仇者/i, message: "漫威故事有版权，不能放进软件。", suggest: "英雄 城市" },
  { test: /disney|迪士尼|小美人鱼|狮子王/i, message: "迪士尼故事有版权，不能放进软件。", suggest: "动物 冒险 海洋" },
  { test: /minecraft|我的世界/i, message: "游戏故事有版权，不能整本放进来。", suggest: "冒险 建造" },
];

function itemSearchText(item) {
  return [item.title, item.titleZh, item.summary, ...(item.tags || []), ...(item.aliases || [])].join(" ").toLowerCase();
}

function searchItems(list, query) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const parts = q.split(/\s+/);
  return list.filter((item) => {
    const hay = itemSearchText(item);
    return parts.every((part) => hay.includes(part));
  });
}

function copyrightHint(query) {
  return SEARCH_HINTS.find((item) => item.test.test(query)) || null;
}

const STORIES = [
  {
    id: "s1-lunch",
    level: 1,
    title: "The Lost Lunch Box",
    titleZh: "丢失的午餐盒",
    summary: "Maya loses her lunch at school and a friend helps her.",
    tags: ["学校", "友谊", "午餐", "school", "friend", "lunch"],
    aliases: ["school story", "lost", "friendship"],
    sentences: [
      { en: "Maya hung her backpack on the hook and reached inside.", zh: "玛雅把书包挂在钩子上，伸手进去摸。" },
      { en: "Her sandwich was gone. The red lunch box was gone, too.", zh: "三明治不见了。红色午餐盒也不见了。" },
      { en: "\"I packed it this morning,\" she thought. \"It has to be here.\"", zh: "她想：“我早上装进去的，一定还在。”" },
      { en: "She checked the pocket. She checked under her desk. Nothing.", zh: "她检查口袋，又检查桌子底下。什么都没有。" },
      { en: "At recess, her friend Leo waved a red box in the air.", zh: "课间休息时，朋友利奥挥着一个红盒子。" },
      { en: "\"Is this yours? It was still on the bus seat.\"", zh: "“这是你的吗？它还在公交座位上。”" },
      { en: "Maya laughed with relief. \"That's mine! I must have left it.\"", zh: "玛雅松了一口气，笑了：“是我的！我一定是忘拿了。”" },
      { en: "They sat together and shared the sandwich, one half each.", zh: "他们坐在一起，把三明治一人分了一半。" },
    ],
    questions: [
      { q: "Where did Leo find the lunch box?", options: ["Under the desk", "On the bus seat", "In the pocket"], answer: 1 },
      { q: "What did Maya and Leo do at the end?", options: ["They shared the sandwich", "They ran home", "They bought candy"], answer: 0 },
    ],
  },
  {
    id: "s1-benny",
    level: 1,
    title: "Benny Waits",
    titleZh: "本尼在等",
    summary: "A dog waits all day and finally goes to the park.",
    tags: ["动物", "狗", "家庭", "dog", "animal", "park", "pet"],
    aliases: ["puppy", "dogs", "pets"],
    sentences: [
      { en: "Benny the dog watched the door from the moment the sun came up.", zh: "太阳一出来，小狗本尼就盯着门看。" },
      { en: "He had waited yesterday. He had waited the day before that.", zh: "他昨天等过，前天也等过。" },
      { en: "\"Today will be different,\" his eyes seemed to say.", zh: "他的眼睛好像在说：“今天会不一样。”" },
      { en: "At last the key turned. Sam dropped his backpack and knelt down.", zh: "终于，钥匙转动了。萨姆放下书包，跪下来。" },
      { en: "\"I promised you the park, and a promise is a promise.\"", zh: "“我答应过带你去公园。答应了就要做到。”" },
      { en: "Benny's tail thumped the floor like a drum.", zh: "本尼的尾巴像打鼓一样拍着地板。" },
      { en: "They walked until the tall trees hid the street.", zh: "他们一直走到大树挡住了街道。" },
      { en: "Benny ran in circles, then dropped a stick at Sam's feet.", zh: "本尼转着圈跑，然后把一根树枝放在萨姆脚边。" },
      { en: "Some waits feel long. This one was worth it.", zh: "有些等待很长。这一次值得。" },
    ],
    questions: [
      { q: "What did Sam promise Benny?", options: ["A new toy", "A walk in the park", "A long nap"], answer: 1 },
      { q: "What did Benny bring to Sam?", options: ["A stick", "A lunch box", "A key"], answer: 0 },
    ],
  },
  {
    id: "s1-rain",
    level: 1,
    title: "The Rainy Saturday",
    titleZh: "下雨的星期六",
    summary: "A rainy day ruins a picnic plan, so the family makes a new one.",
    tags: ["家庭", "下雨", "计划", "rain", "family", "saturday", "home"],
    aliases: ["rain", "weekend", "picnic"],
    sentences: [
      { en: "Jordan pressed his face to the window and groaned.", zh: "乔丹把脸贴在窗户上，唉声叹气。" },
      { en: "Rain drew silver lines down the glass. The picnic was ruined.", zh: "雨水在玻璃上画出银线。野餐泡汤了。" },
      { en: "\"We could still eat outside,\" Dad said, \"if we like getting wet.\"", zh: "爸爸说：“我们还是可以在外面吃，如果我们喜欢淋湿的话。”" },
      { en: "Mom shook her head, but she was already smiling.", zh: "妈妈摇头，可已经在笑了。" },
      { en: "They spread a blanket on the living room floor.", zh: "他们在客厅地板上铺开毯子。" },
      { en: "Sandwiches tasted the same. The thunder made them jump, then laugh.", zh: "三明治味道还是一样。雷声吓了他们一跳，然后大家都笑了。" },
      { en: "Jordan decided the day was not ruined after all.", zh: "乔丹觉得，这一天其实并没有被毁掉。" },
      { en: "Sometimes a new plan is better than the first one.", zh: "有时候，新计划比原来的更好。" },
    ],
    questions: [
      { q: "Why was the picnic ruined at first?", options: ["It was raining", "They had no food", "Dad was late"], answer: 0 },
      { q: "Where did the family eat instead?", options: ["At school", "On the living room floor", "In the car"], answer: 1 },
    ],
  },
  {
    id: "s2-science",
    level: 2,
    title: "The Science Fair Surprise",
    titleZh: "科学展的惊喜",
    summary: "Ava's volcano fails, but she learns something better.",
    tags: ["学校", "科学", "实验", "science", "school", "volcano", "fair"],
    aliases: ["science fair", "experiment", "volcano"],
    sentences: [
      { en: "Ava had practiced her volcano speech until she could say it in her sleep.", zh: "埃娃把火山讲解练到闭着眼睛也能说。" },
      { en: "On Friday, the bakers' soda sat in the wrong cup.", zh: "星期五，小苏打却放错了杯子。" },
      { en: "When the judges arrived, the volcano only coughed a sad little bubble.", zh: "评委到来时，火山只咳出了一小泡可怜的泡沫。" },
      { en: "Ava's face felt hot. She wanted to disappear behind the poster.", zh: "埃娃脸上发烫。她想躲到海报后面消失。" },
      { en: "Then she took a breath and explained what should have happened.", zh: "后来她吸了一口气，讲出本来应该发生的事。" },
      { en: "She even guessed why it had failed. The judges leaned in.", zh: "她甚至猜到了失败的原因。评委们凑近了听。" },
      { en: "\"Science is not just the boom,\" one of them said. \"It is the thinking.\"", zh: "其中一位说：“科学不只是轰的一声，而是思考。”" },
      { en: "Ava didn't win first prize. She won something quieter: she understood.", zh: "埃娃没有拿第一。她赢到了更安静的东西：她真的懂了。" },
      { en: "On the way home she was already planning the next experiment.", zh: "回家路上，她已经在计划下一个实验了。" },
    ],
    questions: [
      { q: "What went wrong at the science fair?", options: ["The volcano barely bubbled", "The poster fell down", "Ava forgot her speech"], answer: 0 },
      { q: "What did the judge say science is?", options: ["Just the boom", "The thinking", "Winning first prize"], answer: 1 },
    ],
  },
  {
    id: "s2-owl",
    level: 2,
    title: "The Midnight Owl",
    titleZh: "午夜猫头鹰",
    summary: "A girl finds a tiny owl and must decide what is kind.",
    tags: ["魔法", "猫头鹰", "夜晚", "动物", "owl", "night", "magic", "kind"],
    aliases: ["owl", "magic", "wizard", "hogwarts", "夜间", "哈利波特", "哈利"],
    sentences: [
      { en: "No one on Maple Street believed in midnight visitors.", zh: "枫树街上没有人相信午夜来客。" },
      { en: "Then Lina heard a tap at her window, soft as a secret.", zh: "后来莉娜听见窗户被轻轻敲了一下，像一个秘密。" },
      { en: "A small owl stared in, its eyes like two gold coins.", zh: "一只小猫头鹰盯着里面，眼睛像两枚金币。" },
      { en: "It hopped onto her desk and dropped a silver button.", zh: "它跳上书桌，丢下一颗银色纽扣。" },
      { en: "\"You can stay,\" Lina whispered. \"But only until morning.\"", zh: "莉娜低声说：“你可以留下，但只到早上。”" },
      { en: "At dawn the owl fluttered toward the open window.", zh: "黎明时，猫头鹰朝开着的窗户扑打翅膀。" },
      { en: "Lina wanted to keep it. She also wanted it to be free.", zh: "莉娜想留下它，也想让它自由。" },
      { en: "She pushed the window wider. The owl vanished into the pale sky.", zh: "她把窗户推得更开。猫头鹰消失在淡淡的天空里。" },
      { en: "The silver button stayed, cool in her hand, like a thank-you.", zh: "银色纽扣留了下来，在她手里凉凉的，像一声谢谢。" },
    ],
    questions: [
      { q: "What did the owl leave on the desk?", options: ["A gold coin", "A silver button", "A letter"], answer: 1 },
      { q: "Why did Lina open the window wider?", options: ["So the owl could be free", "To call her mom", "To let in rain"], answer: 0 },
    ],
  },
  {
    id: "s2-soccer",
    level: 2,
    title: "One More Minute",
    titleZh: "再一分钟",
    summary: "A soccer game is almost lost until a teammate trusts Priya.",
    tags: ["足球", "运动", "团队", "soccer", "football", "sports", "team"],
    aliases: ["soccer", "football", "game", "sport"],
    sentences: [
      { en: "The scoreboard said 2 to 1, and the clock was almost empty.", zh: "记分牌是 2 比 1，时间快要走完了。" },
      { en: "Priya's team needed one more goal, and everyone looked at Marco.", zh: "普里娅的队还需要一个球，大家都看着马尔科。" },
      { en: "Marco was the fastest, but the other team had learned his tricks.", zh: "马尔科跑得最快，可对方已经摸清了他的套路。" },
      { en: "\"Pass it!\" Priya shouted, though her voice shook.", zh: "普里娅喊：“传过来！”声音却在发抖。" },
      { en: "Marco hesitated for a heartbeat, then kicked the ball sideways.", zh: "马尔科犹豫了一下，然后把球横传过来。" },
      { en: "Priya did not think. She ran and swung her foot.", zh: "普里娅来不及想。她跑上去，一脚踢出。" },
      { en: "The ball slipped past the goalie like a secret getting out.", zh: "球从守门员身边溜了过去，像一个漏出来的秘密。" },
      { en: "The whistle blew. The score was tied, and that was enough.", zh: "哨声响了。比分扳平了，这就够了。" },
      { en: "Marco bumped her shoulder. \"Next time I won't wait a whole minute.\"", zh: "马尔科碰了碰她的肩膀：“下次我不会再等整整一分钟。”" },
    ],
    questions: [
      { q: "Why did Marco pass the ball?", options: ["He was tired", "The other team knew his tricks", "The coach told him to stop"], answer: 1 },
      { q: "What happened after Priya kicked?", options: ["The game was tied", "Her team lost", "It started raining"], answer: 0 },
    ],
  },
  {
    id: "s3-keys",
    level: 3,
    title: "The Case of the Missing Keys",
    titleZh: "丢失钥匙的案件",
    summary: "Two friends become detectives and follow clues around the house.",
    tags: ["侦探", "谜题", "线索", "mystery", "detective", "keys", "clue"],
    aliases: ["detective", "mystery", "sherlock", "case"],
    sentences: [
      { en: "Noah announced, in his most serious voice, that this was not a small problem.", zh: "诺亚用最严肃的声音宣布：这可不是小问题。" },
      { en: "Grandma's keys had vanished between breakfast and the morning walk.", zh: "奶奶的钥匙在早餐和早散步之间消失了。" },
      { en: "\"Detectives do not guess,\" said his cousin Mina. \"They notice.\"", zh: "堂姐米娜说：“侦探不靠猜，他们靠观察。”" },
      { en: "They found a trail of crumbs, a muddy paw print, and a chair that had moved.", zh: "他们发现一串面包屑、一个泥脚印，还有一把被挪过的椅子。" },
      { en: "The crumbs led to the dog bed. The paw print led to the back door.", zh: "面包屑通向狗窝。脚印通向后门。" },
      { en: "Outside, the garden hose lay in a coil, and something metal winked in the grass.", zh: "外面，花园水管盘成一圈，草里有金属在闪光。" },
      { en: "Scout the dog sat beside the keys, looking proud and a little guilty.", zh: "小狗斯考特坐在钥匙旁边，样子得意，又有点心虚。" },
      { en: "\"He thought they were a toy,\" Mina said. \"He was wrong, but he was thorough.\"", zh: "米娜说：“它以为那是玩具。它想错了，但查得很彻底。”" },
      { en: "Grandma laughed until her eyes were wet. \"Next time I'll hang them higher.\"", zh: "奶奶笑到眼睛都湿了：“下次我要把钥匙挂高一点。”" },
      { en: "Noah wrote the case in his notebook: mystery solved, dog forgiven.", zh: "诺亚在本子上写道：谜题解开，小狗被原谅。" },
    ],
    questions: [
      { q: "Who had taken the keys?", options: ["Mina", "Scout the dog", "A neighbor"], answer: 1 },
      { q: "What did the detectives follow first?", options: ["A trail of crumbs", "A map", "A phone call"], answer: 0 },
    ],
  },
  {
    id: "s3-moon",
    level: 3,
    title: "Lights on the Moon",
    titleZh: "月亮上的灯",
    summary: "A child imagines walking on the moon and what Earth would look like.",
    tags: ["太空", "月亮", "科学", "space", "moon", "astronaut", "stars"],
    aliases: ["space", "nasa", "astronaut", "rocket", "太空人"],
    sentences: [
      { en: "Eli lay on the grass and tried to hold the whole moon in his eyes.", zh: "伊莱躺在草地上，想把整轮月亮装进眼睛里。" },
      { en: "He had read that people had walked there, long before he was born.", zh: "他读到过，在他出生很久以前，就有人在那里走过。" },
      { en: "\"If I stood on that pale ground,\" he wondered, \"would Earth look like a blue marble?\"", zh: "他想：“如果我站在那片苍白的地面上，地球会不会像一颗蓝色弹珠？”" },
      { en: "His sister sat down beside him and handed him a flashlight.", zh: "姐姐在他旁边坐下，递给他一只手电筒。" },
      { en: "\"This is not moonlight,\" she said, \"but it is the kind of light we can carry.\"", zh: "她说：“这不是月光，但是我们能带在身上的光。”" },
      { en: "They clicked it on and off, making tiny stars in the dark yard.", zh: "他们把灯开了又关，在黑暗的院子里做出小小的星星。" },
      { en: "Eli decided he did not need to leave Earth tonight.", zh: "伊莱决定，今晚不必离开地球。" },
      { en: "He only needed to keep asking questions until the answers grew legs.", zh: "他只需要继续提问，直到答案自己长出腿来。" },
      { en: "Above them the moon kept shining, patient as a teacher who likes curious kids.", zh: "月亮在他们上方照着，像一位喜欢好奇孩子的老师，很有耐心。" },
    ],
    questions: [
      { q: "What did Eli wonder about the Earth?", options: ["If it would look like a blue marble", "If it was made of cheese", "If it would disappear"], answer: 0 },
      { q: "What did his sister give him?", options: ["A map", "A flashlight", "A rocket"], answer: 1 },
    ],
  },
  {
    id: "s3-dino",
    level: 3,
    title: "The Last Footprint",
    titleZh: "最后的脚印",
    summary: "Kids find a strange print behind the school and try to explain it.",
    tags: ["恐龙", "学校", "谜题", "dinosaur", "fossil", "playground", "science"],
    aliases: ["dinosaur", "fossil", "t-rex", "恐龙脚印"],
    sentences: [
      { en: "Behind the playground, the ground was still soft from last night's rain.", zh: "操场后面的土地因为昨夜的雨还软着。" },
      { en: "Kenji stopped so suddenly that Maya bumped into his backpack.", zh: "健司突然停住，玛雅撞上了他的书包。" },
      { en: "A huge print pressed into the mud, with three long toes.", zh: "泥里压着一个巨大的脚印，有三根长脚趾。" },
      { en: "\"That is not a shoe,\" Maya whispered, although she wanted it to be.", zh: "玛雅低声说：“那不是鞋印。”尽管她希望那是。" },
      { en: "They took a photo. They measured it with a jump rope.", zh: "他们拍了照，还用跳绳量了量。" },
      { en: "At lunch they argued: dinosaur, bird, or a joke from the sixth graders?", zh: "午饭时他们争论：恐龙、鸟，还是六年级学生的恶作剧？" },
      { en: "Ms. Patel, the science teacher, studied the picture and smiled.", zh: "科学老师帕特尔看了照片，笑了。" },
      { en: "\"It is probably a heron,\" she said. \"A living dinosaur cousin, in a way.\"", zh: "她说：“大概是苍鹭。某种意义上，它是恐龙还活着的亲戚。”" },
      { en: "Kenji was a little disappointed, and also more curious than before.", zh: "健司有点失望，却也比刚才更好奇。" },
      { en: "The print would dry and fade. The question would not.", zh: "脚印会干、会淡。问题不会。" },
    ],
    questions: [
      { q: "What did the kids find in the mud?", options: ["A huge three-toed print", "A dinosaur bone", "A lost shoe"], answer: 0 },
      { q: "What did Ms. Patel think made the print?", options: ["A T-rex", "A heron", "A truck"], answer: 1 },
    ],
  },
];

const BOOKS = [
  {
    id: "b1-garden",
    level: 1,
    title: "A Friend in the Garden",
    titleZh: "花园里的朋友",
    summary: "Rosa finds a shy rabbit and learns how to be gentle.",
    tags: ["友谊", "动物", "花园", "friend", "garden", "rabbit", "kind"],
    aliases: ["friendship", "charlotte", "rabbit", "garden"],
    pages: [
      [
        { en: "Rosa liked the quiet corner behind the tomato plants.", zh: "罗莎喜欢番茄秧后面那个安静的角落。" },
        { en: "One morning a rabbit sat there, as still as a brown stone.", zh: "一天早上，一只兔子坐在那里，像一块棕色的石头。" },
        { en: "Rosa wanted to grab it. Instead, she sat down and waited.", zh: "罗莎想抓住它。可她坐下，等着。" },
      ],
      [
        { en: "The rabbit's nose twitched. It took one hop closer.", zh: "兔子的鼻子抽动着。它又近了一跳。" },
        { en: "Rosa kept her hands in her lap so they would not look like traps.", zh: "罗莎把手放在腿上，好让手看起来不像陷阱。" },
        { en: "\"I can share the lettuce,\" she said, though she felt a little silly.", zh: "她说：“我可以分你一点生菜。”尽管她觉得自己有点傻。" },
      ],
      [
        { en: "The rabbit ate, then vanished under the fence.", zh: "兔子吃完，就钻到篱笆下面不见了。" },
        { en: "It came back the next day, and the day after that.", zh: "第二天它又来了，第三天也来了。" },
        { en: "Rosa learned that some friends do not need names. They need patience.", zh: "罗莎明白了：有些朋友不需要名字，他们需要耐心。" },
      ],
      [
        { en: "When her cousin shouted in the yard, the rabbit froze.", zh: "堂哥在院子里大喊时，兔子僵住了。" },
        { en: "Rosa lifted a finger to her lips. The shouting stopped.", zh: "罗莎把一根手指放在嘴唇上。喊声停了。" },
        { en: "The garden felt like a secret they were keeping together.", zh: "花园像是他们一起保守的秘密。" },
      ],
    ],
    questions: [
      { q: "What did Rosa do instead of grabbing the rabbit?", options: ["She sat down and waited", "She called a vet", "She closed the gate"], answer: 0 },
      { q: "What do some friends need, according to Rosa?", options: ["Names", "Patience", "Loud music"], answer: 1 },
    ],
  },
  {
    id: "b1-neighbor",
    level: 1,
    title: "The New Neighbor",
    titleZh: "新邻居",
    summary: "A new kid moves in and both children feel shy at first.",
    tags: ["邻居", "友谊", "搬家", "neighbor", "new kid", "friend", "shy"],
    aliases: ["new friend", "moving", "neighbor"],
    pages: [
      [
        { en: "A truck filled the street like a giant yellow animal.", zh: "一辆卡车占满街道，像一头巨大的黄色动物。" },
        { en: "Owen watched from his porch and pretended to read a comic.", zh: "欧文在门廊上看着，假装在看漫画。" },
        { en: "A girl his age carried a fishbowl with both hands.", zh: "一个和他差不多大的女孩，双手端着鱼缸。" },
      ],
      [
        { en: "Owen's mom whispered, \"You could say hello.\"", zh: "欧文的妈妈低声说：“你可以打个招呼。”" },
        { en: "His mouth felt dry, as if he had eaten crackers and forgotten water.", zh: "他嘴里发干，像吃了饼干却忘了喝水。" },
        { en: "The girl looked over. She looked just as nervous.", zh: "女孩看过来。她看起来一样紧张。" },
      ],
      [
        { en: "\"Your fish is tilting,\" Owen called, and then he wished he hadn't.", zh: "欧文喊：“你的鱼在歪！”然后又后悔喊了。" },
        { en: "The girl laughed and leveled the bowl. \"Thanks. I'm Priya.\"", zh: "女孩笑了，把鱼缸端平。“谢谢。我叫普里娅。”" },
        { en: "Owen pointed at the empty swing. \"I saved it, in case you needed one.\"", zh: "欧文指着空秋千：“我留着，万一你需要。”" },
      ],
      [
        { en: "They sat side by side and did not talk much.", zh: "他们并排坐着，话并不多。" },
        { en: "The fish swam in slow circles, getting used to a new view.", zh: "鱼慢慢转圈游着，适应新的风景。" },
        { en: "Owen thought, maybe people can do that, too.", zh: "欧文想，也许人也可以这样。" },
      ],
    ],
    questions: [
      { q: "What was Priya carrying?", options: ["A fishbowl", "A lunch box", "A soccer ball"], answer: 0 },
      { q: "How did Owen feel before he spoke?", options: ["Nervous", "Angry", "Sleepy"], answer: 0 },
    ],
  },
  {
    id: "b1-bus",
    level: 1,
    title: "Bus Number Nine",
    titleZh: "九号公交车",
    summary: "A boy takes the wrong bus and has to solve the problem.",
    tags: ["学校", "公交", "城市", "bus", "school", "city", "mistake"],
    aliases: ["bus", "lost", "school bus"],
    pages: [
      [
        { en: "Dante always sat behind the driver on Bus Number Nine.", zh: "丹特总是坐在九号公交车司机后面。" },
        { en: "On Tuesday he was late, and he jumped onto the first bus he saw.", zh: "星期二他迟到了，跳上了眼前第一辆车。" },
        { en: "The seats were the wrong color. His stomach knew before his brain did.", zh: "座位颜色不对。他的肚子比脑子先知道。" },
      ],
      [
        { en: "He could have frozen. Instead he walked up the aisle.", zh: "他本可以愣住。可他沿着过道走了上去。" },
        { en: "\"Excuse me. I think I belong on Number Nine.\"", zh: "“不好意思，我想我应该坐九号。”" },
        { en: "The driver nodded as if this happened to brave kids every week.", zh: "司机点点头，好像勇敢的孩子每周都会遇到这种事。" },
      ],
      [
        { en: "At the next stop, Bus Number Nine was waiting like a loyal dog.", zh: "下一站，九号车像一条忠实的狗一样等着。" },
        { en: "Dante thanked both drivers, which made him feel taller.", zh: "丹特谢了两位司机，觉得自己高了一截。" },
        { en: "He sat in his usual seat and finally breathed out.", zh: "他坐回老位子，终于把气吐出来。" },
      ],
      [
        { en: "At school he told Maya, because a good story should be shared.", zh: "到了学校，他告诉了玛雅，因为好故事就该分享。" },
        { en: "\"You asked for help,\" she said. \"That's the smart part.\"", zh: "她说：“你开口求助了。那才是聪明的地方。”" },
        { en: "Dante decided being late was bad, but staying quiet would have been worse.", zh: "丹特觉得迟到不好，但闭着嘴会更糟。" },
      ],
    ],
    questions: [
      { q: "What mistake did Dante make?", options: ["He took the wrong bus", "He forgot his backpack", "He missed school"], answer: 0 },
      { q: "What did Maya say was the smart part?", options: ["Running faster", "Asking for help", "Hiding in the seat"], answer: 1 },
    ],
  },
  {
    id: "b2-clubhouse",
    level: 2,
    title: "The Clubhouse Promise",
    titleZh: "俱乐部小屋的约定",
    summary: "Friends argue about rules and then make a fairer promise.",
    tags: ["友谊", "规则", "小屋", "clubhouse", "friends", "promise", "rules"],
    aliases: ["club", "treehouse", "friends"],
    pages: [
      [
        { en: "The clubhouse was only old boards and a rug, but it felt important.", zh: "小屋不过是旧木板和一块地毯，却让人觉得很重要。" },
        { en: "Leo wrote a rule on a cardboard sign: Members only. No little sisters.", zh: "利奥在纸板上写规则：仅限成员。不许带妹妹。" },
        { en: "Ava stared at the sign until the words looked mean.", zh: "埃娃盯着那块牌子，直到那些字看起来很刻薄。" },
      ],
      [
        { en: "\"My sister can keep a secret better than you can,\" she said.", zh: "她说：“我妹妹保守秘密比你还强。”" },
        { en: "Leo's ears turned pink. He had not thought about being fair.", zh: "利奥的耳朵红了。他没想过公不公平。" },
        { en: "They sat in silence while a fly bumped the window again and again.", zh: "他们沉默地坐着，一只苍蝇一次次撞着窗户。" },
      ],
      [
        { en: "Finally Leo crossed out the last line and wrote a new one.", zh: "最后利奥划掉最后一行，写下新的一句。" },
        { en: "Visitors allowed if they help build, and if they knock.", zh: "来访者可以进，如果他们帮忙搭建，并且先敲门。" },
        { en: "Ava's sister knocked three times, holding a jar of nails.", zh: "埃娃的妹妹敲了三下门，手里捧着一罐钉子。" },
      ],
      [
        { en: "The clubhouse did not get bigger, but it felt less empty.", zh: "小屋没有变大，却不那么空了。" },
        { en: "Leo learned that a rule can protect a place, or it can lock people out.", zh: "利奥明白了：规则可以保护一个地方，也可以把人锁在外面。" },
        { en: "They chose the first kind, and the boards seemed to stand up straighter.", zh: "他们选了第一种。那些木板好像也站得更直了。" },
      ],
    ],
    questions: [
      { q: "What was wrong with Leo's first rule?", options: ["It left people out", "It was too long", "It was written in pencil"], answer: 0 },
      { q: "What did the new rule ask visitors to do?", options: ["Help build and knock", "Bring candy", "Stay outside"], answer: 0 },
    ],
  },
  {
    id: "b2-lake",
    level: 2,
    title: "Across the Lake",
    titleZh: "穿过湖面",
    summary: "Two cousins canoe across a lake and face a sudden wind.",
    tags: ["冒险", "湖", "夏天", "adventure", "lake", "boat", "summer"],
    aliases: ["adventure", "boat", "camping", "lake"],
    pages: [
      [
        { en: "The lake was as flat as a table when they pushed the canoe out.", zh: "他们把独木舟推出去时，湖面平得像桌子。" },
        { en: "Mina promised she would not splash Noah, and she broke that promise twice.", zh: "米娜答应不溅诺亚，可她失信了两次。" },
        { en: "They were halfway across when the wind arrived, sudden as a slammed door.", zh: "才到湖心，风就来了，突然得像摔上的门。" },
      ],
      [
        { en: "The canoe wobbled. Noah's paddle slipped and slapped the water.", zh: "船晃了。诺亚的桨滑了一下，拍在水面上。" },
        { en: "\"Don't stand up,\" Mina said, though her own voice was thin.", zh: "米娜说：“别站起来。”她自己的声音却发细。" },
        { en: "They pointed the nose of the boat into the waves, the way Uncle had taught them.", zh: "他们按叔叔教的，把船头对着波浪。" },
      ],
      [
        { en: "Each stroke felt small, but small strokes added up.", zh: "每一桨都显得很小，可小桨也能加起来。" },
        { en: "When they reached the dock, their arms shook and their smiles were huge.", zh: "靠上码头时，他们的胳膊在抖，笑容却很大。" },
        { en: "Uncle did not scold. He handed them towels and asked what they had learned.", zh: "叔叔没有骂。他递过毛巾，问他们学到了什么。" },
      ],
      [
        { en: "\"The lake can change its mind,\" Noah said.", zh: "诺亚说：“湖会改变主意。”" },
        { en: "\"And we can still steer,\" Mina added.", zh: "米娜补了一句：“可我们还能掌舵。”" },
        { en: "That night the lake was calm again, as if it had only been testing them.", zh: "夜里湖又平静了，像只是在考验他们。" },
      ],
    ],
    questions: [
      { q: "What happened halfway across the lake?", options: ["A sudden wind arrived", "The canoe sank", "It started snowing"], answer: 0 },
      { q: "What had Uncle taught them to do?", options: ["Point the nose into the waves", "Stand up and jump", "Drop the paddles"], answer: 0 },
    ],
  },
  {
    id: "b2-star-school",
    level: 2,
    title: "The New Kid at Star School",
    titleZh: "星星学校的新生",
    summary: "A new student at a school for night lessons learns she already belongs.",
    tags: ["魔法", "学校", "友谊", "magic", "school", "stars", "owl"],
    aliases: ["harry potter", "hogwarts", "wizard school", "magic school", "魔法学校", "哈利波特", "哈利"],
    pages: [
      [
        { en: "Star School did not look like other schools. The windows glowed after sunset.", zh: "星星学校看起来不像别的学校。日落之后窗户还会发光。" },
        { en: "Lina stood in the doorway with a suitcase and a very ordinary pencil.", zh: "莉娜站在门口，手里是行李箱和一支很普通的铅笔。" },
        { en: "A boy in a patched coat said, \"First-years sit by the owl cages.\"", zh: "一个穿着打补丁外套的男孩说：“一年级坐在猫头鹰笼子旁边。”" },
      ],
      [
        { en: "Lina did not know a single spell. She knew how to listen, though.", zh: "莉娜一个咒语都不会。可她知道怎么听。" },
        { en: "The teacher asked who could quiet a frightened owl without touching it.", zh: "老师问，谁能不碰猫头鹰，却让害怕的它安静下来。" },
        { en: "Hands shot up. Lina's stayed down until the owl looked straight at her.", zh: "很多手举起来。莉娜没有举，直到那只猫头鹰直直看着她。" },
      ],
      [
        { en: "She hummed the same low tune her grandmother used on stormy nights.", zh: "她哼起祖母在暴风雨夜里常用的低声曲子。" },
        { en: "The owl's feathers settled. The room grew still, as if it was also listening.", zh: "猫头鹰的羽毛平了。房间静下来，像也在听。" },
        { en: "The teacher smiled. \"Magic is not only sparks. Sometimes it is knowing.\"", zh: "老师笑了：“魔法不只是火花。有时，它是懂得。”" },
      ],
      [
        { en: "At dinner the boy in the patched coat slid her an extra roll.", zh: "晚饭时，那个穿补丁外套的男孩给她多推过来一个面包。" },
        { en: "\"I'm Marco,\" he said. \"I failed the quiet-owl test last year.\"", zh: "他说：“我是马尔科。去年我没通过安静猫头鹰测验。”" },
        { en: "Lina bit the roll and thought, maybe she had belonged here before she arrived.", zh: "莉娜咬着面包想：也许她还没到，就已经属于这里了。" },
      ],
    ],
    questions: [
      { q: "How did Lina quiet the owl?", options: ["She hummed a low tune", "She used a loud spell", "She covered the cage"], answer: 0 },
      { q: "What did the teacher say magic can be?", options: ["Only sparks", "Knowing", "A suitcase"], answer: 1 },
    ],
  },
  {
    id: "b3-blackout",
    level: 3,
    title: "The Night the Lights Went Out",
    titleZh: "灯熄灭的那一夜",
    summary: "A city blackout teaches a family what they can do in the dark.",
    tags: ["家庭", "城市", "夜晚", "blackout", "night", "city", "family"],
    aliases: ["dark", "power", "storm", "lights"],
    pages: [
      [
        { en: "The lights died in the middle of a sentence, as if the city had closed a book.", zh: "灯在一句话中间灭了，像整座城市合上了一本书。" },
        { en: "For a second nobody moved. Then the refrigerator sighed and went quiet.", zh: "有一秒钟，谁也没动。接着冰箱叹了口气，安静了。" },
        { en: "Mom found the candles, but she let Jordan strike the first match.", zh: "妈妈找到蜡烛，却让乔丹划第一根火柴。" },
      ],
      [
        { en: "The flame looked tiny against the dark windows.", zh: "在漆黑的窗前，那点火焰显得很小。" },
        { en: "Outside, neighbors became voices on porches instead of faces in cars.", zh: "外面，邻居变成了门廊上的声音，而不再是车里的脸。" },
        { en: "Dad told a story about the last blackout, when Jordan was only four.", zh: "爸爸讲起上次停电，那时乔丹才四岁。" },
      ],
      [
        { en: "Jordan had been frightened then. Tonight he felt useful.", zh: "那时乔丹很害怕。今晚他觉得自己有用。" },
        { en: "He poured water into glasses so no one would open the fridge again.", zh: "他把水倒进杯子，这样就不会再打开冰箱。" },
        { en: "Mom said that was thinking ahead, which sounded like a grown-up compliment.", zh: "妈妈说那是提前想好，听起来像大人的夸奖。" },
      ],
      [
        { en: "When the lights slammed back on, everyone blinked and laughed.", zh: "灯猛地亮起来时，大家都眨眼睛，笑了。" },
        { en: "The house looked the same, but Jordan did not quite feel the same.", zh: "房子还是老样子，乔丹却不完全是老样子。" },
        { en: "He had learned that darkness is heavy, and also that people can carry it together.", zh: "他明白了：黑暗很沉，可人们可以一起扛。" },
      ],
    ],
    questions: [
      { q: "What did Jordan do to help?", options: ["He poured water so no one would open the fridge", "He fixed the power lines", "He drove the car"], answer: 0 },
      { q: "How did Jordan feel during this blackout?", options: ["Useful", "Angry at Mom", "Bored of candles"], answer: 0 },
    ],
  },
  {
    id: "b3-letter",
    level: 3,
    title: "A Letter Across the Ocean",
    titleZh: "一封越过海洋的信",
    summary: "Two pen pals compare their cities and wait for a slow reply.",
    tags: ["笔友", "世界", "写信", "letter", "pen pal", "ocean", "world"],
    aliases: ["pen friend", "penpal", "letter", "england"],
    pages: [
      [
        { en: "Mei wrote slowly, because a letter cannot be deleted like a message.", zh: "梅写得很慢，因为信不能像消息一样删掉。" },
        { en: "She told Paul about the morning market, the steam, and the shouting prices.", zh: "她给保罗讲早市、热气，还有喊出来的价钱。" },
        { en: "Then she asked a careful question: What does rain sound like on your street?", zh: "然后她小心问了一个问题：你们街上的雨是什么声音？" },
      ],
      [
        { en: "Weeks later a thin envelope arrived, stamped and a little bent.", zh: "几周后，一封薄薄的信封到了，盖着戳，还有点折。" },
        { en: "Paul said London rain tapped like fingers on a drum.", zh: "保罗说，伦敦的雨像手指敲鼓。" },
        { en: "He drew a red bus in the margin and spelled Mei's name with extra letters.", zh: "他在页边画了一辆红巴士，还把梅的名字多拼了几个字母。" },
      ],
      [
        { en: "Mei did not mind the spelling. She minded the waiting, and then she didn't.", zh: "梅不在乎拼写。她在乎等待，后来又不那么在乎了。" },
        { en: "Waiting made the words feel heavier, as if they had traveled on purpose.", zh: "等待让那些字更沉，像是特意走了一趟远路。" },
        { en: "She walked to the post office with her reply and felt older by a block.", zh: "她拿着回信走向邮局，才走一条街，就觉得自己大了一点。" },
      ],
      [
        { en: "The clerk stamped the letter as if it were ordinary.", zh: "职员给信盖戳，好像这是平常事。" },
        { en: "To Mei it was a small boat, crossing a huge, invisible ocean.", zh: "对梅来说，它是一条小船，要穿过看不见的大洋。" },
        { en: "She decided the world is far, and also close enough to answer.", zh: "她觉得世界很远，却也近到能够回答。" },
      ],
    ],
    questions: [
      { q: "Why did Mei write slowly?", options: ["A letter cannot be deleted like a message", "She had no pen", "Paul asked her to hurry"], answer: 0 },
      { q: "What did Paul say London rain sounded like?", options: ["Fingers on a drum", "A roaring train", "Nothing at all"], answer: 0 },
    ],
  },
  {
    id: "b3-river",
    level: 3,
    title: "The River Path",
    titleZh: "河边小路",
    summary: "A hiking trip goes wrong, and the kids use a map and calm thinking.",
    tags: ["冒险", "地图", "徒步", "adventure", "river", "map", "hike"],
    aliases: ["hike", "forest", "lost", "camping", "冒险"],
    pages: [
      [
        { en: "The river path was supposed to be easy. The sign even used the word gentle.", zh: "河边小路本该很容易。牌子上甚至写着“平缓”。" },
        { en: "After an hour the path split, and the map in Kenji's pocket suddenly mattered.", zh: "一小时后小路分叉了，健司口袋里的地图突然变得重要。" },
        { en: "Maya wanted to follow the louder water. Kenji wanted the marked trail.", zh: "玛雅想跟着更响的水走。健司想走标出来的路。" },
      ],
      [
        { en: "They argued, then stopped, because arguing does not choose a path.", zh: "他们吵了几句又停下，因为吵架选不出路。" },
        { en: "Kenji unfolded the map and put his finger on the fork they could see.", zh: "健司打开地图，把手指放在眼前这个分叉上。" },
        { en: "\"If we are here, the loud water is a waterfall, not the way home.\"", zh: "“如果我们在这里，那响水是瀑布，不是回家的路。”" },
      ],
      [
        { en: "Maya was disappointed, then relieved. She hated being lost more than being wrong.", zh: "玛雅先是失望，接着松了口气。比起出错，她更讨厌迷路。" },
        { en: "They took the quieter trail and found the wooden bridge from the picture.", zh: "他们走更安静的那条，找到了照片里的木桥。" },
        { en: "On the other side, their parents were not angry. They were proud, which felt stranger.", zh: "桥对面，父母没有生气。他们觉得骄傲，这感觉更奇怪。" },
      ],
      [
        { en: "That night Maya wrote in her journal: maps are not magic, but they are close.", zh: "夜里玛雅在日记里写：地图不是魔法，但已经很接近了。" },
        { en: "Kenji added a sentence underneath, because he always added a sentence.", zh: "健司在下面又加了一句，因为他总爱加一句。" },
        { en: "\"The brave part was stopping to think.\"", zh: "“勇敢的部分，是停下来想一想。”" },
      ],
    ],
    questions: [
      { q: "Why didn't they follow the louder water?", options: ["The map showed it was a waterfall", "They heard a bear", "It was getting dark"], answer: 0 },
      { q: "What did Kenji say was the brave part?", options: ["Stopping to think", "Running faster", "Hiding the map"], answer: 0 },
    ],
  },
];

const DICTATION_SETS = [
  {
    id: "d1-words",
    level: 1,
    kind: "单词",
    title: "三年级浅·单词",
    titleZh: "enough, through, thought",
    tags: ["单词", "听写", "words"],
    items: [
      { play: "enough", answer: "enough", hint: "足够的" },
      { play: "through", answer: "through", hint: "穿过" },
      { play: "thought", answer: "thought", hint: "想；想法" },
      { play: "remember", answer: "remember", hint: "记住" },
      { play: "suddenly", answer: "suddenly", hint: "突然" },
      { play: "instead", answer: "instead", hint: "反而，作为替代" },
    ],
  },
  {
    id: "d1-sentences",
    level: 1,
    kind: "句子",
    title: "三年级浅·句子",
    titleZh: "短一点的完整句子",
    tags: ["句子", "听写"],
    items: [
      { play: "She thought the box was on the bus.", answer: "She thought the box was on the bus.", hint: "她以为盒子在公交车上。" },
      { play: "He waited long enough.", answer: "He waited long enough.", hint: "他等得够久了。" },
      { play: "They walked through the trees.", answer: "They walked through the trees.", hint: "他们穿过树林。" },
      { play: "I remember your promise.", answer: "I remember your promise.", hint: "我记得你的承诺。" },
    ],
  },
  {
    id: "d2-words",
    level: 2,
    kind: "单词",
    title: "三年级·单词",
    titleZh: "discover, although, nervous",
    tags: ["单词", "听写"],
    items: [
      { play: "discover", answer: "discover", hint: "发现" },
      { play: "although", answer: "although", hint: "虽然" },
      { play: "nervous", answer: "nervous", hint: "紧张的" },
      { play: "explain", answer: "explain", hint: "解释" },
      { play: "adventure", answer: "adventure", hint: "冒险" },
      { play: "believe", answer: "believe", hint: "相信" },
    ],
  },
  {
    id: "d2-sentences",
    level: 2,
    kind: "句子",
    title: "三年级·句子",
    titleZh: "带一点原因和转折",
    tags: ["句子", "听写"],
    items: [
      { play: "Although she was nervous, she explained the problem.", answer: "Although she was nervous, she explained the problem.", hint: "虽然她紧张，她还是解释了问题。" },
      { play: "Marco decided to pass the ball.", answer: "Marco decided to pass the ball.", hint: "马尔科决定传球。" },
      { play: "They discovered a print in the mud.", answer: "They discovered a print in the mud.", hint: "他们在泥里发现了一个脚印。" },
      { play: "I believe you can finish it.", answer: "I believe you can finish it.", hint: "我相信你能做完。" },
    ],
  },
  {
    id: "d3-words",
    level: 3,
    kind: "单词",
    title: "三年级深·单词",
    titleZh: "determined, mysterious, disappointed",
    tags: ["单词", "听写"],
    items: [
      { play: "determined", answer: "determined", hint: "下定决心的" },
      { play: "mysterious", answer: "mysterious", hint: "神秘的" },
      { play: "disappointed", answer: "disappointed", hint: "失望的" },
      { play: "curious", answer: "curious", hint: "好奇的" },
      { play: "enormous", answer: "enormous", hint: "巨大的" },
      { play: "especially", answer: "especially", hint: "尤其" },
    ],
  },
  {
    id: "d3-sentences",
    level: 3,
    kind: "句子",
    title: "三年级深·句子",
    titleZh: "更长，要想一下再写",
    tags: ["句子", "听写"],
    items: [
      { play: "She was determined to find the keys before dinner.", answer: "She was determined to find the keys before dinner.", hint: "她下定决心要在晚饭前找到钥匙。" },
      { play: "The print looked mysterious in the soft mud.", answer: "The print looked mysterious in the soft mud.", hint: "那个脚印在软泥里看起来很神秘。" },
      { play: "He felt disappointed, and also more curious than before.", answer: "He felt disappointed, and also more curious than before.", hint: "他感到失望，却也比以前更好奇。" },
      { play: "Maps are not magic, but they are close.", answer: "Maps are not magic, but they are close.", hint: "地图不是魔法，但已经很接近了。" },
    ],
  },
];
