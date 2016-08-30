'use strict';

const electron = require('electron');
const Vue = require('vue');
const http = require('http');

const {remote} = electron;
const htmlUtil = remote.require('./lib/htmlUtil');

let data = {
  fileList: [],
  fileText: null,
  kickerUrl: 'http://www.kicker.de/news/fussball/bundesliga/spieltag/1-bundesliga/2016-17/1/3317245/taktische-austellung_bayern-muenchen-14_werder-bremen-4.html',
  kickerHtml: null
};

const body = new Vue({
  el: '#body',
  data: data,
  methods: {
    fetch: function() {
      if (data.kickerUrl) {
        data.kickerHtml = (fetch) ? "fetch" : "NG";
      }
    }
  },
  filters: {
  },
  created: function () {
  }
});
