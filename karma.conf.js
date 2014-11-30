module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: [
      "mocha",
      "browserify"
    ],
    files: [
      "./test/scripts/**/*.js"
    ],
    exclude: [],
    browserify: {
      debug: true,
      transform: ["espowerify"]
    },
    preprocessors: {
      "./test/**/*.js":"browserify"
    },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false
  });
};
