var gulp = require('gulp');
var util = require('gulp-util');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var header = require('gulp-header');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var paths = {
    styles: [
        './_resources/styles/mavonst.less'
    ],
    statics: [
        './_resources/statics/**/*'
    ],
    build: './res'
};

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.build));
});
gulp.task('default', ['styles']);