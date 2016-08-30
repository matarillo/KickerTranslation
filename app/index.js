'use strict';

const electron = require('electron');
const Vue = require('vue');
const http = require('http');

const {remote} = electron;
const htmlUtil = remote.require('./lib/htmlUtil');

const getAsync = function(url) {
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
    return target.outerHTML;
  }
  return liveFormation + " not found";
};

let data = {
  fileList: [],
  fileText: null,
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
