(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Audio = (function () {
    function Audio() {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var Convert = require("./lib/convert");
var Audio = require("./lib/Audio");
var Line = require("./lib/line");
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
    var audio = new Audio();
    var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];
    var currentPlayIndex = 0;
    document.addEventListener("click", function () {
        if (currentPlayIndex === innocence.length) {
            currentPlayIndex = 0;
        }
        var key = innocence[currentPlayIndex];
        var sound = audio.createSound(Convert.noteToFreq(Convert.keyToNote(key)));
        sound.connect(audio.ctx.destination);
        sound.start(0);
        setTimeout(function () {
            sound.stop(0);
        }, 200);
        var line = Line.draw(canvas, lines[currentPlayIndex]);
        line.animate('opacity', 0, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000
        });
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);

},{"./lib/Audio":1,"./lib/convert":2,"./lib/line":3}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9saWIvQXVkaW8uanMiLCJidWlsZC9saWIvY29udmVydC5qcyIsImJ1aWxkL2xpYi9saW5lLmpzIiwiYnVpbGQvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXVkaW8gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF1ZGlvKCkge1xuICAgICAgICB2YXIgQXVkaW9DdHggPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgfVxuICAgIEF1ZGlvLnByb3RvdHlwZS5jcmVhdGVTb3VuZCA9IGZ1bmN0aW9uIChmcmVxKSB7XG4gICAgICAgIHZhciBvc2MgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmcmVxO1xuICAgICAgICByZXR1cm4gb3NjO1xuICAgIH07XG4gICAgQXVkaW8ucHJvdG90eXBlLmNvbm5lY3RPdXRwdXQgPSBmdW5jdGlvbiAoYXVkaW8pIHtcbiAgICAgICAgYXVkaW8uY29ubmVjdCh0aGlzLmN0eC5kZXN0aW5hdGlvbik7XG4gICAgfTtcbiAgICByZXR1cm4gQXVkaW87XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBBdWRpbztcbiIsInZhciBDb252ZXJ0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb252ZXJ0KCkge1xuICAgIH1cbiAgICBDb252ZXJ0LmtleVRvTm90ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBLRVlTID0gW1xuICAgICAgICAgICAgXCJjXCIsXG4gICAgICAgICAgICBcImMjXCIsXG4gICAgICAgICAgICBcImRcIixcbiAgICAgICAgICAgIFwiZCNcIixcbiAgICAgICAgICAgIFwiZVwiLFxuICAgICAgICAgICAgXCJmXCIsXG4gICAgICAgICAgICBcImYjXCIsXG4gICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgIFwiZyNcIixcbiAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgXCJhI1wiLFxuICAgICAgICAgICAgXCJiXCJcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGluZGV4ID0gKG5hbWUuaW5kZXhPZihcIiNcIikgIT09IC0xKSA/IDIgOiAxO1xuICAgICAgICB2YXIgbm90ZSA9IG5hbWUuc3Vic3RyaW5nKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbnVtID0gTnVtYmVyKG5hbWUuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICByZXR1cm4gS0VZUy5pbmRleE9mKG5vdGUpICsgMTIgKiBudW07XG4gICAgfTtcbiAgICBDb252ZXJ0Lm5vdGVUb0ZyZXEgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHJldHVybiA0NDAgKiBNYXRoLnBvdyhNYXRoLnBvdygyLCAxIC8gMTIpLCBudW0gLSA2OSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udmVydDtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IENvbnZlcnQ7XG4iLCJ2YXIgTGluZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGluZSgpIHtcbiAgICB9XG4gICAgTGluZS5jcmVhdGUgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgZmFicmljLkxpbmUoY29vcmRzLCB7XG4gICAgICAgICAgICBmaWxsOiBcIiM1MTkxN2FcIixcbiAgICAgICAgICAgIHN0cm9rZTogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgICAgICBzZWxlY3RhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExpbmUuZHJhdyA9IGZ1bmN0aW9uIChjYW52YXMsIGNvb3Jkcykge1xuICAgICAgICB2YXIgbGluZSA9IExpbmUuY3JlYXRlKGNvb3Jkcyk7XG4gICAgICAgIGNhbnZhcy5hZGQobGluZSk7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmU7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBMaW5lO1xuIiwidmFyIENvbnZlcnQgPSByZXF1aXJlKFwiLi9saWIvY29udmVydFwiKTtcbnZhciBBdWRpbyA9IHJlcXVpcmUoXCIuL2xpYi9BdWRpb1wiKTtcbnZhciBMaW5lID0gcmVxdWlyZShcIi4vbGliL2xpbmVcIik7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGgsIHdpbmRvd0ggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIGNhbnZhcyA9IG5ldyBmYWJyaWMuQ2FudmFzKFwiY1wiKTtcbiAgICBjYW52YXMuc2V0V2lkdGgod2luZG93Vyk7XG4gICAgY2FudmFzLnNldEhlaWdodCh3aW5kb3dIKTtcbiAgICB2YXIgbGluZXMgPSBbXG4gICAgICAgIFswLCAod2luZG93SCAvIDIpLCB3aW5kb3dXLCAod2luZG93SCAvIDIpXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMy42KSwgMCwgKHdpbmRvd1cgLyAzLjYpLCB3aW5kb3dIXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMS4yNSksIDAsICh3aW5kb3dXIC8gMTApLCB3aW5kb3dIXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMy45KSwgMCwgKHdpbmRvd1cgLyAxLjUpLCB3aW5kb3dIXSxcbiAgICAgICAgWzAsICh3aW5kb3dIIC8gNCksIHdpbmRvd1csICh3aW5kb3dIIC8gNCldLFxuICAgICAgICBbKHdpbmRvd1cgLyAxLjgpLCAwLCAod2luZG93VyAvIDIuOCksIHdpbmRvd0hdXG4gICAgXTtcbiAgICB2YXIgYXVkaW8gPSBuZXcgQXVkaW8oKTtcbiAgICB2YXIgaW5ub2NlbmNlID0gW1wiRDVcIiwgXCJFNVwiLCBcIkc1XCIsIFwiQTVcIiwgXCJCNVwiLCBcIkc1XCJdO1xuICAgIHZhciBjdXJyZW50UGxheUluZGV4ID0gMDtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudFBsYXlJbmRleCA9PT0gaW5ub2NlbmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9IGlubm9jZW5jZVtjdXJyZW50UGxheUluZGV4XTtcbiAgICAgICAgdmFyIHNvdW5kID0gYXVkaW8uY3JlYXRlU291bmQoQ29udmVydC5ub3RlVG9GcmVxKENvbnZlcnQua2V5VG9Ob3RlKGtleSkpKTtcbiAgICAgICAgc291bmQuY29ubmVjdChhdWRpby5jdHguZGVzdGluYXRpb24pO1xuICAgICAgICBzb3VuZC5zdGFydCgwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzb3VuZC5zdG9wKDApO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgICB2YXIgbGluZSA9IExpbmUuZHJhdyhjYW52YXMsIGxpbmVzW2N1cnJlbnRQbGF5SW5kZXhdKTtcbiAgICAgICAgbGluZS5hbmltYXRlKCdvcGFjaXR5JywgMCwge1xuICAgICAgICAgICAgb25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRQbGF5SW5kZXgrKztcbiAgICB9KTtcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4sIGZhbHNlKTtcbiJdfQ==
