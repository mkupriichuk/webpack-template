const purify = require('purify-css');
const { existsSync, readdirSync } = require('fs');

let root = existsSync('./dist/css/') ? './dist/css/' : './dist/';

let files = readdirSync(root);

let cssArr = files.filter(ext => ext.endsWith('.css')).map(i => i = root + i);

console.log(cssArr);


cssArr.forEach(file => {
  const content = ['./dist/*.js', './dist/js/*.js', './dist/*.html'];
  const css = [file];
  const whiteListClass = [
    'is-open',
    'dropdown',
    'active',
    '*owl*',
    '*mfp*'
  ];
  const options = {
    output: file,
    whitelist: whiteListClass,
    info: true,
    minify: true
  };

  purify(content, css, options);

});
