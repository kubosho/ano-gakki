"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserify = require("browserify");
var del = require("del");
var source = require("vinyl-source-stream");
var glob = require("glob");
var runSequence = require("run-sequence");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var tsProject = $.typescript.createProject({
  target: "es5",
  removeComments: true,
  sortOutput: true
});

//////////////////////////////////////////////////

gulp.task("compile", function() {
  gulp.src(["./src/**/*.ts"])
    .pipe($.typescript(tsProject))
    .js
    .pipe(gulp.dest("./src/"));
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

gulp.task("test", function(callback) {
  require("./test/bootstrap.js");
  gulp.src("./src/**/*.js")
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire())
    .on("finish", function() {
      return gulp.src("./test/espower/*.js")
        .pipe($.mocha())
        .pipe($.istanbul.writeReports({
          reporters: ['lcov', 'text-summary']
        }))
        .on("end", callback);
    });
});

//////////////////////////////////////////////////

gulp.task("browserify", function() {
  var files = glob.sync("./src/**/*.js");
  var b = browserify({
    entries: files,
    debug: true
  });

  return b.bundle()
    .pipe(source("ano_gakki.js"))
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

gulp.task("default", ["compile"]);
