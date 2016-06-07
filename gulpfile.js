var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var data = require('gulp-data');
var path = require('path');
var styleguide = require('sc5-styleguide');
var outputPath = 'dist/styleguide';

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./dist"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('compile', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('src/*.html')
        .pipe(data(function(file) {
          return require('./data/' + path.basename(file.path) + '.json');
        }))
        .pipe(twig())
        .pipe(gulp.dest('./dist'));
});

gulp.task('styleguide:generate', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        port: 8000,
        rootPath: outputPath,
        overviewPath: 'styleguide.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('src/styles/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('default', ['browser-sync', 'styleguide', 'compile'], function(){
  gulp.watch("src/styles/**/*.scss", ['styleguide', 'styles']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("src/**/*.html", ['bs-reload', 'compile']);
  // gulp.watch(['scss/*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['browser-sync', 'styleguide:generate', 'styleguide:applystyles']);
