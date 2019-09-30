const purify = require('purify-css');
const fs = require('fs');


let cssFile = getFiles('./dist/css');
let whiteListClass = [
  'is-open',
  'dropdown',
  'active',
  '*owl*',
  '*mfp*'
];


const content = ['./dist/js/*.js', './dist/*.html'];
const css = [cssFile];
const options = {
	output: cssFile,
	whitelist: whiteListClass,
	info: true,
	minify: true
};


function getFiles(dir, files_) {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let name = dir + '/' + files[i];
    if (~name.indexOf('.css')) {
      files_.push(name);
    }
  }
  return files_.join();
}


purify(content, css, options);
