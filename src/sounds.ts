/// <reference path="../DefinitelyTyped/webaudioapi/waa.d.ts" />

export class Sounds {
  ctx: AudioContext;

  constructor() {
    var AudioCtx = AudioContext || webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  a(num: number) {
    var base = 176;
    return base * num;
  }

  b(num: number) {
    var base = 197.56;
    return base * num;
  }

  d(num: number) {
    var base = 117.46;
    return base * num;
  }

  e(num: number) {
    var base = 131.86;
    return base * num;
  }

  g(num: number) {
    var base = 156.8;
    return base * num;
  }
}
