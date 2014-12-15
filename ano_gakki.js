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

},{"./convert":1}],3:[function(require,module,exports){
var Sound = require("./lib/sound");
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

},{"./lib/sound":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9saWIvY29udmVydC5qcyIsImJ1aWxkL2xpYi9zb3VuZC5qcyIsImJ1aWxkL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBDb252ZXJ0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb252ZXJ0KCkge1xuICAgIH1cbiAgICBDb252ZXJ0LmtleVRvTm90ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBLRVlTID0gW1xuICAgICAgICAgICAgXCJjXCIsXG4gICAgICAgICAgICBcImMjXCIsXG4gICAgICAgICAgICBcImRcIixcbiAgICAgICAgICAgIFwiZCNcIixcbiAgICAgICAgICAgIFwiZVwiLFxuICAgICAgICAgICAgXCJmXCIsXG4gICAgICAgICAgICBcImYjXCIsXG4gICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgIFwiZyNcIixcbiAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgXCJhI1wiLFxuICAgICAgICAgICAgXCJiXCJcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGluZGV4ID0gKG5hbWUuaW5kZXhPZihcIiNcIikgIT09IC0xKSA/IDIgOiAxO1xuICAgICAgICB2YXIgbm90ZSA9IG5hbWUuc3Vic3RyaW5nKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbnVtID0gTnVtYmVyKG5hbWUuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICByZXR1cm4gS0VZUy5pbmRleE9mKG5vdGUpICsgMTIgKiBudW07XG4gICAgfTtcbiAgICBDb252ZXJ0Lm5vdGVUb0ZyZXEgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHJldHVybiA0NDAgKiBNYXRoLnBvdyhNYXRoLnBvdygyLCAxIC8gMTIpLCBudW0gLSA2OSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udmVydDtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IENvbnZlcnQ7XG4iLCJ2YXIgY29udmVydCA9IHJlcXVpcmUoXCIuL2NvbnZlcnRcIik7XG52YXIgU291bmQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNvdW5kKCkge1xuICAgICAgICB2YXIgQXVkaW9DdHggPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgfVxuICAgIFNvdW5kLnByb3RvdHlwZS5vc2NpbGxhdG9yID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgb3NjID0gdGhpcy5jdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnZhbHVlID0gY29udmVydC5ub3RlVG9GcmVxKGNvbnZlcnQua2V5VG9Ob3RlKGtleSkpO1xuICAgICAgICByZXR1cm4gb3NjO1xuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gU291bmQ7XG4iLCJ2YXIgU291bmQgPSByZXF1aXJlKFwiLi9saWIvc291bmRcIik7XG52YXIgc291bmQgPSBuZXcgU291bmQoKTtcblwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gcGxheVNvdW5kKGtleSkge1xuICAgIHZhciBvc2MgPSBzb3VuZC5vc2NpbGxhdG9yKGtleSk7XG4gICAgb3NjLmNvbm5lY3Qoc291bmQuY3R4LmRlc3RpbmF0aW9uKTtcbiAgICBvc2Muc3RhcnQoMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9zYy5zdG9wKDApO1xuICAgIH0sIDIwMCk7XG59XG52YXIgTGluZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGluZSgpIHtcbiAgICB9XG4gICAgTGluZS5jcmVhdGUgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgZmFicmljLkxpbmUoY29vcmRzLCB7XG4gICAgICAgICAgICBmaWxsOiBcIiM1MTkxN2FcIixcbiAgICAgICAgICAgIHN0cm9rZTogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgICAgICBzZWxlY3RhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExpbmUuZHJhdyA9IGZ1bmN0aW9uIChjYW52YXMsIGNvb3Jkcykge1xuICAgICAgICB2YXIgbGluZSA9IExpbmUuY3JlYXRlKGNvb3Jkcyk7XG4gICAgICAgIGNhbnZhcy5hZGQobGluZSk7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmU7XG59KSgpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICB2YXIgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3dIID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciBjdXJyZW50UGxheUluZGV4ID0gMDtcbiAgICB2YXIgY2FudmFzID0gbmV3IGZhYnJpYy5DYW52YXMoXCJjXCIpO1xuICAgIGNhbnZhcy5zZXRXaWR0aCh3aW5kb3dXKTtcbiAgICBjYW52YXMuc2V0SGVpZ2h0KHdpbmRvd0gpO1xuICAgIHZhciBsaW5lcyA9IFtcbiAgICAgICAgWzAsICh3aW5kb3dIIC8gMiksIHdpbmRvd1csICh3aW5kb3dIIC8gMildLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjYpLCAwLCAod2luZG93VyAvIDMuNiksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAxLjI1KSwgMCwgKHdpbmRvd1cgLyAxMCksIHdpbmRvd0hdLFxuICAgICAgICBbKHdpbmRvd1cgLyAzLjkpLCAwLCAod2luZG93VyAvIDEuNSksIHdpbmRvd0hdLFxuICAgICAgICBbMCwgKHdpbmRvd0ggLyA0KSwgd2luZG93VywgKHdpbmRvd0ggLyA0KV0sXG4gICAgICAgIFsod2luZG93VyAvIDEuOCksIDAsICh3aW5kb3dXIC8gMi44KSwgd2luZG93SF1cbiAgICBdO1xuICAgIHZhciBpbm5vY2VuY2UgPSBbXCJENVwiLCBcIkU1XCIsIFwiRzVcIiwgXCJBNVwiLCBcIkI1XCIsIFwiRzVcIl07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5SW5kZXggPT09IGlubm9jZW5jZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHBsYXlTb3VuZChpbm5vY2VuY2VbY3VycmVudFBsYXlJbmRleF0pO1xuICAgICAgICB2YXIgbGluZSA9IExpbmUuZHJhdyhjYW52YXMsIGxpbmVzW2N1cnJlbnRQbGF5SW5kZXhdKTtcbiAgICAgICAgbGluZS5hbmltYXRlKCdvcGFjaXR5JywgMCwge1xuICAgICAgICAgICAgb25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRQbGF5SW5kZXgrKztcbiAgICB9KTtcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4sIGZhbHNlKTtcbiJdfQ==
