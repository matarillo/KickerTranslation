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
  const liveFormation = 'div.kick__data-grid__main';
  let target = doc.querySelector(liveFormation);
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

const setScaling = function(scaling) {
  //getComputedStyle(document.documentElement).setProperty('--formation-scaling', scaling);
  document.documentElement.style.setProperty('--formation-scaling', scaling);
};

const setFontScaling = function(scaling) {
  //getComputedStyle(document.documentElement).setProperty('--formation-font-scaling', scaling);
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
