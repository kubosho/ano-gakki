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
        var line = shape.drawLine(linePoints[currentPlayIndex]);
        var circle = shape.drawCircle(ev.pageX, ev.pageY, 10);
        setTimeout(function () {
            line.remove();
            circle.remove();
        }, 1000);
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
        }, duration);
        return line;
    };
    Shape.prototype.drawCircle = function (x, y, radius, duration) {
        if (duration === void 0) { duration = 500; }
        var circle = this.snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10,
        }).animate({
            r: window.innerWidth
        }, duration);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2xpYi9jb250ZXh0LmpzIiwiZGlzdC9saWIvY29udmVydC5qcyIsImRpc3QvbGliL2RhdGEuanMiLCJkaXN0L2xpYi9tYWluLmpzIiwiZGlzdC9saWIvc2hhcGUuanMiLCJkaXN0L2xpYi9zb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIENvbnRleHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHQoKSB7XG4gICAgfVxuICAgIENvbnRleHQuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgQXVkaW9DdHggPSBBdWRpb0NvbnRleHQgfHwgd2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICByZXR1cm4gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dDtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHQ7XG4iLCJ2YXIgQ29udmVydCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udmVydCgpIHtcbiAgICB9XG4gICAgQ29udmVydC5nZXRGcmVxID0gZnVuY3Rpb24gKHBpdGNoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3RlVG9GcmVxKHRoaXMuX2tleVRvTm90ZShwaXRjaCkpO1xuICAgIH07XG4gICAgQ29udmVydC5fa2V5VG9Ob3RlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleS5zZWFyY2goL15bY2RlZmdhYkNERUZHQUJdLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioa2V5ICsgXCIgaXMgaW52YWxpZCBrZXkgbmFtZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gKGtleS5pbmRleE9mKFwiI1wiKSAhPT0gLTEpID8gMiA6IDE7XG4gICAgICAgIHZhciBrZXlOYW1lID0ga2V5LnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihrZXkuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICB2YXIgbm90ZSA9IHRoaXMuS0VZUy5pbmRleE9mKGtleU5hbWUpICsgMTIgKiBudW07XG4gICAgICAgIHRoaXMuX2lzTUlESUtleShub3RlKTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfTtcbiAgICBDb252ZXJ0Ll9ub3RlVG9GcmVxID0gZnVuY3Rpb24gKG5vdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub3RlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm90ZSArIFwiIGlzIG5vdCBudW1iZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzTUlESUtleShub3RlKTtcbiAgICAgICAgcmV0dXJuIDQ0MCAqIE1hdGgucG93KE1hdGgucG93KDIsICgxIC8gMTIpKSwgbm90ZSAtIDY5KTtcbiAgICB9O1xuICAgIENvbnZlcnQuX2lzTUlESUtleSA9IGZ1bmN0aW9uIChub3RlKSB7XG4gICAgICAgIGlmIChub3RlIDwgMCB8fCBub3RlID4gMTI3KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm90ZSArIFwiIGlzIG5vdCBkZWZpbmVkIGtleSBhdCBNSURJLlwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udmVydC5LRVlTID0gW1xuICAgICAgICBcImNcIixcbiAgICAgICAgXCJjI1wiLFxuICAgICAgICBcImRcIixcbiAgICAgICAgXCJkI1wiLFxuICAgICAgICBcImVcIixcbiAgICAgICAgXCJmXCIsXG4gICAgICAgIFwiZiNcIixcbiAgICAgICAgXCJnXCIsXG4gICAgICAgIFwiZyNcIixcbiAgICAgICAgXCJhXCIsXG4gICAgICAgIFwiYSNcIixcbiAgICAgICAgXCJiXCJcbiAgICBdO1xuICAgIHJldHVybiBDb252ZXJ0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udmVydDtcbiIsInZhciBjb252ZXJ0ID0gcmVxdWlyZShcIi4vQ29udmVydFwiKTtcbnZhciBEYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEYXRhKCkge1xuICAgICAgICB0aGlzLmZyZXFzID0gW107XG4gICAgICAgIHRoaXMuX3Njb3Jlc1RvRnJlcXMoRGF0YS5fc2NvcmVzKTtcbiAgICB9XG4gICAgRGF0YS5wcm90b3R5cGUuZ2V0TGluZVBvaW50cyA9IGZ1bmN0aW9uIChiYXNlWCwgYmFzZVkpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFswLCAoYmFzZVkgLyAyKSwgYmFzZVgsIChiYXNlWSAvIDIpXSxcbiAgICAgICAgICAgIFsoYmFzZVggLyAzLjYpLCAwLCAoYmFzZVggLyAzLjYpLCBiYXNlWV0sXG4gICAgICAgICAgICBbKGJhc2VYIC8gMS4yNSksIDAsIChiYXNlWCAvIDEwKSwgYmFzZVldLFxuICAgICAgICAgICAgWyhiYXNlWCAvIDMuOSksIDAsIChiYXNlWCAvIDEuNSksIGJhc2VZXSxcbiAgICAgICAgICAgIFswLCAoYmFzZVkgLyA0KSwgYmFzZVgsIChiYXNlWSAvIDQpXSxcbiAgICAgICAgICAgIFsoYmFzZVggLyAxLjgpLCAwLCAoYmFzZVggLyAyLjgpLCBiYXNlWV1cbiAgICAgICAgXTtcbiAgICB9O1xuICAgIERhdGEucHJvdG90eXBlLl9zY29yZXNUb0ZyZXFzID0gZnVuY3Rpb24gKHNjb3Jlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBzY29yZXMuZm9yRWFjaChmdW5jdGlvbiAoc2NvcmUpIHtcbiAgICAgICAgICAgIF90aGlzLmZyZXFzLnB1c2goY29udmVydC5nZXRGcmVxKHNjb3JlKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0YS5fc2NvcmVzID0gW1wiRDVcIiwgXCJFNVwiLCBcIkc1XCIsIFwiQTVcIiwgXCJCNVwiLCBcIkc1XCJdO1xuICAgIHJldHVybiBEYXRhO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gRGF0YTtcbiIsInZhciBEYXRhID0gcmVxdWlyZShcIi4vRGF0YVwiKTtcbnZhciBTaGFwZSA9IHJlcXVpcmUoXCIuL1NoYXBlXCIpO1xudmFyIFNvdW5kID0gcmVxdWlyZShcIi4vU291bmRcIik7XG52YXIgY29udGV4dCA9IHJlcXVpcmUoXCIuL0NvbnRleHRcIik7XG52YXIgY3R4ID0gY29udGV4dC5jcmVhdGUoKTtcbnZhciBkYXRhID0gbmV3IERhdGEoKTtcbnZhciBzb3VuZCA9IG5ldyBTb3VuZChjdHgsIGRhdGEuZnJlcXMpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgdmFyIHNvdW5kcyA9IHNvdW5kLnNvdW5kcztcbiAgICB2YXIgd2luZG93U2l6ZSA9IHtcbiAgICAgICAgeDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIHk6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIH07XG4gICAgdmFyIHNoYXBlID0gbmV3IFNoYXBlKFwiI3NoYXBlXCIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5SW5kZXggPT09IHNvdW5kcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5SW5kZXggPSAwO1xuICAgICAgICAgICAgc291bmQuZGVzdHJveVNvdW5kcygpO1xuICAgICAgICAgICAgc291bmRzID0gc291bmQuY3JlYXRlU291bmRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmVQb2ludHMgPSBkYXRhLmdldExpbmVQb2ludHMod2luZG93U2l6ZS54LCB3aW5kb3dTaXplLnkpO1xuICAgICAgICB2YXIgbGluZSA9IHNoYXBlLmRyYXdMaW5lKGxpbmVQb2ludHNbY3VycmVudFBsYXlJbmRleF0pO1xuICAgICAgICB2YXIgY2lyY2xlID0gc2hhcGUuZHJhd0NpcmNsZShldi5wYWdlWCwgZXYucGFnZVksIDEwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsaW5lLnJlbW92ZSgpO1xuICAgICAgICAgICAgY2lyY2xlLnJlbW92ZSgpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgc291bmQucGxheShzb3VuZHNbY3VycmVudFBsYXlJbmRleF0pO1xuICAgICAgICBzb3VuZC5zdG9wKHNvdW5kc1tjdXJyZW50UGxheUluZGV4XSk7XG4gICAgICAgIGN1cnJlbnRQbGF5SW5kZXgrKztcbiAgICB9KTtcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4sIGZhbHNlKTtcbiIsInZhciBTaGFwZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGUocGFyZW50U2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zbmFwID0gU25hcChwYXJlbnRTZWxlY3Rvcik7XG4gICAgfVxuICAgIFNoYXBlLnByb3RvdHlwZS5kcmF3TGluZSA9IGZ1bmN0aW9uIChsaW5lUG9pbnRzLCBkdXJhdGlvbikge1xuICAgICAgICBpZiAoZHVyYXRpb24gPT09IHZvaWQgMCkgeyBkdXJhdGlvbiA9IDEwMDA7IH1cbiAgICAgICAgaWYgKGxpbmVQb2ludHMubGVuZ3RoICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLnNuYXAubGluZShsaW5lUG9pbnRzWzBdLCBsaW5lUG9pbnRzWzFdLCBsaW5lUG9pbnRzWzJdLCBsaW5lUG9pbnRzWzNdKTtcbiAgICAgICAgbGluZS5hdHRyKHtcbiAgICAgICAgICAgIHN0cm9rZTogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTBcbiAgICAgICAgfSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZHJhd0NpcmNsZSA9IGZ1bmN0aW9uICh4LCB5LCByYWRpdXMsIGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gdm9pZCAwKSB7IGR1cmF0aW9uID0gNTAwOyB9XG4gICAgICAgIHZhciBjaXJjbGUgPSB0aGlzLnNuYXAuY2lyY2xlKHgsIHksIHJhZGl1cyk7XG4gICAgICAgIGNpcmNsZS5hdHRyKHtcbiAgICAgICAgICAgIGZpbGw6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgIHN0cm9rZTogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgIH0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgcjogd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgICAgICByZXR1cm4gY2lyY2xlO1xuICAgIH07XG4gICAgcmV0dXJuIFNoYXBlO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gU2hhcGU7XG4iLCJ2YXIgU291bmQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNvdW5kKGNvbnRleHQsIGZyZXFzKSB7XG4gICAgICAgIHRoaXMuX3NvdW5kcyA9IFtdO1xuICAgICAgICB0aGlzLl9jdHggPSBjb250ZXh0O1xuICAgICAgICB0aGlzLl9mcmVxcyA9IGZyZXFzO1xuICAgICAgICB0aGlzLmNyZWF0ZVNvdW5kcygpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmQucHJvdG90eXBlLCBcInNvdW5kc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdW5kcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU291bmQucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgc291bmQuY29ubmVjdCh0aGlzLl9jdHguZGVzdGluYXRpb24pO1xuICAgICAgICBzb3VuZC5zdGFydCgwKTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKHNvdW5kKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc291bmQuc3RvcCgwKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5jcmVhdGVTb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2ZyZXFzLmZvckVhY2goZnVuY3Rpb24gKGZyZXEpIHtcbiAgICAgICAgICAgIF90aGlzLl9zb3VuZHMucHVzaChfdGhpcy5fY3JlYXRlU291bmQoZnJlcSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdW5kcztcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5kZXN0cm95U291bmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zb3VuZHMgPSBbXTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5fY3JlYXRlU291bmQgPSBmdW5jdGlvbiAoZnJlcSkge1xuICAgICAgICBpZiAoZnJlcSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9zYyA9IHRoaXMuX2N0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmcmVxO1xuICAgICAgICByZXR1cm4gb3NjO1xuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gU291bmQ7XG4iXX0=
