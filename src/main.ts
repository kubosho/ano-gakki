/// <reference path="../DefinitelyTyped/fabricjs/fabricjs.d.ts" />

import Convert = require("./lib/convert");
import Audio = require("./lib/Audio");
import Line = require("./lib/line");


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

  var audio = new Audio();
  var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];

  var currentPlayIndex = 0;

  document.addEventListener("click", () => {
    if (currentPlayIndex === innocence.length) {
      currentPlayIndex = 0;
    }

    var key = innocence[currentPlayIndex];

    var sound = audio.createSound(Convert.noteToFreq(Convert.keyToNote(key)));
    sound.connect(audio.ctx.destination);
    sound.start(0);
    setTimeout(() => {
      sound.stop(0);
    }, 200);

    var line = Line.draw(canvas, lines[currentPlayIndex]);
    (<any>line).animate('opacity', 0, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000
    });

    currentPlayIndex++;
  });
}

document.addEventListener("DOMContentLoaded", main, false);
