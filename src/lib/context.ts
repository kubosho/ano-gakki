/// <reference path="../../DefinitelyTyped/webaudioapi/waa.d.ts" />

function Context(): AudioContext {
  var AudioCtx = AudioContext || webkitAudioContext;
  return new AudioCtx();
}

export = Context;
