/// <reference path="../DefinitelyTyped/fabricjs/fabricjs.d.ts" />

import Audio = require("./lib/Audio");
import context = require("./lib/Context");
import convert = require("./lib/Convert");
import shape = require("./lib/Shape");

function main() {
  "use strict";

  var windowW = window.innerWidth,
      windowH = window.innerHeight;

  var canvas = new fabric.Canvas("c");
  canvas.setWidth(windowW);
  canvas.setHeight(windowH);

  var linePoints = [
    // xStart, yStart, xEnd, yEnd
    [0, (windowH / 2), windowW, (windowH / 2)],
    [(windowW / 3.6), 0, (windowW / 3.6), windowH],
    [(windowW / 1.25), 0, (windowW / 10), windowH],
    [(windowW / 3.9), 0, (windowW / 1.5), windowH],
    [0, (windowH / 4), windowW, (windowH / 4)],
    [(windowW / 1.8), 0, (windowW / 2.8), windowH]
  ];

  var lines = [];
  linePoints.forEach((point, i) => {
    lines.push(shape.Line.create(linePoints[i]));
  });

  var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];
  var ctx = context();
  var audio = new Audio(ctx);

  var currentPlayIndex = 0;
  document.addEventListener("click", () => {
    if (currentPlayIndex === innocence.length) {
      currentPlayIndex = 0;
    }

    var key = innocence[currentPlayIndex];
    var sound = audio.createSound(convert.noteToFreq(convert.keyToNote(key)));
    sound.connect(ctx.destination);

    sound.start(0);
    setTimeout(function () {
      sound.stop(0);
    }, 200);

    var line = lines[currentPlayIndex];
    if (line.getOpacity() === 0) {
      line.opacity = 1;
    }

    canvas.add(line);

    line.animate("opacity", 0, {
      duration: 1000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: function() {
        line.opacity = 0;
      }
    });

    // rect
    var rect = shape.Rect.create();
    canvas.add(rect);

    function animate() {
      canvas.forEachObject(obj => {
        obj.left += ((<any>obj).movingLeft ? -1 : 1);
        obj.top += 1;
        if (obj.left > 900 || obj.top > 500) {
          canvas.remove(obj);
        }
        else {
          obj.setAngle(obj.getAngle() + 2);
        }
      });
      requestAnimationFrame(animate);
    }
    canvas.renderAll();
    requestAnimationFrame(animate);

    currentPlayIndex++;
  });
}

document.addEventListener("DOMContentLoaded", main, false);
