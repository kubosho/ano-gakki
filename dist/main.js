var Data = require("./data");
var Shape = require("./shape");
var Sound = require("./sound");
var context = require("./context");
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
    document.addEventListener("click", function (ev) {
        if (currentPlayIndex === sounds.length) {
            currentPlayIndex = 0;
            sound.destroySounds();
            sounds = sound.createSounds();
        }
        var linePoints = data.getLinePoints(windowSize.x, windowSize.y);
        var line = function () { return shape.drawLine(linePoints[currentPlayIndex]); };
        var circle = function () { return shape.drawCircle(ev.pageX, ev.pageY, 10); };
        _.sample([line, circle])();
        sound.play(sounds[currentPlayIndex]);
        sound.stop(sounds[currentPlayIndex]);
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);