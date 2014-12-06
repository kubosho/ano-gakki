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
        var AudioCtx = AudioContext || webkitAudioContext;
        this.ctx = new AudioCtx();
    }
    Sound.prototype.a = function (key) {
        var osc = this.ctx.createOscillator();
        osc.frequency.value = convert.noteToFreq(convert.keyToNote("A" + key));
        return osc;
    };
    Sound.prototype.b = function (key) {
        var osc = this.ctx.createOscillator();
        osc.frequency.value = convert.noteToFreq(convert.keyToNote("B" + key));
        return osc;
    };
    Sound.prototype.d = function (key) {
        var osc = this.ctx.createOscillator();
        osc.frequency.value = convert.noteToFreq(convert.keyToNote("D" + key));
        return osc;
    };
    Sound.prototype.e = function (key) {
        var osc = this.ctx.createOscillator();
        osc.frequency.value = convert.noteToFreq(convert.keyToNote("E" + key));
        return osc;
    };
    Sound.prototype.g = function (key) {
        var osc = this.ctx.createOscillator();
        osc.frequency.value = convert.noteToFreq(convert.keyToNote("G" + key));
        return osc;
    };
    return Sound;
})();
module.exports = Sound;

},{"./convert":1}]},{},[1,2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jb252ZXJ0LmpzIiwiYnVpbGQvc291bmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIENvbnZlcnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnZlcnQoKSB7XG4gICAgfVxuICAgIENvbnZlcnQua2V5VG9Ob3RlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIEtFWVMgPSBbXG4gICAgICAgICAgICBcImNcIixcbiAgICAgICAgICAgIFwiYyNcIixcbiAgICAgICAgICAgIFwiZFwiLFxuICAgICAgICAgICAgXCJkI1wiLFxuICAgICAgICAgICAgXCJlXCIsXG4gICAgICAgICAgICBcImZcIixcbiAgICAgICAgICAgIFwiZiNcIixcbiAgICAgICAgICAgIFwiZ1wiLFxuICAgICAgICAgICAgXCJnI1wiLFxuICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICBcImEjXCIsXG4gICAgICAgICAgICBcImJcIlxuICAgICAgICBdO1xuICAgICAgICB2YXIgaW5kZXggPSAobmFtZS5pbmRleE9mKFwiI1wiKSAhPT0gLTEpID8gMiA6IDE7XG4gICAgICAgIHZhciBub3RlID0gbmFtZS5zdWJzdHJpbmcoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBudW0gPSBOdW1iZXIobmFtZS5zdWJzdHJpbmcoaW5kZXgpKSArIDE7XG4gICAgICAgIHJldHVybiBLRVlTLmluZGV4T2Yobm90ZSkgKyAxMiAqIG51bTtcbiAgICB9O1xuICAgIENvbnZlcnQubm90ZVRvRnJlcSA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgcmV0dXJuIDQ0MCAqIE1hdGgucG93KE1hdGgucG93KDIsIDEgLyAxMiksIG51bSAtIDY5KTtcbiAgICB9O1xuICAgIHJldHVybiBDb252ZXJ0O1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gQ29udmVydDtcbiIsInZhciBjb252ZXJ0ID0gcmVxdWlyZShcIi4vY29udmVydFwiKTtcbnZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU291bmQoKSB7XG4gICAgICAgIHZhciBBdWRpb0N0eCA9IEF1ZGlvQ29udGV4dCB8fCB3ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgfVxuICAgIFNvdW5kLnByb3RvdHlwZS5hID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgb3NjID0gdGhpcy5jdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnZhbHVlID0gY29udmVydC5ub3RlVG9GcmVxKGNvbnZlcnQua2V5VG9Ob3RlKFwiQVwiICsga2V5KSk7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUuYiA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG9zYyA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGNvbnZlcnQubm90ZVRvRnJlcShjb252ZXJ0LmtleVRvTm90ZShcIkJcIiArIGtleSkpO1xuICAgICAgICByZXR1cm4gb3NjO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLmQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBvc2MgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kudmFsdWUgPSBjb252ZXJ0Lm5vdGVUb0ZyZXEoY29udmVydC5rZXlUb05vdGUoXCJEXCIgKyBrZXkpKTtcbiAgICAgICAgcmV0dXJuIG9zYztcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5lID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgb3NjID0gdGhpcy5jdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnZhbHVlID0gY29udmVydC5ub3RlVG9GcmVxKGNvbnZlcnQua2V5VG9Ob3RlKFwiRVwiICsga2V5KSk7XG4gICAgICAgIHJldHVybiBvc2M7XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUuZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG9zYyA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGNvbnZlcnQubm90ZVRvRnJlcShjb252ZXJ0LmtleVRvTm90ZShcIkdcIiArIGtleSkpO1xuICAgICAgICByZXR1cm4gb3NjO1xuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzID0gU291bmQ7XG4iXX0=
