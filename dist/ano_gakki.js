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
exports.Line = Line;

},{}],5:[function(require,module,exports){
var Audio = require("./lib/Audio");
var context = require("./lib/Context");
var convert = require("./lib/Convert");
var shape = require("./lib/Shape");
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
        lines.push(shape.Line.create(linePoints[i]));
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

},{"./lib/Audio":6,"./lib/Context":7,"./lib/Convert":8,"./lib/Shape":9}],6:[function(require,module,exports){
module.exports=require(1)
},{"./src/lib/audio.js":1}],7:[function(require,module,exports){
module.exports=require(2)
},{"./src/lib/context.js":2}],8:[function(require,module,exports){
module.exports=require(3)
},{"./src/lib/convert.js":3}],9:[function(require,module,exports){
module.exports=require(4)
},{"./src/lib/shape.js":4}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbGliL2F1ZGlvLmpzIiwic3JjL2xpYi9jb250ZXh0LmpzIiwic3JjL2xpYi9jb252ZXJ0LmpzIiwic3JjL2xpYi9zaGFwZS5qcyIsInNyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXVkaW8gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF1ZGlvKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjb250ZXh0O1xuICAgIH1cbiAgICBBdWRpby5wcm90b3R5cGUuY3JlYXRlU291bmQgPSBmdW5jdGlvbiAoZnJlcSkge1xuICAgICAgICBpZiAoZnJlcSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9zYyA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXE7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICBBdWRpby5wcm90b3R5cGUuY29ubmVjdE91dHB1dCA9IGZ1bmN0aW9uIChhdWRpbykge1xuICAgICAgICBhdWRpby5jb25uZWN0KHRoaXMuY3R4LmRlc3RpbmF0aW9uKTtcbiAgICB9O1xuICAgIHJldHVybiBBdWRpbztcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvO1xuIiwiZnVuY3Rpb24gQ29udGV4dCgpIHtcbiAgICB2YXIgQXVkaW9DdHggPSBBdWRpb0NvbnRleHQgfHwgd2Via2l0QXVkaW9Db250ZXh0O1xuICAgIHJldHVybiBuZXcgQXVkaW9DdHgoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dDtcbiIsInZhciBDb252ZXJ0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb252ZXJ0KCkge1xuICAgIH1cbiAgICBDb252ZXJ0LmtleVRvTm90ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5LnNlYXJjaCgvXltjZGVmZ2FiQ0RFRkdBQl0vKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihrZXkgKyBcIiBpcyBpbnZhbGlkIGtleSBuYW1lLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgS0VZUyA9IFtcbiAgICAgICAgICAgIFwiY1wiLFxuICAgICAgICAgICAgXCJjI1wiLFxuICAgICAgICAgICAgXCJkXCIsXG4gICAgICAgICAgICBcImQjXCIsXG4gICAgICAgICAgICBcImVcIixcbiAgICAgICAgICAgIFwiZlwiLFxuICAgICAgICAgICAgXCJmI1wiLFxuICAgICAgICAgICAgXCJnXCIsXG4gICAgICAgICAgICBcImcjXCIsXG4gICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgIFwiYSNcIixcbiAgICAgICAgICAgIFwiYlwiXG4gICAgICAgIF07XG4gICAgICAgIHZhciBpbmRleCA9IChrZXkuaW5kZXhPZihcIiNcIikgIT09IC0xKSA/IDIgOiAxO1xuICAgICAgICB2YXIga2V5TmFtZSA9IGtleS5zdWJzdHJpbmcoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBudW0gPSBOdW1iZXIoa2V5LnN1YnN0cmluZyhpbmRleCkpICsgMTtcbiAgICAgICAgdmFyIG5vdGUgPSBLRVlTLmluZGV4T2Yoa2V5TmFtZSkgKyAxMiAqIG51bTtcbiAgICAgICAgaWYgKG5vdGUgPCAwIHx8IG5vdGUgPiAxMjcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihrZXkgKyBcIiBpcyBub3QgZGVmaW5lZCBrZXkgYXQgTUlESS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm5vdGVUb0ZyZXEgPSBmdW5jdGlvbiAobm90ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5vdGUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihub3RlICsgXCIgaXMgbm90IG51bWJlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGUgPCAwIHx8IG5vdGUgPiAxMjcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihub3RlICsgXCIgaXMgaW52YWxpZCBNSURJIG5vdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gNDQwICogTWF0aC5wb3coTWF0aC5wb3coMiwgMSAvIDEyKSwgbm90ZSAtIDY5KTtcbiAgICB9O1xuICAgIHJldHVybiBDb252ZXJ0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udmVydDtcbiIsInZhciBMaW5lID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaW5lKCkge1xuICAgIH1cbiAgICBMaW5lLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBmYWJyaWMuTGluZShjb29yZHMsIHtcbiAgICAgICAgICAgIGZpbGw6IFwiIzUxOTE3YVwiLFxuICAgICAgICAgICAgc3Ryb2tlOiBcIiM1MTkxN2FcIixcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAxMCxcbiAgICAgICAgICAgIHNlbGVjdGFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmU7XG59KSgpO1xuZXhwb3J0cy5MaW5lID0gTGluZTtcbiIsInZhciBBdWRpbyA9IHJlcXVpcmUoXCIuL2xpYi9BdWRpb1wiKTtcbnZhciBjb250ZXh0ID0gcmVxdWlyZShcIi4vbGliL0NvbnRleHRcIik7XG52YXIgY29udmVydCA9IHJlcXVpcmUoXCIuL2xpYi9Db252ZXJ0XCIpO1xudmFyIHNoYXBlID0gcmVxdWlyZShcIi4vbGliL1NoYXBlXCIpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3dIID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciBjYW52YXMgPSBuZXcgZmFicmljLkNhbnZhcyhcImNcIik7XG4gICAgY2FudmFzLnNldFdpZHRoKHdpbmRvd1cpO1xuICAgIGNhbnZhcy5zZXRIZWlnaHQod2luZG93SCk7XG4gICAgdmFyIGxpbmVQb2ludHMgPSBbXG4gICAgICAgIFswLCAod2luZG93SCAvIDIpLCB3aW5kb3dXLCAod2luZG93SCAvIDIpXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMy42KSwgMCwgKHdpbmRvd1cgLyAzLjYpLCB3aW5kb3dIXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMS4yNSksIDAsICh3aW5kb3dXIC8gMTApLCB3aW5kb3dIXSxcbiAgICAgICAgWyh3aW5kb3dXIC8gMy45KSwgMCwgKHdpbmRvd1cgLyAxLjUpLCB3aW5kb3dIXSxcbiAgICAgICAgWzAsICh3aW5kb3dIIC8gNCksIHdpbmRvd1csICh3aW5kb3dIIC8gNCldLFxuICAgICAgICBbKHdpbmRvd1cgLyAxLjgpLCAwLCAod2luZG93VyAvIDIuOCksIHdpbmRvd0hdXG4gICAgXTtcbiAgICB2YXIgbGluZXMgPSBbXTtcbiAgICBsaW5lUG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50LCBpKSB7XG4gICAgICAgIGxpbmVzLnB1c2goc2hhcGUuTGluZS5jcmVhdGUobGluZVBvaW50c1tpXSkpO1xuICAgIH0pO1xuICAgIHZhciBpbm5vY2VuY2UgPSBbXCJENVwiLCBcIkU1XCIsIFwiRzVcIiwgXCJBNVwiLCBcIkI1XCIsIFwiRzVcIl07XG4gICAgdmFyIGN0eCA9IGNvbnRleHQoKTtcbiAgICB2YXIgYXVkaW8gPSBuZXcgQXVkaW8oY3R4KTtcbiAgICB2YXIgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5SW5kZXggPT09IGlubm9jZW5jZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSBpbm5vY2VuY2VbY3VycmVudFBsYXlJbmRleF07XG4gICAgICAgIHZhciBzb3VuZCA9IGF1ZGlvLmNyZWF0ZVNvdW5kKGNvbnZlcnQubm90ZVRvRnJlcShjb252ZXJ0LmtleVRvTm90ZShrZXkpKSk7XG4gICAgICAgIHNvdW5kLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgc291bmQuc3RhcnQoMCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc291bmQuc3RvcCgwKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tjdXJyZW50UGxheUluZGV4XTtcbiAgICAgICAgaWYgKGxpbmUuZ2V0T3BhY2l0eSgpID09PSAwKSB7XG4gICAgICAgICAgICBsaW5lLm9wYWNpdHkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhcy5hZGQobGluZSk7XG4gICAgICAgIGxpbmUuYW5pbWF0ZShcIm9wYWNpdHlcIiwgMCwge1xuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGluZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRQbGF5SW5kZXgrKztcbiAgICB9KTtcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4sIGZhbHNlKTtcbiJdfQ==
