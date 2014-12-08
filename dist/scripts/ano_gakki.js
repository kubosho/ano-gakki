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
"use strict";
function main() {
    var sound = new Sound();
    var innocence = ["D5", "E5", "G5", "A5", "B5", "G5"];
    var currentPlayIndex = 0;
    document.addEventListener("click", function () {
        if (currentPlayIndex === innocence.length) {
            currentPlayIndex = 0;
        }
        var osc = sound.oscillator(innocence[currentPlayIndex]);
        osc.connect(sound.ctx.destination);
        osc.start(0);
        setTimeout(function () {
            osc.stop(0);
        }, 200);
        currentPlayIndex++;
    });
}
document.addEventListener("DOMContentLoaded", main, false);

},{"./lib/sound":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9saWIvY29udmVydC5qcyIsImJ1aWxkL2xpYi9zb3VuZC5qcyIsImJ1aWxkL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIENvbnZlcnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnZlcnQoKSB7XG4gICAgfVxuICAgIENvbnZlcnQua2V5VG9Ob3RlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIEtFWVMgPSBbXG4gICAgICAgICAgICBcImNcIixcbiAgICAgICAgICAgIFwiYyNcIixcbiAgICAgICAgICAgIFwiZFwiLFxuICAgICAgICAgICAgXCJkI1wiLFxuICAgICAgICAgICAgXCJlXCIsXG4gICAgICAgICAgICBcImZcIixcbiAgICAgICAgICAgIFwiZiNcIixcbiAgICAgICAgICAgIFwiZ1wiLFxuICAgICAgICAgICAgXCJnI1wiLFxuICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICBcImEjXCIsXG4gICAgICAgICAgICBcImJcIlxuICAgICAgICBdO1xuICAgICAgICB2YXIgaW5kZXggPSAobmFtZS5pbmRleE9mKFwiI1wiKSAhPT0gLTEpID8gMiA6IDE7XG4gICAgICAgIHZhciBub3RlID0gbmFtZS5zdWJzdHJpbmcoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBudW0gPSBOdW1iZXIobmFtZS5zdWJzdHJpbmcoaW5kZXgpKSArIDE7XG4gICAgICAgIHJldHVybiBLRVlTLmluZGV4T2Yobm90ZSkgKyAxMiAqIG51bTtcbiAgICB9O1xuICAgIENvbnZlcnQubm90ZVRvRnJlcSA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgcmV0dXJuIDQ0MCAqIE1hdGgucG93KE1hdGgucG93KDIsIDEgLyAxMiksIG51bSAtIDY5KTtcbiAgICB9O1xuICAgIHJldHVybiBDb252ZXJ0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udmVydDtcbiIsInZhciBjb252ZXJ0ID0gcmVxdWlyZShcIi4vY29udmVydFwiKTtcbnZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU291bmQoKSB7XG4gICAgICAgIHZhciBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgICAgdGhpcy5jdHggPSBuZXcgQXVkaW9DdHgoKTtcbiAgICB9XG4gICAgU291bmQucHJvdG90eXBlLm9zY2lsbGF0b3IgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBvc2MgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kudmFsdWUgPSBjb252ZXJ0Lm5vdGVUb0ZyZXEoY29udmVydC5rZXlUb05vdGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICByZXR1cm4gU291bmQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBTb3VuZDtcbiIsInZhciBTb3VuZCA9IHJlcXVpcmUoXCIuL2xpYi9zb3VuZFwiKTtcblwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICB2YXIgc291bmQgPSBuZXcgU291bmQoKTtcbiAgICB2YXIgaW5ub2NlbmNlID0gW1wiRDVcIiwgXCJFNVwiLCBcIkc1XCIsIFwiQTVcIiwgXCJCNVwiLCBcIkc1XCJdO1xuICAgIHZhciBjdXJyZW50UGxheUluZGV4ID0gMDtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudFBsYXlJbmRleCA9PT0gaW5ub2NlbmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXlJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9zYyA9IHNvdW5kLm9zY2lsbGF0b3IoaW5ub2NlbmNlW2N1cnJlbnRQbGF5SW5kZXhdKTtcbiAgICAgICAgb3NjLmNvbm5lY3Qoc291bmQuY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgb3NjLnN0YXJ0KDApO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9zYy5zdG9wKDApO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgICBjdXJyZW50UGxheUluZGV4Kys7XG4gICAgfSk7XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtYWluLCBmYWxzZSk7XG4iXX0=
