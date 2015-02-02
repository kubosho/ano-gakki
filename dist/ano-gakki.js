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

},{"./Convert":12}],4:[function(require,module,exports){
module.exports=require(1)
},{"./dist/context.js":1}],5:[function(require,module,exports){
module.exports=require(2)
},{"./dist/convert.js":2}],6:[function(require,module,exports){
module.exports=require(3)
},{"./Convert":16,"./dist/data.js":3}],7:[function(require,module,exports){
var Data = require("./Data");
var Sound = require("./Sound");
var context = require("./Context");
var ctx = context.create();
var data = new Data();
var sound = new Sound(ctx, data.freqs);
function main() {
    "use strict";
    var currentPlayIndex = 0;
    var sounds = sound.sounds;
    document.addEventListener("click", function () {
        if (currentPlayIndex === sounds.length) {
            currentPlayIndex = 0;
            sound.destroySounds();
            sounds = sound.createSounds();
        }
        sound.play(sounds[currentPlayIndex]);
        sound.stop(sounds[currentPlayIndex]);
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);

},{"./Context":15,"./Data":17,"./Sound":18}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
module.exports=require(7)
},{"./Context":11,"./Data":13,"./Sound":14,"./dist/lib/main.js":7}],10:[function(require,module,exports){
module.exports=require(8)
},{"./dist/lib/sound.js":8}],11:[function(require,module,exports){
module.exports=require(1)
},{"./dist/context.js":1}],12:[function(require,module,exports){
module.exports=require(2)
},{"./dist/convert.js":2}],13:[function(require,module,exports){
module.exports=require(3)
},{"./Convert":12,"./dist/data.js":3}],14:[function(require,module,exports){
module.exports=require(8)
},{"./dist/lib/sound.js":8}],15:[function(require,module,exports){
module.exports=require(1)
},{"./dist/context.js":1}],16:[function(require,module,exports){
module.exports=require(2)
},{"./dist/convert.js":2}],17:[function(require,module,exports){
module.exports=require(3)
},{"./Convert":16,"./dist/data.js":3}],18:[function(require,module,exports){
module.exports=require(8)
},{"./dist/lib/sound.js":8}]},{},[1,2,3,4,5,6,7,8,9,10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2NvbnRleHQuanMiLCJkaXN0L2NvbnZlcnQuanMiLCJkaXN0L2RhdGEuanMiLCJkaXN0L2xpYi9tYWluLmpzIiwiZGlzdC9saWIvc291bmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dCgpIHtcbiAgICB9XG4gICAgQ29udGV4dC5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBBdWRpb0N0eCA9IEF1ZGlvQ29udGV4dCB8fCB3ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIHJldHVybiBuZXcgQXVkaW9DdHgoKTtcbiAgICB9O1xuICAgIHJldHVybiBDb250ZXh0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dDtcbiIsInZhciBDb252ZXJ0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb252ZXJ0KCkge1xuICAgIH1cbiAgICBDb252ZXJ0LmdldEZyZXEgPSBmdW5jdGlvbiAocGl0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vdGVUb0ZyZXEodGhpcy5fa2V5VG9Ob3RlKHBpdGNoKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Ll9rZXlUb05vdGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5LnNlYXJjaCgvXltjZGVmZ2FiQ0RFRkdBQl0vKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihrZXkgKyBcIiBpcyBpbnZhbGlkIGtleSBuYW1lLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSAoa2V5LmluZGV4T2YoXCIjXCIpICE9PSAtMSkgPyAyIDogMTtcbiAgICAgICAgdmFyIGtleU5hbWUgPSBrZXkuc3Vic3RyaW5nKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbnVtID0gTnVtYmVyKGtleS5zdWJzdHJpbmcoaW5kZXgpKSArIDE7XG4gICAgICAgIHZhciBub3RlID0gdGhpcy5LRVlTLmluZGV4T2Yoa2V5TmFtZSkgKyAxMiAqIG51bTtcbiAgICAgICAgdGhpcy5faXNNSURJS2V5KG5vdGUpO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9O1xuICAgIENvbnZlcnQuX25vdGVUb0ZyZXEgPSBmdW5jdGlvbiAobm90ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5vdGUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihub3RlICsgXCIgaXMgbm90IG51bWJlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNNSURJS2V5KG5vdGUpO1xuICAgICAgICByZXR1cm4gNDQwICogTWF0aC5wb3coTWF0aC5wb3coMiwgKDEgLyAxMikpLCBub3RlIC0gNjkpO1xuICAgIH07XG4gICAgQ29udmVydC5faXNNSURJS2V5ID0gZnVuY3Rpb24gKG5vdGUpIHtcbiAgICAgICAgaWYgKG5vdGUgPCAwIHx8IG5vdGUgPiAxMjcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihub3RlICsgXCIgaXMgbm90IGRlZmluZWQga2V5IGF0IE1JREkuXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb252ZXJ0LktFWVMgPSBbXG4gICAgICAgIFwiY1wiLFxuICAgICAgICBcImMjXCIsXG4gICAgICAgIFwiZFwiLFxuICAgICAgICBcImQjXCIsXG4gICAgICAgIFwiZVwiLFxuICAgICAgICBcImZcIixcbiAgICAgICAgXCJmI1wiLFxuICAgICAgICBcImdcIixcbiAgICAgICAgXCJnI1wiLFxuICAgICAgICBcImFcIixcbiAgICAgICAgXCJhI1wiLFxuICAgICAgICBcImJcIlxuICAgIF07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBDb252ZXJ0O1xuIiwidmFyIGNvbnZlcnQgPSByZXF1aXJlKFwiLi9Db252ZXJ0XCIpO1xudmFyIERhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGEoKSB7XG4gICAgICAgIHRoaXMuZnJlcXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2NvcmVzVG9GcmVxcyhEYXRhLl9zY29yZXMpO1xuICAgIH1cbiAgICBEYXRhLnByb3RvdHlwZS5fc2NvcmVzVG9GcmVxcyA9IGZ1bmN0aW9uIChzY29yZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2NvcmVzLmZvckVhY2goZnVuY3Rpb24gKHNjb3JlKSB7XG4gICAgICAgICAgICBfdGhpcy5mcmVxcy5wdXNoKGNvbnZlcnQuZ2V0RnJlcShzY29yZSkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGEuX3Njb3JlcyA9IFtcIkQ1XCIsIFwiRTVcIiwgXCJHNVwiLCBcIkE1XCIsIFwiQjVcIiwgXCJHNVwiXTtcbiAgICByZXR1cm4gRGF0YTtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG4iLCJ2YXIgRGF0YSA9IHJlcXVpcmUoXCIuL0RhdGFcIik7XG52YXIgU291bmQgPSByZXF1aXJlKFwiLi9Tb3VuZFwiKTtcbnZhciBjb250ZXh0ID0gcmVxdWlyZShcIi4vQ29udGV4dFwiKTtcbnZhciBjdHggPSBjb250ZXh0LmNyZWF0ZSgpO1xudmFyIGRhdGEgPSBuZXcgRGF0YSgpO1xudmFyIHNvdW5kID0gbmV3IFNvdW5kKGN0eCwgZGF0YS5mcmVxcyk7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBjdXJyZW50UGxheUluZGV4ID0gMDtcbiAgICB2YXIgc291bmRzID0gc291bmQuc291bmRzO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjdXJyZW50UGxheUluZGV4ID09PSBzb3VuZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50UGxheUluZGV4ID0gMDtcbiAgICAgICAgICAgIHNvdW5kLmRlc3Ryb3lTb3VuZHMoKTtcbiAgICAgICAgICAgIHNvdW5kcyA9IHNvdW5kLmNyZWF0ZVNvdW5kcygpO1xuICAgICAgICB9XG4gICAgICAgIHNvdW5kLnBsYXkoc291bmRzW2N1cnJlbnRQbGF5SW5kZXhdKTtcbiAgICAgICAgc291bmQuc3RvcChzb3VuZHNbY3VycmVudFBsYXlJbmRleF0pO1xuICAgICAgICBjdXJyZW50UGxheUluZGV4Kys7XG4gICAgfSk7XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtYWluLCBmYWxzZSk7XG4iLCJ2YXIgU291bmQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNvdW5kKGNvbnRleHQsIGZyZXFzKSB7XG4gICAgICAgIHRoaXMuX3NvdW5kcyA9IFtdO1xuICAgICAgICB0aGlzLl9jdHggPSBjb250ZXh0O1xuICAgICAgICB0aGlzLl9mcmVxcyA9IGZyZXFzO1xuICAgICAgICB0aGlzLmNyZWF0ZVNvdW5kcygpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmQucHJvdG90eXBlLCBcInNvdW5kc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdW5kcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU291bmQucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgc291bmQuY29ubmVjdCh0aGlzLl9jdHguZGVzdGluYXRpb24pO1xuICAgICAgICBzb3VuZC5zdGFydCgwKTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKHNvdW5kKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc291bmQuc3RvcCgwKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5jcmVhdGVTb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2ZyZXFzLmZvckVhY2goZnVuY3Rpb24gKGZyZXEpIHtcbiAgICAgICAgICAgIF90aGlzLl9zb3VuZHMucHVzaChfdGhpcy5fY3JlYXRlU291bmQoZnJlcSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdW5kcztcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5kZXN0cm95U291bmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zb3VuZHMgPSBbXTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5fY3JlYXRlU291bmQgPSBmdW5jdGlvbiAoZnJlcSkge1xuICAgICAgICBpZiAoZnJlcSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9zYyA9IHRoaXMuX2N0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmcmVxO1xuICAgICAgICByZXR1cm4gb3NjO1xuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gU291bmQ7XG4iXX0=
