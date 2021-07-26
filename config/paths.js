const { resolve } = require('path');

module.exports = {
	root: resolve(__dirname, '../'),
	src: resolve(__dirname, '../src'),
	public: resolve(__dirname, '../public'),
	packagesExcludePath: [
		resolve(__dirname, '../.yarn'),
		resolve(__dirname, '../node_modules'),
	],
	dist: resolve(__dirname, '../dist'),
};
