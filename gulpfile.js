"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserify = require("browserify");
var del = require("del");
var source = require("vinyl-source-stream");
var glob = require("glob");
var runSequence = require("run-sequence");
var merge = require("merge-stream");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var tsProject = $.typescript.createProject({
  target: "es5",
  module: "commonjs",
  removeComments: true,
  sortOutput: true
});

//////////////////////////////////////////////////

gulp.task("compile", function() {
  var development = gulp.src(["./src/**/*.ts"])
   .pipe($.typescript(tsProject))
   .js
   .pipe(gulp.dest("./dist/lib/"));

  var production = gulp.src(["./src/**/*.ts"])
    .pipe($.typescript(tsProject))
    .js
    .pipe($.concat("ano-gakki.js"))
    .pipe(gulp.dest("./dist/"));

  return merge(development, production);
});

//////////////////////////////////////////////////

gulp.task("espower", function(callback) {
  return gulp.src("./test/lib/*.js")
    .pipe($.espower())
    .pipe(gulp.dest("./test/espower/"));
});

//////////////////////////////////////////////////

gulp.task("lint", function() {
  return gulp.src(["./test/**/*.js", "./src/**/*.js"])
    .pipe($.jshint())
    .pipe($.jshint.reporter(require("jshint-stylish")))
    .pipe($.jshint.reporter("fail"));
});

//////////////////////////////////////////////////

gulp.task("test", function(cb) {
  require("./test/bootstrap.js");
  gulp.src("./dist/**/*.js")
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire())
    .on("finish", function() {
      return gulp.src("./test/espower/*.js")
        .pipe($.mocha())
        .pipe($.istanbul.writeReports({
          reporters: ['lcov', 'text-summary']
        }))
        .on("end", cb);
    });
});

//////////////////////////////////////////////////

gulp.task("browserify", function() {
  var files = glob.sync("./dist/**/*.js");
  var b = browserify({
    entries: files,
    debug: true
  });

  return b.bundle()
    .pipe(source("ano-gakki.js"))
    .pipe(gulp.dest("./dist/"));
});

//////////////////////////////////////////////////

gulp.task("serve", function() {
  browserSync({
    notify: false,
    server: './dist/'
  });

  gulp.watch(['./src/**/*.ts'], ["compile", "lint", "espower", "test", "browserify", reload]);
});

//////////////////////////////////////////////////

gulp.task('clean', del.bind(null, 'dist/*.js'));

//////////////////////////////////////////////////

gulp.task("default", ["compile"]);
