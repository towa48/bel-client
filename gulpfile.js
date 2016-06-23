var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ngConstant = require('gulp-ng-constant');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['./scss/**/*.scss'],
  config: './www/config/ng-config.json',
  js: ['./www/js/*.js']
};

gulp.task('default', ['sass', 'build']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('build:clean', function() {
  return del(['./www/js/*-bundle.js', './www/js/*-bundle.min.js', './www/js/config.js']);
});

gulp.task('build:ngconfig', ['build:clean'], function(done) {
  var ngConfig = require(paths.config);
  var env = 'development';
  var envConfig = ngConfig[env];
  return ngConstant({
      name: envConfig['name'],
      constants: envConfig['constants'],
      wrap: true,
      stream: true
    })
    .pipe(rename({ basename:'config' }))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('build:js', ['build:clean', 'build:ngconfig'], function(done) {
  gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('app-bundle.js'))
    .pipe(gulp.dest('./www/js'))
    .pipe(rename('app-bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('build', ['build:js'], function(done) {
  done();
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
