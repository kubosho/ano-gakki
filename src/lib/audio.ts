/// <reference path="../../DefinitelyTyped/webaudioapi/waa.d.ts" />

class Audio {
  ctx: AudioContext;

  constructor() {
    var AudioCtx = (<any>window).AudioContext || (<any>window).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  createSound(freq: number): OscillatorNode {
    var osc = this.ctx.createOscillator();
    osc.frequency.value = freq;
    return osc;
  }

  connectOutput(audio: AudioNode): void {
    audio.connect(this.ctx.destination);
  }
}

export = Audio;
