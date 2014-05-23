// minivents - created with Gulp Fiction
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('default', [], function () {
  gulp.src('./minivents.js')
      .pipe(uglify())
      .pipe(rename('minivents.min.js'))
      .pipe(gulp.dest('./'));
});
