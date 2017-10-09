const purify = require('purify-css');
const cssFile = './dist/css/bundle.8dcd12f.css';

const content = ['./dist/*html'];
const css = [cssFile];
const options = {
	output: cssFile,
	whitelist: ['is-open', 'dropdown', 'active', '*owl*', '*mfp*'],
	info: true,
	minify: true
};

purify(content, css, options);
