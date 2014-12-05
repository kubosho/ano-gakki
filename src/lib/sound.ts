/// <reference path="../../DefinitelyTyped/webaudioapi/waa.d.ts" />
import convert = require("./convert");

class Sound {
  ctx: AudioContext;

  constructor() {
    var AudioCtx = AudioContext || webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  a(key: string) {
    var osc = this.ctx.createOscillator();
    osc.frequency.value = convert.noteToFreq(convert.keyToNote("A" + key));
    return osc;
  }

  b(key: string) {
    var osc = this.ctx.createOscillator();
    osc.frequency.value = convert.noteToFreq(convert.keyToNote("B" + key));
    return osc;
  }

  d(key: string) {
    var osc = this.ctx.createOscillator();
    osc.frequency.value = convert.noteToFreq(convert.keyToNote("D" + key));
    return osc;
  }

  e(key: string) {
    var osc = this.ctx.createOscillator();
    osc.frequency.value = convert.noteToFreq(convert.keyToNote("E" + key));
    return osc;
  }

  g(key: string) {
    var osc = this.ctx.createOscillator();
    osc.frequency.value = convert.noteToFreq(convert.keyToNote("G" + key));
    return osc;
  }
}

export = Sound;
