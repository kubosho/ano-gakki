/// <reference path="../typings/bundle.d.ts" />

class Sound {
    private _ctx: AudioContext;
    private _freqs: number[];
    private _sounds: OscillatorNode[] = [];
    private _currentSound: number = 0;

    constructor(context: AudioContext, freqs: number[]) {
        this._ctx = context;
        this._freqs = freqs;
    }

    get sounds(): OscillatorNode[] {
        return this._sounds;
    }

    set sounds(oscillatorNodes: OscillatorNode[]) {
        this._sounds = oscillatorNodes;
    }

    public play(when: number = 0): Sound {
        if (this._currentSound === this._sounds.length) {
            this._currentSound = 0;
            this.destroyOscillatorNodes();
            this._sounds = this.createOscillatorNodes();
        }

        var sound = this._sounds[this._currentSound];
        sound.connect(this._ctx.destination);
        sound.start(when);

        return this;
    }

    public stop(when: number = 0): Sound {
        var sound = this._sounds[this._currentSound];

        this._currentSound++;

        setTimeout(function() {
            sound.stop(0);
        }, when);

        return this;
    }

    public createOscillatorNodes(): OscillatorNode[] {
        this._freqs.forEach((freq: number) => {
            this._sounds.push(this._createSound(freq));
        });

        return this._sounds;
    }

    public destroyOscillatorNodes(): void {
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
