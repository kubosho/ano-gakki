var Data = require("./Data");
var Shape = require("./Shape");
var Sound = require("./Sound");
var context = require("./Context");
var ctx = context.create();
var data = new Data();
var sound = new Sound(ctx, data.freqs);
function main() {
    "use strict";
    var currentPlayIndex = 0;
    var sounds = sound.sounds;
    var windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
    };
    var shape = new Shape("#shape");
    document.addEventListener("click", function () {
        if (currentPlayIndex === sounds.length) {
            currentPlayIndex = 0;
            sound.destroySounds();
            sounds = sound.createSounds();
        }
        var linePoints = data.getLinePoints(windowSize.x, windowSize.y);
        var line = shape.createLine(linePoints[currentPlayIndex]);
        shape.drawLine(line);
        setTimeout(function () {
            line.remove();
        }, 1000);
        sound.play(sounds[currentPlayIndex]);
        sound.stop(sounds[currentPlayIndex]);
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);
