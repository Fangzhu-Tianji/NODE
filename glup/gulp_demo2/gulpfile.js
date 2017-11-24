var gulp = require('gulp'),
      gulp_less = require('gulp-less'),
      gulp_uglify = require('gulp-uglify');

gulp.task('compress', function (cb) {
    gulp.src('src/*.js')
           .pipe(gulp_uglify())
           .pipe(gulp.dest('dist'))
});

gulp.task('default', ['compress']);