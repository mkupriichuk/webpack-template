const { resolve } = require('path');

module.exports = {
  src: resolve(__dirname, '../src'),
  static: resolve(__dirname, '../static'),
  dist: resolve(__dirname, '../dist')
};