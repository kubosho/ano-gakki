/// <reference path="../../typings/bundle.d.ts" />

import Data = require("./data");
import Shape = require("./shape");
import Sound = require("./sound");
import context = require("./context");

class Main {
    private _ctx = context.create();
    private _data = new Data();
    private _sound = new Sound(this._ctx, this._data.freqs);
    private _shape: Shape;

    private static _eventTypes = ["touch", "mouse"];
    private static _events = {
        start: {
            touch: "touchstart",
            mouse: "mousedown"
        }
    };
    private _windowSize = { x: 0, y: 0 }

    constructor() {
        Main._eventTypes.forEach((type: string) => {
            document.addEventListener(Main._events.start[type], (<any>this), false);
        });

        this._windowSize = {
            x: window.innerWidth,
            y: window.innerHeight
        };
        this._sound.createOscillatorNodes();
        this._shape = new Shape("#shape");
    }

    public handleEvent(evt: PointerEvent) {
        switch (evt.type) {
            case Main._events.start.touch: this._touchStart(evt, "touch"); break;
            case Main._events.start.mouse: this._touchStart(evt, "mouse"); break;
        }
    }

    private _touchStart(evt: PointerEvent, evtType: string): void {
        if (evtType === "mouse") {
            evt.preventDefault();
        }

        var sounds = this._sound.sounds;

        if (this.currentPlayIndex === sounds.length) {
            this.currentPlayIndex = 0;
            this._sound.destroySounds();
            sounds = this._sound.createSounds();
        }

        var linePoints = this._data.getLinePoints(this._windowSize.x, this._windowSize.y);
        var line = () => this._shape.drawLine(linePoints[this.currentPlayIndex]);
        var circle = () => this._shape.drawCircle(evt.pageX, evt.pageY, 10);

        _.sample([line, circle])();

        this._sound.play(sounds[this.currentPlayIndex]);
        this._sound.stop(sounds[this.currentPlayIndex]);

        this._sound.play(0).stop(200);
    }
}

document.addEventListener("DOMContentLoaded", () => { new Main(); }, false);
