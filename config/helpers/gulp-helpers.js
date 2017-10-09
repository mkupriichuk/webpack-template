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

gulp.task('shorty', function() {
	return gulp.src(cssPath + cssName)
			.pipe(shorthand())
			.pipe(gulp.dest(cssPath));
});

gulp.task('mono', function () {
	return gulp.src(monoSRC)
		.pipe(newer(iconsDEST))
		.pipe(cheerio({
			run: function ($, file) {
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


gulp.task('colors', function () {
	return gulp.src(colorsSRC)
		.pipe(newer(iconsDEST))
		.pipe(cheerio({
			run: function ($, file) {
				let filename = file.relative.slice(0, -4);
				$('svg').attr('class', 'icon ' + 'icon-' + filename);
			},
			parserOptions: {
				xmlMode: true
			},
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

