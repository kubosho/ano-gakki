import Sound = require("./lib/sound");

"use strict";

function main() {
  var sound = new Sound();
  var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];
  var currentPlayIndex = 0;

  document.addEventListener("click", () => {
    if (currentPlayIndex === innocence.length) {
      currentPlayIndex = 0;
    }

    var osc = sound.oscillator(innocence[currentPlayIndex]);
    osc.connect(sound.ctx.destination);

    osc.start(0);
    setTimeout(() => {
      osc.stop(0);
    }, 200);

    currentPlayIndex++;
  });
}

document.addEventListener("DOMContentLoaded", main, false);

