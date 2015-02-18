/// <reference path="../../typings/bundle.d.ts" />

class Context {
    public static create(): AudioContext {
        var AudioCtx = AudioContext || webkitAudioContext;
        return new AudioCtx();
    }
}

export = Context;
