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
        this._currentShape = 0;
        this._windowSize = {
            x: window.innerWidth,
            y: window.innerHeight
        };
        this._sound.createOscillatorNodes();
        this._shape = new Shape("#shape");
        Main._eventTypes.forEach(function (type) {
            document.addEventListener(Main._events.start[type], _this, false);
        });
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
        if (evtType === "mouse") {
            evt.preventDefault();
        }
        var pageX = evt.pageX;
        var pageY = evt.pageY;
        if (this._currentShape === this._data.freqs.length) {
            this._currentShape = 0;
        }
        var angles = this._data.lineAngle;
        var line = function () { return _this._shape.drawLine([-_this._windowSize.x, pageY, _this._windowSize.x, pageY], pageX, pageY, angles[_this._currentShape]); };
        var circle = function () { return _this._shape.drawCircle(pageX, pageY, 10); };
        var rectSize = 100;
        var rect = function () { return _this._shape.drawRect(pageX - (rectSize / 2), pageY - (rectSize / 2), rectSize); };
        var triangle = function () { return _this._shape.drawTriangle(pageX, pageY); };
        this._sound.play(0).stop(200);
        _.sample([line, circle, rect, triangle])();
        this._currentShape++;
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
document.addEventListener("DOMContentLoaded", function () { return new Main(); }, false);

},{"./context":2,"./data":4,"./shape":5,"./sound":6}],2:[function(require,module,exports){
var Context = (function () {
    function Context() {
    }
    Context.create = function (destination) {
        if (destination === void 0) { destination = window; }
        var AudioCtx = destination.AudioContext || destination.webkitAudioContext;
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
    Convert.scoresToFreqs = function (scores) {
        var freqs = [];
        scores.forEach(function (score) {
            freqs.push(Convert.getFreq(score));
        });
        return freqs;
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
        this.freqs = convert.scoresToFreqs(Data._scores);
    }
    Object.defineProperty(Data.prototype, "freqs", {
        get: function () {
            return Data._freqs;
        },
        set: function (freqs) {
            Data._freqs = freqs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "lineAngle", {
        get: function () {
            return Data._lineAngle;
        },
        enumerable: true,
        configurable: true
    });
    Data._scores = ["D5", "E5", "G5", "A5", "B5", "G5"];
    Data._lineAngle = [0, 90, 45, 130, 0, 70];
    Data._freqs = [];
    return Data;
})();
module.exports = Data;

},{"./convert":3}],5:[function(require,module,exports){
var Shape = (function () {
    function Shape(parentSelector, windowSize) {
        if (windowSize === undefined) {
            this._windowSize = {
                x: window.innerWidth,
                y: window.innerHeight
            };
        }
        this._snap = Snap(parentSelector);
    }
    Shape.prototype.drawLine = function (linePoints, basePointX, basePointY, angle, duration) {
        if (duration === void 0) { duration = 750; }
        if (linePoints.length !== 4) {
            return;
        }
        var line = this._snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
        line.attr({
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationLine(line, basePointX, basePointY, angle, duration);
        return line;
    };
    Shape.prototype.drawCircle = function (x, y, radius, duration) {
        if (duration === void 0) { duration = 750; }
        var circle = this._snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationCircle(circle, duration);
        return circle;
    };
    Shape.prototype.drawRect = function (x, y, size, duration) {
        if (size === void 0) { size = 100; }
        if (duration === void 0) { duration = 750; }
        var rect = this._snap.rect(x, y, size, size);
        rect.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationRect(rect, x, y, duration);
        return rect;
    };
    Shape.prototype.drawTriangle = function (x, y, duration) {
        if (duration === void 0) { duration = 750; }
        var triangle = this._snap.polygon([x - 70, y + 30, x + 70, y + 30, x, y - 80]);
        triangle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationTriangle(triangle, x, y, duration);
        return triangle;
    };
    Shape.prototype._animationLine = function (line, basePointX, basePointY, angle, duration) {
        line.transform("r" + angle + ", " + basePointX + ", " + basePointY).animate({
            opacity: 0
        }, duration, null, function () { return line.remove(); });
    };
    Shape.prototype._animationCircle = function (circle, duration) {
        circle.animate({
            r: this._windowSize.x
        }, duration, null, function () { return circle.remove(); });
    };
    Shape.prototype._animationRect = function (rect, x, y, duration) {
        rect.animate({
            transform: "r180," + (x + 50) + "," + (y + 50) + " s" + this._windowSize.x / 28 + "," + this._windowSize.y / 28
        }, duration, null, function () { return rect.remove(); });
    };
    Shape.prototype._animationTriangle = function (triangle, x, y, duration) {
        triangle.animate({
            transform: "s" + this._windowSize.x / 28 + "," + this._windowSize.y / 28
        }, duration, null, function () { return triangle.remove(); });
    };
    return Shape;
})();
module.exports = Shape;

},{}],6:[function(require,module,exports){
var Sound = (function () {
    function Sound(context, freqs) {
        this._sounds = [];
        this._currentSound = 0;
        this._ctx = context;
        this._freqs = freqs;
    }
    Object.defineProperty(Sound.prototype, "sounds", {
        get: function () {
            return this._sounds;
        },
        set: function (oscillatorNodes) {
            this._sounds = oscillatorNodes;
        },
        enumerable: true,
        configurable: true
    });
    Sound.prototype.play = function (when) {
        if (when === void 0) { when = 0; }
        if (this._currentSound === this._sounds.length) {
            this._currentSound = 0;
            this.destroyOscillatorNodes();
            this._sounds = this.createOscillatorNodes();
        }
        var sound = this._sounds[this._currentSound];
        sound.connect(this._ctx.destination);
        sound.start(when);
        return this;
    };
    Sound.prototype.stop = function (when) {
        if (when === void 0) { when = 0; }
        var sound = this._sounds[this._currentSound];
        this._currentSound++;
        setTimeout(function () {
            sound.stop(0);
        }, when);
        return this;
    };
    Sound.prototype.createOscillatorNodes = function () {
        var _this = this;
        this._freqs.forEach(function (freq) {
            _this._sounds.push(_this._createSound(freq));
        });
        return this._sounds;
    };
    Sound.prototype.destroyOscillatorNodes = function () {
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
