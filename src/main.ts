import Sound = require("./Sound");
import context = require("./Context");

var ctx = context.create();
var sound = new Sound(ctx);

function main() {
    "use strict";

    var currentPlayIndex = 0;
    var sounds = sound.sounds;

    document.addEventListener("click", () => {
        if (currentPlayIndex === sounds.length) {
            currentPlayIndex = 0;
            sound.destroySounds();
            sounds = sound.createSounds();
        }

        sound.play(sounds[currentPlayIndex]);
        sound.stop(sounds[currentPlayIndex]);

        currentPlayIndex++;
    });
}

document.addEventListener("DOMContentLoaded", main, false);
