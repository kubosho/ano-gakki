/// <reference path="../DefinitelyTyped/webaudioapi/waa.d.ts" />

class Sound {
    private _ctx: AudioContext;
    private _freqs: number[];
    private _sounds: OscillatorNode[] = [];

    constructor(context: AudioContext, freqs: number[]) {
        this._ctx = context;
        this._freqs = freqs;

        this.createSounds();
    }

    get sounds(): OscillatorNode[] {
        return this._sounds;
    }

    public play(sound: OscillatorNode) {
        sound.connect(this._ctx.destination);
        sound.start(0);
    }

    public stop(sound: OscillatorNode) {
        setTimeout(function() {
            sound.stop(0);
        }, 200);
    }

    public createSounds(): OscillatorNode[] {
        this._freqs.forEach((freq: number) => {
            this._sounds.push(this._createSound(freq));
        });

        return this._sounds;
    }

    public destroySounds(): void {
        this._sounds = [];
    }

    private _createSound(freq: number): OscillatorNode {
        if (freq <= 0) {
            return;
        }

        var osc = this._ctx.createOscillator();
        osc.frequency.value = freq;
        return osc;
    }
}

export = Sound;
