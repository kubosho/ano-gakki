/// <reference path="../../typings/bundle.d.ts" />

import Data = require("./data");
import Shape = require("./shape");
import Sound = require("./sound");
import context = require("./context");

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
        var line = () => shape.drawLine(linePoints[currentPlayIndex]);
        var circle = () => shape.drawCircle(ev.pageX, ev.pageY, 10);

        _.sample([line, circle])();

        sound.play(sounds[currentPlayIndex]);
        sound.stop(sounds[currentPlayIndex]);

        currentPlayIndex++;
    });
}

document.addEventListener("DOMContentLoaded", main, false);
