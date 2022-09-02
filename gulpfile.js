const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const del = require('del')
//напрямки до файлів
const paths = {
    styles:{
        src:'src/styles/**/*.less',
        dest:'dist/css/'
    },
    scripts:{
        src:'src/scripts/**/*.js',
        dest:'dist/js/'
    },
    images:{
        src: 'src/imag/*',
        dest: 'dist/images'
    },
    html:{
        src:'./*.html',
        dest: 'dist'
    }
}
//чистка папки
function clean(){
    return del(['dist'])
}

  function html(){
    return gulp.src(paths.html.src)
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browserSync.stream())
  }
//стилі
function styles(){
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({
        level:2
    }))
    .pipe(rename({
        basename:'main',
        suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
}
//для скриптів
function scripts(){
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

function img(){
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
}
//відслідковування змін
function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch(paths.html.dest).on('change',browserSync.reload)
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, html, gulp.parallel(styles, scripts), watch)
exports.clean = clean
exports.img = img
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.html = html
exports.build = build
exports.default = build