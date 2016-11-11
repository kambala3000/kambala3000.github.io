'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCSS = require('gulp-concat-css'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "app"
        },
        notify: false
    });
});

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

gulp.task('sass', function() {
    return gulp.src('app/sass/style.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer(['last 5 versions']))
        .pipe(gulp.dest('app/css'))
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['removedist', 'minify-libs', 'minify-plugins', 'minify-mainjs', 'minify-css', 'imagemin', 'fonts', 'sass'], function() {
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

gulp.task('default', ['watch']);
