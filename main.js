'use strict';

const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {Menu} = electron;
const {dialog} = electron;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function () {
  Menu.setApplicationMenu(menu);
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('file://' + __dirname + '/app/index.html');
});

const template = [
  {
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Quit", accelerator: "CmdOrCtrl+Q", click: function () { app.quit(); } }
    ]
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  },
  {
    label: 'View',
    submenu: [
      { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.reload(); } },
      { label: 'Toggle DevTools', accelerator: 'Alt+CmdOrCtrl+I', click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.toggleDevTools(); } }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
