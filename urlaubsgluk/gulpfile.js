'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCSS = require('gulp-concat-css'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    babel = require('gulp-babel'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
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
    return gulp.src(['app/js/libs/jquery-3.1.1.min.js', 'app/js/libs/*.js', '!./app/js/libs/*.ie8.js'])
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

gulp.task('babel', function() {
    return gulp.src('app/js/mainES6.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(err) {
            const message = err.message || '';
            const errName = err.name || '';
            const codeFrame = err.codeFrame || '';
            gutil.log(gutil.colors.red.bold('[JS babel error]') + ' ' + gutil.colors.bgRed(errName));
            gutil.log(gutil.colors.bold('message:') + ' ' + message);
            gutil.log(gutil.colors.bold('codeframe:') + '\n' + codeFrame);
            this.emit('end');
        })
        .pipe(rename('main.js'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('minify-mainjs', function() {
    return gulp.src('app/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-stylecss', function() {
    return gulp.src(['app/css/*.css', '!./app/css/*.ie8.css'])
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

gulp.task('sprite', function() {
    var spriteData = gulp.src('app/img/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        padding: 2
    }));
    return spriteData.pipe(gulp.dest('temp'));
});


gulp.task('watch', ['sass', 'babel', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/js/mainES6.js', ['babel']);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch(['app/js/**/*.js', '!./app/js/mainES6.js'], browserSync.reload);
});

gulp.task('build', ['removedist', 'minify-libsjs', 'minify-pluginsjs', 'minify-mainjs', 'minify-stylecss', 'minify-pluginscss', 'imagemin', 'sass'], function() {
    var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
    var jsIE8 =  gulp.src('app/js/libs/*.ie8.js').pipe(gulp.dest('dist/js/libs'));
    var cssIE8 =  gulp.src('app/css/*.ie8.css').pipe(gulp.dest('dist/css'));
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
