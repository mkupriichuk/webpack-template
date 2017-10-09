const webfontsGenerator = require('webfonts-generator');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');

const SRC = path.join(__dirname, '../../src/icons/icon_font/icons');
const FILES = _.map(fs.readdirSync(SRC), function(file) {
  return path.join(SRC, file)
});

const TYPES = ['woff2', 'woff'];
const NAME = 'svgfont';
const OPTIONS = {
  dest: 'src/fonts/' + NAME,
  files: FILES,
  fontName: NAME,
  normalize: true,
  fontHeight: 1001,
  types: TYPES,
  order: TYPES,
  cssDest: ('src/sass/_helpers/' + '_' + NAME + '.sass'),
  cssTemplate: 'src/icons/icon_font/template.hbs',
};

webfontsGenerator(OPTIONS, function(error) {
  if (error) console.log('Fail!', error)
  else console.log('Done!')
});