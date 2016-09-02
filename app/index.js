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
const translate = function (target) {
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
};

const readText = function (file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsText(file);
};

let data = {
  dictionary: [],
  kickerUrl: 'http://www.kicker.de/news/fussball/bundesliga/spieltag/1-bundesliga/2016-17/1/3317245/livetaktischeaufstellung_bayern-muenchen-14_werder-bremen-4.html',
  kickerHtml: null,
  scaling: 1.0,
  font: 1.0
};

const body = new Vue({
  el: '#body',
  data: data,
  computed: {
    formationHeight: function () {
      return 1055 * this.scaling;
    }
  },
  methods: {
    fetch: function (e) {
      if (data.kickerUrl) {
        getAsync(data.kickerUrl).then(function (text) {
          data.kickerHtml = getFormation(text);
        });
      }
    },
    load: function (e) {
      readText(e.target.files[0], function (text) {
        localStorage.dictionary = text;
        data.dictionary = JSON.parse(text);
      });
    }
  },
  filters: {
  },
  created: function () {
    try {
      console.log(localStorage.dictionary);
      data.dictionary = JSON.parse(localStorage.dictionary);
    } catch (e) {
      console.error(e);
      data.dictionary = [];
    }
  },
});

document.getElementById("topUrl").addEventListener("focus", function (e) {
  e.target.select();
});
