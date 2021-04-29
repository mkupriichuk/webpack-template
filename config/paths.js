const { resolve } = require('path');
const {readdirSync} = require('fs')

const isYarn2 = readdirSync('.').includes('.yarn')

module.exports = {
  src: resolve(__dirname, '../src'),
  static: resolve(__dirname, '../static'),
  packagesExludePath: resolve(__dirname, isYarn2 ? '../.yarn' : '../node_modules'),
  dist: resolve(__dirname, '../dist')
};
