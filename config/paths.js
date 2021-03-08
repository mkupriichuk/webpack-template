const { resolve } = require('path');

module.exports = {
  src: resolve(__dirname, '../src'),
  static: resolve(__dirname, '../static'),
  nodeModules: resolve(__dirname, '../node_modules'),
  dist: resolve(__dirname, '../dist')
};