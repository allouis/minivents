var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha');

gulp.task('hint', function () {
    gulp.src('./minivents.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('test', [], function () {
  gulp.src('./test.js')
      .pipe(mocha());
});

gulp.task('build', [], function () {
    gulp.src('./minivents.js')
      .pipe(uglify())
      .pipe(rename('minivents.min.js'))
      .pipe(gulp.dest('./'));
  });

gulp.task('default', [ 'test', 'build' ], function () {
  
});
