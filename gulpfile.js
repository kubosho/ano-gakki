"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserify = require("browserify");
var del = require("del");
var source = require("vinyl-source-stream");
var glob = require("glob");
var runSequence = require('run-sequence');

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
    .pipe(gulp.dest("./build/sources/"));
});

//////////////////////////////////////////////////

gulp.task("build:sources", function() {
  var files = glob.sync("./build/sources/**/*.js");
  var b = browserify({
    entries: files,
    debug: true
  });

  return b.bundle()
    .pipe(source("ano_gakki.js"))
    .pipe(gulp.dest("./dist/"));
});

//////////////////////////////////////////////////

gulp.task("build:tests", function(callback) {
  var files = glob.sync("./test/lib/*.js");
  var b = browserify({
    entries: files,
    debug: true
  });
  b.transform("espowerify");

  return b.bundle()
    .pipe(source("all_test.js"))
    .pipe(gulp.dest("./build/tests/"));
});

//////////////////////////////////////////////////

gulp.task("lint:sources", function() {
  return gulp.src(["./build/sources/**/*.js"])
    .pipe($.jshint())
    .pipe($.jshint.reporter(require("jshint-stylish")))
    .pipe($.jshint.reporter("fail"));
});

//////////////////////////////////////////////////

gulp.task("lint:tests", function() {
  return gulp.src(["./build/tests/**/*.js"])
    .pipe($.jshint())
    .pipe($.jshint.reporter(require("jshint-stylish")))
    .pipe($.jshint.reporter("fail"));
});

//////////////////////////////////////////////////

gulp.task("test", function(callback) {
  return gulp.src(["./build/tests/all_test.js"])
    .pipe($.mocha())
    .on("error", callback);
});

//////////////////////////////////////////////////

gulp.task("cover", function(callback) {
  gulp.src("./dist/ano_gakki.js")
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire())
    .on("finish", function() {
      return gulp.src(["./build/tests/all_test.js"])
        .pipe($.mocha())
        .pipe($.istanbul.writeReports({
          reporters: ['lcov', 'text', 'text-summary']
        }))
        .on("end", callback);
    });
});

//////////////////////////////////////////////////

gulp.task('clean', del.bind(null, ['build']));

//////////////////////////////////////////////////

gulp.task("default", ["compile"]);
