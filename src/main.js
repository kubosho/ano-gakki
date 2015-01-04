var Audio = require("./lib/Audio");
var context = require("./lib/Context");
var convert = require("./lib/Convert");
var shape = require("./lib/Shape");
function main() {
    "use strict";
    var windowW = window.innerWidth, windowH = window.innerHeight;
    var canvas = new fabric.Canvas("c");
    canvas.setWidth(windowW);
    canvas.setHeight(windowH);
    var linePoints = [
        [0, (windowH / 2), windowW, (windowH / 2)],
        [(windowW / 3.6), 0, (windowW / 3.6), windowH],
        [(windowW / 1.25), 0, (windowW / 10), windowH],
        [(windowW / 3.9), 0, (windowW / 1.5), windowH],
        [0, (windowH / 4), windowW, (windowH / 4)],
        [(windowW / 1.8), 0, (windowW / 2.8), windowH]
    ];
    var lines = [];
    linePoints.forEach(function (point, i) {
        lines.push(shape.Line.create(linePoints[i]));
    });
    var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];
    var ctx = context();
    var audio = new Audio(ctx);
    var currentPlayIndex = 0;
    document.addEventListener("click", function () {
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
            onComplete: function () {
                line.opacity = 0;
            }
        });
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);
