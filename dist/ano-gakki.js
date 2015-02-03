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

},{"./Context":12,"./Convert":13,"./Data":14,"./Sound":15}],2:[function(require,module,exports){
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

},{"./Convert":13}],5:[function(require,module,exports){
module.exports=require(2)
},{"./dist/context.js":2}],6:[function(require,module,exports){
module.exports=require(3)
},{"./dist/convert.js":3}],7:[function(require,module,exports){
module.exports=require(4)
},{"./Convert":17,"./dist/data.js":4}],8:[function(require,module,exports){
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

},{"./Context":16,"./Data":18,"./Sound":19}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
module.exports=require(8)
},{"./Context":12,"./Data":14,"./Sound":15,"./dist/lib/main.js":8}],11:[function(require,module,exports){
module.exports=require(9)
},{"./dist/lib/sound.js":9}],12:[function(require,module,exports){
module.exports=require(2)
},{"./dist/context.js":2}],13:[function(require,module,exports){
module.exports=require(3)
},{"./dist/convert.js":3}],14:[function(require,module,exports){
module.exports=require(4)
},{"./Convert":13,"./dist/data.js":4}],15:[function(require,module,exports){
module.exports=require(9)
},{"./dist/lib/sound.js":9}],16:[function(require,module,exports){
module.exports=require(2)
},{"./dist/context.js":2}],17:[function(require,module,exports){
module.exports=require(3)
},{"./dist/convert.js":3}],18:[function(require,module,exports){
module.exports=require(4)
},{"./Convert":17,"./dist/data.js":4}],19:[function(require,module,exports){
module.exports=require(9)
},{"./dist/lib/sound.js":9}]},{},[1,2,3,4,5,6,7,8,9,10,11])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2Fuby1nYWtraS5qcyIsImRpc3QvY29udGV4dC5qcyIsImRpc3QvY29udmVydC5qcyIsImRpc3QvZGF0YS5qcyIsImRpc3QvbGliL21haW4uanMiLCJkaXN0L2xpYi9zb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBDb250ZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0KCkge1xuICAgIH1cbiAgICBDb250ZXh0LmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIEF1ZGlvQ3R4ID0gQXVkaW9Db250ZXh0IHx8IHdlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgICAgcmV0dXJuIG5ldyBBdWRpb0N0eCgpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0O1xuXG52YXIgQ29udmVydCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udmVydCgpIHtcbiAgICB9XG4gICAgQ29udmVydC5nZXRGcmVxID0gZnVuY3Rpb24gKHBpdGNoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3RlVG9GcmVxKHRoaXMuX2tleVRvTm90ZShwaXRjaCkpO1xuICAgIH07XG4gICAgQ29udmVydC5fa2V5VG9Ob3RlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleS5zZWFyY2goL15bY2RlZmdhYkNERUZHQUJdLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioa2V5ICsgXCIgaXMgaW52YWxpZCBrZXkgbmFtZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gKGtleS5pbmRleE9mKFwiI1wiKSAhPT0gLTEpID8gMiA6IDE7XG4gICAgICAgIHZhciBrZXlOYW1lID0ga2V5LnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihrZXkuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICB2YXIgbm90ZSA9IHRoaXMuS0VZUy5pbmRleE9mKGtleU5hbWUpICsgMTIgKiBudW07XG4gICAgICAgIHRoaXMuX2lzTUlESUtleShub3RlKTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfTtcbiAgICBDb252ZXJ0Ll9ub3RlVG9GcmVxID0gZnVuY3Rpb24gKG5vdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub3RlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm90ZSArIFwiIGlzIG5vdCBudW1iZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzTUlESUtleShub3RlKTtcbiAgICAgICAgcmV0dXJuIDQ0MCAqIE1hdGgucG93KE1hdGgucG93KDIsICgxIC8gMTIpKSwgbm90ZSAtIDY5KTtcbiAgICB9O1xuICAgIENvbnZlcnQuX2lzTUlESUtleSA9IGZ1bmN0aW9uIChub3RlKSB7XG4gICAgICAgIGlmIChub3RlIDwgMCB8fCBub3RlID4gMTI3KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm90ZSArIFwiIGlzIG5vdCBkZWZpbmVkIGtleSBhdCBNSURJLlwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udmVydC5LRVlTID0gW1xuICAgICAgICBcImNcIixcbiAgICAgICAgXCJjI1wiLFxuICAgICAgICBcImRcIixcbiAgICAgICAgXCJkI1wiLFxuICAgICAgICBcImVcIixcbiAgICAgICAgXCJmXCIsXG4gICAgICAgIFwiZiNcIixcbiAgICAgICAgXCJnXCIsXG4gICAgICAgIFwiZyNcIixcbiAgICAgICAgXCJhXCIsXG4gICAgICAgIFwiYSNcIixcbiAgICAgICAgXCJiXCJcbiAgICBdO1xuICAgIHJldHVybiBDb252ZXJ0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udmVydDtcblxudmFyIGNvbnZlcnQgPSByZXF1aXJlKFwiLi9Db252ZXJ0XCIpO1xudmFyIERhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGEoKSB7XG4gICAgICAgIHRoaXMuZnJlcXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2NvcmVzVG9GcmVxcyhEYXRhLl9zY29yZXMpO1xuICAgIH1cbiAgICBEYXRhLnByb3RvdHlwZS5fc2NvcmVzVG9GcmVxcyA9IGZ1bmN0aW9uIChzY29yZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2NvcmVzLmZvckVhY2goZnVuY3Rpb24gKHNjb3JlKSB7XG4gICAgICAgICAgICBfdGhpcy5mcmVxcy5wdXNoKGNvbnZlcnQuZ2V0RnJlcShzY29yZSkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGEuX3Njb3JlcyA9IFtcIkQ1XCIsIFwiRTVcIiwgXCJHNVwiLCBcIkE1XCIsIFwiQjVcIiwgXCJHNVwiXTtcbiAgICByZXR1cm4gRGF0YTtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG5cbnZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU291bmQoY29udGV4dCwgZnJlcXMpIHtcbiAgICAgICAgdGhpcy5fc291bmRzID0gW107XG4gICAgICAgIHRoaXMuX2N0eCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuX2ZyZXFzID0gZnJlcXM7XG4gICAgICAgIHRoaXMuY3JlYXRlU291bmRzKCk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZC5wcm90b3R5cGUsIFwic291bmRzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc291bmRzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBTb3VuZC5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIChzb3VuZCkge1xuICAgICAgICBzb3VuZC5jb25uZWN0KHRoaXMuX2N0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIHNvdW5kLnN0YXJ0KDApO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzb3VuZC5zdG9wKDApO1xuICAgICAgICB9LCAyMDApO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLmNyZWF0ZVNvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fZnJlcXMuZm9yRWFjaChmdW5jdGlvbiAoZnJlcSkge1xuICAgICAgICAgICAgX3RoaXMuX3NvdW5kcy5wdXNoKF90aGlzLl9jcmVhdGVTb3VuZChmcmVxKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fc291bmRzO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLmRlc3Ryb3lTb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NvdW5kcyA9IFtdO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLl9jcmVhdGVTb3VuZCA9IGZ1bmN0aW9uIChmcmVxKSB7XG4gICAgICAgIGlmIChmcmVxIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3NjID0gdGhpcy5fY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXE7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICByZXR1cm4gU291bmQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBTb3VuZDtcblxudmFyIERhdGEgPSByZXF1aXJlKFwiLi9EYXRhXCIpO1xudmFyIFNvdW5kID0gcmVxdWlyZShcIi4vU291bmRcIik7XG52YXIgY29udGV4dCA9IHJlcXVpcmUoXCIuL0NvbnRleHRcIik7XG52YXIgY3R4ID0gY29udGV4dC5jcmVhdGUoKTtcbnZhciBkYXRhID0gbmV3IERhdGEoKTtcbnZhciBzb3VuZCA9IG5ldyBTb3VuZChjdHgsIGRhdGEuZnJlcXMpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgdmFyIHNvdW5kcyA9IHNvdW5kLnNvdW5kcztcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudFBsYXlJbmRleCA9PT0gc291bmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgICAgICAgICBzb3VuZC5kZXN0cm95U291bmRzKCk7XG4gICAgICAgICAgICBzb3VuZHMgPSBzb3VuZC5jcmVhdGVTb3VuZHMoKTtcbiAgICAgICAgfVxuICAgICAgICBzb3VuZC5wbGF5KHNvdW5kc1tjdXJyZW50UGxheUluZGV4XSk7XG4gICAgICAgIHNvdW5kLnN0b3Aoc291bmRzW2N1cnJlbnRQbGF5SW5kZXhdKTtcbiAgICAgICAgY3VycmVudFBsYXlJbmRleCsrO1xuICAgIH0pO1xufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbWFpbiwgZmFsc2UpO1xuIiwidmFyIENvbnRleHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHQoKSB7XG4gICAgfVxuICAgIENvbnRleHQuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgQXVkaW9DdHggPSBBdWRpb0NvbnRleHQgfHwgd2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICByZXR1cm4gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dDtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHQ7XG4iLCJ2YXIgQ29udmVydCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udmVydCgpIHtcbiAgICB9XG4gICAgQ29udmVydC5nZXRGcmVxID0gZnVuY3Rpb24gKHBpdGNoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3RlVG9GcmVxKHRoaXMuX2tleVRvTm90ZShwaXRjaCkpO1xuICAgIH07XG4gICAgQ29udmVydC5fa2V5VG9Ob3RlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleS5zZWFyY2goL15bY2RlZmdhYkNERUZHQUJdLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioa2V5ICsgXCIgaXMgaW52YWxpZCBrZXkgbmFtZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gKGtleS5pbmRleE9mKFwiI1wiKSAhPT0gLTEpID8gMiA6IDE7XG4gICAgICAgIHZhciBrZXlOYW1lID0ga2V5LnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihrZXkuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICB2YXIgbm90ZSA9IHRoaXMuS0VZUy5pbmRleE9mKGtleU5hbWUpICsgMTIgKiBudW07XG4gICAgICAgIHRoaXMuX2lzTUlESUtleShub3RlKTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfTtcbiAgICBDb252ZXJ0Ll9ub3RlVG9GcmVxID0gZnVuY3Rpb24gKG5vdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub3RlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm90ZSArIFwiIGlzIG5vdCBudW1iZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzTUlESUtleShub3RlKTtcbiAgICAgICAgcmV0dXJuIDQ0MCAqIE1hdGgucG93KE1hdGgucG93KDIsICgxIC8gMTIpKSwgbm90ZSAtIDY5KTtcbiAgICB9O1xuICAgIENvbnZlcnQuX2lzTUlESUtleSA9IGZ1bmN0aW9uIChub3RlKSB7XG4gICAgICAgIGlmIChub3RlIDwgMCB8fCBub3RlID4gMTI3KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm90ZSArIFwiIGlzIG5vdCBkZWZpbmVkIGtleSBhdCBNSURJLlwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udmVydC5LRVlTID0gW1xuICAgICAgICBcImNcIixcbiAgICAgICAgXCJjI1wiLFxuICAgICAgICBcImRcIixcbiAgICAgICAgXCJkI1wiLFxuICAgICAgICBcImVcIixcbiAgICAgICAgXCJmXCIsXG4gICAgICAgIFwiZiNcIixcbiAgICAgICAgXCJnXCIsXG4gICAgICAgIFwiZyNcIixcbiAgICAgICAgXCJhXCIsXG4gICAgICAgIFwiYSNcIixcbiAgICAgICAgXCJiXCJcbiAgICBdO1xuICAgIHJldHVybiBDb252ZXJ0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udmVydDtcbiIsInZhciBjb252ZXJ0ID0gcmVxdWlyZShcIi4vQ29udmVydFwiKTtcbnZhciBEYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEYXRhKCkge1xuICAgICAgICB0aGlzLmZyZXFzID0gW107XG4gICAgICAgIHRoaXMuX3Njb3Jlc1RvRnJlcXMoRGF0YS5fc2NvcmVzKTtcbiAgICB9XG4gICAgRGF0YS5wcm90b3R5cGUuX3Njb3Jlc1RvRnJlcXMgPSBmdW5jdGlvbiAoc2NvcmVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHNjb3Jlcy5mb3JFYWNoKGZ1bmN0aW9uIChzY29yZSkge1xuICAgICAgICAgICAgX3RoaXMuZnJlcXMucHVzaChjb252ZXJ0LmdldEZyZXEoc2NvcmUpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEYXRhLl9zY29yZXMgPSBbXCJENVwiLCBcIkU1XCIsIFwiRzVcIiwgXCJBNVwiLCBcIkI1XCIsIFwiRzVcIl07XG4gICAgcmV0dXJuIERhdGE7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBEYXRhO1xuIiwidmFyIERhdGEgPSByZXF1aXJlKFwiLi9EYXRhXCIpO1xudmFyIFNvdW5kID0gcmVxdWlyZShcIi4vU291bmRcIik7XG52YXIgY29udGV4dCA9IHJlcXVpcmUoXCIuL0NvbnRleHRcIik7XG52YXIgY3R4ID0gY29udGV4dC5jcmVhdGUoKTtcbnZhciBkYXRhID0gbmV3IERhdGEoKTtcbnZhciBzb3VuZCA9IG5ldyBTb3VuZChjdHgsIGRhdGEuZnJlcXMpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgdmFyIHNvdW5kcyA9IHNvdW5kLnNvdW5kcztcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudFBsYXlJbmRleCA9PT0gc291bmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgICAgICAgICBzb3VuZC5kZXN0cm95U291bmRzKCk7XG4gICAgICAgICAgICBzb3VuZHMgPSBzb3VuZC5jcmVhdGVTb3VuZHMoKTtcbiAgICAgICAgfVxuICAgICAgICBzb3VuZC5wbGF5KHNvdW5kc1tjdXJyZW50UGxheUluZGV4XSk7XG4gICAgICAgIHNvdW5kLnN0b3Aoc291bmRzW2N1cnJlbnRQbGF5SW5kZXhdKTtcbiAgICAgICAgY3VycmVudFBsYXlJbmRleCsrO1xuICAgIH0pO1xufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbWFpbiwgZmFsc2UpO1xuIiwidmFyIFNvdW5kID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTb3VuZChjb250ZXh0LCBmcmVxcykge1xuICAgICAgICB0aGlzLl9zb3VuZHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3R4ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5fZnJlcXMgPSBmcmVxcztcbiAgICAgICAgdGhpcy5jcmVhdGVTb3VuZHMoKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kLnByb3RvdHlwZSwgXCJzb3VuZHNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb3VuZHM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFNvdW5kLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKHNvdW5kKSB7XG4gICAgICAgIHNvdW5kLmNvbm5lY3QodGhpcy5fY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgc291bmQuc3RhcnQoMCk7XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChzb3VuZCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNvdW5kLnN0b3AoMCk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUuY3JlYXRlU291bmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9mcmVxcy5mb3JFYWNoKGZ1bmN0aW9uIChmcmVxKSB7XG4gICAgICAgICAgICBfdGhpcy5fc291bmRzLnB1c2goX3RoaXMuX2NyZWF0ZVNvdW5kKGZyZXEpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb3VuZHM7XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUuZGVzdHJveVNvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc291bmRzID0gW107XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUuX2NyZWF0ZVNvdW5kID0gZnVuY3Rpb24gKGZyZXEpIHtcbiAgICAgICAgaWYgKGZyZXEgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvc2MgPSB0aGlzLl9jdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnJlcTtcbiAgICAgICAgcmV0dXJuIG9zYztcbiAgICB9O1xuICAgIHJldHVybiBTb3VuZDtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IFNvdW5kO1xuIl19
