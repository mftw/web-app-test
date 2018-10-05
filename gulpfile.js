
// const fs = require('fs');
// const imageminJpegtran = require('imagemin-jpegtran');
// const gulpCopy = require('gulp-copy');
// var cache = require('gulp-cache');
// var imagemin = require('gulp-imagemin');
// var imageminZopfli = require('imagemin-zopfli');
// var imageminGiflossy = require('imagemin-giflossy');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const combineMq = require('gulp-combine-mq');
const sassdoc = require('sassdoc');
const purge = require('gulp-css-purge');
const htmlvalidate = require('gulp-w3cjs');
const postcss = require('gulp-postcss');
const sitemap = require('gulp-sitemap');
const gulpSeo = require('gulp-seo');

const runSequence = require('run-sequence');
const del = require('del');
const imagemin = require('gulp-imagemin');

const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'

const uglify = require('gulp-uglify');
const cssval = require('gulp-w3c-css');
const robots = require('gulp-robots');

const htmlmin = require('gulp-htmlmin');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
// const fontmagic = require('postcss-font-magician');
//script paths
var jsFiles = 'src/js/**/*.js',
    jsDest = 'dist/js';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(plumber())
        .pipe(concat('app.js'))
        // .pipe(concat())
        .pipe(gulp.dest(jsDest))
        // .pipe(rename('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-sw', function() {
    return gulp.src('src/sw.js')
        .pipe(plumber())
        .pipe(concat('sw.js'))
        // .pipe(concat())
        .pipe(gulp.dest('dist/'))
        // .pipe(rename('app.js'))
        .pipe(uglify())
        // .pipe(gulp.dest(jsDest));
        .pipe(gulp.dest('dist/'))
});

// Validate CSS, if you dare
gulp.task('cssval', function () {
    gulp.src('src/css/**/*.css')
        // gulp.src('src/views/*.html')
        .pipe(cssval())
        // .pipe(htmlvalidate.reporter());
        .pipe(gulp.dest('src/docs/tests/'))
});

// Validate CSS, if you dare
gulp.task('cssval-prod', function () {
    gulp.src('dist/css/**/*.css')
        // gulp.src('src/views/*.html')
        .pipe(cssval())
        // .pipe(htmlvalidate.reporter());
        .pipe(gulp.dest('dist/docs/tests/'))
});

gulp.task('htmlminify', function () {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-favicon', function () {
    gulp.src('src/favicon.ico')
    // .pipe(plumber())
    // .pipe(gulpCopy('dist/icons', { prefix: 0 }))


    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-extra', function () {
    gulp.src(['src/.gitignore', 'src/.gitattributes', 'src/favicon.ico'])
    // .pipe(plumber())
    // .pipe(gulpCopy('dist/icons', { prefix: 0 }))


    .pipe(gulp.dest('dist/'))
});

gulp.task('robottxt', function () {
    gulp.src('src/index.html')
        .pipe(robots({
            useragent: '*',
            allow: ['js/', 'css/', 'img/'],
            disallow: ['docs/']
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('del-dist', function () {
    del(['./dist']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('clean', function (done) {
    del([
        //   dirs.archive,
        //   dirs.dist
        './dist'
    ]).then( function () {
        done();
    });
});

gulp.task('uglify', function () {
    // return gulp.src('src/js/**/*.js')
    gulp.src('src/js/**/*.js')
        // .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))

});

gulp.task('build', function (callback) {
    runSequence(
        // 'del-dist',
        'clean',
        // ['seo', 'sass-prod', 'uglify', 'robottxt', 'copy-extra'],
        ['seo', 'sass-prod', 'scripts', 'robottxt', 'copy-extra'],
        // 'copy-favicon', 
        'scripts-sw',
        'sitemap',
        'cssval-prod',
        // 'sass-prod',
        'sassdoc',
        'minify-icons',
        'imagemin',
        callback);
});


gulp.task('imagemin', function () {
    // gulp.src('src/img/*')
    return gulp.src(['src/img/**/*.{gif,png,jpg,svg}'])
        .pipe(plumber())
        // .pipe(imagemin())
        // .pipe(imagemin({
        //     interlaced: true,
        //     progressive: true,
        //     optimizationLevel: 5,
        //     svgoPlugins: [{removeViewBox: true}]
        // }))
        .pipe(imagemin([
            // imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({
                progressive: true
            }),
            imageminMozjpeg({
                quality: 80
            }),
            imageminPngquant({
                speed: 1,
                quality: 90 //lossy settings
            }),

            // imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: true}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
});


gulp.task('minify-icons', function () {
    // gulp.src('src/img/*')
    return gulp.src(['src/icons/**/*.svg'])
        .pipe(plumber())
        // .pipe(imagemin())
        // .pipe(imagemin({
        //     interlaced: true,
        //     progressive: true,
        //     optimizationLevel: 5,
        //     svgoPlugins: [{removeViewBox: true}]
        // }))
        .pipe(imagemin([
            // imagemin.gifsicle({interlaced: true}),
            // imagemin.jpegtran({
            //     progressive: true
            // }),
            // imageminMozjpeg({
            //     quality: 80
            // }),
            // imageminPngquant({
            //     speed: 1,
            //     quality: 90 //lossy settings
            // }),

            // imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: true}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/icons'))
});

//compress all images
// gulp.task('imagemin', function() {
//     return gulp.src(['/**/*.{gif,png,jpg}'])
//         .pipe(plumber())
//         .pipe(cache(imagemin([
//             //png
//             imageminPngquant({
//                 speed: 1,
//                 quality: 98 //lossy settings
//             }),
//             imageminZopfli({
//                 more: true
//                 // iterations: 50 // very slow but more effective
//             }),
//             //gif
//             // imagemin.gifsicle({
//             //     interlaced: true,
//             //     optimizationLevel: 3
//             // }),
//             //gif very light lossy, use only one of gifsicle or Giflossy
//             imageminGiflossy({
//                 optimizationLevel: 3,
//                 optimize: 3, //keep-empty: Preserve empty transparent frames
//                 lossy: 2
//             }),
//             //svg
//             imagemin.svgo({
//                 plugins: [{
//                     removeViewBox: false
//                 }]
//             }),
//             //jpg lossless
//             imagemin.jpegtran({
//                 progressive: true
//             }),
//             //jpg very light lossy, use vs jpegtran
//             imageminMozjpeg({
//                 quality: 90
//             })
//         ])))
//         .pipe(gulp.dest('dist'));
// });



gulp.task('seo', function () {
    //   return gulp.src('src/index.html')
    return gulp.src('src/*.html')
        .pipe(gulpSeo({
            list: ['og', 'se', 'schema', 'twitter', 'lang: "dk"'],
            meta: {
                title: 'Ubuntu Conference',
                description: 'Ubuntu Conference Copenhagen in oeksnehallerne',
                // author: 'Maksym Blank',
                keywords: ['ubuntu', 'conference', 'copenhagen', 'linux'],
                robots: {
                    index: true, // true
                    follow: true // true
                },
                revisitAfter: '2 month', // 3 month
                // image: 'http://mywebsite.com/image.jpg',
                locale: 'dk',
                site_name: 'Ubuntu Conference',
                type: 'website',
            },
            html: {
                meta: {
                    lang: 'dk'
                }
            }
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('sitemap', function () {
    gulp.src('dist/**/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://www.ubuntu-conference-copenhagen.dk'
        }))
        .pipe(gulp.dest('./dist'));
});


// Compile Sass & Inject Into Browser
// gulp.task('sass', ['sasstoscss'], function() {
gulp.task('sass', function () {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            // outputStyle: 'compressed', 
            errorLogToConsole: true
        }))
        // .pipe(sourcemaps.write())
        .pipe(postcss([require('postcss-font-magician')({ /* options */ })]))
        // .pipe(postcss(fontmagic))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

var sassDocOptions = {
    dest: './dist/docs/sassdoc',
    // theme: 'flippant',
    // theme: 'jigsass',
    // verbose: true,
    display: {
        access: ['public', 'private'],
        alias: true,
        //   watermark: true,
    },
    // groups: {
    //   'undefined': 'Ungrouped',
    //   foo: 'Foo group',
    //   bar: 'Bar group',
    // },
    // basePath: 'https://github.com/mftw/ubuntu-conference',
};

var purgeOptions = {
    // css_output: 'test1.min.css',
    // shorten: false,
    // trim: false,
    // shorten_zero: false,
    // shorten_background_min: 1,
    // zero_ignore_declaration: [".footer"],
    // zero_units: "rem",
    // zero_ignore_declaration: ['border']
};

gulp.task('sassdoc', function () {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sassdoc(sassDocOptions))
    // .pipe(gulp.dest("./dist/docs"))
});

// Compile Sass & Inject Into Browser
gulp.task('sass-prod', function () {
    return gulp.src(['src/scss/**/*.scss'])
        // .pipe(plumber())
        // .pipe(sassdoc(sassDocOptions))
        .pipe(sass({
            outputStyle: 'compressed',
            errorLogToConsole: true
        }))
        .pipe(autoprefixer({
            // browsers: ['last 5 versions'],
            browsers: ['last 9 versions', '> 5%', 'ie 8', 'ie 7'],
            cascade: false
        }))
        .pipe(postcss([require('postcss-font-magician')({ /* options */ })]))
        .pipe(combineMq({
            beautify: false
        }))
        // .pipe(purge(purgeOptions)) // Don't purge for now, erroring on .0123 values being purged to 0123 and the browsers response is to see it as 123
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});


// Don't purge for now, erroring on .0123 values being 
// purged to 0123, and the browsers response is to see it as 123
// guess what happens when you set something to .0625rem
// original developer contacted for support.
gulp.task('purge', function () {
    console.log('BEWARE OF ERRORS! DOESNT PURGE PROPERLY!')
    gulp.src(['src/css/**/*.css'])
        .pipe(purge({
            "zero_ignore_declaration": [".footer"]
        }))
        //   .pipe(purge({
        //     "shorten" : false,
        //     "shorten_zero": false,
        //     "shorten_hexcolor": true,
        //     "shorten_hexcolor_extended_names": true,
        //     "shorten_hexcolor_UPPERCASE": true,
        //     "shorten_font": true,
        //     "shorten_background": true,
        //     "shorten_background_min": 2,
        //     "shorten_margin": true,
        //     "shorten_padding": true,
        //     "shorten_list_style": true,
        //     "shorten_outline": true,
        //     "shorten_border": true,
        //     "shorten_border_top": true,
        //     "shorten_border_right": true,
        //     "shorten_border_bottom": true,
        //     "shorten_border_left": true,
        //     "shorten_border_radius": true,
        // }))
        //   .pipe(purge(purgeOptions))
        .pipe(gulp.dest('./public'));
})

// Validate HTML, if you dare
gulp.task('htmlval', function () {
    gulp.src('src/*.html')
        // gulp.src('src/views/*.html')
        .pipe(htmlvalidate())
        .pipe(htmlvalidate.reporter());
});

// Validate production HTML, if you dare
gulp.task('htmlval-prod', function () {
    gulp.src('dist/*.html')
        // gulp.src('src/views/*.html')
        .pipe(htmlvalidate())
        .pipe(htmlvalidate.reporter())
        // .pipe(gulp.dest('dist/docs/tests/html.txt'))
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });

    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Watch Sass-prod & Serve
gulp.task('serve-prod', ['sass-prod'], function () {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch(['src/scss/**/*.scss'], ['sass-prod']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Watch Sass & Serve
gulp.task('compile', ['sass'], function () {
    gulp.watch(['src/scss/**/*.scss'], ['sass']);
});

// Watch Sass & Serve
gulp.task('compile-prod', ['sass-prod'], function () {
    gulp.watch(['src/scss/**/*.scss'], ['sass-prod']);
});

// Default Task
gulp.task('default', ['serve']);
// gulp.task('default', ['compile']);