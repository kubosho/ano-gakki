(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Sounds = (function () {
    function Sounds() {
        var AudioCtx = AudioContext || webkitAudioContext;
        this.ctx = new AudioCtx();
    }
    Sounds.prototype.a = function (num) {
        var base = 176;
        return base * num;
    };
    Sounds.prototype.b = function (num) {
        var base = 197.56;
        return base * num;
    };
    Sounds.prototype.d = function (num) {
        var base = 117.46;
        return base * num;
    };
    Sounds.prototype.e = function (num) {
        var base = 131.86;
        return base * num;
    };
    Sounds.prototype.g = function (num) {
        var base = 156.8;
        return base * num;
    };
    return Sounds;
})();
exports.Sounds = Sounds;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9zb3VuZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTb3VuZHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNvdW5kcygpIHtcbiAgICAgICAgdmFyIEF1ZGlvQ3R4ID0gQXVkaW9Db250ZXh0IHx8IHdlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgICAgdGhpcy5jdHggPSBuZXcgQXVkaW9DdHgoKTtcbiAgICB9XG4gICAgU291bmRzLnByb3RvdHlwZS5hID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICB2YXIgYmFzZSA9IDE3NjtcbiAgICAgICAgcmV0dXJuIGJhc2UgKiBudW07XG4gICAgfTtcbiAgICBTb3VuZHMucHJvdG90eXBlLmIgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHZhciBiYXNlID0gMTk3LjU2O1xuICAgICAgICByZXR1cm4gYmFzZSAqIG51bTtcbiAgICB9O1xuICAgIFNvdW5kcy5wcm90b3R5cGUuZCA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgdmFyIGJhc2UgPSAxMTcuNDY7XG4gICAgICAgIHJldHVybiBiYXNlICogbnVtO1xuICAgIH07XG4gICAgU291bmRzLnByb3RvdHlwZS5lID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICB2YXIgYmFzZSA9IDEzMS44NjtcbiAgICAgICAgcmV0dXJuIGJhc2UgKiBudW07XG4gICAgfTtcbiAgICBTb3VuZHMucHJvdG90eXBlLmcgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHZhciBiYXNlID0gMTU2Ljg7XG4gICAgICAgIHJldHVybiBiYXNlICogbnVtO1xuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kcztcbn0pKCk7XG5leHBvcnRzLlNvdW5kcyA9IFNvdW5kcztcbiJdfQ==
