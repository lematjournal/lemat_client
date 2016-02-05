var gulp = require('gulp');
var babel = require('gulp-babel');
var templateCache = require('gulp-angular-templatecache');
var gulpFilter = require('gulp-filter');
var forEach = require('gulp-foreach');
var path = require('path');
var reworkUrl = require('rework-plugin-url');
var fs = require('fs');
var del = require('del'); // deletes stuff
var $ = require('gulp-load-plugins')(); // loads other gulp plugins
var sync = $.sync(gulp).sync;
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var wiredep = require('wiredep').stream;
var source = require('vinyl-source-stream');

var bundler = {
  w: null,
  init: function() {
    this.w = watchify(browserify({
      entries: ['./app/scripts/app.js'],
      extensions: ['.js'],
      debug: true
    }).transform(babelify.configure({
      presets: ['stage-0', 'es2015'],
      plugins: ['transform-function-bind', 'transform-decorators-legacy']
    })));
  },
  bundle: function() {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('scripts.js'))
      .pipe($.ngAnnotate({
        add: true,
        single_quotes: true
      }))
      .pipe(gulp.dest('./dist/scripts/'));
  },
  watch: function() {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function() {
    this.w && this.w.close();
  }
};

// gulp.task('templates', function () {
//   gulp.src([
//       './**/*.html',
//       '!./node_modules/**'
//     ])
//     .pipe($.minifyHTML({
//       quotes: true
//     }))
//     .pipe(templates('templates.js'))
//     .pipe(gulp.dest('tmp'));
// });

//watch scss for changes and render into minified css with nice auto-prefixing
gulp.task('styles', function() {
  return $.rubySass('app/styles/main.scss', {
      style: 'expanded',
      precision: 10
    })
    .on('error', $.util.log.bind($.util, 'Sass Error'))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size());
});

gulp.task('scripts', function() {
  bundler.init();
  return bundler.bundle();
});

gulp.task('html:main', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('html:assets', function() {
  return gulp.src(['node_modules/angular-ui-bootstrap/**/*.html', '!node_modules/angular-ui-bootstrap/src/**/*.html'])
    .pipe(gulp.dest('dist/uib'))
    .pipe($.size());
})

gulp.task('cache', function() {
  return gulp.src('app/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages({
      remoteUrl: 'git@github.com:lematjournal/lematjournal.github.io.git',
      branch: 'master'
    }));
});

gulp.task('extras', function() {
  return gulp.src(['app/*.txt', 'app/*.ico', 'app/CNAME'])
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

//stylish output for errors
gulp.task('lint', function() {
  return gulp.src(['/app/*.js', '!./bower_components/**'])
    .pipe($.jshint())
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('serve', function() {
  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      port: 9000
    }));
});

gulp.task('wiredep', function() {
  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('minify:js', function() {
  return gulp.src('dist/scripts/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());
});

gulp.task('minify:css', function() {
  return gulp.src('dist/styles/**/*.css')
    .pipe($.cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size());
});

gulp.task('set-production', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('html', ['html:main','html:assets']);

gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('clean-bundle', sync(['clean', 'bundle']));

gulp.task('build', ['clean-bundle'], bundler.stop.bind(bundler));

gulp.task('bundle', ['html', 'styles', 'scripts', 'images', 'extras']);

gulp.task('build:production', sync(['set-production', 'minify', 'build']));

gulp.task('serve:production', sync(['build:production', 'serve']));

gulp.task('default', ['build']);

gulp.task('watch', sync(['clean-bundle', 'serve']), function() {
  bundler.watch();
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/images/**/*', ['images']);
});
