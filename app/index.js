'use strict';

const electron = require('electron');
const Vue = require('vue');

const {remote} = electron;
const fileUtil = remote.require('./lib/fileUtil');

let data = {
  fileList: [],
  fileText: null,
  kickerHtml: null
};

const main = new Vue({
  el: '#main',
  data: data,
  methods: {
  },
  filters: {
  },
  created: function () {
  }
});
