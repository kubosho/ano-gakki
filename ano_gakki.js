(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Audio = (function () {
    function Audio(context) {
        this.ctx = context;
    }
    Audio.prototype.createSound = function (freq) {
        if (freq <= 0) {
            return;
        }
        var osc = this.ctx.createOscillator();
        osc.frequency.value = freq;
        return osc;
    };
    Audio.prototype.connectOutput = function (audio) {
        audio.connect(this.ctx.destination);
    };
    return Audio;
})();
module.exports = Audio;

},{}],2:[function(require,module,exports){
function Context() {
    var AudioCtx = AudioContext || webkitAudioContext;
    return new AudioCtx();
}
module.exports = Context;

},{}],3:[function(require,module,exports){
var Convert = (function () {
    function Convert() {
    }
    Convert.keyToNote = function (key) {
        if (key === '') {
            return;
        }
        if (key.search(/^[cdefgabCDEFGAB]/) === -1) {
            throw new Error(key + " is invalid key name.");
        }
        var KEYS = [
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
        var index = (key.indexOf("#") !== -1) ? 2 : 1;
        var keyName = key.substring(0, index).toLowerCase();
        var num = Number(key.substring(index)) + 1;
        var note = KEYS.indexOf(keyName) + 12 * num;
        if (note < 0 || note > 127) {
            throw new Error(key + " is not defined key at MIDI.");
        }
        return note;
    };
    Convert.noteToFreq = function (note) {
        if (typeof note !== "number") {
            throw new Error(note + " is not number.");
        }
        if (note < 0 || note > 127) {
            throw new Error(note + " is invalid MIDI note number.");
        }
        return 440 * Math.pow(Math.pow(2, 1 / 12), note - 69);
    };
    return Convert;
})();
module.exports = Convert;

},{}],4:[function(require,module,exports){
var Line = (function () {
    function Line() {
    }
    Line.create = function (coords) {
        return new fabric.Line(coords, {
            fill: "#51917a",
            stroke: "#51917a",
            strokeWidth: 10,
            selectable: false
        });
    };
    return Line;
})();
module.exports = Line;

},{}],5:[function(require,module,exports){
var Audio = require("./lib/Audio");
var context = require("./lib/Context");
var convert = require("./lib/Convert");
var line = require("./lib/Line");
function main() {
    "use strict";
    var windowW = window.innerWidth, windowH = window.innerHeight;
    var canvas = new fabric.Canvas("c");
    canvas.setWidth(windowW);
    canvas.setHeight(windowH);
    var linePoints = [
        [0, (windowH / 2), windowW, (windowH / 2)],
        [(windowW / 3.6), 0, (windowW / 3.6), windowH],
        [(windowW / 1.25), 0, (windowW / 10), windowH],
        [(windowW / 3.9), 0, (windowW / 1.5), windowH],
        [0, (windowH / 4), windowW, (windowH / 4)],
        [(windowW / 1.8), 0, (windowW / 2.8), windowH]
    ];
    var lines = [];
    linePoints.forEach(function (point, i) {
        lines.push(line.create(linePoints[i]));
    });
    var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];
    var ctx = context();
    var audio = new Audio(ctx);
    var currentPlayIndex = 0;
    document.addEventListener("click", function () {
        if (currentPlayIndex === innocence.length) {
            currentPlayIndex = 0;
        }
        var key = innocence[currentPlayIndex];
        var sound = audio.createSound(convert.noteToFreq(convert.keyToNote(key)));
        sound.connect(ctx.destination);
        sound.start(0);
        setTimeout(function () {
            sound.stop(0);
        }, 200);
        var line = lines[currentPlayIndex];
        if (line.getOpacity() === 0) {
            line.opacity = 1;
        }
        canvas.add(line);
        line.animate("opacity", 0, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function () {
                line.opacity = 0;
            }
        });
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);

},{"./lib/Audio":6,"./lib/Context":7,"./lib/Convert":8,"./lib/Line":9}],6:[function(require,module,exports){
module.exports=require(1)
},{"./src/lib/audio.js":1}],7:[function(require,module,exports){
module.exports=require(2)
},{"./src/lib/context.js":2}],8:[function(require,module,exports){
module.exports=require(3)
},{"./src/lib/convert.js":3}],9:[function(require,module,exports){
module.exports=require(4)
},{"./src/lib/line.js":4}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbGliL2F1ZGlvLmpzIiwic3JjL2xpYi9jb250ZXh0LmpzIiwic3JjL2xpYi9jb252ZXJ0LmpzIiwic3JjL2xpYi9saW5lLmpzIiwic3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBdWRpbyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXVkaW8oY29udGV4dCkge1xuICAgICAgICB0aGlzLmN0eCA9IGNvbnRleHQ7XG4gICAgfVxuICAgIEF1ZGlvLnByb3RvdHlwZS5jcmVhdGVTb3VuZCA9IGZ1bmN0aW9uIChmcmVxKSB7XG4gICAgICAgIGlmIChmcmVxIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3NjID0gdGhpcy5jdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnJlcTtcbiAgICAgICAgcmV0dXJuIG9zYztcbiAgICB9O1xuICAgIEF1ZGlvLnByb3RvdHlwZS5jb25uZWN0T3V0cHV0ID0gZnVuY3Rpb24gKGF1ZGlvKSB7XG4gICAgICAgIGF1ZGlvLmNvbm5lY3QodGhpcy5jdHguZGVzdGluYXRpb24pO1xuICAgIH07XG4gICAgcmV0dXJuIEF1ZGlvO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQXVkaW87XG4iLCJmdW5jdGlvbiBDb250ZXh0KCkge1xuICAgIHZhciBBdWRpb0N0eCA9IEF1ZGlvQ29udGV4dCB8fCB3ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgcmV0dXJuIG5ldyBBdWRpb0N0eCgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0O1xuIiwidmFyIENvbnZlcnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnZlcnQoKSB7XG4gICAgfVxuICAgIENvbnZlcnQua2V5VG9Ob3RlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkuc2VhcmNoKC9eW2NkZWZnYWJDREVGR0FCXS8pID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGtleSArIFwiIGlzIGludmFsaWQga2V5IG5hbWUuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBLRVlTID0gW1xuICAgICAgICAgICAgXCJjXCIsXG4gICAgICAgICAgICBcImMjXCIsXG4gICAgICAgICAgICBcImRcIixcbiAgICAgICAgICAgIFwiZCNcIixcbiAgICAgICAgICAgIFwiZVwiLFxuICAgICAgICAgICAgXCJmXCIsXG4gICAgICAgICAgICBcImYjXCIsXG4gICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgIFwiZyNcIixcbiAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgXCJhI1wiLFxuICAgICAgICAgICAgXCJiXCJcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGluZGV4ID0gKGtleS5pbmRleE9mKFwiI1wiKSAhPT0gLTEpID8gMiA6IDE7XG4gICAgICAgIHZhciBrZXlOYW1lID0ga2V5LnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihrZXkuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICB2YXIgbm90ZSA9IEtFWVMuaW5kZXhPZihrZXlOYW1lKSArIDEyICogbnVtO1xuICAgICAgICBpZiAobm90ZSA8IDAgfHwgbm90ZSA+IDEyNykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGtleSArIFwiIGlzIG5vdCBkZWZpbmVkIGtleSBhdCBNSURJLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9O1xuICAgIENvbnZlcnQubm90ZVRvRnJlcSA9IGZ1bmN0aW9uIChub3RlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm90ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vdGUgKyBcIiBpcyBub3QgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90ZSA8IDAgfHwgbm90ZSA+IDEyNykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vdGUgKyBcIiBpcyBpbnZhbGlkIE1JREkgbm90ZSBudW1iZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA0NDAgKiBNYXRoLnBvdyhNYXRoLnBvdygyLCAxIC8gMTIpLCBub3RlIC0gNjkpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBDb252ZXJ0O1xuIiwidmFyIExpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmUoKSB7XG4gICAgfVxuICAgIExpbmUuY3JlYXRlID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbmV3IGZhYnJpYy5MaW5lKGNvb3Jkcywge1xuICAgICAgICAgICAgZmlsbDogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2U6IFwiIzUxOTE3YVwiLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEwLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTGluZTtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IExpbmU7XG4iLCJ2YXIgQXVkaW8gPSByZXF1aXJlKFwiLi9saWIvQXVkaW9cIik7XG52YXIgY29udGV4dCA9IHJlcXVpcmUoXCIuL2xpYi9Db250ZXh0XCIpO1xudmFyIGNvbnZlcnQgPSByZXF1aXJlKFwiLi9saWIvQ29udmVydFwiKTtcbnZhciBsaW5lID0gcmVxdWlyZShcIi4vbGliL0xpbmVcIik7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGgsIHdpbmRvd0ggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIGNhbnZhcyA9IG5ldyBmYWJyaWMuQ2FudmFzKFwiY1wiKTtcbiAgICBjYW52YXMuc2V0V2lkdGgod2luZG93Vyk7XG4gICAgY2FudmFzLnNldEhlaWdodCh3aW5kb3dIKTtcbiAgICB2YXIgbGluZVBvaW50cyA9IFtcbiAgICAgICAgWzAsICh3aW5kb3dIIC8gMiksIHdpbmRvd1csICh3aW5kb3dIIC8gMildLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjYpLCAwLCAod2luZG93VyAvIDMuNiksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAxLjI1KSwgMCwgKHdpbmRvd1cgLyAxMCksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjkpLCAwLCAod2luZG93VyAvIDEuNSksIHdpbmRvd0hdLFxuICAgICAgICBbMCwgKHdpbmRvd0ggLyA0KSwgd2luZG93VywgKHdpbmRvd0ggLyA0KV0sXG4gICAgICAgIFsod2luZG93VyAvIDEuOCksIDAsICh3aW5kb3dXIC8gMi44KSwgd2luZG93SF1cbiAgICBdO1xuICAgIHZhciBsaW5lcyA9IFtdO1xuICAgIGxpbmVQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQsIGkpIHtcbiAgICAgICAgbGluZXMucHVzaChsaW5lLmNyZWF0ZShsaW5lUG9pbnRzW2ldKSk7XG4gICAgfSk7XG4gICAgdmFyIGlubm9jZW5jZSA9IFtcIkQ1XCIsIFwiRTVcIiwgXCJHNVwiLCBcIkE1XCIsIFwiQjVcIiwgXCJHNVwiXTtcbiAgICB2YXIgY3R4ID0gY29udGV4dCgpO1xuICAgIHZhciBhdWRpbyA9IG5ldyBBdWRpbyhjdHgpO1xuICAgIHZhciBjdXJyZW50UGxheUluZGV4ID0gMDtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudFBsYXlJbmRleCA9PT0gaW5ub2NlbmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9IGlubm9jZW5jZVtjdXJyZW50UGxheUluZGV4XTtcbiAgICAgICAgdmFyIHNvdW5kID0gYXVkaW8uY3JlYXRlU291bmQoY29udmVydC5ub3RlVG9GcmVxKGNvbnZlcnQua2V5VG9Ob3RlKGtleSkpKTtcbiAgICAgICAgc291bmQuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgICBzb3VuZC5zdGFydCgwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzb3VuZC5zdG9wKDApO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2N1cnJlbnRQbGF5SW5kZXhdO1xuICAgICAgICBpZiAobGluZS5nZXRPcGFjaXR5KCkgPT09IDApIHtcbiAgICAgICAgICAgIGxpbmUub3BhY2l0eSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzLmFkZChsaW5lKTtcbiAgICAgICAgbGluZS5hbmltYXRlKFwib3BhY2l0eVwiLCAwLCB7XG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsaW5lLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudFBsYXlJbmRleCsrO1xuICAgIH0pO1xufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbWFpbiwgZmFsc2UpO1xuIl19
