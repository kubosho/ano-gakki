(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Data = require("./data");
var Shape = require("./shape");
var Sound = require("./sound");
var context = require("./context");
var Main = (function () {
    function Main() {
        var _this = this;
        this._ctx = context.create();
        this._data = new Data();
        this._sound = new Sound(this._ctx, this._data.freqs);
        this._windowSize = { x: 0, y: 0 };
        this.currentPlayIndex = 0;
        Main._eventTypes.forEach(function (type) {
            document.addEventListener(Main._events.start[type], _this, false);
        });
        this._windowSize = {
            x: window.innerWidth,
            y: window.innerHeight
        };
        this._shape = new Shape("#shape");
    }
    Main.prototype.handleEvent = function (evt) {
        switch (evt.type) {
            case Main._events.start.touch:
                this._touchStart(evt, "touch");
                break;
            case Main._events.start.mouse:
                this._touchStart(evt, "mouse");
                break;
        }
    };
    Main.prototype._touchStart = function (evt, evtType) {
        var _this = this;
        var sounds = this._sound.sounds;
        if (evtType === "mouse") {
            evt.preventDefault();
        }
        if (this.currentPlayIndex === sounds.length) {
            this.currentPlayIndex = 0;
            this._sound.destroySounds();
            sounds = this._sound.createSounds();
        }
        var linePoints = this._data.getLinePoints(this._windowSize.x, this._windowSize.y);
        var line = function () { return _this._shape.drawLine(linePoints[_this.currentPlayIndex]); };
        var circle = function () { return _this._shape.drawCircle(evt.pageX, evt.pageY, 10); };
        _.sample([line, circle])();
        this._sound.play(sounds[this.currentPlayIndex]);
        this._sound.stop(sounds[this.currentPlayIndex]);
        this.currentPlayIndex++;
    };
    Main._eventTypes = ["touch", "mouse"];
    Main._events = {
        start: {
            touch: "touchstart",
            mouse: "mousedown"
        }
    };
    return Main;
})();
document.addEventListener("DOMContentLoaded", function () {
    new Main();
}, false);

},{"./context":2,"./data":4,"./shape":5,"./sound":6}],2:[function(require,module,exports){
var Context = (function () {
    function Context() {
    }
    Context.create = function () {
        var AudioCtx = AudioContext || webkitAudioContext;
        return new AudioCtx();
    };
    return Context;
})();
module.exports = Context;

},{}],3:[function(require,module,exports){
var Convert = (function () {
    function Convert() {
    }
    Convert.getFreq = function (pitch) {
        return this._noteToFreq(this._keyToNote(pitch));
    };
    Convert._keyToNote = function (key) {
        if (key === "") {
            return;
        }
        if (key.search(/^[cdefgabCDEFGAB]/) === -1) {
            throw new Error(key + " is invalid key name.");
        }
        var index = (key.indexOf("#") !== -1) ? 2 : 1;
        var keyName = key.substring(0, index).toLowerCase();
        var num = Number(key.substring(index)) + 1;
        var note = this.KEYS.indexOf(keyName) + 12 * num;
        this._isMIDIKey(note);
        return note;
    };
    Convert._noteToFreq = function (note) {
        if (typeof note !== "number") {
            throw new Error(note + " is not number.");
        }
        this._isMIDIKey(note);
        return 440 * Math.pow(Math.pow(2, (1 / 12)), note - 69);
    };
    Convert._isMIDIKey = function (note) {
        if (note < 0 || note > 127) {
            throw new Error(note + " is not defined key at MIDI.");
        }
    };
    Convert.KEYS = [
        "c",
        "c#",
        "d",
        "d#",
        "e",
        "f",
        "f#",
        "g",
        "g#",
        "a",
        "a#",
        "b"
    ];
    return Convert;
})();
module.exports = Convert;

},{}],4:[function(require,module,exports){
var convert = require("./convert");
var Data = (function () {
    function Data() {
        this.freqs = [];
        this._scoresToFreqs(Data._scores);
    }
    Data.prototype.getLinePoints = function (baseX, baseY) {
        return [
            [0, (baseY / 2), baseX, (baseY / 2)],
            [(baseX / 3.6), 0, (baseX / 3.6), baseY],
            [(baseX / 1.25), 0, (baseX / 10), baseY],
            [(baseX / 3.9), 0, (baseX / 1.5), baseY],
            [0, (baseY / 4), baseX, (baseY / 4)],
            [(baseX / 1.8), 0, (baseX / 2.8), baseY]
        ];
    };
    Data.prototype._scoresToFreqs = function (scores) {
        var _this = this;
        scores.forEach(function (score) {
            _this.freqs.push(convert.getFreq(score));
        });
    };
    Data._scores = ["D5", "E5", "G5", "A5", "B5", "G5"];
    return Data;
})();
module.exports = Data;

},{"./convert":3}],5:[function(require,module,exports){
var Shape = (function () {
    function Shape(parentSelector) {
        this.snap = Snap(parentSelector);
    }
    Shape.prototype.drawLine = function (linePoints, duration) {
        if (duration === void 0) { duration = 1000; }
        if (linePoints.length !== 4) {
            return;
        }
        var line = this.snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
        line.attr({
            stroke: "#51917a",
            strokeWidth: 10
        }).animate({
            opacity: 0
        }, duration, null, function () {
            line.remove();
        });
        return line;
    };
    Shape.prototype.drawCircle = function (x, y, radius, duration) {
        if (duration === void 0) { duration = 750; }
        var circle = this.snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10,
        }).animate({
            r: window.innerWidth
        }, duration, null, function () {
            circle.remove();
        });
        return circle;
    };
    return Shape;
})();
module.exports = Shape;

},{}],6:[function(require,module,exports){
var Sound = (function () {
    function Sound(context, freqs) {
        this._sounds = [];
        this._ctx = context;
        this._freqs = freqs;
        this.createSounds();
    }
    Object.defineProperty(Sound.prototype, "sounds", {
        get: function () {
            return this._sounds;
        },
        enumerable: true,
        configurable: true
    });
    Sound.prototype.play = function (sound) {
        sound.connect(this._ctx.destination);
        sound.start(0);
    };
    Sound.prototype.stop = function (sound) {
        setTimeout(function () {
            sound.stop(0);
        }, 200);
    };
    Sound.prototype.createSounds = function () {
        var _this = this;
        this._freqs.forEach(function (freq) {
            _this._sounds.push(_this._createSound(freq));
        });
        return this._sounds;
    };
    Sound.prototype.destroySounds = function () {
        this._sounds = [];
    };
    Sound.prototype._createSound = function (freq) {
        if (freq <= 0) {
            return;
        }
        var osc = this._ctx.createOscillator();
        osc.frequency.value = freq;
        return osc;
    };
    return Sound;
})();
module.exports = Sound;

},{}]},{},[1]);
