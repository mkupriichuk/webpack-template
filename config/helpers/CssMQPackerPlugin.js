const {
  readdirSync,
  readFileSync,
  writeFileSync,
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
        // let targetDir = existsSync(PATHS.dist + '/css') ?
        //   PATHS.dist + '/css' :
        //   PATHS.dist

        let files = readdirSync(this.cssPath)
          .filter(el => el.endsWith('.css') && !this.blackList.includes(el))

        files.forEach(cssFile => {
          let f = this.cssPath + '/' + cssFile
          let fileSizeBefore = statSync(f).size
          let res = mqpacker.pack(readFileSync(f, "utf8"), {
            from: cssFile,
            sort: this.sortMediaQueries,
            map: false,
            to: "to.css"
          }).css
          if (typeof res === 'string') {
            writeFileSync(f, res)
            if (this.printResult) {
              const printSize = () => {
                let fileSizeAfter = statSync(f).size
                console.log(chalk.hex('#32F265')('CSS MQPacker plugin:'), '\n',
                  'before', cssFile, 'size:', chalk.yellow(this.formatBytes(fileSizeBefore)), '\n',
                  'after', cssFile, 'size:', chalk.hex('#32F265')(this.formatBytes(fileSizeAfter)), '\n',
                  chalk.green('You saved:'), chalk.hex('#32F265')(this.formatBytes(fileSizeBefore - fileSizeAfter))
                );
              }
              setTimeout(printSize, 0);
            }
          } else {
            throw new Error(`res not a string`)
          }
        })

      }
    );
  }
  sortMediaQueries(a, b) {
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
  formatBytes(a, b = 2) {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  }
}

// function sortMediaQueries(a, b) {

// }

// function formatBytes(a, b = 2) {
//   if (0 === a) return "0 Bytes";
//   const c = 0 > b ? 0 : b,
//     d = Math.floor(Math.log(a) / Math.log(1024));
//   return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
// }

module.exports = CssMQPackerPlugin;
