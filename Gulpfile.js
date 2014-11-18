var gulp = require('gulp');
var util = require('gulp-util');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var header = require('gulp-header');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var pkg = require('./package.json');
var currentYear = util.date(new Date(), 'yyyy');

var paths = {
    scriptsCommon: [
        './_resources/vendors/jquery-2.1.1/jquery-2.1.1.js',
        './_resources/scripts/utils.js'
    ],
     scriptsMain: [
        './_resources/vendors/bootstrap/3.3.0/js/modal.js',
        './_resources/vendors/bootstrap/3.3.0/js/tooltip.js',
        './_resources/vendors/bootstrap/3.3.0/js/transition.js',
        './_resources/vendors/bootstrap/3.3.0/js/tab.js',
    ],
    styles: [
        './_resources/styles/mavs.less'
    ],
    statics: [
        './_resources/statics/**/*'
    ],
    build: './res'
};

var bannerScriptsCommon = [
'/*!',
' * <%= pkg.name %> v<%= pkg.version %> | Copyright (c) <%= currentYear %> <%= pkg.author %> | <%= pkg.homepage %>',
' * jQuery JavaScript Library v2.1.1 | Copyright (c) 2005, 2014 jQuery Foundation, Inc. and other contributors | MIT license | http://jquery.com',
' */',
''
].join('\n');

var bannerScriptsMain = [
'/*!',
' * <%= pkg.name %> v<%= pkg.version %> | Copyright (c) <%= currentYear %> <%= pkg.author %> | <%= pkg.homepage %>',
' * Bootstrap v3.1.1 | Copyright (c) 2011-2014 Twitter, Inc. | MIT license | http://getbootstrap.com',
' */',
''
].join('\n');

gulp.task('scriptsCommon', function() {
return gulp.src(paths.scriptsCommon)
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(header(bannerScriptsCommon, {pkg: pkg, currentYear: currentYear}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('scriptsMain', function() {
return gulp.src(paths.scriptsMain)
        .pipe(concat('mavonst.min.js'))
        .pipe(uglify())
        .pipe(header(bannerScriptsMain, {pkg: pkg, currentYear: currentYear}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('scripts', ['scriptsCommon', 'scriptsMain']);

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('statics', function() {
    return gulp.src(paths.statics)
        .pipe(gulp.dest(paths.build))
});

gulp.task('clean', function() {
    return gulp.src('./res', {read: false})
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'statics']);