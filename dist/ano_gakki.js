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
        if (key.search(/^[cCdDeEfFgGaAbB]/) === -1) {
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
    Line.draw = function (canvas, coords) {
        var line = Line.create(coords);
        canvas.add(line);
        return line;
    };
    return Line;
})();
module.exports = Line;

},{}],5:[function(require,module,exports){
function main() {
    "use strict";
    var windowW = window.innerWidth, windowH = window.innerHeight;
    var canvas = new fabric.Canvas("c");
    canvas.setWidth(windowW);
    canvas.setHeight(windowH);
    var lines = [
        [0, (windowH / 2), windowW, (windowH / 2)],
        [(windowW / 3.6), 0, (windowW / 3.6), windowH],
        [(windowW / 1.25), 0, (windowW / 10), windowH],
        [(windowW / 3.9), 0, (windowW / 1.5), windowH],
        [0, (windowH / 4), windowW, (windowH / 4)],
        [(windowW / 1.8), 0, (windowW / 2.8), windowH]
    ];
    var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];
    document.addEventListener("click", function () {
    });
}
document.addEventListener("DOMContentLoaded", main, false);

},{}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbGliL2F1ZGlvLmpzIiwic3JjL2xpYi9jb250ZXh0LmpzIiwic3JjL2xpYi9jb252ZXJ0LmpzIiwic3JjL2xpYi9saW5lLmpzIiwic3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBdWRpbyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXVkaW8oY29udGV4dCkge1xuICAgICAgICB0aGlzLmN0eCA9IGNvbnRleHQ7XG4gICAgfVxuICAgIEF1ZGlvLnByb3RvdHlwZS5jcmVhdGVTb3VuZCA9IGZ1bmN0aW9uIChmcmVxKSB7XG4gICAgICAgIGlmIChmcmVxIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3NjID0gdGhpcy5jdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnJlcTtcbiAgICAgICAgcmV0dXJuIG9zYztcbiAgICB9O1xuICAgIEF1ZGlvLnByb3RvdHlwZS5jb25uZWN0T3V0cHV0ID0gZnVuY3Rpb24gKGF1ZGlvKSB7XG4gICAgICAgIGF1ZGlvLmNvbm5lY3QodGhpcy5jdHguZGVzdGluYXRpb24pO1xuICAgIH07XG4gICAgcmV0dXJuIEF1ZGlvO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQXVkaW87XG4iLCJmdW5jdGlvbiBDb250ZXh0KCkge1xuICAgIHZhciBBdWRpb0N0eCA9IEF1ZGlvQ29udGV4dCB8fCB3ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgcmV0dXJuIG5ldyBBdWRpb0N0eCgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0O1xuIiwidmFyIENvbnZlcnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnZlcnQoKSB7XG4gICAgfVxuICAgIENvbnZlcnQua2V5VG9Ob3RlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkuc2VhcmNoKC9eW2NDZERlRWZGZ0dhQWJCXS8pID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGtleSArIFwiIGlzIGludmFsaWQga2V5IG5hbWUuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBLRVlTID0gW1xuICAgICAgICAgICAgXCJjXCIsXG4gICAgICAgICAgICBcImMjXCIsXG4gICAgICAgICAgICBcImRcIixcbiAgICAgICAgICAgIFwiZCNcIixcbiAgICAgICAgICAgIFwiZVwiLFxuICAgICAgICAgICAgXCJmXCIsXG4gICAgICAgICAgICBcImYjXCIsXG4gICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgIFwiZyNcIixcbiAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgXCJhI1wiLFxuICAgICAgICAgICAgXCJiXCJcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGluZGV4ID0gKGtleS5pbmRleE9mKFwiI1wiKSAhPT0gLTEpID8gMiA6IDE7XG4gICAgICAgIHZhciBrZXlOYW1lID0ga2V5LnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihrZXkuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICB2YXIgbm90ZSA9IEtFWVMuaW5kZXhPZihrZXlOYW1lKSArIDEyICogbnVtO1xuICAgICAgICBpZiAobm90ZSA8IDAgfHwgbm90ZSA+IDEyNykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGtleSArIFwiIGlzIG5vdCBkZWZpbmVkIGtleSBhdCBNSURJLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9O1xuICAgIENvbnZlcnQubm90ZVRvRnJlcSA9IGZ1bmN0aW9uIChub3RlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm90ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vdGUgKyBcIiBpcyBub3QgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90ZSA8IDAgfHwgbm90ZSA+IDEyNykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vdGUgKyBcIiBpcyBpbnZhbGlkIE1JREkgbm90ZSBudW1iZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA0NDAgKiBNYXRoLnBvdyhNYXRoLnBvdygyLCAxIC8gMTIpLCBub3RlIC0gNjkpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBDb252ZXJ0O1xuIiwidmFyIExpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmUoKSB7XG4gICAgfVxuICAgIExpbmUuY3JlYXRlID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbmV3IGZhYnJpYy5MaW5lKGNvb3Jkcywge1xuICAgICAgICAgICAgZmlsbDogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2U6IFwiIzUxOTE3YVwiLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEwLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMaW5lLmRyYXcgPSBmdW5jdGlvbiAoY2FudmFzLCBjb29yZHMpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBMaW5lLmNyZWF0ZShjb29yZHMpO1xuICAgICAgICBjYW52YXMuYWRkKGxpbmUpO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5lO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gTGluZTtcbiIsImZ1bmN0aW9uIG1haW4oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93SCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgY2FudmFzID0gbmV3IGZhYnJpYy5DYW52YXMoXCJjXCIpO1xuICAgIGNhbnZhcy5zZXRXaWR0aCh3aW5kb3dXKTtcbiAgICBjYW52YXMuc2V0SGVpZ2h0KHdpbmRvd0gpO1xuICAgIHZhciBsaW5lcyA9IFtcbiAgICAgICAgWzAsICh3aW5kb3dIIC8gMiksIHdpbmRvd1csICh3aW5kb3dIIC8gMildLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjYpLCAwLCAod2luZG93VyAvIDMuNiksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAxLjI1KSwgMCwgKHdpbmRvd1cgLyAxMCksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjkpLCAwLCAod2luZG93VyAvIDEuNSksIHdpbmRvd0hdLFxuICAgICAgICBbMCwgKHdpbmRvd0ggLyA0KSwgd2luZG93VywgKHdpbmRvd0ggLyA0KV0sXG4gICAgICAgIFsod2luZG93VyAvIDEuOCksIDAsICh3aW5kb3dXIC8gMi44KSwgd2luZG93SF1cbiAgICBdO1xuICAgIHZhciBpbm5vY2VuY2UgPSBbXCJENVwiLCBcIkU1XCIsIFwiRzVcIiwgXCJBNVwiLCBcIkI1XCIsIFwiRzVcIl07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB9KTtcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4sIGZhbHNlKTtcbiJdfQ==
