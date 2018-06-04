var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
  browserify('./src/vote.js', {
    debug: true
  })
    .transform(reactify)
    .bundle()
    .on("error", function(err) {
      console.log("Error : " + err.message);
    })
    .pipe(source('vote.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify-count', function() {
  browserify('./src/count.js', {
    debug: true
  })
    .transform(reactify)
    .bundle()
    .on("error", function(err) {
      console.log("Error : " + err.message);
    })
    .pipe(source('count.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['browserify', 'browserify-count']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
