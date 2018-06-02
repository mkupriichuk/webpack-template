const gulp = require('gulp');
const cheerio = require('gulp-cheerio');
const newer = require('gulp-newer');
const svgmin = require('gulp-svgmin');
const shorthand  = require('gulp-shorthand');

const monoSRC = '../../src/icons/svg_inline/mono/*.svg';
const colorsSRC = '../../src/icons/svg_inline/colors/*.svg';
const iconsDEST = '../../src/images/icons';
const cssPath = '../../dist/css/';
const cssName = '*.css';

const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');

gulp.task('shorty', function() {
  return gulp.src(cssPath + cssName)
    .pipe(shorthand())
    .pipe(gulp.dest(cssPath));
});

gulp.task('mono', function() {
  return gulp.src(monoSRC)
    .pipe(newer(iconsDEST))
    .pipe(cheerio({
      run: function($, file) {
        $('[fill]').removeAttr('fill');
        $('[DOCTYPE]').removeAttr('DOCTYPE');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        let filename = file.relative.slice(0, -4);
        $('svg').attr('class', 'icon ' + 'icon-' + filename);
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgmin({
      plugins: [{
        removeDoctype: true
      },
      {
        removeComments: true
      },
      {
        removeNonInheritableGroupAttrs: true
      }
      ]
    }))
    .pipe(gulp.dest(iconsDEST));
});


gulp.task('colors', function() {
  return gulp.src(colorsSRC)
    .pipe(newer(iconsDEST))
    .pipe(cheerio({
      run: function($, file) {
        let filename = file.relative.slice(0, -4);
        $('svg').attr('class', 'icon ' + 'icon-' + filename);
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgmin({
      plugins: [{
        removeDoctype: true
      },
      {
        removeComments: true
      },
      {
        removeNonInheritableGroupAttrs: true
      }
      ]
    }))
    .pipe(gulp.dest(iconsDEST));
});


gulp.task('icons', ['mono', 'colors']);


gulp.task('remfill', function() {
  return gulp.src('../../src/icons/sprite/mono/*.svg')
    .pipe(newer('../../src/icons/sprite/'))
    .pipe(cheerio({
      run: function($, file) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(gulp.dest('../../src/icons/sprite/mono/'));
});

gulp.task('svgSpriteBuild', function() {
  return gulp.src(['../../src/icons/sprite/mono/*.svg', '../../src/icons/sprite/colors/*.svg'])
    .pipe(newer('../../src/icons/sprite/'))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite_icons.svg',
          render: {
            sass: {
              dest: '../../sass/_helpers/_svgsprite',
              template: '../../src/icons/sprite/_sprite_template.sass'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('../../src/images/'));
});

gulp.task('svgsprite', ['remfill', 'svgSpriteBuild']);