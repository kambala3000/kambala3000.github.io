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

gulp.task('minify-libsjs', function() {
    return gulp.src('app/js/libs/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-pluginsjs', function() {
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

gulp.task('minify-stylecss', function() {
    return gulp.src('app/css/*.css')
        .pipe(concatCSS('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-pluginscss', function() {
    return gulp.src('app/css/plugins/*.css')
        .pipe(concatCSS('plugins.css'))
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


gulp.task('watch', ['sass', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['removedist', 'minify-libsjs', 'minify-pluginsjs', 'minify-mainjs', 'minify-stylecss', 'minify-pluginscss', 'imagemin', 'sass'], function() {
    var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
    var target = gulp.src('app/index.html');
    var mainJsFile = gulp.src('dist/js/main.js', {
        read: false
    });
    var sources = gulp.src(['dist/js/**/*.js', '!./dist/js/main.js', 'dist/css/**/*.css'], {
        read: false,
    });
    target.pipe(inject(mainJsFile, {
            ignorePath: 'dist',
            addRootSlash: false,
            name: 'afterdocument'
        }))
        .pipe(inject(sources, {
            ignorePath: 'dist',
            addRootSlash: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);
