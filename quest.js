/* 一日一剧：首页地图每天推出一集
   短剧对话 + 选答 / 连线 / 排句 / 写句小游戏 */

const QUEST_CHARS = {
  pip: {
    id: "pip",
    name: "Pip",
    nameZh: "皮皮",
    role: "狐狸侦探",
    emoji: "🦊",
    color: "#e89a3c",
  },
  ollie: {
    id: "ollie",
    name: "Ollie",
    nameZh: "奥利",
    role: "猫头鹰老师",
    emoji: "🦉",
    color: "#5b6bc0",
  },
  sunny: {
    id: "sunny",
    name: "Sunny",
    nameZh: "桑尼",
    role: "海豹伙伴",
    emoji: "🦭",
    color: "#2f9bb5",
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
  { id: 1, titleZh: "第一季 · 认识彼此", title: "Season 1", days: [1, 2, 3] },
  { id: 2, titleZh: "第二季 · 镇上的一天", title: "Season 2", days: [4, 5, 6, 7] },
  { id: 3, titleZh: "第三季 · 说出心里话", title: "Season 3", days: [8, 9, 10] },
];

function say(who, en, zh) {
  return { type: "say", who, en, zh };
}

function choice(promptZh, options, answer, who = "pip") {
  return { type: "choice", who, promptZh, options, answer };
}

function match(promptZh, pairs, who = "ollie") {
  return { type: "match", who, promptZh, pairs };
}

function order(promptZh, words, answer, who = "sunny") {
  return { type: "order", who, promptZh, words, answer };
}

function write(promptZh, answer, hint, who = "ollie") {
  return { type: "write", who, promptZh, answer, hint };
}

function finale(textZh) {
  return { type: "finale", textZh };
}

const QUEST_DAYS = [
  {
    id: 1,
    title: "Hello, Friends!",
    titleZh: "你好，新朋友！",
    placeZh: "星星车站",
    poster: "🎬",
    color: "#f0a24b",
    badge: { emoji: "🌟", nameZh: "见面之星" },
    tipZh: "第一集：认识皮皮、奥利和桑尼。",
    scenes: [
      say("pip", "Welcome to our show!", "欢迎来看我们的短剧！"),
      say("ollie", "Today we meet new friends.", "今天我们认识新朋友。"),
      say("sunny", "Hi! What is your name?", "嗨！你叫什么名字？"),
      choice("选一句回答桑尼", ["My name is Lin.", "How much is it?", "Turn left."], 0, "sunny"),
      say("pip", "Nice to meet you, Lin!", "很高兴认识你，林！"),
      match("把英文和中文连起来", [
        { left: "Hello", right: "你好" },
        { left: "My name is Pip", right: "我叫皮皮" },
        { left: "Nice to meet you", right: "很高兴认识你" },
      ]),
      order("排出正确的句子", ["name", "My", "is", "Pip"], "My name is Pip", "pip"),
      write("写出：很高兴认识你。", "Nice to meet you.", "Nice to meet you.", "ollie"),
      say("sunny", "You did great in Episode One!", "第一集你表现很棒！"),
      finale("获得徽章：见面之星"),
    ],
  },
  {
    id: 2,
    title: "My Family",
    titleZh: "我的家人",
    placeZh: "阳光小院",
    poster: "🏠",
    color: "#6bb3a0",
    badge: { emoji: "💛", nameZh: "家人徽章" },
    tipZh: "第二集：介绍家人和朋友。",
    scenes: [
      say("ollie", "This is my sister May.", "这是我妹妹梅。"),
      say("pip", "I have a tall brother.", "我有一个很高的哥哥。"),
      say("sunny", "Who lives with you?", "谁和你住在一起？"),
      choice("回答桑尼", ["I live with my mom and dad.", "I want noodles.", "Go straight."], 0, "sunny"),
      match("连一连", [
        { left: "sister", right: "姐妹" },
        { left: "brother", right: "兄弟" },
        { left: "best friend", right: "最好的朋友" },
      ]),
      order("排出句子", ["is", "This", "my", "sister"], "This is my sister", "ollie"),
      write("写出：我有一个哥哥。", "I have a brother.", "I have a brother.", "pip"),
      say("ollie", "Families and friends make us brave.", "家人和朋友让我们更勇敢。"),
      finale("获得徽章：家人徽章"),
    ],
  },
  {
    id: 3,
    title: "School Day",
    titleZh: "学校的一天",
    placeZh: "里弗小学",
    poster: "📚",
    color: "#5b6bc0",
    badge: { emoji: "📘", nameZh: "校园徽章" },
    tipZh: "第三集：上课、作业和操场。",
    scenes: [
      say("pip", "I have math in the morning.", "我上午有数学课。"),
      say("sunny", "After lunch we play outside.", "午饭后我们在外面玩。"),
      say("ollie", "Please open your book.", "请打开你的书。"),
      choice("老师说打开书，你说：", ["OK. I will open my book.", "How much is this?", "I am hungry."], 0, "ollie"),
      match("连一连", [
        { left: "homework", right: "作业" },
        { left: "playground", right: "操场" },
        { left: "class", right: "课；班级" },
      ]),
      order("排出句子", ["like", "I", "English", "class"], "I like English class", "sunny"),
      write("写出：请打开你的书。", "Please open your book.", "Please open your book.", "ollie"),
      say("pip", "School is more fun with friends!", "有朋友，学校更有趣！"),
      finale("获得徽章：校园徽章"),
    ],
  },
  {
    id: 4,
    title: "At the Shop",
    titleZh: "去小店买东西",
    placeZh: "河边小店",
    poster: "🛒",
    color: "#e07a5f",
    badge: { emoji: "🪙", nameZh: "买卖徽章" },
    tipZh: "第四集：问价格、付钱、说 please。",
    scenes: [
      say("sunny", "Welcome! What would you like?", "欢迎！你想要什么？"),
      say("pip", "How much is this apple?", "这个苹果多少钱？"),
      say("sunny", "It is one dollar.", "一美元。"),
      choice("你想买两个，怎么说？", ["I will take two, please.", "I am nine years old.", "Turn right."], 0, "sunny"),
      match("连一连", [
        { left: "How much is this?", right: "这个多少钱？" },
        { left: "Here you are.", right: "给你。" },
        { left: "change", right: "零钱" },
      ]),
      order("排出句子", ["much", "How", "is", "this"], "How much is this", "pip"),
      write("写出：请给我两个。", "I will take two, please.", "I will take two, please.", "sunny"),
      say("sunny", "Thanks for shopping with us!", "谢谢和我们一起买东西！"),
      finale("获得徽章：买卖徽章"),
    ],
  },
  {
    id: 5,
    title: "Lunch Time",
    titleZh: "午饭时间",
    placeZh: "码头小馆",
    poster: "🍜",
    color: "#d4a017",
    badge: { emoji: "🍽️", nameZh: "美食徽章" },
    tipZh: "第五集：点餐、说饿了、礼貌要饮料。",
    scenes: [
      say("pip", "I am hungry. Let's eat!", "我饿了。我们吃饭吧！"),
      say("sunny", "I would like noodles, please.", "我想要面条。"),
      say("ollie", "Anything to drink?", "喝点什么吗？"),
      choice("你想喝水，怎么说？", ["Water, please.", "Go straight.", "This is my sister."], 0, "ollie"),
      match("连一连", [
        { left: "hungry", right: "饿的" },
        { left: "sandwich", right: "三明治" },
        { left: "Enjoy your meal", right: "用餐愉快" },
      ]),
      order("排出句子", ["would", "I", "like", "noodles"], "I would like noodles", "sunny"),
      write("写出：我饿了。", "I am hungry.", "I am hungry.", "pip"),
      say("sunny", "Yum! This lunch tastes great.", "真香！这顿午饭很好吃。"),
      finale("获得徽章：美食徽章"),
    ],
  },
  {
    id: 6,
    title: "Where Is It?",
    titleZh: "请问怎么走？",
    placeZh: "镇口路口",
    poster: "🗺️",
    color: "#3d8b7a",
    badge: { emoji: "🧭", nameZh: "向导徽章" },
    tipZh: "第六集：问路、左转右转、说谢谢。",
    scenes: [
      say("sunny", "Excuse me. Where is the library?", "打扰一下。图书馆在哪里？"),
      say("ollie", "Go straight. Then turn left.", "一直走。然后左转。"),
      say("pip", "Is it far from here?", "离这里远吗？"),
      say("ollie", "No. It is near the park.", "不远。就在公园附近。"),
      choice("感谢帮助时说：", ["Thank you for your help.", "How much is this?", "I am hungry."], 0, "sunny"),
      match("连一连", [
        { left: "Go straight", right: "一直走" },
        { left: "Turn left", right: "向左转" },
        { left: "Excuse me", right: "打扰一下" },
      ]),
      order("排出句子", ["is", "Where", "the", "library"], "Where is the library", "sunny"),
      write("写出：向右转。", "Turn right.", "Turn right.", "ollie"),
      say("pip", "Now we can find any place!", "现在我们能找到任何地方了！"),
      finale("获得徽章：向导徽章"),
    ],
  },
  {
    id: 7,
    title: "Rain or Shine",
    titleZh: "下雨还是晴天",
    placeZh: "港口堤岸",
    poster: "☔",
    color: "#4a90a4",
    badge: { emoji: "🌂", nameZh: "天气徽章" },
    tipZh: "第七集：看天气，选对衣服。",
    scenes: [
      say("sunny", "It is sunny today!", "今天晴天！"),
      say("ollie", "Wear a hat. The sun is strong.", "戴帽子。太阳很烈。"),
      say("pip", "If it rains, take an umbrella.", "如果下雨，就带伞。"),
      choice("天冷了，你说：", ["It is cold. Put on your coat.", "I will take two apples.", "Open page ten."], 0, "ollie"),
      match("连一连", [
        { left: "sunny", right: "晴朗的" },
        { left: "umbrella", right: "伞" },
        { left: "coat", right: "外套" },
      ]),
      order("排出句子", ["is", "It", "raining", "today"], "It is raining today", "pip"),
      write("写出：带一把伞。", "Take an umbrella.", "Take an umbrella.", "sunny"),
      say("sunny", "Now we are ready for any weather!", "现在什么天气我们都准备好了！"),
      finale("获得徽章：天气徽章"),
    ],
  },
  {
    id: 8,
    title: "Weekend Fun",
    titleZh: "快乐的周末",
    placeZh: "绿草坪",
    poster: "🚴",
    color: "#7cb342",
    badge: { emoji: "🎯", nameZh: "爱好徽章" },
    tipZh: "第八集：说说爱好和周末计划。",
    scenes: [
      say("pip", "On weekends I ride my bike.", "周末我骑自行车。"),
      say("ollie", "I like to read stories.", "我喜欢读故事。"),
      say("sunny", "What is your hobby?", "你的爱好是什么？"),
      choice("回答桑尼", ["I like playing soccer.", "Your change is one dollar.", "Turn left."], 0, "sunny"),
      match("连一连", [
        { left: "hobby", right: "爱好" },
        { left: "weekend", right: "周末" },
        { left: "together", right: "一起" },
      ]),
      order("排出句子", ["is", "What", "your", "hobby"], "What is your hobby", "sunny"),
      write("写出：我喜欢读故事。", "I like reading stories.", "I like reading stories.", "ollie"),
      say("pip", "Hobbies make weekends bright!", "爱好让周末亮起来！"),
      finale("获得徽章：爱好徽章"),
    ],
  },
  {
    id: 9,
    title: "How I Feel",
    titleZh: "我的心情",
    placeZh: "树屋舞台",
    poster: "💭",
    color: "#8e6bb3",
    badge: { emoji: "💬", nameZh: "心情徽章" },
    tipZh: "第九集：说出开心、紧张，并礼貌求助。",
    scenes: [
      say("sunny", "I feel happy when I help others.", "帮助别人时我感到开心。"),
      say("ollie", "I feel nervous before a test.", "考试前我会紧张。"),
      say("pip", "Take a deep breath. You can do it.", "深呼吸。你能行。"),
      choice("需要帮助时说：", ["Can you help me, please?", "How much is this?", "Wear a hat."], 0, "ollie"),
      match("连一连", [
        { left: "happy", right: "开心的" },
        { left: "nervous", right: "紧张的" },
        { left: "I agree", right: "我同意" },
      ]),
      order("排出句子", ["feel", "I", "happy"], "I feel happy", "sunny"),
      write("写出：你能帮我吗？", "Can you help me?", "Can you help me?", "pip"),
      say("ollie", "Talking about feelings makes us stronger.", "说出感觉，会让我们更强大。"),
      finale("获得徽章：心情徽章"),
    ],
  },
  {
    id: 10,
    title: "The Big Show",
    titleZh: "大结局公演",
    placeZh: "港口剧场",
    poster: "🏆",
    color: "#c45c26",
    badge: { emoji: "👑", nameZh: "十日小冠军" },
    tipZh: "第十集：复习十天学过的话，三人一起谢幕。",
    scenes: [
      say("pip", "Welcome to our final show!", "欢迎来到大结局公演！"),
      say("sunny", "We learned to shop, eat, and ask the way.", "我们学会了买东西、吃饭和问路。"),
      say("ollie", "We also learned to share our feelings.", "我们也学会了分享心情。"),
      choice("公演开场，介绍自己：", ["Hi! My name is Lin. Nice to meet you.", "Go straight and turn left.", "Here is five dollars."], 0, "pip"),
      match("总复习连线", [
        { left: "How much is this?", right: "这个多少钱？" },
        { left: "Excuse me", right: "打扰一下" },
        { left: "I feel happy", right: "我感到开心" },
        { left: "Nice to meet you", right: "很高兴认识你" },
      ]),
      order("排出句子", ["you", "help", "Can", "me"], "Can you help me", "ollie"),
      write("写出：这个多少钱？", "How much is this?", "How much is this?", "sunny"),
      choice("最后谢幕，你说：", ["Thank you, Pip, Ollie, and Sunny!", "It is raining.", "Open your book."], 0, "pip"),
      say("sunny", "You finished all ten episodes!", "你看完了全部十集！"),
      finale("获得徽章：十日小冠军"),
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

function addDaysToKey(dateKey, days) {
  const date = new Date(`${dateKey}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function episodeUnlockDate(episodeId, seriesStart) {
  return addDaysToKey(seriesStart, Number(episodeId) - 1);
}
