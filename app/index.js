'use strict';

const Vue = require('vue');

const getAsync = function (url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => resolve(xhr.response);
    xhr.send();
  });
}

const getFormation = function (text) {
  let doc = null;
  try {
    let parser = new DOMParser();
    doc = parser.parseFromString(text, "text/html");
    if (doc.getElementsByTagName("parsererror").length) {
      return "Parse Error";
    }
  } catch (e) {
    return (e.message || e.toString());
  }
  const liveFormation = "takAufContainer";
  const formation = "ctrl_taktaufstellung";
  let target = doc.getElementById(liveFormation);
  if (target) {
    translate(target);
    return target.outerHTML;
  }
  return liveFormation + " not found";
};

const translate = function(target) {
  var teams = target.querySelectorAll('div.taktischeaufstellung > div:not([class="taktAufSplItem"]) > div');
  var members = target.querySelectorAll('div.taktischeaufstellung > div[class="taktAufSplItem"] > a:last-child');
  console.log("teams: " + teams.length);
  console.log("members: " + members.length);
}

let data = {
  dictionary: [
    {
      de: "Bayern München",
      ja: "バイエルン・ミュンヘン",
      members: [
        { de: "Neuer", ja: "ノイアー" },
        { de: "Hummels", ja: "フメルス" },
        { de: "Javi Martínez", ja: "ハビ・マルティネス" },
        { de: "Alaba", ja: "アラバ" },
        { de: "Lahm", ja: "ラーム" },
        { de: "Xabi Alonso", ja: "シャビ・アロンソ" },
        { de: "Vidal", ja: "ビダル" },
        { de: "Thiago", ja: "ティアゴ" },
        { de: "F. Ribéry", ja: "F・リベリ" },
        { de: "T. Müller", ja: "T・ミュラー" },
        { de: "Lewandowski", ja: "レバンドフスキ" }
      ]
    },
    {
      de: "Werder Bremen",
      ja: "ヴェルダー・ブレーメン",
      members: [
        { de: "Wiedwald", ja: "ヴィートヴァルト" },
        { de: "L. Sané", ja: "L・サネ" },
        { de: "Caldirola", ja: "カルディローラ" },
        { de: "Diagne", ja: "ディアニ" },
        { de: "Gebre Selassie", ja: "ゲブレ・セラシェ" },
        { de: "Ro. Bauer", ja: "R・バウアー" },
        { de: "Grillitsch", ja: "グリリッチュ" },
        { de: "S. Yatabaré", ja: "S・ヤタバレ" },
        { de: "Fritz", ja: "フリッツ" },
        { de: "Bartels", ja: "バルテルス" },
        { de: "Jóhannsson", ja: "ヨハンソン" }
      ]
    }
  ],
  kickerUrl: 'http://www.kicker.de/news/fussball/bundesliga/spieltag/1-bundesliga/2016-17/1/3317245/livetaktischeaufstellung_bayern-muenchen-14_werder-bremen-4.html',
  kickerHtml: null
};

const body = new Vue({
  el: '#body',
  data: data,
  methods: {
    fetch: function () {
      if (data.kickerUrl) {
        getAsync(data.kickerUrl).then(function (text) {
          data.kickerHtml = getFormation(text);
        });
      }
    }
  },
  filters: {
  },
  created: function () {
  }
});
