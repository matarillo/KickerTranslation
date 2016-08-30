'use strict';

const http = require('http');

const htmlUtil = {
  get: function(url, callback) {

    let xpath    = '//div[@id="ctrl_taktaufstellung"]',
        query    = "select * from html where url = '" + url + "' and xpath = '" + xpath + "'",
        yahooApi = "http://query.yahooapis.com/v1/public/yql?format=xml&q="+encodeURIComponent(query);

    http.get(url, callback);
    /*
    http.get(url, function(content) {
      let doc = null;
      try {
        let parser = new DOMParser();
        doc = parser.parseFromString(content, "application/xhtml+xml");
        if(doc.getElementsByTagName("parsererror").length){
          doc = null;
          callback("parse error");
          return;
        }
      } catch (e) {
        callback(e.message || e.toString());
        return;
      }
      if (doc) {
        let target = doc.getElementById("ctrl_taktaufstellung");
        if (target) {
          callback(target.outerHTML);
        }
        callback("ctrl_taktaufstellung not found");
        return;
      }
      callback(null);
    });
    */
  }
};

module.exports = htmlUtil;
