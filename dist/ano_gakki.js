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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9zb3VyY2VzL2xpYi9hdWRpby5qcyIsImJ1aWxkL3NvdXJjZXMvbGliL2NvbnRleHQuanMiLCJidWlsZC9zb3VyY2VzL2xpYi9jb252ZXJ0LmpzIiwiYnVpbGQvc291cmNlcy9saWIvbGluZS5qcyIsImJ1aWxkL3NvdXJjZXMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEF1ZGlvID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdWRpbyhjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY29udGV4dDtcbiAgICB9XG4gICAgQXVkaW8ucHJvdG90eXBlLmNyZWF0ZVNvdW5kID0gZnVuY3Rpb24gKGZyZXEpIHtcbiAgICAgICAgdmFyIG9zYyA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXE7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICBBdWRpby5wcm90b3R5cGUuY29ubmVjdE91dHB1dCA9IGZ1bmN0aW9uIChhdWRpbykge1xuICAgICAgICBhdWRpby5jb25uZWN0KHRoaXMuY3R4LmRlc3RpbmF0aW9uKTtcbiAgICB9O1xuICAgIHJldHVybiBBdWRpbztcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvO1xuIiwiZnVuY3Rpb24gQ29udGV4dCgpIHtcbiAgICB2YXIgQXVkaW9DdHggPSBBdWRpb0NvbnRleHQgfHwgd2Via2l0QXVkaW9Db250ZXh0O1xuICAgIHJldHVybiBuZXcgQXVkaW9DdHgoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dDtcbiIsInZhciBDb252ZXJ0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb252ZXJ0KCkge1xuICAgIH1cbiAgICBDb252ZXJ0LmtleVRvTm90ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBLRVlTID0gW1xuICAgICAgICAgICAgXCJjXCIsXG4gICAgICAgICAgICBcImMjXCIsXG4gICAgICAgICAgICBcImRcIixcbiAgICAgICAgICAgIFwiZCNcIixcbiAgICAgICAgICAgIFwiZVwiLFxuICAgICAgICAgICAgXCJmXCIsXG4gICAgICAgICAgICBcImYjXCIsXG4gICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgIFwiZyNcIixcbiAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgXCJhI1wiLFxuICAgICAgICAgICAgXCJiXCJcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGluZGV4ID0gKG5hbWUuaW5kZXhPZihcIiNcIikgIT09IC0xKSA/IDIgOiAxO1xuICAgICAgICB2YXIgbm90ZSA9IG5hbWUuc3Vic3RyaW5nKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbnVtID0gTnVtYmVyKG5hbWUuc3Vic3RyaW5nKGluZGV4KSkgKyAxO1xuICAgICAgICByZXR1cm4gS0VZUy5pbmRleE9mKG5vdGUpICsgMTIgKiBudW07XG4gICAgfTtcbiAgICBDb252ZXJ0Lm5vdGVUb0ZyZXEgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHJldHVybiA0NDAgKiBNYXRoLnBvdyhNYXRoLnBvdygyLCAxIC8gMTIpLCBudW0gLSA2OSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udmVydDtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IENvbnZlcnQ7XG4iLCJ2YXIgTGluZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGluZSgpIHtcbiAgICB9XG4gICAgTGluZS5jcmVhdGUgPSBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgZmFicmljLkxpbmUoY29vcmRzLCB7XG4gICAgICAgICAgICBmaWxsOiBcIiM1MTkxN2FcIixcbiAgICAgICAgICAgIHN0cm9rZTogXCIjNTE5MTdhXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgICAgICBzZWxlY3RhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExpbmUuZHJhdyA9IGZ1bmN0aW9uIChjYW52YXMsIGNvb3Jkcykge1xuICAgICAgICB2YXIgbGluZSA9IExpbmUuY3JlYXRlKGNvb3Jkcyk7XG4gICAgICAgIGNhbnZhcy5hZGQobGluZSk7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmU7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBMaW5lO1xuIiwiZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3dIID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciBjYW52YXMgPSBuZXcgZmFicmljLkNhbnZhcyhcImNcIik7XG4gICAgY2FudmFzLnNldFdpZHRoKHdpbmRvd1cpO1xuICAgIGNhbnZhcy5zZXRIZWlnaHQod2luZG93SCk7XG4gICAgdmFyIGxpbmVzID0gW1xuICAgICAgICBbMCwgKHdpbmRvd0ggLyAyKSwgd2luZG93VywgKHdpbmRvd0ggLyAyKV0sXG4gICAgICAgIFsod2luZG93VyAvIDMuNiksIDAsICh3aW5kb3dXIC8gMy42KSwgd2luZG93SF0sXG4gICAgICAgIFsod2luZG93VyAvIDEuMjUpLCAwLCAod2luZG93VyAvIDEwKSwgd2luZG93SF0sXG4gICAgICAgIFsod2luZG93VyAvIDMuOSksIDAsICh3aW5kb3dXIC8gMS41KSwgd2luZG93SF0sXG4gICAgICAgIFswLCAod2luZG93SCAvIDQpLCB3aW5kb3dXLCAod2luZG93SCAvIDQpXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMS44KSwgMCwgKHdpbmRvd1cgLyAyLjgpLCB3aW5kb3dIXVxuICAgIF07XG4gICAgdmFyIGlubm9jZW5jZSA9IFtcIkQ1XCIsIFwiRTVcIiwgXCJHNVwiLCBcIkE1XCIsIFwiQjVcIiwgXCJHNVwiXTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIH0pO1xufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbWFpbiwgZmFsc2UpO1xuIl19
