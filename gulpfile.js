var gulp = require('gulp'),
    csscomb = require('gulp-csscomb'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    wrapper = require('gulp-wrapper'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip');

gulp.task('style', function() {
    return gulp.src('src/angular-rock.css')
        .pipe(csscomb())
        .pipe(gulp.dest('.'))
        .pipe(csso())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest('.'))
        .pipe(gzip())
        .pipe(gulp.dest('.'));
});


gulp.task('js', function() {
    return gulp.src([
        'src/core.js',
        'src/helpers.js',
        'src/services.js',
        'src/filters.js',
        'src/directives.js',
        'src/notifications/notification.js',
        'src/notifications/notification.controllers.js',
        'src/notifications/notification.services.js',
        'src/forms/forms.js',
        'src/forms/forms.directives.js',
        'src/forms/forms.controllers.js'
    ])
        .pipe(concat('angular-rock.js'))
        .pipe(wrapper({
            header: '/*\n* angular-rock\n* https://github.com/romeOz/angular-rock\n*\n* Version: 0.10.0\n* License: MIT\n*/\n' +
            '(function () {\n\'use strict\';\n\n',
            footer: '})();'
        }))
        .pipe(gulp.dest('.'))
        .pipe(uglify())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest('.'))
        .pipe(gzip())
        .pipe(gulp.dest('.'));
});