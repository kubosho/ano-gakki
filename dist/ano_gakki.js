(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var convert = require("./convert");
var Sound = (function () {
    function Sound() {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
    }
    Sound.prototype.oscillator = function (key) {
        var osc = this.ctx.createOscillator();
        osc.frequency.value = convert.noteToFreq(convert.keyToNote(key));
        return osc;
    };
    return Sound;
})();
module.exports = Sound;

},{"./convert":1}],4:[function(require,module,exports){
var Sound = require("./lib/sound");
var Line = require("./lib/line");
var sound = new Sound();
"use strict";
function playSound(key) {
    var osc = sound.oscillator(key);
    osc.connect(sound.ctx.destination);
    osc.start(0);
    setTimeout(function () {
        osc.stop(0);
    }, 200);
}
function main() {
    var windowW = window.innerWidth, windowH = window.innerHeight;
    var currentPlayIndex = 0;
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
        if (currentPlayIndex === innocence.length) {
            currentPlayIndex = 0;
        }
        playSound(innocence[currentPlayIndex]);
        var line = Line.draw(canvas, lines[currentPlayIndex]);
        line.animate('opacity', 0, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000
        });
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);

},{"./lib/line":2,"./lib/sound":3}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9saWIvY29udmVydC5qcyIsImJ1aWxkL2xpYi9saW5lLmpzIiwiYnVpbGQvbGliL3NvdW5kLmpzIiwiYnVpbGQvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQ29udmVydCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udmVydCgpIHtcbiAgICB9XG4gICAgQ29udmVydC5rZXlUb05vdGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgS0VZUyA9IFtcbiAgICAgICAgICAgIFwiY1wiLFxuICAgICAgICAgICAgXCJjI1wiLFxuICAgICAgICAgICAgXCJkXCIsXG4gICAgICAgICAgICBcImQjXCIsXG4gICAgICAgICAgICBcImVcIixcbiAgICAgICAgICAgIFwiZlwiLFxuICAgICAgICAgICAgXCJmI1wiLFxuICAgICAgICAgICAgXCJnXCIsXG4gICAgICAgICAgICBcImcjXCIsXG4gICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgIFwiYSNcIixcbiAgICAgICAgICAgIFwiYlwiXG4gICAgICAgIF07XG4gICAgICAgIHZhciBpbmRleCA9IChuYW1lLmluZGV4T2YoXCIjXCIpICE9PSAtMSkgPyAyIDogMTtcbiAgICAgICAgdmFyIG5vdGUgPSBuYW1lLnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG51bSA9IE51bWJlcihuYW1lLnN1YnN0cmluZyhpbmRleCkpICsgMTtcbiAgICAgICAgcmV0dXJuIEtFWVMuaW5kZXhPZihub3RlKSArIDEyICogbnVtO1xuICAgIH07XG4gICAgQ29udmVydC5ub3RlVG9GcmVxID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICByZXR1cm4gNDQwICogTWF0aC5wb3coTWF0aC5wb3coMiwgMSAvIDEyKSwgbnVtIC0gNjkpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBDb252ZXJ0O1xuIiwidmFyIExpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmUoKSB7XG4gICAgfVxuICAgIExpbmUuY3JlYXRlID0gZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbmV3IGZhYnJpYy5MaW5lKGNvb3Jkcywge1xuICAgICAgICAgICAgZmlsbDogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2U6IFwiIzUxOTE3YVwiLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEwLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMaW5lLmRyYXcgPSBmdW5jdGlvbiAoY2FudmFzLCBjb29yZHMpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBMaW5lLmNyZWF0ZShjb29yZHMpO1xuICAgICAgICBjYW52YXMuYWRkKGxpbmUpO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5lO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gTGluZTtcbiIsInZhciBjb252ZXJ0ID0gcmVxdWlyZShcIi4vY29udmVydFwiKTtcbnZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU291bmQoKSB7XG4gICAgICAgIHZhciBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgICAgdGhpcy5jdHggPSBuZXcgQXVkaW9DdHgoKTtcbiAgICB9XG4gICAgU291bmQucHJvdG90eXBlLm9zY2lsbGF0b3IgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBvc2MgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kudmFsdWUgPSBjb252ZXJ0Lm5vdGVUb0ZyZXEoY29udmVydC5rZXlUb05vdGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICByZXR1cm4gU291bmQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBTb3VuZDtcbiIsInZhciBTb3VuZCA9IHJlcXVpcmUoXCIuL2xpYi9zb3VuZFwiKTtcbnZhciBMaW5lID0gcmVxdWlyZShcIi4vbGliL2xpbmVcIik7XG52YXIgc291bmQgPSBuZXcgU291bmQoKTtcblwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gcGxheVNvdW5kKGtleSkge1xuICAgIHZhciBvc2MgPSBzb3VuZC5vc2NpbGxhdG9yKGtleSk7XG4gICAgb3NjLmNvbm5lY3Qoc291bmQuY3R4LmRlc3RpbmF0aW9uKTtcbiAgICBvc2Muc3RhcnQoMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9zYy5zdG9wKDApO1xuICAgIH0sIDIwMCk7XG59XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHZhciB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGgsIHdpbmRvd0ggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIGN1cnJlbnRQbGF5SW5kZXggPSAwO1xuICAgIHZhciBjYW52YXMgPSBuZXcgZmFicmljLkNhbnZhcyhcImNcIik7XG4gICAgY2FudmFzLnNldFdpZHRoKHdpbmRvd1cpO1xuICAgIGNhbnZhcy5zZXRIZWlnaHQod2luZG93SCk7XG4gICAgdmFyIGxpbmVzID0gW1xuICAgICAgICBbMCwgKHdpbmRvd0ggLyAyKSwgd2luZG93VywgKHdpbmRvd0ggLyAyKV0sXG4gICAgICAgIFsod2luZG93VyAvIDMuNiksIDAsICh3aW5kb3dXIC8gMy42KSwgd2luZG93SF0sXG4gICAgICAgIFsod2luZG93VyAvIDEuMjUpLCAwLCAod2luZG93VyAvIDEwKSwgd2luZG93SF0sXG4gICAgICAgIFsod2luZG93VyAvIDMuOSksIDAsICh3aW5kb3dXIC8gMS41KSwgd2luZG93SF0sXG4gICAgICAgIFswLCAod2luZG93SCAvIDQpLCB3aW5kb3dXLCAod2luZG93SCAvIDQpXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMS44KSwgMCwgKHdpbmRvd1cgLyAyLjgpLCB3aW5kb3dIXVxuICAgIF07XG4gICAgdmFyIGlubm9jZW5jZSA9IFtcIkQ1XCIsIFwiRTVcIiwgXCJHNVwiLCBcIkE1XCIsIFwiQjVcIiwgXCJHNVwiXTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudFBsYXlJbmRleCA9PT0gaW5ub2NlbmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcGxheVNvdW5kKGlubm9jZW5jZVtjdXJyZW50UGxheUluZGV4XSk7XG4gICAgICAgIHZhciBsaW5lID0gTGluZS5kcmF3KGNhbnZhcywgbGluZXNbY3VycmVudFBsYXlJbmRleF0pO1xuICAgICAgICBsaW5lLmFuaW1hdGUoJ29wYWNpdHknLCAwLCB7XG4gICAgICAgICAgICBvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudFBsYXlJbmRleCsrO1xuICAgIH0pO1xufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbWFpbiwgZmFsc2UpO1xuIl19
