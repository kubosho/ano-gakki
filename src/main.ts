import Data = require("./Data");
import Shape = require("./Shape");
import Sound = require("./Sound");
import context = require("./Context");

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

    document.addEventListener("click", (ev: PointerEvent) => {
        if (currentPlayIndex === sounds.length) {
            currentPlayIndex = 0;
            sound.destroySounds();
            sounds = sound.createSounds();
        }

        var linePoints = data.getLinePoints(windowSize.x, windowSize.y);
        var line = shape.drawLine(linePoints[currentPlayIndex]);

        var circle = shape.drawCircle(ev.pageX, ev.pageY, 10);

        setTimeout(() => {
            line.remove();
            circle.remove();
        }, 1000);

        sound.play(sounds[currentPlayIndex]);
        sound.stop(sounds[currentPlayIndex]);

        currentPlayIndex++;
    });
}

document.addEventListener("DOMContentLoaded", main, false);
