var packager = require('electron-packager');  
var config = require('./package.json');
var HttpsProxyAgent = require('https-proxy-agent');

var httpsProxy = process.env.HTTPS_PROXY || process.env.https_proxy;
var download = (httpsProxy) ? { downloadOptions: { agent: new HttpsProxyAgent(httpsProxy) } } : null;

packager({  
  dir: "./",
  out: "./dist",
  name: config.name,
  platform: "darwin",
  arch: "x64",
  version: "6.1.0",
  "app-bundle-id": "town.kicker",
  "app-version": config.version,
  "app-copyright": "Copyright (C) 2019 " + config.author + ".",
  overwrite: true,
  asar: true,
  prune: true,
  ignore: "data|node_modules|\.gitignore|build\.js",
  download: download
}, function done (err, appPath) {
  if (err) {
    throw new Error(err);
  }
  console.log("Done: " + appPath);
});
