const { resolve } = require('path');
const { readdirSync } = require('fs');

const isYARNv2 = () => {
	const files = readdirSync(resolve(__dirname, '..'));
	return files.includes('.yarn') && !files.includes('node_modules');
};

module.exports = {
	src: resolve(__dirname, '../src'),
	public: resolve(__dirname, '../public'),
	packagesExcludePath: resolve(
		__dirname,
		isYARNv2() ? '../.yarn' : '../node_modules'
	),
	dist: resolve(__dirname, '../dist'),
};
