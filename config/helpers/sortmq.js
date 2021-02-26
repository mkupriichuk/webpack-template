const {readdirSync, readFileSync, writeFileSync, existsSync} = require("fs");
const mqpacker = require("css-mqpacker");
const PATHS = require("../paths")

let targetDir = existsSync(PATHS.dist + '/css')
	? PATHS.dist + '/css'
	: PATHS.dist

let whiteList = []

let files = readdirSync(targetDir)
	.filter(el => el.endsWith('.css') && !whiteList.includes(el))

files.forEach(cssFile => {
	let f = targetDir + '/' + cssFile
	let res = mqpacker.pack(readFileSync(f, "utf8"), {
		from: cssFile,
		sort: sortMediaQueries,
		map: false,
		to: "to.css"
	}).css
	if(typeof res === 'string') {
		writeFileSync(f, res)
	} else {
		throw new Error(`res not a string`)
	}
})

function sortMediaQueries(a, b) {
	let A = a.replace(/\D/g, "");
	let B = b.replace(/\D/g, "");

	if (/max-width/.test(a) && /max-width/.test(b)) {
		return B - A;
	} else if (/min-width/.test(a) && /min-width/.test(b)) {
		return A - B;
	} else if (/max-width/.test(a) && /min-width/.test(b)) {
		return 1;
	} else if (/min-width/.test(a) && /max-width/.test(b)) {
		return -1;
	}

	return 1;
}