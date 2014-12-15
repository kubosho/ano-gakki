/// <reference path="../DefinitelyTyped/fabricjs/fabricjs.d.ts" />
import Sound = require("./lib/sound");

"use strict";

class Line {
  static create(coords: number[]) {
    return new fabric.Line(coords, {
      fill: "#51917a",
      stroke: "#51917a",
      strokeWidth: 10,
      selectable: false
    });
  }

  static draw(canvas: fabric.IStaticCanvas, coords: number[]): fabric.ILine {
    var line = Line.create(coords);
    canvas.add(line);
    return line;
  }
}

function main() {
  var windowW = window.innerWidth,
      windowH = window.innerHeight;

  var currentPlayIndex = 0;

  var canvas = new fabric.Canvas("c");
  canvas.setWidth(windowW);
  canvas.setHeight(windowH);

  var lines = [
    [0, (windowH / 2), windowW, (windowH / 2)],
    [(windowW / 3.6), 0, (windowW / 3.6), windowH],
    [(windowW / 1.25), 0, (windowW / 10), windowH],
    [(windowW / 3.9), 0, (windowW / 1.5), windowH],
    [0, (windowH / 4), windowW, (windowH / 4)],
    [(windowW / 1.8), 0, (windowW / 2.8), windowH]
  ];

  document.addEventListener("click", () => {
    if (currentPlayIndex === innocence.length) {
      currentPlayIndex = 0;
    }

    var osc = sound.oscillator(innocence[currentPlayIndex]);
    osc.connect(sound.ctx.destination);

    var line = Line.draw(canvas, lines[currentPlayIndex]);
    (<any>line).animate('opacity', 0, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000
    });

    currentPlayIndex++;
  });
}

document.addEventListener("DOMContentLoaded", main, false);

