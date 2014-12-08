/// <reference path="../../DefinitelyTyped/webaudioapi/waa.d.ts" />
import convert = require("./convert");

class Sound {
  ctx: AudioContext;

  constructor() {
    var AudioCtx = (<any>window).AudioContext || (<any>window).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  oscillator(key: string) {
    var osc = this.ctx.createOscillator();
    osc.frequency.value = convert.noteToFreq(convert.keyToNote(key));
    return osc;
  }
}

export = Sound;
