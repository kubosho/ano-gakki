(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var convert = require("./Convert");
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

},{"./Convert":8}],4:[function(require,module,exports){
var Data = require("./Data");
var Shape = require("./Shape");
var Sound = require("./Sound");
var context = require("./Context");
var ctx = context.create();
var data = new Data();
var sound = new Sound(ctx, data.freqs);
function main() {
    "use strict";
    var currentPlayIndex = 0;
    var sounds = sound.sounds;
    var windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
    };
    var shape = new Shape("#shape");
    document.addEventListener("click", function (ev) {
        if (currentPlayIndex === sounds.length) {
            currentPlayIndex = 0;
            sound.destroySounds();
            sounds = sound.createSounds();
        }
        var linePoints = data.getLinePoints(windowSize.x, windowSize.y);
        var line = function () { return shape.drawLine(linePoints[currentPlayIndex]); };
        var circle = function () { return shape.drawCircle(ev.pageX, ev.pageY, 10); };
        _.sample([line, circle])();
        sound.play(sounds[currentPlayIndex]);
        sound.stop(sounds[currentPlayIndex]);
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);

},{"./Context":7,"./Data":9,"./Shape":10,"./Sound":11}],5:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
module.exports=require(1)
},{"./dist/lib/context.js":1}],8:[function(require,module,exports){
module.exports=require(2)
},{"./dist/lib/convert.js":2}],9:[function(require,module,exports){
module.exports=require(3)
},{"./Convert":8,"./dist/lib/data.js":3}],10:[function(require,module,exports){
module.exports=require(5)
},{"./dist/lib/shape.js":5}],11:[function(require,module,exports){
module.exports=require(6)
},{"./dist/lib/sound.js":6}]},{},[1,2,3,4,5,6])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2xpYi9jb250ZXh0LmpzIiwiZGlzdC9saWIvY29udmVydC5qcyIsImRpc3QvbGliL2RhdGEuanMiLCJkaXN0L2xpYi9tYWluLmpzIiwiZGlzdC9saWIvc2hhcGUuanMiLCJkaXN0L2xpYi9zb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dCgpIHtcbiAgICB9XG4gICAgQ29udGV4dC5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBBdWRpb0N0eCA9IEF1ZGlvQ29udGV4dCB8fCB3ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIHJldHVybiBuZXcgQXVkaW9DdHgoKTtcbiAgICB9O1xuICAgIHJldHVybiBDb250ZXh0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dDtcbiIsInZhciBDb252ZXJ0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb252ZXJ0KCkge1xuICAgIH1cbiAgICBDb252ZXJ0LmdldEZyZXEgPSBmdW5jdGlvbiAocGl0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vdGVUb0ZyZXEodGhpcy5fa2V5VG9Ob3RlKHBpdGNoKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Ll9rZXlUb05vdGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5LnNlYXJjaCgvXltjZGVmZ2FiQ0RFRkdBQl0vKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihrZXkgKyBcIiBpcyBpbnZhbGlkIGtleSBuYW1lLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSAoa2V5LmluZGV4T2YoXCIjXCIpICE9PSAtMSkgPyAyIDogMTtcbiAgICAgICAgdmFyIGtleU5hbWUgPSBrZXkuc3Vic3RyaW5nKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbnVtID0gTnVtYmVyKGtleS5zdWJzdHJpbmcoaW5kZXgpKSArIDE7XG4gICAgICAgIHZhciBub3RlID0gdGhpcy5LRVlTLmluZGV4T2Yoa2V5TmFtZSkgKyAxMiAqIG51bTtcbiAgICAgICAgdGhpcy5faXNNSURJS2V5KG5vdGUpO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9O1xuICAgIENvbnZlcnQuX25vdGVUb0ZyZXEgPSBmdW5jdGlvbiAobm90ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5vdGUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihub3RlICsgXCIgaXMgbm90IG51bWJlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNNSURJS2V5KG5vdGUpO1xuICAgICAgICByZXR1cm4gNDQwICogTWF0aC5wb3coTWF0aC5wb3coMiwgKDEgLyAxMikpLCBub3RlIC0gNjkpO1xuICAgIH07XG4gICAgQ29udmVydC5faXNNSURJS2V5ID0gZnVuY3Rpb24gKG5vdGUpIHtcbiAgICAgICAgaWYgKG5vdGUgPCAwIHx8IG5vdGUgPiAxMjcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihub3RlICsgXCIgaXMgbm90IGRlZmluZWQga2V5IGF0IE1JREkuXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb252ZXJ0LktFWVMgPSBbXG4gICAgICAgIFwiY1wiLFxuICAgICAgICBcImMjXCIsXG4gICAgICAgIFwiZFwiLFxuICAgICAgICBcImQjXCIsXG4gICAgICAgIFwiZVwiLFxuICAgICAgICBcImZcIixcbiAgICAgICAgXCJmI1wiLFxuICAgICAgICBcImdcIixcbiAgICAgICAgXCJnI1wiLFxuICAgICAgICBcImFcIixcbiAgICAgICAgXCJhI1wiLFxuICAgICAgICBcImJcIlxuICAgIF07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBDb252ZXJ0O1xuIiwidmFyIGNvbnZlcnQgPSByZXF1aXJlKFwiLi9Db252ZXJ0XCIpO1xudmFyIERhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGEoKSB7XG4gICAgICAgIHRoaXMuZnJlcXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2NvcmVzVG9GcmVxcyhEYXRhLl9zY29yZXMpO1xuICAgIH1cbiAgICBEYXRhLnByb3RvdHlwZS5nZXRMaW5lUG9pbnRzID0gZnVuY3Rpb24gKGJhc2VYLCBiYXNlWSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgWzAsIChiYXNlWSAvIDIpLCBiYXNlWCwgKGJhc2VZIC8gMildLFxuICAgICAgICAgICAgWyhiYXNlWCAvIDMuNiksIDAsIChiYXNlWCAvIDMuNiksIGJhc2VZXSxcbiAgICAgICAgICAgIFsoYmFzZVggLyAxLjI1KSwgMCwgKGJhc2VYIC8gMTApLCBiYXNlWV0sXG4gICAgICAgICAgICBbKGJhc2VYIC8gMy45KSwgMCwgKGJhc2VYIC8gMS41KSwgYmFzZVldLFxuICAgICAgICAgICAgWzAsIChiYXNlWSAvIDQpLCBiYXNlWCwgKGJhc2VZIC8gNCldLFxuICAgICAgICAgICAgWyhiYXNlWCAvIDEuOCksIDAsIChiYXNlWCAvIDIuOCksIGJhc2VZXVxuICAgICAgICBdO1xuICAgIH07XG4gICAgRGF0YS5wcm90b3R5cGUuX3Njb3Jlc1RvRnJlcXMgPSBmdW5jdGlvbiAoc2NvcmVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHNjb3Jlcy5mb3JFYWNoKGZ1bmN0aW9uIChzY29yZSkge1xuICAgICAgICAgICAgX3RoaXMuZnJlcXMucHVzaChjb252ZXJ0LmdldEZyZXEoc2NvcmUpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEYXRhLl9zY29yZXMgPSBbXCJENVwiLCBcIkU1XCIsIFwiRzVcIiwgXCJBNVwiLCBcIkI1XCIsIFwiRzVcIl07XG4gICAgcmV0dXJuIERhdGE7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBEYXRhO1xuIiwidmFyIERhdGEgPSByZXF1aXJlKFwiLi9EYXRhXCIpO1xudmFyIFNoYXBlID0gcmVxdWlyZShcIi4vU2hhcGVcIik7XG52YXIgU291bmQgPSByZXF1aXJlKFwiLi9Tb3VuZFwiKTtcbnZhciBjb250ZXh0ID0gcmVxdWlyZShcIi4vQ29udGV4dFwiKTtcbnZhciBjdHggPSBjb250ZXh0LmNyZWF0ZSgpO1xudmFyIGRhdGEgPSBuZXcgRGF0YSgpO1xudmFyIHNvdW5kID0gbmV3IFNvdW5kKGN0eCwgZGF0YS5mcmVxcyk7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBjdXJyZW50UGxheUluZGV4ID0gMDtcbiAgICB2YXIgc291bmRzID0gc291bmQuc291bmRzO1xuICAgIHZhciB3aW5kb3dTaXplID0ge1xuICAgICAgICB4OiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgeTogd2luZG93LmlubmVySGVpZ2h0XG4gICAgfTtcbiAgICB2YXIgc2hhcGUgPSBuZXcgU2hhcGUoXCIjc2hhcGVcIik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoY3VycmVudFBsYXlJbmRleCA9PT0gc291bmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgICAgICAgICBzb3VuZC5kZXN0cm95U291bmRzKCk7XG4gICAgICAgICAgICBzb3VuZHMgPSBzb3VuZC5jcmVhdGVTb3VuZHMoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZVBvaW50cyA9IGRhdGEuZ2V0TGluZVBvaW50cyh3aW5kb3dTaXplLngsIHdpbmRvd1NpemUueSk7XG4gICAgICAgIHZhciBsaW5lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2hhcGUuZHJhd0xpbmUobGluZVBvaW50c1tjdXJyZW50UGxheUluZGV4XSk7IH07XG4gICAgICAgIHZhciBjaXJjbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzaGFwZS5kcmF3Q2lyY2xlKGV2LnBhZ2VYLCBldi5wYWdlWSwgMTApOyB9O1xuICAgICAgICBfLnNhbXBsZShbbGluZSwgY2lyY2xlXSkoKTtcbiAgICAgICAgc291bmQucGxheShzb3VuZHNbY3VycmVudFBsYXlJbmRleF0pO1xuICAgICAgICBzb3VuZC5zdG9wKHNvdW5kc1tjdXJyZW50UGxheUluZGV4XSk7XG4gICAgICAgIGN1cnJlbnRQbGF5SW5kZXgrKztcbiAgICB9KTtcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4sIGZhbHNlKTtcbiIsInZhciBTaGFwZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGUocGFyZW50U2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zbmFwID0gU25hcChwYXJlbnRTZWxlY3Rvcik7XG4gICAgfVxuICAgIFNoYXBlLnByb3RvdHlwZS5kcmF3TGluZSA9IGZ1bmN0aW9uIChsaW5lUG9pbnRzLCBkdXJhdGlvbikge1xuICAgICAgICBpZiAoZHVyYXRpb24gPT09IHZvaWQgMCkgeyBkdXJhdGlvbiA9IDEwMDA7IH1cbiAgICAgICAgaWYgKGxpbmVQb2ludHMubGVuZ3RoICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLnNuYXAubGluZShsaW5lUG9pbnRzWzBdLCBsaW5lUG9pbnRzWzFdLCBsaW5lUG9pbnRzWzJdLCBsaW5lUG9pbnRzWzNdKTtcbiAgICAgICAgbGluZS5hdHRyKHtcbiAgICAgICAgICAgIHN0cm9rZTogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTBcbiAgICAgICAgfSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0sIGR1cmF0aW9uLCBudWxsLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsaW5lLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZHJhd0NpcmNsZSA9IGZ1bmN0aW9uICh4LCB5LCByYWRpdXMsIGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gdm9pZCAwKSB7IGR1cmF0aW9uID0gNzUwOyB9XG4gICAgICAgIHZhciBjaXJjbGUgPSB0aGlzLnNuYXAuY2lyY2xlKHgsIHksIHJhZGl1cyk7XG4gICAgICAgIGNpcmNsZS5hdHRyKHtcbiAgICAgICAgICAgIGZpbGw6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgIHN0cm9rZTogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgIH0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgcjogd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgfSwgZHVyYXRpb24sIG51bGwsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNpcmNsZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICByZXR1cm4gU2hhcGU7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBTaGFwZTtcbiIsInZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU291bmQoY29udGV4dCwgZnJlcXMpIHtcbiAgICAgICAgdGhpcy5fc291bmRzID0gW107XG4gICAgICAgIHRoaXMuX2N0eCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuX2ZyZXFzID0gZnJlcXM7XG4gICAgICAgIHRoaXMuY3JlYXRlU291bmRzKCk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZC5wcm90b3R5cGUsIFwic291bmRzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc291bmRzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBTb3VuZC5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIChzb3VuZCkge1xuICAgICAgICBzb3VuZC5jb25uZWN0KHRoaXMuX2N0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIHNvdW5kLnN0YXJ0KDApO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzb3VuZC5zdG9wKDApO1xuICAgICAgICB9LCAyMDApO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLmNyZWF0ZVNvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fZnJlcXMuZm9yRWFjaChmdW5jdGlvbiAoZnJlcSkge1xuICAgICAgICAgICAgX3RoaXMuX3NvdW5kcy5wdXNoKF90aGlzLl9jcmVhdGVTb3VuZChmcmVxKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fc291bmRzO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLmRlc3Ryb3lTb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NvdW5kcyA9IFtdO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLl9jcmVhdGVTb3VuZCA9IGZ1bmN0aW9uIChmcmVxKSB7XG4gICAgICAgIGlmIChmcmVxIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3NjID0gdGhpcy5fY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXE7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICByZXR1cm4gU291bmQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBTb3VuZDtcbiJdfQ==
