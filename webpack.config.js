module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname + '/app',
    filename: 'bundle.js'
  },
  externals: {
    'electron': 'require("electron")'
  }
};