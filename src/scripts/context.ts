/// <reference path="../../typings/bundle.d.ts" />

class Context {
    public static create(destination: any = window): AudioContext {
        var AudioCtx = destination.AudioContext ||
                       destination.webkitAudioContext;
        return new AudioCtx();
    }
}

export = Context;
