const PATH = require('../paths.js');
const fs = require('fs');
const chalk = require('chalk');

const localePath = PATH.public + '/locales/en/translation.json';

try {
const _locale = fs.readFileSync(localePath, 'utf-8');
const typedHookPath = PATH.src + '/hooks/useTypedTranslation';
const outputTypeFile = typedHookPath + '/types.ts';
const translationTypeName = 'TranslationKeysType'

if (_locale && fs.existsSync(typedHookPath)) {
	const locale = JSON.parse(_locale);
	function buildI18Types(obj, path = '') {
		const res = {};
		for (const key in obj) {
			if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
				Object.assign(res, buildI18Types(obj[key], [...path, key]));
			} else if(!key.includes('_plural')){
				res[[...path, key].join('.')] = true;
			}
		}
		return res;
	}

	const literals = Object.keys(buildI18Types(locale));
	const result = `export type ${translationTypeName} = ${literals
		.map((el) => "'" + el + "'")
		.join(' | ')};`;
	fs.writeFile(outputTypeFile, result, (err) => {
		if (err) {
			console.log('Something goes wrong:(');
		} else {
			console.log(`Types file was created. See ${chalk.green(outputTypeFile)}`);
		}
	});
}
} catch (error) {
	if(error.code = 'ENOEND') {
		console.log(`Failed to read file ${chalk.green(localePath)}`);
	} else {
		console.log(error);
	}
}
