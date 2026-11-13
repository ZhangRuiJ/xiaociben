/* 十日闯关：IP 人物 + 分阶段主题
   每天听、读、对话、写、练；首次通关得 10 分。 */

const QUEST_CHARS = {
  pip: {
    id: "pip",
    name: "Pip",
    nameZh: "皮皮",
    role: "狐狸侦探",
    emoji: "🦊",
    color: "#e89a3c",
    hello: "Hi! I am Pip. Let's find clues together!",
    helloZh: "嗨！我是皮皮。我们一起找线索吧！",
  },
  ollie: {
    id: "ollie",
    name: "Ollie",
    nameZh: "奥利",
    role: "猫头鹰老师",
    emoji: "🦉",
    color: "#5b6bc0",
    hello: "Hello. I am Ollie. We can learn slowly.",
    helloZh: "你好。我是奥利。我们可以慢慢学。",
  },
  sunny: {
    id: "sunny",
    name: "Sunny",
    nameZh: "桑尼",
    role: "海豹伙伴",
    emoji: "🦭",
    color: "#2f9bb5",
    hello: "Hey! I am Sunny. Want to go to the harbor?",
    helloZh: "嘿！我是桑尼。要不要去港口玩？",
  },
};

const QUEST_RANKS = [
  { min: 0, id: "starter", nameZh: "新手上路", name: "Starter" },
  { min: 20, id: "explorer", nameZh: "小小探索者", name: "Explorer" },
  { min: 40, id: "talker", nameZh: "对话小能手", name: "Talker" },
  { min: 70, id: "champ", nameZh: "闯关达人", name: "Champion" },
  { min: 100, id: "hero", nameZh: "十日小冠军", name: "Ten-Day Hero" },
];

const QUEST_STAGES = [
  { id: 1, titleZh: "认识彼此", title: "Meet Friends", days: [1, 2, 3] },
  { id: 2, titleZh: "生活小场景", title: "Daily Life", days: [4, 5, 6, 7] },
  { id: 3, titleZh: "表达自己", title: "Share Ideas", days: [8, 9, 10] },
];

function qListen(lines, questions) {
  return { type: "listen", titleZh: "听一听", title: "Listen", lines, questions };
}

function qRead(lines, questions) {
  return { type: "read", titleZh: "读一读", title: "Read", lines, questions };
}

function qChat(turns) {
  return { type: "chat", titleZh: "和伙伴对话", title: "Chat", turns };
}

function qWrite(items) {
  return { type: "write", titleZh: "写一写", title: "Write", items };
}

function qPractice(questions) {
  return { type: "practice", titleZh: "练一练", title: "Practice", questions };
}

const QUEST_DAYS = [
  {
    id: 1,
    title: "Introduce Yourself",
    titleZh: "介绍自己",
    stage: 1,
    guide: "pip",
    buddy: "ollie",
    tipZh: "今天学会用简单句子介绍名字、年龄和学校。",
    steps: [
      qListen(
        [
          { who: "pip", en: "Hi! My name is Pip.", zh: "嗨！我叫皮皮。" },
          { who: "ollie", en: "Hello, Pip. I am Ollie.", zh: "你好，皮皮。我是奥利。" },
          { who: "pip", en: "I am nine years old. I go to River School.", zh: "我九岁。我在里弗学校上学。" },
        ],
        [
          { q: "What is Pip's name?", options: ["Ollie", "Pip", "Sunny"], answer: 1 },
          { q: "How old is Pip?", options: ["Eight", "Nine", "Ten"], answer: 1 },
        ],
      ),
      qRead(
        [
          { who: "ollie", en: "Nice to meet you.", zh: "很高兴认识你。" },
          { who: "pip", en: "Nice to meet you, too.", zh: "我也很高兴认识你。" },
          { who: "you", en: "My name is ___. I am a student.", zh: "我叫___。我是学生。" },
        ],
        [
          { q: "What does \"Nice to meet you\" mean?", options: ["再见", "很高兴认识你", "对不起"], answer: 1 },
          { q: "Who says \"Nice to meet you, too\"?", options: ["Pip", "Ollie", "Sunny"], answer: 0 },
        ],
      ),
      qChat([
        { who: "pip", en: "Hi! What is your name?", zh: "嗨！你叫什么名字？", promptZh: "选一句回答皮皮" },
        {
          choices: [
            { en: "My name is Lin.", zh: "我叫林。", ok: true },
            { en: "I like apples.", zh: "我喜欢苹果。", ok: false },
            { en: "Where is the bus?", zh: "公交车在哪？", ok: false },
          ],
        },
        { who: "pip", en: "Cool! Are you a student?", zh: "酷！你是学生吗？", promptZh: "继续回答" },
        {
          choices: [
            { en: "Yes, I am a student.", zh: "是的，我是学生。", ok: true },
            { en: "It is raining.", zh: "在下雨。", ok: false },
            { en: "Two dollars, please.", zh: "请给我两美元。", ok: false },
          ],
        },
        { who: "pip", en: "Great! Let's practice more.", zh: "太好了！我们再练练。" },
      ]),
      qWrite([
        { play: "My name is Pip.", answer: "My name is Pip.", hint: "我叫皮皮。" },
        { play: "Nice to meet you.", answer: "Nice to meet you.", hint: "很高兴认识你。" },
        { play: "I am a student.", answer: "I am a student.", hint: "我是学生。" },
      ]),
      qPractice([
        { ask: "介绍自己可以说：", options: ["My name is Lin.", "How much is it?", "Turn left."], answer: 0 },
        { ask: "\"I am nine years old.\" 的意思是：", options: ["我九岁。", "我在学校。", "我喜欢跑。"], answer: 0 },
        { ask: "对方说 Nice to meet you，你可以回：", options: ["Nice to meet you, too.", "Good night.", "Open the door."], answer: 0 },
      ]),
    ],
  },
  {
    id: 2,
    title: "Family and Friends",
    titleZh: "家人和朋友",
    stage: 1,
    guide: "ollie",
    buddy: "pip",
    tipZh: "说说家里有谁，谁是你的好朋友。",
    steps: [
      qListen(
        [
          { who: "ollie", en: "This is my sister. Her name is May.", zh: "这是我妹妹。她叫梅。" },
          { who: "pip", en: "I have a brother. He is tall.", zh: "我有一个哥哥。他很高。" },
          { who: "ollie", en: "My best friend is Pip.", zh: "我最好的朋友是皮皮。" },
        ],
        [
          { q: "Who is May?", options: ["Pip's brother", "Ollie's sister", "Sunny's aunt"], answer: 1 },
          { q: "Who is Ollie's best friend?", options: ["May", "Pip", "Lin"], answer: 1 },
        ],
      ),
      qRead(
        [
          { who: "pip", en: "Do you have a brother or a sister?", zh: "你有哥哥/弟弟或姐姐/妹妹吗？" },
          { who: "you", en: "I have one brother.", zh: "我有一个哥哥/弟弟。" },
          { who: "pip", en: "He sounds nice!", zh: "听起来他人很好！" },
        ],
        [
          { q: "\"best friend\" means:", options: ["最好的朋友", "新书包", "大桌子"], answer: 0 },
          { q: "Pip asks about:", options: ["food", "family", "weather"], answer: 1 },
        ],
      ),
      qChat([
        { who: "ollie", en: "Who lives with you?", zh: "谁和你住在一起？", promptZh: "选一句回答奥利" },
        {
          choices: [
            { en: "I live with my mom and dad.", zh: "我和妈妈爸爸住在一起。", ok: true },
            { en: "I want a sandwich.", zh: "我想要三明治。", ok: false },
            { en: "The bike is yellow.", zh: "自行车是黄色的。", ok: false },
          ],
        },
        { who: "ollie", en: "Do you have a good friend?", zh: "你有好朋友吗？", promptZh: "继续回答" },
        {
          choices: [
            { en: "Yes. My friend is kind.", zh: "有。我的朋友很友善。", ok: true },
            { en: "It costs five dollars.", zh: "要五美元。", ok: false },
            { en: "Close the window.", zh: "关上窗户。", ok: false },
          ],
        },
        { who: "ollie", en: "Friends help us feel brave.", zh: "朋友让我们更勇敢。" },
      ]),
      qWrite([
        { play: "This is my sister.", answer: "This is my sister.", hint: "这是我妹妹。" },
        { play: "I have a brother.", answer: "I have a brother.", hint: "我有一个哥哥/弟弟。" },
        { play: "My best friend is kind.", answer: "My best friend is kind.", hint: "我最好的朋友很友善。" },
      ]),
      qPractice([
        { ask: "介绍家人可以说：", options: ["This is my mom.", "Where is the shop?", "I am cold."], answer: 0 },
        { ask: "\"He is tall.\" 的意思是：", options: ["他很高。", "他很饿。", "他很快。"], answer: 0 },
        { ask: "朋友可以用哪个词？", options: ["friend", "price", "cloud"], answer: 0 },
      ]),
    ],
  },
  {
    id: 3,
    title: "School Day",
    titleZh: "学校生活",
    stage: 1,
    guide: "pip",
    buddy: "sunny",
    tipZh: "说说课、作业和操场上的事。",
    steps: [
      qListen(
        [
          { who: "pip", en: "I have math in the morning.", zh: "我上午有数学课。" },
          { who: "sunny", en: "After lunch we play on the playground.", zh: "午饭后我们在操场玩。" },
          { who: "pip", en: "Please open your book to page ten.", zh: "请把书翻到第十页。" },
        ],
        [
          { q: "When does Pip have math?", options: ["At night", "In the morning", "On Sunday"], answer: 1 },
          { q: "Where do they play after lunch?", options: ["Library", "Harbor", "Playground"], answer: 2 },
        ],
      ),
      qRead(
        [
          { who: "sunny", en: "Did you finish your homework?", zh: "你作业做完了吗？" },
          { who: "pip", en: "Yes. It was not too hard.", zh: "做完了。不太难。" },
          { who: "sunny", en: "Great! Let's go to class.", zh: "太好了！我们去上课吧。" },
        ],
        [
          { q: "\"homework\" means:", options: ["作业", "晚饭", "雨伞"], answer: 0 },
          { q: "Was the homework hard?", options: ["Very hard", "Not too hard", "Impossible"], answer: 1 },
        ],
      ),
      qChat([
        { who: "sunny", en: "What class do you like?", zh: "你喜欢哪门课？", promptZh: "回答桑尼" },
        {
          choices: [
            { en: "I like English class.", zh: "我喜欢英语课。", ok: true },
            { en: "Give me the change.", zh: "找我零钱。", ok: false },
            { en: "The seal is swimming.", zh: "海豹在游泳。", ok: false },
          ],
        },
        { who: "sunny", en: "Do you have homework today?", zh: "你今天有作业吗？", promptZh: "继续回答" },
        {
          choices: [
            { en: "Yes, I have a little homework.", zh: "有，作业不多。", ok: true },
            { en: "How much is this bag?", zh: "这个包多少钱？", ok: false },
            { en: "Turn right at the park.", zh: "在公园右转。", ok: false },
          ],
        },
        { who: "sunny", en: "We can finish it after school.", zh: "我们可以放学后再做完。" },
      ]),
      qWrite([
        { play: "I have math in the morning.", answer: "I have math in the morning.", hint: "我上午有数学课。" },
        { play: "Open your book.", answer: "Open your book.", hint: "打开你的书。" },
        { play: "I like English class.", answer: "I like English class.", hint: "我喜欢英语课。" },
      ]),
      qPractice([
        { ask: "操场用英语说：", options: ["playground", "kitchen", "ticket"], answer: 0 },
        { ask: "\"Please open your book.\" 是：", options: ["请打开书。", "请坐下。", "请走开。"], answer: 0 },
        { ask: "问作业可以说：", options: ["Did you finish your homework?", "Is it sunny?", "How much?"], answer: 0 },
      ]),
    ],
  },
  {
    id: 4,
    title: "Buying and Selling",
    titleZh: "买卖东西",
    stage: 2,
    guide: "sunny",
    buddy: "pip",
    tipZh: "学会问价格、付钱和找零。",
    steps: [
      qListen(
        [
          { who: "sunny", en: "How much is this apple?", zh: "这个苹果多少钱？" },
          { who: "pip", en: "It is one dollar.", zh: "一美元。" },
          { who: "sunny", en: "I will take two, please.", zh: "请给我两个。" },
        ],
        [
          { q: "How much is one apple?", options: ["One dollar", "Two dollars", "Free"], answer: 0 },
          { q: "How many apples does Sunny want?", options: ["One", "Two", "Three"], answer: 1 },
        ],
      ),
      qRead(
        [
          { who: "pip", en: "Here is five dollars.", zh: "这是五美元。" },
          { who: "sunny", en: "Your change is three dollars.", zh: "找你三美元。" },
          { who: "pip", en: "Thank you!", zh: "谢谢！" },
        ],
        [
          { q: "\"change\" here means:", options: ["零钱", "换衣服", "改变主意"], answer: 0 },
          { q: "Pip pays with:", options: ["three dollars", "five dollars", "ten dollars"], answer: 1 },
        ],
      ),
      qChat([
        { who: "sunny", en: "Welcome! What would you like?", zh: "欢迎！你想要什么？", promptZh: "在小店里回答" },
        {
          choices: [
            { en: "I would like a pencil, please.", zh: "我想要一支铅笔。", ok: true },
            { en: "I am nine years old.", zh: "我九岁。", ok: false },
            { en: "My sister is tall.", zh: "我妹妹很高。", ok: false },
          ],
        },
        { who: "sunny", en: "It is two dollars. Is that OK?", zh: "两美元。可以吗？", promptZh: "继续" },
        {
          choices: [
            { en: "Yes. Here you are.", zh: "可以。给你。", ok: true },
            { en: "Open page ten.", zh: "打开第十页。", ok: false },
            { en: "I live near the park.", zh: "我住公园附近。", ok: false },
          ],
        },
        { who: "sunny", en: "Thanks for shopping!", zh: "谢谢惠顾！" },
      ]),
      qWrite([
        { play: "How much is this?", answer: "How much is this?", hint: "这个多少钱？" },
        { play: "I will take two, please.", answer: "I will take two, please.", hint: "请给我两个。" },
        { play: "Here is five dollars.", answer: "Here is five dollars.", hint: "这是五美元。" },
      ]),
      qPractice([
        { ask: "问价格可以说：", options: ["How much is this?", "Who are you?", "What time is it?"], answer: 0 },
        { ask: "\"Your change is three dollars.\" 意思是：", options: ["找你三美元。", "你欠三美元。", "一共三美元。"], answer: 0 },
        { ask: "买东西时礼貌地说：", options: ["..., please.", "Go away.", "Stop."], answer: 0 },
      ]),
    ],
  },
  {
    id: 5,
    title: "Food and Ordering",
    titleZh: "点餐与食物",
    stage: 2,
    guide: "pip",
    buddy: "sunny",
    tipZh: "点喜欢吃的，说饿了或吃饱了。",
    steps: [
      qListen(
        [
          { who: "pip", en: "I am hungry. Let's get lunch.", zh: "我饿了。我们去吃午饭吧。" },
          { who: "sunny", en: "I would like a sandwich and milk.", zh: "我想要三明治和牛奶。" },
          { who: "pip", en: "Me too. It smells good!", zh: "我也是。闻起来真香！" },
        ],
        [
          { q: "How does Pip feel?", options: ["Cold", "Hungry", "Sleepy"], answer: 1 },
          { q: "What does Sunny want?", options: ["Soup only", "Sandwich and milk", "Candy"], answer: 1 },
        ],
      ),
      qRead(
        [
          { who: "sunny", en: "Do you want rice or noodles?", zh: "你想要米饭还是面条？" },
          { who: "pip", en: "Noodles, please. Not too hot.", zh: "面条，请。不要太烫。" },
          { who: "sunny", en: "OK. Enjoy your meal!", zh: "好。用餐愉快！" },
        ],
        [
          { q: "Pip chooses:", options: ["rice", "noodles", "cake"], answer: 1 },
          { q: "\"Enjoy your meal\" means:", options: ["用餐愉快", "快点走", "付钱吧"], answer: 0 },
        ],
      ),
      qChat([
        { who: "sunny", en: "What do you want to eat?", zh: "你想吃什么？", promptZh: "点餐" },
        {
          choices: [
            { en: "I would like some noodles, please.", zh: "我想要一些面条。", ok: true },
            { en: "My name is Pip.", zh: "我叫皮皮。", ok: false },
            { en: "The playground is big.", zh: "操场很大。", ok: false },
          ],
        },
        { who: "sunny", en: "Anything to drink?", zh: "喝点什么吗？", promptZh: "继续" },
        {
          choices: [
            { en: "Water, please.", zh: "水，谢谢。", ok: true },
            { en: "I have a brother.", zh: "我有哥哥。", ok: false },
            { en: "Turn left.", zh: "向左转。", ok: false },
          ],
        },
        { who: "sunny", en: "Coming right up!", zh: "马上就来！" },
      ]),
      qWrite([
        { play: "I am hungry.", answer: "I am hungry.", hint: "我饿了。" },
        { play: "I would like a sandwich.", answer: "I would like a sandwich.", hint: "我想要一个三明治。" },
        { play: "Water, please.", answer: "Water, please.", hint: "请给我水。" },
      ]),
      qPractice([
        { ask: "饿了可以说：", options: ["I am hungry.", "I am late.", "I am ready."], answer: 0 },
        { ask: "点餐礼貌说法：", options: ["I would like ..., please.", "Give me now!", "No talk."], answer: 0 },
        { ask: "\"milk\" 是：", options: ["牛奶", "盐", "纸"], answer: 0 },
      ]),
    ],
  },
  {
    id: 6,
    title: "Asking the Way",
    titleZh: "问路与方向",
    stage: 2,
    guide: "ollie",
    buddy: "sunny",
    tipZh: "学会问路，听懂左转、右转和直行。",
    steps: [
      qListen(
        [
          { who: "sunny", en: "Excuse me. Where is the library?", zh: "打扰一下。图书馆在哪里？" },
          { who: "ollie", en: "Go straight. Then turn left.", zh: "一直走。然后左转。" },
          { who: "sunny", en: "Is it far from here?", zh: "离这里远吗？" },
          { who: "ollie", en: "No. It is near the park.", zh: "不远。就在公园附近。" },
        ],
        [
          { q: "Sunny is looking for the:", options: ["library", "harbor", "shop"], answer: 0 },
          { q: "Ollie says to:", options: ["turn right", "go straight, then turn left", "stop"], answer: 1 },
        ],
      ),
      qRead(
        [
          { who: "ollie", en: "The school is across the street.", zh: "学校在街对面。" },
          { who: "sunny", en: "Thank you for your help.", zh: "谢谢你的帮助。" },
          { who: "ollie", en: "You are welcome.", zh: "不客气。" },
        ],
        [
          { q: "\"across the street\" means:", options: ["街对面", "地下", "很远的山"], answer: 0 },
          { q: "How does Sunny reply after help?", options: ["Thank you", "Go away", "How much"], answer: 0 },
        ],
      ),
      qChat([
        { who: "ollie", en: "Can I help you?", zh: "我能帮你吗？", promptZh: "问路" },
        {
          choices: [
            { en: "Yes. Where is the bus stop?", zh: "是的。公交站在哪？", ok: true },
            { en: "I want two apples.", zh: "我要两个苹果。", ok: false },
            { en: "I am a student.", zh: "我是学生。", ok: false },
          ],
        },
        { who: "ollie", en: "Turn right at the next corner.", zh: "在下一个拐角右转。", promptZh: "确认听懂" },
        {
          choices: [
            { en: "OK. Turn right. Thanks!", zh: "好。右转。谢谢！", ok: true },
            { en: "I am hungry.", zh: "我饿了。", ok: false },
            { en: "This is my sister.", zh: "这是我妹妹。", ok: false },
          ],
        },
        { who: "ollie", en: "Have a safe walk!", zh: "一路平安！" },
      ]),
      qWrite([
        { play: "Where is the library?", answer: "Where is the library?", hint: "图书馆在哪里？" },
        { play: "Go straight.", answer: "Go straight.", hint: "一直走。" },
        { play: "Turn left.", answer: "Turn left.", hint: "向左转。" },
      ]),
      qPractice([
        { ask: "打扰一下可以说：", options: ["Excuse me.", "Shut up.", "Come here."], answer: 0 },
        { ask: "\"near\" 的意思是：", options: ["附近", "很贵", "很热"], answer: 0 },
        { ask: "感谢帮助后对方常说：", options: ["You are welcome.", "How much?", "I am nine."], answer: 0 },
      ]),
    ],
  },
  {
    id: 7,
    title: "Weather and Clothes",
    titleZh: "天气与衣服",
    stage: 2,
    guide: "sunny",
    buddy: "ollie",
    tipZh: "看天气，选对衣服。",
    steps: [
      qListen(
        [
          { who: "sunny", en: "It is sunny today. Let's go out!", zh: "今天晴天。我们出去吧！" },
          { who: "ollie", en: "Wear a hat. The sun is strong.", zh: "戴帽子。太阳很烈。" },
          { who: "sunny", en: "If it rains, take an umbrella.", zh: "如果下雨，就带伞。" },
        ],
        [
          { q: "How is the weather?", options: ["Snowy", "Sunny", "Windy only"], answer: 1 },
          { q: "What should you take if it rains?", options: ["A ball", "An umbrella", "A bat"], answer: 1 },
        ],
      ),
      qRead(
        [
          { who: "ollie", en: "It is cold. Put on your coat.", zh: "天冷。穿上外套。" },
          { who: "sunny", en: "These shoes are warm.", zh: "这双鞋很暖和。" },
          { who: "ollie", en: "Good. Now we can walk to school.", zh: "好。我们现在可以走路去学校了。" },
        ],
        [
          { q: "\"Put on your coat\" means:", options: ["穿上外套", "脱掉外套", "洗外套"], answer: 0 },
          { q: "Why put on a coat?", options: ["It is cold", "It is hot", "It is lunch"], answer: 0 },
        ],
      ),
      qChat([
        { who: "sunny", en: "How is the weather now?", zh: "现在天气怎么样？", promptZh: "回答桑尼" },
        {
          choices: [
            { en: "It is cloudy and a little cold.", zh: "多云，有点冷。", ok: true },
            { en: "How much is the pencil?", zh: "铅笔多少钱？", ok: false },
            { en: "Open your book.", zh: "打开书。", ok: false },
          ],
        },
        { who: "sunny", en: "What will you wear?", zh: "你要穿什么？", promptZh: "继续" },
        {
          choices: [
            { en: "I will wear a coat and shoes.", zh: "我会穿外套和鞋子。", ok: true },
            { en: "I will take two apples.", zh: "我要买两个苹果。", ok: false },
            { en: "Turn right, please.", zh: "请右转。", ok: false },
          ],
        },
        { who: "sunny", en: "Perfect. Ready for a walk!", zh: "完美。准备去散步！" },
      ]),
      qWrite([
        { play: "It is sunny today.", answer: "It is sunny today.", hint: "今天晴天。" },
        { play: "Put on your coat.", answer: "Put on your coat.", hint: "穿上你的外套。" },
        { play: "Take an umbrella.", answer: "Take an umbrella.", hint: "带一把伞。" },
      ]),
      qPractice([
        { ask: "下雨可以说：", options: ["It is raining.", "It is a book.", "It is my mom."], answer: 0 },
        { ask: "\"umbrella\" 是：", options: ["伞", "帽子", "手套"], answer: 0 },
        { ask: "天冷要：", options: ["Put on a coat", "Take off a coat", "Buy a bike"], answer: 0 },
      ]),
    ],
  },
  {
    id: 8,
    title: "Hobbies and Weekend",
    titleZh: "爱好与周末",
    stage: 3,
    guide: "pip",
    buddy: "ollie",
    tipZh: "说说喜欢做什么，周末怎么过。",
    steps: [
      qListen(
        [
          { who: "pip", en: "On weekends I ride my bike.", zh: "周末我骑自行车。" },
          { who: "ollie", en: "I like to read stories.", zh: "我喜欢读故事。" },
          { who: "pip", en: "Sometimes we play baseball together.", zh: "有时我们一起打棒球。" },
        ],
        [
          { q: "What does Pip do on weekends?", options: ["Sleeps all day", "Rides a bike", "Sells apples"], answer: 1 },
          { q: "What does Ollie like?", options: ["Reading stories", "Fixing cars", "Cooking oil"], answer: 0 },
        ],
      ),
      qRead(
        [
          { who: "ollie", en: "What is your hobby?", zh: "你的爱好是什么？" },
          { who: "pip", en: "My hobby is drawing maps.", zh: "我的爱好是画地图。" },
          { who: "ollie", en: "That is a fun hobby!", zh: "那真是有趣的爱好！" },
        ],
        [
          { q: "\"hobby\" means:", options: ["爱好", "作业", "天气"], answer: 0 },
          { q: "Pip's hobby is:", options: ["drawing maps", "selling coats", "asking the way"], answer: 0 },
        ],
      ),
      qChat([
        { who: "pip", en: "What do you like to do?", zh: "你喜欢做什么？", promptZh: "谈爱好" },
        {
          choices: [
            { en: "I like playing soccer.", zh: "我喜欢踢足球。", ok: true },
            { en: "How much is this?", zh: "这个多少钱？", ok: false },
            { en: "Go straight.", zh: "一直走。", ok: false },
          ],
        },
        { who: "pip", en: "What about this weekend?", zh: "这个周末呢？", promptZh: "继续" },
        {
          choices: [
            { en: "I will visit my grandma.", zh: "我会去看望奶奶。", ok: true },
            { en: "Your change is two dollars.", zh: "找你两美元。", ok: false },
            { en: "Put on your coat.", zh: "穿上外套。", ok: false },
          ],
        },
        { who: "pip", en: "Sounds wonderful!", zh: "听起来真棒！" },
      ]),
      qWrite([
        { play: "What is your hobby?", answer: "What is your hobby?", hint: "你的爱好是什么？" },
        { play: "I like reading stories.", answer: "I like reading stories.", hint: "我喜欢读故事。" },
        { play: "On weekends I ride my bike.", answer: "On weekends I ride my bike.", hint: "周末我骑自行车。" },
      ]),
      qPractice([
        { ask: "问爱好可以说：", options: ["What is your hobby?", "How much?", "Where is it?"], answer: 0 },
        { ask: "\"weekend\" 是：", options: ["周末", "星期一", "半夜"], answer: 0 },
        { ask: "一起玩可以说：", options: ["together", "umbrella", "change"], answer: 0 },
      ]),
    ],
  },
  {
    id: 9,
    title: "Feelings and Ideas",
    titleZh: "感觉与想法",
    stage: 3,
    guide: "ollie",
    buddy: "sunny",
    tipZh: "用简单句子说出开心、紧张或需要帮助。",
    steps: [
      qListen(
        [
          { who: "sunny", en: "I feel happy when I help others.", zh: "帮助别人时我感到开心。" },
          { who: "ollie", en: "I feel nervous before a test.", zh: "考试前我会紧张。" },
          { who: "sunny", en: "It is OK. Take a deep breath.", zh: "没关系。深呼吸一下。" },
        ],
        [
          { q: "When does Sunny feel happy?", options: ["When helping others", "When losing", "When raining only"], answer: 0 },
          { q: "Ollie feels nervous:", options: ["after lunch", "before a test", "at the harbor"], answer: 1 },
        ],
      ),
      qRead(
        [
          { who: "ollie", en: "I think we can do this.", zh: "我觉得我们能做到。" },
          { who: "sunny", en: "I agree. Let's try again.", zh: "我同意。我们再试一次。" },
          { who: "ollie", en: "If you need help, tell me.", zh: "如果你需要帮助，告诉我。" },
        ],
        [
          { q: "\"I agree\" means:", options: ["我同意", "我反对", "我不知道"], answer: 0 },
          { q: "Ollie says you can:", options: ["hide", "ask for help", "quit forever"], answer: 1 },
        ],
      ),
      qChat([
        { who: "ollie", en: "How do you feel today?", zh: "你今天感觉怎么样？", promptZh: "说说感觉" },
        {
          choices: [
            { en: "I feel a little tired, but OK.", zh: "我有点累，但还好。", ok: true },
            { en: "It is two dollars.", zh: "两美元。", ok: false },
            { en: "Turn left at the park.", zh: "在公园左转。", ok: false },
          ],
        },
        { who: "ollie", en: "Do you need help with English?", zh: "英语需要帮忙吗？", promptZh: "继续" },
        {
          choices: [
            { en: "Yes, please. Can you help me?", zh: "好的。你能帮我吗？", ok: true },
            { en: "I will take two apples.", zh: "我要两个苹果。", ok: false },
            { en: "Wear a hat.", zh: "戴帽子。", ok: false },
          ],
        },
        { who: "ollie", en: "Of course. We learn together.", zh: "当然。我们一起学。" },
      ]),
      qWrite([
        { play: "I feel happy.", answer: "I feel happy.", hint: "我感到开心。" },
        { play: "I feel nervous.", answer: "I feel nervous.", hint: "我感到紧张。" },
        { play: "Can you help me?", answer: "Can you help me?", hint: "你能帮我吗？" },
      ]),
      qPractice([
        { ask: "开心可以说：", options: ["I feel happy.", "I feel lost.", "I feel muddy."], answer: 0 },
        { ask: "\"Take a deep breath.\" 意思是：", options: ["深呼吸", "快跑", "关门"], answer: 0 },
        { ask: "请求帮助可以说：", options: ["Can you help me?", "How much is this?", "Go straight."], answer: 0 },
      ]),
    ],
  },
  {
    id: 10,
    title: "Review Quest Day",
    titleZh: "十日总复习",
    stage: 3,
    guide: "pip",
    buddy: "sunny",
    tipZh: "皮皮、奥利、桑尼一起考考你这十天学过的话。",
    steps: [
      qListen(
        [
          { who: "pip", en: "My name is Pip. Nice to meet you.", zh: "我叫皮皮。很高兴认识你。" },
          { who: "sunny", en: "How much is this? I will take two.", zh: "这个多少钱？我要两个。" },
          { who: "ollie", en: "Go straight and turn left.", zh: "一直走，然后左转。" },
        ],
        [
          { q: "Which line is about shopping?", options: ["Nice to meet you", "How much is this?", "I feel happy"], answer: 1 },
          { q: "Which line gives directions?", options: ["Go straight and turn left", "I am hungry", "Wear a hat"], answer: 0 },
        ],
      ),
      qRead(
        [
          { who: "sunny", en: "I am hungry. I would like noodles.", zh: "我饿了。我想要面条。" },
          { who: "pip", en: "It is cold. Put on your coat.", zh: "天冷。穿上外套。" },
          { who: "ollie", en: "I feel nervous, but I can try.", zh: "我紧张，但我可以试试。" },
        ],
        [
          { q: "Who talks about food?", options: ["Sunny", "Pip", "Ollie"], answer: 0 },
          { q: "Who talks about feelings?", options: ["Sunny", "Pip", "Ollie"], answer: 2 },
        ],
      ),
      qChat([
        { who: "pip", en: "Quick quest! Introduce yourself.", zh: "快速闯关！介绍一下自己。", promptZh: "选最合适的" },
        {
          choices: [
            { en: "Hi! My name is Lin. I am a student.", zh: "嗨！我叫林。我是学生。", ok: true },
            { en: "Your change is one dollar.", zh: "找你一美元。", ok: false },
            { en: "Take an umbrella.", zh: "带伞。", ok: false },
          ],
        },
        { who: "sunny", en: "Now buy a book from me!", zh: "现在跟我买一本书！", promptZh: "买卖" },
        {
          choices: [
            { en: "How much is this book, please?", zh: "请问这本书多少钱？", ok: true },
            { en: "I live with my mom.", zh: "我和妈妈住。", ok: false },
            { en: "I like English class.", zh: "我喜欢英语课。", ok: false },
          ],
        },
        { who: "ollie", en: "Last one. Ask for help kindly.", zh: "最后一题。礼貌地求助。", promptZh: "求助" },
        {
          choices: [
            { en: "Excuse me. Can you help me?", zh: "打扰一下。你能帮我吗？", ok: true },
            { en: "Give me that now!", zh: "现在给我！", ok: false },
            { en: "It is sunny today.", zh: "今天晴天。", ok: false },
          ],
        },
        { who: "pip", en: "You did it! Ten days complete!", zh: "你做到了！十天完成！" },
      ]),
      qWrite([
        { play: "Nice to meet you.", answer: "Nice to meet you.", hint: "很高兴认识你。" },
        { play: "How much is this?", answer: "How much is this?", hint: "这个多少钱？" },
        { play: "Can you help me?", answer: "Can you help me?", hint: "你能帮我吗？" },
        { play: "I feel happy.", answer: "I feel happy.", hint: "我感到开心。" },
      ]),
      qPractice([
        { ask: "介绍自己：", options: ["My name is ...", "Turn left.", "Here is change."], answer: 0 },
        { ask: "买卖问价：", options: ["How much is this?", "I feel tired.", "Open page ten."], answer: 0 },
        { ask: "问路开头：", options: ["Excuse me...", "I am hungry.", "Wear a hat."], answer: 0 },
        { ask: "十日闯关完成后，你是：", options: ["十日小冠军候补", "还没开始", "只能买东西"], answer: 0 },
      ]),
    ],
  },
];

function findQuestDay(id) {
  return QUEST_DAYS.find((day) => day.id === Number(id)) || null;
}

function questRankForPoints(points) {
  let current = QUEST_RANKS[0];
  for (const rank of QUEST_RANKS) {
    if (points >= rank.min) current = rank;
  }
  return current;
}

function questStageForDay(dayId) {
  return QUEST_STAGES.find((stage) => stage.days.includes(Number(dayId))) || QUEST_STAGES[0];
}
