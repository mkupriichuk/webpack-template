const { join } = require('path');

module.exports = {
  src: join(__dirname, '../src'),
  static: join(__dirname, '../static'),
  dist: join(__dirname, '../dist')
};