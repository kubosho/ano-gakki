/// <reference path="../DefinitelyTyped/webaudioapi/waa.d.ts" />

class Context {
    public static create(): AudioContext {
        var AudioCtx = AudioContext || webkitAudioContext;
        return new AudioCtx();
    }
}

export = Context;
