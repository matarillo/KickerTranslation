var packager = require('electron-packager');  
var config = require('./package.json');

packager({  
  dir: "./",
  out: "./dist",
  name: config.name,
  platform: "darwin,win32",
  arch: "x64",
  version: "1.3.4",
  "app-bundle-id": "town.kicker",
  "app-version": config.version,
  "app-copyright": "Copyright (C) 2016 " + config.author + ".",
  overwrite: true,
  asar: true,
  prune: true,
  ignore: "app/index\.js|node_modules|\.gitignore|webpack\.config\.js|build\.js",
}, function done (err, appPath) {
  if(err) {
    throw new Error(err);
  }
  console.log("Done: " + appPath);
});