'use strict';

const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {Menu} = electron;
const {dialog} = electron;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  openWindow(process.cwd());
});

function openWindow (baseDir) {
  var win = new BrowserWindow({width: 800, height: 600});
  win.loadURL('file://' + __dirname + '/app/index.html?baseDir=' + encodeURIComponent(baseDir));
  win.on('closed', function () {
    win = null;
  });
}
