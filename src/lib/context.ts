/// <reference path="../../DefinitelyTyped/webaudioapi/waa.d.ts" />

export function create(): AudioContext {
  var AudioCtx = AudioContext || webkitAudioContext;
  return new AudioCtx();
}
