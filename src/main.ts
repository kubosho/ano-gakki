/// <reference path="../DefinitelyTyped/fabricjs/fabricjs.d.ts" />

import Sound = require("./lib/sound");
import Line = require("./lib/line");

var sound = new Sound();

"use strict";

function playSound(key: string) {
  var osc = sound.oscillator(key);
  osc.connect(sound.ctx.destination);

  osc.start(0);
  setTimeout(() => {
    osc.stop(0);
  }, 200);
}

function main() {
  var windowW = window.innerWidth,
      windowH = window.innerHeight;

  var currentPlayIndex = 0;

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
    if (currentPlayIndex === innocence.length) {
      currentPlayIndex = 0;
    }

    playSound(innocence[currentPlayIndex]);

    var line = Line.draw(canvas, lines[currentPlayIndex]);
    (<any>line).animate('opacity', 0, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000
    });

    currentPlayIndex++;
  });
}

document.addEventListener("DOMContentLoaded", main, false);
