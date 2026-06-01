const seasonSelect = document.querySelector("#season");
const topicSelect = document.querySelector("#topic");
const moodSelect = document.querySelector("#mood");
const memoInput = document.querySelector("#memo");
const postForm = document.querySelector("#postForm");
const shuffleButton = document.querySelector("#shuffleButton");
const result = document.querySelector("#result");
const copyButton = document.querySelector("#copyButton");
const copyMessage = document.querySelector("#copyMessage");

const seasons = {
  spring: {
    name: "春",
    air: "雪どけの風が、三石の畑にもゆっくり入ってくる季節",
    scenery: "日高の山の色が少しずつやわらぎ、土の匂いが戻ってきます",
    closing: "春の北海道らしく、ゆっくり、まっすぐ育てていきます。",
  },
  earlySummer: {
    name: "初夏",
    air: "朝の空気がすっと軽くなって、畑が一気に動き出す季節",
    scenery: "海からの風と山の緑が、三石らしい広さを連れてきます",
    closing: "この時期だけのみずみずしさを、畑からそのまま届けます。",
  },
  summer: {
    name: "夏",
    air: "北海道の短い夏が、畑にぐっと力をくれる季節",
    scenery: "青い空の下で、野菜たちの色が日に日に濃くなります",
    closing: "暑い日にも食べやすい、元気な味に育っています。",
  },
  autumn: {
    name: "秋",
    air: "朝晩の空気が少し冷えて、野菜の甘みが増してくる季節",
    scenery: "三石の山も畑も、落ち着いた色に変わっていきます",
    closing: "北海道の秋らしい、ほっとする味わいをどうぞ。",
  },
  winter: {
    name: "冬",
    air: "畑が静かに休み、次の季節の準備をする季節",
    scenery: "白い景色の中で、春に向けた支度を少しずつ進めています",
    closing: "寒い季節にも、畑のぬくもりを思い出してもらえたらうれしいです。",
  },
};

const topics = {
  seasonal: {
    label: "季節のおすすめ",
    noun: "季節の恵み",
    detail: "三石の山菜や畑の野菜から、その時いちばんいいものを選びました",
    tags: ["#北海道野菜", "#新ひだか町", "#三石"],
  },
  wildVegetables: {
    label: "山菜",
    noun: "山菜",
    detail: "行者ニンニクやフキなど、三石の山の香りを感じる味です",
    tags: ["#山菜", "#行者ニンニク", "#フキ"],
  },
  greenPepper: {
    label: "ピーマン",
    noun: "ピーマン",
    detail: "肉厚で香りがよく、炒めても焼いても食卓が明るくなります",
    tags: ["#ピーマン", "#夏野菜", "#北海道野菜"],
  },
  tomato: {
    label: "トマト",
    noun: "トマト",
    detail: "太陽を浴びて、甘みと酸味のバランスよく育っています",
    tags: ["#トマト", "#畑のある暮らし", "#北海道野菜"],
  },
  watermelon: {
    label: "スイカ",
    noun: "スイカ",
    detail: "大きな空の下で、夏らしい甘さをじっくり蓄えています",
    tags: ["#スイカ", "#北海道の夏", "#新ひだか町"],
  },
  eggplant: {
    label: "なす",
    noun: "なす",
    detail: "つやのある実に、畑の水分と夏の力がぎゅっと入っています",
    tags: ["#なす", "#夏野菜", "#ばんどう農園"],
  },
  strawberry: {
    label: "いちご",
    noun: "いちご",
    detail: "小さな粒の中に、やさしい甘さと畑の香りが詰まっています",
    tags: ["#いちご", "#北海道いちご", "#ばんどう農園"],
  },
  jam: {
    label: "ジャム",
    noun: "ジャム",
    detail: "農園の実りを、朝のパンにも合うやさしい甘さに仕上げました",
    tags: ["#手づくりジャム", "#農園ジャム", "#北海道グルメ"],
  },
  compost: {
    label: "馬糞堆肥の畑",
    noun: "馬糞堆肥で育つ畑",
    detail: "競走馬のふるさとらしく、馬糞を堆肥にして土づくりをしています",
    tags: ["#馬糞堆肥", "#土づくり", "#競走馬のふるさと"],
  },
};

const hooks = [
  "派手ではないけれど、ちゃんと力があります。",
  "三石の風を吸って、今日も畑が少しにぎやかです。",
  "ひと口目で、肩の力がすっと抜けるような味を。",
  "北海道の広さは、野菜の育ち方にも出る気がします。",
  "土が元気だと、野菜の顔つきも変わります。",
];

const moodLines = {
  gentle:
    "大きなことは言えませんが、毎日の畑仕事をていねいに重ねています。",
  fresh:
    "採れたての元気さを、食卓までなるべくまっすぐ届けたいです。",
  story:
    "馬産地の町で生まれる堆肥と、三石の土と風。そのつながりを畑で感じます。",
  sales:
    "数に限りがありますが、見かけた時はぜひ手に取ってみてください。",
};

let variant = 0;

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 5) return "spring";
  if (month === 6) return "earlySummer";
  if (month >= 7 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function pickSeason() {
  return seasonSelect.value === "auto" ? getCurrentSeason() : seasonSelect.value;
}

function buildPost() {
  const season = seasons[pickSeason()];
  const topic = topics[topicSelect.value];
  const hook = hooks[variant % hooks.length];
  const memo = memoInput.value.trim();
  const memoLine = memo ? `\n\n${memo}` : "";
  const hashTags = [
    ...new Set(["#ばんどう農園", ...topic.tags, "#三石", "#日高"]),
  ].join(" ");

  return `${hook}

${season.air}。
${season.scenery}。

ばんどう農園では、競走馬のふるさとでもあるこの土地らしく、馬糞を堆肥にして土づくりをしています。
その土で育った${topic.noun}は、体にすっとなじむような、やさしく元気な味わいです。

${topic.detail}。
${moodLines[moodSelect.value]}

${season.closing}${memoLine}

${hashTags}`;
}

function updatePost() {
  result.value = buildPost();
  copyMessage.textContent =
    "気になるところを少し直して、そのまま投稿に使えます。";
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  variant += 1;
  updatePost();
});

shuffleButton.addEventListener("click", () => {
  variant += 1;
  updatePost();
});

copyButton.addEventListener("click", async () => {
  result.select();
  result.setSelectionRange(0, result.value.length);

  try {
    await navigator.clipboard.writeText(result.value);
    copyMessage.textContent = "コピーしました。Instagramに貼り付けられます。";
  } catch {
    document.execCommand("copy");
    copyMessage.textContent = "コピーしました。Instagramに貼り付けられます。";
  }
});

updatePost();
