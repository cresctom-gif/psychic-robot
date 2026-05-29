const phrases = [
  "今やるべきことは、今やるべきことをやることです。",
  "毎日続けるということは、毎日続いているということなんです。",
  "未来を変えるには、まだ来ていない未来を変える必要があります。",
  "大事なのは、何が大事なのかを大事にすることです。",
  "考えすぎる前に、考えることについて考えてみましょう。",
  "一歩進むということは、半歩よりも前に進むということです。",
  "できる理由を探すには、できない理由を探さないことが大切です。",
  "今日という日は、明日から見れば昨日になります。",
  "変化を起こすには、変化が起きるように変えることです。",
  "わかりやすさとは、わかりにくくないということでもあります。",
];

const phraseElement = document.querySelector("#phrase");
const drawButton = document.querySelector("#drawButton");

function showRandomPhrase() {
  const index = Math.floor(Math.random() * phrases.length);

  phraseElement.textContent = phrases[index];
}

drawButton.addEventListener("click", showRandomPhrase);
