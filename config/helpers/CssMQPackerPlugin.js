const {
  readdirSync,
  readFileSync,
  writeFileSync,
	existsSync,
  statSync
} = require("fs");
const mqpacker = require("css-mqpacker");
const PATHS = require("../paths")
const chalk = require('chalk');

class CssMQPackerPlugin {
  constructor(options = {}) {
    this.cssPath = options.cssPath || PATHS.dist + '/css'
    this.printResult = options.printResult || false
    this.blackList = options.blackList || []
  }
  apply(compiler) {
    compiler.hooks.done.tap(
      'CssMQPackerPlugin',
      () => {
        this.sortMq()
          .then(res => {
            if(this.printResult) {
              this.print(res)
            }
          })
      }
    );
  }
  print(res) {
		if(!existsSync(this.cssPath)) {
			return
		}
    res.forEach(({name,before,after}) => {
      console.log(chalk.hex('#32F265')('CSS MQPacker plugin:'), '\n',
        'Css file name:', chalk.yellow(name), '\n',
        '\t', 'Size before', chalk.yellow(formatBytes(before)), '\n',
        '\t', 'Size after', chalk.hex('#32F265')(formatBytes(after)), '\n',
        '\t', chalk.green('You saved:'), chalk.hex('#32F265')(formatBytes(before - after), '\n')
      );
    })
  }
  async sortMq() {
		if(!existsSync(this.cssPath)) {
			return
		}
    let files = readdirSync(this.cssPath)
      .filter(el => el.endsWith('.css') && !this.blackList.some(f => el.includes(f)))
    const filesStats = []
    files.forEach(cssFile => {
      let f = this.cssPath + '/' + cssFile
      let fileSizeBefore = statSync(f).size
      let res = mqpacker.pack(readFileSync(f, "utf8"), {
        from: cssFile,
        sort: sortMediaQueries,
        map: false,
        to: "to.css"
      }).css
      if (typeof res === 'string') {
        writeFileSync(f, res)
        let fileSizeAfter = statSync(f).size
        filesStats.push({
          name: cssFile,
          before: fileSizeBefore,
          after: fileSizeAfter
        })
      } else {
        throw new Error(`res not a string`)
      }
    })
    return filesStats
  }
}

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

function formatBytes(a, b = 2) {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

module.exports = CssMQPackerPlugin;
