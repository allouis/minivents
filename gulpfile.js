var gulp     = require('gulp'),
    uglify   = require('gulp-uglify'),
    jshint   = require('gulp-jshint'),
    rename   = require('gulp-rename'),
    mocha    = require('gulp-mocha')
    define   = require('gulp-define-module')
    lazypipe = require('lazypipe');

var SRC_FILE = './src/minivents.js'
  , OUTPUT_DIR = './dist';

var modulify = function(type) {
  return lazypipe()
    .pipe(define, type)
    .pipe(rename, function(p) {
      if (type == 'plain')
        return;

      p.basename += '.' + type;
    })
    .pipe(gulp.dest, OUTPUT_DIR)();
};

gulp.task('hint', function () {
  return gulp.src(SRC_FILE)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', ['build'], function () {
  return gulp.src('./test.js')
    .pipe(mocha());
});

gulp.task('build.amd', function() {
  return gulp.src(SRC_FILE).pipe(modulify('amd'));
});

gulp.task('build.commonjs', function() {
  return gulp.src(SRC_FILE).pipe(modulify('commonjs'));
});

gulp.task('build.plain', function() {
  return gulp.src(SRC_FILE).pipe(modulify('plain'));
});

gulp.task('build', [
  'build.amd',
  'build.commonjs',
  'build.plain'
], function () {
  return gulp.src([
    OUTPUT_DIR + '/**/*',
    '!**/*.min.js'
  ])
    .pipe(uglify())
    .pipe(rename(function(p) {
      p.basename += '.min';
    }))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('default', ['test']);
