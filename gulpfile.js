var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

// Pagespeed stuff.
var psiBrowserSync = require('browser-sync');
var ngrok = require('ngrok');
var psi = require('psi');
var psiKey = 'AIzaSyD6XwJINckbaF_YrjF293wZz1wzoSrm1zg';
var sequence = require('run-sequence');
var psiSite = '';
var psiPortVal = 3020;

var project = require('./gulpsite.js');

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(psiPortVal, function (err, url) {
    psiSite = url;
    console.log('serving your tunnel from: ' + psiSite);
    cb();
  });
});

gulp.task('psi-desktop', function (cb) {
  return psi(psiSite, {
      key: psiKey,
      strategy: 'desktop',
  }).then(function (data) {
      console.log(data);
  });
});

gulp.task('psi-mobile', function (cb) {
  return psi(psiSite, {
      key: psiKey,
      strategy: 'mobile',
  }).then(function (data) {
      console.log(data);
  });
});

gulp.task('psi-seq', function (cb) {
  return sequence(
    'browser-sync-psi',
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  );
});

// my browser sync task for psi which only runs the build and
// serve function, as well as uses the set port and prevents
// opening the site in my browser
gulp.task('browser-sync-psi', function() {
  psiBrowserSync({
    port: psiPortVal,
    open: false,
    server: {
      baseDir: '.'
    }
  });
});

/**
 * @task sass-lint
 * Lint sass, abort calling task on error
 */
gulp.task('sass-lint', function () {
  return gulp.src(project.staticFolder + '/sass/**/*.s+(a|c)ss')
  .pipe($.sassLint({configFile: '.sass-lint.yml'}))
  .pipe($.sassLint.format())
  .pipe($.sassLint.failOnError());
});

gulp.task('sass-compile', ['sass-lint'], function () {
  // postCss plugins and processes
  var pcPlug = {
    autoprefixer: require('autoprefixer'),
    mqpacker: require('css-mqpacker')
  };
  var pcProcess = [
    pcPlug.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
    }),
    pcPlug.mqpacker()
  ];

  var task = gulp.src(project.staticFolder + '/sass/**/*.s+(a|c)ss') // Gets all files ending
  .pipe($.sourcemaps.init())
  .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  .pipe($.sass())
  .on('error', function (err) {
    console.log(err);
    this.emit('end');
  })
  .pipe($.postcss(pcProcess))
  .pipe($.uglifycss({
    "maxLineLen": 80,
    "uglyComments": true
  }))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(project.staticFolder + '/css'));

  if (project.browserSync.enabled) {
    task.pipe(browserSync.stream());
  }

  task.pipe($.notify({
    title: 'sass-compile',
    message: 'Finished compiling',
    onLast: true
  }));

  return task;
});

/**
 * @task js
 *
 */
gulp.task('js', function () {
  var task = gulp.src([project.staticFolder + '/js-src/*.js'])
  .pipe($.sourcemaps.init())
  .pipe($.jscs({fix: true}))
  .pipe($.jscs.reporter())
  .pipe($.concat('main.js'))
  .pipe($.uglify())
  .pipe($.sourcemaps.write())
  .on('error', function (err) {
    console.log(err);
    this.emit('end');
  })
  .pipe(gulp.dest('./static/js'));

  if (project.browserSync.enabled) {
    task.pipe(browserSync.stream());
  }

  return task;
});

/**
 * @task js
 * Do javascript libraries stuff.
 */
gulp.task('js-lib', function () {
  var task = gulp.src([project.staticFolder + '/js-src/lib/*.js'])
  .pipe($.sourcemaps.init())
  .pipe($.concat('main.lib.js'))
  .pipe($.uglify())
  .pipe($.sourcemaps.write())
  .on('error', function (err) {
    console.log(err);
    this.emit('end');
  })
  .pipe(gulp.dest('./static/js'));

  if (project.browserSync.enabled) {
    task.pipe(browserSync.stream());
  }

  return task;
});

/**
 * @task js
 * Do javascript assets stuff.
 */
gulp.task('js-assets', function () {
  var task = gulp.src([project.staticFolder + '/js-src/assets/*.js'])
  .pipe($.sourcemaps.init())
  .pipe($.jscs({fix: true}))
  .pipe($.jscs.reporter())
  .pipe($.concat('main.assets.js'))
  .pipe($.uglify())
  .pipe($.sourcemaps.write())
  .on('error', function (err) {
    console.log(err);
    this.emit('end');
  })
  .pipe(gulp.dest('./static/js'));

  if (project.browserSync.enabled) {
    task.pipe(browserSync.stream());
  }

  return task;
});

/**
 * @task js
 * Do javascript assets stuff.
 */
gulp.task('js-managers', function () {
  var task = gulp.src([project.staticFolder + '/js-src/managers/*.js'])
  .pipe($.sourcemaps.init())
  .pipe($.jscs({fix: true}))
  .pipe($.jscs.reporter())
  .pipe($.concat('main.managers.js'))
  .pipe($.uglify())
  .pipe($.sourcemaps.write())
  .on('error', function (err) {
    console.log(err);
    this.emit('end');
  })
  .pipe(gulp.dest('./static/js'));

  if (project.browserSync.enabled) {
    task.pipe(browserSync.stream());
  }

  return task;
});

/**
 * @task clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
  return del([project.staticFolder + '/css/*', project.staticFolder + '/js/*']);
});

/**
 * @task watch
 * Watch files and do stuff.
 */
gulp.task('watch', ['clean', 'sass-compile', 'js', 'js-lib', 'js-assets', 'js-managers'], function () {
  if (project.browserSync.enabled) {
    browserSync.init({
      server: './',
      logLevel: project.browserSync.logLevel,
      open: project.browserSync.open
    });
  }

  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch(project.staticFolder + '/sass/**/*.+(scss|sass)', ['sass-compile']);
  gulp.watch(project.staticFolder + '/js-src/**/*.js', ['js', 'js-lib', 'js-assets', 'js-managers']);
});

gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!')
  process.exit();
})

/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', ['watch']);
