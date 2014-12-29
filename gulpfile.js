"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserify = require("browserify");
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
    .pipe(gulp.dest("./dist/"));
});

//////////////////////////////////////////////////

gulp.task("build:sources", function() {
  var files = glob.sync("./dist/*.js");
  var b = browserify({
    entries: files,
    debug: true
  });

  return b.bundle()
    .pipe(source("ano_gakki.js"))
    .pipe(gulp.dest("./dist/"))
});

gulp.task("build:tests", function(callback) {
  var files = glob.sync("./test/lib/*.js");
  var b = browserify({
    entries: files,
    debug: true
  });
  b.transform("espowerify");

  return b.bundle()
    .pipe(source("all_test.js"))
    .pipe(gulp.dest("./test/"));
});

//////////////////////////////////////////////////

gulp.task("lint", function() {
  return gulp.src(["./src/**/*.js", "./test/**/*.js"])
    .pipe($.jshint())
    .pipe($.jshint.reporter(require("jshint-stylish")))
    .pipe($.jshint.reporter("fail"))
});

gulp.task("test", function(callback) {
  return gulp.src(["./test/all_test.js"])
    .pipe($.mocha())
    .on("error", callback);
});

gulp.task("cover", function(callback) {
  gulp.src("./src/**/*.js")
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire())
    .on("finish", function() {
      return gulp.src(["./test/**/*.js"])
        .pipe($.mocha())
        .pipe($.istanbul.writeReports())
        .on("end", callback);
    })
});

//////////////////////////////////////////////////

gulp.task("default", ["compile"]);
