var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha');

gulp.task('test', [], function () {
  gulp.src('./test.js')
      .pipe(mocha());
});

gulp.task('default', [ 'test' ], function () {
  gulp.src('./minivents.js')
      .pipe(uglify())
      .pipe(rename('minivents.min.js'))
      .pipe(gulp.dest('./'));
});
