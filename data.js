var convert = require("./convert");
var Data = (function () {
    function Data() {
        this.freqs = convert.scoresToFreqs(Data._scores);
    }
    Object.defineProperty(Data.prototype, "freqs", {
        get: function () {
            return Data._freqs;
        },
        set: function (freqs) {
            Data._freqs = freqs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "lineAngle", {
        get: function () {
            return Data._lineAngle;
        },
        enumerable: true,
        configurable: true
    });
    Data._scores = ["D5", "E5", "G5", "A5", "B5", "G5"];
    Data._lineAngle = [0, 90, 45, 130, 0, 70];
    Data._freqs = [];
    return Data;
})();
module.exports = Data;
