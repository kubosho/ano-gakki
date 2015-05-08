/* eslint-disable */

"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserify = require("browserify");
var del = require("del");
var source = require("vinyl-source-stream");
var sequence = require("run-sequence");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var tsProject = $.typescript.createProject({
  target: "es5",
  module: "commonjs",
  noImplicitAny: true,
  removeComments: true,
  sortOutput: true
});

//////////////////////////////////////////////////

gulp.task("compile", function() {
  return gulp.src(["./src/*.ts"])
    .pipe($.typescript(tsProject))
    .js
    .pipe(gulp.dest("./src/"));
});

//////////////////////////////////////////////////

gulp.task("espower", function() {
  return gulp.src("./test/*.test.js")
    .pipe($.espower())
    .pipe(gulp.dest("./test/espower/"));
});

//////////////////////////////////////////////////

gulp.task("test", function(cb) {
  require("./test/bootstrap.js");
  gulp.src("./src/*.js")
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire())
    .on("finish", function() {
      return gulp.src("./test/espower/*.js")
        .pipe($.mocha())
        .pipe($.istanbul.writeReports({
          reporters: ["lcov", "text-summary"]
        }))
        .on("end", cb);
    });
});

//////////////////////////////////////////////////

gulp.task("browserify", function() {
  return browserify("./src/main.js")
    .bundle()
    .pipe(source("ano-gakki.js"))
    .pipe(gulp.dest("./dist/"));
});

//////////////////////////////////////////////////

gulp.task("serve", function() {
  browserSync({
    notify: false,
    server: "./dist/"
  });

  gulp.watch(["./src/**/*.ts"], ["compile", "browserify", reload]);
});

//////////////////////////////////////////////////

gulp.task("clean", del.bind(null, ["src/*.js", "test/espower/*.js"]));

//////////////////////////////////////////////////

gulp.task("build", function(cb) {
    sequence("clean", ["compile", "espower"], "test", "browserify", cb);
});
