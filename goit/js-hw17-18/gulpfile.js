'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    concatCSS = require('gulp-concat-css'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');

gulp.task('removedist', function() {
    return del.sync('dist');
});

gulp.task('minify-libs', function() {
    return gulp.src('app/js/libs/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-plugins', function() {
    return gulp.src('app/js/plugins/*.js')
        .pipe(concat('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-mainjs', function() {
    return gulp.src('app/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
    return gulp.src('app/css/*.css')
        .pipe(concatCSS('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('build', ['removedist', 'minify-libs', 'minify-plugins', 'minify-mainjs', 'minify-css', 'imagemin'], function() {
    var target = gulp.src('app/index.html');
    var sources = gulp.src(['dist/js/**/*.js', 'dist/css/**/*.css'], {
        read: false,
    });
    target.pipe(inject(sources, {
        ignorePath: 'dist',
        addRootSlash: false
    }))
        .pipe(gulp.dest('dist'));
});
