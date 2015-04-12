"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserify = require("browserify");
var del = require("del");
var source = require("vinyl-source-stream");
var runSequence = require("run-sequence");
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
  return gulp.src(["./src/scripts/*.ts"])
    .pipe($.typescript(tsProject))
    .js
    .pipe(gulp.dest("./lib/"));
});

//////////////////////////////////////////////////

gulp.task("espower", function() {
  return gulp.src("./test/src/*.js")
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
  gulp.src("./lib/**/*.js")
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
  return browserify("./lib/main.js")
    .bundle()
    .pipe(source("ano-gakki.js"))
    .pipe(gulp.dest("./dist/"));
});

//////////////////////////////////////////////////

gulp.task("serve", function() {
  browserSync({
    notify: false,
    server: './dist/'
  });

  gulp.watch(['./src/**/*.ts'], ["compile", "lint", "browserify", reload]);
});

//////////////////////////////////////////////////

gulp.task('clean', del.bind(null, ["lib/*.js", "test/espower/*.js"]));

//////////////////////////////////////////////////

gulp.task("default", ["compile"]);
