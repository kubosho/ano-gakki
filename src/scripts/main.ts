/// <reference path="../../typings/bundle.d.ts" />

import Data = require("./data");
import Shape = require("./shape");
import Sound = require("./sound");
import context = require("./context");

class Main {
    private static _eventTypes = ["touch", "mouse"];
    private static _events = {
        start: {
            touch: "touchstart",
            mouse: "mousedown"
        }
    };

    private _ctx = context.create();
    private _data = new Data();
    private _sound = new Sound(this._ctx, this._data.freqs);
    private _shape: Shape;
    private _windowSize = { x: 0, y: 0 }
    private _currentShape: number = 0;

    constructor() {
        this._windowSize = {
            x: window.innerWidth,
            y: window.innerHeight
        };
        this._sound.createOscillatorNodes();
        this._shape = new Shape("#shape");

        Main._eventTypes.forEach((type: string) => {
            document.addEventListener(Main._events.start[type], (<any>this), false);
        });
    }

    public handleEvent(evt: PointerEvent) {
        switch (evt.type) {
            case Main._events.start.touch:
                this._touchStart(evt, "touch");
                break;
            case Main._events.start.mouse:
                this._touchStart(evt, "mouse");
                break;
        }
    }

    private _touchStart(evt: PointerEvent, evtType: string): void {
        if (evtType === "mouse") {
            evt.preventDefault();
        }

        var linePoints = this._data.getLinePoints(this._windowSize.x, this._windowSize.y);

        if (this._currentShape === linePoints.length) {
            this._currentShape = 0;
        }

        var line = () => this._shape.drawLine(linePoints[this._currentShape]);
        var circle = () => this._shape.drawCircle(evt.pageX, evt.pageY, 10);
        var rectSize = 100;
        var rect = () => this._shape.drawRect(evt.pageX - (rectSize / 2), evt.pageY - (rectSize / 2), rectSize);

        this._sound.play(0).stop(200);

        _.sample([line, circle, rect])();
        this._currentShape++;
    }
}

document.addEventListener("DOMContentLoaded", () => new Main(), false);
