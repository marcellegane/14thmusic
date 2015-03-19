//------------------------------------------------------------------------
//  $Required plugins
//------------------------------------------------------------------------


var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var postcss = require('gulp-postcss');
var opacity = function(css) {
    css.eachDecl(function(decl, i) {
        if (decl.prop === 'opacity') {
            decl.parent.insertAfter(i, {
                prop: '-ms-filter',
                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
            });
        }
    });
};

var paths = {
    sass: 'src/sass/**/*.scss',
    js: 'src/js/*.js',
    jsHead: 'src/js/header/*.js',
    img: 'src/img/**',
    css: 'build/css',
    jsDist: 'build/js',
    jsHeadDist: 'build/js/header',
    imgDist: 'build/assets/img'
};


//------------------------------------------------------------------------
//  $Run Sass, autoprefix, minify
//------------------------------------------------------------------------


gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefix({
            browsers: ['> 1%', 'Firefox > 10', 'ie 8']
        }))
        .pipe(postcss([opacity]))
        .pipe(gulp.dest(paths.css))
        .pipe(rename('style.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.css));
});


//------------------------------------------------------------------------
//  $Concatanate and minify main scripts
//------------------------------------------------------------------------


gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.jsDist))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsDist));
});


//------------------------------------------------------------------------
//  $Concat and minify header scripts
//------------------------------------------------------------------------


gulp.task('jsHead', function() {
    gulp.src(paths.jsHead)
        .pipe(concat('header.js'))
        .pipe(gulp.dest(paths.jsHeadDist))
        .pipe(rename('header.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsHeadDist));
});


//------------------------------------------------------------------------
//  $Minify images
//------------------------------------------------------------------------


gulp.task('imagemin', function () {
    gulp.src(paths.img)
        .pipe(newer(paths.imgDist))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(paths.imgDist));
});


//------------------------------------------------------------------------
//  $Watch task
//------------------------------------------------------------------------


gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.jsHead, ['jsHead']);
    gulp.watch(paths.img, ['imagemin']);
});


//------------------------------------------------------------------------
//  $Default
//------------------------------------------------------------------------


// Default task
gulp.task('default', ['watch']);