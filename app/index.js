const app = new Vue({
  el: '#app',
  data: {
    nodeVer: process.versions.node,
    chromeVer: process.versions.chrome,
    electronVer: process.versions.electron
  }
});
