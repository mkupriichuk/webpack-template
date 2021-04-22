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
  }
  apply(compiler) {
    compiler.hooks.done.tap(
      'CssMQPackerPlugin',
      () => {
        // let targetDir = existsSync(PATHS.dist + '/css') ?
        //   PATHS.dist + '/css' :
        //   PATHS.dist

        let whiteList = []

        let files = readdirSync(this.cssPath)
          .filter(el => el.endsWith('.css') && !whiteList.includes(el))

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
            if (this.printResult) {
              const printSize = () => {
                let fileSizeAfter = statSync(f).size
                console.log(chalk.hex('#32F265')('CSS MQPacker plugin:'), '\n',
                  'before', cssFile, 'size:', chalk.yellow(formatBytes(fileSizeBefore)), '\n',
                  'after', cssFile, 'size:', chalk.hex('#32F265')(formatBytes(fileSizeAfter)), '\n',
                  chalk.green('You saved:'), chalk.hex('#32F265')(formatBytes(fileSizeBefore - fileSizeAfter))
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
