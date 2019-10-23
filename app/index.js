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
    translate(doc);
  } catch (e) {
    return (e.message);
  }
  const liveFormation = 'div.kick__data-grid';
  let target = doc.querySelector(liveFormation);
  if (target) {
    return target.outerHTML;
  }
  return liveFormation + " not found";
};

/** @param {HTMLElement} target */
const translate = function (target) {
  const teamElements = target.querySelectorAll('div.kick__v100-gameCell__team__name');
  const memberElements = target.querySelectorAll('div.kick__lineup-field__field-half > a.kick__lineup-player-card > div.kick__lineup-player-card__name-holder > span.kick__lineup-player-card__name, div.kick__lineup-text a');
  /** @type {{de:string,ja:string}[]} */
  let members = [];
  for (let i = 0; i < teamElements.length; i++) {
    const teamElement = teamElements[i];
    const teamTextContent = teamElement.textContent;
    for (let j = 0; j < data.dictionary.length; j++) {
      const team = data.dictionary[j];
      if (teamTextContent.includes(team.de)) {
        teamElement.textContent = teamTextContent.replace(team.de, team.ja);
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
      if (memberTextContent.includes(member.de)) {
        memberElement.textContent = memberTextContent.replace(member.de, member.ja);
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

const setScaling = function(scaling) {
  document.documentElement.style.setProperty('--formation-scaling', scaling);
};

const setFontScaling = function(scaling) {
  document.documentElement.style.setProperty('--formation-font-scaling', scaling);
};

const data = {
  dictionary: [],
  kickerUrl: 'https://www.kicker.de/4588727/aufstellung/fc-augsburg-91/bayern-muenchen-14',
  kickerHtml: null,
  scaling: 1.0,
  fontScaling: 1.0
};

const app = new Vue({
  el: '#app',
  data: data,
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
    },
    changeScaling: function (e) {
      const value = e.target.value;
      this.scaling = value;
      setScaling(value);
    },
    changeFontScaling: function (e) {
      const value = e.target.value;
      this.fontScaling = value;
      setFontScaling(value);
    },
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

document.getElementById("topUrl").addEventListener("focus", e => e.target.select());
