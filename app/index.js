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
  /** @type {Document} */
  let doc = null;
  try {
    let parser = new DOMParser();
    doc = parser.parseFromString(text, "text/html");
    if (doc.getElementsByTagName("parsererror").length) {
      return "Parse Error";
    }
  } catch (e) {
    return (e.message);
  }
  const liveFormation = "takAufContainer";
  let target = doc.getElementById(liveFormation);
  if (target) {
    translate(target);
    return target.outerHTML;
  }
  return liveFormation + " not found";
};

/** @param {HTMLElement} target */
const translate = function(target) {
  const teamElements = target.querySelectorAll('div.taktischeaufstellung > div:not([class="taktAufSplItem"]) > div');
  const memberElements = target.querySelectorAll('div.taktischeaufstellung > div[class="taktAufSplItem"] > a:last-child');
  /** @type {{de:string,ja:string}[]} */
  let members = [];
  for (let i = 0; i < teamElements.length; i++) {
    const teamElement = teamElements[i];
    for (let j = 0; j < data.dictionary.length; j++) {
      const team = data.dictionary[j];
      if (teamElement.textContent === team.de) {
        teamElement.textContent = team.ja;
        members = members.concat(team.members);
        break;
      }
    }
  }
  for (let i = 0; i < memberElements.length; i++) {
    const memberElement = memberElements[i];
    const memberTextContent = memberElement.textContent;
    for (let j = 0; j < members.length; j++) {
      const member = members[j];
      if (memberTextContent.indexOf(member.de) == 0) {
        memberElement.textContent = member.ja + memberTextContent.substr(member.de.length);
        break;
      }
    }
  }
}

let data = {
  dictionary: [
    {
      de: "Bayern München",
      ja: "バイエルン・ミュンヘン",
      members: [
        { de: "Neuer", ja: "ノイアー" },
        { de: "Hummels", ja: "フメルス" },
        { de: "Javi Martinez", ja: "ハビ・マルティネス" },
        { de: "Alaba", ja: "アラバ" },
        { de: "Lahm", ja: "ラーム" },
        { de: "Xabi Alonso", ja: "シャビ・アロンソ" },
        { de: "Vidal", ja: "ビダル" },
        { de: "Thiago", ja: "ティアゴ" },
        { de: "F. Ribery", ja: "F・リベリ" },
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
        { de: "Johannsson", ja: "ヨハンソン" }
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
