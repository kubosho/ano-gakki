/// <reference path="../../DefinitelyTyped/webaudioapi/waa.d.ts" />

class Audio {
  ctx: AudioContext;

  constructor(context: AudioContext) {
    this.ctx = context;
  }

  createSound(freq: number): OscillatorNode {
    if (freq <= 0) {
      return;
    }

    var osc = this.ctx.createOscillator();
    osc.frequency.value = freq;
    return osc;
  }

  connectOutput(audio: AudioNode): void {
    audio.connect(this.ctx.destination);
  }
}

export = Audio;
