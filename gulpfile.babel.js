var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var gulpFilter = require('gulp-filter');
var fs = require('fs');
var $ = require('gulp-load-plugins')(); // loads other gulp plugins
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
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-function-bind']
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
      .pipe(gulp.dest('./dist/scripts/'))
      .pipe(browserSync.reload({
        stream: true
      }));
  },
  watch: function() {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function() {
    this.w && this.w.close();
  }
};

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/*.css', ['styles']);
});

//watch scss for changes and render into minified css with nice auto-prefixing
gulp.task('styles', function() {
  return gulp.src('app/**/*.css')
    .on('error', $.util.log.bind($.util, 'Css error'))
    // .pipe($.uncss({
    //   html: ['app/**/*.html', 'app/index.html']
    // }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.concat('main.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.size());
});

gulp.task('scripts', function() {
  bundler.init();
  return bundler.bundle();
});

gulp.task('html:main', function() {
  return gulp.src(['app/**/*.html', 'app/index.html'])
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
  .pipe($.size());
});

gulp.task('html:assets', function() {
  return gulp.src(['node_modules/angular-ui-bootstrap/**/*.html', '!node_modules/angular-ui-bootstrap/src/**/*.html'])
    .pipe(gulp.dest('dist/uib'))
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

gulp.task('html', ['html:main', 'html:assets']);

gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('build', bundler.stop.bind(bundler));

gulp.task('bundle', ['html', 'styles', 'scripts', 'extras']);

gulp.task('build:production', ['set-production', 'minify', 'build']);

gulp.task('serve:production', ['build:production', 'serve']);

gulp.task('default', ['build']);

gulp.task('watch', ['bundle', 'serve']),
  function() {
    bundler.watch();
    gulp.watch('app/styles/**/*.css', ['styles']);
  };
