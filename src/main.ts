/// <reference path="../DefinitelyTyped/fabricjs/fabricjs.d.ts" />

import convert = require("./lib/convert");
import audio = require("./lib/Audio");
import line = require("./lib/line");

function main() {
  "use strict";

  var windowW = window.innerWidth,
      windowH = window.innerHeight;

  var canvas = new fabric.Canvas("c");
  canvas.setWidth(windowW);
  canvas.setHeight(windowH);

  var lines = [
    // xStart, yStart, xEnd, yEnd
    [0, (windowH / 2), windowW, (windowH / 2)],
    [(windowW / 3.6), 0, (windowW / 3.6), windowH],
    [(windowW / 1.25), 0, (windowW / 10), windowH],
    [(windowW / 3.9), 0, (windowW / 1.5), windowH],
    [0, (windowH / 4), windowW, (windowH / 4)],
    [(windowW / 1.8), 0, (windowW / 2.8), windowH]
  ];

  var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];

  document.addEventListener("click", () => {
  });
}

document.addEventListener("DOMContentLoaded", main, false);
