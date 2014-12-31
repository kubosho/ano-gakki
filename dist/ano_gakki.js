(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Audio = (function () {
    function Audio(context) {
        this.ctx = context;
    }
    Audio.prototype.createSound = function (freq) {
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
    Convert.keyToNote = function (name) {
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
        var index = (name.indexOf("#") !== -1) ? 2 : 1;
        var note = name.substring(0, index).toLowerCase();
        var num = Number(name.substring(index)) + 1;
        return KEYS.indexOf(note) + 12 * num;
    };
    Convert.noteToFreq = function (num) {
        return 440 * Math.pow(Math.pow(2, 1 / 12), num - 69);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbGliL2F1ZGlvLmpzIiwic3JjL2xpYi9jb250ZXh0LmpzIiwic3JjL2xpYi9jb252ZXJ0LmpzIiwic3JjL2xpYi9saW5lLmpzIiwic3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBdWRpbyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXVkaW8oY29udGV4dCkge1xuICAgICAgICB0aGlzLmN0eCA9IGNvbnRleHQ7XG4gICAgfVxuICAgIEF1ZGlvLnByb3RvdHlwZS5jcmVhdGVTb3VuZCA9IGZ1bmN0aW9uIChmcmVxKSB7XG4gICAgICAgIHZhciBvc2MgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmcmVxO1xuICAgICAgICByZXR1cm4gb3NjO1xuICAgIH07XG4gICAgQXVkaW8ucHJvdG90eXBlLmNvbm5lY3RPdXRwdXQgPSBmdW5jdGlvbiAoYXVkaW8pIHtcbiAgICAgICAgYXVkaW8uY29ubmVjdCh0aGlzLmN0eC5kZXN0aW5hdGlvbik7XG4gICAgfTtcbiAgICByZXR1cm4gQXVkaW87XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBBdWRpbztcbiIsImZ1bmN0aW9uIENvbnRleHQoKSB7XG4gICAgdmFyIEF1ZGlvQ3R4ID0gQXVkaW9Db250ZXh0IHx8IHdlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICByZXR1cm4gbmV3IEF1ZGlvQ3R4KCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHQ7XG4iLCJ2YXIgQ29udmVydCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udmVydCgpIHtcbiAgICB9XG4gICAgQ29udmVydC5rZXlUb05vdGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgS0VZUyA9IFtcbiAgICAgICAgICAgIFwiY1wiLFxuICAgICAgICAgICAgXCJjI1wiLFxuICAgICAgICAgICAgXCJkXCIsXG4gICAgICAgICAgICBcImQjXCIsXG4gICAgICAgICAgICBcImVcIixcbiAgICAgICAgICAgIFwiZlwiLFxuICAgICAgICAgICAgXCJmI1wiLFxuICAgICAgICAgICAgXCJnXCIsXG4gICAgICAgICAgICBcImcjXCIsXG4gICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgIFwiYSNcIixcbiAgICAgICAgICAgIFwiYlwiXG4gICAgICAgIF07XG4gICAgICAgIHZhciBpbmRleCA9IChuYW1lLmluZGV4T2YoXCIjXCIpICE9PSAtMSkgPyAyIDogMTtcbiAgICAgICAgdmFyIG5vdGUgPSBuYW1lLnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihuYW1lLnN1YnN0cmluZyhpbmRleCkpICsgMTtcbiAgICAgICAgcmV0dXJuIEtFWVMuaW5kZXhPZihub3RlKSArIDEyICogbnVtO1xuICAgIH07XG4gICAgQ29udmVydC5ub3RlVG9GcmVxID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICByZXR1cm4gNDQwICogTWF0aC5wb3coTWF0aC5wb3coMiwgMSAvIDEyKSwgbnVtIC0gNjkpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBDb252ZXJ0O1xuIiwidmFyIExpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmUoKSB7XG4gICAgfVxuICAgIExpbmUuY3JlYXRlID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbmV3IGZhYnJpYy5MaW5lKGNvb3Jkcywge1xuICAgICAgICAgICAgZmlsbDogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2U6IFwiIzUxOTE3YVwiLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEwLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMaW5lLmRyYXcgPSBmdW5jdGlvbiAoY2FudmFzLCBjb29yZHMpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBMaW5lLmNyZWF0ZShjb29yZHMpO1xuICAgICAgICBjYW52YXMuYWRkKGxpbmUpO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5lO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gTGluZTtcbiIsImZ1bmN0aW9uIG1haW4oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93SCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgY2FudmFzID0gbmV3IGZhYnJpYy5DYW52YXMoXCJjXCIpO1xuICAgIGNhbnZhcy5zZXRXaWR0aCh3aW5kb3dXKTtcbiAgICBjYW52YXMuc2V0SGVpZ2h0KHdpbmRvd0gpO1xuICAgIHZhciBsaW5lcyA9IFtcbiAgICAgICAgWzAsICh3aW5kb3dIIC8gMiksIHdpbmRvd1csICh3aW5kb3dIIC8gMildLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjYpLCAwLCAod2luZG93VyAvIDMuNiksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAxLjI1KSwgMCwgKHdpbmRvd1cgLyAxMCksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjkpLCAwLCAod2luZG93VyAvIDEuNSksIHdpbmRvd0hdLFxuICAgICAgICBbMCwgKHdpbmRvd0ggLyA0KSwgd2luZG93VywgKHdpbmRvd0ggLyA0KV0sXG4gICAgICAgIFsod2luZG93VyAvIDEuOCksIDAsICh3aW5kb3dXIC8gMi44KSwgd2luZG93SF1cbiAgICBdO1xuICAgIHZhciBpbm5vY2VuY2UgPSBbXCJENVwiLCBcIkU1XCIsIFwiRzVcIiwgXCJBNVwiLCBcIkI1XCIsIFwiRzVcIl07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB9KTtcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4sIGZhbHNlKTtcbiJdfQ==
